//Import modules
let fs = require("fs");
let JSON5 = require("json5");
let path = require("path");
let SitesBelarusUkraineObservationUtils = require("./SitesBelarusUkraineObservationUtils.js");

//Initialise functions
{
  /**
   * Parameter-free Empirical Non-Stationary Matérn (nu = 3/2) Log-Linear Residual Kriging, Wild Fields ecological envelope and urban-masked HYDE 3.5 popc disaggregation pipeline for the Belarus and mainland Ukraine (Kievan Rus) archaeological site dataset across c. 1 AD (HYDE benchmark 0) to the Mongol Conquests (1400 AD).
   *
   * Logical flow is prefixed with step letters (A_ through F_):
   * - A_buildBelarusUkraineMask (inherited from SitesBelarusUkraineObservationUtils): Constructs the 5-arcminute (4320x2160) land mask of modern Belarus (BLR) and mainland Ukraine (UKR, excluding Crimea).
   * - B_loadRaionObservations (inherited from SitesBelarusUkraineObservationUtils): Loads the 12 Belarus & Ukraine GeoJSON files plus adjacent Russian/Crimean frontier conditioning raions from sites_IA_RAS, reallocates unspecified subregions, applies ecologically conditioned Empirical Bayes unspecified allocation and ADM1 oblast harmonisation, and computes continuous local catchment radii.
   * - C_fitVariogramsAndSolveKriging: Computes Freeman-Tukey square-root site densities, Matheron (1962) empirical variograms, differentiable Matérn (nu = 3/2) kernels and Projected Gauss-Seidel Non-Negative Dual Kriging solutions.
   * - D_generateKrigedRasters: Evaluates the non-stationary Matérn (nu = 3/2) Log-Linear Residual Kriging fields with cross-frontier dasymetric blending into 1.kriged_rasters/.
   * - E_interpolateSubstrataPopulationRasters: Linearly interpolates across the 15 HYDE benchmark years (0 to 1400 AD), applies Log-Linear Residual Kriging disaggregation, scales to ecologically adjusted urban-masked HYDE 3.5 popc totals and applies cross-frontier dasymetric blending in 2.population_rasters/.
   * - F_writeKrigingMetadata: Writes empirical variogram diagnostics, WLS regression coefficients, quantile distributions and population series to config/belarus_ukraine_kriging_metadata.json.
   *
   * @class SitesBelarusUkraineKriging
   * @extends SitesBelarusUkraineObservationUtils
   */
  global.SitesBelarusUkraineKriging = class extends SitesBelarusUkraineObservationUtils {
    static CONFIG_PATH = path.join(__dirname, "config", "sites_belarus_ukraine.json5");

    /**
     * Step C: Computes Freeman-Tukey variance-stabilising square-root site densities, Matheron (1962) method-of-moments empirical semivariograms, differentiable Matérn (nu = 3/2) correlation functions and Projected Gauss-Seidel Non-Negative Dual Kriging weights for all 12 periods.
     * @alias SitesBelarusUkraineKriging.C_fitVariogramsAndSolveKriging
     *
     * @param {Object} arg0_raion_data
     * @param {Object} [arg1_options]
     *  @param {Object} [arg1_options.config]
     *
     * @returns {Object}
     */
    static C_fitVariogramsAndSolveKriging (arg0_raion_data, arg1_options) {
      //Convert from parameters
      let raion_data = arg0_raion_data;
      let options = (arg1_options) ? arg1_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let dim_lag_bins = config.kriging_config.dimensionless_lag_bins;
      let earth_radius_km = config.kriging_config.earth_radius_km;
      let kernel_m1_matrix;
      let kernel_m2_matrix;
      let kriging_models = {};
      let matern_lut = new Float32Array(8192);
      let min_dot_per_raion = new Float32Array(raion_data.raion_count);
      let n_bins = dim_lag_bins.length;
      let n_periods = config.periods.length;
      let n_raions = raion_data.raion_count;
      let pair_bins = [];
      let period_configs = config.periods;
      let period_cov_matrix = new Float64Array(raion_data.raion_count*raion_data.raion_count);
      let period_observations = {};
      let period_totals = raion_data.period_totals;
      let period_z_arrays = {};
      let pooled_norm_gammas = new Float64Array(dim_lag_bins.length);
      let pooled_u_lags = new Float64Array(dim_lag_bins.length);
      let raion_list = raion_data.raion_list;
      let raion_r = raion_data.raion_radius_km;
      let raion_ux = raion_data.raion_ux;
      let raion_uy = raion_data.raion_uy;
      let raion_uz = raion_data.raion_uz;
      let scale_prefactor_matrix = new Float32Array(raion_data.raion_count*raion_data.raion_count);
      let shared_tau1;
      let shared_tau2;
      let sqrt3 = Math.sqrt(3);
      let u_matrix = new Float32Array(raion_data.raion_count*raion_data.raion_count);

      for (let i = 0; i < n_bins; i++)
        pair_bins.push([]);

      for (let i = 0; i < 8192; i++) {
        let local_s = sqrt3*(8*i)/8191;

        matern_lut[i] = (1 + local_s)*Math.exp(-local_s);
      }

      for (let i = 0; i < n_raions; i++) {
        let local_ri = raion_r[i];

        scale_prefactor_matrix[i*n_raions + i] = 1;
        u_matrix[i*n_raions + i] = 0;

        for (let x = i + 1; x < n_raions; x++) {
          let local_dot = Math.max(-1, Math.min(1, raion_ux[i]*raion_ux[x] + raion_uy[i]*raion_uy[x] + raion_uz[i]*raion_uz[x]));
          let local_rj = raion_r[x];
          let local_r_eff = Math.sqrt(0.5*(local_ri*local_ri + local_rj*local_rj));
          let local_pref = (2*local_ri*local_rj)/(local_ri*local_ri + local_rj*local_rj);
          let local_c2 = Math.max(0, 2 - 2*local_dot);
          let local_h = earth_radius_km*Math.sqrt(local_c2)*(1 + local_c2/24 + (3*local_c2*local_c2)/640);
          let local_u = local_h/local_r_eff;

          scale_prefactor_matrix[i*n_raions + x] = local_pref;
          scale_prefactor_matrix[x*n_raions + i] = local_pref;
          u_matrix[i*n_raions + x] = local_u;
          u_matrix[x*n_raions + i] = local_u;

          if (local_u <= dim_lag_bins[n_bins - 1])
            for (let y = 0; y < n_bins; y++)
              if (local_u <= dim_lag_bins[y]) {
                pair_bins[y].push(i, x, local_u);
                break;
              }
        }
      }

      for (let i = 0; i < n_periods; i++) {
        let local_active_cnt = 0;
        let local_c0_norm;
        let local_emp_gammas = [];
        let local_emp_lags = [];
        let local_eta;
        let local_period = period_configs[i];
        let local_pkey = local_period.key;
        let local_s_obs = new Float64Array(n_raions);
        let local_sample_var = 0;
        let local_sill_norm = 0;
        let local_total_s = 0;
        let local_z = new Float64Array(n_raions);
        let local_z_mean = 0;

        for (let x = 0; x < n_raions; x++) {
          let local_lambda = raion_list[x].eb_densities[local_pkey] || 0;
          let local_s = raion_list[x].periods[local_pkey] || 0;

          local_s_obs[x] = local_s;
          if (!raion_list[x].is_frontier_buffer) {
            local_total_s += local_s;
            if (local_s > 0) local_active_cnt++;
          }
          local_z[x] = Math.sqrt(Math.max(0, local_lambda));
          local_z_mean += local_z[x];
        }
        local_z_mean /= n_raions;

        for (let x = 0; x < n_raions; x++) {
          let local_diff = local_z[x] - local_z_mean;

          local_sample_var += local_diff*local_diff;
        }
        local_sample_var = Math.max(1e-8, local_sample_var/n_raions);

        for (let x = 0; x < n_bins; x++) {
          let local_bin = pair_bins[x];
          let local_nb = local_bin.length/3;
          let local_sq_sum = 0;
          let local_u_sum = 0;

          for (let y = 0; y < local_bin.length; y += 3) {
            let local_dz = local_z[local_bin[y]] - local_z[local_bin[y + 1]];

            local_sq_sum += 0.5*local_dz*local_dz;
            local_u_sum += local_bin[y + 2];
          }

          let local_gamma_m = (local_nb > 0) ? local_sq_sum/local_nb : local_sample_var;
          let local_u_bar = (local_nb > 0) ? local_u_sum/local_nb : dim_lag_bins[x];

          local_emp_gammas.push(local_gamma_m);
          local_emp_lags.push(local_u_bar);
          pooled_norm_gammas[x] += (local_gamma_m/local_sample_var)/n_periods;
          pooled_u_lags[x] = local_u_bar;
        }

        for (let x = n_bins - 3; x < n_bins; x++)
          local_sill_norm += (local_emp_gammas[x]/local_sample_var)/3;
        local_sill_norm = Math.max(0.1, local_sill_norm);

        let local_g0 = local_emp_gammas[0]/local_sample_var;
        let local_g1 = local_emp_gammas[1]/local_sample_var;
        let local_slope01 = Math.max(0, (local_g1 - local_g0)/Math.max(1e-6, local_emp_lags[1] - local_emp_lags[0]));

        local_c0_norm = Math.max(0.05*local_sill_norm, Math.min(0.75*local_sill_norm, local_g0 - local_emp_lags[0]*local_slope01));
        local_eta = local_c0_norm/Math.max(0.05*local_sill_norm, local_sill_norm - local_c0_norm);

        period_observations[local_pkey] = {
          active_raion_count: local_active_cnt,
          c0_norm: local_c0_norm,
          empirical_gammas: local_emp_gammas,
          empirical_u_lags: local_emp_lags,
          eta_nugget_ratio: local_eta,
          s_obs: local_s_obs,
          sample_variance: local_sample_var,
          sill_norm: local_sill_norm,
          total_reallocated_sites: local_total_s,
          z_mean: local_z_mean
        };
        period_z_arrays[local_pkey] = local_z;
      }

      shared_tau1 = pooled_u_lags[2];
      shared_tau2 = pooled_u_lags[4];
      {
        let local_g0 = pooled_norm_gammas[0];
        let local_g1 = pooled_norm_gammas[1];
        let local_sill = 0;

        for (let i = n_bins - 3; i < n_bins; i++)
          local_sill += pooled_norm_gammas[i]/3;

        let local_c0 = Math.max(0.05*local_sill, local_g0 - pooled_u_lags[0]*Math.max(0, (local_g1 - local_g0)/Math.max(1e-6, pooled_u_lags[1] - pooled_u_lags[0])));
        let local_matern_half = 1 - (1 + sqrt3)*Math.exp(-sqrt3);
        let local_matern_two = 1 - (1 + 2*sqrt3)*Math.exp(-2*sqrt3);
        let local_target1 = local_c0 + local_matern_half*Math.max(1e-6, local_sill - local_c0);
        let local_target2 = local_c0 + local_matern_two*Math.max(1e-6, local_sill - local_c0);

        for (let i = 0; i < n_bins - 1; i++)
          if (pooled_norm_gammas[i] <= local_target1 && pooled_norm_gammas[i + 1] >= local_target1) {
            let local_frac = (local_target1 - pooled_norm_gammas[i])/Math.max(1e-8, pooled_norm_gammas[i + 1] - pooled_norm_gammas[i]);

            shared_tau1 = pooled_u_lags[i] + local_frac*(pooled_u_lags[i + 1] - pooled_u_lags[i]);
            break;
          }

        for (let i = 0; i < n_bins - 1; i++)
          if (pooled_norm_gammas[i] <= local_target2 && pooled_norm_gammas[i + 1] >= local_target2) {
            let local_frac = (local_target2 - pooled_norm_gammas[i])/Math.max(1e-8, pooled_norm_gammas[i + 1] - pooled_norm_gammas[i]);

            shared_tau2 = Math.max(1.8*shared_tau1, pooled_u_lags[i] + local_frac*(pooled_u_lags[i + 1] - pooled_u_lags[i]));
            break;
          }
      }

      kernel_m1_matrix = new Float64Array(n_raions*n_raions);
      kernel_m2_matrix = new Float64Array(n_raions*n_raions);

      for (let i = 0; i < n_raions; i++) {
        let local_cutoff_km = 8.5*shared_tau2*raion_r[i];

        min_dot_per_raion[i] = Math.cos(Math.min(Math.PI, local_cutoff_km/earth_radius_km));
        kernel_m1_matrix[i*n_raions + i] = 1;
        kernel_m2_matrix[i*n_raions + i] = 1;

        for (let x = i + 1; x < n_raions; x++) {
          let local_idx = i*n_raions + x;
          let local_pref = scale_prefactor_matrix[local_idx];
          let local_s1 = sqrt3*u_matrix[local_idx]/shared_tau1;
          let local_s2 = sqrt3*u_matrix[local_idx]/shared_tau2;
          let local_v1 = local_pref*(1 + local_s1)*Math.exp(-local_s1);
          let local_v2 = local_pref*(1 + local_s2)*Math.exp(-local_s2);

          kernel_m1_matrix[local_idx] = local_v1;
          kernel_m1_matrix[x*n_raions + i] = local_v1;
          kernel_m2_matrix[local_idx] = local_v2;
          kernel_m2_matrix[x*n_raions + i] = local_v2;
        }
      }

      for (let i = 0; i < n_periods; i++) {
        let local_chol_L;
        let local_period = period_configs[i];
        let local_pkey = local_period.key;
        let local_obs = period_observations[local_pkey];
        let local_eta = local_obs.eta_nugget_ratio;
        let local_fit = SitesBelarusUkraineGridUtils.fitEmpiricalNestedVariogram(
          local_obs.empirical_u_lags,
          local_obs.empirical_gammas,
          pair_bins,
          shared_tau1,
          shared_tau2,
          local_obs.c0_norm/local_obs.sill_norm
        );
        let local_c1 = local_fit.c1;
        let local_c2 = local_fit.c2;
        let local_weights;
        let local_z = period_z_arrays[local_pkey];
        let local_z_adj = new Float64Array(n_raions);
        let local_zh_mean = 0;
        let local_zh_var = 0;

        for (let x = 0; x < n_raions; x++) {
          let local_row = x*n_raions;

          period_cov_matrix[local_row + x] = 1 + local_eta;
          for (let y = x + 1; y < n_raions; y++) {
            let local_kval = local_c1*kernel_m1_matrix[local_row + y] + local_c2*kernel_m2_matrix[local_row + y];

            period_cov_matrix[local_row + y] = local_kval;
            period_cov_matrix[y*n_raions + x] = local_kval;
          }
        }

        for (let x = 0; x < n_raions; x++) {
          let local_act_w = 0;
          let local_row = x*n_raions;
          let local_sum_w = 0;
          let local_sum_wz = 0;

          for (let y = 0; y < n_raions; y++) {
            if (x === y) continue;
            let local_kw = kernel_m1_matrix[local_row + y];
            let local_r2 = local_kw*local_kw;

            local_sum_w += local_r2;
            local_sum_wz += local_r2*local_z[y];
            if (local_z[y] > 0)
              local_act_w += local_r2;
          }

          let local_act_frac = (local_sum_w > 1e-6) ? local_act_w/local_sum_w : 0;
          let local_nbr_z = (local_sum_w > 1e-6) ? local_sum_wz/local_sum_w : 0;

          local_z_adj[x] = Math.max(local_z[x], local_act_frac*local_nbr_z);
        }

        local_chol_L = SitesBelarusUkraineGridUtils.computeCholeskyFactor(period_cov_matrix, n_raions);
        local_weights = SitesBelarusUkraineGridUtils.solveNonNegativeDualKriging(
          period_cov_matrix,
          local_chol_L,
          local_z_adj,
          n_raions
        );

        for (let x = 0; x < n_raions; x++)
          local_zh_mean += (local_z[x] - local_eta*local_weights[x]);
        local_zh_mean /= n_raions;

        for (let x = 0; x < n_raions; x++) {
          let local_dzh = (local_z[x] - local_eta*local_weights[x]) - local_zh_mean;

          local_zh_var += local_dzh*local_dzh;
        }
        local_zh_var = Math.max(1e-8, local_zh_var/n_raions);

        let local_structural_share = (local_obs.sill_norm - local_obs.c0_norm)/local_obs.sill_norm;
        let local_var_restore = Math.sqrt((local_obs.sample_variance*local_structural_share)/local_zh_var);

        kriging_models[local_pkey] = {
          active_raion_count: local_obs.active_raion_count,
          c0_nugget: (local_obs.c0_norm/local_obs.sill_norm)*local_obs.sample_variance,
          c1_short_sill: local_c1*(1 - local_obs.c0_norm/local_obs.sill_norm)*local_obs.sample_variance,
          c1_weight: local_c1,
          c2_meso_sill: local_c2*(1 - local_obs.c0_norm/local_obs.sill_norm)*local_obs.sample_variance,
          c2_weight: local_c2,
          centroid_variance_restoration: local_var_restore,
          dual_weights: local_weights,
          empirical_gammas: local_obs.empirical_gammas,
          empirical_u_lags: local_obs.empirical_u_lags,
          eta_nugget_ratio: local_eta,
          gls_mean: 0,
          period_config: local_period,
          s_obs: local_obs.s_obs,
          sample_variance: local_obs.sample_variance,
          tau1_dimensionless: shared_tau1,
          tau2_dimensionless: shared_tau2,
          total_reallocated_sites: local_obs.total_reallocated_sites,
          total_sill: local_obs.sample_variance,
          total_sites: period_totals[local_pkey] || 0,
          z_adj: local_z_adj
        };
      }

      //Return statement
      return {
        kriging_models: kriging_models,
        matern_lut: matern_lut,
        min_dot_per_raion: min_dot_per_raion,
        tau1_dimensionless: shared_tau1,
        tau2_dimensionless: shared_tau2
      };
    }


    /**
     * Step D: Evaluates the non-stationary Matérn (nu = 3/2) Ordinary Kriging models with continuous grid-smoothed local radii, Log-Linear Residual Kriging and cross-frontier dasymetric blending, writing the 12 GeoPNG rasters to 1.kriged_rasters/.
     * @alias SitesBelarusUkraineKriging.D_generateKrigedRasters
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_kriging_bundle
     * @param {Object} [arg3_options]
     *  @param {Object} [arg3_options.config]
     *
     * @returns {Object}
     */
    static D_generateKrigedRasters (arg0_mask_data, arg1_raion_data, arg2_kriging_bundle, arg3_options) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let kriging_bundle = arg2_kriging_bundle;
      let options = (arg3_options) ? arg3_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let all_mu = new Float64Array(config.periods.length);
      let all_potentials = [];
      let all_var_restore = new Float64Array(config.periods.length);
      let all_w1_scaled = [];
      let all_w2_scaled = [];
      let bio_covs;
      let cell_land_area = mask_data.cell_land_area;
      let cell_r = raion_data.cell_radius_km;
      let cell_ux = mask_data.cell_ux;
      let cell_uy = mask_data.cell_uy;
      let cell_uz = mask_data.cell_uz;
      let earth_radius_km = mask_data.earth_radius_km;
      let hab_cache = new Map();
      let inv_tau1 = 1/kriging_bundle.tau1_dimensionless;
      let inv_tau2 = 1/kriging_bundle.tau2_dimensionless;
      let kriged_fields = {};
      let kriged_raw_potentials = {};
      let kriged_stats = {};
      let kriging_models = kriging_bundle.kriging_models;
      let lut_scale = 8191/8;
      let matern_lut = kriging_bundle.matern_lut;
      let meso_smooth_px;
      let min_dot_per_raion = kriging_bundle.min_dot_per_raion;
      let n_periods = config.periods.length;
      let n_raions = raion_data.raion_count;
      let n_valid = mask_data.valid_cell_count;
      let out_dir = path.join(__dirname, config.output_kriged_rasters_subfolder);
      let period_configs = config.periods;
      let period_wls_betas = {};
      let raion_r = raion_data.raion_radius_km;
      let raion_ux = raion_data.raion_ux;
      let raion_uy = raion_data.raion_uy;
      let raion_uz = raion_data.raion_uz;
      let rus_kriged_dir = path.join(
        mask_data.project_root,
        config.kriging_config.russian_ia_ras_folder || "histmap/1.data_raw/population_regional/russia/1.entire_country/sites_IA_RAS",
        "1.kriged_rasters"
      );
      let substrata_cache = new Map();
      let z_acc = new Float64Array(config.periods.length);

      if (!fs.existsSync(out_dir))
        fs.mkdirSync(out_dir, { recursive: true });

      meso_smooth_px = Math.max(4, Math.round((kriging_bundle.tau1_dimensionless*raion_data.median_radius_km)/Math.sqrt(mask_data.mean_cell_land_area_km2)));
      bio_covs = SitesBelarusUkraineGridUtils.loadBiophysicalCovariates(mask_data, raion_data, config, meso_smooth_px);

      for (let i = 0; i < n_periods; i++) {
        let local_m = kriging_models[period_configs[i].key];
        let local_w1 = new Float32Array(n_raions);
        let local_w2 = new Float32Array(n_raions);

        all_mu[i] = local_m.gls_mean;
        all_var_restore[i] = local_m.centroid_variance_restoration;
        all_potentials.push(new Float32Array(n_valid));

        for (let x = 0; x < n_raions; x++) {
          local_w1[x] = local_m.c1_weight*local_m.dual_weights[x];
          local_w2[x] = local_m.c2_weight*local_m.dual_weights[x];
        }
        all_w1_scaled.push(local_w1);
        all_w2_scaled.push(local_w2);
      }

      for (let i = 0; i < n_valid; i++) {
        let local_area = cell_land_area[i];
        let local_cx = cell_ux[i];
        let local_cy = cell_uy[i];
        let local_cz = cell_uz[i];
        let local_ri = cell_r[i];
        let local_ri2 = local_ri*local_ri;

        for (let p = 0; p < n_periods; p++)
          z_acc[p] = 0;

        for (let x = 0; x < n_raions; x++) {
          let local_dot = local_cx*raion_ux[x] + local_cy*raion_uy[x] + local_cz*raion_uz[x];

          if (local_dot <= min_dot_per_raion[x]) continue;

          let local_c2 = Math.max(0, 2 - 2*local_dot);
          let local_h = earth_radius_km*Math.sqrt(local_c2)*(1 + local_c2/24);
          let local_rx = raion_r[x];
          let local_r2_sum = local_ri2 + local_rx*local_rx;
          let local_r_eff = Math.sqrt(0.5*local_r2_sum);
          let local_u = local_h/local_r_eff;
          let local_v2 = local_u*inv_tau2;

          if (local_v2 >= 7.99) continue;

          let local_pref = (2*local_ri*local_rx)/local_r2_sum;
          let local_m1 = 0;
          let local_v1 = local_u*inv_tau1;

          if (local_v1 < 7.99) {
            let local_idx1 = (local_v1*lut_scale) | 0;
            let local_frac1 = local_v1*lut_scale - local_idx1;

            local_m1 = local_pref*(matern_lut[local_idx1]*(1 - local_frac1) + matern_lut[local_idx1 + 1]*local_frac1);
          }

          let local_idx2 = (local_v2*lut_scale) | 0;
          let local_frac2 = local_v2*lut_scale - local_idx2;
          let local_m2 = local_pref*(matern_lut[local_idx2]*(1 - local_frac2) + matern_lut[local_idx2 + 1]*local_frac2);

          for (let p = 0; p < n_periods; p++)
            z_acc[p] += all_w1_scaled[p][x]*local_m1 + all_w2_scaled[p][x]*local_m2;
        }

        for (let p = 0; p < n_periods; p++) {
          let local_z_restored = Math.max(0, all_mu[p] + all_var_restore[p]*z_acc[p]);

          all_potentials[p][i] = local_area*local_z_restored*local_z_restored;
        }
      }

      for (let i = 0; i < n_periods; i++) {
        let local_field = new Float32Array(n_valid);
        let local_final_sum = 0;
        let local_period = period_configs[i];
        let local_pkey = local_period.key;
        let local_model = kriging_models[local_pkey];
        let local_pot = all_potentials[i];
        let local_target_sites = Math.max(1, local_model.total_sites);
        let local_u_hab = SitesBelarusUkraineGridUtils.computeCompositeHabitationField(
          mask_data,
          raion_data,
          bio_covs,
          local_period,
          config,
          hab_cache
        );
        let local_rk = SitesBelarusUkraineGridUtils.computeResidualKrigingWeights(
          mask_data,
          raion_data,
          bio_covs,
          local_u_hab,
          local_model.z_adj,
          meso_smooth_px,
          local_pot
        );

        period_wls_betas[local_pkey] = {
          beta_0_hab: Number(local_rk.beta[0].toFixed(4)),
          beta_1_nat: Number(local_rk.beta[1].toFixed(4)),
          beta_2_eco: Number(local_rk.beta[2].toFixed(4)),
          kappa_drift: local_rk.kappa_drift
        };

        for (let x = 0; x < n_valid; x++) {
          let local_val = local_pot[x]*local_rk.weights[x];

          local_field[x] = local_val;
          local_final_sum += local_val;
        }

        let local_final_scale = (local_final_sum > 0) ? local_target_sites/local_final_sum : 1;
        for (let x = 0; x < n_valid; x++)
          local_field[x] = local_field[x]*local_final_scale;

        local_field = SitesBelarusUkraineGridUtils.applyDasymetricFrontierBlend(
          mask_data,
          local_field,
          bio_covs,
          path.join(rus_kriged_dir, local_period.filename),
          config
        );

        SitesBelarusUkraineGridUtils.writeMaskedFloat32GeoPNG(path.join(out_dir, local_period.filename), mask_data, local_field, config);

        kriged_fields[local_pkey] = local_field;
        kriged_raw_potentials[local_pkey] = local_pot;
        kriged_stats[local_pkey] = SitesBelarusUkraineGridUtils.computeFieldQuantileStats(local_field, local_period.filename, local_model.total_sites);
      }

      //Return statement
      return {
        bio_covs: bio_covs,
        hab_cache: hab_cache,
        kriged_fields: kriged_fields,
        kriged_raw_potentials: kriged_raw_potentials,
        kriged_stats: kriged_stats,
        kriging_models: kriging_models,
        meso_smooth_px: meso_smooth_px,
        period_wls_betas: period_wls_betas,
        substrata_cache: substrata_cache
      };
    }


    /**
     * Step E: Constructs chronological horizon distributions, linearly interpolates across the 15 HYDE benchmark years (0 to 1400 AD), applies Log-Linear Residual Kriging weights bounded by natural features, Wild Fields ecological envelope and urban-masked HYDE 3.5 popc habitation, and applies cross-frontier dasymetric blending in 2.population_rasters/.
     * @alias SitesBelarusUkraineKriging.E_interpolateSubstrataPopulationRasters
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_kriged_results
     * @param {Object} [arg3_options]
     *  @param {Object} [arg3_options.config]
     *
     * @returns {Object}
     */
    static E_interpolateSubstrataPopulationRasters (arg0_mask_data, arg1_raion_data, arg2_kriged_results, arg3_options) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let kriged_results = arg2_kriged_results;
      let options = (arg3_options) ? arg3_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let bio_covs = kriged_results.bio_covs;
      let existing_files;
      let hab_cache = kriged_results.hab_cache || new Map();
      let horizon_configs = config.kriging_config.chronological_horizons;
      let horizon_distributions = [];
      let hyde_years = config.kriging_config.hyde_years;
      let kriged_potentials = kriged_results.kriged_raw_potentials;
      let kriging_models = kriged_results.kriging_models || {};
      let max_year = hyde_years[hyde_years.length - 1];
      let meso_smooth_px = kriged_results.meso_smooth_px || 10;
      let min_year = hyde_years[0];
      let n_raions = raion_data.raion_count;
      let n_valid = mask_data.valid_cell_count;
      let out_dir = path.join(__dirname, config.output_population_rasters_subfolder);
      let period_totals = raion_data.period_totals;
      let pop_field = new Float32Array(mask_data.valid_cell_count);
      let population_quantiles = {};
      let population_series = {};
      let rus_pop_dir = path.join(
        mask_data.project_root,
        config.kriging_config.russian_ia_ras_folder || "histmap/1.data_raw/population_regional/russia/1.entire_country/sites_IA_RAS",
        "2.population_rasters"
      );
      let substrata_cache = kriged_results.substrata_cache || new Map();

      if (!fs.existsSync(out_dir))
        fs.mkdirSync(out_dir, { recursive: true });
      if (!bio_covs)
        bio_covs = SitesBelarusUkraineGridUtils.loadBiophysicalCovariates(mask_data, raion_data, config, meso_smooth_px);

      existing_files = fs.readdirSync(out_dir);
      for (let i = 0; i < existing_files.length; i++) {
        let local_match = existing_files[i].match(/^popc_(-?\d+)\.png$/);

        if (local_match) {
          let local_yr = Number(local_match[1]);

          if (local_yr < min_year || local_yr > max_year)
            fs.unlinkSync(path.join(out_dir, existing_files[i]));
        }
      }

      for (let i = 0; i < horizon_configs.length; i++) {
        let local_active = horizon_configs[i].active_periods;
        let local_dist = new Float32Array(n_valid);
        let local_horizon = horizon_configs[i];
        let local_sum = 0;
        let local_z_horizon = new Float64Array(n_raions);

        for (let x = 0; x < local_active.length; x++) {
          let local_pkey = local_active[x];
          let local_pot = kriged_potentials[local_pkey];
          let local_pot_sum = 0;
          let local_ptotal = Math.max(1, period_totals[local_pkey] || 0);

          if (local_pot) {
            for (let y = 0; y < n_valid; y++)
              local_pot_sum += local_pot[y];

            let local_pscale = (local_pot_sum > 0) ? local_ptotal/local_pot_sum : 0;

            for (let y = 0; y < n_valid; y++)
              local_dist[y] += local_pot[y]*local_pscale;
          }
        }

        for (let x = 0; x < n_raions; x++) {
          let local_d_sum = 0;

          for (let y = 0; y < local_active.length; y++) {
            let local_m = kriging_models[local_active[y]];

            if (local_m && local_m.z_adj) {
              let local_z_val = local_m.z_adj[x];

              local_d_sum += local_z_val*local_z_val;
            }
          }
          local_z_horizon[x] = Math.sqrt(local_d_sum);
        }

        for (let x = 0; x < n_valid; x++)
          local_sum += local_dist[x];
        for (let x = 0; x < n_valid; x++)
          local_dist[x] /= Math.max(1e-12, local_sum);

        horizon_distributions.push({
          active_periods: local_active,
          dist: local_dist,
          empirical_site_sum: Math.round(local_sum),
          key: local_horizon.key,
          year: local_horizon.year,
          z_horizon: local_z_horizon
        });
      }

      for (let i = 0; i < hyde_years.length; i++) {
        let local_alpha = 0;
        let local_arch_pot = new Float32Array(n_valid);
        let local_base_dasy = SitesBelarusUkraineGridUtils.loadSingleSubstrataRaster(mask_data, hyde_years[i], substrata_cache, config, bio_covs);
        let local_base_sum = 0;
        let local_blended_field;
        let local_blended_sum = 0;
        let local_dist_a;
        let local_dist_b;
        let local_final_sum = 0;
        let local_rk;
        let local_scale;
        let local_u_hab;
        let local_year = hyde_years[i];
        let local_z_a;
        let local_z_b;
        let local_z_year = new Float64Array(n_raions);

        for (let x = 0; x < n_valid; x++)
          local_base_sum += local_base_dasy[x];

        if (local_year <= horizon_distributions[0].year) {
          local_dist_a = horizon_distributions[0].dist;
          local_dist_b = horizon_distributions[0].dist;
          local_z_a = horizon_distributions[0].z_horizon;
          local_z_b = horizon_distributions[0].z_horizon;
        } else if (local_year >= horizon_distributions[horizon_distributions.length - 1].year) {
          let local_last = horizon_distributions[horizon_distributions.length - 1];

          local_dist_a = local_last.dist;
          local_dist_b = local_last.dist;
          local_z_a = local_last.z_horizon;
          local_z_b = local_last.z_horizon;
        } else {
          for (let x = 0; x < horizon_distributions.length - 1; x++) {
            let local_a = horizon_distributions[x];
            let local_b = horizon_distributions[x + 1];

            if (local_year >= local_a.year && local_year <= local_b.year) {
              local_dist_a = local_a.dist;
              local_dist_b = local_b.dist;
              local_z_a = local_a.z_horizon;
              local_z_b = local_b.z_horizon;
              local_alpha = (local_year - local_a.year)/Math.max(1, local_b.year - local_a.year);
              break;
            }
          }
        }

        for (let x = 0; x < n_raions; x++)
          local_z_year[x] = (1 - local_alpha)*local_z_a[x] + local_alpha*local_z_b[x];
        for (let x = 0; x < n_valid; x++)
          local_arch_pot[x] = (1 - local_alpha)*local_dist_a[x] + local_alpha*local_dist_b[x];

        local_u_hab = SitesBelarusUkraineGridUtils.computeDeCliffedHabitationField(
          mask_data,
          raion_data,
          bio_covs,
          local_year,
          config,
          hab_cache,
          true
        );
        local_rk = SitesBelarusUkraineGridUtils.computeResidualKrigingWeights(
          mask_data,
          raion_data,
          bio_covs,
          local_u_hab,
          local_z_year,
          meso_smooth_px,
          local_arch_pot
        );

        for (let x = 0; x < n_valid; x++) {
          let local_val = local_arch_pot[x]*local_rk.weights[x];

          pop_field[x] = local_val;
          local_final_sum += local_val;
        }

        local_scale = (local_final_sum > 0) ? local_base_sum/local_final_sum : 0;
        for (let x = 0; x < n_valid; x++)
          pop_field[x] = pop_field[x]*local_scale;

        local_blended_field = SitesBelarusUkraineGridUtils.applyDasymetricFrontierBlend(
          mask_data,
          pop_field,
          bio_covs,
          path.join(rus_pop_dir, `popc_${local_year}.png`),
          config
        );

        for (let x = 0; x < n_valid; x++)
          local_blended_sum += local_blended_field[x];

        SitesBelarusUkraineGridUtils.writeMaskedFloat32GeoPNG(path.join(out_dir, `popc_${local_year}.png`), mask_data, local_blended_field, config);

        population_series[local_year] = Math.round(local_blended_sum);
        if (local_year === 0 || local_year === 400 || local_year === 700 || local_year === 900 || local_year === 1000 || local_year === 1200 || local_year === 1400)
          population_quantiles[local_year] = SitesBelarusUkraineGridUtils.computeFieldQuantileStats(local_blended_field, `popc_${local_year}.png`, Math.round(local_blended_sum));
      }

      //Return statement
      return {
        hyde_year_count: hyde_years.length,
        population_quantiles: population_quantiles,
        population_series: population_series
      };
    }


    /**
     * Step F: Writes comprehensive empirical variogram, Log-Linear Residual Kriging, Wild Fields ecological envelope and urban-masked HYDE 3.5 popc interpolation metadata to config/belarus_ukraine_kriging_metadata.json.
     * @alias SitesBelarusUkraineKriging.F_writeKrigingMetadata
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_kriging_bundle
     * @param {Object} arg3_kriged_results
     * @param {Object} arg4_interp_results
     * @param {Object} [arg5_options]
     *  @param {Object} [arg5_options.config]
     *
     * @returns {Object}
     */
    static F_writeKrigingMetadata (
      arg0_mask_data,
      arg1_raion_data,
      arg2_kriging_bundle,
      arg3_kriged_results,
      arg4_interp_results,
      arg5_options
    ) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let kriging_bundle = arg2_kriging_bundle;
      let kriged_results = arg3_kriged_results;
      let interp_results = arg4_interp_results;
      let options = (arg5_options) ? arg5_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let hyde_years = config.kriging_config.hyde_years;
      let kriging_models = kriging_bundle.kriging_models;
      let metadata_obj;
      let metadata_path = path.join(__dirname, config.kriging_metadata_filename);
      let period_configs = config.periods;
      let period_wls_betas = kriged_results.period_wls_betas || {};
      let variogram_models = {};

      for (let i = 0; i < period_configs.length; i++) {
        let local_m = kriging_models[period_configs[i].key];
        let local_pkey = period_configs[i].key;

        variogram_models[local_pkey] = {
          active_raion_count: local_m.active_raion_count,
          c0_nugget: Number(local_m.c0_nugget.toFixed(6)),
          c1_short_sill: Number(local_m.c1_short_sill.toFixed(6)),
          c1_weight: Number(local_m.c1_weight.toFixed(4)),
          c2_meso_sill: Number(local_m.c2_meso_sill.toFixed(6)),
          c2_weight: Number(local_m.c2_weight.toFixed(4)),
          centroid_variance_restoration: Number(local_m.centroid_variance_restoration.toFixed(4)),
          empirical_gammas: local_m.empirical_gammas.map((v) => Number(v.toFixed(6))),
          empirical_u_lags: local_m.empirical_u_lags.map((v) => Number(v.toFixed(3))),
          eta_nugget_ratio: Number(local_m.eta_nugget_ratio.toFixed(4)),
          gls_mean: Number(local_m.gls_mean.toFixed(5)),
          residual_kriging_wls_betas: period_wls_betas[local_pkey] || null,
          sample_variance: Number(local_m.sample_variance.toFixed(6)),
          tau1_dimensionless: Number(local_m.tau1_dimensionless.toFixed(4)),
          tau2_dimensionless: Number(local_m.tau2_dimensionless.toFixed(4)),
          total_sill: Number(local_m.total_sill.toFixed(6)),
          total_sites: local_m.total_sites
        };
      }

      metadata_obj = {
        cutoff_year: hyde_years[hyde_years.length - 1],
        empirical_anchoring: {
          base_dasymetric_source: "HYDE 3.5 popc (rasters_scaled_to_global/popc_<year>.png, 0 to 1400 AD) with population_c14bazAAR urban-settlement masking and Wild Fields steppe ecological envelope",
          covariance_kernel: "2D Paciorek-Schervish non-stationary differentiable Matérn (nu = 3/2) correlation kernel with Projected Gauss-Seidel Non-Negative Dual Kriging",
          cross_frontier_continuity: "Russian & Crimean intermediate conditioning raions within 250 km (sites_IA_RAS) + two-stage C1 raised-cosine and cross-border dasymetric kernel blur",
          density_transform: "Freeman-Tukey / Anscombe variance-stabilising square-root site density Z_{k,p} = sqrt(lambda_{k,p})",
          median_voronoi_area_km2: Number(raion_data.median_voronoi_area_km2.toFixed(2)),
          nugget_derivation: "Matheron (1962) empirical variogram zero-lag linear intercept c_0 / (sill - c_0)",
          oblast_shrinkage: "Ecologically conditioned Clayton-Kaldor / Cressie (1993) hierarchical Empirical Bayes spatial-neighbourhood oblast survey-completeness shrinkage",
          residual_kriging_trend: "Parameter-free Log-Linear Residual Kriging coupling sub_iso_cr.asc de-cliffed urban-masked HYDE 3.5 popc habitation u_hab(x) with Climber3 suitability maxln_cr.asc and WWF forest/forest-steppe envelope forest_wwf_cr.asc",
          unspecified_allocation: "Ecologically conditioned Empirical Bayes Dirichlet-Multinomial raion-oblast dated period share allocation",
          variogram_estimator: "Matheron (1962) exact method-of-moments semivariogram with Zhang-Cressie WLS structural weights"
        },
        generated_at_gmt0: new Date().toISOString(),
        geographic_scope: {
          belarus_cells_included: mask_data.belarus_cell_count,
          crimea_cells_excluded: mask_data.crimea_excluded_count,
          description: "Modern Belarus (BLR) and mainland Ukraine (UKR, excluding Crimea, which is covered in sites_IA_RAS).",
          domestic_raions_used: raion_data.domestic_raion_count,
          frontier_conditioning_raions_used: raion_data.frontier_raion_count,
          grid_dimensions: [mask_data.grid_width, mask_data.grid_height],
          regular_raions_used: raion_data.raion_count,
          total_land_area_km2: mask_data.total_land_area_km2,
          ukraine_mainland_cells_included: mask_data.ukraine_cell_count,
          unspecified_subregions_reallocated: raion_data.unspec_subregion_count,
          valid_land_cells: mask_data.valid_cell_count
        },
        kriged_raster_stats: kriged_results.kriged_stats,
        kriged_rasters_subfolder: config.output_kriged_rasters_subfolder,
        population_quantile_diagnostics: interp_results.population_quantiles,
        population_rasters_subfolder: config.output_population_rasters_subfolder,
        population_substrata_series: interp_results.population_series,
        start_year: hyde_years[0],
        variogram_models: variogram_models
      };

      fs.writeFileSync(metadata_path, JSON.stringify(metadata_obj, null, 2), "utf8");

      //Return statement
      return metadata_obj;
    }


    /**
     * Loads the JSON5 configuration file for sites_belarus_ukraine.
     * @alias SitesBelarusUkraineKriging.loadConfig
     *
     * @returns {Object}
     */
    static loadConfig () {
      //Return statement
      return JSON5.parse(fs.readFileSync(this.CONFIG_PATH, "utf8"));
    }


    /**
     * Executes the complete A_ through F_ Empirical Matérn (nu = 3/2) Log-Linear Residual Kriging and urban-masked HYDE 3.5 popc interpolation pipeline (0 to 1400 AD).
     * @alias SitesBelarusUkraineKriging.runPipeline
     *
     * @param {Object} [arg0_options]
     *
     * @returns {Object}
     */
    static runPipeline (arg0_options) {
      //Convert from parameters
      let options = (arg0_options) ? arg0_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let interp_results;
      let kriged_results;
      let kriging_bundle;
      let mask_data;
      let metadata_obj;
      let raion_data;
      let start_ms = Date.now();

      console.log("[SitesBelarusUkraineKriging] Step A: Building Belarus + mainland Ukraine (excl. Crimea) 5-arcminute land mask...");
      mask_data = this.A_buildBelarusUkraineMask({ config: config });
      console.log(`  -> Valid land cells: ${mask_data.valid_cell_count} (${mask_data.total_land_area_km2.toLocaleString()} km2), Belarus cells: ${mask_data.belarus_cell_count}, Mainland Ukraine cells: ${mask_data.ukraine_cell_count}, Crimea cells excluded: ${mask_data.crimea_excluded_count}`);

      console.log("[SitesBelarusUkraineKriging] Step B: Loading Belarus & Ukraine GeoJSON observations + Russian frontier conditioning raions...");
      raion_data = this.B_loadRaionObservations(mask_data, { config: config });
      console.log(`  -> Domestic ADM2 raions: ${raion_data.domestic_raion_count}, Russian frontier conditioning raions: ${raion_data.frontier_raion_count}, total: ${raion_data.raion_count}`);

      console.log("[SitesBelarusUkraineKriging] Step C: Fitting Matheron empirical variograms and solving Non-Negative Matérn (nu = 3/2) Dual Kriging systems...");
      kriging_bundle = this.C_fitVariogramsAndSolveKriging(raion_data, { config: config });
      console.log(`  -> Empirical dimensionless Matérn scales: tau1 = ${kriging_bundle.tau1_dimensionless.toFixed(3)}, tau2 = ${kriging_bundle.tau2_dimensionless.toFixed(3)}`);

      console.log("[SitesBelarusUkraineKriging] Step D: Generating 12 Log-Linear Residual Kriging rasters with cross-frontier dasymetric blending in 1.kriged_rasters/...");
      kriged_results = this.D_generateKrigedRasters(mask_data, raion_data, kriging_bundle, { config: config });

      console.log("[SitesBelarusUkraineKriging] Step E: Generating 15 Log-Linear Residual Kriging population rasters (0 to 1400 AD, HYDE 3.5 urban-masked popc) in 2.population_rasters/...");
      interp_results = this.E_interpolateSubstrataPopulationRasters(mask_data, raion_data, kriged_results, { config: config });

      console.log("[SitesBelarusUkraineKriging] Step F: Writing kriging and interpolation metadata...");
      metadata_obj = this.F_writeKrigingMetadata(
        mask_data,
        raion_data,
        kriging_bundle,
        kriged_results,
        interp_results,
        { config: config }
      );

      console.log(`[SitesBelarusUkraineKriging] Pipeline completed in ${((Date.now() - start_ms)/1000).toFixed(2)}s.`);

      //Return statement
      return metadata_obj;
    }
  };
}

module.exports = global.SitesBelarusUkraineKriging;

//CLI entry point
if (require.main === module) {
  SitesBelarusUkraineKriging.runPipeline();
}

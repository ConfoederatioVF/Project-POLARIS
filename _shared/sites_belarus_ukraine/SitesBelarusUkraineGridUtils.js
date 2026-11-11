//Import modules
let path = require("path");
let SitesBelarusUkraineFrontierUtils = require("./SitesBelarusUkraineFrontierUtils.js");

//Initialise functions
{
  /**
   * Non-Negative Dual Kriging solver, pre-Mongol Forest/Forest-Steppe vs Wild Fields ecological habitation envelope, HYDE 3.5 sub_iso_cr.asc administrative de-cliffing and Log-Linear Residual Kriging covariate regression engine for the Belarus and mainland Ukraine (Kievan Rus) archaeological Kriging pipeline (c. 1 AD to 1400 AD).
   *
   * @class SitesBelarusUkraineGridUtils
   * @extends SitesBelarusUkraineFrontierUtils
   */
  global.SitesBelarusUkraineGridUtils = class extends SitesBelarusUkraineFrontierUtils {
    /**
     * Computes the composite de-cliffed HYDE 3.5 (urban-masked) habitation field u_hab(x) for an archaeological period by averaging across the HYDE benchmark years within its documented date range (clamped to [0, 1400] AD), applying the Wild Fields steppe envelope to post-Iron-Age settled periods.
     * @alias SitesBelarusUkraineGridUtils.computeCompositeHabitationField
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_bio_covs
     * @param {Object} arg3_period_config
     * @param {Object} arg4_config
     * @param {Map} arg5_hab_cache
     *
     * @returns {Float32Array}
     */
    static computeCompositeHabitationField (
      arg0_mask_data,
      arg1_raion_data,
      arg2_bio_covs,
      arg3_period_config,
      arg4_config,
      arg5_hab_cache
    ) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let bio_covs = arg2_bio_covs;
      let period_config = arg3_period_config;
      let config = arg4_config;
      let hab_cache = arg5_hab_cache;

      //Declare local instance variables
      let apply_steppe_env = true;
      let composite_hab = new Float32Array(mask_data.valid_cell_count);
      let hyde_years = config.kriging_config.hyde_years;
      let matched_years = [];
      let n_valid = mask_data.valid_cell_count;
      let rep_years = [];
      let settled_keys = config.kriging_config.steppe_settled_period_keys || [
        "iron_age",
        "migration_period",
        "middle_ages",
        "early_modern_17_18c",
        "modern"
      ];

      if (period_config.key && period_config.key !== "unspecified")
        apply_steppe_env = (settled_keys.indexOf(period_config.key) >= 0);

      if (period_config.approx_start_year !== null && period_config.approx_end_year !== null)
        for (let i = 0; i < hyde_years.length; i++)
          if (hyde_years[i] >= period_config.approx_start_year && hyde_years[i] <= period_config.approx_end_year)
            matched_years.push(hyde_years[i]);

      if (matched_years.length === 0)
        if (period_config.approx_end_year !== null && period_config.approx_end_year <= hyde_years[0]) {
          matched_years = [hyde_years[0]];
        } else if (period_config.approx_start_year !== null && period_config.approx_start_year >= hyde_years[hyde_years.length - 1]) {
          matched_years = [hyde_years[hyde_years.length - 1]];
        } else {
          matched_years = [0, 700, 1200];
        }

      rep_years.push(matched_years[0]);
      if (matched_years.length > 2)
        rep_years.push(matched_years[Math.floor(matched_years.length/2)]);
      if (matched_years.length > 1)
        rep_years.push(matched_years[matched_years.length - 1]);

      for (let i = 0; i < rep_years.length; i++) {
        let local_u_hab = this.computeDeCliffedHabitationField(
          mask_data,
          raion_data,
          bio_covs,
          rep_years[i],
          config,
          hab_cache,
          apply_steppe_env
        );

        for (let x = 0; x < n_valid; x++)
          composite_hab[x] += local_u_hab[x]/rep_years.length;
      }

      //Return statement
      return composite_hab;
    }


    /**
     * Computes the seamless, within-partition de-cliffed Freeman-Tukey HYDE 3.5 rural habitation amplitude field u_hab,t(x) for a given benchmark year (with urban settlements masked and inpainted via the population_c14bazAAR methodology), eliminating subnational (sub_iso_cr.asc) scaling cliffs across Donbas and weighting by the pre-modern Forest/Forest-Steppe vs Wild Fields ecological habitation envelope.
     * @alias SitesBelarusUkraineGridUtils.computeDeCliffedHabitationField
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_bio_covs
     * @param {number} arg3_year
     * @param {Object} arg4_config
     * @param {Map} [arg5_hab_cache]
     * @param {boolean} [arg6_apply_steppe_envelope=true]
     *
     * @returns {Float32Array}
     */
    static computeDeCliffedHabitationField (
      arg0_mask_data,
      arg1_raion_data,
      arg2_bio_covs,
      arg3_year,
      arg4_config,
      arg5_hab_cache,
      arg6_apply_steppe_envelope
    ) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let bio_covs = arg2_bio_covs;
      let year = arg3_year;
      let config = arg4_config;
      let hab_cache = arg5_hab_cache;
      let apply_steppe = (arg6_apply_steppe_envelope !== undefined) ? arg6_apply_steppe_envelope : true;

      //Declare local instance variables
      let cache_key = `${year}_${apply_steppe ? "settled" : "raw"}`;
      let cell_area = mask_data.cell_land_area;
      let cell_raion = raion_data.cell_nearest_raion;
      let decliffed_d;
      let f_hab_smooth;
      let hab_ind = new Float32Array(mask_data.valid_cell_count);
      let hyde_rur;
      let n_valid = mask_data.valid_cell_count;
      let part_cnt = new Int32Array(bio_covs.partition_count);
      let part_id = bio_covs.part_id;
      let part_sum = new Float64Array(bio_covs.partition_count);
      let raion_has_hab = new Uint8Array(raion_data.raion_count);
      let raw_sqrt_d = new Float32Array(mask_data.valid_cell_count);
      let steppe_env = bio_covs.steppe_envelope;
      let u_hab = new Float32Array(mask_data.valid_cell_count);

      //Guard clause if already cached
      if (hab_cache && hab_cache.has(cache_key)) return hab_cache.get(cache_key);

      hyde_rur = this.loadUrbanMaskedHYDEPopcRaster(mask_data, year, hab_cache, config);

      for (let i = 0; i < n_valid; i++)
        if (hyde_rur[i] > 0)
          raion_has_hab[cell_raion[i]] = 1;

      for (let i = 0; i < n_valid; i++) {
        let local_area = Math.max(1, cell_area[i]);
        let local_d = hyde_rur[i]/local_area;
        let local_r = cell_raion[i];

        if (local_d <= 0 && raion_has_hab[local_r] === 0 && bio_covs.raion_has_any_sites[local_r] === 1)
          local_d = bio_covs.hyde_rur_1400[i]/local_area;

        if (local_d < 0.002 && bio_covs.raion_has_any_sites[local_r] === 0)
          local_d = 0;

        if (local_d > 0) {
          let local_pid = part_id[i];
          let local_s = Math.sqrt(local_d);

          hab_ind[i] = 1;
          raw_sqrt_d[i] = local_s;
          part_cnt[local_pid]++;
          part_sum[local_pid] += local_s;
        }
      }

      //Stage 1: Within-partition local positive normalisation and C2 Wild Fields ecological envelope weighting (strictly zero on uninhabited cells)
      let steppe_w = (year <= 1600) ? 1.0 : ((year >= 1800) ? 0.0 : (1800 - year)/200);

      f_hab_smooth = this.smoothValidFieldOnGrid(mask_data, hab_ind, Math.max(1, bio_covs.catchment_px));
      decliffed_d = this.smoothWithinPartitionPositive(
        mask_data,
        raw_sqrt_d,
        part_id,
        part_sum,
        part_cnt,
        Math.max(5, bio_covs.meso_px)
      );

      for (let i = 0; i < n_valid; i++)
        if (decliffed_d[i] > 0) {
          let local_env = (apply_steppe && steppe_env) ? (1 - steppe_w*(1 - steppe_env[i])) : 1;

          u_hab[i] = Math.sqrt(Math.max(0, f_hab_smooth[i]))*decliffed_d[i]*local_env;
        }

      if (hab_cache)
        hab_cache.set(cache_key, u_hab);

      //Return statement
      return u_hab;
    }


    /**
     * Fits the constrained non-negative Weighted Least Squares (WLS) covariate regression trend m_hat(x) predicting observed raion site amplitudes z_obs from [u_hab, u_hab*u_nat, u_hab*u_eco] (weighted by inhabited raion area and site count support S_k) and computes crisp 5-arcminute Log-Linear Residual Kriging weights strictly supported on inhabited cells.
     * @alias SitesBelarusUkraineGridUtils.computeResidualKrigingWeights
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_bio_covs
     * @param {Float32Array} arg3_u_hab
     * @param {Float64Array} arg4_z_obs
     * @param {number} arg5_meso_px
     * @param {Float64Array} [arg6_s_obs]
     *
     * @returns {Object}
     */
    static computeResidualKrigingWeights (
      arg0_mask_data,
      arg1_raion_data,
      arg2_bio_covs,
      arg3_u_hab,
      arg4_z_obs,
      arg5_meso_px,
      arg6_s_obs
    ) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let bio_covs = arg2_bio_covs;
      let u_hab = arg3_u_hab;
      let z_obs = arg4_z_obs;
      let meso_px = arg5_meso_px;
      let s_obs = arg6_s_obs;

      //Declare local instance variables
      let beta = new Float64Array(3);
      let cell_area = mask_data.cell_land_area;
      let cell_raion = raion_data.cell_nearest_raion;
      let drift_var = 0;
      let kappa_drift = 0.5;
      let m_cell = new Float32Array(mask_data.valid_cell_count);
      let m_macro;
      let n_covs = 3;
      let n_raions = raion_data.raion_count;
      let n_valid = mask_data.valid_cell_count;
      let r_eco_mean = new Float64Array(raion_data.raion_count);
      let r_hab_area = new Float64Array(raion_data.raion_count);
      let r_hab_mean = new Float64Array(raion_data.raion_count);
      let r_nat_mean = new Float64Array(raion_data.raion_count);
      let resid_var = 0;
      let total_hab_w = 0;
      let u_eco = bio_covs.u_eco;
      let u_nat = bio_covs.u_nat;
      let weights = new Float32Array(mask_data.valid_cell_count);
      let w_m_mean = 0;
      let xtx = new Float64Array(9);
      let xty = new Float64Array(3);

      //Aggregate inhabited covariate means per domestic raion catchment
      for (let i = 0; i < n_valid; i++) {
        let local_uh = u_hab[i];

        if (local_uh <= 0) continue;

        let local_a = cell_area[i];
        let local_r = cell_raion[i];

        r_hab_area[local_r] += local_a;
        r_hab_mean[local_r] += local_a*local_uh;
        r_nat_mean[local_r] += local_a*local_uh*u_nat[i];
        r_eco_mean[local_r] += local_a*local_uh*u_eco[i];
      }

      for (let i = 0; i < n_raions; i++) {
        let local_ha = r_hab_area[i];

        if (local_ha > 0) {
          r_hab_mean[i] /= local_ha;
          r_nat_mean[i] /= local_ha;
          r_eco_mean[i] /= local_ha;
        }
      }

      //Assemble normal equations X^T W X * beta = X^T W z_obs weighted by inhabited raion area and site count support S_k
      for (let i = 0; i < n_raions; i++) {
        let local_sk = (s_obs && s_obs[i] > 0) ? s_obs[i] : 0;
        let local_w = r_hab_area[i]*(1 + Math.sqrt(local_sk));

        if (local_w <= 0) continue;

        let local_xvec = [r_hab_mean[i], r_nat_mean[i], r_eco_mean[i]];
        let local_y = z_obs[i];

        for (let x = 0; x < n_covs; x++) {
          xty[x] += local_w*local_xvec[x]*local_y;
          for (let y = 0; y < n_covs; y++)
            xtx[x*n_covs + y] += local_w*local_xvec[x]*local_xvec[y];
        }
      }

      //Projected Gauss-Seidel Non-Negative Least Squares (NNLS) solver for beta >= 1e-4
      for (let i = 0; i < 400; i++)
        for (let x = 0; x < n_covs; x++) {
          let local_diag = xtx[x*n_covs + x];
          let local_rhs = xty[x];

          for (let y = 0; y < n_covs; y++)
            if (y !== x)
              local_rhs -= xtx[x*n_covs + y]*beta[y];

          beta[x] = (local_diag > 1e-12) ? Math.max(1e-4, local_rhs/local_diag) : 1e-4;
        }

      //Compute empirical drift vs residual standard deviations across raions to derive parameter-free precision weight kappa
      for (let i = 0; i < n_raions; i++) {
        let local_sk = (s_obs && s_obs[i] > 0) ? s_obs[i] : 0;
        let local_w = r_hab_area[i]*(1 + Math.sqrt(local_sk));

        if (local_w <= 0) continue;

        let local_m_k = beta[0]*r_hab_mean[i] + beta[1]*r_nat_mean[i] + beta[2]*r_eco_mean[i];

        w_m_mean += local_w*local_m_k;
        total_hab_w += local_w;
      }
      w_m_mean = (total_hab_w > 0) ? w_m_mean/total_hab_w : 0;

      for (let i = 0; i < n_raions; i++) {
        let local_sk = (s_obs && s_obs[i] > 0) ? s_obs[i] : 0;
        let local_w = r_hab_area[i]*(1 + Math.sqrt(local_sk));

        if (local_w <= 0) continue;

        let local_m_k = beta[0]*r_hab_mean[i] + beta[1]*r_nat_mean[i] + beta[2]*r_eco_mean[i];
        let local_dm = local_m_k - w_m_mean;
        let local_dr = z_obs[i] - local_m_k;

        drift_var += local_w*local_dm*local_dm;
        resid_var += local_w*local_dr*local_dr;
      }

      {
        let local_sd_m = Math.sqrt(Math.max(1e-12, drift_var/Math.max(1, total_hab_w)));
        let local_sd_r = Math.sqrt(Math.max(1e-12, resid_var/Math.max(1, total_hab_w)));

        kappa_drift = local_sd_m/(local_sd_m + local_sd_r);
      }

      //Evaluate 5-arcminute covariate regression trend m_hat(x) on all inhabited cells
      {
        let local_bsum = Math.max(1e-8, beta[0] + beta[1] + beta[2]);
        let local_b0 = 0.50*(beta[0]/local_bsum) + 0.22;
        let local_b1 = 0.50*(beta[1]/local_bsum) + 0.20;
        let local_b2 = 0.50*(beta[2]/local_bsum) + 0.08;

        for (let i = 0; i < n_valid; i++)
          if (u_hab[i] > 0)
            m_cell[i] = u_hab[i]*(local_b0 + local_b1*u_nat[i] + local_b2*u_eco[i]);
      }

      //Evaluate meso-scale positive-cell regional mean m_macro(x) at tightened scale
      m_macro = this.smoothPositiveFieldOnGrid(mask_data, m_cell, Math.max(4, Math.round(0.75*meso_px)));

      for (let i = 0; i < n_valid; i++)
        if (m_cell[i] > 0 && m_macro[i] > 0) {
          let local_ratio = Math.min(3.2, m_cell[i]/m_macro[i]);

          weights[i] = Math.pow(local_ratio, 2.25);
        }

      //Return statement
      return {
        beta: [
          Number(beta[0].toFixed(6)),
          Number(beta[1].toFixed(6)),
          Number(beta[2].toFixed(6))
        ],
        kappa_drift: Number(kappa_drift.toFixed(4)),
        weights: weights
      };
    }


    /**
     * Loads and precomputes the static biophysical covariates (CLIMBER-3 maxln cultivable suitability u_nat, WWF forest-steppe ecotone suitability u_eco, empirical Wild Fields steppe ecological envelope steppe_envelope, sub_iso_cr.asc partition IDs and 1400 AD urban-masked HYDE 3.5 fallback rural habitation).
     * @alias SitesBelarusUkraineGridUtils.loadBiophysicalCovariates
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_raion_data
     * @param {Object} arg2_config
     * @param {number} arg3_meso_px
     *
     * @returns {Object}
     */
    static loadBiophysicalCovariates (arg0_mask_data, arg1_raion_data, arg2_config, arg3_meso_px) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let raion_data = arg1_raion_data;
      let config = arg2_config;
      let meso_px = arg3_meso_px;

      //Declare local instance variables
      let catchment_px = raion_data.catchment_smooth_radius_px;
      let cov_paths = config.kriging_config.covariate_paths;
      let eps_steppe = 0.22;
      let f_ecotone_smooth;
      let f_forest_smooth;
      let f_pass1;
      let f_pass2;
      let f_raw = new Float32Array(mask_data.valid_cell_count);
      let forest_area = 0;
      let forest_grid;
      let forest_zsum = 0;
      let hyde_rur_1400;
      let maxln_grid;
      let mda_mask = new Uint8Array(mask_data.grid_width*mask_data.grid_height);
      let mean_maxln = 0;
      let n_raions = raion_data.raion_count;
      let n_valid = mask_data.valid_cell_count;
      let next_pid = 1;
      let part_id = new Int32Array(mask_data.valid_cell_count);
      let part_map = new Map();
      let period_configs = config.periods;
      let raion_has_any_sites = new Uint8Array(raion_data.raion_count);
      let raion_list = raion_data.raion_list;
      let root = mask_data.project_root;
      let steppe_area = 0;
      let steppe_envelope = new Float32Array(mask_data.valid_cell_count);
      let steppe_zsum = 0;
      let sub_iso_grid;
      let total_pixels = mask_data.grid_width*mask_data.grid_height;
      let u_eco = new Float32Array(mask_data.valid_cell_count);
      let u_nat = new Float32Array(mask_data.valid_cell_count);
      let u_nat_smooth;
      let valid_indices = mask_data.valid_indices;

      sub_iso_grid = this.readAscGrid(path.join(root, cov_paths.sub_iso_asc), total_pixels);
      maxln_grid = this.readAscGrid(path.join(root, cov_paths.maxln_asc), total_pixels);
      forest_grid = this.readAscGrid(path.join(root, cov_paths.forest_asc), total_pixels);

      for (let i = 0; i < total_pixels; i++) {
        let local_iso = Math.floor(Math.round(sub_iso_grid[i])/1000);
        let local_lat = 90 - (Math.floor(i/mask_data.grid_width) + 0.5)*(180/mask_data.grid_height);
        let local_lon = -180 + ((i % mask_data.grid_width) + 0.5)*(360/mask_data.grid_width);

        if (
          mask_data.mask_grid[i] === 0 &&
          mask_data.land_area_grid[i] > 0 &&
          local_lat >= 44.0 &&
          local_lat <= 57.5 &&
          local_lon >= 20.5 &&
          local_lon <= 31.5 &&
          (
            (mask_data.mda_geocode_mask && mask_data.mda_geocode_mask[i] === 1) ||
            local_iso === 498 ||
            local_iso === 642 ||
            local_iso === 348 ||
            local_iso === 703 ||
            local_iso === 616 ||
            local_iso === 440 ||
            local_iso === 428 ||
            local_iso === 233
          )
        ) mda_mask[i] = 1;
      }

      hyde_rur_1400 = this.loadUrbanMaskedHYDEPopcRaster(mask_data, 1400, null, config);

      for (let i = 0; i < n_raions; i++) {
        let local_r = raion_list[i];

        for (let x = 0; x < period_configs.length; x++)
          if ((local_r.periods[period_configs[x].key] || 0) > 0) {
            raion_has_any_sites[i] = 1;
            break;
          }

        if (!local_r.is_frontier_buffer) {
          let local_a = local_r.effective_area_km2;
          let local_fw = (local_r.wooded_frac !== undefined) ? local_r.wooded_frac : 1;
          let local_s = local_r.raw_periods.middle_ages || 0;
          let local_z = Math.sqrt(Math.max(0, local_s/Math.max(1, local_a)));

          if (local_fw >= 0.5) {
            forest_area += local_a;
            forest_zsum += local_a*local_z;
          } else if (local_fw <= 0.05 && local_r.oblast_id !== 9124 && local_r.oblast_id !== 9125 && local_r.oblast_id !== 9118) {
            steppe_area += local_a;
            steppe_zsum += local_a*local_z;
          }
        }
      }

      if (forest_area > 0 && steppe_area > 0) {
        let local_zf = forest_zsum/forest_area;
        let local_zs = steppe_zsum/steppe_area;

        if (local_zf > 1e-6)
          eps_steppe = Math.max(0.22, Math.min(0.32, Math.sqrt(local_zs/local_zf)));
      }

      //Define partition ID from sub_iso_cr.asc so HYDE 3.5 administrative boundaries are de-cliffed without inverting riparian gallery forests
      for (let i = 0; i < n_valid; i++) {
        let local_f = (forest_grid[valid_indices[i]] > 0) ? 1 : 0;
        let local_gidx = valid_indices[i];
        let local_lat = 90 - (Math.floor(local_gidx/mask_data.grid_width) + 0.5)*(180/mask_data.grid_height);
        let local_lon = -180 + ((local_gidx % mask_data.grid_width) + 0.5)*(360/mask_data.grid_width);
        let local_p = Math.round(sub_iso_grid[local_gidx]);
        let local_pid = part_map.get(local_p);

        if (!local_pid) {
          local_pid = next_pid++;
          part_map.set(local_p, local_pid);
        }
        part_id[i] = local_pid;

        //Treat the Carpathian-Podolian-Moldovan corridor (lon < 29.8E or lat >= 47.4N & lon < 30.5E) as settled agricultural territory
        f_raw[i] = (local_f > 0 || local_lon < 29.8 || (local_lat >= 47.4 && local_lon < 30.5)) ? 1 : 0;
        mean_maxln += Math.pow(Math.max(0, maxln_grid[local_gidx]), 0.80);
      }
      mean_maxln = Math.max(1e-4, mean_maxln/n_valid);

      for (let i = 0; i < n_valid; i++)
        u_nat[i] = Math.pow(Math.max(0, maxln_grid[valid_indices[i]]), 0.80)/mean_maxln;

      //3-pass separable Gaussian-like smoothing of forest_wwf_cr.asc so the Forest-Steppe to Wild Fields ecological transition is C2-continuous over ~220 km with zero 1-pixel edges
      f_ecotone_smooth = this.smoothValidFieldOnGrid(mask_data, f_raw, 4*catchment_px);
      f_pass1 = this.smoothValidFieldOnGrid(mask_data, f_raw, Math.max(10, 2*meso_px));
      f_pass2 = this.smoothValidFieldOnGrid(mask_data, f_pass1, Math.max(10, 2*meso_px));
      f_forest_smooth = this.smoothValidFieldOnGrid(mask_data, f_pass2, Math.max(8, meso_px));
      u_nat_smooth = this.smoothValidFieldOnGrid(mask_data, u_nat, Math.max(6, meso_px));

      for (let i = 0; i < n_valid; i++) {
        let local_ec = f_ecotone_smooth[i];
        let local_env;
        let local_ff = Math.max(0, Math.min(1, f_forest_smooth[i]));
        let local_hermite = local_ff*local_ff*(3 - 2*local_ff);
        let local_wood = 0.85*local_hermite + 0.15*Math.min(1, 0.75*u_nat_smooth[i]);

        local_env = eps_steppe + (1 - eps_steppe)*local_wood;
        steppe_envelope[i] = local_env;
        u_eco[i] = 4*local_ec*(1 - local_ec);
      }

      //Return statement
      return {
        catchment_px: catchment_px,
        eps_steppe: Number(eps_steppe.toFixed(4)),
        f_forest_smooth: f_forest_smooth,
        hyde_rur_1400: hyde_rur_1400,
        mda_mask: mda_mask,
        meso_px: meso_px,
        part_id: part_id,
        partition_count: next_pid,
        raion_has_any_sites: raion_has_any_sites,
        stad_rur_1900: hyde_rur_1400,
        steppe_envelope: steppe_envelope,
        sub_iso_grid: sub_iso_grid,
        u_eco: u_eco,
        u_nat: u_nat
      };
    }


    /**
     * Solves the symmetric positive-definite Dual Kriging system (C + eta*I) * w = z_adj subject to non-negativity (w >= 0) via Cholesky warm-start followed by Projected Gauss-Seidel sweeps, preventing negative-weight truncation from inflating regions with sparse/imputed observations.
     * @alias SitesBelarusUkraineGridUtils.solveNonNegativeDualKriging
     *
     * @param {Float64Array} arg0_cov_matrix
     * @param {Float64Array} arg1_chol_L
     * @param {Float64Array} arg2_z_adj
     * @param {number} arg3_n_raions
     *
     * @returns {Float32Array}
     */
    static solveNonNegativeDualKriging (arg0_cov_matrix, arg1_chol_L, arg2_z_adj, arg3_n_raions) {
      //Convert from parameters
      let cov_matrix = arg0_cov_matrix;
      let chol_L = arg1_chol_L;
      let z_adj = arg2_z_adj;
      let n_raions = arg3_n_raions;

      //Declare local instance variables
      let out_w = new Float32Array(n_raions);
      let v_vec = this.solveCholeskyVector(chol_L, z_adj, n_raions);
      let w_vec = new Float64Array(n_raions);

      for (let i = 0; i < n_raions; i++)
        w_vec[i] = Math.max(0, v_vec[i]);

      //Projected Gauss-Seidel sweeps so (C + eta*I)*w = z_adj holds on active constraints w_i > 0
      for (let i = 0; i < 60; i++)
        for (let x = 0; x < n_raions; x++) {
          let local_diag = cov_matrix[x*n_raions + x];
          let local_rhs = z_adj[x];
          let local_row = x*n_raions;

          for (let y = 0; y < n_raions; y++)
            if (y !== x && w_vec[y] > 0)
              local_rhs -= cov_matrix[local_row + y]*w_vec[y];

          w_vec[x] = (local_diag > 1e-12) ? Math.max(0, local_rhs/local_diag) : 0;
        }

      for (let i = 0; i < n_raions; i++)
        out_w[i] = w_vec[i];

      //Return statement
      return out_w;
    }
  };
}

module.exports = global.SitesBelarusUkraineGridUtils;

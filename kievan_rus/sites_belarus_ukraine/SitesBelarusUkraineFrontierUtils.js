//Import modules
let fs = require("fs");
let path = require("path");
let { PNG } = require("pngjs");
let SitesIARASResidualKriging = require("../../1.entire_country/sites_IA_RAS/SitesIARASResidualKriging.js");

//Initialise functions
{
  /**
   * Cross-frontier conditioning raion loader, two-stage dasymetric frontier feathering/blur engine, Empirical Bayes ecologically conditioned oblast survey-completeness harmonisation and HYDE 3.5 urban-settlement masking/inpainting utilities (population_c14bazAAR methodology) for the Belarus and mainland Ukraine (Kievan Rus) archaeological Kriging pipeline (c. 1 AD to 1400 AD).
   *
   * @class SitesBelarusUkraineFrontierUtils
   * @extends SitesIARASResidualKriging
   */
  global.SitesBelarusUkraineFrontierUtils = class extends SitesIARASResidualKriging {
    /**
     * Applies a two-stage cross-frontier dasymetric blend and kernel blur across the Belarus/Ukraine-Russia, Ukraine-Crimea and Ukraine-Moldova (Dniester & Budjak panhandle) borders so that transitions into sites_IA_RAS and Moldova's HYDE 3.5 popc are seamless.
     * @alias SitesBelarusUkraineFrontierUtils.applyDasymetricFrontierBlend
     *
     * @param {Object} arg0_mask_data
     * @param {Float32Array} arg1_valid_field
     * @param {Object} arg2_bio_covs
     * @param {string} arg3_rus_raster_path
     * @param {Object} arg4_config
     * @param {number|Object} [arg5_year_or_period]
     *
     * @returns {Float32Array}
     */
    static applyDasymetricFrontierBlend (
      arg0_mask_data,
      arg1_valid_field,
      arg2_bio_covs,
      arg3_rus_raster_path,
      arg4_config,
      arg5_year_or_period
    ) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let valid_field = arg1_valid_field;
      let bio_covs = arg2_bio_covs;
      let rus_raster_path = arg3_rus_raster_path;
      let config = arg4_config;
      let year_or_period = arg5_year_or_period;

      //Declare local instance variables
      let bfs_dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
      let bfs_head = 0;
      let bfs_queue = [];
      let blur_px = Math.max(3, (config.kriging_config.frontier_blend_blur_factor || 2)*bio_covs.catchment_px);
      let cell_area = mask_data.cell_land_area;
      let cov_paths = (config && config.kriging_config && config.kriging_config.covariate_paths) ? config.kriging_config.covariate_paths : {};
      let dist_to_rus;
      let grid_h = mask_data.grid_height;
      let grid_w = mask_data.grid_width;
      let has_rus = (rus_raster_path && fs.existsSync(rus_raster_path));
      let hyde_path;
      let hyde_year = (typeof year_or_period === "number") ? year_or_period : 1000;
      let joint_density;
      let kr_density = new Float32Array(mask_data.valid_cell_count);
      let land_area_grid = mask_data.land_area_grid;
      let macro_px = Math.max(8, (config.kriging_config.frontier_blend_macro_factor || 5)*bio_covs.catchment_px);
      let mask_grid = mask_data.mask_grid;
      let mda_grid = null;
      let mda_mask = (bio_covs && bio_covs.mda_mask) ? bio_covs.mda_mask : null;
      let mda_scale = 1;
      let n_valid = mask_data.valid_cell_count;
      let nearest_rus_gidx;
      let orig_kr_density;
      let out_field = new Float32Array(mask_data.valid_cell_count);
      let px_to_valid = mask_data.pixel_to_valid_idx;
      let rus_density_grid;
      let rus_grid = null;
      let rus_mask;
      let total_pixels = mask_data.grid_width*mask_data.grid_height;
      let valid_indices = mask_data.valid_indices;
      let win_px = Math.max(8, 4*bio_covs.catchment_px);

      if (has_rus)
        rus_grid = this.readGlobalFloat32Raster(rus_raster_path, total_pixels);

      if (mda_mask) {
        hyde_path = path.join(
          mask_data.project_root,
          cov_paths.hyde_popc_folder || "histmap/2.data_cleaning/landuse_HYDE/rasters_scaled_to_global",
          `popc_${hyde_year}.png`
        );
        if (fs.existsSync(hyde_path)) {
          let local_mod_mask = new Uint8Array(this.getModernUrbanMask(mask_data, config, null));
          let local_raw_hyde = this.readGlobalFloat32Raster(hyde_path, total_pixels);

          for (let i = 0; i < total_pixels; i++)
            if (land_area_grid[i] > 0 && local_raw_hyde[i] <= 0 && (mda_mask[i] === 1 || mask_grid[i] === 1))
              local_mod_mask[i] = 1;

          mda_grid = this.inpaintUrbanMaskGrid(
            local_raw_hyde,
            local_mod_mask,
            land_area_grid,
            null,
            grid_w,
            grid_h,
            3
          );
          if (typeof year_or_period !== "number") {
            let local_f_area = 0;
            let local_f_sum = 0;
            let local_m_area = 0;
            let local_m_sum = 0;

            for (let i = 0; i < n_valid; i++) {
              let local_gidx = valid_indices[i];
              let local_lat = 90 - (Math.floor(local_gidx/grid_w) + 0.5)*(180/grid_h);
              let local_lon = -180 + ((local_gidx % grid_w) + 0.5)*(360/grid_w);

              if (local_lat < 48.8 && local_lon < 31.2) {
                local_f_sum += valid_field[i];
                local_f_area += cell_area[i];
              }
            }
            for (let i = 0; i < total_pixels; i++)
              if (mda_mask[i] === 1 && mda_grid[i] > 0) {
                local_m_sum += mda_grid[i];
                local_m_area += land_area_grid[i];
              }
            mda_scale = (local_f_area > 0 && local_m_sum > 0) ?
              ((local_f_sum/local_f_area)/(local_m_sum/Math.max(1, local_m_area))) : 1;
          }
        }
      }

      if (!has_rus && !mda_grid) return valid_field;

      dist_to_rus = new Int16Array(total_pixels);
      dist_to_rus.fill(32000);
      joint_density = new Float32Array(total_pixels);
      nearest_rus_gidx = new Int32Array(total_pixels);
      nearest_rus_gidx.fill(-1);
      rus_density_grid = new Float32Array(total_pixels);
      rus_mask = new Uint8Array(total_pixels);

      for (let i = 0; i < n_valid; i++) {
        let local_d = valid_field[i]/Math.max(1, cell_area[i]);
        let local_gidx = valid_indices[i];

        if (mda_grid) {
          let local_lat = 90 - (Math.floor(local_gidx/grid_w) + 0.5)*(180/grid_h);
          let local_lon = -180 + ((local_gidx % grid_w) + 0.5)*(360/grid_w);

          //Couple the Budjak panhandle past the Dniester and Moldova (lat < 46.65N, lon < 30.65E) with local urban-masked HYDE 3.5 density before frontier feathering
          if (local_lat < 46.65 && local_lon < 30.65) {
            let local_hd = (mda_grid[local_gidx]*mda_scale)/Math.max(1, cell_area[i]);

            if (local_hd > 0)
              local_d = 0.30*local_d + 0.70*local_hd;
          }
        }
        kr_density[i] = local_d;
      }
      orig_kr_density = new Float32Array(kr_density);

      //Identify active Russian/Crimean frontier land pixels (1) and Moldovan HYDE 3.5 land pixels (2)
      for (let i = 0; i < total_pixels; i++)
        if (mask_grid[i] === 0 && land_area_grid[i] > 0) {
          if (rus_grid && rus_grid[i] > 0) {
            rus_mask[i] = 1;
            rus_density_grid[i] = rus_grid[i]/Math.max(1, land_area_grid[i]);
            dist_to_rus[i] = 0;
            nearest_rus_gidx[i] = i;
            bfs_queue.push(i);
          } else if (mda_mask && mda_mask[i] === 1 && mda_grid && mda_grid[i] > 0) {
            rus_mask[i] = 2;
            rus_density_grid[i] = (mda_grid[i]*mda_scale)/Math.max(1, land_area_grid[i]);
            dist_to_rus[i] = 0;
            nearest_rus_gidx[i] = i;
            bfs_queue.push(i);
          }
        }

      //Multi-source 8-connected BFS from Russian/Crimean and Moldovan pixels across Belarus/Ukraine land mask
      for (let i = 0; i < bfs_queue.length; i++) {
        let local_curr = bfs_queue[bfs_head++];
        let local_cx = local_curr % grid_w;
        let local_cy = Math.floor(local_curr/grid_w);
        let local_d = dist_to_rus[local_curr];

        if (local_d >= macro_px + 4) continue;

        for (let x = 0; x < bfs_dirs.length; x++) {
          let local_nx = local_cx + bfs_dirs[x][1];
          let local_ny = local_cy + bfs_dirs[x][0];

          if (local_nx >= 0 && local_nx < grid_w && local_ny >= 0 && local_ny < grid_h) {
            let local_nidx = local_ny*grid_w + local_nx;

            if (mask_grid[local_nidx] === 1 && dist_to_rus[local_nidx] > local_d + 1) {
              dist_to_rus[local_nidx] = local_d + 1;
              nearest_rus_gidx[local_nidx] = nearest_rus_gidx[local_curr];
              bfs_queue.push(local_nidx);
            }
          }
        }
      }

      //Stage 1: Meso-scale C1 raised-cosine frontier baseline matching
      for (let i = 0; i < n_valid; i++) {
        let local_d = dist_to_rus[valid_indices[i]];
        let local_dens = kr_density[i];
        let local_gidx = valid_indices[i];
        let local_near_idx = nearest_rus_gidx[local_gidx];
        let local_is_mda = (local_near_idx >= 0 && rus_mask[local_near_idx] === 2);
        let local_lat = 90 - (Math.floor(local_gidx/grid_w) + 0.5)*(180/grid_h);
        let local_lon = -180 + ((local_gidx % grid_w) + 0.5)*(360/grid_w);
        let local_is_budjak = (local_lat < 46.60 && local_lon < 30.60);
        let local_eff_macro = (local_is_mda || local_is_budjak) ? (macro_px + 3) : macro_px;

        if (local_d >= 1 && local_d <= local_eff_macro && local_dens > 0 && local_near_idx >= 0) {
          let local_fcx = local_near_idx % grid_w;
          let local_fcy = Math.floor(local_near_idx/grid_w);
          let local_kr_area = 0;
          let local_kr_pop = 0;
          let local_rus_area = 0;
          let local_rus_pop = 0;

          for (let x = -win_px; x <= win_px; x++) {
            let local_ny = local_fcy + x;

            if (local_ny >= 0 && local_ny < grid_h)
              for (let y = -win_px; y <= win_px; y++) {
                let local_nx = local_fcx + y;

                if (local_nx >= 0 && local_nx < grid_w) {
                  let local_widx = local_ny*grid_w + local_nx;

                  if (rus_mask[local_widx] >= 1 && rus_density_grid[local_widx] > 0) {
                    let local_a = land_area_grid[local_widx];

                    local_rus_area += local_a;
                    local_rus_pop += local_a*rus_density_grid[local_widx];
                  } else if (mask_grid[local_widx] === 1 && dist_to_rus[local_widx] <= win_px) {
                    let local_v = px_to_valid[local_widx];

                    if (local_v >= 0 && orig_kr_density[local_v] > 0) {
                      let local_a = cell_area[local_v];

                      local_kr_area += local_a;
                      local_kr_pop += local_a*orig_kr_density[local_v];
                    }
                  }
                }
              }
          }

          if (local_rus_area > 0 && local_kr_area > 0) {
            let local_alpha = 0.5*(1 + Math.cos(Math.PI*(local_d - 1)/Math.max(1, local_eff_macro)));
            let local_kr_mean = local_kr_pop/local_kr_area;
            let local_max_ratio = (local_is_budjak) ? 6.00 : ((local_is_mda && local_lat < 48.6 && local_lon > 27.0) ? 2.40 : 4.80);
            let local_ratio = (local_rus_pop/local_rus_area)/Math.max(1e-6, local_kr_mean);
            let local_clamped_ratio = Math.max(0.25, Math.min(local_max_ratio, local_ratio));

            if (local_is_budjak)
              local_alpha = Math.max(0.65, local_alpha);

            local_dens = local_dens*Math.pow(local_clamped_ratio, local_alpha);
          }
        }

        kr_density[i] = local_dens;
        joint_density[local_gidx] = local_dens;
      }

      for (let i = 0; i < total_pixels; i++)
        if (rus_mask[i] >= 1)
          joint_density[i] = rus_density_grid[i];

      //Stage 2: Cross-frontier 2D dasymetric kernel blur + immediate boundary continuity across the joint Belarus/Ukraine + Russia/Crimea + Moldova grid
      for (let i = 0; i < n_valid; i++) {
        let local_d = dist_to_rus[valid_indices[i]];
        let local_dens = kr_density[i];
        let local_gidx = valid_indices[i];

        if (local_d >= 1 && local_d <= blur_px && local_dens > 0) {
          let local_beta = 0.5*(1 + Math.cos(Math.PI*(local_d - 1)/Math.max(1, blur_px)));
          let local_cx = local_gidx % grid_w;
          let local_cy = Math.floor(local_gidx/grid_w);
          let local_k_rad = 6;
          let local_rus_w_sum = 0;
          let local_rus_wd_sum = 0;
          let local_w_sum = 0;
          let local_wd_sum = 0;

          for (let x = -local_k_rad; x <= local_k_rad; x++) {
            let local_ny = local_cy + x;

            if (local_ny >= 0 && local_ny < grid_h)
              for (let y = -local_k_rad; y <= local_k_rad; y++) {
                let local_nx = local_cx + y;

                if (local_nx >= 0 && local_nx < grid_w) {
                  let local_nidx = local_ny*grid_w + local_nx;
                  let local_nd = joint_density[local_nidx];

                  if (local_nd > 0 && (mask_grid[local_nidx] === 1 || rus_mask[local_nidx] >= 1)) {
                    let local_w = 1/(1 + 0.30*(x*x + y*y));

                    local_w_sum += local_w;
                    local_wd_sum += local_w*local_nd;

                    if (rus_mask[local_nidx] >= 1) {
                      local_rus_w_sum += local_w;
                      local_rus_wd_sum += local_w*local_nd;
                    }
                  }
                }
              }
          }

          if (local_w_sum > 0) {
            let local_blur_d = local_wd_sum/local_w_sum;
            let local_rus_near = (local_rus_w_sum > 0) ? (local_rus_wd_sum/local_rus_w_sum) : local_blur_d;
            let local_target_d = 0.55*local_rus_near + 0.45*local_blur_d;
            let local_mix = 0.92*local_beta;

            local_dens = (1 - local_mix)*local_dens + local_mix*local_target_d;
          }
        }

        out_field[i] = local_dens*cell_area[i];
      }

      //Return statement
      return out_field;
    }


    /**
     * Builds or retrieves the cached 1-pixel buffered modern urban settlement mask from HYDE 3.5 uopp_2023AD.png (uopp > 10,0 km2), matching GeoPNG.getModernUrbanMask in population_c14bazAAR.
     * @alias SitesBelarusUkraineFrontierUtils.getModernUrbanMask
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_config
     * @param {Map} [arg2_cache]
     *
     * @returns {Uint8Array}
     */
    static getModernUrbanMask (arg0_mask_data, arg1_config, arg2_cache) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let config = arg1_config;
      let cache = arg2_cache;

      //Guard clause if already cached
      if (cache && cache.has("__modern_urban_mask__")) return cache.get("__modern_urban_mask__");

      //Declare local instance variables
      let buffer_radius = (config.kriging_config.covariate_paths.urban_mask_buffer_radius !== undefined) ?
        config.kriging_config.covariate_paths.urban_mask_buffer_radius : 1;
      let cov_paths = config.kriging_config.covariate_paths;
      let dilated_mask;
      let grid_h = mask_data.grid_height;
      let grid_w = mask_data.grid_width;
      let raw_mask = new Uint8Array(mask_data.grid_width*mask_data.grid_height);
      let total_pixels = mask_data.grid_width*mask_data.grid_height;
      let uopp_grid;
      let uopp_path = path.join(mask_data.project_root, cov_paths.hyde_uopp_raster);
      let uopp_threshold = (cov_paths.urban_uopp_threshold !== undefined) ? cov_paths.urban_uopp_threshold : 10.0;

      uopp_grid = this.readGlobalFloat32Raster(uopp_path, total_pixels);
      for (let i = 0; i < total_pixels; i++)
        if (uopp_grid[i] > uopp_threshold)
          raw_mask[i] = 1;

      if (buffer_radius <= 0) {
        if (cache) cache.set("__modern_urban_mask__", raw_mask);
        return raw_mask;
      }

      dilated_mask = new Uint8Array(total_pixels);
      for (let i = 0; i < grid_h; i++)
        for (let x = 0; x < grid_w; x++)
          if (raw_mask[i*grid_w + x] === 1)
            for (let y = -buffer_radius; y <= buffer_radius; y++) {
              let local_ny = i + y;

              if (local_ny >= 0 && local_ny < grid_h)
                for (let z = -buffer_radius; z <= buffer_radius; z++) {
                  let local_nx = (x + z + grid_w) % grid_w;

                  dilated_mask[local_ny*grid_w + local_nx] = 1;
                }
            }

      if (cache)
        cache.set("__modern_urban_mask__", dilated_mask);

      //Return statement
      return dilated_mask;
    }


    /**
     * Inpaints masked urban settlement pixels over habitable land using inverse-distance weighted (IDW) boundary interpolation from surrounding unmasked rural pixels, exactly matching GeoPNG.inpaintUrbanMask in population_c14bazAAR.
     * @alias SitesBelarusUkraineFrontierUtils.inpaintUrbanMaskGrid
     *
     * @param {Float32Array} arg0_popc_grid
     * @param {Uint8Array} arg1_urban_mask
     * @param {Float32Array} arg2_land_area_grid
     * @param {Float32Array} arg3_fallback_grid
     * @param {number} arg4_grid_width
     * @param {number} arg5_grid_height
     * @param {number} arg6_inpaint_radius
     *
     * @returns {Float32Array}
     */
    static inpaintUrbanMaskGrid (
      arg0_popc_grid,
      arg1_urban_mask,
      arg2_land_area_grid,
      arg3_fallback_grid,
      arg4_grid_width,
      arg5_grid_height,
      arg6_inpaint_radius
    ) {
      //Convert from parameters
      let popc_grid = arg0_popc_grid;
      let urban_mask = arg1_urban_mask;
      let land_area_grid = arg2_land_area_grid;
      let fallback_grid = arg3_fallback_grid;
      let grid_w = arg4_grid_width;
      let grid_h = arg5_grid_height;
      let radius = (arg6_inpaint_radius !== undefined) ? arg6_inpaint_radius : 3;

      //Declare local instance variables
      let max_radius = radius*4;
      let out_grid = new Float32Array(popc_grid);
      let wide_radius = radius*2;

      for (let i = 0; i < grid_h; i++)
        for (let x = 0; x < grid_w; x++) {
          let local_idx = i*grid_w + x;

          if (urban_mask[local_idx] === 1) {
            if (land_area_grid[local_idx] <= 0) {
              out_grid[local_idx] = 0;
              continue;
            }

            let local_val_sum = 0;
            let local_w_sum = 0;

            for (let y = -radius; y <= radius; y++) {
              let local_ny = i + y;

              if (local_ny >= 0 && local_ny < grid_h)
                for (let z = -radius; z <= radius; z++) {
                  if (y === 0 && z === 0) continue;

                  let local_nx = (x + z + grid_w) % grid_w;
                  let local_nidx = local_ny*grid_w + local_nx;

                  if (urban_mask[local_nidx] === 0 && land_area_grid[local_nidx] > 0 && popc_grid[local_nidx] > 0) {
                    let local_w = 1/Math.max(1, y*y + z*z);

                    local_val_sum += popc_grid[local_nidx]*local_w;
                    local_w_sum += local_w;
                  }
                }
            }

            if (local_w_sum > 0) {
              out_grid[local_idx] = local_val_sum/local_w_sum;
            } else {
              for (let y = -wide_radius; y <= wide_radius; y++) {
                let local_ny = i + y;

                if (local_ny >= 0 && local_ny < grid_h)
                  for (let z = -wide_radius; z <= wide_radius; z++) {
                    let local_nx = (x + z + grid_w) % grid_w;
                    let local_nidx = local_ny*grid_w + local_nx;

                    if (urban_mask[local_nidx] === 0 && land_area_grid[local_nidx] > 0 && popc_grid[local_nidx] > 0) {
                      let local_w = 1/Math.max(1, y*y + z*z);

                      local_val_sum += popc_grid[local_nidx]*local_w;
                      local_w_sum += local_w;
                    }
                  }
              }

              if (local_w_sum > 0) {
                out_grid[local_idx] = local_val_sum/local_w_sum;
              } else {
                for (let y = -max_radius; y <= max_radius; y++) {
                  let local_ny = i + y;

                  if (local_ny >= 0 && local_ny < grid_h)
                    for (let z = -max_radius; z <= max_radius; z++) {
                      let local_nx = (x + z + grid_w) % grid_w;
                      let local_nidx = local_ny*grid_w + local_nx;

                      if (urban_mask[local_nidx] === 0 && land_area_grid[local_nidx] > 0 && popc_grid[local_nidx] > 0) {
                        let local_w = 1/Math.max(1, y*y + z*z);

                        local_val_sum += popc_grid[local_nidx]*local_w;
                        local_w_sum += local_w;
                      }
                    }
                }

                if (local_w_sum > 0) {
                  out_grid[local_idx] = local_val_sum/local_w_sum;
                } else if (fallback_grid && fallback_grid[local_idx] > 0) {
                  out_grid[local_idx] = fallback_grid[local_idx];
                }
              }
            }
          }
        }

      //Return statement
      return out_grid;
    }


    /**
     * Loads adjacent Russian and Crimean ADM2 raions from sites_IA_RAS/geojson/*.geojson within frontier_conditioning_max_dist_km of the Belarus/Ukraine land mask so that the Matérn (nu = 3/2) kriging surface has continuous intermediate conditioning points across the Belarus-Russia, Ukraine-Russia and Ukraine-Crimea frontiers.
     * @alias SitesBelarusUkraineFrontierUtils.loadRussianFrontierRaions
     *
     * @param {Object} arg0_mask_data
     * @param {Object} arg1_config
     *
     * @returns {Object}
     */
    static loadRussianFrontierRaions (arg0_mask_data, arg1_config) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let config = arg1_config;

      //Declare local instance variables
      let earth_radius_km = config.kriging_config.earth_radius_km;
      let max_dist_km = config.kriging_config.frontier_conditioning_max_dist_km || 250;
      let min_cos = Math.cos(max_dist_km/earth_radius_km);
      let period_configs = config.periods;
      let raion_map = new Map();
      let rus_dir = path.join(
        mask_data.project_root,
        config.kriging_config.russian_ia_ras_folder || "histmap/1.data_raw/population_regional/russia/1.entire_country/sites_IA_RAS",
        "geojson"
      );
      let sample_ux = [];
      let sample_uy = [];
      let sample_uz = [];
      let unspec_map = new Map();

      //Guard clause if Russian geojson folder is absent
      if (!fs.existsSync(rus_dir))
        return { raion_list: [], unspec_subregion_list: [] };

      for (let i = 0; i < mask_data.valid_cell_count; i += 6) {
        sample_ux.push(mask_data.cell_ux[i]);
        sample_uy.push(mask_data.cell_uy[i]);
        sample_uz.push(mask_data.cell_uz[i]);
      }

      for (let i = 0; i < period_configs.length; i++) {
        let local_file = path.join(rus_dir, period_configs[i].geojson_filename);

        if (!fs.existsSync(local_file)) continue;

        let local_gj = JSON.parse(fs.readFileSync(local_file, "utf8"));
        let local_pkey = period_configs[i].key;

        for (let x = 0; x < local_gj.features.length; x++) {
          let local_coords = local_gj.features[x].geometry.coordinates;
          let local_lat = local_coords[1];
          let local_lon = local_coords[0];
          let local_props = local_gj.features[x].properties;

          //Exclude Kaliningrad (1217) and far-interior oblasts outside bounding box
          if (local_props.oblast_id === 1217 || local_lon < 24 || local_lon > 45 || local_lat < 43 || local_lat > 59) continue;

          let local_cos_lat = Math.cos(local_lat*Math.PI/180);
          let local_is_close = false;
          let local_key_id = `RUS_${local_props.region_id}`;
          let local_lat_rad = local_lat*Math.PI/180;
          let local_lon_rad = local_lon*Math.PI/180;
          let local_target_map = (local_props.is_unspecified_subregion) ? unspec_map : raion_map;
          let local_ux = local_cos_lat*Math.cos(local_lon_rad);
          let local_uy = local_cos_lat*Math.sin(local_lon_rad);
          let local_uz = Math.sin(local_lat_rad);

          if (!local_target_map.has(local_key_id)) {
            for (let y = 0; y < sample_ux.length; y++)
              if (local_ux*sample_ux[y] + local_uy*sample_uy[y] + local_uz*sample_uz[y] >= min_cos) {
                local_is_close = true;
                break;
              }

            if (!local_is_close) continue;

            local_target_map.set(local_key_id, {
              country_iso3: "RUS",
              eb_densities: {},
              id: local_key_id,
              is_frontier_buffer: true,
              lat: local_lat,
              lon: local_lon,
              name_ru: local_props.name_ru,
              oblast_id: local_props.oblast_id,
              oblast_name_ru: local_props.oblast_name_ru,
              periods: {},
              radius_km: 0,
              raw_periods: {},
              total_sites_all_periods: local_props.total_sites_all_periods || 0,
              ux: local_ux,
              uy: local_uy,
              uz: local_uz,
              voronoi_area_km2: 0
            });
          }

          let local_entry = local_target_map.get(local_key_id);

          if (local_entry) {
            local_entry.periods[local_pkey] = (local_entry.periods[local_pkey] || 0) + local_props.site_count;
            local_entry.raw_periods[local_pkey] = (local_entry.raw_periods[local_pkey] || 0) + local_props.site_count;
          }
        }
      }

      //Return statement
      return {
        raion_list: Array.from(raion_map.values()),
        unspec_subregion_list: Array.from(unspec_map.values())
      };
    }


    /**
     * Loads a single year's ecologically adjusted urban-masked HYDE 3.5 popc float32 raster over the valid Belarus + mainland Ukraine (excl. Crimea) mask (replacing population_Substrata from 1 AD to 1400 AD while suppressing 20th-century industrial/coal-mining population back-projection in Donbas and the Wild Fields).
     * @alias SitesBelarusUkraineFrontierUtils.loadSingleSubstrataRaster
     *
     * @param {Object} arg0_mask_data
     * @param {number} arg1_year
     * @param {Map} [arg2_cache]
     * @param {Object} [arg3_config]
     * @param {Object} [arg4_bio_covs]
     *
     * @returns {Float32Array}
     */
    static loadSingleSubstrataRaster (arg0_mask_data, arg1_year, arg2_cache, arg3_config, arg4_bio_covs) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let year = arg1_year;
      let cache = arg2_cache;
      let config = arg3_config;
      let bio_covs = arg4_bio_covs;

      //Declare local instance variables
      let n_valid = mask_data.valid_cell_count;
      let out_arr;
      let raw_arr = this.loadUrbanMaskedHYDEPopcRaster(mask_data, year, cache, config);

      if (!bio_covs || !bio_covs.steppe_envelope) return raw_arr;

      out_arr = new Float32Array(n_valid);
      for (let i = 0; i < n_valid; i++) {
        let local_env = bio_covs.steppe_envelope[i];

        out_arr[i] = raw_arr[i]*local_env;
      }

      //Return statement
      return out_arr;
    }


    /**
     * Loads HYDE 3.5's popc raster for a given year (0 to 1400 AD) and masks + inpaints modern and historical urban settlements using the exact population_c14bazAAR methodology (uopp_2023AD > 10,0 km2 buffered by 1px + urbc > 0 + stadester_urban > 0 + 8x isolated spike removal + IDW boundary inpainting).
     * @alias SitesBelarusUkraineFrontierUtils.loadUrbanMaskedHYDEPopcRaster
     *
     * @param {Object} arg0_mask_data
     * @param {number} arg1_year
     * @param {Map} [arg2_cache]
     * @param {Object} [arg3_config]
     *
     * @returns {Float32Array}
     */
    static loadUrbanMaskedHYDEPopcRaster (arg0_mask_data, arg1_year, arg2_cache, arg3_config) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let year = arg1_year;
      let cache = arg2_cache;
      let config = arg3_config;

      //Declare local instance variables
      let cache_key = `hyde_urban_masked_${year}`;
      let cleaned_grid;
      let cov_paths;
      let grid_h = mask_data.grid_height;
      let grid_w = mask_data.grid_width;
      let inpaint_radius = 3;
      let kk10_grid = null;
      let kk10_path;
      let land_area_grid = mask_data.land_area_grid;
      let modern_urban_mask;
      let n_valid = mask_data.valid_cell_count;
      let out_arr;
      let popc_grid;
      let popc_path;
      let root = mask_data.project_root;
      let spike_ratio = 8.0;
      let stad_urb_grid;
      let stad_urb_path;
      let total_pixels = mask_data.grid_width*mask_data.grid_height;
      let urbc_grid;
      let urbc_path;
      let valid_indices = mask_data.valid_indices;
      let year_label = (year < 0) ? `${Math.abs(year)}BC` : `${year}AD`;
      let year_urban_mask;

      //Guard clause if already cached
      if (cache && cache.has(cache_key)) return cache.get(cache_key);

      if (!config && global.SitesBelarusUkraineKriging)
        config = global.SitesBelarusUkraineKriging.loadConfig();

      cov_paths = (config && config.kriging_config && config.kriging_config.covariate_paths) ?
        config.kriging_config.covariate_paths : {};
      if (cov_paths.urban_mask_inpaint_radius !== undefined)
        inpaint_radius = cov_paths.urban_mask_inpaint_radius;
      if (cov_paths.urban_outlier_spike_ratio !== undefined)
        spike_ratio = cov_paths.urban_outlier_spike_ratio;

      popc_path = path.join(
        root,
        cov_paths.hyde_popc_folder || "histmap/2.data_cleaning/landuse_HYDE/rasters_scaled_to_global",
        `popc_${year}.png`
      );
      if (!fs.existsSync(popc_path))
        popc_path = path.join(
          root,
          cov_paths.hyde_raw_rasters_folder || "histmap/2.data_cleaning/landuse_HYDE/rasters",
          `popc_${year_label}.png`
        );

      popc_grid = this.readGlobalFloat32Raster(popc_path, total_pixels);
      modern_urban_mask = this.getModernUrbanMask(mask_data, config, cache);
      year_urban_mask = new Uint8Array(modern_urban_mask);

      //1. Union historical HYDE urbc_<year>.png > 0
      urbc_path = path.join(
        root,
        cov_paths.hyde_mcevedy_rasters_folder || "histmap/2.data_cleaning/landuse_HYDE/rasters_mcevedy",
        `urbc_${year}.png`
      );
      if (!fs.existsSync(urbc_path))
        urbc_path = path.join(
          root,
          cov_paths.hyde_raw_rasters_folder || "histmap/2.data_cleaning/landuse_HYDE/rasters",
          `urbc_${year_label}.png`
        );

      if (fs.existsSync(urbc_path)) {
        urbc_grid = this.readGlobalFloat32Raster(urbc_path, total_pixels);
        for (let i = 0; i < total_pixels; i++)
          if (urbc_grid[i] > 0)
            year_urban_mask[i] = 1;
      }

      //2. Union Stadester historical urban settlements stadester_urban_<year>.png > 0
      stad_urb_path = path.join(
        root,
        cov_paths.stadester_urban_folder || "histmap/2.data_cleaning/population_Stadester/stadester_urban_rasters",
        `stadester_urban_${year}.png`
      );
      if (fs.existsSync(stad_urb_path)) {
        stad_urb_grid = this.readGlobalFloat32Raster(stad_urb_path, total_pixels);
        for (let i = 0; i < total_pixels; i++)
          if (stad_urb_grid[i] > 0)
            year_urban_mask[i] = 1;
      }

      //3. Union modern artificial reservoir / exclusion-zone zero-holes (Kremenchuk/Kakhovka/Kaniv/Kyiv reservoirs & 1986 Chernobyl exclusion zone) and isolated single-pixel modern/urban outlier spikes (> 8x positive 3x3 Moore rural neighbourhood mean)
      for (let i = 0; i < n_valid; i++) {
        let local_gidx = valid_indices[i];

        if (land_area_grid[local_gidx] > 0 && popc_grid[local_gidx] <= 0) {
          year_urban_mask[local_gidx] = 1;
          continue;
        }
        if (year_urban_mask[local_gidx] === 1 || popc_grid[local_gidx] <= 0) continue;

        let local_cx = local_gidx % grid_w;
        let local_cy = Math.floor(local_gidx/grid_w);
        let local_ncnt = 0;
        let local_nsum = 0;

        for (let x = -1; x <= 1; x++) {
          let local_ny = local_cy + x;

          if (local_ny >= 0 && local_ny < grid_h)
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;

              let local_nx = (local_cx + y + grid_w) % grid_w;
              let local_nidx = local_ny*grid_w + local_nx;

              if (year_urban_mask[local_nidx] === 0 && land_area_grid[local_nidx] > 0 && popc_grid[local_nidx] > 0) {
                local_nsum += popc_grid[local_nidx];
                local_ncnt++;
              }
            }
        }

        if (local_ncnt >= 3 && popc_grid[local_gidx] > spike_ratio*(local_nsum/local_ncnt))
          year_urban_mask[local_gidx] = 1;
      }

      //4. Load KK10LUH2 fallback only for deep multi-pixel urban cores if needed
      kk10_path = path.join(
        root,
        cov_paths.kk10_fallback_folder || "histmap/2.data_cleaning/population_KK10LUH2/rasters_KK10LUH2_2._global_scaling",
        `popc_${year}.png`
      );
      if (fs.existsSync(kk10_path))
        kk10_grid = this.readGlobalFloat32Raster(kk10_path, total_pixels);

      cleaned_grid = this.inpaintUrbanMaskGrid(
        popc_grid,
        year_urban_mask,
        land_area_grid,
        kk10_grid,
        grid_w,
        grid_h,
        inpaint_radius
      );

      out_arr = new Float32Array(n_valid);
      for (let i = 0; i < n_valid; i++) {
        let local_val = cleaned_grid[valid_indices[i]];

        if (!isNaN(local_val) && isFinite(local_val) && local_val > 0)
          out_arr[i] = local_val;
      }

      if (cache)
        cache.set(cache_key, out_arr);

      //Return statement
      return out_arr;
    }


    /**
     * Reads a full 4320x2160 big-endian float32 GeoPNG file into a flat Float32Array.
     * @alias SitesBelarusUkraineFrontierUtils.readGlobalFloat32Raster
     *
     * @param {string} arg0_file_path
     * @param {number} arg1_total_pixels
     *
     * @returns {Float32Array}
     */
    static readGlobalFloat32Raster (arg0_file_path, arg1_total_pixels) {
      //Convert from parameters
      let file_path = arg0_file_path;
      let total_pixels = arg1_total_pixels;

      //Declare local instance variables
      let data_view;
      let out_grid = new Float32Array(total_pixels);
      let png_data = PNG.sync.read(fs.readFileSync(file_path)).data;

      data_view = new DataView(png_data.buffer, png_data.byteOffset, png_data.byteLength);

      for (let i = 0; i < total_pixels; i++) {
        let local_px = i*4;

        if (
          png_data[local_px] === 0 &&
          png_data[local_px + 1] === 0 &&
          png_data[local_px + 2] === 0 &&
          png_data[local_px + 3] === 0
        ) continue;

        let local_val = data_view.getFloat32(local_px, false);

        if (!isNaN(local_val) && isFinite(local_val) && local_val > 0)
          out_grid[i] = local_val;
      }

      //Return statement
      return out_grid;
    }
  };
}

module.exports = global.SitesBelarusUkraineFrontierUtils;

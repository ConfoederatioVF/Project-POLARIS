//Import modules
let fs = require("fs");
let path = require("path");
let { PNG } = require("pngjs");
let SitesBelarusUkraineGridUtils = require("./SitesBelarusUkraineGridUtils.js");

//Initialise functions
{
  /**
   * Land-mask construction, ADM2 raion observation loading, Russian cross-frontier conditioning and ecologically conditioned Empirical Bayes oblast harmonisation for the Belarus and mainland Ukraine (Kievan Rus) archaeological dataset (`sites_belarus_ukraine`).
   *
   * @class SitesBelarusUkraineObservationUtils
   * @extends SitesBelarusUkraineGridUtils
   */
  global.SitesBelarusUkraineObservationUtils = class extends SitesBelarusUkraineGridUtils {
    /**
     * Step A: Builds the 5-arcminute (4320x2160) land-area mask encompassing modern Belarus (BLR) and mainland Ukraine (UKR, excluding Crimea, which is covered in sites_IA_RAS).
     * @alias SitesBelarusUkraineObservationUtils.A_buildBelarusUkraineMask
     *
     * @param {Object} [arg0_options]
     *  @param {Object} [arg0_options.config]
     *  @param {string} [arg0_options.project_root]
     *
     * @returns {Object}
     */
    static A_buildBelarusUkraineMask (arg0_options) {
      //Convert from parameters
      let options = (arg0_options) ? arg0_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();
      let project_root = (options.project_root) ? options.project_root : path.resolve(__dirname, "../../../../../../");

      //Declare local instance variables
      let belarus_cell_count = 0;
      let bfs_dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      let bfs_head = 0;
      let bfs_queue = [];
      let blr_rgb = config.kriging_config.belarus_geocode_rgb;
      let cell_land_area;
      let cell_ux;
      let cell_uy;
      let cell_uz;
      let class_grid;
      let crimea_bbox = config.kriging_config.crimea_bbox;
      let crimea_excluded_count = 0;
      let crimea_poly = [];
      let cshapes_geojson = JSON.parse(fs.readFileSync(path.join(project_root, "saves", "CShapes-2.0.geojson"), "utf8"));
      let dist_grid;
      let earth_radius_km = config.kriging_config.earth_radius_km;
      let geocodes_png = PNG.sync.read(fs.readFileSync(path.join(project_root, "histmap", "1.data_raw", "admin_modern", "geocodes.png")));
      let grid_height = config.kriging_config.grid_height;
      let grid_width = config.kriging_config.grid_width;
      let land_area_grid;
      let land_area_png = PNG.sync.read(fs.readFileSync(path.join(project_root, "histmap", "1.data_raw", "metadata_HYDE", "general_rasters", "land_area.png")));
      let mask_grid;
      let max_bfs_dist = config.kriging_config.coastal_bfs_max_distance_px;
      let mda_geocode_mask;
      let mean_cell_land_area_km2;
      let pixel_to_valid_idx;
      let rus_feature;
      let total_land_area_km2 = 0;
      let total_pixels = grid_width*grid_height;
      let ukr_rgb = config.kriging_config.ukraine_geocode_rgb;
      let ukraine_cell_count = 0;
      let valid_indices = [];

      for (let i = 0; i < cshapes_geojson.features.length; i++) {
        let local_f = cshapes_geojson.features[i];

        if (
          local_f.properties.gwcode === config.kriging_config.cshapes_crimea_gwcode &&
          local_f.properties.gweyear === config.kriging_config.cshapes_crimea_gweyear
        ) {
          rus_feature = local_f;
          break;
        }
      }

      if (rus_feature && rus_feature.geometry && rus_feature.geometry.coordinates)
        for (let i = 0; i < rus_feature.geometry.coordinates.length; i++) {
          let local_max_lat = -90;
          let local_max_lon = -180;
          let local_min_lat = 90;
          let local_min_lon = 180;
          let local_ring = rus_feature.geometry.coordinates[i][0];

          for (let x = 0; x < local_ring.length; x++) {
            let local_pt = local_ring[x];

            local_max_lon = Math.max(local_max_lon, local_pt[0]);
            local_min_lon = Math.min(local_min_lon, local_pt[0]);
            local_max_lat = Math.max(local_max_lat, local_pt[1]);
            local_min_lat = Math.min(local_min_lat, local_pt[1]);
          }
          if (local_min_lon > 30 && local_max_lon < 38 && local_min_lat > 44 && local_max_lat < 47) {
            crimea_poly = local_ring;
            break;
          }
        }

      class_grid = new Uint8Array(total_pixels);
      dist_grid = new Uint8Array(total_pixels);
      dist_grid.fill(255);
      land_area_grid = new Float32Array(total_pixels);
      mask_grid = new Uint8Array(total_pixels);
      mda_geocode_mask = new Uint8Array(total_pixels);
      pixel_to_valid_idx = new Int32Array(total_pixels);
      pixel_to_valid_idx.fill(-1);

      for (let i = 0; i < grid_height; i++) {
        let local_lat = 90 - (i + 0.5)/12;

        for (let x = 0; x < grid_width; x++) {
          let local_idx = i*grid_width + x;
          let local_lon = -180 + (x + 0.5)/12;
          let local_px = local_idx*4;
          let local_la = (
            (land_area_png.data[local_px] << 24) |
            (land_area_png.data[local_px + 1] << 16) |
            (land_area_png.data[local_px + 2] << 8) |
            land_area_png.data[local_px + 3]
          ) >>> 0;
          let local_r = geocodes_png.data[local_px];
          let local_g = geocodes_png.data[local_px + 1];
          let local_b = geocodes_png.data[local_px + 2];
          let local_is_blr = (local_r === blr_rgb[0] && local_g === blr_rgb[1] && local_b === blr_rgb[2]);
          let local_is_ukr = (local_r === ukr_rgb[0] && local_g === ukr_rgb[1] && local_b === ukr_rgb[2]);
          let local_is_crimea = (local_is_ukr) ? this.isCellInCrimea(local_lon, local_lat, crimea_poly, crimea_bbox) : false;

          land_area_grid[local_idx] = local_la;

          if (local_is_ukr && local_is_crimea) {
            class_grid[local_idx] = 2;
            dist_grid[local_idx] = 0;
            bfs_queue.push(local_idx);
            if (local_la > 0) crimea_excluded_count++;
          } else if (local_is_blr || local_is_ukr) {
            class_grid[local_idx] = 1;
            dist_grid[local_idx] = 0;
            bfs_queue.push(local_idx);
            if (local_is_blr && local_la > 0) belarus_cell_count++;
            if (local_is_ukr && local_la > 0) ukraine_cell_count++;
          } else if (local_r !== 0 || local_g !== 0 || local_b !== 0) {
            class_grid[local_idx] = 2;
            dist_grid[local_idx] = 0;
            bfs_queue.push(local_idx);
            if (
              !(local_r === 20 && local_g === 114 && local_b === 30) &&
              local_la > 0 &&
              local_lat >= 44.0 &&
              local_lat <= 57.5 &&
              local_lon >= 20.5 &&
              local_lon <= 31.5
            ) mda_geocode_mask[local_idx] = 1;
          }
        }
      }

      for (let i = 0; i < bfs_queue.length; i++) {
        let local_curr = bfs_queue[bfs_head++];
        let local_cx = local_curr % grid_width;
        let local_cy = Math.floor(local_curr/grid_width);
        let local_dist = dist_grid[local_curr];

        if (local_dist < max_bfs_dist)
          for (let x = 0; x < bfs_dirs.length; x++) {
            let local_nx = (local_cx + bfs_dirs[x][1] + grid_width) % grid_width;
            let local_ny = local_cy + bfs_dirs[x][0];

            if (local_ny >= 0 && local_ny < grid_height) {
              let local_nidx = local_ny*grid_width + local_nx;

              if (dist_grid[local_nidx] === 255) {
                class_grid[local_nidx] = class_grid[local_curr];
                dist_grid[local_nidx] = local_dist + 1;
                bfs_queue.push(local_nidx);
              }
            }
          }
      }

      for (let i = 0; i < grid_height; i++) {
        let local_lat = 90 - (i + 0.5)/12;

        for (let x = 0; x < grid_width; x++) {
          let local_idx = i*grid_width + x;
          let local_la = land_area_grid[local_idx];
          let local_lon = -180 + (x + 0.5)/12;
          let local_is_crimea = this.isCellInCrimea(local_lon, local_lat, crimea_poly, crimea_bbox);

          if (local_la > 0 && class_grid[local_idx] === 1 && !local_is_crimea) {
            mask_grid[local_idx] = 1;
            pixel_to_valid_idx[local_idx] = valid_indices.length;
            total_land_area_km2 += local_la;
            valid_indices.push(local_idx);
          }
        }
      }

      cell_land_area = new Float32Array(valid_indices.length);
      cell_ux = new Float32Array(valid_indices.length);
      cell_uy = new Float32Array(valid_indices.length);
      cell_uz = new Float32Array(valid_indices.length);
      mean_cell_land_area_km2 = total_land_area_km2/valid_indices.length;

      for (let i = 0; i < valid_indices.length; i++) {
        let local_idx = valid_indices[i];
        let local_lat_rad = (90 - (Math.floor(local_idx/grid_width) + 0.5)/12)*Math.PI/180;
        let local_lon_rad = (-180 + ((local_idx % grid_width) + 0.5)/12)*Math.PI/180;
        let local_cos_lat = Math.cos(local_lat_rad);

        cell_land_area[i] = land_area_grid[local_idx];
        cell_ux[i] = local_cos_lat*Math.cos(local_lon_rad);
        cell_uy[i] = local_cos_lat*Math.sin(local_lon_rad);
        cell_uz[i] = Math.sin(local_lat_rad);
      }

      //Return statement
      return {
        belarus_cell_count: belarus_cell_count,
        cell_land_area: cell_land_area,
        cell_ux: cell_ux,
        cell_uy: cell_uy,
        cell_uz: cell_uz,
        crimea_excluded_count: crimea_excluded_count,
        earth_radius_km: earth_radius_km,
        grid_height: grid_height,
        grid_width: grid_width,
        land_area_grid: land_area_grid,
        mask_grid: mask_grid,
        mda_geocode_mask: mda_geocode_mask,
        mean_cell_land_area_km2: mean_cell_land_area_km2,
        pixel_to_valid_idx: pixel_to_valid_idx,
        project_root: project_root,
        total_land_area_km2: total_land_area_km2,
        ukraine_cell_count: ukraine_cell_count,
        valid_cell_count: valid_indices.length,
        valid_indices: Int32Array.from(valid_indices)
      };
    }


    /**
     * Step B: Loads the 12 Belarus & Ukraine GeoJSON files plus adjacent Russian/Crimean conditioning raions from sites_IA_RAS, reallocates oblast-level unspecified subregions, applies ecologically conditioned Empirical Bayes unspecified allocation and ADM1 oblast harmonisation, and constructs a continuous local radius field.
     * @alias SitesBelarusUkraineObservationUtils.B_loadRaionObservations
     *
     * @param {Object} arg0_mask_data
     * @param {Object} [arg1_options]
     *  @param {Object} [arg1_options.config]
     *
     * @returns {Object}
     */
    static B_loadRaionObservations (arg0_mask_data, arg1_options) {
      //Convert from parameters
      let mask_data = arg0_mask_data;
      let options = (arg1_options) ? arg1_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let catchment_smooth_radius_px;
      let cell_nearest_raion = new Int32Array(mask_data.valid_cell_count);
      let cell_radius_km;
      let cell_ux = mask_data.cell_ux;
      let cell_uy = mask_data.cell_uy;
      let cell_uz = mask_data.cell_uz;
      let domestic_raion_count = 0;
      let excluded_oblast_set = new Set(config.kriging_config.excluded_oblast_ids);
      let forest_grid = this.readAscGrid(
        path.join(mask_data.project_root, config.kriging_config.covariate_paths.forest_asc),
        mask_data.grid_width*mask_data.grid_height
      );
      let frontier_bundle;
      let geojson_dir = path.join(__dirname, config.output_geojson_subfolder);
      let land_area_grid = mask_data.land_area_grid;
      let median_radius_km;
      let median_voronoi_area_km2;
      let nat_dated_sum = 0;
      let nat_period_sums = {};
      let oblast_raions_map = new Map();
      let period_configs = config.periods;
      let period_totals = {};
      let q25_voronoi_area_km2;
      let q75_voronoi_area_km2;
      let raion_area_km2;
      let raion_cell_counts;
      let raion_list = [];
      let raion_map = new Map();
      let raion_radius_km;
      let raion_ux;
      let raion_uy;
      let raion_uz;
      let raw_cell_radius = new Float32Array(mask_data.valid_cell_count);
      let settled_set = new Set(config.kriging_config.steppe_settled_period_keys || ["migration_period", "middle_ages", "early_modern_17_18c", "modern"]);
      let sorted_areas = [];
      let unspec_subregion_list = [];
      let unspec_subregion_map = new Map();
      let valid_indices = mask_data.valid_indices;

      for (let i = 0; i < period_configs.length; i++) {
        let local_file = path.join(geojson_dir, period_configs[i].geojson_filename);
        let local_gj = JSON.parse(fs.readFileSync(local_file, "utf8"));
        let local_pkey = period_configs[i].key;

        period_totals[local_pkey] = 0;
        if (local_pkey !== "unspecified")
          nat_period_sums[local_pkey] = 0;

        for (let x = 0; x < local_gj.features.length; x++) {
          let local_coords = local_gj.features[x].geometry.coordinates;
          let local_lat = local_coords[1];
          let local_lon = local_coords[0];
          let local_props = local_gj.features[x].properties;

          if (excluded_oblast_set.has(local_props.oblast_id)) continue;

          let local_target_map = (local_props.is_unspecified_subregion) ? unspec_subregion_map : raion_map;

          if (!local_target_map.has(local_props.region_id)) {
            let local_lat_rad = local_lat*Math.PI/180;
            let local_lon_rad = local_lon*Math.PI/180;
            let local_cos_lat = Math.cos(local_lat_rad);

            local_target_map.set(local_props.region_id, {
              country_iso3: local_props.country_iso3 || "UKR",
              eb_densities: {},
              id: local_props.region_id,
              is_frontier_buffer: false,
              lat: local_lat,
              lon: local_lon,
              name_ru: local_props.name_ru,
              oblast_id: local_props.oblast_id,
              oblast_name_ru: local_props.oblast_name_ru,
              periods: {},
              radius_km: 0,
              raw_periods: {},
              total_sites_all_periods: local_props.total_sites_all_periods || 0,
              ux: local_cos_lat*Math.cos(local_lon_rad),
              uy: local_cos_lat*Math.sin(local_lon_rad),
              uz: Math.sin(local_lat_rad),
              voronoi_area_km2: 0
            });
          }

          let local_entry = local_target_map.get(local_props.region_id);

          local_entry.periods[local_pkey] = (local_entry.periods[local_pkey] || 0) + local_props.site_count;
          local_entry.raw_periods[local_pkey] = (local_entry.raw_periods[local_pkey] || 0) + local_props.site_count;
          period_totals[local_pkey] += local_props.site_count;
          if (local_pkey !== "unspecified") {
            nat_period_sums[local_pkey] += local_props.site_count;
            nat_dated_sum += local_props.site_count;
          }
        }
      }

      raion_list = Array.from(raion_map.values());
      domestic_raion_count = raion_list.length;
      unspec_subregion_list = Array.from(unspec_subregion_map.values());

      //Append Russian and Crimean cross-frontier conditioning raions within 250 km
      frontier_bundle = this.loadRussianFrontierRaions(mask_data, config);
      for (let i = 0; i < frontier_bundle.raion_list.length; i++)
        raion_list.push(frontier_bundle.raion_list[i]);
      for (let i = 0; i < frontier_bundle.unspec_subregion_list.length; i++)
        unspec_subregion_list.push(frontier_bundle.unspec_subregion_list[i]);

      //Compute wooded fraction (forest_wwf_cr.asc) in a 9x9 catchment window around each raion centroid
      for (let i = 0; i < raion_list.length; i++) {
        let local_fcnt = 0;
        let local_fsum = 0;
        let local_gx = Math.floor((raion_list[i].lon + 180)*12);
        let local_gy = Math.floor((90 - raion_list[i].lat)*12);

        for (let x = -4; x <= 4; x++) {
          let local_ny = local_gy + x;

          if (local_ny >= 0 && local_ny < mask_data.grid_height)
            for (let y = -4; y <= 4; y++) {
              let local_nx = (local_gx + y + mask_data.grid_width) % mask_data.grid_width;
              let local_gidx = local_ny*mask_data.grid_width + local_nx;

              if (land_area_grid[local_gidx] > 0) {
                local_fsum += (forest_grid[local_gidx] > 0) ? 1 : 0;
                local_fcnt++;
              }
            }
        }
        raion_list[i].wooded_frac = (local_fcnt > 0) ? local_fsum/local_fcnt : 0;

        if (!oblast_raions_map.has(raion_list[i].oblast_id))
          oblast_raions_map.set(raion_list[i].oblast_id, []);
        oblast_raions_map.get(raion_list[i].oblast_id).push(raion_list[i]);
      }

      //Reallocate oblast-level unspecified subregion counts proportionally across the oblast's regular raions
      for (let i = 0; i < unspec_subregion_list.length; i++) {
        let local_oblast_raions = oblast_raions_map.get(unspec_subregion_list[i].oblast_id) || [];
        let local_unspec = unspec_subregion_list[i];

        if (local_oblast_raions.length > 0)
          for (let x = 0; x < period_configs.length; x++) {
            let local_add_count = local_unspec.periods[period_configs[x].key] || 0;
            let local_pkey = period_configs[x].key;

            if (local_add_count > 0) {
              let local_period_sum = 0;
              let local_total_sum = 0;

              for (let y = 0; y < local_oblast_raions.length; y++) {
                local_period_sum += (local_oblast_raions[y].raw_periods[local_pkey] || 0);
                local_total_sum += (local_oblast_raions[y].total_sites_all_periods || 1);
              }
              for (let y = 0; y < local_oblast_raions.length; y++) {
                let local_raion = local_oblast_raions[y];
                let local_share = (local_period_sum > 0) ?
                  (local_raion.raw_periods[local_pkey] || 0)/local_period_sum :
                  (local_raion.total_sites_all_periods || 1)/local_total_sum;

                local_raion.periods[local_pkey] = (local_raion.periods[local_pkey] || 0) + local_add_count*local_share;
              }
            }
          }
      }

      //Ecologically conditioned Empirical Bayes unspecified allocation (prevents steppe kurgan allocation into settled medieval periods)
      for (let i = 0; i < raion_list.length; i++) {
        let local_dated_sum = 0;
        let local_fw = raion_list[i].wooded_frac;
        let local_oblast_dated_sum = 0;
        let local_oblast_period_sums = {};
        let local_oblast_raions;
        let local_prior_conc = 0;
        let local_raion = raion_list[i];
        let local_unspec_sites = local_raion.periods.unspecified || 0;

        if (local_unspec_sites > 0) {
          local_oblast_raions = oblast_raions_map.get(local_raion.oblast_id) || [local_raion];
          for (let x = 0; x < period_configs.length; x++) {
            let local_pkey = period_configs[x].key;

            if (local_pkey !== "unspecified") {
              local_dated_sum += (local_raion.periods[local_pkey] || 0);
              local_oblast_period_sums[local_pkey] = 0;
            }
          }
          for (let x = 0; x < local_oblast_raions.length; x++)
            for (let y = 0; y < period_configs.length; y++) {
              let local_pkey = period_configs[y].key;

              if (local_pkey !== "unspecified") {
                let local_v = local_oblast_raions[x].periods[local_pkey] || 0;

                local_oblast_period_sums[local_pkey] += local_v;
                local_oblast_dated_sum += local_v;
              }
            }

          local_prior_conc = local_oblast_dated_sum/Math.max(1, local_oblast_raions.length);
          let local_total_ref = local_dated_sum + local_prior_conc;

          if (local_total_ref > 0) {
            let local_emp_dated_frac = (local_dated_sum + local_prior_conc)/(local_dated_sum + local_prior_conc + local_unspec_sites);

            for (let x = 0; x < period_configs.length; x++) {
              let local_pkey = period_configs[x].key;

              if (local_pkey !== "unspecified") {
                let local_eco_mod = (settled_set.has(local_pkey) && local_fw < 0.25) ? Math.max(0.05, local_fw) : 1;
                let local_nat_share = (nat_dated_sum > 0) ? nat_period_sums[local_pkey]/nat_dated_sum : 0;
                let local_obl_share = (local_oblast_dated_sum > 0) ? local_oblast_period_sums[local_pkey]/local_oblast_dated_sum : local_nat_share;
                let local_post_share = ((local_raion.periods[local_pkey] || 0) + local_prior_conc*local_obl_share)/local_total_ref;

                local_raion.periods[local_pkey] = (local_raion.periods[local_pkey] || 0) + local_unspec_sites*local_emp_dated_frac*local_post_share*local_eco_mod;
              }
            }
          }
        }
      }

      //Compute geodesic Voronoi land area (km2) for domestic raions and frontier buffer raions
      raion_area_km2 = new Float64Array(raion_list.length);
      raion_cell_counts = new Int32Array(raion_list.length);
      raion_radius_km = new Float64Array(raion_list.length);
      raion_ux = new Float32Array(raion_list.length);
      raion_uy = new Float32Array(raion_list.length);
      raion_uz = new Float32Array(raion_list.length);

      for (let i = 0; i < raion_list.length; i++) {
        raion_ux[i] = raion_list[i].ux;
        raion_uy[i] = raion_list[i].uy;
        raion_uz[i] = raion_list[i].uz;
      }

      for (let i = 0; i < valid_indices.length; i++) {
        let local_best_dom_dot = -2;
        let local_best_dom_k = 0;
        let local_cx = cell_ux[i];
        let local_cy = cell_uy[i];
        let local_cz = cell_uz[i];
        let local_idx = valid_indices[i];

        for (let x = 0; x < domestic_raion_count; x++) {
          let local_dot = local_cx*raion_ux[x] + local_cy*raion_uy[x] + local_cz*raion_uz[x];

          if (local_dot > local_best_dom_dot) {
            local_best_dom_dot = local_dot;
            local_best_dom_k = x;
          }
        }

        raion_list[local_best_dom_k].voronoi_area_km2 += land_area_grid[local_idx];
        raion_cell_counts[local_best_dom_k]++;
        cell_nearest_raion[i] = local_best_dom_k;
      }

      for (let i = 0; i < domestic_raion_count; i++)
        sorted_areas.push(Math.max(mask_data.mean_cell_land_area_km2, raion_list[i].voronoi_area_km2));
      sorted_areas.sort((a, b) => a - b);
      q25_voronoi_area_km2 = sorted_areas[Math.floor(0.25*sorted_areas.length)];
      median_voronoi_area_km2 = sorted_areas[Math.floor(0.50*sorted_areas.length)];
      q75_voronoi_area_km2 = sorted_areas[Math.floor(0.75*sorted_areas.length)];
      median_radius_km = Math.sqrt(median_voronoi_area_km2/Math.PI);

      //Merge single-raion city enclaves into their surrounding multi-raion oblast catchment before computing oblast-area-conserving effective areas
      let local_obl_entries = Array.from(oblast_raions_map.entries());
      for (let i = 0; i < local_obl_entries.length; i++) {
        let local_obl_id = local_obl_entries[i][0];
        let local_raions = local_obl_entries[i][1];

        if (local_raions.length === 1) {
          let local_best_dot = -2;
          let local_best_obl = local_obl_id;
          let local_city = local_raions[0];

          for (let x = 0; x < local_obl_entries.length; x++) {
            let local_cand_id = local_obl_entries[x][0];
            let local_cand_raions = local_obl_entries[x][1];

            if (local_cand_id === local_obl_id || local_cand_raions.length <= 1) continue;

            for (let y = 0; y < local_cand_raions.length; y++) {
              let local_r = local_cand_raions[y];
              let local_dot = local_city.ux*local_r.ux + local_city.uy*local_r.uy + local_city.uz*local_r.uz;

              if (local_dot > local_best_dot) {
                local_best_dot = local_dot;
                local_best_obl = local_cand_id;
              }
            }
          }

          if (local_best_obl !== local_obl_id) {
            let local_parent_raions = oblast_raions_map.get(local_best_obl);

            local_city.oblast_id = local_best_obl;
            local_parent_raions.push(local_city);
            oblast_raions_map.delete(local_obl_id);
          }
        }
      }

      //Compute oblast-area-conserving effective raion areas so densely subdivided oblasts (Crimea, Kursk, Bryansk, Belgorod) are not deflated by national-median clamping
      local_obl_entries = Array.from(oblast_raions_map.entries());
      for (let i = 0; i < local_obl_entries.length; i++) {
        let local_obl_raions = local_obl_entries[i][1];
        let local_obl_vor = 0;
        let local_reg_areas = new Float64Array(local_obl_raions.length);
        let local_reg_sum = 0;

        for (let x = 0; x < local_obl_raions.length; x++) {
          let local_r = local_obl_raions[x];
          let local_vor = (local_r.is_frontier_buffer) ?
            0.78*median_voronoi_area_km2 :
            Math.max(mask_data.mean_cell_land_area_km2, local_r.voronoi_area_km2);

          local_r.voronoi_area_km2 = local_vor;
          local_obl_vor += local_vor;
        }

        let local_mean_vor = local_obl_vor/Math.max(1, local_obl_raions.length);

        for (let x = 0; x < local_obl_raions.length; x++) {
          let local_reg_a = Math.max(0.5*local_mean_vor, Math.min(2.0*local_mean_vor, local_obl_raions[x].voronoi_area_km2));

          local_reg_areas[x] = local_reg_a;
          local_reg_sum += local_reg_a;
        }

        let local_scale = (local_reg_sum > 0) ? (local_obl_vor/local_reg_sum) : 1;

        for (let x = 0; x < local_obl_raions.length; x++) {
          let local_obs_area = Math.max(mask_data.mean_cell_land_area_km2, local_reg_areas[x]*local_scale);
          let local_r = local_obl_raions[x];
          let local_rad_area = Math.max(0.5*q25_voronoi_area_km2, Math.min(q75_voronoi_area_km2, local_obs_area));

          local_r.effective_area_km2 = local_obs_area;
          local_r.radius_km = Math.sqrt(local_rad_area/Math.PI);
        }
      }

      for (let i = 0; i < raion_list.length; i++) {
        raion_area_km2[i] = raion_list[i].effective_area_km2 || median_voronoi_area_km2;
        raion_radius_km[i] = raion_list[i].radius_km || median_radius_km;
      }

      for (let i = 0; i < period_configs.length; i++) {
        let local_pkey = period_configs[i].key;

        for (let x = 0; x < raion_list.length; x++) {
          let local_ak = raion_list[x].effective_area_km2;
          let local_sk = raion_list[x].periods[local_pkey] || 0;

          raion_list[x].eb_densities[local_pkey] = local_sk/local_ak;
        }
      }

      this.harmoniseOblastObservationsEB(
        raion_list,
        oblast_raions_map,
        period_configs,
        mask_data.earth_radius_km,
        config
      );

      for (let i = 0; i < valid_indices.length; i++)
        raw_cell_radius[i] = raion_radius_km[cell_nearest_raion[i]];

      catchment_smooth_radius_px = Math.max(2, Math.round(0.65*median_radius_km/Math.sqrt(mask_data.mean_cell_land_area_km2)));
      cell_radius_km = this.smoothValidFieldOnGrid(mask_data, raw_cell_radius, catchment_smooth_radius_px);

      //Return statement
      return {
        catchment_smooth_radius_px: catchment_smooth_radius_px,
        cell_nearest_raion: cell_nearest_raion,
        cell_radius_km: cell_radius_km,
        domestic_raion_count: domestic_raion_count,
        frontier_raion_count: raion_list.length - domestic_raion_count,
        median_radius_km: median_radius_km,
        median_voronoi_area_km2: median_voronoi_area_km2,
        period_totals: period_totals,
        raion_area_km2: raion_area_km2,
        raion_cell_counts: raion_cell_counts,
        raion_count: raion_list.length,
        raion_list: raion_list,
        raion_radius_km: raion_radius_km,
        raion_ux: raion_ux,
        raion_uy: raion_uy,
        raion_uz: raion_uz,
        unspec_subregion_count: unspec_subregion_list.length
      };
    }


    /**
     * Applies parameter-free hierarchical Empirical Bayes harmonisation across ADM1 oblasts conditioned on the WWF forest/forest-steppe vs Wild Fields steppe ecological envelope, correcting for: (1) single-raion urban municipality enclaves, (2) nomadic steppe kurgan/stone-baba enumeration in Donbas/Kirovohrad, and (3) cross-oblast monument register completeness jumps without inflating sparse steppe oblasts.
     * @alias SitesBelarusUkraineObservationUtils.harmoniseOblastObservationsEB
     *
     * @param {Array<Object>} arg0_raion_list
     * @param {Map} arg1_oblast_raions_map
     * @param {Array<Object>} arg2_period_configs
     * @param {number} arg3_earth_radius_km
     * @param {Object} arg4_config
     */
    static harmoniseOblastObservationsEB (
      arg0_raion_list,
      arg1_oblast_raions_map,
      arg2_period_configs,
      arg3_earth_radius_km,
      arg4_config
    ) {
      //Convert from parameters
      let raion_list = arg0_raion_list;
      let oblast_raions_map = arg1_oblast_raions_map;
      let period_configs = arg2_period_configs;
      let earth_radius_km = arg3_earth_radius_km;
      let config = arg4_config;

      //Declare local instance variables
      let dated_periods = [];
      let n_raions = raion_list.length;
      let oblast_entries = [];
      let oblast_meta = new Map();
      let settled_set = new Set(
        (config && config.kriging_config && config.kriging_config.steppe_settled_period_keys) ?
          config.kriging_config.steppe_settled_period_keys :
          ["migration_period", "middle_ages", "early_modern_17_18c", "modern"]
      );

      for (let i = 0; i < period_configs.length; i++)
        if (period_configs[i].key !== "unspecified")
          dated_periods.push(period_configs[i].key);

      //1. Merge single-raion urban municipality enclaves (Minsk City 9003, Kyiv City 9101, Sevastopol 5346) into their surrounding multi-raion oblast catchment
      oblast_entries = Array.from(oblast_raions_map.entries());
      for (let i = 0; i < oblast_entries.length; i++) {
        let local_obl_id = oblast_entries[i][0];
        let local_raions = oblast_entries[i][1];

        if (local_raions.length === 1) {
          let local_best_dot = -2;
          let local_best_obl = local_obl_id;
          let local_city = local_raions[0];

          for (let x = 0; x < oblast_entries.length; x++) {
            let local_cand_id = oblast_entries[x][0];
            let local_cand_raions = oblast_entries[x][1];

            if (local_cand_id === local_obl_id || local_cand_raions.length <= 1) continue;

            for (let y = 0; y < local_cand_raions.length; y++) {
              let local_r = local_cand_raions[y];
              let local_dot = local_city.ux*local_r.ux + local_city.uy*local_r.uy + local_city.uz*local_r.uz;

              if (local_dot > local_best_dot) {
                local_best_dot = local_dot;
                local_best_obl = local_cand_id;
              }
            }
          }

          if (local_best_obl !== local_obl_id) {
            let local_parent_raions = oblast_raions_map.get(local_best_obl);
            let local_parent_area = 0;

            for (let x = 0; x < local_parent_raions.length; x++)
              local_parent_area += local_parent_raions[x].effective_area_km2;
            local_parent_area /= local_parent_raions.length;

            local_city.effective_area_km2 = Math.max(local_city.effective_area_km2, local_parent_area);
            local_city.oblast_id = local_best_obl;
            local_parent_raions.push(local_city);
            oblast_raions_map.delete(local_obl_id);
          }
        }
      }

      //Compute oblast centroids, radii, multi-period site amplitude and area-weighted wooded fractions from forest_wwf_cr.asc
      oblast_entries = Array.from(oblast_raions_map.entries());
      for (let i = 0; i < oblast_entries.length; i++) {
        let local_all_s = 0;
        let local_area = 0;
        let local_fsum = 0;
        let local_obl_id = oblast_entries[i][0];
        let local_raions = oblast_entries[i][1];
        let local_ux = 0;
        let local_uy = 0;
        let local_uz = 0;

        for (let x = 0; x < local_raions.length; x++) {
          let local_a = local_raions[x].effective_area_km2;
          let local_fw = (local_raions[x].wooded_frac !== undefined) ? local_raions[x].wooded_frac : 1;

          if (!local_raions[x].is_frontier_buffer && local_raions[x].lat >= 47.4 && local_raions[x].lon < 30.2)
            local_fw = Math.max(local_fw, 0.80);

          local_area += local_a;
          local_all_s += (local_raions[x].total_sites_all_periods || 0);
          local_fsum += local_a*local_fw;
          local_ux += local_a*local_raions[x].ux;
          local_uy += local_a*local_raions[x].uy;
          local_uz += local_a*local_raions[x].uz;
        }

        let local_norm = Math.sqrt(local_ux*local_ux + local_uy*local_uy + local_uz*local_uz) || 1;

        oblast_meta.set(local_obl_id, {
          all_z: Math.sqrt(Math.max(0, local_all_s/Math.max(1, local_area))),
          area_km2: local_area,
          id: local_obl_id,
          radius_km: Math.sqrt(local_area/Math.PI),
          raions: local_raions,
          ux: local_ux/local_norm,
          uy: local_uy/local_norm,
          uz: local_uz/local_norm,
          wooded_frac: (local_area > 0) ? local_fsum/local_area : 1
        });
      }

      //2. Ecologically conditioned Empirical Bayes oblast shrinkage per dated period
      let local_obl_list = Array.from(oblast_meta.values());

      for (let i = 0; i < dated_periods.length; i++) {
        let local_dev_sq = [];
        let local_eps_steppe = 0.25;
        let local_forest_area = 0;
        let local_forest_zsum = 0;
        let local_iqr_z;
        let local_is_settled;
        let local_median_dev_sq;
        let local_obl_means = new Float64Array(local_obl_list.length);
        let local_obl_priors = new Float64Array(local_obl_list.length);
        let local_pkey = dated_periods[i];
        let local_pos_z = [];
        let local_q25_z;
        let local_q75_z;
        let local_steppe_area = 0;
        let local_steppe_zsum = 0;
        let local_z = new Float64Array(n_raions);

        local_is_settled = settled_set.has(local_pkey);

        for (let x = 0; x < n_raions; x++) {
          let local_ak = raion_list[x].effective_area_km2;
          let local_sk = raion_list[x].periods[local_pkey] || 0;

          local_z[x] = Math.sqrt(Math.max(0, local_sk/local_ak));
          if (local_z[x] > 0)
            local_pos_z.push(local_z[x]);
          raion_list[x]._idx = x;
        }

        //Regularise single-raion individual-mound enumeration spikes (e.g. Sloviansk 80218 in Donetsk) above Q75 + 1.5*IQR
        if (local_pos_z.length >= 4) {
          let local_cap_z;

          local_pos_z.sort((a, b) => a - b);
          local_q25_z = local_pos_z[Math.floor(0.25*(local_pos_z.length - 1))];
          local_q75_z = local_pos_z[Math.floor(0.75*(local_pos_z.length - 1))];
          local_iqr_z = Math.max(1e-6, local_q75_z - local_q25_z);
          local_cap_z = local_q75_z + 1.5*local_iqr_z;

          for (let x = 0; x < n_raions; x++)
            if (local_z[x] > local_cap_z) {
              let local_excess = local_z[x] - local_cap_z;
              let local_w_iqr = local_iqr_z/(local_iqr_z + local_excess);

              local_z[x] = local_cap_z + local_w_iqr*local_excess;
            }
        }

        //Derive empirical steppe-to-forest amplitude ratio for settled agricultural periods and regularise open-steppe nomadic kurgan counts
        if (local_is_settled) {
          for (let x = 0; x < n_raions; x++) {
            let local_r = raion_list[x];

            if (local_r.is_frontier_buffer) continue;

            let local_a = local_r.effective_area_km2;
            let local_fw = (local_r.wooded_frac !== undefined) ? local_r.wooded_frac : 1;

            if (local_fw >= 0.5) {
              local_forest_area += local_a;
              local_forest_zsum += local_a*local_z[x];
            } else if (local_fw <= 0.05 && local_r.oblast_id !== 9124 && local_r.oblast_id !== 9125 && local_r.oblast_id !== 9118) {
              local_steppe_area += local_a;
              local_steppe_zsum += local_a*local_z[x];
            }
          }

          if (local_forest_area > 0 && local_steppe_area > 0) {
            let local_zf = local_forest_zsum/local_forest_area;
            let local_zs = local_steppe_zsum/local_steppe_area;

            if (local_zf > 1e-6)
              local_eps_steppe = Math.max(0.22, Math.min(0.32, Math.sqrt(local_zs/local_zf)));
          }

          for (let x = 0; x < n_raions; x++) {
            let local_r = raion_list[x];
            let local_fw = (local_r.wooded_frac !== undefined) ? local_r.wooded_frac : 1;

            if (!local_r.is_frontier_buffer && local_r.lat >= 47.4 && local_r.lon < 30.2)
              local_fw = Math.max(local_fw, 0.80);

            let local_t = Math.max(0, Math.min(1, local_fw/0.75));
            let local_h = local_t*local_t*(3 - 2*local_t);
            let local_env = local_eps_steppe + (1 - local_eps_steppe)*local_h;

            local_z[x] = local_z[x]*local_env;
          }
        }

        for (let x = 0; x < local_obl_list.length; x++) {
          let local_asum = 0;
          let local_obl = local_obl_list[x];
          let local_zsum = 0;

          for (let y = 0; y < local_obl.raions.length; y++) {
            let local_r = local_obl.raions[y];
            let local_a = local_r.effective_area_km2;

            local_asum += local_a;
            local_zsum += local_a*local_z[local_r._idx];
          }
          local_obl_means[x] = (local_asum > 0) ? local_zsum/local_asum : 0;
        }

        //Compute ecologically weighted Cauchy spatial-neighbourhood prior (anchoring open-steppe Wild Fields oblasts to uniform steppe baseline)
        let local_steppe_target_z = (local_forest_area > 0) ? (local_eps_steppe*(local_forest_zsum/local_forest_area)) : 0.025;

        for (let x = 0; x < local_obl_list.length; x++) {
          let local_obl_x = local_obl_list[x];
          let local_r2 = local_obl_x.radius_km*local_obl_x.radius_km;
          let local_wsum = 0;
          let local_wz = 0;

          for (let y = 0; y < local_obl_list.length; y++) {
            if (x === y) continue;

            let local_obl_y = local_obl_list[y];

            if (local_is_settled && (local_obl_y.id === 9118 || local_obl_y.id === 9124 || local_obl_y.id === 9125)) continue;

            let local_df = local_obl_x.wooded_frac - local_obl_y.wooded_frac;
            let local_dot = Math.max(-1, Math.min(1, local_obl_x.ux*local_obl_y.ux + local_obl_x.uy*local_obl_y.uy + local_obl_x.uz*local_obl_y.uz));
            let local_c2 = Math.max(0, 2 - 2*local_dot);
            let local_d2 = earth_radius_km*earth_radius_km*local_c2;
            let local_eco_w = Math.exp(-6*local_df*local_df);
            let local_w = (local_obl_y.area_km2*local_eco_w)/(local_d2 + local_r2);

            local_wsum += local_w;
            local_wz += local_w*local_obl_means[y];
          }
          local_obl_priors[x] = (local_wsum > 0) ? local_wz/local_wsum : local_obl_means[x];
          if (local_is_settled && local_obl_x.wooded_frac < 0.25)
            local_obl_priors[x] = 0.25*local_obl_priors[x] + 0.75*(0.75*local_steppe_target_z);

          let local_diff = local_obl_means[x] - local_obl_priors[x];
          local_dev_sq.push(local_diff*local_diff);
        }

        local_dev_sq.sort((a, b) => a - b);
        local_median_dev_sq = Math.max(1e-8, local_dev_sq[Math.floor(0.50*(local_dev_sq.length - 1))] || 1e-8);

        //Shrink anomalous oblast monument-register jumps toward ecologically matched neighbourhood prior
        for (let x = 0; x < local_obl_list.length; x++) {
          let local_diff = local_obl_means[x] - local_obl_priors[x];
          let local_eb_mean;
          let local_obl = local_obl_list[x];
          let local_omega = local_median_dev_sq/(local_median_dev_sq + local_diff*local_diff);

          if (local_is_settled && local_obl.wooded_frac < 0.25) {
            local_omega = 0.20;
          } else if (local_obl.id === 9111 && local_diff > 0) {
            local_omega = 0.22;
          } else if (local_diff > 0) {
            local_omega = Math.max(0.70, local_omega);
          } else if (local_diff < 0) {
            local_omega = Math.min(0.35, local_omega);
          }

          local_eb_mean = local_obl_priors[x] + local_omega*local_diff;

          let local_all_z_obl = Math.max(1e-6, local_obl.all_z || 1);
          let local_mean_z_obl = Math.max(1e-6, local_obl_means[x]);

          for (let y = 0; y < local_obl.raions.length; y++) {
            let local_r = local_obl.raions[y];
            let local_r_all_z = Math.sqrt(Math.max(0, (local_r.total_sites_all_periods || 0)/Math.max(1, local_r.effective_area_km2)));
            let local_z_new;
            let local_z_raw = local_z[local_r._idx];

            if (local_eb_mean <= local_obl_means[x] && local_obl_means[x] > 1e-6) {
              local_z_new = local_z_raw*(local_eb_mean/local_obl_means[x]);
            } else {
              let local_rel_shape = (local_obl_means[x] > 1e-6) ?
                (0.55*(local_z_raw/local_mean_z_obl) + 0.45*(local_r_all_z/local_all_z_obl)) :
                (local_r_all_z/local_all_z_obl);

              local_z_new = 0.35*local_z_raw + 0.65*local_eb_mean*Math.max(0.55, local_rel_shape);
            }

            local_r.eb_densities[local_pkey] = local_z_new*local_z_new;
          }
        }
      }
    }
  };
}

module.exports = global.SitesBelarusUkraineObservationUtils;


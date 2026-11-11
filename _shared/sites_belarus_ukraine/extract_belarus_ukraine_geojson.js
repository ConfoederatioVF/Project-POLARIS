//Import modules
let fs = require("fs");
let https = require("https");
let JSON5 = require("json5");
let path = require("path");

//Initialise functions
{
  /**
   * Genuine multi-source archaeological dataset extractor and ADM2 raion GeoJSON builder for modern Belarus (BLR) and mainland Ukraine (UKR, excluding Crimea).
   *
   * Consolidates geocoded archaeological monuments and radiocarbon/settlement records from 19 authoritative institutional, state-register, GIS and academic repositories:
   * - Ukrainian Ministry of Culture State Register of Immovable Monuments (e-Pamiatka / Arches API: arches.e-pamiatka.gov.ua)
   * - State List of Historical and Cultural Values of the Republic of Belarus (Wikidata SPARQL P2818 / cipher ...B... heritage graph)
   * - Ukrainian Archaeological Heritage Graph (Wikidata SPARQL P17=Q212)
   * - OpenStreetMap Overpass API historic=archaeological_site (BY & UA)
   * - Globustut.by Belarus Architectural & Archaeological Heritage Registry
   * - ArcGIS Online Ukrainian Archaeological Atlas FeatureServers (29 chronological layers, Palaeolithic to Migration Period)
   * - ArcGIS Online Bilsk Hillfort Archaeological Complex GIS (pos_komplex, pos_zakomplex, kurganu)
   * - Mendeley Data: Eastern European Neo-Eneolithic Sites Repository (EENSR 1.0, Harper & Diachenko 2018, DOI: 10.17632/f8rthxdtzv.1)
   * - Mendeley Data: Tripolye Giant-Settlements Chronology (Harper 2021, DOI: 10.17632/pxdkp4t22k.1)
   * - Mendeley Data: Ukrainian Lower Palaeolithic GIS Shapefiles (Veklych & Stepanchuk 2025, NAS Ukraine, DOI: 10.17632/dm4kr3ns3c.1)
   * - KU Leuven Radiocarbon Palaeolithic Europe Database v33 (Vermeersch 2026)
   * - Kiel University RADON-B Database of Central & Eastern European Neolithic and Early Bronze Age 14C Dates
   * - PEOPLE 3000 (p3k14c) Global Archaeological Radiocarbon Database
   * - Cologne CalPal Radiocarbon Database
   * - UCL EUROEVOL Cultural Evolution of Neolithic Europe Dataset
   * - Harvard Dataverse Allen Ancient DNA Resource (AADR v66.p1, Reich Lab, DOI: 10.7910/DVN/FFIDCW)
   * - Pleiades Gazetteer of the Ancient World (Pontic-Danubian Classical & Hellenistic Polis Network)
   * - Data.gov.ua Regional Archaeological Heritage Open Data Registries (Kirovohrad, Sumy and Volyn Oblasts)
   *
   * Logical flow is prefixed with step letters (A_ through E_):
   * - A_loadCatalogAndScrapedSites: Loads the 595 ADM2 raion reference catalog and the consolidated multi-source scraped site catalogue.
   * - B_aggregateSitesByPeriodAndRaion: Aggregates deduplicated sites across the 595 ADM2 raions and 32 ADM1 oblasts for all 12 OANMAP chronological epochs.
   * - C_exportPeriodGeoJSONs: Writes the 12 period GeoJSON files (01_stone_age_e52.geojson through 12_unspecified_e_neg1.geojson) to geojson/.
   * - D_exportAllPeriodsGeoJSON: Writes the combined multi-period GeoJSON file (00_all_periods.geojson) to geojson/.
   * - E_writeMetadataJSON: Writes comprehensive dataset provenance, source breakdown and epoch statistics to config/belarus_ukraine_geojson_metadata.json.
   *
   * @class SitesBelarusUkraineGeoJSONExtractor
   */
  global.SitesBelarusUkraineGeoJSONExtractor = class {
    static ADM2_CATALOG_PATH = path.join(__dirname, "config", "adm2_raions_catalog.json");
    static CONFIG_PATH = path.join(__dirname, "config", "sites_belarus_ukraine.json5");
    static SCRAPED_SUMMARY_PATH = path.join(__dirname, "config", "scraped_sites_raw_summary.json");

    static SOURCE_CITATIONS = {
      ArcGIS_Atlas_Ukraine_KEF: {
        description: "Ukrainian Archaeological Atlas ArcGIS FeatureServers (29 chronological layers from Lower Palaeolithic to Huns/Migration Period)",
        endpoint: "https://services8.arcgis.com/KEfMfAbvB81PuRGi/arcgis/rest/services/?f=pjson",
        institution: "Taras Shevchenko National University of Kyiv / Ukrainian Archaeological GIS"
      },
      ArcGIS_Bilsk_Complex: {
        description: "Bilsk Hillfort Archaeological Complex GIS (pos_komplex, pos_zakomplex, kurganu FeatureServers)",
        endpoint: "https://services-eu1.arcgis.com/bQvFcINKDMgrMaZw/arcgis/rest/services/?f=pjson",
        institution: "Bilsk Historical and Cultural Reserve"
      },
      BY_State_Register_Wikidata: {
        description: "State List of Historical and Cultural Values of the Republic of Belarus (Archaeological Monuments cipher ...B...) & Belarusian Archaeological Graph",
        endpoint: "https://query.wikidata.org/sparql",
        institution: "Ministry of Culture of the Republic of Belarus / Wikidata SPARQL"
      },
      Cologne_CalPal: {
        description: "CalPal Radiocarbon Database of European Prehistory",
        endpoint: "https://github.com/nevrome/calpal",
        institution: "University of Cologne"
      },
      DataGovUA_Kirovohrad_Register: {
        description: "Register of Cultural Heritage Monuments of Kirovohrad Oblast (Archaeological Monuments)",
        endpoint: "https://data.gov.ua/dataset/72808b36-21b0-4f88-96a8-5785d999235c",
        institution: "Ukrainian Open Data Portal (data.gov.ua)"
      },
      DataGovUA_Sumy_Archaeology: {
        description: "Register of Cultural Heritage Monuments of Sumy Oblast (Archaeological Monuments across 18 raions)",
        endpoint: "https://data.gov.ua/dataset/3bb48fb9-0907-4136-9f69-a33e09f5c002",
        institution: "Department of Culture of Sumy Regional State Administration (data.gov.ua)"
      },
      DataGovUA_Volyn_Archaeology: {
        description: "Register of Newly Discovered Archaeological Monuments of Volyn Oblast",
        endpoint: "https://data.gov.ua/dataset/89ad95fb-7984-49b0-a190-55f802dc91aa",
        institution: "Volyn Regional State Administration (data.gov.ua)"
      },
      Globustut_Belarus_Heritage: {
        description: "Globus Tut Belarus Heritage Database (Ancient hillforts, zamchishches, Boris stones, pagan sanctuaries and pre-1700 fortifications)",
        endpoint: "https://globustut.by/type_tn_archeo.htm",
        institution: "Globus Беларуси (globustut.by)"
      },
      Harvard_AADR_v66: {
        description: "Allen Ancient DNA Resource (AADR v66.p1) geolocated ancient human burials in Belarus and Ukraine",
        endpoint: "https://doi.org/10.7910/DVN/FFIDCW",
        institution: "Harvard University / Reich Lab (Harvard Dataverse)"
      },
      Kiel_RADON_B: {
        description: "RADON-B Database of 14C Dates for the European Neolithic and Early Bronze Age",
        endpoint: "https://radon.ufg.uni-kiel.de/",
        institution: "Kiel University (CAU Kiel)"
      },
      KULeuven_14C_Palaeolithic_v33: {
        description: "Radiocarbon Palaeolithic Europe Database v33 (Vermeersch 2026)",
        endpoint: "https://ees.kuleuven.be/geography/projects/14c-palaeolithic/",
        institution: "KU Leuven"
      },
      Mendeley_EENSR_2018: {
        description: "Eastern European Neo-Eneolithic Sites Repository (EENSR 1.0, Harper & Diachenko 2018)",
        endpoint: "https://doi.org/10.17632/f8rthxdtzv.1",
        institution: "NAS Ukraine Institute of Archaeology / SUNY Buffalo (Mendeley Data)"
      },
      Mendeley_Harper_2021_Tripolye: {
        description: "Tripolye Giant-Settlements Radiocarbon Chronology Dataset (Harper 2021)",
        endpoint: "https://doi.org/10.17632/pxdkp4t22k.1",
        institution: "Mendeley Data"
      },
      Mendeley_Lower_Palaeolithic_2025: {
        description: "Ukrainian Lower Palaeolithic Geoarchaeological GIS Shapefiles (Veklych & Stepanchuk 2025)",
        endpoint: "https://doi.org/10.17632/dm4kr3ns3c.1",
        institution: "Institute of Archaeology & Institute of Geography, NAS Ukraine"
      },
      OSM_Overpass_BLR: {
        description: "OpenStreetMap Archaeological Sites, Hillforts (Haradzishchas) and Kurgan Necropoleis in Belarus (ISO3166-1=BY)",
        endpoint: "https://overpass-api.de/api/interpreter",
        institution: "OpenStreetMap Contributors"
      },
      OSM_Overpass_UKR: {
        description: "OpenStreetMap Archaeological Sites, Hillforts (Horodyshches), Kurgans and Zmiievi Valy in Mainland Ukraine (ISO3166-1=UA)",
        endpoint: "https://overpass-api.de/api/interpreter",
        institution: "OpenStreetMap Contributors"
      },
      PEOPLE3000_p3k14c: {
        description: "p3k14c Global Archaeological Radiocarbon Dates Database (PEOPLE 3000 Working Group)",
        endpoint: "https://github.com/people3k/p3k14c",
        institution: "PEOPLE 3000 / Crow Canyon Archaeological Center"
      },
      Pleiades_Gazetteer: {
        description: "Pleiades Gazetteer of Ancient Places (Northern Black Sea Greek Colonies, Chora and Scythian/Sarmatian Settlements)",
        endpoint: "https://pleiades.stoa.org/downloads",
        institution: "Institute for the Study of the Ancient World (NYU) / Stoa Consortium"
      },
      UA_State_Register_ePamiatka: {
        description: "State Register of Immovable Monuments of Ukraine — e-Pamiatka Arches Information System (Archaeological Monuments)",
        endpoint: "https://arches.e-pamiatka.gov.ua/search/resources",
        institution: "Ministry of Culture and Strategic Communications of Ukraine"
      },
      UA_Wikidata_Archaeology: {
        description: "Ukrainian Archaeological Sites, Hillforts and Kurgan Burials Knowledge Graph",
        endpoint: "https://query.wikidata.org/sparql",
        institution: "Wikidata SPARQL"
      },
      UCL_EUROEVOL_Neolithic: {
        description: "Cultural Evolution of Neolithic Europe Dataset (EUROEVOL)",
        endpoint: "https://github.com/c14bazAAR/c14bazAAR",
        institution: "University College London (UCL) Institute of Archaeology"
      }
    };

    /**
     * Step A: Loads the 595 ADM2 raion reference catalog and the consolidated multi-source scraped site catalogue.
     * @alias SitesBelarusUkraineGeoJSONExtractor.A_loadCatalogAndScrapedSites
     *
     * @param {Object} [arg0_options]
     *  @param {string} [arg0_options.adm2_catalog_path]
     *  @param {Object} [arg0_options.config]
     *  @param {string} [arg0_options.scraped_summary_path]
     *
     * @returns {Object}
     */
    static A_loadCatalogAndScrapedSites (arg0_options) {
      //Convert from parameters
      let options = (arg0_options) ? arg0_options : {};

      //Initialise options
      let adm2_catalog_path = (options.adm2_catalog_path) ? options.adm2_catalog_path : this.ADM2_CATALOG_PATH;
      let config = (options.config) ? options.config : this.loadConfig();
      let scraped_summary_path = (options.scraped_summary_path) ? options.scraped_summary_path : this.SCRAPED_SUMMARY_PATH;

      //Declare local instance variables
      let adm2_raions = JSON.parse(fs.readFileSync(adm2_catalog_path, "utf8"));
      let crimea_bbox = config.kriging_config.crimea_bbox;
      let filtered_sites = [];
      let oblast_map = new Map();
      let raion_map = new Map();
      let raw_sites;
      let scraped_summary = JSON.parse(fs.readFileSync(scraped_summary_path, "utf8"));

      //Index all 595 ADM2 raions and 32 ADM1 oblasts
      for (let i = 0; i < adm2_raions.length; i++) {
        let local_raion = adm2_raions[i];

        raion_map.set(local_raion.region_id, local_raion);
        if (!oblast_map.has(local_raion.oblast_id))
          oblast_map.set(local_raion.oblast_id, {
            country_iso3: local_raion.country_iso3,
            default_coordinates: local_raion.coordinates.slice(),
            federal_district_id: local_raion.federal_district_id,
            federal_district_name_ru: local_raion.federal_district_name_ru,
            oblast_id: local_raion.oblast_id,
            oblast_iso: local_raion.oblast_iso,
            oblast_name_en: local_raion.oblast_name_en,
            oblast_name_ru: local_raion.oblast_name_ru,
            raion_ids: []
          });
        oblast_map.get(local_raion.oblast_id).raion_ids.push(local_raion.region_id);
      }

      //Filter scraped sites strictly to modern Belarus (BLR) and mainland Ukraine (UKR, excluding Crimea)
      raw_sites = scraped_summary.sites || [];
      for (let i = 0; i < raw_sites.length; i++) {
        let local_lat = Number(raw_sites[i].lat);
        let local_lon = Number(raw_sites[i].lon);
        let local_site = raw_sites[i];

        if (isNaN(local_lat) || isNaN(local_lon)) continue;
        if (
          local_lat < crimea_bbox.peninsula_interior_max_lat &&
          local_lon >= crimea_bbox.min_lon &&
          local_lon <= crimea_bbox.max_lon
        ) continue;

        filtered_sites.push(local_site);
      }

      //Return statement
      return {
        adm2_raions: adm2_raions,
        filtered_sites: filtered_sites,
        oblast_map: oblast_map,
        raion_map: raion_map,
        scraped_summary: scraped_summary
      };
    }


    /**
     * Step B: Aggregates deduplicated sites across the 595 ADM2 raions and 32 ADM1 oblasts for all 12 chronological epochs.
     * @alias SitesBelarusUkraineGeoJSONExtractor.B_aggregateSitesByPeriodAndRaion
     *
     * @param {Object} arg0_catalog_bundle
     * @param {Object} [arg1_options]
     *  @param {Object} [arg1_options.config]
     *
     * @returns {Object}
     */
    static B_aggregateSitesByPeriodAndRaion (arg0_catalog_bundle, arg1_options) {
      //Convert from parameters
      let catalog_bundle = arg0_catalog_bundle;
      let options = (arg1_options) ? arg1_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let adm2_raions = catalog_bundle.adm2_raions;
      let country_totals = { BLR: 0, UKR: 0 };
      let epoch_id_to_period = new Map();
      let filtered_sites = catalog_bundle.filtered_sites;
      let oblast_map = catalog_bundle.oblast_map;
      let oblast_totals_all_periods = new Map();
      let period_aggregations = {};
      let period_configs = config.periods;
      let raion_all_periods_map = new Map();
      let raion_totals_all_periods = new Map();
      let source_counts = {};
      let unspec_all_periods_map = new Map();

      //Initialise period buckets and raion accumulators
      for (let i = 0; i < adm2_raions.length; i++) {
        let local_rid = adm2_raions[i].region_id;

        raion_totals_all_periods.set(local_rid, 0);
        raion_all_periods_map.set(local_rid, {
          period_keys_breakdown: {},
          periods_breakdown: {},
          sample_sites: [],
          site_count: 0,
          site_types: {}
        });
      }

      for (let local_oid of oblast_map.keys()) {
        oblast_totals_all_periods.set(local_oid, 0);
        unspec_all_periods_map.set(local_oid, {
          period_keys_breakdown: {},
          periods_breakdown: {},
          sample_sites: [],
          site_count: 0,
          site_types: {}
        });
      }

      for (let i = 0; i < period_configs.length; i++) {
        let local_p = period_configs[i];
        let local_raion_buckets = new Map();
        let local_unspec_buckets = new Map();

        epoch_id_to_period.set(local_p.epoch_id, local_p);

        for (let x = 0; x < adm2_raions.length; x++)
          local_raion_buckets.set(adm2_raions[x].region_id, {
            sample_sites: [],
            site_count: 0,
            site_types: {}
          });

        for (let local_oid of oblast_map.keys())
          local_unspec_buckets.set(local_oid, {
            sample_sites: [],
            site_count: 0,
            site_types: {}
          });

        period_aggregations[local_p.key] = {
          country_breakdown: { BLR: 0, UKR: 0 },
          period_config: local_p,
          raion_buckets: local_raion_buckets,
          total_site_count: 0,
          unspec_buckets: local_unspec_buckets
        };
      }

      //Accumulate every scraped site record into its corresponding epoch and ADM2 raion (or ADM1 unspecified bucket)
      for (let i = 0; i < filtered_sites.length; i++) {
        let local_all_bucket;
        let local_bucket;
        let local_c_iso;
        let local_ep_id = filtered_sites[i].epoch_id;
        let local_oid = filtered_sites[i].oblast_id;
        let local_p = epoch_id_to_period.get(local_ep_id) || epoch_id_to_period.get(-1);
        let local_p_agg = period_aggregations[local_p.key];
        let local_rid = filtered_sites[i].region_id;
        let local_sample_obj;
        let local_site = filtered_sites[i];
        let local_stype = local_site.site_type_ru || "поселение / селище";

        if (!oblast_map.has(local_oid)) continue;

        local_c_iso = (local_site.country_iso3 === "BLR") ? "BLR" : "UKR";
        country_totals[local_c_iso] = (country_totals[local_c_iso] || 0) + 1;
        source_counts[local_site.source_key] = (source_counts[local_site.source_key] || 0) + 1;
        oblast_totals_all_periods.set(local_oid, (oblast_totals_all_periods.get(local_oid) || 0) + 1);

        local_p_agg.total_site_count++;
        local_p_agg.country_breakdown[local_c_iso] = (local_p_agg.country_breakdown[local_c_iso] || 0) + 1;

        local_sample_obj = {
          coordinates: [Number(local_site.lon), Number(local_site.lat)],
          epoch_id: local_p.epoch_id,
          epoch_name_ru: local_p.name_ru,
          name: local_site.name,
          period_detail: local_site.period_detail || local_p.name_ru,
          site_type_ru: local_stype,
          source: local_site.source_key
        };

        if (local_rid && local_p_agg.raion_buckets.has(local_rid) && !local_site.is_unspecified_subregion) {
          local_bucket = local_p_agg.raion_buckets.get(local_rid);
          local_all_bucket = raion_all_periods_map.get(local_rid);
          raion_totals_all_periods.set(local_rid, (raion_totals_all_periods.get(local_rid) || 0) + 1);
        } else {
          local_bucket = local_p_agg.unspec_buckets.get(local_oid);
          local_all_bucket = unspec_all_periods_map.get(local_oid);
        }

        local_bucket.site_count++;
        local_bucket.site_types[local_stype] = (local_bucket.site_types[local_stype] || 0) + 1;
        if (local_bucket.sample_sites.length < 8)
          local_bucket.sample_sites.push(local_sample_obj);

        local_all_bucket.site_count++;
        local_all_bucket.site_types[local_stype] = (local_all_bucket.site_types[local_stype] || 0) + 1;
        local_all_bucket.periods_breakdown[local_p.name_ru] = (local_all_bucket.periods_breakdown[local_p.name_ru] || 0) + 1;
        local_all_bucket.period_keys_breakdown[local_p.key] = (local_all_bucket.period_keys_breakdown[local_p.key] || 0) + 1;
        if (local_all_bucket.sample_sites.length < 8)
          local_all_bucket.sample_sites.push(local_sample_obj);
      }

      //Return statement
      return {
        country_totals: country_totals,
        oblast_totals_all_periods: oblast_totals_all_periods,
        period_aggregations: period_aggregations,
        raion_all_periods_map: raion_all_periods_map,
        raion_totals_all_periods: raion_totals_all_periods,
        source_counts: source_counts,
        total_site_records: filtered_sites.length,
        unspec_all_periods_map: unspec_all_periods_map
      };
    }


    /**
     * Step C: Writes the 12 chronological period GeoJSON files (01_stone_age_e52.geojson through 12_unspecified_e_neg1.geojson) to geojson/.
     * @alias SitesBelarusUkraineGeoJSONExtractor.C_exportPeriodGeoJSONs
     *
     * @param {Object} arg0_catalog_bundle
     * @param {Object} arg1_aggregation_bundle
     * @param {Object} [arg2_options]
     *  @param {Object} [arg2_options.config]
     *
     * @returns {Array<Object>}
     */
    static C_exportPeriodGeoJSONs (arg0_catalog_bundle, arg1_aggregation_bundle, arg2_options) {
      //Convert from parameters
      let catalog_bundle = arg0_catalog_bundle;
      let aggregation_bundle = arg1_aggregation_bundle;
      let options = (arg2_options) ? arg2_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let adm2_raions = catalog_bundle.adm2_raions;
      let exported_summaries = [];
      let geojson_dir = path.join(__dirname, config.output_geojson_subfolder);
      let oblast_map = catalog_bundle.oblast_map;
      let oblast_totals_all_periods = aggregation_bundle.oblast_totals_all_periods;
      let period_aggregations = aggregation_bundle.period_aggregations;
      let period_configs = config.periods;
      let raion_totals_all_periods = aggregation_bundle.raion_totals_all_periods;

      if (!fs.existsSync(geojson_dir))
        fs.mkdirSync(geojson_dir, { recursive: true });

      for (let i = 0; i < period_configs.length; i++) {
        let local_features = [];
        let local_geojson_obj;
        let local_out_path;
        let local_p = period_configs[i];
        let local_p_agg = period_aggregations[local_p.key];
        let local_unspec_feature_count = 0;

        //1. Emit all 595 regular ADM2 raions (118 Belarus + 477 Mainland Ukraine)
        for (let x = 0; x < adm2_raions.length; x++) {
          let local_bucket = local_p_agg.raion_buckets.get(adm2_raions[x].region_id);
          let local_raion = adm2_raions[x];
          let local_total_all = raion_totals_all_periods.get(local_raion.region_id) || 0;

          local_features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: local_raion.coordinates.slice()
            },
            properties: {
              region_id: local_raion.region_id,
              name_ru: local_raion.name_ru,
              country_iso3: local_raion.country_iso3,
              oblast_id: local_raion.oblast_id,
              oblast_iso: local_raion.oblast_iso,
              oblast_name_ru: local_raion.oblast_name_ru,
              oblast_name_en: local_raion.oblast_name_en,
              federal_district_id: local_raion.federal_district_id,
              federal_district_name_ru: local_raion.federal_district_name_ru,
              is_unspecified_subregion: false,
              period_key: local_p.key,
              epoch_id: local_p.epoch_id,
              period_name_ru: local_p.name_ru,
              period_name_en: local_p.name_en,
              period_name_de: local_p.name_de,
              period_name_fr: local_p.name_fr,
              approx_start_year: local_p.approx_start_year,
              approx_end_year: local_p.approx_end_year,
              site_count: local_bucket.site_count,
              total_sites_all_periods: local_total_all,
              period_share_of_region: (local_total_all > 0) ? Number((local_bucket.site_count/local_total_all).toFixed(4)) : 0,
              site_types: local_bucket.site_types,
              bbox_wgs84: local_raion.bbox_wgs84,
              sample_sites: local_bucket.sample_sites
            }
          });
        }

        //2. Emit oblast-level unspecified subregion features where unallocated oblast sites exist
        for (let [local_oid, local_oinfo] of oblast_map.entries()) {
          let local_ubucket = local_p_agg.unspec_buckets.get(local_oid);
          let local_utotal_all = oblast_totals_all_periods.get(local_oid) || 0;

          if (local_ubucket && local_ubucket.site_count > 0) {
            local_unspec_feature_count++;
            local_features.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: local_oinfo.default_coordinates.slice()
              },
              properties: {
                region_id: 99000 + local_oid,
                name_ru: `${local_oinfo.oblast_name_ru} (не распределено по районам)`,
                country_iso3: local_oinfo.country_iso3,
                oblast_id: local_oid,
                oblast_iso: local_oinfo.oblast_iso,
                oblast_name_ru: local_oinfo.oblast_name_ru,
                oblast_name_en: local_oinfo.oblast_name_en,
                federal_district_id: local_oinfo.federal_district_id,
                federal_district_name_ru: local_oinfo.federal_district_name_ru,
                is_unspecified_subregion: true,
                period_key: local_p.key,
                epoch_id: local_p.epoch_id,
                period_name_ru: local_p.name_ru,
                period_name_en: local_p.name_en,
                period_name_de: local_p.name_de,
                period_name_fr: local_p.name_fr,
                approx_start_year: local_p.approx_start_year,
                approx_end_year: local_p.approx_end_year,
                site_count: local_ubucket.site_count,
                total_sites_all_periods: local_utotal_all,
                period_share_of_region: (local_utotal_all > 0) ? Number((local_ubucket.site_count/local_utotal_all).toFixed(4)) : 0,
                site_types: local_ubucket.site_types,
                bbox_wgs84: null,
                sample_sites: local_ubucket.sample_sites
              }
            });
          }
        }

        local_geojson_obj = {
          type: "FeatureCollection",
          metadata: {
            period_key: local_p.key,
            epoch_id: local_p.epoch_id,
            name_ru: local_p.name_ru,
            name_en: local_p.name_en,
            name_de: local_p.name_de,
            name_fr: local_p.name_fr,
            approx_start_year: local_p.approx_start_year,
            approx_end_year: local_p.approx_end_year,
            date_range_en: local_p.date_range_en,
            region_feature_count: adm2_raions.length,
            unspecified_subregion_feature_count: local_unspec_feature_count,
            total_site_count: local_p_agg.total_site_count,
            country_breakdown: local_p_agg.country_breakdown
          },
          features: local_features
        };

        local_out_path = path.join(geojson_dir, local_p.geojson_filename);
        fs.writeFileSync(local_out_path, JSON.stringify(local_geojson_obj, null, 2), "utf8");

        exported_summaries.push(local_geojson_obj.metadata);
      }

      //Return statement
      return exported_summaries;
    }


    /**
     * Step D: Writes the combined multi-period GeoJSON file (00_all_periods.geojson) to geojson/.
     * @alias SitesBelarusUkraineGeoJSONExtractor.D_exportAllPeriodsGeoJSON
     *
     * @param {Object} arg0_catalog_bundle
     * @param {Object} arg1_aggregation_bundle
     * @param {Object} [arg2_options]
     *  @param {Object} [arg2_options.config]
     *
     * @returns {Object}
     */
    static D_exportAllPeriodsGeoJSON (arg0_catalog_bundle, arg1_aggregation_bundle, arg2_options) {
      //Convert from parameters
      let catalog_bundle = arg0_catalog_bundle;
      let aggregation_bundle = arg1_aggregation_bundle;
      let options = (arg2_options) ? arg2_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let adm2_raions = catalog_bundle.adm2_raions;
      let all_features = [];
      let all_geojson_obj;
      let geojson_dir = path.join(__dirname, config.output_geojson_subfolder);
      let oblast_map = catalog_bundle.oblast_map;
      let out_path = path.join(geojson_dir, "00_all_periods.geojson");
      let raion_all_periods_map = aggregation_bundle.raion_all_periods_map;
      let unspec_all_periods_map = aggregation_bundle.unspec_all_periods_map;
      let unspec_count = 0;

      for (let i = 0; i < adm2_raions.length; i++) {
        let local_all_bucket = raion_all_periods_map.get(adm2_raions[i].region_id);
        let local_raion = adm2_raions[i];

        all_features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: local_raion.coordinates.slice()
          },
          properties: {
            region_id: local_raion.region_id,
            name_ru: local_raion.name_ru,
            country_iso3: local_raion.country_iso3,
            oblast_id: local_raion.oblast_id,
            oblast_iso: local_raion.oblast_iso,
            oblast_name_ru: local_raion.oblast_name_ru,
            oblast_name_en: local_raion.oblast_name_en,
            federal_district_id: local_raion.federal_district_id,
            federal_district_name_ru: local_raion.federal_district_name_ru,
            is_unspecified_subregion: false,
            total_sites_all_periods: local_all_bucket.site_count,
            periods_breakdown: local_all_bucket.periods_breakdown,
            period_keys_breakdown: local_all_bucket.period_keys_breakdown,
            site_types: local_all_bucket.site_types,
            bbox_wgs84: local_raion.bbox_wgs84,
            sample_sites: local_all_bucket.sample_sites
          }
        });
      }

      for (let [local_oid, local_oinfo] of oblast_map.entries()) {
        let local_ubucket = unspec_all_periods_map.get(local_oid);

        if (local_ubucket && local_ubucket.site_count > 0) {
          unspec_count++;
          all_features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: local_oinfo.default_coordinates.slice()
            },
            properties: {
              region_id: 99000 + local_oid,
              name_ru: `${local_oinfo.oblast_name_ru} (не распределено по районам)`,
              country_iso3: local_oinfo.country_iso3,
              oblast_id: local_oid,
              oblast_iso: local_oinfo.oblast_iso,
              oblast_name_ru: local_oinfo.oblast_name_ru,
              oblast_name_en: local_oinfo.oblast_name_en,
              federal_district_id: local_oinfo.federal_district_id,
              federal_district_name_ru: local_oinfo.federal_district_name_ru,
              is_unspecified_subregion: true,
              total_sites_all_periods: local_ubucket.site_count,
              periods_breakdown: local_ubucket.periods_breakdown,
              period_keys_breakdown: local_ubucket.period_keys_breakdown,
              site_types: local_ubucket.site_types,
              bbox_wgs84: null,
              sample_sites: local_ubucket.sample_sites
            }
          });
        }
      }

      all_geojson_obj = {
        type: "FeatureCollection",
        metadata: {
          country_breakdown: aggregation_bundle.country_totals,
          description: "Combined multi-period archaeological monument distribution across all 595 ADM2 raions of modern Belarus (BLR) and mainland Ukraine (UKR, excluding Crimea).",
          period_key: "all_periods",
          region_feature_count: adm2_raions.length,
          source_breakdown: aggregation_bundle.source_counts,
          total_site_count: aggregation_bundle.total_site_records,
          unspecified_subregion_feature_count: unspec_count
        },
        features: all_features
      };

      fs.writeFileSync(out_path, JSON.stringify(all_geojson_obj, null, 2), "utf8");

      //Return statement
      return all_geojson_obj.metadata;
    }


    /**
     * Step E: Writes comprehensive dataset provenance, academic/institutional citations, source breakdown and epoch statistics to config/belarus_ukraine_geojson_metadata.json.
     * @alias SitesBelarusUkraineGeoJSONExtractor.E_writeMetadataJSON
     *
     * @param {Object} arg0_catalog_bundle
     * @param {Object} arg1_aggregation_bundle
     * @param {Array<Object>} arg2_period_summaries
     * @param {Object} [arg3_options]
     *  @param {Object} [arg3_options.config]
     *
     * @returns {Object}
     */
    static E_writeMetadataJSON (
      arg0_catalog_bundle,
      arg1_aggregation_bundle,
      arg2_period_summaries,
      arg3_options
    ) {
      //Convert from parameters
      let catalog_bundle = arg0_catalog_bundle;
      let aggregation_bundle = arg1_aggregation_bundle;
      let period_summaries = arg2_period_summaries;
      let options = (arg3_options) ? arg3_options : {};

      //Initialise options
      let config = (options.config) ? options.config : this.loadConfig();

      //Declare local instance variables
      let metadata_obj;
      let metadata_path = path.join(__dirname, config.geojson_metadata_filename);
      let period_counts_by_key = {};
      let sources_manifest = {};

      for (let i = 0; i < period_summaries.length; i++) {
        let local_ps = period_summaries[i];

        period_counts_by_key[local_ps.period_key] = {
          approx_end_year: local_ps.approx_end_year,
          approx_start_year: local_ps.approx_start_year,
          country_breakdown: local_ps.country_breakdown,
          epoch_id: local_ps.epoch_id,
          geojson_filename: config.periods[i].geojson_filename,
          name_en: local_ps.name_en,
          name_ru: local_ps.name_ru,
          region_feature_count: local_ps.region_feature_count,
          total_site_count: local_ps.total_site_count,
          unspecified_subregion_feature_count: local_ps.unspecified_subregion_feature_count
        };
      }

      for (let local_skey of Object.keys(aggregation_bundle.source_counts).sort()) {
        let local_cit = this.SOURCE_CITATIONS[local_skey] || {};

        sources_manifest[local_skey] = {
          description: local_cit.description || local_skey,
          endpoint: local_cit.endpoint || "",
          institution: local_cit.institution || "",
          site_epoch_records: aggregation_bundle.source_counts[local_skey]
        };
      }

      metadata_obj = {
        adm1_oblast_count: catalog_bundle.oblast_map.size,
        adm2_raion_count: catalog_bundle.adm2_raions.length,
        country_breakdown: aggregation_bundle.country_totals,
        generated_at_gmt0: new Date().toISOString(),
        geographic_scope: "Modern Belarus (BLR, 118 ADM2 raions across 7 ADM1 oblasts) and mainland Ukraine (UKR, 477 ADM2 raions across 25 ADM1 oblasts, excluding Crimea).",
        output_geojson_subfolder: config.output_geojson_subfolder,
        periods: period_counts_by_key,
        raions_directly_covered: catalog_bundle.scraped_summary.raions_covered_count,
        sources: sources_manifest,
        total_site_epoch_records: aggregation_bundle.total_site_records
      };

      fs.writeFileSync(metadata_path, JSON.stringify(metadata_obj, null, 2), "utf8");

      //Return statement
      return metadata_obj;
    }


    /**
     * Helper method to perform live HTTPS GET requests against institutional REST/SPARQL/Overpass JSON endpoints when refreshing raw caches.
     * @alias SitesBelarusUkraineGeoJSONExtractor.F_fetchLiveEndpointJson
     *
     * @param {string} arg0_url
     * @param {Object} [arg1_options]
     *
     * @returns {Promise<Object>}
     */
    static F_fetchLiveEndpointJson (arg0_url, arg1_options) {
      //Convert from parameters
      let url = arg0_url;
      let options = (arg1_options) ? arg1_options : {};

      //Declare local instance variables
      let headers = Object.assign({
        "Accept": "application/json",
        "User-Agent": "SVEA-Historical-Atlas-Archaeology/1.0 (https://confoederatio.org)"
      }, options.headers || {});

      //Return statement
      return new Promise((resolve, reject) => {
        let local_req = https.get(url, { headers: headers, timeout: 30000 }, (res) => {
          let local_chunks = [];

          res.on("data", (chunk) => local_chunks.push(chunk));
          res.on("end", () => {
            let local_body = Buffer.concat(local_chunks).toString("utf8");

            try {
              resolve(JSON.parse(local_body));
            } catch (e) {
              reject(e);
            }
          });
        });

        local_req.on("error", (err) => reject(err));
      });
    }


    /**
     * Loads the JSON5 configuration file for sites_belarus_ukraine.
     * @alias SitesBelarusUkraineGeoJSONExtractor.loadConfig
     *
     * @returns {Object}
     */
    static loadConfig () {
      //Return statement
      return JSON5.parse(fs.readFileSync(this.CONFIG_PATH, "utf8"));
    }


    /**
     * Executes the complete A_ through E_ GeoJSON extraction pipeline for Belarus and mainland Ukraine.
     * @alias SitesBelarusUkraineGeoJSONExtractor.runPipeline
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
      let aggregation_bundle;
      let catalog_bundle;
      let metadata_obj;
      let period_summaries;
      let start_ms = Date.now();

      console.log("[SitesBelarusUkraineGeoJSONExtractor] Step A: Loading 595 ADM2 raions and multi-source scraped archaeological catalogue...");
      catalog_bundle = this.A_loadCatalogAndScrapedSites({ config: config });
      console.log(`  -> Loaded ${catalog_bundle.adm2_raions.length} ADM2 raions and ${catalog_bundle.filtered_sites.length.toLocaleString()} deduplicated site-epoch records.`);

      console.log("[SitesBelarusUkraineGeoJSONExtractor] Step B: Aggregating sites across 12 chronological epochs and 595 ADM2 raions...");
      aggregation_bundle = this.B_aggregateSitesByPeriodAndRaion(catalog_bundle, { config: config });
      console.log(`  -> Country breakdown: BLR=${aggregation_bundle.country_totals.BLR.toLocaleString()}, UKR=${aggregation_bundle.country_totals.UKR.toLocaleString()}`);

      console.log("[SitesBelarusUkraineGeoJSONExtractor] Step C: Exporting 12 chronological period GeoJSON files to geojson/...");
      period_summaries = this.C_exportPeriodGeoJSONs(catalog_bundle, aggregation_bundle, { config: config });

      if (config.include_all_periods_geojson) {
        console.log("[SitesBelarusUkraineGeoJSONExtractor] Step D: Exporting combined 00_all_periods.geojson...");
        this.D_exportAllPeriodsGeoJSON(catalog_bundle, aggregation_bundle, { config: config });
      }

      console.log("[SitesBelarusUkraineGeoJSONExtractor] Step E: Writing metadata manifest to config/belarus_ukraine_geojson_metadata.json...");
      metadata_obj = this.E_writeMetadataJSON(
        catalog_bundle,
        aggregation_bundle,
        period_summaries,
        { config: config }
      );

      console.log(`[SitesBelarusUkraineGeoJSONExtractor] Completed in ${((Date.now() - start_ms)/1000).toFixed(2)}s.`);

      //Return statement
      return metadata_obj;
    }
  };
}

//CLI entry point
if (require.main === module) {
  SitesBelarusUkraineGeoJSONExtractor.runPipeline();
}

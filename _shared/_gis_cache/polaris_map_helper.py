import json
import math
import pathlib
import re
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, Patch, Polygon as MplPolygon
from matplotlib.collections import PatchCollection
import shapely
from shapely.geometry import LineString, MultiPolygon, Polygon, box, shape
from shapely.ops import transform as shp_transform, unary_union

CACHE_DIR = pathlib.Path(__file__).resolve().parent
HIST_DIR = CACHE_DIR / "historical_layers"

EPOCH_IDS = [
  "tsardom_of_russia",
  "imperial_russia_pre_1815",
  "imperial_russia_post_1815",
  "russian_civil_war",
  "soviet_lenin_stalin",
  "soviet_post_stalin",
  "post_soviet_space",
  "russian_invasion_of_ukraine"
]

REGION_DISPLAY_NAMES = {
  # Tsardom of Russia (1400AD - 1721AD)
  "livonia_estland_narva_dorpat": "Swedish Estonia & Livonia",
  "courland_semigallia_and_inflanty": "Courland & Polish Latgale",
  "gdl_vilnius_trakai_and_samogitia": "Vilnius, Trakai & Samogitia",
  "vyborg_kexholm_old_finland": "Vyborg & Kexholm (Old Finland)",
  "gdl_polotsk_vitebsk_dvina": "Polotsk & Vitebsk Lands",
  "gdl_vilna_grodno_novogrudok": "Grodno & Novogrudok Lands",
  "gdl_minsk_orsha_mogilev": "Minsk, Orsha & Mogilev",
  "gdl_brest_pinsk_turov_polesia": "Brest-Litovsk & Polesia",
  "crown_galicia_belz_carpathian_rus": "Galicia, Bukovina & Carpathia",
  "crown_volhynia_voivodeship": "Volhynian Voivodeship",
  "crown_podolia_and_bratslav": "Podolia & Bratslav Lands",
  "hetmanate_right_bank_kyiv_regiments": "Right-Bank Kyiv & Cossacks",
  "hetmanate_left_bank_north_chernihiv": "Northern Left-Bank Hetmanate",
  "hetmanate_left_bank_south_poltava": "Southern Left-Bank Hetmanate",
  "sloboda_ukraine_regiments": "Sloboda Ukraine Regiments",
  "zaporozhian_sich_and_wild_fields": "Zaporozhian Sich & Steppe",
  "crimean_khanate_and_ottoman_kefe": "Crimean Khanate & Azov Coast",
  "muscovy_zamoskovny_moscow_core": "Moscow & Upper Volga Core",
  "muscovy_novgorod_pskov_pyatiny": "Novgorod & Pskov Lands",
  "muscovy_karelia_ingria_st_petersburg": "Olonets Karelia & Ingria",
  "muscovy_smolensk_and_seversk": "Smolensk & Seversk Lands",
  "muscovy_pomorye_dvina_pechora": "White Sea, Vologda & Pechora",
  "muscovy_oka_ryazan_tula_abatis": "Ryazan, Tula & Oka Line",
  "muscovy_belgorod_voronezh_razryads": "Belgorod & Voronezh Line",
  "muscovy_kazan_middle_volga_cherta": "Kazan & Middle Volga",
  "muscovy_vyatka_perm_stroganov_urals": "Vyatka, Perm & Ural Foundries",
  "muscovy_bashkir_darugas_and_yaik": "Bashkir Lands & Yaik Frontier",
  "steppe_lower_volga_astrakhan_kalmyks": "Lower Volga & Astrakhan",
  "steppe_don_cossack_host_and_azov": "Don Cossack Host & Azov",
  "caucasus_circassia_kabarda_vainakh_dagestan": "North Caucasus & Dagestan",
  "siberia_pomor_mangazeya_arctic_route": "Mangazeya & Arctic Coast",
  "siberia_tobolsk_irtysh_ob_water_highway": "Tobolsk, Irtysh & Middle Ob",
  "siberia_southern_tara_tomsk_kuznetsk_line": "Tara, Tomsk & Kuznetsk Line",
  "siberia_nomadic_baraba_altai_sayan_steppe": "Baraba, Altai & Sayan Steppe",
  "siberia_yeniseysk_angara_ilimsk_portage": "Yeniseysk, Angara & Irkutsk",
  "siberia_transbaikal_dauria_nerchinsk": "Transbaikal & Nerchinsk",
  "siberia_lena_yakutsk_alaas_core": "Central Lena & Yakutsk Basin",
  "siberia_arctic_kolyma_okhotsk_kamchatka": "Kolyma, Okhotsk & Kamchatka",

  # Imperial Russia Pre-1815 (1721AD - 1815AD)
  "ostsee_estland_governorate": "Estonia (Estland) Governorate",
  "ostsee_livland_governorate": "Livonia (Livland) Governorate",
  "ostsee_courland_governorate": "Courland Governorate",
  "old_finland_vyborg_governorate": "Vyborg (Old Finland)",
  "grand_duchy_of_finland_1809": "Grand Duchy of Finland",
  "lithuania_vilna_and_samogitia_kovno": "Vilna & Kovno (Lithuania)",
  "belarus_grodno_and_belostok_1807": "Grodno & Belostok",
  "belarus_vitebsk_and_mogilev_1772": "Vitebsk & Mogilev",
  "belarus_minsk_governorate_1793": "Minsk Governorate",
  "habsburg_galicia_and_bukovina_1772": "Habsburg Galicia & Bukovina",
  "ukraine_volhynia_and_podolia_1793": "Volhynia & Podolia",
  "ukraine_kyiv_governorate_1793": "Kyiv Governorate",
  "malorossiya_chernigov_and_poltava": "Chernigov & Poltava",
  "sloboda_ukraine_kharkov_governorate": "Kharkov (Sloboda Ukraine)",
  "novorossiya_ekaterinoslav_zaporizhzhia": "Ekaterinoslav Governorate",
  "novorossiya_kherson_ochakov_odessa": "Kherson & Odesa Steppe",
  "novorossiya_taurida_crimea_1783": "Taurida & Crimea",
  "bessarabia_oblast_1812": "Bessarabia Oblast",
  "capital_st_petersburg_governorate": "St Petersburg Governorate",
  "lakes_novgorod_pskov_and_olonets": "Novgorod, Pskov & Olonets",
  "north_arkhangelsk_and_vologda": "Arkhangelsk & Vologda",
  "capital_moscow_governorate": "Moscow Governorate",
  "western_approach_smolensk_kaluga_tver": "Smolensk, Kaluga & Tver",
  "central_non_black_earth_industrial": "Vladimir, Yaroslavl & Nizhny",
  "northern_black_earth_tula_ryazan_orel": "Tula, Ryazan & Oryol",
  "southern_black_earth_kursk_voronezh_tambov": "Kursk, Voronezh & Tambov",
  "middle_volga_kazan_simbirsk_penza": "Kazan, Simbirsk & Penza",
  "lower_volga_saratov_astrakhan_1763_1771": "Saratov & Astrakhan",
  "don_cossack_host_province": "Don Cossack Host Province",
  "caucasian_line_kuban_and_stavropol": "Kuban & Stavropol Line",
  "north_caucasus_highlands_circassia_dagestan": "North Caucasus Highlands",
  "northern_urals_perm_and_vyatka": "Perm & Vyatka Governorates",
  "southern_urals_orenburg_and_bashkiria": "Orenburg & Bashkiria",
  "siberia_tobolsk_trakt_and_ishim_line": "Southern Tobolsk & Ishim",
  "siberia_tobolsk_north_ob_irtysh_narym": "Northern Tobolsk & Lower Ob",
  "siberia_tomsk_and_kolyvan_altai_mines": "Tomsk & Altai Mining District",
  "siberia_altai_sayan_and_minusinsk_border": "Altai-Sayan & Minusinsk",
  "siberia_yeniseisk_and_turukhansk_basin": "Yeniseysk & Turukhansk",
  "siberia_irkutsk_and_transbaikal_kiakhta": "Irkutsk & Transbaikal",
  "siberia_yakutsk_okhotsk_and_kamchatka": "Yakutsk, Okhotsk & Kamchatka",

  # Imperial Russia Post-1815 & Russian Civil War (1815AD - 1922AD)
  "poland_warsaw_plock_lomza": "Warsaw, Plock & Lomza",
  "poland_piotrkow_and_kalisz": "Piotrkow & Kalisz (Lodz)",
  "poland_lublin_siedlce_kholm": "Lublin, Siedlce & Kholm",
  "poland_radom_kielce_suwalki": "Radom, Kielce & Suwalki",
  "finland_southern_nyland_abo_vyborg": "Southern Finland Governorates",
  "finland_northern_vasa_kuopio_oulu": "Interior & Northern Finland",
  "nw_krai_kovno_lithuania": "Kovno Governorate (Lithuania)",
  "nw_krai_vilna_and_grodno": "Vilna & Grodno Governorates",
  "nw_krai_minsk_governorate": "Minsk Governorate",
  "nw_krai_vitebsk_and_mogilev": "Vitebsk & Mogilev",
  "habsburg_eastern_galicia": "Eastern Galicia (Lviv)",
  "habsburg_bukovina_and_carpathian_rus": "Bukovina & Carpathian Rus",
  "bessarabia_governorate": "Bessarabia Governorate",
  "sw_krai_volhynia_governorate": "Volhynia Governorate",
  "sw_krai_podolia_governorate": "Podolia Governorate",
  "sw_krai_kyiv_governorate": "Kyiv Governorate",
  "sloboda_kharkov_governorate": "Kharkov Governorate",
  "novorossiya_kherson_governorate": "Kherson Governorate (Odesa)",
  "novorossiya_ekaterinoslav_governorate": "Ekaterinoslav Governorate",
  "novorossiya_taurida_governorate": "Taurida Governorate (Crimea)",
  "lakes_novgorod_pskov_olonets": "Novgorod, Pskov & Olonets",
  "european_north_arkhangelsk_vologda": "Arkhangelsk & Vologda",
  "central_industrial_ring": "Central Industrial Ring",
  "central_black_earth_west": "Kursk, Oryol & Tula",
  "central_black_earth_east": "Voronezh, Tambov & Ryazan",
  "middle_volga_nizhny_kazan_simbirsk_penza": "Nizhny, Kazan, Simbirsk, Penza",
  "volga_steppe_samara_and_saratov": "Samara & Saratov Governorates",
  "lower_volga_astrakhan_governorate": "Astrakhan Governorate",
  "don_cossack_host_oblast": "Don Cossack Host Province",
  "caucasus_kuban_and_black_sea": "Kuban & Black Sea Coast",
  "caucasus_stavropol_and_terek": "Stavropol & Terek Oblast",
  "caucasus_dagestan_oblast": "Dagestan Oblast",
  "southern_urals_ufa_and_orenburg": "Ufa & Orenburg Governorates",
  "siberia_west_transsiberian_tobolsk_omsk": "Southern Tobolsk & Omsk",
  "siberia_ob_irtysh_river_north": "Northern Ob-Irtysh Basin",
  "siberia_tomsk_rail_and_altai_cabinet": "Tomsk & Altai District",
  "siberia_altai_sayan_and_uriankhai_1914": "Altai-Sayan & Tuva",
  "siberia_central_transsiberian_krasnoyarsk_irkutsk": "Krasnoyarsk & Irkutsk Corridor",
  "siberia_yenisei_turukhansk_and_lena_gold": "Turukhansk North & Lena Gold",
  "siberia_transbaikal_and_yakutsk": "Transbaikal & Yakutsk Oblast",
  "far_east_priamurye_amur_primorskaya_sakhalin": "Amur, Maritime & Sakhalin",

  # Early Soviet Union (1922AD - 1953AD)
  "estonian_ssr_1940_occupation": "Estonian SSR",
  "latvian_ssr_1940_occupation": "Latvian SSR",
  "lithuanian_ssr_1940_occupation": "Lithuanian SSR",
  "moldavian_ssr_1940_bessarabia_massr": "Moldavian SSR",
  "kaliningrad_oblast_1945_resettlement": "Kaliningrad Oblast",
  "bssr_west_belarus_1939_annexation": "Western Belarus",
  "bssr_east_belarus_minsk_vitebsk_mogilev_gomel": "Eastern Belarus (Minsk, Gomel)",
  "ukssr_west_galicia_volhynia_1939_annexation": "Western Ukraine (Galicia)",
  "ukssr_bukovina_budjak_and_transcarpathia": "Bukovina, Budjak & Carpathia",
  "ukssr_right_bank_holodomor_core": "Right-Bank Ukraine (Kyiv)",
  "ukssr_left_bank_holodomor_kharkiv_poltava_chernihiv": "Left-Bank Ukraine (Kharkiv)",
  "ukssr_dnieper_industrial_bend": "Dnieper Industrial Bend",
  "ukssr_donbas_stalino_voroshilovgrad": "Donbas Basin (Donetsk-Luhansk)",
  "ukssr_black_sea_steppe_odesa_mykolaiv_kherson": "Black Sea Steppe (Odesa)",
  "crimean_assr_1944_tatar_deportation": "Crimean Region",
  "karelo_finnish_ssr_and_murmansk_bbk": "Karelia & Murmansk",
  "leningrad_siege_novgorod_and_pskov": "Leningrad, Novgorod & Pskov",
  "komi_assr_vorkutlag_ukhtpechlag_and_nenets": "Komi & Nenets North (Vorkuta)",
  "northern_krai_arkhangelsk_and_vologda_exile": "Arkhangelsk & Vologda",
  "moscow_metropolis_and_dmitlag_canal": "Moscow & Moscow Oblast",
  "upper_volga_and_western_front_oblasts": "Upper Volga & Western Oblasts",
  "central_black_earth_voronezh_kursk_orel_tambov": "Central Black-Earth Belt",
  "volga_kama_assrs_chuvash_mari_mordovia_udmurtia": "Gorky, Kirov & Volga Republics",
  "tatar_assr_and_ulyanovsk_penza": "Tatarstan, Ulyanovsk & Penza",
  "kuibyshev_wartime_capital_and_chkalov": "Kuibyshev (Samara) & Orenburg",
  "volga_german_assr_1941_deportation_zone": "Volga German Republic (1941)",
  "saratov_stalingrad_and_astrakhan_lower_volga": "Saratov, Stalingrad, Astrakhan",
  "kalmyk_assr_1943_deportation_zone": "Kalmyk Steppe",
  "rostov_krasnodar_kuban_famine_and_adygei_ao": "Rostov, Kuban & Adygea",
  "stavropol_karachay_1943_deportation_and_cherkess": "Stavropol & Karachay-Cherkess",
  "kabardino_balkar_1944_deportation_and_north_ossetia": "Kabardino-Balkaria & Ossetia",
  "chechen_ingush_assr_1944_chechevitsa_grozny": "Chechen-Ingush Region (Grozny)",
  "dagestan_assr_aukhovsky_and_mountain_transfers": "Dagestan Republic",
  "ural_evacuation_arsenal_and_bashkir_assr": "Ural Industrial Belt & Bashkir",
  "west_siberia_transsiberian_tyumen_omsk_novosibirsk": "Omsk, Novosibirsk & Tyumen",
  "ob_irtysh_special_settlements_narym_yugra_yamal": "Northern Ob-Irtysh & Narym",
  "kuzbass_kemerovo_coal_steel_and_siblag": "Kuzbas Coal & Steel Basin",
  "altai_krai_german_kalmyk_kulak_deportee_hub": "Altai Krai",
  "altai_sayan_autonomous_oyrot_khakass_and_tuva_1944": "Gorny Altai, Khakassia & Tuva",
  "east_siberia_transsiberian_krasnoyarsk_irkutsk_ozerlag": "Krasnoyarsk & Irkutsk Corridor",
  "yenisei_taymyr_polar_norillag_igarka_evenkia": "Norilsk, Taymyr & Evenkia",
  "buryat_mongol_assr_1937_split_and_chita_bamlag": "Buryatia & Chita (Transbaikal)",
  "yakut_assr_aldan_churapcha_and_lena_exiles": "Yakutia (Sakha Republic)",
  "dalstroy_kolyma_magadan_chukotka_kamchatka": "Magadan-Kolyma & Chukotka",
  "far_east_amur_birobidzhan_primorye_1937_koreans_sakhalin": "Southern Far East & Sakhalin",

  # Late Soviet Union (1953AD - 1991AD)
  "estonian_ssr_post_stalin": "Estonian SSR",
  "latvian_ssr_post_stalin": "Latvian SSR",
  "lithuanian_ssr_post_stalin": "Lithuanian SSR",
  "moldavian_ssr_post_stalin": "Moldavian SSR",
  "kaliningrad_oblast_baltic_fleet": "Kaliningrad Oblast",
  "bssr_minsk_metropolitan_industrial_core": "Minsk & Minsk Oblast",
  "bssr_west_brest_grodno_and_vitebsk": "Brest, Grodno & Vitebsk",
  "bssr_gomel_mogilev_and_chernobyl_fallout": "Gomel & Mogilev",
  "ukssr_western_galicia_volhynia_carpathians": "Western Ukraine (Lviv, Volyn)",
  "ukssr_kyiv_metropolis_and_pripyat_chernobyl": "Kyiv, Zhytomyr & Chernihiv",
  "ukssr_central_podolia_cherkasy_poltava_sumy": "Central Ukraine (Podolia)",
  "ukssr_kharkiv_and_dnieper_industrial_bend": "Kharkiv & Dnieper Industrial",
  "ukssr_donbas_donetsk_voroshilovgrad": "Donbas (Donetsk & Luhansk)",
  "ukssr_black_sea_odesa_mykolaiv_kherson": "Black Sea Coast (Odesa)",
  "ukssr_crimean_oblast_1954_transfer": "Crimean Oblast & Sevastopol",
  "karelian_assr_1956_and_murmansk_arctic": "Karelia & Murmansk",
  "leningrad_novgorod_and_pskov": "Leningrad, Novgorod & Pskov",
  "northern_arkhangelsk_vologda_and_komi_assr": "Arkhangelsk, Vologda & Komi",
  "moscow_capital_and_naukograd_ring": "Moscow & Moscow Oblast",
  "central_nechernozemye_depopulation_ring": "Central Non-Black-Earth Ring",
  "volga_vyatka_gorky_kirov_and_finno_ugric_assrs": "Gorky, Kirov & Volga Republics",
  "central_black_earth_voronezh_kursk_belgorod_lipetsk_tambov": "Central Black-Earth Region",
  "tatar_assr_kuibyshev_ulyanovsk_penza_auto_hydro": "Tatarstan, Samara & Ulyanovsk",
  "lower_volga_saratov_volgograd_astrakhan_kalmyk_assr": "Saratov, Volgograd, Astrakhan",
  "rostov_krasnodar_stavropol_adygei_karachay_cherkess": "Rostov, Krasnodar & Stavropol",
  "kabardino_balkar_and_north_ossetian_assrs": "Kabardino-Balkaria & Ossetia",
  "chechen_ingush_assr_1957_restoration": "Chechen-Ingush Republic",
  "dagestan_assr_lowland_kutan_boom": "Dagestan Republic",
  "ural_industrial_sverdlovsk_chelyabinsk_perm": "Sverdlovsk, Chelyabinsk & Perm",
  "bashkir_assr_orenburg_and_kurgan_tselina": "Bashkiria, Orenburg & Kurgan",
  "yamalo_nenets_polar_gas_frontier": "Yamal-Nenets Gas Basin",
  "khanty_mansi_middle_ob_oil_frontier": "Khanty-Mansi (Middle Ob Oil)",
  "west_siberia_transsiberian_tyumen_omsk_novosibirsk_altai_tselina": "Tyumen, Omsk & Novosibirsk",
  "kuzbass_kemerovo_coal_steel_conurbation": "Kuzbas (Kemerovo Oblast)",
  "altai_sayan_gorno_altai_khakassia_and_tuva_assr": "Altai, Khakassia & Tuva",
  "angara_yenisei_hydro_cascade_krasnoyarsk_irkutsk": "Krasnoyarsk & Irkutsk",
  "norilsk_taymyr_and_evenkia_polar_north": "Norilsk, Taymyr & Evenkia",
  "buryat_assr_chita_and_bam_mainline_corridor": "Buryatia & Chita (BAM Zone)",
  "yakut_assr_mirny_diamonds_and_lena_north": "Yakutia (Sakha Republic)",
  "far_east_southern_pacific_primorye_khabarovsk_amur_sakhalin": "Southern Far East & Sakhalin",
  "extreme_northeast_magadan_chukotka_kamchatka_arctic": "Magadan, Chukotka & Kamchatka",

  # Post-Soviet Space (1991AD - 2022AD)
  "belarus_minsk_city_and_oblast_magnet": "Minsk City & Minsk Oblast",
  "belarus_western_brest_and_grodno": "Western Belarus (Brest-Grodno)",
  "belarus_eastern_vitebsk_mogilev_gomel": "Vitebsk, Mogilev & Gomel",
  "ukraine_western_galicia_volhynia_carpathians": "Western Ukraine (Lviv, Volyn)",
  "ukraine_kyiv_city_and_metropolitan_oblast": "Kyiv City & Kyiv Oblast",
  "ukraine_central_and_northern_depopulation_belt": "Central & Northern Ukraine",
  "ukraine_kharkiv_dnipro_zaporizhzhia_industrial_east": "Kharkiv, Dnipro & Zaporizhzhia",
  "ukraine_black_sea_odesa_mykolaiv_kherson": "Odesa, Mykolaiv & Kherson",
  "ukraine_donbas_government_controlled_2014_2021": "Ukrainian-Controlled Donbas",
  "ukraine_donbas_occupied_ordlo_dpr_lpr_2014_2021": "Occupied Donbas (2014-2021)",
  "crimea_and_sevastopol_2014_annexation": "Crimea & Sevastopol",
  "russia_moscow_city_and_oblast_megaregion": "Moscow City & Moscow Oblast",
  "russia_st_petersburg_leningrad_and_kaliningrad": "St Petersburg & Kaliningrad",
  "russia_northwest_pskov_novgorod_vologda_karelia": "Pskov, Novgorod & Vologda",
  "russia_european_arctic_exodus_murmansk_arkhangelsk_komi_nenets": "Murmansk, Arkhangelsk & Komi",
  "russia_central_non_black_earth_shrinkage_ring": "Central Non-Black-Earth Ring",
  "russia_central_black_earth_belgorod_voronezh_kursk_lipetsk_tambov": "Central Black-Earth Belt",
  "russia_volga_tatarstan_and_bashkortostan_republics": "Tatarstan & Bashkortostan",
  "russia_volga_samara_nizhny_and_finno_ugric_republics": "Middle Volga & Republics",
  "russia_lower_volga_saratov_volgograd_astrakhan_kalmykia": "Lower Volga & Kalmykia",
  "russia_southern_sunbelt_krasnodar_rostov_stavropol_adygea": "Krasnodar, Rostov & Stavropol",
  "russia_chechnya_and_ingushetia_wars_and_rebound": "Chechnya & Ingushetia",
  "russia_central_caucasus_ossetia_kabardino_karachay": "North Ossetia & Kabardino",
  "russia_dagestan_high_fertility_boom": "Republic of Dagestan",
  "russia_ural_industrial_sverdlovsk_chelyabinsk_perm_orenburg_kurgan": "Ural Industrial Region",
  "russia_yugra_and_yamal_hydrocarbon_arctic": "Khanty-Mansi & Yamal-Nenets",
  "russia_west_siberia_transsiberian_tyumen_omsk_novosibirsk_tomsk_altai": "Tyumen, Omsk & Novosibirsk",
  "russia_kuzbass_kemerovo_coal_restructuring": "Kuzbas (Kemerovo Oblast)",
  "russia_altai_khakassia_and_tuva_republics": "Altai, Khakassia & Tuva",
  "russia_krasnoyarsk_and_irkutsk_transsiberian_corridor": "Krasnoyarsk & Irkutsk",
  "russia_norilsk_taymyr_and_evenkia_arctic_shrinkage": "Norilsk, Taymyr & Evenkia",
  "russia_buryatia_and_zabaykalsky_transbaikalia": "Buryatia & Zabaykalsky Krai",
  "russia_sakha_yakutia_indigenous_urbanisation": "Sakha Republic (Yakutia)",
  "russia_extreme_northeast_exodus_magadan_chukotka_kamchatka": "Magadan, Chukotka & Kamchatka",
  "russia_southern_far_east_pacific_primorye_khabarovsk_amur_sakhalin": "Southern Far East & Sakhalin",

  # Russian Invasion of Ukraine (2022AD - 2026AD)
  "ua_donetsk_ukr": "Donetsk (Ukrainian-Controlled)",
  "ua_donetsk_occupied_2022": "Donetsk (Occupied 2022-2026)",
  "ua_donetsk_ordlo_2014": "Donetsk (Occupied 2014)",
  "ua_luhansk_occupied_2022": "Luhansk (Occupied 2022-2026)",
  "ua_luhansk_ordlo_2014": "Luhansk (Occupied 2014)",
  "ua_kharkiv_ukr": "Kharkiv (Unoccupied Core)",
  "ua_kharkiv_deoccupied_east": "Kharkiv (Liberated East)",
  "ua_zaporizhzhia_ukr": "Zaporizhzhia (Unoccupied)",
  "ua_zaporizhzhia_occupied_2022": "Zaporizhzhia (Occupied South)",
  "ua_kherson_right_bank_liberated": "Kherson (Liberated Right Bank)",
  "ua_kherson_left_bank_occupied": "Kherson (Occupied Left Bank)"
}


class AlbersEqualAreaConic:
  """Snyder Equal-Area Conic projection (kilometres) fitted to Northern Eurasia / Russia."""
  def __init__ (self, lon_0, lat_1, lat_2, lat_0, R_km = 6371.0088):
    self.lon_0 = math.radians(lon_0)
    self.lat_0 = math.radians(lat_0)
    p1 = math.radians(lat_1)
    p2 = math.radians(lat_2)
    self.n = 0.5 * (math.sin(p1) + math.sin(p2))
    self.C = (math.cos(p1) ** 2) + 2.0 * self.n * math.sin(p1)
    self.R = R_km
    self.rho_0 = (self.R / self.n) * math.sqrt(max(0.0, self.C - 2.0 * self.n * self.sin_lat0()))

  def sin_lat0 (self):
    return math.sin(self.lat_0)

  def fwd_pt (self, lon_deg, lat_deg):
    lon_u = lon_deg + 360.0 if lon_deg < -130.0 else lon_deg
    lam = math.radians(lon_u)
    phi = math.radians(max(-89.5, min(89.5, lat_deg)))
    rho = (self.R / self.n) * math.sqrt(max(0.0, self.C - 2.0 * self.n * math.sin(phi)))
    theta = self.n * (lam - self.lon_0)
    return (rho * math.sin(theta), self.rho_0 - rho * math.cos(theta))

  def fwd_xy (self, xs, ys, zs = None):
    arr_x = np.asarray(xs, dtype=float)
    arr_y = np.asarray(ys, dtype=float)
    lon_u = np.where(arr_x < -130.0, arr_x + 360.0, arr_x)
    lam = np.radians(lon_u)
    phi = np.radians(np.clip(arr_y, -89.5, 89.5))
    rho = (self.R / self.n) * np.sqrt(np.maximum(0.0, self.C - 2.0 * self.n * np.sin(phi)))
    theta = self.n * (lam - self.lon_0)
    px = rho * np.sin(theta)
    py = self.rho_0 - rho * np.cos(theta)
    if np.ndim(xs) == 0:
      return float(px), float(py)
    return px, py


PROJ_WEST = AlbersEqualAreaConic(lon_0=36.0, lat_1=47.0, lat_2=62.0, lat_0=54.5)
PROJ_EAST = AlbersEqualAreaConic(lon_0=96.0, lat_1=50.0, lat_2=70.0, lat_0=58.0)

CLIP_MAIN = box(-10.0, 33.0, 180.0, 84.0)
CLIP_CHUKOTKA_W = box(-180.0, 56.0, -162.0, 76.0)


def _shift_360 (xs, ys, zs = None):
  ax = np.asarray(xs, dtype=float) + 360.0
  ay = np.asarray(ys, dtype=float)
  if np.ndim(xs) == 0:
    return float(ax), float(ay)
  return ax, ay


def _prepare_and_project (arg0_geom, arg1_proj, arg2_seg_deg = 0.35):
  if arg0_geom is None or arg0_geom.is_empty:
    return Polygon()
  g = arg0_geom
  minx, miny, maxx, maxy = g.bounds
  parts = []
  if maxx > -10.0 and minx < 180.0 and maxy > 33.0 and miny < 84.0:
    gm = g.intersection(CLIP_MAIN)
    if not gm.is_empty:
      parts.append(gm)
  if minx < -162.0 and maxy > 56.0:
    gw = g.intersection(CLIP_CHUKOTKA_W)
    if not gw.is_empty:
      parts.append(shp_transform(_shift_360, gw))
  if not parts:
    return Polygon()
  g_u = unary_union(parts) if len(parts) > 1 else parts[0]
  if g_u.is_empty:
    return Polygon()
  if arg2_seg_deg and arg2_seg_deg > 0:
    g_u = shapely.segmentize(g_u, max_segment_length=arg2_seg_deg)
  return shp_transform(arg1_proj.fwd_xy, g_u)


def _detect_epoch_id (arg0_output_path, arg1_epoch_id = None):
  if arg1_epoch_id and arg1_epoch_id in EPOCH_IDS:
    return arg1_epoch_id
  s = str(arg0_output_path).lower()
  for ep in EPOCH_IDS:
    if ep in s:
      return ep
  if "pre_1815" in s:
    return "imperial_russia_pre_1815"
  if "post_1815" in s:
    return "imperial_russia_post_1815"
  if "tsardom" in s:
    return "tsardom_of_russia"
  if "civil_war" in s:
    return "russian_civil_war"
  if "stalin" in s and "post_stalin" not in s:
    return "soviet_lenin_stalin"
  if "post_stalin" in s:
    return "soviet_post_stalin"
  if "post_soviet" in s:
    return "post_soviet_space"
  if "invasion" in s or "ukraine" in s:
    return "russian_invasion_of_ukraine"
  return "imperial_russia_post_1815"


def _shorten_region_label (arg0_name, arg1_id = None):
  if arg1_id and arg1_id in REGION_DISPLAY_NAMES:
    return REGION_DISPLAY_NAMES[arg1_id]
  nm = re.sub(r"^\d+\.\s*", "", str(arg0_name)).strip()
  nm = nm.split("(")[0].split(":")[0].replace("->", "to").strip()
  nm = nm.replace("Ostsee", "Baltic").replace("GDL", "Lithuanian").replace("ORDLO", "Occupied").replace("GCA", "Unoccupied")
  return nm


def _proj_geom_to_patches (arg0_proj_geom):
  patches = []
  if arg0_proj_geom is None or arg0_proj_geom.is_empty:
    return patches
  if arg0_proj_geom.geom_type == "Polygon":
    ext_coords = list(arg0_proj_geom.exterior.coords)
    if len(ext_coords) >= 3:
      patches.append(MplPolygon(ext_coords, closed=True))
  elif arg0_proj_geom.geom_type in ("MultiPolygon", "GeometryCollection"):
    for part in arg0_proj_geom.geoms:
      patches.extend(_proj_geom_to_patches(part))
  return patches


def _draw_proj_lines (arg0_ax, arg1_proj_geom, **kwargs):
  if arg1_proj_geom is None or arg1_proj_geom.is_empty:
    return
  if arg1_proj_geom.geom_type == "LineString":
    xs, ys = arg1_proj_geom.xy
    if len(xs) > 1:
      arg0_ax.plot(xs, ys, **kwargs)
  elif arg1_proj_geom.geom_type in ("MultiLineString", "GeometryCollection"):
    for part in arg1_proj_geom.geoms:
      _draw_proj_lines(arg0_ax, part, **kwargs)


def _draw_conic_graticule (arg0_ax, arg1_proj, arg2_xlim, arg3_ylim, arg4_lats, arg5_lons, arg6_lon_span):
  lon_grid = np.linspace(arg6_lon_span[0], arg6_lon_span[1], 240)
  lat_grid = np.linspace(34.0, 82.0, 160)
  x0, x1 = arg2_xlim
  y0, y1 = arg3_ylim
  box_view = box(x0, y0, x1, y1)

  for lat_v in arg4_lats:
    px, py = arg1_proj.fwd_xy(lon_grid, np.full_like(lon_grid, float(lat_v)))
    arg0_ax.plot(px, py, linestyle="--", linewidth=0.38, color="#5f6f7f", alpha=0.42, zorder=4.2)
    ls = LineString(np.column_stack([px, py])).intersection(box_view)
    if not ls.is_empty:
      pts = list(ls.coords) if ls.geom_type == "LineString" else list(ls.geoms[0].coords)
      if pts:
        lx, ly = pts[0]
        arg0_ax.text(
          lx + (x1 - x0) * 0.012, ly, f"{lat_v}°N",
          fontsize=6.5, color="#3b4c5e", ha="left", va="center", zorder=4.5,
          bbox=dict(boxstyle="round,pad=0.08", facecolor="white", edgecolor="none", alpha=0.65)
        )

  for lon_v in arg5_lons:
    px, py = arg1_proj.fwd_xy(np.full_like(lat_grid, float(lon_v)), lat_grid)
    arg0_ax.plot(px, py, linestyle="--", linewidth=0.38, color="#5f6f7f", alpha=0.42, zorder=4.2)
    ls = LineString(np.column_stack([px, py])).intersection(box_view)
    if not ls.is_empty:
      pts = list(ls.coords) if ls.geom_type == "LineString" else list(ls.geoms[0].coords)
      if pts:
        bx, by = min(pts, key=lambda p: p[1])
        if by < y0 + (y1 - y0) * 0.18 and (x0 + (x1 - x0) * 0.06) < bx < (x1 - (x1 - x0) * 0.06):
          lbl_lon = "180°" if lon_v == 180 else f"{lon_v}°E"
          arg0_ax.text(
            bx, y0 + (y1 - y0) * 0.018, lbl_lon,
            fontsize=6.5, color="#3b4c5e", ha="center", va="bottom", zorder=4.5,
            bbox=dict(boxstyle="round,pad=0.08", facecolor="white", edgecolor="none", alpha=0.65)
          )


def _draw_railroads (arg0_ax, arg1_proj, arg2_max_scalerank = 6, arg3_lw = 0.62, arg4_alpha = 0.70):
  p_rr = HIST_DIR / "ne_10m_railroads_eurasia.geojson"
  if not p_rr.exists():
    return
  gj = json.loads(p_rr.read_text(encoding="utf-8"))
  for f in gj.get("features", []):
    pr = f.get("properties") or {}
    sr = pr.get("scalerank")
    if sr is not None and int(sr) > arg2_max_scalerank:
      continue
    if f.get("geometry"):
      pg = _prepare_and_project(shape(f["geometry"]), arg1_proj, 0.25)
      _draw_proj_lines(arg0_ax, pg, color="#222222", linewidth=arg3_lw, linestyle="-.", alpha=arg4_alpha, zorder=3.7)


def _project_geojson_patches (arg0_path, arg1_proj, arg2_seg_deg = 0.30):
  if not arg0_path.exists():
    return []
  gj = json.loads(arg0_path.read_text(encoding="utf-8"))
  patches = []
  for f in gj.get("features", []):
    if f.get("geometry"):
      pg = _prepare_and_project(shape(f["geometry"]), arg1_proj, arg2_seg_deg)
      patches.extend(_proj_geom_to_patches(pg))
  return patches


def _overlay_historical_layers (arg0_ax, arg1_proj, arg2_epoch_id):
  if arg2_epoch_id == "tsardom_of_russia":
    patches_uez = _project_geojson_patches(HIST_DIR / "imperiia_districts_uezdy.geojson", arg1_proj, 0.25)
    if patches_uez:
      arg0_ax.add_collection(PatchCollection(patches_uez, facecolor="none", edgecolor="#5d4037", linewidths=0.15, alpha=0.30, zorder=3.1))
    patches_het = _project_geojson_patches(HIST_DIR / "cossack_hetmanate_1649.geojson", arg1_proj, 0.25)
    if patches_het:
      arg0_ax.add_collection(PatchCollection(patches_het, facecolor="none", edgecolor="#922b21", linewidths=0.85, linestyle="--", alpha=0.78, zorder=3.5))
    for rfn in ["imperiia_post_roads.geojson", "imperiia_seasonal_routes.geojson"]:
      pr_p = HIST_DIR / rfn
      if pr_p.exists():
        gj = json.loads(pr_p.read_text(encoding="utf-8"))
        for f in gj.get("features", []):
          if f.get("geometry"):
            pg = _prepare_and_project(shape(f["geometry"]), arg1_proj, 0.25)
            _draw_proj_lines(arg0_ax, pg, color="#6e2c00", linewidth=0.36, linestyle=":", alpha=0.52, zorder=3.4)

  elif arg2_epoch_id == "imperial_russia_pre_1815":
    patches_uez = _project_geojson_patches(HIST_DIR / "imperiia_districts_uezdy.geojson", arg1_proj, 0.25)
    if patches_uez:
      arg0_ax.add_collection(PatchCollection(patches_uez, facecolor="none", edgecolor="#4a3b2c", linewidths=0.16, alpha=0.32, zorder=3.1))
    patches_gub = _project_geojson_patches(HIST_DIR / "empire_gubernii_1820s.geojson", arg1_proj, 0.25)
    if patches_gub:
      arg0_ax.add_collection(PatchCollection(patches_gub, facecolor="none", edgecolor="#1f2d3d", linewidths=0.38, alpha=0.62, zorder=3.5))
    pr_p = HIST_DIR / "imperiia_post_roads.geojson"
    if pr_p.exists():
      gj = json.loads(pr_p.read_text(encoding="utf-8"))
      for f in gj.get("features", []):
        if f.get("geometry"):
          pg = _prepare_and_project(shape(f["geometry"]), arg1_proj, 0.25)
          _draw_proj_lines(arg0_ax, pg, color="#6e2c00", linewidth=0.38, linestyle=":", alpha=0.55, zorder=3.4)

  elif arg2_epoch_id == "imperial_russia_post_1815":
    patches_uez = _project_geojson_patches(HIST_DIR / "imperiia_districts_uezdy.geojson", arg1_proj, 0.25)
    if patches_uez:
      arg0_ax.add_collection(PatchCollection(patches_uez, facecolor="none", edgecolor="#555555", linewidths=0.13, alpha=0.25, zorder=3.1))
    patches_97 = _project_geojson_patches(HIST_DIR / "empire_boundaries_1897_census.geojson", arg1_proj, 0.25)
    if patches_97:
      arg0_ax.add_collection(PatchCollection(patches_97, facecolor="none", edgecolor="#1f2d3d", linewidths=0.38, alpha=0.65, zorder=3.5))
    patches_pale = _project_geojson_patches(HIST_DIR / "pale_of_settlement_1835.geojson", arg1_proj, 0.25)
    if patches_pale:
      arg0_ax.add_collection(PatchCollection(patches_pale, facecolor="none", edgecolor="#7d3c98", linewidths=0.72, linestyle="--", alpha=0.80, zorder=3.6))
    _draw_railroads(arg0_ax, arg1_proj, arg2_max_scalerank=5, arg3_lw=0.65, arg4_alpha=0.75)

  elif arg2_epoch_id == "russian_civil_war":
    patches_97 = _project_geojson_patches(HIST_DIR / "empire_boundaries_1897_census.geojson", arg1_proj, 0.25)
    if patches_97:
      arg0_ax.add_collection(PatchCollection(patches_97, facecolor="none", edgecolor="#1f2d3d", linewidths=0.36, alpha=0.62, zorder=3.4))
    patches_pol = _project_geojson_patches(HIST_DIR / "poland_interwar_admin.geojson", arg1_proj, 0.25)
    if patches_pol:
      arg0_ax.add_collection(PatchCollection(patches_pol, facecolor="none", edgecolor="#7d3c98", linewidths=0.60, linestyle="--", alpha=0.76, zorder=3.6))
    _draw_railroads(arg0_ax, arg1_proj, arg2_max_scalerank=5, arg3_lw=0.65, arg4_alpha=0.75)

  elif arg2_epoch_id == "soviet_lenin_stalin":
    patches_holo = _project_geojson_patches(HIST_DIR / "holodomor_ukraine_deaths.geojson", arg1_proj, 0.20)
    if patches_holo:
      arg0_ax.add_collection(PatchCollection(patches_holo, facecolor="none", edgecolor="#7b241c", linewidths=0.20, alpha=0.42, zorder=3.4))
    _draw_railroads(arg0_ax, arg1_proj, arg2_max_scalerank=6, arg3_lw=0.62, arg4_alpha=0.72)

  elif arg2_epoch_id == "soviet_post_stalin":
    _draw_railroads(arg0_ax, arg1_proj, arg2_max_scalerank=7, arg3_lw=0.65, arg4_alpha=0.76)

  elif arg2_epoch_id == "post_soviet_space":
    adm1_patches = _project_geojson_patches(CACHE_DIR / "ne_10m_admin_1_ru_ua_by.geojson", arg1_proj, 0.25)
    if adm1_patches:
      arg0_ax.add_collection(PatchCollection(adm1_patches, facecolor="none", edgecolor="#555555", linewidths=0.22, alpha=0.45, zorder=3.1))
    _draw_railroads(arg0_ax, arg1_proj, arg2_max_scalerank=6, arg3_lw=0.56, arg4_alpha=0.64)

  elif arg2_epoch_id == "russian_invasion_of_ukraine":
    adm1_patches = _project_geojson_patches(CACHE_DIR / "ne_10m_admin_1_ru_ua_by.geojson", arg1_proj, 0.25)
    if adm1_patches:
      arg0_ax.add_collection(PatchCollection(adm1_patches, facecolor="none", edgecolor="#262626", linewidths=0.50, alpha=0.90, zorder=3.6))
    acled_patches = _project_geojson_patches(HIST_DIR / "ukraine_acled_raioni.geojson", arg1_proj, 0.20)
    if acled_patches:
      arg0_ax.add_collection(PatchCollection(acled_patches, facecolor="none", edgecolor="#67000d", linewidths=0.28, linestyle=":", alpha=0.52, zorder=3.4))
    ds_patches = _project_geojson_patches(HIST_DIR / "deepstate_20261109.geojson", arg1_proj, 0.15)
    if ds_patches:
      arg0_ax.add_collection(PatchCollection(ds_patches, facecolor=(0.76, 0.06, 0.06, 0.17), edgecolor="#b30000", hatch="////", linewidths=0.90, zorder=3.5))


def render_polaris_epoch_map (
  arg0_output_path,
  arg1_title_west,
  arg2_title_east,
  arg3_west_sites,
  arg4_east_sites,
  arg5_west_arrows = None,
  arg6_east_arrows = None,
  arg7_epoch_id = None,
  arg8_custom_legend = None,
  arg9_west_xlim = None,
  arg10_west_ylim = None,
  arg11_suptitle = None
):
  """
  Renders a 2-panel fitted Albers Equal-Area Conic GIS basemap (`ax.set_aspect('equal')`)
  for a POLARIS epoch using its period-authentic sub-administrative partition and
  curved graticule parallels/meridians (zero equirectangular squashing).
  """
  epoch_id = _detect_epoch_id(arg0_output_path, arg7_epoch_id)
  poly_file = CACHE_DIR / f"{epoch_id}_polygons.geojson"
  if not poly_file.exists():
    poly_file = CACHE_DIR / "macro_10regions_polygons.geojson"

  land_gj = json.loads((CACHE_DIR / "ne_50m_land.geojson").read_text(encoding="utf-8"))
  lakes_gj = json.loads((CACHE_DIR / "ne_50m_lakes.geojson").read_text(encoding="utf-8"))
  rivers_gj = json.loads((CACHE_DIR / "ne_50m_rivers_lake_centerlines.geojson").read_text(encoding="utf-8"))
  epoch_gj = json.loads(poly_file.read_text(encoding="utf-8"))

  xlim_w = arg9_west_xlim if arg9_west_xlim is not None else (-1380.0, 1680.0)
  ylim_w = arg10_west_ylim if arg10_west_ylim is not None else (-1440.0, 1680.0)
  xlim_e = (-4560.0, 3840.0)
  ylim_e = (-1080.0, 3260.0)

  asp_w = (xlim_w[1] - xlim_w[0]) / (ylim_w[1] - ylim_w[0])
  asp_e = (xlim_e[1] - xlim_e[0]) / (ylim_e[1] - ylim_e[0])

  plt.style.use("default")
  fig, (ax_w, ax_e) = plt.subplots(
    1, 2,
    figsize=(18.4, 8.3),
    dpi=300,
    gridspec_kw={"width_ratios": [asp_w, asp_e], "wspace": 0.045}
  )

  features_sorted_by_area = sorted(
    epoch_gj["features"],
    key=lambda f: shape(f["geometry"]).area if f.get("geometry") else 0.0,
    reverse=True
  )

  panel_specs = [
    (
      ax_w, PROJ_WEST, xlim_w, ylim_w, arg1_title_west,
      [45, 50, 55, 60, 65], [20, 30, 40, 50, 60], (5.0, 72.0)
    ),
    (
      ax_e, PROJ_EAST, xlim_e, ylim_e, arg2_title_east,
      [45, 55, 65, 75], [20, 40, 60, 80, 100, 120, 140, 160, 180], (5.0, 194.0)
    )
  ]

  for ax, proj, xlim, ylim, panel_title, glats, glons, lon_span in panel_specs:
    ax.set_facecolor("#d9ebf7")

    land_patches = []
    for f in land_gj["features"]:
      if f.get("geometry"):
        pg = _prepare_and_project(shape(f["geometry"]), proj, 0.35)
        land_patches.extend(_proj_geom_to_patches(pg))
    if land_patches:
      ax.add_collection(PatchCollection(land_patches, facecolor="#f2efe9", edgecolor="#b8b2a6", linewidths=0.40, zorder=1.0))

    # Period-authentic regional polygons
    for idx_f, f in enumerate(features_sorted_by_area):
      if not f.get("geometry"):
        continue
      rgb = [c / 255.0 for c in f["properties"]["colour"]]
      pg_f = _prepare_and_project(shape(f["geometry"]), proj, 0.30)
      mpatches_base = _proj_geom_to_patches(pg_f)
      mpatches_col = _proj_geom_to_patches(pg_f)
      z_base = 2.0 + idx_f * 0.008
      if mpatches_base:
        ax.add_collection(PatchCollection(mpatches_base, facecolor="#f2efe9", edgecolor="none", linewidths=0.0, alpha=1.0, zorder=z_base))
        ax.add_collection(PatchCollection(mpatches_col, facecolor=rgb, edgecolor="#222222", linewidths=0.48, alpha=0.52, zorder=z_base + 0.004))

    _overlay_historical_layers(ax, proj, epoch_id)

    # Rivers & Lakes
    for f in rivers_gj["features"]:
      if f.get("geometry"):
        pg_r = _prepare_and_project(shape(f["geometry"]), proj, 0.25)
        _draw_proj_lines(ax, pg_r, color="#2b6cb0", linewidth=0.48, alpha=0.58, zorder=4.0)
    lake_patches = []
    for f in lakes_gj["features"]:
      if f.get("geometry"):
        pg_l = _prepare_and_project(shape(f["geometry"]), proj, 0.25)
        lake_patches.extend(_proj_geom_to_patches(pg_l))
    if lake_patches:
      ax.add_collection(PatchCollection(lake_patches, facecolor="#b3d9ff", edgecolor="#2b6cb0", linewidths=0.34, zorder=4.0))

    _draw_conic_graticule(ax, proj, xlim, ylim, glats, glons, lon_span)

    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_aspect("equal", adjustable="box")
    ax.set_xticks([])
    ax.set_yticks([])
    t_fs = 8.6 if ax is ax_w else 9.4
    ax.set_title(panel_title, fontsize=t_fs, fontweight="bold", pad=6)

  # Movement/historical arrows in projected Conic km space
  for ax, proj, xlim, ylim, arrows in [
    (ax_w, PROJ_WEST, xlim_w, ylim_w, arg5_west_arrows or []),
    (ax_e, PROJ_EAST, xlim_e, ylim_e, arg6_east_arrows or [])
  ]:
    for lon1, lat1, lon2, lat2, lbl, col, rad in arrows:
      x1, y1 = proj.fwd_pt(lon1, lat1)
      x2, y2 = proj.fwd_pt(lon2, lat2)
      arr = FancyArrowPatch(
        (x1, y1), (x2, y2),
        connectionstyle=f"arc3,rad={rad}",
        arrowstyle="-|>,head_length=5,head_width=3",
        color=col, linewidth=1.35, alpha=0.88, zorder=6.0
      )
      ax.add_patch(arr)
      if lbl:
        chord = math.hypot(x2 - x1, y2 - y1)
        nx = -(y2 - y1) / max(chord, 1.0)
        ny = (x2 - x1) / max(chord, 1.0)
        bend = (-0.38 * rad * chord) if abs(rad) > 0.01 else 90.0
        mx = 0.5 * (x1 + x2) + nx * bend
        my = 0.5 * (y1 + y2) + ny * bend
        mx = max(xlim[0] + 180.0, min(xlim[1] - 180.0, mx))
        my = max(ylim[0] + 110.0, min(ylim[1] - 110.0, my))
        ax.text(
          mx, my, lbl, fontsize=6.3, fontweight="bold", color=col, ha="center", va="center", zorder=7.0,
          bbox=dict(boxstyle="round,pad=0.13", facecolor="white", edgecolor=col, alpha=0.86, linewidth=0.5)
        )

  # Sites & callout labels in projected Conic km space (screen-aligned dx/dy offsets)
  for ax, proj, xlim, ylim, sx_km, sy_km, pad_x_frac, sites in [
    (ax_w, PROJ_WEST, xlim_w, ylim_w, 64.0, 102.0, 0.145, arg3_west_sites or []),
    (ax_e, PROJ_EAST, xlim_e, ylim_e, 48.0, 108.0, 0.075, arg4_east_sites or [])
  ]:
    pad_x = (xlim[1] - xlim[0]) * pad_x_frac
    pad_y = (ylim[1] - ylim[0]) * 0.048
    for item in sites:
      nm, lat, lon, dx, dy = item[0], item[1], item[2], item[3], item[4]
      col = item[5] if len(item) > 5 else "#b30000"
      sz = item[6] if len(item) > 6 else 22
      x0, y0 = proj.fwd_pt(lon, lat)
      if not (xlim[0] <= x0 <= xlim[1] and ylim[0] <= y0 <= ylim[1]):
        continue
      ax.scatter([x0], [y0], s=sz, c=col, edgecolors="white", linewidths=0.6, zorder=8.0)
      tx = max(xlim[0] + pad_x, min(xlim[1] - pad_x, x0 + dx * sx_km))
      ty = max(ylim[0] + pad_y, min(ylim[1] - pad_y, y0 + dy * sy_km))
      ax.annotate(
        nm,
        xy=(x0, y0),
        xytext=(tx, ty),
        fontsize=6.4,
        fontweight="bold",
        color="#111111",
        ha="center",
        va="center",
        zorder=9.0,
        bbox=dict(boxstyle="round,pad=0.12", facecolor="white", edgecolor="#888888", alpha=0.88, linewidth=0.4),
        arrowprops=dict(arrowstyle="-", color="#444444", linewidth=0.55, shrinkA=0, shrinkB=2)
      )

  if arg8_custom_legend is not None:
    legend_handles = arg8_custom_legend
    n_regs = len(legend_handles)
    ncol = 6 if n_regs >= 38 else (5 if n_regs >= 28 else 4)
    leg_fs = 5.4 if n_regs >= 38 else 5.8
  else:
    legend_handles = []
    for f in epoch_gj["features"]:
      rid = f["properties"].get("id", "")
      rname = f["properties"].get("name", rid)
      rgb = [c / 255.0 for c in f["properties"]["colour"]]
      rgba = (rgb[0], rgb[1], rgb[2], 0.65)
      legend_handles.append(
        Patch(
          facecolor=rgba,
          edgecolor="#222222",
          linewidth=0.5,
          label=_shorten_region_label(rname, rid)
        )
      )
    n_regs = len(legend_handles)
    ncol = 6 if n_regs >= 43 else (5 if n_regs >= 31 else 4)
    leg_fs = 5.5 if n_regs >= 43 else 5.8

  if arg11_suptitle:
    fig.suptitle(arg11_suptitle, fontsize=11.6, fontweight="bold", y=0.980, color="#111111")

  fig.legend(
    handles=legend_handles,
    loc="lower center",
    ncol=ncol,
    fontsize=leg_fs,
    frameon=True,
    facecolor="white",
    edgecolor="#cccccc",
    bbox_to_anchor=(0.5, 0.005),
    columnspacing=0.68,
    labelspacing=0.30,
    handletextpad=0.34,
    handlelength=1.0
  )
  top_adj = 0.915 if arg11_suptitle else 0.945
  fig.subplots_adjust(left=0.012, right=0.988, bottom=0.205, top=top_adj, wspace=0.035)
  out_p = pathlib.Path(arg0_output_path)
  out_p.parent.mkdir(parents=True, exist_ok=True)
  fig.savefig(str(out_p), dpi=300)
  plt.close(fig)


draw_two_panel_map = render_polaris_epoch_map

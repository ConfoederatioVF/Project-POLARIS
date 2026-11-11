import json
import math
import pathlib
import sys
import zipfile
import numpy as np
from PIL import Image, ImageDraw
from shapely.geometry import MultiPolygon, Polygon, box, mapping, shape
from shapely.ops import unary_union

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, str(pathlib.Path(__file__).parent))

import period_population_tables as T

CACHE_DIR = pathlib.Path(__file__).resolve().parent
BASE_DIR = CACHE_DIR.parent.parent / "1.entire_country"
HIST_DIR = CACHE_DIR / "historical_layers"
SAVES_DIR = pathlib.Path(r"f:\Active Projects\Project 1509 - SVEA\saves")

EPOCH_FOLDERS = {
  "migration_period": "1.migration_period",
  "tsardom_of_russia": "2.tsardom_of_russia",
  "imperial_russia_pre_1815": "3.imperial_russia_pre_1815",
  "imperial_russia_post_1815": "4.imperial_russia_post_1815",
  "russian_civil_war": "5.russian_civil_war",
  "soviet_lenin_stalin": "6.soviet_lenin_stalin",
  "soviet_post_stalin": "7.soviet_post_stalin",
  "post_soviet_space": "8.post_soviet_space",
  "russian_invasion_of_ukraine": "9.russian_invasion_of_ukraine"
}

print("Loading 10m outer study envelopes and historical GIS layers...")
adm1_gj = json.loads((CACHE_DIR / "ne_10m_admin_1_ru_ua_by.geojson").read_text(encoding="utf-8"))

kalin_geoms = []
sakhalin_adm1_geoms = []
all_ru_ua_by_geoms = []
for f in adm1_gj["features"]:
  pr = f["properties"]
  nm = str(pr.get("name") or pr.get("name_en") or "").strip().lower()
  g = shape(f["geometry"]).buffer(0)
  all_ru_ua_by_geoms.append(g)
  if "kaliningrad" in nm:
    kalin_geoms.append(g)
  if "sakhalin" in nm:
    sakhalin_adm1_geoms.append(g)

OUTER_RU_UA_BY = unary_union(all_ru_ua_by_geoms).buffer(0)
POLY_KALININGRAD = unary_union(kalin_geoms).buffer(0) if kalin_geoms else Polygon()
POLY_SAKHALIN_ALL = unary_union(sakhalin_adm1_geoms).buffer(0) if sakhalin_adm1_geoms else Polygon()
KURIL_BOX = box(145.35, 43.0, 157.0, 51.15)
POLY_KURILS = POLY_SAKHALIN_ALL.intersection(KURIL_BOX).buffer(0)
POLY_SAKHALIN_ISLAND = POLY_SAKHALIN_ALL.difference(KURIL_BOX).buffer(0)
OUTER_RU_UA_BY_PRE1945 = OUTER_RU_UA_BY.difference(POLY_KALININGRAD).difference(POLY_KURILS).buffer(0)

# Load 10m Neighbor Countries (EST, LVA, LTU, FIN, MDA, POL, ROU, HUN, SVK)
nb_gj = json.loads((CACHE_DIR / "ne_10m_admin_0_neighbors.geojson").read_text(encoding="utf-8"))
NB_10M = {}
for f in nb_gj["features"]:
  pr = f["properties"]
  code = (pr.get("ADM0_A3") or pr.get("ISO_A3") or "").strip().upper()
  NB_10M[code] = shape(f["geometry"]).buffer(0)

POLY_EST = NB_10M["EST"]
POLY_LVA = NB_10M["LVA"]
POLY_LTU = NB_10M["LTU"]
POLY_FIN = NB_10M["FIN"]
POLY_MDA = NB_10M["MDA"]
POLY_POL = NB_10M["POL"]

# Exclude Central Asia & Southern Caucasus strictly
c50_gj = json.loads((CACHE_DIR / "ne_50m_admin_0_countries.geojson").read_text(encoding="utf-8"))
EXCL_CODES = {"KAZ", "UZB", "TKM", "KGZ", "TJK", "GEO", "AZE", "ARM", "TUR", "IRN", "CHN", "MNG", "JPN", "NOR", "SWE"}
EXCL_CA_SC = unary_union([
  shape(f["geometry"]).buffer(0)
  for f in c50_gj["features"]
  if (f["properties"].get("ADM0_A3") in EXCL_CODES or f["properties"].get("ISO_A3") in EXCL_CODES)
]).difference(OUTER_RU_UA_BY).difference(POLY_FIN).buffer(0)

LAND_10M_WEST = unary_union([
  OUTER_RU_UA_BY_PRE1945, POLY_EST, POLY_LVA, POLY_LTU, POLY_FIN, POLY_MDA, POLY_POL,
  NB_10M["ROU"], NB_10M["HUN"], NB_10M["SVK"]
]).difference(EXCL_CA_SC).buffer(0)

# Load 1897 Census Guberniyas & Oblasts (99 features)
e1897_gj = json.loads((HIST_DIR / "empire_boundaries_1897_census.geojson").read_text(encoding="utf-8"))
E1897_LIST = []
E1897_BY_SUB = {}
for f in e1897_gj["features"]:
  if f.get("geometry"):
    nm = (f["properties"].get("NAMEENG") or "").strip().lower()
    g = shape(f["geometry"]).buffer(0)
    E1897_LIST.append((nm, g))

def get_1897_union (substrs):
  gs = [g for nm, g in E1897_LIST if any(s in nm for s in substrs)]
  return unary_union(gs).buffer(0) if gs else Polygon()

# Load Harvard Imperiia 583 Uezds + 9 Irregular Regions
uezdy_gj = json.loads((HIST_DIR / "imperiia_districts_uezdy.geojson").read_text(encoding="utf-8"))
UEZDY_LIST = []
for f in uezdy_gj["features"]:
  if f.get("geometry"):
    pr = f["properties"]
    a2 = (pr.get("Admin_2nd") or "").strip().lower()
    ut = (pr.get("Name_trs") or "").strip().lower()
    UEZDY_LIST.append((a2, ut, shape(f["geometry"]).buffer(0)))

irr_gj = json.loads((HIST_DIR / "tsardom_irregular_regions.geojson").read_text(encoding="utf-8"))
IRR_LIST = []
for f in irr_gj["features"]:
  if f.get("geometry"):
    nm = ((f["properties"].get("Name_trs") or "") + " " + (f["properties"].get("Name_eng") or "")).strip().lower()
    IRR_LIST.append((nm, shape(f["geometry"]).buffer(0)))

# Load GADM 4.1 ADM2 Raions (BLR, UKR, RUS)
ADM2_LIST = []
for c_code in ["BLR", "UKR", "RUS"]:
  with zipfile.ZipFile(HIST_DIR / f"gadm41_{c_code}_2.json.zip") as zf:
    gj = json.loads(zf.read(zf.namelist()[0]).decode("utf-8"))
    for f in gj["features"]:
      pr = f["properties"]
      n1 = (pr.get("NAME_1") or "").strip()
      n2 = (pr.get("NAME_2") or "").strip()
      if n1 == "?" or n2 == "Waterbody":
        continue
      g = shape(f["geometry"]).buffer(0)
      if not g.is_empty:
        ADM2_LIST.append((c_code, n1.lower(), n2.lower(), g))

print(f"Loaded E1897={len(E1897_LIST)}, UEZDY={len(UEZDY_LIST)}, ADM2={len(ADM2_LIST)} features.")

def has_any (text, substrs):
  return any(s in text for s in substrs)

# Exact sub-regional ADM2 sets for historical Soviet ASSRs, National Okrugs & Siberian River/Rail Belts
VOLGA_GERMAN_SARATOV_RAIONS = [
  "engel's", "marks", "rovenskiy", "krasnoarmeysk", "krasnokutskiy", "sovetskiy", "fedorovskiy"
]
VOLGA_GERMAN_VOLGOGRAD_RAIONS = [
  "staropoltavskiy", "pallasovskiy", "nikolaevskiy", "kamyshin", "zhirnovskiy", "kotovskiy"
]
MOLDAVIAN_ASSR_ODESSA_RAIONS = [
  "balts'kyi", "kotovs'k", "anan'", "kodyms'kyi", "krasnooknians'kyi"
]
BUDJAK_ODESSA_RAIONS = [
  "bilhorod-dnistrovs", "izma", "bolhrads'kyi", "artsyz'kyi", "kiliis'kyi", "reniis'kyi", "sarats'kyi", "tatarbunars'kyi", "tarutyns'kyi"
]
RIGA_MINSK_RAIONS = ["maladechna", "vileyka", "myadzyel", "valozhyn", "stowbtsy", "nyasvizh", "klyetsak"]
RIGA_VITEBSK_RAIONS = ["braslaw", "myory", "sharkawshchyna", "pastavy", "hlybokaye", "dokshytsy"]
FINNISH_KARELIA_RAIONS = [
  "vyborg", "priozersk", "sortaval", "lakhdenpokh", "pitkyarant", "suoyarv", "pechengskiy"
]
NARYM_TOMSK_RAIONS = [
  "aleksandrovskiy", "strezhevoy", "kargasokskiy", "parabel", "kolpashev", "chainskiy", "bakcharskiy", "verkhneketskiy", "molchanovskiy", "krivosheinskiy"
]
TOBOLSK_NORTH_TYUMEN_RAIONS = ["tobol'sk", "uvatskiy", "vagayskiy"]
TAYMYR_TURUKHANSK_RAIONS = [
  "diksonskiy", "dudinka", "khatangskiy", "ust'-yeniseyskiy", "igarka", "turukhanskiy"
]
EVENKIA_YENISEI_NORTH_RAIONS = [
  "ilimpiyskiy", "baykitskiy", "tungussko-chunskiy", "severo-eniseyskiy", "eniseyskiy", "motyginskiy", "boguchanskiy", "kezhemskiy"
]
MINUSINSK_SOUTH_RAIONS = [
  "minusinsk", "shushenskiy", "ermakovskiy", "karatuzskiy", "kuraginskiy", "idrinskiy", "krasnoturanskiy", "novoselovskiy", "balakhtinskiy"
]
IRKUTSK_LENA_GOLD_NORTH_RAIONS = [
  "bodayb", "mamsko-chuyskiy", "katangskiy", "kirenskiy", "kazachinsko-lenskiy", "ust'-kut"
]
UST_ORDA_BURYAT_RAIONS = [
  "alarskiy", "bayandayevskiy", "bokhanskiy", "ekhirit-bulagatskiy", "nukutskiy", "osinskiy"
]
YAKUTIA_ARCTIC_RAIONS = [
  "anabarskiy", "bulunskiy", "ust'-yanskiy", "allaikhovskiy", "nizhnekolymskiy", "srednekolymskiy",
  "verkhnekolymskiy", "abyyskiy", "momskiy", "oymyakonskiy", "verkhoyanskiy", "eveno-bytantayskiy",
  "zhiganskiy", "olenekskiy", "newsiberia"
]
KHABAROVSK_NORTH_OKHOTSK_RAIONS = ["okhotskiy", "ayano-mayskiy", "tuguro-chumikanskiy"]
BAM_AMUR_KHABAROVSK_ZAB_RAIONS = [
  "tynda", "tyndinskiy", "zeya", "zeyskiy", "selemdzhinskiy", "verkhnebureinskiy", "solnechnyy",
  "komsomol'skiy", "konsomolsk-na-amure", "vaninskiy", "sovetskaya", "sovetsko-gavanskiy",
  "kalarskiy", "tungiro-olekminskiy", "severo-baykal"
]
# Load high-resolution 2014-2021 Minsk II Line of Contact raion polygons from ukraine_acled_raioni.geojson
acled_raioni_gj = json.loads((HIST_DIR / "ukraine_acled_raioni.geojson").read_text(encoding="utf-8"))
ORDLO_2014_DONETSK = unary_union([
  shape(f["geometry"]).buffer(0)
  for f in acled_raioni_gj["features"]
  if str(f["properties"].get("ID")) in {"1406", "1408", "1410"}
]).buffer(0)
ORDLO_2014_LUHANSK = unary_union([
  shape(f["geometry"]).buffer(0)
  for f in acled_raioni_gj["features"]
  if str(f["properties"].get("ID")) in {"4402", "4404", "4406", "4408"}
]).buffer(0)

# Period-authentic 10m Outer Study Envelopes per Epoch
ENV_MIGRATION = OUTER_RU_UA_BY_PRE1945
POLY_OLD_FINLAND = get_1897_union(["vyborgskaya"]).intersection(POLY_FIN.union(OUTER_RU_UA_BY_PRE1945)).buffer(0)
POLY_BELOSTOK_GDL = get_1897_union(["grodnenskaya", "vilenskaya"]).intersection(POLY_POL).buffer(0)
POLY_CONGRESS_POLAND = get_1897_union([
  "varshavskaya", "plotskaya", "lomzhinskaya", "petrokovskaya", "kalishskaya",
  "lyublinskaya", "sedletskaya", "radomskaya", "keletskaya", "suvalkskaya",
  "grodnenskaya", "vilenskaya", "volynskaya"
]).intersection(LAND_10M_WEST).buffer(0)

ENV_TSARDOM = unary_union([
  OUTER_RU_UA_BY_PRE1945, POLY_EST, POLY_LVA, POLY_LTU, POLY_OLD_FINLAND, POLY_BELOSTOK_GDL
]).difference(EXCL_CA_SC).buffer(0)

ENV_PRE1815 = unary_union([
  OUTER_RU_UA_BY_PRE1945, POLY_EST, POLY_LVA, POLY_LTU, POLY_FIN, POLY_MDA, POLY_BELOSTOK_GDL,
  get_1897_union(["kovenskaya", "suvalkskaya"]).intersection(POLY_LTU)
]).difference(EXCL_CA_SC).buffer(0)

ENV_POST1815 = unary_union([
  OUTER_RU_UA_BY_PRE1945, POLY_EST, POLY_LVA, POLY_LTU, POLY_FIN, POLY_MDA, POLY_CONGRESS_POLAND
]).difference(EXCL_CA_SC).buffer(0)

ENV_SOVIET = unary_union([
  OUTER_RU_UA_BY, POLY_EST, POLY_LVA, POLY_LTU, POLY_MDA
]).difference(EXCL_CA_SC).buffer(0)

ENV_POST_SOVIET = OUTER_RU_UA_BY

# ==============================================================================
# EPOCH 1: TSARDOM OF RUSSIA (1400AD - 1721AD) - 38 Period-Authentic Regions
# ==============================================================================
def classify_tsardom ():
  buckets = {k: [] for k, _ in T.TSARDOM_REGIONS}

  # 1-4: Expanded Livonia/Estland, Courland/Inflanty, GDL Lithuania/Samogitia & Old Finland
  liv_1897 = get_1897_union(["estlyandskaya", "liflyandskaya"])
  kur_1897 = get_1897_union(["kurlyandskaya"])
  latgale_uezds = unary_union([g for a2, ut, g in UEZDY_LIST if a2 == "vitebskaia" and has_any(ut, ["dinaburg", "rezhitsa", "liutsyn"])]).buffer(0)

  buckets["livonia_estland_narva_dorpat"].append(POLY_EST.union(POLY_LVA.intersection(liv_1897.buffer(0.08))))
  buckets["courland_semigallia_and_inflanty"].append(POLY_LVA.intersection(kur_1897.union(latgale_uezds).buffer(0.08)))
  buckets["gdl_vilnius_trakai_and_samogitia"].append(POLY_LTU)
  buckets["vyborg_kexholm_old_finland"].append(POLY_OLD_FINLAND)

  # Crown Galicia, Bukovina & Carpathian Rus
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code == "UKR" and n1 in ["l'viv", "ivano-frankivs'k", "ternopil'", "chernivtsi", "zakarpattia"]:
      buckets["crown_galicia_belz_carpathian_rus"].append(g)

  # European Rus, Belarus, Ukraine, Muscovy, Volga-Urals & Caucasus from Imperiia Uezds
  SIB_ADMIN2 = ["tobol'skaia", "omskaia", "tomskaia", "eniseiskaia", "irkutskaia", "iakutskaia"]
  SKIP_A2 = [
    "adovskaia", "tavastguskaia", "vazovskaia", "uleoborgskaia", "kuopiovskaia",
    "khejnol'skaia ili kiumenegordskaia", "lifliandskaia", "estliandskaia",
    "kurliandskaia", "bessarabskaia", "gruziia", "vyborg"
  ]
  for a2, ut, g in UEZDY_LIST:
    if a2 in SIB_ADMIN2 or a2 in SKIP_A2:
      continue
    if a2 == "vitebskaia":
      if has_any(ut, ["dinaburg", "rezhitsa", "liutsyn"]):
        continue
      buckets["gdl_polotsk_vitebsk_dvina"].append(g)
    elif a2 in ["grodnenskaia", "belostokskaia oblast'", "vilenskaia"]:
      g_clean = g.difference(POLY_LTU)
      if g_clean.is_empty:
        continue
      if has_any(ut, ["brest", "kobrain", "kobrin", "drogichin", "pruzhany"]):
        buckets["gdl_brest_pinsk_turov_polesia"].append(g_clean)
      else:
        buckets["gdl_vilna_grodno_novogrudok"].append(g_clean)
    elif a2 == "minskaia":
      if has_any(ut, ["pinsk", "mozyr"]):
        buckets["gdl_brest_pinsk_turov_polesia"].append(g)
      elif has_any(ut, ["disna"]):
        buckets["gdl_polotsk_vitebsk_dvina"].append(g)
      elif has_any(ut, ["vilejka"]):
        buckets["gdl_vilna_grodno_novogrudok"].append(g)
      else:
        buckets["gdl_minsk_orsha_mogilev"].append(g)
    elif a2 == "mogilevskaia":
      buckets["gdl_minsk_orsha_mogilev"].append(g)
    elif a2 == "volynskaia":
      if has_any(ut, ["ovruch", "kovel"]):
        buckets["gdl_brest_pinsk_turov_polesia"].append(g)
      elif has_any(ut, ["zhitomir"]):
        buckets["hetmanate_right_bank_kyiv_regiments"].append(g)
      else:
        buckets["crown_volhynia_voivodeship"].append(g)
    elif a2 == "podol'skaia":
      buckets["crown_podolia_and_bratslav"].append(g)
    elif a2 == "kievskaia":
      buckets["hetmanate_right_bank_kyiv_regiments"].append(g)
    elif a2 == "chernigovskaia":
      buckets["hetmanate_left_bank_north_chernihiv"].append(g)
    elif a2 == "poltavskaia":
      buckets["hetmanate_left_bank_south_poltava"].append(g)
    elif a2 in ["khar'kovskaia", "slobodsko-ukrainskaia"]:
      buckets["sloboda_ukraine_regiments"].append(g)
    elif a2 in ["ekaterinoslavskaia", "khersonskaia"]:
      buckets["zaporozhian_sich_and_wild_fields"].append(g)
    elif a2 == "tavricheskaia":
      if has_any(ut, ["dneprovsk", "melitopol"]):
        buckets["zaporozhian_sich_and_wild_fields"].append(g)
      else:
        buckets["crimean_khanate_and_ottoman_kefe"].append(g)
    elif a2 in ["moskovskaia", "vladimirskaia", "iaroslavskaia", "kostromskaia", "tverskaia", "kaluzhskaia"]:
      buckets["muscovy_zamoskovny_moscow_core"].append(g)
    elif a2 in ["novgorodskaia", "pskovskaia"]:
      buckets["muscovy_novgorod_pskov_pyatiny"].append(g)
    elif a2 == "sanktpeterburgskaia":
      buckets["muscovy_karelia_ingria_st_petersburg"].append(g.difference(POLY_OLD_FINLAND))
    elif a2 == "olonetskaia":
      if has_any(ut, ["kargapol", "pudozh", "vytegra"]):
        buckets["muscovy_pomorye_dvina_pechora"].append(g)
      else:
        buckets["muscovy_karelia_ingria_st_petersburg"].append(g.difference(POLY_OLD_FINLAND))
    elif a2 in ["arkhangel'skaia", "vologodskaia", "kemi lapmark", "chast' torneorskago lapmarka"]:
      if has_any(ut, ["kem", "solovetsk"]):
        buckets["muscovy_karelia_ingria_st_petersburg"].append(g)
      else:
        buckets["muscovy_pomorye_dvina_pechora"].append(g)
    elif a2 == "smolenskaia":
      buckets["muscovy_smolensk_and_seversk"].append(g)
    elif a2 == "orlovskaia":
      if has_any(ut, ["sevsk", "trurchevsk", "trubchevsk", "briansk", "karachev"]):
        buckets["muscovy_smolensk_and_seversk"].append(g)
      else:
        buckets["muscovy_oka_ryazan_tula_abatis"].append(g)
    elif a2 in ["riazanskaia", "tul'skaia"]:
      buckets["muscovy_oka_ryazan_tula_abatis"].append(g)
    elif a2 == "kurskaia":
      buckets["muscovy_belgorod_voronezh_razryads"].append(g)
    elif a2 == "voronezhskaia":
      if has_any(ut, ["ostrogozhsk", "valujka", "biriuch", "starobel'sk"]):
        buckets["sloboda_ukraine_regiments"].append(g)
      else:
        buckets["muscovy_belgorod_voronezh_razryads"].append(g)
    elif a2 == "tambovskaia":
      if has_any(ut, ["temnikov", "shatsk", "elatom"]):
        buckets["muscovy_kazan_middle_volga_cherta"].append(g)
      else:
        buckets["muscovy_belgorod_voronezh_razryads"].append(g)
    elif a2 in ["kazanskaia", "nizhegorodskaia", "simbirskaia", "penzenskaia"]:
      buckets["muscovy_kazan_middle_volga_cherta"].append(g)
    elif a2 in ["permskaia", "viatskaia"]:
      buckets["muscovy_vyatka_perm_stroganov_urals"].append(g)
    elif a2 == "orenburgskaia":
      buckets["muscovy_bashkir_darugas_and_yaik"].append(g)
    elif a2 in ["saratovskaia", "astrakhanskaia"]:
      buckets["steppe_lower_volga_astrakhan_kalmyks"].append(g)
    elif a2 == "don cossack host":
      buckets["steppe_don_cossack_host_and_azov"].append(g)
    elif a2 in ["kavkazskaia", "kavkazskia"]:
      buckets["caucasus_circassia_kabarda_vainakh_dagestan"].append(g)

  for inm, g in IRR_LIST:
    if "donskago" in inm:
      buckets["steppe_don_cossack_host_and_azov"].append(g)
    elif "gorskikh" in inm:
      buckets["caucasus_circassia_kabarda_vainakh_dagestan"].append(g)
  for enm, g in E1897_LIST:
    if has_any(enm, ["dagestan", "terskaya", "kubanskaya", "chernomorskaya", "stravropol"]):
      buckets["caucasus_circassia_kabarda_vainakh_dagestan"].append(g)
    elif "astrakhanskaya" in enm:
      buckets["steppe_lower_volga_astrakhan_kalmyks"].append(g)
    elif "samarskaya" in enm:
      buckets["muscovy_bashkir_darugas_and_yaik"].append(g)
    elif "bessarabskaya" in enm:
      buckets["zaporozhian_sich_and_wild_fields"].append(g.intersection(OUTER_RU_UA_BY_PRE1945))

  SIBERIAN_N1 = [
    "kurgan", "tyumen'", "khanty-mansiy", "yamal-nenets", "omsk", "tomsk", "novosibirsk",
    "kemerovo", "altay", "gorno-altay", "krasnoyarsk", "khakass", "tuva", "irkutsk",
    "buryat", "zabaykal'ye", "sakha", "amur", "yevrey", "khabarovsk", "primor'ye",
    "sakhalin", "magadan", "chukot", "kamchatka"
  ]
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code != "RUS" or n1 not in SIBERIAN_N1:
      continue
    if n1 == "yamal-nenets" or (n1 == "krasnoyarsk" and has_any(n2, TAYMYR_TURUKHANSK_RAIONS)):
      buckets["siberia_pomor_mangazeya_arctic_route"].append(g)
    elif n1 == "khanty-mansiy" or (n1 == "tyumen'" and has_any(n2, TOBOLSK_NORTH_TYUMEN_RAIONS)) or (n1 == "tomsk" and has_any(n2, NARYM_TOMSK_RAIONS)):
      buckets["siberia_tobolsk_irtysh_ob_water_highway"].append(g)
    elif n1 in ["kurgan", "tyumen'", "tomsk", "kemerovo"] or (n1 == "omsk" and g.centroid.y >= 55.35):
      buckets["siberia_southern_tara_tomsk_kuznetsk_line"].append(g)
    elif n1 in ["omsk", "novosibirsk", "altay", "gorno-altay", "khakass", "tuva"] or (n1 == "krasnoyarsk" and has_any(n2, MINUSINSK_SOUTH_RAIONS)):
      buckets["siberia_nomadic_baraba_altai_sayan_steppe"].append(g)
    elif n1 in ["krasnoyarsk", "irkutsk"]:
      buckets["siberia_yeniseysk_angara_ilimsk_portage"].append(g)
    elif n1 in ["buryat", "zabaykal'ye", "amur", "yevrey", "primor'ye"] or (n1 == "khabarovsk" and not has_any(n2, KHABAROVSK_NORTH_OKHOTSK_RAIONS)):
      buckets["siberia_transbaikal_dauria_nerchinsk"].append(g)
    elif n1 == "sakha" and not has_any(n2, YAKUTIA_ARCTIC_RAIONS):
      buckets["siberia_lena_yakutsk_alaas_core"].append(g)
    else:
      buckets["siberia_arctic_kolyma_okhotsk_kamchatka"].append(g)
  return buckets

# ==============================================================================
# EPOCH 2: IMPERIAL RUSSIA PRE-1815 (1721AD - 1815AD) - 40 Soul-Revision Regions
# ==============================================================================
def classify_imperial_pre1815 ():
  buckets = {k: [] for k, _ in T.IMPERIAL_PRE1815_REGIONS}

  # 1-5: Ostsee Governorates, Old Finland & Grand Duchy of Finland (1809AD)
  est_97 = get_1897_union(["estlyandskaya"]).buffer(0.08)
  liv_97 = get_1897_union(["liflyandskaya"]).buffer(0.08)
  kur_97 = get_1897_union(["kurlyandskaya"]).buffer(0.08)
  vyb_97 = POLY_OLD_FINLAND

  buckets["ostsee_estland_governorate"].append(POLY_EST.intersection(est_97))
  buckets["ostsee_livland_governorate"].append((POLY_EST.difference(est_97)).union(POLY_LVA.intersection(liv_97)))
  buckets["ostsee_courland_governorate"].append(POLY_LVA.intersection(kur_97))
  buckets["old_finland_vyborg_governorate"].append(vyb_97)
  buckets["grand_duchy_of_finland_1809"].append(POLY_FIN.difference(vyb_97))

  # 10: Habsburg Galicia, Bukovina & Carpathian Rus
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code == "UKR" and n1 in ["l'viv", "ivano-frankivs'k", "ternopil'", "chernivtsi", "zakarpattia"]:
      buckets["habsburg_galicia_and_bukovina_1772"].append(g)

  # 18: Bessarabia Oblast (1812AD) = Moldova + Ukrainian Budjak & Khotyn
  buckets["bessarabia_oblast_1812"].append(POLY_MDA.union(get_1897_union(["bessarabskaya"]).intersection(OUTER_RU_UA_BY_PRE1945)))

  # 6-9, 11-17, 19-33: European Provinces
  buckets["lithuania_vilna_and_samogitia_kovno"].append(POLY_LTU.union(get_1897_union(["vilenskaya", "kovenskaya"])))
  buckets["belarus_grodno_and_belostok_1807"].append(get_1897_union(["grodnenskaya"]).difference(POLY_LTU))
  buckets["belarus_vitebsk_and_mogilev_1772"].append(get_1897_union(["vitebskaya", "mogilevskaya"]).union(POLY_LVA.difference(liv_97).difference(kur_97)))
  buckets["belarus_minsk_governorate_1793"].append(get_1897_union(["minskaya"]))
  buckets["ukraine_volhynia_and_podolia_1793"].append(get_1897_union(["volynskaya", "podolskaya"]))
  buckets["ukraine_kyiv_governorate_1793"].append(get_1897_union(["kiyevskaya"]))
  buckets["malorossiya_chernigov_and_poltava"].append(get_1897_union(["chernigovskaya", "poltavskaya"]))
  buckets["sloboda_ukraine_kharkov_governorate"].append(get_1897_union(["kharkovskaya"]))
  buckets["novorossiya_ekaterinoslav_zaporizhzhia"].append(get_1897_union(["ekaterinoslavskaya"]))
  buckets["novorossiya_kherson_ochakov_odessa"].append(get_1897_union(["khersonskaya"]))
  buckets["novorossiya_taurida_crimea_1783"].append(get_1897_union(["tavricheskaya"]))
  buckets["capital_st_petersburg_governorate"].append(get_1897_union(["peterburgskaya"]).difference(vyb_97))
  buckets["lakes_novgorod_pskov_and_olonets"].append(get_1897_union(["novgorodskaya", "pskovskaya", "olonetskaya"]).difference(vyb_97))
  buckets["north_arkhangelsk_and_vologda"].append(get_1897_union(["arkhangelskaya", "vologodskaya"]))
  buckets["capital_moscow_governorate"].append(get_1897_union(["moskovskaya"]))
  buckets["western_approach_smolensk_kaluga_tver"].append(get_1897_union(["smolenskaya", "kaluzhskaya", "tverskaya"]))
  buckets["central_non_black_earth_industrial"].append(get_1897_union(["vladimirskaya", "yaroslavskaya", "kostromskaya", "nizhegorodskaya"]))
  buckets["northern_black_earth_tula_ryazan_orel"].append(get_1897_union(["tulskaya", "ryazanskaya", "orlovskaya"]))
  buckets["southern_black_earth_kursk_voronezh_tambov"].append(get_1897_union(["kurskaya", "voronezhskaya", "tambovskaya"]))
  buckets["middle_volga_kazan_simbirsk_penza"].append(get_1897_union(["kazanskaya", "simbirskaya", "penzenskaya"]))
  buckets["lower_volga_saratov_astrakhan_1763_1771"].append(get_1897_union(["saratovskaya", "astrakhanskaya"]).union(get_1897_union(["samarskaya"]).intersection(box(45.0, 48.0, 54.0, 52.8))))
  buckets["don_cossack_host_province"].append(get_1897_union(["voyska donskogo"]))

  # 30 vs 31: Caucasian Fortified Line (Black Sea Cossacks north of Kuban + Stavropol/Terek Line) vs North Caucasian Highlands
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code != "RUS":
      continue
    if n1 == "stavropol'" or (n1 == "krasnodar" and g.centroid.y >= 45.02) or (n1 == "chechnya" and has_any(n2, ["naurskiy", "shelkovskiy"])):
      buckets["caucasian_line_kuban_and_stavropol"].append(g)
    elif n1 in ["krasnodar", "adygey", "karachay-cherkess", "kabardin-balkar", "northossetia", "ingush", "chechnya", "dagestan"]:
      buckets["north_caucasus_highlands_circassia_dagestan"].append(g)

  buckets["northern_urals_perm_and_vyatka"].append(get_1897_union(["permskaya", "vyatskaya"]))
  buckets["southern_urals_orenburg_and_bashkiria"].append(get_1897_union(["orenburgskaya", "ufimskaya"]).union(get_1897_union(["samarskaya"]).intersection(box(48.0, 52.8, 56.0, 55.5))))

  # 34-40: 18th/Early-19th Century Siberia
  euro_claimed = unary_union([unary_union(v) for v in buckets.values() if v]).buffer(0)
  SIB_N1 = [
    "kurgan", "tyumen'", "khanty-mansiy", "yamal-nenets", "omsk", "tomsk", "novosibirsk",
    "kemerovo", "altay", "gorno-altay", "krasnoyarsk", "khakass", "tuva", "irkutsk",
    "buryat", "zabaykal'ye", "sakha", "amur", "yevrey", "khabarovsk", "primor'ye",
    "sakhalin", "magadan", "chukot", "kamchatka"
  ]
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code != "RUS" or n1 not in SIB_N1:
      continue
    g_rem = g.difference(euro_claimed)
    if g_rem.is_empty:
      continue
    if n1 in ["yamal-nenets", "khanty-mansiy"] or (n1 == "tyumen'" and has_any(n2, TOBOLSK_NORTH_TYUMEN_RAIONS)) or (n1 == "tomsk" and has_any(n2, NARYM_TOMSK_RAIONS)):
      buckets["siberia_tobolsk_north_ob_irtysh_narym"].append(g_rem)
    elif n1 in ["kurgan", "tyumen'", "omsk"]:
      buckets["siberia_tobolsk_trakt_and_ishim_line"].append(g_rem)
    elif n1 in ["tomsk", "novosibirsk", "kemerovo", "altay"]:
      buckets["siberia_tomsk_and_kolyvan_altai_mines"].append(g_rem)
    elif n1 in ["gorno-altay", "khakass", "tuva"] or (n1 == "krasnoyarsk" and has_any(n2, MINUSINSK_SOUTH_RAIONS)):
      buckets["siberia_altai_sayan_and_minusinsk_border"].append(g_rem)
    elif n1 == "krasnoyarsk":
      buckets["siberia_yeniseisk_and_turukhansk_basin"].append(g_rem)
    elif n1 in ["irkutsk", "buryat", "zabaykal'ye", "amur", "yevrey", "primor'ye"] or (n1 == "khabarovsk" and not has_any(n2, KHABAROVSK_NORTH_OKHOTSK_RAIONS)):
      buckets["siberia_irkutsk_and_transbaikal_kiakhta"].append(g_rem)
    else:
      buckets["siberia_yakutsk_okhotsk_and_kamchatka"].append(g_rem)
  return buckets

# ==============================================================================
# EPOCHS 3 & 4: IMPERIAL RUSSIA POST-1815 & RUSSIAN CIVIL WAR (48 Tsarist Regions)
# ==============================================================================
def classify_imperial_post1815 ():
  buckets = {k: [] for k, _ in T.IMPERIAL_POST1815_REGIONS}

  # 1-4: Congress Kingdom of Poland (10 Vistula Governorates)
  buckets["poland_warsaw_plock_lomza"].append(get_1897_union(["varshavskaya", "plotskaya", "lomzhinskaya"]))
  buckets["poland_piotrkow_and_kalisz"].append(get_1897_union(["petrokovskaya", "kalishskaya"]))
  buckets["poland_lublin_siedlce_kholm"].append(get_1897_union(["lyublinskaya", "sedletskaya"]))
  buckets["poland_radom_kielce_suwalki"].append(get_1897_union(["radomskaya", "keletskaya", "suvalkskaya"]))

  # 5-7: Ostsee Baltic Governorates (10m coastal islands preserved)
  est_97 = get_1897_union(["estlyandskaya"]).buffer(0.08)
  liv_97 = get_1897_union(["liflyandskaya"]).buffer(0.08)
  kur_97 = get_1897_union(["kurlyandskaya"]).buffer(0.08)
  buckets["ostsee_estland_governorate"].append(POLY_EST.intersection(est_97))
  buckets["ostsee_livland_governorate"].append((POLY_EST.difference(est_97)).union(POLY_LVA.intersection(liv_97)))
  buckets["ostsee_courland_governorate"].append(POLY_LVA.intersection(kur_97))

  # 8-9: Grand Duchy of Finland (Southern vs Northern Governorates, 10m archipelago preserved)
  fin_south_97 = get_1897_union(["nyulandskaya", "abosskaya", "tavastgusskaya", "vyborgskaya"]).buffer(0.12)
  fin_north_97 = get_1897_union(["vazaskaya", "kuopioskaya", "sankt-mikhelskaya", "uleaborgskaya"]).buffer(0.12)
  vyb_ru = get_1897_union(["vyborgskaya"]).intersection(OUTER_RU_UA_BY_PRE1945)
  buckets["finland_southern_nyland_abo_vyborg"].append(POLY_FIN.intersection(fin_south_97).union(vyb_ru))
  buckets["finland_northern_vasa_kuopio_oulu"].append(POLY_FIN.difference(fin_south_97))

  # 10-13: Northwestern Krai (Lithuania & Belarus + Latgalian uezds of Vitebsk)
  kov_97 = get_1897_union(["kovenskaya"])
  suw_97 = get_1897_union(["suvalkskaya"])
  vil_grod_97 = get_1897_union(["vilenskaya", "grodnenskaya"])
  buckets["nw_krai_kovno_lithuania"].append(kov_97.union(POLY_LTU.difference(vil_grod_97).difference(suw_97)))
  buckets["nw_krai_vilna_and_grodno"].append(vil_grod_97)
  buckets["nw_krai_minsk_governorate"].append(get_1897_union(["minskaya"]))
  buckets["nw_krai_vitebsk_and_mogilev"].append(get_1897_union(["vitebskaya", "mogilevskaya"]).union(POLY_LVA.difference(liv_97).difference(kur_97)))

  # 14-15: Habsburg Galicia vs Bukovina & Carpathian Rus
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code == "UKR":
      if n1 in ["l'viv", "ivano-frankivs'k", "ternopil'"]:
        buckets["habsburg_eastern_galicia"].append(g)
      elif n1 in ["chernivtsi", "zakarpattia"]:
        buckets["habsburg_bukovina_and_carpathian_rus"].append(g)

  # 16: Bessarabia Governorate (10m Moldova + Ukrainian Budjak & Khotyn)
  buckets["bessarabia_governorate"].append(POLY_MDA.union(get_1897_union(["bessarabskaya"]).intersection(OUTER_RU_UA_BY_PRE1945)))

  # 17-40: Ukrainian, European Russian, Volga, Don, Caucasian & Ural 1897 Governorates/Oblasts
  buckets["sw_krai_volhynia_governorate"].append(get_1897_union(["volynskaya"]))
  buckets["sw_krai_podolia_governorate"].append(get_1897_union(["podolskaya"]))
  buckets["sw_krai_kyiv_governorate"].append(get_1897_union(["kiyevskaya"]))
  buckets["malorossiya_chernigov_and_poltava"].append(get_1897_union(["chernigovskaya", "poltavskaya"]))
  buckets["sloboda_kharkov_governorate"].append(get_1897_union(["kharkovskaya"]))
  buckets["novorossiya_kherson_governorate"].append(get_1897_union(["khersonskaya"]))
  buckets["novorossiya_ekaterinoslav_governorate"].append(get_1897_union(["ekaterinoslavskaya"]))
  buckets["novorossiya_taurida_governorate"].append(get_1897_union(["tavricheskaya"]))
  buckets["capital_st_petersburg_governorate"].append(get_1897_union(["peterburgskaya"]).difference(vyb_ru))
  buckets["lakes_novgorod_pskov_olonets"].append(get_1897_union(["novgorodskaya", "pskovskaya", "olonetskaya"]).difference(vyb_ru))
  buckets["european_north_arkhangelsk_vologda"].append(get_1897_union(["arkhangelskaya", "vologodskaya"]))
  buckets["capital_moscow_governorate"].append(get_1897_union(["moskovskaya"]))
  buckets["central_industrial_ring"].append(get_1897_union(["vladimirskaya", "yaroslavskaya", "kostromskaya", "tverskaya", "smolenskaya", "kaluzhskaya"]))
  buckets["central_black_earth_west"].append(get_1897_union(["kurskaya", "orlovskaya", "tulskaya"]))
  buckets["central_black_earth_east"].append(get_1897_union(["voronezhskaya", "tambovskaya", "ryazanskaya"]))
  buckets["middle_volga_nizhny_kazan_simbirsk_penza"].append(get_1897_union(["nizhegorodskaya", "kazanskaya", "simbirskaya", "penzenskaya"]))
  buckets["volga_steppe_samara_and_saratov"].append(get_1897_union(["samarskaya", "saratovskaya"]))
  buckets["lower_volga_astrakhan_governorate"].append(get_1897_union(["astrakhanskaya"]))
  buckets["don_cossack_host_oblast"].append(get_1897_union(["voyska donskogo"]))
  buckets["caucasus_kuban_and_black_sea"].append(get_1897_union(["kubanskaya", "chernomorskaya"]))
  buckets["caucasus_stavropol_and_terek"].append(get_1897_union(["stravropolskaya", "terskaya"]))
  buckets["caucasus_dagestan_oblast"].append(get_1897_union(["dagestanskaya"]))
  buckets["northern_urals_perm_and_vyatka"].append(get_1897_union(["permskaya", "vyatskaya"]))
  buckets["southern_urals_ufa_and_orenburg"].append(get_1897_union(["ufimskaya", "orenburgskaya"]))

  # 41-48: Siberia & Priamurye (incl. full Sakhalin Island, clipped against European Urals)
  euro_claimed = unary_union([unary_union(v) for v in buckets.values() if v]).buffer(0)
  SIB_N1 = [
    "kurgan", "tyumen'", "khanty-mansiy", "yamal-nenets", "omsk", "tomsk", "novosibirsk",
    "kemerovo", "altay", "gorno-altay", "krasnoyarsk", "khakass", "tuva", "irkutsk",
    "buryat", "zabaykal'ye", "sakha", "amur", "yevrey", "khabarovsk", "primor'ye",
    "sakhalin", "magadan", "chukot", "kamchatka"
  ]
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code != "RUS" or n1 not in SIB_N1:
      continue
    g_rem = g.difference(euro_claimed).difference(KURIL_BOX)
    if g_rem.is_empty:
      continue
    if n1 in ["yamal-nenets", "khanty-mansiy"] or (n1 == "tyumen'" and has_any(n2, TOBOLSK_NORTH_TYUMEN_RAIONS)) or (n1 == "tomsk" and has_any(n2, NARYM_TOMSK_RAIONS)):
      buckets["siberia_ob_irtysh_river_north"].append(g_rem)
    elif n1 in ["kurgan", "tyumen'", "omsk"]:
      buckets["siberia_west_transsiberian_tobolsk_omsk"].append(g_rem)
    elif n1 in ["tomsk", "novosibirsk", "kemerovo", "altay"]:
      buckets["siberia_tomsk_rail_and_altai_cabinet"].append(g_rem)
    elif n1 in ["gorno-altay", "khakass", "tuva"] or (n1 == "krasnoyarsk" and has_any(n2, MINUSINSK_SOUTH_RAIONS)):
      buckets["siberia_altai_sayan_and_uriankhai_1914"].append(g_rem)
    elif (n1 == "krasnoyarsk" and (has_any(n2, TAYMYR_TURUKHANSK_RAIONS) or has_any(n2, EVENKIA_YENISEI_NORTH_RAIONS))) or (n1 == "irkutsk" and has_any(n2, IRKUTSK_LENA_GOLD_NORTH_RAIONS)):
      buckets["siberia_yenisei_turukhansk_and_lena_gold"].append(g_rem)
    elif n1 in ["krasnoyarsk", "irkutsk"]:
      buckets["siberia_central_transsiberian_krasnoyarsk_irkutsk"].append(g_rem)
    elif n1 in ["buryat", "zabaykal'ye", "sakha", "magadan", "chukot", "kamchatka"] or (n1 == "khabarovsk" and has_any(n2, KHABAROVSK_NORTH_OKHOTSK_RAIONS)):
      buckets["siberia_transbaikal_and_yakutsk"].append(g_rem)
    else:
      buckets["far_east_priamurye_amur_primorskaya_sakhalin"].append(g_rem)
  buckets["far_east_priamurye_amur_primorskaya_sakhalin"].append(POLY_SAKHALIN_ISLAND)
  return buckets

# ==============================================================================
# EPOCH 5: SOVIET LENIN & STALIN (1926AD - 1953AD) - 45 USSR Regions
# ==============================================================================
def classify_stalin ():
  buckets = {k: [] for k, _ in T.STALIN_REGIONS}
  buckets["estonian_ssr_1940_occupation"].append(POLY_EST)
  buckets["latvian_ssr_1940_occupation"].append(POLY_LVA)
  buckets["lithuanian_ssr_1940_occupation"].append(POLY_LTU)
  buckets["moldavian_ssr_1940_bessarabia_massr"].append(POLY_MDA)
  buckets["kaliningrad_oblast_1945_resettlement"].append(POLY_KALININGRAD)

  for c_code, n1, n2, g in ADM2_LIST:
    if c_code == "BLR":
      if n1 in ["brest", "grodno"] or (n1 == "minsk" and has_any(n2, RIGA_MINSK_RAIONS)) or (n1 == "vitebsk" and has_any(n2, RIGA_VITEBSK_RAIONS)):
        buckets["bssr_west_belarus_1939_annexation"].append(g)
      else:
        buckets["bssr_east_belarus_minsk_vitebsk_mogilev_gomel"].append(g)
    elif c_code == "UKR":
      if n1 in ["crimea", "sevastopol'"]:
        buckets["crimean_assr_1944_tatar_deportation"].append(g)
      elif n1 in ["l'viv", "ivano-frankivs'k", "ternopil'", "volyn", "rivne"]:
        buckets["ukssr_west_galicia_volhynia_1939_annexation"].append(g)
      elif n1 in ["chernivtsi", "zakarpattia"] or (n1 == "odessa" and has_any(n2, BUDJAK_ODESSA_RAIONS)):
        buckets["ukssr_bukovina_budjak_and_transcarpathia"].append(g)
      elif n1 in ["zhytomyr", "vinnytsya", "khmel'nyts'kyy", "kiev", "kievcity", "cherkasy"] or (n1 == "odessa" and has_any(n2, MOLDAVIAN_ASSR_ODESSA_RAIONS)):
        buckets["ukssr_right_bank_holodomor_core"].append(g)
      elif n1 in ["kharkiv", "poltava", "sumy", "chernihiv"]:
        buckets["ukssr_left_bank_holodomor_kharkiv_poltava_chernihiv"].append(g)
      elif n1 in ["dnipropetrovs'k", "zaporizhia", "kirovohrad"]:
        buckets["ukssr_dnieper_industrial_bend"].append(g)
      elif n1 in ["donets'k", "luhans'k"]:
        buckets["ukssr_donbas_stalino_voroshilovgrad"].append(g)
      else:
        buckets["ukssr_black_sea_steppe_odesa_mykolaiv_kherson"].append(g)
    else:
      if n1 == "kaliningrad":
        buckets["kaliningrad_oblast_1945_resettlement"].append(g)
      elif n1 in ["karelia", "murmansk"] or (n1 == "leningrad" and has_any(n2, FINNISH_KARELIA_RAIONS)):
        buckets["karelo_finnish_ssr_and_murmansk_bbk"].append(g)
      elif n1 in ["cityofst.petersburg", "leningrad", "novgorod", "pskov"]:
        buckets["leningrad_siege_novgorod_and_pskov"].append(g)
      elif n1 in ["komi", "nenets"]:
        buckets["komi_assr_vorkutlag_ukhtpechlag_and_nenets"].append(g)
      elif n1 in ["arkhangel'sk", "vologda"]:
        buckets["northern_krai_arkhangelsk_and_vologda_exile"].append(g)
      elif n1 in ["moscowcity", "moskva"]:
        buckets["moscow_metropolis_and_dmitlag_canal"].append(g)
      elif n1 in ["vladimir", "ivanovo", "yaroslavl'", "kostroma", "tver'", "kaluga", "smolensk", "bryansk"]:
        buckets["upper_volga_and_western_front_oblasts"].append(g)
      elif n1 in ["voronezh", "kursk", "belgorod", "orel", "lipetsk", "tambov", "tula", "ryazan'"]:
        buckets["central_black_earth_voronezh_kursk_orel_tambov"].append(g)
      elif n1 in ["chuvash", "mariy-el", "mordovia", "udmurt", "nizhegorod", "kirov"]:
        buckets["volga_kama_assrs_chuvash_mari_mordovia_udmurtia"].append(g)
      elif n1 in ["tatarstan", "ul'yanovsk", "penza"]:
        buckets["tatar_assr_and_ulyanovsk_penza"].append(g)
      elif n1 in ["samara", "orenburg"]:
        buckets["kuibyshev_wartime_capital_and_chkalov"].append(g)
      elif (n1 == "saratov" and has_any(n2, VOLGA_GERMAN_SARATOV_RAIONS)) or (n1 == "volgograd" and has_any(n2, VOLGA_GERMAN_VOLGOGRAD_RAIONS)):
        buckets["volga_german_assr_1941_deportation_zone"].append(g)
      elif n1 in ["saratov", "volgograd", "astrakhan'"]:
        buckets["saratov_stalingrad_and_astrakhan_lower_volga"].append(g)
      elif n1 == "kalmyk":
        buckets["kalmyk_assr_1943_deportation_zone"].append(g)
      elif n1 in ["rostov", "krasnodar", "adygey"]:
        buckets["rostov_krasnodar_kuban_famine_and_adygei_ao"].append(g)
      elif n1 in ["stavropol'", "karachay-cherkess"] or (n1 == "chechnya" and has_any(n2, ["naurskiy", "shelkovskiy"])):
        buckets["stavropol_karachay_1943_deportation_and_cherkess"].append(g)
      elif n1 == "kabardin-balkar" or (n1 == "northossetia" and "prigorod" not in n2):
        buckets["kabardino_balkar_1944_deportation_and_north_ossetia"].append(g)
      elif n1 in ["chechnya", "ingush"] or (n1 == "northossetia" and "prigorod" in n2):
        buckets["chechen_ingush_assr_1944_chechevitsa_grozny"].append(g)
      elif n1 == "dagestan":
        buckets["dagestan_assr_aukhovsky_and_mountain_transfers"].append(g)
      elif n1 in ["sverdlovsk", "chelyabinsk", "perm'", "bashkortostan"]:
        buckets["ural_evacuation_arsenal_and_bashkir_assr"].append(g)
      elif n1 in ["yamal-nenets", "khanty-mansiy"] or (n1 == "tyumen'" and has_any(n2, TOBOLSK_NORTH_TYUMEN_RAIONS)) or (n1 == "tomsk" and has_any(n2, NARYM_TOMSK_RAIONS)):
        buckets["ob_irtysh_special_settlements_narym_yugra_yamal"].append(g)
      elif n1 in ["kurgan", "tyumen'", "omsk", "novosibirsk", "tomsk"]:
        buckets["west_siberia_transsiberian_tyumen_omsk_novosibirsk"].append(g)
      elif n1 == "kemerovo":
        buckets["kuzbass_kemerovo_coal_steel_and_siblag"].append(g)
      elif n1 == "altay":
        buckets["altai_krai_german_kalmyk_kulak_deportee_hub"].append(g)
      elif n1 in ["gorno-altay", "khakass", "tuva"] or (n1 == "krasnoyarsk" and has_any(n2, MINUSINSK_SOUTH_RAIONS)):
        buckets["altai_sayan_autonomous_oyrot_khakass_and_tuva_1944"].append(g)
      elif (n1 == "krasnoyarsk" and (has_any(n2, TAYMYR_TURUKHANSK_RAIONS) or has_any(n2, EVENKIA_YENISEI_NORTH_RAIONS))):
        buckets["yenisei_taymyr_polar_norillag_igarka_evenkia"].append(g)
      elif n1 == "irkutsk" and has_any(n2, UST_ORDA_BURYAT_RAIONS):
        buckets["buryat_mongol_assr_1937_split_and_chita_bamlag"].append(g)
      elif n1 in ["krasnoyarsk", "irkutsk"]:
        buckets["east_siberia_transsiberian_krasnoyarsk_irkutsk_ozerlag"].append(g)
      elif n1 in ["buryat", "zabaykal'ye"]:
        buckets["buryat_mongol_assr_1937_split_and_chita_bamlag"].append(g)
      elif n1 == "sakha":
        buckets["yakut_assr_aldan_churapcha_and_lena_exiles"].append(g)
      elif n1 in ["magadan", "chukot", "kamchatka"] or (n1 == "khabarovsk" and has_any(n2, KHABAROVSK_NORTH_OKHOTSK_RAIONS)):
        buckets["dalstroy_kolyma_magadan_chukotka_kamchatka"].append(g)
      else:
        buckets["far_east_amur_birobidzhan_primorye_1937_koreans_sakhalin"].append(g)
  return buckets

# ==============================================================================
# EPOCH 6: SOVIET POST-STALIN (1953AD - 1991AD) - 41 USSR Regions
# ==============================================================================
def classify_post_stalin ():
  buckets = {k: [] for k, _ in T.POST_STALIN_REGIONS}
  buckets["estonian_ssr_post_stalin"].append(POLY_EST)
  buckets["latvian_ssr_post_stalin"].append(POLY_LVA)
  buckets["lithuanian_ssr_post_stalin"].append(POLY_LTU)
  buckets["moldavian_ssr_post_stalin"].append(POLY_MDA)
  buckets["kaliningrad_oblast_baltic_fleet"].append(POLY_KALININGRAD)

  for c_code, n1, n2, g in ADM2_LIST:
    if c_code == "BLR":
      if n1 == "minsk": buckets["bssr_minsk_metropolitan_industrial_core"].append(g)
      elif n1 in ["brest", "grodno", "vitebsk"]: buckets["bssr_west_brest_grodno_and_vitebsk"].append(g)
      else: buckets["bssr_gomel_mogilev_and_chernobyl_fallout"].append(g)
    elif c_code == "UKR":
      if n1 in ["crimea", "sevastopol'"]: buckets["ukssr_crimean_oblast_1954_transfer"].append(g)
      elif n1 in ["l'viv", "ivano-frankivs'k", "ternopil'", "volyn", "rivne", "chernivtsi", "zakarpattia"]:
        buckets["ukssr_western_galicia_volhynia_carpathians"].append(g)
      elif n1 in ["kiev", "kievcity", "zhytomyr", "chernihiv"]:
        buckets["ukssr_kyiv_metropolis_and_pripyat_chernobyl"].append(g)
      elif n1 in ["vinnytsya", "khmel'nyts'kyy", "cherkasy", "poltava", "sumy"]:
        buckets["ukssr_central_podolia_cherkasy_poltava_sumy"].append(g)
      elif n1 in ["kharkiv", "dnipropetrovs'k", "zaporizhia", "kirovohrad"]:
        buckets["ukssr_kharkiv_and_dnieper_industrial_bend"].append(g)
      elif n1 in ["donets'k", "luhans'k"]:
        buckets["ukssr_donbas_donetsk_voroshilovgrad"].append(g)
      else:
        buckets["ukssr_black_sea_odesa_mykolaiv_kherson"].append(g)
    else:
      if n1 == "kaliningrad":
        buckets["kaliningrad_oblast_baltic_fleet"].append(g)
      elif n1 in ["karelia", "murmansk"]:
        buckets["karelian_assr_1956_and_murmansk_arctic"].append(g)
      elif n1 in ["cityofst.petersburg", "leningrad", "novgorod", "pskov"]:
        buckets["leningrad_novgorod_and_pskov"].append(g)
      elif n1 in ["arkhangel'sk", "vologda", "komi", "nenets"]:
        buckets["northern_arkhangelsk_vologda_and_komi_assr"].append(g)
      elif n1 in ["moscowcity", "moskva"]:
        buckets["moscow_capital_and_naukograd_ring"].append(g)
      elif n1 in ["tver'", "smolensk", "bryansk", "kaluga", "tula", "ryazan'", "yaroslavl'", "kostroma", "ivanovo", "vladimir", "orel"]:
        buckets["central_nechernozemye_depopulation_ring"].append(g)
      elif n1 in ["nizhegorod", "kirov", "chuvash", "mariy-el", "mordovia", "udmurt"]:
        buckets["volga_vyatka_gorky_kirov_and_finno_ugric_assrs"].append(g)
      elif n1 in ["voronezh", "kursk", "belgorod", "lipetsk", "tambov"]:
        buckets["central_black_earth_voronezh_kursk_belgorod_lipetsk_tambov"].append(g)
      elif n1 in ["tatarstan", "samara", "ul'yanovsk", "penza"]:
        buckets["tatar_assr_kuibyshev_ulyanovsk_penza_auto_hydro"].append(g)
      elif n1 in ["saratov", "volgograd", "astrakhan'", "kalmyk"]:
        buckets["lower_volga_saratov_volgograd_astrakhan_kalmyk_assr"].append(g)
      elif n1 in ["rostov", "krasnodar", "stavropol'", "adygey", "karachay-cherkess"]:
        buckets["rostov_krasnodar_stavropol_adygei_karachay_cherkess"].append(g)
      elif n1 in ["kabardin-balkar", "northossetia"]:
        buckets["kabardino_balkar_and_north_ossetian_assrs"].append(g)
      elif n1 in ["chechnya", "ingush"]:
        buckets["chechen_ingush_assr_1957_restoration"].append(g)
      elif n1 == "dagestan":
        buckets["dagestan_assr_lowland_kutan_boom"].append(g)
      elif n1 in ["sverdlovsk", "chelyabinsk", "perm'"]:
        buckets["ural_industrial_sverdlovsk_chelyabinsk_perm"].append(g)
      elif n1 in ["bashkortostan", "orenburg", "kurgan"]:
        buckets["bashkir_assr_orenburg_and_kurgan_tselina"].append(g)
      elif n1 == "yamal-nenets":
        buckets["yamalo_nenets_polar_gas_frontier"].append(g)
      elif n1 == "khanty-mansiy":
        buckets["khanty_mansi_middle_ob_oil_frontier"].append(g)
      elif n1 in ["tyumen'", "omsk", "novosibirsk", "tomsk", "altay"]:
        buckets["west_siberia_transsiberian_tyumen_omsk_novosibirsk_altai_tselina"].append(g)
      elif n1 == "kemerovo":
        buckets["kuzbass_kemerovo_coal_steel_conurbation"].append(g)
      elif n1 in ["gorno-altay", "khakass", "tuva"]:
        buckets["altai_sayan_gorno_altai_khakassia_and_tuva_assr"].append(g)
      elif n1 == "krasnoyarsk" and (has_any(n2, TAYMYR_TURUKHANSK_RAIONS) or has_any(n2, EVENKIA_YENISEI_NORTH_RAIONS)):
        buckets["norilsk_taymyr_and_evenkia_polar_north"].append(g)
      elif n1 == "irkutsk" and has_any(n2, IRKUTSK_LENA_GOLD_NORTH_RAIONS):
        buckets["buryat_assr_chita_and_bam_mainline_corridor"].append(g)
      elif n1 in ["krasnoyarsk", "irkutsk"]:
        buckets["angara_yenisei_hydro_cascade_krasnoyarsk_irkutsk"].append(g)
      elif n1 == "sakha":
        buckets["yakut_assr_mirny_diamonds_and_lena_north"].append(g)
      elif n1 in ["buryat", "zabaykal'ye"] or (n1 in ["amur", "khabarovsk"] and has_any(n2, BAM_AMUR_KHABAROVSK_ZAB_RAIONS)):
        buckets["buryat_assr_chita_and_bam_mainline_corridor"].append(g)
      elif n1 in ["magadan", "chukot", "kamchatka"] or (n1 == "khabarovsk" and has_any(n2, KHABAROVSK_NORTH_OKHOTSK_RAIONS)):
        buckets["extreme_northeast_magadan_chukotka_kamchatka_arctic"].append(g)
      else:
        buckets["far_east_southern_pacific_primorye_khabarovsk_amur_sakhalin"].append(g)
  return buckets

# ==============================================================================
# EPOCH 7: POST-SOVIET SPACE (1991AD - 2021AD) - 35 RU/UA/BY Regions
# ==============================================================================
def classify_post_soviet ():
  buckets = {k: [] for k, _ in T.POST_SOVIET_REGIONS}
  for c_code, n1, n2, g in ADM2_LIST:
    if c_code == "BLR":
      if n1 == "minsk": buckets["belarus_minsk_city_and_oblast_magnet"].append(g)
      elif n1 in ["brest", "grodno"]: buckets["belarus_western_brest_and_grodno"].append(g)
      else: buckets["belarus_eastern_vitebsk_mogilev_gomel"].append(g)
    elif c_code == "UKR":
      if n1 in ["crimea", "sevastopol'"]: buckets["crimea_and_sevastopol_2014_annexation"].append(g)
      elif n1 in ["l'viv", "ivano-frankivs'k", "ternopil'", "volyn", "rivne", "chernivtsi", "zakarpattia"]:
        buckets["ukraine_western_galicia_volhynia_carpathians"].append(g)
      elif n1 in ["kiev", "kievcity"]:
        buckets["ukraine_kyiv_city_and_metropolitan_oblast"].append(g)
      elif n1 in ["chernihiv", "sumy", "poltava", "cherkasy", "vinnytsya", "zhytomyr", "khmel'nyts'kyy", "kirovohrad"]:
        buckets["ukraine_central_and_northern_depopulation_belt"].append(g)
      elif n1 in ["kharkiv", "dnipropetrovs'k", "zaporizhia"]:
        buckets["ukraine_kharkiv_dnipro_zaporizhzhia_industrial_east"].append(g)
      elif n1 == "donets'k":
        occ = g.intersection(ORDLO_2014_DONETSK)
        gca = g.difference(ORDLO_2014_DONETSK)
        if not occ.is_empty: buckets["ukraine_donbas_occupied_ordlo_dpr_lpr_2014_2021"].append(occ)
        if not gca.is_empty: buckets["ukraine_donbas_government_controlled_2014_2021"].append(gca)
      elif n1 == "luhans'k":
        occ = g.intersection(ORDLO_2014_LUHANSK)
        gca = g.difference(ORDLO_2014_LUHANSK)
        if not occ.is_empty: buckets["ukraine_donbas_occupied_ordlo_dpr_lpr_2014_2021"].append(occ)
        if not gca.is_empty: buckets["ukraine_donbas_government_controlled_2014_2021"].append(gca)
      else:
        buckets["ukraine_black_sea_odesa_mykolaiv_kherson"].append(g)
    else:
      if n1 in ["moscowcity", "moskva"]: buckets["russia_moscow_city_and_oblast_megaregion"].append(g)
      elif n1 in ["cityofst.petersburg", "leningrad", "kaliningrad"]:
        buckets["russia_st_petersburg_leningrad_and_kaliningrad"].append(g)
      elif n1 in ["pskov", "novgorod", "vologda", "karelia"]:
        buckets["russia_northwest_pskov_novgorod_vologda_karelia"].append(g)
      elif n1 in ["murmansk", "arkhangel'sk", "komi", "nenets"]:
        buckets["russia_european_arctic_exodus_murmansk_arkhangelsk_komi_nenets"].append(g)
      elif n1 in ["tver'", "smolensk", "bryansk", "kaluga", "tula", "ryazan'", "yaroslavl'", "kostroma", "ivanovo", "vladimir", "orel"]:
        buckets["russia_central_non_black_earth_shrinkage_ring"].append(g)
      elif n1 in ["belgorod", "voronezh", "kursk", "lipetsk", "tambov"]:
        buckets["russia_central_black_earth_belgorod_voronezh_kursk_lipetsk_tambov"].append(g)
      elif n1 in ["tatarstan", "bashkortostan"]:
        buckets["russia_volga_tatarstan_and_bashkortostan_republics"].append(g)
      elif n1 in ["samara", "nizhegorod", "kirov", "ul'yanovsk", "penza", "chuvash", "mariy-el", "mordovia", "udmurt"]:
        buckets["russia_volga_samara_nizhny_and_finno_ugric_republics"].append(g)
      elif n1 in ["saratov", "volgograd", "astrakhan'", "kalmyk"]:
        buckets["russia_lower_volga_saratov_volgograd_astrakhan_kalmykia"].append(g)
      elif n1 in ["krasnodar", "rostov", "stavropol'", "adygey"]:
        buckets["russia_southern_sunbelt_krasnodar_rostov_stavropol_adygea"].append(g)
      elif n1 in ["chechnya", "ingush"]:
        buckets["russia_chechnya_and_ingushetia_wars_and_rebound"].append(g)
      elif n1 in ["northossetia", "kabardin-balkar", "karachay-cherkess"]:
        buckets["russia_central_caucasus_ossetia_kabardino_karachay"].append(g)
      elif n1 == "dagestan":
        buckets["russia_dagestan_high_fertility_boom"].append(g)
      elif n1 in ["sverdlovsk", "chelyabinsk", "perm'", "orenburg", "kurgan"]:
        buckets["russia_ural_industrial_sverdlovsk_chelyabinsk_perm_orenburg_kurgan"].append(g)
      elif n1 in ["khanty-mansiy", "yamal-nenets"]:
        buckets["russia_yugra_and_yamal_hydrocarbon_arctic"].append(g)
      elif n1 in ["tyumen'", "omsk", "novosibirsk", "tomsk", "altay"]:
        buckets["russia_west_siberia_transsiberian_tyumen_omsk_novosibirsk_tomsk_altai"].append(g)
      elif n1 == "kemerovo":
        buckets["russia_kuzbass_kemerovo_coal_restructuring"].append(g)
      elif n1 in ["gorno-altay", "khakass", "tuva"]:
        buckets["russia_altai_khakassia_and_tuva_republics"].append(g)
      elif n1 == "krasnoyarsk" and (has_any(n2, TAYMYR_TURUKHANSK_RAIONS) or has_any(n2, EVENKIA_YENISEI_NORTH_RAIONS)):
        buckets["russia_norilsk_taymyr_and_evenkia_arctic_shrinkage"].append(g)
      elif n1 in ["krasnoyarsk", "irkutsk"]:
        buckets["russia_krasnoyarsk_and_irkutsk_transsiberian_corridor"].append(g)
      elif n1 in ["buryat", "zabaykal'ye"]:
        buckets["russia_buryatia_and_zabaykalsky_transbaikalia"].append(g)
      elif n1 == "sakha":
        buckets["russia_sakha_yakutia_indigenous_urbanisation"].append(g)
      elif n1 in ["magadan", "chukot", "kamchatka"]:
        buckets["russia_extreme_northeast_exodus_magadan_chukotka_kamchatka"].append(g)
      else:
        buckets["russia_southern_far_east_pacific_primorye_khabarovsk_amur_sakhalin"].append(g)
  return buckets

# ==============================================================================
# RASTERISATION & TOPOLOGICAL CLEANUP (100% EPOCH ENVELOPE COVERAGE, ZERO OVERLAPS)
# ==============================================================================
W, H = 4320, 2160
R_earth = 6371.0088
dlon_rad = 2.0 * math.pi / W
ROW_AREAS = np.array([
  (R_earth ** 2) * dlon_rad * (math.sin(math.radians(90.0 - r * 180.0 / H)) - math.sin(math.radians(90.0 - (r + 1) * 180.0 / H)))
  for r in range(H)
])

def lonlat_to_px (lon, lat):
  return ((lon + 180.0) / 360.0 * W, (90.0 - lat) / 180.0 * H)

def _draw_geom_on_mask (mdraw, geom):
  if geom.is_empty:
    return
  if geom.geom_type == "Polygon":
    ext = [lonlat_to_px(x, y) for x, y in geom.exterior.coords]
    if len(ext) >= 3:
      mdraw.polygon(ext, fill=255)
    for interior in geom.interiors:
      hole = [lonlat_to_px(x, y) for x, y in interior.coords]
      if len(hole) >= 3:
        mdraw.polygon(hole, fill=0)
  elif geom.geom_type in ("MultiPolygon", "GeometryCollection"):
    for part in geom.geoms:
      _draw_geom_on_mask(mdraw, part)

def draw_geom (img, geom, rgba):
  if geom.is_empty:
    return
  poly_mask = Image.new("L", (W, H), 0)
  mdraw = ImageDraw.Draw(poly_mask)
  _draw_geom_on_mask(mdraw, geom)
  img.paste(rgba, mask=poly_mask)

def _extract_polys (geom):
  if geom.is_empty:
    return []
  if geom.geom_type == "Polygon":
    return [geom]
  if geom.geom_type in ("MultiPolygon", "GeometryCollection"):
    out = []
    for p in geom.geoms:
      out.extend(_extract_polys(p))
    return out
  return []

def clean_and_fill_envelope (reg_list, buckets, env_poly):
  reg_geoms = {}
  claimed = Polygon()
  for rk, _ in reg_list:
    glist = buckets.get(rk, [])
    u = unary_union(glist).buffer(0) if glist else Polygon()
    u = u.intersection(env_poly).difference(claimed).buffer(0)
    reg_geoms[rk] = u
    if not u.is_empty:
      claimed = claimed.union(u).buffer(0)

  rem = env_poly.difference(claimed).buffer(0)
  slivers = _extract_polys(rem)
  if slivers:
    non_empty_keys = [rk for rk, _ in reg_list if not reg_geoms[rk].is_empty]
    extra_by_rk = {rk: [] for rk, _ in reg_list}
    for sl in slivers:
      best_rk = None
      best_shared = 0.0
      sl_b = sl.boundary
      for rk in non_empty_keys:
        rg = reg_geoms[rk]
        if rg.envelope.buffer(1.0).intersects(sl.envelope):
          sh_len = rg.boundary.intersection(sl_b).length
          if sh_len > best_shared:
            best_shared = sh_len
            best_rk = rk
      if best_rk is None:
        best_dist = 1e9
        for rk in non_empty_keys:
          d = reg_geoms[rk].distance(sl)
          if d < best_dist:
            best_dist = d
            best_rk = rk
      extra_by_rk[best_rk].append(sl)
    for rk, extras in extra_by_rk.items():
      if extras:
        reg_geoms[rk] = unary_union([reg_geoms[rk]] + extras).buffer(0)
  return reg_geoms

def classify_migration_period ():
  ts_buckets = classify_tsardom()
  ts_geoms = clean_and_fill_envelope(T.TSARDOM_REGIONS, ts_buckets, ENV_TSARDOM)
  mp_grouping = {
    "mp_01_nw_novgorod_pskov_finno_slavic": [
      "muscovy_novgorod_pskov_pyatiny", "muscovy_karelia_ingria_st_petersburg", "muscovy_pomorye_dvina_pechora"
    ],
    "mp_02_upper_dnieper_moskva_oka_balto_finno": [
      "gdl_polotsk_vitebsk_dvina", "gdl_vilna_grodno_novogrudok", "gdl_minsk_orsha_mogilev",
      "gdl_brest_pinsk_turov_polesia", "muscovy_zamoskovny_moscow_core", "muscovy_smolensk_and_seversk",
      "muscovy_oka_ryazan_tula_abatis"
    ],
    "mp_03_volhynia_pripyat_right_bank_prague": [
      "crown_galicia_belz_carpathian_rus", "crown_volhynia_voivodeship",
      "crown_podolia_and_bratslav", "hetmanate_right_bank_kyiv_regiments"
    ],
    "mp_04_left_bank_desna_seim_donets_penkovka": [
      "hetmanate_left_bank_north_chernihiv", "hetmanate_left_bank_south_poltava",
      "sloboda_ukraine_regiments", "muscovy_belgorod_voronezh_razryads"
    ],
    "mp_05_middle_volga_imenkovo_agro_core": [
      "muscovy_kazan_middle_volga_cherta"
    ],
    "mp_06_kama_vyatka_belaya_permian_metallurgy": [
      "muscovy_vyatka_perm_stroganov_urals", "muscovy_bashkir_darugas_and_yaik"
    ],
    "mp_07_pontic_azov_don_lower_volga_steppe": [
      "zaporozhian_sich_and_wild_fields", "crimean_khanate_and_ottoman_kefe",
      "steppe_lower_volga_astrakhan_kalmyks", "steppe_don_cossack_host_and_azov"
    ],
    "mp_08_north_caucasus_alan_khazar_piedmont": [
      "caucasus_circassia_kabarda_vainakh_dagestan"
    ],
    "mp_09_west_siberia_tobol_irtysh_ob_taiga": [
      "siberia_pomor_mangazeya_arctic_route", "siberia_tobolsk_irtysh_ob_water_highway",
      "siberia_southern_tara_tomsk_kuznetsk_line"
    ],
    "mp_10_altai_minusinsk_tuva_baikal_corridor": [
      "siberia_nomadic_baraba_altai_sayan_steppe", "siberia_yeniseysk_angara_ilimsk_portage",
      "siberia_transbaikal_dauria_nerchinsk"
    ],
    "mp_11_amur_primorye_far_east_arctic": [
      "siberia_lena_yakutsk_alaas_core", "siberia_arctic_kolyma_okhotsk_kamchatka"
    ]
  }
  buckets = {k: [] for k, _ in T.MIGRATION_REGIONS}
  for mp_id, sub_ids in mp_grouping.items():
    for sid in sub_ids:
      if sid in ts_geoms and not ts_geoms[sid].is_empty:
        buckets[mp_id].append(ts_geoms[sid].intersection(ENV_MIGRATION).buffer(0))
  return buckets

EPOCHS_SPEC = [
  ("migration_period", "Migration Period Demography and Settlement Across Belarus, Ukraine, and Russia (1000BC - 1000AD)", [100, 1900], ENV_MIGRATION, T.MIGRATION_REGIONS, classify_migration_period, T.MIGRATION_YEARS, T.MIGRATION_POPS_K, 0.18),
  ("tsardom_of_russia", "Demographic and Settlement History of the Tsardom of Russia, Livonia, Lithuanian-Polish Rus, and Siberian Colonisation (1400AD - 1721AD)", [1400, 1721], ENV_TSARDOM, T.TSARDOM_REGIONS, classify_tsardom, T.TSARDOM_YEARS, T.TSARDOM_POPS_K, 0.08),
  ("imperial_russia_pre_1815", "Demographic and Settlement History of Early Imperial Russia: Tax Censuses, Baltic Provinces, Polish-Lithuanian Partitions, Novorossiya, Finland & Bessarabia (1721AD - 1815AD)", [1721, 1815], ENV_PRE1815, T.IMPERIAL_PRE1815_REGIONS, classify_imperial_pre1815, T.IMPERIAL_PRE1815_YEARS, T.IMPERIAL_PRE1815_POPS_K, 0.06),
  ("imperial_russia_post_1815", "Demographic and Settlement History of Late Imperial Russia: Congress Poland, Baltic & Finnish Governorates, the Pale of Settlement, 1897 Census & Siberian Colonisation (1815AD - 1917AD)", [1815, 1917], ENV_POST1815, T.IMPERIAL_POST1815_REGIONS, classify_imperial_post1815, T.IMPERIAL_POST1815_YEARS, T.IMPERIAL_POST1815_POPS_K, 0.05),
  ("russian_civil_war", "Demographic and Settlement History of the Russian Civil War Across Pre-War Tsarist Governorates & Oblasts: Secession, Fronts, Famine of 1921-1922 & NEP Recovery (1917AD - 1926AD)", [1917, 1926], ENV_POST1815, T.CIVIL_WAR_REGIONS, classify_imperial_post1815, T.CIVIL_WAR_YEARS, T.CIVIL_WAR_POPS_K, 0.05),
  ("soviet_lenin_stalin", "Demographic and Settlement History of the Early and Stalinist USSR: Collectivisation, Holodomor, Baltic & Moldavian Annexations, Gulag, Deportations & WWII (1926AD - 1953AD)", [1926, 1953], ENV_SOVIET, T.STALIN_REGIONS, classify_stalin, T.STALIN_YEARS, T.STALIN_POPS_K, 0.05),
  ("soviet_post_stalin", "Demographic and Settlement History of the Post-Stalin Soviet Union: Baltic & Moldavian SSRs, Restored ASSRs, Nechernozemye, Yugra/Yamal Oil-Gas, BAM & Chernobyl (1953AD - 1991AD)", [1953, 1991], ENV_SOVIET, T.POST_STALIN_REGIONS, classify_post_stalin, T.POST_STALIN_YEARS, T.POST_STALIN_POPS_K, 0.03),
  ("post_soviet_space", "Demographic and Settlement History of the Post-Soviet Space: Mortality Crisis, Chechen Wars, Arctic Exodus, Crimea & Donbas (1991AD - 2021AD)", [1991, 2021], ENV_POST_SOVIET, T.POST_SOVIET_REGIONS, classify_post_soviet, T.POST_SOVIET_YEARS, T.POST_SOVIET_POPS_K, 0.03)
]

only_eps = set(sys.argv[1:])
cached_post1815_geoms = None

for ep_id, ep_title, dom, env_poly, reg_list, classify_fn, yrs, pops_k, err_frac in EPOCHS_SPEC:
  if only_eps and ep_id not in only_eps:
    continue
  print(f"\n=== Building {ep_id} ({len(reg_list)} period-authentic regions) ===")
  if classify_fn is classify_imperial_post1815 and cached_post1815_geoms is not None:
    reg_geoms = cached_post1815_geoms
  else:
    buckets = classify_fn()
    reg_geoms = clean_and_fill_envelope(reg_list, buckets, env_poly)
    if classify_fn is classify_imperial_post1815:
      cached_post1815_geoms = reg_geoms

  img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
  dissolved_features = []
  reg_colors = {}
  mp_palette = [
    [107, 174, 214], [116, 196, 118], [161, 217, 155], [65, 171, 93],
    [253, 141, 60], [158, 154, 200], [251, 106, 74], [217, 95, 14],
    [253, 174, 107], [188, 189, 34], [189, 189, 189]
  ]
  for idx, (rk, rname) in enumerate(reg_list):
    rgb = mp_palette[idx] if ep_id == "migration_period" else T.PALETTE_52[idx]
    reg_colors[rk] = rgb
    u = reg_geoms[rk]
    draw_geom(img, u, (rgb[0], rgb[1], rgb[2], 255))
    dissolved_features.append({
      "type": "Feature",
      "properties": {"id": rk, "name": rname, "colour": rgb},
      "geometry": mapping(u)
    })

  poly_path = CACHE_DIR / f"{ep_id}_polygons.geojson"
  poly_path.write_text(json.dumps({"type": "FeatureCollection", "features": dissolved_features}), encoding="utf-8")

  ep_folder = EPOCH_FOLDERS.get(ep_id, ep_id)
  ep_dir = BASE_DIR / ep_folder
  mask_path = ep_dir / f"{ep_id}_areal_mask.png"
  img.save(str(mask_path))

  arr = np.array(img)
  regions_json5 = {}
  summary_rows = []
  tot_px = 0
  tot_area = 0
  empty_regs = []
  for idx, (rk, rname) in enumerate(reg_list):
    rgb = reg_colors[rk]
    m = (arr[:, :, 0] == rgb[0]) & (arr[:, :, 1] == rgb[1]) & (arr[:, :, 2] == rgb[2]) & (arr[:, :, 3] > 0)
    ys, xs = np.where(m)
    px_cnt = int(len(xs))
    if px_cnt == 0:
      empty_regs.append(rk)
    area_km2 = int(round(float(np.sum(ROW_AREAS[ys])))) if px_cnt > 0 else 0
    if px_cnt > 0:
      min_lat = round(90.0 - (int(np.max(ys)) + 1) * 180.0 / H, 2)
      max_lat = round(90.0 - int(np.min(ys)) * 180.0 / H, 2)
      min_lon = round(-180.0 + int(np.min(xs)) * 360.0 / W, 2)
      max_lon = round(-180.0 + (int(np.max(xs)) + 1) * 360.0 / W, 2)
    else:
      min_lat = max_lat = min_lon = max_lon = 0.0

    tot_px += px_cnt
    tot_area += area_km2

    p_vec = pops_k[rk]
    bench_map = {str(y): int(round(v * 1000)) for y, v in zip(yrs, p_vec)}
    bounds_map = {
      str(y): [int(round(v * 1000 * (1.0 - err_frac))), int(round(v * 1000 * (1.0 + err_frac)))]
      for y, v in zip(yrs, p_vec)
    }
    regions_json5[rk] = {
      "name": rname,
      "colour": rgb,
      "pixel_count": px_cnt,
      "area_km2": area_km2,
      "bbox": {"min_lat": min_lat, "max_lat": max_lat, "min_lon": min_lon, "max_lon": max_lon},
      "benchmark_anchors": bench_map,
      "population": bench_map,
      "population_bounds": bounds_map
    }
    summary_rows.append({
      "id": rk,
      "name": rname,
      "colour": rgb,
      "pixel_count": px_cnt,
      "area_km2": area_km2,
      "population_k": {str(y): v for y, v in zip(yrs, p_vec)}
    })

  if empty_regs:
    print(f"  WARNING: Empty regions in {ep_id}: {empty_regs}")

  doc = {
    "id": ep_id,
    "title": ep_title,
    "source_review": f"histmap/1.data_raw/population_regional/POLARIS/1.entire_country/{ep_folder}/{ep_id}_literature_review.md",
    "settlements_gazetteer": f"histmap/1.data_raw/population_regional/POLARIS/1.entire_country/{ep_folder}/{ep_id}_settlements.json",
    "mask_file": f"{ep_id}_areal_mask.png",
    "domain": dom,
    "grid_dimensions": [W, H],
    "total_pixels": tot_px,
    "total_area_km2": tot_area,
    "regions": regions_json5
  }
  (ep_dir / f"{ep_id}.json5").write_text(json.dumps(doc, indent=2, ensure_ascii=False), encoding="utf-8")

  tot_by_yr = {str(y): sum(pops_k[rk][i] for rk, _ in reg_list) for i, y in enumerate(yrs)}
  (CACHE_DIR / f"{ep_id}_summary.json").write_text(
    json.dumps({
      "id": ep_id,
      "title": ep_title,
      "region_count": len(reg_list),
      "years": yrs,
      "total_pixels": tot_px,
      "total_area_km2": tot_area,
      "totals_k_by_year": tot_by_yr,
      "regions": summary_rows
    }, indent=2, ensure_ascii=False),
    encoding="utf-8"
  )
  print(f"  Saved {ep_id}_areal_mask.png & {ep_id}.json5 | px={tot_px:,} | area={tot_area:,} km2 | empty={len(empty_regs)}")

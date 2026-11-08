---
title: "SETTLEMENT GAZETTEER OF DAGESTAN."
subtitle: "Supplementary Tabular Compilation of Settlement Population Histories (10000BC - 1900AD)."
date: "7 November 2026"
authors_line: "Aust Kätzchen"
emails:
  - austkaeztchen@confoederatio.org
hero_figure: "figures/dagestan_map_zones_settlements.png"
hero_caption: "Elevation zones, river basins, and settlements of Dagestan included in the settlement gazetteer (10000BC - 1900AD)."
hero_label: "fig:hero"
bibliography: dagestan_literature_review.bib
csl: crd-mla-numeric.csl
link-citations: true
output:
  pdf_document:
    template: template.tex
    latex_engine: xelatex
    keep_tex: false
---





# Introduction

This supplementary report presents the settlement population gazetteer (`dagestan_settlements.json`) accompanying the regional literature review of Dagestan (10000BC - 1900AD). The JSON file follows the standard `population_Stadester` format, indexing 126 settlements across the Republic of Dagestan by `<Name>-Russia` with alternate and Cyrillic names (`other_names`), decimal coordinates (`coords`), and chronological population estimates (`population`) for inhabited benchmark years.

Prehistoric, Bronze Age, and Classical estimates are derived from excavated settlement areas and dwelling counts [@amirkhanov1987chokh; @gadzhiev1991early; @gadzhiev1997velikent; @abakarov1993atlas; @kudryavtsev1982derbent; @magomedov1983khazar]. Medieval and early modern figures draw on epigraphic chronicles, *Posolskiy Prikaz* embassies, and *jamaat* household lists [@minorsky1958bab; @umakhanov1973mutual; @aliev1975feudal; @aglarov1988jamaat; @aliev1999], while 19th-century and 1897 figures come from the 1886 family lists (*posemeynye spiski*) and the First All-Russian Imperial Census [@kozubsky1895; @kozubsky1901; @troynitskiy1905dagestan; @kabuzan1996].

# Master Settlement Directory

Table: Master directory of all settlements in dagestan_settlements.json (10000BC - 1900AD).

|                             |Settlement            |Historical / Native Names           |Coords         |Documented Span |Peak Population |1897AD |1900AD |
|:----------------------------|:---------------------|:-----------------------------------|:--------------|:---------------|:---------------|:------|:------|
|Chokh-Russia                 |Chokh                 |Чох, Чохская стоянка                |42,32N, 47,03E |8000BC - 1900AD |2,7k (1900AD)   |2,6k   |2,7k   |
|Rugudja-Russia               |Rugudja               |Ругуджа                             |42,27N, 46,97E |6000BC - 1900AD |1,9k (1900AD)   |1,8k   |1,9k   |
|Mekegi-Russia                |Mekegi                |Мекеги                              |42,36N, 47,53E |6000BC - 1900AD |2,6k (1900AD)   |2,5k   |2,6k   |
|Ginchi-Russia                |Ginchi                |Гинчи                               |42,38N, 46,58E |4000BC - 2000BC |350 (2000BC)    |-      |-      |
|Chinna-Russia                |Chinna                |Чинна                               |42,36N, 47,21E |4000BC - 3000BC |240 (3000BC)    |-      |-      |
|Gapshima-Russia              |Gapshima              |Гапшима                             |42,19N, 47,42E |4000BC - 1900AD |1,7k (1900AD)   |1,6k   |1,7k   |
|Velikent-Russia              |Velikent              |Великент                            |42,20N, 48,04E |3500BC - 1900AD |1,4k (2500BC)   |1,3k   |1,3k   |
|Kabaz-Kutan-Russia           |Kabaz-Kutan           |Кабаз-Кутан                         |41,92N, 48,27E |3000BC - 2000BC |550 (2500BC)    |-      |-      |
|Torpakh-Kala-Russia          |Torpakh-Kala          |Торпах-Кала                         |41,88N, 48,37E |3000BC - 600AD  |2,5k (600AD)    |-      |-      |
|Gemetyube-Russia             |Gemetyube             |Гемитюбе                            |43,43N, 46,88E |3000BC - 2000BC |480 (2000BC)    |-      |-      |
|Kayakent-Russia              |Kayakent              |Каякент, Каякентское городище       |42,38N, 47,98E |2000BC - 1900AD |2,2k (1900AD)   |2,2k   |2,2k   |
|Mamai-Kutan-Russia           |Mamai-Kutan           |Мамай-Кутан                         |42,27N, 48,05E |2500BC - 1000BC |600 (1000BC)    |-      |-      |
|Utamysh-Russia               |Utamysh               |Утамыш                              |42,35N, 47,88E |2000BC - 1900AD |2,8k (1700AD)   |2,0k   |2,0k   |
|Khorochoi-Russia             |Khorochoi             |Хорочой                             |42,73N, 46,15E |1500BC - 1900AD |920 (1900AD)    |890    |920    |
|Gagatli-Russia               |Gagatli               |Гагатли                             |42,72N, 46,23E |1500BC - 1900AD |1,8k (1900AD)   |1,8k   |1,8k   |
|Irganay-Russia               |Irganay               |Ирганай                             |42,62N, 46,90E |2500BC - 1900AD |1,6k (1900AD)   |1,6k   |1,6k   |
|Mogokh-Russia                |Mogokh                |Могох                               |42,55N, 46,75E |2000BC - 1900AD |970 (1900AD)    |940    |970    |
|Chirkey-Russia               |Chirkey               |Чиркей                              |42,97N, 46,93E |2000BC - 1900AD |3,5k (1900AD)   |3,4k   |3,5k   |
|Miatli-Russia                |Miatli                |Миатли                              |43,05N, 46,85E |2500BC - 1900AD |1,0k (1900AD)   |980    |1,0k   |
|Sharoy-Pass-Russia           |Sharoy-Pass           |Шаройский перевал, Кунзах           |42,53N, 46,18E |1500BC - 500BC  |500 (500BC)     |-      |-      |
|Derbent-Russia               |Derbent               |Дербент, Bab al-Abwab, Chorene      |42,06N, 48,29E |500BC - 1900AD  |42,0k (1000AD)  |14,6k  |15,2k  |
|Palasa-Syrt-Russia           |Palasa-Syrt           |Паласа-Сырт                         |41,90N, 48,35E |300AD - 600AD   |3,8k (400AD)    |-      |-      |
|Urtseki-Russia               |Urtseki               |Урцеки, Варачан, Varachan           |42,63N, 47,62E |500BC - 800AD   |8,5k (700AD)    |-      |-      |
|Tarki-Russia                 |Tarki                 |Тарки, Семендер, Samandar           |42,95N, 47,49E |1AD - 1900AD    |18,0k (700AD)   |2,4k   |2,4k   |
|Verkhniy Chir-Yurt-Russia    |Verkhniy Chir-Yurt    |Верхний Чирюрт, Беленджер, Balanjar |43,17N, 46,88E |400AD - 1900AD  |22,0k (700AD)   |1,6k   |1,7k   |
|Nizhniy Chir-Yurt-Russia     |Nizhniy Chir-Yurt     |Нижний Чирюрт, Чир-Юрт              |43,18N, 46,90E |600AD - 1900AD  |2,5k (1900AD)   |2,4k   |2,5k   |
|Andreyaul-Russia             |Andreyaul             |Андрейаул, Эндирей, Алкас, Балх     |43,21N, 46,66E |1AD - 1900AD    |9,0k (1700AD)   |4,1k   |4,2k   |
|Kostek-Russia                |Kostek                |Костек                              |43,34N, 46,75E |1650AD - 1900AD |3,5k (1900AD)   |3,4k   |3,5k   |
|Aksay-Russia                 |Aksay                 |Аксай, Яхсай                        |43,33N, 46,45E |1650AD - 1900AD |5,8k (1900AD)   |5,6k   |5,8k   |
|Terekli-Mekteb-Russia        |Terekli-Mekteb        |Терекли-Мектеб                      |44,17N, 45,87E |1600AD - 1900AD |1,6k (1800AD)   |1,4k   |1,5k   |
|Karabudakhkent-Russia        |Karabudakhkent        |Карабудахкент                       |42,71N, 47,56E |1AD - 1900AD    |4,6k (1900AD)   |4,5k   |4,6k   |
|Gubden-Russia                |Gubden                |Губден                              |42,57N, 47,56E |600AD - 1900AD  |5,5k (1900AD)   |5,4k   |5,5k   |
|Dzhalgan-Russia              |Dzhalgan              |Джалган                             |42,02N, 48,24E |600AD - 1900AD  |1,1k (800AD)    |820    |850    |
|Mitagi-Russia                |Mitagi                |Митаги                              |42,01N, 48,15E |600AD - 1900AD  |1,0k (800AD)    |780    |810    |
|Kemakh-Russia                |Kemakh                |Кемах                               |42,04N, 48,19E |600AD - 1900AD  |950 (800AD)     |640    |660    |
|Gedzhukh-Russia              |Gedzhukh              |Геджух                              |42,12N, 48,08E |600AD - 1900AD  |1,2k (800AD)    |960    |990    |
|Bilgadzhik-Russia            |Bilgadzhik            |Билгаджик, Белиджи                  |41,89N, 48,40E |600AD - 1900AD  |1,4k (800AD)    |1,1k   |1,2k   |
|Kumukh-Russia                |Kumukh                |Кумух, Гази-Кумух, Гъази-Гъумук     |42,17N, 47,12E |600AD - 1900AD  |5,5k (1200AD)   |2,4k   |2,4k   |
|Kala-Koreish-Russia          |Kala-Koreish          |Кала-Корейш, Зирихгеран             |42,09N, 47,62E |600AD - 1900AD  |3,8k (1200AD)   |210    |200    |
|Kubachi-Russia               |Kubachi               |Кубачи, Угбуг, Зирихгеран           |42,09N, 47,60E |800AD - 1900AD  |3,5k (1700AD)   |2,3k   |2,4k   |
|Urkarakh-Russia              |Urkarakh              |Уркарах                             |42,16N, 47,63E |800AD - 1900AD  |2,8k (1800AD)   |2,3k   |2,4k   |
|Madzhalis-Russia             |Madzhalis             |Маджалис                            |42,12N, 47,83E |1600AD - 1900AD |3,2k (1700AD)   |2,1k   |2,2k   |
|Bashly-Russia                |Bashly                |Башлы, Баршлы, Башлыкент            |42,30N, 47,82E |600AD - 1900AD  |6,5k (1700AD)   |2,8k   |2,9k   |
|Yangikent-Russia             |Yangikent             |Янгикент                            |42,22N, 47,85E |1600AD - 1900AD |1,9k (1700AD)   |1,5k   |1,5k   |
|Dzhavgat-Russia              |Dzhavgat              |Джавгат                             |42,18N, 47,80E |1200AD - 1900AD |1,6k (1700AD)   |1,3k   |1,4k   |
|Akusha-Russia                |Akusha                |Акуша                               |42,27N, 47,34E |800AD - 1900AD  |4,8k (1800AD)   |3,4k   |3,5k   |
|Tsudakhar-Russia             |Tsudakhar             |Цудахар                             |42,33N, 47,16E |1000AD - 1900AD |3,1k (1800AD)   |2,5k   |2,5k   |
|Usisha-Russia                |Usisha                |Усиша                               |42,27N, 47,42E |1000AD - 1900AD |2,5k (1800AD)   |2,2k   |2,3k   |
|Mugi-Russia                  |Mugi                  |Муги                                |42,29N, 47,39E |1200AD - 1900AD |2,0k (1900AD)   |2,0k   |2,0k   |
|Levashi-Russia               |Levashi               |Леваши                              |42,43N, 47,33E |1400AD - 1900AD |2,4k (1900AD)   |2,3k   |2,4k   |
|Khunzakh-Russia              |Khunzakh              |Хунзах, Humraj, Серир               |42,55N, 46,70E |500BC - 1900AD  |6,0k (1200AD)   |3,2k   |3,4k   |
|Gotsatl-Russia               |Gotsatl               |Гоцатль                             |42,52N, 46,82E |1200AD - 1900AD |1,9k (1800AD)   |1,8k   |1,8k   |
|Untsukul-Russia              |Untsukul              |Унцукуль                            |42,71N, 46,79E |1200AD - 1900AD |2,8k (1900AD)   |2,7k   |2,8k   |
|Gimry-Russia                 |Gimry                 |Гимры, Генуб                        |42,75N, 46,84E |1500BC - 1900AD |1,6k (1800AD)   |1,4k   |1,4k   |
|Chirkata-Russia              |Chirkata              |Чирката                             |42,77N, 46,72E |1200AD - 1900AD |1,8k (1800AD)   |1,7k   |1,7k   |
|Ashilta-Russia               |Ashilta               |Ашильта                             |42,74N, 46,74E |1200AD - 1900AD |1,4k (1800AD)   |1,1k   |1,2k   |
|Igali-Russia                 |Igali                 |Игали                               |42,65N, 46,66E |1200AD - 1900AD |1,6k (1800AD)   |1,5k   |1,6k   |
|Sogratl-Russia               |Sogratl               |Согратль                            |42,27N, 47,02E |800AD - 1900AD  |3,1k (1800AD)   |2,2k   |2,2k   |
|Koroda-Russia                |Koroda                |Корода                              |42,44N, 46,85E |1000AD - 1900AD |1,4k (1800AD)   |1,3k   |1,3k   |
|Goor-Russia                  |Goor                  |Гоор                                |42,43N, 46,58E |1000AD - 1900AD |1,3k (1700AD)   |920    |950    |
|Kahib-Russia                 |Kahib                 |Кахиб, Бакдаб                       |42,44N, 46,59E |800AD - 1900AD  |1,4k (1700AD)   |980    |1,0k   |
|Ratlub-Russia                |Ratlub                |Ратлуб                              |42,39N, 46,47E |1200AD - 1900AD |1,0k (1800AD)   |890    |920    |
|Tindi-Russia                 |Tindi                 |Тинди                               |42,43N, 46,13E |2000BC - 1900AD |1,8k (1800AD)   |1,7k   |1,7k   |
|Kvanada-Russia               |Kvanada               |Кванада                             |42,54N, 46,16E |1200AD - 1900AD |1,2k (1800AD)   |1,2k   |1,2k   |
|Agvali-Russia                |Agvali                |Агвали                              |42,54N, 46,12E |1200AD - 1900AD |1,3k (1900AD)   |1,2k   |1,3k   |
|Botlikh-Russia               |Botlikh               |Ботлих                              |42,67N, 46,22E |800AD - 1900AD  |2,2k (1800AD)   |2,1k   |2,2k   |
|Andi-Russia                  |Andi                  |Анди                                |42,77N, 46,24E |800AD - 1900AD  |2,4k (1800AD)   |2,0k   |2,1k   |
|Godoberi-Russia              |Godoberi              |Годобери                            |42,65N, 46,15E |1200AD - 1900AD |1,2k (1900AD)   |1,1k   |1,2k   |
|Karata-Russia                |Karata                |Карата                              |42,59N, 46,34E |1000AD - 1900AD |1,8k (1800AD)   |1,6k   |1,7k   |
|Akhvakh-Russia               |Akhvakh               |Ахвах, Тад-Магитль                  |42,54N, 46,38E |1200AD - 1900AD |1,4k (1800AD)   |1,3k   |1,4k   |
|Kidero-Russia                |Kidero                |Кидеро, Дидо                        |42,19N, 45,96E |1200AD - 1900AD |950 (1800AD)    |880    |910    |
|Bezhta-Russia                |Bezhta                |Бежта, Капуча                       |42,13N, 46,12E |1000AD - 1900AD |1,9k (1800AD)   |1,8k   |1,9k   |
|Gunzib-Russia                |Gunzib                |Гунзиб                              |42,12N, 46,18E |1200AD - 1900AD |850 (1800AD)    |790    |810    |
|Khvarshi-Russia              |Khvarshi              |Хварши                              |42,35N, 46,09E |1200AD - 1900AD |900 (1800AD)    |840    |870    |
|Archi-Russia                 |Archi                 |Арчиб                               |42,02N, 46,87E |1000AD - 1900AD |1,0k (1800AD)   |910    |940    |
|Vitskhi-Russia               |Vitskhi               |Вицхи                               |42,27N, 47,12E |1200AD - 1900AD |1,1k (1800AD)   |980    |1,0k   |
|Kuli-Russia                  |Kuli                  |Кули                                |42,02N, 47,24E |1000AD - 1900AD |1,9k (1900AD)   |1,9k   |1,9k   |
|Khosrekh-Russia              |Khosrekh              |Хосрех                              |41,99N, 47,27E |1200AD - 1900AD |1,6k (1900AD)   |1,6k   |1,6k   |
|Khuchni-Russia               |Khuchni               |Хучни                               |41,95N, 47,95E |600AD - 1900AD  |1,8k (1700AD)   |1,1k   |1,2k   |
|Tinit-Russia                 |Tinit                 |Тинит                               |41,88N, 48,03E |1200AD - 1900AD |1,2k (1800AD)   |1,2k   |1,2k   |
|Arkit-Russia                 |Arkit                 |Аркит                               |41,92N, 47,98E |1200AD - 1900AD |1,0k (1800AD)   |960    |990    |
|Akhty-Russia                 |Akhty                 |Ахты                                |41,46N, 47,74E |600AD - 1900AD  |6,1k (1900AD)   |5,9k   |6,1k   |
|Rutul-Russia                 |Rutul                 |Рутул                               |41,54N, 47,42E |800AD - 1900AD  |2,8k (1800AD)   |2,3k   |2,4k   |
|Tsakhur-Russia               |Tsakhur               |Цахур                               |41,65N, 47,15E |800AD - 1900AD  |2,2k (1200AD)   |1,2k   |1,2k   |
|Shinaz-Russia                |Shinaz                |Шиназ                               |41,57N, 47,36E |1000AD - 1900AD |1,9k (1800AD)   |1,7k   |1,7k   |
|Luchek-Russia                |Luchek                |Лучек                               |41,59N, 47,30E |1200AD - 1900AD |1,3k (1800AD)   |1,1k   |1,2k   |
|Ikhrek-Russia                |Ikhrek                |Ихрек                               |41,65N, 47,27E |1200AD - 1900AD |1,6k (1800AD)   |1,5k   |1,5k   |
|Mikrakh-Russia               |Mikrakh               |Микрах                              |41,37N, 47,85E |1000AD - 1900AD |1,8k (1800AD)   |1,7k   |1,8k   |
|Kurakh-Russia                |Kurakh                |Курах                               |41,59N, 47,78E |800AD - 1900AD  |2,6k (1800AD)   |2,1k   |2,2k   |
|Richa-Russia                 |Richa                 |Рича, Bab al-Lan                    |41,79N, 47,58E |800AD - 1900AD  |1,8k (1200AD)   |980    |1,0k   |
|Chirag-Russia                |Chirag                |Чираг                               |41,82N, 47,43E |1000AD - 1900AD |1,4k (1700AD)   |1,1k   |1,1k   |
|Tpug-Russia                  |Tpug                  |Тпиг                                |41,77N, 47,58E |1200AD - 1900AD |1,2k (1800AD)   |1,2k   |1,2k   |
|Kasumkent-Russia             |Kasumkent             |Касумкент                           |41,66N, 48,14E |1600AD - 1900AD |2,0k (1900AD)   |1,9k   |2,0k   |
|Khiv-Russia                  |Khiv                  |Хив                                 |41,76N, 47,93E |1200AD - 1900AD |1,5k (1900AD)   |1,5k   |1,5k   |
|Usukhchay-Russia             |Usukhchay             |Усухчай                             |41,42N, 47,91E |1400AD - 1900AD |1,2k (1900AD)   |1,2k   |1,2k   |
|Karakyure-Russia             |Karakyure             |Каракюре                            |41,40N, 47,96E |1000AD - 1900AD |1,8k (1800AD)   |1,8k   |1,8k   |
|Khnov-Russia                 |Khnov                 |Хнов                                |41,39N, 47,46E |1200AD - 1900AD |1,8k (1800AD)   |1,7k   |1,7k   |
|Borch-Russia                 |Borch                 |Борч                                |41,44N, 47,34E |1200AD - 1900AD |1,6k (1800AD)   |1,5k   |1,6k   |
|Terki-Russia                 |Terki                 |Терки, Терский город, Тюмень        |43,75N, 47,08E |1550AD - 1720AD |8,0k (1700AD)   |-      |-      |
|Kizlyar-Russia               |Kizlyar               |Кизляр, Кизлярская крепость         |43,85N, 46,71E |1650AD - 1900AD |9,5k (1800AD)   |7,3k   |7,5k   |
|Khasavyurt-Russia            |Khasavyurt            |Хасавюрт, Ярыксув                   |43,25N, 46,58E |1850AD - 1900AD |5,6k (1900AD)   |5,3k   |5,6k   |
|Temir-Khan-Shura-Russia      |Temir-Khan-Shura      |Темир-Хан-Шура, Буйнакск            |42,82N, 47,12E |1600AD - 1900AD |9,6k (1900AD)   |9,2k   |9,6k   |
|Petrovsk-Port-Russia         |Petrovsk-Port         |Петровск-Порт, Махачкала, Анжи-Кала |42,98N, 47,50E |600AD - 1900AD  |10,5k (1900AD)  |9,8k   |10,5k  |
|Deshlagar-Russia             |Deshlagar             |Дешлагар, Сергокала                 |42,46N, 47,66E |1850AD - 1900AD |1,9k (1900AD)   |1,8k   |1,9k   |
|Nizhneye Kazanishche-Russia  |Nizhneye Kazanishche  |Нижнее Казанище                     |42,77N, 47,17E |1400AD - 1900AD |4,8k (1900AD)   |4,7k   |4,8k   |
|Verkhneye Kazanishche-Russia |Verkhneye Kazanishche |Верхнее Казанище                    |42,75N, 47,19E |1600AD - 1900AD |2,7k (1900AD)   |2,6k   |2,7k   |
|Kakashura-Russia             |Kakashura             |Какашура                            |42,67N, 47,38E |1600AD - 1900AD |2,7k (1900AD)   |2,6k   |2,7k   |
|Dorgeli-Russia               |Dorgeli               |Доргели                             |42,63N, 47,42E |1600AD - 1900AD |2,5k (1900AD)   |2,4k   |2,5k   |
|Erpeli-Russia                |Erpeli                |Эрпели                              |42,80N, 47,01E |1600AD - 1900AD |2,6k (1900AD)   |2,5k   |2,6k   |
|Karanay-Russia               |Karanay               |Каранай                             |42,83N, 46,94E |1600AD - 1900AD |2,1k (1900AD)   |2,1k   |2,1k   |
|Kumtorkala-Russia            |Kumtorkala            |Кумторкала, Коркмаскала             |43,03N, 47,33E |1600AD - 1900AD |2,3k (1900AD)   |2,2k   |2,3k   |
|Kyakhulay-Russia             |Kyakhulay             |Кяхулай                             |42,96N, 47,49E |1700AD - 1900AD |1,4k (1900AD)   |1,3k   |1,4k   |
|Alburikent-Russia            |Alburikent            |Альбурикент                         |42,97N, 47,47E |1700AD - 1900AD |1,2k (1900AD)   |1,2k   |1,2k   |
|Babayurt-Russia              |Babayurt              |Бабаюрт                             |43,60N, 46,78E |1800AD - 1900AD |1,8k (1900AD)   |1,7k   |1,8k   |
|Tarumovka-Russia             |Tarumovka             |Тарумовка                           |44,08N, 46,52E |1800AD - 1900AD |2,2k (1900AD)   |2,1k   |2,2k   |
|Aleksandriyskaya-Russia      |Aleksandriyskaya      |Александрийская                     |43,92N, 46,83E |1750AD - 1900AD |2,2k (1900AD)   |2,1k   |2,2k   |
|Borozdinskaya-Russia         |Borozdinskaya         |Бороздинская                        |43,80N, 46,58E |1750AD - 1900AD |2,4k (1900AD)   |2,3k   |2,4k   |
|Kargalinskaya-Russia         |Kargalinskaya         |Каргалинская                        |43,77N, 46,48E |1750AD - 1900AD |2,9k (1900AD)   |2,8k   |2,9k   |
|Dubovskaya-Russia            |Dubovskaya            |Дубовская                           |43,75N, 46,42E |1750AD - 1900AD |2,3k (1900AD)   |2,2k   |2,3k   |
|Kazi-Yurt-Russia             |Kazi-Yurt             |Кази-Юрт                            |43,47N, 46,78E |1750AD - 1900AD |1,6k (1900AD)   |1,6k   |1,6k   |
|Bavtugay-Russia              |Bavtugay              |Бавтугай                            |43,19N, 46,86E |1600AD - 1900AD |1,7k (1900AD)   |1,6k   |1,7k   |
|Zubutli-Russia               |Zubutli               |Зубутли                             |43,12N, 46,83E |1600AD - 1900AD |1,5k (1900AD)   |1,5k   |1,5k   |
|Kadar-Russia                 |Kadar                 |Кадар                               |42,68N, 47,28E |1600AD - 1900AD |2,2k (1900AD)   |2,1k   |2,2k   |
|Gurbuki-Russia               |Gurbuki               |Гурбуки                             |42,52N, 47,62E |1600AD - 1900AD |2,0k (1900AD)   |1,9k   |2,0k   |
|Murego-Russia                |Murego                |Мурего                              |42,39N, 47,69E |1200AD - 1900AD |1,9k (1900AD)   |1,9k   |1,9k   |
|Myurego-Kaytag-Russia        |Myurego-Kaytag        |Усемикент                           |42,33N, 47,90E |1600AD - 1900AD |1,7k (1900AD)   |1,6k   |1,7k   |

# Prehistoric, Bronze Age, and Classical Settlements (8000BC - 400AD)

Table: Prehistoric, Bronze Age, Iron Age, and Classical settlement populations in Dagestan (8000BC - 400AD).

|                          |Settlement         |Coords         |8000/6000BC |4000/3500BC |3000-2000BC |1500/1000BC |500BC / 1AD |300/400AD |
|:-------------------------|:------------------|:--------------|:-----------|:-----------|:-----------|:-----------|:-----------|:---------|
|Chokh-Russia              |Chokh              |42,32N, 47,03E |45          |250         |400         |600         |-           |-         |
|Rugudja-Russia            |Rugudja            |42,27N, 46,97E |90          |180         |320         |-           |-           |-         |
|Mekegi-Russia             |Mekegi             |42,36N, 47,53E |80          |200         |350         |-           |-           |-         |
|Ginchi-Russia             |Ginchi             |42,38N, 46,58E |-           |210         |280         |-           |-           |-         |
|Chinna-Russia             |Chinna             |42,36N, 47,21E |-           |150         |240         |-           |-           |-         |
|Gapshima-Russia           |Gapshima           |42,19N, 47,42E |-           |160         |290         |-           |-           |-         |
|Velikent-Russia           |Velikent           |42,20N, 48,04E |-           |750         |1,2k        |-           |-           |-         |
|Kabaz-Kutan-Russia        |Kabaz-Kutan        |41,92N, 48,27E |-           |-           |420         |-           |-           |-         |
|Torpakh-Kala-Russia       |Torpakh-Kala       |41,88N, 48,37E |-           |-           |500         |-           |-           |1,8k      |
|Gemetyube-Russia          |Gemetyube          |43,43N, 46,88E |-           |-           |320         |-           |-           |-         |
|Kayakent-Russia           |Kayakent           |42,38N, 47,98E |-           |-           |550         |950         |-           |-         |
|Mamai-Kutan-Russia        |Mamai-Kutan        |42,27N, 48,05E |-           |-           |380         |520         |-           |-         |
|Utamysh-Russia            |Utamysh            |42,35N, 47,88E |-           |-           |450         |700         |-           |-         |
|Khorochoi-Russia          |Khorochoi          |42,73N, 46,15E |-           |-           |-           |350         |-           |-         |
|Gagatli-Russia            |Gagatli            |42,72N, 46,23E |-           |-           |-           |380         |-           |-         |
|Irganay-Russia            |Irganay            |42,62N, 46,90E |-           |-           |420         |600         |-           |-         |
|Mogokh-Russia             |Mogokh             |42,55N, 46,75E |-           |-           |320         |480         |-           |-         |
|Chirkey-Russia            |Chirkey            |42,97N, 46,93E |-           |-           |400         |550         |-           |-         |
|Miatli-Russia             |Miatli             |43,05N, 46,85E |-           |-           |350         |480         |-           |-         |
|Sharoy-Pass-Russia        |Sharoy-Pass        |42,53N, 46,18E |-           |-           |-           |300         |500         |-         |
|Derbent-Russia            |Derbent            |42,06N, 48,29E |-           |-           |-           |-           |1,5k        |8,0k      |
|Palasa-Syrt-Russia        |Palasa-Syrt        |41,90N, 48,35E |-           |-           |-           |-           |-           |2,2k      |
|Urtseki-Russia            |Urtseki            |42,63N, 47,62E |-           |-           |-           |-           |1,2k        |4,5k      |
|Tarki-Russia              |Tarki              |42,95N, 47,49E |-           |-           |-           |-           |2,0k        |-         |
|Verkhniy Chir-Yurt-Russia |Verkhniy Chir-Yurt |43,17N, 46,88E |-           |-           |-           |-           |-           |4,0k      |
|Andreyaul-Russia          |Andreyaul          |43,21N, 46,66E |-           |-           |-           |-           |1,8k        |-         |
|Karabudakhkent-Russia     |Karabudakhkent     |42,71N, 47,56E |-           |-           |-           |-           |1,2k        |-         |
|Khunzakh-Russia           |Khunzakh           |42,55N, 46,70E |-           |-           |-           |-           |1,2k        |-         |
|Gimry-Russia              |Gimry              |42,75N, 46,84E |-           |-           |-           |350         |-           |-         |
|Tindi-Russia              |Tindi              |42,43N, 46,13E |-           |-           |300         |-           |-           |-         |

# Medieval and Early Modern Settlements (600 - 1700AD)

Table: Medieval and early modern settlement populations in Dagestan (600 - 1700AD).

|                             |Settlement            |Coords         |600/700AD |800AD |1000AD |1200AD |1400AD |1600AD |1700AD |
|:----------------------------|:---------------------|:--------------|:---------|:-----|:------|:------|:------|:------|:------|
|Chokh-Russia                 |Chokh                 |42,32N, 47,03E |900       |-     |-      |1,4k   |-      |-      |2,1k   |
|Rugudja-Russia               |Rugudja               |42,27N, 46,97E |-         |-     |-      |950    |-      |-      |1,4k   |
|Mekegi-Russia                |Mekegi                |42,36N, 47,53E |-         |-     |-      |1,1k   |-      |-      |2,1k   |
|Gapshima-Russia              |Gapshima              |42,19N, 47,42E |-         |-     |-      |850    |-      |-      |1,4k   |
|Velikent-Russia              |Velikent              |42,20N, 48,04E |-         |-     |-      |-      |-      |-      |900    |
|Torpakh-Kala-Russia          |Torpakh-Kala          |41,88N, 48,37E |2,5k      |-     |-      |-      |-      |-      |-      |
|Kayakent-Russia              |Kayakent              |42,38N, 47,98E |1,1k      |-     |-      |-      |-      |-      |1,6k   |
|Utamysh-Russia               |Utamysh               |42,35N, 47,88E |-         |1,4k  |-      |-      |-      |-      |2,8k   |
|Khorochoi-Russia             |Khorochoi             |42,73N, 46,15E |-         |-     |-      |-      |-      |-      |750    |
|Gagatli-Russia               |Gagatli               |42,72N, 46,23E |-         |-     |-      |900    |-      |-      |1,5k   |
|Irganay-Russia               |Irganay               |42,62N, 46,90E |-         |-     |-      |850    |-      |-      |1,3k   |
|Mogokh-Russia                |Mogokh                |42,55N, 46,75E |-         |-     |-      |600    |-      |-      |850    |
|Chirkey-Russia               |Chirkey               |42,97N, 46,93E |-         |-     |-      |1,2k   |-      |-      |2,6k   |
|Miatli-Russia                |Miatli                |43,05N, 46,85E |-         |-     |-      |-      |-      |-      |750    |
|Derbent-Russia               |Derbent               |42,06N, 48,29E |20,0k     |30,0k |42,0k  |35,0k  |12,0k  |18,0k  |16,0k  |
|Palasa-Syrt-Russia           |Palasa-Syrt           |41,90N, 48,35E |3,2k      |-     |-      |-      |-      |-      |-      |
|Urtseki-Russia               |Urtseki               |42,63N, 47,62E |7,5k      |1,8k  |-      |-      |-      |-      |-      |
|Tarki-Russia                 |Tarki                 |42,95N, 47,49E |6,0k      |12,0k |7,0k   |6,5k   |7,5k   |9,5k   |10,0k  |
|Verkhniy Chir-Yurt-Russia    |Verkhniy Chir-Yurt    |43,17N, 46,88E |14,0k     |9,0k  |2,5k   |-      |-      |-      |1,1k   |
|Nizhniy Chir-Yurt-Russia     |Nizhniy Chir-Yurt     |43,18N, 46,90E |2,5k      |1,8k  |-      |-      |-      |-      |1,2k   |
|Andreyaul-Russia             |Andreyaul             |43,21N, 46,66E |5,5k      |7,0k  |3,5k   |-      |-      |6,0k   |9,0k   |
|Kostek-Russia                |Kostek                |43,34N, 46,75E |-         |-     |-      |-      |-      |1,5k   |2,8k   |
|Aksay-Russia                 |Aksay                 |43,33N, 46,45E |-         |-     |-      |-      |-      |1,8k   |3,5k   |
|Terekli-Mekteb-Russia        |Terekli-Mekteb        |44,17N, 45,87E |-         |-     |-      |-      |-      |900    |1,4k   |
|Karabudakhkent-Russia        |Karabudakhkent        |42,71N, 47,56E |-         |1,8k  |-      |-      |2,4k   |-      |3,8k   |
|Gubden-Russia                |Gubden                |42,57N, 47,56E |1,4k      |-     |-      |2,2k   |-      |-      |4,2k   |
|Dzhalgan-Russia              |Dzhalgan              |42,02N, 48,24E |900       |1,1k  |-      |-      |-      |-      |750    |
|Mitagi-Russia                |Mitagi                |42,01N, 48,15E |850       |1,0k  |-      |-      |-      |-      |700    |
|Kemakh-Russia                |Kemakh                |42,04N, 48,19E |800       |950   |-      |-      |-      |-      |600    |
|Gedzhukh-Russia              |Gedzhukh              |42,12N, 48,08E |950       |1,2k  |-      |-      |-      |-      |850    |
|Bilgadzhik-Russia            |Bilgadzhik            |41,89N, 48,40E |1,1k      |1,4k  |-      |-      |-      |-      |-      |
|Kumukh-Russia                |Kumukh                |42,17N, 47,12E |2,2k      |3,2k  |4,5k   |5,5k   |4,8k   |5,2k   |5,0k   |
|Kala-Koreish-Russia          |Kala-Koreish          |42,09N, 47,62E |1,6k      |2,4k  |3,2k   |3,8k   |2,6k   |-      |900    |
|Kubachi-Russia               |Kubachi               |42,09N, 47,60E |-         |1,4k  |2,0k   |2,8k   |3,2k   |-      |3,5k   |
|Urkarakh-Russia              |Urkarakh              |42,16N, 47,63E |-         |1,1k  |-      |1,8k   |-      |-      |2,6k   |
|Madzhalis-Russia             |Madzhalis             |42,12N, 47,83E |-         |-     |-      |-      |-      |1,8k   |3,2k   |
|Bashly-Russia                |Bashly                |42,30N, 47,82E |2,2k      |3,0k  |-      |3,5k   |-      |-      |6,5k   |
|Yangikent-Russia             |Yangikent             |42,22N, 47,85E |-         |-     |-      |-      |-      |1,1k   |1,9k   |
|Dzhavgat-Russia              |Dzhavgat              |42,18N, 47,80E |-         |-     |-      |950    |-      |-      |1,6k   |
|Akusha-Russia                |Akusha                |42,27N, 47,34E |-         |1,5k  |-      |2,6k   |3,0k   |-      |4,5k   |
|Tsudakhar-Russia             |Tsudakhar             |42,33N, 47,16E |-         |-     |1,2k   |-      |1,8k   |-      |2,8k   |
|Usisha-Russia                |Usisha                |42,27N, 47,42E |-         |-     |1,0k   |-      |1,5k   |-      |2,3k   |
|Mugi-Russia                  |Mugi                  |42,29N, 47,39E |-         |-     |-      |950    |-      |-      |1,6k   |
|Levashi-Russia               |Levashi               |42,43N, 47,33E |-         |-     |-      |-      |900    |-      |1,5k   |
|Khunzakh-Russia              |Khunzakh              |42,55N, 46,70E |3,8k      |4,5k  |5,5k   |6,0k   |5,2k   |-      |5,8k   |
|Gotsatl-Russia               |Gotsatl               |42,52N, 46,82E |-         |-     |-      |950    |-      |-      |1,7k   |
|Untsukul-Russia              |Untsukul              |42,71N, 46,79E |-         |-     |-      |1,1k   |-      |-      |2,2k   |
|Gimry-Russia                 |Gimry                 |42,75N, 46,84E |-         |-     |-      |800    |-      |-      |1,4k   |
|Chirkata-Russia              |Chirkata              |42,77N, 46,72E |-         |-     |-      |900    |-      |-      |1,6k   |
|Ashilta-Russia               |Ashilta               |42,74N, 46,74E |-         |-     |-      |750    |-      |-      |1,2k   |
|Igali-Russia                 |Igali                 |42,65N, 46,66E |-         |-     |-      |850    |-      |-      |1,4k   |
|Sogratl-Russia               |Sogratl               |42,27N, 47,02E |-         |1,2k  |-      |1,9k   |2,3k   |-      |2,9k   |
|Koroda-Russia                |Koroda                |42,44N, 46,85E |-         |-     |750    |-      |1,0k   |-      |1,4k   |
|Goor-Russia                  |Goor                  |42,43N, 46,58E |-         |-     |700    |-      |1,1k   |-      |1,3k   |
|Kahib-Russia                 |Kahib                 |42,44N, 46,59E |-         |650   |-      |950    |1,1k   |-      |1,4k   |
|Ratlub-Russia                |Ratlub                |42,39N, 46,47E |-         |-     |-      |600    |-      |-      |950    |
|Tindi-Russia                 |Tindi                 |42,43N, 46,13E |-         |-     |900    |-      |1,2k   |-      |1,6k   |
|Kvanada-Russia               |Kvanada               |42,54N, 46,16E |-         |-     |-      |650    |-      |-      |1,1k   |
|Agvali-Russia                |Agvali                |42,54N, 46,12E |-         |-     |-      |700    |-      |-      |1,1k   |
|Botlikh-Russia               |Botlikh               |42,67N, 46,22E |-         |900   |-      |1,3k   |-      |-      |1,9k   |
|Andi-Russia                  |Andi                  |42,77N, 46,24E |-         |950   |-      |1,3k   |-      |-      |2,2k   |
|Godoberi-Russia              |Godoberi              |42,65N, 46,15E |-         |-     |-      |600    |-      |-      |1,0k   |
|Karata-Russia                |Karata                |42,59N, 46,34E |-         |-     |850    |-      |1,1k   |-      |1,6k   |
|Akhvakh-Russia               |Akhvakh               |42,54N, 46,38E |-         |-     |-      |700    |-      |-      |1,2k   |
|Kidero-Russia                |Kidero                |42,19N, 45,96E |-         |-     |-      |550    |-      |-      |850    |
|Bezhta-Russia                |Bezhta                |42,13N, 46,12E |-         |-     |800    |-      |1,1k   |-      |1,8k   |
|Gunzib-Russia                |Gunzib                |42,12N, 46,18E |-         |-     |-      |500    |-      |-      |800    |
|Khvarshi-Russia              |Khvarshi              |42,35N, 46,09E |-         |-     |-      |550    |-      |-      |850    |
|Archi-Russia                 |Archi                 |42,02N, 46,87E |-         |-     |500    |-      |700    |-      |950    |
|Vitskhi-Russia               |Vitskhi               |42,27N, 47,12E |-         |-     |-      |650    |-      |-      |1,0k   |
|Kuli-Russia                  |Kuli                  |42,02N, 47,24E |-         |-     |850    |-      |1,2k   |-      |1,8k   |
|Khosrekh-Russia              |Khosrekh              |41,99N, 47,27E |-         |-     |-      |800    |-      |-      |1,4k   |
|Khuchni-Russia               |Khuchni               |41,95N, 47,95E |950       |1,2k  |-      |-      |1,4k   |-      |1,8k   |
|Tinit-Russia                 |Tinit                 |41,88N, 48,03E |-         |-     |-      |700    |-      |-      |1,1k   |
|Arkit-Russia                 |Arkit                 |41,92N, 47,98E |-         |-     |-      |600    |-      |-      |950    |
|Akhty-Russia                 |Akhty                 |41,46N, 47,74E |1,1k      |-     |1,8k   |2,4k   |3,1k   |-      |4,8k   |
|Rutul-Russia                 |Rutul                 |41,54N, 47,42E |-         |950   |-      |1,5k   |1,9k   |-      |2,6k   |
|Tsakhur-Russia               |Tsakhur               |41,65N, 47,15E |-         |1,1k  |1,6k   |2,2k   |1,8k   |-      |1,9k   |
|Shinaz-Russia                |Shinaz                |41,57N, 47,36E |-         |-     |950    |1,4k   |-      |-      |1,8k   |
|Luchek-Russia                |Luchek                |41,59N, 47,30E |-         |-     |-      |750    |-      |-      |1,2k   |
|Ikhrek-Russia                |Ikhrek                |41,65N, 47,27E |-         |-     |-      |850    |-      |-      |1,4k   |
|Mikrakh-Russia               |Mikrakh               |41,37N, 47,85E |-         |-     |800    |-      |1,1k   |-      |1,6k   |
|Kurakh-Russia                |Kurakh                |41,59N, 47,78E |-         |900   |-      |1,4k   |1,8k   |-      |2,4k   |
|Richa-Russia                 |Richa                 |41,79N, 47,58E |-         |1,1k  |-      |1,8k   |900    |-      |1,2k   |
|Chirag-Russia                |Chirag                |41,82N, 47,43E |-         |-     |750    |1,1k   |-      |-      |1,4k   |
|Tpug-Russia                  |Tpug                  |41,77N, 47,58E |-         |-     |-      |700    |-      |-      |1,1k   |
|Kasumkent-Russia             |Kasumkent             |41,66N, 48,14E |-         |-     |-      |-      |-      |850    |1,3k   |
|Khiv-Russia                  |Khiv                  |41,76N, 47,93E |-         |-     |-      |800    |-      |-      |1,4k   |
|Usukhchay-Russia             |Usukhchay             |41,42N, 47,91E |-         |-     |-      |-      |650    |-      |1,0k   |
|Karakyure-Russia             |Karakyure             |41,40N, 47,96E |-         |-     |850    |-      |1,2k   |-      |1,7k   |
|Khnov-Russia                 |Khnov                 |41,39N, 47,46E |-         |-     |-      |900    |-      |-      |1,6k   |
|Borch-Russia                 |Borch                 |41,44N, 47,34E |-         |-     |-      |850    |-      |-      |1,4k   |
|Terki-Russia                 |Terki                 |43,75N, 47,08E |-         |-     |-      |-      |-      |1,8k   |8,0k   |
|Kizlyar-Russia               |Kizlyar               |43,85N, 46,71E |-         |-     |-      |-      |-      |600    |800    |
|Temir-Khan-Shura-Russia      |Temir-Khan-Shura      |42,82N, 47,12E |-         |-     |-      |-      |-      |450    |600    |
|Petrovsk-Port-Russia         |Petrovsk-Port         |42,98N, 47,50E |900       |1,2k  |-      |-      |-      |-      |-      |
|Nizhneye Kazanishche-Russia  |Nizhneye Kazanishche  |42,77N, 47,17E |-         |-     |-      |-      |1,8k   |-      |3,6k   |
|Verkhneye Kazanishche-Russia |Verkhneye Kazanishche |42,75N, 47,19E |-         |-     |-      |-      |-      |1,2k   |2,1k   |
|Kakashura-Russia             |Kakashura             |42,67N, 47,38E |-         |-     |-      |-      |-      |1,1k   |1,9k   |
|Dorgeli-Russia               |Dorgeli               |42,63N, 47,42E |-         |-     |-      |-      |-      |1,0k   |1,8k   |
|Erpeli-Russia                |Erpeli                |42,80N, 47,01E |-         |-     |-      |-      |-      |1,1k   |2,0k   |
|Karanay-Russia               |Karanay               |42,83N, 46,94E |-         |-     |-      |-      |-      |950    |1,6k   |
|Kumtorkala-Russia            |Kumtorkala            |43,03N, 47,33E |-         |-     |-      |-      |-      |1,1k   |1,8k   |
|Kyakhulay-Russia             |Kyakhulay             |42,96N, 47,49E |-         |-     |-      |-      |-      |-      |950    |
|Alburikent-Russia            |Alburikent            |42,97N, 47,47E |-         |-     |-      |-      |-      |-      |850    |
|Bavtugay-Russia              |Bavtugay              |43,19N, 46,86E |-         |-     |-      |-      |-      |750    |1,2k   |
|Zubutli-Russia               |Zubutli               |43,12N, 46,83E |-         |-     |-      |-      |-      |700    |1,1k   |
|Kadar-Russia                 |Kadar                 |42,68N, 47,28E |-         |-     |-      |-      |-      |900    |1,6k   |
|Gurbuki-Russia               |Gurbuki               |42,52N, 47,62E |-         |-     |-      |-      |-      |850    |1,4k   |
|Murego-Russia                |Murego                |42,39N, 47,69E |-         |-     |-      |850    |-      |-      |1,6k   |
|Myurego-Kaytag-Russia        |Myurego-Kaytag        |42,33N, 47,90E |-         |-     |-      |-      |-      |800    |1,4k   |

# Eighteenth and Nineteenth-Century Settlements (1700 - 1900AD)

Table: Eighteenth and nineteenth-century settlement populations in Dagestan (1700 - 1900AD).

|                             |Settlement            |Historical / Native Names           |1700AD |1750AD |1800AD |1850AD |1897AD |1900AD |
|:----------------------------|:---------------------|:-----------------------------------|:------|:------|:------|:------|:------|:------|
|Chokh-Russia                 |Chokh                 |Чох, Чохская стоянка                |2,1k   |-      |2,4k   |2,1k   |2,6k   |2,7k   |
|Rugudja-Russia               |Rugudja               |Ругуджа                             |1,4k   |-      |1,6k   |-      |1,8k   |1,9k   |
|Mekegi-Russia                |Mekegi                |Мекеги                              |2,1k   |-      |2,4k   |-      |2,5k   |2,6k   |
|Gapshima-Russia              |Gapshima              |Гапшима                             |1,4k   |-      |1,6k   |-      |1,6k   |1,7k   |
|Velikent-Russia              |Velikent              |Великент                            |900    |-      |1,0k   |-      |1,3k   |1,3k   |
|Kayakent-Russia              |Kayakent              |Каякент, Каякентское городище       |1,6k   |-      |1,8k   |-      |2,2k   |2,2k   |
|Utamysh-Russia               |Utamysh               |Утамыш                              |2,8k   |-      |2,2k   |-      |2,0k   |2,0k   |
|Khorochoi-Russia             |Khorochoi             |Хорочой                             |750    |-      |-      |-      |890    |920    |
|Gagatli-Russia               |Gagatli               |Гагатли                             |1,5k   |-      |1,6k   |-      |1,8k   |1,8k   |
|Irganay-Russia               |Irganay               |Ирганай                             |1,3k   |-      |1,4k   |-      |1,6k   |1,6k   |
|Mogokh-Russia                |Mogokh                |Могох                               |850    |-      |-      |-      |940    |970    |
|Chirkey-Russia               |Chirkey               |Чиркей                              |2,6k   |-      |3,2k   |2,4k   |3,4k   |3,5k   |
|Miatli-Russia                |Miatli                |Миатли                              |750    |-      |850    |-      |980    |1,0k   |
|Derbent-Russia               |Derbent               |Дербент, Bab al-Abwab, Chorene      |16,0k  |13,0k  |10,0k  |12,5k  |14,6k  |15,2k  |
|Tarki-Russia                 |Tarki                 |Тарки, Семендер, Samandar           |10,0k  |-      |8,5k   |4,2k   |2,4k   |2,4k   |
|Verkhniy Chir-Yurt-Russia    |Verkhniy Chir-Yurt    |Верхний Чирюрт, Беленджер, Balanjar |1,1k   |-      |1,4k   |-      |1,6k   |1,7k   |
|Nizhniy Chir-Yurt-Russia     |Nizhniy Chir-Yurt     |Нижний Чирюрт, Чир-Юрт              |1,2k   |-      |1,5k   |2,1k   |2,4k   |2,5k   |
|Andreyaul-Russia             |Andreyaul             |Андрейаул, Эндирей, Алкас, Балх     |9,0k   |7,5k   |6,5k   |3,8k   |4,1k   |4,2k   |
|Kostek-Russia                |Kostek                |Костек                              |2,8k   |-      |3,2k   |2,9k   |3,4k   |3,5k   |
|Aksay-Russia                 |Aksay                 |Аксай, Яхсай                        |3,5k   |-      |4,8k   |4,2k   |5,6k   |5,8k   |
|Terekli-Mekteb-Russia        |Terekli-Mekteb        |Терекли-Мектеб                      |1,4k   |-      |1,6k   |1,5k   |1,4k   |1,5k   |
|Karabudakhkent-Russia        |Karabudakhkent        |Карабудахкент                       |3,8k   |-      |4,2k   |3,9k   |4,5k   |4,6k   |
|Gubden-Russia                |Gubden                |Губден                              |4,2k   |-      |4,8k   |4,5k   |5,4k   |5,5k   |
|Dzhalgan-Russia              |Dzhalgan              |Джалган                             |750    |-      |-      |-      |820    |850    |
|Mitagi-Russia                |Mitagi                |Митаги                              |700    |-      |-      |-      |780    |810    |
|Kemakh-Russia                |Kemakh                |Кемах                               |600    |-      |-      |-      |640    |660    |
|Gedzhukh-Russia              |Gedzhukh              |Геджух                              |850    |-      |-      |-      |960    |990    |
|Bilgadzhik-Russia            |Bilgadzhik            |Билгаджик, Белиджи                  |-      |-      |-      |-      |1,1k   |1,2k   |
|Kumukh-Russia                |Kumukh                |Кумух, Гази-Кумух, Гъази-Гъумук     |5,0k   |-      |4,2k   |2,9k   |2,4k   |2,4k   |
|Kala-Koreish-Russia          |Kala-Koreish          |Кала-Корейш, Зирихгеран             |900    |-      |450    |-      |210    |200    |
|Kubachi-Russia               |Kubachi               |Кубачи, Угбуг, Зирихгеран           |3,5k   |-      |2,9k   |2,4k   |2,3k   |2,4k   |
|Urkarakh-Russia              |Urkarakh              |Уркарах                             |2,6k   |-      |2,8k   |2,5k   |2,3k   |2,4k   |
|Madzhalis-Russia             |Madzhalis             |Маджалис                            |3,2k   |-      |2,8k   |2,3k   |2,1k   |2,2k   |
|Bashly-Russia                |Bashly                |Башлы, Баршлы, Башлыкент            |6,5k   |-      |5,5k   |3,2k   |2,8k   |2,9k   |
|Yangikent-Russia             |Yangikent             |Янгикент                            |1,9k   |-      |1,8k   |-      |1,5k   |1,5k   |
|Dzhavgat-Russia              |Dzhavgat              |Джавгат                             |1,6k   |-      |1,5k   |-      |1,3k   |1,4k   |
|Akusha-Russia                |Akusha                |Акуша                               |4,5k   |-      |4,8k   |3,8k   |3,4k   |3,5k   |
|Tsudakhar-Russia             |Tsudakhar             |Цудахар                             |2,8k   |-      |3,1k   |2,5k   |2,5k   |2,5k   |
|Usisha-Russia                |Usisha                |Усиша                               |2,3k   |-      |2,5k   |-      |2,2k   |2,3k   |
|Mugi-Russia                  |Mugi                  |Муги                                |1,6k   |-      |1,8k   |-      |2,0k   |2,0k   |
|Levashi-Russia               |Levashi               |Леваши                              |1,5k   |-      |1,8k   |1,9k   |2,3k   |2,4k   |
|Khunzakh-Russia              |Khunzakh              |Хунзах, Humraj, Серир               |5,8k   |-      |5,2k   |3,4k   |3,2k   |3,4k   |
|Gotsatl-Russia               |Gotsatl               |Гоцатль                             |1,7k   |-      |1,9k   |-      |1,8k   |1,8k   |
|Untsukul-Russia              |Untsukul              |Унцукуль                            |2,2k   |-      |2,6k   |2,1k   |2,7k   |2,8k   |
|Gimry-Russia                 |Gimry                 |Гимры, Генуб                        |1,4k   |-      |1,6k   |1,1k   |1,4k   |1,4k   |
|Chirkata-Russia              |Chirkata              |Чирката                             |1,6k   |-      |1,8k   |-      |1,7k   |1,7k   |
|Ashilta-Russia               |Ashilta               |Ашильта                             |1,2k   |-      |1,4k   |950    |1,1k   |1,2k   |
|Igali-Russia                 |Igali                 |Игали                               |1,4k   |-      |1,6k   |-      |1,5k   |1,6k   |
|Sogratl-Russia               |Sogratl               |Согратль                            |2,9k   |-      |3,1k   |2,6k   |2,2k   |2,2k   |
|Koroda-Russia                |Koroda                |Корода                              |1,4k   |-      |1,4k   |-      |1,3k   |1,3k   |
|Goor-Russia                  |Goor                  |Гоор                                |1,3k   |-      |1,2k   |-      |920    |950    |
|Kahib-Russia                 |Kahib                 |Кахиб, Бакдаб                       |1,4k   |-      |1,3k   |-      |980    |1,0k   |
|Ratlub-Russia                |Ratlub                |Ратлуб                              |950    |-      |1,0k   |-      |890    |920    |
|Tindi-Russia                 |Tindi                 |Тинди                               |1,6k   |-      |1,8k   |-      |1,7k   |1,7k   |
|Kvanada-Russia               |Kvanada               |Кванада                             |1,1k   |-      |1,2k   |-      |1,2k   |1,2k   |
|Agvali-Russia                |Agvali                |Агвали                              |1,1k   |-      |1,2k   |-      |1,2k   |1,3k   |
|Botlikh-Russia               |Botlikh               |Ботлих                              |1,9k   |-      |2,2k   |1,9k   |2,1k   |2,2k   |
|Andi-Russia                  |Andi                  |Анди                                |2,2k   |-      |2,4k   |1,7k   |2,0k   |2,1k   |
|Godoberi-Russia              |Godoberi              |Годобери                            |1,0k   |-      |1,1k   |-      |1,1k   |1,2k   |
|Karata-Russia                |Karata                |Карата                              |1,6k   |-      |1,8k   |-      |1,6k   |1,7k   |
|Akhvakh-Russia               |Akhvakh               |Ахвах, Тад-Магитль                  |1,2k   |-      |1,4k   |-      |1,3k   |1,4k   |
|Kidero-Russia                |Kidero                |Кидеро, Дидо                        |850    |-      |950    |-      |880    |910    |
|Bezhta-Russia                |Bezhta                |Бежта, Капуча                       |1,8k   |-      |1,9k   |-      |1,8k   |1,9k   |
|Gunzib-Russia                |Gunzib                |Гунзиб                              |800    |-      |850    |-      |790    |810    |
|Khvarshi-Russia              |Khvarshi              |Хварши                              |850    |-      |900    |-      |840    |870    |
|Archi-Russia                 |Archi                 |Арчиб                               |950    |-      |1,0k   |-      |910    |940    |
|Vitskhi-Russia               |Vitskhi               |Вицхи                               |1,0k   |-      |1,1k   |-      |980    |1,0k   |
|Kuli-Russia                  |Kuli                  |Кули                                |1,8k   |-      |1,9k   |-      |1,9k   |1,9k   |
|Khosrekh-Russia              |Khosrekh              |Хосрех                              |1,4k   |-      |1,6k   |-      |1,6k   |1,6k   |
|Khuchni-Russia               |Khuchni               |Хучни                               |1,8k   |-      |1,6k   |-      |1,1k   |1,2k   |
|Tinit-Russia                 |Tinit                 |Тинит                               |1,1k   |-      |1,2k   |-      |1,2k   |1,2k   |
|Arkit-Russia                 |Arkit                 |Аркит                               |950    |-      |1,0k   |-      |960    |990    |
|Akhty-Russia                 |Akhty                 |Ахты                                |4,8k   |-      |5,4k   |4,5k   |5,9k   |6,1k   |
|Rutul-Russia                 |Rutul                 |Рутул                               |2,6k   |-      |2,8k   |-      |2,3k   |2,4k   |
|Tsakhur-Russia               |Tsakhur               |Цахур                               |1,9k   |-      |1,5k   |-      |1,2k   |1,2k   |
|Shinaz-Russia                |Shinaz                |Шиназ                               |1,8k   |-      |1,9k   |-      |1,7k   |1,7k   |
|Luchek-Russia                |Luchek                |Лучек                               |1,2k   |-      |1,3k   |-      |1,1k   |1,2k   |
|Ikhrek-Russia                |Ikhrek                |Ихрек                               |1,4k   |-      |1,6k   |-      |1,5k   |1,5k   |
|Mikrakh-Russia               |Mikrakh               |Микрах                              |1,6k   |-      |1,8k   |-      |1,7k   |1,8k   |
|Kurakh-Russia                |Kurakh                |Курах                               |2,4k   |-      |2,6k   |2,2k   |2,1k   |2,2k   |
|Richa-Russia                 |Richa                 |Рича, Bab al-Lan                    |1,2k   |-      |1,1k   |-      |980    |1,0k   |
|Chirag-Russia                |Chirag                |Чираг                               |1,4k   |-      |1,3k   |-      |1,1k   |1,1k   |
|Tpug-Russia                  |Tpug                  |Тпиг                                |1,1k   |-      |1,2k   |-      |1,2k   |1,2k   |
|Kasumkent-Russia             |Kasumkent             |Касумкент                           |1,3k   |-      |1,6k   |1,7k   |1,9k   |2,0k   |
|Khiv-Russia                  |Khiv                  |Хив                                 |1,4k   |-      |1,5k   |-      |1,5k   |1,5k   |
|Usukhchay-Russia             |Usukhchay             |Усухчай                             |1,0k   |-      |1,2k   |-      |1,2k   |1,2k   |
|Karakyure-Russia             |Karakyure             |Каракюре                            |1,7k   |-      |1,8k   |-      |1,8k   |1,8k   |
|Khnov-Russia                 |Khnov                 |Хнов                                |1,6k   |-      |1,8k   |-      |1,7k   |1,7k   |
|Borch-Russia                 |Borch                 |Борч                                |1,4k   |-      |1,6k   |-      |1,5k   |1,6k   |
|Terki-Russia                 |Terki                 |Терки, Терский город, Тюмень        |8,0k   |-      |-      |-      |-      |-      |
|Kizlyar-Russia               |Kizlyar               |Кизляр, Кизлярская крепость         |800    |5,5k   |9,5k   |9,2k   |7,3k   |7,5k   |
|Khasavyurt-Russia            |Khasavyurt            |Хасавюрт, Ярыксув                   |-      |-      |-      |1,2k   |5,3k   |5,6k   |
|Temir-Khan-Shura-Russia      |Temir-Khan-Shura      |Темир-Хан-Шура, Буйнакск            |600    |-      |800    |3,2k   |9,2k   |9,6k   |
|Petrovsk-Port-Russia         |Petrovsk-Port         |Петровск-Порт, Махачкала, Анжи-Кала |-      |-      |-      |1,8k   |9,8k   |10,5k  |
|Deshlagar-Russia             |Deshlagar             |Дешлагар, Сергокала                 |-      |-      |-      |1,4k   |1,8k   |1,9k   |
|Nizhneye Kazanishche-Russia  |Nizhneye Kazanishche  |Нижнее Казанище                     |3,6k   |-      |4,2k   |4,0k   |4,7k   |4,8k   |
|Verkhneye Kazanishche-Russia |Verkhneye Kazanishche |Верхнее Казанище                    |2,1k   |-      |2,4k   |2,3k   |2,6k   |2,7k   |
|Kakashura-Russia             |Kakashura             |Какашура                            |1,9k   |-      |2,3k   |-      |2,6k   |2,7k   |
|Dorgeli-Russia               |Dorgeli               |Доргели                             |1,8k   |-      |2,1k   |-      |2,4k   |2,5k   |
|Erpeli-Russia                |Erpeli                |Эрпели                              |2,0k   |-      |2,4k   |-      |2,5k   |2,6k   |
|Karanay-Russia               |Karanay               |Каранай                             |1,6k   |-      |1,9k   |-      |2,1k   |2,1k   |
|Kumtorkala-Russia            |Kumtorkala            |Кумторкала, Коркмаскала             |1,8k   |-      |2,1k   |-      |2,2k   |2,3k   |
|Kyakhulay-Russia             |Kyakhulay             |Кяхулай                             |950    |-      |1,1k   |-      |1,3k   |1,4k   |
|Alburikent-Russia            |Alburikent            |Альбурикент                         |850    |-      |1,0k   |-      |1,2k   |1,2k   |
|Babayurt-Russia              |Babayurt              |Бабаюрт                             |-      |-      |800    |1,1k   |1,7k   |1,8k   |
|Tarumovka-Russia             |Tarumovka             |Тарумовка                           |-      |-      |950    |1,4k   |2,1k   |2,2k   |
|Aleksandriyskaya-Russia      |Aleksandriyskaya      |Александрийская                     |-      |800    |1,2k   |1,6k   |2,1k   |2,2k   |
|Borozdinskaya-Russia         |Borozdinskaya         |Бороздинская                        |-      |950    |1,4k   |1,8k   |2,3k   |2,4k   |
|Kargalinskaya-Russia         |Kargalinskaya         |Каргалинская                        |-      |1,1k   |1,6k   |2,1k   |2,8k   |2,9k   |
|Dubovskaya-Russia            |Dubovskaya            |Дубовская                           |-      |900    |1,4k   |1,7k   |2,2k   |2,3k   |
|Kazi-Yurt-Russia             |Kazi-Yurt             |Кази-Юрт                            |-      |850    |1,2k   |-      |1,6k   |1,6k   |
|Bavtugay-Russia              |Bavtugay              |Бавтугай                            |1,2k   |-      |1,4k   |-      |1,6k   |1,7k   |
|Zubutli-Russia               |Zubutli               |Зубутли                             |1,1k   |-      |1,4k   |-      |1,5k   |1,5k   |
|Kadar-Russia                 |Kadar                 |Кадар                               |1,6k   |-      |1,8k   |-      |2,1k   |2,2k   |
|Gurbuki-Russia               |Gurbuki               |Гурбуки                             |1,4k   |-      |1,7k   |-      |1,9k   |2,0k   |
|Murego-Russia                |Murego                |Мурего                              |1,6k   |-      |1,8k   |-      |1,9k   |1,9k   |
|Myurego-Kaytag-Russia        |Myurego-Kaytag        |Усемикент                           |1,4k   |-      |1,5k   |-      |1,6k   |1,7k   |

# Sources

::: {#refs}
:::


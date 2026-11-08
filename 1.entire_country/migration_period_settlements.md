---
title: "GAZETTEER OF MIGRATION PERIOD SETTLEMENTS AND POPULATION HISTORIES ACROSS RUSSIA."
subtitle: "Supplementary Tabular Gazetteer of 198 Excavated Settlements, Hillforts, and Fortified Towns from the Migration Period to 1900AD."
date: "7 November 2026"
authors_line: "Aust Kätzchen"
emails:
  - austkaeztchen@confoederatio.org
bibliography: migration_period_literature_review.bib
csl: crd-mla-numeric.csl
link-citations: true
hero_figure: "figures/fig1_migration_period_cultures_map.png"
hero_caption: "Migration Period Archaeological Cultures, River Basins, Major Movements, and Excavated Sites across Russia (c. 250-750AD)."
hero_label: "fig:hero-map"
output:
  pdf_document:
    latex_engine: xelatex
    keep_tex: true
    template: template.tex
    citation_package: default
  md_document:
    variant: gfm
---






# Overview and Estimation Rules

This supplementary gazetteer compiles `198` excavated Migration Period (`c. 250-750AD`) and Early Medieval transitional settlements, promontory hillforts (*gorodishcha*), riverine villages (*selishcha*), and fortified towns across the six historical regions of Russia. All records are stored in `migration_period_settlements.json` in the standard `population_Stadester` dictionary format, keyed by `<Name>-Russia` with English and Russian names, decimal coordinates (`coords`), and positive integer population estimates (`population`) keyed by calendar year.

For each settlement, population figures during the Migration Period (`250-750AD`) and the Early Medieval transition (`900AD`) are derived from excavated dwelling counts, fortified and unfortified habitation areas, and associated cemetery burial totals [@oblomskiy2016kolochinskaya; @krenke2019moskvorechye; @goldina1999drevnyaya; @gadzhiev2002derbent]. In the JSON file, only inhabited benchmark years (`population > 0`) are recorded so that the first and last keys represent each site's documented occupation span; in the tables below, benchmarks prior to foundation or after abandonment are denoted by `-`. Where a Migration Period settlement evolved directly into a modern town or village on the same site, its population at the First All-Russian Census of `1897` (`1900AD` benchmark) is included [@troinitsky1905perepis].

<div class="figure" style="text-align: center">
<img src="figures/fig1_migration_period_cultures_map.png" alt="plot of chunk fig1-md-only" width="3032" />
<p class="caption">plot of chunk fig1-md-only</p>
</div>

# European Forest-Steppe Settlements

Table \ref{tab:reg1-sites} lists `38` excavated settlements across the Seim, Psel, Upper Don, Oskol, and Desna forest-steppe valleys, covering the Kiev, Eastern Chernyakhov, Kolochin, Penkovka, Volyntsevo-Romny, Borshevo, and Saltovo-Mayaki cultures [@shchukin2005gotskiy; @oblomskiy2002dneprovskoe; @oblomskiy2016kolochinskaya; @sedov1999drevnerusskaya].

Table: European Forest-Steppe Settlements and Population Estimates (250AD - 1900AD).

|Settlement            |Historical / Native Names                     |Coords & Span             |250 |350 |450 |600 |750 |900  |1900  |
|:---------------------|:---------------------------------------------|:-------------------------|:---|:---|:---|:---|:---|:----|:-----|
|Gochevo               |Гочево; Гочевское городище; Kruglik           |51,18, 35,65 (250-1200AD) |180 |420 |140 |190 |320 |850  |-     |
|Kursk                 |Курск; Курское городище                       |51,73, 36,19 (450-1900AD) |-   |-   |90  |160 |350 |900  |77,5k |
|Bolshoye Gordeevskoye |Большое Гордеевское; Гордеевка                |51,62, 36,12 (100-450AD)  |75  |95  |60  |-   |-   |-    |-     |
|Tazovo                |Тазово; Тазовское поселение                   |51,89, 36,24 (250-750AD)  |65  |85  |70  |95  |120 |-    |-     |
|Vorobyovka 2          |Воробьевка 2; Воробьевское поселение          |51,55, 36,05 (250-450AD)  |60  |110 |45  |-   |-   |-    |-     |
|Velikie Budki         |Великие Будки; Хутор Великие Будки            |51,35, 34,82 (350-750AD)  |-   |70  |95  |130 |160 |-    |-     |
|Khitrovka             |Хитровка; Хитровское поселение                |50,62, 36,58 (250-750AD)  |110 |240 |80  |120 |140 |-    |-     |
|Zanki                 |Занки; Занковское поселение                   |50,55, 36,48 (250-600AD)  |90  |180 |70  |110 |-   |-    |-     |
|Gornal                |Горналь; Большое Горнальское городище         |51,08, 35,23 (450-1000AD) |-   |-   |60  |90  |280 |650  |-     |
|Sudzha                |Суджа; Суджанское городище                    |51,19, 35,27 (600-1900AD) |-   |-   |-   |80  |190 |420  |7,6k  |
|Lebyazhye             |Лебяжье; Лебяжьевское поселение               |51,71, 36,38 (250-750AD)  |55  |80  |95  |115 |130 |-    |-     |
|Kashirskoye-Don       |Каширское; Каширское поселение                |51,42, 39,61 (100-450AD)  |140 |170 |60  |-   |-   |-    |-     |
|Ksizovo-19            |Ксизово-19; Ксизовское поселение              |52,38, 39,12 (100-750AD)  |110 |140 |160 |95  |70  |-    |-     |
|Mukhino-2             |Мухино-2; Мухинское поселение                 |52,41, 39,08 (250-600AD)  |70  |115 |130 |80  |-   |-    |-     |
|Zamyatino             |Замятино; Замятинский комплекс                |52,45, 39,03 (250-600AD)  |60  |100 |115 |75  |-   |-    |-     |
|Kamenka-Don           |Каменка; Каменское поселение на Дону          |52,51, 38,96 (250-600AD)  |55  |90  |80  |65  |-   |-    |-     |
|Borshevo              |Борщево; Большое Борщевское городище          |51,28, 39,05 (450-1900AD) |-   |-   |65  |110 |260 |680  |1,5k  |
|Titchikha             |Титчиха; Титчихинское городище                |51,12, 39,18 (600-1000AD) |-   |-   |-   |75  |210 |620  |-     |
|Maloye Borshevo       |Малое Борщево; Малое Борщевское городище      |51,26, 39,06 (600-1000AD) |-   |-   |-   |60  |150 |380  |-     |
|Arkhangelskoye        |Архангельское; Архангельское городище         |51,34, 39,02 (600-1000AD) |-   |-   |-   |55  |165 |410  |-     |
|Vorgol                |Воргол; Воргольское городище                  |52,58, 38,35 (450-1000AD) |-   |-   |60  |95  |220 |520  |-     |
|Zhivotinnoye          |Животинное                                    |51,89, 39,21 (600-1000AD) |-   |-   |-   |70  |180 |460  |-     |
|Belogorskoye          |Белогорское; Белогорское городище             |51,74, 39,18 (600-1000AD) |-   |-   |-   |65  |175 |440  |-     |
|Kuznetsovskoye        |Кузнецовское; Кузнецовское городище           |51,81, 39,24 (600-1000AD) |-   |-   |-   |50  |145 |360  |-     |
|Mikhailovskiy Kordon  |Михайловский кордон; Михайловское поселение   |51,78, 39,26 (450-900AD)  |-   |-   |55  |90  |160 |310  |-     |
|Dmitrievskoye         |Дмитриевское городище; Дмитриевка             |50,15, 36,85 (600-1000AD) |-   |-   |-   |70  |420 |950  |-     |
|Belgorod              |Белгород; Белгородское городище; Меловая гора |50,60, 36,59 (350-1900AD) |-   |140 |65  |110 |280 |680  |27,2k |
|Mayatskoye            |Маяцкое городище; Дивногорье                  |50,97, 39,30 (750-1000AD) |-   |-   |-   |-   |380 |1,4k |-     |
|Yutanovka             |Ютановка; Ютановское городище                 |50,48, 37,82 (750-1000AD) |-   |-   |-   |-   |290 |780  |-     |
|Verkhniy Saltov       |Верхний Салтов                                |50,13, 36,80 (600-1000AD) |-   |-   |-   |90  |850 |2,4k |-     |
|Krapivnoye            |Крапивное; Крапивенское городище              |50,39, 36,79 (750-1200AD) |-   |-   |-   |-   |240 |720  |-     |
|Kholki                |Холки; Холкинское городище                    |50,83, 37,71 (750-1200AD) |-   |-   |-   |-   |180 |540  |-     |
|Kabanovo              |Кабаново; Кабановское поселение               |51,64, 35,89 (350-750AD)  |-   |70  |95  |135 |170 |-    |-     |
|Taimanovo             |Тайманово; Таймановское поселение             |53,31, 32,18 (250-750AD)  |90  |130 |145 |170 |190 |-    |-     |
|Nisimkovichi          |Нисимковичи                                   |52,78, 31,32 (350-900AD)  |-   |65  |85  |120 |150 |240  |-     |
|Posudichi             |Посудичи; Посудичское городище                |52,61, 33,45 (100-750AD)  |110 |135 |95  |125 |160 |-    |-     |
|Kurovo                |Курово; Куровское поселение                   |52,59, 33,49 (250-750AD)  |70  |95  |110 |140 |175 |-    |-     |
|Radutino              |Радутино; Радутинское поселение               |52,42, 33,68 (250-750AD)  |65  |90  |105 |130 |155 |-    |-     |

# Mixed and Boreal Forest Zone Settlements

Table \ref{tab:reg2-sites} lists `55` excavated hillforts, riverine villages, and proto-urban centres across the Moskva, Upper and Middle Oka, Upper Volga, Ilmen-Volkhov, Pskov, and Upper Dnieper forest basins, spanning the Late Dyakovo, Moshchiny, Ryazan-Oka, Tushemlya, Pskov Long Barrows, Merya, Muroma, and Early Rus' traditions [@krenke2011dyakovo; @mayorov2016moschiny; @akhmedov2018ryazan; @lopatin2007severnye; @islanova2012ozero].

Table: Mixed and Boreal Forest Zone Settlements and Population Estimates (250AD - 1900AD).

|Settlement               |Historical / Native Names                           |Coords & Span             |250 |350 |450 |600 |750 |900  |1900  |
|:------------------------|:---------------------------------------------------|:-------------------------|:---|:---|:---|:---|:---|:----|:-----|
|Dyakovo                  |Дьяково городище; Коломенское                       |55,66, 37,67 (100-1900AD) |175 |185 |160 |130 |110 |190  |850   |
|Troitskoye               |Троицкое городище; Троицкое на Москве-реке          |55,55, 35,88 (100-750AD)  |140 |145 |115 |85  |55  |-    |-     |
|Borsheva                 |Боршева; Боршевское городище на Москве-реке         |55,52, 38,28 (100-900AD)  |110 |120 |105 |95  |125 |210  |-     |
|Kuntsevo                 |Кунцевское городище; Проклятое место                |55,74, 37,43 (100-1200AD) |95  |110 |95  |85  |105 |180  |-     |
|Shcherbinskoye           |Щербинское городище; Щербинка                       |55,49, 37,56 (100-600AD)  |125 |130 |110 |75  |-   |-    |-     |
|Lukovnya                 |Луковня; Луковнинское городище                      |55,43, 37,48 (100-600AD)  |90  |95  |80  |60  |-   |-    |-     |
|Troitse-Pelenitsy        |Троице-Пеленицы; Пеленицкое городище                |54,48, 40,12 (100-750AD)  |115 |140 |155 |170 |190 |-    |-     |
|Nastasino                |Настасьино; Настасьинское городище                  |55,14, 38,64 (100-750AD)  |85  |95  |90  |80  |95  |-    |-     |
|Rostislavl               |Ростиславль                                         |54,92, 38,54 (100-1200AD) |100 |110 |95  |85  |120 |280  |-     |
|Kashirskoye-Oka          |Каширское городище; Старшее Каширское               |54,84, 38,15 (100-750AD)  |115 |125 |105 |90  |110 |-    |-     |
|Mutenkovskoye            |Мутенковское городище; Мутенковка                   |54,83, 38,22 (100-600AD)  |80  |90  |75  |65  |-   |-    |-     |
|Moshchiny                |Мощины; Мощинское городище                          |54,42, 35,15 (250-900AD)  |95  |165 |220 |195 |140 |180  |-     |
|Supruty                  |Супруты; Супрутское городище                        |53,98, 37,12 (250-900AD)  |80  |130 |160 |210 |280 |450  |-     |
|Duna                     |Дуна; Дунское городище                              |54,05, 36,28 (250-900AD)  |70  |110 |135 |150 |165 |210  |-     |
|Spas-Pereksha            |Спас-Перекша; Перекшинское городище                 |54,36, 35,24 (250-750AD)  |65  |105 |140 |130 |110 |-    |-     |
|Fedyashevo               |Федяшево; Федяшевское городище                      |54,18, 36,82 (250-900AD)  |75  |120 |150 |165 |190 |260  |-     |
|Vorotyntsevo             |Воротынцево                                         |53,02, 36,94 (250-900AD)  |85  |130 |155 |180 |220 |340  |-     |
|Serensk                  |Серенск; Серенское городище                         |54,31, 35,49 (250-1200AD) |70  |115 |145 |170 |230 |480  |-     |
|Meshchovsk               |Мещовск; Мещовское городище                         |54,32, 35,28 (350-1900AD) |-   |80  |110 |135 |175 |320  |3,8k  |
|Staraya Ryazan           |Старая Рязань; Шатрище                              |54,40, 40,43 (250-1900AD) |160 |240 |310 |340 |420 |950  |710   |
|Shatrishche              |Шатрище; Шатрищенский комплекс                      |54,42, 40,41 (250-750AD)  |130 |195 |240 |220 |180 |-    |-     |
|Ryazan                   |Рязань; Борки                                       |54,63, 39,69 (250-1900AD) |140 |210 |260 |290 |380 |750  |47,5k |
|Nikitino                 |Никитино; Никитинский комплекс                      |54,37, 40,45 (250-900AD)  |120 |190 |240 |220 |180 |250  |-     |
|Koshbeevskoye            |Кошибеево; Кошибеевский комплекс                    |54,41, 41,88 (100-900AD)  |170 |220 |260 |280 |310 |380  |-     |
|Terekhovo                |Терехово; Тереховский комплекс                      |54,21, 40,82 (250-900AD)  |110 |165 |210 |230 |250 |310  |-     |
|Shilovo                  |Шилово; Шиловское поселение                         |54,33, 40,88 (250-1900AD) |95  |145 |190 |220 |260 |340  |2,5k  |
|Borki-Oka                |Борки; Борковский комплекс                          |54,66, 39,67 (250-750AD)  |125 |185 |230 |245 |270 |-    |-     |
|Murom                    |Муром; Чаадаево; Кремлевское городище               |55,58, 42,04 (450-1900AD) |-   |-   |130 |240 |450 |1,1k |13,8k |
|Unzha                    |Унжа; Унженский комплекс                            |55,28, 41,58 (350-900AD)  |-   |90  |140 |185 |230 |310  |-     |
|Kholui                   |Холуй; Холуйское поселение                          |56,58, 41,87 (450-1900AD) |-   |-   |75  |115 |160 |240  |2,2k  |
|Suzdal                   |Суздаль; Суздальский кремль; Васильевское           |56,43, 40,45 (250-1900AD) |85  |120 |160 |220 |380 |1,1k |6,6k  |
|Sarskoye Gorodishche     |Сарское городище; Сара                              |57,10, 39,30 (450-1000AD) |-   |-   |90  |180 |420 |1,2k |-     |
|Rostov Veliky            |Ростов Великий; Ростов                              |57,19, 39,41 (600-1900AD) |-   |-   |-   |140 |320 |1,4k |14,1k |
|Timeriovo                |Тимерево; Большое Тимеревское поселение             |57,56, 39,75 (750-1000AD) |-   |-   |-   |-   |180 |950  |-     |
|Mikhailovskoye-Yaroslavl |Михайловское; Михайловское поселение под Ярославлем |57,69, 39,81 (750-1000AD) |-   |-   |-   |-   |140 |680  |-     |
|Petrovskoye-Yaroslavl    |Петровское; Петровское поселение                    |57,52, 39,79 (750-1000AD) |-   |-   |-   |-   |120 |540  |-     |
|Kleshchino               |Клещино; Клещинское городище                        |56,78, 38,84 (450-1100AD) |-   |-   |85  |150 |310 |880  |-     |
|Volosovo                 |Волосово; Волосовский комплекс                      |55,64, 42,18 (350-900AD)  |-   |80  |120 |165 |210 |280  |-     |
|Yurievskaya Gorka        |Юрьевская Горка; Удомля                             |57,92, 35,02 (350-900AD)  |-   |45  |95  |135 |160 |210  |-     |
|Bereznyaki               |Березняки; Городище Березняки                       |57,98, 38,92 (250-600AD)  |55  |70  |65  |50  |-   |-    |-     |
|Izbriszhye               |Избрижье; Избрижский комплекс                       |56,81, 35,62 (450-1000AD) |-   |-   |65  |110 |175 |340  |-     |
|Kamno                    |Камно; Камновское городище                          |57,83, 28,21 (250-1000AD) |75  |110 |150 |220 |340 |520  |-     |
|Pskov                    |Псков; Псковское городище; Pleskau                  |57,82, 28,33 (350-1900AD) |-   |95  |160 |290 |520 |1,6k |31,2k |
|Izborsk                  |Изборск; Труворово городище; Старый Изборск         |57,71, 27,86 (600-1900AD) |-   |-   |-   |120 |290 |750  |950   |
|Vybuty                   |Выбуты; Выбутское поселение                         |57,72, 28,27 (600-1000AD) |-   |-   |-   |85  |160 |340  |-     |
|Velye                    |Велье; Вельское городище                            |56,98, 28,92 (450-1900AD) |-   |-   |70  |110 |185 |360  |1,2k  |
|Staraya Ladoga           |Старая Ладога; Aldeigjuborg; Ладога                 |60,00, 32,30 (600-1900AD) |-   |-   |-   |80  |280 |1,8k |1k    |
|Lyubsha                  |Любша; Любшанское городище                          |60,02, 32,31 (600-900AD)  |-   |-   |-   |95  |190 |120  |-     |
|Rurikovo Gorodishche     |Рюриково городище; Городище на Волхове; Holmgardr   |58,49, 31,30 (750-1200AD) |-   |-   |-   |-   |160 |1,4k |-     |
|Veliky Novgorod          |Великий Новгород; Новгород                          |58,52, 31,28 (750-1900AD) |-   |-   |-   |-   |140 |2,2k |26,5k |
|Staraya Russa            |Старая Русса; Руса                                  |57,99, 31,36 (750-1900AD) |-   |-   |-   |-   |130 |680  |15,8k |
|Belozersk                |Белозерск; Белоозеро; Крутик                        |60,03, 37,78 (600-1900AD) |-   |-   |-   |70  |190 |950  |5,2k  |
|Toropets                 |Торопец; Торопецкое городище                        |56,50, 31,64 (450-1900AD) |-   |-   |75  |125 |220 |580  |7,6k  |
|Gnezdovo                 |Гнездово; Гнездовский комплекс                      |54,78, 31,87 (600-1000AD) |-   |-   |-   |90  |240 |1,9k |-     |
|Tushemlya                |Тушемля; Тушемлинское городище                      |54,31, 32,12 (250-750AD)  |70  |105 |135 |150 |95  |-    |-     |

# Middle Volga, Kama-Vyatka, and Cis-Ural Settlements

Table \ref{tab:reg3-sites} lists `44` excavated hillforts and village complexes across the Samara Bend, Middle Volga, Kama, Vyatka, Belaya, and Sylva basins, representing the Imenkovo, Azelino, Mazunino, Turaevo, Bakhmutino, Turbasly, Kushnarenkovo, Nevolino, Lomovatovo, and Polom cultures [@vyazov2019middle; @goldina1999drevnyaya; @goldina2012nevolino; @bakhshiev2017bakhmutino; @nazarov2025lomovatovo].

Table: Middle Volga, Kama-Vyatka, and Cis-Ural Settlements and Population Estimates (250AD - 1900AD).

|Settlement           |Historical / Native Names                          |Coords & Span             |250 |350 |450 |600 |750 |900  |1900  |
|:--------------------|:--------------------------------------------------|:-------------------------|:---|:---|:---|:---|:---|:----|:-----|
|Staroye Romashkino   |Старое Ромашкино                                   |55,31, 50,85 (350-900AD)  |-   |140 |280 |420 |160 |240  |-     |
|Maklasheevka II      |Маклашеевка II; Маклашеевское городище             |55,12, 48,95 (250-900AD)  |120 |210 |350 |480 |220 |380  |-     |
|Shcherbet            |Щербеть; Щербетьский островной комплекс            |55,02, 49,28 (350-900AD)  |-   |110 |240 |360 |180 |290  |-     |
|Tetyushskoye II      |Тетюшское II городище; Тетюши                      |54,94, 48,84 (100-1900AD) |160 |240 |320 |390 |240 |480  |4,9k  |
|Komintern II         |Коминтерн II                                       |55,08, 49,12 (350-750AD)  |-   |130 |260 |380 |190 |-    |-     |
|Balymery             |Балымеры; Балымерское городище; Шолом              |54,99, 49,02 (350-1000AD) |-   |115 |210 |310 |260 |650  |-     |
|Karmaly              |Кармалы; Кармалинское городище                     |53,36, 49,52 (350-750AD)  |-   |95  |180 |270 |140 |-    |-     |
|Imenkovo             |Именьково; Именьковское городище                   |55,41, 49,68 (350-1900AD) |-   |130 |250 |340 |190 |320  |870   |
|Rozhdestveno-Volga   |Рождествено                                        |55,48, 49,55 (350-900AD)  |-   |110 |210 |290 |180 |340  |-     |
|Troitskiy Uray       |Троицкий Урай                                      |55,43, 50,11 (250-750AD)  |90  |150 |230 |310 |175 |-    |-     |
|Lugovskoye           |Луговское; Луговское поселение                     |55,62, 51,84 (250-750AD)  |85  |135 |190 |240 |150 |-    |-     |
|Novinki              |Новинки; Новинковский комплекс                     |53,21, 49,78 (350-750AD)  |-   |90  |170 |260 |340 |-    |-     |
|Muromskiy Gorodok    |Муромский Городок; Валы                            |53,34, 49,42 (450-1200AD) |-   |-   |120 |210 |420 |2,8k |-     |
|Belaya Gora          |Белая Гора; Белогорское городище на Самарской Луке |53,28, 49,89 (350-750AD)  |-   |80  |145 |210 |130 |-    |-     |
|Osh-Pando-Ner        |Ош-Пандо-Нерь; Сайнино; Шемурша                    |54,45, 46,52 (250-900AD)  |95  |160 |220 |260 |210 |250  |-     |
|Ashna-Pando          |Ашна-Пандо                                         |54,38, 46,41 (250-750AD)  |80  |135 |185 |220 |180 |-    |-     |
|Tigashevo            |Тигашево; Тигашевское городище                     |55,04, 47,52 (600-1000AD) |-   |-   |-   |110 |240 |680  |-     |
|Chortovo Gorodishche |Чертово городище; Елабужское городище              |55,75, 52,03 (100-1000AD) |190 |240 |220 |260 |320 |680  |-     |
|Yelabuga             |Елабуга; Алабуга                                   |55,76, 52,05 (600-1900AD) |-   |-   |-   |180 |260 |550  |10,1k |
|Azelino              |Азелино; Азелинский комплекс                       |56,92, 50,45 (250-600AD)  |140 |210 |230 |180 |-   |-    |-     |
|Suvorovskoye         |Суворовское; Суворовский комплекс на Вятке         |56,84, 50,32 (250-600AD)  |110 |175 |195 |160 |-   |-    |-     |
|Buyskoye             |Буйское городище; Буйский Перевоз                  |56,88, 49,89 (100-750AD)  |170 |210 |220 |190 |210 |-    |-     |
|Turaevo              |Тураево; Тураевские курганы и поселение            |55,98, 52,42 (250-900AD)  |130 |210 |310 |240 |190 |220  |-     |
|Tarasovo             |Тарасово; Тарасовский комплекс                     |56,35, 53,82 (100-900AD)  |240 |280 |260 |210 |180 |200  |-     |
|Mazunino             |Мазунино; Мазунинское городище                     |56,29, 53,78 (250-600AD)  |150 |220 |240 |180 |-   |-    |-     |
|Saygatskoye          |Сайгатское; Сайгатка; Чайковский                   |56,76, 54,14 (250-750AD)  |120 |185 |210 |175 |150 |-    |-     |
|Osinskoye            |Осинское городище; Оса                             |57,28, 55,45 (250-1900AD) |110 |160 |195 |230 |260 |310  |5,2k  |
|Bardymskoye          |Бардымское; Барда                                  |56,92, 55,58 (250-1900AD) |95  |145 |190 |240 |280 |320  |1,7k  |
|Brody                |Броды; Неволино; Неволинский комплекс на Сылве     |57,42, 56,95 (350-900AD)  |-   |140 |220 |340 |390 |350  |-     |
|Verkh-Sainskoye      |Верх-Саинское городище; Верх-Саи                   |57,18, 56,72 (350-900AD)  |-   |120 |185 |290 |330 |280  |-     |
|Ufa II               |Уфа-II; Городище Уфа-II; Башкир (Имендяшево)       |54,72, 55,96 (350-1200AD) |-   |220 |450 |780 |950 |1,4k |-     |
|Ufa                  |Уфа; Чертово городище в Уфе; Өфө                   |54,74, 55,97 (450-1900AD) |-   |-   |180 |340 |480 |650  |51,5k |
|Bakhmutino           |Бахмутино; Бахмутинский комплекс                   |55,38, 55,82 (250-750AD)  |130 |210 |320 |380 |290 |-    |-     |
|Turbasly             |Турбаслы; Турбаслинское городище                   |54,84, 56,08 (450-900AD)  |-   |-   |190 |360 |420 |310  |-     |
|Romanovka-Ufa        |Романовка II; Романовское поселение                |54,76, 55,89 (350-750AD)  |-   |110 |195 |280 |310 |-    |-     |
|Kushnarenkovo        |Кушнаренково                                       |55,10, 55,35 (450-1900AD) |-   |-   |140 |290 |360 |410  |2,5k  |
|Birsk                |Бирск; Бирское городище и могильник                |55,42, 55,54 (100-1900AD) |240 |320 |390 |450 |410 |480  |8,8k  |
|Kara-Yakupovo        |Кара-Якупово                                       |54,61, 55,38 (600-1000AD) |-   |-   |-   |160 |310 |420  |-     |
|Rozhdestvenskoye     |Рождественское городище; Афкула                    |58,62, 55,35 (350-1900AD) |-   |120 |240 |460 |680 |1,5k |1k    |
|Kudymkarskoye        |Кудымкарское городище; Изъюр; Кудымкар             |59,02, 54,65 (450-1900AD) |-   |-   |110 |210 |340 |520  |1,2k  |
|Anyushkar            |Анюшкар; Кыласово                                  |58,38, 56,62 (600-1200AD) |-   |-   |-   |160 |320 |750  |-     |
|Idnakar              |Иднакар; Солдырь; Глазов                           |58,14, 52,72 (600-1200AD) |-   |-   |-   |140 |340 |1,2k |-     |
|Dondykar             |Дондыкар; Дондыкарское городище                    |58,24, 52,51 (600-1200AD) |-   |-   |-   |110 |240 |650  |-     |
|Polomskoye           |Поломское городище; Полом                          |57,72, 53,85 (450-1000AD) |-   |-   |130 |260 |390 |680  |-     |

# Open Pontic-Caspian Steppe Settlements

Table \ref{tab:reg4-sites} lists `16` excavated emporia, seasonal winter camps, river-delta towns, and Khazar brick and stone fortresses across the Lower Don, Lower Volga, and Southern Trans-Ural steppe [@shchukin2005gotskiy; @botalov2009gunny; @kazanski2020steppe].

Table: Open Pontic-Caspian Steppe Settlements and Population Estimates (250AD - 1900AD).

|Settlement                    |Historical / Native Names                            |Coords & Span             |250  |350 |450 |600 |750  |900  |1900 |
|:-----------------------------|:----------------------------------------------------|:-------------------------|:----|:---|:---|:---|:----|:----|:----|
|Tanais                        |Танаис; Недвиговское городище                        |47,27, 39,34 (100-600AD)  |3,2k |280 |420 |140 |-    |-    |-    |
|Nedvigovka-Steppe             |Недвиговка; Нижне-Донское поселение                  |47,27, 39,34 (250-1900AD) |240  |190 |260 |160 |190  |240  |2,2k |
|Kobyakovo                     |Кобяково городище; Кобяково                          |47,24, 39,84 (100-900AD)  |620  |180 |140 |-   |220  |380  |-    |
|Sukho-Chaltyrskoye            |Сухо-Чалтырское городище; Чалтырь                    |47,26, 39,52 (100-900AD)  |310  |120 |-   |-   |180  |310  |-    |
|Rovnoye                       |Ровное; Ровненский комплекс; Зельман                 |50,78, 46,05 (100-1900AD) |120  |90  |150 |110 |130  |180  |7,1k |
|Pokrovsk-Steppe               |Покровск-Степь; Энгельсский комплекс                 |51,48, 46,12 (100-750AD)  |130  |110 |180 |140 |160  |-    |-    |
|Leninsk-Steppe                |Ленинск-Курганы; Пришиб                              |48,70, 45,20 (100-1900AD) |110  |85  |140 |120 |150  |210  |5,1k |
|Verkhneye Pogromnoye          |Верхнее Погромное; Погромновский комплекс            |48,92, 45,08 (100-750AD)  |95   |75  |130 |110 |140  |-    |-    |
|Sarkel                        |Саркел; Белая Вежа; Левобережное Цимлянское городище |47,70, 42,27 (750-1100AD) |-    |-   |-   |-   |320  |2,5k |-    |
|Pravoberezhnoye Tsimlyanskoye |Правобережное Цимлянское городище; Цимлянское        |47,66, 42,19 (750-900AD)  |-    |-   |-   |-   |420  |1,1k |-    |
|Semikarakorskoye              |Семикаракорское городище; Семикаракорск              |47,53, 40,82 (600-1900AD) |-    |-   |-   |140 |580  |1,6k |6,8k |
|Karnaukhovskoye               |Карнауховское городище; Карнауховский                |47,62, 42,11 (750-1000AD) |-    |-   |-   |-   |240  |680  |-    |
|Semibugry                     |Семибугры; Atil                                      |46,15, 48,24 (600-1000AD) |-    |-   |-   |280 |4,5k |18k  |-    |
|Barany Bugor                  |Бараний Бугор; Хазарский комплекс Бараний Бугор      |46,18, 48,21 (600-900AD)  |-    |-   |-   |220 |1,8k |4,2k |-    |
|Samosdelka                    |Самосделка; Самосдельское городище; Саксин           |46,03, 47,84 (750-1200AD) |-    |-   |-   |-   |650  |3,5k |-    |
|Uelgi                         |Уелги                                                |55,78, 61,55 (600-1000AD) |-    |-   |-   |120 |240  |360  |-    |

# North Caucasus and Caspian Corridor Settlements

Table \ref{tab:reg5-sites} lists `22` excavated fortress cities, terraced mountain strongholds, and coastal settlements across Dagestan, the Central Caucasus (Alanian Kislovodsk and Kuban valleys), and the Taman-Black Sea littoral [@gadzhiev2002derbent; @gmyrya2022palasa; @korobov2013terraced; @mastykova2009kuban].

Table: North Caucasus and Caspian Corridor Settlements and Population Estimates (250AD - 1900AD).

|Settlement         |Historical / Native Names                        |Coords & Span             |250  |350  |450  |600  |750   |900  |1900  |
|:------------------|:------------------------------------------------|:-------------------------|:----|:----|:----|:----|:-----|:----|:-----|
|Derbent            |Дербент; Чор; Баб аль-Абваб; Нарын-Кала          |42,06, 48,29 (100-1900AD) |2,6k |3,8k |5,5k |9,5k |12,5k |18k  |15,2k |
|Torpakh-Kale       |Торпах-Кала; Шахристан                           |41,91, 48,38 (250-900AD)  |650  |1,4k |2,2k |2,8k |1,2k  |650  |-     |
|Urtseki            |Урцеки; Варачан; Урцекское городище              |42,71, 47,56 (100-900AD)  |950  |1,6k |2,4k |3,8k |2,2k  |850  |-     |
|Verkhniy Chir-Yurt |Верхний Чирюрт; Беленджер; Чирюртовское городище |43,16, 46,92 (250-900AD)  |600  |1,4k |2,8k |7,5k |9,5k  |3,2k |-     |
|Tarki              |Тарки; Семендер; Таркинское городище             |42,95, 47,49 (250-1900AD) |450  |850  |1,4k |3,2k |6,5k  |8,5k |2,5k  |
|Andreyaul          |Андрейаул; Эндирей                               |43,18, 46,66 (250-1900AD) |380  |680  |1,1k |1,8k |2,4k  |2,9k |4,4k  |
|Alkhan-Kala        |Алхан-Кала                                       |43,26, 45,55 (100-900AD)  |1,4k |1,8k |1,1k |1,4k |1,6k  |1,9k |-     |
|Yandare            |Яндаре                                           |43,24, 44,92 (250-900AD)  |280  |420  |540  |680  |820   |950  |-     |
|Gazi-Yurt          |Гази-Юрт; Магасский комплекс; Городище Гази-Юрт  |43,21, 44,84 (250-1200AD) |340  |520  |680  |950  |1,4k  |2,6k |-     |
|Zmeyskaya          |Змейская; Верхний Джулат; Татартуп               |43,33, 44,15 (250-1900AD) |320  |480  |640  |880  |1,2k  |2,1k |1,9k  |
|Nizhniy Dzhulat    |Нижний Джулат; Майский комплекс                  |43,62, 44,05 (100-1200AD) |620  |780  |920  |1,1k |1,5k  |2,2k |-     |
|Gornoe Ekho        |Горное Эхо; Кисловодская котловина               |43,88, 42,68 (250-900AD)  |140  |220  |310  |440  |520   |480  |-     |
|Rim-Gora           |Рим-Гора; Рим-Горское городище                   |43,92, 42,55 (450-1200AD) |-    |-    |240  |480  |850   |1,6k |-     |
|Klin-Yar           |Клин-Яр; Поселение и могильник Клин-Яр III       |43,91, 42,66 (100-900AD)  |340  |420  |520  |680  |780   |650  |-     |
|Mokraya Balka      |Мокрая Балка; Крепость Мокрая Балка              |43,87, 42,74 (450-900AD)  |-    |-    |180  |310  |420   |360  |-     |
|Khumara            |Хумара; Хумаринское городище; Схауат (Калеж)     |43,86, 41,91 (250-1900AD) |180  |280  |450  |850  |2,2k  |3,5k |1,5k  |
|Nizhniy Arkhyz     |Нижний Архыз                                     |43,69, 41,48 (600-1200AD) |-    |-    |-    |380  |950   |3,2k |-     |
|Gilyach            |Гиляч; Гилячское городище                        |43,72, 41,94 (350-1000AD) |-    |160  |280  |420  |580   |820  |-     |
|Tsemdolina         |Цемдолина; Борисовский комплекс                  |44,75, 37,71 (250-1900AD) |190  |280  |390  |480  |420   |380  |17,5k |
|Dyurso             |Дюрсо; Комплекс на реке Дюрсо                    |44,69, 37,56 (450-900AD)  |-    |-    |240  |380  |460   |520  |-     |
|Phanagoria         |Фанагория; Сенной                                |45,28, 36,97 (100-1000AD) |4,2k |2,8k |1,8k |2,4k |3,5k  |4,2k |-     |
|Tamatarkha         |Таматарха; Гермонасса; Тмутаракань; Тамань       |45,22, 36,72 (100-1900AD) |2,9k |2,2k |1,9k |2,6k |4,2k  |6,5k |4,4k  |

# Western and Southern Siberian Settlements

Table \ref{tab:reg6-sites} lists `23` excavated fortified settlements, iron-working villages, and agro-pastoral centres across the Tobol-Irtysh, Middle and Lower Ob, Minusinsk Basin, Russian Altai, and Lake Baikal regions, covering the Sargat, Potchevash, Relka, Tashtyk, Bulan-Koby, Early Turkic, and Kurykan traditions [@matveeva2000sargat; @zelenkov2025potchevash; @azbelev2007oglakhty; @seregin2021altai; @kharinsky2005baikal].

Table: Western and Southern Siberian Settlements and Population Estimates (250AD - 1900AD).

|Settlement        |Historical / Native Names                        |Coords & Span              |250 |350 |450 |600 |750 |900 |1900 |
|:-----------------|:------------------------------------------------|:--------------------------|:---|:---|:---|:---|:---|:---|:----|
|Rafailovskoye     |Рафайловское городище; Рафайлово                 |56,42, 65,18 (100-450AD)   |260 |110 |65  |-   |-   |-   |-    |
|Pavlinovo         |Павлиново; Павлиновское городище                 |56,31, 64,92 (100-350AD)   |210 |95  |-   |-   |-   |-   |-    |
|Potchevash        |Потчеваш; Чувашский Мыс; Потчевашское городище   |58,16, 68,28 (100-1500AD)  |180 |240 |310 |360 |410 |480 |-    |
|Tobolsk           |Тобольск; Искер (Кашлык); Сибирь                 |58,20, 68,25 (450-1900AD)  |-   |-   |180 |260 |340 |450 |21k  |
|Suzgun            |Сузгун; Сузгунское городище                      |58,12, 68,31 (250-900AD)   |110 |150 |195 |240 |280 |320 |-    |
|Peregrebnoye      |Перегребное                                      |62,98, 65,05 (250-900AD)   |80  |110 |135 |160 |185 |210 |-    |
|Barsova Gora      |Барсова Гора; Барсов Городок; Сургутское Приобье |61,26, 73,18 (100-1200AD)  |210 |260 |320 |390 |450 |520 |-    |
|Ust-Poluy         |Усть-Полуй; Салехард (Обдорск)                   |66,53, 66,60 (100-1900AD)  |110 |85  |-   |95  |115 |140 |920  |
|Timiryazevo I     |Тимирязево I; Тимирязевское городище             |56,48, 84,88 (250-900AD)   |95  |130 |180 |310 |380 |420 |-    |
|Tomsk             |Томск; Тоянов Городок; Эушта                     |56,49, 84,95 (350-1900AD)  |-   |110 |150 |240 |310 |380 |55k  |
|Basandayka        |Басандайка; Басандайское городище                |56,42, 84,97 (350-1200AD)  |-   |90  |135 |220 |290 |360 |-    |
|Relka             |Рёлка; Могильник и поселение Рёлка; Молчаново    |57,58, 83,76 (450-900AD)   |-   |-   |120 |240 |310 |280 |-    |
|Igrekovo          |Игреково; Игрековское городище                   |56,82, 86,12 (350-900AD)   |-   |85  |130 |195 |250 |290 |-    |
|Oglakhty          |Оглахты; Оглахтинский комплекс                   |54,05, 91,45 (100-900AD)   |620 |550 |420 |460 |510 |580 |-    |
|Uybatskiy Chaatas |Уйбатский чаатас; Уйбатский замок и поселение    |53,72, 90,38 (250-1000AD)  |280 |340 |390 |480 |620 |750 |-    |
|Kopenskiy Chaatas |Копенский чаатас; Копены                         |54,42, 91,28 (350-900AD)   |-   |210 |280 |410 |580 |690 |-    |
|Srostki-1         |Сростки-1; Сросткинское поселение и курганы      |52,42, 85,70 (450-1900AD)  |-   |-   |130 |210 |360 |520 |2,2k |
|Odintsovka        |Одинцовка; Одинцовский комплекс (Верхняя Обь)    |52,48, 85,15 (250-750AD)   |140 |220 |280 |340 |310 |-   |-    |
|Kok-Pash          |Кок-Паш; Кок-Пашский комплекс в долине Чулышмана |50,85, 87,92 (100-900AD)   |260 |320 |340 |410 |380 |350 |-    |
|Katanda           |Катанда; Катандинский комплекс                   |50,15, 86,18 (100-1900AD)  |210 |260 |290 |380 |420 |390 |650  |
|Elga VII          |Елга VII; Шидэ                                   |53,05, 106,88 (100-900AD)  |95  |110 |120 |145 |170 |195 |-    |
|Mankhay I         |Манхай I; Манхайское городище (Кудинская долина) |52,78, 104,85 (450-1000AD) |-   |-   |140 |280 |450 |620 |-    |
|Kurumchinskoye    |Курумчинское городище; Курумчинский комплекс     |53,12, 105,42 (450-1000AD) |-   |-   |120 |260 |420 |580 |-    |

# Regional Gazetteer Summary

Table \ref{tab:regional-summary} summarises the number of catalogued settlements and the combined excavated sample population across the six regions from `250AD` to `1900AD`.

Table: Combined Sample Population across the 198 Gazetteer Settlements by Region (250AD - 1900AD).

|Region (Sites)                                       |250AD |350AD |450AD |600AD |750AD  |900AD  |1900AD |
|:----------------------------------------------------|:-----|:-----|:-----|:-----|:------|:------|:------|
|1. European Forest-Steppe (n = 38)                   |1,4k  |2,6k  |2,2k  |3,2k  |7,1k   |14,7k  |113,8k |
|2. Mixed and Boreal Forest Zone (n = 55)             |3,1k  |4,6k  |6k    |7,5k  |11,1k  |28,6k  |181,5k |
|3. Middle Volga, Kama-Vyatka, and Cis-Urals (n = 44) |2,5k  |5,3k  |8,6k  |12,3k |12k    |18,3k  |88k    |
|4. Open Pontic-Caspian Steppe (n = 16)               |4,8k  |1,1k  |1,4k  |1,5k  |9,9k   |33,3k  |21,2k  |
|5. North Caucasus and Caspian Corridor (n = 22)      |16,5k |20,1k |25,6k |43k   |55,7k  |66,1k  |47,4k  |
|6. Western and Southern Siberia (n = 23)             |2,9k  |3,5k  |4,4k  |6,1k  |7,5k   |8,5k   |79,8k  |
|Total Gazetteer Sample (n = 198)                     |31,2k |37,2k |48,2k |73,7k |103,3k |169,5k |531,7k |

# Sources

::: {#refs}
:::

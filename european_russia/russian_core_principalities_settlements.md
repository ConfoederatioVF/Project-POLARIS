---
title: "SETTLEMENT GAZETTEER OF THE RUSSIAN CORE PRINCIPALITIES."
subtitle: "Supplementary Tabular Directory and Settlement Population Histories across Kievan Rus, Volga Bulgaria, Muscovy, and Imperial European Russia (10000BC - 1900AD)."
date: "8 November 2026"
authors_line: "Aust Kätzchen"
emails:
  - austkaeztchen@confoederatio.org
hero_figure: "figures/fig1_principalities_areal_masks_map.png"
hero_caption: "Regional boundaries, hydrological catchments, and principal settlements across the eight historical clusters of the Russian Core catalogued in russian_core_principalities_settlements.json."
hero_label: "fig:hero"
bibliography: russian_core_principalities_areal_masks_and_bins.bib
csl: crd-mla-numeric.csl
link-citations: true
output:
  pdf_document:
    template: template.tex
    latex_engine: xelatex
    keep_tex: false
---







# Overview

This supplementary report presents the tabular settlement gazetteer (`russian_core_principalities_settlements.json`) accompanying the regional demographic review of the Russian Core Principalities (`russian_core_principalities_areal_masks_and_bins.pdf`). The JSON dataset contains 258 individual settlements across the eight regional clusters of European Russia (Novgorod and the Russian North, Vladimir-Suzdal and Rostov-Yaroslavl, Moscow and Tver, Ryazan and the Upper Oka, Smolensk and the Upper Dnieper, the Bryansk-Kursk-Voronezh Forest-Steppe, Nizhny Novgorod-Vyatka-Great Perm, and the Middle Volga and Cis-Urals) from 10000BC to 1900AD, formatted in the `population_Stadester` structure (keyed by `"<Name>-Russia"`, with `name`, `other_names`, `coords`, `country`, `key` and positive-integer `population` maps).

Population figures are compiled from excavated dwelling floors and settlement plans for Mesolithic, Neolithic, Bronze Age and Early Iron Age sites [@Zhilin2019; @Oshibkina2006; @Kostyleva2014; @Kostyleva2022; @Nordqvist2020; @Engovatova2021], walled urban footprints (`detinets` and `okolny gorod`) and unfortified `posad` areas for Kievan Rus, Volga Bulgaria and Golden Horde towns [@Tikhomirov1956; @Kuza1989; @Kuza1996; @Nosov1990; @Darkevich1995; @Eniosova2012; @Khuzin2001; @Rudenko2012; @Nedashkovsky2000; @Belorybkin2022; @Belavin2023], and Muscovite cadastral books (`pistsovye knigi`), Imperial poll-tax revisions (`revizii`) and the 1897 First General Census for early modern and nineteenth-century towns [@Kopanev1959; @Shapiro1971; @Vodarsky1973; @Vodarsky1977; @Kabuzan1963; @Kabuzan1971; @Rashin1956; @Mironov2000; @Troynitsky1905].

# Prehistoric, Bronze Age, and Early Iron Age Settlements (10000BC - 800AD)

Table: Prehistoric, Neolithic, Bronze Age and Early Iron Age settlements of the Russian Core (10000BC - 800AD) compiled from russian_core_principalities_settlements.json.

|Settlement                 |Alternative Names                           |Coords           |Occupied Span |Population Estimates by Date                            |
|:--------------------------|:-------------------------------------------|:----------------|:-------------|:-------------------------------------------------------|
|Sungir                     |Soun-Guir; Vladimir Upper Palaeolithic      |56,18°N, 40,50°E |10000-8500BC  |10000BC: 35; 8500BC: 40                                 |
|Zaraysk Palaeolithic       |Zarayskaya Stoyanka                         |54,76°N, 38,87°E |10000-8500BC  |10000BC: 30; 8500BC: 35                                 |
|Stanovoye 4                |Stanovoe 4; Podozerskoye Bog                |57,03°N, 40,18°E |8000-5000BC   |8000BC: 25; 6500BC: 40; 5000BC: 50                      |
|Ivanovskoye 7              |Ivanovskoe Bog; Lake Nero Mesolithic        |57,13°N, 39,22°E |7500-4000BC   |7500BC: 30; 6000BC: 45; 4000BC: 65                      |
|Nizhneye Veretye I         |Veretye I; Kinema River                     |60,42°N, 38,95°E |7000-6000BC   |7000BC: 45; 6000BC: 55                                  |
|Zamostye 2                 |Zamostje 2; Dubna Bog                       |56,63°N, 37,78°E |6500-4200BC   |6500BC: 35; 5500BC: 45; 4200BC: 60                      |
|Lyalovo                    |Ljalovo; Klyazma Neolithic                  |56,05°N, 37,23°E |4500-3200BC   |4500BC: 50; 3800BC: 75; 3200BC: 65                      |
|Sakhtysh IIa               |Sakhtysh II; Kojka Bog                      |56,78°N, 40,48°E |4500-2500BC   |4500BC: 65; 3200BC: 140; 2500BC: 160                    |
|Sakhtysh VIII              |Sakhtysh 8; Teykovo Bog                     |56,79°N, 40,49°E |4200-2400BC   |4200BC: 50; 3000BC: 110; 2400BC: 120                    |
|Volosovo                   |Volosovskaya Stoyanka; Oka Eneolithic       |55,62°N, 42,12°E |3500-2200BC   |3500BC: 90; 2800BC: 145; 2200BC: 130                    |
|Volosovo-Danilovsky        |Fatyanovo Danilov                           |58,18°N, 40,17°E |2600-1900BC   |2600BC: 110; 2200BC: 150; 1900BC: 120                   |
|Fatyanovo                  |Fatjanovo; Tolga Bronze Age                 |57,72°N, 39,83°E |2500-2100BC   |2500BC: 95; 2100BC: 130                                 |
|Seima Dune                 |Seyminskiy Mogilnik; Volosovo-Seima         |56,22°N, 43,18°E |2100-1700BC   |2100BC: 120; 1700BC: 160                                |
|Galich Hoard Settlement    |Turovskoye Galich                           |58,39°N, 42,34°E |2000-1600BC   |2000BC: 85; 1600BC: 125                                 |
|Pozdnyakovo                |Pozdnjakovo; Murom Bronze Age               |55,53°N, 42,08°E |1600-1200BC   |1600BC: 130; 1200BC: 175                                |
|Govyadinovo                |Govjadinovo; Kostroma Bronze Age            |57,82°N, 40,85°E |1400-900BC    |1400BC: 90; 900BC: 130                                  |
|Dyakovo Gorodishche        |Djakovo; Kolomenskoye Hillfort              |55,66°N, 37,67°E |500BC - 500AD |500BC: 80; 200BC: 110; 1AD: 125; 300AD: 140; 500AD: 110 |
|Shcherbinskoye Gorodishche |Shcherbinka Hillfort; Pakhra Iron Age       |55,48°N, 37,59°E |500BC - 500AD |500BC: 75; 1AD: 115; 300AD: 130; 500AD: 95              |
|Troitskoye Gorodishche     |Troitskoe Hillfort; Mozhaisk Iron Age       |55,53°N, 35,97°E |400BC - 500AD |400BC: 90; 1AD: 140; 250AD: 165; 500AD: 120             |
|Borsheva Gorodishche       |Borshevo Moskva; Ramenskoye Iron Age        |55,51°N, 38,08°E |300BC - 600AD |300BC: 70; 1AD: 110; 350AD: 135; 600AD: 150             |
|Supruty Gorodishche        |Supruty on Upa                              |54,02°N, 37,13°E |1-900AD       |1AD: 110; 800AD: 350                                    |
|Moshchiny Gorodishche      |Moschiny Hillfort                           |54,45°N, 35,13°E |200-700AD     |200AD: 90; 450AD: 180; 700AD: 150                       |
|Ufa                        |Ufa II Gorodishche; Imenkovo-Bakhmutino Ufa |54,74°N, 55,97°E |400-1900AD    |400AD: 800; 700AD: 1,5k                                 |
|Kamno Gorodishche          |Kamno Pskov                                 |57,84°N, 28,20°E |500-950AD     |500AD: 220; 750AD: 420                                  |
|Pskov                      |Pleskov                                     |57,82°N, 28,33°E |600-1900AD    |600AD: 350                                              |
|Lyubsha Fortress           |Ljubshanskoye Gorodishche                   |60,02°N, 32,32°E |700-880AD     |700AD: 180; 800AD: 320                                  |
|Sarskoye Gorodishche       |Sara River Hillfort                         |57,08°N, 39,29°E |700-1000AD    |700AD: 250                                              |
|Izborsk                    |Truvorovo Gorodishche; Stary Izborsk        |57,71°N, 27,86°E |750-1900AD    |750AD: 350                                              |
|Staraya Ladoga             |Aldeigjuborg; Ladoga                        |60,00°N, 32,30°E |750-1900AD    |750AD: 250                                              |
|Borshevo                   |Borshevskoye Gorodishche                    |51,32°N, 39,06°E |800-1050AD    |800AD: 420                                              |
|Mayatskoye                 |Mayaki Khazar Fortress                      |50,98°N, 39,30°E |800-900AD     |800AD: 900                                              |

# Kievan Rus, Volga Bulgaria, and Golden Horde Settlements (850 - 1500AD)

Table: Medieval Kievan Rus, Volga Bulgaria, Great Perm and Golden Horde settlements of the Russian Core (850 - 1500AD) compiled from russian_core_principalities_settlements.json.

|Settlement            |Historical Names                            |Coords           |1000AD |1150AD |1200-1235AD |1300-1350AD |1500AD |
|:---------------------|:-------------------------------------------|:----------------|:------|:------|:-----------|:-----------|:------|
|Supruty Gorodishche   |Supruty on Upa                              |54,02°N, 37,13°E |550    |-      |-           |-           |-      |
|Ufa                   |Ufa II Gorodishche; Imenkovo-Bakhmutino Ufa |54,74°N, 55,97°E |1,2k   |-      |-           |-           |-      |
|Kamno Gorodishche     |Kamno Pskov                                 |57,84°N, 28,20°E |650    |-      |-           |-           |-      |
|Pskov                 |Pleskov                                     |57,82°N, 28,33°E |3,5k   |-      |10,0k       |14,0k       |28,0k  |
|Lyubsha Fortress      |Ljubshanskoye Gorodishche                   |60,02°N, 32,32°E |220    |-      |-           |-           |-      |
|Sarskoye Gorodishche  |Sara River Hillfort                         |57,08°N, 39,29°E |400    |-      |-           |-           |-      |
|Izborsk               |Truvorovo Gorodishche; Stary Izborsk        |57,71°N, 27,86°E |1,4k   |-      |2,2k        |-           |2,4k   |
|Staraya Ladoga        |Aldeigjuborg; Ladoga                        |60,00°N, 32,30°E |2,5k   |-      |2,0k        |-           |1,2k   |
|Borshevo              |Borshevskoye Gorodishche                    |51,32°N, 39,06°E |950    |-      |-           |-           |-      |
|Mayatskoye            |Mayaki Khazar Fortress                      |50,98°N, 39,30°E |1,6k   |-      |-           |-           |-      |
|Bolshoye Timerovo     |Timeriovo                                   |57,56°N, 39,77°E |500    |-      |-           |-           |-      |
|Gnezdovo              |Gnyozdovo; Old Smolensk                     |54,78°N, 31,87°E |2,2k   |-      |-           |-           |-      |
|Gornal                |Bolshoye Gornalskoye                        |51,07°N, 35,22°E |900    |-      |-           |-           |-      |
|Idnakar               |Soldyrskoye Gorodishche                     |58,14°N, 52,71°E |1,8k   |2,5k   |1,2k        |-           |-      |
|Rurikovo Gorodishche  |Holmgard; Gorodishche on Volkhov            |58,49°N, 31,30°E |1,5k   |-      |1,1k        |-           |600    |
|Titchikha             |Titchikhinskoye Gorodishche                 |51,15°N, 39,19°E |1,1k   |-      |-           |-           |-      |
|Belozersk             |Beloozero; Krutik                           |60,03°N, 37,79°E |900    |2,8k   |4,8k        |5,2k        |4,5k   |
|Murom                 |Chaadaevo; Turom                            |55,58°N, 42,05°E |3,2k   |-      |8,5k        |4,5k        |5,8k   |
|Rostov Veliky         |Rostov                                      |57,19°N, 39,41°E |4,5k   |8,5k   |14,0k       |10,0k       |9,0k   |
|Smolensk              |Smolensk-on-Dnieper                         |54,78°N, 32,04°E |6,0k   |12,0k  |25,0k       |18,0k       |16,0k  |
|Bolgar                |Velikiy Bolgar; Spassk-Tatarskiy            |54,99°N, 49,06°E |15,0k  |-      |25,0k       |50,0k       |6,0k   |
|Staraya Ryazan        |Old Ryazan; Shatrishche                     |54,40°N, 40,43°E |3,5k   |9,0k   |24,0k       |2,5k        |900    |
|Suzdal                |Souzdal                                     |56,42°N, 40,45°E |3,0k   |7,0k   |12,0k       |8,0k        |7,5k   |
|Suvar                 |Kuznechikha                                 |54,69°N, 49,42°E |10,0k  |-      |15,0k       |-           |-      |
|Veliky Novgorod       |Novgorod; Gospodin Velikiy Novgorod         |58,52°N, 31,27°E |10,0k  |18,0k  |28,0k       |32,0k       |26,0k  |
|Bilyar                |Bilyarsk; Velikiy Gorod                     |54,99°N, 50,39°E |6,0k   |28,0k  |60,0k       |4,0k        |-      |
|Gochevo               |Gochevskoye Gorodishche                     |51,18°N, 35,82°E |800    |2,2k   |3,5k        |1,2k        |-      |
|Muromskiy Gorodok     |Samarskaya Luka Bulgar Town                 |53,34°N, 49,48°E |3,5k   |9,0k   |12,0k       |-           |-      |
|Uglich                |Uglitsch; Uglichskoye Pole                  |57,53°N, 38,33°E |800    |-      |4,0k        |3,8k        |6,5k   |
|Kursk                 |Kursk-on-Tuskar                             |51,74°N, 36,19°E |1,5k   |4,5k   |8,5k        |-           |-      |
|Bryansk               |Debryansk; Chashin Kurgan                   |53,25°N, 34,37°E |900    |2,2k   |-           |6,5k        |7,5k   |
|Belgorod              |Belgorod-Severskiy; Sarksiy                 |50,60°N, 36,59°E |900    |-      |-           |-           |-      |
|Cherdyn               |Velikaya Perm; Pokcha                       |60,40°N, 56,48°E |800    |-      |-           |1,8k        |3,2k   |
|Dzhuketau             |Zhukotin; Chistopol-Bulgar                  |55,38°N, 50,61°E |2,5k   |-      |8,5k        |12,0k       |3,5k   |
|Staraya Russa         |Rusa                                        |57,99°N, 31,36°E |2,0k   |-      |6,5k        |7,5k        |8,5k   |
|Toropets              |Toropez; Krivich Toropets                   |56,50°N, 31,64°E |1,4k   |2,5k   |4,2k        |3,8k        |4,8k   |
|Torzhok               |Novy Torg                                   |57,04°N, 34,96°E |1,2k   |-      |5,0k        |4,2k        |5,5k   |
|Vladimir              |Vladimir-on-Klyazma                         |56,13°N, 40,41°E |1,5k   |4,5k   |22,0k       |11,0k       |8,0k   |
|Vshchizh              |Vschizh on Desna                            |53,44°N, 33,79°E |1,2k   |4,5k   |-           |-           |-      |
|Yelabuga              |Alabuga; Chortovo Gorodishche               |55,76°N, 52,05°E |1,2k   |-      |2,5k        |-           |-      |
|Kazan                 |Iske Kazan; Qazan                           |55,80°N, 49,11°E |1,5k   |-      |4,0k        |-           |35,0k  |
|Yaroslavl             |Jaroslawl                                   |57,63°N, 39,88°E |1,5k   |4,0k   |9,0k        |5,5k        |9,5k   |
|Pereyaslavl-Zalessky  |Pereslavl-Zalessky                          |56,74°N, 38,86°E |-      |-      |8,0k        |7,0k        |6,2k   |
|Starodub-Seversky     |Starodub                                    |52,58°N, 32,76°E |-      |2,0k   |5,5k        |-           |4,5k   |
|Ryazan                |Pereyaslavl-Ryazanskiy                      |54,63°N, 39,69°E |-      |1,5k   |4,5k        |8,5k        |12,0k  |
|Rybinsk               |Ust-Sheksna; Rybnaya Sloboda                |58,04°N, 38,84°E |-      |900    |1,8k        |-           |1,5k   |
|Pronsk                |Pronskoye Gorodishche                       |54,12°N, 39,60°E |-      |1,8k   |5,5k        |3,5k        |3,2k   |
|Ksnyatin              |Konstantin                                  |57,15°N, 37,73°E |-      |1,2k   |2,5k        |-           |800    |
|Tver                  |Twer                                        |56,86°N, 35,92°E |-      |1,5k   |4,5k        |12,0k       |15,0k  |
|Volokolamsk           |Volok Lamskiy                               |56,04°N, 35,96°E |-      |1,6k   |3,5k        |4,0k        |4,8k   |
|Viazniki              |Yaropolch-Zalesskiy                         |56,24°N, 42,16°E |-      |1,2k   |2,2k        |-           |-      |
|Bezhetsk              |Bezhetskiy Verkh; Gorodetsk                 |57,78°N, 36,70°E |-      |1,4k   |2,8k        |-           |3,5k   |
|Mikhailov             |Mikhaylov                                   |54,23°N, 39,03°E |-      |900    |-           |-           |-      |
|Olonets               |Olonez                                      |60,98°N, 32,97°E |-      |500    |-           |-           |1,2k   |
|Roslavl               |Rostislavl-Smolenskiy                       |53,95°N, 32,86°E |-      |1,4k   |2,6k        |-           |3,2k   |
|Plyos                 |Ples                                        |57,46°N, 41,52°E |-      |900    |-           |-           |1,8k   |
|Karachev              |Karatschew                                  |53,12°N, 34,99°E |-      |1,6k   |3,0k        |-           |3,5k   |
|Kozelsk               |Kozelsk-on-Zhizdra                          |54,04°N, 35,78°E |-      |1,5k   |-           |-           |3,5k   |
|Mtsensk               |Mzenck                                      |53,28°N, 36,57°E |-      |1,4k   |-           |-           |2,8k   |
|Sevsk                 |Siewsk                                      |52,15°N, 34,49°E |-      |1,2k   |-           |-           |-      |
|Tula                  |Tula-on-Upa                                 |54,20°N, 37,62°E |-      |1,2k   |-           |2,5k        |6,5k   |
|Yelets                |Jelez                                       |52,62°N, 38,50°E |-      |2,0k   |-           |-           |3,5k   |
|Zaraysk               |Osyotr; Nikola Zarazskiy                    |54,76°N, 38,87°E |-      |1,1k   |-           |-           |-      |
|Belev                 |Belyov                                      |53,81°N, 36,14°E |-      |1,2k   |-           |-           |3,2k   |
|Moscow                |Moskva                                      |55,76°N, 37,62°E |-      |1,2k   |4,0k        |15,0k       |80,0k  |
|Vologda               |Nason-Gorod                                 |59,22°N, 39,89°E |-      |1,1k   |2,0k        |-           |4,2k   |
|Dorogobuzh            |Dorogobuzh-on-Dnieper                       |54,92°N, 33,30°E |-      |1,5k   |2,8k        |-           |4,2k   |
|Kexholm               |Korela; Priozersk                           |61,04°N, 30,13°E |-      |800    |-           |1,6k        |2,8k   |
|Tetyushi              |Temtuzi                                     |54,94°N, 48,84°E |-      |1,2k   |-           |-           |-      |
|Yelnya                |Yelna                                       |54,58°N, 33,18°E |-      |900    |-           |-           |1,6k   |
|Gorodets              |Gorodets-Radilov; Gorodets-on-Volga         |56,65°N, 43,47°E |-      |2,0k   |6,5k        |5,5k        |3,5k   |
|Kasimov               |Gorodets Meshcherskiy; Khankerman           |54,94°N, 41,40°E |-      |1,2k   |-           |2,5k        |6,5k   |
|Kideksha              |Kidekscha                                   |56,43°N, 40,53°E |-      |1,4k   |2,0k        |700         |500    |
|Kostroma              |Kostroma-on-Volga                           |57,77°N, 40,93°E |-      |1,5k   |4,5k        |5,5k        |8,5k   |
|Lgov                  |Olgov                                       |51,67°N, 35,26°E |-      |1,1k   |-           |-           |-      |
|Rylsk                 |Rylsk-on-Seym                               |51,57°N, 34,68°E |-      |2,0k   |4,5k        |-           |4,0k   |
|Starodub-on-Klyazma   |Klyazminskiy Gorodok                        |56,39°N, 41,43°E |-      |1,8k   |3,8k        |2,8k        |1,5k   |
|Yuryev-Polsky         |Yuriev-Polskiy                              |56,50°N, 39,68°E |-      |2,0k   |4,5k        |3,2k        |3,5k   |
|Zvenigorod            |Zvenigorod Moskovskiy                       |55,73°N, 36,85°E |-      |1,1k   |-           |2,2k        |3,8k   |
|Rostislavl-Ryazanskiy |Rostislavl on Oka                           |54,94°N, 38,62°E |-      |1,4k   |3,0k        |2,2k        |900    |
|Dmitrov               |Dmitrow                                     |56,34°N, 37,52°E |-      |1,4k   |3,2k        |3,8k        |5,5k   |
|Bogolyubovo           |Bogoljubowo                                 |56,20°N, 40,54°E |-      |2,5k   |3,5k        |1,2k        |900    |
|Galich                |Galich Mersky                               |58,38°N, 42,35°E |-      |1,8k   |-           |3,5k        |4,8k   |
|Trubchevsk            |Trubetsk                                    |52,58°N, 33,77°E |-      |1,8k   |3,2k        |-           |3,5k   |
|Krasny                |Krasn-Smolenskiy                            |54,56°N, 31,43°E |-      |1,1k   |-           |-           |1,5k   |
|Velikiye Luki         |Luki on Lovat                               |56,34°N, 30,53°E |-      |1,5k   |-           |2,2k        |3,8k   |
|Gorokhovets           |Gorochowez                                  |56,20°N, 42,69°E |-      |1,1k   |-           |-           |-      |
|Kolomna               |Kolomna-on-Oka                              |55,08°N, 38,78°E |-      |-      |-           |5,5k        |11,0k  |
|Kotelnich             |Koshkarov                                   |58,31°N, 48,35°E |-      |-      |800         |-           |1,8k   |
|Vyatka                |Khlynov; Kirov                              |58,60°N, 49,67°E |-      |-      |900         |-           |5,2k   |
|Bolkhov               |Bolchow                                     |53,44°N, 36,00°E |-      |-      |1,2k        |-           |-      |
|Kholm                 |Kholm-on-Lovat                              |57,15°N, 31,18°E |-      |-      |900         |-           |1,6k   |
|Kholmogory            |Cholmogeny; Ukhtostrov                      |64,22°N, 41,66°E |-      |-      |900         |-           |2,4k   |
|Mologa                |Kholopiy Gorodok                            |58,20°N, 38,44°E |-      |-      |1,5k        |-           |3,5k   |
|Velikiy Ustyug        |Gleden; Ustyug                              |60,76°N, 46,30°E |-      |-      |1,8k        |-           |3,8k   |
|Kadom                 |Stary Kadom                                 |54,56°N, 42,47°E |-      |-      |1,1k        |-           |2,5k   |
|Rzhev                 |Rzheva Volodimerova                         |56,26°N, 34,33°E |-      |-      |1,8k        |-           |5,5k   |
|Zubtsov               |Subzow                                      |56,17°N, 34,59°E |-      |-      |1,2k        |2,8k        |2,5k   |
|Nizhny Novgorod       |Nizhniy Novgorod; Gorky                     |56,33°N, 44,01°E |-      |-      |2,5k        |8,0k        |12,0k  |
|Mozhaisk              |Mozhaysk                                    |55,50°N, 36,03°E |-      |-      |1,5k        |2,8k        |5,8k   |
|Kashin                |Kaschin                                     |57,36°N, 37,61°E |-      |-      |-           |3,8k        |4,8k   |
|Meshchovsk            |Meschovsk                                   |54,32°N, 35,28°E |-      |-      |-           |-           |2,6k   |
|Porkhov               |Porchov                                     |57,77°N, 29,55°E |-      |-      |-           |-           |2,8k   |
|Vyazma                |Wjasmar                                     |55,21°N, 34,29°E |-      |-      |-           |-           |5,5k   |
|Koporye               |Koporje                                     |59,71°N, 29,03°E |-      |-      |-           |900         |1,4k   |
|Tarusa                |Tarusa-on-Oka                               |54,73°N, 37,18°E |-      |-      |-           |-           |2,2k   |
|Staritsa              |Gorodok on Volga                            |56,51°N, 34,94°E |-      |-      |-           |1,6k        |3,5k   |
|Cheboksary            |Shupashkar; Veda-Suvar                      |56,15°N, 47,25°E |-      |-      |-           |1,4k        |2,2k   |
|Dankov                |Donkov                                      |53,25°N, 39,16°E |-      |-      |-           |900         |-      |
|Romanov-Borisoglebsk  |Tutayev; Romanov                            |57,88°N, 39,54°E |-      |-      |-           |1,8k        |3,2k   |
|Shenkursk             |Vaga                                        |62,11°N, 42,90°E |-      |-      |-           |600         |-      |
|Ustyuzhna             |Ustyuzhna Zheleznopolskaya                  |58,84°N, 36,43°E |-      |-      |-           |1,2k        |4,2k   |
|Mukhshi               |Narovchat                                   |53,88°N, 43,69°E |-      |-      |-           |18,0k       |2,5k   |
|Klin                  |Klin-on-Sestra                              |56,33°N, 36,73°E |-      |-      |-           |1,1k        |2,2k   |
|Gdov                  |Vdov                                        |58,74°N, 27,81°E |-      |-      |-           |600         |2,0k   |
|Shlisselburg          |Oreshek; Noteborg                           |59,94°N, 31,03°E |-      |-      |-           |800         |2,0k   |
|Ruza                  |Rusa Moskovskaya                            |55,70°N, 36,20°E |-      |-      |-           |1,1k        |2,4k   |
|Serpukhov             |Serpuchow                                   |54,92°N, 37,41°E |-      |-      |-           |2,0k        |6,5k   |
|Ostrov                |Ostrov-Pskov                                |57,34°N, 28,35°E |-      |-      |-           |900         |2,5k   |
|Aleksin               |Aleksin-on-Oka                              |54,50°N, 37,07°E |-      |-      |-           |1,2k        |2,5k   |
|Soligalich            |Sol Galitskaya                              |59,08°N, 42,29°E |-      |-      |-           |1,5k        |3,2k   |
|Kashira               |Kaschira                                    |54,84°N, 38,15°E |-      |-      |-           |1,2k        |2,8k   |
|Borovsk               |Borowsk                                     |55,21°N, 36,49°E |-      |-      |-           |1,5k        |3,6k   |
|Bely                  |Bely-on-Obsha                               |55,84°N, 32,94°E |-      |-      |-           |1,2k        |2,5k   |
|Kaluga                |Kaluga-on-Oka                               |54,53°N, 36,28°E |-      |-      |-           |-           |4,5k   |
|Ostashkov             |Klichen                                     |57,15°N, 33,11°E |-      |-      |-           |-           |2,4k   |
|Venyov                |Gorodensk; Venev                            |54,35°N, 38,27°E |-      |-      |-           |-           |-      |
|Vereya                |Wereja                                      |55,34°N, 36,19°E |-      |-      |-           |-           |3,2k   |
|Kurmysh               |Kurmysch                                    |55,83°N, 46,05°E |-      |-      |-           |-           |2,5k   |
|Kargopol              |Kargopole                                   |61,51°N, 38,95°E |-      |-      |-           |-           |3,5k   |
|Chukhloma             |Tschuchloma                                 |58,76°N, 42,69°E |-      |-      |-           |-           |2,0k   |
|Elatma                |Yelatma                                     |54,97°N, 41,75°E |-      |-      |-           |-           |-      |
|Yamburg               |Yam; Kingisepp                              |59,37°N, 28,61°E |-      |-      |-           |-           |1,8k   |
|Temnikov              |Stary Temnikov                              |54,63°N, 43,21°E |-      |-      |-           |-           |-      |
|Mamadysh              |Mamadysch                                   |55,72°N, 51,41°E |-      |-      |-           |-           |900    |
|Aleksandrov           |Aleksandrovskaya Sloboda                    |56,40°N, 38,71°E |-      |-      |-           |-           |800    |
|Kirzhach              |Kirschatsch                                 |56,15°N, 38,85°E |-      |-      |-           |-           |600    |
|Sergiyev Posad        |Troitskiy Posad                             |56,30°N, 38,13°E |-      |-      |-           |-           |1,2k   |
|Tikhvin               |Tichwin; Tikhvinskiy Posad                  |59,65°N, 33,54°E |-      |-      |-           |-           |600    |
|Maloyaroslavets       |Yaroslavets                                 |55,01°N, 36,47°E |-      |-      |-           |-           |1,8k   |
|Lyskovo               |Sundyry                                     |56,01°N, 45,03°E |-      |-      |-           |-           |1,1k   |
|Opochka               |Opotschka                                   |56,71°N, 28,66°E |-      |-      |-           |-           |2,6k   |
|Sebezh                |Sebesch                                     |56,28°N, 28,48°E |-      |-      |-           |-           |1,2k   |
|Kineshma              |Kineschma                                   |57,44°N, 42,15°E |-      |-      |-           |-           |1,2k   |
|Solikamsk             |Sol Kamskaya                                |59,63°N, 56,77°E |-      |-      |-           |-           |1,2k   |
|Kalyazin              |Kalyazina Sloboda                           |57,24°N, 37,86°E |-      |-      |-           |-           |900    |
|Kem                   |KemskiyGorodok                              |64,96°N, 34,58°E |-      |-      |-           |-           |500    |
|Orlov-Vyatka          |Orlov; Khalturin                            |58,54°N, 48,89°E |-      |-      |-           |-           |1,1k   |
|Vyshniy Volochyok     |Vyshny Volochek                             |57,59°N, 34,56°E |-      |-      |-           |-           |900    |
|Balakhna              |Sol-na-Gorodtse                             |56,49°N, 43,54°E |-      |-      |-           |-           |2,5k   |
|Bogorodsk             |Noginsk; Rogozhi                            |55,85°N, 38,44°E |-      |-      |-           |-           |500    |
|Borovichi             |Borowitschi                                 |58,39°N, 33,92°E |-      |-      |-           |-           |700    |
|Dukhovshchina         |Duchowschtschina                            |55,19°N, 32,41°E |-      |-      |-           |-           |600    |
|Onega                 |Ust-Onega                                   |63,91°N, 38,11°E |-      |-      |-           |-           |600    |
|Porechye              |Demidov; Kasplya Wharf                      |55,27°N, 31,52°E |-      |-      |-           |-           |800    |
|Sychevka              |Sytschewka                                  |55,83°N, 34,27°E |-      |-      |-           |-           |700    |
|Valday                |Valdaiskoye Selo                            |57,97°N, 33,25°E |-      |-      |-           |-           |800    |

# Muscovite and Imperial Settlements (1550 - 1900AD)

Table: Muscovite and Imperial urban centres, fortress towns and provincial capitals of the Russian Core (1550 - 1900AD) compiled from russian_core_principalities_settlements.json.

|Settlement           |Alternative Names                           |Coords           |1600AD |1700AD |1800AD |1850AD |1897AD  |1900AD  |
|:--------------------|:-------------------------------------------|:----------------|:------|:------|:------|:------|:-------|:-------|
|Ufa                  |Ufa II Gorodishche; Imenkovo-Bakhmutino Ufa |54,74°N, 55,97°E |1,5k   |4,5k   |9,2k   |16,5k  |49,3k   |52,8k   |
|Pskov                |Pleskov                                     |57,82°N, 28,33°E |14,0k  |11,0k  |9,3k   |15,1k  |30,5k   |31,8k   |
|Izborsk              |Truvorovo Gorodishche; Stary Izborsk        |57,71°N, 27,86°E |-      |1,2k   |-      |-      |1,1k    |1,2k    |
|Staraya Ladoga       |Aldeigjuborg; Ladoga                        |60,00°N, 32,30°E |-      |800    |-      |-      |950     |1,0k    |
|Belozersk            |Beloozero; Krutik                           |60,03°N, 37,79°E |-      |4,8k   |4,2k   |-      |5,0k    |5,2k    |
|Murom                |Chaadaevo; Turom                            |55,58°N, 42,05°E |-      |6,4k   |7,1k   |10,5k  |13,3k   |14,0k   |
|Rostov Veliky        |Rostov                                      |57,19°N, 39,41°E |-      |7,5k   |6,2k   |9,1k   |13,7k   |14,2k   |
|Smolensk             |Smolensk-on-Dnieper                         |54,78°N, 32,04°E |-      |9,5k   |12,6k  |18,2k  |46,7k   |49,8k   |
|Bolgar               |Velikiy Bolgar; Spassk-Tatarskiy            |54,99°N, 49,06°E |-      |1,5k   |-      |-      |2,8k    |2,8k    |
|Staraya Ryazan       |Old Ryazan; Shatrishche                     |54,40°N, 40,43°E |-      |600    |-      |-      |820     |850     |
|Suzdal               |Souzdal                                     |56,42°N, 40,45°E |-      |6,2k   |5,8k   |6,5k   |6,4k    |6,6k    |
|Veliky Novgorod      |Novgorod; Gospodin Velikiy Novgorod         |58,52°N, 31,27°E |8,0k   |7,5k   |10,8k  |16,7k  |25,7k   |26,9k   |
|Bilyar               |Bilyarsk; Velikiy Gorod                     |54,99°N, 50,39°E |-      |1,8k   |-      |-      |2,4k    |2,5k    |
|Uglich               |Uglitsch; Uglichskoye Pole                  |57,53°N, 38,33°E |-      |5,8k   |6,9k   |10,2k  |9,7k    |10,0k   |
|Kursk                |Kursk-on-Tuskar                             |51,74°N, 36,19°E |5,5k   |11,0k  |18,5k  |31,8k  |75,7k   |78,8k   |
|Bryansk              |Debryansk; Chashin Kurgan                   |53,25°N, 34,37°E |-      |5,8k   |7,2k   |11,5k  |24,8k   |26,5k   |
|Belgorod             |Belgorod-Severskiy; Sarksiy                 |50,60°N, 36,59°E |3,2k   |7,5k   |10,2k  |14,5k  |26,6k   |27,8k   |
|Cherdyn              |Velikaya Perm; Pokcha                       |60,40°N, 56,48°E |3,8k   |2,9k   |2,6k   |-      |3,7k    |3,8k    |
|Staraya Russa        |Rusa                                        |57,99°N, 31,36°E |3,2k   |4,8k   |5,6k   |8,9k   |15,2k   |15,8k   |
|Toropets             |Toropez; Krivich Toropets                   |56,50°N, 31,64°E |-      |5,6k   |6,4k   |-      |7,4k    |7,6k    |
|Torzhok              |Novy Torg                                   |57,04°N, 34,96°E |-      |6,2k   |9,8k   |14,2k  |12,7k   |13,1k   |
|Vladimir             |Vladimir-on-Klyazma                         |56,13°N, 40,41°E |-      |5,5k   |7,4k   |13,2k  |28,5k   |30,2k   |
|Yelabuga             |Alabuga; Chortovo Gorodishche               |55,76°N, 52,05°E |1,5k   |2,4k   |3,8k   |6,2k   |9,8k    |10,2k   |
|Kazan                |Iske Kazan; Qazan                           |55,80°N, 49,11°E |22,0k  |26,0k  |42,0k  |58,5k  |130,0k  |138,5k  |
|Yaroslavl            |Jaroslawl                                   |57,63°N, 39,88°E |15,5k  |17,5k  |21,5k  |28,5k  |71,6k   |74,0k   |
|Pereyaslavl-Zalessky |Pereslavl-Zalessky                          |56,74°N, 38,86°E |-      |6,5k   |7,2k   |8,6k   |10,6k   |11,0k   |
|Starodub-Seversky    |Starodub                                    |52,58°N, 32,76°E |-      |7,8k   |8,9k   |11,2k  |26,3k   |27,1k   |
|Ryazan               |Pereyaslavl-Ryazanskiy                      |54,63°N, 39,69°E |-      |8,2k   |11,5k  |19,8k  |46,1k   |48,5k   |
|Rybinsk              |Ust-Sheksna; Rybnaya Sloboda                |58,04°N, 38,84°E |-      |2,8k   |4,2k   |9,8k   |25,3k   |27,5k   |
|Pronsk               |Pronskoye Gorodishche                       |54,12°N, 39,60°E |-      |2,4k   |2,1k   |-      |1,9k    |2,0k    |
|Tver                 |Twer                                        |56,86°N, 35,92°E |-      |9,5k   |17,5k  |25,2k  |53,5k   |56,2k   |
|Volokolamsk          |Volok Lamskiy                               |56,04°N, 35,96°E |-      |2,8k   |2,9k   |-      |3,1k    |3,2k    |
|Viazniki             |Yaropolch-Zalesskiy                         |56,24°N, 42,16°E |1,8k   |2,9k   |4,1k   |-      |8,9k    |9,3k    |
|Bezhetsk             |Bezhetskiy Verkh; Gorodetsk                 |57,78°N, 36,70°E |-      |3,2k   |4,1k   |-      |9,4k    |9,8k    |
|Mikhailov            |Mikhaylov                                   |54,23°N, 39,03°E |3,5k   |4,2k   |5,4k   |-      |9,2k    |9,4k    |
|Olonets              |Olonez                                      |60,98°N, 32,97°E |3,5k   |2,8k   |1,9k   |-      |1,2k    |1,3k    |
|Roslavl              |Rostislavl-Smolenskiy                       |53,95°N, 32,86°E |-      |3,8k   |5,2k   |7,4k   |17,8k   |18,6k   |
|Plyos                |Ples                                        |57,46°N, 41,52°E |-      |1,6k   |2,1k   |-      |2,2k    |2,2k    |
|Karachev             |Karatschew                                  |53,12°N, 34,99°E |-      |4,2k   |6,5k   |-      |15,5k   |16,0k   |
|Kozelsk              |Kozelsk-on-Zhizdra                          |54,04°N, 35,78°E |-      |3,8k   |4,9k   |-      |5,6k    |5,8k    |
|Mtsensk              |Mzenck                                      |53,28°N, 36,57°E |4,5k   |5,2k   |7,8k   |12,5k  |9,8k    |10,1k   |
|Sevsk                |Siewsk                                      |52,15°N, 34,49°E |3,2k   |5,4k   |6,2k   |-      |9,2k    |9,5k    |
|Tula                 |Tula-on-Upa                                 |54,20°N, 37,62°E |12,0k  |16,5k  |32,0k  |54,6k  |114,7k  |121,5k  |
|Yelets               |Jelez                                       |52,62°N, 38,50°E |4,2k   |7,8k   |14,5k  |26,5k  |47,0k   |49,2k   |
|Zaraysk              |Osyotr; Nikola Zarazskiy                    |54,76°N, 38,87°E |-      |5,2k   |6,8k   |6,2k   |8,1k    |8,3k    |
|Belev                |Belyov                                      |53,81°N, 36,14°E |4,8k   |5,6k   |7,2k   |-      |9,6k    |9,8k    |
|Moscow               |Moskva                                      |55,76°N, 37,62°E |120,0k |150,0k |250,0k |368,8k |1038,6k |1174,7k |
|Vologda              |Nason-Gorod                                 |59,22°N, 39,89°E |11,0k  |10,5k  |11,2k  |16,8k  |27,7k   |29,1k   |
|Dorogobuzh           |Dorogobuzh-on-Dnieper                       |54,92°N, 33,30°E |-      |4,5k   |5,8k   |-      |6,5k    |6,7k    |
|Kexholm              |Korela; Priozersk                           |61,04°N, 30,13°E |-      |1,4k   |-      |-      |1,8k    |1,9k    |
|Tetyushi             |Temtuzi                                     |54,94°N, 48,84°E |1,8k   |2,2k   |3,1k   |-      |4,8k    |4,9k    |
|Yelnya               |Yelna                                       |54,58°N, 33,18°E |-      |-      |2,2k   |-      |2,4k    |2,5k    |
|Gorodets             |Gorodets-Radilov; Gorodets-on-Volga         |56,65°N, 43,47°E |-      |3,2k   |4,8k   |-      |6,3k    |6,6k    |
|Kasimov              |Gorodets Meshcherskiy; Khankerman           |54,94°N, 41,40°E |8,0k   |6,2k   |7,8k   |10,2k  |13,5k   |14,1k   |
|Kideksha             |Kidekscha                                   |56,43°N, 40,53°E |-      |-      |-      |-      |650     |680     |
|Kostroma             |Kostroma-on-Volga                           |57,77°N, 40,93°E |12,0k  |11,5k  |12,8k  |18,5k  |41,4k   |43,2k   |
|Lgov                 |Olgov                                       |51,67°N, 35,26°E |-      |-      |-      |3,4k   |4,3k    |4,5k    |
|Rylsk                |Rylsk-on-Seym                               |51,57°N, 34,68°E |-      |5,5k   |6,8k   |-      |11,5k   |11,9k   |
|Starodub-on-Klyazma  |Klyazminskiy Gorodok                        |56,39°N, 41,43°E |-      |800    |-      |-      |920     |950     |
|Yuryev-Polsky        |Yuriev-Polskiy                              |56,50°N, 39,68°E |-      |3,1k   |3,6k   |-      |5,8k    |6,0k    |
|Zvenigorod           |Zvenigorod Moskovskiy                       |55,73°N, 36,85°E |-      |2,1k   |2,4k   |-      |2,4k    |2,5k    |
|Dmitrov              |Dmitrow                                     |56,34°N, 37,52°E |-      |3,2k   |3,5k   |-      |4,5k    |4,7k    |
|Bogolyubovo          |Bogoljubowo                                 |56,20°N, 40,54°E |-      |1,1k   |-      |-      |2,1k    |2,2k    |
|Galich               |Galich Mersky                               |58,38°N, 42,35°E |-      |4,2k   |4,9k   |-      |6,2k    |6,4k    |
|Trubchevsk           |Trubetsk                                    |52,58°N, 33,77°E |-      |3,8k   |4,6k   |-      |7,4k    |7,6k    |
|Krasny               |Krasn-Smolenskiy                            |54,56°N, 31,43°E |-      |-      |2,1k   |-      |2,8k    |2,8k    |
|Velikiye Luki        |Luki on Lovat                               |56,34°N, 30,53°E |-      |3,5k   |4,1k   |5,6k   |8,5k    |8,9k    |
|Gorokhovets          |Gorochowez                                  |56,20°N, 42,69°E |2,2k   |3,1k   |2,8k   |-      |2,3k    |2,4k    |
|Kolomna              |Kolomna-on-Oka                              |55,08°N, 38,78°E |-      |7,8k   |10,2k  |15,4k  |20,3k   |21,5k   |
|Kotelnich            |Koshkarov                                   |58,31°N, 48,35°E |-      |2,4k   |3,1k   |-      |4,2k    |4,4k    |
|Vyatka               |Khlynov; Kirov                              |58,60°N, 49,67°E |6,8k   |7,5k   |9,2k   |14,8k  |25,0k   |26,8k   |
|Bolkhov              |Bolchow                                     |53,44°N, 36,00°E |4,2k   |7,5k   |12,8k  |17,5k  |21,4k   |22,0k   |
|Kholm                |Kholm-on-Lovat                              |57,15°N, 31,18°E |-      |1,8k   |2,7k   |-      |5,9k    |6,1k    |
|Kholmogory           |Cholmogeny; Ukhtostrov                      |64,22°N, 41,66°E |6,8k   |5,2k   |1,6k   |-      |1,1k    |1,1k    |
|Mologa               |Kholopiy Gorodok                            |58,20°N, 38,44°E |-      |2,6k   |3,2k   |-      |4,3k    |4,4k    |
|Velikiy Ustyug       |Gleden; Ustyug                              |60,76°N, 46,30°E |9,5k   |9,2k   |10,8k  |9,5k   |11,1k   |11,5k   |
|Kadom                |Stary Kadom                                 |54,56°N, 42,47°E |-      |3,4k   |4,6k   |-      |6,3k    |6,5k    |
|Rzhev                |Rzheva Volodimerova                         |56,26°N, 34,33°E |-      |6,8k   |9,5k   |16,2k  |21,3k   |22,4k   |
|Zubtsov              |Subzow                                      |56,17°N, 34,59°E |-      |2,1k   |2,9k   |-      |3,0k    |3,1k    |
|Nizhny Novgorod      |Nizhniy Novgorod; Gorky                     |56,33°N, 44,01°E |16,5k  |18,5k  |22,0k  |36,5k  |90,1k   |95,8k   |
|Mozhaisk             |Mozhaysk                                    |55,50°N, 36,03°E |-      |3,6k   |3,9k   |-      |3,2k    |3,4k    |
|Kashin               |Kaschin                                     |57,36°N, 37,61°E |-      |4,6k   |5,4k   |-      |7,5k    |7,8k    |
|Meshchovsk           |Meschovsk                                   |54,32°N, 35,28°E |-      |3,1k   |4,2k   |-      |3,6k    |3,8k    |
|Porkhov              |Porchov                                     |57,77°N, 29,55°E |-      |1,9k   |2,8k   |-      |5,6k    |5,8k    |
|Vyazma               |Wjasmar                                     |55,21°N, 34,29°E |-      |6,8k   |9,5k   |11,8k  |15,6k   |16,2k   |
|Koporye              |Koporje                                     |59,71°N, 29,03°E |-      |800    |-      |-      |720     |750     |
|Tarusa               |Tarusa-on-Oka                               |54,73°N, 37,18°E |-      |1,5k   |1,8k   |-      |2,0k    |2,0k    |
|Staritsa             |Gorodok on Volga                            |56,51°N, 34,94°E |5,2k   |3,1k   |3,8k   |-      |6,4k    |6,6k    |
|Cheboksary           |Shupashkar; Veda-Suvar                      |56,15°N, 47,25°E |3,5k   |4,2k   |4,8k   |-      |4,7k    |5,0k    |
|Dankov               |Donkov                                      |53,25°N, 39,16°E |2,2k   |2,6k   |2,9k   |-      |9,1k    |9,4k    |
|Romanov-Borisoglebsk |Tutayev; Romanov                            |57,88°N, 39,54°E |-      |3,9k   |4,8k   |-      |6,7k    |6,9k    |
|Shenkursk            |Vaga                                        |62,11°N, 42,90°E |1,5k   |1,8k   |1,2k   |-      |1,5k    |1,6k    |
|Ustyuzhna            |Ustyuzhna Zheleznopolskaya                  |58,84°N, 36,43°E |6,0k   |4,5k   |3,2k   |-      |5,1k    |5,3k    |
|Mukhshi              |Narovchat                                   |53,88°N, 43,69°E |2,8k   |-      |3,6k   |-      |4,7k    |4,8k    |
|Klin                 |Klin-on-Sestra                              |56,33°N, 36,73°E |-      |1,8k   |2,5k   |-      |4,7k    |4,9k    |
|Gdov                 |Vdov                                        |58,74°N, 27,81°E |-      |1,2k   |-      |-      |2,1k    |2,2k    |
|Shlisselburg         |Oreshek; Noteborg                           |59,94°N, 31,03°E |-      |1,8k   |3,1k   |-      |5,3k    |5,6k    |
|Ruza                 |Rusa Moskovskaya                            |55,70°N, 36,20°E |-      |1,8k   |2,3k   |-      |2,3k    |2,4k    |
|Serpukhov            |Serpuchow                                   |54,92°N, 37,41°E |-      |5,8k   |6,9k   |14,2k  |30,6k   |32,5k   |
|Ostrov               |Ostrov-Pskov                                |57,34°N, 28,35°E |-      |1,8k   |2,4k   |-      |6,3k    |6,5k    |
|Aleksin              |Aleksin-on-Oka                              |54,50°N, 37,07°E |-      |2,2k   |2,8k   |-      |3,5k    |3,6k    |
|Soligalich           |Sol Galitskaya                              |59,08°N, 42,29°E |-      |2,8k   |3,1k   |-      |3,4k    |3,5k    |
|Kashira              |Kaschira                                    |54,84°N, 38,15°E |-      |2,6k   |3,4k   |-      |4,1k    |4,2k    |
|Borovsk              |Borowsk                                     |55,21°N, 36,49°E |-      |4,2k   |5,9k   |8,4k   |8,4k    |8,6k    |
|Bely                 |Bely-on-Obsha                               |55,84°N, 32,94°E |-      |3,2k   |4,6k   |-      |7,0k    |7,1k    |
|Kaluga               |Kaluga-on-Oka                               |54,53°N, 36,28°E |10,5k  |13,5k  |23,0k  |31,2k  |49,5k   |51,2k   |
|Ostashkov            |Klichen                                     |57,15°N, 33,11°E |-      |4,5k   |7,2k   |9,8k   |10,4k   |10,8k   |
|Venyov               |Gorodensk; Venev                            |54,35°N, 38,27°E |2,4k   |2,8k   |3,5k   |-      |5,2k    |5,3k    |
|Vereya               |Wereja                                      |55,34°N, 36,19°E |-      |4,5k   |5,8k   |5,4k   |3,7k    |3,8k    |
|Kurmysh              |Kurmysch                                    |55,83°N, 46,05°E |-      |2,2k   |1,9k   |-      |3,2k    |3,2k    |
|Kargopol             |Kargopole                                   |61,51°N, 38,95°E |5,2k   |4,6k   |3,1k   |-      |3,1k    |3,1k    |
|Chukhloma            |Tschuchloma                                 |58,76°N, 42,69°E |-      |1,8k   |2,1k   |-      |2,2k    |2,2k    |
|Elatma               |Yelatma                                     |54,97°N, 41,75°E |2,8k   |3,9k   |5,4k   |-      |7,1k    |7,3k    |
|Yamburg              |Yam; Kingisepp                              |59,37°N, 28,61°E |-      |1,1k   |1,6k   |-      |4,6k    |4,8k    |
|Temnikov             |Stary Temnikov                              |54,63°N, 43,21°E |-      |4,2k   |5,1k   |-      |5,4k    |5,5k    |
|Mamadysh             |Mamadysch                                   |55,72°N, 51,41°E |-      |1,6k   |2,4k   |-      |4,2k    |4,3k    |
|Aleksandrov          |Aleksandrovskaya Sloboda                    |56,40°N, 38,71°E |8,5k   |2,4k   |3,1k   |-      |6,8k    |7,1k    |
|Kirzhach             |Kirschatsch                                 |56,15°N, 38,85°E |-      |1,2k   |1,9k   |-      |4,9k    |5,0k    |
|Sergiyev Posad       |Troitskiy Posad                             |56,30°N, 38,13°E |4,5k   |6,5k   |9,2k   |14,5k  |25,0k   |26,5k   |
|Tikhvin              |Tichwin; Tikhvinskiy Posad                  |59,65°N, 33,54°E |2,5k   |3,8k   |4,2k   |6,1k   |6,6k    |6,8k    |
|Maloyaroslavets      |Yaroslavets                                 |55,01°N, 36,47°E |-      |1,6k   |2,1k   |-      |2,5k    |2,6k    |
|Lyskovo              |Sundyry                                     |56,01°N, 45,03°E |-      |3,5k   |5,2k   |-      |7,8k    |8,1k    |
|Opochka              |Opotschka                                   |56,71°N, 28,66°E |-      |2,0k   |3,1k   |-      |5,7k    |6,0k    |
|Sebezh               |Sebesch                                     |56,28°N, 28,48°E |-      |-      |2,8k   |-      |4,3k    |4,5k    |
|Kineshma             |Kineschma                                   |57,44°N, 42,15°E |2,5k   |2,8k   |3,2k   |3,9k   |7,6k    |8,2k    |
|Solikamsk            |Sol Kamskaya                                |59,63°N, 56,77°E |6,8k   |7,2k   |4,5k   |-      |4,1k    |4,2k    |
|Kalyazin             |Kalyazina Sloboda                           |57,24°N, 37,86°E |-      |2,4k   |4,6k   |6,8k   |5,5k    |5,7k    |
|Kem                  |KemskiyGorodok                              |64,96°N, 34,58°E |1,1k   |1,4k   |1,6k   |-      |2,4k    |2,6k    |
|Orlov-Vyatka         |Orlov; Khalturin                            |58,54°N, 48,89°E |-      |1,9k   |2,6k   |-      |3,3k    |3,4k    |
|Vyshniy Volochyok    |Vyshny Volochek                             |57,59°N, 34,56°E |-      |2,2k   |6,4k   |11,5k  |16,6k   |17,5k   |
|Balakhna             |Sol-na-Gorodtse                             |56,49°N, 43,54°E |5,8k   |5,2k   |4,5k   |-      |5,1k    |5,3k    |
|Bogorodsk            |Noginsk; Rogozhi                            |55,85°N, 38,44°E |-      |-      |1,1k   |3,2k   |11,1k   |12,2k   |
|Borovichi            |Borowitschi                                 |58,39°N, 33,92°E |-      |1,8k   |4,6k   |8,1k   |9,4k    |9,9k    |
|Dukhovshchina        |Duchowschtschina                            |55,19°N, 32,41°E |-      |-      |-      |-      |3,1k    |3,2k    |
|Onega                |Ust-Onega                                   |63,91°N, 38,11°E |-      |1,1k   |1,4k   |-      |2,5k    |2,7k    |
|Porechye             |Demidov; Kasplya Wharf                      |55,27°N, 31,52°E |-      |-      |4,5k   |-      |5,7k    |5,8k    |
|Sychevka             |Sytschewka                                  |55,83°N, 34,27°E |-      |-      |-      |3,8k   |4,8k    |5,0k    |
|Valday               |Valdaiskoye Selo                            |57,97°N, 33,25°E |-      |2,1k   |3,4k   |4,5k   |2,9k    |3,1k    |
|Ryazhsk              |Ryaskoye Pole                               |53,71°N, 40,06°E |-      |2,5k   |3,2k   |-      |14,8k   |15,4k   |
|Nevel                |Newel                                       |56,02°N, 29,93°E |-      |2,9k   |4,2k   |-      |9,3k    |9,7k    |
|Slobodskoy           |Slobodskoj                                  |58,73°N, 50,18°E |-      |3,6k   |5,2k   |6,5k   |7,4k    |7,6k    |
|Krasny Kholm         |Spas na Kholmu                              |58,06°N, 37,12°E |-      |1,4k   |1,9k   |-      |2,5k    |2,6k    |
|Vasilsursk           |Vasilgorod                                  |56,13°N, 46,01°E |-      |2,1k   |2,4k   |-      |3,8k    |3,9k    |
|Velizh               |Welisch                                     |55,61°N, 31,20°E |-      |3,5k   |5,8k   |-      |12,2k   |12,6k   |
|Shuya                |Shuia                                       |56,85°N, 41,39°E |2,8k   |3,2k   |4,5k   |8,9k   |19,6k   |20,8k   |
|Lyubim               |Ljubim                                      |58,36°N, 40,69°E |-      |1,5k   |2,0k   |-      |3,0k    |3,1k    |
|Danilov              |Danilovskoye                                |58,19°N, 40,17°E |700    |1,4k   |2,1k   |-      |4,3k    |4,5k    |
|Kovrov               |Starodub-Kovrov                             |56,36°N, 41,32°E |600    |1,1k   |1,8k   |3,5k   |14,6k   |15,8k   |
|Mezen                |Okladnikova Sloboda                         |65,85°N, 44,24°E |700    |1,3k   |1,5k   |-      |1,8k    |1,9k    |
|Sviyazhsk            |Ivangorod Sviyazhskiy                       |55,77°N, 48,66°E |3,8k   |3,2k   |2,5k   |-      |2,4k    |2,4k    |
|Alatyr               |Alatyr-on-Sura                              |54,84°N, 46,58°E |2,0k   |4,2k   |5,8k   |8,5k   |12,2k   |12,8k   |
|Arzamas              |Arsamas                                     |55,39°N, 43,84°E |5,5k   |7,2k   |8,9k   |10,5k  |10,6k   |11,0k   |
|Shatsk               |Shatskiy Gorod                              |54,03°N, 41,71°E |2,4k   |4,5k   |5,8k   |-      |13,9k   |14,3k   |
|Laishevo             |Chalma; Laish                               |55,40°N, 49,55°E |1,2k   |1,9k   |2,6k   |-      |3,7k    |3,9k    |
|Usolye               |Novoye Usolye; Pyskor                       |59,42°N, 56,68°E |4,2k   |5,5k   |5,2k   |-      |6,7k    |6,8k    |
|Ivanovo-Voznesensk   |Ivanovo                                     |57,00°N, 40,97°E |600    |1,8k   |5,2k   |15,0k  |54,2k   |61,5k   |
|Vesyegonsk           |Ves Yegonskaya                              |58,66°N, 37,26°E |900    |1,8k   |2,5k   |-      |3,5k    |3,6k    |
|Oryol                |Orel                                        |52,97°N, 36,08°E |6,5k   |11,5k  |22,0k  |35,2k  |69,7k   |72,8k   |
|Pavlovo              |Pavlovskiy Ostrog; Pavlovo-on-Oka           |55,96°N, 43,09°E |1,2k   |3,8k   |6,5k   |8,8k   |12,4k   |13,1k   |
|Yepifan              |Epifan                                      |53,83°N, 38,55°E |1,8k   |2,4k   |2,9k   |-      |4,2k    |4,3k    |
|Krasnoslobodsk       |Krasnaya Sloboda                            |54,43°N, 43,78°E |1,5k   |3,2k   |5,4k   |-      |7,4k    |7,6k    |
|Kozmodemyansk        |Tsikmja                                     |56,34°N, 46,56°E |1,1k   |2,4k   |3,6k   |-      |5,3k    |5,5k    |
|Arkhangelsk          |Novye Kholmogory; Archangel                 |64,54°N, 40,54°E |6,5k   |10,5k  |11,2k  |15,2k  |20,9k   |21,8k   |
|Menzelinsk           |Menzelinskiy Ostrog                         |55,73°N, 53,10°E |1,1k   |2,4k   |3,6k   |-      |7,6k    |7,8k    |
|Tsarevokokshaisk     |Yoshkar-Ola                                 |56,63°N, 47,89°E |900    |1,4k   |1,6k   |-      |1,7k    |1,8k    |
|Urzhum               |Urschum                                     |57,11°N, 50,00°E |1,1k   |1,8k   |2,5k   |-      |4,4k    |4,6k    |
|Yaransk              |Jaransk                                     |57,30°N, 47,88°E |1,2k   |2,4k   |3,2k   |-      |4,8k    |5,0k    |
|Livny                |Liwny                                       |52,43°N, 37,61°E |2,8k   |5,5k   |8,2k   |13,4k  |20,4k   |21,2k   |
|Samara               |Kuybyshev                                   |53,20°N, 50,10°E |1,8k   |4,2k   |7,5k   |24,0k  |90,0k   |96,5k   |
|Voronezh             |Woronesch                                   |51,67°N, 39,18°E |8,5k   |18,0k  |21,0k  |38,5k  |80,6k   |84,5k   |
|Osa                  |Osinskaya Sloboda                           |57,28°N, 55,46°E |800    |1,6k   |2,5k   |-      |5,1k    |5,2k    |
|Stary Oskol          |Oskol                                       |51,30°N, 37,84°E |2,2k   |4,8k   |6,5k   |9,8k   |15,6k   |16,2k   |
|Valuyki              |Valuiki                                     |50,21°N, 38,10°E |1,8k   |3,4k   |4,2k   |-      |6,7k    |6,9k    |
|Sarapul              |Voznesenskoye                               |56,48°N, 53,80°E |900    |2,8k   |5,6k   |9,8k   |21,4k   |22,8k   |
|Skopin               |Skopino                                     |53,82°N, 39,55°E |1,2k   |2,8k   |5,9k   |9,8k   |13,2k   |13,8k   |
|Myshkin              |Myschkin                                    |57,79°N, 38,45°E |600    |1,1k   |1,8k   |-      |2,2k    |2,4k    |
|Pokrov               |Pokrov-Vladimir                             |55,92°N, 39,18°E |500    |-      |1,4k   |-      |2,8k    |2,9k    |
|Spassk-Ryazanskiy    |Spasskoye                                   |54,41°N, 40,38°E |800    |-      |-      |4,2k   |4,8k    |4,9k    |
|Yegoryevsk           |Vysokoye                                    |55,38°N, 39,04°E |700    |-      |1,4k   |5,2k   |19,2k   |20,5k   |
|Sapozhok             |Sapozhkovskiy Ostrog                        |53,94°N, 40,68°E |900    |2,2k   |3,6k   |-      |8,6k    |8,8k    |
|Kozlov               |Michurinsk                                  |52,90°N, 40,51°E |3,5k   |6,8k   |11,5k  |21,2k  |40,3k   |42,1k   |
|Nizhniy Lomov        |Nizhny Lomov                                |53,53°N, 43,68°E |2,2k   |4,5k   |6,8k   |-      |10,0k   |10,3k   |
|Tambov               |Tambow                                      |52,72°N, 41,45°E |3,2k   |7,5k   |12,8k  |24,5k  |48,0k   |50,5k   |
|Ranenburg            |Chaplygin; Slobodskoy                       |53,24°N, 39,96°E |800    |1,8k   |3,4k   |-      |15,3k   |15,9k   |
|Saransk              |Saranskiy Ostrog                            |54,19°N, 45,18°E |2,4k   |5,2k   |7,8k   |11,2k  |14,6k   |15,2k   |
|Karsun               |Korsun                                      |54,20°N, 46,98°E |1,8k   |2,9k   |3,4k   |-      |3,8k    |3,9k    |
|Kungur               |Kungurskiy Ostrog                           |57,43°N, 56,95°E |1,5k   |4,8k   |6,9k   |9,8k   |14,3k   |14,9k   |
|Simbirsk             |Sinbirsk; Ulyanovsk                         |54,31°N, 48,40°E |2,5k   |6,8k   |13,2k  |23,5k  |41,7k   |44,1k   |
|Oboyan               |Obojanskiy Ostrog                           |51,21°N, 36,28°E |1,8k   |3,6k   |5,4k   |-      |11,8k   |12,2k   |
|Morshansk            |Morschansk                                  |53,44°N, 41,81°E |1,2k   |-      |-      |15,8k  |26,5k   |27,5k   |
|Pavlovskiy Posad     |Vokhna                                      |55,78°N, 38,65°E |800    |-      |2,1k   |4,5k   |10,0k   |11,0k   |
|Podolsk              |Podol                                       |55,43°N, 37,54°E |600    |-      |1,2k   |2,8k   |3,8k    |4,2k    |
|Sudogda              |Sudogodskaya Sloboda                        |55,95°N, 40,86°E |500    |-      |1,2k   |-      |3,2k    |3,3k    |
|Ostrogozhsk          |Rybny                                       |50,86°N, 39,07°E |-      |6,8k   |9,5k   |-      |21,0k   |21,8k   |
|Penza                |Pensa                                       |53,20°N, 45,02°E |-      |6,5k   |13,5k  |24,8k  |60,0k   |63,2k   |
|Sudzha               |Sudscha                                     |51,19°N, 35,27°E |-      |4,2k   |5,8k   |-      |7,4k    |7,7k    |
|Glazov               |Glazovo                                     |58,14°N, 52,66°E |-      |500    |1,2k   |2,4k   |3,5k    |3,7k    |
|Poshekhonye          |Pertoma                                     |58,50°N, 39,12°E |-      |900    |2,2k   |-      |4,0k    |4,2k    |
|Syzran               |Sysran                                      |53,16°N, 48,47°E |-      |4,5k   |8,9k   |16,8k  |32,4k   |34,2k   |
|Borisoglebsk         |Pavlovskaya Krepost                         |51,37°N, 42,08°E |-      |1,5k   |4,8k   |9,5k   |22,3k   |23,5k   |
|Chistopol            |Chistoye Pole                               |55,36°N, 50,64°E |-      |1,2k   |3,8k   |11,2k  |20,1k   |21,2k   |
|Melenki              |Melenki-Vladimir                            |55,34°N, 41,63°E |-      |900    |2,4k   |4,8k   |8,9k    |9,2k    |
|Orekhovo-Zuyevo      |Zuyevo; Orekhovo                            |55,81°N, 38,96°E |-      |600    |1,8k   |6,5k   |34,9k   |39,5k   |
|Lipetsk              |Lipetskiye Zavody                           |52,60°N, 39,57°E |-      |1,8k   |5,6k   |11,2k  |20,5k   |21,5k   |
|Petrozavodsk         |Petrovskaya Sloboda                         |61,78°N, 34,35°E |-      |1,5k   |4,7k   |9,5k   |12,5k   |13,2k   |
|Saint Petersburg     |Sankt-Peterburg; Petrograd                  |59,93°N, 30,34°E |-      |40,0k  |220,2k |487,3k |1264,9k |1439,6k |
|Kronstadt            |Kronshtadt                                  |60,00°N, 29,77°E |-      |2,0k   |25,0k  |39,0k  |59,5k   |60,8k   |
|Gzhatsk              |Gagarin                                     |55,55°N, 35,01°E |-      |1,5k   |4,2k   |5,8k   |6,3k    |6,5k    |
|Perm                 |Yegoshikha                                  |58,01°N, 56,25°E |-      |1,5k   |6,2k   |14,5k  |45,2k   |48,5k   |
|Buzuluk              |Busuluk                                     |52,78°N, 52,26°E |-      |-      |3,8k   |7,2k   |14,4k   |15,1k   |
|Krasnoufimsk         |Krasny Yar Ufimskiy                         |56,62°N, 57,77°E |-      |-      |2,8k   |4,2k   |6,3k    |6,5k    |
|Stavropol-on-Volga   |Tolyatti                                    |53,51°N, 49,42°E |-      |-      |3,1k   |4,2k   |6,0k    |6,2k    |
|Buguruslan           |Buguruslanskaya Sloboda                     |53,66°N, 52,44°E |-      |-      |3,2k   |6,1k   |12,1k   |12,7k   |
|Tsarskoye Selo       |Pushkin                                     |59,72°N, 30,40°E |-      |-      |5,5k   |11,2k  |22,5k   |24,1k   |
|Votkinsk             |Votkinskiy Zavod                            |57,05°N, 53,99°E |-      |-      |6,4k   |12,8k  |21,7k   |22,9k   |
|Izhevsk              |Izhevskiy Zavod                             |56,85°N, 53,21°E |-      |-      |8,5k   |18,5k  |41,1k   |43,5k   |
|Sterlitamak          |Sterlitamakskaya Pristan                    |53,63°N, 55,93°E |-      |-      |3,8k   |7,5k   |15,6k   |16,4k   |
|Gatchina             |Gatschina                                   |59,57°N, 30,13°E |-      |-      |4,2k   |8,5k   |14,8k   |15,6k   |

# Complete Settlement Gazetteer

Table: Complete directory of all 258 settlement entries and population series in russian_core_principalities_settlements.json (10000BC - 1900AD).

|Stadester Key                     |Coords           |Occupied Span |Complete Population Series (Year: Population)                                                                                                                                                 |
|:---------------------------------|:----------------|:-------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Sungir-Russia                     |56,18°N, 40,50°E |10000-8500BC  |10000BC: 35; 8500BC: 40                                                                                                                                                                       |
|Zaraysk Palaeolithic-Russia       |54,76°N, 38,87°E |10000-8500BC  |10000BC: 30; 8500BC: 35                                                                                                                                                                       |
|Stanovoye 4-Russia                |57,03°N, 40,18°E |8000-5000BC   |8000BC: 25; 6500BC: 40; 5000BC: 50                                                                                                                                                            |
|Ivanovskoye 7-Russia              |57,13°N, 39,22°E |7500-4000BC   |7500BC: 30; 6000BC: 45; 4000BC: 65                                                                                                                                                            |
|Nizhneye Veretye I-Russia         |60,42°N, 38,95°E |7000-6000BC   |7000BC: 45; 6000BC: 55                                                                                                                                                                        |
|Zamostye 2-Russia                 |56,63°N, 37,78°E |6500-4200BC   |6500BC: 35; 5500BC: 45; 4200BC: 60                                                                                                                                                            |
|Lyalovo-Russia                    |56,05°N, 37,23°E |4500-3200BC   |4500BC: 50; 3800BC: 75; 3200BC: 65                                                                                                                                                            |
|Sakhtysh IIa-Russia               |56,78°N, 40,48°E |4500-2500BC   |4500BC: 65; 3200BC: 140; 2500BC: 160                                                                                                                                                          |
|Sakhtysh VIII-Russia              |56,79°N, 40,49°E |4200-2400BC   |4200BC: 50; 3000BC: 110; 2400BC: 120                                                                                                                                                          |
|Volosovo-Russia                   |55,62°N, 42,12°E |3500-2200BC   |3500BC: 90; 2800BC: 145; 2200BC: 130                                                                                                                                                          |
|Volosovo-Danilovsky-Russia        |58,18°N, 40,17°E |2600-1900BC   |2600BC: 110; 2200BC: 150; 1900BC: 120                                                                                                                                                         |
|Fatyanovo-Russia                  |57,72°N, 39,83°E |2500-2100BC   |2500BC: 95; 2100BC: 130                                                                                                                                                                       |
|Seima Dune-Russia                 |56,22°N, 43,18°E |2100-1700BC   |2100BC: 120; 1700BC: 160                                                                                                                                                                      |
|Galich Hoard Settlement-Russia    |58,39°N, 42,34°E |2000-1600BC   |2000BC: 85; 1600BC: 125                                                                                                                                                                       |
|Pozdnyakovo-Russia                |55,53°N, 42,08°E |1600-1200BC   |1600BC: 130; 1200BC: 175                                                                                                                                                                      |
|Govyadinovo-Russia                |57,82°N, 40,85°E |1400-900BC    |1400BC: 90; 900BC: 130                                                                                                                                                                        |
|Dyakovo Gorodishche-Russia        |55,66°N, 37,67°E |500BC - 500AD |500BC: 80; 200BC: 110; 1AD: 125; 300AD: 140; 500AD: 110                                                                                                                                       |
|Shcherbinskoye Gorodishche-Russia |55,48°N, 37,59°E |500BC - 500AD |500BC: 75; 1AD: 115; 300AD: 130; 500AD: 95                                                                                                                                                    |
|Troitskoye Gorodishche-Russia     |55,53°N, 35,97°E |400BC - 500AD |400BC: 90; 1AD: 140; 250AD: 165; 500AD: 120                                                                                                                                                   |
|Borsheva Gorodishche-Russia       |55,51°N, 38,08°E |300BC - 600AD |300BC: 70; 1AD: 110; 350AD: 135; 600AD: 150                                                                                                                                                   |
|Supruty Gorodishche-Russia        |54,02°N, 37,13°E |1-900AD       |1AD: 110; 800AD: 350; 900AD: 550                                                                                                                                                              |
|Moshchiny Gorodishche-Russia      |54,45°N, 35,13°E |200-700AD     |200AD: 90; 450AD: 180; 700AD: 150                                                                                                                                                             |
|Ufa-Russia                        |54,74°N, 55,97°E |400-1900AD    |400AD: 800; 700AD: 1,5k; 1000AD: 1,2k; 1574AD: 1,5k; 1700AD: 4,5k; 1800AD: 9,2k; 1850AD: 16,5k; 1897AD: 49,3k; 1900AD: 52,8k                                                                  |
|Kamno Gorodishche-Russia          |57,84°N, 28,20°E |500-950AD     |500AD: 220; 750AD: 420; 950AD: 650                                                                                                                                                            |
|Pskov-Russia                      |57,82°N, 28,33°E |600-1900AD    |600AD: 350; 850AD: 1,0k; 1000AD: 3,5k; 1200AD: 10,0k; 1300AD: 14,0k; 1400AD: 20,0k; 1500AD: 28,0k; 1600AD: 14,0k; 1700AD: 11,0k; 1800AD: 9,3k; 1850AD: 15,1k; 1897AD: 30,5k; 1900AD: 31,8k    |
|Lyubsha Fortress-Russia           |60,02°N, 32,32°E |700-880AD     |700AD: 180; 800AD: 320; 880AD: 220                                                                                                                                                            |
|Sarskoye Gorodishche-Russia       |57,08°N, 39,29°E |700-1000AD    |700AD: 250; 900AD: 750; 1000AD: 400                                                                                                                                                           |
|Izborsk-Russia                    |57,71°N, 27,86°E |750-1900AD    |750AD: 350; 900AD: 900; 1000AD: 1,4k; 1200AD: 2,2k; 1400AD: 2,8k; 1500AD: 2,4k; 1700AD: 1,2k; 1897AD: 1,1k; 1900AD: 1,2k                                                                      |
|Staraya Ladoga-Russia             |60,00°N, 32,30°E |750-1900AD    |750AD: 250; 850AD: 1,2k; 950AD: 1,8k; 1000AD: 2,5k; 1200AD: 2,0k; 1500AD: 1,2k; 1700AD: 800; 1897AD: 950; 1900AD: 1,0k                                                                        |
|Borshevo-Russia                   |51,32°N, 39,06°E |800-1050AD    |800AD: 420; 950AD: 950; 1050AD: 500                                                                                                                                                           |
|Mayatskoye-Russia                 |50,98°N, 39,30°E |800-900AD     |800AD: 900; 900AD: 1,6k                                                                                                                                                                       |
|Bolshoye Timerovo-Russia          |57,56°N, 39,77°E |850-1000AD    |850AD: 350; 950AD: 900; 1000AD: 500                                                                                                                                                           |
|Gnezdovo-Russia                   |54,78°N, 31,87°E |850-1000AD    |850AD: 600; 950AD: 2,8k; 1000AD: 2,2k                                                                                                                                                         |
|Gornal-Russia                     |51,07°N, 35,22°E |850-950AD     |850AD: 450; 950AD: 900                                                                                                                                                                        |
|Idnakar-Russia                    |58,14°N, 52,71°E |850-1236AD    |850AD: 600; 1000AD: 1,8k; 1150AD: 2,5k; 1236AD: 1,2k                                                                                                                                          |
|Rurikovo Gorodishche-Russia       |58,49°N, 31,30°E |850-1500AD    |850AD: 900; 950AD: 1,8k; 1000AD: 1,5k; 1200AD: 1,1k; 1500AD: 600                                                                                                                              |
|Titchikha-Russia                  |51,15°N, 39,19°E |850-950AD     |850AD: 550; 950AD: 1,1k                                                                                                                                                                       |
|Belozersk-Russia                  |60,03°N, 37,79°E |862-1900AD    |862AD: 900; 1100AD: 2,8k; 1200AD: 4,8k; 1300AD: 5,2k; 1500AD: 4,5k; 1700AD: 4,8k; 1800AD: 4,2k; 1897AD: 5,0k; 1900AD: 5,2k                                                                    |
|Murom-Russia                      |55,58°N, 42,05°E |862-1900AD    |862AD: 1,1k; 1000AD: 3,2k; 1200AD: 8,5k; 1300AD: 4,5k; 1500AD: 5,8k; 1700AD: 6,4k; 1800AD: 7,1k; 1850AD: 10,5k; 1897AD: 13,3k; 1900AD: 14,0k                                                  |
|Rostov Veliky-Russia              |57,19°N, 39,41°E |862-1900AD    |862AD: 1,2k; 1000AD: 4,5k; 1100AD: 8,5k; 1200AD: 14,0k; 1300AD: 10,0k; 1500AD: 9,0k; 1700AD: 7,5k; 1800AD: 6,2k; 1850AD: 9,1k; 1897AD: 13,7k; 1900AD: 14,2k                                   |
|Smolensk-Russia                   |54,78°N, 32,04°E |863-1900AD    |863AD: 1,5k; 1000AD: 6,0k; 1100AD: 12,0k; 1200AD: 25,0k; 1300AD: 18,0k; 1500AD: 16,0k; 1700AD: 9,5k; 1800AD: 12,6k; 1850AD: 18,2k; 1897AD: 46,7k; 1900AD: 49,8k                               |
|Bolgar-Russia                     |54,99°N, 49,06°E |900-1900AD    |900AD: 4,5k; 1000AD: 15,0k; 1200AD: 25,0k; 1300AD: 45,0k; 1350AD: 50,0k; 1400AD: 6,0k; 1700AD: 1,5k; 1897AD: 2,8k; 1900AD: 2,8k                                                               |
|Staraya Ryazan-Russia             |54,40°N, 40,43°E |900-1900AD    |900AD: 900; 1000AD: 3,5k; 1100AD: 9,0k; 1200AD: 24,0k; 1237AD: 25,0k; 1300AD: 2,5k; 1500AD: 900; 1700AD: 600; 1897AD: 820; 1900AD: 850                                                        |
|Suzdal-Russia                     |56,42°N, 40,45°E |900-1900AD    |900AD: 800; 1000AD: 3,0k; 1100AD: 7,0k; 1200AD: 12,0k; 1300AD: 8,0k; 1500AD: 7,5k; 1700AD: 6,2k; 1800AD: 5,8k; 1850AD: 6,5k; 1897AD: 6,4k; 1900AD: 6,6k                                       |
|Suvar-Russia                      |54,69°N, 49,42°E |920-1236AD    |920AD: 3,5k; 1000AD: 10,0k; 1200AD: 16,0k; 1236AD: 15,0k                                                                                                                                      |
|Veliky Novgorod-Russia            |58,52°N, 31,27°E |930-1900AD    |930AD: 5,0k; 1000AD: 10,0k; 1100AD: 18,0k; 1200AD: 28,0k; 1300AD: 32,0k; 1400AD: 35,0k; 1500AD: 26,0k; 1600AD: 8,0k; 1700AD: 7,5k; 1800AD: 10,8k; 1850AD: 16,7k; 1897AD: 25,7k; 1900AD: 26,9k |
|Bilyar-Russia                     |54,99°N, 50,39°E |950-1900AD    |950AD: 6,0k; 1100AD: 28,0k; 1200AD: 55,0k; 1236AD: 60,0k; 1300AD: 4,0k; 1700AD: 1,8k; 1897AD: 2,4k; 1900AD: 2,5k                                                                              |
|Gochevo-Russia                    |51,18°N, 35,82°E |950-1300AD    |950AD: 800; 1100AD: 2,2k; 1200AD: 3,5k; 1300AD: 1,2k                                                                                                                                          |
|Muromskiy Gorodok-Russia          |53,34°N, 49,48°E |950-1236AD    |950AD: 3,5k; 1100AD: 9,0k; 1200AD: 14,0k; 1236AD: 12,0k                                                                                                                                       |
|Uglich-Russia                     |57,53°N, 38,33°E |950-1900AD    |950AD: 800; 1200AD: 4,0k; 1300AD: 3,8k; 1500AD: 6,5k; 1700AD: 5,8k; 1800AD: 6,9k; 1850AD: 10,2k; 1897AD: 9,7k; 1900AD: 10,0k                                                                  |
|Kursk-Russia                      |51,74°N, 36,19°E |980-1900AD    |980AD: 1,5k; 1100AD: 4,5k; 1200AD: 8,5k; 1238AD: 7,5k; 1600AD: 5,5k; 1700AD: 11,0k; 1800AD: 18,5k; 1850AD: 31,8k; 1897AD: 75,7k; 1900AD: 78,8k                                                |
|Bryansk-Russia                    |53,25°N, 34,37°E |985-1900AD    |985AD: 900; 1146AD: 2,2k; 1250AD: 6,5k; 1400AD: 7,5k; 1700AD: 5,8k; 1800AD: 7,2k; 1850AD: 11,5k; 1897AD: 24,8k; 1900AD: 26,5k                                                                 |
|Belgorod-Russia                   |50,60°N, 36,59°E |990-1900AD    |990AD: 900; 1596AD: 3,2k; 1700AD: 7,5k; 1800AD: 10,2k; 1850AD: 14,5k; 1897AD: 26,6k; 1900AD: 27,8k                                                                                            |
|Cherdyn-Russia                    |60,40°N, 56,48°E |1000-1900AD   |1000AD: 800; 1300AD: 1,8k; 1472AD: 3,2k; 1600AD: 3,8k; 1700AD: 2,9k; 1800AD: 2,6k; 1897AD: 3,7k; 1900AD: 3,8k                                                                                 |
|Dzhuketau-Russia                  |55,38°N, 50,61°E |1000-1400AD   |1000AD: 2,5k; 1200AD: 8,5k; 1350AD: 12,0k; 1400AD: 3,5k                                                                                                                                       |
|Staraya Russa-Russia              |57,99°N, 31,36°E |1000-1900AD   |1000AD: 2,0k; 1200AD: 6,5k; 1300AD: 7,5k; 1400AD: 9,0k; 1500AD: 8,5k; 1600AD: 3,2k; 1700AD: 4,8k; 1800AD: 5,6k; 1850AD: 8,9k; 1897AD: 15,2k; 1900AD: 15,8k                                    |
|Toropets-Russia                   |56,50°N, 31,64°E |1000-1900AD   |1000AD: 1,4k; 1100AD: 2,5k; 1200AD: 4,2k; 1300AD: 3,8k; 1500AD: 4,8k; 1700AD: 5,6k; 1800AD: 6,4k; 1897AD: 7,4k; 1900AD: 7,6k                                                                  |
|Torzhok-Russia                    |57,04°N, 34,96°E |1000-1900AD   |1000AD: 1,2k; 1200AD: 5,0k; 1300AD: 4,2k; 1500AD: 5,5k; 1700AD: 6,2k; 1800AD: 9,8k; 1850AD: 14,2k; 1897AD: 12,7k; 1900AD: 13,1k                                                               |
|Vladimir-Russia                   |56,13°N, 40,41°E |1000-1900AD   |1000AD: 1,5k; 1100AD: 4,5k; 1200AD: 22,0k; 1237AD: 25,0k; 1300AD: 11,0k; 1500AD: 8,0k; 1700AD: 5,5k; 1800AD: 7,4k; 1850AD: 13,2k; 1897AD: 28,5k; 1900AD: 30,2k                                |
|Vshchizh-Russia                   |53,44°N, 33,79°E |1000-1238AD   |1000AD: 1,2k; 1150AD: 4,5k; 1238AD: 5,0k                                                                                                                                                      |
|Yelabuga-Russia                   |55,76°N, 52,05°E |1000-1900AD   |1000AD: 1,2k; 1200AD: 2,5k; 1600AD: 1,5k; 1700AD: 2,4k; 1800AD: 3,8k; 1850AD: 6,2k; 1897AD: 9,8k; 1900AD: 10,2k                                                                               |
|Kazan-Russia                      |55,80°N, 49,11°E |1005-1900AD   |1005AD: 1,5k; 1200AD: 4,0k; 1400AD: 12,0k; 1500AD: 35,0k; 1552AD: 40,0k; 1650AD: 22,0k; 1700AD: 26,0k; 1800AD: 42,0k; 1850AD: 58,5k; 1897AD: 130,0k; 1900AD: 138,5k                           |
|Yaroslavl-Russia                  |57,63°N, 39,88°E |1010-1900AD   |1010AD: 1,5k; 1100AD: 4,0k; 1200AD: 9,0k; 1300AD: 5,5k; 1500AD: 9,5k; 1650AD: 15,5k; 1700AD: 17,5k; 1800AD: 21,5k; 1850AD: 28,5k; 1897AD: 71,6k; 1900AD: 74,0k                                |
|Pereyaslavl-Zalessky-Russia       |56,74°N, 38,86°E |1050-1900AD   |1050AD: 1,2k; 1200AD: 8,0k; 1300AD: 7,0k; 1500AD: 6,2k; 1700AD: 6,5k; 1800AD: 7,2k; 1850AD: 8,6k; 1897AD: 10,6k; 1900AD: 11,0k                                                                |
|Starodub-Seversky-Russia          |52,58°N, 32,76°E |1080-1900AD   |1080AD: 2,0k; 1200AD: 5,5k; 1400AD: 4,5k; 1700AD: 7,8k; 1800AD: 8,9k; 1850AD: 11,2k; 1897AD: 26,3k; 1900AD: 27,1k                                                                             |
|Ryazan-Russia                     |54,63°N, 39,69°E |1095-1900AD   |1095AD: 1,5k; 1200AD: 4,5k; 1300AD: 8,5k; 1400AD: 14,0k; 1500AD: 12,0k; 1700AD: 8,2k; 1800AD: 11,5k; 1850AD: 19,8k; 1897AD: 46,1k; 1900AD: 48,5k                                              |
|Rybinsk-Russia                    |58,04°N, 38,84°E |1100-1900AD   |1100AD: 900; 1200AD: 1,8k; 1500AD: 1,5k; 1700AD: 2,8k; 1800AD: 4,2k; 1850AD: 9,8k; 1897AD: 25,3k; 1900AD: 27,5k                                                                               |
|Pronsk-Russia                     |54,12°N, 39,60°E |1131-1900AD   |1131AD: 1,8k; 1200AD: 5,5k; 1300AD: 3,5k; 1500AD: 3,2k; 1700AD: 2,4k; 1800AD: 2,1k; 1897AD: 1,9k; 1900AD: 2,0k                                                                                |
|Ksnyatin-Russia                   |57,15°N, 37,73°E |1134-1400AD   |1134AD: 1,2k; 1200AD: 2,5k; 1238AD: 1,8k; 1400AD: 800                                                                                                                                         |
|Tver-Russia                       |56,86°N, 35,92°E |1135-1900AD   |1135AD: 1,5k; 1200AD: 4,5k; 1300AD: 12,0k; 1400AD: 18,0k; 1500AD: 15,0k; 1700AD: 9,5k; 1800AD: 17,5k; 1850AD: 25,2k; 1897AD: 53,5k; 1900AD: 56,2k                                             |
|Volokolamsk-Russia                |56,04°N, 35,96°E |1135-1900AD   |1135AD: 1,6k; 1200AD: 3,5k; 1300AD: 4,0k; 1500AD: 4,8k; 1700AD: 2,8k; 1800AD: 2,9k; 1897AD: 3,1k; 1900AD: 3,2k                                                                                |
|Viazniki-Russia                   |56,24°N, 42,16°E |1136-1900AD   |1136AD: 1,2k; 1200AD: 2,2k; 1600AD: 1,8k; 1700AD: 2,9k; 1800AD: 4,1k; 1897AD: 8,9k; 1900AD: 9,3k                                                                                              |
|Bezhetsk-Russia                   |57,78°N, 36,70°E |1137-1900AD   |1137AD: 1,4k; 1200AD: 2,8k; 1400AD: 3,5k; 1700AD: 3,2k; 1800AD: 4,1k; 1897AD: 9,4k; 1900AD: 9,8k                                                                                              |
|Mikhailov-Russia                  |54,23°N, 39,03°E |1137-1900AD   |1137AD: 900; 1551AD: 3,5k; 1700AD: 4,2k; 1800AD: 5,4k; 1897AD: 9,2k; 1900AD: 9,4k                                                                                                             |
|Olonets-Russia                    |60,98°N, 32,97°E |1137-1900AD   |1137AD: 500; 1500AD: 1,2k; 1650AD: 3,5k; 1700AD: 2,8k; 1800AD: 1,9k; 1897AD: 1,2k; 1900AD: 1,3k                                                                                               |
|Roslavl-Russia                    |53,95°N, 32,86°E |1137-1900AD   |1137AD: 1,4k; 1200AD: 2,6k; 1500AD: 3,2k; 1700AD: 3,8k; 1800AD: 5,2k; 1850AD: 7,4k; 1897AD: 17,8k; 1900AD: 18,6k                                                                              |
|Plyos-Russia                      |57,46°N, 41,52°E |1141-1900AD   |1141AD: 900; 1410AD: 1,8k; 1700AD: 1,6k; 1800AD: 2,1k; 1897AD: 2,2k; 1900AD: 2,2k                                                                                                             |
|Karachev-Russia                   |53,12°N, 34,99°E |1146-1900AD   |1146AD: 1,6k; 1200AD: 3,0k; 1400AD: 3,5k; 1700AD: 4,2k; 1800AD: 6,5k; 1897AD: 15,5k; 1900AD: 16,0k                                                                                            |
|Kozelsk-Russia                    |54,04°N, 35,78°E |1146-1900AD   |1146AD: 1,5k; 1238AD: 3,2k; 1400AD: 3,5k; 1700AD: 3,8k; 1800AD: 4,9k; 1897AD: 5,6k; 1900AD: 5,8k                                                                                              |
|Mtsensk-Russia                    |53,28°N, 36,57°E |1146-1900AD   |1146AD: 1,4k; 1400AD: 2,8k; 1650AD: 4,5k; 1700AD: 5,2k; 1800AD: 7,8k; 1850AD: 12,5k; 1897AD: 9,8k; 1900AD: 10,1k                                                                              |
|Sevsk-Russia                      |52,15°N, 34,49°E |1146-1900AD   |1146AD: 1,2k; 1600AD: 3,2k; 1700AD: 5,4k; 1800AD: 6,2k; 1897AD: 9,2k; 1900AD: 9,5k                                                                                                            |
|Tula-Russia                       |54,20°N, 37,62°E |1146-1900AD   |1146AD: 1,2k; 1300AD: 2,5k; 1509AD: 6,5k; 1650AD: 12,0k; 1700AD: 16,5k; 1800AD: 32,0k; 1850AD: 54,6k; 1897AD: 114,7k; 1900AD: 121,5k                                                          |
|Yelets-Russia                     |52,62°N, 38,50°E |1146-1900AD   |1146AD: 2,0k; 1395AD: 3,5k; 1600AD: 4,2k; 1700AD: 7,8k; 1800AD: 14,5k; 1850AD: 26,5k; 1897AD: 47,0k; 1900AD: 49,2k                                                                            |
|Zaraysk-Russia                    |54,76°N, 38,87°E |1146-1900AD   |1146AD: 1,1k; 1237AD: 2,2k; 1531AD: 4,5k; 1700AD: 5,2k; 1800AD: 6,8k; 1850AD: 6,2k; 1897AD: 8,1k; 1900AD: 8,3k                                                                                |
|Belev-Russia                      |53,81°N, 36,14°E |1147-1900AD   |1147AD: 1,2k; 1400AD: 3,2k; 1650AD: 4,8k; 1700AD: 5,6k; 1800AD: 7,2k; 1897AD: 9,6k; 1900AD: 9,8k                                                                                              |
|Moscow-Russia                     |55,76°N, 37,62°E |1147-1900AD   |1147AD: 1,2k; 1200AD: 4,0k; 1300AD: 15,0k; 1400AD: 40,0k; 1500AD: 80,0k; 1600AD: 120,0k; 1700AD: 150,0k; 1750AD: 165,0k; 1800AD: 250,0k; 1850AD: 368,8k; 1897AD: 1038,6k; 1900AD: 1174,7k     |
|Vologda-Russia                    |59,22°N, 39,89°E |1147-1900AD   |1147AD: 1,1k; 1200AD: 2,0k; 1400AD: 4,2k; 1550AD: 8,5k; 1650AD: 11,0k; 1700AD: 10,5k; 1800AD: 11,2k; 1850AD: 16,8k; 1897AD: 27,7k; 1900AD: 29,1k                                              |
|Dorogobuzh-Russia                 |54,92°N, 33,30°E |1150-1900AD   |1150AD: 1,5k; 1200AD: 2,8k; 1500AD: 4,2k; 1700AD: 4,5k; 1800AD: 5,8k; 1897AD: 6,5k; 1900AD: 6,7k                                                                                              |
|Kexholm-Russia                    |61,04°N, 30,13°E |1150-1900AD   |1150AD: 800; 1300AD: 1,6k; 1500AD: 2,8k; 1700AD: 1,4k; 1897AD: 1,8k; 1900AD: 1,9k                                                                                                             |
|Tetyushi-Russia                   |54,94°N, 48,84°E |1150-1900AD   |1150AD: 1,2k; 1555AD: 1,8k; 1700AD: 2,2k; 1800AD: 3,1k; 1897AD: 4,8k; 1900AD: 4,9k                                                                                                            |
|Yelnya-Russia                     |54,58°N, 33,18°E |1150-1900AD   |1150AD: 900; 1500AD: 1,6k; 1800AD: 2,2k; 1897AD: 2,4k; 1900AD: 2,5k                                                                                                                           |
|Gorodets-Russia                   |56,65°N, 43,47°E |1152-1900AD   |1152AD: 2,0k; 1200AD: 6,5k; 1263AD: 5,5k; 1400AD: 3,5k; 1700AD: 3,2k; 1800AD: 4,8k; 1897AD: 6,3k; 1900AD: 6,6k                                                                                |
|Kasimov-Russia                    |54,94°N, 41,40°E |1152-1900AD   |1152AD: 1,2k; 1300AD: 2,5k; 1452AD: 6,5k; 1550AD: 8,0k; 1700AD: 6,2k; 1800AD: 7,8k; 1850AD: 10,2k; 1897AD: 13,5k; 1900AD: 14,1k                                                               |
|Kideksha-Russia                   |56,43°N, 40,53°E |1152-1900AD   |1152AD: 1,4k; 1200AD: 2,0k; 1300AD: 700; 1500AD: 500; 1897AD: 650; 1900AD: 680                                                                                                                |
|Kostroma-Russia                   |57,77°N, 40,93°E |1152-1900AD   |1152AD: 1,5k; 1200AD: 4,5k; 1300AD: 5,5k; 1500AD: 8,5k; 1650AD: 12,0k; 1700AD: 11,5k; 1800AD: 12,8k; 1850AD: 18,5k; 1897AD: 41,4k; 1900AD: 43,2k                                              |
|Lgov-Russia                       |51,67°N, 35,26°E |1152-1900AD   |1152AD: 1,1k; 1779AD: 1,8k; 1850AD: 3,4k; 1897AD: 4,3k; 1900AD: 4,5k                                                                                                                          |
|Rylsk-Russia                      |51,57°N, 34,68°E |1152-1900AD   |1152AD: 2,0k; 1200AD: 4,5k; 1500AD: 4,0k; 1700AD: 5,5k; 1800AD: 6,8k; 1897AD: 11,5k; 1900AD: 11,9k                                                                                            |
|Starodub-on-Klyazma-Russia        |56,39°N, 41,43°E |1152-1900AD   |1152AD: 1,8k; 1200AD: 3,8k; 1300AD: 2,8k; 1500AD: 1,5k; 1700AD: 800; 1897AD: 920; 1900AD: 950                                                                                                 |
|Yuryev-Polsky-Russia              |56,50°N, 39,68°E |1152-1900AD   |1152AD: 2,0k; 1200AD: 4,5k; 1300AD: 3,2k; 1500AD: 3,5k; 1700AD: 3,1k; 1800AD: 3,6k; 1897AD: 5,8k; 1900AD: 6,0k                                                                                |
|Zvenigorod-Russia                 |55,73°N, 36,85°E |1152-1900AD   |1152AD: 1,1k; 1300AD: 2,2k; 1400AD: 4,5k; 1500AD: 3,8k; 1700AD: 2,1k; 1800AD: 2,4k; 1897AD: 2,4k; 1900AD: 2,5k                                                                                |
|Rostislavl-Ryazanskiy-Russia      |54,94°N, 38,62°E |1153-1500AD   |1153AD: 1,4k; 1200AD: 3,0k; 1300AD: 2,2k; 1500AD: 900                                                                                                                                         |
|Dmitrov-Russia                    |56,34°N, 37,52°E |1154-1900AD   |1154AD: 1,4k; 1200AD: 3,2k; 1300AD: 3,8k; 1500AD: 5,5k; 1700AD: 3,2k; 1800AD: 3,5k; 1897AD: 4,5k; 1900AD: 4,7k                                                                                |
|Bogolyubovo-Russia                |56,20°N, 40,54°E |1158-1900AD   |1158AD: 2,5k; 1200AD: 3,5k; 1300AD: 1,2k; 1500AD: 900; 1700AD: 1,1k; 1897AD: 2,1k; 1900AD: 2,2k                                                                                               |
|Galich-Russia                     |58,38°N, 42,35°E |1159-1900AD   |1159AD: 1,8k; 1250AD: 3,5k; 1400AD: 6,0k; 1500AD: 4,8k; 1700AD: 4,2k; 1800AD: 4,9k; 1897AD: 6,2k; 1900AD: 6,4k                                                                                |
|Trubchevsk-Russia                 |52,58°N, 33,77°E |1164-1900AD   |1164AD: 1,8k; 1200AD: 3,2k; 1500AD: 3,5k; 1700AD: 3,8k; 1800AD: 4,6k; 1897AD: 7,4k; 1900AD: 7,6k                                                                                              |
|Krasny-Russia                     |54,56°N, 31,43°E |1165-1900AD   |1165AD: 1,1k; 1500AD: 1,5k; 1800AD: 2,1k; 1897AD: 2,8k; 1900AD: 2,8k                                                                                                                          |
|Velikiye Luki-Russia              |56,34°N, 30,53°E |1166-1900AD   |1166AD: 1,5k; 1300AD: 2,2k; 1500AD: 3,8k; 1700AD: 3,5k; 1800AD: 4,1k; 1850AD: 5,6k; 1897AD: 8,5k; 1900AD: 8,9k                                                                                |
|Gorokhovets-Russia                |56,20°N, 42,69°E |1168-1900AD   |1168AD: 1,1k; 1238AD: 1,8k; 1600AD: 2,2k; 1700AD: 3,1k; 1800AD: 2,8k; 1897AD: 2,3k; 1900AD: 2,4k                                                                                              |
|Kolomna-Russia                    |55,08°N, 38,78°E |1177-1900AD   |1177AD: 2,5k; 1237AD: 4,5k; 1300AD: 5,5k; 1400AD: 8,5k; 1500AD: 11,0k; 1700AD: 7,8k; 1800AD: 10,2k; 1850AD: 15,4k; 1897AD: 20,3k; 1900AD: 21,5k                                               |
|Kotelnich-Russia                  |58,31°N, 48,35°E |1181-1900AD   |1181AD: 800; 1500AD: 1,8k; 1700AD: 2,4k; 1800AD: 3,1k; 1897AD: 4,2k; 1900AD: 4,4k                                                                                                             |
|Vyatka-Russia                     |58,60°N, 49,67°E |1181-1900AD   |1181AD: 900; 1374AD: 2,5k; 1489AD: 5,2k; 1650AD: 6,8k; 1700AD: 7,5k; 1800AD: 9,2k; 1850AD: 14,8k; 1897AD: 25,0k; 1900AD: 26,8k                                                                |
|Bolkhov-Russia                    |53,44°N, 36,00°E |1196-1900AD   |1196AD: 1,2k; 1550AD: 4,2k; 1700AD: 7,5k; 1800AD: 12,8k; 1850AD: 17,5k; 1897AD: 21,4k; 1900AD: 22,0k                                                                                          |
|Kholm-Russia                      |57,15°N, 31,18°E |1200-1900AD   |1200AD: 900; 1500AD: 1,6k; 1700AD: 1,8k; 1800AD: 2,7k; 1897AD: 5,9k; 1900AD: 6,1k                                                                                                             |
|Kholmogory-Russia                 |64,22°N, 41,66°E |1200-1900AD   |1200AD: 900; 1400AD: 2,4k; 1550AD: 5,5k; 1650AD: 6,8k; 1700AD: 5,2k; 1800AD: 1,6k; 1897AD: 1,1k; 1900AD: 1,1k                                                                                 |
|Mologa-Russia                     |58,20°N, 38,44°E |1200-1900AD   |1200AD: 1,5k; 1400AD: 4,5k; 1500AD: 3,5k; 1700AD: 2,6k; 1800AD: 3,2k; 1897AD: 4,3k; 1900AD: 4,4k                                                                                              |
|Velikiy Ustyug-Russia             |60,76°N, 46,30°E |1207-1900AD   |1207AD: 1,8k; 1400AD: 3,8k; 1550AD: 6,5k; 1650AD: 9,5k; 1700AD: 9,2k; 1800AD: 10,8k; 1850AD: 9,5k; 1897AD: 11,1k; 1900AD: 11,5k                                                               |
|Kadom-Russia                      |54,56°N, 42,47°E |1209-1900AD   |1209AD: 1,1k; 1500AD: 2,5k; 1700AD: 3,4k; 1800AD: 4,6k; 1897AD: 6,3k; 1900AD: 6,5k                                                                                                            |
|Rzhev-Russia                      |56,26°N, 34,33°E |1216-1900AD   |1216AD: 1,8k; 1400AD: 4,2k; 1500AD: 5,5k; 1700AD: 6,8k; 1800AD: 9,5k; 1850AD: 16,2k; 1897AD: 21,3k; 1900AD: 22,4k                                                                             |
|Zubtsov-Russia                    |56,17°N, 34,59°E |1216-1900AD   |1216AD: 1,2k; 1350AD: 2,8k; 1500AD: 2,5k; 1700AD: 2,1k; 1800AD: 2,9k; 1897AD: 3,0k; 1900AD: 3,1k                                                                                              |
|Nizhny Novgorod-Russia            |56,33°N, 44,01°E |1221-1900AD   |1221AD: 2,5k; 1300AD: 8,0k; 1370AD: 14,0k; 1500AD: 12,0k; 1650AD: 16,5k; 1700AD: 18,5k; 1800AD: 22,0k; 1850AD: 36,5k; 1897AD: 90,1k; 1900AD: 95,8k                                            |
|Mozhaisk-Russia                   |55,50°N, 36,03°E |1231-1900AD   |1231AD: 1,5k; 1300AD: 2,8k; 1450AD: 5,2k; 1500AD: 5,8k; 1700AD: 3,6k; 1800AD: 3,9k; 1897AD: 3,2k; 1900AD: 3,4k                                                                                |
|Kashin-Russia                     |57,36°N, 37,61°E |1238-1900AD   |1238AD: 1,5k; 1300AD: 3,8k; 1400AD: 5,5k; 1500AD: 4,8k; 1700AD: 4,6k; 1800AD: 5,4k; 1897AD: 7,5k; 1900AD: 7,8k                                                                                |
|Meshchovsk-Russia                 |54,32°N, 35,28°E |1238-1900AD   |1238AD: 1,2k; 1500AD: 2,6k; 1700AD: 3,1k; 1800AD: 4,2k; 1897AD: 3,6k; 1900AD: 3,8k                                                                                                            |
|Porkhov-Russia                    |57,77°N, 29,55°E |1239-1900AD   |1239AD: 700; 1400AD: 2,2k; 1500AD: 2,8k; 1700AD: 1,9k; 1800AD: 2,8k; 1897AD: 5,6k; 1900AD: 5,8k                                                                                               |
|Vyazma-Russia                     |55,21°N, 34,29°E |1239-1900AD   |1239AD: 1,6k; 1400AD: 3,8k; 1500AD: 5,5k; 1700AD: 6,8k; 1800AD: 9,5k; 1850AD: 11,8k; 1897AD: 15,6k; 1900AD: 16,2k                                                                             |
|Koporye-Russia                    |59,71°N, 29,03°E |1240-1900AD   |1240AD: 500; 1300AD: 900; 1500AD: 1,4k; 1700AD: 800; 1897AD: 720; 1900AD: 750                                                                                                                 |
|Tarusa-Russia                     |54,73°N, 37,18°E |1246-1900AD   |1246AD: 1,4k; 1400AD: 2,2k; 1700AD: 1,5k; 1800AD: 1,8k; 1897AD: 2,0k; 1900AD: 2,0k                                                                                                            |
|Staritsa-Russia                   |56,51°N, 34,94°E |1297-1900AD   |1297AD: 1,6k; 1400AD: 3,5k; 1550AD: 5,2k; 1700AD: 3,1k; 1800AD: 3,8k; 1897AD: 6,4k; 1900AD: 6,6k                                                                                              |
|Cheboksary-Russia                 |56,15°N, 47,25°E |1300-1900AD   |1300AD: 1,4k; 1469AD: 2,2k; 1555AD: 3,5k; 1700AD: 4,2k; 1800AD: 4,8k; 1897AD: 4,7k; 1900AD: 5,0k                                                                                              |
|Dankov-Russia                     |53,25°N, 39,16°E |1300-1900AD   |1300AD: 900; 1568AD: 2,2k; 1700AD: 2,6k; 1800AD: 2,9k; 1897AD: 9,1k; 1900AD: 9,4k                                                                                                             |
|Romanov-Borisoglebsk-Russia       |57,88°N, 39,54°E |1300-1900AD   |1300AD: 1,8k; 1500AD: 3,2k; 1700AD: 3,9k; 1800AD: 4,8k; 1897AD: 6,7k; 1900AD: 6,9k                                                                                                            |
|Shenkursk-Russia                  |62,11°N, 42,90°E |1300-1900AD   |1300AD: 600; 1550AD: 1,5k; 1700AD: 1,8k; 1800AD: 1,2k; 1897AD: 1,5k; 1900AD: 1,6k                                                                                                             |
|Ustyuzhna-Russia                  |58,84°N, 36,43°E |1300-1900AD   |1300AD: 1,2k; 1500AD: 4,2k; 1600AD: 6,0k; 1700AD: 4,5k; 1800AD: 3,2k; 1897AD: 5,1k; 1900AD: 5,3k                                                                                              |
|Mukhshi-Russia                    |53,88°N, 43,69°E |1313-1900AD   |1313AD: 14,0k; 1360AD: 18,0k; 1400AD: 2,5k; 1650AD: 2,8k; 1800AD: 3,6k; 1897AD: 4,7k; 1900AD: 4,8k                                                                                            |
|Klin-Russia                       |56,33°N, 36,73°E |1317-1900AD   |1317AD: 1,1k; 1500AD: 2,2k; 1700AD: 1,8k; 1800AD: 2,5k; 1897AD: 4,7k; 1900AD: 4,9k                                                                                                            |
|Gdov-Russia                       |58,74°N, 27,81°E |1323-1900AD   |1323AD: 600; 1450AD: 1,6k; 1500AD: 2,0k; 1700AD: 1,2k; 1897AD: 2,1k; 1900AD: 2,2k                                                                                                             |
|Shlisselburg-Russia               |59,94°N, 31,03°E |1323-1900AD   |1323AD: 800; 1500AD: 2,0k; 1700AD: 1,8k; 1800AD: 3,1k; 1897AD: 5,3k; 1900AD: 5,6k                                                                                                             |
|Ruza-Russia                       |55,70°N, 36,20°E |1328-1900AD   |1328AD: 1,1k; 1500AD: 2,4k; 1700AD: 1,8k; 1800AD: 2,3k; 1897AD: 2,3k; 1900AD: 2,4k                                                                                                            |
|Serpukhov-Russia                  |54,92°N, 37,41°E |1339-1900AD   |1339AD: 2,0k; 1400AD: 4,8k; 1500AD: 6,5k; 1700AD: 5,8k; 1800AD: 6,9k; 1850AD: 14,2k; 1897AD: 30,6k; 1900AD: 32,5k                                                                             |
|Ostrov-Russia                     |57,34°N, 28,35°E |1341-1900AD   |1341AD: 900; 1500AD: 2,5k; 1700AD: 1,8k; 1800AD: 2,4k; 1897AD: 6,3k; 1900AD: 6,5k                                                                                                             |
|Aleksin-Russia                    |54,50°N, 37,07°E |1348-1900AD   |1348AD: 1,2k; 1500AD: 2,5k; 1700AD: 2,2k; 1800AD: 2,8k; 1897AD: 3,5k; 1900AD: 3,6k                                                                                                            |
|Soligalich-Russia                 |59,08°N, 42,29°E |1350-1900AD   |1350AD: 1,5k; 1500AD: 3,2k; 1700AD: 2,8k; 1800AD: 3,1k; 1897AD: 3,4k; 1900AD: 3,5k                                                                                                            |
|Kashira-Russia                    |54,84°N, 38,15°E |1356-1900AD   |1356AD: 1,2k; 1500AD: 2,8k; 1700AD: 2,6k; 1800AD: 3,4k; 1897AD: 4,1k; 1900AD: 4,2k                                                                                                            |
|Borovsk-Russia                    |55,21°N, 36,49°E |1358-1900AD   |1358AD: 1,5k; 1500AD: 3,6k; 1700AD: 4,2k; 1800AD: 5,9k; 1850AD: 8,4k; 1897AD: 8,4k; 1900AD: 8,6k                                                                                              |
|Bely-Russia                       |55,84°N, 32,94°E |1359-1900AD   |1359AD: 1,2k; 1500AD: 2,5k; 1700AD: 3,2k; 1800AD: 4,6k; 1897AD: 7,0k; 1900AD: 7,1k                                                                                                            |
|Kaluga-Russia                     |54,53°N, 36,28°E |1371-1900AD   |1371AD: 1,8k; 1500AD: 4,5k; 1650AD: 10,5k; 1700AD: 13,5k; 1800AD: 23,0k; 1850AD: 31,2k; 1897AD: 49,5k; 1900AD: 51,2k                                                                          |
|Ostashkov-Russia                  |57,15°N, 33,11°E |1371-1900AD   |1371AD: 1,2k; 1500AD: 2,4k; 1700AD: 4,5k; 1800AD: 7,2k; 1850AD: 9,8k; 1897AD: 10,4k; 1900AD: 10,8k                                                                                            |
|Venyov-Russia                     |54,35°N, 38,27°E |1371-1900AD   |1371AD: 1,1k; 1550AD: 2,4k; 1700AD: 2,8k; 1800AD: 3,5k; 1897AD: 5,2k; 1900AD: 5,3k                                                                                                            |
|Vereya-Russia                     |55,34°N, 36,19°E |1371-1900AD   |1371AD: 1,4k; 1500AD: 3,2k; 1700AD: 4,5k; 1800AD: 5,8k; 1850AD: 5,4k; 1897AD: 3,7k; 1900AD: 3,8k                                                                                              |
|Kurmysh-Russia                    |55,83°N, 46,05°E |1372-1900AD   |1372AD: 1,5k; 1500AD: 2,5k; 1700AD: 2,2k; 1800AD: 1,9k; 1897AD: 3,2k; 1900AD: 3,2k                                                                                                            |
|Kargopol-Russia                   |61,51°N, 38,95°E |1380-1900AD   |1380AD: 1,4k; 1500AD: 3,5k; 1600AD: 5,2k; 1700AD: 4,6k; 1800AD: 3,1k; 1897AD: 3,1k; 1900AD: 3,1k                                                                                              |
|Chukhloma-Russia                  |58,76°N, 42,69°E |1381-1900AD   |1381AD: 1,1k; 1500AD: 2,0k; 1700AD: 1,8k; 1800AD: 2,1k; 1897AD: 2,2k; 1900AD: 2,2k                                                                                                            |
|Elatma-Russia                     |54,97°N, 41,75°E |1381-1900AD   |1381AD: 1,2k; 1600AD: 2,8k; 1700AD: 3,9k; 1800AD: 5,4k; 1897AD: 7,1k; 1900AD: 7,3k                                                                                                            |
|Yamburg-Russia                    |59,37°N, 28,61°E |1384-1900AD   |1384AD: 900; 1500AD: 1,8k; 1700AD: 1,1k; 1800AD: 1,6k; 1897AD: 4,6k; 1900AD: 4,8k                                                                                                             |
|Temnikov-Russia                   |54,63°N, 43,21°E |1388-1900AD   |1388AD: 2,2k; 1536AD: 3,8k; 1700AD: 4,2k; 1800AD: 5,1k; 1897AD: 5,4k; 1900AD: 5,5k                                                                                                            |
|Mamadysh-Russia                   |55,72°N, 51,41°E |1391-1900AD   |1391AD: 900; 1700AD: 1,6k; 1800AD: 2,4k; 1897AD: 4,2k; 1900AD: 4,3k                                                                                                                           |
|Aleksandrov-Russia                |56,40°N, 38,71°E |1400-1900AD   |1400AD: 800; 1570AD: 8,5k; 1700AD: 2,4k; 1800AD: 3,1k; 1897AD: 6,8k; 1900AD: 7,1k                                                                                                             |
|Kirzhach-Russia                   |56,15°N, 38,85°E |1400-1900AD   |1400AD: 600; 1700AD: 1,2k; 1800AD: 1,9k; 1897AD: 4,9k; 1900AD: 5,0k                                                                                                                           |
|Sergiyev Posad-Russia             |56,30°N, 38,13°E |1400-1900AD   |1400AD: 1,2k; 1550AD: 4,5k; 1700AD: 6,5k; 1800AD: 9,2k; 1850AD: 14,5k; 1897AD: 25,0k; 1900AD: 26,5k                                                                                           |
|Tikhvin-Russia                    |59,65°N, 33,54°E |1400-1900AD   |1400AD: 600; 1560AD: 2,5k; 1700AD: 3,8k; 1800AD: 4,2k; 1850AD: 6,1k; 1897AD: 6,6k; 1900AD: 6,8k                                                                                               |
|Maloyaroslavets-Russia            |55,01°N, 36,47°E |1402-1900AD   |1402AD: 1,1k; 1500AD: 1,8k; 1700AD: 1,6k; 1800AD: 2,1k; 1897AD: 2,5k; 1900AD: 2,6k                                                                                                            |
|Lyskovo-Russia                    |56,01°N, 45,03°E |1410-1900AD   |1410AD: 1,1k; 1700AD: 3,5k; 1800AD: 5,2k; 1897AD: 7,8k; 1900AD: 8,1k                                                                                                                          |
|Opochka-Russia                    |56,71°N, 28,66°E |1414-1900AD   |1414AD: 1,1k; 1500AD: 2,6k; 1700AD: 2,0k; 1800AD: 3,1k; 1897AD: 5,7k; 1900AD: 6,0k                                                                                                            |
|Sebezh-Russia                     |56,28°N, 28,48°E |1414-1900AD   |1414AD: 1,2k; 1535AD: 2,2k; 1800AD: 2,8k; 1897AD: 4,3k; 1900AD: 4,5k                                                                                                                          |
|Kineshma-Russia                   |57,44°N, 42,15°E |1429-1900AD   |1429AD: 1,2k; 1600AD: 2,5k; 1700AD: 2,8k; 1800AD: 3,2k; 1850AD: 3,9k; 1897AD: 7,6k; 1900AD: 8,2k                                                                                              |
|Solikamsk-Russia                  |59,63°N, 56,77°E |1430-1900AD   |1430AD: 1,2k; 1550AD: 3,5k; 1650AD: 6,8k; 1700AD: 7,2k; 1800AD: 4,5k; 1897AD: 4,1k; 1900AD: 4,2k                                                                                              |
|Kalyazin-Russia                   |57,24°N, 37,86°E |1450-1900AD   |1450AD: 900; 1700AD: 2,4k; 1800AD: 4,6k; 1850AD: 6,8k; 1897AD: 5,5k; 1900AD: 5,7k                                                                                                             |
|Kem-Russia                        |64,96°N, 34,58°E |1450-1900AD   |1450AD: 500; 1600AD: 1,1k; 1700AD: 1,4k; 1800AD: 1,6k; 1897AD: 2,4k; 1900AD: 2,6k                                                                                                             |
|Orlov-Vyatka-Russia               |58,54°N, 48,89°E |1459-1900AD   |1459AD: 1,1k; 1700AD: 1,9k; 1800AD: 2,6k; 1897AD: 3,3k; 1900AD: 3,4k                                                                                                                          |
|Vyshniy Volochyok-Russia          |57,59°N, 34,56°E |1471-1900AD   |1471AD: 900; 1700AD: 2,2k; 1800AD: 6,4k; 1850AD: 11,5k; 1897AD: 16,6k; 1900AD: 17,5k                                                                                                          |
|Balakhna-Russia                   |56,49°N, 43,54°E |1474-1900AD   |1474AD: 2,5k; 1550AD: 5,8k; 1700AD: 5,2k; 1800AD: 4,5k; 1897AD: 5,1k; 1900AD: 5,3k                                                                                                            |
|Bogorodsk-Russia                  |55,85°N, 38,44°E |1500-1900AD   |1500AD: 500; 1781AD: 1,1k; 1850AD: 3,2k; 1897AD: 11,1k; 1900AD: 12,2k                                                                                                                         |
|Borovichi-Russia                  |58,39°N, 33,92°E |1500-1900AD   |1500AD: 700; 1700AD: 1,8k; 1800AD: 4,6k; 1850AD: 8,1k; 1897AD: 9,4k; 1900AD: 9,9k                                                                                                             |
|Dukhovshchina-Russia              |55,19°N, 32,41°E |1500-1900AD   |1500AD: 600; 1777AD: 1,4k; 1897AD: 3,1k; 1900AD: 3,2k                                                                                                                                         |
|Onega-Russia                      |63,91°N, 38,11°E |1500-1900AD   |1500AD: 600; 1700AD: 1,1k; 1800AD: 1,4k; 1897AD: 2,5k; 1900AD: 2,7k                                                                                                                           |
|Porechye-Russia                   |55,27°N, 31,52°E |1500-1900AD   |1500AD: 800; 1750AD: 2,8k; 1800AD: 4,5k; 1897AD: 5,7k; 1900AD: 5,8k                                                                                                                           |
|Sychevka-Russia                   |55,83°N, 34,27°E |1500-1900AD   |1500AD: 700; 1776AD: 1,8k; 1850AD: 3,8k; 1897AD: 4,8k; 1900AD: 5,0k                                                                                                                           |
|Valday-Russia                     |57,97°N, 33,25°E |1500-1900AD   |1500AD: 800; 1700AD: 2,1k; 1800AD: 3,4k; 1850AD: 4,5k; 1897AD: 2,9k; 1900AD: 3,1k                                                                                                             |
|Ryazhsk-Russia                    |53,71°N, 40,06°E |1502-1900AD   |1502AD: 1,1k; 1700AD: 2,5k; 1800AD: 3,2k; 1897AD: 14,8k; 1900AD: 15,4k                                                                                                                        |
|Nevel-Russia                      |56,02°N, 29,93°E |1504-1900AD   |1504AD: 1,8k; 1700AD: 2,9k; 1800AD: 4,2k; 1897AD: 9,3k; 1900AD: 9,7k                                                                                                                          |
|Slobodskoy-Russia                 |58,73°N, 50,18°E |1505-1900AD   |1505AD: 1,4k; 1700AD: 3,6k; 1800AD: 5,2k; 1850AD: 6,5k; 1897AD: 7,4k; 1900AD: 7,6k                                                                                                            |
|Krasny Kholm-Russia               |58,06°N, 37,12°E |1518-1900AD   |1518AD: 700; 1700AD: 1,4k; 1800AD: 1,9k; 1897AD: 2,5k; 1900AD: 2,6k                                                                                                                           |
|Vasilsursk-Russia                 |56,13°N, 46,01°E |1523-1900AD   |1523AD: 1,8k; 1700AD: 2,1k; 1800AD: 2,4k; 1897AD: 3,8k; 1900AD: 3,9k                                                                                                                          |
|Velizh-Russia                     |55,61°N, 31,20°E |1536-1900AD   |1536AD: 1,8k; 1700AD: 3,5k; 1800AD: 5,8k; 1897AD: 12,2k; 1900AD: 12,6k                                                                                                                        |
|Shuya-Russia                      |56,85°N, 41,39°E |1539-1900AD   |1539AD: 1,5k; 1650AD: 2,8k; 1700AD: 3,2k; 1800AD: 4,5k; 1850AD: 8,9k; 1897AD: 19,6k; 1900AD: 20,8k                                                                                            |
|Lyubim-Russia                     |58,36°N, 40,69°E |1546-1900AD   |1546AD: 800; 1700AD: 1,5k; 1800AD: 2,0k; 1897AD: 3,0k; 1900AD: 3,1k                                                                                                                           |
|Danilov-Russia                    |58,19°N, 40,17°E |1550-1900AD   |1550AD: 700; 1700AD: 1,4k; 1800AD: 2,1k; 1897AD: 4,3k; 1900AD: 4,5k                                                                                                                           |
|Kovrov-Russia                     |56,36°N, 41,32°E |1550-1900AD   |1550AD: 600; 1700AD: 1,1k; 1800AD: 1,8k; 1850AD: 3,5k; 1897AD: 14,6k; 1900AD: 15,8k                                                                                                           |
|Mezen-Russia                      |65,85°N, 44,24°E |1550-1900AD   |1550AD: 700; 1700AD: 1,3k; 1800AD: 1,5k; 1897AD: 1,8k; 1900AD: 1,9k                                                                                                                           |
|Sviyazhsk-Russia                  |55,77°N, 48,66°E |1551-1900AD   |1551AD: 5,0k; 1650AD: 3,8k; 1700AD: 3,2k; 1800AD: 2,5k; 1897AD: 2,4k; 1900AD: 2,4k                                                                                                            |
|Alatyr-Russia                     |54,84°N, 46,58°E |1552-1900AD   |1552AD: 2,0k; 1700AD: 4,2k; 1800AD: 5,8k; 1850AD: 8,5k; 1897AD: 12,2k; 1900AD: 12,8k                                                                                                          |
|Arzamas-Russia                    |55,39°N, 43,84°E |1552-1900AD   |1552AD: 1,8k; 1650AD: 5,5k; 1700AD: 7,2k; 1800AD: 8,9k; 1850AD: 10,5k; 1897AD: 10,6k; 1900AD: 11,0k                                                                                           |
|Shatsk-Russia                     |54,03°N, 41,71°E |1553-1900AD   |1553AD: 2,4k; 1700AD: 4,5k; 1800AD: 5,8k; 1897AD: 13,9k; 1900AD: 14,3k                                                                                                                        |
|Laishevo-Russia                   |55,40°N, 49,55°E |1557-1900AD   |1557AD: 1,2k; 1700AD: 1,9k; 1800AD: 2,6k; 1897AD: 3,7k; 1900AD: 3,9k                                                                                                                          |
|Usolye-Russia                     |59,42°N, 56,68°E |1558-1900AD   |1558AD: 1,5k; 1650AD: 4,2k; 1700AD: 5,5k; 1800AD: 5,2k; 1897AD: 6,7k; 1900AD: 6,8k                                                                                                            |
|Ivanovo-Voznesensk-Russia         |57,00°N, 40,97°E |1561-1900AD   |1561AD: 600; 1700AD: 1,8k; 1800AD: 5,2k; 1850AD: 15,0k; 1897AD: 54,2k; 1900AD: 61,5k                                                                                                          |
|Vesyegonsk-Russia                 |58,66°N, 37,26°E |1564-1900AD   |1564AD: 900; 1700AD: 1,8k; 1800AD: 2,5k; 1897AD: 3,5k; 1900AD: 3,6k                                                                                                                           |
|Oryol-Russia                      |52,97°N, 36,08°E |1566-1900AD   |1566AD: 2,5k; 1650AD: 6,5k; 1700AD: 11,5k; 1800AD: 22,0k; 1850AD: 35,2k; 1897AD: 69,7k; 1900AD: 72,8k                                                                                         |
|Pavlovo-Russia                    |55,96°N, 43,09°E |1566-1900AD   |1566AD: 1,2k; 1700AD: 3,8k; 1800AD: 6,5k; 1850AD: 8,8k; 1897AD: 12,4k; 1900AD: 13,1k                                                                                                          |
|Yepifan-Russia                    |53,83°N, 38,55°E |1566-1900AD   |1566AD: 1,8k; 1700AD: 2,4k; 1800AD: 2,9k; 1897AD: 4,2k; 1900AD: 4,3k                                                                                                                          |
|Krasnoslobodsk-Russia             |54,43°N, 43,78°E |1571-1900AD   |1571AD: 1,5k; 1700AD: 3,2k; 1800AD: 5,4k; 1897AD: 7,4k; 1900AD: 7,6k                                                                                                                          |
|Kozmodemyansk-Russia              |56,34°N, 46,56°E |1583-1900AD   |1583AD: 1,1k; 1700AD: 2,4k; 1800AD: 3,6k; 1897AD: 5,3k; 1900AD: 5,5k                                                                                                                          |
|Arkhangelsk-Russia                |64,54°N, 40,54°E |1584-1900AD   |1584AD: 1,5k; 1650AD: 6,5k; 1700AD: 10,5k; 1800AD: 11,2k; 1850AD: 15,2k; 1897AD: 20,9k; 1900AD: 21,8k                                                                                         |
|Menzelinsk-Russia                 |55,73°N, 53,10°E |1584-1900AD   |1584AD: 1,1k; 1700AD: 2,4k; 1800AD: 3,6k; 1897AD: 7,6k; 1900AD: 7,8k                                                                                                                          |
|Tsarevokokshaisk-Russia           |56,63°N, 47,89°E |1584-1900AD   |1584AD: 900; 1700AD: 1,4k; 1800AD: 1,6k; 1897AD: 1,7k; 1900AD: 1,8k                                                                                                                           |
|Urzhum-Russia                     |57,11°N, 50,00°E |1584-1900AD   |1584AD: 1,1k; 1700AD: 1,8k; 1800AD: 2,5k; 1897AD: 4,4k; 1900AD: 4,6k                                                                                                                          |
|Yaransk-Russia                    |57,30°N, 47,88°E |1584-1900AD   |1584AD: 1,2k; 1700AD: 2,4k; 1800AD: 3,2k; 1897AD: 4,8k; 1900AD: 5,0k                                                                                                                          |
|Livny-Russia                      |52,43°N, 37,61°E |1586-1900AD   |1586AD: 2,8k; 1700AD: 5,5k; 1800AD: 8,2k; 1850AD: 13,4k; 1897AD: 20,4k; 1900AD: 21,2k                                                                                                         |
|Samara-Russia                     |53,20°N, 50,10°E |1586-1900AD   |1586AD: 1,8k; 1700AD: 4,2k; 1800AD: 7,5k; 1850AD: 24,0k; 1897AD: 90,0k; 1900AD: 96,5k                                                                                                         |
|Voronezh-Russia                   |51,67°N, 39,18°E |1586-1900AD   |1586AD: 3,0k; 1650AD: 8,5k; 1700AD: 18,0k; 1800AD: 21,0k; 1850AD: 38,5k; 1897AD: 80,6k; 1900AD: 84,5k                                                                                         |
|Osa-Russia                        |57,28°N, 55,46°E |1591-1900AD   |1591AD: 800; 1700AD: 1,6k; 1800AD: 2,5k; 1897AD: 5,1k; 1900AD: 5,2k                                                                                                                           |
|Stary Oskol-Russia                |51,30°N, 37,84°E |1593-1900AD   |1593AD: 2,2k; 1700AD: 4,8k; 1800AD: 6,5k; 1850AD: 9,8k; 1897AD: 15,6k; 1900AD: 16,2k                                                                                                          |
|Valuyki-Russia                    |50,21°N, 38,10°E |1593-1900AD   |1593AD: 1,8k; 1700AD: 3,4k; 1800AD: 4,2k; 1897AD: 6,7k; 1900AD: 6,9k                                                                                                                          |
|Sarapul-Russia                    |56,48°N, 53,80°E |1596-1900AD   |1596AD: 900; 1700AD: 2,8k; 1800AD: 5,6k; 1850AD: 9,8k; 1897AD: 21,4k; 1900AD: 22,8k                                                                                                           |
|Skopin-Russia                     |53,82°N, 39,55°E |1597-1900AD   |1597AD: 1,2k; 1700AD: 2,8k; 1800AD: 5,9k; 1850AD: 9,8k; 1897AD: 13,2k; 1900AD: 13,8k                                                                                                          |
|Myshkin-Russia                    |57,79°N, 38,45°E |1600-1900AD   |1600AD: 600; 1700AD: 1,1k; 1800AD: 1,8k; 1897AD: 2,2k; 1900AD: 2,4k                                                                                                                           |
|Pokrov-Russia                     |55,92°N, 39,18°E |1600-1900AD   |1600AD: 500; 1800AD: 1,4k; 1897AD: 2,8k; 1900AD: 2,9k                                                                                                                                         |
|Spassk-Ryazanskiy-Russia          |54,41°N, 40,38°E |1600-1900AD   |1600AD: 800; 1778AD: 2,1k; 1850AD: 4,2k; 1897AD: 4,8k; 1900AD: 4,9k                                                                                                                           |
|Yegoryevsk-Russia                 |55,38°N, 39,04°E |1600-1900AD   |1600AD: 700; 1780AD: 1,4k; 1850AD: 5,2k; 1897AD: 19,2k; 1900AD: 20,5k                                                                                                                         |
|Sapozhok-Russia                   |53,94°N, 40,68°E |1605-1900AD   |1605AD: 900; 1700AD: 2,2k; 1800AD: 3,6k; 1897AD: 8,6k; 1900AD: 8,8k                                                                                                                           |
|Kozlov-Russia                     |52,90°N, 40,51°E |1635-1900AD   |1635AD: 3,5k; 1700AD: 6,8k; 1800AD: 11,5k; 1850AD: 21,2k; 1897AD: 40,3k; 1900AD: 42,1k                                                                                                        |
|Nizhniy Lomov-Russia              |53,53°N, 43,68°E |1636-1900AD   |1636AD: 2,2k; 1700AD: 4,5k; 1800AD: 6,8k; 1897AD: 10,0k; 1900AD: 10,3k                                                                                                                        |
|Tambov-Russia                     |52,72°N, 41,45°E |1636-1900AD   |1636AD: 3,2k; 1700AD: 7,5k; 1800AD: 12,8k; 1850AD: 24,5k; 1897AD: 48,0k; 1900AD: 50,5k                                                                                                        |
|Ranenburg-Russia                  |53,24°N, 39,96°E |1638-1900AD   |1638AD: 800; 1702AD: 1,8k; 1800AD: 3,4k; 1897AD: 15,3k; 1900AD: 15,9k                                                                                                                         |
|Saransk-Russia                    |54,19°N, 45,18°E |1641-1900AD   |1641AD: 2,4k; 1700AD: 5,2k; 1800AD: 7,8k; 1850AD: 11,2k; 1897AD: 14,6k; 1900AD: 15,2k                                                                                                         |
|Karsun-Russia                     |54,20°N, 46,98°E |1647-1900AD   |1647AD: 1,8k; 1700AD: 2,9k; 1800AD: 3,4k; 1897AD: 3,8k; 1900AD: 3,9k                                                                                                                          |
|Kungur-Russia                     |57,43°N, 56,95°E |1648-1900AD   |1648AD: 1,5k; 1700AD: 4,8k; 1800AD: 6,9k; 1850AD: 9,8k; 1897AD: 14,3k; 1900AD: 14,9k                                                                                                          |
|Simbirsk-Russia                   |54,31°N, 48,40°E |1648-1900AD   |1648AD: 2,5k; 1700AD: 6,8k; 1800AD: 13,2k; 1850AD: 23,5k; 1897AD: 41,7k; 1900AD: 44,1k                                                                                                        |
|Oboyan-Russia                     |51,21°N, 36,28°E |1649-1900AD   |1649AD: 1,8k; 1700AD: 3,6k; 1800AD: 5,4k; 1897AD: 11,8k; 1900AD: 12,2k                                                                                                                        |
|Morshansk-Russia                  |53,44°N, 41,81°E |1650-1900AD   |1650AD: 1,2k; 1779AD: 5,5k; 1850AD: 15,8k; 1897AD: 26,5k; 1900AD: 27,5k                                                                                                                       |
|Pavlovskiy Posad-Russia           |55,78°N, 38,65°E |1650-1900AD   |1650AD: 800; 1800AD: 2,1k; 1850AD: 4,5k; 1897AD: 10,0k; 1900AD: 11,0k                                                                                                                         |
|Podolsk-Russia                    |55,43°N, 37,54°E |1650-1900AD   |1650AD: 600; 1781AD: 1,2k; 1850AD: 2,8k; 1897AD: 3,8k; 1900AD: 4,2k                                                                                                                           |
|Sudogda-Russia                    |55,95°N, 40,86°E |1650-1900AD   |1650AD: 500; 1800AD: 1,2k; 1897AD: 3,2k; 1900AD: 3,3k                                                                                                                                         |
|Ostrogozhsk-Russia                |50,86°N, 39,07°E |1652-1900AD   |1652AD: 3,5k; 1700AD: 6,8k; 1800AD: 9,5k; 1897AD: 21,0k; 1900AD: 21,8k                                                                                                                        |
|Penza-Russia                      |53,20°N, 45,02°E |1663-1900AD   |1663AD: 2,8k; 1700AD: 6,5k; 1800AD: 13,5k; 1850AD: 24,8k; 1897AD: 60,0k; 1900AD: 63,2k                                                                                                        |
|Sudzha-Russia                     |51,19°N, 35,27°E |1664-1900AD   |1664AD: 2,5k; 1700AD: 4,2k; 1800AD: 5,8k; 1897AD: 7,4k; 1900AD: 7,7k                                                                                                                          |
|Glazov-Russia                     |58,14°N, 52,66°E |1678-1900AD   |1678AD: 500; 1780AD: 1,2k; 1850AD: 2,4k; 1897AD: 3,5k; 1900AD: 3,7k                                                                                                                           |
|Poshekhonye-Russia                |58,50°N, 39,12°E |1680-1900AD   |1680AD: 900; 1800AD: 2,2k; 1897AD: 4,0k; 1900AD: 4,2k                                                                                                                                         |
|Syzran-Russia                     |53,16°N, 48,47°E |1683-1900AD   |1683AD: 2,2k; 1700AD: 4,5k; 1800AD: 8,9k; 1850AD: 16,8k; 1897AD: 32,4k; 1900AD: 34,2k                                                                                                         |
|Borisoglebsk-Russia               |51,37°N, 42,08°E |1698-1900AD   |1698AD: 1,5k; 1800AD: 4,8k; 1850AD: 9,5k; 1897AD: 22,3k; 1900AD: 23,5k                                                                                                                        |
|Chistopol-Russia                  |55,36°N, 50,64°E |1700-1900AD   |1700AD: 1,2k; 1781AD: 3,8k; 1850AD: 11,2k; 1897AD: 20,1k; 1900AD: 21,2k                                                                                                                       |
|Melenki-Russia                    |55,34°N, 41,63°E |1700-1900AD   |1700AD: 900; 1800AD: 2,4k; 1850AD: 4,8k; 1897AD: 8,9k; 1900AD: 9,2k                                                                                                                           |
|Orekhovo-Zuyevo-Russia            |55,81°N, 38,96°E |1700-1900AD   |1700AD: 600; 1800AD: 1,8k; 1850AD: 6,5k; 1897AD: 34,9k; 1900AD: 39,5k                                                                                                                         |
|Lipetsk-Russia                    |52,60°N, 39,57°E |1703-1900AD   |1703AD: 1,8k; 1800AD: 5,6k; 1850AD: 11,2k; 1897AD: 20,5k; 1900AD: 21,5k                                                                                                                       |
|Petrozavodsk-Russia               |61,78°N, 34,35°E |1703-1900AD   |1703AD: 1,5k; 1750AD: 2,6k; 1800AD: 4,7k; 1850AD: 9,5k; 1897AD: 12,5k; 1900AD: 13,2k                                                                                                          |
|Saint Petersburg-Russia           |59,93°N, 30,34°E |1703-1900AD   |1703AD: 5,0k; 1725AD: 40,0k; 1750AD: 95,0k; 1800AD: 220,2k; 1850AD: 487,3k; 1897AD: 1264,9k; 1900AD: 1439,6k                                                                                  |
|Kronstadt-Russia                  |60,00°N, 29,77°E |1704-1900AD   |1704AD: 2,0k; 1750AD: 12,0k; 1800AD: 25,0k; 1850AD: 39,0k; 1897AD: 59,5k; 1900AD: 60,8k                                                                                                       |
|Gzhatsk-Russia                    |55,55°N, 35,01°E |1719-1900AD   |1719AD: 1,5k; 1800AD: 4,2k; 1850AD: 5,8k; 1897AD: 6,3k; 1900AD: 6,5k                                                                                                                          |
|Perm-Russia                       |58,01°N, 56,25°E |1723-1900AD   |1723AD: 1,5k; 1781AD: 3,8k; 1800AD: 6,2k; 1850AD: 14,5k; 1897AD: 45,2k; 1900AD: 48,5k                                                                                                         |
|Buzuluk-Russia                    |52,78°N, 52,26°E |1736-1900AD   |1736AD: 1,5k; 1800AD: 3,8k; 1850AD: 7,2k; 1897AD: 14,4k; 1900AD: 15,1k                                                                                                                        |
|Krasnoufimsk-Russia               |56,62°N, 57,77°E |1736-1900AD   |1736AD: 1,2k; 1800AD: 2,8k; 1850AD: 4,2k; 1897AD: 6,3k; 1900AD: 6,5k                                                                                                                          |
|Stavropol-on-Volga-Russia         |53,51°N, 49,42°E |1737-1900AD   |1737AD: 1,8k; 1800AD: 3,1k; 1850AD: 4,2k; 1897AD: 6,0k; 1900AD: 6,2k                                                                                                                          |
|Buguruslan-Russia                 |53,66°N, 52,44°E |1748-1900AD   |1748AD: 1,4k; 1800AD: 3,2k; 1850AD: 6,1k; 1897AD: 12,1k; 1900AD: 12,7k                                                                                                                        |
|Tsarskoye Selo-Russia             |59,72°N, 30,40°E |1750-1900AD   |1750AD: 2,5k; 1800AD: 5,5k; 1850AD: 11,2k; 1897AD: 22,5k; 1900AD: 24,1k                                                                                                                       |
|Votkinsk-Russia                   |57,05°N, 53,99°E |1759-1900AD   |1759AD: 2,2k; 1800AD: 6,4k; 1850AD: 12,8k; 1897AD: 21,7k; 1900AD: 22,9k                                                                                                                       |
|Izhevsk-Russia                    |56,85°N, 53,21°E |1760-1900AD   |1760AD: 2,5k; 1807AD: 8,5k; 1850AD: 18,5k; 1897AD: 41,1k; 1900AD: 43,5k                                                                                                                       |
|Sterlitamak-Russia                |53,63°N, 55,93°E |1766-1900AD   |1766AD: 1,5k; 1800AD: 3,8k; 1850AD: 7,5k; 1897AD: 15,6k; 1900AD: 16,4k                                                                                                                        |
|Gatchina-Russia                   |59,57°N, 30,13°E |1770-1900AD   |1770AD: 1,8k; 1800AD: 4,2k; 1850AD: 8,5k; 1897AD: 14,8k; 1900AD: 15,6k                                                                                                                        |

# Sources

::: {#refs}
:::



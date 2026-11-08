---
title: "SETTLEMENT GAZETTEER OF CHECHNYA AND INGUSHETIA."
subtitle: "Supplementary Tabular Compilation of Settlement Population Histories (10000BC - 1900AD)."
date: "7 November 2026"
authors_line: "Aust Kätzchen"
emails:
  - austkaeztchen@confoederatio.org
hero_figure: "figures/chechnya_ingushetia_map_basins.png"
hero_caption: "Elevation zones, river basins, and settlements of Chechnya and Ingushetia included in the settlement gazetteer (10000BC - 1900AD)."
hero_label: "fig:hero"
bibliography: chechnya_ingushetia_literature_review.bib
csl: crd-mla-numeric.csl
link-citations: true
output:
  pdf_document:
    template: template.tex
    latex_engine: xelatex
    keep_tex: false
---





# Introduction

This supplementary report presents the settlement population gazetteer (`chechnya_ingushetia_settlements.json`) accompanying the regional literature review of Chechnya and Ingushetia (10000BC - 1900AD). The JSON file follows the `population_Stadester` format, indexing 122 settlements across the Chechen Republic and the Republic of Ingushetia by `<Name>-Russia` with alternate and Cyrillic names (`other_names`), decimal coordinates (`coords`), and chronological population estimates (`population`) for inhabited benchmark years.

Prehistoric, Eastern Koban, and Alanic estimates are derived from excavated settlement areas and cemetery studies [@munchaev1961lugovoye; @kozenkova1992serzhen; @vinogradov1970; @chakhkiev2006magas; @mamaev2009]. Highland stone tower and early modern figures draw on architectural surveys of the Assa, Armkhi, and Argun gorges and Russian *Posolskiy Prikaz* records [@markovin1965monuments; @chakhkiev2007weapons; @kusheva1963peoples; @akhmadov2002chechnya; @akhmadov2019chechnya], while 19th-century and 1897 figures come from military registers and the First All-Russian Imperial Census for Terek Oblast [@berger1859chechnya; @ibragimova2006; @troynitskiy1905terek; @kabuzan1996].

# Master Settlement Directory

Table: Master directory of all settlements in chechnya_ingushetia_settlements.json (10000BC - 1900AD).

|                              |Settlement             |Historical / Native Names               |Coords         |Documented Span  |Peak Population |1897AD |1900AD |
|:-----------------------------|:----------------------|:---------------------------------------|:--------------|:----------------|:---------------|:------|:------|
|Kezenoy-Am-Russia             |Kezenoy-Am             |Кезеной-Ам, Эйзенах                     |42,78N, 46,15E |10000BC - 4000BC |110 (4000BC)    |-      |-      |
|Bamut-Russia                  |Bamut                  |Бамут                                   |43,16N, 45,19E |3500BC - 1900AD  |1,2k (1900AD)   |1,1k   |1,2k   |
|Lugovoye-Russia               |Lugovoye               |Луговое, Мужичи, Muzichi                |43,10N, 45,02E |3500BC - 1900AD  |1,0k (1900AD)   |980    |1,0k   |
|Serzhen-Yurt-Russia           |Serzhen-Yurt           |Сержень-Юрт, Сержень-Юрт I-II           |43,12N, 46,02E |3000BC - 1900AD  |1,7k (1900AD)   |1,6k   |1,7k   |
|Zandak-Russia                 |Zandak                 |Зандак, Зандакский комплекс             |43,00N, 46,37E |1000BC - 1900AD  |2,0k (1900AD)   |1,9k   |2,0k   |
|Nesterovskaya-Russia          |Nesterovskaya          |Нестеровская, Нестеровское              |43,23N, 45,05E |1000BC - 1900AD  |3,5k (1900AD)   |3,4k   |3,5k   |
|Alkhan-Yurt-Russia            |Alkhan-Yurt            |Алхан-Юрт, Iалхан-Юрт                   |43,23N, 45,54E |500BC - 1900AD   |2,8k (1900AD)   |2,7k   |2,8k   |
|Belgatoy-Russia               |Belgatoy               |Белгатой                                |43,05N, 45,95E |1000BC - 1900AD  |1,7k (1900AD)   |1,7k   |1,7k   |
|Kharachoy-Russia              |Kharachoy              |Харачой                                 |42,91N, 46,14E |1500BC - 1900AD  |1,4k (1800AD)   |1,3k   |1,3k   |
|Alkhan-Kala-Russia            |Alkhan-Kala            |Алхан-Кала, Ермоловская                 |43,26N, 45,51E |300BC - 1900AD   |13,5k (1200AD)  |2,9k   |3,0k   |
|Yandare-Russia                |Yandare                |Яндаре, Яндаре-Городище                 |43,24N, 44,92E |400AD - 1900AD   |4,2k (1200AD)   |2,1k   |2,2k   |
|Gazi-Yurt-Russia              |Gazi-Yurt              |Гази-Юрт, Магас                         |43,22N, 44,88E |400AD - 1900AD   |5,5k (1200AD)   |1,1k   |1,1k   |
|Ekazhevo-Russia               |Ekazhevo               |Экажево, Экажевское городище            |43,21N, 44,82E |600AD - 1900AD   |4,3k (1900AD)   |4,1k   |4,3k   |
|Ali-Yurt-Russia               |Ali-Yurt               |Али-Юрт                                 |43,17N, 44,85E |600AD - 1900AD   |2,2k (1200AD)   |1,5k   |1,6k   |
|Surkhakhi-Russia              |Surkhakhi              |Сурхахи                                 |43,19N, 44,90E |600AD - 1900AD   |3,1k (1900AD)   |3,0k   |3,1k   |
|Plievo-Russia                 |Plievo                 |Плиево                                  |43,25N, 44,81E |800AD - 1900AD   |2,9k (1900AD)   |2,8k   |2,9k   |
|Barsuki-Russia                |Barsuki                |Барсуки                                 |43,26N, 44,78E |800AD - 1900AD   |2,5k (1900AD)   |2,4k   |2,5k   |
|Nasyr-Kort-Russia             |Nasyr-Kort             |Насыр-Корт                              |43,22N, 44,79E |800AD - 1900AD   |2,8k (1900AD)   |2,7k   |2,8k   |
|Troitskaya-Russia             |Troitskaya             |Троицкая, Эбан                          |43,31N, 44,98E |800AD - 1900AD   |4,8k (1900AD)   |4,6k   |4,8k   |
|Karabulak-Russia              |Karabulak              |Карабулак                               |43,31N, 44,90E |800AD - 1900AD   |3,5k (1900AD)   |3,4k   |3,5k   |
|Sleptsovskaya-Russia          |Sleptsovskaya          |Слепцовская, Сунжа, Орджоникидзевская   |43,32N, 45,05E |800AD - 1900AD   |5,3k (1900AD)   |5,1k   |5,3k   |
|Targim-Russia                 |Targim                 |Таргим                                  |42,81N, 44,93E |1000AD - 1900AD  |1,0k (1700AD)   |380    |360    |
|Egikal-Russia                 |Egikal                 |Эгикхал, Агикхал                        |42,83N, 44,92E |1000AD - 1900AD  |1,6k (1700AD)   |620    |600    |
|Khamkhi-Russia                |Khamkhi                |Хамхи                                   |42,82N, 44,91E |1000AD - 1900AD  |980 (1700AD)    |340    |320    |
|Vovnushki-Russia              |Vovnushki              |Вовнушки, Оздик                         |42,80N, 45,01E |1400AD - 1900AD  |620 (1700AD)    |220    |210    |
|Erzi-Russia                   |Erzi                   |Эрзи, Арзи                              |42,81N, 44,76E |1300AD - 1900AD  |680 (1700AD)    |290    |280    |
|Falkhan-Russia                |Falkhan                |Фалхан                                  |42,80N, 44,72E |1400AD - 1900AD  |480 (1700AD)    |210    |200    |
|Shoan-Russia                  |Shoan                  |Шоан, Шоани                             |42,78N, 44,70E |1400AD - 1900AD  |520 (1700AD)    |250    |240    |
|Lyazhgi-Russia                |Lyazhgi                |Ляжги                                   |42,81N, 44,74E |1400AD - 1900AD  |500 (1700AD)    |240    |230    |
|Salgi-Russia                  |Salgi                  |Салги                                   |42,77N, 44,82E |1400AD - 1900AD  |450 (1700AD)    |190    |180    |
|Guli-Russia                   |Guli                   |Гули                                    |42,79N, 44,86E |1400AD - 1900AD  |520 (1700AD)    |270    |260    |
|Pui-Russia                    |Pui                    |Пуй                                     |42,80N, 44,95E |1200AD - 1900AD  |580 (1700AD)    |210    |200    |
|Tumgi-Russia                  |Tumgi                  |Тумги                                   |42,81N, 44,87E |1400AD - 1900AD  |490 (1700AD)    |200    |190    |
|Tsori-Russia                  |Tsori                  |Цори                                    |42,77N, 45,03E |1400AD - 1900AD  |600 (1700AD)    |260    |250    |
|Niy-Russia                    |Niy                    |Ний                                     |42,78N, 44,98E |1400AD - 1900AD  |540 (1700AD)    |230    |220    |
|Pyaling-Russia                |Pyaling                |Пялинг                                  |42,79N, 44,99E |1400AD - 1900AD  |510 (1700AD)    |210    |200    |
|Beyni-Russia                  |Beyni                  |Бейни                                   |42,83N, 44,69E |1400AD - 1900AD  |440 (1700AD)    |220    |210    |
|Dzheyrakh-Russia              |Dzheyrakh              |Джейрах                                 |42,82N, 44,68E |1400AD - 1900AD  |620 (1700AD)    |480    |490    |
|Furtoug-Russia                |Furtoug                |Фуртоуг                                 |42,83N, 44,65E |1400AD - 1900AD  |450 (1700AD)    |310    |320    |
|Olgeti-Russia                 |Olgeti                 |Ольгети                                 |42,81N, 44,75E |1400AD - 1900AD  |420 (1700AD)    |240    |230    |
|Khoy-Russia                   |Khoy                   |Хой                                     |42,76N, 46,13E |1000AD - 1900AD  |1,5k (1700AD)   |890    |920    |
|Makazhoy-Russia               |Makazhoy               |Макажой                                 |42,77N, 46,08E |1200AD - 1900AD  |1,4k (1700AD)   |820    |850    |
|Sharo-Argun-Russia            |Sharo-Argun            |Шаро-Аргун                              |42,73N, 45,87E |1200AD - 1900AD  |1,1k (1700AD)   |780    |800    |
|Sharoy-Russia                 |Sharoy                 |Шарой                                   |42,63N, 45,95E |1200AD - 1900AD  |1,3k (1700AD)   |860    |890    |
|Khimoy-Russia                 |Khimoy                 |Химой                                   |42,67N, 45,88E |1200AD - 1900AD  |1,1k (1700AD)   |790    |820    |
|Kenkhi-Russia                 |Kenkhi                 |Кенхи                                   |42,58N, 46,02E |1200AD - 1900AD  |1,4k (1800AD)   |1,4k   |1,4k   |
|Itum-Kale-Russia              |Itum-Kale              |Итум-Кале, Пхакоч                       |42,73N, 45,58E |1000AD - 1900AD  |1,8k (1700AD)   |980    |1,0k   |
|Tazbichi-Russia               |Tazbichi               |Тазбичи                                 |42,73N, 45,65E |1200AD - 1900AD  |1,2k (1700AD)   |840    |870    |
|Ushkaloy-Russia               |Ushkaloy               |Ушкалой                                 |42,77N, 45,62E |1200AD - 1900AD  |950 (1700AD)    |680    |700    |
|Kokadoi-Russia                |Kokadoi                |Кокадой                                 |42,72N, 45,60E |1200AD - 1900AD  |850 (1700AD)    |590    |610    |
|Shatoy-Russia                 |Shatoy                 |Шатой, Хакмадой                         |42,87N, 45,69E |1000AD - 1900AD  |2,3k (1900AD)   |2,2k   |2,3k   |
|Nikhaloy-Russia               |Nikhaloy               |Нихалой                                 |42,83N, 45,66E |1200AD - 1900AD  |1,0k (1700AD)   |710    |730    |
|Gukhoy-Russia                 |Gukhoy                 |Гухой                                   |42,77N, 45,53E |1200AD - 1900AD  |1,1k (1700AD)   |760    |780    |
|Borzoy-Russia                 |Borzoy                 |Борзой                                  |42,85N, 45,62E |1200AD - 1900AD  |1,3k (1800AD)   |1,1k   |1,2k   |
|Varandy-Russia                |Varandy                |Варанды                                 |42,92N, 45,70E |1200AD - 1900AD  |1,1k (1800AD)   |980    |1,0k   |
|Vaserkel-Russia               |Vaserkel               |Васеркел, Майсты                        |42,63N, 45,42E |1200AD - 1900AD  |1,2k (1700AD)   |420    |400    |
|Tsekaloy-Russia               |Tsekaloy               |Цекалой                                 |42,64N, 45,43E |1300AD - 1900AD  |750 (1700AD)    |260    |250    |
|Tsikaro-Russia                |Tsikaro                |Цикарой, Малхиста                       |42,68N, 45,28E |1200AD - 1900AD  |1,4k (1700AD)   |490    |470    |
|Nikaroy-Russia                |Nikaroy                |Никарой, Терлой                         |42,73N, 45,40E |1200AD - 1900AD  |1,3k (1700AD)   |520    |500    |
|Motsaroy-Russia               |Motsaroy               |Моцарой, Нашха                          |42,90N, 45,37E |1000AD - 1900AD  |1,6k (1700AD)   |680    |660    |
|Khaibakh-Russia               |Khaibakh               |Хайбах                                  |42,88N, 45,38E |1200AD - 1900AD  |1,0k (1700AD)   |490    |480    |
|Galanchozh-Russia             |Galanchozh             |Галанчож                                |42,87N, 45,30E |1200AD - 1900AD  |1,2k (1700AD)   |580    |570    |
|Yalkhoroy-Russia              |Yalkhoroy              |Ялхорой, Акки                           |42,85N, 45,22E |1200AD - 1900AD  |1,2k (1700AD)   |610    |600    |
|Vedeno-Russia                 |Vedeno                 |Ведено, Ведана                          |42,97N, 46,10E |1500AD - 1900AD  |3,5k (1850AD)   |1,8k   |1,9k   |
|Dargo-Russia                  |Dargo                  |Дарго, ДаргIа                           |42,95N, 46,24E |1500BC - 1900AD  |1,8k (1800AD)   |1,6k   |1,7k   |
|Benoy-Russia                  |Benoy                  |Беной                                   |42,97N, 46,32E |1400AD - 1900AD  |2,6k (1900AD)   |2,5k   |2,6k   |
|Alleroy-Russia                |Alleroy                |Аллерой                                 |43,05N, 46,27E |1500AD - 1900AD  |2,0k (1900AD)   |1,9k   |2,0k   |
|Tsentoroy-Russia              |Tsentoroy              |Центорой, Хоси-Юрт                      |43,10N, 46,22E |1600AD - 1900AD  |1,9k (1900AD)   |1,8k   |1,9k   |
|Gordali-Russia                |Gordali                |Гордали                                 |43,02N, 46,25E |1500AD - 1900AD  |1,7k (1900AD)   |1,7k   |1,7k   |
|Engenoy-Russia                |Engenoy                |Энгеной                                 |43,00N, 46,28E |1500AD - 1900AD  |1,6k (1900AD)   |1,5k   |1,6k   |
|Shuan-Russia                  |Shuan                  |Шуани                                   |43,02N, 46,22E |1500AD - 1900AD  |1,3k (1900AD)   |1,2k   |1,3k   |
|Ongusht-Russia                |Ongusht                |Онгушт, Ангушт, Тарское                 |43,07N, 44,78E |1700AD - 1900AD  |2,4k (1900AD)   |2,3k   |2,4k   |
|Nazran-Russia                 |Nazran                 |Назрань, Наьсаре                        |43,23N, 44,76E |1780AD - 1900AD  |3,9k (1900AD)   |3,8k   |3,9k   |
|Bazorkino-Russia              |Bazorkino              |Базоркино, Чермен, Мочко-Юрт            |43,14N, 44,75E |1850AD - 1900AD  |3,4k (1900AD)   |3,3k   |3,4k   |
|Kantyshevo-Russia             |Kantyshevo             |Кантышево                               |43,23N, 44,67E |1800AD - 1900AD  |2,7k (1900AD)   |2,6k   |2,7k   |
|Dolakovo-Russia               |Dolakovo               |Долаково                                |43,24N, 44,69E |1800AD - 1900AD  |2,3k (1900AD)   |2,2k   |2,3k   |
|Sagopshi-Russia               |Sagopshi               |Сагопши                                 |43,40N, 44,57E |1800AD - 1900AD  |2,6k (1900AD)   |2,5k   |2,6k   |
|Achaluki-Russia               |Achaluki               |Ачалуки, Средние Ачалуки                |43,35N, 44,72E |1800AD - 1900AD  |2,3k (1900AD)   |2,2k   |2,3k   |
|Staryy Yurt-Russia            |Staryy Yurt            |Старый Юрт, Толстой-Юрт                 |43,45N, 45,78E |1200AD - 1900AD  |3,8k (1900AD)   |3,6k   |3,8k   |
|Nizhniy Naur-Russia           |Nizhniy Naur           |Нижний Наур, Надтеречное                |43,62N, 45,28E |1700AD - 1900AD  |4,0k (1900AD)   |3,8k   |4,0k   |
|Beno-Yurt-Russia              |Beno-Yurt              |Бено-Юрт                                |43,67N, 45,05E |1750AD - 1900AD  |2,6k (1900AD)   |2,5k   |2,6k   |
|Braguny-Russia                |Braguny                |Брагуны, Борагангечув                   |43,43N, 46,02E |1200AD - 1900AD  |2,5k (1900AD)   |2,4k   |2,5k   |
|Isti-Su-Russia                |Isti-Su                |Исти-Су, Мелчхи                         |43,28N, 46,15E |1600AD - 1900AD  |2,2k (1900AD)   |2,1k   |2,2k   |
|Gudermes-Russia               |Gudermes               |Гудермес, ГIуьмсе                       |43,35N, 46,10E |1200AD - 1900AD  |3,8k (1900AD)   |3,6k   |3,8k   |
|Kurchaloy-Russia              |Kurchaloy              |Курчалой                                |43,21N, 46,09E |1000BC - 1900AD  |3,8k (1900AD)   |3,7k   |3,8k   |
|Mayrtup-Russia                |Mayrtup                |Майртуп                                 |43,20N, 46,15E |1700AD - 1900AD  |3,4k (1900AD)   |3,3k   |3,4k   |
|Geldagan-Russia               |Geldagan               |Гелдаган                                |43,23N, 46,02E |1700AD - 1900AD  |2,5k (1900AD)   |2,5k   |2,5k   |
|Tsotsi-Yurt-Russia            |Tsotsi-Yurt            |Цоци-Юрт                                |43,24N, 45,99E |1700AD - 1900AD  |2,4k (1900AD)   |2,3k   |2,4k   |
|Avtury-Russia                 |Avtury                 |Автуры                                  |43,17N, 46,00E |1700AD - 1900AD  |3,1k (1900AD)   |3,0k   |3,1k   |
|Shali-Russia                  |Shali                  |Шали, Шела                              |43,15N, 45,90E |1200AD - 1900AD  |8,1k (1900AD)   |7,8k   |8,1k   |
|Germenchuk-Russia             |Germenchuk             |Герменчук                               |43,19N, 45,93E |1200AD - 1900AD  |4,2k (1800AD)   |3,5k   |3,6k   |
|Chechen-Aul-Russia            |Chechen-Aul            |Чечен-Аул, Чечень                       |43,20N, 45,79E |1200AD - 1900AD  |4,6k (1800AD)   |2,9k   |3,0k   |
|Aldy-Russia                   |Aldy                   |Алды, Бухан-Юрт                         |43,28N, 45,66E |1200AD - 1900AD  |3,8k (1800AD)   |2,6k   |2,8k   |
|Staryye Atagi-Russia          |Staryye Atagi          |Старые Атаги, Большие Атаги             |43,13N, 45,74E |1200AD - 1900AD  |4,0k (1900AD)   |3,8k   |4,0k   |
|Novyye Atagi-Russia           |Novyye Atagi           |Новые Атаги                             |43,14N, 45,77E |1750AD - 1900AD  |2,4k (1900AD)   |2,3k   |2,4k   |
|Chiri-Yurt-Russia             |Chiri-Yurt             |Чири-Юрт                                |43,09N, 45,75E |1700AD - 1900AD  |2,0k (1900AD)   |1,9k   |2,0k   |
|Duba-Yurt-Russia              |Duba-Yurt              |Дуба-Юрт                                |43,04N, 45,74E |1700AD - 1900AD  |1,8k (1900AD)   |1,8k   |1,8k   |
|Urus-Martan-Russia            |Urus-Martan            |Урус-Мартан, МартантIи                  |43,13N, 45,54E |1200AD - 1900AD  |6,9k (1900AD)   |6,7k   |6,9k   |
|Goyty-Russia                  |Goyty                  |Гойты                                   |43,22N, 45,66E |1200AD - 1900AD  |3,9k (1900AD)   |3,8k   |3,9k   |
|Gekhi-Russia                  |Gekhi                  |Гехи                                    |43,16N, 45,47E |1700AD - 1900AD  |3,4k (1900AD)   |3,2k   |3,4k   |
|Roshni-Chu-Russia             |Roshni-Chu             |Рошни-Чу                                |43,08N, 45,45E |1700AD - 1900AD  |2,2k (1900AD)   |2,1k   |2,2k   |
|Shalazhi-Russia               |Shalazhi               |Шалажи                                  |43,10N, 45,37E |1000BC - 1900AD  |2,5k (1900AD)   |2,4k   |2,5k   |
|Valerik-Russia                |Valerik                |Валерик                                 |43,18N, 45,41E |1700AD - 1900AD  |1,9k (1900AD)   |1,8k   |1,9k   |
|Achkhoy-Martan-Russia         |Achkhoy-Martan         |Ачхой-Мартан                            |43,19N, 45,28E |1700AD - 1900AD  |4,1k (1900AD)   |3,9k   |4,1k   |
|Katyr-Yurt-Russia             |Katyr-Yurt             |Катыр-Юрт                               |43,17N, 45,35E |1700AD - 1900AD  |2,2k (1900AD)   |2,1k   |2,2k   |
|Samashki-Russia               |Samashki               |Самашки, Самашкинская                   |43,28N, 45,29E |1750AD - 1900AD  |3,6k (1900AD)   |3,5k   |3,6k   |
|Zakan-Yurt-Russia             |Zakan-Yurt             |Закан-Юрт, Закан-Юртовская              |43,27N, 45,42E |1750AD - 1900AD  |3,0k (1900AD)   |2,9k   |3,0k   |
|Assinovskaya-Russia           |Assinovskaya           |Ассиновская                             |43,24N, 45,18E |2500BC - 1900AD  |4,0k (1900AD)   |3,9k   |4,0k   |
|Mikhaylovskaya-Russia         |Mikhaylovskaya         |Михайловская, Серноводская              |43,32N, 45,17E |1850AD - 1900AD  |3,2k (1900AD)   |3,1k   |3,2k   |
|Petropavlovskaya-Russia       |Petropavlovskaya       |Петропавловская                         |43,37N, 45,82E |1850AD - 1900AD  |2,7k (1900AD)   |2,6k   |2,7k   |
|Goryacheistochnenskaya-Russia |Goryacheistochnenskaya |Горячеисточненская                      |43,42N, 45,77E |1850AD - 1900AD  |2,4k (1900AD)   |2,3k   |2,4k   |
|Chervlennaya-Russia           |Chervlennaya           |Червленная, Ораз-Кала                   |43,52N, 45,96E |1600AD - 1900AD  |5,6k (1900AD)   |5,5k   |5,6k   |
|Shchedrinskaya-Russia         |Shchedrinskaya         |Щедринская                              |43,48N, 46,12E |1700AD - 1900AD  |2,8k (1900AD)   |2,7k   |2,8k   |
|Starogladovskaya-Russia       |Starogladovskaya       |Старогладовская                         |43,55N, 46,23E |1725AD - 1900AD  |3,0k (1900AD)   |2,8k   |3,0k   |
|Kurdyukovskaya-Russia         |Kurdyukovskaya         |Курдюковская                            |43,58N, 46,30E |1725AD - 1900AD  |2,6k (1900AD)   |2,5k   |2,6k   |
|Shelkovskaya-Russia           |Shelkovskaya           |Шелковская                              |43,51N, 46,34E |1725AD - 1900AD  |2,4k (1900AD)   |2,4k   |2,4k   |
|Kalinovskaya-Russia           |Kalinovskaya           |Калиновская                             |43,57N, 45,52E |1770AD - 1900AD  |4,3k (1900AD)   |4,1k   |4,3k   |
|Naurskaya-Russia              |Naurskaya              |Наурская                                |43,65N, 45,31E |1770AD - 1900AD  |5,0k (1900AD)   |4,8k   |5,0k   |
|Ishcherskaya-Russia           |Ishcherskaya           |Ищерская                                |43,70N, 45,13E |1770AD - 1900AD  |3,6k (1900AD)   |3,5k   |3,6k   |
|Mekenskaya-Russia             |Mekenskaya             |Мекенская                               |43,62N, 45,42E |1770AD - 1900AD  |3,4k (1900AD)   |3,3k   |3,4k   |
|Vozdvizhenskaya-Russia        |Vozdvizhenskaya        |Воздвиженская, Чахкери                  |43,12N, 45,73E |1850AD - 1900AD  |2,2k (1900AD)   |2,1k   |2,2k   |
|Grozny-Russia                 |Grozny                 |Грозный, Крепость Грозная, Соьлжа-ГIала |43,32N, 45,69E |1200AD - 1900AD  |17,2k (1900AD)  |15,6k  |17,2k  |

# Prehistoric, Eastern Koban, and Alanic Settlements (10000BC - 1200AD)

Table: Prehistoric, Eastern Koban, and Alanic settlement populations in Chechnya and Ingushetia (8000BC - 1200AD).

|                     |Settlement    |Coords         |8000-2500BC |1500-500BC |1-600AD |800AD |1000AD |1200AD |
|:--------------------|:-------------|:--------------|:-----------|:----------|:-------|:-----|:------|:------|
|Kezenoy-Am-Russia    |Kezenoy-Am    |42,78N, 46,15E |45          |-          |-       |-     |-      |-      |
|Bamut-Russia         |Bamut         |43,16N, 45,19E |250         |450        |-       |-     |-      |-      |
|Lugovoye-Russia      |Lugovoye      |43,10N, 45,02E |200         |550        |-       |-     |-      |-      |
|Serzhen-Yurt-Russia  |Serzhen-Yurt  |43,12N, 46,02E |450         |900        |-       |-     |-      |-      |
|Zandak-Russia        |Zandak        |43,00N, 46,37E |-           |700        |-       |-     |850    |-      |
|Nesterovskaya-Russia |Nesterovskaya |43,23N, 45,05E |-           |600        |-       |-     |1,1k   |-      |
|Alkhan-Yurt-Russia   |Alkhan-Yurt   |43,23N, 45,54E |-           |650        |-       |1,4k  |-      |2,1k   |
|Belgatoy-Russia      |Belgatoy      |43,05N, 45,95E |-           |450        |-       |-     |-      |750    |
|Kharachoy-Russia     |Kharachoy     |42,91N, 46,14E |-           |350        |-       |-     |-      |-      |
|Alkhan-Kala-Russia   |Alkhan-Kala   |43,26N, 45,51E |-           |-          |1,5k    |7,5k  |11,0k  |13,5k  |
|Yandare-Russia       |Yandare       |43,24N, 44,92E |-           |-          |900     |2,2k  |3,4k   |4,2k   |
|Gazi-Yurt-Russia     |Gazi-Yurt     |43,22N, 44,88E |-           |-          |1,1k    |2,8k  |4,5k   |5,5k   |
|Ekazhevo-Russia      |Ekazhevo      |43,21N, 44,82E |-           |-          |1,2k    |-     |2,8k   |3,5k   |
|Ali-Yurt-Russia      |Ali-Yurt      |43,17N, 44,85E |-           |-          |850     |-     |1,8k   |2,2k   |
|Surkhakhi-Russia     |Surkhakhi     |43,19N, 44,90E |-           |-          |950     |-     |2,1k   |2,6k   |
|Plievo-Russia        |Plievo        |43,25N, 44,81E |-           |-          |-       |1,1k  |1,9k   |2,4k   |
|Barsuki-Russia       |Barsuki       |43,26N, 44,78E |-           |-          |-       |900   |-      |1,8k   |
|Nasyr-Kort-Russia    |Nasyr-Kort    |43,22N, 44,79E |-           |-          |-       |950   |-      |1,9k   |
|Troitskaya-Russia    |Troitskaya    |43,31N, 44,98E |-           |-          |-       |1,2k  |-      |2,3k   |
|Karabulak-Russia     |Karabulak     |43,31N, 44,90E |-           |-          |-       |1,1k  |-      |2,1k   |
|Sleptsovskaya-Russia |Sleptsovskaya |43,32N, 45,05E |-           |-          |-       |1,3k  |-      |2,5k   |
|Targim-Russia        |Targim        |42,81N, 44,93E |-           |-          |-       |-     |450    |-      |
|Egikal-Russia        |Egikal        |42,83N, 44,92E |-           |-          |-       |-     |600    |-      |
|Khamkhi-Russia       |Khamkhi       |42,82N, 44,91E |-           |-          |-       |-     |400    |-      |
|Pui-Russia           |Pui           |42,80N, 44,95E |-           |-          |-       |-     |-      |320    |
|Khoy-Russia          |Khoy          |42,76N, 46,13E |-           |-          |-       |-     |550    |-      |
|Makazhoy-Russia      |Makazhoy      |42,77N, 46,08E |-           |-          |-       |-     |-      |500    |
|Sharo-Argun-Russia   |Sharo-Argun   |42,73N, 45,87E |-           |-          |-       |-     |-      |450    |
|Sharoy-Russia        |Sharoy        |42,63N, 45,95E |-           |-          |-       |-     |-      |550    |
|Khimoy-Russia        |Khimoy        |42,67N, 45,88E |-           |-          |-       |-     |-      |480    |
|Kenkhi-Russia        |Kenkhi        |42,58N, 46,02E |-           |-          |-       |-     |-      |520    |
|Itum-Kale-Russia     |Itum-Kale     |42,73N, 45,58E |-           |-          |-       |-     |650    |-      |
|Tazbichi-Russia      |Tazbichi      |42,73N, 45,65E |-           |-          |-       |-     |-      |500    |
|Ushkaloy-Russia      |Ushkaloy      |42,77N, 45,62E |-           |-          |-       |-     |-      |420    |
|Kokadoi-Russia       |Kokadoi       |42,72N, 45,60E |-           |-          |-       |-     |-      |380    |
|Shatoy-Russia        |Shatoy        |42,87N, 45,69E |-           |-          |-       |-     |750    |-      |
|Nikhaloy-Russia      |Nikhaloy      |42,83N, 45,66E |-           |-          |-       |-     |-      |450    |
|Gukhoy-Russia        |Gukhoy        |42,77N, 45,53E |-           |-          |-       |-     |-      |480    |
|Borzoy-Russia        |Borzoy        |42,85N, 45,62E |-           |-          |-       |-     |-      |500    |
|Varandy-Russia       |Varandy       |42,92N, 45,70E |-           |-          |-       |-     |-      |450    |
|Vaserkel-Russia      |Vaserkel      |42,63N, 45,42E |-           |-          |-       |-     |-      |450    |
|Tsikaro-Russia       |Tsikaro       |42,68N, 45,28E |-           |-          |-       |-     |-      |500    |
|Nikaroy-Russia       |Nikaroy       |42,73N, 45,40E |-           |-          |-       |-     |-      |480    |
|Motsaroy-Russia      |Motsaroy      |42,90N, 45,37E |-           |-          |-       |-     |600    |-      |
|Khaibakh-Russia      |Khaibakh      |42,88N, 45,38E |-           |-          |-       |-     |-      |420    |
|Galanchozh-Russia    |Galanchozh    |42,87N, 45,30E |-           |-          |-       |-     |-      |480    |
|Yalkhoroy-Russia     |Yalkhoroy     |42,85N, 45,22E |-           |-          |-       |-     |-      |500    |
|Dargo-Russia         |Dargo         |42,95N, 46,24E |-           |320        |-       |-     |-      |-      |
|Staryy Yurt-Russia   |Staryy Yurt   |43,45N, 45,78E |-           |-          |-       |-     |-      |1,8k   |
|Braguny-Russia       |Braguny       |43,43N, 46,02E |-           |-          |-       |-     |-      |1,4k   |
|Gudermes-Russia      |Gudermes      |43,35N, 46,10E |-           |-          |-       |-     |-      |1,3k   |
|Kurchaloy-Russia     |Kurchaloy     |43,21N, 46,09E |-           |450        |-       |-     |-      |-      |
|Shali-Russia         |Shali         |43,15N, 45,90E |-           |-          |-       |-     |-      |2,0k   |
|Germenchuk-Russia    |Germenchuk    |43,19N, 45,93E |-           |-          |-       |-     |-      |1,8k   |
|Chechen-Aul-Russia   |Chechen-Aul   |43,20N, 45,79E |-           |-          |-       |-     |-      |2,2k   |
|Aldy-Russia          |Aldy          |43,28N, 45,66E |-           |-          |-       |-     |-      |2,0k   |
|Staryye Atagi-Russia |Staryye Atagi |43,13N, 45,74E |-           |-          |-       |-     |-      |1,8k   |
|Urus-Martan-Russia   |Urus-Martan   |43,13N, 45,54E |-           |-          |-       |-     |-      |2,4k   |
|Goyty-Russia         |Goyty         |43,22N, 45,66E |-           |-          |-       |-     |-      |1,5k   |
|Shalazhi-Russia      |Shalazhi      |43,10N, 45,37E |-           |420        |-       |-     |-      |-      |
|Assinovskaya-Russia  |Assinovskaya  |43,24N, 45,18E |350         |-          |-       |-     |-      |-      |
|Grozny-Russia        |Grozny        |43,32N, 45,69E |-           |-          |-       |-     |-      |1,9k   |

# Late Medieval Highland Tower Complexes and Early Modern Settlements (1300 - 1700AD)

Table: Highland stone tower complexes and early modern settlements in Chechnya and Ingushetia (1300 - 1700AD).

|                      |Settlement     |Historical / Native Names     |Coords         |1300/1400AD |1500/1600AD |1700AD |
|:---------------------|:--------------|:-----------------------------|:--------------|:-----------|:-----------|:------|
|Bamut-Russia          |Bamut          |Бамут                         |43,16N, 45,19E |-           |-           |650    |
|Lugovoye-Russia       |Lugovoye       |Луговое, Мужичи, Muzichi      |43,10N, 45,02E |-           |-           |500    |
|Serzhen-Yurt-Russia   |Serzhen-Yurt   |Сержень-Юрт, Сержень-Юрт I-II |43,12N, 46,02E |-           |-           |950    |
|Zandak-Russia         |Zandak         |Зандак, Зандакский комплекс   |43,00N, 46,37E |950         |-           |1,4k   |
|Alkhan-Yurt-Russia    |Alkhan-Yurt    |Алхан-Юрт, Iалхан-Юрт         |43,23N, 45,54E |-           |-           |1,5k   |
|Belgatoy-Russia       |Belgatoy       |Белгатой                      |43,05N, 45,95E |-           |-           |1,1k   |
|Kharachoy-Russia      |Kharachoy      |Харачой                       |42,91N, 46,14E |650         |-           |1,0k   |
|Targim-Russia         |Targim         |Таргим                        |42,81N, 44,93E |750         |950         |1,0k   |
|Egikal-Russia         |Egikal         |Эгикхал, Агикхал              |42,83N, 44,92E |1,1k        |1,4k        |1,6k   |
|Khamkhi-Russia        |Khamkhi        |Хамхи                         |42,82N, 44,91E |700         |900         |980    |
|Vovnushki-Russia      |Vovnushki      |Вовнушки, Оздик               |42,80N, 45,01E |350         |550         |620    |
|Erzi-Russia           |Erzi           |Эрзи, Арзи                    |42,81N, 44,76E |350         |550         |680    |
|Falkhan-Russia        |Falkhan        |Фалхан                        |42,80N, 44,72E |280         |420         |480    |
|Shoan-Russia          |Shoan          |Шоан, Шоани                   |42,78N, 44,70E |320         |460         |520    |
|Lyazhgi-Russia        |Lyazhgi        |Ляжги                         |42,81N, 44,74E |290         |440         |500    |
|Salgi-Russia          |Salgi          |Салги                         |42,77N, 44,82E |260         |390         |450    |
|Guli-Russia           |Guli           |Гули                          |42,79N, 44,86E |300         |450         |520    |
|Pui-Russia            |Pui            |Пуй                           |42,80N, 44,95E |480         |-           |580    |
|Tumgi-Russia          |Tumgi          |Тумги                         |42,81N, 44,87E |280         |420         |490    |
|Tsori-Russia          |Tsori          |Цори                          |42,77N, 45,03E |340         |520         |600    |
|Niy-Russia            |Niy            |Ний                           |42,78N, 44,98E |310         |470         |540    |
|Pyaling-Russia        |Pyaling        |Пялинг                        |42,79N, 44,99E |290         |440         |510    |
|Beyni-Russia          |Beyni          |Бейни                         |42,83N, 44,69E |260         |380         |440    |
|Dzheyrakh-Russia      |Dzheyrakh      |Джейрах                       |42,82N, 44,68E |350         |520         |620    |
|Furtoug-Russia        |Furtoug        |Фуртоуг                       |42,83N, 44,65E |250         |380         |450    |
|Olgeti-Russia         |Olgeti         |Ольгети                       |42,81N, 44,75E |240         |360         |420    |
|Khoy-Russia           |Khoy           |Хой                           |42,76N, 46,13E |950         |1,3k        |1,5k   |
|Makazhoy-Russia       |Makazhoy       |Макажой                       |42,77N, 46,08E |850         |-           |1,4k   |
|Sharo-Argun-Russia    |Sharo-Argun    |Шаро-Аргун                    |42,73N, 45,87E |750         |-           |1,1k   |
|Sharoy-Russia         |Sharoy         |Шарой                         |42,63N, 45,95E |900         |-           |1,3k   |
|Khimoy-Russia         |Khimoy         |Химой                         |42,67N, 45,88E |800         |-           |1,1k   |
|Kenkhi-Russia         |Kenkhi         |Кенхи                         |42,58N, 46,02E |850         |-           |1,4k   |
|Itum-Kale-Russia      |Itum-Kale      |Итум-Кале, Пхакоч             |42,73N, 45,58E |1,1k        |1,6k        |1,8k   |
|Tazbichi-Russia       |Tazbichi       |Тазбичи                       |42,73N, 45,65E |850         |-           |1,2k   |
|Ushkaloy-Russia       |Ushkaloy       |Ушкалой                       |42,77N, 45,62E |700         |-           |950    |
|Kokadoi-Russia        |Kokadoi        |Кокадой                       |42,72N, 45,60E |620         |-           |850    |
|Shatoy-Russia         |Shatoy         |Шатой, Хакмадой               |42,87N, 45,69E |1,2k        |-           |1,8k   |
|Nikhaloy-Russia       |Nikhaloy       |Нихалой                       |42,83N, 45,66E |750         |-           |1,0k   |
|Gukhoy-Russia         |Gukhoy         |Гухой                         |42,77N, 45,53E |780         |-           |1,1k   |
|Borzoy-Russia         |Borzoy         |Борзой                        |42,85N, 45,62E |820         |-           |1,2k   |
|Varandy-Russia        |Varandy        |Варанды                       |42,92N, 45,70E |720         |-           |1,0k   |
|Vaserkel-Russia       |Vaserkel       |Васеркел, Майсты              |42,63N, 45,42E |850         |1,1k        |1,2k   |
|Tsekaloy-Russia       |Tsekaloy       |Цекалой                       |42,64N, 45,43E |380         |620         |750    |
|Tsikaro-Russia        |Tsikaro        |Цикарой, Малхиста             |42,68N, 45,28E |950         |1,2k        |1,4k   |
|Nikaroy-Russia        |Nikaroy        |Никарой, Терлой               |42,73N, 45,40E |880         |1,1k        |1,3k   |
|Motsaroy-Russia       |Motsaroy       |Моцарой, Нашха                |42,90N, 45,37E |1,1k        |1,4k        |1,6k   |
|Khaibakh-Russia       |Khaibakh       |Хайбах                        |42,88N, 45,38E |750         |950         |1,0k   |
|Galanchozh-Russia     |Galanchozh     |Галанчож                      |42,87N, 45,30E |850         |1,1k        |1,2k   |
|Yalkhoroy-Russia      |Yalkhoroy      |Ялхорой, Акки                 |42,85N, 45,22E |880         |1,1k        |1,2k   |
|Vedeno-Russia         |Vedeno         |Ведено, Ведана                |42,97N, 46,10E |-           |600         |1,1k   |
|Dargo-Russia          |Dargo          |Дарго, ДаргIа                 |42,95N, 46,24E |650         |-           |1,3k   |
|Benoy-Russia          |Benoy          |Беной                         |42,97N, 46,32E |850         |-           |1,6k   |
|Alleroy-Russia        |Alleroy        |Аллерой                       |43,05N, 46,27E |-           |650         |1,2k   |
|Tsentoroy-Russia      |Tsentoroy      |Центорой, Хоси-Юрт            |43,10N, 46,22E |-           |600         |1,1k   |
|Gordali-Russia        |Gordali        |Гордали                       |43,02N, 46,25E |-           |650         |1,2k   |
|Engenoy-Russia        |Engenoy        |Энгеной                       |43,00N, 46,28E |-           |550         |1,0k   |
|Shuan-Russia          |Shuan          |Шуани                         |43,02N, 46,22E |-           |480         |850    |
|Ongusht-Russia        |Ongusht        |Онгушт, Ангушт, Тарское       |43,07N, 44,78E |-           |-           |1,1k   |
|Staryy Yurt-Russia    |Staryy Yurt    |Старый Юрт, Толстой-Юрт       |43,45N, 45,78E |-           |1,4k        |2,2k   |
|Nizhniy Naur-Russia   |Nizhniy Naur   |Нижний Наур, Надтеречное      |43,62N, 45,28E |-           |-           |1,5k   |
|Braguny-Russia        |Braguny        |Брагуны, Борагангечув         |43,43N, 46,02E |-           |1,2k        |1,8k   |
|Isti-Su-Russia        |Isti-Su        |Исти-Су, Мелчхи               |43,28N, 46,15E |-           |850         |1,4k   |
|Gudermes-Russia       |Gudermes       |Гудермес, ГIуьмсе             |43,35N, 46,10E |-           |-           |1,1k   |
|Kurchaloy-Russia      |Kurchaloy      |Курчалой                      |43,21N, 46,09E |-           |-           |1,6k   |
|Mayrtup-Russia        |Mayrtup        |Майртуп                       |43,20N, 46,15E |-           |-           |1,5k   |
|Geldagan-Russia       |Geldagan       |Гелдаган                      |43,23N, 46,02E |-           |-           |1,2k   |
|Tsotsi-Yurt-Russia    |Tsotsi-Yurt    |Цоци-Юрт                      |43,24N, 45,99E |-           |-           |1,1k   |
|Avtury-Russia         |Avtury         |Автуры                        |43,17N, 46,00E |-           |-           |1,4k   |
|Shali-Russia          |Shali          |Шали, Шела                    |43,15N, 45,90E |-           |-           |2,8k   |
|Germenchuk-Russia     |Germenchuk     |Герменчук                     |43,19N, 45,93E |-           |-           |2,4k   |
|Chechen-Aul-Russia    |Chechen-Aul    |Чечен-Аул, Чечень             |43,20N, 45,79E |-           |-           |3,2k   |
|Aldy-Russia           |Aldy           |Алды, Бухан-Юрт               |43,28N, 45,66E |-           |-           |2,2k   |
|Staryye Atagi-Russia  |Staryye Atagi  |Старые Атаги, Большие Атаги   |43,13N, 45,74E |-           |-           |2,1k   |
|Chiri-Yurt-Russia     |Chiri-Yurt     |Чири-Юрт                      |43,09N, 45,75E |-           |-           |950    |
|Duba-Yurt-Russia      |Duba-Yurt      |Дуба-Юрт                      |43,04N, 45,74E |-           |-           |900    |
|Urus-Martan-Russia    |Urus-Martan    |Урус-Мартан, МартантIи        |43,13N, 45,54E |-           |-           |2,3k   |
|Goyty-Russia          |Goyty          |Гойты                         |43,22N, 45,66E |-           |-           |1,6k   |
|Gekhi-Russia          |Gekhi          |Гехи                          |43,16N, 45,47E |-           |-           |1,4k   |
|Roshni-Chu-Russia     |Roshni-Chu     |Рошни-Чу                      |43,08N, 45,45E |-           |-           |950    |
|Shalazhi-Russia       |Shalazhi       |Шалажи                        |43,10N, 45,37E |-           |-           |1,1k   |
|Valerik-Russia        |Valerik        |Валерик                       |43,18N, 45,41E |-           |-           |900    |
|Achkhoy-Martan-Russia |Achkhoy-Martan |Ачхой-Мартан                  |43,19N, 45,28E |-           |-           |1,5k   |
|Katyr-Yurt-Russia     |Katyr-Yurt     |Катыр-Юрт                     |43,17N, 45,35E |-           |-           |950    |
|Chervlennaya-Russia   |Chervlennaya   |Червленная, Ораз-Кала         |43,52N, 45,96E |-           |900         |1,4k   |
|Shchedrinskaya-Russia |Shchedrinskaya |Щедринская                    |43,48N, 46,12E |-           |-           |850    |

# Eighteenth and Nineteenth-Century Settlements (1700 - 1900AD)

Table: Eighteenth and nineteenth-century settlement populations in Chechnya and Ingushetia (1700 - 1900AD).

|                              |Settlement             |Historical / Native Names               |1700AD |1750AD |1800AD |1850AD |1897AD |1900AD |
|:-----------------------------|:----------------------|:---------------------------------------|:------|:------|:------|:------|:------|:------|
|Bamut-Russia                  |Bamut                  |Бамут                                   |650    |-      |950    |750    |1,1k   |1,2k   |
|Lugovoye-Russia               |Lugovoye               |Луговое, Мужичи, Muzichi                |500    |-      |750    |-      |980    |1,0k   |
|Serzhen-Yurt-Russia           |Serzhen-Yurt           |Сержень-Юрт, Сержень-Юрт I-II           |950    |-      |1,4k   |1,1k   |1,6k   |1,7k   |
|Zandak-Russia                 |Zandak                 |Зандак, Зандакский комплекс             |1,4k   |-      |1,8k   |1,5k   |1,9k   |2,0k   |
|Nesterovskaya-Russia          |Nesterovskaya          |Нестеровская, Нестеровское              |-      |-      |950    |1,8k   |3,4k   |3,5k   |
|Alkhan-Yurt-Russia            |Alkhan-Yurt            |Алхан-Юрт, Iалхан-Юрт                   |1,5k   |-      |2,8k   |2,2k   |2,7k   |2,8k   |
|Belgatoy-Russia               |Belgatoy               |Белгатой                                |1,1k   |-      |1,4k   |-      |1,7k   |1,7k   |
|Kharachoy-Russia              |Kharachoy              |Харачой                                 |1,0k   |-      |1,4k   |1,1k   |1,3k   |1,3k   |
|Alkhan-Kala-Russia            |Alkhan-Kala            |Алхан-Кала, Ермоловская                 |-      |-      |-      |1,6k   |2,9k   |3,0k   |
|Yandare-Russia                |Yandare                |Яндаре, Яндаре-Городище                 |-      |850    |1,2k   |1,6k   |2,1k   |2,2k   |
|Gazi-Yurt-Russia              |Gazi-Yurt              |Гази-Юрт, Магас                         |-      |-      |750    |-      |1,1k   |1,1k   |
|Ekazhevo-Russia               |Ekazhevo               |Экажево, Экажевское городище            |-      |1,4k   |2,4k   |3,2k   |4,1k   |4,3k   |
|Ali-Yurt-Russia               |Ali-Yurt               |Али-Юрт                                 |-      |-      |850    |1,1k   |1,5k   |1,6k   |
|Surkhakhi-Russia              |Surkhakhi              |Сурхахи                                 |-      |1,1k   |1,8k   |2,3k   |3,0k   |3,1k   |
|Plievo-Russia                 |Plievo                 |Плиево                                  |-      |900    |1,6k   |2,1k   |2,8k   |2,9k   |
|Barsuki-Russia                |Barsuki                |Барсуки                                 |-      |850    |1,4k   |1,8k   |2,4k   |2,5k   |
|Nasyr-Kort-Russia             |Nasyr-Kort             |Насыр-Корт                              |-      |950    |1,6k   |2,0k   |2,7k   |2,8k   |
|Troitskaya-Russia             |Troitskaya             |Троицкая, Эбан                          |-      |-      |1,4k   |2,4k   |4,6k   |4,8k   |
|Karabulak-Russia              |Karabulak              |Карабулак                               |-      |1,2k   |1,8k   |1,9k   |3,4k   |3,5k   |
|Sleptsovskaya-Russia          |Sleptsovskaya          |Слепцовская, Сунжа, Орджоникидзевская   |-      |-      |1,8k   |2,6k   |5,1k   |5,3k   |
|Targim-Russia                 |Targim                 |Таргим                                  |1,0k   |-      |700    |-      |380    |360    |
|Egikal-Russia                 |Egikal                 |Эгикхал, Агикхал                        |1,6k   |-      |1,1k   |-      |620    |600    |
|Khamkhi-Russia                |Khamkhi                |Хамхи                                   |980    |-      |650    |-      |340    |320    |
|Vovnushki-Russia              |Vovnushki              |Вовнушки, Оздик                         |620    |-      |450    |-      |220    |210    |
|Erzi-Russia                   |Erzi                   |Эрзи, Арзи                              |680    |-      |520    |-      |290    |280    |
|Falkhan-Russia                |Falkhan                |Фалхан                                  |480    |-      |360    |-      |210    |200    |
|Shoan-Russia                  |Shoan                  |Шоан, Шоани                             |520    |-      |400    |-      |250    |240    |
|Lyazhgi-Russia                |Lyazhgi                |Ляжги                                   |500    |-      |380    |-      |240    |230    |
|Salgi-Russia                  |Salgi                  |Салги                                   |450    |-      |340    |-      |190    |180    |
|Guli-Russia                   |Guli                   |Гули                                    |520    |-      |410    |-      |270    |260    |
|Pui-Russia                    |Pui                    |Пуй                                     |580    |-      |420    |-      |210    |200    |
|Tumgi-Russia                  |Tumgi                  |Тумги                                   |490    |-      |360    |-      |200    |190    |
|Tsori-Russia                  |Tsori                  |Цори                                    |600    |-      |450    |-      |260    |250    |
|Niy-Russia                    |Niy                    |Ний                                     |540    |-      |390    |-      |230    |220    |
|Pyaling-Russia                |Pyaling                |Пялинг                                  |510    |-      |370    |-      |210    |200    |
|Beyni-Russia                  |Beyni                  |Бейни                                   |440    |-      |340    |-      |220    |210    |
|Dzheyrakh-Russia              |Dzheyrakh              |Джейрах                                 |620    |-      |550    |-      |480    |490    |
|Furtoug-Russia                |Furtoug                |Фуртоуг                                 |450    |-      |390    |-      |310    |320    |
|Olgeti-Russia                 |Olgeti                 |Ольгети                                 |420    |-      |330    |-      |240    |230    |
|Khoy-Russia                   |Khoy                   |Хой                                     |1,5k   |-      |1,4k   |950    |890    |920    |
|Makazhoy-Russia               |Makazhoy               |Макажой                                 |1,4k   |-      |1,2k   |-      |820    |850    |
|Sharo-Argun-Russia            |Sharo-Argun            |Шаро-Аргун                              |1,1k   |-      |1,1k   |-      |780    |800    |
|Sharoy-Russia                 |Sharoy                 |Шарой                                   |1,3k   |-      |1,2k   |-      |860    |890    |
|Khimoy-Russia                 |Khimoy                 |Химой                                   |1,1k   |-      |1,1k   |-      |790    |820    |
|Kenkhi-Russia                 |Kenkhi                 |Кенхи                                   |1,4k   |-      |1,4k   |-      |1,4k   |1,4k   |
|Itum-Kale-Russia              |Itum-Kale              |Итум-Кале, Пхакоч                       |1,8k   |-      |1,5k   |1,1k   |980    |1,0k   |
|Tazbichi-Russia               |Tazbichi               |Тазбичи                                 |1,2k   |-      |1,1k   |-      |840    |870    |
|Ushkaloy-Russia               |Ushkaloy               |Ушкалой                                 |950    |-      |900    |-      |680    |700    |
|Kokadoi-Russia                |Kokadoi                |Кокадой                                 |850    |-      |800    |-      |590    |610    |
|Shatoy-Russia                 |Shatoy                 |Шатой, Хакмадой                         |1,8k   |-      |2,1k   |1,6k   |2,2k   |2,3k   |
|Nikhaloy-Russia               |Nikhaloy               |Нихалой                                 |1,0k   |-      |950    |-      |710    |730    |
|Gukhoy-Russia                 |Gukhoy                 |Гухой                                   |1,1k   |-      |1,0k   |-      |760    |780    |
|Borzoy-Russia                 |Borzoy                 |Борзой                                  |1,2k   |-      |1,3k   |-      |1,1k   |1,2k   |
|Varandy-Russia                |Varandy                |Варанды                                 |1,0k   |-      |1,1k   |-      |980    |1,0k   |
|Vaserkel-Russia               |Vaserkel               |Васеркел, Майсты                        |1,2k   |-      |850    |-      |420    |400    |
|Tsekaloy-Russia               |Tsekaloy               |Цекалой                                 |750    |-      |520    |-      |260    |250    |
|Tsikaro-Russia                |Tsikaro                |Цикарой, Малхиста                       |1,4k   |-      |950    |-      |490    |470    |
|Nikaroy-Russia                |Nikaroy                |Никарой, Терлой                         |1,3k   |-      |900    |-      |520    |500    |
|Motsaroy-Russia               |Motsaroy               |Моцарой, Нашха                          |1,6k   |-      |1,1k   |-      |680    |660    |
|Khaibakh-Russia               |Khaibakh               |Хайбах                                  |1,0k   |-      |800    |-      |490    |480    |
|Galanchozh-Russia             |Galanchozh             |Галанчож                                |1,2k   |-      |920    |-      |580    |570    |
|Yalkhoroy-Russia              |Yalkhoroy              |Ялхорой, Акки                           |1,2k   |-      |950    |-      |610    |600    |
|Vedeno-Russia                 |Vedeno                 |Ведено, Ведана                          |1,1k   |-      |1,5k   |3,5k   |1,8k   |1,9k   |
|Dargo-Russia                  |Dargo                  |Дарго, ДаргIа                           |1,3k   |-      |1,8k   |1,4k   |1,6k   |1,7k   |
|Benoy-Russia                  |Benoy                  |Беной                                   |1,6k   |-      |2,3k   |1,9k   |2,5k   |2,6k   |
|Alleroy-Russia                |Alleroy                |Аллерой                                 |1,2k   |-      |1,6k   |1,4k   |1,9k   |2,0k   |
|Tsentoroy-Russia              |Tsentoroy              |Центорой, Хоси-Юрт                      |1,1k   |-      |1,6k   |1,4k   |1,8k   |1,9k   |
|Gordali-Russia                |Gordali                |Гордали                                 |1,2k   |-      |1,7k   |1,4k   |1,7k   |1,7k   |
|Engenoy-Russia                |Engenoy                |Энгеной                                 |1,0k   |-      |1,4k   |-      |1,5k   |1,6k   |
|Shuan-Russia                  |Shuan                  |Шуани                                   |850    |-      |1,1k   |-      |1,2k   |1,3k   |
|Ongusht-Russia                |Ongusht                |Онгушт, Ангушт, Тарское                 |1,1k   |1,5k   |1,9k   |1,6k   |2,3k   |2,4k   |
|Nazran-Russia                 |Nazran                 |Назрань, Наьсаре                        |-      |900    |1,6k   |2,4k   |3,8k   |3,9k   |
|Bazorkino-Russia              |Bazorkino              |Базоркино, Чермен, Мочко-Юрт            |-      |-      |-      |1,9k   |3,3k   |3,4k   |
|Kantyshevo-Russia             |Kantyshevo             |Кантышево                               |-      |-      |1,1k   |1,8k   |2,6k   |2,7k   |
|Dolakovo-Russia               |Dolakovo               |Долаково                                |-      |-      |950    |1,5k   |2,2k   |2,3k   |
|Sagopshi-Russia               |Sagopshi               |Сагопши                                 |-      |-      |1,0k   |1,6k   |2,5k   |2,6k   |
|Achaluki-Russia               |Achaluki               |Ачалуки, Средние Ачалуки                |-      |-      |900    |1,4k   |2,2k   |2,3k   |
|Staryy Yurt-Russia            |Staryy Yurt            |Старый Юрт, Толстой-Юрт                 |2,2k   |-      |3,1k   |2,8k   |3,6k   |3,8k   |
|Nizhniy Naur-Russia           |Nizhniy Naur           |Нижний Наур, Надтеречное                |1,5k   |-      |2,6k   |2,9k   |3,8k   |4,0k   |
|Beno-Yurt-Russia              |Beno-Yurt              |Бено-Юрт                                |-      |950    |1,6k   |1,8k   |2,5k   |2,6k   |
|Braguny-Russia                |Braguny                |Брагуны, Борагангечув                   |1,8k   |-      |2,2k   |2,0k   |2,4k   |2,5k   |
|Isti-Su-Russia                |Isti-Su                |Исти-Су, Мелчхи                         |1,4k   |-      |1,8k   |1,6k   |2,1k   |2,2k   |
|Gudermes-Russia               |Gudermes               |Гудермес, ГIуьмсе                       |1,1k   |-      |1,9k   |1,6k   |3,6k   |3,8k   |
|Kurchaloy-Russia              |Kurchaloy              |Курчалой                                |1,6k   |-      |2,9k   |2,5k   |3,7k   |3,8k   |
|Mayrtup-Russia                |Mayrtup                |Майртуп                                 |1,5k   |-      |2,7k   |2,2k   |3,3k   |3,4k   |
|Geldagan-Russia               |Geldagan               |Гелдаган                                |1,2k   |-      |2,1k   |1,8k   |2,5k   |2,5k   |
|Tsotsi-Yurt-Russia            |Tsotsi-Yurt            |Цоци-Юрт                                |1,1k   |-      |1,9k   |1,7k   |2,3k   |2,4k   |
|Avtury-Russia                 |Avtury                 |Автуры                                  |1,4k   |-      |2,5k   |2,1k   |3,0k   |3,1k   |
|Shali-Russia                  |Shali                  |Шали, Шела                              |2,8k   |3,8k   |5,2k   |4,6k   |7,8k   |8,1k   |
|Germenchuk-Russia             |Germenchuk             |Герменчук                               |2,4k   |-      |4,2k   |2,5k   |3,5k   |3,6k   |
|Chechen-Aul-Russia            |Chechen-Aul            |Чечен-Аул, Чечень                       |3,2k   |4,0k   |4,6k   |2,2k   |2,9k   |3,0k   |
|Aldy-Russia                   |Aldy                   |Алды, Бухан-Юрт                         |2,2k   |3,2k   |3,8k   |1,9k   |2,6k   |2,8k   |
|Staryye Atagi-Russia          |Staryye Atagi          |Старые Атаги, Большие Атаги             |2,1k   |-      |3,9k   |2,8k   |3,8k   |4,0k   |
|Novyye Atagi-Russia           |Novyye Atagi           |Новые Атаги                             |-      |1,1k   |1,8k   |1,6k   |2,3k   |2,4k   |
|Chiri-Yurt-Russia             |Chiri-Yurt             |Чири-Юрт                                |950    |-      |1,6k   |1,4k   |1,9k   |2,0k   |
|Duba-Yurt-Russia              |Duba-Yurt              |Дуба-Юрт                                |900    |-      |1,4k   |1,2k   |1,8k   |1,8k   |
|Urus-Martan-Russia            |Urus-Martan            |Урус-Мартан, МартантIи                  |2,3k   |3,4k   |4,8k   |3,9k   |6,7k   |6,9k   |
|Goyty-Russia                  |Goyty                  |Гойты                                   |1,6k   |-      |2,9k   |2,4k   |3,8k   |3,9k   |
|Gekhi-Russia                  |Gekhi                  |Гехи                                    |1,4k   |-      |2,6k   |2,2k   |3,2k   |3,4k   |
|Roshni-Chu-Russia             |Roshni-Chu             |Рошни-Чу                                |950    |-      |1,6k   |1,4k   |2,1k   |2,2k   |
|Shalazhi-Russia               |Shalazhi               |Шалажи                                  |1,1k   |-      |1,9k   |1,6k   |2,4k   |2,5k   |
|Valerik-Russia                |Valerik                |Валерик                                 |900    |-      |1,6k   |1,3k   |1,8k   |1,9k   |
|Achkhoy-Martan-Russia         |Achkhoy-Martan         |Ачхой-Мартан                            |1,5k   |-      |2,7k   |2,4k   |3,9k   |4,1k   |
|Katyr-Yurt-Russia             |Katyr-Yurt             |Катыр-Юрт                               |950    |-      |1,6k   |1,4k   |2,1k   |2,2k   |
|Samashki-Russia               |Samashki               |Самашки, Самашкинская                   |-      |1,1k   |1,8k   |1,9k   |3,5k   |3,6k   |
|Zakan-Yurt-Russia             |Zakan-Yurt             |Закан-Юрт, Закан-Юртовская              |-      |950    |1,6k   |1,7k   |2,9k   |3,0k   |
|Assinovskaya-Russia           |Assinovskaya           |Ассиновская                             |-      |-      |1,1k   |2,1k   |3,9k   |4,0k   |
|Mikhaylovskaya-Russia         |Mikhaylovskaya         |Михайловская, Серноводская              |-      |-      |-      |1,6k   |3,1k   |3,2k   |
|Petropavlovskaya-Russia       |Petropavlovskaya       |Петропавловская                         |-      |-      |-      |1,4k   |2,6k   |2,7k   |
|Goryacheistochnenskaya-Russia |Goryacheistochnenskaya |Горячеисточненская                      |-      |-      |-      |1,2k   |2,3k   |2,4k   |
|Chervlennaya-Russia           |Chervlennaya           |Червленная, Ораз-Кала                   |1,4k   |-      |2,9k   |3,8k   |5,5k   |5,6k   |
|Shchedrinskaya-Russia         |Shchedrinskaya         |Щедринская                              |850    |-      |1,6k   |1,9k   |2,7k   |2,8k   |
|Starogladovskaya-Russia       |Starogladovskaya       |Старогладовская                         |-      |900    |1,6k   |2,1k   |2,8k   |3,0k   |
|Kurdyukovskaya-Russia         |Kurdyukovskaya         |Курдюковская                            |-      |800    |1,4k   |1,8k   |2,5k   |2,6k   |
|Shelkovskaya-Russia           |Shelkovskaya           |Шелковская                              |-      |750    |1,4k   |1,8k   |2,4k   |2,4k   |
|Kalinovskaya-Russia           |Kalinovskaya           |Калиновская                             |-      |1,1k   |1,9k   |2,8k   |4,1k   |4,3k   |
|Naurskaya-Russia              |Naurskaya              |Наурская                                |-      |1,4k   |2,6k   |3,5k   |4,8k   |5,0k   |
|Ishcherskaya-Russia           |Ishcherskaya           |Ищерская                                |-      |950    |1,8k   |2,4k   |3,5k   |3,6k   |
|Mekenskaya-Russia             |Mekenskaya             |Мекенская                               |-      |900    |1,6k   |2,3k   |3,3k   |3,4k   |
|Vozdvizhenskaya-Russia        |Vozdvizhenskaya        |Воздвиженская, Чахкери                  |-      |-      |-      |1,8k   |2,1k   |2,2k   |
|Grozny-Russia                 |Grozny                 |Грозный, Крепость Грозная, Соьлжа-ГIала |-      |1,8k   |2,4k   |4,5k   |15,6k  |17,2k  |

# Sources

::: {#refs}
:::


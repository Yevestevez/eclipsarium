# Sprint 4 — Eclipse 2026

**Fecha límite:** viernes 10 de julio de 2026
**Estado:** 🚧 En progreso

---

## Funcionalidades

### F11: Info ampliada por localidad 🏗️

- **Descripción:** Rellenar páginas de cada ubicación con datos reales. Eliminar placeholder "estación espacial en construcción". Añadir por localidad: descripción, horarios exactos, mejores miradores/zona de visionado, eventos locales, consejos meteorológicos, recomendaciones de alojamiento.
- **Alcance:**
    - Schema de datos extendido en `locations.json` (descripción, altitud sol, horario totalidad, mejores spots, eventos cercanos, web oficial, consejos)
    - Template `[slug].astro` renderiza datos reales, no placeholder
    - Contenido para ~30 ubicaciones extraído de fuentes oficiales y divulgativas
    - ~~Cada página incluye enlace a su CCAA en `trioeclipses.es` si existe~~ → Reemplazado por enlaces directos a eventos CCAA
- **Avance:**
    - `locations.json` con descripciones, horarios, mejores spots, eventos para 29 ubicaciones ✅
    - Mojibake UTF-8 corregido (156 chars doble-codificados, 67 en guiones) ✅
    - 10 URLs genéricas `trioeclipses.es` reemplazadas por enlaces directos a eventos oficiales:
        - Cantabria → `astrocantabria.org`
        - Palencia → `iac.edu.es` (evento + `officialUrl`)
        - Vitoria-Gasteiz → `gasteizberri.com`
        - Lugo → `turismo.gal`
        - Salou → `visitsalou.eu`
        - Zamora → `diputaciondezamora.es`
        - Cuenca → `eldigitaldecuenca.com`
        - Lleida → `eclipsicatalunya.cat`
        - Salamanca → `salamancartvaldia.es`
        - Extremadura → `turismoextremadura.com`
- **Stack:** Astro, JSON, datos de fuentes oficiales
- **Fuentes:**
    - `https://eclipse-solar.es/mejores-ubicaciones-2026/` — descripciones, duraciones, tipo
    - `https://www.comunidad.madrid/trio-eclipses-2026-2027-2028` — 11 puntos observación Madrid
    - `https://www.turismodearagon.com/eclipse-solar-2026/` — Aragón
    - `https://zaragozala.com/eclipse-solar-zaragoza-2026` — Zaragoza spots
    - `https://www.astronomiavisioncertificada.com/blog/eclipse-solar-2026-zaragoza-aragon` — meteorología Zaragoza
    - `https://www.enjoyzaragoza.es/eclipse-aragon/` — actividades Aragón
    - `https://eclipses.app/es/eclipse-2026` — visibilidad por CCAA, miradores destacados
    - `https://www.elimparcial.es/noticia/294908/sociedad/elegidos-los-mejores-puntos-de-observacion-para-ver-el-eclipse-solar-en-agosto.html` — puntos preferentes por CCAA
    - `https://www.caib.es/webgoib/es/vols-saber-ho-tot-sobre-l-eclipsi-del-12-d-agost-de-2026-` — Baleares
    - `https://www.europapress.es/illes-balears/noticia-eclipse-solar-total-2026-mallorca-mapa-observar-evento-astronomico-siglo-20250822102117.html` — Mallorca puntos Serra Tramuntana
    - `https://www.patrimonioactivocyl.es/actividad/turismo/eclipse-solar-12-de-agosto-2026-castilla-y-leon/` — Castilla y León
    - `https://www.cyltv.es/ficha/eclipse-2026` — Castilla y León mapa IGN
    - `https://es.wikipedia.org/wiki/Eclipse_solar_del_12_de_agosto_de_2026` — datos generales, contexto histórico
    - `https://astrocantabria.org/?q=eclipse26` — Cantabria observaciones
    - `https://gasteizberri.com/2026/03/agenda-cea-eclipse-2026-vitoria-gasteiz/` — Vitoria-Gasteiz programa
    - `https://www.turismo.gal/que-facer/eclipse?langId=es_ES` — Galicia rutas eclipse
    - `https://www.visitsalou.eu/es/durante-tu-visita/informacion-util/actividades/eclipse-total` — Salou actividades
    - `https://eclipsicatalunya.cat/es/puntos-de-observacion` — Catalunya 26 puntos
    - `https://www.salamancartvaldia.es/` — Salamanca actividades
    - `https://www.turismoextremadura.com/` — Extremadura rutas
- **Aceptación:**
    - [x] 29 ubicaciones con contenido real (descripción, horarios, spots, eventos)
    - [x] Enlaces genéricos `trioeclipses.es` reemplazados por URLs directas a eventos
    - [x] Datos consistentes con fuentes oficiales
    - [x] Horarios y duraciones verificados por ubicación
    - [x] Cada página tiene al menos: descripción, horario, mejores spots, consejos
    - [x] Mojibake UTF-8 corregido (sin caracteres corruptos en datos)
    - [x] Build producción sin errores (30 pages, 0 errors)

---

### F12: Eventos por CCAA ✅

- **Descripción:** Puntos de observación oficiales organizados por comunidades autónomas, integrados dentro de cada página de localidad (`[slug].astro`). Datos de 12 CCAA extraídos de fuentes oficiales y divulgativas.
- **Alcance:**
    - Datos en `src/data/ccaa-events.json` con estructura `{ ccaa, puntos[], eventos[], enlace_oficial }`
    - Integración en `[slug].astro` — lookup por `place.region`, renderiza tabla de puntos y eventos de la CCAA
    - Fuente citada antes de cada bloque de eventos por CCAA
    - 12 CCAA cubiertas (100% de las regiones en `locations.json`)
- **Avance:**
    - Datos de 12 CCAA con puntos, duraciones, eventos, enlace oficial y fuente:
        - Madrid: 11 puntos (Somosierra 1m29s → San Sebastián de los Reyes 35s) + 34 puntos información ✅
        - Castilla y León: 73 municipios, 16 puntos representativos con duraciones ✅
        - Cataluña: 26 puntos en 20 municipios (iniciativa "Catalunya mira al cielo") ✅
        - Aragón: 10 puntos (CEFCA, Galáctica, Planetario, Sizigia) ✅
        - Galicia: 143 municipios Xunta, 12 puntos costeros (Torre Hércules, Vixía da Herbeira, Estaca Bares) ✅
        - Asturias: 78 puntos seguros FICYT, 12 puntos (Cabo Peñas, Sablón, Lagos Covadonga, Picu Polio) ✅
        - C. Valenciana: 8 puntos oficiales Generalitat (Aras Olmos, Benassal, Castellón, Valencia) ✅
        - Cantabria: 51 municipios, 12 puntos (Fuente Dé, Magdalena, Cabo Mayor, Comillas) ✅
        - Castilla-La Mancha: 12 puntos (Guadalajara, Cuenca, Alto Tajo, Serranía, Brihuega) ✅
        - País Vasco: 5 puntos (Vitoria-Gasteiz 1m02s, Bilbao 31s, San Sebastián parcial) ✅
        - Islas Baleares: 10 puntos (Serra Tramuntana, Deià, Palma, Menorca, Eivissa) ✅
        - Extremadura: eclipse parcial ~98%, nota informativa con enlaces a turismo ✅
    - Datos embedidos en `[slug].astro` renderizan automáticamente por CCAA ✅
    - Sin sección separada en home (todo va en páginas de localidad) ✅
    - 95 tests, 0 failures ✅
- **Stack:** Astro, JSON, datos oficiales CCAA
- **Fuentes:**
    - `https://www.comunidad.madrid/trio-eclipses-2026-2027-2028` — Madrid 11+34 puntos, reparto gafas
    - `https://www.eldebate.com/espana/madrid/20260320/madrid-vuelca-historico-eclipse-solar-12-agosto-ambicioso-programa-actividades_398028.html` — programa Madrid
    - `https://www.eleconomista.es/actualidad/noticias/13958497/06/26/la-lista-con-los-73-municipios-recomendados-para-ver-el-eclipse-del-12-de-agosto-2026-6.html` — 73 municipios Castilla y León
    - `https://www.diariodecastillayleon.es/castilla-y-leon/260120/104249/eclipse-solar-deslumbra-oferta-castilla-leon-fitur.html` — promoción CyL Fitur
    - `https://www.elimparcial.es/noticia/294908/sociedad/elegidos-los-mejores-puntos-de-observacion-para-ver-el-eclipse-solar-en-agosto.html` — puntos preferentes por CCAA
    - `https://eclipsicatalunya.cat/es/puntos-de-observacion` — Catalunya 26 puntos
    - `https://aragoninvestiga.es/aragon-escenario-privilegiado-del-eclipse-solar-total-de-2026/` — Aragón CEFCA/Galáctica
    - `https://www.hoyaragon.es/articulo/noticias-aragon/eclipse-solar-total-2026/20250812093351105296.html` — "La Noche del Sol" Javalambre
    - `https://www.tourspain.es/es/b2b/aragon-experiencias-astroturismo-teruel-huesca-zaragoza` — astroturismo Aragón
    - `https://www.caib.es/webgoib/es/vols-saber-ho-tot-sobre-l-eclipsi-del-12-d-agost-de-2026-` — Baleares gov
    - `https://www.20minutos.es/ciencia/cuatro-comunidades-quedaran-completamente-oscuras-eclipse-solar-2026_6513074_0.html` — 4 CCAA oscuridad total
    - `https://www.turismo.gal/que-facer/eclipse?langId=es_ES` — Galicia rutas eclipse
    - `https://www.elespanol.com/quincemil/economia/turismo/20260124/confirmado-xunta-mejores-lugares-galicia-ver-gran-eclipse-sol-agosto/1003744099973_0.html` — Xunta 143 municipios
    - `https://eclipseasturias2026.ficyt.es/puntos_observacion.php` — Asturias 78 puntos seguros
    - `https://www.elcomercio.es/eclipse/mieres-prepara-vivir-eclipse-solar-maximo-picu-20260405205919-nt.html` — Mieres Picu Polio
    - `https://eclipses.gva.es/` — C. Valenciana 8 puntos oficiales
    - `https://www.valenciabonita.es/2026/06/17/eclipse-solar-total-12-agosto-2026-comunitat-valenciana` — Guía C. Valenciana
    - `https://astrocantabria.org/?q=eclipse26` — Cantabria observaciones
    - `https://www.observatorioastronomicocantabria.com/oac/web/observaciones-eclipse` — Obs. Astronómico Cantabria
    - `https://www.turismocastillalamancha.es/es/naturaleza/astroturismo/eclipse-total-de-sol-en-castilla-la-mancha` — Castilla-La Mancha turismo
    - `https://eclipse-solar.es/guadalajara/` — Guadalajara puntos
    - `https://eclipse-solar.es/pais-vasco/` — País Vasco guía
    - `https://eclipse-solar.es/extremadura/` — Extremadura guía
    - `https://astroturismoporextremadura.es/eclipse-total` — Astroturismo Extremadura
    - `https://www.treseclipses.es/eclipses/2026-total/miradores/galicia` — TresEclipses Galicia
- **Aceptación:**
    - [x] Datos de 12 CCAA con puntos de observación verificados
    - [x] Puntos embedidos en cada página de localidad (`[slug].astro`)
    - [x] Enlaces a fuentes oficiales de cada CCAA con fuente citada
    - [x] Build producción sin errores (30 pages, 0 errors)
    - [x] 95 tests, 0 failures

---

### F13: Festivales del eclipse ⏳

- **Descripción:** Sección dedicada a festivales y eventos destacados organizados específicamente para el eclipse del 12 de agosto de 2026. Extraído de eclipse-solar.es/eventos y webs de cada festival.
- **Alcance:**
    - Datos en `src/data/festivals.json` con estructura `{ name, date, location, type, description, url, ccaa }`
    - Componente `Festivals.astro` con cards de festival
    - 5 festivales principales:
        - Iberia Eclipse Festival (Vinuesa, Soria, 10-14 ago, ~1m42s totalidad) — `https://iberiaeclipse.com/en`
        - Sizigia Eclipse Gathering (Embalse Sotonera, Huesca, 10-14 ago) — `https://sizigiaeclipse.com/`
        - Astral Plane Festival (La Pinilla, Segovia, 10-12 ago) — `https://spaineclipsefestival.com/`
        - Festival Eclipse 2026 – Parc Astronòmic Prades (Tarragona, 10-13 ago) — `https://www.parcastronomicprades.cat/es/solar-eclipse-26/`
        - EclipsaFest 2026 (Manjirón, Sierra Norte Madrid, ~80s) — `https://elnocturnario.com/eclipsafest/`
    - Tours guiados: Sky & Telescope, Smithsonian Journeys, AstroAfición
    - Observaciones públicas: ALA Astronomía León, FAAE red nodos IAU, CESAR/ESA
    - Integración en home (sección propia o subsección de Eventos)
- **Stack:** Astro, JSON
- **Fuentes:**
    - `https://eclipse-solar.es/eventos/` — listado completo festivales y observaciones
    - `https://iberiaeclipse.com/en` — Iberia Eclipse Festival
    - `https://sizigiaeclipse.com/` — Sizigia Eclipse Gathering
    - `https://spaineclipsefestival.com/` — Astral Plane Festival
    - `https://www.parcastronomicprades.cat/es/solar-eclipse-26/` — Festival Prades
    - `https://elnocturnario.com/eclipsafest/` — EclipsaFest
    - `https://astroaficion.com/producto/eclipse-sol-2026/` — AstroAfición tour
    - `https://eclipse262728.es/en/eclipse2026/` — FAAE nodos IAU
    - `https://cesar.esa.int/index.php?Section=Total_Eclipse_2026` — ESA CESAR programa
    - `https://skyandtelescope.org/astronomy-travel/spain2026/` — Sky & Telescope tour
    - `https://www.smithsonianjourneys.org/tours/solar-eclipse-over-spain-madrid/itinerary/` — Smithsonian tour
    - `https://www.astroleon.org/eventos-astronomicos/eclipse-solar-2026/` — ALA León
- **Aceptación:**
    - [ ] 5+ festivales con datos completos
    - [ ] Componente visual con cards
    - [ ] Enlaces a webs oficiales de cada evento
    - [ ] Build producción sin errores

---

### F14: Hover informativo en marquee ⏳

- **Descripción:** Añadir hover/tooltip en el marquee del hero que explique términos astronómicos mostrados. Pendiente de sprint-3.
- **Alcance:**
    - Tooltip al hacer hover sobre términos en el marquee rotatorio
    - Explicación breve de cada término (totalidad, parcialidad, anular, umbra, penumbra, etc.)
    - Animación smooth, theme-aware
    - Sin romper el diseño actual del marquee
- **Stack:** CSS, JS vanilla
- **Aceptación:**
    - [ ] Tooltip visible en hover sobre términos
    - [ ] No afecta rendimiento ni layout
    - [ ] Build producción sin errores

---

## Fuentes recopiladas (referencia futura)

### Oficiales / Gubernamentales

- `https://trioeclipses.es/` — Web oficial Trío de Eclipses (Gobierno España, MICIU, FECYT)
- `https://divulgacion.trioeclipses.es/eventos` — API eventos divulgativos (Laravel)
- `https://www.ciencia.gob.es/Noticias/2026/marzo/lanzamiento-web-trio-eclipses.html` — Nota lanzamiento web oficial
- `https://www.comunidad.madrid/trio-eclipses-2026-2027-2028` — Comunidad de Madrid: 11 puntos + 34 de información
- `https://www.caib.es/webgoib/es/vols-saber-ho-tot-sobre-l-eclipsi-del-12-d-agost-de-2026-` — Govern Illes Balears
- `https://www.boe.es/eli/es/rd/2025/07/29/686/con` — RD Comisión Interministerial Trío Eclipses
- `https://www.turismodearagon.com/eclipse-solar-2026/` — Turismo Aragón
- `https://www.tourspain.es/es/b2b/aragon-experiencias-astroturismo-teruel-huesca-zaragoza` — Turespaña astroturismo Aragón

### Divulgación científica / Astronomía

- `https://eclipse-solar.es/` — Portal Eclipse Solar España (ubicaciones, mapa, eventos)
- `https://eclipse-solar.es/mejores-ubicaciones-2026/` — Mejores ubicaciones por CCAA
- `https://eclipse-solar.es/eventos/` — Festivales y eventos verficados
- `https://eclipses.app/es/eclipse-2026` — Guía completa, visibilidad por CCAA, miradores DEM+ERA5
- `https://eclipse262728.es/` — Portal eclipses 2026-2027-2028 (FAAE)
- `https://eclipse262728.es/en/eclipse2026/` — Red nodos IAU/FAAE
- `https://federacionastronomica.es/index.php/ultimas-noticias/789-trio-de-eclipses` — FAAE Trío Eclipses
- `https://es.wikipedia.org/wiki/Eclipse_solar_del_12_de_agosto_de_2026` — Wikipedia
- `https://astroaficion.com/eclipse-solar-2026-guia-completa` — Guía completa AstroAfición
- `https://www.astronomiavisioncertificada.com/blog/eclipse-solar-2026-zaragoza-aragon` — Meteorología y horarios Zaragoza
- `https://www.astroleon.org/eventos-astronomicos/eclipse-solar-2026/` — ALA León 40 aniversario
- `https://www.parcastronomicprades.cat/es/solar-eclipse-26/` — Parc Astronòmic Prades
- `https://aragoninvestiga.es/aragon-escenario-privilegiado-del-eclipse-solar-total-de-2026/` — Aragón Investiga (CEFCA/Galáctica)
- `https://aragoninvestiga.es/guia-del-eclipse-solar-de-2026/` — Guía eclipse Aragón
- `https://cesar.esa.int/index.php?Section=Total_Eclipse_2026` — ESA CESAR programa educativo

### Medios / Noticias

- `https://www.eldebate.com/espana/madrid/20260320/madrid-vuelca-historico-eclipse-solar-12-agosto-ambicioso-programa-actividades_398028.html` — El Debate: programa Madrid
- `https://www.20minutos.es/ciencia/cuatro-comunidades-quedaran-completamente-oscuras-eclipse-solar-2026_6513074_0.html` — 20min: CCAA oscuridad total
- `https://www.20minutos.es/viajes/hoteles/mejores-hoteles-ver-eclipse-solar-total-12-agosto-espana_6921193_0.html` — 20min: hoteles eclipse
- `https://www.eleconomista.es/actualidad/noticias/13958497/06/26/la-lista-con-los-73-municipios-recomendados-para-ver-el-eclipse-del-12-de-agosto-2026-6.html` — El Economista: 73 municipios CyL
- `https://www.diariodecastillayleon.es/castilla-y-leon/260120/104249/eclipse-solar-deslumbra-oferta-castilla-leon-fitur.html` — Diario CyL: Fitur eclipse
- `https://www.elimparcial.es/noticia/294908/sociedad/elegidos-los-mejores-puntos-de-observacion-para-ver-el-eclipse-solar-en-agosto.html` — El Imparcial: puntos preferentes por CCAA
- `https://www.cope.es/emisoras/castilla-y-leon/valladolid-provincia/valladolid/noticias/valladolid-mira-cielo-guia-definitiva-actividades-gran-eclipse-solar-20260701_3395673.html` — COPE: Valladolid Museo Ciencias
- `https://www.europapress.es/illes-balears/noticia-eclipse-solar-total-2026-mallorca-mapa-observar-evento-astronomico-siglo-20250822102117.html` — Europa Press: Mallorca mapa
- `https://www.ultimahora.es/noticias/local/2025/08/10/2446581/reservas-millonarias-hoteles-mallorca-por-eclipse-total-sol-del-agosto-2026.html` — Última Hora: reservas Baleares
- `https://www.hoyaragon.es/articulo/noticias-aragon/eclipse-solar-total-2026/20250812093351105296.html` — Hoy Aragón: La Noche del Sol
- `https://www.diariodelaltoaragon.es/noticias/2025/03/27/todo-listo-para-el-eclipse-solar-parcial-1811023-daa.html` — DAA: actividades Aragón

### Guías locales / Turismo

- `https://zaragozala.com/eclipse-solar-zaragoza-2026` — Guía Zaragoza (horarios, spots, niños, FAQ)
- `https://www.enjoyzaragoza.es/eclipse-aragon/` — Enjoy Zaragoza: Aragón 594 municipios
- `https://www.senia.es/blog/eclipse-solar-12-agosto-2026-espana` — Campings Senia
- `https://www.patrimonioactivocyl.es/actividad/turismo/eclipse-solar-12-de-agosto-2026-castilla-y-leon/` — Patrimonio Activo CyL
- `https://www.cyltv.es/ficha/eclipse-2026` — CyL TV mapa IGN
- `https://www.eltiempo.es/noticias/eclipse-solar-palma-de-mallorca` — El Tiempo: Palma horarios
- `https://www.oasiscatamaran.com/excursiones-mallorca/eclipse-solar-total-2026-desde-el-mar` — Catamarán eclipse Mallorca

### Festivales / Eventos

- `https://iberiaeclipse.com/en` — Iberia Eclipse Festival (Soria)
- `https://sizigiaeclipse.com/` — Sizigia Eclipse Gathering (Huesca)
- `https://spaineclipsefestival.com/` — Astral Plane Festival (Segovia)
- `https://elnocturnario.com/eclipsafest/` — EclipsaFest (Madrid)
- `https://astroaficion.com/producto/eclipse-sol-2026/` — AstroAfición (Burgos)
- `https://astroaficion.com/producto/eclipse-sol-2026-guadalajara/` — AstroAfición (Guadalajara)

### Internacionales / Referencia

- `https://www.timeanddate.com/eclipse/in/spain/zaragoza?iso=20260812` — TimeandDate horarios Zaragoza
- `https://skyandtelescope.org/astronomy-travel/spain2026/` — Sky & Telescope tour
- `https://www.smithsonianjourneys.org/tours/solar-eclipse-over-spain-madrid/itinerary/` — Smithsonian Journeys
- `https://www.almanac.com/eclipses` — Old Farmer's Almanac

---

## Definición de completado

- [x] F11: 29 páginas localidad con contenido real (descripción, horarios, spots, eventos)
- [x] F11: Sin placeholders en páginas de ubicación
- [x] F11: URLs genéricas reemplazadas por enlaces directos a eventos CCAA
- [x] F11: Mojibake UTF-8 corregido en locations.json
- [x] F12: Datos de 12 CCAA con puntos de observación
- [x] F12: Puntos embedidos en páginas de localidad ([slug].astro)
- [ ] F13: 5+ festivales con cards y enlaces
- [ ] F13: Sección festivales integrada en home
- [ ] F14: Tooltip funcional en marquee hero
- [ ] Build producción sin errores
- [ ] Tests unitarios y E2E para nuevos componentes
- [ ] Responsivo mobile/desktop
- [ ] Sin console errors

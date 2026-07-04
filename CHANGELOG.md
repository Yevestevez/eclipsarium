# Changelog

## v1.13.0 (2026-07-04)

- F13: Festivales del eclipse — 11 eventos (5 festivales, 3 tours, 3 observaciones públicas)
- F13: `Festivals.astro` — cards agrupadas por tipo, badges coloreados, highlights, grid responsive
- F13: Sección integrada en home con enlace nav
- Build: 30 páginas, 103 tests

## v1.12.0 (2026-07-04)

- F12: Eventos por CCAA — 12 comunidades con puntos de observación, duraciones y eventos
- F12: Datos embedidos en cada página de localidad (`[slug].astro`), lookup por región
- F12: Fuente citada antes de cada bloque de eventos CCAA
- F12: Cubiertas 12/12 regiones — Aragón, Asturias, C. Valenciana, Cantabria, Castilla y León, Castilla-La Mancha, Cataluña, Madrid, Extremadura (parcial), Galicia, Islas Baleares, País Vasco
- Build: 30 páginas, 95 tests

## v1.11.0 (2026-07-04)

- F11: Contenido real para 29 localidades: descripción, horarios exactos, mejores miradores, eventos locales
- F11: Datos extraídos de fuentes oficiales (CCAA, NASA, ESA, medios)
- F11: Enlaces genéricos `trioeclipses.es` reemplazados por URLs directas a eventos oficiales
- F11: Corregido mojibake en `locations.json` — 156 caracteres doble-codificados revertidos
- Build: 30 páginas, 87 tests

## v1.10.1 (2026-07-04)

- Security: `innerHTML` eliminado en buscador Nominatim (XSS vía OSM display_name)
- Security: HTML escape (`esc()`) en markers/popups de Leaflet (EclipseMap.astro)
- Security: `innerHTML` → `textContent` en checklist (PrepChecklist.astro)
- Build: 30 páginas, 87 tests

## v1.10.0 (2026-06-25)

- Quiz general independiente (12 preguntas V/F, 4 categorías)
- `src/data/quiz.json` — datos desacoplados
- `QuizGeneral.astro` — badge de categoría, feedback, progreso, récord localStorage
- Selectores JS scoped via `data-quiz-general` para coexistir con KidsActivities
- Tests: 11 unitarios + 5 data + 10 E2E (E38–E42)
- Build: 30 páginas, 0 errores

## v1.9.0 (2026-06-24)

- FAQ: 10 preguntas frecuentes reales con respuesta científica + fuente
- Mitos: 6 mitos desmentidos con explicación breve
- `FaqMyths.astro` con `<details>` acordeón, FAQ y mitos en bloques separados
- Datos en `faq.json` con estructura `{ q, a, source: { name, url } }`
- Tema oscuro por defecto en primera visita (ignora `prefers-color-scheme`)
- Build: 30 páginas, 0 errores

## v1.8.0 (2026-06-23)

- `EventList.astro`: fetch build-time desde API Laravel (`/api/events?per_page=10`)
- Fallback `events-fallback.json` (8 eventos destacados) si API no responde
- 10 eventos próximos con fecha ES, provincia, institución, enlace condicional
- `.section__lead` unificado como clase global — elimina 4 duplicados por componente
- Tokens de espaciado generales en `tokens.css`
- Tests: 11 unitarios + 6 E2E (E14–E19)

## v1.7.0 (2026-06-22)

- Modo claro/oscuro con switch sol/luna animado (rotate + fade 0.4s)
- Anti-flash script inline en `<head>` antes del paint
- Persistencia localStorage + `prefers-color-scheme` en primera visita
- Mapa Leaflet adapta tiles (`dark_all` ↔ `light_all`) vía MutationObserver
- Starfield + grain ocultos en modo claro
- Transición suave `background-color 0.3s, color 0.3s` con guard `prefers-reduced-motion`
- Nav responsive ≤860px: wrap a 2ª línea, space-between
- CSS `:global()` fix para selectores `[data-theme]`

## v1.6.0 (2026-06-21)

- 6 actividades prácticas con materiales, pasos, tips y explicación científica
- Mini-quiz interactivo 5 preguntas V/F con feedback y récord localStorage
- Enlace "Fuente:" por actividad (NASA Space Place, Exploratorium)
- Tests: 10 unitarios + 8 E2E + axe a11y

## v1.5.0 (2026-06-20)

- 29 páginas individuales `/location/[slug]` con `getStaticPaths`
- Hover markers: dot escala + glow, popup con datos + enlace
- Popup hover persistente (mouseenter cancela cierre)
- Buscador JS client-side: filtra lista + mapa por ciudad/región/tipo
- Nominatim geocoding en 2 fases (mundial settlements → España streets/cód.postal)
- Filtro `addresstype` — evita calles confusas
- Punto-en-polígono por ray-casting
- Tests: 41 unitarios (7 suites)

## v1.4.0 (2026-06-19)

- Páginas por localidad + buscador + hover/popup en mapa

## v1.3.0 (2026-06-18)

- Checklist interactiva de preparación: 3 columnas desktop, 14 ítems, persistencia localStorage, barra de progreso
- Advertencias de seguridad ocular
- 3 bloques: Antes / Día / Después del eclipse

## v1.2.0 (2026-06-17)

- Botones añadir a calendario: Google Calendar, Apple Calendar (webcal con 3 alarmas), Outlook
- Archivo `.ics` con notificaciones predefinidas

## v1.1.0 (2026-06-16)

- Mapa Leaflet interactivo con polígono de totalidad NASA/JPL (83 puntos)
- 29 localizaciones con 3 categorías: total (azul), borde (azul oscuro), parcial (gris)
- Labels y dots con colores por tipo

## v1.0.0 (2026-06-15) — MVP

- Animación eclipse solar (Sol, Luna, sombra, fases)
- Información del evento (fecha, hora, duración, magnitud)
- Dónde verlo (texto + datos)
- Cuenta atrás al evento
- Navegación responsive con menú hamburguesa
- Layout base + design tokens CSS

# Eclipse 2026 🌑

Web informativa sobre el **eclipse solar total del 12 de agosto de 2026**, visible en gran parte de España.

> Tras casi un siglo sin un eclipse solar total visible desde la península, España vivirá uno de los eventos astronómicos más esperados del siglo.

## 🌐 Despliegue

- **v1.0.0 (MVP):** https://eclipsarium.vercel.app/
- **v1.1.0 (mapa):** mapa interactivo con franja de totalidad y localizaciones
- **v1.2.0 (calendario):** botones añadir evento a calendario
- **v1.3.0 (checklist):** recomendaciones y checklist interactiva de preparación
- **v1.4.0:** páginas por localidad + buscador + hover/popup en mapa
- **v1.5.0:** Nominatim geocoding con búsqueda inteligente (fase mundial + España) + filtro por tipo de lugar + contexto con país
- **v1.6.0:** Actividades para familias: 6 actividades hands-on + quiz interactivo + enlaces fuente
- **v1.7.0:** Modo claro/oscuro con switch sol/luna animado + persistencia localStorage + respeta `prefers-color-scheme` + CSS `:global()` scoping fix + refactor tokens CSS
- **v1.8.0:** Eventos externos desde API divulgación + `.section__lead` unificado + tokens de espaciado generales (eyebrow→heading, heading→lead)
- **v1.9.0 (actual):** FAQ + mitos sobre eclipses con acordeón interactivo. Tema oscuro por defecto (ignora `prefers-color-scheme`).

## 🎯 Objetivo

Punto de referencia divulgativo y atractivo para el público general:

- Explicar **qué es un eclipse solar** mediante animación interactiva.
- Ofrecer **información del evento** del 12 de agosto de 2026 en España.
- Indicar **dónde y cuándo verlo** (franja de totalidad, horarios, mejores ubicaciones).
- Promover la **observación segura** del Sol.

## 🛠️ Stack

- [Astro](https://astro.build/) `^6.4.2`
- [Leaflet](https://leafletjs.com/) `^1.9.4` — mapa interactivo con CartoDB tiles (dark_all / light_all)
- [Vitest](https://vitest.dev/) `^4.1.9` — tests unitarios
- [Playwright](https://playwright.dev/) `^1.61.0` — tests E2E + accesibilidad (axe-core)
- Node `>=22.13.0` · pnpm

## 🚀 Inicio rápido

```bash
pnpm install
pnpm dev              # servidor desarrollo (http://localhost:4321)
pnpm build            # build producción
pnpm preview          # previsualizar build
pnpm test             # tests unitarios (Vitest)
pnpm test:e2e         # tests E2E (Playwright)
```

## 📁 Estructura

```
src/
├── __tests__/        # tests unitarios de páginas
├── assets/           # imágenes y svg
├── components/       # componentes .astro
│   ├── AddToCalendar.astro   # botones añadir a calendario (Google, Outlook, .ics)
│   ├── EclipseMap.astro      # mapa Leaflet con polígono + markers
│   ├── EventList.astro       # eventos externos desde API + fallback JSON
│   ├── KidsActivities.astro  # actividades y quiz para familias
│   ├── PrepChecklist.astro   # checklist interactiva con persistencia
│   └── WhereToWatch.astro    # lista de lugares + buscador + mapa
├── data/             # datos estáticos (JSON + test co-localizado)
├── layouts/          # layouts de página
├── pages/            # rutas (index.astro, /location/[slug].astro)
└── styles/           # tokens de diseño CSS
test/
└── e2e/              # tests Playwright (home, nav, countdown, checklist, activities, events, a11y, search)
```

## 📅 El evento

- **Fecha:** 12 de agosto de 2026
- **Tipo:** eclipse solar total
- **Visibilidad:** franja de totalidad cruzando el norte y centro-este peninsular; parcial en el resto.

> ⚠️ **Seguridad:** nunca mirar al Sol sin protección certificada ISO 12312-2.

## ✨ Features

### Sprint 1 ✅ — MVP (v1.0.0)

- [x] Animación eclipse solar (Sol, Luna, sombra, fases)
- [x] Información del evento (fecha, hora, duración, magnitud)
- [x] Dónde verlo (texto + datos)
- [x] Cuenta atrás al evento
- [x] Navegación responsive con menú hamburguesa

### Sprint 2 ✅ — Mapa + Calendario + Checklist + Páginas + Buscador + Geocoding (v1.5.0)

- [x] Mapa Leaflet con tiles CartoDB dark_all
- [x] Polígono de totalidad con coordenadas reales NASA/JPL (83 puntos)
- [x] 29 localizaciones con 3 categorías: total (azul), borde (azul oscuro), parcial (gris)
- [x] Labels y dots con colores por tipo
- [x] Lista ordenada por duración de totalidad
- [x] Botones calendario: Google Calendar, Apple Calendar (webcal con avisos), Outlook
- [x] Archivo .ics con 3 alarmas predefinidas (1 semana, 1 día, 1 hora)
- [x] Checklist interactiva de preparación: recomendaciones (3 columnas desktop), 14 ítems checklist con persistencia localStorage y barra de progreso, advertencias de seguridad ocular
- [x] Hover en markers del mapa: dot escala + glow, popup con datos + enlace
- [x] Popup hover persistente (mouseenter cancela cierre)
- [x] Click en marker / lista → navega a `/location/[slug]`
- [x] 29 páginas individuales `/location/[slug]` con getStaticPaths
- [x] Buscador JS client-side: filtra lista + mapa por ciudad/región/tipo
- [x] Tests unitarios (Vitest, 41 tests en 7 suites) + E2E (Playwright)
- [x] Nominatim geocoding: búsqueda en 2 fases (mundial settlements → España streets/cód.postal)
- [x] Filtro `addresstype` (city/town/village/hamlet/municipality) — evita calles confusas
- [x] Contexto de localización con país siempre visible
- [x] Ciudad en negrita azul, contexto gris, énfasis blanco
- [x] CSS scoping fix (`:global()`) para contenido dinámico de búsqueda

### Sprint 2 ✅ — Actividades para Familias (v1.6.0)

- [x] 6 actividades prácticas con materiales, pasos, tips y explicación científica
- [x] Mini-quiz interactivo 5 preguntas Verdadero/Falso con feedback y localStorage
- [x] Enlace "Fuente:" por actividad a recurso externo (NASA Space Place, Exploratorium)
- [x] Tests unitarios (Vitest, 60 tests en 9 suites) + E2E (Playwright, 16 tests) + axe a11y
- [x] Responsivo mobile/desktop

### Sprint 3 ✅ — v1.7.0 · v1.8.0 · v1.9.0

#### F6: Coherencia de estilos (parcial, v1.7.0)

- [x] `.section__lead` unificado como clase global única — elimina 4 duplicados por componente
- [x] Tokens de espaciado generales en `tokens.css`: `h2/h3 + .section__lead` (1.6rem), `.eyebrow + h2/h3` (1.2rem)
- [x] Margen consistente entre eyebrow→heading→lead en todas las secciones
- [x] Variables hardcodeadas reemplazadas por tokens (EclipseMap, KidsActivities)
- [x] Build producción 0 errores, 30 páginas

#### F7: Modo claro/oscuro (v1.7.0)

- [x] Paleta clara definida en `tokens.css` con `[data-theme="light"]`
- [x] Anti-flash script inline en `<head>` para evitar parpadeo al cargar
- [x] Switch sol/luna animado (rotate + fade 0.4s, respeta `prefers-reduced-motion`)
- [x] Sol visible en modo oscuro (click → modo claro), luna en modo claro (click → modo oscuro)
- [x] Persistencia en localStorage
- [x] `prefers-color-scheme` en primera visita
- [x] Mapa Leaflet cambia tiles (`dark_all` ↔ `light_all`) vía MutationObserver
- [x] Starfield + grain ocultos en modo claro
- [x] Badges de borde con texto blanco en modo claro
- [x] CSS `:global()` fix para selectores `[data-theme]` en Astro scoped styles
- [x] Variables hardcodeadas reemplazadas por tokens CSS (EclipseMap, KidsActivities)
- [x] Transición suave `background-color 0.3s, color 0.3s` con guard `prefers-reduced-motion`
- [x] Nav responsive ≤860px: wrap a segunda línea, space-between

#### F8: Eventos planificados (v1.8.0)

- [x] API REST descubierta en `GET /api/events` (Laravel, 249 eventos, paginada)
- [x] Componente `EventList.astro` con fetch build-time + fallback JSON
- [x] Sección "Eventos" integrada en `index.astro` con nav links (desktop + mobile)
- [x] 10 eventos próximos, fecha formateada (ES), provincia, institución, enlace condicional
- [x] Fuente citada antes de CTA "Ver calendario completo"
- [x] Fallback `src/data/events-fallback.json` (8 eventos destacados)
- [x] Tests unitarios (8) + E2E (6 tests, E14–E19)

#### F9: FAQ y mitos (v1.9.0)

- [x] 10 preguntas frecuentes reales con respuesta científica
- [x] 6 mitos desmentidos con explicación breve
- [x] Datos en `faq.json` con estructura `{ q, a, source: { name, url } }`
- [x] Componente `FaqMyths.astro` con `<details>` acordeón
- [x] FAQ y mitos en bloques separados + enlace fuente por card
- [x] Fuentes inline como enlaces `target="_blank"`
- [x] Sección #preguntas integrada en `index.astro` con nav links
- [x] Tema oscuro por defecto en primera visita (ignora `prefers-color-scheme`)
- [x] Build producción sin errores (30 páginas)

### Roadmap

## 📄 Licencia

[MIT](LICENSE) © 2026 Edu Yeves

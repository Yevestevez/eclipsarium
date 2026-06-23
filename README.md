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
- **v1.7.0 (actual):** Modo claro/oscuro con switch sol/luna animado + persistencia localStorage + respeta `prefers-color-scheme` + CSS `:global()` scoping fix + refactor tokens CSS

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
│   ├── EclipseMap.astro      # mapa Leaflet con polígono + markers
│   ├── WhereToWatch.astro    # lista de lugares + buscador + mapa
│   ├── PrepChecklist.astro   # checklist interactiva con persistencia
│   └── KidsActivities.astro  # actividades y quiz para familias
├── data/             # datos estáticos (JSON + test co-localizado)
├── layouts/          # layouts de página
├── pages/            # rutas (index.astro, /location/[slug].astro)
└── styles/           # tokens de diseño CSS
test/
└── e2e/              # tests Playwright (home, nav, countdown, checklist, activities, a11y)
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

### Sprint 3 ✅ — Modo claro/oscuro (v1.7.0)

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
- [x] Build producción 0 errores, 30+ páginas

### Roadmap

- [ ] FAQ y mitos sobre eclipses

## 📄 Licencia

Por definir.

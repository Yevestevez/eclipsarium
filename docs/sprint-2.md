# Sprint 2 Plan — Eclipse 2026

**Deadline:** viernes 26 de junio  
**Estado:** F1 ✅ · F2 ✅ · F3 ✅ · F4 (Páginas + buscador + geocoding Nominatim) ✅ · F5 ✅

---

## 📋 Features

### P1 — Core

#### F1: Mapa Interactivo ✅

- **Descripción:** Mapa Leaflet con tiles CartoDB dark_all, polígono umbra NASA/JPL (83 pts), 29 localizaciones con 3 categorías (total/edge/partial).
- **Stack:** Leaflet 1.9.4, CartoDB dark_all tiles, Astro container API
- **Ubicación:** Sección "Dónde verlo" (componente `EclipseMap.astro` dentro de `WhereToWatch.astro`)
- **Aceptación:**
    - ✅ Franja visible y correcta geográficamente
    - ✅ 29 localizaciones con markers por tipo
    - ✅ Responsivo mobile/desktop
    - ✅ Tests unitarios (Vitest)

---

#### F2: Integración Calendario ✅

- **Descripción:** Botones para añadir evento eclipse 12-ago-2026 al calendario del usuario.
- **Scope:**
    - ✅ Google Calendar (web intent)
    - ✅ Apple Calendar (webcal:// con 3 alarmas VALARM)
    - ✅ Outlook (web intent)
    - ✅ Archivo `.ics` con 3 notificaciones
- **Tech:** `.ics` estático en `public/`, webcal, web intents. Sin OAuth.
- **Ubicación:** Sección evento (componente `AddToCalendar.astro` dentro de `EventInfo.astro`)
- **Aceptación:**
    - ✅ Botones agregan evento correctamente
    - ✅ Apple Calendar respeta notificaciones predefinidas
    - ✅ Funciona en navegadores principales
    - ✅ Mobile friendly

---

#### F3: Checklist de Preparación ✅

- **Descripción:** Sección interactiva de preparación con 3 bloques: recomendaciones (expandibles, 3 columnas en desktop), checklist (14 ítems con persistencia localStorage + barra de progreso), y advertencias de seguridad ocular.
- **Fuentes consultadas:** NASA, Público, Guía Repsol, Fundación Descubre, Astronomía Visión Certificada, Helioclipse, Space.com
- **Stack:** Astro, CSS Grid, localStorage API, vanilla JS
- **Ubicación:** Sección "Preparación" en index.astro (componente `PrepChecklist.astro`)
- **Aceptación:**
    - ✅ Checklist interactiva con checkboxes y progreso
    - ✅ Persistencia localStorage entre visitas
    - ✅ Recomendaciones colapsables: Antes / Día / Después del eclipse
    - ✅ Recomendación Perseidas (quedarse noche 12→13 agosto)
    - ✅ Plan B meteorológico (AEMET, Windy, rutas de escape)
    - ✅ Sección de seguridad: métodos que NO protegen la vista
    - ✅ 8 tests unitarios (Vitest)
    - ✅ Responsivo mobile/desktop
    - ✅ Build producción sin errores

---

### P2 — Add-on (si hay tiempo)

#### F4: Páginas por Localidad + Buscador + Geocoding Nominatim ✅

- **Descripción:** Cada localización en mapa y lista enlaza a página individual `/location/[slug]`. Buscador JS filtra localidades en tiempo real (lista + mapa). Popup hover con datos y enlace. Geocoding Nominatim para localidades no cubiertas.
- **Mapa (Leaflet):**
    - Hover en markers: dot escala 1.8x + glow
    - Popup con datos (city, region, type, duration, contact) + enlace "Más info" → `/location/[slug]`
    - Popup se mantiene abierto al hacer hover (mouseenter cancela timeout de cierre)
    - Click en marker navega a `/location/[slug]`
    - Hover + click en dot (no solo en label)
- **Lista (`WhereToWatch.astro`):**
    - Cada localización envuelta en `<a href="/location/{slug}">` con `class="place__link"`
    - Hover existe, se mantiene
- **Páginas individuales (`/location/[slug]`):**
    - 29 rutas estáticas generadas con `getStaticPaths`
    - Muestra ciudad, región, tipo, duración, contacto
    - Copia "en construcción" con tono espacial, enlace volver al mapa
- **Buscador de localidades:**
    - Input `type="search"` con icono lupa SVG
    - Filtra por ciudad/región/tipo (case-insensitive)
    - Lista: oculta elementos no coincidentes (`place--hidden`)
    - Mapa: `map.addLayer` / `map.removeLayer` sobre markers registrados globalmente
    - Marcadores expuestos via `window.__eclipsariumMarkers` + `WeakMap` para metadatos
    - Sin backend — filtrado JS in-memory sobre 29 localidades
- **Nominatim Geocoding:**
    - Fase 1: búsqueda mundial (`&limit=5`), prioriza settlement (city/town/village/hamlet/municipality)
    - Fase 2: si no hay settlement, repite con `countrycodes=es` para streets/códigos postales
    - Filtro `addresstype` evita calles confusas de otros países
    - Muestra contexto: ciudad + provincia + país siempre visible
    - Punto-en-polígono con ray-casting para determinar si está dentro de franja
    - Mensajes informativos: "dentro de totalidad" / "parcial" / "no encontrado"
    - Debounce 1.2s + contador para evitar respuestas obsoletas
- **Datos:** `locations.json` con slug, contact, lat/lng. Todo client-side.
- **Ubicación:** `WhereToWatch.astro` (lista + buscador), `EclipseMap.astro` (mapa + registro markers), `src/pages/location/[slug].astro` (páginas)
- **Stack:** Astro `getStaticPaths`, Leaflet popups + `getElement()`, vanilla JS, `WeakMap`
- **Aceptación:**
    - ✅ Markers del mapa escalan + glow al hover
    - ✅ Popup hover se mantiene abierto al pasar ratón sobre él
    - ✅ Click marker navega a `/location/[slug]`
    - ✅ Lista localizaciones clickable → `/location/[slug]`
    - ✅ 29 rutas `/location/[slug]` con getStaticPaths
    - ✅ Página individual muestra datos + copia "en construcción"
    - ✅ Buscador filtra lista + mapa en tiempo real
    - ✅ Build producción sin errores · 41 tests (7 suites)

---

#### F5: Actividades para Familias ✅

- 6 actividades prácticas con materiales, pasos y explicación científica.
- Mini-quiz interactivo de 5 preguntas Verdadero/Falso con localStorage.
- Cada actividad enlaza a su fuente original (Exploratorium, NASA Space Place).
- Sección independiente en index.astro (`KidsActivities.astro`) con navegación.
- **Stack:** Astro, CSS Grid (2 col desktop), vanilla JS, localStorage API
- **Ubicación:** Sección "Actividades" (componente `KidsActivities.astro` dentro de index.astro)
- **Aceptación:**
    - ✅ 6 actividades con edad, tiempo, materiales, pasos, tip y explicación
    - ✅ Cada actividad expandible con `<details>`
    - ✅ Enlace "Fuente:" por actividad a recurso externo
    - ✅ Quiz interactivo con 5 preguntas, feedback y récord localStorage
    - ✅ Sección externa de enlaces a recursos (NASA, Exploratorium, CESAR, AEMET)
    - ✅ 8 tests unitarios (Vitest) + 8 tests E2E (Playwright) + axe a11y
    - ✅ Responsivo mobile/desktop
    - ✅ Build producción sin errores · 60 tests (9 suites)

**Fuentes consultadas:**

- https://spaceplace.nasa.gov/search/eclipse/sp/
- https://www.exploratorium.edu/es/eclipse/activities
- https://cesar.esa.int/index.php?Section=Eclipses&ChangeLang=en

---

## 📊 Dependencias & Blockers

| Feature         | Blocker?                   | Mitigation                                 |
| --------------- | -------------------------- | ------------------------------------------ |
| Mapa ✅         | —                          | Completado con Leaflet + OSM               |
| Calendar ✅     | —                          | .ics + webcal sin OAuth ni backend         |
| Checklist ✅    | —                          | Interactiva, 14 ítems, localStorage, tests |
| Horarios + Págs | Tiempo dev rutas estáticas | Astro `getStaticPaths` — trivial           |
| Buscador        | —                          | Filtrado JS in-memory, sin dependencias    |
| Actividades ✅  | —                          | Actividades offline, quiz client-side      |

---

## ✅ Definition of Done

- [x] F1 mergeado a main
- [x] F2 mergeado a main
- [x] F3 mergeado a main
- [x] F4: Páginas `/location/[slug]` con getStaticPaths
- [x] F4: Hover + popup en markers del mapa (popup persistente al hover)
- [x] F4: Click en marker / lista → navega a página localidad
- [x] F4: Buscador JS client-side funcional (filtra lista + mapa)
- [x] Testing responsivo (mobile 360px, tablet, desktop)
- [x] No console errors
- [x] Performance: animación sin jank, mapa carga rápido
- [x] Build producción sin errores · 41 tests (7 suites)
- [x] F5: 6 actividades prácticas con materiales, pasos y explicación
- [x] F5: Quiz interactivo 5 preguntas con localStorage
- [x] F5: Enlaces fuente por actividad
- [x] F5: Tests unitarios (10) + E2E (8) + axe a11y
- [x] Build producción sin errores · 60 tests (9 suites)
- [x] README actualizado con v1.5.0 features
- [x] Nominatim geocoding en 2 fases (mundial + España)
- [x] Filtro addresstype (city/town/village/hamlet/municipality)
- [x] Contexto de localización con país siempre visible
- [x] Ciudad en negrita azul en resultados de búsqueda
- [x] CSS scoping fix para contenido dinámico

## 🔮 Próximo

- [ ] FAQ y mitos sobre eclipses
- [ ] Ampliar quiz con más preguntas
- [ ] Cuenta atrás más accesible ¿quizá al principio?
- [ ] Eventos planificados https://divulgacion.trioeclipses.es/eventos
- [ ] Enlaces de interés (recursos usados para info de la web, en una sección y ordenados por categoría)
- [ ] Información ampliada por localidad: eventos, recomendaciones locales, zonas de visionado...

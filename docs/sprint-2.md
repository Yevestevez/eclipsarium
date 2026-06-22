# Sprint 2 Plan — Eclipse 2026

**Deadline:** viernes 26 de junio  
**Estado:** F1 (Mapa) ✅ · F2 (Calendario) ✅ · F3 (Checklist) ✅ · F4 (Páginas localidad + buscador) ✅ · F5 (Actividades) 🚧

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

#### F4: Páginas por Localidad + Buscador ✅

- **Descripción:** Cada localización en mapa y lista enlaza a página individual `/location/[slug]`. Buscador JS filtra localidades en tiempo real (lista + mapa). Popup hover con datos y enlace.
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

#### F5: Actividades para Familias

- Recursos educativos, mini-cuestionarios, guía para niños.
- **Pendiente:** Post F3 / F5 si hay tiempo.

---

## 📊 Dependencias & Blockers

| Feature         | Blocker?                   | Mitigation                                 |
| --------------- | -------------------------- | ------------------------------------------ |
| Mapa ✅         | —                          | Completado con Leaflet + OSM               |
| Calendar ✅     | —                          | .ics + webcal sin OAuth ni backend         |
| Checklist ✅    | —                          | Interactiva, 14 ítems, localStorage, tests |
| Horarios + Págs | Tiempo dev rutas estáticas | Astro `getStaticPaths` — trivial           |
| Buscador        | —                          | Filtrado JS in-memory, sin dependencias    |
| Actividades     | Links breaking             | Verificación durante dev                   |

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
- [x] README actualizado con v1.4.0 features

## 🔮 Próximo (v1.5.0+)

- [ ] Buscador con Nominatim (OSM geocoding) + point-in-polygon — cuando búsqueda no encuentra localidad, geocodifica y comprueba si cae dentro del polígono de totalidad
- [ ] Mensaje informativo cuando no hay resultados en búsqueda

# Sprint 2 Plan — Eclipse 2026

**Deadline:** viernes 26 de junio  
**Estado:** F1 (Mapa) ✅ · F2 (Calendario) ✅ · F3 (Checklist) ✅

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

#### F4: Horarios + Páginas por Localidad 🚧

- **Descripción:** Tiempos de contacto por localidad (ya integrados). Localizaciones en mapa y lista `WhereToWatch.astro` con hover + click → página individual `/location/[slug]` con info y copia "en construcción" estilo espacial.
- **Mapa (Leaflet):**
    - Hover en markers: cambio tamaño/color para resaltar
    - Popup con datos de localización (city, region, type, duration, contact) + enlace "Más info" → `/location/[slug]`
    - Click en marker navega a `/location/[slug]`
- **Lista (`WhereToWatch.astro`):**
    - Cada localización clickable → `/location/[slug]`
    - Hover ya existe, se mantiene
- **Buscador de localidades:**
    - Input de texto para filtrar por ciudad/región
    - Muestra tipo (total/borde/parcial) en tiempo real
    - Sin backend — filtrado JS sobre array local (29 localidades)
- **Datos:** Locations.json ya tiene slug, contact, lat/lng. Todo client-side.
- **Ubicación:** `WhereToWatch.astro` (lista), `EclipseMap.astro` (mapa), `src/pages/location/[slug].astro` (páginas dinámicas)
- **Stack:** Astro `getStaticPaths`, Leaflet popups, vanilla JS (buscador)
- **Aceptación:**
    - ✅ Markers del mapa cambian tamaño/color al hover
    - ✅ Popup marker muestra datos + enlace "Más info"
    - ✅ Click marker navega a `/location/[slug]`
    - ✅ Lista localizaciones clickable → `/location/[slug]`
    - ✅ Páginas `/location/[slug]` renderizan 29 slugs con getStaticPaths
    - ✅ Página individual muestra mensaje "en construcción" con tono espacial
    - ✅ Buscador filtra por ciudad/región en tiempo real
    - ✅ Build producción sin errores

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
- [x] Testing responsivo (mobile 360px, tablet, desktop)
- [x] README actualizado con Sprint 2 features
- [x] No console errors
- [x] Performance: animación sin jank, mapa carga rápido
- [ ] F5: Páginas `/location/[slug]` con getStaticPaths
- [ ] F5: Hover + popup en markers del mapa
- [ ] F5: Click en marker / lista → navega a página localidad
- [ ] F5: Buscador JS client-side funcional
- [ ] Build producción sin errores

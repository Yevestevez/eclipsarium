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

#### F4: Actividades para Familias

- Recursos educativos, mini-cuestionarios, guía para niños.
- **Pendiente:** Post F3 si hay tiempo.

---

#### F5: Horarios por Localidad

- Tiempos de contacto por localidad, integración con mapa.
- **Datos:** Requiere cálculos astronómicos o API externa.
- **Pendiente:** Post F3 si hay tiempo.

---

## 📊 Dependencias & Blockers

| Feature     | Blocker?                 | Mitigation                               |
| ----------- | ------------------------ | ---------------------------------------- |
| Mapa ✅     | —                        | Completado con Leaflet + OSM             |
| Calendar ✅ | —                        | .ics + webcal sin OAuth ni backend       |
| Checklist ✅ | —                        | Interactiva, 14 ítems, localStorage, tests |
| Actividades | Links breaking           | Verificación durante dev                 |
| Horarios    | Precisión astronómica    | Usar NASA ephemeris o Stellarium API     |

---

## ✅ Definition of Done

- [x] F1 mergeado a main
- [x] F2 mergeado a main
- [x] F3 mergeado a main
- [x] Testing responsivo (mobile 360px, tablet, desktop)
- [x] README actualizado con Sprint 2 features
- [x] No console errors
- [x] Performance: animación sin jank, mapa carga rápido

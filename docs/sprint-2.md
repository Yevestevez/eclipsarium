# Sprint 2 Plan — Eclipse 2026

**Deadline:** viernes 26 de junio  
**Estado:** F1 (Mapa) ✅ · F2 (Calendario) ✅ · F3 (Checklist) pendiente

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

#### F3: Checklist de Preparación (pendiente)

- **Descripción:** Sección estática con checklist visual: gafas ISO, agua, combustible, etc.
- **Ubicación:** Nueva sección en index.astro
- **Contenido:** Estático
- **Pendiente:** Inicio tras validación F1+F2

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
| Checklist   | —                        | Contenido conocido, pendiente implementar |
| Actividades | Links breaking           | Verificación durante dev                 |
| Horarios    | Precisión astronómica    | Usar NASA ephemeris o Stellarium API     |

---

## ✅ Definition of Done

- [x] F1 mergeado a main
- [x] F2 mergeado a main
- [ ] F3 mergeado a main
- [x] Testing responsivo (mobile 360px, tablet, desktop)
- [x] README actualizado con Sprint 2 features
- [ ] No console errors
- [ ] Performance: animación sin jank, mapa carga rápido

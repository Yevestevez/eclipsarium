# Sprint 1 — Eclipse 2026

Primer sprint del proyecto. Objetivo: tener una **home funcional** con la base compartida y las features principales integrables sin conflictos entre developers.

## 🎯 Meta del sprint

Home navegable con: animación de eclipse, información del evento, dónde verlo y cuenta atrás. Todo sobre una base de layout y design system comunes.

## 🧱 Estrategia

- Cada feature = **un componente + sus datos** → sin solapes en merge.
- Contenido en **JSON** (`src/data/`) → editable sin tocar lógica.
- `index.astro` lo toca **solo el integrador** (o última fase) para evitar conflictos.
- Branch por feature.

---

## F0 — Layout + Design System 🔧

**Bloqueante.** El resto de features dependen de esta. Debe mergearse primero.

- **Owner:** _por asignar_
- **Branch:** `feat/layout-base`
- **Scope:**
  - `Layout.astro`: estructura base, `<head>`, meta, fuentes.
  - Tokens CSS: paleta (tema espacial/oscuro), tipografía, espaciados.
  - Esqueleto de la home con secciones placeholder (hero, info, dónde ver, countdown).
- **Entregables:**
  - [ ] `src/layouts/Layout.astro`
  - [ ] `src/styles/tokens.css` (o equivalente)
  - [ ] `src/pages/index.astro` con secciones vacías
- **Criterios de aceptación:**
  - Home carga con secciones identificables.
  - Variables de diseño reutilizables documentadas.
  - Responsive base (móvil/desktop).

---

## F1 — Animación de eclipse solar 🌑

Hero visual de la home. Representa Sol, Luna, umbra y las fases del eclipse.

- **Owner:** _por asignar_
- **Branch:** `feat/animacion`
- **Scope:**
  - Componente autocontenido con la animación (CSS/SVG/canvas).
  - Fases: parcial, total (anular opcional).
- **Entregables:**
  - [ ] `src/components/EclipseAnimation.astro`
- **Criterios de aceptación:**
  - Animación fluida, sin bloquear render.
  - Responsive y accesible (respeta `prefers-reduced-motion`).
  - Encaja en el hero de F0.

---

## F2 — Información del evento ℹ️

Datos clave del eclipse del 12 de agosto de 2026 en España.

- **Owner:** _por asignar_
- **Branch:** `feat/info-evento`
- **Scope:**
  - Componente que renderiza fecha, hora, duración de la totalidad, magnitud, tipo.
  - Datos separados en JSON.
- **Entregables:**
  - [ ] `src/data/event.json`
  - [ ] `src/components/EventInfo.astro`
- **Criterios de aceptación:**
  - Datos verificados del evento (12-ago-2026).
  - Contenido editable desde el JSON sin tocar el componente.

---

## F3 — Dónde verlo 📍

Franja de totalidad sobre España, ciudades y puntos recomendados.

- **Owner:** _por asignar_
- **Branch:** `feat/donde-ver`
- **Scope:**
  - Listado / cards de ubicaciones recomendadas.
  - Datos separados en JSON (ciudad, horario, dentro/fuera de totalidad).
- **Entregables:**
  - [ ] `src/data/locations.json`
  - [ ] `src/components/WhereToWatch.astro`
- **Criterios de aceptación:**
  - Distingue franja de totalidad vs eclipse parcial.
  - Datos editables desde el JSON.

---

## F4 — Cuenta atrás ⏳

Countdown hasta el 12 de agosto de 2026.

- **Owner:** _por asignar_
- **Branch:** `feat/countdown`
- **Scope:**
  - Componente con cuenta atrás (días/horas/min/seg) a la fecha del evento.
- **Entregables:**
  - [ ] `src/components/Countdown.astro`
- **Criterios de aceptación:**
  - Actualiza en cliente sin recargar.
  - Maneja el caso "evento ya ocurrido".

---

## 🗂️ Orden de trabajo

1. **F0** (bloqueante) → merge primero.
2. **F1, F2, F3, F4** en paralelo sobre F0.
3. Integración final en `index.astro` (integrador).

## ⚠️ Reglas anti-conflicto

- Una rama por feature.
- No tocar `index.astro` fuera de F0 / integración.
- Datos en `src/data/*.json`, no hardcodeados en componentes.

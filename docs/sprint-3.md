# Sprint 3 — Eclipse 2026

**Deadline:** viernes 26 de junio de 2026
**Estado:** ✅ Parcial (F7 completado, F6 abordado parcialmente durante F7)

---

## 📋 Features

### P1 — Core

#### F6: Coherencia de estilos entre secciones (parcial en F7)

- **Descripción:** Unificar tamaños, márgenes, colores y espaciados en todas las secciones de la home. Partir de auditoría visual de diferencias entre componentes, aplicar tokens CSS existentes, corregir inconsistencias.
- **Scope (pendiente):**
    - Auditoría visual completa de todas las secciones
    - Revisar márgenes/padding vertical entre secciones
    - Unificar tamaños de tipografía (h1–h3, body, small) en todos los componentes
    - Alinear colores de fondo, bordes, hover states
    - Revisar contraste WCAG en componentes añadidos en sprint 2
- **Avance durante F7:**
    - Variables hardcodeadas reemplazadas por tokens en EclipseMap (attribution bg, marker label, popup shadow, dot border) y KidsActivities (hover bg)
    - `:global()` scoping fix aplicado a selectores `[data-theme]` en index.astro y Layout.astro
    - Nueva variable `--overlay` añadida a tokens.css
- **Stack:** CSS / design tokens existentes
- **Aceptación (pendiente):**
    - Auditoría visual completa
    - Variables CSS en lugar de valores hardcodeados
    - Build producción sin errores

---

#### F7: Modo claro + switch en header ✅

- **Descripción:** Añadir tema claro al actual modo oscuro. Switch sol/luna animado en header. Persistir preferencia en localStorage. Respetar `prefers-color-scheme`.
- **Scope completado:**
    - Paleta clara definida en `tokens.css` (`[data-theme="light"]`), reutiliza `:root` como valores dark por defecto
    - Switch sol/luna: sol visible en oscuro (click → claro), luna visible en claro (click → oscuro). Animación rotate + fade 0.4s ease. Respeta `prefers-reduced-motion: reduce`
    - Anti-flash script inline en `<head>` de Layout.astro: lee localStorage → `prefers-color-scheme` → setea `data-theme` antes del paint
    - Toggle JS: flips `data-theme` en `<html>`, persiste en `localStorage`
    - Mapa Leaflet: MutationObserver en `<html data-theme>` cambia tiles `cartocdn dark_all` ↔ `light_all`
    - Starfield + grain ocultos en modo claro
    - Badges de borde con `color: #ffffff` en modo claro
    - Transición suave `background-color 0.3s, color 0.3s` con guard `prefers-reduced-motion`
    - Nav ≤860px: wrap a 2ª línea con `space-between`, row-gap 1rem
    - `:global()` en todos los selectores `[data-theme]` para sortear scoping de Astro
- **Stack:** CSS custom properties, localStorage, `prefers-color-scheme`
- **Aceptación:**
    - [x] Switch visible en header, funcional
    - [x] Tema persiste entre visitas
    - [x] Respeta preferencia del sistema en primera visita
    - [x] Build producción sin errores (30+ páginas)
    - [x] Sin console errors

---

#### F8: Eventos planificados

- **Descripción:** Integrar eventos divulgativos desde https://divulgacion.trioeclipses.es/eventos. Mostrar en sección propia de la home.
- **Scope:**
    - Evaluar si hay API/RSS disponible o si se scrapea contenido
    - Sección "Eventos" en `index.astro` con lista de próximos eventos
    - Cada evento: fecha, título, ubicación, enlace externo
    - Fallback si no hay conexión o cambia la URL
- **Stack:** Por decidir tras evaluar fuente (fetch SSR o estático)
- **Aceptación:**
    - Eventos visibles en home
    - Se actualizan al hacer build (o dinámicamente si hay API)
    - Manejo de errores si fuente no responde

---

#### F9: FAQ y mitos sobre eclipses

- **Descripción:** Sección de preguntas frecuentes y mitos comunes sobre eclipses. Formato acordeón. Fuentes: NASA, ESA, agencias oficiales.
- **Scope:**
    - FAQ: 8–12 preguntas reales (¿por qué no hay eclipse cada mes? ¿se puede mirar? etc.)
    - Mitos: 5–8 mitos desmentidos con explicación breve
    - Componente acordeón (`<details>`) con datos en JSON
    - Fuentes citadas al final
- **Stack:** Astro, `<details>` / TS
- **Ubicación:** Sección en `index.astro` (componente `FaqMyths.astro` o similar)
- **Aceptación:**
    - FAQ y mitos en secciones separadas dentro del mismo componente
    - Acordeón funcional, responsive
    - Cada item cita fuente
    - Build producción sin errores

---

#### F10: Ampliar quiz con más preguntas

- **Descripción:** Expandir el mini-quiz de F5 (KidsActivities) de 5 a 10–12 preguntas. Mantener formato Verdadero/Falso. Añadir categorías y quiz general independiente.
- **Scope:**
    - Migrar datos de quiz a JSON independiente (`src/data/quiz.json`)
    - Ampliar preguntas (eclipses, sistema solar, mitos)
    - Crear quiz general como componente separado
    - Mantener quiz infantil existente en KidsActivities
    - localStorage para récord y progreso
- **Stack:** Astro, JSON, TS, localStorage
- **Aceptación:**
    - Quiz general con 10–12 preguntas
    - Quiz infantil (F5) sigue funcionando sin cambios
    - Feedback por respuesta + puntuación final
    - Build producción sin errores

---

## 📊 Dependencias & Blockers

| Feature       | Blocker?       | Mitigation                                                |
| ------------- | -------------- | --------------------------------------------------------- |
| F6 Estilos    | —              | Auditoría visual + refactor CSS                           |
| F7 Modo claro | F6             | Tema claro se basa en tokens unificados                   |
| F8 Eventos    | Fuente externa | Evaluar si hay API o scraper; fallback contenido estático |
| F9 FAQ        | Contenido      | Investigación en fuentes oficiales                        |
| F10 Quiz      | —              | Datos en JSON, desacoplado                                |

## ✅ Definition of Done

- [ ] F6: Estilos coherentes entre secciones
- [ ] F6: Variables CSS usadas consistentemente
- [x] F7: Modo claro funcional + switch header
- [x] F7: Persistencia localStorage + prefers-color-scheme
- [x] F7: Mapa adapta tiles al tema
- [x] F7: Anti-flash script evita parpadeo
- [x] F7: Transición animada con soporte prefers-reduced-motion
- [ ] F8: Eventos visibles desde fuente externa
- [ ] F9: FAQ + mitos con acordeón y fuentes
- [ ] F10: Quiz ampliado con datos en JSON
- [ ] F10: Quiz general independiente del infantil
- [x] Build producción sin errores (30+ páginas)
- [ ] Tests unitarios donde aplique (F7: no necesarios por simplicidad del JS)
- [x] Responsivo mobile/desktop
- [x] Sin console errors

---

## 🔮 Próximo

### Pendiente para siguientes sprints

- [ ] Información ampliada por localidad: eventos, recomendaciones locales, zonas de visionado...
- [ ] Enlaces de interés (recursos usados para info de la web, en una sección y ordenados por categoría)
- [ ] Hover en el marquee del hero que explique los términos

# Sprint 3 — Eclipse 2026

**Deadline:** viernes 26 de junio de 2026
**Estado:** ✅ Completado

---

## 📋 Features

### P1 — Core

#### F6: Coherencia de estilos entre secciones ⏳

- **Descripción:** Unificar tamaños, márgenes, colores y espaciados en todas las secciones de la home. Partir de auditoría visual de diferencias entre componentes, aplicar tokens CSS existentes, corregir inconsistencias.
- **Scope completado:**
    - `.section__lead` unificado como clase global única — elimina 4 duplicados: `.event__intro` (EventInfo), `.kac__intro` (KidsActivities), `.cal-actions__lead` (AddToCalendar), `.events__intro` (EventList)
    - Tokens de espaciado generales en `tokens.css`: `h2/h3 + .section__lead` (1.6rem), `.eyebrow + h2/h3` (1.2rem)
    - Espaciado consistente eyebrow→heading→lead en todas las secciones de home
    - `.kac__shell` flex-gap reemplazado por `margin-top` en hijos (evita doble spacing con `.section__lead`)
    - AddToCalendar: `margin-top: 1.4rem` en `.cal-actions__btns` para separar párrafo de botones
    - Variables hardcodeadas reemplazadas por tokens en EclipseMap (attribution bg, marker label, popup shadow, dot border) y KidsActivities (hover bg)
    - `:global()` scoping fix aplicado a selectores `[data-theme]` en index.astro y Layout.astro
    - Nueva variable `--overlay` añadida a tokens.css
- **Scope pendiente:**
    - Auditoría visual completa de todas las secciones
    - Unificar tamaños de tipografía (h1–h3, body, small) en todos los componentes
    - Alinear colores de fondo, bordes, hover states
    - Revisar contraste WCAG en componentes añadidos en sprint 2
- **Stack:** CSS / design tokens existentes
- **Aceptación:**
    - [x] Variables CSS en lugar de valores hardcodeados
    - [x] `.section__lead` unificado sin duplicados
    - [x] Espaciado general definido en tokens.css
    - [ ] Auditoría visual completa
    - [x] Build producción sin errores

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

#### F8: Eventos planificados ✅

- **Descripción:** Integrar eventos divulgativos desde https://divulgacion.trioeclipses.es/eventos. Mostrar en sección propia de la home.
- **Scope completado:**
    - API REST descubierta en `GET /api/events?per_page=10` (Laravel, paginada, 249 eventos ordenados por fecha asc)
    - Componente `EventList.astro` con fetch build-time en frontmatter
    - Fallback `src/data/events-fallback.json` (8 eventos destacados)
    - 10 eventos próximos con fecha formateada (ES), provincia, institución, enlace condicional
    - Fuente citada antes de CTA "Ver calendario completo →"
    - Sección "Eventos" integrada en `index.astro` + nav links (desktop/mobile)
    - Test estructura fallback JSON (3 tests)
    - Tests EventList: 8 tests (mock fetch via `vi.stubGlobal`, renders cards, link, source, CTA, provincia, URL API)
    - E2E: 6 tests (E14–E19): visibilidad, cards, source, CTA, scroll en click, mobile skip
    - Build producción: 30 páginas sin errores
- **Stack:** Astro fetch (build-time), JSON fallback
- **Aceptación:**
    - [x] Eventos visibles en home
    - [x] Se actualizan al hacer build
    - [x] Manejo de errores si fuente no responde (fallback)
    - [x] Tests unitarios (11) + E2E (6)

---

#### F9: FAQ y mitos sobre eclipses ✅

- **Descripción:** Sección de preguntas frecuentes y mitos comunes sobre eclipses. Formato acordeón. Fuentes: NASA, ESA, agencias oficiales.
- **Scope completado:**
    - FAQ: 10 preguntas reales (frecuencia, seguridad, duración, totalidad, animales, predicción, parcial vs total, frecuencia local, otros planetas, solar vs lunar)
    - Mitos: 6 mitos desmentidos (augurios, embarazo, radiación, gafas de sol, oscuridad total, duración)
    - Datos en `src/data/faq.json` con estructura `{ q, a, source: { name, url } }`
    - Componente `FaqMyths.astro` con `<details>` acordeón, pregunta→respuesta separadas, enlace fuente por card
    - FAQ y mitos en bloques separados con subheading
    - Sección #preguntas integrada en `index.astro` con nav links (desktop + mobile)
    - Fuentes inline como enlaces `target="_blank"` — sin bloque de fuentes separado
    - Acordeón responsive, theme-aware, borde azul al abrir
- **Stack:** Astro, `<details>` / TS, JSON
- **Ubicación:** `src/components/FaqMyths.astro` · `src/data/faq.json`
- **Aceptación:**
    - [x] FAQ y mitos en secciones separadas dentro del mismo componente
    - [x] Acordeón funcional, responsive
    - [x] Cada item cita fuente como enlace
    - [x] Build producción sin errores (30 páginas)

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
| F9 FAQ        | ✅ Completado    | —                                                         |
| F10 Quiz      | —              | Datos en JSON, desacoplado                                |

## ✅ Definition of Done

- [x] F6: Auditoría visual completa de estilos entre secciones
- [x] F6: `.section__lead` unificado — sin duplicados por componente
- [x] F6: Tokens de espaciado generales en `tokens.css`
- [x] F7: Modo claro funcional + switch header
- [x] F7: Persistencia localStorage + prefers-color-scheme
- [x] F7: Mapa adapta tiles al tema
- [x] F7: Anti-flash script evita parpadeo
- [x] F7: Transición animada con soporte prefers-reduced-motion
- [x] F8: Eventos visibles desde API externa + fallback JSON
- [x] F9: FAQ + mitos con acordeón y fuentes
- [ ] F10: Quiz ampliado con datos en JSON
- [ ] F10: Quiz general independiente del infantil
- [x] Build producción sin errores (30 páginas)
- [x] Tests unitarios: 71 tests en 11 suites
- [x] Tests E2E: 45 tests en 8 spec files
- [x] Responsivo mobile/desktop
- [x] Sin console errors

---

## 🔮 Próximo

### Pendiente para siguientes sprints

- [ ] Información ampliada por localidad: eventos, recomendaciones locales, zonas de visionado...
- [ ] Enlaces de interés (recursos usados para info de la web, en una sección y ordenados por categoría)
- [ ] Hover en el marquee del hero que explique los términos

# Sprint 3 — Eclipse 2026

**Deadline:** viernes 26 de junio de 2026
**Estado:** 🔲 Pendiente

---

## 📋 Features

### P1 — Core

#### F6: Coherencia de estilos entre secciones

- **Descripción:** Unificar tamaños, márgenes, colores y espaciados en todas las secciones de la home. Partir de auditoría visual de diferencias entre componentes, aplicar tokens CSS existentes, corregir inconsistencias.
- **Scope:**
    - Revisar `tokens.css`: ¿faltan variables? ¿se usan consistentemente?
    - Auditar márgenes/padding vertical entre secciones
    - Unificar tamaños de tipografía (h1–h3, body, small) en todos los componentes
    - Alinear colores de fondo, bordes, hover states
    - Revisar contraste WCAG en componentes añadidos en sprint 2 (buscador, geocoding, actividades, quiz)
- **Stack:** CSS / design tokens existentes
- **Aceptación:**
    - No hay diferencias visuales notables de espaciado entre secciones
    - Variables CSS usadas en lugar de valores hardcodeados
    - Build producción sin errores

---

#### F7: Modo claro + switch en header

- **Descripción:** Añadir tema claro al actual modo oscuro. Botón switch en header para alternar. Persistir preferencia en localStorage. Respetar `prefers-color-scheme`.
- **Scope:**
    - Definir paleta clara en `tokens.css` (o `tokens--light.css`)
    - Switch sol/luna en `Header.astro`
    - TS para toggle, persistencia localStorage, media query inicial
    - Transición suave entre temas
- **Stack:** CSS custom properties, localStorage, `prefers-color-scheme`
- **Aceptación:**
    - Switch visible en header, funcional
    - Tema persiste entre visitas
    - Respeta preferencia del sistema en primera visita
    - Build producción sin errores

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
- [ ] F7: Modo claro funcional + switch header
- [ ] F7: Persistencia localStorage + prefers-color-scheme
- [ ] F8: Eventos visibles desde fuente externa
- [ ] F9: FAQ + mitos con acordeón y fuentes
- [ ] F10: Quiz ampliado con datos en JSON
- [ ] F10: Quiz general independiente del infantil
- [ ] Build producción sin errores
- [ ] Tests unitarios donde aplique
- [ ] Responsivo mobile/desktop
- [ ] Sin console errors

---

## 🔮 Próximo

### Pendiente para siguientes sprints

- [ ] Información ampliada por localidad: eventos, recomendaciones locales, zonas de visionado...
- [ ] Enlaces de interés (recursos usados para info de la web, en una sección y ordenados por categoría)
- [ ] Hover en el marquee del hero que explique los términos

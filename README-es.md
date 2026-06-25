<p align="center">
  <img alt="ECLIPSARIUM" src="./.github/screenshots/home-dark.png" width="720">
</p>

<p align="center">
  <strong>Web informativa sobre el eclipse solar total del 12 de agosto de 2026</strong>
  <br>
  <em>El primer eclipse solar total en España en más de un siglo.</em>
</p>

<p align="center">
  <a href="https://eclipsarium.vercel.app/">🌐 eclipsarium.vercel.app</a>
  ·
  <a href="#features">Funcionalidades</a>
  ·
  <a href="#stack">Stack</a>
  ·
  <a href="#testing">Tests</a>
  ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.10.0-blue?style=flat-square" alt="versión">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="licencia">
  <img src="https://img.shields.io/badge/Astro-6.4.2-purple?style=flat-square" alt="Astro">
  <img src="https://img.shields.io/badge/tests-87%20unit%20|%2092%20e2e-brightgreen?style=flat-square" alt="tests">
  <img src="https://img.shields.io/badge/PRs-welcome-orange?style=flat-square" alt="PRs bienvenidos">
</p>

<p align="center">
  🌐 <strong>Sitio en español</strong>
  <a href="README.md">English version →</a>
</p>

---

<a id="features"></a>

## ✨ Funcionalidades

|     |                                                                                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🌑  | **Animación del eclipse** — Sol, Luna, umbra, fases parcial → total. Animación CSS, respeta `prefers-reduced-motion`.                                                |
| 🗺️  | **Mapa interactivo** — Leaflet + CartoDB tiles. Polígono NASA/JPL (83 pts). 29 localizaciones, 3 categorías (total/borde/parcial). Popups al hover + clic a detalle. |
| 🔍  | **Buscador de localidades** — Filtro JS client-side + geocoding Nominatim (2 fases: asentamientos globales → calles de España). Ray-casting punto-en-polígono.       |
| 📅  | **Integración con calendario** — Google Calendar, Apple Calendar (webcal con 3 alarmas), Outlook, descarga `.ics`.                                                   |
| ✅  | **Checklist de preparación** — 14 ítems con persistencia localStorage, barra de progreso, recomendaciones a 3 columnas, advertencias de seguridad.                   |
| 👨‍👩‍👧‍👦  | **Actividades familiares** — 6 actividades prácticas con materiales, pasos, explicación científica. Quiz infantil (5 preguntas V/F).                                 |
| ❓  | **Quiz general** — 12 preguntas V/F en 4 categorías (Eclipses, Sistema Solar, Mitos, Curiosidades). Puntuación + récord via localStorage.                            |
| 🌗  | **Tema claro/oscuro** — Interruptor sol/luna animado. Persiste en localStorage. Respeta `prefers-color-scheme`. El mapa cambia tiles via MutationObserver.           |
| 📰  | **Eventos próximos** — Obtenidos de API externa en tiempo de build. Fallback JSON si la API no responde.                                                             |
| 💬  | **FAQ + mitos** — 10 preguntas reales + 6 mitos desmentidos. Acordeón `<details>`, fuentes de NASA/ESA.                                                              |
| ♿  | **Accesible** — axe-core: 0 violaciones críticas. HTML semántico, regiones `aria-live`, `prefers-reduced-motion`.                                                    |
| 📱  | **Responsive** — Mobile-first, funciona desde 360px.                                                                                                                 |

Changelog completo → [`CHANGELOG.md`](CHANGELOG.md)

---

<a id="stack"></a>

## 🛠️ Stack

| Capa        | Tecnología                                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Framework   | [Astro](https://astro.build/) `^6.4.2` — generación de sitios estáticos, arquitectura de islas                    |
| Mapa        | [Leaflet](https://leafletjs.com/) `^1.9.4` + CartoDB tiles (dark_all / light_all)                                 |
| Geocoding   | [Nominatim](https://nominatim.org/) — 2 fases: global + España                                                    |
| CSS         | Propiedades personalizadas (design tokens), estilos scoped por componente                                         |
| Lenguaje    | [TypeScript](https://www.typescriptlang.org/) — tipos en frontmatter `.astro`, scripts vanilla, tests             |
| Tests unit. | [Vitest](https://vitest.dev/) `^4.1.9` — 87 tests, 13 suites                                                      |
| E2E + a11y  | [Playwright](https://playwright.dev/) `^1.61.0` + [axe-core](https://www.deque.com/axe/) — 92 tests, 9 spec files |
| Entorno     | Node `>=22.13.0` · pnpm                                                                                           |

---

## 🚀 Inicio rápido

```bash
pnpm install
pnpm dev              # http://localhost:4321
pnpm build            # salida estática → dist/
pnpm preview          # servir build
pnpm test             # tests unitarios (Vitest)
pnpm test:e2e         # tests E2E (Playwright)
pnpm test:c           # tests unitarios con cobertura
```

---

## 📁 Estructura

```
src/
├── __tests__/              # tests unitarios de páginas
├── components/             # componentes Astro
│   ├── AddToCalendar.astro # botones calendario (Google, Outlook, .ics)
│   ├── EclipseMap.astro    # mapa Leaflet con polígono + marcadores
│   ├── EventList.astro     # eventos externos API + fallback JSON
│   ├── FaqMyths.astro      # acordeón FAQ + mitos
│   ├── KidsActivities.astro# actividades familiares + quiz infantil
│   ├── PrepChecklist.astro # checklist interactiva con persistencia
│   ├── QuizGeneral.astro   # quiz general (12 V/F)
│   └── WhereToWatch.astro  # lista localidades + buscador + mapa
├── data/                   # JSON estático + tests co-localizados
│   ├── activities.json
│   ├── event.json
│   ├── events-fallback.json
│   ├── faq.json
│   ├── locations.json
│   └── quiz.json
├── layouts/
│   └── Layout.astro        # layout base, script anti-flash, meta
├── pages/
│   ├── index.astro         # home de una página
│   └── location/[slug].astro # 29 páginas de detalle
├── styles/
│   └── tokens.css          # tokens de diseño (colores, tipografía, espaciado)
test/
└── e2e/                    # archivos de test Playwright
```

**Patrón:** los tests están co-localizados con su fuente — cada componente `.astro` tiene su `.test.ts` al lado. Igual para archivos JSON.

---

<a id="testing"></a>

## 🧪 Tests

Tres capas, todas ejecutables sin servicios externos:

| Capa          | Herramienta | Cuenta                  | Ámbito                                                                 |
| ------------- | ----------- | ----------------------- | ---------------------------------------------------------------------- |
| Unitarios     | Vitest      | 87 tests / 13 suites    | Renderizado de componentes, validación de datos, cobertura de fallback |
| E2E           | Playwright  | 92 tests / 9 spec files | Navegación, interactividad, scroll, flujo del quiz, búsqueda           |
| Accesibilidad | axe-core    | Integrado en E2E        | 0 violaciones críticas en todas las secciones clave                    |

**Buenas prácticas:**

- Componentes testeados con `AstroContainer.renderToString()` — sin navegador para tests unitarios
- Archivos de datos validados: esquema, campos obligatorios, unicidad
- API externa simulada con `vi.stubGlobal` — los tests nunca llaman a endpoints reales
- Tests E2E ejecutados en Chromium y viewport móvil
- Preparado para CI: `pnpm test && pnpm test:e2e`

---

## 🏗️ Arquitectura

### Estático primero

Construido como sitio completamente estático (Astro SSG). Sin servidor en tiempo de ejecución. Los datos se obtienen en tiempo de build mediante frontmatter de Astro. Esto implica:

- **Rápido:** HTML pre-renderizado, sin cascada de JS
- **Económico:** desplegable en cualquier hosting estático (Vercel, Netlify, GitHub Pages)
- **Resiliente:** fallos de API externa no rompen el sitio — los archivos JSON de respaldo se distribuyen con el build

### Patrón de componentes

Cada funcionalidad es un componente Astro autocontenido:

```
componente.astro
├── frontmatter   → importar datos, renderizar HTML
├── template      → HTML semántico con clases CSS scoped
├── <script>      → JS vanilla para interactividad (sin framework)
└── <style>       → CSS scoped, tokens de diseño via var()
```

Sin React, sin Vue, sin framework JS cliente. Solo Astro + JS vanilla donde sea necesario. Esto mantiene el bundle pequeño y el modelo mental simple.

### Design tokens

Todas las propiedades visuales definidas como propiedades personalizadas CSS en `tokens.css`:

```css
--space-blue: #4a9eff;
--bone: #e8e6e3;
--font-accent: 'Instrument Serif', serif;
--step-0: clamp(1rem, 0.9vw + 0.5rem, 1.25rem);
```

Los componentes referencian estas variables — nunca se hardcodean colores ni tamaños. El selector `[data-theme="light"]` intercambia la paleta para el modo claro.

### Aislamiento de datos

El contenido vive en `src/data/*.json`. Los componentes lo importan y renderizan. Editar el texto nunca requiere tocar el código del componente. Los datos externos (API de eventos) tienen un respaldo JSON local que se distribuye con cada build.

### Gestión de estado

Todo el estado cliente usa `localStorage` — sin librerías de estado global. Las claves tienen prefijo por funcionalidad:

- `eclipsarium-checklist`
- `eclipsarium-quiz-best`
- `eclipsarium-quiz-general-best`
- `theme`

### Scoping de JS

Los componentes que comparten el DOM usan atributos de datos únicos para sus selectores JS (`data-quiz-general` vs `data-quiz`) para evitar colisiones cuando varias instancias coexisten en la misma página.

---

## 📊 Calidad

| Métrica              | Estado                                               |
| -------------------- | ---------------------------------------------------- |
| Lighthouse (desktop) | 98 / 94 / 100 / 100                                  |
| Lighthouse (mobile)  | 98 / 94 / 100 / 100                                  |
| axe-core             | 0 violaciones críticas                               |
| Responsive           | Funciona desde 360px hasta 4K                        |
| Tema                 | Oscuro (por defecto) + Claro con interruptor animado |
| Build                | 30 páginas estáticas, 0 errores                      |
| Animaciones          | Todas respetan `prefers-reduced-motion`              |

---

## 🤝 Contribuir

1. Haz fork y clona.
2. `pnpm install`
3. Crea una rama: `feat/tu-funcionalidad` o `fix/tu-arreglo`
4. Escribe tests primero (validación de datos para cambios en JSON, renderizado de componente para UI).
5. Asegúrate de que `pnpm test && pnpm test:e2e` pase.
6. Abre un PR con una descripción clara.

**Convenciones:**

- ESLint + Prettier via `prettier-plugin-astro`
- Conventional commits: `feat:`, `fix:`, `test:`, `refactor:`
- Tests co-localizados con los archivos fuente
- Datos en JSON, nunca hardcodeados

---

## 📄 Licencia

[MIT](LICENSE) © 2026 Edu Yeves

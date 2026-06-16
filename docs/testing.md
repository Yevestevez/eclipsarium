# Hoja de ruta de tests — Eclipsarium

> Stack: Astro 6 · Node ≥22 · pnpm

---

## Stack de testing elegido

| Capa                | Herramienta              | Por qué                                              |
| ------------------- | ------------------------ | ---------------------------------------------------- |
| Unidad / datos      | **Vitest**               | integración nativa con Vite/Astro, sin config extra  |
| E2E + accesibilidad | **Playwright**           | estándar de la industria, multi-browser, screenshots |
| Accesibilidad       | **@axe-core/playwright** | plugin para Playwright, sin setup adicional          |

---

## Fase 1 — Instalación y configuración

### 1.1 Vitest

```bash
pnpm add -D vitest
```

Añadir script en `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

No necesita config adicional: Vitest detecta automáticamente el entorno Vite de Astro.

### 1.2 Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install --with-deps chromium
```

Añadir script en `package.json`:

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

Crear `playwright.config.ts` en la raíz:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    webServer: {
        command: 'pnpm build && pnpm preview',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:4321',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 5'] } },
    ],
});
```

### 1.3 axe-core para accesibilidad

```bash
pnpm add -D @axe-core/playwright
```

### 1.4 Estructura de carpetas

```
src/
└── data/
    ├── event.json
    ├── event.test.ts          # contrato de event.json
    ├── locations.json
    └── locations.test.ts      # contrato de locations.json

tests/
└── e2e/
    ├── home.spec.ts           # carga y secciones
    ├── nav.spec.ts            # navegación y menú móvil
    ├── countdown.spec.ts      # cuenta atrás
    └── a11y.spec.ts           # accesibilidad axe
```

Decisión de estructura:

- Unitarios co-localizados con el código (`*.test.ts` junto al archivo testeado dentro de `src/`).
- E2E fuera de `src/` en `tests/e2e/` para separar pruebas de integración del código de aplicación.

---

## Fase 2 — Tests unitarios (Vitest)

Ubicación: junto al archivo testeado (co-localizados).

### `src/data/event.test.ts` — Contrato de `event.json`

| #   | Caso                                               | Prioridad |
| --- | -------------------------------------------------- | --------- |
| U01 | `date` existe y tiene formato `YYYY-MM-DD`         | P0        |
| U02 | `dateLabel`, `type`, `intro` son strings no vacíos | P0        |
| U03 | `facts` es array con exactamente 4 elementos       | P0        |
| U04 | cada fact tiene `label`, `value`, `note` no vacíos | P0        |

### `src/data/locations.test.ts` — Contrato de `locations.json`

| #   | Caso                                                               | Prioridad |
| --- | ------------------------------------------------------------------ | --------- |
| U05 | `places` es array con al menos 1 elemento                          | P0        |
| U06 | cada place tiene `city`, `region`, `duration`, `contact` no vacíos | P0        |
| U07 | `totality` es boolean en todos los elementos                       | P0        |
| U08 | al menos un place tiene `totality: true`                           | P0        |
| U09 | al menos un place tiene `totality: false`                          | P1        |

---

## Fase 3 — Tests E2E (Playwright)

Ubicación: `tests/e2e/`

### `home.spec.ts` — Carga y estructura

| #   | Caso                                                 | Prioridad |
| --- | ---------------------------------------------------- | --------- |
| E01 | la página responde 200 en `/`                        | P0        |
| E02 | `<title>` contiene "ECLIPSARIUM"                     | P0        |
| E03 | `<meta name="description">` está presente y no vacía | P0        |
| E04 | `<html lang="es">`                                   | P0        |
| E05 | sección `#evento` existe y es visible                | P0        |
| E06 | sección `#donde` existe y es visible                 | P0        |
| E07 | sección `#cuenta` existe y es visible                | P0        |
| E08 | footer muestra el aviso de seguridad ISO 12312-2     | P1        |

### `nav.spec.ts` — Navegación

| #   | Caso                                                    | Prioridad |
| --- | ------------------------------------------------------- | --------- |
| E09 | links de nav desktop llevan a secciones con id correcto | P0        |
| E10 | menú hamburguesa no visible en desktop                  | P1        |
| E11 | menú hamburguesa visible en viewport móvil (375px)      | P0        |
| E12 | al pulsar hamburguesa el panel se abre                  | P0        |
| E13 | al pulsar un enlace del panel, el panel se cierra       | P0        |

### `countdown.spec.ts` — Cuenta atrás

| #   | Caso                                                         | Prioridad |
| --- | ------------------------------------------------------------ | --------- |
| E14 | los 4 bloques de tiempo (días, horas, min, seg) son visibles | P0        |
| E15 | los valores son numéricos (no `—`) tras 1 segundo            | P0        |
| E16 | días muestra valor ≥ 0                                       | P1        |

### `a11y.spec.ts` — Accesibilidad

| #   | Caso                                                     | Prioridad |
| --- | -------------------------------------------------------- | --------- |
| E17 | axe no reporta violations críticas en home (desktop)     | P0        |
| E18 | axe no reporta violations críticas en home (móvil 375px) | P0        |
| E19 | `EclipseAnimation` tiene `role="img"` y `aria-label`     | P1        |

---

## Fase 4 — CI (opcional, post-MVP)

Cuando el proyecto esté en GitHub, añadir `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
    unit:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: pnpm/action-setup@v3
            - run: pnpm install
            - run: pnpm test

    e2e:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: pnpm/action-setup@v3
            - run: pnpm install
            - run: pnpm exec playwright install --with-deps chromium
            - run: pnpm test:e2e
```

---

## Orden de implementación recomendado

1. Instalar Vitest → escribir `event.test.ts` y `locations.test.ts` (30 min)
2. Instalar Playwright + axe → crear `playwright.config.ts` (15 min)
3. Escribir `home.spec.ts` + `nav.spec.ts` (45 min)
4. Escribir `countdown.spec.ts` + `a11y.spec.ts` (30 min)
5. Verificar que `pnpm test` y `pnpm test:e2e` pasan en verde
6. (Opcional) Añadir CI

**Cobertura objetivo:** 19 casos, ~2h de trabajo total.

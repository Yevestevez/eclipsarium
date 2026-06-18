# Eclipse 2026 🌑

Web informativa sobre el **eclipse solar total del 12 de agosto de 2026**, visible en gran parte de España.

> Tras casi un siglo sin un eclipse solar total visible desde la península, España vivirá uno de los eventos astronómicos más esperados del siglo.

## 🌐 Despliegue

- **v1.0.0 (MVP):** https://eclipsarium.vercel.app/
- **v1.1.0 (mapa):** mapa interactivo con franja de totalidad y localizaciones
- **v1.2.0 (actual):** botones añadir evento a calendario

## 🎯 Objetivo

Punto de referencia divulgativo y atractivo para el público general:

- Explicar **qué es un eclipse solar** mediante animación interactiva.
- Ofrecer **información del evento** del 12 de agosto de 2026 en España.
- Indicar **dónde y cuándo verlo** (franja de totalidad, horarios, mejores ubicaciones).
- Promover la **observación segura** del Sol.

## 🛠️ Stack

- [Astro](https://astro.build/) `^6.4.2`
- [Leaflet](https://leafletjs.com/) `^1.9.4` — mapa interactivo con CartoDB dark tiles
- [Vitest](https://vitest.dev/) `^4.1.9` — tests unitarios
- [Playwright](https://playwright.dev/) `^1.61.0` — tests E2E + accesibilidad (axe-core)
- Node `>=22.13.0` · pnpm

## 🚀 Inicio rápido

```bash
pnpm install
pnpm dev              # servidor desarrollo (http://localhost:4321)
pnpm build            # build producción
pnpm preview          # previsualizar build
pnpm test             # tests unitarios (Vitest)
pnpm test:e2e         # tests E2E (Playwright)
```

## 📁 Estructura

```
src/
├── assets/           # imágenes y svg
├── components/       # componentes .astro
│   ├── EclipseMap.astro    # mapa Leaflet con polígono + markers
│   ├── WhereToWatch.astro  # lista de lugares con mapa
│   └── ...
├── data/             # datos estáticos (JSON + test co-localizado)
├── layouts/          # layouts de página
├── pages/            # rutas (index.astro = home)
└── styles/           # tokens de diseño CSS
tests/
└── e2e/              # tests Playwright (home, nav, countdown, a11y)
```

## 📅 El evento

- **Fecha:** 12 de agosto de 2026
- **Tipo:** eclipse solar total
- **Visibilidad:** franja de totalidad cruzando el norte y centro-este peninsular; parcial en el resto.

> ⚠️ **Seguridad:** nunca mirar al Sol sin protección certificada ISO 12312-2.

## ✨ Features

### Sprint 1 ✅ — MVP (v1.0.0)

- [x] Animación eclipse solar (Sol, Luna, sombra, fases)
- [x] Información del evento (fecha, hora, duración, magnitud)
- [x] Dónde verlo (texto + datos)
- [x] Cuenta atrás al evento
- [x] Navegación responsive con menú hamburguesa

### Sprint 2 ✅ — Mapa + Calendario (v1.1.0)

- [x] Mapa Leaflet con tiles CartoDB dark_all
- [x] Polígono de totalidad con coordenadas reales NASA/JPL (83 puntos)
- [x] 29 localizaciones con 3 categorías: total (azul), borde (azul oscuro), parcial (gris)
- [x] Labels y dots con colores por tipo
- [x] Lista ordenada por duración de totalidad
- [x] Botones calendario: Google Calendar, Apple Calendar (webcal con avisos), Outlook
- [x] Archivo .ics con 3 alarmas predefinidas (1 semana, 1 día, 1 hora)
- [x] Tests unitarios (Vitest, 22 tests) + E2E (Playwright)
- [ ] Checklist de preparación

### Roadmap

- [ ] Horarios por localidad (tiempos de contacto)
- [ ] Guía de observación segura (gafas ISO 12312-2, proyección)
- [ ] FAQ y mitos sobre eclipses
- [ ] Predicción meteorológica
- [ ] Actividades para familias

## 📄 Licencia

Por definir.

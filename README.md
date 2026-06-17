# Eclipse 2026 🌑

Web informativa sobre el **eclipse solar total del 12 de agosto de 2026**, visible en gran parte de España. El objetivo es divulgar de forma clara, visual y accesible qué es un eclipse, cuándo y dónde verlo, y cómo disfrutarlo con seguridad.

> Tras casi un siglo sin un eclipse solar total visible desde la península, España vivirá uno de los eventos astronómicos más esperados del siglo.

## 🌐 Versión desplegada (v1.0.0 - MVP)

- Primera versión pública (página base): https://eclipsarium.vercel.app/

## 🎯 Objetivo

Crear un punto de referencia divulgativo y atractivo para el público general:

- Explicar **qué es un eclipse solar** mediante una animación interactiva.
- Ofrecer **información del evento** del 12 de agosto de 2026 en España.
- Indicar **dónde y cuándo verlo** (franja de totalidad, horarios, mejores ubicaciones).
- Promover la **observación segura** del Sol.

## 🛠️ Stack

- [Astro](https://astro.build/) `^6.4.2`
- Node `>=22.13.0`

## 🚀 Inicio rápido

```bash
# instalar dependencias
pnpm install

# servidor de desarrollo (http://localhost:4321)
pnpm dev

# build de producción
pnpm build

# previsualizar el build
pnpm preview
```

## 📁 Estructura

```
src/
├── assets/       # imágenes y svg
├── components/   # componentes reutilizables (.astro)
├── layouts/      # layouts de página
└── pages/        # rutas (index.astro = home)
```

## 📅 El evento

- **Fecha:** 12 de agosto de 2026
- **Tipo:** eclipse solar total
- **Visibilidad:** franja de totalidad cruzando el norte y centro-este de la península ibérica; eclipse parcial en el resto de España.

> ⚠️ **Seguridad:** nunca mires al Sol directamente sin protección certificada (ISO 12312-2). Las gafas de sol normales **no** sirven.

## ✨ Features (Sprint 1 ✅)

### Home — Completado

- [x] **Animación de eclipse solar** — visualización del fenómeno (Sol, Luna, sombra/umbra) y sus fases (parcial, total, anular).
- [x] **Información del evento** — datos del eclipse del 12 de agosto de 2026: fecha, hora, duración de la totalidad, magnitud.
- [x] **Dónde verlo** — franja de totalidad sobre España, ciudades y puntos recomendados.
- [x] **Cuenta atrás** — timer hasta el evento.
- [x] **Navegación mobile** — menú hamburguesa responsivo.

## 🚀 Sprint 2 (Deadline: viernes 26 junio)

### P1 — Core (imprescindible)

- [ ] **Mapa interactivo** — franja de totalidad embebida, puntos recomendados si existen (AEMET, ministerios, CCAA, expertos fiables). Fallback: solo franja + pueblos/ciudades en Google Maps base.
- [ ] **Integración Google Calendar** — agregar evento al calendario (notificaciones: 1 semana, 1 día, 1 hora antes).
- [ ] **Checklist de preparación** — qué llevar, estimadores de asistencia, datos históricos de afluencia.

### P2 — Add-on (si hay tiempo)

- [ ] **Actividades para familias** — recursos educativos linkados, base para contenido propio. Foco primaria.
- [ ] **Horarios por localidad** — tiempos de contacto, duración según ubicación.

## 📅 Futuras (roadmap)

- [ ] Guía de observación segura (gafas ISO 12312-2, métodos proyección).
- [ ] FAQ y mitos sobre eclipses.
- [ ] Galería / multimedia.
- [ ] Predicción meteorológica de cara al evento.

## 🤝 Contribuir

Proyecto en fase inicial. Issues y PRs bienvenidos a medida que se añaden features del roadmap.

## 📄 Licencia

Por definir.

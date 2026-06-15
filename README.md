# Eclipse 2026 🌑

Web informativa sobre el **eclipse solar total del 12 de agosto de 2026**, visible en gran parte de España. El objetivo es divulgar de forma clara, visual y accesible qué es un eclipse, cuándo y dónde verlo, y cómo disfrutarlo con seguridad.

> Tras casi un siglo sin un eclipse solar total visible desde la península, España vivirá uno de los eventos astronómicos más esperados del siglo.

## 🎯 Objetivo

Crear un punto de referencia divulgativo y atractivo para el público general:

- Explicar **qué es un eclipse solar** mediante una animación interactiva.
- Ofrecer **información del evento** del 12 de agosto de 2026 en España.
- Indicar **dónde y cuándo verlo** (franja de totalidad, horarios, mejores ubicaciones).
- Promover la **observación segura** del Sol.

## ✨ Features

### Home

- [ ] **Animación de eclipse solar** — visualización del fenómeno (Sol, Luna, sombra/umbra) y sus fases (parcial, total, anular).
- [ ] **Información del evento** — datos del eclipse del 12 de agosto de 2026: fecha, hora, duración de la totalidad, magnitud.
- [ ] **Dónde verlo** — franja de totalidad sobre España, ciudades y puntos recomendados.

### Próximas (roadmap)

- [ ] Cuenta atrás hasta el evento.
- [ ] Mapa interactivo de la franja de totalidad.
- [ ] Horarios por localidad (geolocalización).
- [ ] Guía de observación segura (gafas certificadas ISO 12312-2, métodos de proyección).
- [ ] Galería / multimedia.
- [ ] Predicción meteorológica de cara al día del evento.
- [ ] FAQ y mitos sobre eclipses.

## 🛠️ Stack

- [Astro](https://astro.build/) `^6.4.2`
- Node `>=22.12.0`

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

## 🤝 Contribuir

Proyecto en fase inicial. Issues y PRs bienvenidos a medida que se añaden features del roadmap.

## 📄 Licencia

Por definir.

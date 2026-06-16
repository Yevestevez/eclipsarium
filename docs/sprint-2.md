# Sprint 2 Plan — Eclipse 2026

**Deadline:** viernes 26 de junio (10 días)  
**Objetivo:** Features core para máxima utilidad + preparación para Sprint 3

---

## 📋 Features

### P1 — Core (Imprescindible)

#### F1: Mapa Interactivo

- **Descripción:** Google Maps embebida con franja de totalidad superpuesta. Puntos recomendados si existen (AEMET, ministerios, CCAA, ayuntamientos, expertos fiables).
- **Scope:**
    - Mapa embebido con zoom en España
    - Overlay franja de totalidad (polígono)
    - Markers de puntos recomendados (si data disponible en búsqueda)
    - Fallback: solo franja + pueblos/ciudades en base de Google Maps
- **Ubicación:** Nueva sección en index.astro o página dedicada
- **Datos:** Búsqueda web (AEMET, IGN, OSM si public data existe)
- **Aceptación:**
    - Franja visible y correcta geográficamente
    - Puntos recomendados mostrados (o fallback aplicado)
    - Responsivo mobile/desktop
    - Sin salir del sitio (embebido)

---

#### F2: Integración Google Calendar

- **Descripción:** Botón que agrega evento eclipse 12-ago-2026 al calendario del usuario con 3 notificaciones automáticas.
- **Scope:**
    - Botón "Agregar a calendario"
    - Evento: "Eclipse Solar Total — España"
    - Fecha: 12 de agosto 2026 (hora de máxima totalidad en España)
    - Notificaciones: 1 semana antes, 1 día antes, 1 hora antes
    - Compatible con Google Calendar, Outlook, Apple Calendar (iCal format)
- **Tech:** Link `.ics` descargable o API Google Calendar (OAuth si posible, fallback manual)
- **Ubicación:** Hero section o sección de evento (junto a info eclipse)
- **Aceptación:**
    - Botón agrega evento correctamente
    - Notificaciones se activan en las fechas especificadas
    - Funciona en navegadores principales
    - Mobile friendly

---

#### F3: Checklist de Preparación

- **Descripción:** Sección estática con checklist visual qué llevar, estimadores de asistencia, datos históricos de afluencia similar.
- **Scope:**
    - Checklist: gafas ISO, protector solar, agua, combustible, etc.
    - Estimadores: "eclipses solares totales atraen 500k-2M de personas"
    - Datos históricos: asistencia 2024 (eclipse USA), 2017 (eclipse USA), etc.
    - Avisos: tráfico, alojamiento, congestión
    - Responsivo
- **Ubicación:** Nueva sección "Prepárate" en index.astro
- **Contenido:** Estático (no interactivo)
- **Aceptación:**
    - Checklist legible e interactivo (checkboxes visuales)
    - Datos históricos claros y contextualizados
    - Avisos visibles y comprensibles

---

### P2 — Add-on (Si hay tiempo, semanas 2-3)

#### F4: Actividades para Familias

- **Descripción:** Recursos educativos (enlaces externos inicialmente) + base para contenido propio posterior.
- **Scope:**
    - Links a vídeos educativos fiables (NASA, ESA, canales españoles educativos)
    - Mini-cuestionarios o curiosidades interactivas
    - Guía: qué explicar a niños (primaria focus, accesible todas edades)
    - Base HTML/CSS para posterior migración a contenido propio
- **Fuentes:** YouTube educativo, RTVE, Museo de Astronomía, etc.
- **Ubicación:** Nueva sección "Actividades en familia" o subsección en "Prepárate"
- **Aceptación:**
    - Links actualizados y funcionales
    - Contenido apropiado para primaria
    - No requiere auth/paywall

---

#### F5: Horarios por Localidad

- **Descripción:** Tiempos de contacto (inicio, máxima totalidad, fin) por localidad seleccionada.
- **Scope:**
    - Geolocalización (opcional) o búsqueda manual de localidad
    - Mostrar: primer contacto, totalidad inicio, máxima, totalidad fin, último contacto
    - Duración de totalidad
    - Ubicación mapa local
- **Data:** Cálculos astronómicos (libreoffice/NASA data) o API (Stellarium, SkySafari)
- **Ubicación:** Detalle en sección "Dónde verlo" o pop-up del mapa
- **Aceptación:**
    - Horarios precisos ±1 min
    - UX clara: hora y duración destacadas
    - Fallback text si geolocalization no disponible

---

## 🎯 Priorización Diaria

**Semana 16-22 junio (P1 core):**

- Día 1-2: Mapa (búsqueda data + integración)
- Día 3-4: Google Calendar (botón + iCal)
- Día 5-7: Checklist (diseño + contenido)

**Semana 23-26 junio (P2 si tiempo):**

- Día 8-9: Actividades familias (links + curación)
- Día 10: Horarios localidad (si tiempo) o pulido P1

---

## 📊 Dependencias & Blockers

| Feature     | Blocker?                 | Mitigation                               |
| ----------- | ------------------------ | ---------------------------------------- |
| Mapa        | Data puntos recomendados | Búsqueda proactiva; fallback franja only |
| Calendar    | —                        | No; iCal es estándar                     |
| Checklist   | —                        | No; contenido conocido                   |
| Actividades | Links breaking           | Verificación durante dev                 |
| Horarios    | Precisión astronómica    | Usar NASA ephemeris o Stellarium API     |

---

## 🔍 Búsqueda de Datos Requerida

- [ ] AEMET: puntos recomendados eclipse 2026
- [ ] Ministerios (Transportes, Interior): recomendaciones, avisos vial
- [ ] CCAA/Ayuntamientos: eventos, alojamiento, logística
- [ ] Expertos: astrónomos, divulgadores, instituciones educativas fiables
- [ ] Datos históricos: asistencia eclipses 2017, 2024, etc.
- [ ] NASA/ESA ephemeris: hora exacta máxima totalidad por latitud/longitud
- [ ] YouTube/RTVE: canales educativos para familias

---

## ✅ Definition of Done

- [ ] Todos P1 features merged a main
- [ ] Testing responsivo (mobile 360px, tablet, desktop)
- [ ] README actualizado con Sprint 2 features
- [ ] Links/data sources documentados
- [ ] No console errors
- [ ] Performance: animación sin jank, mapa carga rápido

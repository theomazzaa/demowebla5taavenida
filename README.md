# La 5ta Avenida — Resto & Autospa

Landing page estática (HTML/CSS/JS plano, sin frameworks) para La 5ta Avenida,
lavadero + autospa + resto (sushi/cafetería) en Olivos, Buenos Aires.

## Estructura

```
index.html          Página única, todas las secciones
css/style.css        Estilos (tokens, layout, responsive)
js/main.js           Punto de entrada (ES modules)
js/nav.js            Header sticky + menú mobile
js/hours.js          Indicador de abierto/cerrado en vivo (huso de Buenos Aires)
js/menuTabs.js       Tabs de la Carta (Cafetería / Sushi / Minutas)
img/                 Fotos reales (comprimidas a JPG)
_src/                Originales sin comprimir (no se deploya, está en .gitignore)
vercel.json          Clean URLs + cache headers
```

## Correr en local

Los scripts usan ES modules (`<script type="module">`), que el navegador
bloquea si abrís `index.html` directo con `file://`. Hace falta un servidor
estático simple:

```bash
npx serve .
# o
python -m http.server 5500
```

Y abrís la URL que te muestre (por ej. http://localhost:3000 o :5500).

## Deploy en Vercel

Es un proyecto 100% estático, no requiere build ni `package.json`.

```bash
npx vercel --prod
```

Vercel detecta el `index.html` en la raíz y lo sirve tal cual, aplicando los
headers de `vercel.json`.

## Pendientes de contenido (marcados en el código)

- **Fotos placeholder**: bloques de color sólido con un comentario
  `<!-- FOTO: ... -->` en `index.html` (servicios de autospa sin foto, platos
  de sushi, algunos ítems de la carta). Reemplazar el `<div class="... placeholder">`
  por una `<img>` real cuando haya material.
- **Reseñas reales**: la sección `#resenas` tiene 3 tarjetas marcadas
  `RESEÑA REAL` con borde punteado — van los comentarios reales de Google
  cuando se pasen.
- **Mapa**: el iframe usa el embed público de Google Maps por dirección (sin
  API key). Se puede reemplazar por el iframe de "Compartir → Insertar un
  mapa" del local en Google Maps para un pin más preciso.

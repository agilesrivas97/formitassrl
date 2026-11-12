# Versión única del sitio Formitas — Diseño

Fecha: 2026-11-11 · Rama base: `redesign-v2` · Origen de piezas a rescatar: `main`

## Objetivo

Cerrar una sola versión del sitio. La base es la versión nueva (`redesign-v2`). De la versión vieja (`main`) se incorporan solo las piezas que se acordaron con el cliente, y se mejora la carga de imágenes con internet lento.

## Alcance

| # | Cambio | Origen | Destino |
|---|---|---|---|
| 1 | Video inmersivo (mascot abre la heladera) como intro de primera visita | `main:app/components/Inmersiva.tsx`, `public/video/escena_init.mp4` | Reemplaza a `Loader.tsx` (mascot caminando por CSS) |
| 2 | Tipografía Unbounded + Instrument Sans | `main:app/layout.tsx`, `globals.css` | Global |
| 3 | Fondo de los 4 círculos de Universos: imagen de plato + color de categoría | `main:app/components/Products.tsx` (tiles) | `Universos.tsx` / `.planeta` |
| 4 | Carrusel único scroll-driven | `main:app/components/Story.tsx` | Reemplaza las 3 `<section class="chapter">` de `Story.tsx` nuevo |
| 5 | Mascot asomando desde la pared | `main:PeekerMascot.tsx`, `public/uploads/manitos.png` | Capítulo 03 / 03 del carrusel |
| 6 | Galería de imágenes final | `main:app/components/Feed.tsx`, `public/recetas/*` | Antes del footer |
| 7 | Carga rápida con internet lento | — | Todo el sitio |

Fuera de alcance: sección "Nosotros" aparte, copy de `About.tsx`, rediseño de las páginas `/catalogo`, `/producto` y `/distribuidores`, y cualquier cambio de contenido no listado.

## Diseño

### 1. Intro inmersiva
- Nuevo `Intro.tsx` basado en `Inmersiva.tsx`: poster, botón "Conocé la nuestra", video, imagen final con crossfade, hotspots, "Saltar" y cortina de salida.
- Los 3 hotspots apuntan a los destinos de `TresAccesos`: `#historia`, `/catalogo`, `/distribuidores`.
- Se muestra en la primera visita. Se reutiliza la clave `pop-intro-seen` (TTL de 7 días) y el script inline de `layout.tsx` que agrega `html.intro-seen`, así no parpadea en visitas repetidas.
- Al cerrarse emite `INTRO_DONE_EVENT` y setea `__popIntroDone`, el contrato que hoy usa `HeroMedia`. El Hero no cambia.
- Con `prefers-reduced-motion`, salta al estado final sin reproducir el video.
- Se elimina `Loader.tsx` y los assets `public/pop/mascota/pierna-*.webp`, `cuerpo.webp` si ya nadie los usa.

### 2. Tipografía
- `next/font/google` con Unbounded (400/600/700/800/900) e Instrument Sans, con `display: 'swap'` y variables CSS.
- Se reemplaza `--font-display` / `--font-body` y los `font-family` de Lilita One / Anton / Barlow.
- Se revisa visualmente cada título (Hero, Universos, accesos, capítulos, botones). Unbounded es más ancha que Anton, así que se ajustan `font-size` y `letter-spacing` donde desborde.

### 3. Universos
- Los 4 círculos siguen siendo: Pollo, Pescado, Mariscos, Vegetales y quesos.
- Cada `.planeta` toma como fondo una imagen de plato (`/platos/plato-N.webp`) con una capa del color de la categoría encima. Número, ícono, label y CTA quedan por encima y legibles.
- Colores: Pollo `#F5A623` y Pescado `#0B5C8F` (versión vieja). Mariscos `#082A54` y Vegetales `#2E7D4F` (actuales).
- La imagen es de fondo (`next/image` con `fill`, `sizes` acorde al círculo), no `background-image` de CSS, para que el navegador la optimice.

### 4. Carrusel
- Una sola sección sticky de alto `N × 100vh`. El scroll vertical traslada un riel horizontal de 3 capítulos y actualiza el capítulo activo y la barra de progreso.
- Cada capítulo conserva su diseño actual: copy, eyebrow "Nuestra historia · 0X / 03", badges, número, callout, forma de la imagen (marco, cuadrado, círculo) y ondas de fondo.
- El cálculo de scroll va en un componente cliente con `requestAnimationFrame`, sin `setState` por evento de scroll.
- En mobile (y con `prefers-reduced-motion`) no hay sticky: los capítulos se apilan en vertical, como hoy.
- `id="historia"` queda en la sección, para que sigan funcionando los links.

### 5. Mascot
- Se agrega `manitos.png` (convertido a webp) asomando desde el borde del capítulo 03 / 03, con el posicionamiento de `.about__peeker-*` de `main`.
- Decorativo (`aria-hidden`). No tapa texto en ningún ancho.

### 6. Galería final
- `Feed.tsx` se trae tal cual: 6 tiles de `/recetas/*`, enlazados a `instagram.com/rebozaditospop`.
- Va después de "Distribuidores/Novedades" y antes del footer. Los estilos `.feed*` y `.tile*` se portan con los tokens nuevos.
- Imágenes con `next/image` y lazy loading, en lugar de `background-image`.

### 7. Performance en conexión lenta
Hoy `public/` pesa 78 MB, con imágenes y videos muy por encima de lo necesario.

- **Video:** recomprimir `escena_init.mp4` (15 MB) a ~2–3 MB (H.264, 720p, CRF alto, `faststart`). `preload="none"` hasta que el usuario toca "Conocé la nuestra", con poster liviano.
- **Imágenes del video:** `init_freezer.png` (1,6 MB) y `end_freezer.png` (2,3 MB) a webp (< 200 KB cada una). `end_freezer` se carga recién cuando arranca el video.
- **Platos y mascot:** `platos/*.png` (~1,5 MB c/u) y `uploads/*.png` no se sirven. Se usan solo los `.webp` o se reconvierten.
- **`next/image` en todo:** `sizes` correctos, `loading="lazy"` bajo el fold, `priority` solo en la imagen del Hero. Fondo de color o `blurDataURL` mientras carga.
- **Fuentes:** `next/font` (self-host, sin request a Google).
- **Limpieza:** eliminar de `public/` lo que el sitio no referencia (`pop/*.png` de ~2 MB, `camion.mp4` de 13 MB si no se usa, `package*.png`, `cunita*.png`, svgs de plantilla). Se verifica con `grep` antes de borrar.
- **Medición:** Lighthouse y la pestaña Network con throttling "Slow 3G" antes y después. Meta: el primer render del Hero no depende de ningún asset de más de ~150 KB, y el peso inicial de la home baja de forma clara.

## Verificación
- `next build` y `eslint` sin errores.
- Revisión visual en 1440, 1080, 768 y 390 px: Intro, Hero, Accesos, Carrusel, Universos, Galería y Footer.
- Flujos: intro → "Entrar al sitio", intro → "Saltar", visita repetida (sin intro), cada hotspot, navegación a `/catalogo/[categoria]` desde cada planeta.
- `prefers-reduced-motion` y sin JS: el contenido sigue accesible.
- Slow 3G: la home usable sin esperar el video ni las imágenes bajo el fold.

## Riesgos
- **Unbounded desborda títulos** diseñados para Anton. Se mitiga con la revisión visual por breakpoint.
- **Carrusel sticky + anclas:** `#historia` debe aterrizar en el inicio del carrusel. Se prueba el scroll por ancla.
- **Borrado de assets:** solo después de comprobar con `grep` que nada los referencia (incluidos `data/products.json` y `app/lib/seo.ts`).

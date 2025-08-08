# Dagmawi Asfaw — Portfolio

A modern, responsive, single‑page portfolio built with semantic HTML, modern CSS, and vanilla JavaScript. It features dark/light theme toggle with persistence, animated section reveals, mobile navigation, project filtering, and accessible UI components.

## Preview

- Local dev (HTTP): `http://127.0.0.1:5500` (when using a static server)
- Local dev (HTTPS, optional): see the HTTPS section below

## Features

- Accessibility: skip link, reduced motion friendly animations, semantic landmarks, color‑contrast aware theme
- Responsive layout: mobile‑first, flexible grids, fluid typography
- Theming: dark/light with `localStorage` persistence and system preference detection
- Interactions: animated counters, on‑scroll reveal, category filters, mobile nav
- Performance: no frameworks, minimal JS, SVG assets, lazy animations
- SEO: descriptive `<title>` and meta description

## Tech Stack

- HTML5, CSS (custom properties, media queries), JavaScript (DOM APIs)
- No build step required; purely static

## Project structure

```
Portfolio/
├─ index.html
├─ styles.css
├─ script.js
└─ assets/
   ├─ icons/ (SVG icons: logo, GitHub, LinkedIn, mail, map-pin)
   └─ images/ (SVG placeholders: profile, p1–p4)
```

## Getting started

1. Clone or download this folder
2. Serve the directory with any static server (pick one):
   - Python

     ```bash
     cd /home/zohar/Downloads/Portfolio
     python3 -m http.server 5500
     ```

     Open `http://127.0.0.1:5500`
   - Node (`http-server`)

     ```bash
     npx http-server . -p 5500
     ```

### Optional: HTTPS locally

If your browser blocks geolocation/clipboard/etc. over HTTP, you can use a locally‑trusted certificate:

```bash
# Install mkcert (Linux example)
curl -L -o /tmp/mkcert 'https://dl.filippo.io/mkcert/latest?for=linux/amd64'
chmod +x /tmp/mkcert && sudo mv /tmp/mkcert /usr/local/bin/mkcert
mkcert -install

# Generate a cert for localhost and your LAN IP (edit the IP as needed)
mkcert localhost 127.0.0.1 192.168.186.96

# Serve with HTTPS
npx http-server . -p 5500 -S -C localhost+2.pem -K localhost+2-key.pem
```

Open `https://127.0.0.1:5500`. If prompted, restart the browser after `mkcert -install`.

## Customization

- Branding and meta
  - Edit `index.html`:
    - `<title>` and meta `description`
    - Header brand text and `alt` on logo/profile images
- Social links
  - Update links in `index.html` under the `ul.socials` list. Example:

    ```html
    <a href="https://github.com/Dagmawi7Asfaw" target="_blank" rel="noreferrer noopener">…</a>
    ```

- About skills
  - Update the chips in the `#about` section’s `ul.tags`
- Experience timeline
  - Replace items in the `#experience` section’s `ol.timeline`
- Projects
  - Cards live in the `#projects` section. Each `article.card` uses `data-cat` for filtering. Example:

    ```html
    <article class="card" data-cat="rust">
      <img src="./assets/images/p4.svg" alt="Rust Music Player" />
      <div class="card-body">
        <h3>Music Player (Rust)</h3>
        <p>…</p>
        <div class="card-actions">
          <a class="btn btn-ghost" href="https://github.com/Dagmawi7Asfaw/Music_Player" target="_blank" rel="noreferrer noopener">Code</a>
        </div>
      </div>
    </article>
    ```

  - The filter buttons are defined above the grid. To add a new category, add a button with `data-filter` and set matching `data-cat` on relevant cards.
- Stats
  - Update the counters in `#about .stats` by changing the `data-count` values and labels

## Deployment

Because this is a static site, you can deploy anywhere:

- GitHub Pages
  - Push the folder to a repository
  - In repo settings → Pages → Deploy from branch → `main` → `/ (root)`
  - Your site will be served over HTTPS automatically
- Netlify
  - Drag‑and‑drop the folder on the Netlify dashboard, or use `netlify deploy`
- Vercel
  - `vercel --prod` in the project directory (no framework preset required)

## Accessibility checklist

- Landmarks: `header`, `main`, `footer`, `nav` with `aria-label`
- Skip link at the top for keyboard users
- Focus states and sufficient color contrast
- Images with meaningful `alt` text; decorative images use empty `alt` when appropriate

## Notes on content

- This instance reflects Dagmawi Asfaw’s public repositories and skills. Update links and copy as your projects evolve.
- Placeholder thumbnails are SVGs for performance; replace with your own images if desired.

## License

This portfolio code is provided for personal use. If you intend to reuse or adapt it for open‑source distribution, consider adding an explicit LICENSE file (e.g., MIT) to your repository.

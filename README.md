# Unknown Marketing landing page

A responsive, dependency-free link hub with the animated logo intro from the main Unknown Marketing website. Serve this folder with any static web server; no build step required.

The logo fills with color, its apostrophe launches upward, and the landing page appears through a circular reveal. Visitors can skip or replay it. Reduced-motion visitors see the links immediately.

## Add links

Edit `links` in `config.js`. Each item has `title`, `subtitle`, `icon`, and `url`. Empty URLs display non-clickable Coming soon cards. Set a full `https://` URL, `mailto:` address, or `tel:` number to activate a card.

## Preview locally

Run `python3 -m http.server 8080` in this folder and visit http://localhost:8080.

The fonts use Google Fonts with local fallbacks. No analytics, cookies, or visitor uploads are included.

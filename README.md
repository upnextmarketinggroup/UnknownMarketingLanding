# Unknown Marketing landing page

A responsive, dependency-free link hub with a full-screen intro. Serve this folder with any static web server; no build step required.

## Add your intro video

1. Put your MP4 file at `assets/intro.mp4` (H.264 video is recommended).
2. Set `videoSrc: "assets/intro.mp4"` in `config.js`. Optionally set `posterSrc` to an image URL.

The video plays on each fresh page load, starts muted, and reveals the links when it ends. Visitors can enable sound, skip, or replay. If autoplay is blocked, a Play intro button appears. A missing/broken video falls through to the links; visitors can always skip. Reduced-motion visitors see the links immediately and can opt into the intro with Replay intro.

Until a video is configured, a 3.5-second branded placeholder previews the experience. Change `placeholderDurationMs` to adjust it.

## Add links

Edit `links` in `config.js`. Each item has `title`, `subtitle`, `icon`, and `url`. Empty URLs display non-clickable Coming soon cards. Set a full `https://` URL, `mailto:` address, or `tel:` number to activate a card.

## Preview locally

Run `python3 -m http.server 8080` in this folder and visit http://localhost:8080.

The fonts use Google Fonts with local fallbacks. No analytics, cookies, or visitor uploads are included.

# Work shots — provenance

Real captures of the real, live builds. Nothing here is a mock-up, a render,
or a generated image. Re-shoot any of them by loading the URL at a 1400px-wide
viewport, letting the page's own entrance animation settle, and cropping the
scrollbar off the right edge.

| File | Source | Captured | Notes |
|---|---|---|---|
| `parkqui.webp` | https://park-qui.vercel.app/ | 2026-09-07 | Home, top of page, 1:1 zoom. The map view sits behind authentication and was not captured. |
| `popwrists.webp` | https://popwrists.vercel.app/ | 2026-09-07 | Home, top of page, 1:1 zoom. |

All three: cropped 1548x709 from the viewport capture, scaled to 1400px wide,
encoded to WebP at quality 84.

## Loops and phone shots

| Files | Source | Captured | Notes |
|---|---|---|---|
| `orvyx-loop-v2.mp4`, `orvyx-poster-v2.webp`, `orvyx-phone-v2.webp` | https://orvyx.tech/ | 2026-09-30 | English version, re-shot after the site's redesign; scrolls 3700px so the loop reaches the case opening. |
| `parkqui-loop.mp4`, `parkqui-poster.webp`, `parkqui-phone-390.webp` | https://park-qui.vercel.app/ | 2026-09-27 | English version, public landing page only (the map sits behind sign-in). |
| `popwrists-loop.mp4`, `popwrists-poster.webp`, `popwrists-phone-390.webp` | https://popwrists.vercel.app/ | 2026-09-27 | |
| `fastcat-loop.mp4`, `fastcat-poster.webp`, `fastcat-phone.webp` | https://fastcat-customer.vercel.app/ | 2026-09-30 | English version of the public customer web app, demo data. The app scrolls an inner container, not the document, so the capture scrolls that element. Restaurant, driver and admin apps sit behind sign-in and were not captured. |

Loops: headless Chromium at 1440x900, recorded from the browser's own
screencast (JPEG q92), choreographed as hold → eased scroll down → hold →
eased scroll back up → hold, so the loop has no jump. Encoded with ffmpeg to
H.264 1280x800, 30fps, CRF 24, no audio, `+faststart`. Posters are the first
frame. Phone shots: iPhone 14 emulation (390x844 @3x), first screen, scaled
to 780px wide, WebP q84. The capture script lives outside the repo; re-shoot
by repeating the same choreography.

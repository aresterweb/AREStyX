AREStyx — Ready-to-Deploy Static Build

No build step is required.

VERCEL
1. Deploy this folder as the project root.
2. Framework preset: Other / Static.
3. Build command: leave empty.
4. Output directory: leave empty (project root).
5. vercel.json applies the security headers automatically.

OTHER STATIC HOSTING
- Serve index.html from the root.
- Keep /assets and /tools in their current locations.
- Hosts that support a Netlify-style _headers file can use the included security headers.
- PWA/service-worker features require HTTPS in production.

IMPORTANT
- Do not rename referenced files unless their HTML/manifest/service-worker paths are updated too.
- The supplied DANA Business QRIS asset is intentionally kept unchanged.
- The site has no required CDN or third-party JavaScript dependency.
- If a custom domain is added later, add its absolute canonical URL and sitemap URL for stronger SEO.

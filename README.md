# Kalpna VW Astrology

One-page site for Kalpna VW Astrology — personal astrology and tarot readings
in London. Served as static assets by Cloudflare Workers; there is no build
step, the files in `public/` are the site.

## Structure

```
public/
  index.html           the site
  404.html             themed not-found page
  favicon.svg          gold chart-star mark
  robots.txt
  _headers             security + caching headers
  assets/
    css/main.css       extracted page styles
    js/main.js         chart wheel, starfields, moon phases, reveals, guide form
wrangler.jsonc         assets-only Workers config (no Worker script)
package.json           wrangler devDependency + dev/deploy/check scripts
```

## Local development

```bash
npm install
npm run dev      # serve locally with wrangler dev
npm run check    # wrangler deploy --dry-run
```

## Deployment

The repo is meant to be connected to Cloudflare Workers Builds, so **every push
to `main` deploys to production**. To connect it (one-time): Cloudflare
dashboard → Workers & Pages → Create → Import a repository, and pick this repo;
the defaults from `wrangler.jsonc` apply, no build command needed.

## External resources

- **Google Fonts** — Cormorant Garamond and Jost, loaded from
  `fonts.googleapis.com` / `fonts.gstatic.com`.
- **Calendly** — the two "Book your reading" buttons link out to
  `calendly.com/kalpna-vibeworthy/…` for scheduling.
- **Instagram** — gift-reading and footer links point to
  [@kalpnavw](https://www.instagram.com/kalpnavw/).

Everything else (chart wheel, emblems, constellation art) is inline SVG — the
site loads no images.

## Known stub

The "Know your Big 3" email form is front-end only: it validates the address
and shows the thank-you message, but does not send anything anywhere yet. Wire
it to an email/newsletter provider before relying on it (noted in
`public/assets/js/main.js`).

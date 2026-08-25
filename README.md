# Kalpna VW Astrology

Kalpna's own one-page site — the homepage of kalpnavwastrology.com, served as
static assets by Cloudflare Workers — plus two additions made for the owner: a
"Brands Kalpna has worked with" strip and a proper social sharing card. There
is no build step; the files in `public/` are the site.

## Structure

```
public/
  index.html           the exported homepage, with the additions injected
  404.html             themed not-found page (brand blue)
  favicon.svg          blue chart-star mark
  robots.txt
  _headers             security + caching headers
  assets/
    site/              the page's own assets — WordPress/Elementor CSS+JS,
                       images, the logo, Google-font CSS files
    site/fonts/        Freight Text Book (681FTB.woff2), the site's body font
    css/main.css       styles for the 404 page only
    img/og.jpg         1200×630 social sharing card
    img/brands/        brand logos for the worked-with strip
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
dashboard → Workers & Pages → Create → Import a repository.

## How the page was captured

`index.html` is a browser "save complete" export of the live homepage,
adapted for static hosting: asset files renamed to browser-safe names under
`assets/site/`, WordPress plumbing (feeds, wp-json, xmlrpc, emoji loader)
removed, same-page anchors made relative, the hero's YouTube background iframe
pointed back at the real embed, and the Freight Text Book webfont vendored
locally (it previously loaded from the agency's server). The canonical URL and
structured data still point at kalpnavwastrology.com, deliberately.

## Still loaded from outside this repo

- **YouTube** — the hero background video (`avu_ICHBwYY`) streams from
  youtube.com.
- **Google Fonts** — the page's Google-font CSS is local, but font files load
  from `fonts.gstatic.com`.
- **Google Analytics / Site Kit** — the exported gtag snippet still reports to
  the owner's Google Analytics property.
- **Elementor lazy bundles** — a few interaction scripts (testimonial
  carousel, accordion, text-editor and shared handlers) are fetched at runtime
  from the live WordPress install at kalpnavwastrology.com. This works while
  that install is up; **before it is retired or the domain is repointed at
  this site, those bundles should be vendored into `assets/site/`** (its own
  small release).
- **Calendly** — booking buttons link out to calendly.com.

## Social sharing card

`public/assets/img/og.jpg` is the Open Graph / Twitter preview image, wired
into the page's existing meta. The `og:image` URL is root-relative; once the
final domain serves this site, switching it to the absolute URL is a one-line
change.

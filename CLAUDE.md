# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A Cloudflare Workers static-assets site for Kalpna VW Astrology (astrology &
tarot readings, London). `public/index.html` is the client's own homepage — a
"save complete" export of kalpnavwastrology.com adapted for static hosting —
with one owner-requested addition injected: the social sharing card.
Everything served lives in `public/` and there is no build step - the files in
that directory are the site. The repo is connected to
Cloudflare Workers Builds, so **every push to `main` deploys to production**.

```
public/            everything served
  index.html       the exported homepage + injected sharing card
  404.html         themed not-found page
  favicon.svg
  assets/site      the page's own WordPress/Elementor assets + Freight webfont
  assets/css       main.css, used by 404.html only
  assets/img       og.jpg sharing card
  _headers         security + caching headers
  robots.txt
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy scripts
```

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## The page itself

The page is the client's own site, captured as supplied. Do not tidy its
markup, rename classes, rewrite copy, or restyle it unless asked - changes to
the design are their own release, requested deliberately. Anything injected into
the page must be scoped with a `kvw-` class prefix and marked with an HTML
comment, so additions stay separable from the client's own markup.

Runtime dependencies that live outside this repo (YouTube background video,
Google font files, the owner's Google Analytics, Calendly, and a few Elementor
interaction bundles still fetched from the live WordPress install) are listed
in the README. The Elementor bundles must be vendored before the WordPress
install is retired.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | Kalpna's night sky opens its doors | The site is live as a real website: the full one-page experience — spinning natal chart, readings, kind words and the Big 3 guide — served fast from Cloudflare's edge, with a matching 404 page to guide wanderers home. |
| v1.1 | The booking button finds its words | The gold booking button in the top navigation now shows its invitation clearly — dark lettering on gold, readable at rest and under the cursor, just like its twin in the hero. |
| v1.2 | A calling card for the night sky | When the site's link is shared in a chat or a post, it now unfurls with its own postcard — the gold chart wheel and Kalpna's invitation on a starlit indigo card. |
| v1.3 | The company Kalpna keeps, in gold | Fifteen famous names — Sony, Puma, Warner Music, the British Fashion Council and more — now shine beneath the client testimonials, quiet proof of the rooms Kalpna's readings have reached. Each wears the site's own gold, so the strip feels born there rather than borrowed. |
| v1.4 | The brands strip learns Vibe Worthy's handwriting | The heading above the brand logos now carries the Vibe Worthy signature — the same swashy italic lettering, finished with a gold shooting star — and glides gently into view as you scroll down to it. |
| v2.0 | Daylight comes to Kalpna's universe | The site now wears the true Kalpna VW Astrology colours from her existing home on the web — royal blue ink on warm cream, with sunlit yellow glows — so the new one-pager and the brand finally speak with one voice. Every corner follows: the chart wheel, the moon phases, the brand logos, the sharing card and the little star in the browser tab. |
| v3.0 | Kalpna's own site takes the stage | The site is now Kalpna's homepage exactly as her visitors know it — her logo, her video sky, her sessions and testimonials — served fast from Cloudflare's edge. Beneath the testimonials, fifteen famous names shine in her royal blue under a heading written in the Vibe Worthy hand, and shared links unfurl with the starlit calling card. |
| v3.1 | The borrowed brand names bow out | The strip of brand logos beneath the testimonials has been taken down — those names were bound for another project — leaving Kalpna's page exactly as her visitors know it, with the sharing card still in place. |

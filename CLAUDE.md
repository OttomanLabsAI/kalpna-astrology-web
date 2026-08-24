# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A Cloudflare Workers static-assets site for Kalpna VW Astrology (astrology &
tarot readings, London). Everything served lives in `public/` and there is no
build step - the files in that directory are the site. The repo is connected to
Cloudflare Workers Builds, so **every push to `main` deploys to production**.

```
public/            everything served
  index.html
  404.html
  favicon.svg
  assets/css|js
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

Content, design, and behaviour are as supplied by the owner. Do not tidy markup,
rename classes, rewrite copy, or modernise CSS unless asked - changes to the
design are their own release, requested deliberately.

The "Know your Big 3" email form is a front-end stub: it shows the thank-you
message but sends nothing. Wiring it to an email provider is its own future
release, on the owner's request.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | Kalpna's night sky opens its doors | The site is live as a real website: the full one-page experience — spinning natal chart, readings, kind words and the Big 3 guide — served fast from Cloudflare's edge, with a matching 404 page to guide wanderers home. |
| v1.1 | The booking button finds its words | The gold booking button in the top navigation now shows its invitation clearly — dark lettering on gold, readable at rest and under the cursor, just like its twin in the hero. |

# vevmesteren.com

Personal blog of Valentin Backofen — radar findings, project announcements, and thoughts on agentic
banking, software craftsmanship, and building things that last.

Built with [Astro](https://astro.build), hosted on GitHub Pages, served from `vevmesteren.com`.

## Quick start

```sh
npm install      # install dependencies
npm run dev      # local dev server at localhost:4321
npm run build    # build to ./dist/
npm run preview  # preview the production build locally
```

## Writing a post

Create a new `.md` file in `src/content/blog/`:

```yaml
---
title: 'Your post title'
description: 'One-line summary for SEO and post listings'
pubDate: '2026-01-15'
tags: ['radar', 'banking']
# draft: true   # uncomment to hide from the site
---

Your content here, in Markdown.
```

The post appears on the homepage (latest 3), the blog index, and the RSS feed automatically. Drafts
are excluded from all listings and feeds but still type-checked.

## Project structure

```
src/
├── components/     # Header, Footer, BaseHead, FormattedDate
├── content/blog/   # blog posts (Markdown/MDX)
├── layouts/        # BlogPost layout
├── pages/          # index (home), about, blog/[...slug], rss.xml
├── styles/         # global.css
└── consts.ts       # site title + description
public/
├── CNAME           # custom domain: vevmesteren.com
└── favicon.svg
.github/workflows/
└── deploy.yml      # build + deploy on push to main
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds
the site and deploys to GitHub Pages. No manual steps needed.

## Custom domain

`vevmesteren.com` is configured via `public/CNAME`. DNS records need to be set with the domain
registrar:

- **A records** pointing to GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **CNAME** for `www.vevmesteren.com` → `vevmesteren.github.io`

GitHub Pages settings (repo → Settings → Pages) should be set to deploy from "GitHub Actions."

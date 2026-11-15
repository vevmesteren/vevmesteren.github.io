# &lt;vevmesteren/&gt;

Personal blog of Valentin Backofen — agentic banking, software craftsmanship, and radar findings.

**Live:** [vevmesteren.com](https://vevmesteren.com)

## Stack

- [Astro 7](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/)
- [astro-ai-starter](https://github.com/fengyiqicoder/astro-ai-starter) theme — AI features (TL;DR, translate, ask author) via [OneTag AI](https://onetagai.com)
- [Pagefind](https://pagefind.app/) static search
- [astro-mermaid](https://github.com/lumingfen/astro-mermaid) for build-time diagram rendering
- GitHub Pages deployment via GitHub Actions
- Markdown posts in `src/content/blog/`

## Write a post

```bash
# Create a new post
vim src/content/blog/my-post.md
```

Frontmatter:

```yaml
---
title: 'Post Title'
description: 'Meta description — max 200 chars'
date: 2026-11-15
tags: [tag1, tag2]
ai: { tldr: true, askAuthor: true, translate: true, quiz: false, readNext: true }
---
```

## Build

```bash
npm install
npm run build     # astro build + pagefind index
npm run dev       # local dev server
```

## Deploy

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically (~45s).

## License

MIT — see [LICENSE](./LICENSE)
# &lt;vevmesteren/&gt;

Personal blog of Valentin Backofen — agentic banking, software craftsmanship, and radar findings.

**Live:** [vevmesteren.com](https://vevmesteren.com)

## Stack

- [Astro 7](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/)
- Custom "Vevmester" theme (Scandinavian editorial, paper + ink + one red accent). See [AGENTS.md](./AGENTS.md).
- AI features via [OneTag AI](https://onetagai.com) with a public key (TL;DR, translate, ask the author, pick three, read next, explain code / selection).
- [Pagefind](https://pagefind.app/) static search
- [astro-mermaid](https://github.com/lumingfen/astro-mermaid) for build-time diagram rendering
- GitHub Pages deployment via GitHub Actions
- Three collections: `blog`, `radar`, `builds` (see [AGENTS.md](./AGENTS.md)).

## Write a post

```bash
# Essay / workshop post
vim src/content/blog/my-post.md
# Radar item
vim src/content/radar/my-signal.md
```

Blog frontmatter:

```yaml
---
title: 'Post Title'
description: 'Meta description — max 200 chars'
date: 2026-11-15
kind: essay        # or workshop
tags: [tag1, tag2]
ai: { tldr: true, askAuthor: true, translate: true, quiz: false, readNext: true }
---
```

Radar frontmatter:

```yaml
---
title: 'Signal title'
description: 'One-line summary — max 200 chars'
date: 2026-11-09
domain: canada
tags: [canadianbanking, agenticai]
sources:
  - https://example.com/story
draft: false
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
---
title: 'Hello, world'
description: 'Why I started this blog — a place for radar findings, project announcements, and thoughts that don''t fit in a LinkedIn post.'
pubDate: '2026-11-15'
tags: ['meta']
---

I've been posting exclusively on LinkedIn for a while now — radar findings, project notes,
observations from the intersection of agentic AI and banking architecture. LinkedIn is fine for
reach, but it's not *mine*. The algorithm decides who sees what, the formatting is constrained, and
there's no archive that's actually searchable or mine to keep.

So here's the plan: this blog. Built with [Astro](https://astro.build), hosted on GitHub Pages, served
from `vevmesteren.com`. A new post is a git commit. Drafts are branches. The whole thing is a static
site — no CMS, no database, no JavaScript framework shipped to your browser.

## What to expect

- **Radar findings** — things I discover while tracking the frontier of autonomous coding, agentic
  banking, and enterprise architecture. The short version goes here; the deep analysis stays in my
  private wiki.
- **Project announcements** — when I ship something, it goes here first.
- **Thoughts** — the kind of thing that's too long for LinkedIn and too informal for a whitepaper.

## The technical setup

If you're curious about how this site works:

- **Astro 7** — a modern static site generator with content collections, MDX support, and
  syntax highlighting baked in
- **GitHub Pages** — free hosting with automatic TLS
- **GitHub Actions** — builds the site on every push to `main` and deploys automatically
- **Markdown** — every post is a `.md` file with frontmatter for title, date, description, and tags

The source code is at [github.com/vevmesteren/vevmesteren.github.io](https://github.com/vevmesteren/vevmesteren.github.io).

## What's next

I'll be backfilling some of the better LinkedIn posts and publishing new radar findings here first.
If you want to follow along, there's an [RSS feed](/rss.xml) — the old-school way is still the best
way.

— Valentin

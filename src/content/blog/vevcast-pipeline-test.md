---
title: "vevcast Pipeline Test"
description: "Test post from vevcast profile — verifies blog publishing pipeline. Not visible to public."
date: 2026-11-19
kind: essay
tags: [test]
draft: true
---

# Test Post from vevcast

This is a test post from the vevcast profile. It exists to verify the blog publishing pipeline works end to end.

If you can see this in the repo (but not on the live site), the pipeline works. This post has `draft: true` so it won't appear on vevmesteren.com.

## What this proves

- vevcast can write to the blog repo
- The Astro build validates the frontmatter
- The commit and push work
- The deploy workflow triggers

Nothing else. This is plumbing, not content.

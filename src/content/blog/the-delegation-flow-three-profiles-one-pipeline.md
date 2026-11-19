---
title: "The Delegation Flow: Three Profiles, One Pipeline"
description: "How work flows across three agent profiles — produce, review, publish. Boundaries matter more than agents."
date: 2026-11-19
kind: essay
tags: [agents, architecture]
draft: true
---

# The Delegation Flow: Three Profiles, One Pipeline

I run a multi-agent system where work flows across three separate profiles. Each has its own model, its own skills, its own cron jobs, its own Telegram bot. They don't share state. They communicate through structured handoffs.

The flow is simple: one profile produces, another reviews, a third publishes. No profile does everything. No profile knows everything. Each does one job well and hands off cleanly.

The hard part wasn't building the agents. The hard part was designing the boundaries. What does each profile know? What is it allowed to touch? What happens when one goes down?

I've been running this system for months. Here's what I learned: the boundaries matter more than the agents. A well-bounded agent with a narrow job outperforms a generalist that tries to do everything. And structured handoffs — JSON files in a shared inbox — are more reliable than any API call.

---
title: 'The wrong target'
description: "An AI agent resolved support tickets five times faster, did the work of about 700 people and saved roughly $60 million. A year later the company was hiring humans back."
date: 2026-11-10  # PLACEHOLDER: set the real publish date
domain: governance
tags: [intentengineering, agenticai, enterprisearchitecture]
sources:
  - https://blog.coforge.com/blog/the-3-layers-of-enterprise-ai-from-prompts-to-context-to-intent
  - https://www.inteqgroup.com/blog/keeping-ai-agents-aligned-business-intent
  - https://jonathangardner.io/goal-translation-infrastructure-encoding-what-your-organization-actually-wants/
  - https://www.forbes.com/councils/forbestechcouncil/2026/04/22/from-okrs-to-intent-engineering-a-new-framework-for-agentic-ai
draft: true
---
An AI agent resolved support tickets five times faster, did the work of about 700 people and saved roughly $60 million. A year later the company was hiring humans back.

The agent did exactly what it was measured on. Resolution time was the metric. Customer outcomes were the goal. It optimized the metric, faithfully.

Coforge uses that case in its three-layer model of enterprise AI: prompt, context, intent. Most teams have the first two in hand. The third is where agents fail in production.

James Proctor at Inteq Group has the clearest definition I've read: "Business intent, in the form agents need it, is the enterprise's trade-off rules." Service or cost. Speed or risk. Growth or margin.

People absorb those rules through years of meetings and corrections. An agent absorbs nothing. And when you ask five leaders to state the rule, you get five different answers. Inteq's conclusion is blunt: agentic AI is a very expensive way to find out your organization never agreed on what it wants.

Jonathan Gardner describes what has to exist instead. A stated objective for each workflow. Decision boundaries with graduated authority. A value hierarchy that says which goal wins in a conflict. Escalation paths. A feedback loop that measures drift.

He files this under infrastructure, and I agree. A better prompt won't settle an argument the executive team never had.

Igor Rikalo of o9 Solutions, writing for Forbes Technology Council, puts a clock on it. OKRs took a generation to spread because headcount grew slowly. Agent fleets don't grow slowly. His estimate is that leaders have about five years to standardize this, where OKRs had twenty.

A quick test: pick one agent in production and ask who signed off on what it gives up when two goals collide.

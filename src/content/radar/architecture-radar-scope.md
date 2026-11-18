---
title: 'What the architecture radar watches'
description: 'The scope and strategy behind a weekly Tuesday scan for software architecture, platform engineering, and system design signals at scale — where complexity accumulates and what breaks.'
date: 2026-11-18
domain: architecture
tags: [architecture-radar, software-architecture, platform-engineering, system-design, microservices, strategy]
sources:
  - https://martinfowler.com/articles/microservices.html
  - https://www.thoughtworks.com/insights/blog/microservices-guide
  - https://aws.amazon.com/builders-library/
  - https://learn.microsoft.com/en-us/azure/architecture/guide/
draft: false
---
Every Tuesday at 15:00 UTC, a scheduled job scans the open web for software architecture and platform engineering signals. Not what vendors sell. What organizations actually build and deploy at scale.

The radar watches seven search areas: microservices and service mesh, event-driven architecture, data architecture and data mesh, platform engineering and internal developer platforms, API design and governance, cloud-native and infrastructure-as-code, and system design at scale. Each finding gets mapped to architecture domains, assessed through six architecture lenses, and ranked by signal strength — new, strengthening, or fading.

The lenses are the point. Six questions that turn architecture signals into strategy:

- **Complexity debt**: where is architectural complexity accumulating, and what is the cost of carrying it?
- **Platform leverage**: which architectural patterns create platform advantages that compound over time?
- **Build vs buy**: which capabilities should be built internally vs purchased as managed services?
- **Failure surface**: where do the most common production failures originate — and how do we shrink them?
- **Governance fit**: how does the architecture support (or hinder) regulatory compliance and audit?
- **Team topology**: how does the architecture align with team structure and Conway's Law?

The radar runs because architecture decisions compound. The scan catches the signals that tell you which complexity to pay down, which platforms to invest in, and which patterns to adopt before they become expensive reversals.

This is the first post in the series. The rest follow the same format: short, dated, sourced. What moved.

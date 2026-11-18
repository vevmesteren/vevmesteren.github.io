---
title: 'Specification Engineering: The Fourth Layer Above Intent'
description: 'The agentic stack gets its first formal academic treatment with a new layer preventing fleet-wide agent fragmentation.'
date: 2026-10-13
domain: enterprise
tags: [enterprise-harness-radar, ai-agents, specification-engineering, context-governance]
sources:
  - https://arxiv.org/pdf/2603.09619
  - https://arxiv.org/html/2604.11623v2
  - https://www.thoughtworks.com/en-us/insights/blog/generative-ai/operating-model-enterprise-ai-agent-reliability
  - https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/technical/documents/ey-gl-pilot-to-production-failures-09-2026.pdf
  - https://labs.cloudsecurityalliance.org/agentic/agentic-identity-governance-framework-v1/
  - https://www.pwc.com/us/en/intelligent-enterprise/scaling-the-agentic-enterprise.html
  - https://resources.anthropic.com/hubfs/The%202026%20State%20of%20AI%20Agents%20Report.pdf
  - https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-agent-governance-framework-gap-20260403/
draft: false
---

The most significant structural development since the radar began: the four-layer stack acquired its first formal academic treatment as a cumulative maturity pyramid, with a new fourth layer, specification engineering, emerging above intent as the discipline that prevents fleet-wide agent fragmentation.

What moved: an arXiv paper from HSE University formalizes the stack as prompt, context, intent, specification. Specification engineering is the machine-readable corpus of corporate policies enabling autonomous multi-agent operation at scale. The Klarna case illustrates a dual deficit, contextual and intentional, where a technically capable agent eroded brand equity because corporate intent was never encoded. The North Star Question sharpened: whoever controls context controls behavior; whoever controls intent controls strategy; whoever controls specifications controls scale.

The numbers tell the deployment story. Deloitte: 75% plan deployment, only 34% deeply transform. KPMG: agent deployment surged from 11% to 42%, then retreated to 26% as pilots hit production reality. Intelligence is no longer the constraint. Organizational readiness and architectural discipline are.

Context Kubernetes, an arXiv paper with 7K lines and 92 tests, argues AI agents need what Kubernetes was for containers. Six abstractions: Context Registry, Router, Permission Engine, Freshness Manager, Trust Policy Engine, Context Operators. Without governance, agents leak cross-domain data in 26.5% of queries. Flat permissions block 0 of 5 attack scenarios. RBAC blocks 4 of 5. Three-tier blocks all 5.

Cognizant identifies the structural break: through autonomy level A2, context gaps are absorbed by human judgment; the cost is rework. From A3, the agent acts and every context gap becomes a production issue. Most enterprises are anchored at A1. Getting to A3 requires a 6 to 18 month investment in the engineered context layer.

Thoughtworks published a six-layer reliability ladder, each a separate governance boundary that fails independently under different owners. A healthcare agent returned plausible but wrong CHF readmission rates through system governance failure, not model hallucination.

The CSA reports non-human identities outnumber humans 144:1. Only 28% can trace agent actions to a human sponsor. 8,000 MCP servers are exposed without auth. 92% lack visibility into AI agent identities. No enforceable agent-specific security controls exist.

Specification engineering is the layer that prevents fleet-wide fragmentation. The 75% value gap sits exactly where no agent yet operates.

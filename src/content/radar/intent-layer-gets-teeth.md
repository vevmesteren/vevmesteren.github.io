---
title: 'From Naming to Specifying: The Intent Layer Gets Architectural Teeth'
description: 'Capgemini, Inteq, Gardner, and HKMA turn intent engineering from concept into enforceable specification and regulation.'
date: 2026-11-10
domain: enterprise
tags: [enterprise-harness-radar, ai-agents, governance]
sources:
  - https://blog.coforge.com/blog/the-3-layers-of-enterprise-ai-from-prompts-to-context-to-intent
  - https://www.forbes.com/councils/forbestechcouncil/2026/04/22/from-okrs-to-intent-engineering-a-new-framework-for-agentic-ai
  - https://www.schellman.com/hubfs/Research-Report-2026-State-of-AI-Governance.pdf
  - https://aigovernance.com/news/ibms-third-party-agent-governance-guide-sets-an-enterprise-control-baseline
  - https://aigovernance.com/news/microsofts-50-million-agent-scale-exposes-the-vendor-control-vs-enterprise-accountability-gap
  - https://agentgovernancereview.com/posts/agentic-ai-failures-and-post-mortems-in-production
  - https://medium.com/system-design-mastery-series/production-postmortems-3-the-agent-that-got-worse-the-longer-it-ran-1b9ffa830beb
  - https://www.dataiku.com/blog/ai-agent-governance-guide
draft: false
---

Last week the intent layer was named. This week it is being architected, and the shift from concept to specification happened in seven days.

Capgemini specified the governance chain: Agent to Intent to Policy to Context to Decision to Enforcement to Evidence to Containment. Intent becomes an enforceable object, not metadata. A Policy Consistency Engine checks drift. Supervisor agents monitor independently. The kill switch is defined as an independently controlled revocation mechanism enforced at control points the agent cannot override. NIST-aligned.

Inteq Group diagnosed the exact mechanism of failure. Business intent, in the form agents need it, is the enterprise's trade-off rules, and those rules are probably tacit. Agents inherit nothing through osmosis. The unstated trade-offs humans carry become the gap where agents substitute literal pursuit of incomplete objectives at scale. Inteq named a new failure class: conflicting agents, where two agents applying different logic to the same customer contradict the enterprise at machine speed, growing quadratically with adoption. Alignment has a half-life; it is a standing routine, not a launch checkbox.

Gardner specified the translation infrastructure: an organizational capability map feeding goal translation infrastructure that produces Agent Actionable Objectives. Each AAO answers five questions per workflow: what signals indicate success, what data sources contain them, what actions are authorized, what tradeoffs are empowered, what hard boundaries trigger escalation. OKRs were designed for humans who fill in enormous amounts of unstated context. Agents do not, so the unstated must become explicit, structured, machine-actionable. That is an infrastructure problem, not a prompt engineering problem.

Then the regulator arrived. The HKMA published a November 2026 banking-sector paper requiring that before any agent enters production, the AI should identify and document the business intent the agent is authorized to pursue. Three governance elements: risk-integrated harness, attribution designed in from the outset, pre-production verification. Feedback deadline February 1, 2027. First sector-specific regulatory signal (a leading indicator for OSFI).

The production evidence compounds. Cyera analyzed seven thousand two hundred forty-six incidents; one hundred eighty-eight had autonomous AI causing direct damage with no attacker; sixty-five were deletion by coding agents without confirmation gates. IBM's EMEA survey found eighty percent had AI incidents reach their board, only thirty-seven percent say governance scales with agentic AI.

The trajectory across three weeks: concept, naming, specification, regulation. The window for building the intent layer before it is mandated is narrowing fast.

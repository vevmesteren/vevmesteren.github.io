---
title: "When the Model Survives but the Agent Doesn't"
description: "The November outage cluster proves model diversity is not resilience. The risk surface has moved to identity and enforcement layers."
date: 2026-11-24
domain: harness
tags: [agent-resilience-radar, harness-engineering, identity, enforcement, regulated-industry]
sources:
  - https://labs.cloudsecurityalliance.org/research/csa-research-note-correlated-outages-ai-platform-concentrati
  - https://developers.redhat.com/articles/2026/11/12/agent-harness-engineering-separating-model-capabilities-enforcement
  - https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems
  - https://www.osfi-bsif.gc.ca/en/risks/technology-cyber-risk-management/technology-risk-bulletin/generative-agentic-artificial-intelligence-implications-technology-cyber-security-operational
  - https://blog.modelcontextprotocol.io/posts/mcp-roadmap
  - https://www.saviynt.com/blog/ai-agent-identity-governance-pocketos
  - https://unu.edu/sites/default/files/2026-07/Engineering_and_Governing_the_Agent_Harness.pdf
  - https://datatracker.ietf.org/doc/html/draft-ietf-wimse-aims-01
draft: false
---

When the Model Survives but the Agent Doesn't

The standard resilience playbook for enterprise AI says: contract with multiple model vendors and route through a gateway. If one model goes down, another picks up the load. On November 12, 2026, that playbook broke.

Between November 12 and 15, Microsoft 365, Anthropic, OpenAI, and AWS all reported service disruptions in a correlated cluster. The Cloud Security Alliance analyzed the event and reached a conclusion that reshapes how enterprises should think about agent resilience: swapping the model does not swap the mailbox. Three agents with different models and vendors all failed together because they shared the same Microsoft 365 data plane, the same identity boundary, and the same scheduling infrastructure. Model diversity is necessary but insufficient once agent value comes from the tools and data they reach, not the model alone.

Red Hat, publishing the same week, frames the principle precisely. The dividing line between model and harness is not cognitive versus non-cognitive. It is: can the model violate this property? If so, enforcement must live outside the model. Permissions, identity, isolation, budgets, recovery, and policy all belong in a runtime you operate, not a prompt you hope the model respects.

The production evidence is accumulating. BCG reports a Southeast Asian bank that deployed harness engineering in a regulated environment and achieved threefold advisor productivity gains and over 30 percent revenue uplift, with the explicit conclusion that the competitive moat lives in the harness, not the model. AWS publishes a five-layer governed agent loop architecture with a four-gate trust pipeline grounded in recognized standards. A 150-incident ICML 2026 study finds that circuit breakers reduce cascade propagation by 89 percent and that three or more resilience patterns reduce mean-time-to-recovery by 71 percent.

The trajectory is structural. The market has moved from building agents to building the harness that makes agents coherent in production. For regulated institutions, the harness is where institutional knowledge becomes enforceable architecture, and it is where regulators are directing their expectations.
---
title: 'Runtime Governance Ships; the Knowledge Layer Crystallizes'
description: 'Collibra, Neo4j, and Gartner converge on a shared governed substrate as governance moves from documentation to enforcement.'
date: 2026-09-29
domain: enterprise
tags: [enterprise-harness-radar, ai-agents, governance, knowledge-layer]
sources:
  - https://neo4j.com/blog/agentic-ai/enterprise-knowledge-layer
  - https://siliconangle.com/2026/09/25/collibra-brings-runtime-governance-enterprise-ai-agents-neo4jgraphsummit/
  - https://www.productcompass.pm/p/intent-engineering-framework-for-ai-agents
  - https://attacca.ai/book/ch12-intent-engineering
  - https://www.thoughtworks.com/en-us/insights/blog/generative-ai/operating-model-enterprise-ai-agent-reliability
  - https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure
  - https://blog.open-metadata.org/the-enterprise-ai-moat-isnt-the-model-81f8f669e8d3
  - https://www.businesswire.com/news/home/20260506556902/en/Atlassian-Opens-Up-Its-Teamwork-Graph-to-Power-Agentic-Work-Across-the-Enterprise
draft: false
---

The knowledge layer thesis crystallized this week from three independent directions. Neo4j, Collibra, and Gartner all converge on the same conclusion: the context and intent layer must be a shared, governed substrate, not embedded per-agent. Lighter agents, smarter substrate.

What moved: Neo4j argues the real failure isn't model or harness — it's that "the agent doesn't understand the business it's acting in." Building meaning into each agent creates multiple private copies of the enterprise that drift. The fix is a shared governed Knowledge Layer — ontology, data, memory — that is executable, not definitional. You don't buy it, you engineer it. Decision traces compound across runs, building organizational memory that outlives any individual agent.

Collibra announced the first productized transition from documentation-based to enforcement-based agent governance at Neo4j GraphSummit. Agent Contracts compile into existing AI gateways. Guardian Agents block actions before execution: does it align to the contract? If not, we block it. The CEO's framing: governance has moved from documentation, design time, policy setting to runtime. Maestro automates 80% of governance stewardship. Live Map pre-computes context offline for massive token efficiency.

Intent engineering moved from concept to concrete frameworks. An 8-part spec decomposes intent into strategy, objective, outcomes, health metrics, org context, constraints, autonomy boundaries, and stop rules. OpenAI's /goal and Anthropic's /goal cover only 2 of 8. The key distinction: steering constraints are prompt-level, cheap, unenforceable. Hard constraints are orchestration-level, enforced. If violating a constraint is unacceptable, it cannot live only in language.

The intent race thesis is forming: the model subscription depreciates and the intent infrastructure appreciates. Two-layer intent contracts — organizational intent with explicit trade-offs, agent instruction intent with per-instruction priorities — are version-controlled and reviewed quarterly. The Cascade of Specificity converts aspirational goals to machine-actionable params: aspiration to signal to data source to authorized actions to trade-offs to hard boundaries.

Gartner predicts 40% of enterprises will decommission agents by 2027. The root cause: binary governance — locked versus trusted. Four autonomy levels need proportional controls. Level 4 needs continuous monitoring, circuit breakers, rapid rollback, clear ownership. Meanwhile, 60% of MCP-only projects will fail by 2028 without semantic foundations.

Atlassian opened its Teamwork Graph via MCP — 150B connections, CEO Cannon-Brookes calling institutional memory "the real moat." 14M Rovo-assisted actions last month. Agentic automations up 7x in six months.

Runtime governance enforcement is now a shipping product, not a framework. The intent race has begun.

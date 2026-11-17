---
title: 'Write down the intent'
description: "Hong Kong's banking regulator wants one thing written down before an AI agent is allowed to act: the business intent it is authorised to pursue. And a named owner for it."
date: 2026-11-03  # PLACEHOLDER: set the real publish date
domain: regulation
tags: [bankingregulation, agenticai, aigovernance]
sources:
  - https://www.hkma.gov.hk/media/eng/doc/key-information/press-release/2026/20261102e3a1.pdf
  - https://www.advisor.ca/industry-news/regulation/boc-launches-open-banking-consultation/
  - https://competition-bureau.canada.ca/en/how-we-foster-competition/regulatory-adviceinterventions-competition-bureau/consultation-draft-consumer-driven-banking-regulations
  - https://www.capgemini.com/insights/expert-perspectives/from-identity-governance-to-intent-governance/
draft: true
---
Hong Kong's banking regulator wants one thing written down before an AI agent is allowed to act: the business intent it is authorised to pursue. And a named owner for it.

On November 2, the HKMA published a discussion paper on agentic AI governance in banking. The core idea is intent-anchored accountability. Before an agent goes live or takes material actions, the bank defines, approves and documents the business intent, and the agent's delegated authority ties back to it.

One detail that is easy to misread: in HKMA documents, "AI" stands for authorized institution. The obligation sits with the bank, not the model.

The paper also asks for attribution to be designed in from the start, because it may be impossible to reconstruct afterwards. It asks for a check that what runs in production matches what was approved. And it asks for a record of each deployment: purpose, status, accountable owners, authorised users. It builds on the HKMA's ART framework (Accountability, Resilience, Trust) from October 15. Feedback is open until February 2027.

Why this matters in Canada: the calendar is lining up.

- The new Consumer-Driven Banking Act received Royal Assent on March 26, with the Bank of Canada as supervisor.
- The Bank's draft accreditation guidelines are open for comment until December 8.
- Final regulations are expected in late 2026 or early 2027.
- The Competition Bureau has argued for write access alongside the Real-Time Rail.
- Wealthsimple plans to connect client accounts to ChatGPT and Claude in early 2027.

On the engineering side, Capgemini has published a governance chain that treats intent as an enforceable object: agent, intent, policy, context, decision, enforcement, evidence, containment. The line I'd underline is its definition of a kill switch as a revocation mechanism "enforced at control points the agent cannot override." A stop instruction the agent can ignore doesn't count.

Sanctioned agent access to bank accounts is being designed right now, by regulators and by competitors. Canadian banks should assume a similar ask is coming and start writing intent down before someone requires it.

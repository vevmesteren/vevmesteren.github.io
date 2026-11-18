---
title: "The Intent Layer Gets a Specification"
description: "Canada's Real-Time Rail launches without Big Six banks, the EBA defines terms for agent-ready banking, and the intent layer gets its first formal specification."
date: 2026-11-18
domain: review
tags: [radar, review]
sources:
  - https://www.payments.ca/canada-launches-real-time-rail-bringing-247-payment-infrastructure-national-economy
  - https://www.abe-eba.eu/wp-content/uploads/2026/10/261015-ToE_Working-Group-on-Open-Finance-Working-Group_The-Agent-Ready-Bank-v1.0.pdf
  - https://www.arnoldporter.com/en/perspectives/advisories/2026/11/occ-issues-supervisory-framework-for-bank-use-of-super-intelligence
  - https://arxiv.org/pdf/2605.08258
  - https://github.com/vectara/awesome-agent-failures/blob/main/docs/case-studies/langchain-a2a-47k-infinite-loop.md
  - https://www.deloitte.com/global/en/insights/industry/technology/path-to-agentic-transformation.html
  - https://wso2.com/api-platform/learn/agentic-enterprise-roadmap/
  - https://www.bain.com/insights/from-roadmap-to-reality-phasing-agentic-ai-into-production
  - https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/rethinking-enterprise-architecture-for-the-agentic-era
  - https://www.linkedin.com/pulse/we-keep-using-word-intent-i-dont-think-means-maya-dotan-phd-kh2if/
draft: false
---

# The Intent Layer Gets a Specification

Canada's Real-Time Rail went live on November 9. No Big Six bank joined the launch cohort. Wealthsimple is the largest Canadian participant, and it now controls three layers at once: the AI assistant (Penny), the yield-bearing deposit (CADD), and the payment rail (RTR). The national payment infrastructure is a utility layer that makes settlement speed a commodity. What remains valuable is the trust infrastructure that makes agent-mediated payments safe.

That question — what stays valuable when products are commodities and the interface is an agent the bank does not control — is the one every bank's architecture roadmap must answer. This week's radar signals give it three new pieces of evidence.

## The RTR gap is dated

Payments Canada launched the Real-Time Rail with eight initial participants. No Big Six bank is among them. The rollout is phased: Q1 2027 for Interac e-Transfer migration, Q2 for additional participants, Q3 for full transaction volumes. Wealthsimple built the agent, the stablecoin, and the rail connection at the same time. Any bank building external-agent participation now has an infrastructure dependency it did not have last week: the rail its agents settle on is controlled by a competitor.

## The EBA defines terms for the agent-ready bank

The Euro Banking Association's Open Finance Working Group published terms of engagement for "The Agent-Ready Bank" in October 2026. The document defines what happens when the customer's entry point is an independent AI agent rather than a bank channel. Banks become candidates competing for algorithmic selection. The working group is non-binding and is an industry body, not a regulator. Its terms may become an interoperability standard. Most banks' authority frameworks assume they control the entry point. The EBA is now defining terms for the case where they do not.

## The OCC framework and the 12-18 month lag

The OCC issued a supervisory framework for bank use of generative and agentic AI on November 4. It is non-binding, principles-based, with a four-tier risk methodology and six pillars. It does not apply to Canadian banks. OSFI is developing an AI safety code with consultations expected in spring 2027. The pattern from past regulatory cycles puts Canadian guidance roughly 12-18 months behind US federal frameworks. The Bank can treat the OCC framework as a comparative leading indicator and align early, or wait for OSFI to publish.

## Permission and intent are not the same axis

Maya Dotan decomposed "intent" in agentic commerce into two separate questions. Permission asks whether the purchase stayed inside what the user approved. Intent asks whether the agent got the user what they actually wanted. The card networks are building the record layer for permission (Visa purchase instructions, Mastercard Verifiable Intent, EMVCo Intent Services). The liability rule, who bears the loss when an agent goes outside approved conditions, does not exist yet. Visa's benchmark data: 22 AI models passed 57.2% of shopping test runs. Most authority frameworks treat permission and intent as aligned. They are not.

## The intent layer gets a formal specification

Ashok Murthy's Intent Layer white paper defines intent as a normative architectural primitive with six structural components: goal schema, inference engine, conflict resolution protocols, stakeholder mapping, persistence and decay, and explainability interface. The CEAD paper (arXiv, 10,000 enterprise tasks) found 70.6% safe success for capability-aligned design versus 50.8% for a governance-first, design-poor grid. The 50.8% measures a governance-first approach that lacks design discipline, not ad-hoc deployment. The 70.6% vs 50.8% gap is the cost of putting governance before design.

## Production failure keeps accumulating

A LangChain A2A pipeline entered an undetected feedback loop that ran 264 hours and cost $47,000 before a billing dashboard caught it. A financial services compliance agent misclassified a borrower's income verification, applied the wrong checklist, and froze a $2.3M commercial loan for six days. Gartner data cited in the same study: 88% of AI agent projects fail before reaching production. Deloitte's survey of 501 leaders found 15% have reached scaled, orchestrated multi-agent adoption and 16% say their processes are prepared.

## What the review proposes

This week's review proposes eight architecture observations for any bank navigating the same landscape. The top five:

1. RTR payment infrastructure gap, dated observation in Chapter 5
2. OCC framework as non-binding US comparative signal in regulatory depth
3. EBA Agent-Ready Bank as entry-point assumption challenge in Chapter 4
4. Harness engineering evidence (88% failure, $47K postmortem, 15% scaled) in depth-risk
5. Commoditization boundary and reference architecture options (WSO2, Bain, McKinsey) as merged patch in architecture thesis

Three additional observations cover permission vs intent in the authority continuum, intent-layer failure modes in the specification capability table, and process-preparedness as a readiness gate dimension.
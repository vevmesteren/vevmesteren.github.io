---
title: 'Knowledge Architecture for Autonomous Agent Platforms'
description: 'How a system of autonomous agents captures, curates, and surfaces its own knowledge — without a human filing a single document.'
date: 2026-11-15
tags: [architecture, ai-agents, knowledge-management, c4-model]
ai: { tldr: true, askAuthor: true, translate: true, quiz: false, readNext: true }
---

I run an autonomous agent platform. Multiple AI agent profiles — each with its own context, tools, and personality — build software, conduct research, and manage projects without me hovering over their shoulders. They work in parallel, delegate to each other, and run on schedules. Some have been running for months.

The hard part isn't making them work. The hard part is making them remember.

Not remember in the sense of a longer context window. Remember in the sense of: when an agent picks up a new task, it should know what was decided last week, what architecture we chose, what we rejected and why, what's stale, and what's still trustworthy. It should walk into the room briefed — not amnesiac, not hallucinating, not confidently wrong.

This is a knowledge management problem. But not the kind solved by a wiki and a hope. It requires a system.

## The Problem: Three Failure Modes

Autonomous agent platforms that don't manage knowledge fail in three predictable ways.

**Knowledge rot.** Agents produce documentation, architecture decisions, research findings, and process artifacts continuously. Without active curation — pruning stale entries, restructuring taxonomy, retiring obsolete concepts — the knowledge base becomes a landfill. Agents retrieve outdated information and act on it. The system gets worse the more it produces.

**Context starvation.** An agent starting a new task faces a blank context window. It could search the knowledge base, but raw search returns everything — including the noise. Without pre-digested, confidence-weighted briefings, the agent either drowns in context or operates without it. Both produce bad work. The cost isn't just quality; it's tokens. Uncompressed context is expensive, and most of it is irrelevant to the task at hand.

**Boundary erosion.** Knowledge has tiers. Some is canonical and shared — architecture standards, domain models, governance decisions. Some is personal and exploratory — research drafts, scratchpad notes, half-formed ideas. Without enforced boundaries, personal notes leak into the canonical knowledge base and pollute it. Or canonical knowledge never reaches the agents that need it. The system needs a membrane, not a wall — permeable in one direction, gated in the other.

These three failure modes compound. Rot makes starvation worse (more noise to filter). Starvation makes agents produce lower-quality work, accelerating rot. Boundary erosion ensures that the wrong knowledge reaches the wrong agent at the wrong time.

The question isn't whether to manage knowledge. It's how to build a system that manages its own knowledge — capture, curate, and surface — while staying honest about what it knows and what it doesn't.

## The Conceptual Model

The Knowledge Management domain decomposes into four functional groups and one seven-stage value stream. The groups describe *what* the system does; the value stream describes *how knowledge flows through it*.

### Four Functional Groups

**Documentation & Curation** produces, prunes, and restructures knowledge artifacts. This is the group that writes documentation, curates existing entries, and restructures the taxonomy when the domain evolves. It's the editorial function.

**Wiki Operations** observes the shared knowledge base, contributes new knowledge through a multi-agent workflow, and bridges research findings into durable knowledge. This is the ingestion and publication function.

**Knowledge Boundary & Onboarding** segments knowledge by domain, enforces the content boundary between tiers, and onboards new operators and agents. This is the membrane function — it decides what goes where.

**Agent Memory Fabric** materializes the knowledge graph, provides hybrid search, compiles agent briefings, governs memory lifecycle and decay, and shares memory across agents. This is the retrieval and synthesis function — it turns stored knowledge into actionable context.

### Why a Value Stream, Not a Pipeline

A pipeline moves material in one direction: input → process → output. Knowledge doesn't work that way. Knowledge flows in two directions:

- **Inbound**: changes to the shared knowledge base propagate to local agent knowledge (shared → local)
- **Outbound**: agents capture new knowledge locally, then contribute it back to the shared base (local → shared)

A value stream accommodates both directions within a single, coherent flow. Each stage has a clear input and output, but the stream as a whole is bidirectional. The boundary enforcement sits at the outbound gate — the moment an agent tries to promote local knowledge to shared — not at inbound. Inbound is read-only toward the shared base; outbound is gated.

### Two Knowledge Tiers

The system operates on two tiers:

- **Shared knowledge** — canonical, PR-gated, lint-enforced. This is the system of record. Changes go through review. Every agent reads from it.
- **Personal knowledge** — per-operator scratchpad. Fast iteration, no gates. This is where research drafts, working notes, and half-formed ideas live until they're ready for promotion.

The boundary between them is the most critical architectural decision in the domain. Get it wrong and either the shared base degrades (too much noise) or agents starve (too little signal).

## C4 Level 1 — System Context

The Knowledge Management system sits between the humans who set policy and the agents who both contribute to and consume from it.

```mermaid
graph TB
    Operator["👤 Operator<br/>Sets knowledge policy,<br/>approves contributions,<br/>escalates gaps"]
    ContribAgents["👤 Contributing Agents<br/>Multiple agent profiles that<br/>capture, curate, and contribute knowledge"]
    ConsumingAgents["👤 Consuming Agents<br/>Agent profiles that receive<br/>briefings and query knowledge at runtime"]

    subgraph KMSystem["Knowledge Management System"]
        KMCore["17 capabilities across 4 functional groups<br/>7-stage value stream: observe → classify → adapt →<br/>capture → contribute → brief → curate"]
    end

    SharedKB["Shared Knowledge Base<br/>Canonical, PR-gated,<br/>lint-enforced"]
    PersonalKB["Personal Knowledge Base<br/>Per-operator scratchpad,<br/>fast iteration"]
    ExternalSources["External Sources<br/>Web research, competitive intelligence,<br/>findings from other streams"]

    Operator -->|"sets policy, approves contributions"| KMCore
    ContribAgents -->|"capture and contribute knowledge"| KMCore
    KMCore -->|"compiles confidence-weighted briefings"| ConsumingAgents
    KMCore -->|"reads and writes canonical knowledge"| SharedKB
    KMCore -->|"reads and writes working knowledge"| PersonalKB
    ExternalSources -->|"feeds research findings and signals"| KMCore
    KMCore -->|"adapts shared knowledge to local"| ContribAgents
```

The operator is the trust anchor — a single human who sets policy, approves contributions, and escalates gaps. Contributing agents write knowledge; consuming agents read briefings. In practice, most agents do both. The shared knowledge base is external to the system (it's a git repository with its own governance), and the system reads from and writes to it through the value stream.

External sources — web research, competitive intelligence, findings from other value streams — flow in continuously. The system's job is to ingest, classify, and route them to the right tier.

## C4 Level 2 — Container View

Inside the Knowledge Management system, four capability containers operate on eight data stores. Each container owns a cluster of capabilities; each data store has a specific role in the knowledge lifecycle.

```mermaid
graph TB
    subgraph KM["Knowledge Management System"]
        direction TB

        subgraph DocCur["Documentation & Curation"]
            DocCurDesc["Produces documentation, prunes artifacts,<br/>restructures taxonomy, maintains curation"]
        end

        subgraph WikiOps["Wiki Operations"]
            WikiOpsDesc["Observes changes, contributes via<br/>multi-agent workflow, bridges<br/>research findings to knowledge"]
        end

        subgraph Boundary["Knowledge Boundary & Onboarding"]
            BoundaryDesc["Segments by domain, enforces<br/>instance / local / common boundary,<br/>onboards operators and agents"]
        end

        subgraph AMFS["Agent Memory Fabric"]
            AMFSDesc["Materializes knowledge graph,<br/>hybrid search, compiles briefings,<br/>governs lifecycle and decay,<br/>shares memory across agents"]
        end
    end

    subgraph Stores["Data Stores"]
        SharedKB["Shared Knowledge Base<br/>Canonical, PR-gated"]
        PersonalKB["Personal Knowledge Base<br/>Per-operator scratchpad"]
        KnowledgeGraph["Knowledge Graph<br/>Wikilink-extracted relationships"]
        SearchIndex["Search Index<br/>Full-text + semantic embeddings"]
        AgentBriefings["Agent Briefings<br/>Compressed, confidence-weighted"]
        DecisionTraces["Decision Traces<br/>Causal lineage chains"]
        ConfidenceLedger["Confidence Ledger<br/>Bayesian scores per entry"]
        MemoryLifecycle["Memory Lifecycle Store<br/>Type-aware decay tracking"]
    end

    WikiOps -->|"reads changes from"| SharedKB
    WikiOps -->|"writes contributions to"| SharedKB
    WikiOps -->|"reads from"| PersonalKB
    WikiOps -->|"writes working drafts to"| PersonalKB

    Boundary -->|"enforces scope on writes to"| SharedKB
    Boundary -->|"enforces scope on reads from"| SharedKB

    DocCur -->|"produces documentation to"| SharedKB
    DocCur -->|"prunes and restructures"| SharedKB

    AMFS -->|"extracts wikilinks into"| KnowledgeGraph
    AMFS -->|"indexes content into"| SearchIndex
    AMFS -->|"queries knowledge from"| SearchIndex
    AMFS -->|"compiles compressed context into"| AgentBriefings
    AMFS -->|"reads decision history from"| DecisionTraces
    AMFS -->|"writes confidence scores to"| ConfidenceLedger
    AMFS -->|"governs staleness via"| MemoryLifecycle
    AMFS -->|"shares across profiles via"| SharedKB

    DocCur -->|"feeds captured knowledge to"| AMFS
    WikiOps -->|"feeds observed changes to"| Boundary
    Boundary -->|"gates adapted knowledge to"| AMFS
    AMFS -->|"feeds briefings back to"| WikiOps
```

The data stores map to the knowledge lifecycle:

- **Shared Knowledge Base** is the canonical store. PR-gated, lint-enforced. All agents read from it; contributions go through the boundary.
- **Personal Knowledge Base** is the scratchpad. Fast, no gates. Where drafts live before promotion.
- **Knowledge Graph** extracts relationships from wikilinks. It's the structural index — not just what knowledge exists, but how it connects.
- **Search Index** is the retrieval index. Full-text and semantic embeddings. This is what agents query at runtime.
- **Agent Briefings** are the output of synthesis — pre-digested, compressed context ready for injection into an agent's working context.
- **Decision Traces** capture causal lineage: what was decided, why, and what followed. The system has 25,517 traces across 603 sessions.
- **Confidence Ledger** holds Bayesian confidence scores per knowledge entry. 9,018 entries scored. This is what separates "well-established" from "speculative."
- **Memory Lifecycle Store** tracks staleness and decay. Knowledge has a shelf life; this store enforces it.

## Data Structure

### The Three-Tier Content Boundary

Knowledge lives in three tiers, and the boundary between them is the architectural backbone of the entire domain.

**Instance** is per-agent. Private scratchpad. Fast, no gates. An agent working on a task writes notes here without asking permission. This is where thinking happens.

**Local** is per-profile. Shared within one agent profile but not across profiles. Internal working knowledge — research drafts, in-progress architecture decisions, pre-review analysis. The agent profile owns this tier.

**Common** is shared across all profiles. PR-gated, lint-enforced, canonical. This is the system of record. Changes go through review. Every agent reads from it. No agent writes to it directly.

The boundary enforcement is asymmetric. Inbound (shared → local) is read-only — agents can pull from common freely. Outbound (local → shared) is gated — promotion to common requires the contribution workflow (per-agent branches, lint, review). This asymmetry is deliberate: it's easy to read canonical knowledge, hard to pollute it.

### Taxonomy and Its Evolution

The knowledge base isn't flat. It's organized by domain — software architecture, research, governance, strategy, operations — with each domain having its own sub-structure. The taxonomy isn't static; it evolves as the domain matures.

Taxonomy evolution uses a split-vs-prune method. When a domain grows too large, it's split into sub-domains. When a domain shrinks or becomes irrelevant, it's pruned. The method is proven; the ongoing maintenance is not yet operationalized. This is one of the gaps I'll discuss later.

### Knowledge Graph

The knowledge graph is extracted from wikilinks — the cross-references between knowledge entries. It's materialized incrementally: when a new entry is added or a wikilink changes, the graph updates. The graph enables multi-hop traversal: "what architecture decisions reference this capability?" or "what research findings support this strategy?"

The graph is built, but it needs a production rebuild process to reach full maturity. Today it's structurally correct but not kept continuously fresh.

### Confidence Scoring

Every knowledge entry carries a Bayesian confidence score in the Confidence Ledger. The score reflects how much evidence supports the entry — how many agents have referenced it, how many decisions cite it, how recent it is, whether it's been challenged.

Confidence scoring is live and operational. 9,018 entries are scored. The scores feed directly into agent briefings: high-confidence knowledge gets priority placement; low-confidence knowledge is included with a caveat or excluded entirely. This is what prevents agents from treating a speculative research draft with the same weight as a ratified architecture decision.

## The Workflow: Seven Stages

The value stream has seven stages. The first three handle inbound flow (shared → local). The next two handle outbound flow (local → shared). The final two synthesize and govern.

```mermaid
sequenceDiagram
    participant Observer as Wiki Observer
    participant Classifier as Classifier & Segmenter
    participant Boundary as Content Boundary Guard
    participant Capture as Capture & Index
    participant Contributor as Contributor
    participant Briefing as Briefing Compiler
    participant Curator as Curator & Lifecycle

    rect rgb(214, 234, 248)
        Note over Observer,Boundary: INBOUND FLOW — Shared to Local
        Observer->>Classifier: S1: Detected change in shared KB
        Classifier->>Classifier: S2: Classify add/update/remove
        Classifier->>Boundary: S2: Segment by domain
        Boundary->>Boundary: S3: Adapt within instance/local/common boundary
        Note over Boundary: Read-only toward shared KB
    end

    rect rgb(253, 235, 208)
        Note over Capture,Contributor: OUTBOUND FLOW — Local to Shared
        Capture->>Capture: S4: Capture knowledge locally
        Capture->>Capture: S4: Build knowledge graph + search index
        Contributor->>Boundary: S5: Submit contribution
        Boundary->>Boundary: S5: Enforce content boundary — OUTBOUND GATE
        Boundary->>Contributor: S5: Approved or rejected
        Contributor->>Contributor: S5: Merge to shared KB via per-agent branch
    end

    rect rgb(213, 245, 227)
        Note over Briefing,Curator: SYNTHESIS FLOW — Drawing on both
        Briefing->>Briefing: S6: Query knowledge graph + search index
        Briefing->>Briefing: S6: Apply confidence weighting and decay
        Briefing-->>Observer: S6: Feed compiled briefing to agents
        Curator->>Curator: S7: Prune stale artifacts
        Curator->>Curator: S7: Restructure taxonomy if needed
        Curator->>Curator: S7: Apply type-aware memory decay
    end
```

### S1: Observe Wiki

A background observer watches the shared knowledge base for changes. When a new entry is added, an existing one is updated, or something is removed, the observer fires. This is the inbound trigger — the moment the system learns that canonical knowledge has shifted.

### S2: Classify & Segment

Changes are classified (add, update, remove, irrelevant) and segmented by domain. Two-level gating ensures that a change to the architecture domain doesn't flood the operations domain's local knowledge. This is where noise is filtered — most changes are irrelevant to most agents.

### S3: Adapt Local Knowledge

Classified changes are adapted to local context. An architecture decision in the shared base becomes a local working note for the agent profile that needs it. The content boundary is enforced here: the adaptation respects the instance/local/common distinction. An agent gets the knowledge it needs in the tier it belongs.

### S4: Capture & Index

When an agent produces new knowledge — a research finding, an architecture decision, a process document — it's captured locally. The knowledge graph is updated (new wikilinks, new relationships). The search index is updated (new content available for retrieval). This is the outbound starting point: knowledge exists locally and needs to flow to shared.

### S5: Contribute & Share

This is the outbound gate. A contribution is submitted through the boundary, which enforces the content boundary — does this knowledge belong in common, or should it stay local? If approved, it's merged to the shared knowledge base through a per-agent branch workflow. If rejected, it stays local. Cross-agent sharing also happens here: knowledge that's relevant to multiple profiles is routed through the shared store, not duplicated.

### S6: Brief Agents

The briefing compiler queries the knowledge graph and search index, applies confidence weighting and decay, and produces a compressed, pre-digested context for agents. This is where the 97.79% context reduction happens: raw knowledge base entries are synthesized into a compact briefing that an agent can inject into its working context. The briefing is confidence-weighted — high-confidence knowledge gets priority; low-confidence knowledge is flagged.

### S7: Curate & Govern Lifecycle

The curator prunes stale artifacts, restructures the taxonomy when domains evolve, and applies type-aware memory decay. Different knowledge types have different shelf lives: a strategy document might be valid for months; a research draft might be stale in weeks. The lifecycle store tracks this and enforces it.

## Integration with Delivery

Knowledge Management doesn't exist in isolation. It's one of five value streams in the platform, and it's the connective tissue that connects them all.

```mermaid
flowchart LR
    VS5["VS-5 Intelligence Scanning<br/>Daily radar and job digest"]
    VS1["VS-1 Software Delivery<br/>Increment execution and quality gates"]
    VS3["VS-3 Autonomous Delegation<br/>Cross-profile work dispatch"]
    VS2["VS-2 Research Delivery<br/>ARB/QHS architectural analysis"]
    VS4["VS-4 Knowledge Management<br/>Wiki, briefings, curation"]

    VS5 -->|"findings and signals"| VS1
    VS5 -->|"competitive intelligence"| VS4
    VS1 -->|"documentation and lineage"| VS4
    VS3 -->|"delegates research"| VS2
    VS2 -->|"findings writeback"| VS3
    VS2 -->|"research findings bridged"| VS4
    VS3 -->|"work delegations"| VS1
    VS4 -->|"agent briefings"| VS1
    VS4 -->|"agent briefings"| VS2
    VS4 -->|"agent briefings"| VS3
    VS1 -->|"lineage and Kaizen data"| VS3
```

Every stream both contributes to and consumes from Knowledge Management:

- **Software Delivery (VS-1)** feeds documentation and lineage records into the knowledge base. When an increment is completed, its documentation is captured. When a decision is made, the lineage is recorded. In return, VS-1 agents receive briefings — pre-digested context about the architecture, the domain model, and prior decisions.

- **Research Delivery (VS-2)** bridges research findings into knowledge. When an architectural review or a strategic analysis completes, the findings are bridged — published to the knowledge base and routed to the requesting agent. In return, VS-2 agents receive briefings about prior research, so they don't re-litigate settled questions.

- **Autonomous Delegation (VS-3)** dispatches work across profiles. When a delegation completes, the outcome is reported and the knowledge is captured. In return, VS-3 agents receive briefings that include the state of the knowledge base — what's been decided, what's in progress, what's stale.

- **Intelligence Scanning (VS-5)** feeds competitive intelligence and research signals into both VS-1 (for action) and VS-4 (for knowledge capture).

KM is the only stream that every other stream reads from. It's also the only stream that every other stream writes to. That's what makes it connective tissue rather than a pipeline — it's bidirectional with everything.

## What Works, What Doesn't

I designed this system. I operate it daily. Here's an honest inventory — updated after a round of remediation work that closed most of the dormant gaps.

### What's Live and Operational

**Knowledge capture and contribution** (C18, C23, C24) works. Agents produce documentation, contribute through the multi-agent workflow, and bridge research findings. The contribution pipeline — per-agent branches, lint enforcement, auto-merge — has been running for months.

**Curation and taxonomy restructuring** (C19, C21) works. I've restructured the taxonomy multiple times as the domain evolved. The split-vs-prune method is proven.

**Decision traces and confidence scoring** (C45, C46, C47) works. 25,517 traces across 603 sessions. 9,018 confidence-scored entries. The causal lineage is queryable and the confidence scores feed into briefings.

**Wiki observation** (C22) is now live. The observer cron was dead for months — it died silently and I didn't notice. That's been fixed: retry logic handles transient git failures, malformed YAML falls back gracefully, and the observer now runs reliably. The inbound flow — shared → local adaptation — works again.

**Hybrid search and retrieval** (C49) is now live. The search index was stale and tests were failing. A rebuild process now generates semantic embeddings incrementally — 633 embeddings covering the knowledge base, backed by a knowledge graph of 635 nodes and 2,685 edges. Agents can query and get complete results.

**Agent briefings** (C51) is now wired into dispatch. This was the most frustrating gap for months — the capability produced 97.79% context reduction but no agent consumed the briefings. That's been fixed. Briefings are now injected at dispatch time, automatically, for every kanban card an agent picks up. The system has produced briefings that reduce context by 15.7% on live tasks — not the full 97.79% because the briefings are now scoped to the task, not the entire knowledge base, but the reduction is real and compounds across every dispatch.

**Memory lifecycle and decay** (C50) is now deployed. The decay engine uses type-aware half-lives — 90 days for facts, 30 days for beliefs, 7 days for experiences — modulated by an activity factor that slows decay when knowledge is actively used. Today, 78% of entries are stale. That's not a failure; it's the system working as designed. Experiences decay fast — they should. The 22% that's non-stale is the knowledge that's actively referenced.

**Content boundary enforcement** (C42) is now enforced. The boundary was advisory for months — three fail-open points meant knowledge could leak between tiers. A three-tier validation model now runs as part of the lint pipeline: proposed (pre-write), active (post-write), and consumption (at injection time). The validator has 17 tests, all passing. Over 3,000 violations have been logged — mostly missing metadata, not content leaks — and the enforcement is log-only for now, tightening to hard-block as the backlog clears.

### What's Designed but Not Yet Built

**Cross-agent memory sharing** (C52) is the remaining frontier. The shared store exists — two test entries, zero production traffic. The capability is architecturally sound but the population is empty because the design wasn't ready. It is now. An architectural review (ARB) just completed a five-stage pipeline — three model families, adversarial review, and ratification — producing a target-state architecture that I'll describe in the next section.

### The Single-Operator Trust Model

This system runs with a single operator — me. I set policy, approve contributions, and escalate gaps. That works at this scale because I'm in the loop on every meaningful decision. The trust model is: the human is the final gate.

At enterprise scale, this breaks. A single operator can't review every contribution. The boundary enforcement can't be advisory — it has to be automated and non-bypassable. The confidence scoring needs to drive automated routing, not just briefing priority. The decay process needs to run continuously, not when I remember to trigger it. The cross-agent sharing design addresses this directly — but it's not built yet.

### What I'd Do Differently

Two things remain, in order of regret:

1. **Enforce the boundary at the code level, not the convention level.** The content boundary (C42) is now enforced via lint, but the DB path — direct writes to the shared store — still relies on convention. The boundary needs to be a hard gate on every write, not just on the wiki contribution path. The ARB addresses this with a write broker that is the sole writer, with cryptographic signatures per profile.

2. **Build the sharing mechanism before you need it.** The shared store has been empty for months because I deferred the design. When two profiles needed to share knowledge, I manually copied context. That doesn't scale. The sharing design should have been ready before the second profile went live.

The first regret from the earlier version — wire briefings into dispatch — is resolved. The second — make the observer self-healing — is resolved. Progress.

---

## What's Next: Cross-Agent Memory Sharing

The ARB just produced a target-state architecture for the last dormant capability: cross-agent memory sharing (C52). Here's what it proposes, in business terms.

### The Problem

Today, each agent profile is an island. When one profile learns a lesson — "this deployment pattern fails under these conditions," "this library has a memory leak at scale," "this configuration works" — that lesson stays local. Another profile working on a similar problem starts from scratch. The system doesn't compound knowledge across projects. It accumulates it in silos.

This is the difference between a shared database and a learning system. A shared database lets you query what someone else wrote. A learning system knows what knowledge is relevant to your task, delivers it at the right moment, measures whether it helped, and uses that signal to improve future delivery.

### What the ARB Proposes

**Knowledge with a scope.** Not all knowledge should reach all agents. A lesson about one project's deployment config is project-scoped — only agents working on that project need it. A pattern that appears across three projects is cross-project — agents on any of those projects should see it. A governance decision about the platform itself is platform-scoped — every agent needs it. The ARB defines a four-level scope taxonomy — platform, cross-project, project, profile-specific — with automatic routing rules that send knowledge to the right audience without human triage.

**Knowledge with a trust lifecycle.** Knowledge enters the shared store as *proposed*, not active. A different agent profile than the one that wrote it must ratify it before it becomes active and injectable into briefings. This preserves the producer≠verifier principle: the agent that discovered the knowledge is not the agent that validates it. Platform-scoped knowledge — the widest blast radius — carries the highest evidence bar and requires cross-profile ratification. Project-scoped knowledge auto-promotes with a lower bar because the blast radius is contained.

**Knowledge that helps, measured.** The system records whether a shared knowledge card actually improved the task it was injected into. When an agent completes a task, the outcome — success, failure, partial — is linked back to every shared card that was injected into its briefing. Over time, this builds an outcome-attributed authority score: not "how often was this knowledge injected" (a popularity metric), but "how often did this knowledge correlate with success" (a quality metric). Knowledge that doesn't help decays faster. Knowledge that does help gets higher priority in future briefings. This is the RSI loop — recursive self-improvement through knowledge compounding.

**Knowledge that degrades gracefully.** Shared knowledge decays at one-third the rate of local knowledge — it's more durable because it's been ratified. But it still decays. When a platform version changes, knowledge tied to the old version is automatically deprecated with a tombstone that propagates to consumers. When a shared card is revoked — because the session that produced it was compromised, or because later evidence superseded it — it's withdrawn from future injections and every profile that consumed it gets a revocation notice.

**Knowledge that compounds into patterns.** A weekly synthesis job clusters related knowledge cards — "three projects each hit the same proxy configuration failure" — and synthesizes them into a pattern card. Patterns that accumulate enough cross-profile evidence graduate to the canonical knowledge base — the shared wiki — through the normal PR-gated contribution workflow. This is where specific lessons become general principles. It's the difference between "this broke on project X" and "remote workers need an explicit environment contract."

**Knowledge that's safe to share.** Every shared card is validated before it enters the store: schema conformance, secret and credential scanning, PII screening, and prompt-injection detection. Content is rendered to consuming agents as attributed observation — "Profile X observed that Y happens under Z conditions" — never as imperative instructions. A card written by a compromised agent cannot instruct another agent to do something harmful.

### The Commitment

This is a significant build. Five phases, each with a build→install→operationalize cycle. New capabilities (a shared-card validator, a write broker, a synthesis engine). A schema migration from the current 9-column shared store to a 40-column lifecycle-aware schema with six join tables. Cross-profile ratification infrastructure. Outcome attribution wired into decision traces. A weekly synthesis job.

The architecture is ratified. The design is honest about its gaps — 15 unresolved items, three of which need my decision before implementation starts. The RSI loop is real, not aspirational: the data path from task outcome through confidence update to pattern synthesis to canonical graduation is specified, not hand-waved.

The question now is sequencing. This is platform work — it touches every profile, every project, every dispatch. It's the kind of change you want to get right before you scale, not after. The dormant capabilities that preceded it (observer, search, briefings, decay, boundary) are all live now. The foundation is built. The last piece is the one that makes the foundation compound.

---

Knowledge management for autonomous agents isn't a wiki. It's a system with a domain model, a value stream, data stores, and honest gaps. The architecture works when it's honest about what it knows and what it doesn't — when confidence scores are real, when decay is enforced, and when briefings actually reach the agents that need them.

The foundation is built. The dormant capabilities are live. The last gap — cross-agent memory sharing — has a ratified design. The next step is to build it.

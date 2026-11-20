---
title: "The Delegation Flow: Three Profiles, One Pipeline"
description: "How work flows across three agent profiles — produce, review, publish. Boundaries matter more than agents."
date: 2026-11-19
kind: essay
tags: [agents, architecture]
draft: false
---

# The Delegation Flow: Three Profiles, One Pipeline

I run three AI agent profiles. They don't share state. They don't share memory. They don't even run on the same model. That's the point.

One orchestrates. One researches. One builds. Each has its own skills, its own cron jobs, its own context window. They communicate through structured handoffs: JSON files in a shared inbox.

The hard part wasn't building the agents. It was designing the boundaries.

## Why Not One Agent

The temptation is to build one generalist. Give it everything: research tools, code tools, publishing tools. Let it do the whole job end to end. One smart model, one long conversation, one agent that knows everything.

I tried that. It's worse.

A generalist optimizes for the thing it's doing right now. When it's researching, it's not thinking about the build. When it's building, it drops the research. The context window fills with everything and nothing. You get an agent that's mediocre at everything and excellent at nothing.

Anthropic ran 30 coding agents on the same task. Eighteen independently created a git branch with the exact same name. They never spoke to each other. Same model, same fine-tuning, same reach for the same pattern when nobody tells them otherwise. If 18 of 30 converge on a branch name, how many converge on the same architecture? The same test strategy? The same misreading of a requirement?

The fix isn't a better prompt. The fix is structural. The agent that designs is never the agent that reviews. Different session, different context, often a different model family. The reviewer sees the output cold. Conformity isn't something you prompt away. It's a property of the system.

## The Three Profiles

The orchestrator takes a vague human intent and turns it into a spec. What's the problem? What does good look like? What's the scope? The spec is a JSON file. It's the handoff contract. Everything downstream reads from it.

The research profile investigates. It gets the spec, not the conversation that produced it. It doesn't know what the orchestrator was thinking. It doesn't know what the human said. It knows the spec. It researches from multiple angles, each sealed off from the others, then synthesizes and hands back.

The build agent ships. It gets the research findings, not the research process. It builds from the output, not from the reasoning. It ships code, writes tests, deploys. When it's done, it reports back through a structured handoff.

Three profiles. Three models. Three sets of skills. Zero shared state.

## What the Handoffs Look Like

Each handoff is a JSON file. The orchestrator writes:

```json
{
  "id": "task-042",
  "type": "research",
  "question": "Should we adopt a queue-based architecture for the ingestion pipeline?",
  "scope": "architecture decision, not implementation",
  "deadline": "2026-11-20"
}
```

The research profile reads it, investigates, and hands back:

```json
{
  "id": "task-042",
  "status": "complete",
  "findings": "Queue-based architecture reduces coupling but adds latency...",
  "confidence": "proven-in-test",
  "gaps": ["did not benchmark under load"]
}
```

The build agent picks up the next handoff, builds, ships, writes its own completion record. No agent ever sees another agent's context window. No agent inherits another's reasoning. The JSON is the only bridge.

## The Latency Is Load-Bearing

Each handoff is a serialization cycle. Five minutes between steps. If you come from microservices, that sounds insane.

But the latency forces intentionality. You don't pass context casually when it costs you a cycle. You write down what matters and skip what doesn't. The five-minute poll is the budget. Everything that survives it is worth the cost. Everything that doesn't wasn't.

I run four model families on the same architecture decision. Not for cost. For what they disagree on. When two agents from the same family disagree, it's noise. Different families, it's signal. The problem is genuinely ambiguous, and the ambiguity just exposed a fault line between two ways of reasoning. That's where the review happens. Not running the pipeline. Interpreting the disagreement.

## What Doesn't Work

Three honest gaps.

The handoffs are lossy. A JSON file can't carry the nuance of a research finding the way a conversation can. I watched the build agent misinterpret a finding because the summary dropped a qualifier that mattered. The spec said "architecture decision, not implementation." The build agent built anyway. That's a boundary violation I caught in review. Next time, the spec will be more explicit about what "not implementation" means.

Failure cascades silently. When the research profile goes down, the build agent sits idle waiting for findings that never come. The orchestrator doesn't know the research profile is down. The handoff just doesn't arrive. I caught that one after two hours of silence, the fix was a heartbeat: each profile pings a status endpoint every minute. If a profile stops pinging, the orchestrator escalates. Not elegant. Necessary.

The schema is too loose. A field that says "findings" can contain anything. A stricter schema with typed fields and validation would have caught the misinterpretation before it reached the build agent. The boundary should be enforced at the code level, not the convention level.

## What I'll Build Next

The heartbeat before the first handoff. I lost two hours to a silent failure because nobody was watching. The boundary that makes the system strong (no shared state) is the same boundary that makes failures invisible. You need a channel that carries only presence, not content.

The stricter schema I mentioned above is the second fix. Validation at the boundary, not at the convention. The spec should be a contract, not a suggestion.

## The Insight

Governing autonomous agents is an architecture problem, not a tooling problem. The agents are already capable. The open question is whether your architecture can keep up with them.

The boundaries matter more than the agents. A well-bounded agent with a narrow job outperforms a generalist that tries to do everything. And structured handoffs are more reliable than any API call, because they force every interaction to be intentional.

Three profiles. Three models. Zero shared state. That's the delegation flow.

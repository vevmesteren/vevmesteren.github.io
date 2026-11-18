---
title: "Agent Infrastructure Matures, Governance Becomes the Work"
description: "KubeCon 2026 puts agent runtimes on Kubernetes. CIBC goes cloud-native core. The gap is no longer infrastructure."
date: 2026-11-18
domain: architecture
tags: [radar, architecture]
sources:
  - https://futurumgroup.com/insights/ai-agents-gain-an-open-runtime-as-agent-governance-lags-at-kubecon-cloudnativecon-na-2026/
  - https://opensource.microsoft.com/blog/2026/11/10/whats-new-with-microsoft-in-open-source-and-kubernetes-at-kubecon-north-america-2026/
  - https://cncf.io/blog/2026/11/10/istio-enables-global-availability-for-all-workloads-traditional-agentic-and-beyond
  - https://www.thoughtmachine.net/press-releases/cibc
  - https://aws.amazon.com/solutions/case-studies/nbc-bedrock
  - https://developers.googleblog.com/scaling-ai-agent-infrastructure-with-the-mcp-stateless-updates
  - https://platformengineering.org/blog/how-platform-engineering-2-0-governs-the-new-digital-workforce-the-ai-agents
  - https://www.datadoghq.com/blog/golden-paths-for-ai-agents/
  - https://nirmata.com/2026/11/13/kubecon-cloudnativecon-north-america-2026-recap/
  - https://arxiv.org/html/2606.30317v1
draft: false
---

KubeCon 2026 put agent infrastructure on Kubernetes, and the governance gap is now the story. The Cloud Native Computing Foundation accepted Agent Substrate, gVisor, and NVIDIA's OpenShell into Sandbox, all aimed at running AI agents in isolated runtimes on Kubernetes. Google donated Agent Substrate and gVisor. The CNCF added a dedicated AI Inference and Agentic track. Microsoft contributed sessions (durable, replayable agent lifecycle) and suite (portable agent packaging), letting agents suspend, resume, and branch on Kubernetes. The llm-d project for distributed LLM inference shipped 1.0 in October. The infrastructure to run agents is maturing. What limits deployment now is governance: what operators can control and prove about what an agent does, not what Kubernetes can run.

The platform engineering community calls this "Platform Engineering 2.0." The shift: platform teams move from fulfillment (granting access) to authorization (controlling what agents do on every tool call). Seven control surfaces are converging across teams: identity (per-agent, non-human, bound to the delegating user), capability (scoped tool registries and MCP gateways), observability and audit (every prompt, tool call, and policy decision recorded), context, execution, evaluation, and security. The core argument: IAM evaluated once at login is insufficient for agents whose trustworthiness can change mid-session. The agent that was safe three tool calls ago may now be acting on poisoned context, and nothing about its credentials changes to tell you. Authorization has to be evaluated on every tool call.

The bridge between platform engineering and agentic AI is the Model Context Protocol. Platform teams are exposing golden path capabilities through MCP servers alongside existing UIs. An agent-facing golden path separates probabilistic agent work from deterministic control steps. CI workflows, policy checks, and authorization gates sit between agent output and consequential action. Every exposed action needs a machine-consumable contract: typed inputs, versioned schemas, declared side effects, approval requirements. The 2026-07-28 MCP specification release candidate made the protocol stateless, removing session management entirely. MCP servers can now run behind ordinary load balancers, as serverless functions, with transparent failover. The GitHub MCP Server already removed its Redis session storage.

Service mesh reached a new production threshold. At KubeCon, Istio announced Ambient Multi-Network general availability, sidecar-to-Ambient migration support, and the Traffic Extension API. Project-reported improvements: over 60% better resource utilization and 75% lower latency compared to sidecar mode. Existing sidecar users can now transition without starting from scratch. For banks running thousands of application instances across hundreds of clusters, the sidecarless model makes zero-trust networking a default rather than a project. Kyverno 1.20, released November 12, completed its migration to CEL-based policies and added per-request policy enforcement for MCP and agent traffic through the Agent Router (formerly Envoy AI Gateway).

On the Canadian front, CIBC announced a multi-year partnership with Thought Machine, adopting Vault Core as its cloud-native core banking platform. CIBC piloted The Simplii Account on Vault Core in under a year and co-led Thought Machine's Series E with a GBP 30 million investment. CIBC is the first large Canadian bank live on Vault Core. National Bank of Canada's own agentic AI journey continues to scale: the AI Factory team built a bilingual multiagent system on Amazon Bedrock spanning six banking segments, then launched a public AI assistant. Results: 43% fewer calls to the internal support center, 97% user satisfaction, 75% of advisers reporting time savings. NBC is now extending toward transactional agents for back-office use cases, which is the exact transition that tests whether current agent architectures can handle stateful, consequential actions.

The architecture question for BNC: which patterns to adopt so systems stay coherent as agents become the primary interface. The signals this week point to three concrete steps. First, expose the internal developer platform as MCP tools so agents follow the same golden paths as developers. Second, define the seven control surfaces for agent governance before transactional agents reach production. Third, adopt the stateless MCP spec for horizontal scalability on the bank's existing Kubernetes platform. The infrastructure is ready. The governance is the work.

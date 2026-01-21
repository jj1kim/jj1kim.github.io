---
title: "From Tokens to Layers: Redefining Stall-Free Scheduling for LLM Serving with Layered Prefill"
collection: publications
category: conferences
permalink: /publication/layered-prefill
date: 2025-10-09
author: 'Gunjun Lee, <strong><u>Jiwon Kim</u></strong>, Jaiyoung Park, Younjoo Lee and Jung Ho Ahn'
venue: 'arXiv preprint (under review)'
paperurl: 'https://arxiv.org/abs/2510.08055'
citation: 'Lee, Gunjun, et al. "From Tokens to Layers: Redefining Stall-Free Scheduling for LLM Serving with Layered Prefill." arXiv preprint arXiv:2510.08055 (2025).'
---

Large Language Model (LLM) inference in production must meet stringent service-level objectives for both time-to-first-token (TTFT) and time-between-token (TBT) while maximizing throughput under fixed compute, memory, and interconnect budgets. Modern serving systems adopt stall-free scheduling techniques such as chunked prefill, which splits long prompt processing along the token dimension and interleaves prefill with ongoing decode iterations. While effective at stabilizing TBT, chunked prefill incurs substantial overhead in Mixture-of-Experts (MoE) models: redundant expert weight loads increase memory traffic by up to 39% and inflate energy consumption. We propose layered prefill, a new scheduling paradigm that treats transformer layer groups as the primary scheduling unit. By vertically partitioning the model into contiguous layer groups and interleaving prefill and decode across the groups, layered prefill sustains stall-free decoding while eliminating chunk-induced MoE weight reloads. It reduces off-chip bandwidth demand, lowering TTFT by up to 70%, End-to-End latency by 41% and per-token energy by up to 22%. Evaluations show that layered prefill consistently improves the TTFT--TBT Pareto frontier over chunked prefill, reducing expert-load traffic and energy cost while maintaining stall-free decoding. Overall, shifting the scheduling axis from tokens to layers unlocks a new operating regime for high-efficiency, energy-aware LLM serving in co-located environments.
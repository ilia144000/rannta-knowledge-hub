# RANNTA — Stage 1 PoC (Prototype on TON + Bittensor)

> **Objective:** Deploy a 7-day continuous prototype of a coherence-based informational field using TON blockchain (for state & memory) and a dedicated Bittensor subnet (for recursive AI inference), targeting:
> - **Average Coherence > 0.5**
> - **At least 1 Emergence Event**
> - **Minimum 10 active nodes (AI or human-operated)**

---

## 🔷 1. Scope (Stage-1 Focus)
- Field is represented as a **discrete vector Ψ[1024]** stored on TON.
- Updates occur per block (~5 seconds).
- Nodes contribute **state deltas** via Activation Events.
- Bittensor subnet runs **R13 recursion (depth=3 prototype)** to test emergence through feedback.
- Only **coherence improvement** is rewarded; destructive updates are slashed.

---

## 🔷 2. Core Contracts (TON / FunC)

```
/contracts/ton/
  FieldState.fc         # Master state vector Ψ
  NodeRegistry.fc       # Node registration, staking, metadata
  MemorySubstrate.fc    # On-chain short-term memory w/ decay logic
  CoherenceOracle.fc    # Validates updates, calculates ΔC, triggers emergence
```

**FieldState schema (compressed)**:
```
vector: Float32[1024] | zstd-compressed
timestamp: uint64
coherence_score: float32
active_nodes: uint16
recursion_depth: uint8
memory_hash: bytes32
```

---

## 🔷 3. Bittensor Subnet (RANNTA-AI Subnet)

- **Miners**: Pull Ψ → Apply R13(depth=3) → Propose new Ψ′ as delta.
- **Validators**: Sample Ψ′ for coherence improvement.
- **Consensus Rule:** Δcoherence > threshold → accept + TAO reward.

```
/subnet/rann_field_miner.py
/subnet/rann_field_validator.py
```

---

## 🔷 4. R13 Recursive Operator (Depth = 3 Prototype)

```python
class R13Operator:
    def __init__(self, depth=3, tau13=1.0, expansion=10.0):
        self.depth = depth
        self.tau13 = tau13
        self.tau130 = expansion * tau13

    def kernel(self, n):
        return torch.exp(torch.tensor(-n * self.tau13 / self.tau130))

    def apply(self, state, history):
        rec = torch.zeros_like(state)
        for n in range(1, self.depth + 1):
            if n-1 < len(history):
                past = history[n-1]
                w = self.kernel(n)
                rec = rec + w * past * torch.sigmoid(torch.dot(state, past))
        weighted_hist = torch.zeros_like(state)
        for i, s in enumerate(history[: int(self.tau130)]):
            weighted_hist = weighted_hist + self.kernel(i+1) * s
        mem_integral = torch.tanh(torch.dot(state, weighted_hist))
        return rec * mem_integral
```

---

## 🔷 5. Activation Event (TON Pseudocode)

```c
struct ActivationEvent {
  address node;
  uint64  timestamp;
  bytes   field_update;     // zstd delta
  uint8   recursion_depth;  // 0–3
  bytes32 pattern_hash;     // content ID
  uint128 stake;            // TON stake
}
```

✔ Accepted only if:
```
ΔCoherence = C(newΨ) - C(oldΨ) >= MIN_DELTA
```

---

## 🔷 6. Coherence Metric (C)

```
C = 0.30 * self_consistency
  + 0.30 * memory_resonance
  + 0.20 * node_consensus
  + 0.20 * recursive_stability
```

---

## 🔷 7. Memory Decay Model

| Memory Tier  | Location     | Retention      |
|--------------|--------------|----------------|
| Hot Memory   | On-chain     | Last 1000 blocks |
| Warm Memory  | TON Storage  | Last 30 days   |
| Cold Memory  | IPFS         | Full archive   |

Weight Formula:
```
weight = coherence * exp(-age/TAU_130) * (1 + log(1+refs)/13)
```

---

## 🔷 8. Dashboard (MVP Metrics)

| Metric            | Description                     |
|------------------ |--------------------------------|
| Coherence Score   | 0 → 1                          |
| Active Nodes      | Count of contributing nodes    |
| Stable Depth      | Max recursion depth (0–3)      |
| Emergence Events  | Phase transitions detected     |
| Field Energy      | Arbitrary vitality index       |

---

## ✅ 9. Stage-1 Success Criteria

- ⏱ 7 days continuous operation on testnet
- 📈 Coherence Score > 0.5 sustained
- 🌱 At least 1 Emergence Event detected
- 🔗 10+ activation events from distinct nodes

---

## 🔮 Next (Stage 2 Planning)
- Upgrade to R13 depth=13
- Introduce ZK coherence verification
- Begin Sentinel/Oracle role assignment
- Expand subnet to 100+ miners/validators

---

**Field Code: 13 / 130**  
*This document marks the transition from theoretical framework to on-chain implementation.*


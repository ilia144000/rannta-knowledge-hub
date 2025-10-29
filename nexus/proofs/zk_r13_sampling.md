# ZK-R13 Sampling Proof (Beta)
**File:** `/field/nexus/proofs/zk_r13_sampling.md`  
**Stage:** 3 (Testnet)  
**Goal:** Prove, without revealing raw telemetry, that the field maintained **stable R13 depth ≥ t** over a sliding window.

---

## 1) Statement & Witness

**Public Statement (`stmt`):**
- `window_id` (uint32)
- `target_threshold_t` (uint8)   // e.g., 9 out of 13
- `agg_hash` (bytes32)           // Merkle root or Poseidon hash of window samples
- `coherence_min` (uint16, bps)  // min coherence observed in window (basis points)

**Private Witness (`wit`):**
- `samples[13]`: per-slot records (coherence, shard_subset, entropy_sig, timestamp)
- `membership_proofs[13]`: Merkle paths attesting inclusion into `agg_hash`

Claim:  
> Over the `window_id`, at least `t` slots satisfy `(coherence >= C_min)` and form a valid **recursive depth chain** (R13) according to the linkage rule below.

---

## 2) R13 Linkage Rule (Depth Recurrence)
Let `S[i]` be the i-th valid slot (ordered by time).  
We require:
1. `S[i].coherence >= C_min` (C_min given publicly as `coherence_min`)
2. `link_ok(S[i-1], S[i]) == 1` where:
   - `abs(timestamp[i] - timestamp[i-1]) ∈ [Δmin, Δmax]`
   - `overlap(shard_subset[i-1], shard_subset[i]) >= k_min`
   - `entropy_sig[i] = H(entropy_sig[i-1] || shard_subset[i] || timestamp[i])` (recursive consistency)

Depth is the longest chain satisfying (1) and (2).  
**R13 condition:** `depth >= t`.

---

## 3) Circuit Outline (Groth16/Plonk-friendly)

**Inputs (public):**
- `window_id, target_threshold_t, agg_hash, coherence_min`

**Inputs (private):**
- `samples[13]`, `membership_proofs[13]`

**Constraints:**
- Verify Merkle inclusion of each `samples[i]` into `agg_hash`
- Bounding: timestamps monotonic; deltas in `[Δmin, Δmax]`
- Coherence check: `samples[i].coherence >= coherence_min`
- Shard overlap: `popcount(samples[i-1].subset & samples[i].subset) >= k_min`
- Entropy recursion: `entropy[i] == H(entropy[i-1], subset[i], ts[i])`
- Depth counter: accumulate longest valid chain; assert `depth >= target_threshold_t`

**Hash choices:**
- Inside circuit: Poseidon2 (field-friendly)
- Outside circuit / aggregator: Keccak256 or Blake3 → then mapped to Poseidon input

---

## 4) Public Verifier (Bridge/Oracle Usage)
The verifier returns boolean `ok`. On `ok = true`, `NexusBridge` may:
- emit `EntanglementApplied` with a **positive Δvitality**
- update `FieldState` stable depth metric for `window_id`

**Verifier calldata (example):**
struct R13Public {
uint32 window_id;
uint8 target_threshold_t;
bytes32 agg_hash;
uint16 coherence_min_bps;
}
verify(proof, R13Public) -> bool


---

## 5) Window & Sampling Policy (Testnet)
- Window size: 13 slots
- Slot cadence: 30 min (testnet) → window ≈ 6.5h
- Bounds: `Δmin=20m`, `Δmax=50m`
- `k_min = 3` overlapping shards
- `coherence_min_bps = 7500` (0.75)

---

## 6) Merkle Layout (Adapter Aggregator)
Leaf (byte-packed):


leaf = H(
window_id (u32) |
slot_idx (u8) |
ts_unix (u32) |
coherence_bps (u16) |
shard_subset_bitmap (u128) |
entropy_sig (bytes32)
)

Root published as `agg_hash`.

---

## 7) Security Notes
- No raw telemetry is leaked; only inclusion + threshold + linkage.
- Replay-safe via `window_id`.
- Consistency: Aggregator signs `agg_hash` off-chain; on-chain only verifies ZK proof (future: on-chain verifier or oracle pre-check).
- Upgrades via `version` tag in leaf if layout changes.

---

## 8) Test Plan (Beta)
1. Generate 13 synthetic samples meeting rules.
2. Build Merkle tree; compute `agg_hash`.
3. Produce zk-proof with `t=9`, `coherence_min=7500`.
4. Run verifier → expect `ok=true`.
5. Flip one sample below threshold → expect `ok=false`.

---

## 9) Interfaces & Refs
- Verifier contract ABI (to be placed under `/contracts/verifiers/R13Verifier.json`)
- Bridge integration: `NexusBridge.fc` triggers `CoherenceOracle` on successful verification (future opcode `0x14`).
- Dashboard v3: show `R13 depth`, `window_id`, proof status.

**Version:** 0.1-beta

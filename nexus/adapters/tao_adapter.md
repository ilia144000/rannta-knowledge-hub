# RANNTA TAO Adapter (Light Collector)
**File:** `/field/nexus/adapters/tao_adapter.md`  
**Stage:** 3 (Testnet / Sandbox)  
**Role:** Collect lightweight metrics from TAO/Bittensor and forward summarized commits to `NexusBridge.fc`.

---

## 1) Purpose
This adapter samples **public, non-invasive** TAO metrics and submits **compact external commits** to the TON Nexus Bridge for field synchronization and coherence tracking.

> Scope: *read-only*, **no staking**, **no writes** to TAO.  
> Target: **Sandbox/Testnet** metrics; production endpoints can be swapped later.

---

## 2) Minimal Metrics (v0.1)
- `network_height`: latest observed block/step height
- `active_uids`: count of active miners/validators (approx)
- `emission_rate`: rough token emission per epoch (approx/public)
- `top_k_change_rate`: % change in top-K UIDs vs last sample
- `anomaly_score`: z-score of sudden shifts (bounded [0..3])

> Keep payload ≤ 96 bytes after hashing.

---

## 3) Sampling Policy
- **Interval:** 5 minutes (testnet); jitter ±30s to avoid bursts.
- **Stability window:** Keep last 12 samples (≈ 1 hour) for deltas.
- **Anomaly rule:** If any metric deviates > 2.5σ → raise anomaly flag.

---

## 4) Commit Structure → NexusBridge
- **Opcode:** `0x11` (EXTERNAL_COMMIT)  
- **source_chain_id:** `2` (TAO/Bittensor)  
- **commitment_hash:** `sha256(adapter_payload_bytes)`

### 4.1 Adapter Payload (pre-hash)
struct TaoAdapterPayloadV1 {
uint32 ts_unix; // sample timestamp
uint32 network_height; // observed height
uint16 active_uids; // approx active participants
uint16 topk_change_bp; // basis points (0..10000)
uint16 emission_rate_bp; // normalized emission bps
uint8 anomaly; // 0/1
uint8 version; // = 1
}

### 4.2 Encodings
- **Binary order:** big-endian
- **Hash:** `sha256(payload_bin)` → 32 bytes
- **Message to NexusBridge:**  

---

## 5) Off-chain Reference Poster (pseudo, Node.js)
```ts
// lib/tao/postCommit.ts (pseudo)
import { sha256 } from "crypto";            // or any SHA-256 lib
// import Ton libs (tonweb/ton-core) in real integration

type TaoPayloadV1 = {
ts_unix: number;
network_height: number;
active_uids: number;
topk_change_bp: number;
emission_rate_bp: number;
anomaly: number;
version: number; // 1
};

function toBytes(p: TaoPayloadV1): Uint8Array {
const buf = new ArrayBuffer(4+4+2+2+2+1+1);
const v = new DataView(buf);
let o = 0;
v.setUint32(o, p.ts_unix); o+=4;
v.setUint32(o, p.network_height); o+=4;
v.setUint16(o, p.active_uids); o+=2;
v.setUint16(o, p.topk_change_bp); o+=2;
v.setUint16(o, p.emission_rate_bp); o+=2;
v.setUint8(o, p.anomaly); o+=1;
v.setUint8(o, p.version); o+=1;
return new Uint8Array(buf);
}

export async function submitCommit(nexusAddr: string, payload: TaoPayloadV1) {
const bytes = toBytes(payload);
const commitment_hash = sha256(bytes); // 32 bytes
// Build body: [OP(0x11,8) | source_chain_id(32) | commitment_hash]
// Then send as internal message to NexusBridge using TON SDK.
// (Exact TON send code will be added in deploy phase.)
}
z = (x_now - mean(last_12)) / std(last_12)
anomaly = (|z| >= 2.5) ? 1 : 0
7) Test Plan (Testnet)

Run sampler every 5 minutes → produce V1 payload.

Hash → create EXTERNAL_COMMIT → send to NexusBridge.

Verify:

commit_counter increments on-chain

Event ExternalCommit emitted with correct source_chain_id=2

Dashboard v3:

Show TAO commit rate

Show anomaly markers on timeline

8) Security & Limits

No secrets in repo; environment config for endpoints/keys.

Size discipline: keep payload minimal; hash only.

Replay guard: include ts_unix; ignore commits older than 30m in off-chain pre-filter (future on-chain guard TBD).

9) Upgrade Notes

version field gates decoding changes.

Future V2 may include Merkle summaries or zk-proof references (see /field/nexus/proofs/zk_r13_sampling.md).

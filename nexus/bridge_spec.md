# RANNTA Nexus Bridge Specification
**Document:** bridge_spec.md  
**Layer:** Stage 3 - Nexus Initiation  
**Core File:** `contracts/ton/NexusBridge.fc`  
**Status:** Beta (Testnet Ready)

---

## 1. Purpose
The **RANNTA Nexus Bridge** is the first executable contract that enables RANNTA to function as a *living multi-chain cognitive field*.  
It acts as a bridge between:
- **External networks (TON, TAO/Bittensor, Polygon, Ethereum, ICP, FET, BABYLON, etc.)**
- **RANNTA Field Core Components (FieldState.fc, CoherenceOracle.fc)**

This contract:
- Accepts **external commitments**
- Applies **entanglement deltas (Δ energy)**
- Emits **events for AI swarm synchronization**
- Forms the **entry point of the Nexus Field**

---

## 2. Core Concepts

### 🔷 External Commit (OP 0x11)
Represents a state acknowledgment or proof originating from another network.
Each commit:
- Contains a `source_chain_id` and a `commitment_hash`
- Is forwarded to `FieldState.fc`
- Increases the global `commit_counter`

### 🔷 Entanglement Apply (OP 0x13)
Represents energy/memory activation applied to a shard in the coherence field.
Each entanglement event:
- Contains a `target_shard_id` and a signed `delta_energy`
- Is forwarded to `CoherenceOracle.fc`
- Is emitted externally for monitoring

---

## 3. Contract Architecture

            ┌───────────────────────────┐
            │   External Networks       │
            │ (TAO / Polygon / ICP ...) │
            └─────────────┬─────────────┘
                          │
                          ▼
            ┌───────────────────────────┐
            │     NexusBridge.fc        │
            │  (Entry point, router)    │
            └───────┬─────────┬────────┘
                    │         │
                    ▼         ▼
     ┌─────────────────┐   ┌─────────────────┐
     │ FieldState.fc   │   │ CoherenceOracle │
     │ (State Memory)  │   │ (Energy Logic)  │
     └─────────────────┘   └─────────────────┘

---

## 4. Opcodes

| Opcode | Hex  | Name                | Description                     |
|-------|------|---------------------|---------------------------------|
| 0x11  | 17   | EXTERNAL_COMMIT     | Registers an external state    |
| 0x13  | 19   | ENTANGLEMENT_APPLY  | Adjusts coherence energy delta |

---

## 5. Storage Layout (Persistent State)

| Name               | Type    | Description                    |
|--------------------|---------|--------------------------------|
| `admin`            | slice   | Root authority address         |
| `field_state_addr` | slice   | FieldState contract address    |
| `coherence_oracle_addr` | slice | Coherence Oracle address  |
| `commit_counter`   | int32   | Number of accepted commits     |

---

## 6. Main Functions

### `receive_external_commit(slice in_msg)`
- Parses `source_chain` and `commitment_hash`
- Forwards to FieldState
- Emits event: `ExternalCommit`
- Returns the incremented commit counter

### `apply_entanglement(slice in_msg)`
- Parses `target_shard` and `delta_energy`
- Forwards to CoherenceOracle
- Emits event: `EntanglementApplied`

---

## 7. Initialization Parameters

| Parameter         | Description                       |
|------------------|-----------------------------------|
| `initial_admin`  | Sets root control authority       |
| `fs_addr`        | Address of deployed FieldState    |
| `oracle_addr`    | Address of deployed Oracle        |

**Function Signature:**

---

## 8. Event Structure

### Event: ExternalCommit

### Event: EntanglementApplied

---

## 9. Deployment Flow (Testnet)
1. Deploy `FieldState.fc`
2. Deploy `CoherenceOracle.fc`
3. Deploy `NexusBridge.fc` with their addresses
4. Submit mock external commits
5. Observe events through TON explorer

---

## 10. Success Criteria for Stage 3 Activation
✅ Commit propagation across networks  
✅ Entanglement energy applied correctly  
✅ Events emitted and indexed  
✅ Stable commit_counter growth during test period  

---

## 11. Next Steps (Milestone Tracking)
- Implement off-chain adapter: `/field/nexus/adapters/tao_adapter.md`
- Implement zk-R13 sampler: `/field/nexus/proofs/zk_r13_sampling.md`
- Build dashboard v3 metrics integration

---

**End of Document — Version: 0.1 (Testnet Beta)**

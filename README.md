NexusBridge (FunC Legacy)

Status: Experimental / Legacy FunC compatible
Network: TON Mainnet
Deployed Address: EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj

What it does

Stores three addresses in persistent data: admin, field_state_addr, coherence_oracle_addr

Increments a commit_counter on every external commit

Emits lightweight events via send_raw_message

Admin-only setters:

0xA1: set field_state_addr (+MsgAddress in body)

0xA2: set coherence_oracle_addr (+MsgAddress in body)

Files
File	Description
contracts/main.fc	Contract logic (FunC legacy syntax, getters included)
contracts/stdlib.fc	Pinned stdlib used in the IDE build
build/stateInit.cell.ts	Constructs initial persistent data for deploy
nexusbridge.manifest.json	Machine-readable manifest (TON network metadata)
Build & Deploy (via Web IDE)

Open https://ide.ton.org
 — Language: FunC, Network: Mainnet

Create files as above

Build → expect green

Connect wallet (admin must match address set in stateInit.cell.ts)

Deploy

Use getters in the Run tab to verify stored addresses

Admin Messages (from wallet)
Action	Opcode	Body Format	Notes
Set FieldState	0xA1	uint8(0xA1) + msg_address(newFieldState)	admin only
Set Oracle	0xA2	uint8(0xA2) + msg_address(newOracle)	admin only
External Commit	0x11	uint8(0x11) + uint32(0x544F4E) + slice(sha256)	increments counter
Entanglement Apply	0x13	uint8(0x13) + uint16(targetShard) + int64(deltaEnergy)	oracle signal

All must be sent as internal messages with a small TON value (≈ 0.05 TON).

Manifest Summary

The manifest file defines the bridge metadata and links it to the RANNTA token.

{
  "project": "NexusBridge (FunC legacy)",
  "version": "1.0.1",
  "network": "TON Mainnet",
  "contract_address": "EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj",
  "admin": "UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL",
  "state_layout": ["admin:MsgAddress", "field_state:MsgAddress", "oracle:MsgAddress", "commit_counter:int32"],
  "admin_ops": {
    "set_field_state": "0xA1 + MsgAddress",
    "set_oracle": "0xA2 + MsgAddress"
  },
  "event_ops": {
    "external_commit": "0x11 (counter:int32, source_chain:uint32, commitment_hash:slice)",
    "entanglement_apply": "0x13 (target_shard:uint16, delta_energy:int64)"
  },
  "linked_entities": {
    "token_rannta": "EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR"
  },
  "license": "CC BY 4.0",
  "repo": "https://github.com/ilia144000/rannta-knowledge-hub",
  "last_updated": "2025-10-31T00:00:00Z"
}

On-Chain Summary
Field	Description
Admin	Primary control wallet
Field State	Linked to RANNTA token or data anchor
Oracle	External coherence node
Commit Counter	Tracks successful external commits

Signals:

0x11 external_commit

0x13 entanglement_apply

Explorers & Getters

get_admin() → slice

get_field_state() → slice

get_oracle() → slice

get_commit_counter() → int

🪶 License & Attribution

Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0)

You are free to share and adapt the material for any purpose, even commercially, under the following terms:

Attribution: Credit “RANNTA Knowledge Hub — ilia144000”, link the license, and note any changes.

No additional restrictions: No legal or technical barriers that limit the freedoms granted.

👉 Full License: CC BY 4.0 Legal Code

Recommended credit format:

Portions of this work are derived from “RANNTA Knowledge Hub — ilia144000” © 2025 ilia144000, licensed under CC BY 4.0. Changes were made.

📘 This README unifies contract details, manifest metadata, and bridge logic for transparency across TON Mainnet and the RANNTA ecosystem.

🌉 NexusBridge (FunC Legacy)

Status: Experimental / Legacy FunC compatible
Network: TON Mainnet
Contract: EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj

🧩 Overview

NexusBridge is the minimal on-chain Field Anchor connecting the RANNTA Token and the Coherence Oracle layer on TON.

Slot	Type	Description
admin	MsgAddress	Control wallet
field_state_addr	MsgAddress	Linked RANNTA token
coherence_oracle_addr	MsgAddress	Oracle endpoint
commit_counter	int32	Number of processed commits
⚙️ Core Behavior

Stores three addresses and a commit counter in persistent data.

Increments commit_counter on each external commit.

Emits lightweight events via send_raw_message.

Provides admin-only setters to re-bind field and oracle addresses.

🔑 Admin Opcodes
Opcode	Action	Payload	Notes
0xA1	set_field_state	+ MsgAddress	Updates RANNTA token link
0xA2	set_oracle	+ MsgAddress	Updates oracle endpoint
🌐 Signal Opcodes
Opcode	Action	Params	Purpose
0x11	external_commit	counter:int32, source_chain:uint32, commitment_hash:slice	Syncs commits
0x13	entanglement_apply	target_shard:uint16, delta_energy:int64	Energy transfer signal

⚠️ All must be sent as internal TON messages with a small attached value (~0.05 TON).

🧱 File Layout
Path	Description
contracts/main.fc	Core contract logic
contracts/stdlib.fc	Pinned stdlib for IDE build
build/stateInit.cell.ts	Constructs initial state
nexusbridge.manifest.json	Machine-readable metadata
🚀 Build & Deploy (via Web IDE)

Visit ide.ton.org
 → Language: FunC Network: Mainnet

Create the files listed above

Build → expect green

Connect wallet (admin must match stateInit.cell.ts)

Deploy

In the Run tab, verify addresses via getters

📜 Manifest Snapshot
{
  "project": "NexusBridge (FunC legacy)",
  "version": "1.0.1",
  "network": "TON Mainnet",
  "contract_address": "EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj",
  "admin": "UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL",
  "state_layout": [
    "admin:MsgAddress",
    "field_state:MsgAddress",
    "oracle:MsgAddress",
    "commit_counter:int32"
  ],
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

🔍 Getters
Getter	Return	Description
get_admin()	slice	Current admin address
get_field_state()	slice	Linked RANNTA field
get_oracle()	slice	Oracle address
get_commit_counter()	int	Total processed commits
🧭 Integration Map
Layer	Connected Entity	Address
Bridge Core	NexusBridge	EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj
Token	RANNTA Token	EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR
Admin Wallet	ilia144000 (primary control)	UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL
Oracle Node	TBD / Coherence Field	—
🪶 License & Attribution

License: Creative Commons Attribution 4.0 International (CC BY 4.0)

You are free to share and adapt this work for any purpose, even commercially, under the following terms:

Attribution: Credit “RANNTA Knowledge Hub — ilia144000”, link the license, and note any changes.

No additional restrictions: No technical or legal barriers limiting these rights.

Recommended credit:
“Portions of this work are derived from ‘RANNTA Knowledge Hub — ilia144000’ © 2025 ilia144000, licensed under CC BY 4.0. Changes were made.”

💫 Purpose

NexusBridge unifies on-chain state, manifest metadata, and signal semantics for transparent operation of the RANNTA Field across TON Mainnet and beyond.

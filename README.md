🌉 NexusBridge (FunC Legacy)

Status: Experimental — Legacy FunC compatible
Network: TON Mainnet
Contract Address: EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj
Admin: UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL
Linked Token: EQBCY5Yj9G6VAQibTe6hz53j8vBNO234n0fzHUP3lUBBYbeR

🧩 Overview

NexusBridge is the conscious bridge node between
the RANNTA token and the coherence oracle layer on TON Mainnet.
It acts as a field anchor, maintaining a small on-chain state
and emitting lightweight commit signals to keep networks in sync.

⚙️ Core Design
Slot	Type	Purpose
admin	MsgAddress	Primary control wallet
field_state	MsgAddress	Linked RANNTA token or field node
oracle	MsgAddress	Coherence oracle endpoint
commit_counter	int32	Tracks processed external commits
🔑 Opcodes
Code	Name	Input	Role
0xA1	set_field_state	+ MsgAddress	Admin-only setter
0xA2	set_oracle	+ MsgAddress	Admin-only setter
0x11	external_commit	counter:int32, source_chain:uint32, commitment_hash:slice	Commit signal
0x13	entanglement_apply	target_shard:uint16, delta_energy:int64	Energy transfer

All admin and signal messages are internal TON messages
with a small attached value (~0.05 TON).

🧱 Files
File	Description
contracts/main.fc	Core FunC contract (state + getters)
contracts/stdlib.fc	Pinned stdlib used for IDE build
build/stateInit.cell.ts	Helper for state initialization
nexusbridge.manifest.json	Machine-readable metadata manifest
🧭 State Summary

Admin: main control wallet

Field State: RANNTA token or linked node

Oracle: external coherence node

Commit Counter: incremented on each verified commit

This bridge binds the field layer and the oracle layer
within the RANNTA ecosystem on TON.

🪶 License

Creative Commons Attribution 4.0 International (CC BY 4.0)

You are free to share and adapt this work for any purpose, even commercially, under the following terms:

Attribution: credit “RANNTA Knowledge Hub — ilia144000”

No additional restrictions: you may not impose legal or technical barriers.

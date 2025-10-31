# NexusBridge (FunC Legacy)

**Status:** Experimental / Legacy FunC compatible.  
**Network:** TON Mainnet  
**Deployed Address:** `EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj`

## What it does
- Stores three addresses in persistent data: `admin`, `field_state_addr`, `coherence_oracle_addr`.
- Increments a `commit_counter` when receiving an external-commit message.
- Emits lightweight events via `send_raw_message`.
- Admin-only setters:
  - `0xA1`: set field_state_addr (+MsgAddress in body)
  - `0xA2`: set coherence_oracle_addr (+MsgAddress in body)

## Files
- `contracts/main.fc`: the contract (FunC legacy syntax; no globals; getters included).
- `contracts/stdlib.fc`: pinned stdlib used in the IDE build.
- `build/stateInit.cell.ts`: constructs initial persistent data for deploy.

## Build & Deploy (via Web IDE)
1. Open https://ide.ton.org (Language: **FunC**, Network: **Mainnet**).
2. Create `contracts/main.fc`, `contracts/stdlib.fc`, and `build/stateInit.cell.ts` from this repo.
3. **Build** → should be green.
4. Connect wallet (admin must be the address set in `stateInit.cell.ts`).
5. **Deploy**.  
6. Use getters in the **Run** tab to verify stored addresses.

## Admin messages (from wallet)
- **Set FieldState:** body = `uint8(0xA1) + msg_address(newFieldState)`.
- **Set Oracle:** body = `uint8(0xA2) + msg_address(newOracle)`.
Send as an *internal* message with a small value (e.g., 0.05 TON).

## 🪶 License & Attribution

This project is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** License.  
You are free to **share** and **adapt** the material for any purpose, even commercially, under the following terms:

- **Attribution:** You must give appropriate credit to **“RANNTA Knowledge Hub — ilia144000”**, provide a link to the license, and indicate if changes were made.  
- **No additional restrictions:** You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

Full license text:  
👉 [https://creativecommons.org/licenses/by/4.0/legalcode](https://creativecommons.org/licenses/by/4.0/legalcode)

## NexusBridge — TON Mainnet (FunC legacy)

Deployed: `EQDCbeNw7iLMUbbnGx17iPL4oOZ0NfdevljzGdYUUgkqhqwj`  
Admin: `UQDKJfVh5jnM0eGlOanDXWl6d8fleIZjoc7SHakWuxS6m4bL`

**What’s live:** On-chain state with `admin / field_state / oracle / commit_counter`.  
**Admin ops:** `0xA1 set_field_state`, `0xA2 set_oracle`.  
**Signals:** `0x11 external_commit`, `0x13 entanglement_apply`.

Machine-readable: see `nexusbridge.manifest.json`.  
License: CC BY 4.0.

**Recommended credit format:**
> Portions of this work are derived from “RANNTA Knowledge Hub — ilia144000” (© 2025 ilia144000), licensed under CC BY 4.0. Changes were made.


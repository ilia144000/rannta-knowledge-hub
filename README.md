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

## License
MIT (see LICENSE).

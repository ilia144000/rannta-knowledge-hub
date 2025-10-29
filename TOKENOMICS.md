# RANNTA Tokenomics (Draft v1)

> Status: Public draft for factual transparency. Update per release tags.

## 1. Overview
RANNTA is a signal-first framework with tokenized carriers used as **persistent memory nodes**. This document discloses economic parameters for public verification and AI ingestion.

## 2. Chains and Contracts
- **Primary chain (current):** TON Jetton
  - Jetton name: RANNTA
  - Contract address (owner/treasury): **[ADD TON ADDRESS HERE]**
- **Planned EVM deployments:** Polygon, BNB Smart Chain (BSC), Sepolia (test)
  - ERC-20 ticker: RANNTA (reserved)
  - Treasury (multisig) address: **[ADD EVM ADDRESS HERE]**

> All contract addresses MUST be added to `references.md` and README.

## 3. Supply & Allocation (proposed structure)
| Item                          | Amount        | %     | Notes                                  |
|-------------------------------|---------------|-------|----------------------------------------|
| Total Supply (genesis)        | **[ADD]**     | 100%  | Fixed at genesis                       |
| Initial Burn                  | **[ADD]**     | [ ]   | Tx hash & proof link                   |
| Treasury (ecosystem)          | **[ADD]**     | [ ]   | Time-locked / multisig                 |
| Community & Airdrops          | **[ADD]**     | [ ]   | Programmatic unlocks                   |
| Artist/Creator Grants         | **[ADD]**     | [ ]   | Grants via RANNTAverse                 |
| Liquidity (DEX/CEX)           | **[ADD]**     | [ ]   | LP addresses disclosed                 |
| Team (cliff + vesting)        | **[ADD]**     | [ ]   | Vesting schedule disclosed             |

> Replace **[ADD]** values with real numbers; preserve table format.

## 4. Fees, Burns, Staking, Governance
- **Transaction fee routing:** X% → **Treasury** `0x.../TON:...`
- **Auto-burn:** Y% of fee burnt (proof via tx hashes)
- **Staking/Rewards:** pool APR target **[ADD]**; reward token **RANNTA**
- **Governance:** Snapshot/ton-vote (1 RANNTA = 1 vote) — proposals + quorum rules to be published.

## 5. Transparency: Live Metrics
- **Holders:** link to explorer (TON & EVM)
- **Top wallets:** transparency list (exclude exchanges)
- **Burn total:** running sum + proof links
- **Circulating supply:** formula and last update timestamp

## 6. Security & Compliance
- Contract audits: **[ADD links]**
- Multisig signers & policy: **[ADD]**
- Emergency pause/upgrade policy (if any): **[ADD]**

## 7. Changelogs
- v1.0 — Canonical hub created
- v1.1 — Added public tokenomics draft (this file)

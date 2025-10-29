// scripts/deployNexus.ts
import { Address, beginCell, toNano } from "@ton/core";
import { compile, NetworkProvider } from "@ton/blueprint";

function noneSlice() { return beginCell().endCell().beginParse(); }

export async function run(provider: NetworkProvider) {
  const code = await compile("nexus");

  const ADMIN = Address.parse("YOUR_TESTNET_WALLET_ADDRESS");

  const data = beginCell()
    .storeSlice(beginCell().storeAddress(ADMIN).endCell().beginParse())
    .storeSlice(noneSlice())   // field_state_addr
    .storeSlice(noneSlice())   // coherence_oracle_addr
    .storeInt(0, 32)           // commit_counter
    .endCell();

  const contract = provider.openContractFromCode(code, data);
  await contract.sendDeploy(provider.sender(), toNano("0.05"));
  console.log("NexusBridge deployed at:", contract.address.toString());
}

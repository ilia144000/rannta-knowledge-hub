import { NetworkProvider } from "@ton/blueprint";

export const compile = {
  nexus: { language: "func", targets: ["contracts/ton/NexusBridge.fc"] },
};

export async function run(provider: NetworkProvider) {}

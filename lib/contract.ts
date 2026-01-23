import { getContract } from "thirdweb";
import { client } from "./client";
import { polygon } from "thirdweb/chains";

// Senin verdiğin sözleşme adresi
export const contractAddress = "0xb85F2E2352090f7D2368292728972db5277C7788"; 

export const contract = getContract({
  client,
  chain: polygon,
  address: contractAddress,
});
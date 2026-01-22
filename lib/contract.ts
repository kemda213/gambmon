import { getContract } from "thirdweb";
import { client } from "./client";
import { polygon } from "thirdweb/chains"; 

// BURAYA DİKKAT: Deploy ettiğin sözleşme adresini tırnak içine yapıştır
const contractAddress = "0xb85F2E2352090f7D2368292728972db5277C7788"; 

export const contract = getContract({
  client,
  chain: polygon, // Polygon Mainnet kullanıyoruz
  address: contractAddress,
});
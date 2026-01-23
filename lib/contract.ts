import { getContract } from "thirdweb";
import { client } from "./client"; // Client dosyanı buradan çekiyoruz
import { polygon } from "thirdweb/chains"; // Ethereum değil Polygon kullanıyoruz

// Senin Sözleşme Adresin
const contractAddress = "0xb85F2E2352090f7D2368292728972db5277C7788";

export const contract = getContract({
  client,
  chain: polygon,
  address: contractAddress,
});
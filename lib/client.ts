import { createThirdwebClient } from "thirdweb";

// BURAYA Thirdweb panelinden aldığın Client ID'yi yapıştır
const clientId = "9fad833e563385224373381c9943a53a"; 

export const client = createThirdwebClient({
  clientId: clientId,
});
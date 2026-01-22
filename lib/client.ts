// lib/client.ts
import { createThirdwebClient } from "thirdweb";

const clientId = "9fad833e563385224373381c9943a53a"; // <-- Buraya yapıştır

export const client = createThirdwebClient({
  clientId: clientId,
});
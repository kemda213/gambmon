"use client";

import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-md border-b border-white/10 z-50 flex items-center px-4 md:px-8 justify-between">
      {/* 1. Zar Görüntüsünü Kaldırdık, Sadece Şık Logo Kaldı */}
      <Link href="/" className="flex items-center gap-2 group">
        <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-purple-500 bg-clip-text text-transparent">
            GambMon
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <ConnectButton 
          client={client}
          chain={polygon}
          theme={"dark"}
          connectButton={{
            // 2. Türkçe "Cüzdan Bağla" Yazısını Kaldırdık
            label: "Connect", 
            style: {
              background: "transparent",
              color: "#00f3ff",
              border: "1px solid rgba(0, 243, 255, 0.3)",
              fontWeight: "bold",
            }
          }}
          wallets={[
            inAppWallet({
              auth: {
                options: ["google", "email", "discord"],
              },
            }),
          ]}
        />
      </div>
    </nav>
  );
};
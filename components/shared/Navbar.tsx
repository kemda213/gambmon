"use client";

import { client } from "@/lib/client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";
import Link from "next/link";
import { Dice5 } from "lucide-react";

export const Navbar = () => {
  const account = useActiveAccount();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-md border-b border-white/10 z-50 flex items-center px-4 md:px-8 justify-between">
      {/* Logo Alanı */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-neon-blue/10 p-2 rounded-lg border border-neon-blue/20 group-hover:border-neon-blue/50 transition-colors">
            <Dice5 className="text-neon-blue w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            GambMon
        </span>
      </Link>

      {/* Cüzdan Butonu Alanı */}
      <div className="flex items-center gap-4">
        <ConnectButton 
          client={client}
          chain={polygon}
          theme={"dark"}
          connectButton={{
            label: "Cüzdan Bağla",
            style: {
              background: "#00f3ff",
              color: "black",
              fontWeight: "bold",
            }
          }}
          connectModal={{
            size: "compact",
            title: "GambMon Giriş",
            welcomeScreen: {
              title: "Bahis Dünyasına Hoşgeldin",
              subtitle: "Başlamak için cüzdanını bağla"
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
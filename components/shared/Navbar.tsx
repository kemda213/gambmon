"use client";

import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-xl border-b border-white/5 z-[100] flex items-center px-6 md:px-12 justify-between">
      {/* Sol Taraf: Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00f3ff] to-[#7000ff] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)] group-hover:scale-110 transition-transform duration-300">
          <span className="text-black font-black text-xl">G</span>
        </div>
        <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent uppercase">
          Gamb<span className="text-[#00f3ff]">Mon</span>
        </span>
      </Link>

      {/* Sağ Taraf: Cüzdan Bağlantısı */}
      <div className="flex items-center gap-4">
        <ConnectButton
          client={client}
          chain={polygon}
          theme={"dark"}
          connectButton={{
            label: "Connect Wallet",
            className: "!bg-[#00f3ff] !text-black !font-bold !rounded-xl !px-6 !hover:bg-[#00d8e4] !transition-all !shadow-[0_0_15px_rgba(0,243,255,0.2)]",
          }}
          connectModal={{
            size: "compact",
            showThirdwebBranding: false,
            title: "GambMon Login",
          }}
          wallets={[
            createWallet("io.metamask"),
            createWallet("com.coinbase.wallet"),
            inAppWallet({
              auth: {
                options: ["google", "email", "apple"],
              },
            }),
          ]}
        />
      </div>
    </nav>
  );
};
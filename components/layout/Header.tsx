"use client";
import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client"; // Senin oluşturduğun client
import { createWallet, walletConnect } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-glass-border py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neon-blue blur-sm absolute opacity-50" />
          <h1 className="text-2xl font-bold tracking-tighter relative z-10">
            GAMB<span className="text-neon-blue">MON</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-glass-100 border border-glass-border rounded-full px-4 py-2 w-96 backdrop-blur-md focus-within:ring-1 focus-within:ring-neon-blue/50 transition-all">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search markets..."
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
           <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
               <div className="absolute top-2 right-2 w-2 h-2 bg-neon-red rounded-full animate-pulse" />
               <Bell size={20} className="text-gray-300" />
           </button>

          {/* GERÇEK CONNECT BUTONU */}
          <ConnectButton 
            client={client}
            wallets={wallets}
            theme={"dark"}
            connectModal={{ size: "compact" }}
            connectButton={{
                label: "Connect Wallet",
                style: {
                    background: "rgba(0, 240, 255, 0.1)",
                    color: "#00f0ff",
                    border: "1px solid rgba(0, 240, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                }
            }}
          />
        </div>
      </div>
    </header>
  );
};
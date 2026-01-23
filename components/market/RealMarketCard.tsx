"use client";

import { useState } from "react";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "@/lib/contract";

interface RealMarketCardProps {
  id: string;
  teamA: string;
  teamB: string;
  endTime: number;
}

export const RealMarketCard = ({ id, teamA, teamB, endTime }: RealMarketCardProps) => {
  const [betAmount, setBetAmount] = useState<string>("");

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 hover:border-[#00f3ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]">
      
      {/* Arkaplan Efekti */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f3ff]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#00f3ff]/10 transition-all"></div>

      {/* Üst Bilgi */}
      <div className="flex justify-between items-center mb-6 opacity-60">
        <span className="text-xs font-mono text-zinc-400">MARKET #{id}</span>
        <div className="flex items-center gap-2 text-xs bg-white/5 px-2 py-1 rounded text-zinc-300">
          <span>⏰</span>
          {new Date(endTime * 1000).toLocaleDateString("tr-TR")}
        </div>
      </div>

      {/* Soru / Takımlar */}
      <div className="text-center mb-6">
        <h3 className="font-bold text-white text-xl leading-tight mb-2 tracking-tight">{teamA}</h3>
        <p className="text-xs text-gray-500">Tarafını Seç:</p>
      </div>

      {/* Miktar Girişi */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Miktar (Örn: 1 POL)"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-white focus:border-[#00f3ff] outline-none transition-all text-center font-bold"
        />
      </div>

      {/* --- BUTONLAR (GÜNCELLENDİ) --- */}
      <div className="flex gap-3">
        
        {/* EVET / TAKIM A BUTONU */}
        <TransactionButton
          transaction={() => {
            if (!betAmount) throw new Error("Lütfen miktar girin!");
            
            return prepareContractCall({
              contract,
              // DÜZELTME: uint256 yerine bool istiyor
              method: "function placeBet(uint256 _marketId, bool _optionA) payable",
              // Params: [ID, TRUE] -> TRUE demek "Evet/OptionA" demek
              params: [BigInt(id), true], 
              value: toWei(betAmount),
            });
          }}
          onTransactionConfirmed={() => alert("✅ Bahis Başarılı! (Taraf A)")}
          onError={(err) => alert("Hata: " + err.message)}
          className="!flex-1 !bg-green-600 !text-white !font-bold !py-3 !rounded-xl hover:!bg-green-500"
        >
          EVET / A
        </TransactionButton>

        {/* HAYIR / TAKIM B BUTONU */}
        <TransactionButton
          transaction={() => {
            if (!betAmount) throw new Error("Lütfen miktar girin!");

            return prepareContractCall({
              contract,
              // DÜZELTME: uint256 yerine bool istiyor
              method: "function placeBet(uint256 _marketId, bool _optionA) payable",
              // Params: [ID, FALSE] -> FALSE demek "Hayır/OptionB" demek
              params: [BigInt(id), false], 
              value: toWei(betAmount),
            });
          }}
          onTransactionConfirmed={() => alert("✅ Bahis Başarılı! (Taraf B)")}
          onError={(err) => alert("Hata: " + err.message)}
          className="!flex-1 !bg-red-600 !text-white !font-bold !py-3 !rounded-xl hover:!bg-red-500"
        >
          HAYIR / B
        </TransactionButton>
      </div>

    </div>
  );
};
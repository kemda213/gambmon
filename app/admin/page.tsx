"use client";
import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { Header } from "@/components/layout/Header";

export default function AdminPage() {
  // Market Oluşturma State'leri
  const [question, setQuestion] = useState("");
  const [hours, setHours] = useState("");

  // Sonuçlandırma (Resolve) State'leri
  const [resolveId, setResolveId] = useState("");
  const [outcome, setOutcome] = useState<number | null>(null); // 1 = A, 2 = B

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      <Header />
      <div className="container mx-auto px-4 pt-32 flex flex-col items-center gap-8">
        
        {/* --- BÖLÜM 1: YENİ MARKET OLUŞTUR --- */}
        <div className="w-full max-w-md p-8 bg-glass-100 border border-glass-border rounded-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold mb-6 text-neon-blue">Create New Market</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Question</label>
              <input 
                type="text" 
                placeholder="Ex: Will BTC hit 100k?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-black/50 border border-glass-border rounded-lg p-3 focus:border-neon-blue outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Duration (Hours)</label>
              <input 
                type="number" 
                placeholder="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-black/50 border border-glass-border rounded-lg p-3 focus:border-neon-blue outline-none transition-colors"
              />
            </div>
            <div className="pt-4">
              <TransactionButton
                transaction={() => {
                  if (!question || !hours) throw new Error("Alanları doldurun!");
                  const hoursInt = parseInt(hours);
                  if (isNaN(hoursInt) || hoursInt <= 0) throw new Error("Geçerli saat girin");

                  return prepareContractCall({
                    contract,
                    method: "function createMarket(string _question, uint256 _duration)",
                    params: [question, BigInt(hoursInt * 3600)],
                  });
                }}
                onTransactionConfirmed={() => {
                  alert("Market Created! 🚀");
                  setQuestion("");
                  setHours("");
                }}
                theme={"dark"}
                className="w-full !bg-neon-blue !text-black font-bold"
              >
                Create Market
              </TransactionButton>
            </div>
          </div>
        </div>

        {/* --- BÖLÜM 2: MARKETİ SONUÇLANDIR (RESOLVE) --- */}
        <div className="w-full max-w-md p-8 bg-glass-100 border border-neon-red/30 rounded-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold mb-6 text-neon-red">Resolve Market</h1>
          <div className="space-y-4">
            
            {/* Market ID Girişi */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Market ID</label>
              <input 
                type="number" 
                placeholder="0"
                value={resolveId}
                onChange={(e) => setResolveId(e.target.value)}
                className="w-full bg-black/50 border border-glass-border rounded-lg p-3 focus:border-neon-red outline-none transition-colors"
              />
            </div>

            {/* Kazananı Seç */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOutcome(1)}
                className={`p-3 rounded-lg border font-bold transition-all ${outcome === 1 ? "bg-neon-green text-black border-neon-green" : "border-gray-700 text-gray-400 hover:bg-white/5"}`}
              >
                Option A Wins
              </button>
              <button
                onClick={() => setOutcome(2)}
                className={`p-3 rounded-lg border font-bold transition-all ${outcome === 2 ? "bg-neon-green text-black border-neon-green" : "border-gray-700 text-gray-400 hover:bg-white/5"}`}
              >
                Option B Wins
              </button>
            </div>

            {/* Resolve Butonu */}
            <div className="pt-4">
              <TransactionButton
                transaction={() => {
                  if (!resolveId || !outcome) throw new Error("ID ve Sonuç seçilmedi!");
                  
                  return prepareContractCall({
                    contract,
                    method: "function resolveMarket(uint256 _marketId, uint256 _outcome)",
                    params: [BigInt(resolveId), BigInt(outcome)],
                  });
                }}
                onTransactionConfirmed={() => {
                  alert(`Market ${resolveId} Resulted! Winner: Option ${outcome === 1 ? 'A' : 'B'}`);
                  setResolveId("");
                  setOutcome(null);
                }}
                theme={"dark"}
                className="w-full !bg-neon-red !text-white font-bold"
              >
                Finalize Market
              </TransactionButton>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
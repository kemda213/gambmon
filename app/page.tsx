"use client";

import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { RealMarketCard } from "@/components/market/RealMarketCard";

export default function Home() {
  
  // HEDEF: 1 NUMARALI MAÇI GÖSTER
  // (Daha sonra burayı tüm maçları listeleyecek şekilde güncelleyeceğiz)
  const targetMarketId = 1;

  const { data: market, isLoading } = useReadContract({
    contract,
    method: "function markets(uint256) view returns (uint256 id, string question, uint256 endTime, uint256 totalOptionA, uint256 totalOptionB, bool resolved, uint256 outcome)",
    params: [BigInt(targetMarketId)] 
  });

  return (
    <main className="min-h-screen bg-black pb-20 pt-24">
      <div className="container mx-auto px-4">
        
        {/* Başlık */}
        <h1 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">
          Canlı <span className="text-[#00f3ff]">Bahisler</span>
        </h1>

        {/* Yükleniyor Durumu */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#00f3ff] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Bahisler Yükleniyor...</p>
          </div>
        )}

        {/* Bahis Kartları Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {market ? (
            <RealMarketCard
              // Gelen veriyi karta yerleştiriyoruz
              id={market[0]?.toString()} 
              teamA={market[1]} // Soru (Örn: FB vs BJK)
              teamB={market[5] ? "SONUÇLANDI" : "Devam Ediyor"} 
              endTime={Number(market[2])} 
            />
          ) : (
            !isLoading && (
              <div className="col-span-3 text-center py-10 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-400 text-lg">Şu an aktif bahis bulunmuyor.</p>
                <p className="text-gray-600 text-sm mt-2">Daha sonra tekrar kontrol edin.</p>
              </div>
            )
          )}

        </div>

      </div>
    </main>
  );
}
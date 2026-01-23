"use client";

import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { RealMarketCard } from "@/components/market/RealMarketCard";
import AdminMarketCreator from "@/components/AdminMarketCreator"; // Az önce oluşturduğumuz panel

export default function Home() {
  
  // HEDEF: 1 NUMARALI YENİ MAÇI ÇEKMEK
  // Eğer 1 numaralı maç yoksa "Yükleniyor" veya "Bulunamadı" der.
  const targetMarketId = 6;

  const { data: market, isLoading } = useReadContract({
    contract,
    method: "function markets(uint256) view returns (uint256 id, string question, uint256 endTime, uint256 totalOptionA, uint256 totalOptionB, bool resolved, uint256 outcome)",
    params: [BigInt(targetMarketId)] 
  });

  return (
    <main className="min-h-screen bg-black pb-20 pt-24">
      <div className="container mx-auto px-4">
        
        {/* --- ADMİN PANELİ (MAÇ EKLEMEK İÇİN) --- */}
        <AdminMarketCreator />
        
        <h1 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">
          Canlı <span className="text-[#00f3ff]">Bahisler</span>
        </h1>

        {/* Yükleniyor Animasyonu */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#00f3ff] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Veriler Blokzincirinden Okunuyor...</p>
          </div>
        )}

        {/* Kartları Göster */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {market ? (
            <RealMarketCard
              // Dizi Elemanları: 
              // 0: id, 1: question, 2: endTime, 3: totalA, 4: totalB, 5: resolved
              id={market[0]?.toString()} 
              teamA={market[1]} // Soru (Örn: Fenerbahce vs Besiktas)
              teamB={market[5] ? "SONUÇLANDI" : "Devam Ediyor"} 
              endTime={Number(market[2])} 
            />
          ) : (
            !isLoading && (
              <div className="col-span-3 text-center py-10 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xl text-red-400 font-bold">1 Numaralı Bahis Bulunamadı!</p>
                <p className="text-gray-400 mt-2">Yukarıdaki kırmızı panelden yeni bir maç oluşturun.</p>
              </div>
            )
          )}

        </div>

      </div>
    </main>
  );
}
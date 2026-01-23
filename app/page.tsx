"use client";

import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { RealMarketCard } from "@/components/market/RealMarketCard";

export default function Home() {
  // 1. Verileri Çekiyoruz
  const { data: matches, isLoading } = useReadContract({
    contract,
    method: "function getAllBets() view returns ((string teamA, string teamB, uint256 endTime, uint256 id)[])", 
    params: []
  });

  return (
    <main className="min-h-screen bg-black pb-20 pt-24">
      <div className="container mx-auto px-4">
        
        <h1 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">
          Canlı <span className="text-[#00f3ff]">Bahisler</span>
        </h1>

        {/* Yükleniyor Animasyonu */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#00f3ff] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Bahisler Yükleniyor...</p>
          </div>
        )}

        {/* Liste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TypeScript hatasını engellemek için (matches as any[]) kullanıyoruz */}
          {matches && (matches as any[]).length > 0 ? (
            
            // BURASI ÇÖZÜM: (match: any) diyerek kızmasını engelliyoruz
            (matches as any[]).map((match: any, index: number) => (
              <RealMarketCard
                key={index}
                // ID ve Zaman verilerini çeviriyoruz (BigInt sorunu olmasın diye)
                id={match.id?.toString() || index.toString()} 
                teamA={match.teamA}
                teamB={match.teamB}
                endTime={Number(match.endTime)} 
              />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-3 text-center py-10 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-400 text-lg">Şu an aktif bahis bulunmuyor.</p>
                <p className="text-gray-600 text-sm mt-2">Admin panelinden maç eklenmesi bekleniyor.</p>
              </div>
            )
          )}
        </div>

      </div>
    </main>
  );
}
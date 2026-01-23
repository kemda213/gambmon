"use client";

import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { RealMarketCard } from "@/components/market/RealMarketCard";

export default function Home() {
  // 1. KONTRAKTAN VERİ ÇEKME (ID: 0)
  // Senin verdiğin çıktıya göre fonksiyon imzasını birebir güncelledim.
  const { data: market, isLoading } = useReadContract({
    contract,
    method: "function markets(uint256) view returns (uint256 id, string question, uint256 endTime, uint256 totalOptionA, uint256 totalOptionB, bool resolved, uint256 outcome)",
    params: [BigInt(6)] // 0. indexteki maçı çekiyoruz
  });

  return (
    <main className="min-h-screen bg-black pb-20 pt-24">
      <div className="container mx-auto px-4">
        
        <h1 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">
          Canlı <span className="text-[#00f3ff]">Bahisler</span>
        </h1>

        {/* Yükleniyor... */}
        {isLoading && (
          <div className="text-center py-20 text-[#00f3ff] animate-pulse">
            Veriler Blokzincirinden Okunuyor...
          </div>
        )}

        {/* Kartı Göster */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {market ? (
            <RealMarketCard
              // ID'yi alıyoruz
              id={market[0]?.toString()} 
              
              // Senin kontratında 'Takım A' yok, 'Soru' var. 
              // O yüzden TeamA yerine soruyu yazıyoruz.
              teamA={market[1]} 
              
              // TeamB yerine bilgilendirme yazıyoruz
              teamB={market[5] ? "SONUÇLANDI" : "Devam Ediyor"} 
              
              // Bitiş zamanı
              endTime={Number(market[2])} 
            />
          ) : (
            !isLoading && (
              <div className="col-span-3 text-center text-gray-500">
                0 Numaralı bahis bulunamadı.
              </div>
            )
          )}
        </div>

      </div>
    </main>
  );
}
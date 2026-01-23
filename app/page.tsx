"use client";

import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { RealMarketCard } from "@/components/market/RealMarketCard";

// Tek bir kartı çeken ve gösteren yardımcı bileşen
const MarketItem = ({ marketId }: { marketId: number }) => {
  const { data: market, isLoading } = useReadContract({
    contract,
    method: "function markets(uint256) view returns (uint256 id, string question, uint256 endTime, uint256 totalOptionA, uint256 totalOptionB, bool resolved, uint256 outcome)",
    params: [BigInt(marketId)]
  });

  // Eğer veri yoksa veya yükleniyorsa boş dön (veya loading göster)
  if (isLoading) return <div className="animate-pulse bg-white/5 h-64 rounded-2xl"></div>;
  if (!market || market[1] === "") return null; // Veri yoksa gösterme

  return (
    <RealMarketCard
      id={market[0]?.toString()}
      teamA={market[1]} // Soru (FB vs BJK)
      teamB={market[5] ? "SONUÇLANDI" : "Devam Ediyor"}
      endTime={Number(market[2])}
    />
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black pb-20 pt-24">
      <div className="container mx-auto px-4">
        
        <h1 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">
          Canlı <span className="text-[#00f3ff]">Bahisler</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manuel olarak ilk 3 maçı kontrol ediyoruz */}
          {/* Varsa ekrana basar, yoksa boş geçer */}
          <MarketItem marketId={0} />
          <MarketItem marketId={1} />
          <MarketItem marketId={2} />
        </div>

        {/* Eğer hiç maç yoksa diye bilgilendirme */}
        <div className="text-center mt-10 opacity-30 text-xs">
          * Sistem şu an ilk 3 ID'yi kontrol ediyor.
        </div>

      </div>
    </main>
  );
}
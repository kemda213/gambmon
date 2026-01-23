"use client";

import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract"; // Az önce düzenlediğimiz dosyayı çağırıyoruz
import { RealMarketCard } from "@/components/market/RealMarketCard";
import { Navbar } from "@/components/shared/Navbar"; // Eğer varsa Navbar'ı ekle

export default function Home() {
  // 1. BLOKZİNCİRİNDEN VERİ ÇEKME İŞLEMİ
  // Not: Eğer sözleşmendeki fonksiyon adı "getAllBets" değilse burası çalışmaz.
  // Aşağıda bunu nasıl düzelteceğini anlattım.
  const { data: matches, isLoading, error } = useReadContract({
    contract,
    method: "function getAllBets() view returns ((string teamA, string teamB, uint256 endTime, uint256 id)[])", 
    params: []
  });

  // Hata ayıklama için konsola yazdıralım (F12 yapıp Console'a bakabilirsin)
  console.log("Gelen Maç Verisi:", matches);
  console.log("Hata Var mı?:", error);

  return (
    <main className="min-h-screen bg-black pb-20">
      {/* Navbar'ı layout.tsx'e koyduysan buraya eklemene gerek yok */}
      
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">
          Canlı <span className="text-[#00f3ff]">Bahisler</span>
        </h1>

        {/* YÜKLENİYORSA */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#00f3ff] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Bahisler Blokzincirinden Yükleniyor...</p>
          </div>
        )}

        {/* VERİ GELDİYSE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches && matches.length > 0 ? (
            matches.map((match: any, index: number) => (
              <RealMarketCard
                key={index}
                id={match.id}       // Sözleşmeden gelen ID
                teamA={match.teamA} // Sözleşmeden gelen Takım A
                teamB={match.teamB} // Sözleşmeden gelen Takım B
                endTime={match.endTime} // Bitiş zamanı
              />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-3 text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xl text-gray-300">Henüz aktif bahis bulunmuyor.</p>
                <p className="text-sm text-gray-500 mt-2">Admin panelinden yeni maç ekleyin.</p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
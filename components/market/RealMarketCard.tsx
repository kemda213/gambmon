"use client";
import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Bookmark, TrendingUp, Loader2, AlertCircle, Trophy, Wallet } from "lucide-react";
import { useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react"; 
import { contract } from "@/lib/contract";
import { toEther } from "thirdweb/utils";
import { cn } from "@/lib/utils";
import { BetModal } from "./BetModal";

interface RealMarketCardProps {
  id: number;
}

export const RealMarketCard = ({ id }: RealMarketCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { mutate: sendTx, isPending: isClaiming } = useSendTransaction();

  const { data: market, isLoading, error } = useReadContract({
    contract,
    // Solidity'den dönen veri sırası: [id, question, endTime, poolA, poolB, resolved, outcome]
    method: "function markets(uint256) view returns (uint256 id, string question, uint256 endTime, uint256 totalOptionA, uint256 totalOptionB, bool resolved, uint256 outcome)",
    params: [BigInt(id)],
  });

  // --- DÜZELTME BURADA YAPILDI ---
  const handleClaim = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Kartın kendisine tıklanmasını engelle
    console.log("Claim butonuna basıldı.");

    // HATA DÜZELTİLDİ: market.resolved yerine market[5] kullanıyoruz
    const isResolved = market?.[5]; 

    if (!isResolved) {
      alert("Bu piyasa henüz sonuçlanmamış veya veri yüklenemedi.");
      return;
    }

    try {
      const transaction = prepareContractCall({
        contract,
        method: "function claimWinnings(uint256 _marketId)",
        params: [BigInt(id)],
      });
      console.log("İşlem gönderiliyor...");
      sendTx(transaction);
    } catch (err) {
      console.error("Hata:", err);
      alert("Bir hata oluştu.");
    }
  };

  if (isLoading) return <GlassCard className="h-[220px] flex items-center justify-center"><Loader2 className="animate-spin text-neon-blue" /></GlassCard>;
  if (error || !market) return null;

  // Verileri Diziden Okuma (Array Indexing)
  const poolA = Number(toEther(market[3]));
  const poolB = Number(toEther(market[4]));
  const totalVolume = poolA + poolB;
  const isResolved = market[5]; // resolved (Boolean)
  const outcome = Number(market[6]); // 1=A, 2=B

  let chanceA = 50;
  if (totalVolume > 0) chanceA = Math.round((poolA / totalVolume) * 100);

  const handleCardClick = () => {
    if (!isResolved) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <GlassCard 
        hoverEffect={!isResolved}
        onClick={handleCardClick}
        className={cn(
          "p-0 h-[220px] flex flex-col justify-between group relative overflow-hidden",
          !isResolved ? "cursor-pointer" : "cursor-default border-neon-blue/30"
        )}
      >
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-20",
          isResolved 
            ? "bg-neon-blue" 
            : (chanceA > 50 ? "bg-neon-green" : "bg-neon-red")
        )} />

        <div className="p-5 relative z-10">
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-3">
               <div className={cn(
                 "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border",
                 isResolved 
                  ? "bg-neon-blue/10 border-neon-blue text-neon-blue" 
                  : "bg-white/5 border-white/10 text-neon-purple"
               )}>
                 {isResolved ? <Trophy size={20} /> : <TrendingUp size={20} />}
               </div>
               <h3 className="text-lg font-medium leading-snug text-white/90 line-clamp-3">
                  {market[1]}
               </h3>
            </div>
            {/* Bookmark butonu şimdilik sadece görsel */}
            <button className="text-gray-500 hover:text-white transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </div>

        <div className="p-5 pt-2 border-t border-glass-border bg-black/20 relative z-10">
          {isResolved ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase">WINNER</span>
                <span className="text-lg font-bold text-neon-blue">
                  {outcome === 1 ? "OPTION A" : "OPTION B"}
                </span>
              </div>
              
              <button 
                onClick={handleClaim} // Düzeltilmiş fonksiyon burada çağrılıyor
                disabled={isClaiming}
                className="flex items-center gap-2 bg-neon-green text-black px-4 py-2 rounded-lg font-bold hover:bg-neon-green/80 transition-all disabled:opacity-50 cursor-pointer z-50"
              >
                {isClaiming ? <Loader2 size={16} className="animate-spin"/> : <Wallet size={18} />}
                CLAIM
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Total Volume</span>
                  <span className="text-sm font-mono text-gray-300">
                      {totalVolume.toFixed(2)} POL
                  </span>
              </div>
              <div className="text-right">
                   <div className={cn("text-xl font-bold", chanceA > 50 ? "text-neon-green" : "text-neon-red")}>
                       %{chanceA}
                   </div>
                   <span className="text-xs text-gray-500">Option A Chance</span>
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      <BetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        marketId={id}
        question={market?.[1] || ""}
      />
    </>
  );
};
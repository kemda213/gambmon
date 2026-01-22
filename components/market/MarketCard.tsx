"use client";
import { GlassCard } from "@/components/shared/GlassCard";
import { Bookmark, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

// Mock Data for Sparkline
const data = [
  { v: 40 }, { v: 30 }, { v: 45 }, { v: 50 }, { v: 48 }, { v: 60 }, { v: 55 }, { v: 65 }
];

interface MarketCardProps {
  id: number;
  question: string;
  volume: string;
  chance: number; // 0-100
  image?: string;
}

export const MarketCard = ({ id, question, volume, chance }: MarketCardProps) => {
  const { savedMarkets, toggleSaveMarket } = useAppStore();
  const isSaved = savedMarkets.includes(id);

  return (
    <GlassCard hoverEffect className="p-0 h-[220px] flex flex-col justify-between group cursor-pointer">
      {/* Üst Kısım: Soru ve Bookmark */}
      <div className="p-5 relative z-10">
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-3">
             {/* Kategori İkonu (Mock) */}
             <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                 <TrendingUp size={20} className="text-neon-purple" />
             </div>
             <h3 className="text-lg font-medium leading-snug text-white/90 line-clamp-2">
                {question}
             </h3>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleSaveMarket(id); }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Bookmark size={20} fill={isSaved ? "white" : "none"} className={isSaved ? "text-white" : ""} />
          </button>
        </div>
      </div>

      {/* Orta Kısım: Grafik (Sparkline) */}
      <div className="h-16 w-full opacity-50 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
                type="monotone" 
                dataKey="v" 
                stroke={chance > 50 ? "#00ff9d" : "#ff0055"} 
                strokeWidth={2} 
                dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alt Kısım: İstatistikler */}
      <div className="p-5 pt-2 flex items-center justify-between border-t border-glass-border bg-black/20">
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Volume</span>
            <span className="text-sm font-mono text-gray-300">{volume}</span>
        </div>
        
        {/* Oran Göstergesi */}
        <div className="text-right">
             <div className={cn("text-xl font-bold", chance > 50 ? "text-neon-green" : "text-neon-red")}>
                 {chance}%
             </div>
             <span className="text-xs text-gray-500">Chance</span>
        </div>
      </div>
    </GlassCard>
  );
};
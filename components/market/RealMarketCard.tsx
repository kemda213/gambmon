"use client";

import { useState } from "react";
// Eğer daha önce oluşturduğumuz BetModal veya BetButton varsa buraya import edebilirsin.
// Şimdilik sadece tasarımı ve veri akışını düzeltiyoruz.

// --- İŞTE HATAYI ÇÖZEN KISIM BURASI ---
// Gelen verilerin tipini (interface) tanımlıyoruz.
interface RealMarketCardProps {
  id: string;
  teamA: string;
  teamB: string;
  endTime: number;
}

export const RealMarketCard = ({ id, teamA, teamB, endTime }: RealMarketCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 hover:border-[#00f3ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]">
      
      {/* Arkaplan Efekti */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f3ff]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#00f3ff]/10 transition-all"></div>

      {/* Üst Bilgi: ID ve Tarih */}
      <div className="flex justify-between items-center mb-6 opacity-60">
        <span className="text-xs font-mono text-zinc-400">MATCH #{id}</span>
        <div className="flex items-center gap-2 text-xs bg-white/5 px-2 py-1 rounded text-zinc-300">
          <span>⏰</span>
          {/* Zamanı okunabilir tarihe çeviriyoruz */}
          {new Date(endTime * 1000).toLocaleDateString("tr-TR", {
            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
          })}
        </div>
      </div>

      {/* Takımlar ve VS */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        {/* Takım A */}
        <div className="text-center w-1/3 group/team">
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-3 border border-blue-500/30 group-hover/team:border-blue-500 transition-all">
            <span className="text-2xl">🏠</span>
          </div>
          <h3 className="font-bold text-white text-lg tracking-tight leading-tight">{teamA}</h3>
          <p className="text-xs text-blue-400 mt-1">Ev Sahibi</p>
        </div>

        {/* VS Logosu */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700 opacity-20">VS</span>
        </div>

        {/* Takım B */}
        <div className="text-center w-1/3 group/team">
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-3 border border-purple-500/30 group-hover/team:border-purple-500 transition-all">
            <span className="text-2xl">✈️</span>
          </div>
          <h3 className="font-bold text-white text-lg truncate tracking-tight">{teamB}</h3>
          <p className="text-xs text-purple-400 mt-1">Deplasman</p>
        </div>
      </div>

      {/* Bahis Butonu (Şimdilik sadece görsel, sonra işlev ekleriz) */}
      <button className="w-full py-3.5 bg-white text-black font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#00f3ff] transition-colors duration-200">
        Bahis Yap
      </button>

    </div>
  );
};
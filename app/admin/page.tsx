"use client";

import AdminMarketCreator from "@/components/AdminMarketCreator";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black pb-20 pt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Başlık ve Uyarı Alanı */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Yönetici <span className="text-red-600">Paneli</span>
          </h1>
          
          <p className="text-gray-400 text-lg">
            Buradan yeni bahisler oluşturabilir ve sistemi yönetebilirsin.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-red-950/30 border border-red-500/30 px-6 py-3 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-400 text-sm font-mono font-bold">
              YETKİLİ CÜZDAN GEREKLİDİR
            </span>
          </div>
        </div>

        {/* --- MAÇ OLUŞTURMA ARACI --- */}
        {/* Az önce oluşturduğumuz bileşeni buraya çağırıyoruz */}
        <div className="bg-[#111] border border-white/10 p-1 rounded-3xl shadow-2xl shadow-red-900/10">
          <AdminMarketCreator />
        </div>

        {/* Bilgilendirme */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Not: Oluşturulan maçlar blokzincirine yazılır ve silinemez.</p>
          <p>Maçın bitiş süresi otomatik olarak 2026 sonuna ayarlanır.</p>
        </div>

      </div>
    </main>
  );
}
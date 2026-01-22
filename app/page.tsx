import { Header } from "@/components/layout/Header";
import { RealMarketCard } from "@/components/market/RealMarketCard";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Header />
      
      <div className="container mx-auto px-4 pt-32">
        
        {/* Başlık Alanı */}
        <div className="mb-12 relative">
             <div className="absolute -top-20 -left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none" />
             <h2 className="text-5xl font-bold mb-4 tracking-tight">
                Predict the <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Future</span>
             </h2>
             <p className="text-xl text-gray-400 max-w-2xl">
                 Live on Polygon Mainnet.
             </p>
        </div>

        {/* Kategoriler */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
            <button className="px-6 py-2 rounded-full border bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.2)] text-sm font-medium">
                All Markets
            </button>
        </div>

        {/* MARKET GRID - Sadece Gerçek Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Sadece ID'si 0 olan (ilk oluşturduğun) kartı çağırıyoruz */}
          <RealMarketCard id={0} />

        </div>
      </div>
    </main>
  );
}
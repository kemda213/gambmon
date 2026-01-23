"use client";

import { useState } from "react";
import { TransactionButton, useReadContract, useActiveAccount } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/contract";

export default function AdminMarketCreator() {
  const [question, setQuestion] = useState("Fenerbahce vs Besiktas");
  const account = useActiveAccount(); // Şu an bağlı olan cüzdan

  // Sözleşmenin Sahibini (Owner) çekiyoruz
  const { data: ownerAddress, isLoading } = useReadContract({
    contract,
    method: "function owner() view returns (address)", 
    params: []
  });

  // Yetki Kontrolü
  // Eğer owner verisi henüz gelmediyse veya cüzdan bağlı değilse false varsay
  const isOwner = account && ownerAddress && account.address.toLowerCase() === ownerAddress.toLowerCase();

  return (
    <div className={`mb-10 p-6 border rounded-2xl transition-all ${isOwner ? "bg-green-950/20 border-green-500/50" : "bg-red-950/20 border-red-500/50"}`}>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{isOwner ? "✅" : "⛔"}</span>
        <h2 className={`text-xl font-bold ${isOwner ? "text-green-400" : "text-red-400"}`}>
          {isOwner ? "Yönetici Paneli (Yetki Onaylandı)" : "YETKİSİZ ERİŞİM"}
        </h2>
      </div>

      {/* Cüzdan Bilgileri - Debug İçin */}
      <div className="mb-6 text-xs font-mono bg-black/40 p-3 rounded text-gray-400">
        <p>Senin Cüzdanın: <span className="text-white">{account?.address || "Bağlı Değil"}</span></p>
        <p>Sözleşme Sahibi: <span className="text-white">{isLoading ? "Yükleniyor..." : ownerAddress}</span></p>
      </div>
      
      {/* Sadece Owner ise Formu Göster */}
      {isOwner ? (
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 bg-black/50 border border-white/20 p-4 rounded-xl text-white focus:border-green-500 outline-none transition-all"
            placeholder="Maç sorusu girin..."
          />

          <TransactionButton
            transaction={() => {
              // 2027 Yılına kadar geçerli tarih (Garanti olsun diye ileri tarih)
              const duration = BigInt(86400); 

              return prepareContractCall({
                contract,
                method: "function createMarket(string _question, string _image, uint256 duration)",
                params: [question, "-", duration]
              });
            }}
            onTransactionConfirmed={() => {
              alert("✅ MAÇ OLUŞTURULDU! Sayfayı yenileyin.");
              window.location.reload();
            }}
            onError={(err) => alert("Hata: " + err.message)}
            className="!bg-green-600 !text-white !font-bold !py-4 !px-8 !rounded-xl hover:!bg-green-500"
          >
            MAÇI OLUŞTUR
          </TransactionButton>
        </div>
      ) : (
        <div className="text-center p-4 bg-red-500/10 rounded-xl text-red-200">
          ⚠️ Bu paneli kullanmak için, sözleşmeyi kuran (deploy eden) cüzdana geçiş yapmalısın.
          <br />
          <span className="text-xs opacity-70">Metamask'tan cüzdan değiştirip sayfayı yenile.</span>
        </div>
      )}
    </div>
  );
}
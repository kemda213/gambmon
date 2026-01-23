"use client";

import { useState } from "react";
import { TransactionButton, useReadContract, useActiveAccount } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/contract";

export default function AdminMarketCreator() {
  const [question, setQuestion] = useState("Fenerbahce vs Besiktas");
  const account = useActiveAccount();

  // Owner kontrolü (Yetkili mi?)
  const { data: ownerAddress } = useReadContract({
    contract,
    method: "function owner() view returns (address)", 
    params: []
  });

  const isOwner = account && ownerAddress && account.address.toLowerCase() === ownerAddress.toLowerCase();

  return (
    <div className={`mb-10 p-6 border rounded-2xl ${isOwner ? "bg-green-950/20 border-green-500/50" : "bg-red-950/20 border-red-500/50"}`}>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{isOwner ? "✅" : "⛔"}</span>
        <h2 className="text-xl font-bold text-white">
          {isOwner ? "Yönetici Paneli" : "YETKİSİZ ERİŞİM"}
        </h2>
      </div>

      {isOwner ? (
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-black/50 border border-white/20 p-4 rounded-xl text-white outline-none"
            placeholder="Maç sorusu girin..."
          />

          <TransactionButton
            transaction={() => {
              // DÜZELTME: Sadece Soru ve Süre gönderiyoruz.
              // 604800 saniye = 7 Gün demek. (Saniye cinsinden süre)
              const duration = BigInt(604800); 

              return prepareContractCall({
                contract,
                // Resim (_image) parametresini sildik! Sadece question ve duration kaldı.
                method: "function createMarket(string _question, uint256 _duration)",
                params: [question, duration]
              });
            }}
            onTransactionConfirmed={() => {
              alert("✅ MAÇ OLUŞTURULDU! Eline sağlık 🚀");
              // Sayfayı yenilemeye gerek yok, ama garanti olsun diye yeniliyoruz
              window.location.reload();
            }}
            onError={(err) => alert("Hata: " + err.message)}
            className="!bg-green-600 !text-white !font-bold !w-full !py-4 !rounded-xl"
          >
            MAÇI OLUŞTUR (7 Günlük)
          </TransactionButton>
        </div>
      ) : (
        <p className="text-red-400">Lütfen Owner cüzdanına geçin.</p>
      )}
    </div>
  );
}
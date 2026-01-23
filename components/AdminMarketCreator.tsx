"use client";

import { useState } from "react";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/contract";

export default function AdminMarketCreator() {
  const [question, setQuestion] = useState("Fenerbahce vs Besiktas");
  
  // Varsayılan olarak bugünden 7 gün sonrasını alıyoruz
  const defaultDate = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);

  return (
    <div className="p-6 bg-red-900/20 border border-red-500 rounded-xl mb-8">
      <h2 className="text-xl font-bold text-red-500 mb-4">⚠️ ADMIN PANELİ (Maç Oluştur)</h2>
      
      <div className="flex gap-4">
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 bg-black border border-white/20 p-3 rounded text-white"
          placeholder="Maç sorusu girin..."
        />

        <TransactionButton
          transaction={() => {
            // Tarihi otomatik olarak 1 hafta sonrasına ayarlıyoruz
            const deadline = BigInt(Math.floor(Date.now() / 1000) + 604800);

            return prepareContractCall({
              contract,
              method: "function createMarket(string _question, string _image, uint256 _deadline)",
              params: [question, "-", deadline] // Image boş tire, Deadline otomatik
            });
          }}
          onTransactionConfirmed={() => alert("✅ MAÇ OLUŞTURULDU! Sayfayı yenile.")}
          onError={(err) => alert("Hata: " + err.message)}
          className="!bg-red-600 !text-white !font-bold"
        >
          Maçı Oluştur
        </TransactionButton>
      </div>
      <p className="text-xs text-gray-400 mt-2">* Sadece yetkili cüzdan (Owner) ile çalışır.</p>
    </div>
  );
}
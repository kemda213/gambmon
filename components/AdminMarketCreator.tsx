"use client";

import { useState } from "react";
import { TransactionButton, useReadContract, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb"; // toWei EKLENDİ
import { contract } from "@/lib/contract";

export default function AdminMarketCreator() {
  const [question, setQuestion] = useState("Fenerbahce vs Besiktas");
  const account = useActiveAccount();

  // Owner kontrolü
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
              // DÜZELTME 1: Tarihi çok uzak yapmıyoruz (2 Gün Sonrası)
              // Bazen kontratlarda "Maksimum 30 gün" gibi sınırlar olur.
              const deadline = BigInt(Math.floor(Date.now() / 1000) + 172800); 

              // DÜZELTME 2: Sahte ama geçerli bir resim URL'si veriyoruz
              const dummyImage = "https://placehold.co/600x400/png";

              return prepareContractCall({
                contract,
                // DÜZELTME 3: 'payable' ekledik
                method: "function createMarket(string _question, string _image, uint256 _deadline) payable",
                params: [question, dummyImage, deadline],
                
                // DÜZELTME 4: 0.05 POL gönderiyoruz (Belki ücret istiyordur)
                // Merak etme, eğer ücret istemiyorsa bu para cüzdanında kalır veya geri döner.
                value: toWei("0.05"), 
              });
            }}
            onTransactionConfirmed={() => {
              alert("✅ MAÇ NİHAYET OLUŞTURULDU! 🚀");
              window.location.reload();
            }}
            onError={(err) => alert("Hata: " + err.message)}
            className="!bg-green-600 !text-white !font-bold !w-full !py-4 !rounded-xl"
          >
            MAÇI OLUŞTUR (0.05 POL İle Dene)
          </TransactionButton>
        </div>
      ) : (
        <p className="text-red-400">Lütfen Owner cüzdanına geçin.</p>
      )}
    </div>
  );
}
"use client";
import { useState } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "@/lib/contract";
import { cn } from "@/lib/utils";

interface BetModalProps {
  marketId: number;
  question: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BetModal = ({ marketId, question, isOpen, onClose }: BetModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null); // true = A (Yes), false = B (No)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] border border-glass-border w-full max-w-md rounded-2xl p-6 relative shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        
        {/* Kapatma Butonu */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Başlık */}
        <h2 className="text-xl font-bold mb-1 text-white pr-8">{question}</h2>
        <p className="text-sm text-gray-400 mb-6">Make your prediction.</p>

        {/* Seçenekler (Evet / Hayır) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setSelectedOption(true)}
            className={cn(
              "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
              selectedOption === true 
                ? "bg-neon-green/10 border-neon-green text-neon-green shadow-[0_0_20px_rgba(0,255,157,0.2)]" 
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
            )}
          >
            <TrendingUp size={24} />
            <span className="font-bold">YES (Option A)</span>
          </button>

          <button
            onClick={() => setSelectedOption(false)}
            className={cn(
              "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
              selectedOption === false 
                ? "bg-neon-red/10 border-neon-red text-neon-red shadow-[0_0_20px_rgba(255,0,85,0.2)]" 
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
            )}
          >
            <TrendingDown size={24} />
            <span className="font-bold">NO (Option B)</span>
          </button>
        </div>

        {/* Tutar Girişi */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Amount (POL)</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black border border-glass-border rounded-lg p-4 text-lg outline-none focus:border-neon-blue transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">POL</span>
          </div>
        </div>

        {/* İşlem Butonu */}
        <TransactionButton
          transaction={() => {
            if (!amount || selectedOption === null) {
              throw new Error("Lütfen bir taraf seçin ve miktar girin.");
            }
            
            // Sözleşmeye giden çağrı
            return prepareContractCall({
              contract,
              method: "function placeBet(uint256 _marketId, bool _optionA) payable",
              params: [BigInt(marketId), selectedOption],
              value: toWei(amount), // Gönderilen para (Msg.value)
            });
          }}
          onTransactionConfirmed={() => {
            alert("Bahis Başarılı! Bol şans! 🚀");
            onClose();
            // Sayfayı yenilemeden veriyi güncellemek için window.location.reload() yapılabilir
            // veya Thirdweb otomatik günceller.
            window.location.reload(); 
          }}
          onError={(err) => alert("Hata: " + err.message)}
          theme={"dark"}
          className="w-full !bg-white !text-black !font-bold !text-lg !py-4 !rounded-xl hover:!bg-gray-200"
        >
          Place Bet
        </TransactionButton>

      </div>
    </div>
  );
};
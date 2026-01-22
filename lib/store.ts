import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  walletAddress: string | null;
  savedMarkets: number[]; // Market ID'leri
  connectWallet: (address: string) => void;
  toggleSaveMarket: (id: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      walletAddress: null,
      savedMarkets: [],
      connectWallet: (address) => set({ walletAddress: address }),
      toggleSaveMarket: (id) =>
        set((state) => {
          const isSaved = state.savedMarkets.includes(id);
          return {
            savedMarkets: isSaved
              ? state.savedMarkets.filter((m) => m !== id)
              : [...state.savedMarkets, id],
          };
        }),
    }),
    { name: 'gambmon-storage' }
  )
);
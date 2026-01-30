// Store/ItemCart.ts
import { create } from "zustand";

type CartStore = {
  totalItem: number;
  setTotal: (total: number) => void;
  increase: (qty?: number) => void;
};

export const useCartItem = create<CartStore>((set) => ({
  totalItem: 0,

  setTotal: (total) => set({ totalItem: total }),

  increase: (qty = 1) => set((state) => ({ totalItem: state.totalItem + qty })),
}));

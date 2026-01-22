import { create } from "zustand";
import axios from "axios";
import type { Cart, CartItem } from "../Components/Organisms/CartList/CartList.types";

type CartState = {
  cart: Cart | null;
  cartCount: number;
  isLoading: boolean;
  error: string | null;
  setCart: (cart: Cart | null) => void;
  setCartItems: (items: CartItem[]) => void;
  setCartCount: (count: number) => void;
  refreshCart: () => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  cartCount: 0,
  isLoading: false,
  error: null,
  setCart: (cart) =>
    set({
      cart,
      cartCount: cart ? cart.items.length : 0,
      error: null,
    }),
  setCartItems: (items) =>
    set((state) => ({
      cart: state.cart
        ? {
          ...state.cart,
          items,
          totalQuantity: items.reduce((a, b) => a + b.quantity, 0),
          totalAmount: items.reduce((a, b) => a + b.price * b.quantity, 0),
        }
        : null,
      cartCount: items.length,
      error: null,
    })),
  setCartCount: (count) =>
    set({
      cartCount: count,
    }),
  refreshCart: async () => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!user) {
      set({ cart: null, cartCount: 0, isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const res = await axios.get<{ data: Cart }>(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/my`,
        { withCredentials: true },
      );

      const cart = res.data.data;
      set({
        cart,
        cartCount: cart.items.length,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to refresh cart:", error);
      set({
        isLoading: false,
        error: "Gagal memuat keranjang",
      });
    }
  },
}));


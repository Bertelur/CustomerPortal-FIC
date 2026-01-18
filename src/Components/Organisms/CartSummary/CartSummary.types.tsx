import type { CartItem } from "../CartList/CartList.types";

export interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  cart: CartItem[];
}

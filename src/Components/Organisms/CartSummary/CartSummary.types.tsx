import type { CartItem } from "../CartList/CartList.types";
import type { AddressResult } from "../../../Pages/Cart";

export interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  cart: CartItem[];
  shippingAddress?: AddressResult | null;
  additionalNotes?: string;
  deliveryMethod?: "pickup" | "delivery";
}

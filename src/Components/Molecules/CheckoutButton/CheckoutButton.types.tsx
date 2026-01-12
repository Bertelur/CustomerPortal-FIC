import type { CartItem } from "../../Organisms/CartList/CartList.types";

export type CheckoutButtonProps = {
  amount: number;
  customerName: string;
  customerEmail: string;
  cart?: CartItem[];
};

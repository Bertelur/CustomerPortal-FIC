export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
export type CardSummaryProps = {
  subtotal: number;
  shipping: number;
  customerName: string;
  customerEmail: string;
  cart?: CartItem[];
};

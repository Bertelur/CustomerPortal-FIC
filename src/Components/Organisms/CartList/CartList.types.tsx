export type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
};

export type Cart = {
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
};

export interface CartListProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, value: number) => void;
}

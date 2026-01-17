export type CartItemProps = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  onQuantityChange: (productId: string, value: number) => void;
  onRemove: () => void;
};

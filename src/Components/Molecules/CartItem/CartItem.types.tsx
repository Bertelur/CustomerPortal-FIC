export type CartItemProps = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  quantity: number;
  unit: string;
  unitValue: number;
  onRemove: () => void;
};

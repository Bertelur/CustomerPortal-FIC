export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  unit: string;
  unitValue: number;
};

export type CartListProps = {
  items: CartItem[];
  onQtyChange: (id: number, value: number) => void;
  onRemove: (id: number, unit: string) => void;
};

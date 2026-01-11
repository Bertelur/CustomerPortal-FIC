export type UnitType = {
  unit: string;
  unitValue: number;
  price: number;
};

export type ProductProps = {
  id: number;
  name: string;
  image: string;
  stock: number;
  units: UnitType[];
};

export interface ProductCardProps {
  product: ProductProps;
  onAddToCart?: (unit: UnitType) => void;
}

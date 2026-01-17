export type UnitType = {
  unit: string;
  unitValue: number;
  price: number;
};

export type ProductProps = {
  id: string;
  name: string;
  imageType?: string;
  imageUrl?: string;
  stock: number;
  price: number;
  sku: string;
  description: string;
  category: string;
  status: string;
};

export interface ProductCardProps {
  product: ProductProps;
  onAddToCart: () => void;
}

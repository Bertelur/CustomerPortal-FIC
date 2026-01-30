export type UnitType = {
  id: string;
  name: string;
};

export type ProductProps = {
  id: string;
  min: number;
  name: string;
  imageType?: string;
  imageUrl?: string;
  stock: number;
  price: number;
  sku: string;
  description: string;
  unit: UnitType;
  category: string;
  status: string;
};

export interface ProductCardProps {
  product: ProductProps;
  onAddToCart?: (product: ProductProps) => Promise<void> | void;
}

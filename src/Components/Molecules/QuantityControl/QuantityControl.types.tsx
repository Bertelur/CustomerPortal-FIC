export type QuantityControlProps = {
  value: number;
  stock?: number;
  unit?: string;
  min?: number;
  onChange: (value: number) => void;
};

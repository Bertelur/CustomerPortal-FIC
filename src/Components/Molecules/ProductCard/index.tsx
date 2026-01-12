import { useState, memo } from "react";
import type { ProductCardProps } from "./ProductProps.types";
import { Button } from "../../Atoms/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Atoms/select";

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedUnit = product.units[selectedIndex];

  return (
    <div className="bg-white rounded-xl hover:shadow-lg transition p-4 w-full sm:w-55 border">
      <div className="gap-2 flex flex-col">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg"
          loading="lazy"
          decoding="async"
        />
        <h2 className="mt-3 font-medium line-clamp-2">{product.name}</h2>
        <Select
          value={selectedIndex.toString()}
          onValueChange={(value) => setSelectedIndex(Number(value))}
        >
          <SelectTrigger className="w-full bg-gray-100">
            <SelectValue placeholder="Pilih satuan" />
          </SelectTrigger>
          <SelectContent>
            {product.units.map((u, i) => (
              <SelectItem key={i} value={i.toString()}>
                {u.unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-orange-500 font-semibold mt-1">
          Rp {selectedUnit.price.toLocaleString("id-ID")}
        </p>
      </div>

      <Button
        onClick={() => onAddToCart?.(selectedUnit)}
        className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600"
      >
        + Keranjang
      </Button>
    </div>
  );
});

export default ProductCard;

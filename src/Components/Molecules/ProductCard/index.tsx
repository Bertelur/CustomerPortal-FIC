import { useState } from "react";
import type { ProductCardProps } from "./ProductProps.types";
import { Button } from "../../Atoms/Button";

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedUnit = product.units[selectedIndex];

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 w-full sm:w-55 border">
      <div className="">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg"
        />
        <p className="mt-3 font-medium line-clamp-2">{product.name}</p>
        <select
          value={selectedIndex}
          className="w-fit px-3 py-2 outline-none flex ring-0 focus:ring-0 focus:outline-none bg-transparent"
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {product.units.map((u, i) => (
            <option value={i}>{u.unit}</option>
          ))}
        </select>
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
}

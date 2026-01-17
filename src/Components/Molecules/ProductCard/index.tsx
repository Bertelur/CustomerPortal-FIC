import type { ProductCardProps } from "./ProductProps.types";
import { Button } from "../../Atoms/Button";

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 w-full sm:w-55 border">
      <div className="">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg"
        />
        <p className="mt-3 font-medium line-clamp-2">{product.name}</p>
        <p className="text-orange-500 font-semibold mt-1">
          Rp {product.price.toLocaleString("id-ID")} /Kg
        </p>
      </div>

      <Button
        onClick={onAddToCart}
        className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600"
      >
        + Keranjang
      </Button>
    </div>
  );
}

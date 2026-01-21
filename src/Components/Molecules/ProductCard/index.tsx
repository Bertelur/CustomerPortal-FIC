import { useId, useState } from "react";
import type { ProductCardProps } from "./ProductProps.types";
import { Button } from "../../Atoms/Button";
import { Card, CardContent, CardFooter } from "../../Atoms/Card/card";
import { Loader2 } from "lucide-react";

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const priceId = useId();
  const statusId = useId();

  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!onAddToCart || isAdding) return;
    setIsAdding(true);
    try {
      await Promise.resolve(onAddToCart(product));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="max-sm:w-60 max-sm:h-100">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="inset-0 w-full h-60 object-cover rounded-lg"
        loading="lazy"
      />
      <CardContent>
        <div className="space-y-2">
          <h2 className="line-clamp-2 text-sm sm:text-lg font-semibold mt-4 sm:h-14">
            {product.name}
          </h2>

          <div className="flex flex-col items-start justify-between gap-1">
            <div className="min-w-0">
              <p
                id={priceId}
                className="mt-0.5 text-base font-semibold text-orange-600"
                aria-live="polite"
              >
                Rp {product.price.toLocaleString("id-ID")} /Kg
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-sm  text-gray-400" aria-live="polite">
                Sisa Stok: {product.stock}Kg
              </p>
            </div>
          </div>
          <p id={statusId} className="sr-only" role="status" aria-live="polite">
            {isAdding ? "Menambahkan ke keranjang..." : ""}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pb-4 ">
        <Button
          type="button"
          onClick={handleAdd}
          className="w-full"
          disabled={
            isAdding || product.stock === 0 || product.status === "inactive"
          }
          aria-busy={isAdding}
          aria-describedby={statusId}
          aria-label={`Tambah ${product.name} ke keranjang`}
        >
          {isAdding ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Menambahkan...
            </span>
          ) : (
            "+ Keranjang"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

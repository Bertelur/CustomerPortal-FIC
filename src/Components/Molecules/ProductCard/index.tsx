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
    <Card className="w-full overflow-hidden">
      <CardContent className="min-h-80">
        <div className="space-y-4">
          {/* Image */}
          <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h2 className="line-clamp-2 text-base font-semibold leading-snug sm:h-12">
            {product.name}
          </h2>

          {/* Controls + Price */}
          <div className="flex flex-col justify-between gap-3">
            <div className="">
              <p
                id={priceId}
                className="text-base font-semibold text-orange-600"
                aria-live="polite"
              >
                Rp {product.price.toLocaleString("id-ID")} /Kg
              </p>
            </div>
          </div>
          <p id={statusId} className="sr-only" role="status" aria-live="polite">
            {isAdding ? "Menambahkan ke keranjang..." : ""}
          </p>
        </div>
      </CardContent>

      <CardFooter className="">
        <Button
          type="button"
          onClick={handleAdd}
          className="w-full"
          disabled={isAdding}
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

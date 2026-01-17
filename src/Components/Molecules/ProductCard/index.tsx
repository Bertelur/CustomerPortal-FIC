import { useId, useState } from "react";
import type { ProductCardProps } from "./ProductProps.types";
import { Button } from "../../Atoms/Button";
import { Card, CardContent, CardFooter } from "../../Atoms/Card/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Atoms/Select/select";
import { Loader2 } from "lucide-react";

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const selectId = useId();
  const priceId = useId();
  const statusId = useId();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const selectedUnit = product.units[selectedIndex];

  const handleAdd = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      await Promise.resolve(onAddToCart?.(selectedUnit));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Image */}
          <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h2 className="line-clamp-2 text-base font-semibold leading-snug">
            {product.name}
          </h2>

          {/* Controls + Price */}
          <div className="flex flex-col items-end justify-between gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Harga</p>
              <p
                id={priceId}
                className="text-base font-semibold text-orange-600"
                aria-live="polite"
              >
                Rp {selectedUnit.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="min-w-0">
              <label
                htmlFor={selectId}
                className="mb-1 block text-xs font-medium text-muted-foreground"
              >
                Unit
              </label>

              <Select
                value={String(selectedIndex)}
                onValueChange={(value) => setSelectedIndex(Number(value))}
                disabled={isAdding}
              >
                <SelectTrigger
                  id={selectId}
                  aria-describedby={priceId}
                  className="h-10 w-[160px]"
                >
                  <SelectValue placeholder="Pilih unit" />
                </SelectTrigger>

                <SelectContent>
                  {product.units.map((u, i) => (
                    <SelectItem key={i} value={String(i)}>
                      {u.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SR-only status for add-to-cart */}
          <p id={statusId} className="sr-only" role="status" aria-live="polite">
            {isAdding ? "Menambahkan ke keranjang..." : ""}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          type="button"
          onClick={handleAdd}
          className="w-full"
          disabled={isAdding}
          aria-busy={isAdding}
          aria-describedby={statusId}
          aria-label={`Tambah ${product.name} (${selectedUnit.unit}) ke keranjang`}
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

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
  const uid = useId().replace(/[:]/g, "");
  const selectId = `unit-${uid}`;
  const priceId = `price-${uid}`;
  const statusId = `status-${uid}`;

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

  const getUnitHelperText = () => {
    const tray = product.units.find((u) => /tray/i.test(u.unit));
    const karton = product.units.find((u) => /(karton|carton)/i.test(u.unit));

    if (!tray || !karton) return null;

    const trayLabel = "Tray";
    const kartonLabel = "Karton";

    if (selectedUnit.unit === karton.unit) {
      return `Info: 1 ${kartonLabel} = ${karton.unitValue} ${trayLabel}`;
    }

    if (selectedUnit.unit === tray.unit) {
      const value = 1 / karton.unitValue;
      const formatted =
        value >= 1 ? String(value) : value.toFixed(2).replace(/\.00$/, "");
      return `Info: 1 ${trayLabel} = ${formatted} ${kartonLabel}`;
    }

    return null;
  };

  const helperText = getUnitHelperText();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <img
            src={product.image}
            alt={product.name}
            className="inset-0 w-full h-32 object-cover rounded-lg"
            loading="lazy"
          />

          <h2 className="line-clamp-2 text-sm sm:text-lg font-semibold mt-4">
            {product.name}
          </h2>

          <div className="flex flex-col items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                id={priceId}
                className="mt-0.5 text-base font-semibold text-orange-600"
                aria-live="polite"
              >
                Rp {selectedUnit.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="w-full shrink-0">
              <label
                htmlFor={selectId}
                className="mb-1 block text-sm font-medium text-muted-foreground"
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
                  className="h-10 w-full"
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

              {helperText && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {helperText}
                </p>
              )}
            </div>
          </div>

          <p id={statusId} className="sr-only" role="status" aria-live="polite">
            {isAdding ? "Menambahkan ke keranjang..." : ""}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2">
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

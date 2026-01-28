import { useId, useState, useMemo } from "react";
import type { ProductCardProps } from "./ProductProps.types";
import { Button } from "../../Atoms/Button";
import { Card, CardContent, CardFooter } from "../../Atoms/Card/card";
import {
  Loader2,
  Heart,
  ShoppingCartIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const priceId = useId();
  const statusId = useId();

  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOutOfStock = useMemo(() => product.stock === 0, [product.stock]);

  const handleAdd = async () => {
    if (!onAddToCart || isAdding || isOutOfStock) return;

    setIsAdding(true);

    try {
      await Promise.resolve(onAddToCart(product));

      toast.success("Berhasil ditambahkan ke keranjang", {
        icon: <ShoppingCartIcon className="size-4" />,
      });
    } catch {
      toast.error("Gagal menambahkan ke keranjang", {
        icon: <AlertTriangleIcon className="size-4" />,
        action: {
          label: "Cek kembali stok produk",
          onClick: () => {
            window.location.reload();
          },
        },
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="group relative max-sm:w-60 max-sm:h-100 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Stock Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
              isOutOfStock ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {isOutOfStock ? "Habis" : "Tersedia"}
          </span>
        </div>

        {/* Wishlist Icon */}
        <Button
          type="button"
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 shadow-sm transition-all hover:bg-white hover:scale-110"
          aria-label="Tambahkan ke wishlist"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>

        {/* Produk Habis Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white">
              Produk Habis
            </span>
          </div>
        )}
      </div>

      <CardContent>
        <div className="space-y-2">
          <h2 className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-900 min-h-10 capitalize">
            {product.name}
          </h2>

          <div className="flex flex-col items-start justify-between gap-1">
            <div className="min-w-0">
              <p
                id={priceId}
                className="text-lg font-bold text-orange-600"
                aria-live="polite"
              >
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-500">/Kg</p>
            </div>
            <div className="min-w-0">
              <p
                className={`text-xs ${
                  isOutOfStock ? "text-red-500" : "text-gray-500"
                }`}
                aria-live="polite"
              >
                Stok: {product.stock}Kg
              </p>
            </div>
          </div>
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
          disabled={isAdding || isOutOfStock || product.status === "inactive"}
          aria-busy={isAdding}
          aria-describedby={statusId}
          aria-label={`Tambah ${product.name} ke keranjang`}
        >
          {isAdding ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Menambahkan...
            </span>
          ) : isOutOfStock ? (
            "Produk Habis"
          ) : (
            "+ Keranjang"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

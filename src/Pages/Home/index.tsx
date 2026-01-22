import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategorizedProducts from "../../Components/Organisms/CategorizedProducts";
import CategoryFilter from "../../Components/Molecules/CategoryFilter";
import AdCarousel from "../../Components/Organisms/AdCarousel";
import type { ProductProps } from "../../Components/Molecules/ProductCard/ProductProps.types";
import { useProductStore } from "../../Store/ProductStore";
import { useCartStore } from "../../Store/CartStore";
import { isLoggedIn } from "../../Lib/auth";
import AuthDialog from "../../Components/Organisms/AuthDialog";
import { ProductCardSkeleton } from "../../Components/Molecules/SkeletonCard";

const fetchProducts = async (): Promise<ProductProps[]> => {
  const res = await axios.get<{ data: ProductProps[] }>(
    `${import.meta.env.VITE_API_URL}/api/v1/products`,
  );
  return res.data.data;
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const setProducts = useProductStore((state) => state.setProducts);
  const refreshCart = useCartStore((state) => state.refreshCart);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts]);

  const addToCart = async (product: ProductProps) => {
    if (!isLoggedIn()) {
      setAuthDialogOpen(true);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/items`,
        {
          productId: product.id,
          quantity: 1,
        },
        { withCredentials: true },
      );
      void refreshCart();
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <div>
      <AdCarousel />

      <div className="mx-auto my-8 w-full max-w-screen-2xl px-2 sm:px-6 lg:px-10 xl:px-14">
        {/* Filters Section */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
          <div className="flex items-center gap-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex h-40 items-center justify-center text-sm text-red-500">
            Gagal memuat produk. Silakan refresh halaman.
          </div>
        )}

        {/* Products */}
        {!isLoading && !isError && (
          <>
            <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
            <CategorizedProducts
              selectedCategory={selectedCategory}
              onAddToCart={addToCart}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

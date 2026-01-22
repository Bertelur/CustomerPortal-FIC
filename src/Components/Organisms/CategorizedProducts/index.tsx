import { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import ProductCard from "../../Molecules/ProductCard";
import type { ProductProps } from "../../Molecules/ProductCard/ProductProps.types";
import { Button } from "../../Atoms/Button";
import { useProductStore } from "../../../Store/ProductStore";
import { useProductSearch } from "../../../Lib/hooks/useProductSearch";
import { useSearchStore } from "../../../Store/SearchStore";

type CategorizedProductsProps = {
  selectedCategory: string | null;
  onAddToCart: (product: ProductProps) => Promise<void> | void;
};

export default function CategorizedProducts({
  selectedCategory,
  onAddToCart,
}: CategorizedProductsProps) {
  const products = useProductStore((state) => state.products);
  const search = useSearchStore((state) => state.search);

  // Get filtered products based on search
  const filteredProducts = useProductSearch(products, search);

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, ProductProps[]> = {};

    // If a category is selected, only show that category
    if (selectedCategory) {
      const categoryProducts = filteredProducts.filter(
        (p) => p.category === selectedCategory,
      );
      if (categoryProducts.length > 0) {
        grouped[selectedCategory] = categoryProducts;
      }
      return grouped;
    }

    // Otherwise, group all filtered products by category
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    return grouped;
  }, [filteredProducts, selectedCategory]);

  const categoryEntries = Object.entries(productsByCategory);

  if (categoryEntries.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-gray-500">
        Tidak ada produk ditemukan.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categoryEntries.map(([category, categoryProducts]) => (
        <CategorySection
          key={category}
          category={category}
          products={categoryProducts}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

type CategorySectionProps = {
  category: string;
  products: ProductProps[];
  onAddToCart: (product: ProductProps) => Promise<void> | void;
};

function CategorySection({
  category,
  products,
  onAddToCart,
}: CategorySectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mx-auto w-full max-w-screen-2xl">
      {/* Category Header */}
      <div className="mb-4 flex items-start justify-between gap-3 sm:items-center">
        <h2 className="text-lg font-semibold leading-tight sm:text-2xl capitalize">
          {category}
        </h2>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <TbArrowLeft size={22} />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <TbArrowRight size={22} />
          </Button>
        </div>
      </div>

      {/* Products Carousel */}
      <Swiper
        spaceBetween={15}
        slidesPerView={1.25}
        breakpoints={{
          350: { slidesPerView: 1.35, spaceBetween: 12 },
          400: { slidesPerView: 1.5, spaceBetween: 12 },
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import ProductCard from "../../Molecules/ProductCard";
import type { ProductProps } from "../../Molecules/ProductCard/ProductProps.types";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { useSearchStore } from "../../../Store/SearchStore";
import { useCartStore } from "../../../Store/CartStore";
import { useProductStore } from "../../../Store/ProductStore";
import { useProductSearch } from "../../../Lib/hooks/useProductSearch";
import { isLoggedIn } from "../../../Lib/auth";
import AuthDialog from "../AuthDialog";

interface ProductCarouselProps {
  title: string;
}

export default function ProductCarousel({ title }: ProductCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const search = useSearchStore((value) => value.search);
  const refreshCart = useCartStore((state) => state.refreshCart);
  const products = useProductStore((state) => state.products);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Use optimized search hook
  const filteredProducts = useProductSearch(products, search);

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
    <>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      <section className="mx-auto my-8 w-full max-w-screen-2xl px-2 sm:px-6 lg:px-10 xl:px-14 max-sm:pb-20">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3 sm:items-center">
          <h2 className="text-lg font-semibold leading-tight sm:text-2xl">
            {title}
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
          {filteredProducts.length === 0 ? (
            <SwiperSlide>
              <div className="flex h-40 items-center justify-center text-sm text-gray-500">
                Tidak ada produk ditemukan.
              </div>
            </SwiperSlide>
          ) : (
            filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>
    </>
  );
}

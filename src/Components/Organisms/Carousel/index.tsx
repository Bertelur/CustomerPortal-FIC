import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import ProductCard from "../../Molecules/ProductCard";
import type { ProductProps } from "../../Molecules/ProductCard/ProductProps.types";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { ProductCardSkeleton } from "../../Molecules/SkeletonCard";
import { useQuery } from "@tanstack/react-query";

interface ProductCarouselProps {
  title: string;
}

/* 🔹 fetcher di luar komponen agar stabil */
const fetchProducts = async (): Promise<ProductProps[]> => {
  const res = await axios.get<{ data: ProductProps[] }>(
    `${import.meta.env.VITE_API_URL}/api/v1/products`,
  );
  console.log(res);
  return res.data.data;
};

export default function ProductCarousel({ title }: ProductCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  /* ✅ React Query handle cache + loading + error */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addToCart = async (product: ProductProps) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/items`,
        {
          productId: product.id,
          quantity: 1,
        },
        { withCredentials: true },
      );

      console.log("Add to cart success:", response.data);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <section className="mx-auto my-8 w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14">
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
        spaceBetween={12}
        slidesPerView={1.15}
        watchOverflow
        breakpoints={{
          480: { slidesPerView: 1.35, spaceBetween: 12 },
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      >
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <SwiperSlide key={i}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}

        {isError && (
          <SwiperSlide>
            <div className="flex h-40 items-center justify-center text-sm text-red-500">
              Gagal memuat produk.
            </div>
          </SwiperSlide>
        )}

        {!isLoading &&
          !isError &&
          data?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Mobile arrows */}
      <div className="mt-4 flex items-center justify-between gap-2 sm:hidden">
        <Button
          type="button"
          variant="outline"
          className="h-10 flex-1"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <TbArrowLeft size={20} />
            Prev
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-10 flex-1"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <span className="inline-flex items-center justify-center gap-2">
            Next
            <TbArrowRight size={20} />
          </span>
        </Button>
      </div>
    </section>
  );
}

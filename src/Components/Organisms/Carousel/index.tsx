import { useMemo, useRef } from "react";
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
import { useSearchStore } from "../../../Store/SearchStore";

interface ProductCarouselProps {
  title: string;
}

const fetchProducts = async (): Promise<ProductProps[]> => {
  const res = await axios.get<{ data: ProductProps[] }>(
    `${import.meta.env.VITE_API_URL}/api/v1/products`,
  );
  console.log(res);
  return res.data.data;
};

export default function ProductCarousel({ title }: ProductCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const search = useSearchStore((value) => value.search);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const filteredProducts = useMemo(() => {
    if (!search) return data;
    return data?.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const addToCart = async (product: ProductProps) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/items`,
        {
          productId: product.id,
          quantity: 1,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
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
        slidesPerView={1.5}
        breakpoints={{
          480: { slidesPerView: 1.35, spaceBetween: 12 },
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        className="mySwiper"
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
          filteredProducts?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}

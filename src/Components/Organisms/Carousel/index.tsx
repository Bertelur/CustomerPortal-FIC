import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import ProductCard from "../../Molecules/ProductCard";
import type { ProductProps } from "../../Molecules/ProductCard/ProductProps.types";
import { Button } from "../../Atoms/Button";
import axios from "axios";

interface ProductCarouselProps {
  title: string;
}

export default function ProductCarousel({ title }: ProductCarouselProps) {
  const [dataProduct, setDataProduct] = useState<ProductProps[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<{ data: ProductProps[] }>(
          `${import.meta.env.VITE_API_URL}/api/v1/products`,
        );
        console.log(res);
        setDataProduct(res.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);
  const addToCart = async (product: ProductProps) => {
    try {
      const payload = {
        productId: product.id,
        quantity: 1,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/items`,
        payload,
        { withCredentials: true },
      );

      console.log("Add to cart success:", res.data);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <section className="mx-auto my-8 w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* Header (responsive) */}
      <div className="mb-4 flex items-start justify-between gap-3 sm:items-center">
        <h2 className="text-lg font-semibold leading-tight sm:text-2xl">
          {title}
        </h2>

        {/* Desktop/Tablet arrows */}
        <div className="hidden items-center gap-2 sm:flex">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Sebelumnya"
          >
            <TbArrowLeft size={22} />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Berikutnya"
          >
            <TbArrowRight size={22} />
          </Button>
        </div>
      </div>

      <Swiper
        // Better mobile feel: little “peek” and tighter spacing, then scale up
        spaceBetween={12}
        slidesPerView={1.15}
        centeredSlides={false}
        watchOverflow
        breakpoints={{
          480: { slidesPerView: 1.35, spaceBetween: 12 },
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        className=""
      >
        {dataProduct.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            {/* Ensure cards stretch nicely */}
            <div className="h-full">
              <ProductCard
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile arrows (below carousel) */}
      <div className="mt-4 flex items-center justify-between gap-2 sm:hidden">
        <Button
          type="button"
          variant="outline"
          className="h-10 flex-1"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Sebelumnya"
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
          aria-label="Berikutnya"
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

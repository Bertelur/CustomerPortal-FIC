import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
    <div className="my-10 mx-4 lg:px-16 xl:px-80">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex gap-3 max-sm:hidden">
          <Button
            type="button"
            variant="outline"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <TbArrowLeft size={28} />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <TbArrowRight size={28} />
          </Button>
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      >
        {dataProduct.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import ProductCard from "../../Molecules/ProductCard";
import type {
  ProductProps,
  UnitType,
} from "../../Molecules/ProductCard/ProductProps.types";

interface ProductCarouselProps {
  title: string;
  products: ProductProps[];
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  quantity: number;
  unit: string;
  unitValue: number;
}

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const CART_KEY = "cart";
  const getCart = (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  };
  const addToCart = (product: ProductProps, unit: UnitType) => {
    const cart = getCart();

    const existing = cart.find(
      (item) => item.id === product.id && item.unit === unit.unit
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        stock: product.stock,
        unit: unit.unit,
        unitValue: unit.unitValue,
        price: unit.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="my-10 mx-4 lg:px-16 xl:px-80">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex gap-3 max-sm:hidden">
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <TbArrowLeft size={28} />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <TbArrowRight size={28} />
          </button>
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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={(unit) => addToCart(product, unit)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

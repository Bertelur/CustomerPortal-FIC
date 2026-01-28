import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import type { AdSlide } from "./AdCarousel.types";

// Hardcoded ads data - can be moved to API later
const ads: AdSlide[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1554888468-1d0417fe3af6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Promo Awal Tahun",
    link: "#",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop",
    alt: "Diskon Spesial",
    link: "#",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1170&auto=format&fit=crop",
    alt: "Produk Terbaru",
    link: "#",
  },
];

export default function AdCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideClick = (ad: AdSlide) => {
    if (ad.link && ad.link !== "#") {
      window.location.href = ad.link;
    }
  };

  return (
    <div className="mx-auto my-8 w-full max-w-screen-2xl px-2 sm:px-6 lg:px-10 xl:px-14">
      <div className="relative h-55 rounded-tl-2xl rounded-bl-2xl sm:h-75 md:h-95">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".ad-carousel-prev",
            nextEl: ".ad-carousel-next",
          }}
          pagination={{
            clickable: true,
            el: ".ad-carousel-pagination",
            bulletClass: "ad-carousel-bullet",
            bulletActiveClass: "ad-carousel-bullet-active",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-full w-full"
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <div
                className="h-full w-full cursor-pointer"
                onClick={() => handleSlideClick(ad)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSlideClick(ad);
                  }
                }}
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button
          type="button"
          className="ad-carousel-prev absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white hover:scale-110"
          aria-label="Previous slide"
        >
          <TbArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          type="button"
          className="ad-carousel-next absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white hover:scale-110"
          aria-label="Next slide"
        >
          <TbArrowRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Custom Pagination Dots */}
        <div className="ad-carousel-pagination absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-2" />
      </div>

      <style>{`
        .ad-carousel-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ad-carousel-bullet-active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

import ProductCarousel from "../../Components/Organisms/Carousel";
import { productData } from "../../Data/productData";
const Home = () => {
  return (
    <div>
      <div className="w-full h-55 sm:h-75 md:h-95 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554888468-1d0417fe3af6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero"
          className="w-full h-full object-cover"
        />
      </div>
      <ProductCarousel title="Produk Terlaris" products={productData} />
    </div>
  );
};

export default Home;

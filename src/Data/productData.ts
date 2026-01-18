import type { ProductProps } from "../Components/Molecules/ProductCard/ProductProps.types";

export const productData: ProductProps[] = [
  {
    id: 1,
    name: "Telur Ayam Negeri",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc",
    stock: 500,
    units: [
      { unit: "Tray", unitValue: 1, price: 66000 },
      { unit: "Karton", unitValue: 12, price: 792000 },
    ],
  },
  {
    id: 2,
    name: "Telur Omega 3",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc",
    stock: 300,
    units: [
      { unit: "Tray", unitValue: 1, price: 69950 },
      { unit: "Karton", unitValue: 12, price: 839500 },
    ],
  },
];

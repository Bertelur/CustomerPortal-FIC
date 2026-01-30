import { create } from "zustand";
import type { ProductProps } from "../Components/Molecules/ProductCard/ProductProps.types";

type ProductState = {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
  getProductsByCategory: (category: string | null) => ProductProps[];
  getFilteredProducts: (
    category: string | null,
    searchQuery: string,
  ) => ProductProps[];
  getCategories: () => string[];
  getCategoryCount: (category: string) => number;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getProductsByCategory: (category) => {
    const { products } = get();
    if (!category) return products;
    return products.filter((p) => p.category === category);
  },
  getFilteredProducts: (category, searchQuery) => {
    const { products } = get();
    let filtered = products;

    // Filter by category
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query),
      );
    }

    return filtered;
  },
  getCategories: () => {
    const { products } = get();
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
  },
  getCategoryCount: (category) => {
    const { products } = get();
    return products.filter((p) => p.category === category).length;
  },
}));

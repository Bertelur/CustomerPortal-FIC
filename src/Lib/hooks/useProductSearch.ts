import { useMemo, useEffect, useState } from "react";
import type { ProductProps } from "../../Components/Molecules/ProductCard/ProductProps.types";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Optimized search function
function searchProducts(
  products: ProductProps[],
  query: string,
): ProductProps[] {
  if (!query.trim()) return products;

  const searchTerm = query.toLowerCase().trim();
  const searchWords = searchTerm.split(/\s+/);

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.description || "",
      product.category,
      product.sku,
    ]
      .join(" ")
      .toLowerCase();

    // Match all words (AND logic)
    return searchWords.every((word) => searchableText.includes(word));
  });
}

// Main hook for product search
export function useProductSearch(
  products: ProductProps[],
  searchQuery: string,
  debounceMs: number = 300,
): ProductProps[] {
  const debouncedQuery = useDebounce(searchQuery, debounceMs);

  const filteredProducts = useMemo(() => {
    return searchProducts(products, debouncedQuery);
  }, [products, debouncedQuery]);

  return filteredProducts;
}

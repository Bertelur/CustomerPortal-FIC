import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Atoms/Select/select";
import { useProductStore } from "../../../Store/ProductStore";

type CategoryFilterProps = {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const getCategories = useProductStore((state) => state.getCategories);
  const getCategoryCount = useProductStore((state) => state.getCategoryCount);

  const categories = useMemo(() => getCategories(), [getCategories]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <Select
      value={selectedCategory || "all"}
      onValueChange={(value) =>
        onCategoryChange(value === "all" ? null : value)
      }
    >
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="Pilih Kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Kategori</SelectItem>
        {categories.map((category) => {
          const count = getCategoryCount(category);
          return (
            <SelectItem key={category} value={category}>
              {category} ({count})
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

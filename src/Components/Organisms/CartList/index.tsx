import CartItem from "../../Molecules/CartItem";
import type { CartListProps } from "./CartList.types";

export default function CartList({
  items,
  onRemove,
  onQuantityChange,
}: CartListProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>

      {items.map((item) => (
        <CartItem
          key={`${item.id}-${item.unit}`}
          {...item}
          onQuantityChange={(value: number) => onQuantityChange(item.id, value)}
          onRemove={() => onRemove(item.id, item.unit)}
        />
      ))}
    </div>
  );
}

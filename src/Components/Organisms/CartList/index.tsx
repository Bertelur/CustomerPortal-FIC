import { IoCart } from "react-icons/io5";
import CartItem from "../../Molecules/CartItem";
import type { CartListProps } from "./CartList.types";

export default function CartList({
  items,
  onRemove,
  onQuantityChange,
}: CartListProps) {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl p-6 shadow-xl">
      <div className="text-xl font-bold mb-4 flex items-center gap-2">
        <IoCart size={28} className="text-orange-600" />
        <p>Cart</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <CartItem
            {...item}
            onRemove={() => onRemove(item.productId)}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}

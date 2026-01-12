import { memo } from "react";
import { Button } from "../../Atoms/Button";
import QuantityControl from "../QuantityControl";
import type { CartItemProps } from "./CartItem.types";

const CartItem = memo(function CartItem({
  name,
  price,
  image,
  quantity,
  stock,
  unit,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-4 last:border-none">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p>{unit}</p>
          <p className="text-sm text-gray-500">
            Rp {price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <QuantityControl
          stock={stock}
          value={quantity}
          onChange={(value) => onQuantityChange(value)}
        />
        <Button
          onClick={onRemove}
          className="text-red-500 bg-white hover:bg-gray-100"
        >
          Hapus
        </Button>
      </div>
    </div>
  );
});

export default CartItem;

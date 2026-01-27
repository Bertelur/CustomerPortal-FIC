import { TbTrash } from "react-icons/tb";
import { Button } from "../../Atoms/Button";
import QuantityControl from "../QuantityControl";
import type { CartItemProps } from "./CartItem.types";
import { useProductStore } from "../../../Store/ProductStore";

export default function CartItem({
  productId,
  name,
  price,
  imageUrl,
  quantity,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === productId),
  );

  return (
    <div
      key={productId}
      className="flex flex-col md:flex-row md:justify-between transition-colors"
    >
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="h-20 w-20 rounded-lg object-cover border"
        />
        {price && (
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">
              Rp {price.toLocaleString("id-ID")}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <QuantityControl
          stock={product?.stock}
          value={quantity}
          onChange={(val) => onQuantityChange(productId, val)}
        />
        <Button onClick={onRemove} className=" bg-red-600 hover:bg-red-700">
          <TbTrash />
        </Button>
      </div>
    </div>
  );
}

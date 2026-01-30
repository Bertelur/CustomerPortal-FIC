import type { QuantityControlProps } from "./QuantityControl.types";
export default function QuantityControl({
  value,
  stock,
  unit,
  min,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2 capitalize">
      <input
        type="number"
        min={min ?? 1}
        max={stock}
        value={value}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!Number.isNaN(val)) {
            onChange?.(val); // ✅ trigger ke atas
          }
        }}
        className="w-10 text-center border rounded"
      />
      {unit}
    </div>
  );
}

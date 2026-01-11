import { useEffect, useState } from "react";
import CartList from "../../Components/Organisms/CartList";
import CartSummary from "../../Components/Organisms/CartSummary";
import EmptyCart from "../../Components/Organisms/EmptyCart";
import type { CartItem } from "../../Components/Organisms/CartList/CartList.types";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const CART_KEY = "cart";

  const getCart = (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    setCartItems(getCart());
  }, []);
  const updateQuantity = (id: number, value: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(item.stock, Math.max(1, value)),
            }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id: number, unit: string) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.id === id && item.unit === unit)
      );
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  if (cartItems.length === 0) return <EmptyCart />;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList
            items={cartItems}
            onRemove={(id, unit) => removeItem(id, unit)}
            onQuantityChange={updateQuantity}
          />
        </div>

        <CartSummary
          customerEmail="dio@gmail.com"
          customerName="dio"
          subtotal={subtotal}
          shipping={25}
          cart={cartItems}
        />
      </div>
    </div>
  );
}

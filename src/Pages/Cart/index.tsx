import { useEffect, useState } from "react";
import CartSummary from "../../Components/Organisms/CartSummary";
import EmptyCart from "../../Components/Organisms/EmptyCart";
import type { Cart } from "../../Components/Organisms/CartList/CartList.types";
import axios from "axios";
import CartList from "../../Components/Organisms/CartList";
import { Truck } from "lucide-react";
import ShippingAddressForm from "../../Components/Organisms/ShippingAddress";

export type AddressResult = {
  label: string;
  lat: number;
  lon: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<AddressResult | null>(
    null,
  );
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup",
  );
  // ================= FETCH DATA =================
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user?.address) {
      setShippingAddress(user.address);
      setDeliveryMethod("delivery"); // opsional: langsung set ke delivery
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get<{ data: Cart }>(
          `${import.meta.env.VITE_API_URL}/api/v1/cart/my`,
          { withCredentials: true },
        );
        setCart(res.data.data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (deliveryMethod === "pickup") {
      setShipping(0);
      setDistance(0);
      setShippingAddress(null);
      setError("");
    }
  }, [deliveryMethod]);

  // ================= HITUNG ONGKIR SAAT PILIH ALAMAT =================
  useEffect(() => {
    if (!shippingAddress || deliveryMethod !== "delivery") return;

    const t = setTimeout(() => {
      calculateShippingFromCoord(shippingAddress.lat, shippingAddress.lon);
    }, 500);

    return () => clearTimeout(t);
  }, [shippingAddress, deliveryMethod]);

  // ================= HITUNG ONGKIR =================
  const calculateShippingFromCoord = async (lat: number, lon: number) => {
    try {
      const store = { lat: -6.901499, lon: 107.647224 };

      const url = `https://router.project-osrm.org/route/v1/driving/${store.lon},${store.lat};${lon},${lat}?overview=false`;

      const res = await axios.get(url);

      if (!res.data.routes?.length) throw new Error("Route tidak ditemukan");

      const distanceMeter = res.data.routes[0].distance;
      const distanceKm = Number((distanceMeter / 1000).toFixed(2));
      setDistance(distanceKm);

      let cost = 0;
      if (distanceKm <= 5) cost = 5000;
      else if (distanceKm <= 10) cost = 10000;
      else if (distanceKm <= 15) cost = 15000;
      else if (distanceKm <= 20) cost = 20000;
      else cost = 20000 + (distanceKm - 20) * 2000;

      setShipping(cost);
      setError("");
    } catch {
      setError("Alamat tidak ditemukan");
      setShipping(0);
      setDistance(0);
    }
  };

  // ================= CART HANDLER =================
  const onRemove = async (productId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/items/${productId}`,
        { withCredentials: true },
      );

      setCart((prev) => {
        if (!prev) return prev;
        const newItems = prev.items.filter(
          (item) => item.productId !== productId,
        );

        return {
          ...prev,
          items: newItems,
          totalQuantity: newItems.reduce((a, b) => a + b.quantity, 0),
          totalAmount: newItems.reduce((a, b) => a + b.price * b.quantity, 0),
        };
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const onQuantityChange = async (productId: string, quantity: number) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/items/${productId}`,
        { quantity },
        { withCredentials: true },
      );

      setCart((prev) => {
        if (!prev) return prev;

        const updatedItems = prev.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );

        return {
          ...prev,
          items: updatedItems,
          totalQuantity: updatedItems.reduce((a, b) => a + b.quantity, 0),
          totalAmount: updatedItems.reduce(
            (a, b) => a + b.price * b.quantity,
            0,
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };
  const handleAddressChange = (value: AddressResult) => {
    setShippingAddress(value);

    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    const user = JSON.parse(userStr);

    const updatedUser = {
      ...user,
      address: value, // simpan full object (label, lat, lon)
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!cart || cart.items.length === 0) return <EmptyCart />;

  return (
    <div className="bg-gray-50 p-2 lg:p-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="sm:col-span-2 space-y-8">
          <div className="lg:sticky top-14 space-y-8 bg-white">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-bold">Metode Pengambilan</h2>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                  />
                  Diambil sendiri
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => setDeliveryMethod("delivery")}
                  />
                  Dikirim
                </label>
              </div>
            </div>

            {deliveryMethod === "delivery" && (
              <ShippingAddressForm
                err={error}
                address={shippingAddress}
                onChange={handleAddressChange}
                distance={distance}
              />
            )}
          </div>

          <CartList
            items={cart.items}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
          />
        </div>

        <CartSummary
          subtotal={cart.totalAmount}
          shipping={shipping}
          cart={cart.items}
        />
      </div>
    </div>
  );
}

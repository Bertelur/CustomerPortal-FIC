import { useState } from "react";
import type { CartSummaryProps } from "./CartSummary.types";
import axios from "axios";
import { Button } from "../../Atoms/Button";

export default function CartSummary({
  subtotal,
  shipping,
  cart,
  shippingAddress,
  additionalNotes,
  deliveryMethod = "pickup",
}: CartSummaryProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart kosong");
      return;
    }

    setLoading(true);

    try {
      // Prepare shipping address for backend
      // Backend expects Address format: { street, city, province, postalCode, phone, additionalNotes?, label?, lat?, lon? }
      let shippingAddressPayload: any = undefined;
      if (deliveryMethod === "delivery" && shippingAddress) {
        // Parse the label to extract address components if possible
        // For now, we'll send the geocoded data and let backend handle it
        // The label contains the full address string
        const labelParts = shippingAddress.label.split(",").map((s) => s.trim());
        shippingAddressPayload = {
          label: shippingAddress.label,
          lat: shippingAddress.lat,
          lon: shippingAddress.lon,
          street: labelParts[0] || shippingAddress.label, // Use first part as street
          city: labelParts[1] || "", // Try to extract city
          province: labelParts[2] || "", // Try to extract province
          postalCode: "", // Not available from geocoding
          phone: "", // Not available from form
          additionalNotes: additionalNotes || shippingAddress.additionalNotes || "",
        };
      }

      const payload = {
        successRedirectUrl: `${window.location.origin}/success`,
        failureRedirectUrl: `${window.location.origin}/failure`,
        productIds: cart.map((item) => item.productId),
        forceNew: true,
        shippingAddress: shippingAddressPayload,
        additionalNotes: deliveryMethod === "delivery" ? (additionalNotes || shippingAddress?.additionalNotes) : undefined,
        deliveryMethod,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/checkout`,
        payload,
        { withCredentials: true },
      );

      const data = res.data.data.payment;

      if (!data.invoiceUrl) {
        throw new Error("Invoice URL tidak ditemukan");
      }

      window.location.href = data.invoiceUrl;
    } catch (err: unknown) {
      console.error("Checkout error:", err);

      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Gagal membuat invoice");
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 h-fit lg:sticky top-20 z-10 ">
      <h2 className="text-xl font-semibold mb-4">Shopping Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Cost</span>
          <span>Rp {shipping.toLocaleString("id-ID")}</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>Rp {(subtotal + shipping).toLocaleString("id-ID")}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 text-white"
      >
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </Button>
    </div>
  );
}

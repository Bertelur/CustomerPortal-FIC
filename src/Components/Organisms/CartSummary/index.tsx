import { useState } from "react";
import type { CardSummaryProps } from "./CartSummary.types";
import axios from "axios";
import { Button } from "../../Atoms/Button";

export default function CartSummary({
  customerEmail,
  customerName,
  subtotal,
  shipping,
  cart,
}: CardSummaryProps) {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    if (!customerName || !customerEmail) {
      alert("Data checkout tidak lengkap");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/create-invoice", {
        amount: subtotal + shipping,
        customerName,
        customerEmail,
        cart,
      });

      // axios otomatis parse JSON
      const data = res.data;

      if (!data.invoice_url) {
        throw new Error("Invoice URL tidak ditemukan");
      }
      localStorage.removeItem("cart");
      window.location.href = data.invoice_url;
    } catch (err: any) {
      console.error("Checkout error:", err);

      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Gagal membuat invoice");
      } else {
        alert("Terjadi kesalahan");
      }

      setLoading(false);
    }
  };

  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
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
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 py-3 text-white"
      >
        {loading ? "Memproses" : "Bayar Sekarang"}
      </Button>
    </div>
  );
}

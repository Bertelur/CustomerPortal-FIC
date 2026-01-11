import { useState } from "react";
import type { CheckoutButtonProps } from "./CheckoutButton.types";
export default function CheckoutButton({
  amount,
  customerName,
  customerEmail,
  cart,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !amount) {
      alert("Data checkout tidak lengkap");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          customerName,
          customerEmail,
          cart,
        }),
      });

      const data = await res.json();
      window.location.href = data.invoice_url;
    } catch (err) {
      console.error(err);
      alert("Gagal checkout");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
    >
      {loading ? "Memproses..." : "Bayar Sekarang"}
    </button>
  );
}

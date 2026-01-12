import { useMutation } from "@tanstack/react-query";
import type { CardSummaryProps } from "./CartSummary.types";
import axios from "axios";
import { Button } from "../../Atoms/Button";
import { useToast } from "../../../Components/ui/Toast";

interface CheckoutData {
  amount: number;
  customerName: string;
  customerEmail: string;
  cart: CardSummaryProps["cart"];
}

const createInvoice = async (data: CheckoutData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/create-invoice`,
    data
  );
  return res.data;
};

export default function CartSummary({
  customerEmail,
  customerName,
  subtotal,
  shipping,
  cart,
}: CardSummaryProps) {
  const { error: showError } = useToast();

  const checkoutMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: (data) => {
      if (!data.invoice_url) {
        throw new Error("Invoice URL tidak ditemukan");
      }
      localStorage.removeItem("cart");
      window.location.href = data.invoice_url;
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        showError(err.response?.data?.message || "Gagal membuat invoice");
      } else if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Terjadi kesalahan");
      }
    },
  });

  const handleCheckout = () => {
    if (!customerName || !customerEmail) {
      showError("Data checkout tidak lengkap");
      return;
    }

    checkoutMutation.mutate({
      amount: subtotal + shipping,
      customerName,
      customerEmail,
      cart,
    });
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
        disabled={checkoutMutation.isPending}
        className="mt-6 w-full bg-blue-600 py-3 text-white"
      >
        {checkoutMutation.isPending ? "Memproses" : "Bayar Sekarang"}
      </Button>
    </div>
  );
}

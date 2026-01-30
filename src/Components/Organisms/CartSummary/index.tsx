import { useState } from "react";
import type { CartSummaryProps } from "./CartSummary.types";
import axios from "axios";
import { Button } from "../../Atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../Atoms/dialog";

type ShippingAddressPayload = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  additionalNotes?: string;
  label?: string;
  lat?: number;
  lon?: number;
};

export default function CartSummary({
  subtotal,
  shipping,
  cart,
  shippingAddress,
  additionalNotes,
  deliveryMethod = "pickup",
}: CartSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart kosong");
      return;
    }

    setLoading(true);

    try {
      // Prepare shipping address for backend
      // Backend expects Address format: { street, city, province, postalCode, phone, additionalNotes?, label?, lat?, lon? }
      let shippingAddressPayload: ShippingAddressPayload | undefined =
        undefined;
      if (deliveryMethod === "delivery" && shippingAddress) {
        // Parse the label to extract address components if possible
        // For now, we'll send the geocoded data and let backend handle it
        // The label contains the full address string
        const labelParts = shippingAddress.label
          .split(",")
          .map((s) => s.trim());
        shippingAddressPayload = {
          label: shippingAddress.label,
          lat: shippingAddress.lat,
          lon: shippingAddress.lon,
          street: labelParts[0] || shippingAddress.label, // Use first part as street
          city: labelParts[1] || "", // Try to extract city
          province: labelParts[2] || "", // Try to extract province
          postalCode: "", // Not available from geocoding
          phone: "", // Not available from form
          additionalNotes:
            additionalNotes || shippingAddress.additionalNotes || "",
        };
      }

      const payload = {
        successRedirectUrl: `${window.location.origin}/success`,
        failureRedirectUrl: `${window.location.origin}/failure`,
        productIds: cart.map((item) => item.productId),
        forceNew: true,
        shippingAddress: shippingAddressPayload,
        additionalNotes:
          deliveryMethod === "delivery"
            ? additionalNotes || shippingAddress?.additionalNotes
            : undefined,
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

  const redirectToWhatsApp = () => {
    const phoneNumber = "6281234567890"; // pakai format internasional (62)
    const total = (subtotal + shipping).toLocaleString("id-ID");

    const message = `
Halo Admin

Saya sudah melakukan transfer pembayaran dengan detail:
- Total: Rp ${total}
- Metode: Transfer Bank BCA

Berikut saya lampirkan bukti transfernya

Terima kasih.
  `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
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
          onClick={() => setShowPaymentPopup(true)}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 text-white"
        >
          {loading ? "Memproses..." : "Bayar Sekarang"}
        </Button>
      </div>
      <Dialog open={showPaymentPopup} onOpenChange={setShowPaymentPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Manual</DialogTitle>
            <DialogDescription>
              Silakan transfer sesuai nominal ke rekening berikut.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Bank</span>
                <span className="font-medium">BCA</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-gray-500">No. Rekening</span>
                  <span className="font-semibold text-base tracking-wider">
                    1234567890
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="h-8 px-3 text-xs"
                  onClick={async () => {
                    await navigator.clipboard.writeText("1234567890");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? "Tersalin ✓" : "Copy"}
                </Button>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Atas Nama</span>
                <span className="font-medium">PT Fahmi Jaya Internasional</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Transfer</span>
                <span className="font-semibold text-blue-600">
                  Rp {(subtotal + shipping).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Setelah transfer, klik <b>“Saya Sudah Transfer”</b> lalu kirim
              bukti pembayaran agar pesanan bisa diproses.
            </p>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowPaymentPopup(false)}
            >
              Batal
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setShowPaymentPopup(false);
                redirectToWhatsApp();
              }}
            >
              Saya Sudah Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

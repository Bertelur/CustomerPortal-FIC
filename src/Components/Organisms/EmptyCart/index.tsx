import { ShoppingCart } from "lucide-react";
import { EmptyState } from "../../../Components/ui/EmptyState";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-sm text-center max-w-md w-full">
        <EmptyState
          icon={ShoppingCart}
          title="Keranjang kosong"
          description="Kamu belum menambahkan produk ke keranjang. Mulai belanja untuk menambahkan item ke keranjang."
          actionLabel="Mulai Belanja"
          onAction={() => navigate("/")}
        />
      </div>
    </div>
  );
}

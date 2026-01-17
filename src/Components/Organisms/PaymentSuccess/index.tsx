import axios from "axios";
import { CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const handleDeleteCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/cart/clear`, {
        withCredentials: true,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Pembayaran Berhasil!
            </h1>
            <p className="text-green-50">Terima kasih atas pembelian Anda</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleDeleteCart}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
              >
                <Home className="w-5 h-5" />
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

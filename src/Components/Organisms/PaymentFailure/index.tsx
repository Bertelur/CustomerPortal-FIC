import { XCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const commonReasons = [
    "Saldo tidak mencukupi",
    "Koneksi internet terputus",
    "Limit transaksi terlampaui",
    "Kartu expired atau tidak valid",
    "Transaksi ditolak oleh bank",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-red-500 to-red-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Pembayaran Gagal
            </h1>
            <p className="text-red-50">
              Transaksi Anda tidak dapat diselesaikan
            </p>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Penyebab Umum Pembayaran Gagal:
              </h3>
              <ul className="space-y-2">
                {commonReasons.map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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

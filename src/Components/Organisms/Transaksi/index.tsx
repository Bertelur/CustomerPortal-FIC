import { useState, useEffect } from "react";
import axios from "axios";
import type {
  DataTransaction,
  TransactionStatus,
  StatusConfig,
} from "./Transaksi.types";
import { TbClock, TbPackage, TbChecklist } from "react-icons/tb";
import { Button } from "../../Atoms/Button";
import StatusTransaction from "../../Molecules/StatusTransaction";

const Transaksi = () => {
  const [dataTransaction, setDataTransaction] = useState<DataTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);

        const res = await axios.get<{ data: DataTransaction[] }>(
          `${import.meta.env.VITE_API_URL}/api/v1/invoices/my`,
          { withCredentials: true },
        );

        setDataTransaction(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  const statusConfig: Record<TransactionStatus, StatusConfig> = {
    pending: {
      label: "Menunggu Pembayaran",
      icon: TbClock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },

    paid: {
      label: "Pembayaran Diterima",
      icon: TbPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },

    failed: {
      label: "Gagal",
      icon: TbChecklist,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },

    expired: {
      label: "Kedaluwarsa",
      icon: TbChecklist,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
  };

  if (loading) return <p className="mt-10">Loading...</p>;
  if (error) return <p className="mt-10 text-red-600">{error}</p>;

  return (
    <div className="mt-10 space-y-4">
      <p className="mb-4 font-semibold text-lg">Riwayat Transaksi</p>

      {dataTransaction.map((item) => {
        const statusInfo = statusConfig[item.status];
        const StatusIcon = statusInfo.icon;

        return (
          <div key={item.id} className="border rounded-2xl mb-4 bg-white">
            {/* HEADER STATUS */}
            <div
              className={`${statusInfo.bgColor} px-4 py-3 border-b ${statusInfo.borderColor} rounded-t-2xl`}
            >
              <StatusTransaction
                Icon={StatusIcon}
                status={statusInfo.label}
                color={statusInfo.color}
                created={item.createdAt}
                orderId={item.paymentExternalId}
              />
            </div>

            {/* BODY */}
            <div className="p-4">
              {/* ITEMS */}
              <div className="space-y-3">
                {item.items.map((product, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1587486913049-53fc88980cfc"
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {product.name}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        Jumlah: {product.quantity} × Rp{" "}
                        {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        Rp{" "}
                        {(product.price * product.quantity).toLocaleString(
                          "id-ID",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* DETAIL */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span className="text-gray-900">
                    {item.paymentMethod ?? "Belum Bayar"}
                  </span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    Total Pembayaran
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    Rp {item.amount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2">
                {item.status === "pending" && (
                  <Button
                    onClick={() => window.open(item.invoiceUrl, "_blank")}
                    className="flex-1"
                  >
                    Bayar Sekarang
                  </Button>
                )}

                <Button
                  onClick={() => window.open(item.invoiceUrl, "_blank")}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:text-gray-800 text-white hover:bg-gray-50 transition-colors"
                >
                  Detail
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Transaksi;

import axios from "axios";
import { useEffect, useState } from "react";
import { TbClock, TbPackage, TbChecklist } from "react-icons/tb";
import type { IconType } from "react-icons";
import { Button } from "../../Components/Atoms/Button";
import StatusTransaction from "../../Components/Molecules/StatusTransaction";
type TransactionStatus = "PENDING" | "PAID" | "SETTLED";

type StatusConfig = {
  label: string;
  icon: IconType;
  color: string;
  bgColor: string;
  borderColor: string;
};

type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

interface DataTransaction {
  id: number;
  productName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  external_id: string;
  created: string;
  items?: InvoiceItem[];
  payment_method?: string;
  bank_code?: string;
  invoice_url?: string;
}

const Transaksi = () => {
  const [dataTransaction, setDataTransaction] = useState<DataTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const res = await axios.get<DataTransaction[]>(
          `${import.meta.env.VITE_API_URL}/invoices`
        );
        console.log(res);
        setDataTransaction(res.data);
      } catch {
        setError("Gagal mengambil data transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  const statusConfig: Record<TransactionStatus, StatusConfig> = {
    PENDING: {
      label: "Menunggu Pembayaran",
      icon: TbClock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },

    PAID: {
      label: "Pembayaran Diterima",
      icon: TbPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },

    SETTLED: {
      label: "Selesai",
      icon: TbChecklist,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  };

  return (
    <div className="px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-80">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading &&
        dataTransaction.map((item) => {
          const statusInfo =
            statusConfig[item.status as TransactionStatus] ??
            statusConfig.PENDING;
          const StatusIcon = statusInfo.icon;
          return (
            <div>
              <div
                className={`${statusInfo.bgColor} px-4 py-3 border-b ${statusInfo.borderColor}`}
              >
                <StatusTransaction
                  Icon={StatusIcon}
                  status={item.status}
                  color={statusInfo.color}
                  created={item.created}
                  orderId={item.external_id}
                />
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {item.items?.map((product, index) => (
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
                            "id-ID"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode Pembayaran:</span>
                    <span className="text-gray-900">
                      {!item.payment_method ? (
                        <p>Belum Bayar</p>
                      ) : item.payment_method === "BANK_TRANSFER" ? (
                        <p>BANK {item.bank_code}</p>
                      ) : item.payment_method === "QR_CODE" ? (
                        <p>QR Code</p>
                      ) : (
                        item.payment_method
                      )}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">
                      Total Pembayaran
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      Total: Rp {item.amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  {item.status === "PENDING" && (
                    <>
                      <Button
                        onClick={() => window.open(item.invoice_url, "_blank")}
                        className="flex-1"
                      >
                        Bayar Sekarang
                      </Button>

                      <button className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg">
                        Batalkan
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Transaksi;

import { MapPin } from "lucide-react";

interface Props {
  address: string;
  distance: number;
  err: string;
  onChange: (value: string) => void;
}

export default function ShippingAddressForm({
  address,
  distance,
  err,
  onChange,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 ">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-orange-600" />
        <h2 className="text-xl font-bold">Alamat Pengiriman</h2>
      </div>

      <div className="grid sm:grid-cols-1 gap-4">
        <textarea
          value={address}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Alamat lengkap"
          className="input lg:w-150 resize-none border p-4"
        />
        {distance > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            📍 Jarak ke toko: <b>{distance} km</b>
          </p>
        )}
        {err && <p className="text-red-500">{err}</p>}
      </div>
    </div>
  );
}

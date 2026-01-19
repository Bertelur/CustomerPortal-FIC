import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import axios from "axios";
import type { AddressResult } from "../../../Pages/Cart";

interface Props {
  address: AddressResult | null;
  distance: number;
  err: string;
  onChange: (value: AddressResult) => void;
}

export default function ShippingAddressForm({
  address,
  distance,
  err,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address?.label) setQuery(address.label);
  }, [address]);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://photon.komoot.io/api/", {
          params: { q: query, limit: 6 },
        });
        setResults(res.data.features);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (item: any) => {
    const p = item.properties;
    const [lon, lat] = item.geometry.coordinates;

    const label = `${p.name}, ${p.city || ""}, ${p.state || ""}`;

    setQuery(label);
    setResults([]);
    onChange({ label, lat, lon });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-orange-600" />
        <h2 className="text-xl font-bold">Alamat Pengiriman</h2>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama jalan / area"
        className="w-full border rounded-xl p-4"
      />

      {loading && <p className="text-sm mt-2">Mencari lokasi...</p>}

      {results.length > 0 && (
        <div className="absolute z-30 mt-2 w-[calc(100%-3rem)] bg-white border rounded-xl shadow-lg max-h-72 overflow-auto">
          {results.map((item, i) => (
            <div
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              className="p-3 cursor-pointer hover:bg-gray-100"
            >
              <div className="font-medium">{item.properties.name}</div>
              <div className="text-sm text-gray-500">
                {item.properties.city}, {item.properties.state}
              </div>
            </div>
          ))}
        </div>
      )}

      {distance > 0 && (
        <p className="text-sm text-gray-600 mt-3">
          📍 Jarak ke toko: <b>{distance} km</b>
        </p>
      )}

      {err && <p className="text-red-500 mt-2">{err}</p>}
    </div>
  );
}

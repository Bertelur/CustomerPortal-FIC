import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import axios from "axios";
import type { AddressResult } from "../../../Pages/Cart";

interface Props {
  address: AddressResult | null;
  distance: number;
  err: string;
  onChange: (value: AddressResult) => void;
  additionalNotes?: string;
  onAdditionalNotesChange?: (notes: string) => void;
}

interface PhotonFeature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    name: string;
    city?: string;
    state?: string;
  };
}

export default function ShippingAddressForm({
  address,
  distance,
  err,
  onChange,
  additionalNotes = "",
  onAdditionalNotesChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PhotonFeature[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address?.label) setQuery(address.label);
  }, [address?.label]);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://photon.komoot.io/api/", {
          params: { q: query, limit: 6 },
          signal: controller.signal,
        });
        setResults(res.data.features);
      } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          console.error("Photon API error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 800);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (item: PhotonFeature) => {
    const p = item.properties;
    const [lon, lat] = item.geometry.coordinates;

    const label = `${p.name}, ${p.city || ""}, ${p.state || ""}`;

    setQuery(label);
    setResults([]);
    onChange({ label, lat, lon, additionalNotes });
  };

  return (
    <div className="rounded-2xl p-6 relative border border-gray-200">
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
        <div className="absolute z-30 mt-2 w-[calc(100%-3rem)] bg-white border rounded-xl max-h-72 overflow-auto">
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

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catatan Tambahan untuk Lokasi Pengiriman (Opsional)
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => {
            const notes = e.target.value;
            onAdditionalNotesChange?.(notes);
            if (address) {
              onChange({ ...address, additionalNotes: notes });
            }
          }}
          placeholder="Contoh: Rumah warna biru, dekat masjid, atau instruksi khusus lainnya"
          className="w-full border rounded-xl p-4 min-h-25 resize-y"
          rows={3}
        />
      </div>

      {err && <p className="text-red-500 mt-2">{err}</p>}
    </div>
  );
}

import { Button } from "../../Atoms/Button";

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-sm text-center max-w-md w-full">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          className="mx-auto mb-6 w-32 opacity-70"
        />

        <h2 className="text-xl font-semibold mb-2">Keranjang kosong</h2>
        <p className="text-gray-500 mb-6">
          Kamu belum menambahkan produk ke keranjang.
        </p>

        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
        >
          Mulai Belanja
        </Button>
      </div>
    </div>
  );
}

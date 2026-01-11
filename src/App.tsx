import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Molecules/Navbar";
import Home from "./Pages/Home";
import CartPage from "./Pages/Cart";
import Transaksi from "./Pages/Transaksi";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

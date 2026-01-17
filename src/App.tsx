import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Molecules/Navbar";
import Home from "./Pages/Home";
import CartPage from "./Pages/Cart";
import Transaksi from "./Pages/Transaksi";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Profile from "./Pages/Profile";
import PaymentStatusSuccess from "./Pages/PaymentStatus/Success";
import PaymentStatusFailure from "./Pages/PaymentStatus/Failure";
import { useEffect } from "react";
import { gaEvent } from "./Lib/ga";

export default function App() {
  useEffect(() => {
    gaEvent("page_view", {
      page_location: window.location.href,
      page_title: document.title,
      page_path: window.location.pathname,
    })
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<PaymentStatusSuccess />} />
          <Route path="/failure" element={<PaymentStatusFailure />} />
        </Routes>
      </main>
    </div>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Molecules/Navbar";
import Home from "./Pages/Home";
import CartPage from "./Pages/Cart";
import Transaksi from "./Pages/Transaksi";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Profile from "./Pages/Profile";
import LandingPage from "./Pages/Landing";

// Toggle this to false when ready to launch the full app
const COMING_SOON_MODE = true;

export default function App() {
  // Coming Soon mode - show only landing page
  if (COMING_SOON_MODE) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Normal mode - all existing routes (unchanged)
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
        </Routes>
      </main>
    </div>
  );
}

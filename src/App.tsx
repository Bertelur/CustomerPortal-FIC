import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Molecules/Navbar";
import { ErrorBoundary } from "./Components/ErrorBoundary";
import { SkeletonCard } from "./Components/ui/Skeleton";
import { ToastContainer, useToast } from "./Components/ui/Toast";
import { useAnalytics } from "./hooks/useAnalytics";

const Home = lazy(() => import("./Pages/Home"));
const CartPage = lazy(() => import("./Pages/Cart"));
const Transaksi = lazy(() => import("./Pages/Transaksi"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const Profile = lazy(() => import("./Pages/Profile"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <SkeletonCard />
      </div>
    </div>
  );
}

function AppContent() {
  const { toasts, closeToast } = useToast();
  useAnalytics();

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <ToastContainer toasts={toasts} onClose={closeToast} />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

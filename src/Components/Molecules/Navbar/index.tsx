import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { TbShoppingCartFilled, TbUser } from "react-icons/tb";
import { Button } from "../../Atoms/Button";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      setIsLogin(localStorage.getItem("user"));
    };

    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to={`/`} className="text-lg font-bold text-orange-500">
          Logo
        </NavLink>
        <nav className="hidden md:flex gap-4 md:items-center">
          {isLogin ? (
            <div className="md:flex gap-4 md:items-center">
              <NavLink to="/cart" className={linkClass}>
                <TbShoppingCartFilled size={24} />
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                <TbUser size={24} />
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-4">
              <NavLink to={`/login`}>
                <Button>Masuk</Button>
              </NavLink>
            </div>
          )}
        </nav>
        {isLogin ? (
          <div className="md:hidden flex items-center gap-4">
            <NavLink to="/cart" className={linkClass}>
              <TbShoppingCartFilled size={24} />
            </NavLink>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1"
            >
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
            </button>
          </div>
        ) : (
          <div className="md:hidden flex items-center gap-4">
            <NavLink to={`/login`}>
              <Button>Masuk</Button>
            </NavLink>
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <span className="font-bold text-orange-500">Menu</span>
          <button onClick={() => setOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-5 gap-4">
          <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/transaksi"
            className={linkClass}
          >
            Transaksi
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

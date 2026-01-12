import { useState } from "react";
import { NavLink } from "react-router";
import { TbShoppingCartFilled, TbUser } from "react-icons/tb";
import { Button } from "../../Atoms/Button";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <header
      className="w-full bg-white shadow-md fixed top-0 left-0 z-50"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="text-lg font-bold text-orange-500"
          role="img"
          aria-label="Logo"
        >
          <NavLink to="/">Logo</NavLink>
        </div>
        {isLogin ? (
          <nav
            className="hidden md:flex gap-8 md:items-center"
            role="navigation"
            aria-label="Main navigation"
          >
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/transaksi" className={linkClass}>
              Transaksi
            </NavLink>
          </nav>
        ) : (
          <div></div>
        )}

        <nav
          className="hidden md:flex gap-4 md:items-center"
          role="navigation"
          aria-label="User actions"
        >
          {isLogin ? (
            <div className="md:flex gap-4 md:items-center">
              <NavLink
                to="/cart"
                className={linkClass}
                aria-label="Shopping cart"
              >
                <TbShoppingCartFilled size={24} />
              </NavLink>
              <NavLink
                to="/profile"
                className={linkClass}
                aria-label="User profile"
              >
                <TbUser size={24} />
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-4">
              <NavLink to={`/login`}>
                <Button>Login</Button>
              </NavLink>
              <NavLink to={`/register`}>
                <Button>Register</Button>
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
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
            </button>
          </div>
        ) : (
          <div className="md:hidden flex items-center gap-4">
            <NavLink to={`/login`}>Login</NavLink>
            <NavLink to={`/register`}>Register</NavLink>
          </div>
        )}
      </div>

      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="p-5 flex justify-between items-center border-b">
          <span className="font-bold text-orange-500">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav
          className="flex flex-col p-5 gap-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
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

import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { TbHome, TbSearch, TbShoppingCartFilled, TbUser } from "react-icons/tb";
import { Button } from "../../Atoms/Button";
import { Input } from "../../Atoms/Input";
import { useSearchStore } from "../../../Store/SearchStore";
import { useCartStore } from "../../../Store/CartStore";
import { getUser } from "../../../Lib/auth";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState<string | null>(null);
  const search = useSearchStore((value) => value.search);
  const setSearch = useSearchStore((value) => value.setSearch);
  const cartCount = useCartStore((state) => state.cartCount);
  const refreshCart = useCartStore((state) => state.refreshCart);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      setIsLogin(user ? "authenticated" : null);
      if (user) {
        void refreshCart();
      }
    };

    void checkAuth();
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, [refreshCart]);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "max-md:bg-orange-600 text-white md:text-orange-500 md:font-semibold "
      : "max-md:hover:bg-orange-600 hover:text-white text-gray-700 md:hover:text-orange-500";

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink
          to={`/`}
          className="max-md:hidden text-lg font-bold text-orange-600 hover:underline"
        >
          PT. Fahmi Jaya Internasional
        </NavLink>
        <nav className="hidden md:flex gap-4 md:items-center">
          {isLogin ? (
            <div className="md:flex gap-4 md:items-center">
              <NavLink to="/cart" className={linkClass}>
                <div className="relative inline-flex">
                  <TbShoppingCartFilled size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-white">
                      {cartCount}
                    </span>
                  )}
                </div>
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
          <div className="md:hidden flex items-center gap-4 w-full ">
            <div className="flex items-center gap-2 w-full ">
              <div className="flex border rounded-md w-full">
                <Button
                  variant={`default`}
                  className="bg-white text-gray-400 hover:bg-white"
                >
                  <TbSearch size={18} />
                </Button>
                <Input
                  className="border-none text-sm"
                  placeholder="Cari Kebutuhan Kamu Disini"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <NavLink to="/cart" className={``}>
                <div className="relative inline-flex">
                  <TbShoppingCartFilled size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-white">
                      {cartCount}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
            <div className="fixed z-50 bg-white bottom-0 left-0 border w-full flex items-center justify-between pt-2 pb-5">
              <div className="w-full flex justify-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-md py-2 px-4 flex flex-col items-center ${linkClass({ isActive })}`
                  }
                >
                  <TbHome size={20} />
                  <p className="text-[12px]">Home</p>
                </NavLink>
              </div>
              <div className="w-full flex justify-center">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `rounded-md py-2 px-4 flex flex-col items-center ${linkClass({ isActive })}`
                  }
                >
                  <TbUser size={20} />
                  <p className="text-[12px]">Profile</p>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:hidden flex items-center gap-4">
            <NavLink to={`/login`}>
              <Button>Masuk</Button>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

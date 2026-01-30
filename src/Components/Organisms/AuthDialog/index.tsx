import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../Atoms/dialog";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import { Button } from "../../Atoms/Button";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  useEffect(() => {
    const handleAuthChange = () => {
      onOpenChange(false);
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Masuk atau Daftar</DialogTitle>
          <DialogDescription>
            Masuk ke akun Anda atau daftar terlebih dahulu untuk menambahkan
            produk ke keranjang.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex rounded-full bg-gray-100 p-1 text-sm font-medium">
          <Button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 rounded-full px-3 py-2 transition ${activeTab === "login"
              ? "bg-orange-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
              }`}
            variant="outline"
          >
            Masuk
          </Button>
          <Button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 rounded-full px-3 py-2 transition ${activeTab === "register"
              ? "bg-orange-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
              }`}
            variant="outline"
          >
            Daftar
          </Button>
        </div>

        <div className="mt-4">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
}


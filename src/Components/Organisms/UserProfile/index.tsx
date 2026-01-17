import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfileProps } from "./UserProfile.types";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import { ChevronDown } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<UserProfileProps | null>(null);

  const [openSection, setOpenSection] = useState<string | null>("profile");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    setDataUser(user);
  }, []);

  const toggle = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <div className="space-y-4 border rounded-2xl p-6">
      {/* ===== Informasi Pribadi ===== */}
      <div className="border rounded-xl">
        <button
          onClick={() => toggle("profile")}
          className="w-full flex justify-between items-center p-4 font-semibold"
        >
          Informasi Pribadi
          <ChevronDown
            className={`transition-transform ${
              openSection === "profile" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "profile" && (
          <div className="p-4 border-t space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400">Nama</p>
                <p>{dataUser?.username}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p>{dataUser?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Ubah Password ===== */}
      <div className="border rounded-xl">
        <button
          onClick={() => toggle("password")}
          className="w-full flex justify-between items-center p-4 font-semibold"
        >
          Ubah Password
          <ChevronDown
            className={`transition-transform ${
              openSection === "password" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "password" && (
          <div className="p-4 border-t space-y-4">
            <div className=" grid md:grid-cols-3 gap-6">
              <InputField
                containerClassName="w-full"
                label="Password Lama"
                name="passwordLama"
                type="password"
              />
              <InputField
                containerClassName="w-full"
                label="Password Baru"
                type="password"
                name="passwordBaru"
              />
              <InputField
                containerClassName="w-full"
                type="password"
                label="Konfirmasi Password"
                name="konfirmasiPassword"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button disabled>Simpan Perubahan</Button>
            </div>
          </div>
        )}
      </div>

      <Button
        className="bg-red-500 hover:bg-white hover:text-red-500 border border-red-500"
        onClick={() => {
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("auth-change"));
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;

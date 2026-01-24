import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfileProps } from "./UserProfile.types";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import { ChevronDown } from "lucide-react";

import { getUser, clearUser } from "../../../Lib/auth";
// sesuaikan path

const UserProfile = () => {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>("profile");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const user = await getUser();
      if (mounted) {
        setDataUser(user as UserProfileProps | null);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const toggle = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-4 border rounded-2xl p-6">
      {/* ===== Informasi Pribadi ===== */}
      <div className="border rounded-xl">
        <button
          type="button"
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
                <p>{dataUser?.username ?? "-"}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p>{dataUser?.email ?? "-"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Ubah Password ===== */}
      <div className="border rounded-xl">
        <button
          type="button"
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
            <div className="grid md:grid-cols-3 gap-6">
              <InputField
                label="Password Lama"
                name="passwordLama"
                type="password"
              />
              <InputField
                label="Password Baru"
                name="passwordBaru"
                type="password"
              />
              <InputField
                label="Konfirmasi Password"
                name="konfirmasiPassword"
                type="password"
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
          clearUser(); // hapus user terenkripsi + dispatch event
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;

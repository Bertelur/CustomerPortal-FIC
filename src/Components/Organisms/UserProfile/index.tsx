import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfileProps } from "./UserProfile.types";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";

const UserProfile = () => {
  const navigate = useNavigate();

  const [dataUser] = useState<UserProfileProps | null>(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as UserProfileProps;
    } catch {
      return null;
    }
  });

  return (
    <div className="space-y-6 border rounded-2xl py-8 px-4">
      <p className="text-2xl">Informasi Pribadi</p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-gray-400 text-xl">Nama</p>
          <p>{dataUser?.username}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xl">Email</p>
          <p>{dataUser?.email}</p>
        </div>
      </div>

      <div className="w-full border-2 " />

      <div className="grid md:grid-cols-3 gap-8">
        <InputField containerClassName="w-full" label="Password Lama" name="passwordLama" type="password" />
        <InputField containerClassName="w-full" label="Password Baru" type="password" name="passworBaru" />
        <InputField containerClassName="w-full" type="password" label="Konfirmasi Password" name="konfirmasiPassword" />
      </div>

      <div className="space-x-3">
        <Button>Simpan Perubahan</Button>

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
    </div>
  );
};

export default UserProfile;

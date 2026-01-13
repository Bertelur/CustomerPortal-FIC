import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { ApiResponse, UserProfileProps } from "./UserProfile.types";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
const UserProfile = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<UserProfileProps | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        const res = await axios.get<ApiResponse<UserProfileProps>>(
          `${import.meta.env.VITE_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Ini RESPONSE:", res.data.data);
        setDataUser(res.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="space-y-6 border rounded-2xl py-8 px-4">
      <div>Informasi Pribadi</div>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="font-gray-300">Nama</p>
          <p>{dataUser?.nama}</p>
        </div>
        <div>
          <p>Email</p>
          <p>{dataUser?.email}</p>
        </div>
      </div>
      <div className="w-full border-2 " />
      <div className="grid md:grid-cols-3 gap-8">
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
          name="passworBaru"
        />
        <InputField
          containerClassName="w-full"
          type="password"
          label="Konfirmasi Password"
          name="konfirmasiPassword"
        />
      </div>
      <div className="space-x-3">
        <Button>Simpan Perubahan</Button>
        <Button
          className="bg-red-500"
          onClick={() => {
            localStorage.removeItem("accessToken");
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

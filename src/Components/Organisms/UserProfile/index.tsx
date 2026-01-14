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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log("Axios error message:", error.message);
          console.log("Axios response:", error.response?.data);
          console.log("Status:", error.response?.status);
        } else if (error instanceof Error) {
          console.log("General error:", error.message);
        } else {
          console.log("Unknown error:", error);
        }
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="space-y-6 border rounded-2xl py-8 px-4">
      <p className="text-2xl">Informasi Pribadi</p>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="">
          <p className="text-gray-400 text-xl">Nama</p>
          <p className="">{dataUser?.nama}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xl">Email</p>
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
          className="bg-red-500 hover:bg-white hover:text-red-500 border border-red-500"
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

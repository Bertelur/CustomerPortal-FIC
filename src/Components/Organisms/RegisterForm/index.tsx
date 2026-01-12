import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { useToast } from "../../../Components/ui/Toast";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  nama: string;
  email: string;
  password: string;
  confPassword: string;
}

const registerUser = async (data: RegisterData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/register`,
    data
  );
  return response.data;
};

const RegisterForm = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        showError(
          error.response?.data?.message ||
            "Gagal registrasi. Periksa data Anda."
        );
      } else if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("Terjadi kesalahan saat registrasi");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col items-center justify-center h-[90vh]"
    >
      <InputField label="Name" name="nama" onChange={handleChange} />
      <InputField
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <InputField
        label="Confirm Password"
        name="confPassword"
        type="password"
        onChange={handleChange}
      />
      <Button
        type="submit"
        className="w-80"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Memproses..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;

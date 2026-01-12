import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../Components/ui/Toast";

const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    credentials,
    { withCredentials: true }
  );
  return response.data;
};

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { error: showError } = useToast();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        showError(
          error.response?.data?.message ||
            "Gagal login. Periksa email dan password Anda."
        );
      } else if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("Terjadi kesalahan saat login");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col items-center justify-center h-[90vh]"
    >
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

      <Button type="submit" className="w-80" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;

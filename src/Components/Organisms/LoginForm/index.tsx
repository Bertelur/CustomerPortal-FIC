import { useState } from "react";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          email: form.email,
          password: form.password,
          type: "buyer",
        },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      window.dispatchEvent(new Event("auth-change"));
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("LOGIN ERROR:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("LOGIN ERROR:", error.message);
      } else {
        console.error("LOGIN ERROR: Unknown error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col items-center justify-center "
    >
      <InputField
        Icon={Mail}
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <InputField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        Icon={Lock}
        IconLeading={showPassword ? EyeClosed : Eye}
        togglePassword={() => setShowPassword(!showPassword)}
        onChange={handleChange}
      />

      <Button type="submit" className="w-80">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

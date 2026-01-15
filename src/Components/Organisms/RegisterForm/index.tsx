import { useState } from "react";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          email: form.email,
          username: form.username,
          password: form.password,
        },
        { withCredentials: true }
      );
      console.log("RESPONSE:", response.data);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("REGISTER ERROR:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("REGISTER ERROR:", error.message);
      } else {
        console.error("REGISTER ERROR: Unknown error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col items-center justify-center"
    >
      <InputField
        Icon={User}
        label="Name"
        name="username"
        onChange={handleChange}
      />
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
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

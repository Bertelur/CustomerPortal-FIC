import { useState } from "react";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Lock, Mail, Loader2 } from "lucide-react";
import { setUser } from "../../../Lib/auth";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
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
      await setUser(response.data.data.user);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("LOGIN ERROR:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("LOGIN ERROR:", error.message);
      } else {
        console.error("LOGIN ERROR: Unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
      <InputField
        Icon={Mail}
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        Icon={Lock}
        IconLeading={showPassword ? EyeClosed : Eye}
        togglePassword={() => setShowPassword(!showPassword)}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full h-11 text-sm font-medium"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </Button>

      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting ? "Logging in. Please wait." : ""}
      </p>
    </form>
  );
};

export default LoginForm;

import { useState } from "react";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validatePassword = (password: string) => {
    if (!password) return "Password wajib diisi";
    if (password.length < 8) return "Password minimal 8 karakter";
    if (!/[A-Z]/.test(password)) return "Password harus mengandung huruf besar";
    if (!/[a-z]/.test(password)) return "Password harus mengandung huruf kecil";
    if (!/\d/.test(password)) return "Password harus mengandung angka";
    if (!/[^A-Za-z\d]/.test(password))
      return "Password harus mengandung simbol";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.username.trim()) {
      toast.warning("Username wajib diisi");
      return;
    }
    if (!form.email.trim()) {
      toast.warning("Email wajib diisi");
      return;
    }

    const error = validatePassword(form.password);
    if (error) {
      setPasswordError(error);
      toast.warning(error);
      return;
    }

    setIsSubmitting(true);

    const tId = toast.loading("Mendaftarkan akun...");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          email: form.email,
          username: form.username,
          password: form.password,
        },
        { withCredentials: true },
      );

      toast.success("Registrasi berhasil!", { id: tId });
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.message || "Registrasi gagal";

        toast.error(msg, { id: tId });
      } else {
        toast.error("Registrasi gagal", { id: tId });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
      <InputField
        Icon={User}
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />

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
        Icon={Lock}
        IconLeading={showPassword ? EyeClosed : Eye}
        togglePassword={() => setShowPassword(!showPassword)}
        value={form.password}
        onChange={handleChange}
      />

      {passwordError ? (
        <p className="text-sm text-destructive">{passwordError}</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Gunakan minimal 8 karakter, huruf besar, huruf kecil, angka, dan
          simbol
        </p>
      )}

      <Button
        type="submit"
        className="w-full h-11 text-sm font-medium"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Mendaftar..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;

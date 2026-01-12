import { useState } from "react";
import InputField from "../../Molecules/InputField";
import { Button } from "../../Atoms/Button";
import axios from "axios";

const RegisterForm = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          nama: form.nama,
          email: form.email,
          password: form.password,
          confPassword: form.confPassword,
        }
      );
      console.log("RESPONSE:", response.data);
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
      <Button type="submit" className="w-80">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

import { ShoppingBag } from "lucide-react";
import RegisterForm from "../../../Components/Organisms/RegisterForm";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Components/Atoms/Button";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-xl border bg-blue-600">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            Buat Akun Baru
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Daftar untuk mulai berbelanja
          </p>
        </div>

        <RegisterForm />

        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Button
            onClick={() => navigate(`/login`)}
            variant="link"
            className="px-0 text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
          >
            Masuk sekarang
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Register;

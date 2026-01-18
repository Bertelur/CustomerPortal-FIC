import LoginForm from "../../../Components/Organisms/LoginForm";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Components/Atoms/Button";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[90vh] flex items-center justify-center px-4 py-10">
      <div className=" max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-xl border bg-blue-600">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            Selamat Datang
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Masuk ke akun Anda untuk melanjutkan
          </p>
        </div>

        <LoginForm />

        <p className="text-center mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Button
            onClick={() => navigate(`/register`)}
            variant="link"
            className="px-0 text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
          >
            Daftar sekarang
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;

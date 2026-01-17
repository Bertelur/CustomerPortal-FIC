import LoginForm from "../../../Components/Organisms/LoginForm";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Components/Atoms/Button";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center p-4 h-[90vh]">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang
          </h1>
          <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <LoginForm />
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Belum punya akun?{" "}
          <Button
            onClick={() => navigate(`/register`)}
            variant={`link`}
            className="text-blue-600 hover:text-blue-700 font-medium "
          >
            Daftar sekarang
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;

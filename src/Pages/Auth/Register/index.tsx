import { ShoppingBag } from "lucide-react";
import RegisterForm from "../../../Components/Organisms/RegisterForm";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Components/Atoms/Button";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-[20%] left-[40%]  flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-gray-600">Daftar untuk mulai berbelanja</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <RegisterForm />
        </div>

        <p className="text-center mt-6 text-gray-600">
          Sudah punya akun?{" "}
          <Button
            onClick={() => navigate(`/login`)}
            variant={`link`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Masuk sekarang
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Register;

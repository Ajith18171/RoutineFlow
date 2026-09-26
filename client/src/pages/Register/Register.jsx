import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RegisterForm from "../../components/auth/RegisterForm";
import { useTheme } from "../../Context/ThemeContext";
import ThemeToggle from "../../components/Common/ThemeToggle";

function Register() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-all duration-300 ${
        darkMode
          ? "bg-slate-950"
          : "bg-slate-100"
      }`}
    >

      <ThemeToggle />

      <div className="w-full max-w-md">

        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-6 transition ${
            darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <RegisterForm />

      </div>

    </div>
  );
}

export default Register;
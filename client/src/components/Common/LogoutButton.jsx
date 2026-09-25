import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

function LogoutButton() {

  const navigate = useNavigate();
  const { showToast } = useToast();


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    showToast("Logged out successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  };


  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
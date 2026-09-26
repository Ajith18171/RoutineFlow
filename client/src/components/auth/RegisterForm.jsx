// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import useToast from "../../Hooks/useToast";
// import { useTheme } from "../../Context/ThemeContext";

// function RegisterForm() {
//   const navigate = useNavigate();
//   const { showToast } = useToast();
//   const { darkMode } = useTheme();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const inputClass = `w-full rounded-xl p-3 border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//     darkMode
//       ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
//   }`;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       showToast("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         {
//           username: formData.username,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }
//       );

//       if (response.data.success) {
//         showToast("Registration Successful!");

//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       }
//     } catch (error) {
//       showToast(
//         error.response?.data?.message ||
//           "Registration failed"
//       );
//     }
//   };

//   return (
//     <div
//       className={`max-w-md mx-auto rounded-3xl p-8 transition-all duration-300 ${
//         darkMode
//           ? "bg-slate-900 border border-slate-800 text-white"
//           : "bg-white shadow-xl text-gray-900"
//       }`}
//     >
//       <h2 className="text-3xl font-bold text-center mb-2">
//         Create Account
//       </h2>

//       <p
//         className={`text-center mb-8 ${
//           darkMode
//             ? "text-slate-400"
//             : "text-gray-500"
//         }`}
//       >
//         Create your Daily Routine account
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//       >
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className={inputClass}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className={inputClass}
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className={inputClass}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className={inputClass}
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className={inputClass}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition duration-300"
//         >
//           Register
//         </button>

//         <div className="text-center pt-2">
//           <p
//             className={`text-sm ${
//               darkMode
//                 ? "text-slate-400"
//                 : "text-gray-500"
//             }`}
//           >
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-semibold text-blue-600 hover:text-blue-700"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;
import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import useToast from "../../Hooks/useToast";
import { useTheme } from "../../Context/ThemeContext";

function RegisterForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const inputClass = `w-full rounded-xl p-3 border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode
      ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
      : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
  }`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!");
      return;
    }

    try {
      const response = await api.post(
        "/auth/register",
        {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      if (response.data.success) {
        showToast("Registration Successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div
      className={`max-w-md mx-auto rounded-3xl p-8 transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 border border-slate-800 text-white"
          : "bg-white shadow-xl text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-2">
        Create Account
      </h2>

      <p
        className={`text-center mb-8 ${
          darkMode
            ? "text-slate-400"
            : "text-gray-500"
        }`}
      >
        Create your Daily Routine account
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={inputClass}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition duration-300"
        >
          Register
        </button>

        <div className="text-center pt-2">
          <p
            className={`text-sm ${
              darkMode
                ? "text-slate-400"
                : "text-gray-500"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
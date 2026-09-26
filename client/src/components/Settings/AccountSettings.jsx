import { useState } from "react";
import { User, Mail, Phone, Save } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import useToast from "../../hooks/useToast";

function AccountSettings() {
  const { darkMode } = useTheme();
  const { showToast } = useToast();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Temporary save (Frontend only)
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...formData,
      })
    );

    showToast("Profile updated successfully!");
  };

  return (
    <section
      className={`rounded-3xl p-6 ${
        darkMode
          ? "bg-slate-900 border border-slate-800"
          : "bg-white shadow-lg"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">
        Account Settings
      </h2>

      <form
        onSubmit={handleSave}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">
            Username
          </label>

          <div className="relative">
            <User
              className="absolute left-3 top-3.5 opacity-60"
              size={18}
            />

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 p-3 rounded-xl border ${
                darkMode
                  ? "bg-slate-950 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 opacity-60"
              size={18}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 p-3 rounded-xl border ${
                darkMode
                  ? "bg-slate-950 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <div className="relative">
            <Phone
              className="absolute left-3 top-3.5 opacity-60"
              size={18}
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 p-3 rounded-xl border ${
                darkMode
                  ? "bg-slate-950 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </section>
  );
}

export default AccountSettings;
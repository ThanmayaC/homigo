import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    regNo: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
   <div className="relative min-h-screen flex items-center justify-center overflow-hidden
                bg-gradient-to-br from-blue-100 via-white to-green-100">

      {/* Animated Background */}
      <div className="absolute w-96 h-96 bg-blue-300/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-float"></div>
      <div className="absolute w-96 h-96 bg-green-300/30 rounded-full blur-3xl bottom-[-120px] right-[-100px] animate-float"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl
                      bg-white backdrop-blur-lg border border-blue-200
                      shadow-lg
                      animate-fadeIn
                      transition duration-500 hover:scale-[1.02]">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Homigo
          </h1>
          <p className="text-gray-600 text-sm">
            Smart Roommate Matching
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          <div>
            <label className="text-sm text-gray-600">
              Registration Number
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-lg 
                         bg-white text-black border border-blue-300
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) =>
                setForm({ ...form, regNo: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 px-4 py-3 rounded-lg 
                         bg-white text-black border border-blue-300
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-sm text-blue-500 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 rounded-lg text-white font-semibold
                       bg-gradient-to-r from-blue-500 to-green-500
                       hover:scale-[1.05]
                       transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Fresher Hostel Allocation • Homigo
        </p>

      </div>

    </div>
  );
}
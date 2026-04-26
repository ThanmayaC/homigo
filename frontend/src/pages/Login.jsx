import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    regNo: "",
    password: ""
  });

  const [role, setRole] = useState("student");

  const handleLogin = async () => {
    if (!form.regNo || !form.password) {
      alert("Enter credentials");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...form, role })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    if (data.role === "admin") {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } else {
      localStorage.setItem("role", "student");
      localStorage.setItem("regNo", data.regNo); // ✅ FIX
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Homigo Login</h1>

        <select
          className="w-full mb-3 p-2 border"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <input
          placeholder="RegNo"
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, regNo: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
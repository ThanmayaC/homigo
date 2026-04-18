import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("announcements");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAnnouncements(parsed);
        }
      }
    } catch (err) {
      console.error("Invalid announcements data");
    }
  }, []);

  // ✅ Safe rotation
  useEffect(() => {
    if (announcements.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="flex min-h-screen text-black 
    bg-gradient-to-br from-blue-100 via-white to-green-100">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-blue-200 p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Homigo</h2>

        <ul className="space-y-5 text-gray-700">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-blue-600">Dashboard</li>
          <li onClick={() => navigate("/preferences")} className="cursor-pointer hover:text-blue-600">Preferences</li>
          <li onClick={() => navigate("/match")} className="cursor-pointer hover:text-blue-600">Match Result</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 ml-64">

        {/* Topbar */}
        <div className="flex items-center p-4 border-b border-blue-200 bg-white">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-blue-700 font-semibold">
              NIT Jalandhar
            </span>
          </div>

          <div className="ml-auto">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              S
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Announcements */}
          <div className="mb-6 p-5 rounded-2xl 
                bg-white/30 backdrop-blur-xl border shadow-md">

            <h3 className="text-blue-600 font-semibold mb-2">
              Announcements
            </h3>

            <div className="text-sm text-gray-700 h-6 overflow-hidden">
              {announcements.length > 0
                ? announcements[current]?.text
                : "No announcements yet"}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6">

            <div
              onClick={() => navigate("/preferences")}
              className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white cursor-pointer">
              Fill Preferences
            </div>

            <div
              onClick={() => navigate("/match")}
              className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white cursor-pointer">
              View Match
            </div>

          </div>

        </div>

        <Chatbot />

      </div>
    </div>
  );
}
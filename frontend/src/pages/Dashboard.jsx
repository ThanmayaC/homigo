import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Chatbot from "./Chatbot";

export default function Dashboard() {
  const [system, setSystem] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const navigate = useNavigate();
  const regNo = localStorage.getItem("regNo");

  // 🔥 FETCH SYSTEM + ANNOUNCEMENTS
  const fetchData = () => {
    fetch("http://localhost:5000/api/system?ts=" + Date.now())
      .then(res => res.json())
      .then(data => setSystem(data));

    fetch("http://localhost:5000/api/announcements?ts=" + Date.now())
      .then(res => res.json())
      .then(data => setAnnouncements(data));
  };

  useEffect(() => {
    fetchData();

    // 🔥 AUTO REFRESH EVERY 3 SEC (fix for deadline not updating)
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!system) return <h2>Loading...</h2>;

  const deadlinePassed =
    system.deadline && new Date(system.deadline) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6 relative">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">
          <img src={logo} className="h-14" />

          <div>
            <h1 className="text-4xl font-extrabold text-blue-700 tracking-wide">
              Homigo
            </h1>

            <p className="text-gray-600 text-sm">
              Dr. B. R. Ambedkar National Institute of Technology Jalandhar
            </p>

            <p className="text-gray-500 text-xs">
              Student Roommate Matching Portal
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowProfile(true)}
          className="bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          Profile
        </button>
      </div>

      {/* 🔥 DEADLINE BADGE */}
      <div className="absolute top-24 right-6 bg-white shadow px-4 py-2 rounded-xl border">
        <p className="text-xs text-gray-500">Deadline</p>
        <p className="text-sm font-semibold">
          {system.deadline
            ? new Date(system.deadline).toLocaleString()
            : "Not set"}
        </p>
      </div>

      {/* 🔥 MAIN CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">
            Preferences
          </h2>

          {!deadlinePassed ? (
            <button
              onClick={() => navigate("/preferences")}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
            >
              Fill Preferences
            </button>
          ) : (
            <p className="text-red-500 font-medium">
              Deadline Passed
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">
            Results
          </h2>

          {deadlinePassed ? (
            <button
              onClick={() => navigate("/match")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
            >
              View Results
            </button>
          ) : (
            <p className="text-gray-500">
              Available after deadline
            </p>
          )}
        </div>

      </div>

      {/* 🔥 ANNOUNCEMENTS */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="font-semibold mb-4 text-lg text-gray-700">
          Announcements
        </h2>

        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet</p>
        ) : (
          announcements.map((a, i) => (
            <div key={i} className="border-b py-2">
              <p>{a.text}</p>
              <small className="text-gray-500">
                {a.time || ""}
              </small>
            </div>
          ))
        )}
      </div>

      {/* 🔥 PROFILE MODAL */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-80 relative shadow-lg">

            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4">Profile</h2>

            <p className="mb-4">
              <strong>Reg No:</strong> {regNo}
            </p>

            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-xl"
            >
              Logout
            </button>

          </div>
        </div>
      )}

      {/* 🔥 CHATBOT */}
      <Chatbot />

    </div>
  );
}
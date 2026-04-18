import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);

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

  const addAnnouncement = () => {
    if (!announcement.trim()) return;

    const newItem = {
      text: announcement,
      time: new Date().toLocaleString()
    };

    const updated = [newItem, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("announcements", JSON.stringify(updated));
    setAnnouncement("");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-green-100">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Admin Control Panel
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-5 bg-white border border-blue-200 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Total Students</p>
          <h2 className="text-2xl font-bold text-blue-600">120</h2>
        </div>

        <div className="p-5 bg-white border border-blue-200 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Submitted</p>
          <h2 className="text-2xl font-bold text-green-600">85</h2>
        </div>

        <div className="p-5 bg-white border border-blue-200 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-red-500">35</h2>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white border border-blue-200 rounded-xl shadow p-5 mt-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-3">
          Announcements
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter announcement..."
            className="flex-1 px-3 py-2 border border-blue-300 rounded-lg"
          />

          <button
            onClick={addAnnouncement}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 text-sm text-gray-700">
          {announcements.map((a, i) => (
            <li key={i} className="bg-blue-50 p-2 rounded-lg">
              <p>{a.text}</p>
              <p className="text-xs text-gray-500">{a.time}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div onClick={() => navigate("/admin/students")}
          className="cursor-pointer p-5 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 text-white">
          Students
        </div>

        <div onClick={() => navigate("/admin/matching")}
          className="cursor-pointer p-5 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 text-white">
          Run Matching
        </div>

        <div onClick={() => navigate("/admin/results")}
          className="cursor-pointer p-5 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 text-white">
          Results
        </div>

        <div
          onClick={() => navigate("/admin/control")}
          className="cursor-pointer p-5 rounded-xl 
             bg-gradient-to-br from-blue-500 to-green-500 text-white"
        >
          System Control
        </div>
      </div>
    </div>
  );
}
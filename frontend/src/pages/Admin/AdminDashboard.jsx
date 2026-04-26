import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [currentDeadline, setCurrentDeadline] = useState("");
  const [announcement, setAnnouncement] = useState("");

  // ================= FETCH =================

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/preferences/submitted");
    const data = await res.json();
    setStudents(data);
  };

  const fetchDeadline = async () => {
    const res = await fetch("http://localhost:5000/api/system");
    const data = await res.json();
    setCurrentDeadline(data.deadline || "Not set");
  };

  useEffect(() => {
    fetchStudents();
    fetchDeadline();
  }, []);

  // ================= ACTIONS =================

  // ✅ Save Deadline
  const saveDeadline = async () => {
    await fetch("http://localhost:5000/api/system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deadline })
    });

    fetchDeadline();
  };

  // ✅ Add Announcement
  const addAnnouncement = async () => {
    if (!announcement) return;

    await fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcement })
    });

    setAnnouncement("");
  };

  // ✅ Run Matching
  const runMatching = async () => {
    await fetch("http://localhost:5000/api/matching/run", {
      method: "POST"
    });

    alert("✅ Matching Completed");
  };

  // ✅ View Matches (🔥 FIXED ROUTE)
  const viewMatches = () => {
    navigate("/admin/results");
  };

  // ✅ Publish Results
  const publishResults = async () => {
    await fetch("http://localhost:5000/api/system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: true })
    });

    alert("✅ Results Published");
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        Homigo Admin
      </h1>

      <p className="mb-6 text-gray-600">
        Dr. B. R. Ambedkar National Institute of Technology Jalandhar
      </p>

      {/* DEADLINE */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-2">Set Submission Deadline</h2>

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 mr-3 rounded"
        />

        <button
          onClick={saveDeadline}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <p className="mt-2 text-sm text-gray-500">
          Current: {currentDeadline}
        </p>
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-2">Announcements</h2>

        <input
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Enter announcement..."
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={addAnnouncement}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mb-6">

        <button
          onClick={runMatching}
          className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl"
        >
          Run Matching
        </button>

        <button
          onClick={viewMatches}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl"
        >
          View Matches
        </button>

        <button
          onClick={publishResults}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl"
        >
          Publish Results
        </button>

      </div>

      {/* SUBMITTED STUDENTS */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Registered Students ({students.length})
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500">No submissions yet</p>
        ) : (
          <div className="space-y-3">

            {students.map((s, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-medium">{s.regNo}</p>
                  <p className="text-sm text-gray-500">
                    {s.diet} • {s.sleep} • {s.study}
                  </p>
                </div>

                {s.knownPeer && (
                  <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                    Peer: {s.knownPeer}
                  </span>
                )}
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}
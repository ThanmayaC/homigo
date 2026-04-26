import { useState } from "react";

export default function MatchingControl() {
  const [status, setStatus] = useState("");

  const runMatching = async () => {
    try {
      setStatus("Running matching...");

      const res = await fetch("http://localhost:5000/api/matching/run", {
        method: "POST"
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("Error: " + data.error);
        return;
      }

      setStatus(`✅ ${data.count} matches created`);

    } catch (err) {
      console.error(err);
      setStatus("❌ Backend error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-green-100">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Matching Control
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <button
          onClick={runMatching}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg"
        >
          Run Matching
        </button>

        <p className="mt-4 text-gray-700">{status}</p>

      </div>

    </div>
  );
}
import { useState } from "react";

export default function PreferenceForm() {
  const [form, setForm] = useState({
    branch: "",
    diet: "",
    sleep: "",
    cleanliness: "",
    study: "",
    noise: "",
    personality: "",
    studyIntensity: "",
    dealBreaker: "",
    knownPeer: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/system");
const settings = await res.json();

if (!settings.submissionsOpen) {
  alert("Submissions are closed");
  return;
}

  if (
    !form.branch ||
    !form.diet ||
    !form.sleep ||
    !form.cleanliness ||
    !form.study ||
    !form.noise ||
    !form.personality ||
    !form.studyIntensity
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const regNo = localStorage.getItem("user");

    console.log("regNo:", regNo); // 🔥 DEBUG

    const payload = {
      ...form,
      regNo
    };

    const res = await fetch("http://localhost:5000/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // 🔥 IMPORTANT FIX
    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);
      alert("Backend error: " + text);
      return;
    }

    const data = await res.json();

    console.log("Saved:", data);
    alert("Preferences Saved ✅");

  } catch (err) {
    console.error("Frontend error:", err);
    alert("Error saving preferences");
  }
};

  return (
    <div className="min-h-screen text-black p-6 relative overflow-hidden
                bg-gradient-to-br from-blue-100 via-white to-green-100">

      {/* Background */}
      <div className="absolute w-96 h-96 bg-blue-300/30 blur-3xl top-[-100px] left-[-100px] animate-float"></div>
      <div className="absolute w-96 h-96 bg-green-300/30 blur-3xl bottom-[-120px] right-[-100px] animate-float"></div>

      <div className="relative z-10 max-w-xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Roommate Preferences
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white backdrop-blur-lg border border-blue-200
                     rounded-2xl p-6 space-y-5 shadow-lg"
        >

          {/* Branch */}
          <div>
            <label className="text-sm text-gray-600">Branch</label>
            <select className="input" onChange={(e) => setForm({ ...form, branch: e.target.value })}>
              <option value="">Select Branch</option>
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>MECH</option>
              <option>CIVIL</option>
            </select>
          </div>

          {/* Diet */}
          <div>
            <label className="text-sm text-gray-600">Diet</label>
            <select className="input" onChange={(e) => setForm({ ...form, diet: e.target.value })}>
              <option value="">Select Diet</option>
              <option>Veg</option>
              <option>Non-Veg</option>
              <option>Eggetarian</option>
            </select>
          </div>

          {/* Sleep */}
          <div>
            <label className="text-sm text-gray-600">Sleep Schedule</label>
            <select className="input" onChange={(e) => setForm({ ...form, sleep: e.target.value })}>
              <option value="">Select</option>
              <option>Early</option>
              <option>Moderate</option>
              <option>Late</option>
            </select>
          </div>

          {/* Cleanliness */}
          <div>
            <label className="text-sm text-gray-600">Cleanliness Level</label>
            <select className="input" onChange={(e) => setForm({ ...form, cleanliness: e.target.value })}>
              <option value="">Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Study */}
          <div>
            <label className="text-sm text-gray-600">Study Environment</label>
            <select className="input" onChange={(e) => setForm({ ...form, study: e.target.value })}>
              <option value="">Select</option>
              <option>Silent</option>
              <option>Moderate Noise</option>
              <option>Interactive</option>
            </select>
          </div>

          {/* Noise */}
          <div>
            <label className="text-sm text-gray-600">Noise Tolerance</label>
            <select className="input" onChange={(e) => setForm({ ...form, noise: e.target.value })}>
              <option value="">Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Personality */}
          <div>
            <label className="text-sm text-gray-600">Personality Type</label>
            <select className="input" onChange={(e) => setForm({ ...form, personality: e.target.value })}>
              <option value="">Select</option>
              <option>Introvert</option>
              <option>Ambivert</option>
              <option>Extrovert</option>
            </select>
          </div>

          {/* Study Intensity */}
          <div>
            <label className="text-sm text-gray-600">Study Intensity</label>
            <select className="input" onChange={(e) => setForm({ ...form, studyIntensity: e.target.value })}>
              <option value="">Select</option>
              <option>Casual</option>
              <option>Moderate</option>
              <option>Serious</option>
            </select>
          </div>

          {/* Deal Breaker */}
          <div>
            <label className="text-sm text-gray-600">Deal Breaker (Optional)</label>
            <select className="input" onChange={(e) => setForm({ ...form, dealBreaker: e.target.value })}>
              <option value="">None</option>
              <option>Needs Silence</option>
              <option>Early Sleeper Only</option>
              <option>Same Study Type</option>
            </select>
          </div>

          {/* Known Peer */}
          <div>
            <label className="text-sm text-gray-600">Known Peer (Optional)</label>
            <input
              type="text"
              placeholder="Enter registration number"
              className="input"
              onChange={(e) => setForm({ ...form, knownPeer: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500
                       text-white rounded-lg font-semibold hover:scale-[1.03]
                       transition duration-300"
          >
            Submit Preferences
          </button>

        </form>
      </div>
    </div>
  );
}
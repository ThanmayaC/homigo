import { useState } from "react";

export default function PreferenceForm() {
  const [form, setForm] = useState({
    diet: "",
    sleep: "",
    cleanliness: "",
    study: "",
    knownPeer: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.diet || !form.sleep || !form.cleanliness || !form.study) {
      alert("Please fill all required fields");
      return;
    }

    console.log(form);
    alert("Preferences Submitted!");
  };

  return (
    <div className="min-h-screen text-black p-6 relative overflow-hidden
                bg-gradient-to-br from-blue-100 via-white to-green-100">

      {/* 🔮 Background Glow */}
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

          {/* Diet */}
          <div>
            <label className="text-sm text-gray-600">Diet</label>
            <select
              className="w-full mt-1 p-3 rounded-lg bg-white border border-blue-300 text-black
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setForm({ ...form, diet: e.target.value })}
            >
              <option value="">Select Diet</option>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
          </div>

          {/* Sleep */}
          <div>
            <label className="text-sm text-gray-600">Sleep Schedule</label>
            <select
              className="w-full mt-1 p-3 rounded-lg bg-white border border-blue-300 text-black
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setForm({ ...form, sleep: e.target.value })}
            >
              <option value="">Select</option>
              <option>Early</option>
              <option>Late</option>
            </select>
          </div>

          {/* Cleanliness */}
          <div>
            <label className="text-sm text-gray-600">Cleanliness Level</label>
            <select
              className="w-full mt-1 p-3 rounded-lg bg-white border border-blue-300 text-black
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setForm({ ...form, cleanliness: e.target.value })}
            >
              <option value="">Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Study */}
          <div>
            <label className="text-sm text-gray-600">Study Preference</label>
            <select
              className="w-full mt-1 p-3 rounded-lg bg-white border border-blue-300 text-black
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setForm({ ...form, study: e.target.value })}
            >
              <option value="">Select</option>
              <option>Silent</option>
              <option>Music</option>
            </select>
          </div>

          {/* Known Peer */}
          <div>
            <label className="text-sm text-gray-600">Known Peer (Optional)</label>
            <input
              type="text"
              placeholder="Enter registration number"
              className="w-full mt-1 p-3 rounded-lg bg-white border border-blue-300 text-black
                         focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setForm({ ...form, knownPeer: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button
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
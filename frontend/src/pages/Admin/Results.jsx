import { useEffect, useState } from "react";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/matching")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-green-100">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Matching Results
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-600">No matches yet</p>
      ) : (
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2">Student 1</th>
                <th className="p-2">Student 2</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>

            <tbody>
              {results.map((m, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{m.student1}</td>
                  <td className="p-2">{m.student2}</td>
                  <td className="p-2">{m.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
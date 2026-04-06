export default function MatchResult() {

  const match = {
    roommate: "23103051",
    name : "Hitali",
    score: 8,
    reason: [
      "Same diet preference (Veg)",
      "Similar sleep schedule (Early)",
      "Compatible study environment"
    ]
  };

  return (
    <div className="min-h-screen text-black p-6 relative overflow-hidden
                bg-gradient-to-br from-blue-100 via-white to-green-100">

      {/* 🔮 Background Glow */}
      <div className="absolute w-96 h-96 bg-blue-300/30 blur-3xl top-[-100px] left-[-100px] animate-float"></div>
      <div className="absolute w-96 h-96 bg-green-300/30 blur-3xl bottom-[-120px] right-[-100px] animate-float"></div>

      <div className="relative z-10 max-w-xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Your Roommate Match
        </h1>

        {/* 💎 Match Card */}
        <div className="bg-white backdrop-blur-lg border border-blue-200
                        rounded-2xl p-6 shadow-lg space-y-4">

          {/* Roommate */}
          <div>
            <p className="text-gray-600 text-sm">Roommate</p>
            <h2 className="text-2xl font-semibold text-blue-600">
               {match.name} - {match.roommate}
            </h2>
          </div>

          {/* Score */}
          <div>
            <p className="text-gray-600 text-sm">Compatibility Score</p>
            <div className="flex items-center gap-3 mt-1">

              <div className="text-xl font-bold text-blue-600">
                {match.score}/10
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-blue-100 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                  style={{ width: `${match.score * 10}%` }}
                ></div>
              </div>

            </div>
          </div>

          {/* Reasons */}
          <div>
            <p className="text-gray-600 text-sm mb-2">
              Why this match?
            </p>

            <ul className="space-y-2">
              {match.reason.map((r, i) => (
                <li
                  key={i}
                  className="bg-blue-50 border border-blue-200
                             px-3 py-2 rounded-lg text-sm text-gray-700"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
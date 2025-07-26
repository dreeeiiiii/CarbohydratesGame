import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const originalSugars = [
  { name: "Glucose", icon: "🍬" },
  { name: "Fructose", icon: "🍯" },
  { name: "Galactose", icon: "🥛" },
  { name: "Xylose", icon: "🌿" },
  { name: "Ribose", icon: "🔬" },
  { name: "Mannose", icon: "🍏" },
];

const targets = [
  { name: "Lactose", combo: ["Glucose", "Galactose"], emoji: "🥛" },
  { name: "Maltose", combo: ["Glucose", "Glucose"], emoji: "🍞" },
  { name: "Sucrose", combo: ["Glucose", "Fructose"], emoji: "🍬" },
];

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RoomTwo() {
  const navigate = useNavigate();
  const [sugars, setSugars] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [mixStatus, setMixStatus] = useState("idle"); // idle, mixing, boom
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    setSugars(shuffleArray(originalSugars));
  }, []);

  const currentTargetIndex = results.length; // index for current target
  const currentTarget = targets[currentTargetIndex];
  const isComplete = results.length === targets.length;

  // Custom drag preview for mobile & desktop
  const handleDragStart = (e, sugarName) => {
    e.dataTransfer.setData("text/plain", sugarName);

    // Create a small custom drag preview element
    const dragPreview = document.createElement("div");
    dragPreview.style.position = "absolute";
    dragPreview.style.top = "-1000px"; // hide off-screen
    dragPreview.style.padding = "8px 12px";
    dragPreview.style.background = "#ddd";
    dragPreview.style.borderRadius = "8px";
    dragPreview.style.fontSize = "20px";
    dragPreview.style.fontWeight = "600";
    dragPreview.style.color = "#333";
    dragPreview.innerText = sugarName;

    document.body.appendChild(dragPreview);
    e.dataTransfer.setDragImage(
      dragPreview,
      dragPreview.offsetWidth / 2,
      dragPreview.offsetHeight / 2
    );

    // Remove after a tick to avoid memory leaks
    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const sugarName = e.dataTransfer.getData("text/plain");
    if (sugarName && selected.length < 2) {
      setSelected((prev) => [...prev, sugarName]);
      setMessage("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleMix = () => {
    if (selected.length === 2) {
      setMixStatus("mixing");
      setTimeout(() => {
        const combo = [...selected].sort().join("+");

        // Only allow matching the current target combo
        if (
          [...currentTarget.combo].sort().join("+") === combo &&
          !results.includes(currentTarget.name)
        ) {
          setResults([...results, currentTarget.name]);
          setMessage(`✅ Created ${currentTarget.name} ${currentTarget.emoji}`);
          setMixStatus("idle");
        } else {
          setMessage(
            `❌ Incorrect or out-of-order combination. Find ${currentTarget.name} first!`
          );
          setMixStatus("boom");
          setTimeout(() => setMixStatus("idle"), 800);
        }
        setSelected([]);
      }, 1000);
    }
  };

  const tapSelect = (sugarName) => {
    if (selected.length < 2) {
      setSelected((prev) => [...prev, sugarName]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-indigo-800 mb-4">
        🧪 Room 2: Disaccharide Dilemma
      </h1>

      {/* Note about order */}
      <div className="max-w-3xl text-center bg-indigo-200 text-indigo-900 p-4 rounded-xl mb-6 font-semibold">
        📝 <span>Find the disaccharides in order: </span>
        <strong>{targets.map((t) => t.name).join(" → ")}</strong>
      </div>

      <p className="text-lg text-indigo-700 mb-6 text-center max-w-2xl">
        Drag or tap sugar molecules into the beaker to form{" "}
        <strong>{currentTarget?.name}</strong> first! Match all targets in order
        to unlock the next room.
      </p>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">
        {/* Left Side: Sugar Cards */}
        <div className="flex-1 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">
            🔬 Available Sugars
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {sugars.map(({ name, icon }) => (
              <div
                key={name}
                draggable
                onDragStart={(e) => handleDragStart(e, name)}
                onClick={() => tapSelect(name)}
                className="cursor-pointer rounded-xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-lg bg-indigo-100 border-2 border-indigo-300"
              >
                <span className="text-5xl mb-3 select-none">{icon}</span>
                <span className="text-indigo-900 font-semibold text-lg select-none">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Mixing Bottle */}
        <div
          className={`flex-1 bg-indigo-100 shadow-inner rounded-2xl flex flex-col items-center justify-center px-4 py-8 transition-colors duration-300 ${
            isDragOver ? "bg-indigo-200 border-4 border-indigo-600" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <h3 className="text-xl font-bold text-indigo-900 mb-4">🧪 Mixing Bottle</h3>
          <div
            className={`relative w-40 h-64 rounded-b-full border-4 overflow-hidden flex items-end justify-center transition-all duration-500 ${
              mixStatus === "boom"
                ? "animate-shake border-red-500 bg-red-100"
                : "border-indigo-500 bg-white"
            }`}
          >
            <div
              className={`w-full transition-all duration-500 ${
                mixStatus === "mixing"
                  ? "bg-indigo-400 h-2/3 animate-bubble"
                  : selected.length === 2
                  ? "bg-indigo-300 h-2/3"
                  : selected.length === 1
                  ? "bg-indigo-200 h-1/3"
                  : "bg-indigo-100 h-1/6"
              }`}
            ></div>
          </div>
          <div className="flex gap-3 mt-6 text-indigo-800 text-lg font-medium min-h-[2.5rem]">
            {selected.map((s, i) => (
              <span key={i} className="select-none">
                🍬 {s}
              </span>
            ))}
          </div>
          <button
            onClick={handleMix}
            disabled={selected.length !== 2}
            className={`mt-4 px-6 py-2 rounded-xl font-semibold shadow text-white ${
              selected.length === 2
                ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            ➕ Mix Sugars
          </button>
          {message && (
            <p className="mt-4 text-indigo-900 font-medium select-none text-center max-w-xs">
              {message}
            </p>
          )}
        </div>

        {/* Right Side: Target Results */}
        <div className="flex-1 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">🧩 Target Results</h2>
          <ul className="space-y-4">
            {targets.map(({ name, emoji }, index) => (
              <li
                key={name}
                className={`px-5 py-4 rounded-lg border flex justify-between items-center ${
                  results.includes(name)
                    ? "bg-green-100 border-green-400"
                    : "bg-gray-50 border-gray-200"
                } ${index > currentTargetIndex ? "opacity-50" : ""}`}
              >
                <span className="font-medium text-indigo-800 select-none">
                  Form <strong>{name}</strong> {emoji}
                </span>
                {results.includes(name) && (
                  <span className="text-green-600 font-bold select-none">✔️</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isComplete && (
        <button
          onClick={() => navigate("/roomThree")}
          className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg"
        >
          🚪 Enter Room 3
        </button>
      )}

      {/* Tailwind animation for shake */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
          @keyframes bubble {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bubble {
            animation: bubble 1s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAppleAlt,
  FaDrumstickBite,
  FaCarrot,
  FaTint,
  FaBolt,
  FaSpa,
  FaEgg,
  FaTools,
  FaTruck,
  FaDumbbell,
  FaOilCan,
  FaBone,
  FaFilter,
  FaRecycle
} from "react-icons/fa";

const allFunctions = [
  "Fiber for digestive health",
  "Branched glucose chains",
  "Plant starch energy",
  "Water enhancer",
  "Enzyme breaker",
  "Energy booster",
  "Skin moisturizer",
  "Animal protein",
  "Structural filler",
  "Glucose transporter",
  "Muscle builder",
  "Fat emulsifier",
  "Bone protector",
  "Starch separator",
  "Cell cleanser"
];

const correctAnswers = [
  "Fiber for digestive health",
  "Branched glucose chains",
  "Plant starch energy"
];

const hints = [
  "Fiber helps maintain healthy digestion.",
  "Glycogen has branched glucose chains in animals.",
  "Starch stores energy in plants."
];

export default function RoomThree() {
  const navigate = useNavigate(); // ✅ Moved inside the component

  const [cards, setCards] = useState([]);
  const [dropped, setDropped] = useState([null, null, null]);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const dropRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    setCards(shuffle(allFunctions));
    setDropped([null, null, null]);
    setError("");
    setShowHint(false);
    setIsUnlocked(false);
  }, []);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const availableCards = cards.filter((c) => !dropped.includes(c));

  const getIcon = (text) => {
    if (text.includes("Fiber")) return <FaCarrot className="text-orange-500" />;
    if (text.includes("Branched")) return <FaDrumstickBite className="text-red-500" />;
    if (text.includes("starch")) return <FaAppleAlt className="text-green-500" />;
    if (text.includes("Water")) return <FaTint className="text-blue-400" />;
    if (text.includes("Enzyme")) return <FaTools className="text-gray-500" />;
    if (text.includes("Energy")) return <FaBolt className="text-yellow-500" />;
    if (text.includes("Skin")) return <FaSpa className="text-pink-400" />;
    if (text.includes("protein")) return <FaEgg className="text-purple-500" />;
    if (text.includes("Structural")) return <FaTools className="text-blue-700" />;
    if (text.includes("transporter")) return <FaTruck className="text-indigo-500" />;
    if (text.includes("Muscle")) return <FaDumbbell className="text-red-600" />;
    if (text.includes("Fat")) return <FaOilCan className="text-yellow-600" />;
    if (text.includes("Bone")) return <FaBone className="text-gray-700" />;
    if (text.includes("separator")) return <FaFilter className="text-green-700" />;
    if (text.includes("cleanser")) return <FaRecycle className="text-cyan-600" />;
    return <FaAppleAlt className="text-gray-400" />;
  };

  const handleDragEnd = (event, info, func) => {
    const { point } = info;
    const dropIndex = dropRefs.findIndex((ref) => {
      if (!ref.current) return false;
      const rect = ref.current.getBoundingClientRect();
      return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
      );
    });

    if (dropIndex !== -1) {
      if (dropped[dropIndex]) {
        setError("That slot is already filled!");
      } else {
        const newDropped = [...dropped];
        newDropped[dropIndex] = func;
        setDropped(newDropped);
        setError("");
      }
    }
  };

  const removeDropped = (index) => {
    const newDropped = [...dropped];
    newDropped[index] = null;
    setDropped(newDropped);
    setError("");
  };

  const handleSubmit = () => {
    if (dropped.includes(null)) {
      setError("Please fill all three slots before submitting.");
      return;
    }

    const sortedDropped = [...dropped].sort();
    const sortedCorrect = [...correctAnswers].sort();
    const correct = sortedDropped.every((val, i) => val === sortedCorrect[i]);

    if (correct) {
      setError("🎉 Correct! You've unlocked the next room.");
      setIsUnlocked(true);
    } else {
      setError("❌ One or more are incorrect. Try again!");
      setDropped([null, null, null]);
      setCards(shuffle(allFunctions));
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4 font-sans flex flex-col items-center"
      style={{ maxHeight: "100vh", overflow: "hidden" }}
    >
      <header className="flex justify-between items-center w-full max-w-lg mb-2 px-2">
        <h1 className="text-xl font-bold text-orange-700">🧩 Match the Food Functions</h1>
        <button
          onClick={() => {
            setCards(shuffle(allFunctions));
            setDropped([null, null, null]);
            setError("");
            setShowHint(false);
            setIsUnlocked(false);
          }}
          className="bg-yellow-200 text-orange-800 px-3 py-1 rounded-lg shadow hover:bg-yellow-300 transition text-sm"
        >
          🔄 Reset
        </button>
      </header>

      <section className="bg-white border-l-4 border-orange-300 p-3 rounded-xl shadow-md mb-3 text-gray-800 text-sm max-w-lg w-full">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-md font-semibold">👨‍🍳 Chef’s Instructions</h2>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-orange-600 text-sm font-semibold hover:underline focus:outline-none"
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        <p>
          Drag the function cards into the 3 slots. Submit when ready! Only{" "}
          <span className="font-semibold text-orange-600">3 functions</span> are correct. 🍀
        </p>
        {showHint && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-300 rounded text-orange-700">
            {hints.map((hint, i) => (
              <p key={i}>• {hint}</p>
            ))}
          </div>
        )}
      </section>

      {/* Cards */}
      <section
        className="flex flex-wrap justify-center gap-2 max-w-lg w-full mb-4 overflow-y-auto border rounded-md p-2 bg-white"
        style={{ maxHeight: "30vh" }}
      >
        {availableCards.map((func, i) => (
          <motion.div
            key={i}
            className="p-1.5 rounded-lg shadow border border-yellow-200 cursor-pointer select-none flex items-center space-x-2 bg-yellow-50 hover:bg-yellow-100"
            style={{ minWidth: "110px" }}
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(e, info) => handleDragEnd(e, info, func)}
          >
            <div className="text-lg">{getIcon(func)}</div>
            <div className="text-xs font-medium text-gray-800">{func}</div>
          </motion.div>
        ))}
      </section>

      {/* Drop Zones */}
      <section className="flex justify-center gap-3 max-w-lg w-full" style={{ maxHeight: "12vh" }}>
        {dropped.map((func, i) => (
          <div
            key={i}
            ref={dropRefs[i]}
            className="flex-grow h-16 bg-white rounded-xl border-4 border-yellow-300 shadow-inner flex items-center justify-between px-3 text-center text-xs font-semibold text-gray-700 hover:bg-yellow-50 transition cursor-pointer"
            onClick={() => removeDropped(i)}
            title="Click to remove"
          >
            {func ? (
              <>
                <div className="flex items-center space-x-2">
                  <div>{getIcon(func)}</div>
                  <div>{func}</div>
                </div>
                <div className="text-red-500 font-bold">✕</div>
              </>
            ) : (
              "🍴 Drop function here"
            )}
          </div>
        ))}
      </section>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-red-600 font-semibold text-center max-w-lg px-2">{error}</div>
      )}

      {/* Submit */}
      {!isUnlocked && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-500 transition max-w-lg w-full"
        >
          ✅ Submit
        </button>
      )}

      {/* Final Room Button */}
      {isUnlocked && (
        <button
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition max-w-lg w-full"
          onClick={() => {
            alert("You’re now entering the Final Room 🔐");
            navigate("/lastRoom");
          }}
        >
          🚪 Go to Final Room
        </button>
      )}
    </div>
  );
}

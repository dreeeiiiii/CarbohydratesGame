import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sugarOptions = [
  "Glucose",
  "Fructose",
  "Sucrose",
  "Lactose",
  "Maltose",
  "Galactose",
];

export default function FinalRoom() {
  const [sugar1, setSugar1] = useState("");
  const [sugar2, setSugar2] = useState("");
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!sugar1 || !sugar2 || !dishName || !description) {
      alert("Please complete all fields before submitting.");
      return;
    }
    setSubmitted(true);
  };

  // Create JSON file and trigger download
  const handleDownload = () => {
    const data = {
      dishName,
      sugarCombo: [sugar1, sugar2],
      description,
      timestamp: new Date().toISOString(),
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${dishName.replace(/\s+/g, "_")}_carb_combo.json`;
    link.click();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-100 to-yellow-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-700 mb-4 text-center">
        🏁 Final Exit: Build Your Own Dish
      </h1>
      <p className="text-center text-gray-700 max-w-xl mb-6">
        Choose <strong>two sugars</strong>, name your dish, and describe what it
        does in your body. Submit to earn your final badge!
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl space-y-4">
        {/* Sugar Selectors */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={sugar1}
            onChange={(e) => setSugar1(e.target.value)}
            className="w-full border p-2 rounded text-gray-700"
          >
            <option value="">🍬 Choose Sugar 1</option>
            {sugarOptions.map((sugar, i) => (
              <option key={i} value={sugar}>
                {sugar}
              </option>
            ))}
          </select>

          <select
            value={sugar2}
            onChange={(e) => setSugar2(e.target.value)}
            className="w-full border p-2 rounded text-gray-700"
          >
            <option value="">🍭 Choose Sugar 2</option>
            {sugarOptions.map((sugar, i) => (
              <option key={i} value={sugar}>
                {sugar}
              </option>
            ))}
          </select>
        </div>

        {/* Dish Name */}
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          placeholder="🍽️ Name your dish"
          className="w-full border p-2 rounded text-gray-700"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="🧠 What does it do in your body?"
          rows={4}
          className="w-full border p-2 rounded text-gray-700"
        />

        {/* Submit */}
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold"
          >
            🎖️ Submit for Final Badge
          </button>
        )}

        {/* Confirmation + Download + Exit */}
        {submitted && (
          <div className="space-y-4">
            <div className="text-center text-green-700 bg-green-100 px-4 py-3 rounded-lg shadow max-w-md mx-auto">
              ✅ Well done! You've created <strong>{dishName}</strong> with{" "}
              {sugar1} and {sugar2}. Your final badge is earned! 🏅
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
            >
              📥 Download Your Dish Info
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition font-semibold"
            >
              🚪 Exit to Main Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

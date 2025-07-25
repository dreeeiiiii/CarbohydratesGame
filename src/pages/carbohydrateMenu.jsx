import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { GiChemicalDrop, GiBread } from "react-icons/gi";
import { PiCubeLight } from "react-icons/pi";

export default function CarbohydrateMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 px-6 py-12 md:px-20 font-sans">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10 space-y-12 relative overflow-hidden">

        {/* Decorative Background Visuals */}
        <div className="absolute -top-10 -right-10 opacity-10 text-[200px] pointer-events-none">🍞</div>
        <div className="absolute bottom-0 left-0 opacity-10 text-[150px] pointer-events-none">🍬</div>

        {/* Header */}
        <header className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-900 drop-shadow-sm">
            🧾 Welcome to the Menu
          </h2>
          <h3 className="text-2xl font-semibold text-yellow-800">
            What Are Carbohydrates?
          </h3>
        </header>

        {/* Visual Icons */}
        <div className="flex justify-center gap-6 text-6xl text-yellow-700">
          <GiChemicalDrop title="Carbon" />
          <GiChemicalDrop className="text-white" title="Hydrogen" />
          <GiChemicalDrop className="text-red-600" title="Oxygen" />
          <PiCubeLight title="Sugar Cube" />
          <GiBread title="Bread" />
        </div>

        {/* Description */}
        <section className="text-yellow-900 text-lg md:text-xl leading-relaxed space-y-4">
          <p>
            Carbohydrates are <strong>biomolecules</strong> made of{" "}
            <strong>Carbon (C)</strong>, <strong>Hydrogen (H)</strong>, and{" "}
            <strong>Oxygen (O)</strong> – typically in a <strong>1:2:1</strong> ratio.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800 mb-1">They are classified as:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Monosaccharides</strong> – 1 sugar unit</li>
              <li><strong>Disaccharides</strong> – 2 sugar units</li>
              <li><strong>Polysaccharides</strong> – many sugar units</li>
            </ul>
          </div>

          <p>
            <strong>🍬 Function:</strong> Carbohydrates are the body’s{" "}
            <span className="font-bold">main energy source</span>, help with{" "}
            <span className="font-bold">structure</span>, and support{" "}
            <span className="font-bold">energy storage</span>.
          </p>
        </section>

        {/* Sidebar Digest */}
        <aside className="bg-yellow-100 p-6 rounded-xl border border-yellow-300 shadow-inner">
          <h4 className="text-xl font-bold text-yellow-800 mb-2">📚 Quick Science Digest</h4>
          <ul className="list-disc ml-5 text-base space-y-1 text-yellow-900">
            <li><strong>Monomer</strong> = Building block (e.g., glucose)</li>
            <li><strong>Polymer</strong> = Chain of monomers (e.g., starch)</li>
            <li><strong>Glycosidic bond</strong> = Links sugars together</li>
            <li><strong>Enzymes</strong> = Break down carbs (e.g., amylase, lactase)</li>
          </ul>
        </aside>

        {/* Next Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/appetizer")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-3 mx-auto shadow-md transition duration-300"
          >
            Next: Explore Appetizers <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

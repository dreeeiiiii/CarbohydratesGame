import React from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../components/table'

const Appetizer = () => {
  const navigate = useNavigate()

  const goToDessert = () => {
    navigate('/dessert') // adjust path if your route is different
  }

  return (
    <section className="max-w-5xl mx-auto p-6 bg-yellow-50 rounded-2xl shadow-lg mt-10">
      <h3 className="text-3xl font-extrabold text-yellow-900 mb-8 text-center">
        🍢 APPETIZERS: Monosaccharides – The Single Sugars
      </h3>

      <p className="text-yellow-800 text-lg mb-6 text-center max-w-xl mx-auto">
        Monosaccharides are the simplest form of carbohydrates. Think of them as single sugar “dishes” that fuel your body instantly!
      </p>

      {/* Table */}
      <Table
        headers={["Dish", "Structure", "Function", "Food Analogy", "Fun Fact"]}
        rows={[
          [
            <>
              <span role="img" aria-label="Sweet Shot Glucose" className="mr-2 text-yellow-600">⚡</span>
              Sweet Shot – Glucose
            </>,
            "C₆H₁₂O₆",
            "Primary energy source",
            "The café’s go-to energy booster",
            "Your brain runs almost entirely on glucose!"
          ],
          [
            <>
              <span role="img" aria-label="Fruit Fizz Fructose" className="mr-2 text-yellow-600">🍓</span>
              Fruit Fizz – Fructose
            </>,
            "C₆H₁₂O₆ (Isomer)",
            "Found in fruits & honey",
            "Nature’s sweetener",
            "Sweeter than glucose & sucrose!"
          ],
          [
            <>
              <span role="img" aria-label="Glu-Gal Combo Galactose" className="mr-2 text-yellow-600">🥛</span>
              Glu-Gal Combo – Galactose
            </>,
            "C₆H₁₂O₆",
            "Forms lactose with glucose",
            "Milk sugar helper",
            "Rarely found alone in nature"
          ],
        ]}
      />

      {/* Visual Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-yellow-900 space-y-4">
          <h4 className="text-2xl font-semibold">Why Monosaccharides Matter</h4>
          <p className="text-yellow-800 leading-relaxed">
            These single sugars are the building blocks for all carbs. When you eat carbs, your body breaks them down into monosaccharides to fuel your cells and brain immediately.
          </p>
          <p className="text-yellow-800 leading-relaxed">
            Understanding these "appetizers" helps you grasp how energy flows from food to your body.
          </p>

          {/* Next Button */}
          <button
            onClick={goToDessert}
            className="mt-8 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition"
          >
            Next: Desserts 🍨
          </button>
        </div>

        <div className="flex-1 relative w-full max-w-sm">
          {/* Visual representation of molecules */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Glucose-2D-skeletal.png/220px-Glucose-2D-skeletal.png"
            alt="Glucose molecule structure"
            className="rounded-lg shadow-md border border-yellow-300"
          />
          <p className="mt-2 text-center text-yellow-700 text-sm italic">Glucose Molecular Structure</p>
        </div>
      </div>
    </section>
  )
}

export default Appetizer

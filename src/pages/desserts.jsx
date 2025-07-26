import React from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../components/table'

const Desserts = () => {
  const navigate = useNavigate()

  const goToMainCourse = () => {
    navigate('/mainCourse') // adjust the path if your route is different
  }

  return (
    <section className="max-w-5xl mx-auto p-6 bg-yellow-50 rounded-2xl shadow-lg mt-10">
      <h3 className="text-3xl font-extrabold text-yellow-900 mb-8 text-center">
        🍨 DESSERTS: Disaccharides – Double the Sweetness
      </h3>

      <p className="text-yellow-800 text-lg mb-6 text-center max-w-xl mx-auto">
        Disaccharides are made by joining two monosaccharides. Think of these as the delicious dessert combos in the carbohydrate café!
      </p>

      {/* Table */}
      <Table
        headers={["Dish", "Components", "Function", "Example", "Fun Fact"]}
        rows={[
          [
            <>
              <span role="img" aria-label="Table Sugar Sundae" className="mr-2 text-yellow-600">🍬</span>
              Table Sugar Sundae – Sucrose
            </>,
            "Glucose + Fructose",
            "Table sugar",
            "Fruits, cane sugar",
            "Plants use sucrose to transport sugar"
          ],
          [
            <>
              <span role="img" aria-label="Milk Shake" className="mr-2 text-yellow-600">🥛</span>
              Milk Shake – Lactose
            </>,
            "Glucose + Galactose",
            "Milk sugar",
            "Dairy",
            "Lactose-intolerant people lack lactase"
          ],
          [
            <>
              <span role="img" aria-label="Malt Madness" className="mr-2 text-yellow-600">🍺</span>
              Malt Madness – Maltose
            </>,
            "Glucose + Glucose",
            "Starch breakdown product",
            "Cereals, malt",
            "Used in brewing beer"
          ],
        ]}
      />

      {/* Visual & Explanation Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-yellow-900 space-y-4">
          <h4 className="text-2xl font-semibold">What Makes Disaccharides Sweet?</h4>
          <p className="text-yellow-800 leading-relaxed">
            Disaccharides are like paired-up sugars. They are formed when two monosaccharides join via a glycosidic bond — a sweet chemical connection!
          </p>
          <p className="text-yellow-800 leading-relaxed">
            These combos give us table sugar, milk sugar, and malt sugar — all vital to energy and taste.
          </p>

          {/* Next Button */}
          <button
            onClick={goToMainCourse}
            className="mt-8 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition"
          >
            Next: Main Courses 🍝
          </button>
        </div>

        <div className="flex-1 relative w-full max-w-sm">
          {/* Visual: Sucrose molecular structure */}
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20231022121359/sucrose-660.jpg"
            alt="Sucrose molecule structure"
            className="rounded-lg shadow-md border border-yellow-300"
          />
          <p className="mt-2 text-center text-yellow-700 text-sm italic">Sucrose Molecular Structure</p>
        </div>
      </div>
    </section>
  )
}

export default Desserts

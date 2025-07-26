import React from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../components/table'

const MainCourses = () => {
  const navigate = useNavigate()

  const goToRoomOne = () => {
    navigate('/roomOne')
  }

  return (
    <section className="max-w-5xl mx-auto p-6 bg-yellow-50 rounded-2xl shadow-lg mt-10">
      <h3 className="text-3xl font-extrabold text-yellow-900 mb-8 text-center">
        🍝 MAIN COURSES: Polysaccharides – The Complex Plates
      </h3>

      <p className="text-yellow-800 text-lg mb-6 text-center max-w-xl mx-auto">
        Polysaccharides are long chains of sugars, making up the hearty main courses of the carbohydrate café. They provide sustained energy and structural support.
      </p>

      {/* Table */}
      <Table
        headers={["Dish", "Structure", "Function", "Example", "Fun Fact"]}
        rows={[
          [
            <>
              <span role="img" aria-label="Energy Spaghetti" className="mr-2 text-yellow-600">🍝</span>
              Energy Spaghetti – Starch
            </>,
            "Amylose + Amylopectin",
            "Plant energy storage",
            "Bread, rice",
            "Starts breaking down in your mouth"
          ],
          [
            <>
              <span role="img" aria-label="Power Pizza" className="mr-2 text-yellow-600">🍕</span>
              Power Pizza – Glycogen
            </>,
            "Highly branched glucose",
            "Animal energy storage",
            "Liver, muscles",
            "Your emergency energy reserve"
          ],
          [
            <>
              <span role="img" aria-label="Fiber Fries" className="mr-2 text-yellow-600">🍟</span>
              Fiber Fries – Cellulose
            </>,
            "β-glucose linkages",
            "Plant structure",
            "Veggies",
            "Humans can’t digest it – fiber!"
          ],
        ]}
      />

      {/* Visual & Explanation Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-yellow-900 space-y-4">
          <h4 className="text-2xl font-semibold">Why Polysaccharides Are Important</h4>
          <p className="text-yellow-800 leading-relaxed">
            These complex carbohydrates are like big plates packed with energy or fiber. Plants use them to store energy or build structure, while animals rely on them for quick-access reserves.
          </p>
          <p className="text-yellow-800 leading-relaxed">
            Understanding polysaccharides helps you see how your body gets both fast and slow energy from carbs.
          </p>

          {/* Next Button */}
          <button
            onClick={goToRoomOne}
            className="mt-8 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition"
          >
            🔐 Next: Start Escape Room – Room 1
          </button>
        </div>

        <div className="flex-1 relative w-full max-w-sm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Amylose.png"
            alt="Amylose molecular structure"
            className="rounded-lg shadow-md border border-yellow-300"
          />
          <p className="mt-2 text-center text-yellow-700 text-sm italic">Amylose (Starch) Molecular Structure</p>
        </div>
      </div>
    </section>
  )
}

export default MainCourses

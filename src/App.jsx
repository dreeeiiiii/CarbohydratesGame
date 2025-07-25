import './App.css'
import { Routes, Route, Link} from 'react-router-dom'
import Footer from './components/footer'
import CarbohydrateMenu from './pages/carbohydrateMenu'
import RoomOne from './pages/roomOne'
import RoomTwo from './pages/roomTwo'
import RoomThree from './pages/roomThree'
import Appetizer from './pages/appetizer'
import Desserts from './pages/desserts'
import MainCourse from './pages/mainCourses'




const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex flex-col items-center justify-center px-6 md:px-20">
      {/* Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Image + Storefront */}
        <div className="relative md:w-1/2 bg-yellow-200 flex items-center justify-center p-6">
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-800 tracking-wide">
              The Carbohydrate Café
            </h1>
            <div
              aria-label="Waiter holding molecular model"
              className="text-9xl select-none"
              role="img"
              title="Waiter holding molecular model"
            >
              🧑‍🍳⚛️
            </div>
            <div className="w-48 h-24 bg-yellow-300 rounded-lg shadow-inner mt-4"></div>
          </div>
        </div>

        {/* Right Side: Welcome Text */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-6">
            Welcome to The Carbohydrate Café
          </h2>
          <p className="text-yellow-800 text-lg md:text-xl leading-relaxed mb-8">
            Where molecules meet meals! Dive into our delicious menu and discover how carbohydrates fuel your body, build cells, and keep things running.
          </p>
          <p className="text-yellow-800 text-lg md:text-xl leading-relaxed">
            Whether you're a sugar newbie or a starch expert, there’s something here for everyone.
          </p>

          {/* Button to Carbohydrate Menu */}
          <div className="text-center mt-8">
            <Link
              to="/menu"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition"
            >
              🍽️ View Carbohydrate Menu
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};



function App() {
 return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<CarbohydrateMenu />} />
      <Route path="/appetizer" element={<Appetizer />} />
      <Route path="/dessert" element={<Desserts />} />
      <Route path="/mainCourse" element={<MainCourse />} />
      <Route path="/roomOne" element={<RoomOne />} />
      <Route path="/roomTwo" element={<RoomTwo />} />
      <Route path="/roomThree" element={<RoomThree />} />
    </Routes>

  )
}

export default App

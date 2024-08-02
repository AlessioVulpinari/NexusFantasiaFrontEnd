import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import MyNavbar from "./components/MyNavbar"
import HeroSection from "./components/HeroSection"
import ClassListSection from "./components/ClassListSection"
import ClassSection from "./components/ClassSection"
import RaceListSection from "./components/RacesListSection"
import RaceSection from "./components/RaceSection"
import MyFooter from "./components/MyFooter"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header>
          <MyNavbar />
        </header>
        <Routes>
          <Route path='/' element={<HeroSection />}></Route>
          <Route path='/classes' element={<ClassListSection />}></Route>
          <Route path='/class-detail/:classId' element={<ClassSection />}></Route>
          <Route path='/races' element={<RaceListSection />}></Route>
          <Route path='/race-detail/:raceId' element={<RaceSection />}></Route>
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </div>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import NavbarComp from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AbsensiOption from './pages/AbsensiOption'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AbsensiOption/>}/>

        </Routes>
      </BrowserRouter>
    {/* <NavbarComp/>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
    </>
  )
}

export default App

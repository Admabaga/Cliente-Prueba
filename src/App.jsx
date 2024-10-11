import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Components/Navigation'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lobby from './Components/Users/Lobby'
import Home from './Components/Home'
import RegisterProject from './Components/Projects/RegisterProject'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    <Footer></Footer>

    </>
  )
}

export default App

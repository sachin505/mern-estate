import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Sign_In from './pages/Sign_In'
import Sign_Out from './pages/Sign_Out'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Header from './components/Header'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Sign_In />} />
        <Route path='/sign-out' element={<Sign_Out />} />
        <Route path='/about' element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
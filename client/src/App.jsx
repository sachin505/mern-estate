import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Sign_In from './pages/Sign_In'
import Sign_Out from './pages/Sign_Out'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Header from './components/Header'
import Sign_Up from './pages/Sign_Up'
import PrivateRoute from './components/privateRoute'
import Create_Listing from './pages/create_listing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Sign_In />} />
        <Route path='/sign-up' element={<Sign_Up />} />
        <Route path='/sign-out' element={<Sign_Out />} />
        <Route path='/about' element={<About />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/create-listing" element={<Create_Listing/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Adminlogin from './components/admin/login'
import Home from './pages/admin/Home'
import Createprofile from './pages/admin/createuser'
import Editprofile from './pages/admin/editprofile'
import { useSelector } from 'react-redux'

function adminrouter() {
  return (
   <>
    <Routes>
        <Route path='login' element={<Adminlogin/>}></Route>
        <Route path='home' element={<Home/>}></Route>
        <Route path='createprofile' element={<Createprofile/>}></Route>
        <Route path='editprofile' element={<Editprofile/>}></Route>
    </Routes>
   </>
  )
}

export default adminrouter

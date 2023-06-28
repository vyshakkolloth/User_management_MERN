import Login from './components/user/login'
import Signup from './components/user/signup'
import Home from './pages/user/home'
import Profile from './pages/user/profile'
import Editprofile from './pages/user/editprofile'
import Adminrouter from './adminrouter'
import {Routes,Route} from 'react-router-dom'


function App() {
  

  return (
    <>
    <Routes>

     <Route path='/' element={<Signup/>}></Route>
     <Route path='/home' element={<Home/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/profile' element={<Profile/>}></Route>
     <Route path='/editprofile' element={<Editprofile/>}></Route>
     <Route path='/admin/*' element={<Adminrouter/>}></Route>

    </Routes>
    </>
  )
}

export default App

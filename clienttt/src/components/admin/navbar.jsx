import React, { useState } from 'react'
import './navbar.css'
import { useDispatch } from 'react-redux';
import { adminlogout } from '../../Redux/client';

import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate=useNavigate()
    const [active,setActive]=useState(1)
    const dispatch=useDispatch()


    const logout = () => {
      dispatch(adminlogout());
      navigate("/admin/login");
    };
  return (
    <div className='NavbarA'>
       
        <div className='items'>
           <ul className='navItemss'>
             <h5 className='title'>Dashbord</h5>
            <li  className={`${active==1? 'active':''}`} onClick={()=>{
              return setActive(1),navigate('/admin/home')}}>
            <i class="fa-solid fa-house"></i>
               <span>Home</span>
            </li>
            <li onClick={()=>setActive(2)} className={`${active==2? 'active':''}`} >
            <i class="fa-solid fa-circle-user"></i>
                <span>User</span>
            </li>
            <li onClick={()=>{return setActive(3),navigate('/admin/createprofile')}} className={`${active==3? 'active':''}`} >
            <i class="fa-solid fa-square-plus"></i>
                <span>Add user</span>
            </li>
            <li onClick={()=>setActive(4)} className={`${active==4? 'active':''}`} >
            <i onClick={logout} class="fa-solid fa-right-from-bracket"></i>
                <span style={{cursor:'pointer'}} onClick={logout}>Logout</span>
            </li>
            
        </ul>
        
         </div>
      
    </div>
  )
}

export default Header
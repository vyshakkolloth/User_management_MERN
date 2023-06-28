import React from 'react'
import Adminhome from '../../components/admin/navbar'
import Dashboard from '../../components/admin/dashboard'

function Home() {

  return (

    <div style={{width:'100%',display:'flex'}}>
    <div style={{width:'15%'}} >

        <Adminhome/>
    </div>
       
        <Dashboard/>

    </div>
  )
}

export default Home

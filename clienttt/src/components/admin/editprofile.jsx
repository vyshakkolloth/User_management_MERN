import React, { useEffect, useRef, useState } from 'react'
import './createprofile.css'
import adminAxios from '../../Axios/admin'
import { useNavigate,useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast,Toaster} from 'react-hot-toast'

 function editprofile() {
 
    const navigate=useNavigate(null)
    const [userdata,setUserdata]=useState({})
  const {adminToken}=useSelector((state)=>state.Client)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log(id)

  useEffect(() => {
    if (adminToken) {
        adminAxios.get('/editprofile?id='+id, {
            headers: {
                Authorization: adminToken
            }
        }).then((res)=>{
           
          setUserdata(res.data.userdata)
        })
    } else {
        navigate('/login')
    }
}, [])
    const imgbtn=useRef(null)
    // const name=useRef(null),username=useRef(null),email=useRef(null)

    const [active,setActive]= useState(1)
   
    const [username,SetUsername]=useState('')
    const [email,SetEmail]=useState('')
    const [Img,SetImg]=useState('')
    const [picture ,setPic] = useState('')
    const imageconvert = ()=>{
      const render = new FileReader()
      render.readAsDataURL(Img)
      render.onload = ()=>{
        setPic(render.result)
      }
    }
    Img ? imageconvert() : null

    const formSubmit=(e)=>{
      e.preventDefault()
      adminAxios.post('/updateprofile?id='+userdata._id,{
        username : username? username: userdata.firstname,
        email : email ? email : userdata.email,
        picture : picture ? picture: userdata.picture })
      .then((res)=>{
        if(res.data.success){
          toast.error(res.data.message)
          navigate('/admin/home')
        }
        else{
          toast.error(res.data.message)
          navigate('/admin/editprofile')
        }
      })
    }
  return (
    <div className='edit-profile'>
      <div className='edit-page'>
        <div className='edit-part'>
          <div className='heading'><h3>Edit profile</h3></div>
          <form onSubmit={formSubmit} >
            <div>
            <div className='edit-input-profile'>
                <img src={Img?`${URL.createObjectURL(Img)}`:''}  alt="" />
                <input onChange={(e)=>SetImg(e.target.files[0])} ref={imgbtn} type="file" />
                <div>
                <span style={{fontSize:20}}></span>
                <span style={{fontSize:10}} className='img-addbtn' onClick={()=>imgbtn.current.click()}>
                    Change profile photo</span>
                    </div>
            </div>
            <div className='edit-input-text'>
            <label htmlFor="">Username</label>
                <input  placeholder={userdata.firstname} onChange={(e)=>SetUsername(e.target.value)}  type="text" />
            </div>
            <div className='edit-input-text'>
            <label htmlFor="">Email</label>
                <input placeholder={userdata.email} onChange={(e)=>SetEmail(e.target.value)}  type="email" />
            </div>
           
            

            <div className='edit-form-submit'>
                <button >Submit</button>
            </div>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default editprofile
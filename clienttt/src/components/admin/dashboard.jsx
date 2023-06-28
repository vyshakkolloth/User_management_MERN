import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { useNavigate } from 'react-router-dom'
import adminAxios from '../../Axios/admin'
import { useSelector } from 'react-redux'
import { adminlogout } from '../../Redux/client'

import { useDispatch } from 'react-redux'

function Dashbord() {
    const navigate = useNavigate(null)
    const dispatch=useDispatch()
    const [dele, setDelete] = useState(1)
    const [Users, SetUsers] = useState([])
    const [searchInput , setSearch] =useState('')
    const [filterdata,setFilterData] = useState([])
    const { adminToken } = useSelector((state) => state.Client)

    useEffect(() => {
        adminAxios.get('/home', {
            headers: {
                Authorization: adminToken
            }
        }).then((res) => {
            console.log(res.data);
            SetUsers(res.data)
        })
    }, [dele])

    const deleteUser = (id) => {
        console.log(2345678);
        adminAxios.delete('/user-delete?id=' + id).then((res) => {
            console.log(res.data);
            if (res.data.success) {
                setDelete(dele + 1)

            }
        })
    }

    const filterUSer=()=>{

    
        let value=searchInput
        setFilterData(Users.filter((user)=>{
            let name=true,username=true
            for(let i=0;i<value.length;i++){
                if( user.firstname[i]!=value[i]){
                    name=false
                }
                if(user.email[i]!=value[i]){
                    username=false
                }
             
            }
            if(name||username){
                return user
            }
    
        }))
        console.log(3456789);
    console.log(filterdata);
    }


   

    return (
        <div className='dashbord'>
            <div className='table-show'>
                <div className='search-box'>
                    <input onChange={(e) =>(setSearch(e.target.value),filterUSer())} placeholder='Username Or Name' className='search' type="text" />
                    <i class="fa-solid fa-magnifying-glass fa-xl"></i>
                </div>
                <div>

                    <table className='table-class'>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>USERNAME</th>
                            <th>STATUS</th>
                            <th>ACTION</th>

                        </tr>
                        { searchInput =='' ?
                            Users.map((user, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className='admin-usericon'><img src={user.image ? user.image : ''} className='icon-user' alt="" />
                                            <span className='email-name'>
                                                <p>{user.email}</p>
                                            </span>
                                        </td>
                                        <td>{user.firstname}</td>
                                        <td>{user.IsBanned ? 'Bloked' : 'Active'}</td>
                                        <td className='edit-delete-view' >

                                            <i onClick={() => { navigate('/admin/editprofile?id=' + user._id) }} class="fa-sharp fa-solid fa-street-view"></i>
                                            {/* <i onClick={()=>{dispatch(AdminUserEdit(user)),navigate('/admin/edit-user')}} class="fa-solid fa-pen-to-square"></i> */}
                                            <i onClick={() => deleteUser(user._id)} class="fa-sharp fa-solid fa-trash"></i>

                                        </td>

                                    </tr>
                                )
                            })
                            :
                            filterdata.map((user,index)=>{
                                return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className='admin-usericon'><img src={user.image ? user.image : ''} className='icon-user' alt="" />
                                            <span className='email-name'>
                                                <p>{user.email}</p>
                                            </span>
                                        </td>
                                        <td>{user.firstname}</td>
                                        <td>{user.IsBanned ? 'Bloked' : 'Active'}</td>
                                        <td className='edit-delete-view' >

                                            <i onClick={() => { navigate('/admin/editprofile?id=' + user._id) }} class="fa-sharp fa-solid fa-street-view"></i>
                                            {/* <i onClick={()=>{dispatch(AdminUserEdit(user)),navigate('/admin/edit-user')}} class="fa-solid fa-pen-to-square"></i> */}
                                            <i onClick={() => deleteUser(user._id)} class="fa-sharp fa-solid fa-trash"></i>

                                        </td>

                                    </tr> 
                                )
                            })
                        }
                        {/* <tr>
    <td>1</td>
    <td className='admin-usericon'><img className='icon-user' src="" alt="" />
    <span className='email-name'>
        <p>kottayilsafvan@gmail.com</p>
        <span>Name: safvan</span>
    </span>
    </td>
    <td>s.afu._</td>
    <td>9846331556</td>
    <td>Active</td>
    <td className='edit-delete-view' >
        
    <i class="fa-sharp fa-solid fa-street-view"></i>
    <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-sharp fa-solid fa-trash"></i>
       
        </td>
    
  </tr> */}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashbord
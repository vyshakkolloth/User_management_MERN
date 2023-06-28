import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userAxios from '../../Axios/user'
import { useNavigate } from 'react-router-dom'
import { clientLogout } from '../../Redux/client'
import Home from './home'


function home() {
  const navigate = useNavigate(null)
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState('')

  const { Token, Displayname } = useSelector((state) => state.Client)

  useEffect(() => {
    if (Token) {
      userAxios.get('/', {
        headers: {
          Authorization: Token
        }
      }).then((res) => {
        if (!res.data.success) {
          navigate('/login')
        }
        else {
          setUserdata(res.data.userData)
        }
      })
    } else {
      navigate('/login')
    }
  }, [])

  const logout = () => {
    dispatch(clientLogout());
    navigate("/login");
  };

  return (
    <>
    


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand pe-5 ms-3">
            <b>
              <i>UM</i>
            </b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => {
                    navigate('/home');
                  }}
                  aria-current="page"
                >
                  <b>Home</b>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  <b>Profile</b>
                </a>
              </li>
            </ul>
            {userdata.firstname ? (
              <h6
                className="text-white me-4"
                onClick={() => {
                  navigate('/profile');
                }}
              >
                {userdata.firstname}
              </h6>
            ) : null}
            {Displayname ? (
              <h6 className="text-white me-4" onClick={logout}>
                Logout
              </h6>
            ) : (
              <h6 className="text-white me-4" onClick={logout}>
                Login
              </h6>
            )}
          </div>
        </div>
      </nav>
    </>

  )
}


export default home

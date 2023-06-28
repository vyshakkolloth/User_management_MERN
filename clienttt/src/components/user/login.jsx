import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAxios from '../../Axios/user';
import { clientLogin } from '../../Redux/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';

function login() {
  const { Token } = useSelector((state) => state.Client);
  const dispatCh = useDispatch();
  console.log(Token);
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');


  useEffect(()=>{
    if(Token){
      navigate('/home')
    }
  },[])

  const validateEmail = (email) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const loginHandle = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!Email && !password) {
      setErrMsg('Please enter both email and password.');
      return;
    }
    if (Email=='') {
      setErrMsg(
        'Please enter Email'
      );
      return;
    }



    // if (!validateEmail(Email)) {
    //   setErrMsg('Invalid email address.');
    //   return;
    // }

    if (password=='') {
      setErrMsg(
        'Please enter password'
      );
      return;
    }

    userAxios
      .post('/login', { Email, password })
      .then((res) => {
        const userdetails = res.data;
        console.log(userdetails);
        if (userdetails.status) {
          dispatCh(
            clientLogin({
              token: userdetails.user,
              username: userdetails.username,
              _id: userdetails._id,
            })
          );
          navigate('/home');
        } else {
          setErrMsg(res.data.error);
        }
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={loginHandle}
              >
                Login
              </MDBBtn>

              {errMsg && (
                <div style={{ color: 'red' }}>
                  {errMsg === 'email'
                    ? 'Email error'
                    : errMsg === 'password'
                    ? 'Password error'
                    : errMsg}
                </div>
              )}

              <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: 'white' }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: 'white' }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: 'white' }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">
                  Don't have an account?{' '}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/');
                    }}
                    class="text-white-50 fw-bold"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default login;

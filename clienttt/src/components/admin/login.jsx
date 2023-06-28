import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../../Axios/admin';
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
import { adminlogin } from '../../Redux/client';
import { useDispatch} from 'react-redux';


function login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const dispatCh = useDispatch();



  const validateEmail = (email) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

//   const validatePassword = (password) => {
//     // Password strength validation
//     // Add your desired password strength requirements
//     const minLength = 8;    
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     return (
//       password.length >= minLength &&
//       hasUppercase &&
//       hasLowercase &&
//       hasSpecialChar
//     );
//   };

  const loginHandle = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!Email && !password) {
      setErrMsg('Please enter both email and password.');
      return;
    }


    if (password=='') {
      setErrMsg(
        'Please enter password'
      );
      return;
    }

    
    if (Email=='') {
      setErrMsg(
        'Please enter email'
      );
      return;
    }

    adminAxios
      .post('/login', { Email, password })
      .then((res) => {
        const admindetails = res.data;
        console.log(admindetails);
        if (admindetails.status) {
          dispatCh(
            adminlogin({
              admintoken: admindetails.user,
              adminname: admindetails.username,
            })
          );
          navigate('/admin/home');
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

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default login;

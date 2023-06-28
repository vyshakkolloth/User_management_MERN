import React from 'react';
import { useNavigate } from 'react-router-dom';
import userAxios from '../../Axios/user';
import { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster, toast } from 'react-hot-toast';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

function Signup() {
  const navigate = useNavigate();
  const [Firstname, setFirstname] = useState('');
  const [Secondname, setSecondname] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrmsg] = useState('');

  const generaterror = (err) => toast.error(err, { position: 'top-center' });

  const registerUser = (event) => {
    event.preventDefault();

    if (Firstname.trim() === '') {
      generaterror('Please enter your first name');
      return;
    }

    if (Secondname.trim() === '') {
      generaterror('Please enter your last name');
      return;
    }

    if (Email.trim() === '') {
      generaterror('Please enter your email address');
      return;
    }

    if (password.trim() === '') {
      generaterror('Please enter your password');
      return;
    }

    userAxios
      .post('/register', { firstname: Firstname, secondname: Secondname, email: Email, password })
      .then((res) => {
        if (res.data.status) {
          navigate('/login');
        } else {
          setErrmsg('Something Went Wrong');
        }
      });
  };

  return (
    <MDBContainer fluid>
      <Toaster />
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Signup</h2>
              <p className='text-white-50 mb-5'>Please enter your Signup Details!</p>

              <MDBInput
                wrapperClass='mb-4'
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                labelClass='text-white'
                label='First name'
                id='form1'
                type='text'
              />
              <MDBInput
                wrapperClass='mb-4'
                onChange={(e) => {
                  setSecondname(e.target.value);
                }}
                labelClass='text-white'
                label='Last name'
                id='form1'
                type='text'
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                labelClass='text-white'
                label='Email address'
                id='formControlLg'
                type='email'
                size='lg'
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                labelClass='text-white'
                label='Password'
                id='formControlLg'
                type='password'
                size='lg'
              />
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={registerUser}>
                Signup
              </MDBBtn>

              {errMsg ? <div style={{ color: 'red' }}>{errMsg}</div> : ''}

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size='lg' />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size='lg' />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size='lg' />
                </MDBBtn>
              </div>

              <div>
                <p className='mb-0'>
                  Already have an account?{' '}
                  <a style={{ cursor: 'pointer' }} onClick={() => navigate('/login')} className='text-white-50 fw-bold'>
                    Login
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

export default Signup;

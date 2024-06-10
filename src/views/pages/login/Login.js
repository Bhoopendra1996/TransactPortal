import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import imageLogo from "src/assets/images/logo-bankit.png"
const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/login';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setError("");
  }
  const loginData = async () => {
    setLoading(true);
    const username = formData?.username;
    const password = formData?.password;
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }
      if (response.ok) {
        const stringData = JSON.stringify(result?.clientDetails);
        localStorage.setItem("clientDetails", stringData);
        localStorage.setItem("user", result?.username);
        localStorage.setItem("clientId", result?.clientDetails?.clientId);
        localStorage.setItem("token", result?.token);
        localStorage.setItem("firstName", result?.clientDetails?.firstName);
        const stringData2 = JSON.stringify(result?.validationIndex)
        localStorage.setItem("validationIndex", stringData2);
        dispatch({ type: 'set', username: "login" });
        dispatch({ type: 'set', adminBalance: result?.balance });
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  const handleLogin = () => {
    if (formData.username === "") {
      const error = "Please enter username"
      setError(error);
    } else if (formData.password === "") {
      const error = "Please enter password"
      setError(error);
    } else {
      loginData();
    }
  }
  //bg-body-tertiary
  return (
    <div className="bg-primary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type='text'
                        id='username'
                        name='UserName'
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => { handleChange(e) }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        id='password'
                        name='Password'
                        autoComplete="current-password"
                        onChange={(e) => { handleChange(e) }}
                      />
                    </CInputGroup>
                    <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" href='/forget-password'>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '44%' }}>
                <CCardBody
                  className="text-center pt-5 d-flex justify-content-center align-items-center"
                  style={{
                    backgroundImage: `url(${imageLogo})`,
                    backgroundSize: '',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // minHeight: '100vh',
                    color: 'white'
                  }}
                >
                  {/* <div>
                    <h2>BankIT</h2>
                    <p> Welcome To Transaxt Portal</p>
                  </div> */}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

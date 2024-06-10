import React, { useState } from 'react';
import { CButton, CCard, CCol, CContainer, CForm, CFormInput, CRow, CSpinner, CCardGroup, CCardBody, CInputGroup, CInputGroupText } from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'

const Forget = () => {
    const [formData, setFormData] = useState({ username: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = '/forgetpassword';
    const token = localStorage.getItem('token');

    const changePassword = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${endPoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ username: formData.username }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                setSuccess(result.message);
            }

        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch retailer details.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword();
    }
    return (
        <div className="bg-primary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={7}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1 className='text-primary'>Forget Password ?</h1>
                                        <p className="text-body-secondary">Enter your e-mail address below to reset your password.</p>
                                        <CInputGroup className="mb-2" >
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
                                        <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                                        {success && <div className='text-success d-flex justify-content-center p-4'><h5>{success}</h5></div>}
                                        {loading && <div className='d-flex justify-content-center'><CSpinner color="info" /></div>}
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" href='/login' >
                                                    Back
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className='d-flex justify-content-end'>
                                                <CButton color="primary" className="px-4" onClick={handleSubmit}>
                                                    Submit
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Forget;


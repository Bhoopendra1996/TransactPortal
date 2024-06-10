import React, { useState } from 'react';
import { CButton, CCard, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow, CSpinner } from '@coreui/react';

const ChangePassword = () => {
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = '/changepassword';
    const token = localStorage.getItem('token');
    const clientId = localStorage.getItem('clientId');

    const changePassword = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${endPoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ clientId: clientId, password: formData.newPassword, oldpassword: formData.oldPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                setSuccess('Password changed successfully !');
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

    const handleReset = () => {
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New password and confirm password do not match');
            return false;
        }
        setError('');
        changePassword();
    }

    return (
        <>
            <CCard className='d-flex justify-content-center align-items-center p-5'>
                <CCard className='col-8 p-4'>
                    <h4 className='w-100 d-flex justify-content-center p-4'>Change Password</h4>
                    <CForm onSubmit={handleSubmit}>
                        <CRow className='gap-2'>
                            <CCol xs={12} md={5}>
                                <CFormLabel htmlFor="oldPassword">Old Password</CFormLabel>
                            </CCol>
                            <CCol xs={12} md={5}>
                                <CFormInput
                                    size='sm'
                                    type="password"
                                    id="oldPassword"
                                    onChange={handleChange}
                                    value={formData.oldPassword}
                                    name='OldPassword'
                                    required
                                />
                            </CCol>
                            <CCol xs={12} md={5}>
                                <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
                            </CCol>
                            <CCol xs={12} md={5}>
                                <CFormInput
                                    size='sm'
                                    type="password"
                                    id="newPassword"
                                    onChange={handleChange}
                                    value={formData.newPassword}
                                    name='NewPassword'
                                    required
                                />
                            </CCol>
                            <CCol xs={12} md={5}>
                                <CFormLabel htmlFor="confirmPassword">Confirm New Password</CFormLabel>
                            </CCol>
                            <CCol xs={12} md={5}>
                                <CFormInput
                                    size='sm'
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    name='ConfirmPassword'
                                    required
                                />
                            </CCol>
                            <CRow>
                                <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                                {success && <div className='text-success d-flex justify-content-center'><p>{success}</p></div>}
                                {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
                            </CRow>
                            <CCol className='d-flex justify-content-center'>
                                <CButton type='submit' color='primary' size='sm'>Submit</CButton>
                                <CButton className='mx-2' type='button' color='secondary' size='sm'
                                    onClick={handleReset}
                                >
                                    Reset
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCard>
            </CCard>
        </>
    );
};

export default ChangePassword;

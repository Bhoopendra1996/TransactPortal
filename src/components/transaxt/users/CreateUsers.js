import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CFormInput, CFormLabel, CRow, CSpinner } from '@coreui/react';
import { Button, Table } from 'antd';
const CreateUsers = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        compName: '',
        panNo: '',
        officeAddress: '',
        officeState: '',
        officeDistrict: '',
        officeCountry: '',
        pinCode: '',
        email: '',
        mobile: '',
    });

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = '/createSubUser';
    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");

    const createUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${endPoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    clientId: clientId,
                    companyName: formData.compName,
                    regMobile: formData.mobile,
                    address: formData.officeAddress,
                    pincode: formData.pinCode,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    emailId: formData.email,
                    panNo: formData.panNo,
                    district: formData.officeDistrict,
                    state: formData.officeState,
                    dob: formData.dob,
                    country: formData.officeCountry
                })
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message);
                throw new Error('Network response was not ok');
            }

            if (result.status === "0") {
                setSuccess("Submitted successfully !");
            }

        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        let newValue = value;

        if (id === 'firstName' || id === 'lastName') {
            // Allow only alphabets and space
            newValue = newValue.replace(/[^A-Za-z ]/ig, '');
        } else if (id === 'mobile') {
            // Allow only numbers
            newValue = newValue.replace(/[^0-9]/g, '');
        } else if (id === 'email') {
            // Allow for emails only
            newValue = newValue.replace(/[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/g, '');
        }

        setFormData({ ...formData, [id]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser();
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            dob: '',
            compName: '',
            panNo: '',
            officeAddress: '',
            officeState: '',
            officeDistrict: '',
            officeCountry: '',
            pinCode: '',
            email: '',
            password: '',
            mobile: '',
            username: ''
        });
    };

    return (
        <CContainer >
            <CCard className='py-2'>
                <CCardBody>
                    <div className='d-flex justify-content-center align-items-center col-12'>
                        <CCard className='col-10 p-4'>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="firstName" className="col-sm-7 col-form-label">First Name</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="firstName"
                                        name='First Name'
                                        placeholder='Enter first name'
                                        maxLength={50}
                                        value={formData.firstName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="mobileNo" className="col-sm-7 col-form-label">Last Name</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="lastName"
                                        name='Last Name'
                                        placeholder='Enter last name'
                                        maxLength={50}
                                        value={formData.lastName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="dob" className="col-sm-7 col-form-label">DOB Date</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="dob"
                                        name='DOB Date'
                                        placeholder='yyyy-mm-dd'
                                        value={formData.dob}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="accountNo" className="col-sm-7 col-form-label">Compny Name</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="compName"
                                        name='Company Name'
                                        placeholder='Enter company name'
                                        maxLength={50}
                                        value={formData.compName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="panNo" className="col-sm-7 col-form-label">Pan No</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="panNo"
                                        name='Pan no'
                                        placeholder='Enter pan no '
                                        maxLength={15}
                                        value={formData.panNo}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="officeAddress" className="col-sm-7 col-form-label">Office Address</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="officeAddress"
                                        name='Office Addres'
                                        placeholder='Enter office address'
                                        maxLength={50}
                                        value={formData.officeAddress}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="officeState" className="col-sm-7 col-form-label">Office State</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="officeState"
                                        name='Office State'
                                        placeholder='Enter state'
                                        value={formData.officeState}
                                        maxLength={25}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="officeAddress" className="col-sm-7 col-form-label">Office District </CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="officeDistrict"
                                        name='Office District'
                                        placeholder='Enter district'
                                        value={formData.officeDistrict}
                                        maxLength={50}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="officeCountry" className="col-sm-7 col-form-label">Office Country</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="officeCountry"
                                        name='Office Addres'
                                        placeholder='Enter country'
                                        maxLength={15}
                                        value={formData.officeCountry}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="pinCode" className="col-sm-7 col-form-label">Office Pin Code</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="pinCode"
                                        name='Office Pin Code'
                                        placeholder='Enter pin code '
                                        maxLength={16}
                                        value={formData.pinCode}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="email" className="col-sm-7 col-form-label">Office Email</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="email"
                                        name='Office email'
                                        placeholder='Enter email id'
                                        maxLength={50}
                                        value={formData.email}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="align-items-start">
                                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                                    <CFormLabel htmlFor="mobile" className="col-sm-7 col-form-label">Mobile No</CFormLabel>
                                </CCol>
                                <CCol xs={12} md={8}>
                                    <CFormInput
                                        size='sm'
                                        type="text"
                                        id="mobile"
                                        name='Mobile'
                                        placeholder='Enter Mobile No'
                                        maxLength={12}
                                        value={formData.mobile}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                                {success && <div className='text-success d-flex justify-content-center'><p>{success}</p></div>}
                                {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
                            </CRow>
                            <CRow>
                                <CCol style={{ textAlign: 'center' }}>
                                    <CButton size='sm' color="primary mx-2" onClick={handleSubmit}>Submit</CButton>
                                    <CButton size='sm' color="primary mx-2" onClick={handleReset}>Reset</CButton>
                                </CCol>
                            </CRow>
                        </CCard>
                    </div>
                </CCardBody>
            </CCard>
        </CContainer>
    );
}

export default CreateUsers;

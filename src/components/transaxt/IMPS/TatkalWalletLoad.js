import React, { useEffect, useState } from 'react'
import { CCard, CForm, CRow, CCol, CButton, CFormLabel, CFormInput, CFormCheck, CFormTextarea, CSpinner } from '@coreui/react'

function TatkalWalletLoad() {
    const initialFormData = {
        requestForAmount: '',
        depositorName: '',
        remarks: '',
        agencyName: '',
        currentAmountBalance: '',
        emailId: '',
        mobileNo: '',
        mode: "NB"
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = '/tatak-wallet-load-info';
    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");
    const stringClientDetails = localStorage.getItem("clientDetails");
    const clientDetails = JSON.parse(stringClientDetails);
    const agencyName = clientDetails?.companyName;
    const balance = localStorage.getItem("balance");
    const mobileNo = clientDetails?.regMobile;
    const emailId = clientDetails?.username;
    useEffect(() => {
        setFormData({
            ...initialFormData,
            agencyName: agencyName || '',
            currentAmountBalance: balance || '',
            emailId: emailId || '',
            mobileNo: mobileNo || '',
            depositorName: agencyName || ''
        });
    }, []);
    const TatkalLoadWalletData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${endPoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}` // Corrected header
                },
                body: JSON.stringify({
                    apiId: clientId,
                    userId: `API${clientId}`,
                    amount: formData?.requestForAmount,
                    contact: formData?.mobileNo,
                    name: formData?.depositorName,
                    email: formData?.emailId,
                    mode: formData?.mode,
                })
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                setSuccess('Submitted successfully !')
                setFormData({
                    requestForAmount: '',
                    depositorName: '',
                    remarks: ''
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    }
    const handleChangeNumber = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.replace(/[^0-9]/g, '') });
    }
    const handleReset = (e) => {
        setFormData({
            requestForAmount: '',
            remarks: ''
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        TatkalLoadWalletData();
    }
    return (
        <div>
            <CForm onSubmit={handleSubmit}>
                <CRow className="mb-3 align-items-center g-2">
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="agencyName">Agency Name <span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormInput
                            size='sm'
                            type="text"
                            id="agencyName"
                            name='AgencyName'
                            value={formData?.agencyName}
                            disabled
                        />
                    </CCol>
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="currentAmountBalance">Current Amount Balance  <span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormInput
                            size='sm'
                            type="number"
                            id="currentAmountBalance"
                            name='CurrentAmountBalance'
                            maxLength={15}
                            value={formData.currentAmountBalance}
                            disabled
                        />
                    </CCol>
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="requestForAmount">Request for Amount  <span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormInput
                            size='sm'
                            type="text"
                            id="requestForAmount"
                            name='RequestForAmount'
                            placeholder='Enter amount '
                            value={formData.requestForAmount}
                            maxLength={15}
                            required
                            onChange={handleChangeNumber}
                        />
                    </CCol>
                    <CRow className='d-flex justify-content-center'>
                        <CCol xs={12} md={4}>
                            <CFormCheck
                                type="radio"
                                name="NetBanking"
                                id="netBanking"
                                label="NetBanking"
                                value={formData.mode}
                                defaultChecked
                            />
                        </CCol>
                    </CRow>
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="emailId">Email Id <span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormInput
                            size='sm'
                            type="email"
                            id="emailId"
                            name='EmailId'
                            value={formData.emailId}
                            disabled
                        />
                    </CCol>
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="mobileNo">Mobile No.<span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormInput
                            type="number"
                            id="mobileNo"
                            name='MobileNo'
                            size='sm'
                            value={formData.mobileNo}
                            disabled
                        />
                    </CCol>
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="depositorName">Depositor Name<span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormInput
                            size='sm'
                            type="text"
                            id="depositorName"
                            name='DepositorName'
                            placeholder='Enter depositor name'
                            value={formData.depositorName}
                            required
                            onChange={handleChange}
                        />
                    </CCol>
                    <CCol xs={12} md={4}>
                        <CFormLabel htmlFor="remarks">Remarks<span className='text-danger'>*</span></CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                        <CFormTextarea
                            size="sm"
                            type="text"
                            id="remarks"
                            name='Remarks'
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Leave a comment here"
                        ></CFormTextarea>
                    </CCol>
                </CRow>
                <CRow>
                    <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                    {success && <div className='text-success d-flex justify-content-center'><p>{success}</p></div>}
                    {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
                </CRow>
                <CRow>
                    <div className="d-grid gap-2 d-md-flex justify-content-center">
                        <CButton type="submit" color="primary" size='sm'>Submit</CButton>
                        <CButton color="primary" size='sm' onClick={handleReset}>Reset</CButton>
                    </div>
                </CRow>
                { }
            </CForm>
        </div>
    )
}

export default TatkalWalletLoad

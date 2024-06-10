import React, { useState } from 'react'
import {
  CContainer, CCard, CForm, CRow, CCol, CFormLabel, CFormSelect,
  CFormInput, CButton, CFormCheck, CFormTextarea, CSpinner
} from '@coreui/react';
import banks from './BankNames';
import TatkalWalletLoad from './TatkalWalletLoad';



function LoadWallet() {
  const [selectedOption, setSelectedOption] = useState('loadWallet');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    requestAmount: "",
    depositDate: "",
    walletBalance: "",
    paymentMode: "",
    senderName: "",
    senderAccountNo: "",
    sendViaBankName: "",
    date: "",
    transactionNumber: "",
    sentToBankName: "",
    beneficiaryName: "",
    remarks: "",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/loadwallet';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  console.log("clientID:", clientId);

  const loadWalletData = async () => {
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
          bankName: formData?.sendViaBankName,
          transactionId: formData?.transactionNumber,
          depositDate: formData?.depositDate,
          depositorAccountNo: formData?.senderAccountNo,
          depositorBankName: formData?.sentToBankName,
          depositorName: formData?.senderName,
          modeOfPayment: formData?.paymentMode,
          remarks: formData?.remarks,
          acceptedAmount: formData?.requestAmount,
          beneficiaryName: formData?.beneficiaryName
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
          requestAmount: "",
          depositDate: "",
          walletBalance: "",
          paymentMode: "",
          senderName: "",
          senderAccountNo: "",
          sendViaBankName: "",
          date: "",
          transactionNumber: "",
          sentToBankName: "",
          beneficiaryName: "",
          remarks: "",
        })
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
  };

  const handleChangeNumber = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.replace(/[^0-9]/g, '') })
    setError('');
  }

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadWalletData();
  };

  const handleReset = () => {
    setFormData({
      requestAmount: "",
      depositDate: "",
      walletBalance: "",
      paymentMode: "",
      senderName: "",
      senderAccountNo: "",
      sendViaBankName: "",
      date: "",
      transactionNumber: "",
      sentToBankName: "",
      beneficiaryName: "",
      remarks: "",
    });
  };

  return (
    <CContainer className='d-flex justify-content-center'>
      <CCard className='p-4 col-12 '>
        <div className="d-grid gap-2 d-md-flex justify-content-center mb-4">
          <CFormCheck
            type="radio"
            name="walletOption"
            id="loadWallet"
            label="Load wallet"
            value="loadWallet"
            checked={selectedOption === 'loadWallet'}
            onChange={handleRadioChange}
          />
          <CFormCheck
            type="radio"
            name="walletOption"
            id="tatkalWalletLoad"
            label="Tatkal Wallet Load"
            value="tatkalWalletLoad"
            checked={selectedOption === 'tatkalWalletLoad'}
            onChange={handleRadioChange}
          />
        </div>
        {
          selectedOption === 'loadWallet' ?
            (<CForm onSubmit={handleSubmit}>
              <CRow className="mb-3 align-items-center g-2">
                <CCol xs={12} md={4}>
                  <CFormLabel htmlFor="requestAmount" className="ps-md-5">Request Amount <span className='text-danger'>*</span></CFormLabel>
                </CCol>
                <CCol xs={12} md={8}>
                  <CFormInput
                    size='sm'
                    type="text"
                    id="requestAmount"
                    name='RequestAmount'
                    placeholder='Enter request amount'
                    maxLength={15}
                    value={formData.requestAmount}
                    onChange={handleChangeNumber}
                    required
                  />
                </CCol>
                <CCol xs={12} md={4}>
                  <CFormLabel htmlFor="depositDate" className="ps-md-5">Deposit Date <span className='text-danger'>*</span></CFormLabel>
                </CCol>
                <CCol xs={12} md={8}>
                  <CFormInput
                    size='sm'
                    type="date"
                    id="depositDate"
                    name='DepositeDate'
                    value={formData.depositDate}
                    onChange={handleChange}
                    required
                  />
                </CCol>
                <CCol xs={12} md={4}>
                  <CFormLabel htmlFor="walletBalance" className="ps-md-5">Wallet Balance In <span className='text-danger'>*</span></CFormLabel>
                </CCol>
                <CCol xs={12} md={8}>
                  <CFormSelect
                    size='sm'
                    type='select'
                    id='walletBalance'
                    name='WalletBalance'
                    value={formData.walletBalance}
                    onChange={handleChange}
                    required
                    aria-label="walletBalence"
                    options={[
                      { label: '--select--', value: '' },
                      { label: 'AES Wallet', value: 'AES Wallet' },

                    ]}
                  />
                </CCol>
                <CCol xs={12} md={4}>
                  <CFormLabel htmlFor="paymentMode" className="ps-md-5">Payment Mode <span className='text-danger'>*</span></CFormLabel>
                </CCol>
                <CCol xs={12} md={8}>
                  <CFormSelect
                    size='sm'
                    type='select'
                    id='paymentMode'
                    name='PaymentMode'
                    value={formData.paymentMode}
                    onChange={handleChange}
                    required

                    aria-label="NEFT/RTGS/IMPS"
                    options={[
                      { label: '--select--', value: '' },
                      { label: 'NEFT/RTGS/IMPS', value: 'NEFT/RTGS/IMPS' },

                    ]}
                  />
                </CCol>
              </CRow>
              {
                formData.paymentMode === "NEFT/RTGS/IMPS" ?
                  (<CRow className="mb-3 align-items-center g-2">
                    <h5 >NEFT/RTGS/FT/IMPS </h5>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="senderName" className="ps-md-5">Sender Name*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormInput
                        size='sm'
                        type="text"
                        id="senderName"
                        name='SenderName'
                        placeholder="Enter sender name"
                        value={formData.senderName}
                        onChange={handleChange}
                        required

                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="senderAccountNo" className="ps-md-5">Sender A/C No*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormInput
                        size='sm'
                        type="text"
                        id="senderAccountNo"
                        name='SenderAccount'
                        placeholder="Enter sender account number"
                        value={formData.senderAccountNo}
                        maxLength={20}
                        onChange={handleChangeNumber}
                        required

                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="sendViaBankName" className="ps-md-5">Sent via Bank Name*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormSelect
                        size='sm'
                        type='select'
                        id='sendViaBankName'
                        name='SendViaBankName'
                        value={formData.sendViaBankName}
                        onChange={handleChange}
                        required
                        aria-label="Default select example"
                        options={banks}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="date" className="ps-md-5">Date*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormInput
                        size='sm'
                        type="date"
                        id="date"
                        name='Date'
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="transactionNumber" className="ps-md-5">Transaction Number*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormInput
                        size='sm'
                        type="text"
                        id="transactionNumber"
                        name='TransactionNumber'
                        value={formData.transactionNumber}
                        placeholder="Enter transaction number"
                        maxLength={20}
                        onChange={handleChangeNumber}
                        required
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="sentToBankName" className="ps-md-5">Sent to Bank Name* </CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormSelect
                        size='sm'
                        type='select'
                        id='sentToBankName'
                        name='SentToBankName'
                        value={formData.sentToBankName}
                        onChange={handleChange}
                        required

                        aria-label="Default select example"
                        options={[
                          { label: 'Select Bank', value: '' },
                          { label: 'AXIS Bank', value: 'AXIS Bank' },
                          { label: 'ICICI Bank', value: 'ICICI Bank' },
                          { label: 'State Bank Of India', value: 'State Bank Of India' },
                          { label: 'Karur Vysya Bank', value: 'Karur Vysya Bank' },
                          { label: 'RBL Bank', value: 'RBL Bank' },
                        ]}
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="beneficiaryName" className="ps-md-5">Beneficiary Name*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormInput
                        size='sm'
                        type="text"
                        id="beneficiaryName"
                        name='BeneficiaryName'
                        placeholder="Enter Beneficiary name"
                        value={formData.beneficiaryName}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol xs={12} md={4}>
                      <CFormLabel htmlFor="remarks" className="ps-md-5">Remarks*</CFormLabel>
                    </CCol>
                    <CCol xs={12} md={8}>
                      <CFormInput
                        size='sm'
                        type="text"
                        id="remarks"
                        name='Remarks'
                        placeholder="Enter remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CRow>) : ("")
              }
              <CRow>
                <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                {success &&  <div className='text-success d-flex justify-content-center'><p>{success}</p></div>}
                {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
              </CRow>
              <CRow>
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <CButton type="submit" color="primary" size='sm'>Submit</CButton>
                  <CButton color="primary" size='sm' onClick={handleReset}>Reset</CButton>
                </div>
              </CRow>
            </CForm>) : ( // this is the tatkal wallet load form
              <TatkalWalletLoad />
            )
        }
      </CCard>
    </CContainer>
  )
}

export default LoadWallet

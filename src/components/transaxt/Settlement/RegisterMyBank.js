import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CSpinner
} from '@coreui/react';

const RegisterMyBank = () => {
  const clientId = localStorage.getItem("clientId");
  const [formData, setFormData] = useState({
    mobileNo: '',
    accountNo: '',
    confirmBankAccount: '',
    bankName: '',
    ifsc: '',
    firstName: '',
    apiId: clientId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [banksListData, setBanksListData] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/registerbank';
  const endPoint1 = '/banklist';
  const token = localStorage.getItem("token");

  const banksList = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${baseUrl}${endPoint1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          apiId: clientId,
        })
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.status === "0") {
        setBanksListData(result.bankList);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerMyBank = async () => {
    setLoading(true);
    setError(false);
    const uploadData = new FormData();
    uploadData.append('fileUpload', file);
    uploadData.append('transactionModel', JSON.stringify(formData));

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`
        },
        body: uploadData,
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.status === "0") {
        setError("Submitted successfully!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    banksList();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
  };

  const handleChangeNumber = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.replace(/[^0-9]/g, '') });
    setError('');
  };

  const handleChangeCaps = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toUpperCase() });
    setError('');
  };

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.replace(/[^a-zA-Z ]/g, '') });
    setError('');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.accountNo !== formData.confirmBankAccount) {
      setError("Account and Confirm Account numbers do not match !");
      return;
    }
    registerMyBank();
  };
  return (
    <div className="d-flex justify-content-center">
      <CCard className="w-75" style={{ boxShadow: '4px 5px 6px rgba(0, 0, 0, 0.1)' }}>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="mobileNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                Contact No <span className="text-danger">*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size='sm'
                  type="text"
                  id='mobileNo'
                  name='ContactNumber'
                  value={formData.mobileNo}
                  onChange={handleChangeNumber}
                  maxLength={10}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="accountNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                Bank A/C No <span className="text-danger">*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size='sm'
                  maxLength={20}
                  type="password"
                  id="accountNo"
                  name="BankAccountNo"
                  value={formData.accountNo}
                  onChange={handleChangeNumber}
                  autoComplete="new-password"
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="confirmBankAccount" className="col-sm-5" style={{ textAlign: 'end' }}>
                Confirm Bank A/C No  <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size='sm'
                  maxLength={20}
                  type="text"
                  id='confirmBankAccount'
                  name='ConfirmBankAccount'
                  value={formData.confirmBankAccount}
                  onChange={handleChangeNumber}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="bankName" className="col-sm-5" style={{ textAlign: 'end' }}>
                Bank Name  <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol>
                <CFormSelect
                  name='BankName'
                  id='bankName'
                  size='sm'
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  aria-label="Bank name select"
                >
                  {banksListData.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>

              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="ifsc" className="col-sm-5" style={{ textAlign: 'end' }}>
                IFSC Code  <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  maxLength={11}
                  size='sm'
                  type="text"
                  id='ifsc'
                  name='IFSCCode'
                  value={formData.ifsc}
                  onChange={handleChangeCaps}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="firstName" className="col-sm-5" style={{ textAlign: 'end' }}>
                A/C Holder Name  <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size='sm'
                  type="text"
                  id='firstName'
                  name='AccountHolderName'
                  value={formData.firstName}
                  onChange={handleChangeText}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="chequeCopy" className="col-sm-5" style={{ textAlign: 'end' }}>
                Cheque Copy <span className="text-danger">*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size='sm'
                  type="file"
                  id="chequeCopy"
                  name="ChequeCopy"
                  onChange={handleFileChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
              {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="submit" className="col-sm-5"></CFormLabel>
              <CCol sm={5}>
                <CButton size='sm' type="submit" color="primary">
                  Registration
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default RegisterMyBank;

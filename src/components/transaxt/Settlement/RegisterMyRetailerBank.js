import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CFormSelect,
  CButton,
  CSpinner
} from '@coreui/react';
import Bulk from './Bulk';

const initialFormData = {
  registrationType: 'single',
  retailerId: '',
  retailerName: '',
  contactNo: '',
  bankAccountNo: '',
  confirmBankAccountNo: '',
  bankName: '',
  ifscCode: '',
  accountHolderName: '',
  chequeCopy: null,
};

const RegisterMyRetailerBank = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [banksListData, setBanksListData] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/singleagentregister';
  const endPoint1 = '/banklist';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const banksList = async () => {
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
    }
  };

  const RetailerBank = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          apiId: clientId,
          mobileNo: formData?.contactNo,
          accountNo: formData?.bankAccountNo,
          confirmAccountNo: formData?.confirmBankAccountNo,
          ifsc: formData?.ifscCode,
          bankName: formData?.bankName,
          agentId: formData?.retailerId,
          agentName: formData?.retailerName,
          holderName: formData.accountHolderName,
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }

      if (result.status === "0") {
        console.log(result.bankDetails);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.bankAccountNo !== formData.confirmBankAccountNo) {
      setErrors({
        confirmBankAccountNo: 'Confirm account number does not match !'
      });
      return;
    }
    RetailerBank();
  };

  const handleChange = (e) => {
    const { id, name, value, files } = e.target;
    setFormData({ ...formData, [id]: files ? files[0] : value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleChangeAlphabet = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.replace(/[^a-zA-Z]/g, '') });
  };

  const handleChangeNumber = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.replace(/[^0-9]/g, '') });
  };

  const handleChangeCaps = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.toUpperCase() });
  };

  useEffect(() => {
    banksList();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <CCard className="w-75" style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <CCardBody>
          {formData.registrationType === 'single' ? (
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="registrationType" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Registration Type <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormSelect
                    size="sm"
                    required
                    id="registrationType"
                    name="registrationType"
                    value={formData.registrationType}
                    onChange={handleChange}
                    className="mb-1"
                    aria-label="Registration Type"
                  >
                    <option value="" label="Select registration type" />
                    <option value="single" label="Single" />
                    <option value="bulk" label="Bulk" />
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="retailerId" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Retailer ID <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="text"
                    id="retailerId"
                    name="retailerId"
                    value={formData.retailerId}
                    onChange={handleChange}
                    maxLength={15}
                    required
                  />
                  {errors.retailerId && <div className="text-danger">{errors.retailerId}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="retailerName" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Retailer Name <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="text"
                    id="retailerName"
                    name="retailerName"
                    value={formData.retailerName}
                    onChange={handleChangeAlphabet}
                    required
                  />
                  {errors.retailerName && <div className="text-danger">{errors.retailerName}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="contactNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Contact No <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="text"
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChangeNumber}
                    maxLength={10}
                    required
                  />
                  {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="bankAccountNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Bank A/C No <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="password"
                    id="bankAccountNo"
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleChangeNumber}
                    autoComplete="new-password"
                    maxLength={20}
                    required
                  />
                  {errors.bankAccountNo && <div className="text-danger">{errors.bankAccountNo}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="confirmBankAccountNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Confirm Bank A/C No <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="password"
                    id="confirmBankAccountNo"
                    name="confirmBankAccountNo"
                    value={formData.confirmBankAccountNo}
                    onChange={handleChangeNumber}
                    maxLength={20}
                    required
                  />
                  {errors.confirmBankAccountNo && <div className="text-danger">{errors.confirmBankAccountNo}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="bankName" className="col-sm-5" style={{ textAlign: 'end' }}>
                  Bank Name <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormSelect
                    size="sm"
                    required
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="mb-3"
                    aria-label="Bank Name"
                  >
                    {banksListData.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </CFormSelect>
                  {errors.bankName && <div className="text-danger">{errors.bankName}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="ifscCode" className="col-sm-5" style={{ textAlign: 'end' }}>
                  IFSC Code <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="text"
                    maxLength={11}
                    id="ifscCode"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChangeCaps}
                    required
                  />
                  {errors.ifscCode && <div className="text-danger">{errors.ifscCode}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="accountHolderName" className="col-sm-5" style={{ textAlign: 'end' }}>
                  A/C Holder Name <span className="text-danger">*</span>
                </CFormLabel>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleChangeCaps}
                    required
                  />
                  {errors.accountHolderName && <div className="text-danger">{errors.accountHolderName}</div>}
                </CCol>
              </CRow>
              <CRow>
                <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
              </CRow>
              <CRow className="mb-3">
                <CCol sm={{ offset: 5, size: 5 }}>
                  <CButton size='sm' type="submit" color="primary">
                    Registration
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          ) : (
            <Bulk />
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default RegisterMyRetailerBank;

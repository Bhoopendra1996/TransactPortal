import React, { useState, useEffect } from 'react';
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
  CSpinner,
} from '@coreui/react';

const MySettlement = () => {
  const [formData, setFormData] = useState({
    settlementType: '',
    availableBalance: '',
    bankAccountNo: '',
    contactNo: '',
    bankName: '',
    ifscCode: '',
    accountHolderName: '',
    bankitFee: '',
    amount: '',
    transferMode: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/transfertobank';
  const endPoint1 = '/settlement';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const mysettlement = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          apiId: clientId,
          bankName: formData?.bankName,
          ifsc: formData?.ifscCode,
          amount: formData?.amount,
          firstName: formData?.accountHolderName,
          settlementType: formData?.settlementType,
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const bankAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endPoint1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          apiId: clientId,
        })
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }
      if (result.status === "0") {
        setList(result?.bankDetails);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bankAccounts();
  }, []);


  const validateForm = () => {
    const newErrors = {};
    if (!formData.bankName) {
      newErrors.bankName = 'Bank Name is required';
    }
    if (!formData.availableBalance) {
      newErrors.availableBalance = 'Available Balance is required';
    }
    if (!formData.contactNo) {
      newErrors.contactNo = 'Contact No is required';
    }
    if (!formData.bankAccountNo) {
      newErrors.bankAccountNo = 'Bank A/C No is required';
    }
    if (!formData.ifscCode) {
      newErrors.ifscCode = 'IFSC Code is required';
    }
    if (!formData.accountHolderName) {
      newErrors.accountHolderName = 'A/C Holder Name is required';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    }
    if (!formData.transferMode) {
      newErrors.transferMode = 'Transfer Mode is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleChangeNumber = (e) => {
    const { id, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    setFormData((prevState) => {
      let newBankitFee;

      if (prevState.settlementType === '') {
        setError('Please Select Settlement Type');
        newBankitFee = '0.00';
      } else if (prevState.settlementType === 'MicroATM') {
        newBankitFee = '10.00';
      } else if (prevState.settlementType === 'AEPS') {
        newBankitFee = '5.00';
      } else if (prevState.settlementType === 'POS') {
        const inputAmount = parseInt(sanitizedValue, 10);
        if (isNaN(inputAmount)) {
          newBankitFee = '0.00';
        } else {
          newBankitFee = ((inputAmount * 1) / 100).toFixed(2);
        }
      } else {
        newBankitFee = '0.00';
      }

      return {
        ...prevState,
        [id]: sanitizedValue,
        bankitFee: newBankitFee
      };
    });
  };
  const handleBankAccount = (e) => {
    const jsonData = e.target.value;
    const data = JSON.parse(jsonData);
    setFormData({
      availableBalance: "0.00",
      contactNo: data?.mobileNo,
      bankName: data?.bankName,
      ifscCode: data?.ifsc,
      accountHolderName: data?.holderName,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    mysettlement();
  };

  return (
    <div className="d-flex justify-content-center">
      <CCard className="w-75" style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="settlementType" className="col-sm-5" style={{ textAlign: 'end' }}>
                Settlement Type   <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormSelect
                  size='sm'
                  id="settlementType"
                  name='SettlementType'
                  value={formData.settlementType}
                  onChange={handleChange}
                  aria-label="Settlement select example"
                  options={[
                    { label: '--select--', value: '' },
                    { label: 'POS', value: 'POS' },
                    { label: 'MicroATM', value: 'MicroATM' },
                    { label: 'AEPS', value: 'AEPS' },
                  ]}
                />
                {errors.bankName && <div className="text-danger">{errors.bankName}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="availableBalance" className="col-sm-5" style={{ textAlign: 'end' }}>
                Available Balance <span className="text-danger">*</span>
              </CFormLabel>
              <CCol >
                <CFormInput
                  size='sm'
                  type="text"
                  id="availableBalance"
                  name='AvailableBalance'
                  value={formData.availableBalance}
                  // onChange={handleChange}
                  className='avlbal'
                  disabled
                />
                {errors.availableBalance && <div className="text-danger">{errors.availableBalance}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="bankAccountNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                Bank A/C No <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormSelect
                  size='sm'
                  type='select'
                  id='bankAccountNo'
                  name="BankAccountName"
                  value={formData.bankAccountNo}
                  aria-label="walletBalence"
                  onChange={handleBankAccount}
                  required
                >
                  {list.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>
                      {`${item.accountNo} - ${item.bankName}`}
                    </option>
                  ))}
                </CFormSelect>
                {errors.bankAccountNo && <div className="text-danger">{errors.bankAccountNo}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="contactNo" className="col-sm-5" style={{ textAlign: 'end' }}>
                Contact No <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size='sm'
                  className='avlbal'
                  type="text"
                  id="contactNo"
                  name='ContactNo'
                  value={formData.contactNo}
                  // onChange={""}
                  disabled
                />
                {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="bankName" className="col-sm-5" style={{ textAlign: 'end' }}>
                Bank Name <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormInput
                  size='sm'
                  className='avlbal'
                  type="text"
                  id="bankName"
                  name="BankName"
                  value={formData.bankName}
                  // onChange={""}
                  disabled
                />
                {errors.bankName && <div className="text-danger">{errors.bankName}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="ifscCode" className="col-sm-5" style={{ textAlign: 'end' }}>
                IFSC Code <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormInput
                  size='sm'
                  className='avlbal'
                  type="text"
                  id="ifscCode"
                  name='IFSCCode'
                  value={formData.ifscCode}
                  // onChange={""}
                  disabled
                />
                {errors.ifscCode && <div className="text-danger">{errors.ifscCode}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="accountHolderName" className="col-sm-5" style={{ textAlign: 'end' }}>
                A/C Holder Name <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormInput
                  className='avlbal'
                  size="sm"
                  type="text"
                  id="accountHolderName"
                  name='accountHolderName'
                  value={formData.accountHolderName}
                  // onChange={""}
                  disabled
                />
                {errors.accountHolderName && <div className="text-danger">{errors.accountHolderName}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="bankitFee" className="col-sm-5" style={{ textAlign: 'end' }}>
                Bankit Fee <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormInput
                  className='avlbal'
                  size='sm'
                  type='text'
                  id="bankitFee"
                  value={formData.bankitFee}
                  name='AccountHolderName'
                  // onChange={""}
                  disabled
                />
                {errors.accountHolderName && <div className="text-danger">{errors.accountHolderName}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="amount" className="col-sm-5" style={{ textAlign: 'end' }}>
                Amount <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol >
                <CFormInput
                  size='sm'
                  type="text"
                  id='amount'
                  maxLength={7}
                  value={formData.amount}
                  name='Amount'
                  onChange={handleChangeNumber}
                  required
                />
                {errors.amount && <div className="text-danger">{errors.amount}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="transferMode" className="col-sm-5" style={{ textAlign: 'end' }}>
                Transfer Mode   <span className='text-danger'>*</span>
              </CFormLabel>
              <CCol>
                <CFormSelect
                  size='sm'
                  type='select'
                  id="transferMode"
                  className="mb-3"
                  aria-label="select transfer mode"
                  value={formData.transferMode}
                  onChange={handleChange}
                  required
                  options={[
                    { label: '--select--', value: '' },
                    { label: 'INSTANT', value: 'instant' },
                    { label: 'MANUAL', value: 'manual' },
                  ]}
                />
                {errors.transferMode && <div className="text-danger">{errors.transferMode}</div>}
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
        </CCardBody>
      </CCard>
    </div>
  );
};

export default MySettlement;

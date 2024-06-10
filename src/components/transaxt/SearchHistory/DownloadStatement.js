import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CContainer,
  CSpinner
} from '@coreui/react';

const DownloadStatement = () => {
  const [formData, setFormData] = useState({ fromDate: '', toDate: '' });
  const [transactions, setTransactions] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/downloadstatement';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const statement = async () => {
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
          fromDate: formData?.fromDate,
          toDate: formData?.toDate
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }

      if (result.status === "0") {
        const tableData = result.transactionList;
        var wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(tableData);
        XLSX.utils.book_append_sheet(wb, ws, 'Statement');
        XLSX.writeFile(wb, 'Statement.xlsx');
        setSuccess("Download successfull!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setError('');
    setSuccess('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.fromDate || !formData.toDate) {
      setError('Please select both from and to dates.');
      return;
    }
    if (formData.fromDate > formData.toDate) {
      setError('From date cannot be after To date.');
      return;
    }
    statement();

  };

  const handleReset = () => {
    setFormData({ fromDate: '', toDate: '' });
    setShowTable(false);
    setTransactions([]);
    setError('');
    setSuccess('');
  };

  return (
    <CContainer>
      <CCard className='py-2'>
        <CCardBody>
          <div className='d-flex justify-content-center align-items-center col-12'>
            <CCard className='col-8 p-4'>
              <CForm onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="fromDate" className="col-sm-5">
                    From Date
                  </CFormLabel>
                  <CCol sm={7}>
                    <CFormInput
                      size='sm'
                      type="date"
                      id="fromDate"
                      name='FormDate'
                      value={formData.fromDate}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="toDate" className="col-sm-5">
                    To Date
                  </CFormLabel>
                  <CCol sm={7}>
                    <CFormInput
                      size='sm'
                      type="date"
                      id="toDate"
                      name='ToDate'
                      value={formData.toDate}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                  {success && <div className='text-success d-flex justify-content-center'><p>{success}</p></div>}
                  {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}

                </CRow>
                <CRow className="mb-3">
                  <CCol sm={{ offset: 5, size: 5 }}>
                    <CButton size='sm' type="submit" color="primary" className="mx-2" >
                      DownLoad
                    </CButton>
                    <CButton size='sm' type="button" color="primary" onClick={handleReset} >
                      Reset
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCard>
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default DownloadStatement;

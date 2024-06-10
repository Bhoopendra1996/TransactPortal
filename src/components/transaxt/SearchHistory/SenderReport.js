import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableHead, CTableRow, CSpinner } from '@coreui/react';
import { Table, Button } from 'antd';


const SenderReport = () => {
  // Define state for table visibility, form input, and API data
  const [showTable, setShowTable] = useState(false);
  const [formData, setFormData] = useState('');
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/senderreport';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");


  const columns = [
    {
      title: 'Txn.ID',
      dataIndex: 'aesTransactionId',
      key: 'aesTransactionId'
    },
    {
      title: 'Date',
      dataIndex: 'dateOfTransaction',
      key: 'dateOfTransaction'
    },
    {
      title: 'Time',
      dataIndex: 'timeOfTransaction',
      key: 'timeOfTransaction'
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNo',
      key: 'accountNo'
    },
    {
      title: 'IMpS Ref No',
      dataIndex: 'vendorTransactionId',
      key: 'vendorTransactionId'
    },
    {
      title: 'Particulars',
      dataIndex: 'serviceName',
      key: 'serviceName'
    },
    {
      title: 'Txn.Amount',
      dataIndex: 'requestAmount',
      key: 'requestAmount'
    },
    {
      title: 'Bankit Fee',
      dataIndex: 'commission',
      key: 'commission'
    },
    {
      title: 'Balance',
      dataIndex: 'finalBalance',
      key: 'finalBalance'
    },
    {
      title: 'Status',
      dataIndex: 'tranStatus',
      key: 'tranStatus'
    },
  ];

  const senderReport = async () => {
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
          mobileNo: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }

      if (result.status === "0") {
        setTableData(result?.transactionList);
        setError("Submitted successfully !");
        setShowTable(true);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    if (!formData.trim()) {
      setError("Please Enter Customer Mobile No/ Account Number.");
      return;
    }
    senderReport();
  };

  const handleReset = () => {
    setFormData('');
    setShowTable(false);
    setTableData([]);
    setSelectedRow(null);
  };
  const handleShowButtonClick = (id) => {
    const selected = tableData.find(row => row.id === id);
    setSelectedRow(selected);
  };



  return (
    <CContainer >
      <CCard className='py-2'>
        <CCardBody>
          <div className='d-flex justify-content-center align-items-center col-12'>
            <CCard className='col-8 p-4'>
              <CRow className="d-flex justify-content-center">
                <CCol xs={12} md={4} className='d-flex align-items-center justify-content-md-end'>
                  <CFormLabel htmlFor="searchFor" className="col-sm-7 col-form-label">Search For</CFormLabel>
                </CCol>
                <CCol xs={12} md={8}>
                  <CFormInput
                    // style={{ fontSize: "11px" }}
                    size='sm'
                    type="text"
                    id="searchFor"
                    placeholder='Enter Customer Mobile No/ Account Number'
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                  />
                </CCol>
              </CRow>
              <CRow>
                <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
              </CRow>
              <CRow className='pt-3'>
                <CCol style={{ textAlign: 'center' }}>
                  <CButton size='sm' color="primary mx-2" onClick={handleSubmit}>Submit</CButton>
                  <CButton size='sm' color="primary mx-2" onClick={handleReset}>Reset</CButton>
                </CCol>
              </CRow>
            </CCard>
          </div>
        </CCardBody>
        {showTable && (
          <div style={{ overflow: 'auto', maxHeight: '400px' }}>
            <Table
              rowKey={(tableData) => tableData?.aesTransactionId}
              columns={columns}
              dataSource={tableData}
              size="small"
              bordered
              pagination={false}
            />
          </div>
        )}
      </CCard>
    </CContainer>
  );
}

export default SenderReport;

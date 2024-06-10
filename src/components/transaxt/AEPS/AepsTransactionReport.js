import React, { useState } from 'react';
import { Table } from 'antd';
import * as XLSX from 'xlsx';
import {
  CCard,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CSpinner
} from '@coreui/react';
function AepsTransactionReport() {
  const [formData, setFormData] = useState({ fromDate: '', toDate: '' });
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tableData, setTableData] = useState([]);
  const [success, setSuccess] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/aepsreport';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const fetchData = async () => {
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
        if (result?.transactionlist === undefined) {
          setError("No Data Found");
          return;
        }
        setTableData(result?.transactionlist);
        setShowTable(true)
        setSuccess("submitted successfully !")
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!formData.fromDate || !formData.toDate) {
  //     alert('Please select both from and to dates.');
  //     return;
  //   }
  //   if (formData.fromDate > formData.toDate) {
  //     alert('From date cannot be after To date.');
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const data = await fetchData(formData);
  //     setTransactions(data);
  //     setShowTable(true);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     alert('Failed to fetch data. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleReset = () => {
    setFormData({ fromDate: '', toDate: '' });
    setShowTable(false);
    setError('')
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
    setSuccess('');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData", formData);
    fetchData();
  };

  const handleDownload = () => {
    const length = tableData?.length;
    if (length <= 0) {
      setError("Please first find data for downloading ! ");
      return;
    }

    var wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, 'TransactionReport');
    XLSX.writeFile(wb, 'MyExcel.xlsx');
    setSuccess('Download successfull !');
  }

  const columns = [
    {
      title: 'Txn.ID',
      dataIndex: 'aesTransactionId',
      key: 'aesTransactionId'
    },
    {
      title: 'Txn.No',
      dataIndex: 'customerTransactionId',
      key: 'customerTransactionId'
    },
    {
      title: 'Date',
      dataIndex: 'dateOfTransaction',
      key: 'dateOfTransaction'
    },
    {
      title: 'IMPS Ref No',
      dataIndex: 'stanNo',
      key: 'stanNo'
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNo',
      key: 'mobileNo'
    },
    {
      title: 'UID No',
      dataIndex: 'uIdNo',
      key: 'uIdNo'
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName'
    },
    {
      title: 'Txn. Amount',
      dataIndex: 'requestAmount',
      key: 'requestAmount'
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName'
    },
    {
      title: 'Stan No',
      dataIndex: 'stanNo',
      key: 'stanNo'
    },
    {
      title: 'AgentId',
      dataIndex: 'agentId',
      key: 'agentId'
    },
    {
      title: 'Txn Status',
      dataIndex: 'tranStatus',
      key: 'tranStatus'
    },
  ];
  return (
    <div className="d-flex justify-content-center">
      <CCard className="w-100  " style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <CCard className='py-4'>
          <div className='d-flex justify-content-center align-items-center col-12'>
            <CCard className='col-8 p-4'>
              <CForm onSubmit={handleSubmit}>
                <CRow className='g-2 pb-3'>
                  <CCol xs={12} md={4}>
                    <CFormLabel htmlFor='fromDate' className='ps-md-5 ps-sm-3'>From Date</CFormLabel>
                  </CCol>
                  <CCol xs={12} md={8}>
                    <CFormInput
                      name='FromDate'
                      id='fromDate'
                      type='date'
                      value={formData.fromDate}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol xs={12} md={4}>
                    <CFormLabel htmlFor='toDate' className='ps-md-5 ps-sm-3'>To Date</CFormLabel>
                  </CCol>
                  <CCol xs={12} md={8}>
                    <CFormInput
                      name='ToDate'
                      id='toDate'
                      type='date'
                      value={formData.toDate}
                      onChange={handleChange}
                      required
                    />
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
                    <CButton type="button" color="primary" size='sm' onClick={handleReset}>Reset</CButton>
                    <CButton type="button" color="primary" size='sm' onClick={handleDownload}>Download Excel</CButton>
                  </div>
                </CRow>
              </CForm>
            </CCard>
          </div>
        </CCard>
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
    </div>
  )
}

export default AepsTransactionReport

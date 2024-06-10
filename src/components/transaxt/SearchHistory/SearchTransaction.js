import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CContainer,
  CSpinner
} from '@coreui/react';
import { Table } from 'antd';

const SearchTransaction = () => {
  const [showTable, setShowTable] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    searchFor: '',
    fromDate: '',
    toDate: '',
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/searchtransaction';
  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('clientId');

  const searchTransactionData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          apiId: clientId,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          aesTransactionId: formData.searchFor,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError('Network response was not ok');
        throw new Error('Network response was not ok');
      }

      if (result.status === '0') {
        setTransactions(result?.transactionList);
        setShowTable(true);
      } else {
        setError(result.message);
        setShowTable(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Fetch error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.searchFor || !formData.fromDate || !formData.toDate) {
      setError('Please fill out all fields.');
      return;
    }
    searchTransactionData();
  };

  const handleReset = () => {
    setFormData({ searchFor: '', fromDate: '', toDate: '' });
    setShowTable(false);
    setError('');
  };

  const columns = [
    {
      title: 'Txn.ID',
      dataIndex: 'aesTransactionId',
      key: 'aesTransactionId',
    },
    {
      title: 'Date',
      dataIndex: 'dateOfTransaction',
      key: 'dateOfTransaction',
    },
    {
      title: 'Time',
      dataIndex: 'timeOfTransaction',
      key: 'timeOfTransaction',
    },
    {
      title: 'A/C Number',
      dataIndex: 'accountNo',
      key: 'accountNo',
    },
    {
      title: 'IMPS Ref No',
      dataIndex: 'vendorTransactionId',
      key: 'vendorTransactionId',
    },
    {
      title: 'Particular',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Txn. Amount',
      dataIndex: 'requestAmount',
      key: 'requestAmount',
    },
    {
      title: 'Bankit Fee',
      dataIndex: 'commission',
      key: 'commission',
    },
    {
      title: 'Balance',
      dataIndex: 'finalBalance',
      key: 'finalBalance',
    },
    {
      title: 'Status',
      dataIndex: 'tranStatus',
      key: 'tranStatus',
    },
  ];

  return (
    <CContainer>
      <CCard className='py-2'>
        <CCardBody>
          <div className='d-flex justify-content-center align-items-center col-12'>
            <CCard className='col-8 p-4'>
              <CForm onSubmit={handleSubmit}>
                <CRow className='mb-3'>
                  <CFormLabel htmlFor='searchFor' className='col-sm-5'>
                    Search For
                  </CFormLabel>
                  <CCol>
                    <CFormInput
                      size='sm'
                      type='text'
                      id='searchFor'
                      name='SearchFor'
                      value={formData.searchFor}
                      placeholder='Enter Transaction Id'
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className='mb-3'>
                  <CFormLabel htmlFor='fromDate' className='col-sm-5'>
                    From Date
                  </CFormLabel>
                  <CCol>
                    <CFormInput
                      size='sm'
                      type='date'
                      id='fromDate'
                      name='FromDate'
                      value={formData.fromDate}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className='mb-3'>
                  <CFormLabel htmlFor='toDate' className='col-sm-5'>
                    To Date
                  </CFormLabel>
                  <CCol>
                    <CFormInput
                      size='sm'
                      type='date'
                      id='toDate'
                      name='ToDate'
                      value={formData.toDate}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <div className='text-danger d-flex justify-content-center'><p>{error}</p></div>
                  {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
                </CRow>
                <CRow className='mb-3'>
                  <CCol sm={{ offset: 5 }}>
                    <CButton type='submit' size='sm' color='primary' className='mx-2'>
                      Submit
                    </CButton>
                    <CButton type='button' size='sm' color='primary' onClick={handleReset}>
                      Reset
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCard>
          </div>
        </CCardBody>
        {showTable && (
          <div style={{ overflow: 'auto', maxHeight: '400px' }}>
            <Table
              rowKey={(transactions) => transactions?.aesTransactionId}
              columns={columns}
              dataSource={transactions}
              size='small'
              bordered
              pagination={false}
            />
          </div>
        )}
      </CCard>
    </CContainer>
  );
};

export default SearchTransaction;

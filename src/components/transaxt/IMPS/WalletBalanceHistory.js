import React, { useState } from 'react';
import { CCol, CContainer, CForm, CFormInput, CFormLabel, CRow, CCard, CButton, CSpinner } from '@coreui/react';
import { Table } from 'antd';
import { render } from 'react-dom';

function WalletBalanceHistory() {
  const [data, setData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [result, setResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ fromDate: '', toDate: '' });


  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/tbsummary';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const columns = [
    {
      title: 'S.No.',
      render: (text, record, index) => <span>{index + 1}</span>,
      key: ''
    },
    {
      title: "Date",
      dataIndex: 'journalDate',
      key: "journalDate"
    },
    {
      title: "Time",
      dataIndex: 'journalTime',
      key: "journalTime"
    },
    {
      title: "Amount",
      dataIndex: 'amountToCredit',
      key: "amountToCredit"
    },
    {
      title: "Mode of Payment",
      dataIndex: 'modeOfPayment',
      key: "modeOfPayment"
    },
    {
      title: "Request Status",
      dataIndex: 'status',
      key: "status"
    },
    {
      title: "Remarks",
      dataIndex: 'remarks',
      key: "remarks"
    },

  ];
  const WalletBalanceHistory = async () => {
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
        setSuccess("submitted Successfully !");
        setTableData(result?.tbRequsetSummary);
        setFormData({
          fromDate: '',
          toDate: ''
        })
        setData(true);
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

  const handleReset = () => {
    // Reset formData state to clear the form
    setFormData({ fromDate: '', toDate: '' });
    setData(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    WalletBalanceHistory();
  };

  return (
    <CContainer >
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
                    size='sm'
                    type='date'
                    id='fromDate'
                    name='FromDate'
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
                    size='sm'
                    type='date'
                    id='toDate'
                    name='ToDate'
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
                </div>
              </CRow>
            </CForm>
          </CCard>
        </div>
        {
          data ? (
            <div style={{ overflow: 'auto', maxHeight: '400px' }}>
              <Table
                rowKey={(tableData) => tableData?.journalId}
                columns={columns}
                dataSource={tableData}
                size="small"
                bordered
                pagination={false}
              />
            </div>
          ) : (!result && <h6 className='d-flex justify-content-center col-12 text-danger p-4'>Sorry no record find for these dates</h6>)
        }
      </CCard>
    </CContainer>
  )
}

export default WalletBalanceHistory

import React, { useState } from 'react';
import { CCol, CContainer, CForm, CFormInput, CFormLabel, CRow, CCard, CButton, CTable, CSpinner } from '@coreui/react';
import { Table } from 'antd';

function WalletHistory() {
    const [data, setData] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [result, setResult] = useState(true)
    const [formData, setFormData] = useState({ fromDate: '', toDate: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = '/wallethistory';
    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");

    const walletHistoryData = async () => {
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
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                setData(true);
                setTableData(result?.wallethistorylist);
                setSuccess("submitted successfully !");
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
        setSuccess('');
    };

    const handleReset = () => {
        setFormData({ fromDate: '', toDate: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        walletHistoryData();
    };

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
            title: 'Before Balance',
            dataIndex: 'beforeBalance',
            key: 'beforeBalance'
        },
        {
            title: 'After Balance',
            dataIndex: 'afterBalance',
            key: 'afterBalance'
        },
        {
            title: 'Status',
            dataIndex: 'tranStatus',
            key: 'tranStatus'
        },
    ];
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
                                </div>
                            </CRow>
                        </CForm>
                    </CCard>
                </div>
                {
                    data ? (
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
                    ) : (!result && <h6 className='d-flex justify-content-center col-12 text-danger p-4'>Sorry no record find for these dates</h6>)
                }
            </CCard>
        </CContainer>
    );
}

export default WalletHistory;

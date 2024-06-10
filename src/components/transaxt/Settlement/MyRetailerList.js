import React, { useState, useEffect } from 'react';
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
  CInputGroup,
  CFormSelect,
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
} from '@coreui/react';
import { Table, Button, Flex } from 'antd';

const MyRetailerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recall, setRecall] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/retailerdetails';
  const endPoint1 = '/agentstatusactiveall';
  const endPoint2 = '/agentstatusdeactiveall';

  const token = localStorage.getItem('token');
  const clientId = localStorage.getItem('clientId');

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const onSelectedChange = (newSelectedRowKeys) => {
    console.log('selecteRowKeys changed:', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleDownload = () => {
    console.log('Downloading data...');
    var wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, 'RetailersList');
    XLSX.writeFile(wb, 'MyExcel.xlsx');
  };

  const mysettlement = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ apiId: clientId }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }
      setTableData(result.retailerDetails);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch retailer details.');
    } finally {
      setLoading(false);
    }
  };

  const activatAll = async (idList) => {
    const forActivated = {
      apiId: clientId,
      idList: idList
    };
    const uploadData = new FormData();
    uploadData.append('Details', JSON.stringify(forActivated));

    try {
      const response = await fetch(`${baseUrl}${endPoint1}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`
        },
        body: uploadData,
      });

      const result = await response.json();

      if (!response.ok) {

        setError(result.message);
        throw new Error('Network response was not ok');
      }
      if (result.status === "0") {
        setRecall(Math.random());
        setSelectedRowKeys([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deactivatAll = async (idList) => {

    const forActivated = {
      apiId: clientId,
      idList: idList
    };
    const uploadData = new FormData();
    uploadData.append('Details', JSON.stringify(forActivated));

    try {
      const response = await fetch(`${baseUrl}${endPoint2}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`
        },
        body: uploadData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }
      if (result.status === "0") {
        setRecall(Math.random());
        setSelectedRowKeys([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDeactivate = (data) => {
    const agentId = data.agentId;
    const idList = `,${agentId}`
    deactivatAll(idList);
  };

  const handleActivate = (data) => {
    const agentId = data.agentId;
    const idList = `,${agentId}`
    activatAll(idList);
  };

  const handleActivateAll = () => {
    if (selectedRowKeys.length > 0) {
      const ids = selectedRowKeys.map(row => row).join(',');
      const idList = `,${ids}`;
      activatAll(idList);
    }
    return;
  };

  const handleDeactivateAll = () => {
    if (selectedRowKeys.length > 0) {
      const ids = selectedRowKeys.map(row => row).join(',');
      const idList = `,${ids}`;
      deactivatAll(idList);
    }
    return;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("we are here ", event.target.value);
  };

  useEffect(() => {
    mysettlement();
  }, [recall]);

  const columns = [
    {
      title: 'RO ID',
      dataIndex: 'agentId',
      key: 'agentId',
    },
    {
      title: 'Contact Number',
      dataIndex: 'mobileNo',
      key: 'mobileNo',
    },
    {
      title: 'A/C Number',
      dataIndex: 'accountNo',
      key: 'accountNo',
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'A/C Holder Name',
      dataIndex: 'holderName',
      key: 'holderName',
    },
    {
      title: 'Create Date',
      dataIndex: 'issuDate',
      key: 'issuDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        record.activeFlag === false ?
          (<Button type="primary" onClick={() => handleActivate(record)}>
            Deactivate
          </Button>) :
          (<Button type="primary" onClick={() => handleDeactivate(record)}>
            Activate
          </Button>)
      ),
    },
  ];

  return (
    <div className="d-flex justify-content-center">
      <CContainer>
        <br />
        <div className="d-flex justify-content-center">
          <CRow className="mb-3">
            <CFormLabel htmlFor="AvailableBalance" className="col-sm-3">
              Search Retailer
            </CFormLabel>
            <CCol sm={6}>
              <CForm onSubmit={handleSubmit}>
                <CInputGroup>
                  <CFormInput
                    size="sm"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <CButton size='sm' type="submit" color="primary">
                    Search
                  </CButton>
                </CInputGroup>
              </CForm>
            </CCol>
            <CCol sm={1}>
              <CButton size='sm' onClick={handleDownload} color="primary">
                Download
              </CButton>
            </CCol>
          </CRow>
        </div>
        <div style={{ overflow: 'auto', maxHeight: '400px' }}>
          <Table
            rowKey="agentId"
            columns={columns}
            dataSource={tableData}
            size="small"
            bordered
            pagination={false}
            loading={loading}
            rowSelection={rowSelection}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "right", padding: "10px" }}>
          <Flex gap="small" wrap>
            {hasSelected ?
              (<Button type='primary'>{`Selected ${selectedRowKeys.length} items`}</Button>)
              : ''}
            <Button type='primary' onClick={handleActivateAll}>Activate All</Button>
            <Button type='primary' onClick={handleDeactivateAll}>Deactivate All</Button>
          </Flex>
        </div>
      </CContainer>
    </div>
  );
};

export default MyRetailerList;

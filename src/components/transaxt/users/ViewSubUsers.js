import React, { useState, useEffect } from 'react';
import { Table, Button, Input, message } from 'antd';
import { CContainer, CButton, CCard } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';

const ViewSubUsers = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [inputValues, setInputValues] = useState({});

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endPoint = '/viewsubusers';
    const endPoint1 = '/addSubUserWallet';
    const endPoint2 = '/SubtractSubUserWallet';
    const endPoint3 = '/subUserActive';
    const endPoint4 = '/subUserDeactive';
    const emdPoint5 = '/viewprofile';

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const clientId = localStorage.getItem('clientId');

    const onSelectedChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const subUsersList = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${endPoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ apiId: clientId }),
            });

            const result = await response.json();

            if (!response.ok) {
                message.error(result.message);
                throw new Error('Network response was not ok');
            }

            if (result.status === "0") {
                setTableData(result?.subUsers);
            }

        } catch (error) {
            message.error('Failed to fetch retailer details.');
        } finally {
            setLoading(false);
        }
    };

    const balance = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}${emdPoint5}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ clientId: clientId }),
            });

            const result = await response.json();

            if (!response.ok) {
                message.error(result.message);
                throw new Error('Network response was not ok');
            }

            if (result.status === "0") {
                dispatch({ type: 'set', adminBalance: result?.balance })
            }

        } catch (error) {
            console.error('Fetch error:', error);
            message.error('Failed to fetch retailer details.');
        } finally {
            setLoading(false);
        }
    };

    const addBalance = async (userId, amount) => {
        try {
            const response = await fetch(`${baseUrl}${endPoint1}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json',
                    'Authorization': token
                },
                body: JSON.stringify({ apiId: clientId, userId: userId, afterBalance: amount }),
            });

            const result = await response.json();

            if (!response.ok) {
                message.error(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                subUsersList();
                balance();
                setInputValues({});
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const withdrawBalance = async (userId, amount) => {
        try {
            const response = await fetch(`${baseUrl}${endPoint2}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json',
                    'Authorization': token,
                },
                body: JSON.stringify({ apiId: clientId, userId: userId, afterBalance: amount }),
            });

            const result = await response.json();

            if (!response.ok) {
                message.error(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                subUsersList();
                balance();
                setInputValues({});
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const activated = async (userId) => {
        try {
            const response = await fetch(`${baseUrl}${endPoint3}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json',
                    'Authorization': token,
                },
                body: JSON.stringify({ clientId: clientId, userId: userId }),
            });

            const result = await response.json();

            if (!response.ok) {
                message.error(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                subUsersList();
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const deActivated = async (userId) => {
        try {
            const response = await fetch(`${baseUrl}${endPoint4}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json',
                    'Authorization': token,
                },
                body: JSON.stringify({ clientId: clientId, userId: userId }),
            });

            const result = await response.json();

            if (!response.ok) {
                message.error(result.message);
                throw new Error('Network response was not ok');
            }
            if (result.status === "0") {
                subUsersList();
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e, record) => {
        const { value } = e.target;
        setInputValues({
            ...inputValues,
            [record.apiId]: value,
        });
    };

    const addAmount = (record) => {
        const userId = record.apiId;
        const amount = inputValues[record.apiId];
        addBalance(userId, amount);
    }

    const withdrwaAmount = (record) => {
        const userId = record.apiId;
        const amount = inputValues[record.apiId];
        withdrawBalance(userId, amount);
        console.log("values:", amount, "agentId:", apiId);
    };

    const handleDeactivate = (record) => {
        const userId = record?.apiId;
        deActivated(userId);
    };

    const handleActivate = (record) => {
        const userId = record?.apiId;
        activated(userId);
    };

    useEffect(() => {
        subUsersList();
    }, []);

    const columns = [
        {
            title: 'Sub user Id',
            dataIndex: 'apiId',
            key: 'apiId',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Balance',
            dataIndex: 'finalBalance',
            key: 'finalBalance',
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Enter Amount',
            dataIndex: 'amount',
            key: 'enterAmount',
            render: (text, record) => (
                <Input
                    placeholder="Enter amount"
                    onChange={(e) => handleInput(e, record)}
                    value={inputValues[record.apiId] || ''}
                />
            ),
        },
        {
            title: '',
            key: 'addAmount',
            render: (text, record) => (
                <Button type='primary' onClick={() => addAmount(record)}>Add Amount</Button>
            ),
        },
        {
            title: '',
            key: 'withdrawAmount',
            render: (text, record) => (
                <Button type='primary' style={{ backgroundColor: 'green', borderColor: 'green', }} onClick={() => withdrwaAmount(record)}>Withdraw Amount</Button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                record.status === "Active" ?
                    (<Button type="primary" onClick={() => handleDeactivate(record)}>
                        Deactivate
                    </Button>) :
                    (<Button type="primary" onClick={() => handleActivate(record)}>
                        Activate
                    </Button>)
            ),
        },
    ];

    return (
        <>
            <CCard><h4 className='text-primary d-flex justify-content-center'>Sub users</h4> </CCard>
            <Table
                rowKey={(record) => record.apiId}
                columns={columns}
                dataSource={tableData}
                size="small"
                bordered
                pagination={false}
                loading={loading}
                rowSelection={rowSelection}
                scroll={{ x: 1100 }}

            />
        </>
    );
};

export default ViewSubUsers;

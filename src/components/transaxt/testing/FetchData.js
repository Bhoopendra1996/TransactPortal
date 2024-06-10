import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilBriefcase,
  cilSpeedometer,
  cilWallet,
  cilCalculator,
  cilCash,
  cilSearch,
  cilUser,
  cilChatBubble,
  cilUserPlus


} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const FetchData = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [value, setValue] = useState('');

  // const handleInput = (e) => {
  //   setValue(e.target.value);
  // };
  // useEffect(() => {
  //   const fetchIpAddress = async () => {
  //     try {
  //       const response = await fetch('https://api.ipify.org?format=json');
  //       const data = await response.json();
  //       setIpAddress(data.ip);
  //     } catch (error) {
  //       console.error('Error fetching the IP address:', error);
  //     }
  //   };

  //   fetchIpAddress();
  // }, []);
  //   const routes = [
  //     { path: '/imps', exact: true, name: 'IMPS', element: "", serviceDisplayName: "IMPS" },
  //     { path: '/load-wallet', exact: true, name: 'Load Wallet', element: "", serviceDisplayName: "Load Wallet" },
  //     { path: '/help-center', exact: true, name: 'Help Center', element: "", serviceDisplayName: "Help Center" },
  //   ];

  //   const validationIndex = [
  //     { "serviceDisplayName": "", "status": "Y" },
  //     { "serviceDisplayName": "", "status": "Y" },
  //     { "serviceDisplayName": "Help Center", "status": "Y" },
  //   ];

  //  const activeRoutes = routes.filter(route => {

  //   const service = validationIndex.find(service => service.serviceDisplayName === route.serviceDisplayName);
  //   console.log('service', service);
  //   return service

  //  });
  //  cosnole.log('tesing for routes ', activeRoutes);

  // const nav = [
  //   {
  //     component: CNavItem,
  //     name: 'Dashboard',
  //     to: '/dashboard',
  //     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  //   },
  //   {
  //     component: CNavGroup,
  //     status: 'Y',
  //     name: 'Users',
  //     to: '/user',
  //     icon: <CIcon icon={cilUserPlus} customClassName='nav-icon' />,
  //     items: [
  //       {
  //         component: CNavItem,
  //         name: 'Create User',
  //         to: '/create-user'
  //       },
  //       {
  //         component: CNavItem,
  //         name: 'View Sub Users',
  //         to: '/sub-users'
  //       }
  //     ]
  //   },
  //   {
  //     component: CNavGroup,
  //     status: 'Y',
  //     name: 'IMPS',
  //     to: '/imps',
  //     icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  //     items: [
  //       {
  //         component: CNavItem,
  //         name: 'Load Wallet',
  //         to: 'load-wallet',
  //       },
  //       {
  //         component: CNavItem,
  //         name: 'Wallet Balance History',
  //         to: '/wallet-balance-history',
  //       },
  //       {
  //         component: CNavItem,
  //         name: 'Wallet History',
  //         to: '/wallet-history',
  //       },
  //     ]
  //   },
  //   {
  //     component: CNavGroup,
  //     name: "AEPS",
  //     to: '/aeps',
  //     status: 'Y',
  //     icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  //     items: [
  //       {
  //         component: CNavItem,
  //         name: 'AEPS Transaction Report',
  //         to: '/transaction-report'
  //       }
  //     ]
  //   }

  // ];

  // const validationIndex = [
  //   { "serviceDisplayName": "IMPS", "status": "Y" },
  //   { "serviceDisplayName": "Load Wallet", "status": "Y" },
  //   { "serviceDisplayName": "Wallet Balance History", "status": "Y" },
  //   { "serviceDisplayName": "Wallet History", "status": "Y" },
  //   { "serviceDisplayName": "AEPS", "status": "Y" },
  //   { "serviceDisplayName": "AEPS Transaction Report", "status": "Y" },
  //   { "serviceDisplayName": "Settlement", "status": "Y" },
  //   { "serviceDisplayName": "Register My Bank", "status": "N" },
  //   { "serviceDisplayName": "My Settlement", "status": "Y" },
  //   { "serviceDisplayName": "Register My Retailers Bank", "status": "N" },
  //   { "serviceDisplayName": "My Retailer List", "status": "Y" },
  //   { "serviceDisplayName": "Search & History", "status": "Y" },
  //   { "serviceDisplayName": "Search Transaction", "status": "Y" },
  //   { "serviceDisplayName": "Download Statement", "status": "N" },
  //   { "serviceDisplayName": "Sender Report", "status": "Y" },
  //   { "serviceDisplayName": "Log Dispute", "status": "N" },
  //   { "serviceDisplayName": "Help Center", "status": "Y" },
  //   { "serviceDisplayName": "Users", "status": "Y" },
  //   { "serviceDisplayName": "Create User", "status": "Y" },
  //   { "serviceDisplayName": "View Sub User", "status": "Y" },
  // ];

  // const filterNavItems = (navArray) => {
  //   return navArray
  //     .filter(item => item.status === 'Y' || item.items)
  //     .flatMap(item => {
  //       if (item.items) {
  //         return [item, ...item.items];
  //       } else {
  //         return [item];
  //       }
  //     });
  // };

  // const filterValidationIndexItems = (validationIndexArray) => {
  //   return validationIndexArray.filter(item => item.status === 'Y');
  // };

  // const filteredNavItems = filterNavItems(nav);
  // const filteredValidationIndexItems = filterValidationIndexItems(validationIndex);

  // const matchedItems = filteredNavItems.filter(navItem =>
  //   filteredValidationIndexItems.some(validationItem =>
  //     validationItem.status === navItem.status
  //   )
  // );

  // console.log(matchedItems);

  // append(name, value)
  // append(name, value, filename)

  // formData.append("username", "bhoopendra");

  //formData.append("userpic", myFileInput.files[0], "chris.jpg");

  //formData.append("userpic", myfileInput.files[0], "chris1.jpg");
  //formData.append("userpic", myfileInput.files[1], "chris2.jpg");
  // If the value is not string or Blob, append() will convert it to a string automatically
  // 

  setTimeout(function () {
    console.log('Hello, world!');
  }, 2000);



  return (
    <div>
      <h1>bhoopendra kumar</h1>
    </div>
  );
};

export default FetchData;

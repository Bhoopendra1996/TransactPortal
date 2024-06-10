import React from 'react'
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

const stringData = localStorage.getItem("validationIndex");
const validationIndex = JSON.parse(stringData);

const nav = [
  {
    component: CNavItem,
    status: 'Y',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    status: 'Y',
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilUserPlus} customClassName='nav-icon' />,
    items: [
      {
        component: CNavItem,
        name: 'Create User',
        to: '/create-user'
      },
      {
        component: CNavItem,
        name: 'View Sub Users',
        to: '/sub-users'
      }
    ]
  },
  {
    component: CNavGroup,
    status: 'Y',
    name: 'IMPS',
    to: '/imps',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Load Wallet',
        to: 'load-wallet',
      },
      {
        component: CNavItem,
        name: 'Wallet Balance History',
        to: '/wallet-balance-history',
      },
      {
        component: CNavItem,
        name: 'Wallet History',
        to: '/wallet-history',
      },
    ]
  },
  {
    component: CNavGroup,
    status: 'Y',
    name: "AEPS",
    to: '/aeps',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'AEPS Transaction Report',
        to: '/transaction-report'
      }
    ]
  },
  {
    component: CNavItem,
    status: 'Y',
    name: 'Settlement',
    to: '/settlement',
    icon: < CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavGroup,
    status: 'Y',
    name: 'Search & History',
    to: '/search-history',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Search Transaction',
        to: '/search-transaction'
      },
      {
        component: CNavItem,
        name: 'Download Statement',
        to: '/download-statement',
      },
      {
        component: CNavItem,
        name: 'Sender Report',
        to: '/sender-report',
      },
    ]
  },
  {
    component: CNavGroup,
    status: 'Y',
    name: 'Log Dispute',
    to: '/log-dispute',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Help Center',
        to: 'help-center',
      }
    ]
  },
  {
    component: CNavGroup,
    status: 'Y',
    name: 'Manage Your Account',
    to: '/manage-your-account',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Manage Profile",
        to: '/manage-profile'
      }
    ]
  }
];


const filterNavItems = (navArray) => {
  return navArray
    .filter(item => item.status === 'Y' || item.items)
    .flatMap(item => {
      if (item.items) {
        return [item, ...item.items];
      } else {
        return [item];
      }
    });
};

const filterValidationIndexItems = (validationIndexArray) => {
  return validationIndexArray.filter(item => item.status === 'Y');
};

const filteredNavItems = filterNavItems(nav);
const filteredValidationIndexItems = filterValidationIndexItems(validationIndex);

const _nav = filteredNavItems.filter(navItem =>
  filteredValidationIndexItems.some(validationItem =>
    validationItem.status === navItem.status
  )
);

export default _nav

import { element } from 'prop-types'
import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const LoadWallet = React.lazy(() => import('./components/transaxt/IMPS/LoadWallet'))
const WalletBalanceHistory = React.lazy(() => import('./components/transaxt/IMPS/WalletBalanceHistory'))
const WalletHistory = React.lazy(() => import('./components/transaxt/IMPS/WalletHistory'))
const AepsTransactionReport = React.lazy(() => import('./components/transaxt/AEPS/AepsTransactionReport'))
const Settlement = React.lazy(() => import('./components/transaxt/Settlement/Settlement'))
const SearchTransaction = React.lazy(() => import('./components/transaxt/SearchHistory/SearchTransaction'))
const DownloadStatement = React.lazy(() => import('./components/transaxt/SearchHistory/DownloadStatement'))
const SenderReport = React.lazy(() => import('./components/transaxt/SearchHistory/SenderReport'))
const HelpCenter = React.lazy(() => import('./components/transaxt/LongDispute/HelpCenter'))
const ManageProfile = React.lazy(() => import('./components/transaxt/ManageAcount/ManageProfile'))
const FetchData = React.lazy(() => import('./components/transaxt/testing/FetchData'))
const ChangePassword = React.lazy(() => import('./views/pages/password/ChangePassword'))
const CreateUsers = React.lazy(() => import('./components/transaxt/users/CreateUsers'))
const ViewSubUsers = React.lazy(() => import('./components/transaxt/users/ViewSubUsers'))


const stringData = localStorage.getItem("validationIndex");
const validationIndex = JSON.parse(stringData);

const _routes = [
  { path: '/', exact: true, name: 'Home', status: 'Y' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, status: 'Y' },
  { path: '/load-wallet', name: 'Load Wallet', element: LoadWallet, status: 'Y' },
  { path: '/wallet-balance-history', name: 'Wallet Balance History', element: WalletBalanceHistory, status: 'Y' },
  { path: '/wallet-history', name: 'Wallet History', element: WalletHistory, status: 'Y' },
  { path: '/transaction-report', name: 'AEPS Transaction Report', element: AepsTransactionReport, status: 'Y' },
  { path: '/settlement', name: 'Settlement', element: Settlement, status: 'Y' },
  { path: '/search-transaction', name: 'Search Transaxtion', element: SearchTransaction, status: 'Y' },
  { path: '/download-statement', name: 'Download Statemen', element: DownloadStatement, status: 'Y' },
  { path: '/sender-report', name: 'Sender Report', element: SenderReport, status: 'Y' },
  { path: '/help-center', name: 'Help Center', element: HelpCenter, status: 'Y' },
  { path: '/manage-profile', name: 'Manage Profile', element: ManageProfile, status: 'Y' },
  { path: '/change-password', name: 'Change Password', element: ChangePassword, status: 'Y' },
  { path: '/test', name: 'bhoopendra', element: FetchData, status: 'Y' },
  { path: '/create-user', name: 'Create User', element: CreateUsers, status: 'Y' },
  { path: '/sub-users', name: 'View Sub User', element: ViewSubUsers, status: 'Y' }

]


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

const filteredNavItems = filterNavItems(_routes);
const filteredValidationIndexItems = filterValidationIndexItems(validationIndex);

const routes = filteredNavItems.filter(navItem =>
  filteredValidationIndexItems.some(validationItem =>
    validationItem.status === navItem.status
  )
);

export default routes

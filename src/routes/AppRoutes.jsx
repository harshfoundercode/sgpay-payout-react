// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import BridgeAdminDashboard from '../components/DashboardLayout';
// // import BridgeLogin from '../pages/auth/LoginScreen';

// // // Protected Route Component
// // const ProtectedRoute = ({ children }) => {
// //     const token = localStorage.getItem('token');

// //     if (!token) {
// //         return <Navigate to="/login" replace />;
// //     }

// //     return children;
// // };

// // // Public Route - Redirect to dashboard if already logged in
// // const PublicRoute = ({ children }) => {
// //     const token = localStorage.getItem('token');

// //     if (token) {
// //         return <Navigate to="/dashboard" replace />;
// //     }

// //     return children;
// // };

// // export const AppRoutes = () => {
// //     return (
// //         <Routes>
// //             {/* Public Login Route */}
// //             {/* <Route
// //                 path="/"
// //                 element={
// //                     <PublicRoute>
// //                         <BridgeLogin />
// //                     </PublicRoute>
// //                 }
// //             /> */}

// //             {/* Protected Dashboard Routes */}
// //             <Route
// //                 path="/"
// //                 element={
// //                     <PublicRoute>
// //                         <BridgeAdminDashboard />
// //                     </PublicRoute>
// //                 }
// //             >
// //                 <Route index element={<Navigate to="/dashboard" replace />} />
// //                 <Route path="dashboard" element={<BridgeAdminDashboard />} />
// //                 <Route path="transactions" element={<div>Transactions Page</div>} />
// //                 <Route path="merchants" element={<div>Merchants Page</div>} />
// //                 <Route path="payout-apis" element={<div>Payout APIs Page</div>} />
// //                 <Route path="routing" element={<div>Routing Page</div>} />
// //                 <Route path="auto-payout" element={<div>Auto Payout Page</div>} />
// //                 <Route path="balances-limits" element={<div>Balances & Limits Page</div>} />
// //                 <Route path="reports" element={<div>Reports Page</div>} />
// //                 <Route path="reconciliation" element={<div>Reconciliation Page</div>} />
// //                 <Route path="webhooks" element={<div>Webhooks Page</div>} />
// //                 <Route path="alerts" element={<div>Alerts Page</div>} />
// //                 <Route path="users-roles" element={<div>Users & Roles Page</div>} />
// //                 <Route path="logs" element={<div>Logs Page</div>} />
// //                 <Route path="settings" element={<div>Settings Page</div>} />
// //                 <Route path="system" element={<div>System Page</div>} />
// //             </Route>

// //             {/* Catch all - redirect to dashboard */}
// //             <Route path="*" element={<Navigate to="/dashboard" replace />} />
// //         </Routes>
// //     );
// // };
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import BridgeAdminDashboard from '../components/DashboardLayout';
// import BridgeLogin from '../pages/auth/LoginScreen';

// // Import your actual page components
// import DashboardPage from '../pages/Dashboard';
// import TransactionScreen from '../pages/TransactionSceen';
// import MerchantListPage from '../pages/merchant/merchantList';
// import MerchantDetailsPage from '../pages/merchant/merchantDetails';
// import ApiProvidersPage from '../pages/payoutApis/ApiProvider';
// import ApiProviderDetail from '../pages/payoutApis/ApiProviderDetails';
// import PayoutRouting from '../pages/Routing';
// import AutoPayout from '../pages/AutoPayout';
// import ReportsOverview from '../pages/reports/TransactionReports';
// import MerchantReport from '../pages/reports/MerchantReports';
// import PayoutReport from '../pages/reports/PayoutReports';
// import SettlementReport from '../pages/reports/SettlementReports';
// import ForgotPassword from '../pages/auth/ForgetPassword';


// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');

//     // Also check for your login state
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//     if (!token && !isLoggedIn) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// // Public Route - Redirect to dashboard if already logged in
// const PublicRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//     if (token || isLoggedIn) {
//         return <Navigate to="/dashboard" replace />;
//     }

//     return children;
// };

// // Layout wrapper for protected routes
// const DashboardLayout = ({ children }) => {
//     return (
//         <ProtectedRoute>
//             <BridgeAdminDashboard />
//         </ProtectedRoute>
//     );
// };

// export const AppRoutes = () => {
//     return (
//         <Routes>
//             {/* Public Login Route */}
//             <Route 
//                 path="/login" 
//                 element={
//                     <PublicRoute>
//                         <BridgeLogin />
//                     </PublicRoute>
//                 } 
//             />

//             {/* Root path - redirect based on auth status */}
//             <Route 
//                 path="/" 
//                 element={
//                     <PublicRoute>
//                         <Navigate to="/login" replace />
//                     </PublicRoute>
//                 } 
//             />

//             {/* Protected Routes - Dashboard is the layout */}
//             <Route 
//                 path="/dashboard" 
//                 element={
//                     <ProtectedRoute>
//                         <BridgeAdminDashboard />
//                     </ProtectedRoute>
//                 } 
//             />
//             <Route path="/forgot-password" element={<ForgotPassword />} />

//             {/* Catch all - redirect to dashboard or login based on auth */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//     );
// };
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BridgeAdminDashboard from '../components/DashboardLayout';
import BridgeLogin from '../pages/auth/LoginScreen';
import ForgotPassword from '../pages/auth/ForgetPassword';

import DashboardPage from '../pages/Dashboard';
import TransactionScreen from '../pages/TransactionSceen';
import MerchantListPage from '../pages/merchant/merchantList';
import CreateMerchantPage from '../pages/merchant/AddMerchant';
import ApiProvidersPage from '../pages/payoutApis/ApiProvider';
import PayoutRouting from '../pages/Routing';
import AutoPayout from '../pages/AutoPayout';
import ReportsOverview from '../pages/reports/TransactionReports';
import MerchantReport from '../pages/reports/MerchantReports';
import PayoutReport from '../pages/reports/PayoutReports';
import SettlementReport from '../pages/reports/SettlementReports';
import SuccessFailureReport from '../pages/reports/SuccessFailureReports';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!token && !isLoggedIn) return <Navigate to="/login" replace />;
    return children;
};

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (token || isLoggedIn) return <Navigate to="/dashboard" replace />;
    return children;
};

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<PublicRoute><BridgeLogin /></PublicRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard layout wrapper — koi path nahi, sirf Outlet */}
            <Route element={<ProtectedRoute><BridgeAdminDashboard /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionScreen />} />
                <Route path="/create-merchant" element={<CreateMerchantPage />} />
                <Route path="/all-merchant" element={<MerchantListPage />} />
                <Route path="/payout-apis" element={<ApiProvidersPage />} />
                <Route path="/routing" element={<PayoutRouting />} />
                <Route path="/auto-payout" element={<AutoPayout />} />
                <Route path="/transaction-report" element={<ReportsOverview />} />
                <Route path="/merchant-report" element={<MerchantReport />} />
                <Route path="/payout-report" element={<PayoutReport />} />
                <Route path="/settlement-report" element={<SettlementReport />} />
                <Route path="/success-failure" element={<SuccessFailureReport />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import ApiProviderDetail from '../pages/payoutApis/ApiProviderDetails';
import ChangePassword from '../pages/ChangePassword';
import MerchantDetailsPage from '../pages/merchant/merchantDetails';
import authService from '../services/AuthServices';


const ProtectedRoute = ({ children }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Public Route Component (redirects if logged in)
const PublicRoute = ({ children }) => {
    if (authService.isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

// Wrapper for ApiProvidersPage to provide navigation
const ApiProvidersPageWrapper = () => {
    const navigate = useNavigate();
    return <ApiProvidersPage onViewDetail={(id) => navigate(`/api-provider-details/${id}`)} />;
};

// Wrapper for ApiProviderDetail to handle back navigation
const ApiProviderDetailWrapper = () => {
    const navigate = useNavigate();
    return <ApiProviderDetail onBack={() => navigate('/payout-apis')} />;
};

export const AppRoutes = () => { 
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<PublicRoute><BridgeLogin /></PublicRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard layout wrapper */}
            <Route element={<ProtectedRoute><BridgeAdminDashboard /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionScreen />} />
                <Route path="/create-merchant" element={<CreateMerchantPage />} />
                <Route path="/all-merchant" element={<MerchantListPage />} />
                <Route path="merchants/:id" element={<MerchantDetailsPage />} />
                <Route path="/payout-apis" element={<ApiProvidersPageWrapper />} />
                <Route path="/api-provider-details/:id" element={<ApiProviderDetailWrapper />} />
                <Route path="/routing" element={<PayoutRouting />} />
                <Route path="/auto-payout" element={<AutoPayout />} />
                <Route path="/transaction-report" element={<ReportsOverview />} />
                <Route path="/merchant-report" element={<MerchantReport />} />
                <Route path="/payout-report" element={<PayoutReport />} />
                <Route path="/settlement-report" element={<SettlementReport />} />
                <Route path="/success-failure" element={<SuccessFailureReport />} />
                <Route path="/change-password" element={<ChangePassword />} />

            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
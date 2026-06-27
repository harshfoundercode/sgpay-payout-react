
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import {
//     House, CreditCard, Store, Zap, GitBranch, RefreshCw,
//     FileText, Webhook, Bell, Settings, ChevronDown, Search, Menu,
//     ShieldAlert, UserCheck, AlertTriangle, Power, Database,
//     Receipt, DollarSign, Calendar, FileBarChart, ChartNoAxesCombined,
//     Wrench, LogOut, Shield, User, X, CheckCircle, XCircle
// } from "lucide-react";
// import payoutSettingsService from "../services/PayoutStatusServices";

// const navConfig = [
//     { id: "dashboard",    path: "/dashboard",    label: "Dashboard",    Icon: House },
//     { id: "transactions", path: "/transactions", label: "Transactions", Icon: CreditCard },
//     { id: "all-merchant", path: "/all-merchant", label: "Merchant", Icon: Store},
//     { id: "payout-apis",  path: "/payout-apis",  label: "Payout APIs", Icon: Zap },
//     // {
//     //     id: "reports", label: "Reports", Icon: FileBarChart, hasChevron: true,
//     //     sub: [
//     //         { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
//     //     ]
//     // },
//      { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
//     {
//         id: "settings", label: "Settings", Icon: Settings, hasChevron: true,
//         sub: [
//             { id: "change-password", path: "/change-password", label: "Change Password", Icon: UserCheck },
//         ]
//     },
// ];

// export default function BridgeAdminDashboard() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [expandedNav, setExpandedNav] = useState({ reports: false, merchants: false, settings: false });
//     const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    
//     // ─── Payout Status States ───
//     const [payoutStatus, setPayoutStatus] = useState('active');
//     const [payoutUpdatedAt, setPayoutUpdatedAt] = useState(null);
//     const [loadingStatus, setLoadingStatus] = useState(false);
//     const [toggling, setToggling] = useState(false);
//     const [toast, setToast] = useState(null);

//     const navigate = useNavigate();
//     const location = useLocation();

//     // ─── Toast Notification ───
//     const showToast = (message, isError = false) => {
//         setToast({ message, isError });
//         setTimeout(() => setToast(null), 3000);
//     };

//     // ─── Fetch Payout Status ───
//     const fetchPayoutStatus = async () => {
//         setLoadingStatus(true);
//         try {
//             const response = await payoutSettingsService.getPayoutStatus();
//             // Response format: { id, key_name, value, updated_at }
//             setPayoutStatus(response.value || 'active');
//             setPayoutUpdatedAt(response.updated_at);
//             console.log('📊 Payout status loaded:', response);
//         } catch (error) {
//             console.error('Error fetching payout status:', error);
//             // Fallback to default
//             setPayoutStatus('active');
//         } finally {
//             setLoadingStatus(false);
//         }
//     };

//     // ─── Handle Payout Toggle ───
//     const handlePayoutToggle = async () => {
//         if (toggling) return;
        
//         setToggling(true);
//         const newStatus = payoutStatus === 'active' ? 'stopped' : 'active';
        
//         try {
//             const response = await payoutSettingsService.updatePayoutStatus(newStatus);
//             // Update state with response data
//             setPayoutStatus(response.value || newStatus);
//             setPayoutUpdatedAt(response.updated_at);
//             showToast(`Payouts ${newStatus === 'active' ? 'activated' : 'stopped'} successfully!`, false);
//             console.log('📊 Payout status updated:', response);
//         } catch (error) {
//             console.error('Error toggling payout status:', error);
//             showToast('Failed to update payout status', true);
//         } finally {
//             setToggling(false);
//         }
//     };

//     // ─── Format date ───
//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-IN', { 
//             day: '2-digit', 
//             month: 'short', 
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     // ─── Track window width ───
//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // ─── Close mobile menu on route change ───
//     useEffect(() => {
//         setMobileMenuOpen(false);
//     }, [location.pathname]);

//     // ─── Auto-collapse sidebar on mobile ───
//     useEffect(() => {
//         if (windowWidth < 768) {
//             setCollapsed(true);
//         }
//     }, [windowWidth]);

//     // ─── Fetch status on mount ───
//     useEffect(() => {
//         fetchPayoutStatus();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('userEmail');
//         localStorage.removeItem('bridge_admin_email');
//         localStorage.removeItem('bridge_admin_remember');
//         sessionStorage.clear();
//         navigate('/login');
//     };

//     function isActive(item) {
//         if (item.path) return location.pathname === item.path;
//         if (item.sub) return item.sub.some(s => location.pathname === s.path);
//         return false;
//     }

//     function toggleNav(id) {
//         setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
//     }

//     // ─── Sidebar content component ───
//     const SidebarContent = ({ isMobile = false, onClose }) => (
//         <>
//             {/* Logo */}
//             <div className={`flex items-center gap-2.5 px-3 py-3 border-b border-gray-200 ${(!collapsed || isMobile) ? "justify-between" : "justify-center"}`}>
//                 <div className="flex items-center gap-2.5">
//                     <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
//                         <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
//                             <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//                         </svg>
//                     </div>
//                     {(!collapsed || isMobile) && (
//                         <span className="text-gray-800 font-bold text-[13px] sm:text-[15px] tracking-wide">Bridge Admin</span>
//                     )}
//                 </div>
//                 {isMobile && (
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//                         <X size={18} />
//                     </button>
//                 )}
//             </div>

//             {/* Nav */}
//             <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
//                 {navConfig.map(item => {
//                     const active = isActive(item);
//                     const isExpanded = expandedNav[item.id];
//                     const showLabel = (!collapsed || isMobile);

//                     return (
//                         <div key={item.id}>
//                             <button
//                                 onClick={() => {
//                                     if (item.sub) {
//                                         toggleNav(item.id);
//                                         return;
//                                     }
//                                     navigate(item.path);
//                                     if (isMobile) onClose?.();
//                                 }}
//                                 title={(!showLabel) ? item.label : undefined}
//                                 className={`w-full flex items-center ${(!showLabel) ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
//                                     ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
//                             >
//                                 <div className={`flex items-center ${(!showLabel) ? "" : "gap-3"}`}>
//                                     <item.Icon size={16} className="shrink-0" />
//                                     {showLabel && <span className="text-[12px] sm:text-[13px] font-medium">{item.label}</span>}
//                                 </div>
//                                 {showLabel && item.hasChevron && (
//                                     <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
//                                 )}
//                             </button>

//                             {/* Sub-items */}
//                             {item.sub && isExpanded && showLabel && (
//                                 <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
//                                     {item.sub.map(sub => (
//                                         <button
//                                             key={sub.id}
//                                             onClick={() => {
//                                                 navigate(sub.path);
//                                                 if (isMobile) onClose?.();
//                                             }}
//                                             className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[11px] sm:text-[12px] transition-colors
//                                                 ${location.pathname === sub.path
//                                                     ? "text-blue-600 bg-blue-50"
//                                                     : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
//                                         >
//                                             <sub.Icon size={12} className="shrink-0" />
//                                             {sub.label}
//                                         </button>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </nav>

//             {/* ─── KILL SWITCH + LOGOUT ─── */}
//             <div className="p-3 border-t border-gray-200 space-y-2">
//                 {/* Status Indicator (when collapsed) */}
//                 {collapsed && !isMobile && (
//                     <div className="flex justify-center mb-1">
//                         <span className={`w-2 h-2 rounded-full ${payoutStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
//                     </div>
//                 )}

//                 {/* Kill Switch Info */}
//                 {(!collapsed || isMobile) && (
//                     <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
//                         <div className="flex items-center gap-2 mb-1">
//                             <ShieldAlert size={13} className="text-gray-600" />
//                             <span className="text-gray-700 text-xs font-semibold">Kill Switch</span>
//                             {!loadingStatus && (
//                                 <span className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${
//                                     payoutStatus === 'active' 
//                                         ? 'bg-green-100 text-green-700' 
//                                         : 'bg-red-100 text-red-700'
//                                 }`}>
//                                     {payoutStatus === 'active' ? 'Active' : 'Stopped'}
//                                 </span>
//                             )}
//                         </div>
//                         <p className="text-gray-500 text-[10px] sm:text-[11px]">
//                             {payoutStatus === 'active' ? 'Payouts are running' : 'All payouts stopped'}
//                         </p>
//                         {payoutUpdatedAt && (
//                             <p className="text-[9px] text-gray-400 mt-1">
//                                 Updated: {formatDate(payoutUpdatedAt)}
//                             </p>
//                         )}
//                     </div>
//                 )}

//                 {/* ─── TOGGLE BUTTON ─── */}
//                 <button 
//                     onClick={handlePayoutToggle}
//                     disabled={toggling || loadingStatus}
//                     className={`w-full rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-[11px] sm:text-xs font-bold ${
//                         payoutStatus === 'active' 
//                             ? 'bg-red-600 hover:bg-red-700' 
//                             : 'bg-green-600 hover:bg-green-700'
//                     } ${(toggling || loadingStatus) ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                     {toggling ? (
//                         <>
//                             <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                         </>
//                     ) : (
//                         <>
//                             <Power size={12} sm:size={13} />
//                             {(!collapsed || isMobile) && (
//                                 payoutStatus === 'active' ? 'STOP ALL PAYOUTS' : 'START ALL PAYOUTS'
//                             )}
//                         </>
//                     )}
//                 </button>

//                 {/* ─── LOGOUT BUTTON ─── */}
//                 <button
//                     onClick={handleLogout}
//                     className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-[11px] sm:text-xs font-bold"
//                 >
//                     <LogOut size={12} sm:size={13} />
//                     {(!collapsed || isMobile) && "LOGOUT"}
//                 </button>
//             </div>
//         </>
//     );

//     return (
//         <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

//             {/* ─── TOAST NOTIFICATION ─── */}
//             {toast && (
//                 <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg text-[11px] sm:text-sm ${
//                     toast.isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
//                 }`}>
//                     {!toast.isError ? <CheckCircle size={14} sm:size={18} /> : <XCircle size={14} sm:size={18} />}
//                     {toast.message}
//                 </div>
//             )}

//             {/* ─── DESKTOP SIDEBAR ─── */}
//             <aside className={`hidden md:flex flex-col bg-white shadow-lg shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200
//                 ${collapsed ? "w-16" : "w-56"}`}>
//                 <SidebarContent isMobile={false} />
//             </aside>

//             {/* ─── MOBILE OVERLAY ─── */}
//             {mobileMenuOpen && (
//                 <div 
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//                     onClick={() => setMobileMenuOpen(false)}
//                 />
//             )}

//             {/* ─── MOBILE SIDEBAR ─── */}
//             <aside className={`
//                 fixed top-0 left-0 z-50 h-full bg-white shadow-xl flex flex-col
//                 transition-transform duration-300 ease-in-out md:hidden
//                 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//                 w-64
//             `}>
//                 <SidebarContent isMobile={true} onClose={() => setMobileMenuOpen(false)} />
//             </aside>

//             {/* ─── MAIN ─── */}
//             <div className="flex-1 flex flex-col overflow-hidden">

//                 {/* Topbar */}
//                 <header className="bg-white border-b border-gray-200 px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 shrink-0 h-12 sm:h-14">
//                     {/* Mobile menu button */}
//                     <button 
//                         onClick={() => setMobileMenuOpen(true)} 
//                         className="md:hidden text-gray-400 hover:text-gray-600 p-1"
//                     >
//                         <Menu size={20} />
//                     </button>
                    
//                     {/* Desktop collapse button */}
//                     <button 
//                         onClick={() => setCollapsed(!collapsed)} 
//                         className="hidden md:block text-gray-400 hover:text-gray-600 p-1"
//                     >
//                         <Menu size={20} />
//                     </button>
                    
//                     <div className="flex-1 max-w-full sm:max-w-lg relative">
//                         <Search size={13} sm:size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                             className="w-full pl-8 sm:pl-9 pr-12 sm:pr-16 py-1.5 sm:py-2 bg-gray-100 rounded-lg text-[11px] sm:text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100"
//                             placeholder="Search by Merchant / Transaction ID"
//                         />
//                         <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] text-gray-300 border border-gray-200 rounded px-1 hidden sm:block">⌘ K</kbd>
//                     </div>

//                     <div className="ml-auto flex items-center gap-2 sm:gap-4">
                        

//                         {/* Payout Status Indicator */}
//                         {!loadingStatus && (
//                             <div className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium ${
//                                 payoutStatus === 'active' 
//                                     ? 'bg-green-100 text-green-700' 
//                                     : 'bg-red-100 text-red-700'
//                             }`}>
//                                 <span className={`w-1.5 h-1.5 rounded-full ${
//                                     payoutStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
//                                 }`} />
//                                 {payoutStatus === 'active' ? 'Active' : 'Stopped'}
//                             </div>
//                         )}                        
//                     </div>
//                 </header>

//                 {/* ─── OUTLET ─── */}
//                 <main className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// }
// src/components/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
    House, CreditCard, Store, Zap, GitBranch, RefreshCw,
    FileText, Webhook, Bell, Settings, ChevronDown, Search, Menu,
    ShieldAlert, UserCheck, AlertTriangle, Power, Database,
    Receipt, DollarSign, Calendar, FileBarChart, ChartNoAxesCombined,
    Wrench, LogOut, Shield, User, X, CheckCircle, XCircle
} from "lucide-react";
import payoutSettingsService from "../services/PayoutStatusServices";

const navConfig = [
    { id: "dashboard",    path: "/dashboard",    label: "Dashboard",    Icon: House },
    { id: "transactions", path: "/transactions", label: "Transactions", Icon: CreditCard },
    { id: "all-merchant", path: "/all-merchant", label: "Merchant", Icon: Store},
    { id: "payout-apis",  path: "/payout-apis",  label: "Payout APIs", Icon: Zap },
    // {
    //     id: "reports", label: "Reports", Icon: FileBarChart, hasChevron: true,
    //     sub: [
    //         { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
    //     ]
    // },
    { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
    {
        id: "settings", label: "Settings", Icon: Settings, hasChevron: true,
        sub: [
            { id: "change-password", path: "/change-password", label: "Change Password", Icon: UserCheck },
        ]
    },
];

// ─── Confirmation Dialog Component ──────────────────────────────────────────
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, confirmColor = "red" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-[fadeIn_0.2s_ease]">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        confirmColor === 'red' ? 'bg-red-100' : 
                        confirmColor === 'green' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                        {confirmColor === 'red' ? (
                            <AlertTriangle size={20} className="text-red-600" />
                        ) : confirmColor === 'green' ? (
                            <CheckCircle size={20} className="text-green-600" />
                        ) : (
                            <ShieldAlert size={20} className="text-blue-600" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{message}</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        {cancelText || "Cancel"}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors ${
                            confirmColor === 'red' ? 'bg-red-600 hover:bg-red-700' :
                            confirmColor === 'green' ? 'bg-green-600 hover:bg-green-700' :
                            'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {confirmText || "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function BridgeAdminDashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedNav, setExpandedNav] = useState({ reports: false, merchants: false, settings: false });
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    
    // ─── Payout Status States ───
    const [payoutStatus, setPayoutStatus] = useState('active');
    const [payoutUpdatedAt, setPayoutUpdatedAt] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [toast, setToast] = useState(null);

    // ─── Confirmation Dialog States ───
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showPayoutConfirm, setShowPayoutConfirm] = useState(false);
    const [pendingPayoutAction, setPendingPayoutAction] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // ─── Toast Notification ───
    const showToast = (message, isError = false) => {
        setToast({ message, isError });
        setTimeout(() => setToast(null), 3000);
    };

    // ─── Fetch Payout Status ───
    const fetchPayoutStatus = async () => {
        setLoadingStatus(true);
        try {
            const response = await payoutSettingsService.getPayoutStatus();
            setPayoutStatus(response.value || 'active');
            setPayoutUpdatedAt(response.updated_at);
            console.log('📊 Payout status loaded:', response);
        } catch (error) {
            console.error('Error fetching payout status:', error);
            setPayoutStatus('active');
        } finally {
            setLoadingStatus(false);
        }
    };

    // ─── Handle Payout Toggle (with confirmation) ───
    const handlePayoutToggle = async () => {
        if (toggling) return;
        
        const newStatus = payoutStatus === 'active' ? 'stopped' : 'active';
        setPendingPayoutAction(newStatus);
        setShowPayoutConfirm(true);
    };

    const confirmPayoutToggle = async () => {
        setShowPayoutConfirm(false);
        const newStatus = pendingPayoutAction;
        setToggling(true);
        
        try {
            const response = await payoutSettingsService.updatePayoutStatus(newStatus);
            setPayoutStatus(response.value || newStatus);
            setPayoutUpdatedAt(response.updated_at);
            showToast(`Payouts ${newStatus === 'active' ? 'activated' : 'stopped'} successfully!`, false);
            console.log('📊 Payout status updated:', response);
        } catch (error) {
            console.error('Error toggling payout status:', error);
            showToast('Failed to update payout status', true);
        } finally {
            setToggling(false);
            setPendingPayoutAction(null);
        }
    };

    // ─── Handle Logout (with confirmation) ───
    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('bridge_admin_email');
        localStorage.removeItem('bridge_admin_remember');
        sessionStorage.clear();
        navigate('/login');
    };

    // ─── Format date ───
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // ─── Track window width ───
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ─── Close mobile menu on route change ───
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // ─── Auto-collapse sidebar on mobile ───
    useEffect(() => {
        if (windowWidth < 768) {
            setCollapsed(true);
        }
    }, [windowWidth]);

    // ─── Fetch status on mount ───
    useEffect(() => {
        fetchPayoutStatus();
    }, []);

    function isActive(item) {
        if (item.path) return location.pathname === item.path;
        if (item.sub) return item.sub.some(s => location.pathname === s.path);
        return false;
    }

    function toggleNav(id) {
        setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
    }

    // ─── Sidebar content component ───
    const SidebarContent = ({ isMobile = false, onClose }) => (
        <>
            {/* Logo */}
            <div className={`flex items-center gap-2.5 px-3 py-3 border-b border-gray-200 ${(!collapsed || isMobile) ? "justify-between" : "justify-center"}`}>
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                        <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                    </div>
                    {(!collapsed || isMobile) && (
                        <span className="text-gray-800 font-bold text-[13px] sm:text-[15px] tracking-wide">Bridge Admin</span>
                    )}
                </div>
                {isMobile && (
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                {navConfig.map(item => {
                    const active = isActive(item);
                    const isExpanded = expandedNav[item.id];
                    const showLabel = (!collapsed || isMobile);

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => {
                                    if (item.sub) {
                                        toggleNav(item.id);
                                        return;
                                    }
                                    navigate(item.path);
                                    if (isMobile) onClose?.();
                                }}
                                title={(!showLabel) ? item.label : undefined}
                                className={`w-full flex items-center ${(!showLabel) ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
                                    ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                            >
                                <div className={`flex items-center ${(!showLabel) ? "" : "gap-3"}`}>
                                    <item.Icon size={16} className="shrink-0" />
                                    {showLabel && <span className="text-[12px] sm:text-[13px] font-medium">{item.label}</span>}
                                </div>
                                {showLabel && item.hasChevron && (
                                    <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                )}
                            </button>

                            {/* Sub-items */}
                            {item.sub && isExpanded && showLabel && (
                                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
                                    {item.sub.map(sub => (
                                        <button
                                            key={sub.id}
                                            onClick={() => {
                                                navigate(sub.path);
                                                if (isMobile) onClose?.();
                                            }}
                                            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[11px] sm:text-[12px] transition-colors
                                                ${location.pathname === sub.path
                                                    ? "text-blue-600 bg-blue-50"
                                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                                        >
                                            <sub.Icon size={12} className="shrink-0" />
                                            {sub.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* ─── KILL SWITCH + LOGOUT ─── */}
            <div className="p-3 border-t border-gray-200 space-y-2">
                {/* Status Indicator (when collapsed) */}
                {collapsed && !isMobile && (
                    <div className="flex justify-center mb-1">
                        <span className={`w-2 h-2 rounded-full ${payoutStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                )}

                {/* Kill Switch Info */}
                {(!collapsed || isMobile) && (
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldAlert size={13} className="text-gray-600" />
                            <span className="text-gray-700 text-xs font-semibold">Kill Switch</span>
                            {!loadingStatus && (
                                <span className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                    payoutStatus === 'active' 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {payoutStatus === 'active' ? 'Active' : 'Stopped'}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 text-[10px] sm:text-[11px]">
                            {payoutStatus === 'active' ? 'Payouts are running' : 'All payouts stopped'}
                        </p>
                        {payoutUpdatedAt && (
                            <p className="text-[9px] text-gray-400 mt-1">
                                Updated: {formatDate(payoutUpdatedAt)}
                            </p>
                        )}
                    </div>
                )}

                {/* ─── TOGGLE BUTTON ─── */}
                <button 
                    onClick={handlePayoutToggle}
                    disabled={toggling || loadingStatus}
                    className={`w-full rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-[11px] sm:text-xs font-bold ${
                        payoutStatus === 'active' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                    } ${(toggling || loadingStatus) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {toggling ? (
                        <>
                            <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <Power size={12} sm:size={13} />
                            {(!collapsed || isMobile) && (
                                payoutStatus === 'active' ? 'STOP ALL PAYOUTS' : 'START ALL PAYOUTS'
                            )}
                        </>
                    )}
                </button>

                {/* ─── LOGOUT BUTTON ─── */}
                <button
                    onClick={handleLogoutClick}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-[11px] sm:text-xs font-bold"
                >
                    <LogOut size={12} sm:size={13} />
                    {(!collapsed || isMobile) && "LOGOUT"}
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

            {/* ─── TOAST NOTIFICATION ─── */}
            {toast && (
                <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg text-[11px] sm:text-sm ${
                    toast.isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}>
                    {!toast.isError ? <CheckCircle size={14} sm:size={18} /> : <XCircle size={14} sm:size={18} />}
                    {toast.message}
                </div>
            )}

            {/* ─── CONFIRMATION DIALOGS ─── */}

            {/* Logout Confirmation */}
            <ConfirmationDialog
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={confirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout? You will need to login again to access your dashboard."
                confirmText="Logout"
                cancelText="Cancel"
                confirmColor="red"
            />

            {/* Payout Toggle Confirmation */}
            <ConfirmationDialog
                isOpen={showPayoutConfirm}
                onClose={() => setShowPayoutConfirm(false)}
                onConfirm={confirmPayoutToggle}
                title={payoutStatus === 'active' ? "Stop All Payouts?" : "Start All Payouts?"}
                message={payoutStatus === 'active' 
                    ? "Are you sure you want to stop all payouts? This will prevent any new payout requests from being processed."
                    : "Are you sure you want to start all payouts? This will allow new payout requests to be processed."
                }
                confirmText={payoutStatus === 'active' ? "Yes, Stop Payouts" : "Yes, Start Payouts"}
                cancelText="Cancel"
                confirmColor={payoutStatus === 'active' ? "red" : "green"}
            />

            {/* ─── DESKTOP SIDEBAR ─── */}
            <aside className={`hidden md:flex flex-col bg-white shadow-lg shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200
                ${collapsed ? "w-16" : "w-56"}`}>
                <SidebarContent isMobile={false} />
            </aside>

            {/* ─── MOBILE OVERLAY ─── */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* ─── MOBILE SIDEBAR ─── */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full bg-white shadow-xl flex flex-col
                transition-transform duration-300 ease-in-out md:hidden
                ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                w-64
            `}>
                <SidebarContent isMobile={true} onClose={() => setMobileMenuOpen(false)} />
            </aside>

            {/* ─── MAIN ─── */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 shrink-0 h-12 sm:h-14">
                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setMobileMenuOpen(true)} 
                        className="md:hidden text-gray-400 hover:text-gray-600 p-1"
                    >
                        <Menu size={20} />
                    </button>
                    
                    {/* Desktop collapse button */}
                    <button 
                        onClick={() => setCollapsed(!collapsed)} 
                        className="hidden md:block text-gray-400 hover:text-gray-600 p-1"
                    >
                        <Menu size={20} />
                    </button>
                    
                    <div className="flex-1 max-w-full sm:max-w-lg relative">
                        <Search size={13} sm:size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            className="w-full pl-8 sm:pl-9 pr-12 sm:pr-16 py-1.5 sm:py-2 bg-gray-100 rounded-lg text-[11px] sm:text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Search by Merchant / Transaction ID"
                        />
                        <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] text-gray-300 border border-gray-200 rounded px-1 hidden sm:block">⌘ K</kbd>
                    </div>

                    <div className="ml-auto flex items-center gap-2 sm:gap-4">
                        {/* Payout Status Indicator */}
                        {!loadingStatus && (
                            <div className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium ${
                                payoutStatus === 'active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    payoutStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
                                }`} />
                                {payoutStatus === 'active' ? 'Active' : 'Stopped'}
                            </div>
                        )}
                    </div>
                </header>

                {/* ─── OUTLET ─── */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50">
                    <Outlet />
                </main>
            </div>

            {/* CSS Animation */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-\\[fadeIn_0\\.2s_ease\\] {
                    animation: fadeIn 0.2s ease;
                }
            `}</style>
        </div>
    );
}
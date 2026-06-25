// // import { useState } from "react";
// // import { useNavigate, useLocation, Outlet } from "react-router-dom";
// // import {
// //     House, CreditCard, Store, Zap, GitBranch, RefreshCw,
// //     FileText, Webhook, Bell, Settings, ChevronDown, Search, Menu,
// //     ShieldAlert, UserCheck, AlertTriangle, Power, Database,
// //     Receipt, DollarSign, Calendar, FileBarChart, ChartNoAxesCombined,
// //     Wrench, LogOut, Shield, User
// // } from "lucide-react";

// // const navConfig = [
// //     { id: "dashboard",    path: "/dashboard",    label: "Dashboard",    Icon: House },
// //     { id: "transactions", path: "/transactions", label: "Transactions", Icon: CreditCard },
// //     { id: "all-merchant",path: "/all-merchant", label: "Merchant", Icon: Store},
// //     { id: "payout-apis",  path: "/payout-apis",  label: "Payout APIs", Icon: Zap },
// //     { id: "routing",      path: "/routing",      label: "Routing",     Icon: GitBranch },
// //     { id: "auto-payout",  path: "/auto-payout",  label: "Auto Pay",    Icon: RefreshCw },
// //     {
// //         id: "reports", label: "Reports", Icon: FileBarChart, hasChevron: true,
// //         sub: [
// //             { id: "transaction-report", path: "/transaction-report", label: "Transaction Reports",    Icon: Receipt },
// //             { id: "merchant-report",    path: "/merchant-report",    label: "Merchant Reports",       Icon: Store },
// //             { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
// //             { id: "settlement-report",  path: "/settlement-report",  label: "Settlement Reports",     Icon: Calendar },
// //             { id: "success-failure",    path: "/success-failure",    label: "Success/Failure Reports",Icon: ChartNoAxesCombined },
// //         ]
// //     },
// //     {
// //         id: "settings", label: "Settings", Icon: Settings, hasChevron: true,
// //         sub: [
// //             { id: "change-password", path: "/change-password", label: "Change Password", Icon: UserCheck },
// //         ]
// //     },
// // ];

// // function PlaceholderPage({ title }) {
// //     return (
// //         <div className="p-6">
// //             <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
// //             <div className="mt-8 flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
// //                 <Database size={48} />
// //                 <p className="text-base">This section is under construction</p>
// //             </div>
// //         </div>
// //     );
// // }

// // export default function BridgeAdminDashboard() {
// //     const [collapsed, setCollapsed] = useState(false);
// //     const [expandedNav, setExpandedNav] = useState({ reports: false, merchants: false, settings: false });
// //     const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const handleLogout = () => {
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('isLoggedIn');
// //         localStorage.removeItem('userEmail');
// //         localStorage.removeItem('bridge_admin_email');
// //         localStorage.removeItem('bridge_admin_remember');
// //         sessionStorage.clear();
// //         navigate('/login');
// //     };

// //     function isActive(item) {
// //         if (item.path) return location.pathname === item.path;
// //         // Parent active agar koi bhi sub-item active ho
// //         if (item.sub) return item.sub.some(s => location.pathname === s.path);
// //         return false;
// //     }

// //     function toggleNav(id) {
// //         setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
// //     }

// //     return (
// //         <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

// //             {/* ── SIDEBAR ── */}
// //             <aside className={`${collapsed ? "w-16" : "w-56"} bg-white shadow-lg flex flex-col shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200`}>

// //                 {/* Logo */}
// //                 <div className={`flex items-center gap-2.5 px-3 py-3 border-b border-gray-200 ${collapsed ? "justify-center" : ""}`}>
// //                     <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
// //                         <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
// //                             <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
// //                         </svg>
// //                     </div>
// //                     {!collapsed && <span className="text-gray-800 font-bold text-[15px] tracking-wide">Bridge Admin</span>}
// //                 </div>

// //                 {/* Nav */}
// //                 <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
// //                     {navConfig.map(item => {
// //                         const active = isActive(item);
// //                         const isExpanded = expandedNav[item.id];

// //                         return (
// //                             <div key={item.id}>
// //                                 <button
// //                                     onClick={() => {
// //                                         if (item.sub) {
// //                                             toggleNav(item.id);
// //                                             return; // sirf expand/collapse, navigate nahi
// //                                         }
// //                                         navigate(item.path);
// //                                     }}
// //                                     title={collapsed ? item.label : undefined}
// //                                     className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
// //                                         ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
// //                                 >
// //                                     <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
// //                                         <item.Icon size={16} className="flex-shrink-0" />
// //                                         {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
// //                                     </div>
// //                                     {!collapsed && item.hasChevron && (
// //                                         <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
// //                                     )}
// //                                 </button>

// //                                 {/* Sub-items */}
// //                                 {item.sub && isExpanded && !collapsed && (
// //                                     <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
// //                                         {item.sub.map(sub => (
// //                                             <button
// //                                                 key={sub.id}
// //                                                 onClick={() => navigate(sub.path)}
// //                                                 className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] transition-colors
// //                                                     ${location.pathname === sub.path
// //                                                         ? "text-blue-600 bg-blue-50"
// //                                                         : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
// //                                             >
// //                                                 <sub.Icon size={13} className="shrink-0" />
// //                                                 {sub.label}
// //                                             </button>
// //                                         ))}
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         );
// //                     })}
// //                 </nav>

// //                 {/* Kill Switch + Logout */}
// //                 <div className="p-3 border-t border-gray-200 space-y-2">
// //                     {!collapsed && (
// //                         <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
// //                             <div className="flex items-center gap-2 mb-1">
// //                                 <ShieldAlert size={13} className="text-gray-600" />
// //                                 <span className="text-gray-700 text-xs font-semibold">Kill Switch</span>
// //                             </div>
// //                             <p className="text-gray-500 text-[11px]">Stop all payouts instantly</p>
// //                         </div>
// //                     )}
// //                     <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-xs font-bold">
// //                         <Power size={13} />
// //                         {!collapsed && "STOP ALL PAYOUTS"}
// //                     </button>
// //                     <button
// //                         onClick={handleLogout}
// //                         className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-xs font-bold"
// //                     >
// //                         <LogOut size={13} />
// //                         {!collapsed && "LOGOUT"}
// //                     </button>
// //                 </div>
// //             </aside>

// //             {/* ── MAIN ── */}
// //             <div className="flex-1 flex flex-col overflow-hidden">

// //                 {/* Topbar */}
// //                 <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-4 shrink-0 h-14">
// //                     <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-gray-600 p-1">
// //                         <Menu size={20} />
// //                     </button>
// //                     <div className="flex-1 max-w-lg relative">
// //                         <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //                         <input
// //                             className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100"
// //                             placeholder="Search by API name / Merchant / Transaction ID"
// //                         />
// //                         <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 border border-gray-200 rounded px-1">⌘ K</kbd>
// //                     </div>

// //                     <div className="ml-auto flex items-center gap-4">
// //                         <div className="relative cursor-pointer">
// //                             <Bell size={20} className="text-gray-400" />
// //                             <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">16</span>
// //                         </div>

// //                         {/* User Menu */}
// //                         <div className="relative">
// //                             <div
// //                                 className="flex items-center gap-2 cursor-pointer"
// //                                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
// //                             >
// //                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
// //                                 <div className="hidden md:block">
// //                                     <p className="text-xs font-semibold text-gray-800">Super Admin</p>
// //                                     <p className="text-[10px] text-gray-400">Administrator</p>
// //                                 </div>
// //                                 <ChevronDown size={13} className="text-gray-400" />
// //                             </div>

// //                             {isUserMenuOpen && (
// //                                 <>
// //                                     <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
// //                                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
// //                                         <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
// //                                             <User size={14} /> Profile Settings
// //                                         </button>
// //                                         <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
// //                                             <Shield size={14} /> Security
// //                                         </button>
// //                                         <hr className="my-1" />
// //                                         <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
// //                                             <LogOut size={14} /> Logout
// //                                         </button>
// //                                     </div>
// //                                 </>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </header>

// //                 {/* ✅ Outlet — yahan nested pages render hongi */}
// //                 <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
// //                     <Outlet />
// //                 </main>
// //             </div>
// //         </div>
// //     );
// // }
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import {
//     House, CreditCard, Store, Zap, GitBranch, RefreshCw,
//     FileText, Webhook, Bell, Settings, ChevronDown, Search, Menu,
//     ShieldAlert, UserCheck, AlertTriangle, Power, Database,
//     Receipt, DollarSign, Calendar, FileBarChart, ChartNoAxesCombined,
//     Wrench, LogOut, Shield, User, X
// } from "lucide-react";

// const navConfig = [
//     { id: "dashboard",    path: "/dashboard",    label: "Dashboard",    Icon: House },
//     { id: "transactions", path: "/transactions", label: "Transactions", Icon: CreditCard },
//     { id: "all-merchant", path: "/all-merchant", label: "Merchant", Icon: Store},
//     { id: "payout-apis",  path: "/payout-apis",  label: "Payout APIs", Icon: Zap },
//     // { id: "routing",      path: "/routing",      label: "Routing",     Icon: GitBranch },
//     // { id: "auto-payout",  path: "/auto-payout",  label: "Auto Pay",    Icon: RefreshCw },
//     {
//         id: "reports", label: "Reports", Icon: FileBarChart, hasChevron: true,
//         sub: [
//             // { id: "transaction-report", path: "/transaction-report", label: "Transaction Reports",    Icon: Receipt },
//             // { id: "merchant-report",    path: "/merchant-report",    label: "Merchant Reports",       Icon: Store },
//             { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
//             // { id: "settlement-report",  path: "/settlement-report",  label: "Settlement Reports",     Icon: Calendar },
//             // { id: "success-failure",    path: "/success-failure",    label: "Success/Failure Reports",Icon: ChartNoAxesCombined },
//         ]
//     },
//     {
//         id: "settings", label: "Settings", Icon: Settings, hasChevron: true,
//         sub: [
//             { id: "change-password", path: "/change-password", label: "Change Password", Icon: UserCheck },
//         ]
//     },
// ];

// function PlaceholderPage({ title }) {
//     return (
//         <div className="p-4 sm:p-6">
//             <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{title}</h1>
//             <div className="mt-8 flex flex-col items-center justify-center h-48 sm:h-64 text-gray-300 gap-3">
//                 <Database size={40} sm:size={48} />
//                 <p className="text-sm sm:text-base">This section is under construction</p>
//             </div>
//         </div>
//     );
// }

// export default function BridgeAdminDashboard() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [expandedNav, setExpandedNav] = useState({ reports: false, merchants: false, settings: false });
//     const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

//     const navigate = useNavigate();
//     const location = useLocation();

//     // Track window width for responsive behavior
//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Close mobile menu on route change
//     useEffect(() => {
//         setMobileMenuOpen(false);
//     }, [location.pathname]);

//     // Auto-collapse sidebar on mobile
//     useEffect(() => {
//         if (windowWidth < 768) {
//             setCollapsed(true);
//         }
//     }, [windowWidth]);

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

//     // Sidebar content component (reused for both desktop and mobile)
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
//                                     <item.Icon size={16} className="flex-shrink-0" />
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

//             {/* Kill Switch + Logout */}
//             <div className="p-3 border-t border-gray-200 space-y-2">
//                 {(!collapsed || isMobile) && (
//                     <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
//                         <div className="flex items-center gap-2 mb-1">
//                             <ShieldAlert size={13} className="text-gray-600" />
//                             <span className="text-gray-700 text-xs font-semibold">Kill Switch</span>
//                         </div>
//                         <p className="text-gray-500 text-[10px] sm:text-[11px]">Stop all payouts instantly</p>
//                     </div>
//                 )}
//                 <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-[11px] sm:text-xs font-bold">
//                     <Power size={13} />
//                     {(!collapsed || isMobile) && "STOP ALL PAYOUTS"}
//                 </button>
//                 <button
//                     onClick={handleLogout}
//                     className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-[11px] sm:text-xs font-bold"
//                 >
//                     <LogOut size={13} />
//                     {(!collapsed || isMobile) && "LOGOUT"}
//                 </button>
//             </div>
//         </>
//     );

//     return (
//         <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

//             {/* DESKTOP SIDEBAR - hidden on mobile */}
//             <aside className={`hidden md:flex flex-col bg-white shadow-lg shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200
//                 ${collapsed ? "w-16" : "w-56"}`}>
//                 <SidebarContent isMobile={false} />
//             </aside>

//             {/* MOBILE OVERLAY */}
//             {mobileMenuOpen && (
//                 <div 
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//                     onClick={() => setMobileMenuOpen(false)}
//                 />
//             )}

//             {/* MOBILE SIDEBAR - slides from left */}
//             <aside className={`
//                 fixed top-0 left-0 z-50 h-full bg-white shadow-xl flex flex-col
//                 transition-transform duration-300 ease-in-out md:hidden
//                 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//                 w-64
//             `}>
//                 <SidebarContent isMobile={true} onClose={() => setMobileMenuOpen(false)} />
//             </aside>

//             {/* ── MAIN ── */}
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
//                             placeholder="Search by API name / Merchant / Transaction ID"
//                         />
//                         <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] text-gray-300 border border-gray-200 rounded px-1 hidden sm:block">⌘ K</kbd>
//                     </div>

//                     <div className="ml-auto flex items-center gap-2 sm:gap-4">
                       
//                         {/* User Menu */}
//                         <div className="relative">
//                             <div
//                                 className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
//                                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                             >
//                                 <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">SA</div>
//                                 <div className="hidden sm:block">
//                                     <p className="text-[11px] sm:text-xs font-semibold text-gray-800">Super Admin</p>
//                                     <p className="text-[9px] sm:text-[10px] text-gray-400">Administrator</p>
//                                 </div>
//                                 <ChevronDown size={11} sm:size={13} className="text-gray-400" />
//                             </div>

//                             {isUserMenuOpen && (
//                                 <>
//                                     <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
//                                     <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
//                                         <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
//                                             <User size={12} sm:size={14} /> Profile Settings
//                                         </button>
//                                         <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
//                                             <Shield size={12} sm:size={14} /> Security
//                                         </button>
//                                         <hr className="my-1" />
//                                         <button onClick={handleLogout} className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
//                                             <LogOut size={12} sm:size={14} /> Logout
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </header>

//                 {/* ✅ Outlet — yahan nested pages render hongi */}
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
    // { id: "routing",      path: "/routing",      label: "Routing",     Icon: GitBranch },
    // { id: "auto-payout",  path: "/auto-payout",  label: "Auto Pay",    Icon: RefreshCw },
    {
        id: "reports", label: "Reports", Icon: FileBarChart, hasChevron: true,
        sub: [
            // { id: "transaction-report", path: "/transaction-report", label: "Transaction Reports",    Icon: Receipt },
            // { id: "merchant-report",    path: "/merchant-report",    label: "Merchant Reports",       Icon: Store },
            { id: "payout-report",      path: "/payout-report",      label: "Payout Reports",         Icon: DollarSign },
            // { id: "settlement-report",  path: "/settlement-report",  label: "Settlement Reports",     Icon: Calendar },
            // { id: "success-failure",    path: "/success-failure",    label: "Success/Failure Reports",Icon: ChartNoAxesCombined },
        ]
    },
    {
        id: "settings", label: "Settings", Icon: Settings, hasChevron: true,
        sub: [
            { id: "change-password", path: "/change-password", label: "Change Password", Icon: UserCheck },
        ]
    },
];

function PlaceholderPage({ title }) {
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{title}</h1>
            <div className="mt-8 flex flex-col items-center justify-center h-48 sm:h-64 text-gray-300 gap-3">
                <Database size={40} sm:size={48} />
                <p className="text-sm sm:text-base">This section is under construction</p>
            </div>
        </div>
    );
}

export default function BridgeAdminDashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedNav, setExpandedNav] = useState({ reports: false, merchants: false, settings: false });
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    
    // ─── Payout Status States ───
    const [payoutStatus, setPayoutStatus] = useState('active');
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [toast, setToast] = useState(null);

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
            setPayoutStatus(response.status);
        } catch (error) {
            console.error('Error fetching payout status:', error);
            // Fallback to default
            setPayoutStatus('active');
        } finally {
            setLoadingStatus(false);
        }
    };

    // ─── Handle Payout Toggle ───
    const handlePayoutToggle = async () => {
        if (toggling) return;
        
        setToggling(true);
        const newStatus = payoutStatus === 'active' ? 'stopped' : 'active';
        
        try {
            await payoutSettingsService.updatePayoutStatus(newStatus);
            setPayoutStatus(newStatus);
            showToast(`Payouts ${newStatus === 'active' ? 'activated' : 'stopped'} successfully!`, false);
        } catch (error) {
            console.error('Error toggling payout status:', error);
            showToast('Failed to update payout status', true);
        } finally {
            setToggling(false);
        }
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('bridge_admin_email');
        localStorage.removeItem('bridge_admin_remember');
        sessionStorage.clear();
        navigate('/login');
    };

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
                                    <item.Icon size={16} className="flex-shrink-0" />
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
                    onClick={handleLogout}
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
                            placeholder="Search by API name / Merchant / Transaction ID"
                        />
                        <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] text-gray-300 border border-gray-200 rounded px-1 hidden sm:block">⌘ K</kbd>
                    </div>

                    <div className="ml-auto flex items-center gap-2 sm:gap-4">
                        {/* Bell Icon */}
                        <div className="relative cursor-pointer">
                            <Bell size={18} sm:size={20} className="text-gray-400" />
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] sm:text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">16</span>
                        </div>

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
                                {payoutStatus === 'active' ? 'Live' : 'Stopped'}
                            </div>
                        )}

                        {/* User Menu */}
                        <div className="relative">
                            <div
                                className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">SA</div>
                                <div className="hidden sm:block">
                                    <p className="text-[11px] sm:text-xs font-semibold text-gray-800">Super Admin</p>
                                    <p className="text-[9px] sm:text-[10px] text-gray-400">Administrator</p>
                                </div>
                                <ChevronDown size={11} sm:size={13} className="text-gray-400" />
                            </div>

                            {isUserMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                        <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <User size={12} sm:size={14} /> Profile Settings
                                        </button>
                                        <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <Shield size={12} sm:size={14} /> Security
                                        </button>
                                        <hr className="my-1" />
                                        <button onClick={handleLogout} className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                            <LogOut size={12} sm:size={14} /> Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ─── OUTLET ─── */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
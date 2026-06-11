// // import { useState } from "react";
// // import {
// //   House, CreditCard, Store, Zap, GitBranch, RefreshCw,
// //   Scale, FileText, GitMerge, Webhook, Bell, Users, FileCode,
// //   Settings, Monitor, ChevronDown, ChevronRight, Search, Moon, Menu,
// //   ShieldAlert, TrendingUp, TrendingDown, CheckCircle, XCircle,
// //   RotateCcw, Wallet, BarChart2, Layers, UserCheck,
// //   AlertTriangle, Info, Power, Edit, Trash2, Plus,
// //   Eye, EyeOff, Copy, MoreVertical, ArrowLeft, ExternalLink,
// //   Database, Activity, Clock, Shield, Cpu, HardDrive,
// //   PauseCircle, Download, Filter, RefreshCcw, Wrench,
// //   ChevronLeft, HelpCircle, Sun, X, Check, AlertCircle,
// // } from "lucide-react";
// // import {
// //   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
// //   PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
// // } from "recharts";
// // import DashboardPage from "../pages/Dashboard";
// // import TransactionScreen from "../pages/TransactionSceen";
// // import ApiProvidersPage from "../pages/payoutApis/ApiProvider";
// // import ApiProviderDetail from "../pages/payoutApis/ApiProviderDetails";
// // import MerchantListPage from "../pages/merchant/merchantList";
// // import MerchantDetailsPage from "../pages/merchant/merchantDetails";
// // import AutoPayout from "../pages/AutoPayout";
// // import PayoutRouting from "../pages/Routing";
// // import ReportsOverview from "../pages/reports/TransactionReports";


// // const navConfig = [
// //   { id: "dashboard", label: "Dashboard", Icon: House },
// //   { id: "transactions", label: "Transactions", Icon: CreditCard },
// //   { id: "merchants", label: "Merchants", Icon: Store, },
// //   { id: "payout-apis", label: "Payout APIs", Icon: Zap, },
// //   { id: "routing", label: "Routing", Icon: GitBranch, },
// //   { id: "auto-payout", label: "Auto Pay", Icon: RefreshCw },
// //   {
// //     id: "reports", label: "Reports", Icon: FileText, hasChevron: true,
// //     sub: [

// //       {
// //         id: "transaction-report",
// //         label: "Transactions Reports",
// //         Icon: FileText
// //       },
// //       {
// //         id: "merchant-report",
// //         label: "Merchant Reports",
// //         Icon: FileText
// //       },

// //       {
// //         id: "payout-report",
// //         label: "Payout Reports",
// //         Icon: FileText
// //       },
// //       {
// //         id: "settlement-report",
// //         label: "Settlement Reports",
// //         Icon: FileText
// //       },
// //       {
// //         id: "success-failure",
// //         label: "Success/Failure Reports",
// //         Icon: FileText
// //       },

// //     ],
// //   },
// //   { id: "settings", label: "Settings", Icon: Settings },
// // ];

// // function PlaceholderPage({ title, subtitle }) {
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
// //       <p className="text-sm text-gray-400">{subtitle}</p>
// //       <div className="mt-8 flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
// //         <Database size={48} /><p className="text-base">This section is under construction</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function BridgeAdminDashboard() {
// //   const [activePage, setActivePage] = useState("dashboard");
// //   const [activeDetail, setActiveDetail] = useState(null);   // api id for detail view
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [expandedNav, setExpandedNav] = useState({ "payout-apis": false });
// //   const [selectedMerchant, setSelectedMerchant] = useState(null);


// //   function navigate(pageId) {
// //     setActivePage(pageId);
// //     setActiveDetail(null);
// //   }

// //   function toggleNav(id) {
// //     setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
// //   }

// //   function viewApiDetail(apiId) {
// //     setActivePage("api-providers");
// //     setActiveDetail(apiId);
// //   }

// //   function renderPage() {
// //     if (activePage === "dashboard") return <DashboardPage />;
// //     if (activePage === "transactions") return <TransactionScreen />;
// //     if (activePage === "auto-payout") return <AutoPayout />;
// //     if (activePage === "routing") return <PayoutRouting />;
// //     if (activePage === "transaction-report")return <ReportsOverview />;
// //     if (activePage === "payout-apis") {
// //       if (activeDetail) {
// //         return (
// //           <ApiProviderDetail
// //             apiId={activeDetail}
// //             onBack={() => setActiveDetail(null)}
// //           />
// //         );
// //       }
// //       return <ApiProvidersPage onViewDetail={(id) => setActiveDetail(id)} />;
// //     }
// //     if (activePage === "merchants") {
// //       if (selectedMerchant) {
// //         return (
// //           <MerchantDetailsPage
// //             merchant={selectedMerchant}
// //             onBack={() => setSelectedMerchant(null)}
// //           />
// //         );
// //       }
// //       return (
// //         <MerchantListPage
// //           onViewDetails={(m) => setSelectedMerchant(m)}
// //         />
// //       );
// //     }

// //     const nav = navConfig.find(n => n.id === activePage);
// //     return <PlaceholderPage title={nav?.label || activePage} subtitle="This section is under construction." />;
// //   }

// //   return (
// //     <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

// //       {/* ── SIDEBAR ── */}
// //       <aside className={`${collapsed ? "w-16" : "w-56"} bg-[#01132B] flex flex-col shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200`}>
// //         {/* Logo */}
// //         <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
// //           <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
// //             <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
// //           </div>
// //           {!collapsed && <span className="text-white font-bold text-[15px] tracking-wide">Bridge Admin</span>}
// //         </div>

// //         {/* Nav */}
// //         <nav className="flex-1 py-3 px-2 space-y-0.5">
// //           {navConfig.map(item => {
// //             const isActive = activePage === item.id || (item.sub && item.sub.some(s => s.id === activePage));
// //             const isExpanded = expandedNav[item.id];

// //             return (
// //               <div key={item.id}>
// //                 <button
// //                   onClick={() => {
// //                     if (item.sub) { toggleNav(item.id); if (!collapsed) return; }
// //                     navigate(item.id);
// //                   }}
// //                   title={collapsed ? item.label : undefined}
// //                   className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
// //                     ${isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
// //                 >
// //                   <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
// //                     <item.Icon size={16} className="flex-shrink-0" />
// //                     {!collapsed && <span className="text-[13px]">{item.label}</span>}
// //                   </div>
// //                   {!collapsed && (
// //                     item.badge
// //                       ? <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
// //                       : item.hasChevron
// //                         ? <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
// //                         : null
// //                   )}
// //                 </button>

// //                 {/* Sub-items */}
// //                 {item.sub && isExpanded && !collapsed && (
// //                   <div className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
// //                     {item.sub.map(sub => (
// //                       <button
// //                         key={sub.id}
// //                         onClick={() => navigate(sub.id)}
// //                         className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] transition-colors
// //                           ${activePage === sub.id ? "text-white bg-blue-500/50" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
// //                       >
// //                         <sub.Icon size={13} className="flex-shrink-0" />
// //                         {sub.label}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </nav>

// //         {/* Kill Switch */}
// //         <div className="p-3 border-t border-white/10">
// //           {!collapsed && (
// //             <div className="bg-[#243047] rounded-xl p-3 mb-2">
// //               <div className="flex items-center gap-2 mb-1">
// //                 <ShieldAlert size={13} className="text-gray-300" />
// //                 <span className="text-white text-xs font-semibold">Kill Switch</span>
// //               </div>
// //               <p className="text-gray-400 text-[11px]">Stop all payouts instantly</p>
// //             </div>
// //           )}
// //           <button className={`w-full bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors ${collapsed ? "p-2" : "py-2.5 text-xs font-bold"}`}>
// //             <Power size={collapsed ? 16 : 13} />
// //             {!collapsed && "STOP ALL PAYOUTS"}
// //           </button>
// //         </div>
// //       </aside>

// //       {/* ── MAIN ── */}
// //       <div className="flex-1 flex flex-col overflow-hidden">

// //         {/* Topbar */}
// //         <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-4 flex-shrink-0 h-14">
// //           <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-gray-600 p-1">
// //             <Menu size={20} />
// //           </button>
// //           <div className="flex-1 max-w-lg relative">
// //             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// //             <input className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100"
// //               placeholder="Search by API name / Merchant / Transaction ID" />
// //             <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 border border-gray-200 rounded px-1">⌘ K</kbd>
// //           </div>
// //           <div className="ml-auto flex items-center gap-4">
// //             <Sun size={18} className="text-gray-400 cursor-pointer" />
// //             <div className="relative cursor-pointer">
// //               <Bell size={20} className="text-gray-400" />
// //               <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">16</span>
// //             </div>
// //             <HelpCircle size={18} className="text-gray-400 cursor-pointer" />
// //             <Moon size={17} className="text-gray-400 cursor-pointer" />
// //             <div className="flex items-center gap-2 cursor-pointer">
// //               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
// //               <div>
// //                 <p className="text-xs font-semibold text-gray-800">Super Admin</p>
// //                 <p className="text-[10px] text-gray-400">Administrator</p>
// //               </div>
// //               <ChevronDown size={13} className="text-gray-400" />
// //             </div>
// //           </div>
// //         </header>

// //         {/* Content */}

// //         <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
// //           {renderPage()}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import {
//   House, CreditCard, Store, Zap, GitBranch, RefreshCw,
//   Scale, FileText, GitMerge, Webhook, Bell, Users, FileCode,
//   Settings, Monitor, ChevronDown, ChevronRight, Search, Moon, Menu,
//   ShieldAlert, TrendingUp, TrendingDown, CheckCircle, XCircle,
//   RotateCcw, Wallet, BarChart2, Layers, UserCheck,
//   AlertTriangle, Info, Power, Edit, Trash2, Plus,
//   Eye, EyeOff, Copy, MoreVertical, ArrowLeft, ExternalLink,
//   Database, Activity, Clock, Shield, Cpu, HardDrive,
//   PauseCircle, Download, Filter, RefreshCcw, Wrench,
//   ChevronLeft, HelpCircle, Sun, X, Check, AlertCircle,
//   Receipt, DollarSign, Calendar,
//   FileBarChart, FileSpreadsheet, ChartNoAxesCombined,
//   ReceiptText, FileCheck, FileWarning, FilePieChart
// } from "lucide-react";
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
// } from "recharts";
// import DashboardPage from "../pages/Dashboard";
// import TransactionScreen from "../pages/TransactionSceen";
// import ApiProvidersPage from "../pages/payoutApis/ApiProvider";
// import ApiProviderDetail from "../pages/payoutApis/ApiProviderDetails";
// import MerchantListPage from "../pages/merchant/merchantList";
// import MerchantDetailsPage from "../pages/merchant/merchantDetails";
// import AutoPayout from "../pages/AutoPayout";
// import PayoutRouting from "../pages/Routing";
// import ReportsOverview from "../pages/reports/TransactionReports";
// import MerchantReport from "../pages/reports/MerchantReports";
// import PayoutReport from "../pages/reports/PayoutReports";
// import SettlementReport from "../pages/reports/SettlementReports";
// import { useNavigate } from 'react-router-dom';




// const navConfig = [
//   { id: "dashboard", label: "Dashboard", Icon: House },
//   { id: "transactions", label: "Transactions", Icon: CreditCard },
//   { id: "merchants", label: "Merchants", Icon: Store },
//   { id: "payout-apis", label: "Payout APIs", Icon: Zap },
//   { id: "routing", label: "Routing", Icon: GitBranch },
//   { id: "auto-payout", label: "Auto Pay", Icon: RefreshCw },
//   {
//     id: "reports",
//     label: "Reports",
//     Icon: FileBarChart,  // Main reports icon
//     hasChevron: true,
//     sub: [
//       {
//         id: "transaction-report",
//         label: "Transactions Reports",
//         Icon: Receipt  // Transaction receipt icon
//       },
//       {
//         id: "merchant-report",
//         label: "Merchant Reports",
//         Icon: Store  // Merchant/store icon
//       },
//       {
//         id: "payout-report",
//         label: "Payout Reports",
//         Icon: DollarSign  // Money/payout icon
//       },
//       {
//         id: "settlement-report",
//         label: "Settlement Reports",
//         Icon: Calendar  // Calendar/settlement icon
//       },
//       {
//         id: "success-failure",
//         label: "Success/Failure Reports",
//         Icon: ChartNoAxesCombined  // Success/failure analytics icon
//       },
//     ],
//   },
//   { id: "settings", label: "Settings", Icon: Settings },
// ];

// function PlaceholderPage({ title, subtitle }) {
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
//       <p className="text-sm text-gray-400">{subtitle}</p>
//       <div className="mt-8 flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
//         <Database size={48} />
//         <p className="text-base">This section is under construction</p>
//       </div>
//     </div>
//   );
// }

// export default function BridgeAdminDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [activeDetail, setActiveDetail] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const [expandedNav, setExpandedNav] = useState({ "reports": false, "payout-apis": false });
//   const [selectedMerchant, setSelectedMerchant] = useState(null);
//   const navigateLogout = useNavigate();

//   const handleLogout = () => {
//     // Navigate to logout screen
//     navigate('/logout');
//   };

//   function navigate(pageId) {
//     setActivePage(pageId);
//     setActiveDetail(null);
//   }

//   function toggleNav(id) {
//     setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
//   }

//   function viewApiDetail(apiId) {
//     setActivePage("api-providers");
//     setActiveDetail(apiId);
//   }

//   function renderPage() {
//     if (activePage === "dashboard") return <DashboardPage />;
//     if (activePage === "transactions") return <TransactionScreen />;
//     if (activePage === "auto-payout") return <AutoPayout />;
//     if (activePage === "routing") return <PayoutRouting />;
//     if (activePage === "transaction-report") return <ReportsOverview />;
//     if (activePage === "merchant-report") return <MerchantReport />;
//     if (activePage === "payout-report") return <PayoutReport />;
//     if (activePage === "settlement-report") return <SettlementReport />;
//     if (activePage === "success-failure") return <PlaceholderPage title="Success/Failure Reports" subtitle="Monitor transaction success rates" />;
//     if (activePage === "payout-apis") {
//       if (activeDetail) {
//         return (
//           <ApiProviderDetail
//             apiId={activeDetail}
//             onBack={() => setActiveDetail(null)}
//           />
//         );
//       }
//       return <ApiProvidersPage onViewDetail={(id) => setActiveDetail(id)} />;
//     }
//     if (activePage === "merchants") {
//       if (selectedMerchant) {
//         return (
//           <MerchantDetailsPage
//             merchant={selectedMerchant}
//             onBack={() => setSelectedMerchant(null)}
//           />
//         );
//       }
//       return (
//         <MerchantListPage
//           onViewDetails={(m) => setSelectedMerchant(m)}
//         />
//       );
//     }

//     const nav = navConfig.find(n => n.id === activePage);
//     return <PlaceholderPage title={nav?.label || activePage} subtitle="This section is under construction." />;
//   }

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

//       {/* ── SIDEBAR WITH WHITE BACKGROUND ── */}
//       <aside className={`${collapsed ? "w-16" : "w-56"} bg-white shadow-lg flex flex-col shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200`}>
//         {/* Logo */}
//         <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-gray-200 ${collapsed ? "justify-center" : ""}`}>
//           <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
//             <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
//           </div>
//           {!collapsed && <span className="text-gray-800 font-bold text-[15px] tracking-wide">Bridge Admin</span>}
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 py-3 px-2 space-y-0.5">
//           {navConfig.map(item => {
//             const isActive = activePage === item.id || (item.sub && item.sub.some(s => s.id === activePage));
//             const isExpanded = expandedNav[item.id];

//             return (
//               <div key={item.id}>
//                 <button
//                   onClick={() => {
//                     if (item.sub) {
//                       toggleNav(item.id);
//                       if (!collapsed) return;
//                     }
//                     navigate(item.id);
//                   }}
//                   title={collapsed ? item.label : undefined}
//                   className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
//                     ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
//                 >
//                   <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
//                     <item.Icon size={16} className="flex-shrink-0" />
//                     {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
//                   </div>
//                   {!collapsed && (
//                     item.badge
//                       ? <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
//                       : item.hasChevron
//                         ? <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
//                         : null
//                   )}
//                 </button>

//                 {/* Sub-items */}
//                 {item.sub && isExpanded && !collapsed && (
//                   <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
//                     {item.sub.map(sub => (
//                       <button
//                         key={sub.id}
//                         onClick={() => navigate(sub.id)}
//                         className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] transition-colors
//                           ${activePage === sub.id ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
//                       >
//                         <sub.Icon size={13} className="shrink-0" />
//                         {sub.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Kill Switch */}
//         <div className="p-3 border-t border-gray-200">
//           {!collapsed && (
//             <div className="bg-gray-50 rounded-xl p-3 mb-2 border border-gray-200">
//               <div className="flex items-center gap-2 mb-1">
//                 <ShieldAlert size={13} className="text-gray-600" />
//                 <span className="text-gray-700 text-xs font-semibold">Kill Switch</span>
//               </div>
//               <p className="text-gray-500 text-[11px]">Stop all payouts instantly</p>
//             </div>
//           )}
//           <button className={`w-full bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors ${collapsed ? "p-2" : "py-2.5 text-xs font-bold"}`}>
//             <Power size={collapsed ? 16 : 13} />
//             {!collapsed && "STOP ALL PAYOUTS"}
//           </button>
//         </div>

//         {/* Logout Button - ADD THIS */}
//         <button
//           onClick={handleLogout}
//           className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-xs font-bold"
//         >
//           <LogOut size={13} />
//           LOGOUT
//         </button>
//       </aside>

//       {/* ── MAIN ── */}
//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Topbar */}
//         <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-4 flex-shrink-0 h-14">
//           <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-gray-600 p-1">
//             <Menu size={20} />
//           </button>
//           <div className="flex-1 max-w-lg relative">
//             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100"
//               placeholder="Search by API name / Merchant / Transaction ID" />
//             <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 border border-gray-200 rounded px-1">⌘ K</kbd>
//           </div>
//           <div className="ml-auto flex items-center gap-4">
//             <Sun size={18} className="text-gray-400 cursor-pointer" />
//             <div className="relative cursor-pointer">
//               <Bell size={20} className="text-gray-400" />
//               <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">16</span>
//             </div>
//             <HelpCircle size={18} className="text-gray-400 cursor-pointer" />
//             <Moon size={17} className="text-gray-400 cursor-pointer" />
//             <div className="flex items-center gap-2 cursor-pointer">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-800">Super Admin</p>
//                 <p className="text-[10px] text-gray-400">Administrator</p>
//               </div>
//               <ChevronDown size={13} className="text-gray-400" />
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  House, CreditCard, Store, Zap, GitBranch, RefreshCw,
  Scale, FileText, GitMerge, Webhook, Bell, Users, FileCode,
  Settings, Monitor, ChevronDown, ChevronRight, Search, Moon, Menu,
  ShieldAlert, TrendingUp, TrendingDown, CheckCircle, XCircle,
  RotateCcw, Wallet, BarChart2, Layers, UserCheck,
  AlertTriangle, Info, Power, Edit, Trash2, Plus,
  Eye, EyeOff, Copy, MoreVertical, ArrowLeft, ExternalLink,
  Database, Activity, Clock, Shield, Cpu, HardDrive,
  PauseCircle, Download, Filter, RefreshCcw, Wrench,
  ChevronLeft, HelpCircle, Sun, X, Check, AlertCircle,
  Receipt, DollarSign, Calendar,
  FileBarChart, FileSpreadsheet, ChartNoAxesCombined,
  ReceiptText, FileCheck, FileWarning, FilePieChart,
  LogOut  // ← ADD THIS IMPORT
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
} from "recharts";
import DashboardPage from "../pages/Dashboard";
import TransactionScreen from "../pages/TransactionSceen";
import ApiProvidersPage from "../pages/payoutApis/ApiProvider";
import ApiProviderDetail from "../pages/payoutApis/ApiProviderDetails";
import MerchantListPage from "../pages/merchant/merchantList";
import MerchantDetailsPage from "../pages/merchant/merchantDetails";
import AutoPayout from "../pages/AutoPayout";
import PayoutRouting from "../pages/Routing";
import ReportsOverview from "../pages/reports/TransactionReports";
import MerchantReport from "../pages/reports/MerchantReports";
import PayoutReport from "../pages/reports/PayoutReports";
import SettlementReport from "../pages/reports/SettlementReports";
import { useNavigate } from 'react-router-dom';

const navConfig = [
  { id: "dashboard", label: "Dashboard", Icon: House },
  { id: "transactions", label: "Transactions", Icon: CreditCard },
  { id: "merchants", label: "Merchants", Icon: Store },
  { id: "payout-apis", label: "Payout APIs", Icon: Zap },
  { id: "routing", label: "Routing", Icon: GitBranch },
  { id: "auto-payout", label: "Auto Pay", Icon: RefreshCw },
  {
    id: "reports",
    label: "Reports",
    Icon: FileBarChart,
    hasChevron: true,
    sub: [
      {
        id: "transaction-report",
        label: "Transactions Reports",
        Icon: Receipt
      },
      {
        id: "merchant-report",
        label: "Merchant Reports",
        Icon: Store
      },
      {
        id: "payout-report",
        label: "Payout Reports",
        Icon: DollarSign
      },
      {
        id: "settlement-report",
        label: "Settlement Reports",
        Icon: Calendar
      },
      {
        id: "success-failure",
        label: "Success/Failure Reports",
        Icon: ChartNoAxesCombined
      },
    ],
  },
  { id: "settings", label: "Settings", Icon: Settings },
];

function PlaceholderPage({ title, subtitle }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
      <p className="text-sm text-gray-400">{subtitle}</p>
      <div className="mt-8 flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
        <Database size={48} />
        <p className="text-base">This section is under construction</p>
      </div>
    </div>
  );
}

export default function BridgeAdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [activeDetail, setActiveDetail] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedNav, setExpandedNav] = useState({ "reports": false, "payout-apis": false });
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Add this for user menu
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('bridge_admin_email');
    localStorage.removeItem('bridge_admin_remember');
    sessionStorage.clear();
    
    // Navigate to logout screen
    navigate('/logout');
  };

  function navigatePage(pageId) {
    setActivePage(pageId);
    setActiveDetail(null);
  }

  function toggleNav(id) {
    setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function renderPage() {
    if (activePage === "dashboard") return <DashboardPage />;
    if (activePage === "transactions") return <TransactionScreen />;
    if (activePage === "auto-payout") return <AutoPayout />;
    if (activePage === "routing") return <PayoutRouting />;
    if (activePage === "transaction-report") return <ReportsOverview />;
    if (activePage === "merchant-report") return <MerchantReport />;
    if (activePage === "payout-report") return <PayoutReport />;
    if (activePage === "settlement-report") return <SettlementReport />;
    if (activePage === "success-failure") return <PlaceholderPage title="Success/Failure Reports" subtitle="Monitor transaction success rates" />;
    if (activePage === "payout-apis") {
      if (activeDetail) {
        return (
          <ApiProviderDetail
            apiId={activeDetail}
            onBack={() => setActiveDetail(null)}
          />
        );
      }
      return <ApiProvidersPage onViewDetail={(id) => setActiveDetail(id)} />;
    }
    if (activePage === "merchants") {
      if (selectedMerchant) {
        return (
          <MerchantDetailsPage
            merchant={selectedMerchant}
            onBack={() => setSelectedMerchant(null)}
          />
        );
      }
      return (
        <MerchantListPage
          onViewDetails={(m) => setSelectedMerchant(m)}
        />
      );
    }

    const nav = navConfig.find(n => n.id === activePage);
    return <PlaceholderPage title={nav?.label || activePage} subtitle="This section is under construction." />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

      {/* ── SIDEBAR WITH WHITE BACKGROUND ── */}
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-white shadow-lg flex flex-col shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200`}>
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-gray-200 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
          </div>
          {!collapsed && <span className="text-gray-800 font-bold text-[15px] tracking-wide">Bridge Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navConfig.map(item => {
            const isActive = activePage === item.id || (item.sub && item.sub.some(s => s.id === activePage));
            const isExpanded = expandedNav[item.id];

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.sub) {
                      toggleNav(item.id);
                      if (!collapsed) return;
                    }
                    navigatePage(item.id);
                  }}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
                    ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                    <item.Icon size={16} className="flex-shrink-0" />
                    {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
                  </div>
                  {!collapsed && (
                    item.badge
                      ? <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
                      : item.hasChevron
                        ? <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        : null
                  )}
                </button>

                {/* Sub-items */}
                {item.sub && isExpanded && !collapsed && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
                    {item.sub.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => navigatePage(sub.id)}
                        className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] transition-colors
                          ${activePage === sub.id ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                      >
                        <sub.Icon size={13} className="shrink-0" />
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Kill Switch and Logout Section */}
        <div className="p-3 border-t border-gray-200 space-y-2">
          {!collapsed && (
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert size={13} className="text-gray-600" />
                <span className="text-gray-700 text-xs font-semibold">Kill Switch</span>
              </div>
              <p className="text-gray-500 text-[11px]">Stop all payouts instantly</p>
            </div>
          )}
          
          {/* Kill Switch Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-xs font-bold">
            <Power size={13} />
            {!collapsed && "STOP ALL PAYOUTS"}
          </button>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-xs font-bold mt-2"
          >
            <LogOut size={13} />
            {!collapsed && "LOGOUT"}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-4 flex-shrink-0 h-14">
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-gray-600 p-1">
            <Menu size={20} />
          </button>
          <div className="flex-1 max-w-lg relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Search by API name / Merchant / Transaction ID" 
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 border border-gray-200 rounded px-1">⌘ K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Sun size={18} className="text-gray-400 cursor-pointer" />
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">16</span>
            </div>
            <HelpCircle size={18} className="text-gray-400 cursor-pointer" />
            <Moon size={17} className="text-gray-400 cursor-pointer" />
            
            {/* User Menu with Dropdown */}
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
                <div className="hidden md:block">
                  <p className="text-xs font-semibold text-gray-800">Super Admin</p>
                  <p className="text-[10px] text-gray-400">Administrator</p>
                </div>
                <ChevronDown size={13} className="text-gray-400" />
              </div>
              
              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <User size={14} />
                      Profile Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Shield size={14} />
                      Security
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
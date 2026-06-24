
// import { useState, useEffect } from "react";
// import {
//   Plus, Search, Download, RefreshCw,
//   MoreVertical, Eye, Edit2, CheckCircle, XCircle,
//   Wrench, ArrowUpDown, Database, Scale, FlaskConical,
//   FileText, Trash2, ChevronLeft, ChevronRight,
//   PauseCircle,
// } from "lucide-react";

// // ─── DATA ────────────────────────────────────────────────────────────────────

// export const apiProviders = [
//   {
//     id: "razorpayx",
//     name: "RazorpayX",
//     subtitle: "Bank Transfer API",
//     type: "Bank API",
//     logoText: "R",
//     logoColor: "#2563eb",
//     logoBg: "#dbeafe",
//     logoImg: null,
//     status: "Active",
//     priority: 1,
//     successRate: 98.45,
//     availableBalance: "₹ 8,45,210.75",
//     balanceSyncing: true,
//     dailyLimit: "₹ 10,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 6,25,430.00",
//     dailyUsagePct: 62.54,
//     dailyUsageColor: "#3b82f6",
//   },
//   {
//     id: "cashfree",
//     name: "Cashfree Payouts",
//     subtitle: "IMPS, NEFT, RTGS",
//     type: "Bank API",
//     logoText: "CF",
//     logoColor: "#166534",
//     logoBg: "#dcfce7",
//     status: "Active",
//     priority: 2,
//     successRate: 96.21,
//     availableBalance: "₹ 5,20,450.30",
//     balanceSyncing: false,
//     dailyLimit: "₹ 10,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 4,15,230.46",
//     dailyUsagePct: 41.52,
//     dailyUsageColor: "#3b82f6",
//   },
//   {
//     id: "paytm",
//     name: "Paytm Payouts",
//     subtitle: "Bank & Wallet",
//     type: "Bank API",
//     logoText: "P",
//     logoColor: "#1d4ed8",
//     logoBg: "#eff6ff",
//     status: "Active",
//     priority: 3,
//     successRate: 94.51,
//     availableBalance: "₹ 2,75,600.10",
//     balanceSyncing: false,
//     dailyLimit: "₹ 5,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 3,80,120.00",
//     dailyUsagePct: 76.02,
//     dailyUsageColor: "#3b82f6",
//   },
//   {
//     id: "easebuzz",
//     name: "Easebuzz",
//     subtitle: "NEFT, IMPS, UPI",
//     type: "Bank API",
//     logoText: "E",
//     logoColor: "#92400e",
//     logoBg: "#fef3c7",
//     status: "Maintenance",
//     priority: 4,
//     successRate: 92.10,
//     availableBalance: "₹ 0.00",
//     balanceSyncing: false,
//     dailyLimit: "₹ 5,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 5,00,000.00",
//     dailyUsagePct: 100,
//     dailyUsageColor: "#ef4444",
//   },
//   {
//     id: "yesbank",
//     name: "Yes Bank API",
//     subtitle: "NEFT, RTGS",
//     type: "Bank API",
//     logoText: "YB",
//     logoColor: "#6d28d9",
//     logoBg: "#ede9fe",
//     status: "Active",
//     priority: 5,
//     successRate: 88.20,
//     availableBalance: "₹ 3,10,780.90",
//     balanceSyncing: true,
//     dailyLimit: "₹ 10,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 2,35,640.00",
//     dailyUsagePct: 23.56,
//     dailyUsageColor: "#3b82f6",
//   },
//   {
//     id: "icici",
//     name: "ICICI Bank Transfer",
//     subtitle: "IMPS, NEFT, RTGS",
//     type: "Bank API",
//     logoText: "IC",
//     logoColor: "#991b1b",
//     logoBg: "#fee2e2",
//     status: "Inactive",
//     priority: 6,
//     successRate: 0,
//     availableBalance: "₹ 0.00",
//     balanceSyncing: false,
//     dailyLimit: "₹ 5,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 0.00",
//     dailyUsagePct: 0,
//     dailyUsageColor: "#9ca3af",
//   },
//   {
//     id: "axis",
//     name: "Axis Bank API",
//     subtitle: "IMPS, NEFT, RTGS",
//     type: "Bank API",
//     logoText: "AX",
//     logoColor: "#92400e",
//     logoBg: "#fef9c3",
//     status: "Active",
//     priority: 7,
//     successRate: 97.11,
//     availableBalance: "₹ 6,25,300.40",
//     balanceSyncing: true,
//     dailyLimit: "₹ 8,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 4,00,240.20",
//     dailyUsagePct: 50.03,
//     dailyUsageColor: "#3b82f6",
//   },
//   {
//     id: "federal",
//     name: "Federal Bank API",
//     subtitle: "NEFT, IMPS",
//     type: "Bank API",
//     logoText: "FB",
//     logoColor: "#0e7490",
//     logoBg: "#cffafe",
//     status: "Maintenance",
//     priority: 8,
//     successRate: null,
//     availableBalance: "–",
//     balanceSyncing: false,
//     dailyLimit: "₹ 5,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 0.00",
//     dailyUsagePct: 0,
//     dailyUsageColor: "#9ca3af",
//   },
//   {
//     id: "custom1",
//     name: "Custom API 1",
//     subtitle: "Bank Transfer API",
//     type: "Custom API",
//     logoText: "C1",
//     logoColor: "#065f46",
//     logoBg: "#d1fae5",
//     status: "Active",
//     priority: 9,
//     successRate: 93.75,
//     availableBalance: "₹ 1,25,600.00",
//     balanceSyncing: true,
//     dailyLimit: "₹ 3,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 1,10,300.00",
//     dailyUsagePct: 36.77,
//     dailyUsageColor: "#3b82f6",
//   },
//   {
//     id: "custom2",
//     name: "Custom API 2",
//     subtitle: "UPI Payout API",
//     type: "Custom API",
//     logoText: "C2",
//     logoColor: "#5b21b6",
//     logoBg: "#ede9fe",
//     status: "Inactive",
//     priority: 10,
//     successRate: 0,
//     availableBalance: "₹ 0.00",
//     balanceSyncing: false,
//     dailyLimit: "₹ 2,00,000.00",
//     dailyLimitEditable: true,
//     dailyUsageAmt: "₹ 0.00",
//     dailyUsagePct: 0,
//     dailyUsageColor: "#9ca3af",
//   },
// ];

// // ─── STATUS CONFIG ────────────────────────────────────────────────────────────

// const STATUS_STYLES = {
//   Active:      { dot: "bg-green-500",  badge: "bg-green-50 text-green-700 border border-green-200" },
//   Inactive:    { dot: "bg-red-500",    badge: "bg-red-50 text-red-700 border border-red-200" },
//   Maintenance: { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-600 border border-orange-200" },
// };

// // ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// function ApiLogo({ api }) {
//   return (
//     <div
//       className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-extrabold text-[10px] sm:text-xs flex-shrink-0 select-none"
//       style={{ background: api.logoBg, color: api.logoColor }}
//     >
//       {api.logoText}
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const s = STATUS_STYLES[status] || STATUS_STYLES.Inactive;
//   return (
//     <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${s.badge}`}>
//       <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${s.dot}`} />
//       {status}
//     </span>
//   );
// }

// function SuccessRateCell({ rate }) {
//   if (rate === null || rate === undefined) return <span className="text-sm text-gray-300">—</span>;
//   if (rate === 0) return <span className="text-xs sm:text-sm text-gray-400">0.00%</span>;
//   const color = rate >= 95 ? "#22c55e" : rate >= 90 ? "#3b82f6" : "#f97316";
//   return (
//     <div className="space-y-0.5 sm:space-y-1">
//       <span className="text-[11px] sm:text-sm font-semibold text-gray-800">{rate.toFixed(2)}%</span>
//       <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
//         <div className="h-full rounded-full" style={{ width: `${rate}%`, background: color }} />
//       </div>
//     </div>
//   );
// }

// function UsageCell({ api }) {
//   const pct = api.dailyUsagePct;
//   return (
//     <div className="space-y-0.5 sm:space-y-1">
//       <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-gray-700">
//         {api.dailyUsageAmt}
//       </div>
//       <div className="w-20 sm:w-28 h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
//         <div
//           className="h-full rounded-full transition-all"
//           style={{ width: `${Math.min(pct, 100)}%`, background: api.dailyUsageColor }}
//         />
//       </div>
//       <span className="text-[9px] sm:text-[11px] text-gray-400">{pct.toFixed(2)}%</span>
//     </div>
//   );
// }

// function ActionMenu({ api, onViewDetail, onClose }) {
//   const items = [
//     { Icon: Eye, label: "View Details", color: "text-gray-700", action: "view" },
//     { Icon: Edit2, label: "Edit API", color: "text-gray-700", action: "edit" },
//     { Icon: CheckCircle, label: "Enable API", color: "text-green-600", action: "enable" },
//     { Icon: XCircle, label: "Disable API", color: "text-orange-500", action: "disable" },
//     { Icon: Wrench, label: "Maintenance Mode", color: "text-purple-600", action: "maint" },
//     { Icon: ArrowUpDown, label: "Set Priority", color: "text-gray-700", action: "priority" },
//     { Icon: Database, label: "API Balances", color: "text-gray-700", action: "balances" },
//     { Icon: Scale, label: "API Limits", color: "text-gray-700", action: "limits" },
//     { Icon: FlaskConical, label: "Test API", color: "text-gray-700", action: "test" },
//     { Icon: FileText, label: "View Logs", color: "text-gray-700", action: "logs" },
//     { Icon: Trash2, label: "Delete API", color: "text-red-600", action: "delete", divider: true },
//   ];
  
//   const handleAction = (action) => {
//     onClose();
//     if (action === "view") {
//       onViewDetail(api.id);
//     }
//   };
  
//   return (
//     <div className="absolute right-0 top-8 w-48 sm:w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-1 overflow-hidden">
//       {items.map(({ Icon, label, color, action, divider }) => (
//         <button
//           key={action}
//           onClick={() => handleAction(action)}
//           className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-[11px] sm:text-[13px] hover:bg-gray-50 transition-colors ${color} ${divider ? "border-t border-gray-100 mt-1" : ""}`}
//         >
//           <Icon size={12} sm:size={14} /> {label}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

// export default function ApiProvidersPage({ onViewDetail = () => {} }) {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [typeFilter, setTypeFilter] = useState("All Types");
//   const [openMenu, setOpenMenu] = useState(null);
//   const [page, setPage] = useState(1);
//   const perPage = 10;

//   const counts = {
//     total: apiProviders.length,
//     active: apiProviders.filter(a => a.status === "Active").length,
//     inactive: apiProviders.filter(a => a.status === "Inactive").length,
//     maintenance: apiProviders.filter(a => a.status === "Maintenance").length,
//   };

//   const filtered = apiProviders.filter(a => {
//     const ms = a.name.toLowerCase().includes(search.toLowerCase()) || a.subtitle.toLowerCase().includes(search.toLowerCase());
//     const mst = statusFilter === "All Status" || a.status === statusFilter;
//     const mt = typeFilter === "All Types" || a.type === typeFilter;
//     return ms && mst && mt;
//   });

//   const totalPages = Math.ceil(filtered.length / perPage);
//   const rows = filtered.slice((page - 1) * perPage, page * perPage);

//   return (
//     <div className="bg-gray-50 min-h-screen text-sm p-3 sm:p-0">

//       {/* ── PAGE HEADER ── */}
//       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">API Providers</h1>
//           <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
//             Manage all payout API integrations, status, limits and configurations.
//           </p>
//         </div>
//         <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold shadow-sm transition-colors">
//           <Plus size={13} sm:size={15} /> Add New API Provider
//         </button>
//       </div>

//       {/* ── STAT CARDS ── */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
//         <div className="bg-[#F9FAFF] rounded-xl border border-[#ECEFF4] p-3 sm:p-4 flex items-start justify-between">
//           <div>
//             <p className="text-[11px] sm:text-xs text-black font-medium">Total APIs</p>
//             <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{counts.total}</p>
//             <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">All integrated APIs</p>
//           </div>
//           <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#E6F0FE] rounded-full flex items-center justify-center flex-shrink-0">
//             <Database size={16} sm:size={20} className="text-[#4281D7]" />
//           </div>
//         </div>
//         <div className="bg-[#F5FBF7] rounded-xl border border-[#F2F9F7] p-3 sm:p-4 flex items-start justify-between">
//           <div>
//             <p className="text-[11px] sm:text-xs text-green-600 font-semibold">Active APIs</p>
//             <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{counts.active}</p>
//             <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">Currently enabled</p>
//           </div>
//           <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#E8F4EB] rounded-full flex items-center justify-center flex-shrink-0">
//             <CheckCircle size={16} sm:size={20} className="text-[#209C4E]" />
//           </div>
//         </div>
//         <div className="bg-[#FDFAF5] rounded-xl border border-[#F7F4EE] p-3 sm:p-4 flex items-start justify-between">
//           <div>
//             <p className="text-[11px] sm:text-xs text-orange-500 font-semibold">Inactive APIs</p>
//             <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{counts.inactive}</p>
//             <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">Currently disabled</p>
//           </div>
//           <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FDF0E0] rounded-full flex items-center justify-center flex-shrink-0">
//             <PauseCircle size={16} sm:size={20} className="text-[#ED902A]" />
//           </div>
//         </div>
//         <div className="bg-[#FAF7FE] rounded-xl border border-[#F1EEF5] p-3 sm:p-4 flex items-start justify-between">
//           <div>
//             <p className="text-[11px] sm:text-xs text-purple-600 font-semibold">In Maintenance</p>
//             <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{counts.maintenance}</p>
//             <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">Under maintenance</p>
//           </div>
//           <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#EFE9F6] rounded-full flex items-center justify-center flex-shrink-0">
//             <Wrench size={16} sm:size={20} className="text-[#8B4FEC]" />
//           </div>
//         </div>
//       </div>

//       {/* ── TABLE CARD ── */}
//       <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

//         {/* Filters bar - responsive */}
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-gray-100">
//           <div className="relative flex-1 sm:flex-none">
//             <Search size={12} sm:size={13} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={search}
//               onChange={e => { setSearch(e.target.value); setPage(1); }}
//               placeholder="Search API by name"
//               className="w-full pl-7 sm:pl-8 pr-2.5 sm:pr-3 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 bg-white text-gray-700 placeholder-gray-400"
//             />
//           </div>
//           <div className="relative w-full sm:w-auto">
//             <select
//               value={statusFilter}
//               onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
//               className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg text-gray-600 bg-white outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
//             >
//               {["All Status", "Active", "Inactive", "Maintenance"].map(s => <option key={s}>{s}</option>)}
//             </select>
//             <ChevronRight size={11} sm:size={12} className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
//           </div>
          
//           <div className="flex gap-2 sm:flex-1 sm:justify-end">
//             <button className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg text-black bg-white hover:bg-gray-50 transition-colors">
//               <Download size={11} sm:size={13} /> Export
//             </button>
//             <button className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg text-black bg-white hover:bg-gray-50 transition-colors">
//               <RefreshCw size={11} sm:size={13} /> Refresh
//             </button>
//           </div>
//         </div>

//         {/* Table - horizontal scroll on mobile */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px] sm:min-w-full">
//             <thead>
//               <tr className="bg-gray-50/80 border-b border-gray-100">
//                 {[
//                   "API Name", "Type", "Status", "Priority",
//                   "Success Rate (30D)", "Available Balance",
//                   "Daily Limit", "Daily Usage", "Actions",
//                 ].map(h => (
//                   <th key={h} className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap first:pl-4 sm:first:pl-5">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map(api => (
//                 <tr key={api.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
//                   <td className="px-3 sm:px-4 py-3 sm:py-4 pl-4 sm:pl-5">
//                     <div className="flex items-center gap-2 sm:gap-3">
//                       <ApiLogo api={api} />
//                       <div className="min-w-0">
//                         <button
//                           onClick={() => onViewDetail(api.id)}
//                           className="text-[12px] sm:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors text-left leading-tight truncate block max-w-[120px] sm:max-w-none"
//                         >
//                           {api.name}
//                         </button>
//                         <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-0.5 truncate max-w-[120px] sm:max-w-none">{api.subtitle}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-xs font-medium text-black whitespace-nowrap">{api.type}</td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4"><StatusBadge status={api.status} /></td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-bold text-gray-700">{api.priority}</td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4"><SuccessRateCell rate={api.successRate} /></td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4">
//                     <div className="flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
//                       {api.availableBalance}
//                       {api.balanceSyncing && (
//                         <RefreshCw size={10} sm:size={11} className="text-gray-400 animate-spin" />
//                       )}
//                     </div>
//                    </td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4">
//                     <div className="flex items-center gap-1 text-[11px] sm:text-sm font-medium text-black whitespace-nowrap">
//                       {api.dailyLimit}
//                       {api.dailyLimitEditable && (
//                         <Edit2 size={10} sm:size={11} className="text-black hover:text-gray-500 cursor-pointer" />
//                       )}
//                     </div>
//                    </td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4"><UsageCell api={api} /> </td>
//                   <td className="px-3 sm:px-4 py-3 sm:py-4 relative">
//                     <button
//                       onClick={() => setOpenMenu(openMenu === api.id ? null : api.id)}
//                       className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <MoreVertical size={13} sm:size={15} className="text-gray-500" />
//                     </button>
//                     {openMenu === api.id && (
//                       <ActionMenu
//                         api={api}
//                         onViewDetail={onViewDetail}
//                         onClose={() => setOpenMenu(null)}
//                       />
//                     )}
//                    </td>
//                  </tr>
//               ))}
//               {rows.length === 0 && (
//                 <tr>
//                   <td colSpan={9} className="text-center py-12 sm:py-16 text-gray-400 text-xs sm:text-sm">
//                     No API providers match your filters.
//                    </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination - responsive */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-gray-100">
//           <span className="text-[10px] sm:text-xs text-gray-400 text-center">
//             Showing {rows.length === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} results
//           </span>
//           <div className="flex flex-wrap items-center justify-center gap-2">
//             <div className="relative">
//               <select className="appearance-none text-[11px] sm:text-xs border border-gray-200 rounded-lg pl-2.5 sm:pl-3 pr-6 sm:pr-7 py-1 sm:py-1.5 text-gray-600 bg-white outline-none cursor-pointer">
//                 <option>10 per page</option>
//                 <option>25 per page</option>
//                 <option>50 per page</option>
//               </select>
//               <ChevronRight size={10} sm:size={11} className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
//             </div>
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => setPage(p => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
//               >
//                 <ChevronLeft size={12} sm:size={14} />
//               </button>
//               {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
//                 <button
//                   key={p}
//                   onClick={() => setPage(p)}
//                   className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-[11px] sm:text-xs font-semibold transition-colors
//                     ${page === p ? "bg-blue-600 text-white shadow-sm" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
//                 >
//                   {p}
//                 </button>
//               ))}
//               {totalPages > 5 && <span className="text-gray-400 text-[11px] sm:text-xs px-1">...</span>}
//               {totalPages > 5 && (
//                 <button
//                   onClick={() => setPage(totalPages)}
//                   className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-[11px] sm:text-xs font-semibold transition-colors
//                     ${page === totalPages ? "bg-blue-600 text-white shadow-sm" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
//                 >
//                   {totalPages}
//                 </button>
//               )}
//               <button
//                 onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages || totalPages === 0}
//                 className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
//               >
//                 <ChevronRight size={12} sm:size={14} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Close action menu on outside click */}
//       {openMenu && (
//         <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
//       )}
//     </div>
//   );
// }
// src/pages/payoutApis/ApiProvider.jsx
import { useState, useEffect } from "react";
import {
  Plus, Search, Download, RefreshCw,
  MoreVertical, Eye, Edit2, CheckCircle, XCircle,
  Wrench, ArrowUpDown, Database, Scale, FlaskConical,
  FileText, Trash2, ChevronLeft, ChevronRight,
  PauseCircle,
} from "lucide-react";
import apiProviderService from "../../services/ApiProvidersServices";

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  active:      { dot: "bg-green-500",  badge: "bg-green-50 text-green-700 border border-green-200" },
  inactive:    { dot: "bg-red-500",    badge: "bg-red-50 text-red-700 border border-red-200" },
  maintenance: { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-600 border border-orange-200" },
  suspended:   { dot: "bg-red-500",    badge: "bg-red-50 text-red-700 border border-red-200" },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ApiLogo({ name }) {
  // Get initials from name
  const initials = name?.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase() || 'AP';
  
  // Generate consistent color based on name
  const colors = [
    { bg: "#dbeafe", text: "#2563eb" },
    { bg: "#dcfce7", text: "#166534" },
    { bg: "#eff6ff", text: "#1d4ed8" },
    { bg: "#fef3c7", text: "#92400e" },
    { bg: "#ede9fe", text: "#6d28d9" },
    { bg: "#fee2e2", text: "#991b1b" },
    { bg: "#fef9c3", text: "#92400e" },
    { bg: "#cffafe", text: "#0e7490" },
    { bg: "#d1fae5", text: "#065f46" },
    { bg: "#fce4ec", text: "#c62828" },
  ];
  
  const index = name?.length % colors.length || 0;
  const color = colors[index];

  return (
    <div
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-extrabold text-[10px] sm:text-xs flex-shrink-0 select-none"
      style={{ background: color.bg, color: color.text }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const statusKey = status?.toLowerCase() || 'inactive';
  const s = STATUS_STYLES[statusKey] || STATUS_STYLES.inactive;
  const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || 'Inactive';
  
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${s.badge}`}>
      <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${s.dot}`} />
      {displayStatus}
    </span>
  );
}

function SuccessRateCell({ rate }) {
  if (rate === null || rate === undefined) return <span className="text-sm text-gray-300">—</span>;
  const numRate = parseFloat(rate);
  if (isNaN(numRate)) return <span className="text-xs sm:text-sm text-gray-400">—</span>;
  if (numRate === 0) return <span className="text-xs sm:text-sm text-gray-400">0.00%</span>;
  
  const color = numRate >= 95 ? "#22c55e" : numRate >= 90 ? "#3b82f6" : numRate >= 70 ? "#f97316" : "#ef4444";
  return (
    <div className="space-y-0.5 sm:space-y-1">
      <span className="text-[11px] sm:text-sm font-semibold text-gray-800">{numRate.toFixed(2)}%</span>
      <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.min(numRate, 100)}%`, background: color }} />
      </div>
    </div>
  );
}

function UsageCell({ dailyLimit, dailyUsage }) {
  const limit = parseFloat(dailyLimit) || 0;
  const usage = parseFloat(dailyUsage) || 0;
  const pct = limit > 0 ? (usage / limit) * 100 : 0;
  
  const color = pct >= 100 ? "#ef4444" : pct >= 80 ? "#f97316" : "#3b82f6";
  const usageAmt = `₹ ${usage.toLocaleString('en-IN')}`;
  
  return (
    <div className="space-y-0.5 sm:space-y-1">
      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-gray-700">
        {usageAmt}
      </div>
      <div className="w-20 sm:w-28 h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(pct, 100)}%`, background: color }}
        />
      </div>
      <span className="text-[9px] sm:text-[11px] text-gray-400">{pct.toFixed(2)}%</span>
    </div>
  );
}

function ActionMenu({ providerId, onViewDetail, onClose }) {
  const items = [
    { Icon: Eye, label: "View Details", color: "text-gray-700", action: "view" },
    { Icon: Edit2, label: "Edit API", color: "text-gray-700", action: "edit" },
    { Icon: CheckCircle, label: "Enable API", color: "text-green-600", action: "enable" },
    { Icon: XCircle, label: "Disable API", color: "text-orange-500", action: "disable" },
    { Icon: Wrench, label: "Maintenance Mode", color: "text-purple-600", action: "maint" },
    { Icon: ArrowUpDown, label: "Set Priority", color: "text-gray-700", action: "priority" },
    { Icon: Database, label: "API Balances", color: "text-gray-700", action: "balances" },
    { Icon: Scale, label: "API Limits", color: "text-gray-700", action: "limits" },
    { Icon: FlaskConical, label: "Test API", color: "text-gray-700", action: "test" },
    { Icon: FileText, label: "View Logs", color: "text-gray-700", action: "logs" },
    { Icon: Trash2, label: "Delete API", color: "text-red-600", action: "delete", divider: true },
  ];
  
  const handleAction = (action) => {
    onClose();
    if (action === "view") {
      onViewDetail(providerId);
    }
  };
  
  return (
    <div className="absolute right-0 top-8 w-48 sm:w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-1 overflow-hidden">
      {items.map(({ Icon, label, color, action, divider }) => (
        <button
          key={action}
          onClick={() => handleAction(action)}
          className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-[11px] sm:text-[13px] hover:bg-gray-50 transition-colors ${color} ${divider ? "border-t border-gray-100 mt-1" : ""}`}
        >
          <Icon size={12} sm:size={14} /> {label}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ApiProvidersPage({ onViewDetail = () => {} }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [openMenu, setOpenMenu] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState({
    data: [],
    stats: {
      total: 0,
      active: "0",
      inactive: "0"
    },
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 10
  });

  // Fetch API providers
  const fetchApiProviders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: page,
        limit: limit
      };
      
      // Add search if present
      if (search) {
        params.search = search;
      }
      
      // Add status filter if not "All Status"
      if (statusFilter !== "All Status") {
        params.status = statusFilter.toLowerCase();
      }
      
      // Add type filter if not "All Types"
      if (typeFilter !== "All Types") {
        params.type = typeFilter;
      }
      
      const response = await apiProviderService.getApiProviders(params);
      setApiData(response);
    } catch (err) {
      console.error('Error fetching API providers:', err);
      setError('Failed to load API providers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when dependencies change
  useEffect(() => {
    fetchApiProviders();
  }, [page, limit, statusFilter, typeFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== undefined) {
        setPage(1); // Reset to first page on search
        fetchApiProviders();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '₹ 0.00';
    return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Get status display name
  const getStatusDisplay = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchApiProviders();
  };

  // Extract data
  const providers = apiData.data || [];
  const stats = apiData.stats || { total: 0, active: "0", inactive: "0" };
  const totalPages = apiData.totalPages || 0;
  const totalItems = apiData.total || 0;

  return (
    <div className="bg-gray-50 min-h-screen text-sm p-3 sm:p-0">

      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">API Providers</h1>
          <p className="text-[11px] sm:text-sm text-gray-400 mt-1">
            Manage all payout API integrations, status, limits and configurations.
          </p>
        </div>
        <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold shadow-sm transition-colors">
          <Plus size={13} sm:size={15} /> Add New API Provider
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-[#F9FAFF] rounded-xl border border-[#ECEFF4] p-3 sm:p-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] sm:text-xs text-black font-medium">Total APIs</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{stats.total || 0}</p>
            <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">All integrated APIs</p>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#E6F0FE] rounded-full flex items-center justify-center flex-shrink-0">
            <Database size={16} sm:size={20} className="text-[#4281D7]" />
          </div>
        </div>
        <div className="bg-[#F5FBF7] rounded-xl border border-[#F2F9F7] p-3 sm:p-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] sm:text-xs text-green-600 font-semibold">Active APIs</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{stats.active || 0}</p>
            <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">Currently enabled</p>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#E8F4EB] rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle size={16} sm:size={20} className="text-[#209C4E]" />
          </div>
        </div>
        <div className="bg-[#FDFAF5] rounded-xl border border-[#F7F4EE] p-3 sm:p-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] sm:text-xs text-orange-500 font-semibold">Inactive APIs</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{stats.inactive || 0}</p>
            <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">Currently disabled</p>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FDF0E0] rounded-full flex items-center justify-center flex-shrink-0">
            <PauseCircle size={16} sm:size={20} className="text-[#ED902A]" />
          </div>
        </div>
        <div className="bg-[#FAF7FE] rounded-xl border border-[#F1EEF5] p-3 sm:p-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] sm:text-xs text-purple-600 font-semibold">Total Providers</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 leading-none">{providers.length}</p>
            <p className="text-[10px] sm:text-xs text-gray-800 mt-1 sm:mt-2">Active providers</p>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#EFE9F6] rounded-full flex items-center justify-center flex-shrink-0">
            <Wrench size={16} sm:size={20} className="text-[#8B4FEC]" />
          </div>
        </div>
      </div>

      {/* ── TABLE CARD ── */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-gray-100">
          <div className="relative flex-1 sm:flex-none">
            <Search size={12} sm:size={13} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search API by name"
              className="w-full pl-7 sm:pl-8 pr-2.5 sm:pr-3 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 bg-white text-gray-700 placeholder-gray-400"
              disabled={loading}
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg text-gray-600 bg-white outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              disabled={loading}
            >
              {["All Status", "Active", "Inactive", "Maintenance", "Suspended"].map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronRight size={11} sm:size={12} className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="flex gap-2 sm:flex-1 sm:justify-end">
            <button 
              onClick={handleRefresh}
              className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs border border-gray-200 rounded-lg text-black bg-white hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              <RefreshCw size={11} sm:size={13} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-500">Loading API providers...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-3 text-sm text-red-500">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] sm:min-w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  {[
                    "API Name", "Type", "Status", "Priority",
                    "Success Rate (30D)", "Available Balance",
                    "Daily Limit", "Daily Usage", "Actions",
                  ].map(h => (
                    <th key={h} className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap first:pl-4 sm:first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {providers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 sm:py-16 text-gray-400 text-xs sm:text-sm">
                      No API providers match your filters.
                    </td>
                  </tr>
                ) : (
                  providers.map(provider => (
                    <tr key={provider.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                      <td className="px-3 sm:px-4 py-3 sm:py-4 pl-4 sm:pl-5">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <ApiLogo name={provider.name} />
                          <div className="min-w-0">
                            <button
                              onClick={() => onViewDetail(provider.id)}
                              className="text-[12px] sm:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors text-left leading-tight truncate block max-w-[120px] sm:max-w-none"
                            >
                              {provider.name}
                            </button>
                            <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-0.5 truncate max-w-[120px] sm:max-w-none">
                              Port: {provider.port || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-xs font-medium text-black whitespace-nowrap">
                        {provider.type || 'Bank API'}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <StatusBadge status={provider.status} />
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-bold text-gray-700">
                        {provider.priority || 'N/A'}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <SuccessRateCell rate={provider.success_rate || provider.successRate} />
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {formatCurrency(provider.available_balance || provider.availableBalance || 0)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center gap-1 text-[11px] sm:text-sm font-medium text-black whitespace-nowrap">
                          {formatCurrency(provider.daily_limit || provider.dailyLimit || 0)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <UsageCell 
                          dailyLimit={provider.daily_limit || provider.dailyLimit || 0} 
                          dailyUsage={provider.daily_usage || provider.dailyUsage || 0} 
                        />
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === provider.id ? null : provider.id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical size={13} sm:size={15} className="text-gray-500" />
                        </button>
                        {openMenu === provider.id && (
                          <ActionMenu
                            providerId={provider.id}
                            onViewDetail={onViewDetail}
                            onClose={() => setOpenMenu(null)}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && providers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-gray-100">
            <span className="text-[10px] sm:text-xs text-gray-400 text-center">
              Showing {providers.length === 0 ? 0 : (page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems} results
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="relative">
                <select 
                  value={limit}
                  onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }}
                  className="appearance-none text-[11px] sm:text-xs border border-gray-200 rounded-lg pl-2.5 sm:pl-3 pr-6 sm:pr-7 py-1 sm:py-1.5 text-gray-600 bg-white outline-none cursor-pointer"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
                <ChevronRight size={10} sm:size={11} className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={12} sm:size={14} />
                </button>
                {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => {
                  let p;
                  if (totalPages <= 5) {
                    p = i + 1;
                  } else if (page <= 3) {
                    p = i + 1;
                  } else if (page >= totalPages - 2) {
                    p = totalPages - 4 + i;
                  } else {
                    p = page - 2 + i;
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-[11px] sm:text-xs font-semibold transition-colors
                        ${page === p ? "bg-blue-600 text-white shadow-sm" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages || 1, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={12} sm:size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close action menu on outside click */}
      {openMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
}
// import { useState } from "react";
// import DateRangePicker from "../components/DatePicker";

// // ─── Icons (inline SVG helpers) ────────────────────────────────────────────
// const Icon = ({ d, size = 16, className = "" }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
//         <path d={d} />
//     </svg>
// );

// const icons = {

//     chevronDown: "M19 9l-7 7-7-7",
//     chevronRight: "M9 18l6-6-6-6",
//     search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
//     filter: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
//     download: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
//     bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
//     moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
//     menu: "M4 6h16M4 12h16M4 18h16",
//     moreVertical: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z",
//     eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
//     refresh: "M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 005.64 5.64L1 10 M23 14l-4.64 4.36A9 9 0 013.51 15",
//     undo: "M3 7v6h6 M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13",
//     arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
//     copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
//     shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
//     check: "M20 6L9 17l-5-5",
//     sun: "M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
// };

// // ─── API Logos (colored text badges) ──────────────────────────────────────
// const ApiLogo = ({ api }) => {
//     const map = {
//         RazorpayX: { bg: "bg-blue-50", text: "text-blue-700", label: "R" },
//         Cashfree: { bg: "bg-green-50", text: "text-green-700", label: "C" },
//         "Paytm Payouts": { bg: "bg-sky-50", text: "text-sky-700", label: "P" },
//         Easebuzz: { bg: "bg-indigo-50", text: "text-indigo-700", label: "E" },
//         "Yes Bank API": { bg: "bg-purple-50", text: "text-purple-700", label: "Y" },
//     };
//     const s = map[api] || { bg: "bg-gray-100", text: "text-gray-600", label: "?" };
//     return (
//         <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold ${s.bg} ${s.text}`}>
//             <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-white border ${s.text} border-current`}>{s.label}</span>
//             {api}
//         </span>
//     );
// };

// // ─── Status Badge ──────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//     const map = {
//         Success: "bg-green-100 text-green-700 border border-green-200",
//         Failed: "bg-red-100 text-red-700 border border-red-200",
//         Processing: "bg-blue-100 text-blue-700 border border-blue-200",
//         Returned: "bg-orange-100 text-orange-700 border border-orange-200",
//         Reversed: "bg-purple-100 text-purple-700 border border-purple-200",
//         Initiated: "bg-yellow-100 text-yellow-700 border border-yellow-200",
//     };
//     return (
//         <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}>
//             {status}
//         </span>
//     );
// };


// // ─── Transactions Page ─────────────────────────────────────────────────────
// const transactions = [
//     { no:"1",id: "TXN12548789", orderId: "ORD12548789", merchant: "ABC Pvt Ltd", user: "Rohit Sharma", beneficiary: "Amit Kumar", phone: "9876543210", amount: "₹ 25,000.00", api: "RazorpayX", status: "Success", utr: "UTR5125487963", date: "14 May 2025", time: "11:30 AM" },
//     { no:"2",id: "TXN12548788", orderId: "ORD12548788", merchant: "XYZ Solutions", user: "Neha Verma", beneficiary: "Suresh Yadav", phone: "9123456780", amount: "₹ 12,500.00", api: "Cashfree", status: "Success", utr: "CFR5125487881", date: "14 May 2025", time: "11:28 AM" },
//     { no:"3",id: "TXN12548787", orderId: "ORD12548787", merchant: "PQR Services", user: "Vikram Singh", beneficiary: "Rahul Gupta", phone: "9012345678", amount: "₹ 8,750.00", api: "Paytm Payouts", status: "Failed", utr: "–", date: "14 May 2025", time: "11:27 AM" },
//     { no:"4",id: "TXN12548786", orderId: "ORD12548786", merchant: "LMN Traders", user: "Anjali Mehta", beneficiary: "Vikas Patel", phone: "9098765432", amount: "₹ 15,000.00", api: "Easebuzz", status: "Returned", utr: "–", date: "14 May 2025", time: "11:25 AM" },
//     { no:"5",id: "TXN12548785", orderId: "ORD12548785", merchant: "AAA Retail", user: "Priya Nair", beneficiary: "Sanjay Kumar", phone: "9876512340", amount: "₹ 5,500.00", api: "Yes Bank API", status: "Success", utr: "YB5125487854", date: "14 May 2025", time: "11:22 AM" },
//     { no:"6",id: "TXN12548784", orderId: "ORD12548784", merchant: "Techno Soft", user: "Manoj Gupta", beneficiary: "Deepak Singh", phone: "9123409876", amount: "₹ 50,000.00", api: "RazorpayX", status: "Processing", utr: "–", date: "14 May 2025", time: "11:20 AM" },
//     { no:"7",id: "TXN12548783", orderId: "ORD12548783", merchant: "Global Infotech", user: "Karan Malhotra", beneficiary: "Nitin Verma", phone: "9011122233", amount: "₹ 20,000.00", api: "Cashfree", status: "Failed", utr: "–", date: "14 May 2025", time: "11:18 AM" },
//     { no:"8",id: "TXN12548782", orderId: "ORD12548782", merchant: "Max Stores", user: "Pooja Shah", beneficiary: "Ramesh Das", phone: "9898989898", amount: "₹ 3,200.00", api: "Paytm Payouts", status: "Success", utr: "PYT5125487822", date: "14 May 2025", time: "11:15 AM" },
//     { no:"9",id: "TXN12548781", orderId: "ORD12548781", merchant: "Sunrise Enterprises", user: "Alok Tiwari", beneficiary: "Mahesh Yadav", phone: "9090909090", amount: "₹ 7,800.00", api: "Easebuzz", status: "Processing", utr: "–", date: "14 May 2025", time: "11:12 AM" },
//     { no:"10",id: "TXN12548780", orderId: "ORD12548780", merchant: "Kiran Industries", user: "Simran Kaur", beneficiary: "Gaurav Sharma", phone: "9871234560", amount: "₹ 18,600.00", api: "Yes Bank API", status: "Success", utr: "YB5125487800", date: "14 May 2025", time: "11:10 AM" },
// ];

// const tabs = [
//     { label: "All", count: "12,45,678", color: "text-blue-600" },
//     { label: "Initiated", count: "8,215", color: "text-gray-600" },
//     { label: "Processing", count: "2,152", color: "text-gray-600" },
//     { label: "Success", count: "9,45,231", color: "text-green-600" },
//     { label: "Failed", count: "45,231", color: "text-red-600" },
//     { label: "Returned", count: "55,216", color: "text-orange-600" },
//     { label: "Reversed", count: "8,633", color: "text-gray-600" },
// ];

// const ActionMenu = ({ onViewDetails }) => (
//     <div className="absolute right-8 top-0 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-44">
//         {[
//             { icon: icons.eye, label: "View Details", action: onViewDetails },
//             { icon: icons.refresh, label: "Retry Transaction" },
//             { icon: icons.undo, label: "Return to SGPay" },
//             { icon: icons.undo, label: "Reverse Transaction" },
//             { icon: icons.download, label: "Download Receipt" },
//         ].map((item) => (
//             <button
//                 key={item.label}
//                 onClick={item.action}
//                 className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//                 <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                     {item.icon.split(" M").map((seg, i) => <path key={i} d={i === 0 ? seg : "M" + seg} />)}
//                 </svg>
//                 {item.label}
//             </button>
//         ))}
//     </div>
// );

// const TransactionsPage = ({ onViewDetails }) => {
//     const [activeTab, setActiveTab] = useState("All");
//     const [openMenu, setOpenMenu] = useState(null);

//     const [dateRange, setDateRange] = useState(null);

//     const handleDateChange = (dateData) => {
//         if (dateData) {
//             setDateRange(dateData);
//             console.log('Date Range Selected:', {
//                 startDate: dateData.startDate,
//                 endDate: dateData.endDate,
//                 startFormatted: dateData.startFormatted,
//                 endFormatted: dateData.endFormatted,
//                 dateRange: dateData.dateRange
//             });
//             // Fetch data for selected date range here
//             // fetchDashboardData(dateData.startDate, dateData.endDate);
//         } else {
//             console.log('Date range cleared');
//             // Handle clearing date range
//         }
//     };

//     return (
//         <div className="p-0">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-5">
//                     <div>
//                         <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
//                         <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
//                             <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
//                             <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
//                             <span className="text-gray-800">Transactions</span>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//                             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.download} /></svg>
//                             Export
//                         </button>
//                         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
//                             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.filter} /></svg>
//                             Filters
//                         </button>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
//                     <div className="flex flex-wrap gap-3 mb-3">
//                         <DateRangePicker 
//                         onDateChange={handleDateChange}
//                         placeholder="14 May, 2025 - 14 May, 2025"
//                     />
//                         {["All Status", "All APIs", "All Merchants", "All Users"].map((f) => (
//                             <div key={f} className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs text-black font-semibold cursor-pointer hover:bg-gray-50 bg-white min-w-[120px]">
//                                 <span className="flex-1">{f}</span>
//                                 <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex flex-wrap gap-3">
//                         <input className="px-3 py-2 border border-gray-200 rounded-lg text-xs w-36 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-700" placeholder="Min Amount" />
//                         <span className="flex items-center text-sm text-gray-700">to</span>
//                         <input className="px-3 py-2 border border-gray-200 rounded-lg text-xs w-36 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-700" placeholder="Max Amount" />
//                         <input className="px-3 py-2 border border-gray-200 rounded-lg text-xs flex-1 min-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-700" placeholder="Transaction ID / Order ID / UTR / Ref No." />
//                         <div className="flex gap-2 ml-auto">
//                             <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">Reset</button>
//                             <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">Save Filter</button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs & Table Container - NO overflow on this div */}
//                 <div className="bg-white rounded-2xl border border-gray-100">
//                     <div className="flex border-b border-gray-100 px-4 pt-3 pb-3 gap-1 overflow-x-auto hide-scrollbar">
//                         {tabs.map((tab) => (
//                             <button
//                                 key={tab.label}
//                                 onClick={() => setActiveTab(tab.label)}
//                                 className={`flex flex-col items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border ${activeTab === tab.label
//                                     ? "bg-[#ECF2FE] text-blue-600 border-blue-500"
//                                     : " text-gray-600 border-gray-100 hover:bg-blue-100"
//                                     }`}
//                             >
//                                 <span>{tab.label}</span>
//                                 <span className={`text-xs font-bold mt-0.5 ${activeTab === tab.label ? "text-blue-600" : tab.color}`}>{tab.count}</span>
//                             </button>
//                         ))}
//                     </div>

//                     {/* Table with horizontal scroll only */}
//                     <div className="overflow-x-auto">
//                         <table className="w-full min-w-[1200px]">
//                             <thead>
//                                 <tr className="bg-gray-50 border-b border-gray-100">
//                                     <th className="w-10 px-4 py-3"> <span className="flex items-center text-sm text-gray-700">#</span></th>
//                                     {["Txn ID", "Order ID", "Merchant", "User", "Beneficiary", "Amount", "API Used", "Status", "UTR / Reference No.", "Created At", "Actions"].map((h) => (
//                                         <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {transactions.map((txn) => (
//                                     <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors group">
//                                         <td className="px-4 py-3"> <span className="flex items-center text-sm text-gray-700">{txn.no}</span></td>
//                                         <td className="px-3 py-3 text-xs font-mono text-blue-600 whitespace-nowrap cursor-pointer hover:underline" onClick={() => onViewDetails(txn)}>{txn.id}</td>
//                                         <td className="px-3 py-3 text-xs text-gray-600 font-mono whitespace-nowrap">{txn.orderId}</td>
//                                         <td className="px-3 py-3 text-xs text-gray-800 font-medium whitespace-nowrap">{txn.merchant}</td>
//                                         <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">{txn.user}</td>
//                                         <td className="px-3 py-3">
//                                             <div className="text-xs font-medium text-gray-800">{txn.beneficiary}</div>
//                                             <div className="text-[11px] text-gray-500">{txn.phone}</div>
//                                         </td>
//                                         <td className="px-3 py-3 text-xs font-semibold text-gray-900 whitespace-nowrap">{txn.amount}</td>
//                                         <td className="px-3 py-3 whitespace-nowrap"><ApiLogo api={txn.api} /></td>
//                                         <td className="px-3 py-3"><StatusBadge status={txn.status} /></td>
//                                         <td className="px-3 py-3 text-xs text-gray-600 font-mono whitespace-nowrap">{txn.utr}</td>
//                                         <td className="px-3 py-3">
//                                             <div className="text-xs text-gray-800">{txn.date}</div>
//                                             <div className="text-[11px] text-gray-500">{txn.time}</div>
//                                         </td>
//                                         <td className="px-3 py-3 relative">
//                                             <button
//                                                 onClick={() => setOpenMenu(openMenu === txn.id ? null : txn.id)}
//                                                 className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
//                                             >
//                                                 <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
//                                             </button>
//                                             {openMenu === txn.id && (
//                                                 <ActionMenu onViewDetails={() => { onViewDetails(txn); setOpenMenu(null); }} />
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                             <span>Rows per page:</span>
//                             <select className="border border-gray-200 rounded px-2 py-1 text-sm">
//                                 <option>10</option><option>25</option><option>50</option>
//                             </select>
//                         </div>
//                         <span className="text-xs text-gray-500">Showing 1 to 10 of 12,45,678 transactions</span>
//                         <div className="flex items-center gap-1">
//                             <button className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50"><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg></button>
//                             {[1, 2, 3].map((p) => (
//                                 <button key={p} className={`w-8 h-8 rounded text-xs font-medium ${p === 1 ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
//                             ))}
//                             <span className="text-gray-400 px-1">...</span>
//                             <button className="w-8 h-8 rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">124568</button>
//                             <button className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50"><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg></button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     );
// };

// // ─── Transaction Details Page ──────────────────────────────────────────────
// const InfoRow = ({ label, value, mono }) => (
//     <div className="flex py-1.5">
//         <span className="text-xs text-gray-800 font-semibold w-32 flex-shrink-0">{label}</span>
//         <span className="text-gray-300 mx-2">:</span>
//         <span className={`text-xs font-medium text-gray-800 ${mono ? "font-mono" : ""}`}>{value || "–"}</span>
//     </div>
// );

// const StatusStep = ({ label, date, time, done, active }) => (
//     <div className="flex flex-col items-center">
//         <div className={`w-7 h-7 rounded-full flex items-center justify-center ${done || active ? "bg-green-500" : "bg-gray-200"}`}>
//             {(done || active) ? (
//                 <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><path d="M20 6L9 17l-5-5" /></svg>
//             ) : (
//                 <div className="w-2 h-2 rounded-full bg-gray-400" />
//             )}
//         </div>
//         <div className={`text-xs font-semibold mt-1.5 ${active ? "text-green-600" : done ? "text-gray-700" : "text-gray-400"}`}>{label}</div>
//         <div className="text-[10px] text-gray-500 mt-0.5">{date}</div>
//         <div className="text-[10px] text-gray-500">{time}</div>
//     </div>
// );

// const TransactionDetails = ({ txn, onBack }) => {
//     const [activeTab, setActiveTab] = useState("Overview");
//     const detailTabs = ["Overview"];

//     return (
//          <div className="p-0">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-5">
//                     <div>
//                         <h1 className="text-xl font-bold text-gray-900">Transaction Details</h1>
//                         <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
//                             {["Dashboard", "Transactions", "Transaction Details"].map((b, i, arr) => (
//                                 <span key={b} className="flex items-center gap-1.5">
//                                     <span className={i === arr.length - 1 ? "text-gray-800" : "hover:text-blue-600 cursor-pointer"}>{b}</span>
//                                     {i < arr.length - 1 && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//                             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
//                             Back to Transactions
//                         </button>
//                         <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//                             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.download} /></svg>
//                             Download Receipt
//                         </button>
//                         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
//                             Actions
//                             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Summary card */}
//                 <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//                         {[
//                             { label: "Transaction ID", value: txn?.id || "TXN12548789", extra: <StatusBadge status="Success" />, mono: true },
//                             { label: "Order ID", value: txn?.orderId || "ORD12548789", mono: true },
//                             { label: "Amount", value: "₹ 25,000.00", big: true },
//                             { label: "API Used", value: null, api: "RazorpayX" },
//                             { label: "UTR / Reference No.", value: "UTR5125487963", mono: true },
//                             { label: "Created At", value: "14 May 2025, 11:30 AM" },
//                         ].map((col) => (
//                             <div key={col.label}>
//                                 <div className="text-xs text-gray-500 mb-1">{col.label}</div>
//                                 {col.api ? (
//                                     <ApiLogo api={col.api} />
//                                 ) : (
//                                     <div className="flex items-center gap-2 flex-wrap">
//                                         <span className={`${col.big ? "text-xl font-bold text-gray-900" : "text-sm font-semibold text-gray-800"} ${col.mono ? "font-mono" : ""}`}>
//                                             {col.value}
//                                         </span>
//                                         {col.extra}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Tabs & Content */}
//                 <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//                     <div className="flex border-b border-gray-100 px-4 overflow-x-auto">
//                         {detailTabs.map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent hover:text-gray-800"
//                                     }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     {activeTab === "Overview" && (
//                         <div className="p-5">
//                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//                                 {/* Left col */}
//                                 <div className="lg:col-span-2 space-y-5">
//                                     {/* Transaction Info */}
//                                     <div className="border border-gray-100 rounded-xl p-4">
//                                         <h3 className="text-sm font-semibold text-gray-900 mb-3">Transaction Information</h3>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                                             <div>
//                                                 <InfoRow label="Merchant Name" value="ABC Pvt Ltd" />
//                                                 <InfoRow label="Merchant ID" value="MER1254" mono />
//                                                 <InfoRow label="User" value="Rohit Sharma" />
//                                                 <InfoRow label="Channel" value="API" />
//                                                 <InfoRow label="Source IP" value="103.21.45.67" mono />
//                                                 <InfoRow label="Device" value="Server" />
//                                                 <InfoRow label="Remark" value="–" />
//                                             </div>
//                                             <div>
//                                                 <InfoRow label="Transaction Type" value="Payout" />
//                                                 <InfoRow label="Priority" value="Normal" />
//                                                 <InfoRow label="Amount" value="₹ 25,000.00" />
//                                                 <InfoRow label="Fees" value="₹ 12.50" />
//                                                 <InfoRow label="Net Amount" value="₹ 24,987.50" />
//                                                 <InfoRow label="Currency" value="INR" />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Status Flow */}
//                                     <div className="border border-gray-100 rounded-xl p-4">
//                                         <h3 className="text-sm font-semibold text-gray-900 mb-4">Status Flow</h3>
//                                         <div className="flex items-start justify-between relative">
//                                             <div className="absolute top-3.5 left-[14%] right-[14%] h-0.5 bg-green-200 z-0"></div>
//                                             {[
//                                                 { label: "Initiated", date: "14 May 2025", time: "11:30:12 AM", done: true },
//                                                 { label: "Queued", date: "14 May 2025", time: "11:30:13 AM", done: true },
//                                                 { label: "Processing", date: "14 May 2025", time: "11:30:15 AM", done: true },
//                                                 { label: "Success", date: "14 May 2025", time: "11:30:28 AM", done: true, active: true },
//                                             ].map((step) => (
//                                                 <div key={step.label} className="relative z-10 flex-1">
//                                                     <StatusStep {...step} />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Response Info */}
//                                     <div className="border border-gray-100 rounded-xl p-4">
//                                         <h3 className="text-sm font-semibold text-gray-900 mb-3">Response Information</h3>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                                             <div>
//                                                 <InfoRow label="Response Code" value="200" />
//                                                 <InfoRow label="Response Message" value="Payout Successful" />
//                                                 <InfoRow label="Response Time" value="13 Sec 245 ms" />
//                                             </div>
//                                             <div>
//                                                 <InfoRow label="UTR / Reference No." value="UTR5125487963" mono />
//                                                 <InfoRow label="Settlement Time" value="14 May 2025, 11:30:28 AM" />
//                                                 <InfoRow label="Amount Credited" value="₹ 25,000.00" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Right col */}
//                                 <div className="space-y-4">
//                                     {/* Beneficiary */}
//                                     <div className="border border-gray-100 rounded-xl p-4">
//                                         <div className="flex items-center justify-between mb-3">
//                                             <h3 className="text-sm font-semibold text-gray-900">Beneficiary Information</h3>
//                                             <button className="text-xs text-blue-600 hover:underline">View All Beneficiaries</button>
//                                         </div>
//                                         <div className="flex justify-center mb-3">
//                                             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//                                                 <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-gray-400"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
//                                             </div>
//                                         </div>
//                                         <InfoRow label="Name" value="Amit Kumar" />
//                                         <InfoRow label="Account No." value="9876543210" mono />
//                                         <InfoRow label="IFSC Code" value="HDFC0001234" mono />
//                                         <InfoRow label="Bank Name" value="HDFC Bank" />
//                                         <InfoRow label="Account Type" value="Savings" />
//                                         <InfoRow label="UPI ID" value="–" />
//                                     </div>

//                                     {/* Risk */}
//                                     <div className="border border-gray-100 rounded-xl p-4">
//                                         <div className="flex items-center justify-between mb-3">
//                                             <h3 className="text-sm font-semibold text-gray-900">Risk & Compliance</h3>
//                                             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//                                                 <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
//                                             </div>
//                                         </div>
//                                         {[
//                                             { label: "Risk Score", badge: "Low (12)", color: "bg-green-100 text-green-700" },
//                                             { label: "Velocity Check", badge: "Passed", color: "bg-green-100 text-green-700" },
//                                             { label: "Duplicate Check", badge: "Passed", color: "bg-green-100 text-green-700" },
//                                             { label: "Rule Engine", badge: "Passed", color: "bg-green-100 text-green-700" },
//                                         ].map((item) => (
//                                             <div key={item.label} className="flex items-center justify-between py-1.5">
//                                                 <span className="text-xs text-gray-500">{item.label}</span>
//                                                 <span className={`text-xs font-semibold px-2 py-0.5 rounded ${item.color}`}>{item.badge}</span>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Quick Actions */}
//                                     <div className="border border-gray-100 rounded-xl p-4">
//                                         <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
//                                         <div className="space-y-2">
//                                             <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                                                 <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.refresh} /></svg>
//                                                 Retry Transaction
//                                             </button>
//                                             <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                                                 <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.undo} /></svg>
//                                                 Return to SGPay
//                                             </button>
//                                             <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-200 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
//                                                 <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.undo} /></svg>
//                                                 Reverse Transaction
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {activeTab !== "Overview" && (
//                         <div className="p-10 text-center text-gray-400 text-sm">
//                             <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="mx-auto mb-3 text-gray-200"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//                             {activeTab} content will appear here
//                         </div>
//                     )}
//                 </div>
//             </div>
//     );
// };

// // ─── App ───────────────────────────────────────────────────────────────────
// export default function TransactionScreen() {
//     const [page, setPage] = useState("transactions");
//     const [selectedTxn, setSelectedTxn] = useState(null);

//     const handleViewDetails = (txn) => {
//         setSelectedTxn(txn);
//         setPage("details");
//     };

//     const handleBack = () => {
//         setPage("transactions");
//         setSelectedTxn(null);
//     };

//     return (
//         <div className="w-full bg-gray-50">
//             {page === "transactions" ? (
//                 <TransactionsPage onViewDetails={handleViewDetails} />
//             ) : (
//                 <TransactionDetails txn={selectedTxn} onBack={handleBack} />
//             )}
//         </div>
//     );
// }
import { useState } from "react";
import DateRangePicker from "../components/DatePicker";

// ─── Icons (inline SVG helpers) ────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={d} />
    </svg>
);

const icons = {
    chevronDown: "M19 9l-7 7-7-7",
    chevronRight: "M9 18l6-6-6-6",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    filter: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
    download: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    menu: "M4 6h16M4 12h16M4 18h16",
    moreVertical: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    refresh: "M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 005.64 5.64L1 10 M23 14l-4.64 4.36A9 9 0 013.51 15",
    undo: "M3 7v6h6 M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13",
    arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
    copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    check: "M20 6L9 17l-5-5",
    sun: "M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
};

// ─── API Logos (colored text badges) ──────────────────────────────────────
const ApiLogo = ({ api }) => {
    const map = {
        RazorpayX: { bg: "bg-blue-50", text: "text-blue-700", label: "R" },
        Cashfree: { bg: "bg-green-50", text: "text-green-700", label: "C" },
        "Paytm Payouts": { bg: "bg-sky-50", text: "text-sky-700", label: "P" },
        Easebuzz: { bg: "bg-indigo-50", text: "text-indigo-700", label: "E" },
        "Yes Bank API": { bg: "bg-purple-50", text: "text-purple-700", label: "Y" },
    };
    const s = map[api] || { bg: "bg-gray-100", text: "text-gray-600", label: "?" };
    return (
        <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold ${s.bg} ${s.text}`}>
            <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold bg-white border ${s.text} border-current`}>{s.label}</span>
            <span className="hidden sm:inline">{api}</span>
            <span className="sm:hidden">{api.charAt(0)}</span>
        </span>
    );
};

// ─── Status Badge ──────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const map = {
        Success: "bg-green-100 text-green-700 border border-green-200",
        Failed: "bg-red-100 text-red-700 border border-red-200",
        Processing: "bg-blue-100 text-blue-700 border border-blue-200",
        Returned: "bg-orange-100 text-orange-700 border border-orange-200",
        Reversed: "bg-purple-100 text-purple-700 border border-purple-200",
        Initiated: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    };
    return (
        <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
};

// ─── Transactions Page ─────────────────────────────────────────────────────
const transactions = [
    { no:"1",id: "TXN12548789", orderId: "ORD12548789", merchant: "ABC Pvt Ltd", user: "Rohit Sharma", beneficiary: "Amit Kumar", phone: "9876543210", amount: "₹ 25,000.00", api: "RazorpayX", status: "Success", utr: "UTR5125487963", date: "14 May 2025", time: "11:30 AM" },
    { no:"2",id: "TXN12548788", orderId: "ORD12548788", merchant: "XYZ Solutions", user: "Neha Verma", beneficiary: "Suresh Yadav", phone: "9123456780", amount: "₹ 12,500.00", api: "Cashfree", status: "Success", utr: "CFR5125487881", date: "14 May 2025", time: "11:28 AM" },
    { no:"3",id: "TXN12548787", orderId: "ORD12548787", merchant: "PQR Services", user: "Vikram Singh", beneficiary: "Rahul Gupta", phone: "9012345678", amount: "₹ 8,750.00", api: "Paytm Payouts", status: "Failed", utr: "–", date: "14 May 2025", time: "11:27 AM" },
    { no:"4",id: "TXN12548786", orderId: "ORD12548786", merchant: "LMN Traders", user: "Anjali Mehta", beneficiary: "Vikas Patel", phone: "9098765432", amount: "₹ 15,000.00", api: "Easebuzz", status: "Returned", utr: "–", date: "14 May 2025", time: "11:25 AM" },
    { no:"5",id: "TXN12548785", orderId: "ORD12548785", merchant: "AAA Retail", user: "Priya Nair", beneficiary: "Sanjay Kumar", phone: "9876512340", amount: "₹ 5,500.00", api: "Yes Bank API", status: "Success", utr: "YB5125487854", date: "14 May 2025", time: "11:22 AM" },
    { no:"6",id: "TXN12548784", orderId: "ORD12548784", merchant: "Techno Soft", user: "Manoj Gupta", beneficiary: "Deepak Singh", phone: "9123409876", amount: "₹ 50,000.00", api: "RazorpayX", status: "Processing", utr: "–", date: "14 May 2025", time: "11:20 AM" },
    { no:"7",id: "TXN12548783", orderId: "ORD12548783", merchant: "Global Infotech", user: "Karan Malhotra", beneficiary: "Nitin Verma", phone: "9011122233", amount: "₹ 20,000.00", api: "Cashfree", status: "Failed", utr: "–", date: "14 May 2025", time: "11:18 AM" },
    { no:"8",id: "TXN12548782", orderId: "ORD12548782", merchant: "Max Stores", user: "Pooja Shah", beneficiary: "Ramesh Das", phone: "9898989898", amount: "₹ 3,200.00", api: "Paytm Payouts", status: "Success", utr: "PYT5125487822", date: "14 May 2025", time: "11:15 AM" },
    { no:"9",id: "TXN12548781", orderId: "ORD12548781", merchant: "Sunrise Enterprises", user: "Alok Tiwari", beneficiary: "Mahesh Yadav", phone: "9090909090", amount: "₹ 7,800.00", api: "Easebuzz", status: "Processing", utr: "–", date: "14 May 2025", time: "11:12 AM" },
    { no:"10",id: "TXN12548780", orderId: "ORD12548780", merchant: "Kiran Industries", user: "Simran Kaur", beneficiary: "Gaurav Sharma", phone: "9871234560", amount: "₹ 18,600.00", api: "Yes Bank API", status: "Success", utr: "YB5125487800", date: "14 May 2025", time: "11:10 AM" },
];

const tabs = [
    { label: "All", count: "12,45,678", color: "text-blue-600" },
    { label: "Initiated", count: "8,215", color: "text-gray-600" },
    { label: "Processing", count: "2,152", color: "text-gray-600" },
    { label: "Success", count: "9,45,231", color: "text-green-600" },
    { label: "Failed", count: "45,231", color: "text-red-600" },
    { label: "Returned", count: "55,216", color: "text-orange-600" },
    { label: "Reversed", count: "8,633", color: "text-gray-600" },
];

const ActionMenu = ({ onViewDetails, onClose }) => (
    <div className="absolute right-0 sm:right-8 top-8 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-44">
        {[
            { icon: icons.eye, label: "View Details", action: onViewDetails },
            { icon: icons.refresh, label: "Retry Transaction" },
            { icon: icons.undo, label: "Return to SGPay" },
            { icon: icons.undo, label: "Reverse Transaction" },
            { icon: icons.download, label: "Download Receipt" },
        ].map((item) => (
            <button
                key={item.label}
                onClick={() => { if (item.action) item.action(); onClose?.(); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    {item.icon.split(" M").map((seg, i) => <path key={i} d={i === 0 ? seg : "M" + seg} />)}
                </svg>
                {item.label}
            </button>
        ))}
    </div>
);

const TransactionsPage = ({ onViewDetails }) => {
    const [activeTab, setActiveTab] = useState("All");
    const [openMenu, setOpenMenu] = useState(null);
    const [dateRange, setDateRange] = useState(null);

    const handleDateChange = (dateData) => {
        if (dateData) {
            setDateRange(dateData);
            console.log('Date Range Selected:', dateData);
        } else {
            console.log('Date range cleared');
        }
    };

    return (
        <div className="p-3 sm:p-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Transactions</h1>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 mt-0.5 flex-wrap">
                        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                        <span className="text-gray-800">Transactions</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.download} /></svg>
                        Export
                    </button>
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] sm:text-sm font-semibold transition-colors shadow-sm">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.filter} /></svg>
                        Filters
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
                    <DateRangePicker 
                        onDateChange={handleDateChange}
                        placeholder="14 May, 2025 - 14 May, 2025"
                    />
                    {["All Status", "All APIs", "All Merchants", "All Users"].map((f) => (
                        <div key={f} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs text-black font-semibold cursor-pointer hover:bg-gray-50 bg-white min-w-[100px] sm:min-w-[120px]">
                            <span className="flex-1 truncate">{f}</span>
                            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <input className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs w-28 sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400" placeholder="Min Amount" />
                    <span className="flex items-center text-xs sm:text-sm text-gray-700">to</span>
                    <input className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs w-28 sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400" placeholder="Max Amount" />
                    <input className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400" placeholder="Transaction ID / Order ID / UTR / Ref No." />
                    <div className="flex gap-2 ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                        <button className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors">Reset</button>
                        <button className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-300 text-blue-700 rounded-lg text-[11px] sm:text-xs font-medium hover:bg-blue-50 transition-colors">Save Filter</button>
                    </div>
                </div>
            </div>

            {/* Tabs & Table Container */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100">
                <div className="flex border-b border-gray-100 px-2 sm:px-4 pt-2 sm:pt-3 pb-2 sm:pb-3 gap-1 overflow-x-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`flex flex-col items-center px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg text-[11px] sm:text-sm font-medium transition-colors whitespace-nowrap border ${activeTab === tab.label
                                ? "bg-[#ECF2FE] text-blue-600 border-blue-500"
                                : "text-gray-600 border-gray-100 hover:bg-blue-50"
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] sm:text-xs font-bold mt-0.5 ${activeTab === tab.label ? "text-blue-600" : tab.color}`}>{tab.count}</span>
                        </button>
                    ))}
                </div>

                {/* Table with horizontal scroll */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="w-10 px-2 sm:px-4 py-2 sm:py-3"><span className="flex items-center text-xs sm:text-sm text-gray-700">#</span></th>
                                {["Txn ID", "Order ID", "Merchant", "User", "Beneficiary", "Amount", "API Used", "Status", "UTR / Ref No.", "Created At", "Actions"].map((h) => (
                                    <th key={h} className="px-2 sm:px-3 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                                ))}
                             </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors group">
                                    <td className="px-2 sm:px-4 py-2 sm:py-3"><span className="flex items-center text-xs sm:text-sm text-gray-700">{txn.no}</span></td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-mono text-blue-600 whitespace-nowrap cursor-pointer hover:underline" onClick={() => onViewDetails(txn)}>{txn.id}</td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-600 font-mono whitespace-nowrap">{txn.orderId}</td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-800 font-medium whitespace-nowrap">{txn.merchant}</td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-700 whitespace-nowrap">{txn.user}</td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3">
                                        <div className="text-[10px] sm:text-xs font-medium text-gray-800">{txn.beneficiary}</div>
                                        <div className="text-[9px] sm:text-[11px] text-gray-500">{txn.phone}</div>
                                    </td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold text-gray-900 whitespace-nowrap">{txn.amount}</td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap"><ApiLogo api={txn.api} /></td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3"><StatusBadge status={txn.status} /></td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-600 font-mono whitespace-nowrap">{txn.utr}</td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3">
                                        <div className="text-[10px] sm:text-xs text-gray-800">{txn.date}</div>
                                        <div className="text-[9px] sm:text-[11px] text-gray-500">{txn.time}</div>
                                    </td>
                                    <td className="px-2 sm:px-3 py-2 sm:py-3 relative">
                                        <button
                                            onClick={() => setOpenMenu(openMenu === txn.id ? null : txn.id)}
                                            className="p-1 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
                                        >
                                            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                        </button>
                                        {openMenu === txn.id && (
                                            <ActionMenu 
                                                onViewDetails={() => { onViewDetails(txn); setOpenMenu(null); }} 
                                                onClose={() => setOpenMenu(null)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span>Rows per page:</span>
                        <select className="border border-gray-200 rounded px-2 py-1 text-xs sm:text-sm">
                            <option>10</option><option>25</option><option>50</option>
                        </select>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 text-center">Showing 1 to 10 of 12,45,678 transactions</span>
                    <div className="flex items-center gap-1">
                        <button className="p-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50"><svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg></button>
                        {[1, 2, 3].map((p) => (
                            <button key={p} className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-medium ${p === 1 ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
                        ))}
                        <span className="text-gray-400 px-1 text-xs">...</span>
                        <button className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-gray-200 text-[10px] sm:text-xs text-gray-600 hover:bg-gray-50">124568</button>
                        <button className="p-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50"><svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Transaction Details Page ──────────────────────────────────────────────
const InfoRow = ({ label, value, mono }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-1.5 gap-1 sm:gap-0">
        <span className="text-[11px] sm:text-xs text-gray-800 font-semibold sm:w-32 flex-shrink-0">{label}</span>
        <span className="hidden sm:inline text-gray-300 mx-2">:</span>
        <span className={`text-[11px] sm:text-xs font-medium text-gray-800 ${mono ? "font-mono" : ""} break-words`}>{value || "–"}</span>
    </div>
);

const StatusStep = ({ label, date, time, done, active }) => (
    <div className="flex flex-col items-center text-center px-1">
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${done || active ? "bg-green-500" : "bg-gray-200"}`}>
            {(done || active) ? (
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><path d="M20 6L9 17l-5-5" /></svg>
            ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            )}
        </div>
        <div className={`text-[10px] sm:text-xs font-semibold mt-1 ${active ? "text-green-600" : done ? "text-gray-700" : "text-gray-400"}`}>{label}</div>
        <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{date}</div>
        <div className="text-[9px] sm:text-[10px] text-gray-500">{time}</div>
    </div>
);

const TransactionDetails = ({ txn, onBack }) => {
    const [activeTab, setActiveTab] = useState("Overview");
    const detailTabs = ["Overview"];

    return (
        <div className="p-3 sm:p-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Transaction Details</h1>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 mt-0.5 flex-wrap">
                        {["Dashboard", "Transactions", "Transaction Details"].map((b, i, arr) => (
                            <span key={b} className="flex items-center gap-1.5">
                                <span className={i === arr.length - 1 ? "text-gray-800" : "hover:text-blue-600 cursor-pointer"}>{b}</span>
                                {i < arr.length - 1 && <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button onClick={onBack} className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        Back
                    </button>
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.download} /></svg>
                        Receipt
                    </button>
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] sm:text-sm font-semibold transition-colors shadow-sm">
                        Actions
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </div>

            {/* Summary card */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 mb-3 sm:mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                    {[
                        { label: "Transaction ID", value: txn?.id || "TXN12548789", extra: <StatusBadge status="Success" />, mono: true },
                        { label: "Order ID", value: txn?.orderId || "ORD12548789", mono: true },
                        { label: "Amount", value: "₹ 25,000.00", big: true },
                        { label: "API Used", value: null, api: "RazorpayX" },
                        { label: "UTR / Ref No.", value: "UTR5125487963", mono: true },
                        { label: "Created At", value: "14 May 2025, 11:30 AM" },
                    ].map((col) => (
                        <div key={col.label}>
                            <div className="text-[11px] sm:text-xs text-gray-500 mb-1">{col.label}</div>
                            {col.api ? (
                                <ApiLogo api={col.api} />
                            ) : (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`${col.big ? "text-base sm:text-xl font-bold text-gray-900" : "text-xs sm:text-sm font-semibold text-gray-800"} ${col.mono ? "font-mono" : ""} break-words`}>
                                        {col.value}
                                    </span>
                                    {col.extra}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100 px-2 sm:px-4 overflow-x-auto">
                    {detailTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 sm:px-4 py-2.5 sm:py-3.5 text-[12px] sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent hover:text-gray-800"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "Overview" && (
                    <div className="p-3 sm:p-5">
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
                            {/* Left col */}
                            <div className="flex-1 lg:flex-[2] space-y-4 sm:space-y-5">
                                {/* Transaction Info */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Transaction Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8">
                                        <div>
                                            <InfoRow label="Merchant Name" value="ABC Pvt Ltd" />
                                            <InfoRow label="Merchant ID" value="MER1254" mono />
                                            <InfoRow label="User" value="Rohit Sharma" />
                                            <InfoRow label="Channel" value="API" />
                                            <InfoRow label="Source IP" value="103.21.45.67" mono />
                                            <InfoRow label="Device" value="Server" />
                                            <InfoRow label="Remark" value="–" />
                                        </div>
                                        <div>
                                            <InfoRow label="Transaction Type" value="Payout" />
                                            <InfoRow label="Priority" value="Normal" />
                                            <InfoRow label="Amount" value="₹ 25,000.00" />
                                            <InfoRow label="Fees" value="₹ 12.50" />
                                            <InfoRow label="Net Amount" value="₹ 24,987.50" />
                                            <InfoRow label="Currency" value="INR" />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Flow */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Status Flow</h3>
                                    <div className="grid grid-cols-4 gap-1 sm:gap-2">
                                        {[
                                            { label: "Initiated", date: "14 May 2025", time: "11:30:12 AM", done: true },
                                            { label: "Queued", date: "14 May 2025", time: "11:30:13 AM", done: true },
                                            { label: "Processing", date: "14 May 2025", time: "11:30:15 AM", done: true },
                                            { label: "Success", date: "14 May 2025", time: "11:30:28 AM", done: true, active: true },
                                        ].map((step) => (
                                            <StatusStep key={step.label} {...step} />
                                        ))}
                                    </div>
                                </div>

                                {/* Response Info */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Response Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8">
                                        <div>
                                            <InfoRow label="Response Code" value="200" />
                                            <InfoRow label="Response Message" value="Payout Successful" />
                                            <InfoRow label="Response Time" value="13 Sec 245 ms" />
                                        </div>
                                        <div>
                                            <InfoRow label="UTR / Ref No." value="UTR5125487963" mono />
                                            <InfoRow label="Settlement Time" value="14 May 2025, 11:30:28 AM" />
                                            <InfoRow label="Amount Credited" value="₹ 25,000.00" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right col */}
                            <div className="flex-1 lg:flex-1 space-y-3 sm:space-y-4">
                                {/* Beneficiary */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Beneficiary Information</h3>
                                        <button className="text-[11px] sm:text-xs text-blue-600 hover:underline text-left">View All</button>
                                    </div>
                                    <div className="flex justify-center mb-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-gray-400"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        </div>
                                    </div>
                                    <InfoRow label="Name" value="Amit Kumar" />
                                    <InfoRow label="Account No." value="9876543210" mono />
                                    <InfoRow label="IFSC Code" value="HDFC0001234" mono />
                                    <InfoRow label="Bank Name" value="HDFC Bank" />
                                    <InfoRow label="Account Type" value="Savings" />
                                    <InfoRow label="UPI ID" value="–" />
                                </div>

                                {/* Risk */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Risk & Compliance</h3>
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                        </div>
                                    </div>
                                    {[
                                        { label: "Risk Score", badge: "Low (12)", color: "bg-green-100 text-green-700" },
                                        { label: "Velocity Check", badge: "Passed", color: "bg-green-100 text-green-700" },
                                        { label: "Duplicate Check", badge: "Passed", color: "bg-green-100 text-green-700" },
                                        { label: "Rule Engine", badge: "Passed", color: "bg-green-100 text-green-700" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1">
                                            <span className="text-[11px] sm:text-xs text-gray-500">{item.label}</span>
                                            <span className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded ${item.color} w-fit`}>{item.badge}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Quick Actions</h3>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <button className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.refresh} /></svg>
                                            Retry Transaction
                                        </button>
                                        <button className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.undo} /></svg>
                                            Return to SGPay
                                        </button>
                                        <button className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-red-200 rounded-lg text-[11px] sm:text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                                            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.undo} /></svg>
                                            Reverse Transaction
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== "Overview" && (
                    <div className="p-8 sm:p-10 text-center text-gray-400 text-xs sm:text-sm">
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="mx-auto mb-3 text-gray-200"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        {activeTab} content will appear here
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── App ───────────────────────────────────────────────────────────────────
export default function TransactionScreen() {
    const [page, setPage] = useState("transactions");
    const [selectedTxn, setSelectedTxn] = useState(null);

    const handleViewDetails = (txn) => {
        setSelectedTxn(txn);
        setPage("details");
    };

    const handleBack = () => {
        setPage("transactions");
        setSelectedTxn(null);
    };

    return (
        <div className="w-full bg-gray-50">
            {page === "transactions" ? (
                <TransactionsPage onViewDetails={handleViewDetails} />
            ) : (
                <TransactionDetails txn={selectedTxn} onBack={handleBack} />
            )}
        </div>
    );
}
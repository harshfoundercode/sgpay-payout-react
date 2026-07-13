// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import merchantService from "../../services/MerchantListServices";

// // ── Badge Components ──────────────────────────────────────────────────────────
// const STATUS_STYLES = {
//   active: "bg-green-100 text-green-700",
//   inactive: "bg-red-100 text-red-600",
//   pending: "bg-yellow-100 text-yellow-700",
//   suspended: "bg-red-100 text-red-600",
//   approved: "bg-green-100 text-green-700",
//   rejected: "bg-red-100 text-red-600",
//   "in review": "bg-orange-100 text-orange-600",
//   "on hold": "bg-purple-100 text-purple-700",
// };

// function Badge({ label, styleMap }) {
//   // Convert label to lowercase for matching
//   const labelKey = label?.toLowerCase() || '';
//   const matchedKey = Object.keys(styleMap).find(key => key.toLowerCase() === labelKey);

//   return (
//     <span className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${styleMap[matchedKey] ?? "bg-gray-100 text-gray-600"}`}>
//       {label}
//     </span>
//   );
// }

// // ── Stat Card ─────────────────────────────────────────────────────────────────
// function StatCard({ icon, iconBg, label, value, sub, subColor }) {
//   return (
//     <div className="bg-white rounded-xl p-2 sm:p-3 border border-gray-100 flex items-center gap-2 sm:gap-4">
//       <div className={`w-8 h-8 sm:w-10 sm:h-10 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
//         {icon}
//       </div>
//       <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
//         <p className="text-[10px] sm:text-xs text-gray-500 truncate">{label}</p>
//         <p className="text-sm sm:text-[18px] font-bold text-gray-900 leading-tight truncate">{value}</p>
//         {sub && <p className={`text-[10px] sm:text-xs font-semibold ${subColor ?? "text-gray-500"} truncate`}>{sub}</p>}
//       </div>
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function MerchantListPage() {
//   const [search, setSearch] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [merchantData, setMerchantData] = useState({
//     data: [],
//     stats: {
//       total: 0,
//       active: "0",
//       inactive: "0",
//       pending: "0"
//     },
//     total: 0,
//     totalPages: 0,
//     page: 1,
//     limit: 10
//   });

//   const navigate = useNavigate();

//   // Fetch merchants from API
//   const fetchMerchants = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Build params
//       const params = {
//         page: page,
//         limit: limit
//       };

//       // Add search if present
//       if (search) {
//         params.search = search;
//       }

//       // Add status filter if not "All Status"
//       if (selectedStatus !== "All Status") {
//         params.status = selectedStatus.toLowerCase();
//       }

//       const response = await merchantService.getMerchants(params);
//       setMerchantData(response);
//     } catch (err) {
//       console.error('Error fetching merchants:', err);
//       setError('Failed to load merchants. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when dependencies change
//   useEffect(() => {
//     fetchMerchants();
//   }, [page, limit, selectedStatus]);

//   // Handle search with debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (search !== undefined) {
//         setPage(1); // Reset to first page on search
//         fetchMerchants();
//       }
//     }, 500); // 500ms debounce

//     return () => clearTimeout(timer);
//   }, [search]);

//   const statusOptions = ["All Status", "Active", "Inactive", "Pending", "Suspended"];

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     const num = parseFloat(amount);
//     if (isNaN(num)) return '₹ 0.00';
//     return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//   };

//   // Get status display name
//   const getStatusDisplay = (status) => {
//     if (!status) return 'Unknown';
//     return status.charAt(0).toUpperCase() + status.slice(1);
//   };

//   return (
//     <div className="min-h-screen p-3 sm:p-0">
//       {/* ── Page Header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
//         <div>
//           <h1 className="text-lg sm:text-xl font-bold text-gray-900">Merchant List</h1>
//           <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 flex flex-wrap items-center">
//             Dashboard <span className="mx-1">›</span> Merchants <span className="mx-1">›</span>
//             <span className="text-gray-600">Merchant List</span>
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
//             <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//             </svg>
//             Export
//           </button>
//           <button
//             onClick={() => navigate("/create-merchant")}
//             className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
//           >
//             <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//             Add Merchant
//           </button>
//         </div>
//       </div>

//       {/* ── Stat Cards ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
//         <StatCard
//           iconBg="bg-blue-50"
//           icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
//           label="Total Merchants"
//           value={merchantData.stats?.total?.toLocaleString() || '0'}
//           sub="All Time"
//         />
//         <StatCard
//           iconBg="bg-green-50"
//           icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//           label="Active Merchants"
//           value={merchantData.stats?.active?.toLocaleString() || '0'}
//           sub={merchantData.stats?.total > 0 ? `${((parseInt(merchantData.stats.active) / merchantData.stats.total) * 100).toFixed(1)}%` : '0%'}
//           subColor="text-green-600"
//         />
//         <StatCard
//           iconBg="bg-red-50"
//           icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
//           label="Inactive Merchants"
//           value={merchantData.stats?.inactive?.toLocaleString() || '0'}
//           sub={merchantData.stats?.total > 0 ? `${((parseInt(merchantData.stats.inactive) / merchantData.stats.total) * 100).toFixed(1)}%` : '0%'}
//           subColor="text-red-500"
//         />
//         <StatCard
//           iconBg="bg-orange-50"
//           icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//           label="Pending Approval"
//           value={merchantData.stats?.pending?.toLocaleString() || '0'}
//           sub={merchantData.stats?.total > 0 ? `${((parseInt(merchantData.stats.pending) / merchantData.stats.total) * 100).toFixed(1)}%` : '0%'}
//           subColor="text-orange-500"
//         />
//       </div>

//       {/* ── Table Card ── */}
//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

//         {/* Filter Bar */}
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-4 border-b border-gray-100">
//           <div className="relative flex-1 sm:flex-none">
//             <input
//               type="text"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search by Merchant ID / Name / Contact / Email"
//               className="w-full sm:w-72 pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-[11px] sm:text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
//               disabled={loading}
//             />
//             <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>

//           <div className="relative w-full sm:w-auto">
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
//               disabled={loading}
//             >
//               {statusOptions.map(option => (
//                 <option key={option} value={option}>{option}</option>
//               ))}
//             </select>
//             <svg className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>

//           <button
//             onClick={fetchMerchants}
//             className="flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
//             disabled={loading}
//           >
//             <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//             </svg>
//             Refresh
//           </button>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-3 text-sm text-gray-500">Loading merchants...</p>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && !loading && (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="mt-3 text-sm text-red-500">{error}</p>
//               <button
//                 onClick={fetchMerchants}
//                 className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Table - Horizontal scroll on mobile */}
//         {!loading && !error && (
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-250 text-sm">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100">
//                   {["Merchant ID", "Business Name", "Contact Person", "Mobile", "Email", "Business Type", "Status", "Created Date", "Actions"].map(col => (
//                     <th key={col} className="text-left px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {merchantData.data.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="text-center py-8 text-gray-500 text-sm">
//                       No merchants found
//                     </td>
//                   </tr>
//                 ) : (
//                   merchantData.data.map((m) => (
//                     <tr key={m.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <button
//                           onClick={() => navigate(`/merchants/${m.id}`)}
//                           className="font-semibold text-blue-600 hover:underline whitespace-nowrap text-[11px] sm:text-xs"
//                         >
//                           {m.merchant_id || m.id}
//                         </button>
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium whitespace-nowrap text-[11px] sm:text-xs max-w-37.5 truncate">
//                         {m.business_name || m.merchant_name}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap text-[11px] sm:text-xs">
//                         {m.merchant_name || m.contact || '-'}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap text-[11px] sm:text-xs">
//                         {m.mobile || '-'}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500 whitespace-nowrap text-[11px] sm:text-xs max-w-37.5 truncate">
//                         {m.email || '-'}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap text-[11px] sm:text-xs">
//                         {m.business_type || '-'}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
//                         <Badge
//                           label={getStatusDisplay(m.merchant_status || m.status)}
//                           styleMap={STATUS_STYLES}
//                         />
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500 whitespace-nowrap text-[11px] sm:text-xs">
//                         {formatDate(m.created_at || m.created)}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <button className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-700">
//                           <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
//                             <circle cx="12" cy="5" r="1.5" />
//                             <circle cx="12" cy="12" r="1.5" />
//                             <circle cx="12" cy="19" r="1.5" />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => navigate(`/edit-merchant/${m.id}`)}
//                           className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-blue-600"
//                         >
//                           <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {!loading && !error && merchantData.data.length > 0 && (
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 border-t border-gray-100">
//             <p className="text-[11px] sm:text-sm text-gray-500">
//               Showing {((merchantData.page - 1) * merchantData.limit) + 1} to {Math.min(merchantData.page * merchantData.limit, merchantData.total)} of {merchantData.total} results
//             </p>
//             <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-1.5">
//               <div className="flex items-center gap-1.5 mr-0 sm:mr-3">
//                 <span className="text-[11px] sm:text-sm text-gray-500">Rows per page</span>
//                 <select
//                   value={limit}
//                   onChange={(e) => {
//                     setLimit(parseInt(e.target.value));
//                     setPage(1);
//                   }}
//                   className="text-[11px] sm:text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//               <button
//                 onClick={() => setPage(p => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm sm:text-base"
//               >
//                 ‹
//               </button>

//               {/* Page numbers */}
//               {Array.from({ length: Math.min(5, merchantData.totalPages) }, (_, i) => {
//                 let p;
//                 if (merchantData.totalPages <= 5) {
//                   p = i + 1;
//                 } else if (page <= 3) {
//                   p = i + 1;
//                 } else if (page >= merchantData.totalPages - 2) {
//                   p = merchantData.totalPages - 4 + i;
//                 } else {
//                   p = page - 2 + i;
//                 }
//                 return (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-[11px] sm:text-sm font-medium transition-colors ${page === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
//                   >
//                     {p}
//                   </button>
//                 );
//               })}

//               <button
//                 onClick={() => setPage(p => Math.min(merchantData.totalPages, p + 1))}
//                 disabled={page === merchantData.totalPages}
//                 className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm sm:text-base"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import merchantService from "../../services/MerchantListServices";

// ── Badge Components ──────────────────────────────────────────────────────────
const STATUS_STYLES = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-700",
  suspended: "bg-red-100 text-red-600",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  "in review": "bg-orange-100 text-orange-600",
  "on hold": "bg-purple-100 text-purple-700",
};

function Badge({ label, styleMap }) {
  const labelKey = label?.toLowerCase() || '';
  const matchedKey = Object.keys(styleMap).find(key => key.toLowerCase() === labelKey);

  return (
    <span className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${styleMap[matchedKey] ?? "bg-gray-100 text-gray-600"}`}>
      {label}
    </span>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, label, value, sub, subColor }) {
  return (
    <div className="bg-white rounded-xl p-2 sm:p-3 border border-gray-100 flex items-center gap-2 sm:gap-4">
      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
        <p className="text-[10px] sm:text-xs text-gray-500 truncate">{label}</p>
        <p className="text-sm sm:text-[18px] font-bold text-gray-900 leading-tight truncate">{value}</p>
        {sub && <p className={`text-[10px] sm:text-xs font-semibold ${subColor ?? "text-gray-500"} truncate`}>{sub}</p>}
      </div>
    </div>
  );
}

// ── Add Money Modal ──────────────────────────────────────────────────────────
function AddMoneyModal({ isOpen, onClose, merchantId, merchantName, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const amountNum = parseFloat(amount.replace(/,/g, ''));
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Please enter a valid amount');
      }

      await merchantService.addWalletMoney({
        merchant_id: merchantId,
        amount: amountNum,
        remark: remark || `Wallet funding for ${merchantName}`
      });

      onSuccess();
      onClose();
      // Reset form
      setAmount('');
      setRemark('');
    } catch (err) {
      setError(err.message || 'Failed to add money. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add Wallet Money</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Merchant:</span> {merchantName}
          </p>
          <p className="text-xs text-gray-500 mt-1">ID: {merchantId}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9,.]/g, '');
                  setAmount(val);
                }}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Remark <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter remark..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Add Money'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MerchantListPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [merchantData, setMerchantData] = useState({
    data: [],
    stats: {
      total: 0,
      active: "0",
      inactive: "0",
      pending: "0"
    },
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 10
  });

  // Add Money Modal State
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const navigate = useNavigate();

  // Fetch merchants from API
  const fetchMerchants = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: page,
        limit: limit
      };

      if (search) {
        params.search = search;
      }

      if (selectedStatus !== "All Status") {
        params.status = selectedStatus.toLowerCase();
      }

      const response = await merchantService.getMerchants(params);
      setMerchantData(response);
    } catch (err) {
      console.error('Error fetching merchants:', err);
      setError('Failed to load merchants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when dependencies change
  useEffect(() => {
    fetchMerchants();
  }, [page, limit, selectedStatus]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== undefined) {
        setPage(1);
        fetchMerchants();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const statusOptions = ["All Status", "Active", "Inactive", "Pending", "Suspended"];

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  // Handle Add Money click
  const handleAddMoneyClick = (merchant) => {
    setSelectedMerchant(merchant);
    setShowAddMoneyModal(true);
  };

  // Handle successful wallet funding
  const handleWalletFunded = () => {
    // Refresh the merchant list to update any displayed wallet balance
    fetchMerchants();
    // Show success toast/notification (you can add your preferred notification system)
    alert('Wallet funded successfully!'); // Replace with toast notification if available
  };

  return (
    <div className="min-h-screen p-3 sm:p-0">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Merchant List</h1>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 flex flex-wrap items-center">
            Dashboard <span className="mx-1">›</span> Merchants <span className="mx-1">›</span>
            <span className="text-gray-600">Merchant List</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button
            onClick={() => navigate("/create-merchant")}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Merchant
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
        <StatCard
          iconBg="bg-blue-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          label="Total Merchants"
          value={merchantData.stats?.total?.toLocaleString() || '0'}
          sub="All Time"
        />
        <StatCard
          iconBg="bg-green-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Active Merchants"
          value={merchantData.stats?.active?.toLocaleString() || '0'}
          sub={merchantData.stats?.total > 0 ? `${((parseInt(merchantData.stats.active) / merchantData.stats.total) * 100).toFixed(1)}%` : '0%'}
          subColor="text-green-600"
        />
        <StatCard
          iconBg="bg-red-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
          label="Inactive Merchants"
          value={merchantData.stats?.inactive?.toLocaleString() || '0'}
          sub={merchantData.stats?.total > 0 ? `${((parseInt(merchantData.stats.inactive) / merchantData.stats.total) * 100).toFixed(1)}%` : '0%'}
          subColor="text-red-500"
        />
        <StatCard
          iconBg="bg-orange-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Pending Approval"
          value={merchantData.stats?.pending?.toLocaleString() || '0'}
          sub={merchantData.stats?.total > 0 ? `${((parseInt(merchantData.stats.pending) / merchantData.stats.total) * 100).toFixed(1)}%` : '0%'}
          subColor="text-orange-500"
        />
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-4 border-b border-gray-100">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by Merchant ID / Name / Contact / Email"
              className="w-full sm:w-72 pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-[11px] sm:text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
              disabled={loading}
            />
            <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              disabled={loading}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <svg className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button
            onClick={fetchMerchants}
            className="flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
            disabled={loading}
          >
            <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-500">Loading merchants...</p>
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
                onClick={fetchMerchants}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Table - Horizontal scroll on mobile */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-250 text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Merchant ID", "Business Name", "Contact Person", "Mobile", "Email", "Business Type", "Status", "Created Date", "Actions"].map(col => (
                    <th key={col} className="text-left px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {merchantData.data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8 text-gray-500 text-sm">
                      No merchants found
                    </td>
                  </tr>
                ) : (
                  merchantData.data.map((m) => (
                    <tr key={m.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <button
                          onClick={() => navigate(`/merchants/${m.id}`)}
                          className="font-semibold text-blue-600 hover:underline whitespace-nowrap text-[11px] sm:text-xs"
                        >
                          {m.merchant_id || m.id}
                        </button>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium whitespace-nowrap text-[11px] sm:text-xs max-w-37.5 truncate">
                        {m.business_name || m.merchant_name}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap text-[11px] sm:text-xs">
                        {m.merchant_name || m.contact || '-'}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap text-[11px] sm:text-xs">
                        {m.mobile || '-'}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500 whitespace-nowrap text-[11px] sm:text-xs max-w-37.5 truncate">
                        {m.email || '-'}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap text-[11px] sm:text-xs">
                        {m.business_type || '-'}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <Badge
                          label={getStatusDisplay(m.merchant_status || m.status)}
                          styleMap={STATUS_STYLES}
                        />
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500 whitespace-nowrap text-[11px] sm:text-xs">
                        {formatDate(m.created_at || m.created)}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <div className="flex items-center gap-1">
                          {/* Add Money Button */}
                          <button
                            onClick={() => handleAddMoneyClick(m)}
                            className="p-1 hover:bg-green-50 rounded-md transition-colors text-green-500 hover:text-green-700"
                            title="Add wallet money"
                          >
                            <span className="flex items-center gap-0.5">
                              <span>₹</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                              </svg>
                            </span>
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => navigate(`/edit-merchant/${m.id}`)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-blue-600"
                            title="Edit merchant"
                          >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>


                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && merchantData.data.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 border-t border-gray-100">
            <p className="text-[11px] sm:text-sm text-gray-500">
              Showing {((merchantData.page - 1) * merchantData.limit) + 1} to {Math.min(merchantData.page * merchantData.limit, merchantData.total)} of {merchantData.total} results
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-1.5">
              <div className="flex items-center gap-1.5 mr-0 sm:mr-3">
                <span className="text-[11px] sm:text-sm text-gray-500">Rows per page</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value));
                    setPage(1);
                  }}
                  className="text-[11px] sm:text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm sm:text-base"
              >
                ‹
              </button>

              {Array.from({ length: Math.min(5, merchantData.totalPages) }, (_, i) => {
                let p;
                if (merchantData.totalPages <= 5) {
                  p = i + 1;
                } else if (page <= 3) {
                  p = i + 1;
                } else if (page >= merchantData.totalPages - 2) {
                  p = merchantData.totalPages - 4 + i;
                } else {
                  p = page - 2 + i;
                }
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-[11px] sm:text-sm font-medium transition-colors ${page === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setPage(p => Math.min(merchantData.totalPages, p + 1))}
                disabled={page === merchantData.totalPages}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm sm:text-base"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add Money Modal ── */}
      {selectedMerchant && (
        <AddMoneyModal
          isOpen={showAddMoneyModal}
          onClose={() => {
            setShowAddMoneyModal(false);
            setSelectedMerchant(null);
          }}
          merchantId={selectedMerchant.id}
          merchantName={selectedMerchant.business_name || selectedMerchant.merchant_name}
          onSuccess={handleWalletFunded}
        />
      )}
    </div>
  );
}
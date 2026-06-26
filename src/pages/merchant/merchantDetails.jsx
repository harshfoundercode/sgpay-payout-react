// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import merchantService from "../../services/MerchantListServices";

// // ── Reusable Badge ─────────────────────────────────────────────────────────────
// function Badge({ label, variant = "green" }) {
//     const variants = {
//         green: "bg-green-100 text-green-700",
//         red: "bg-red-100 text-red-600",
//         yellow: "bg-yellow-100 text-yellow-700",
//         orange: "bg-orange-100 text-orange-600",
//         purple: "bg-purple-100 text-purple-700",
//         gray: "bg-gray-100 text-gray-600",
//     };
//     return (
//         <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${variants[variant]}`}>
//             {label}
//         </span>
//     );
// }

// // ── Info Row ──────────────────────────────────────────────────────────────────
// function InfoRow({ label, value, isLink, isBadge, badgeVariant }) {
//     return (
//         <div className="flex flex-col sm:flex-row sm:items-start py-1.5 gap-1 sm:gap-0">
//             <span className="sm:w-36 text-[11px] sm:text-xs text-gray-500 font-semibold flex-shrink-0">{label}</span>
//             <span className="hidden sm:inline text-gray-400 mr-2 text-xs mt-0.5">:</span>
//             {isBadge
//                 ? <Badge label={value} variant={badgeVariant} />
//                 : isLink
//                     ? <a href={value} className="text-blue-500 text-[11px] sm:text-xs hover:underline break-words">{value}</a>
//                     : <span className="text-[11px] sm:text-xs text-gray-800 font-semibold break-words">{value || "—"}</span>
//             }
//         </div>
//     );
// }

// // ── Transaction Row ───────────────────────────────────────────────────────────
// function TxRow({ id, amount, status, date }) {
//     const statusStyle = status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600";
//     return (
//         <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
//             <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-blue-600 font-medium truncate max-w-[100px]">{id}</td>
//             <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-800 whitespace-nowrap">{amount}</td>
//             <td className="px-2 sm:px-3 py-1.5 sm:py-2"><span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${statusStyle}`}>{status}</span></td>
//             <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">{date}</td>
//         </tr>
//     );
// }

// // ── Donut Chart (SVG) ─────────────────────────────────────────────────────────
// function DonutChart({ percent = 0 }) {
//     const r = 52, cx = 64, cy = 64;
//     const circ = 2 * Math.PI * r;
//     const success = (percent / 100) * circ;
//     const failed = ((100 - percent) / 100) * circ;
//     return (
//         <svg width="110" height="110" viewBox="0 0 128 128" className="sm:w-[128px] sm:h-[128px] w-[110px] h-[110px]">
//             {/* Track */}
//             <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="14" />
//             {/* Failed arc (red) */}
//             <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fca5a5" strokeWidth="14"
//                 strokeDasharray={`${failed} ${circ}`}
//                 strokeDashoffset={-success}
//                 strokeLinecap="round"
//                 transform={`rotate(-90 ${cx} ${cy})`}
//             />
//             {/* Success arc (green) */}
//             <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22c55e" strokeWidth="14"
//                 strokeDasharray={`${success} ${circ}`}
//                 strokeDashoffset={0}
//                 strokeLinecap="round"
//                 transform={`rotate(-90 ${cx} ${cy})`}
//             />
//             <text x={cx} y={cy - 6} textAnchor="middle" className="text-xs sm:text-sm font-bold" fontSize="14" fontWeight="700" fill="#111827">{percent}%</text>
//             <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="#9ca3af">Success Rate</text>
//         </svg>
//     );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function MerchantDetailsPage({ onBack }) {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [activeTab, setActiveTab] = useState("Overview");
//     const [merchant, setMerchant] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const tabs = ["Overview"];

//     // ─── Fetch Merchant Details ──────────────────────────────────────────────
//     useEffect(() => {
//         const fetchMerchant = async () => {
//             try {
//                 setLoading(true);
//                 // Use the ID from params or fallback to 3
//                 const merchantId = id || 3;
//                 const response = await merchantService.getMerchantDetails(merchantId);
//                 console.log("Merchant Details:", response);
//                 setMerchant(response);
//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching merchant details:", err);
//                 setError("Failed to load merchant details. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMerchant();
//     }, [id]);

//     // ─── Format Helpers ──────────────────────────────────────────────────────
//     const formatCurrency = (amount) => {
//         const num = parseFloat(amount);
//         if (isNaN(num)) return '₹ 0.00';
//         return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-IN', { 
//             day: '2-digit', 
//             month: 'short', 
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     const getStatusBadgeVariant = (status) => {
//         if (!status) return 'gray';
//         const statusMap = {
//             'active': 'green',
//             'inactive': 'red',
//             'suspended': 'red',
//             'pending': 'yellow',
//             'approved': 'green',
//             'rejected': 'red'
//         };
//         return statusMap[status.toLowerCase()] || 'gray';
//     };

//     const getStatusDisplay = (status) => {
//         if (!status) return 'Unknown';
//         return status.charAt(0).toUpperCase() + status.slice(1);
//     };

//     // ─── Loading State ────────────────────────────────────────────────────────
//     if (loading) {
//         return (
//             <div className="bg-gray-50 min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading merchant details...</p>
//                 </div>
//             </div>
//         );
//     }

//     // ─── Error State ──────────────────────────────────────────────────────────
//     if (error || !merchant) {
//         return (
//             <div className="bg-gray-50 min-h-screen p-4 flex items-center justify-center">
//                 <div className="text-center">
//                     <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="mt-4 text-red-600">{error || "Merchant not found"}</p>
//                     <button 
//                         onClick={() => navigate('/all-merchant')}
//                         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         Back to Merchants
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // ─── Extract Data ─────────────────────────────────────────────────────────
//     const merchantInfo = merchant;
//     const health = merchantInfo.merchant_health_30d || {};
//     const recentTxns = merchantInfo.recent_transactions || [];
//     const successRate = merchantInfo.success_rate_30d || 0;

//     // Calculate total transactions from health
//     const totalTransactions = (health.successful?.count || 0) + 
//                              (health.failed?.count || 0) + 
//                              (health.pending?.count || 0);

//     return (
//         <div className="bg-gray-50 min-h-screen p-3 sm:p-0">

//             {/* ── Page Header ── */}
//             <div className="mb-4 sm:mb-6">
//                 <p className="text-[11px] sm:text-sm text-gray-400 mb-2 flex flex-wrap items-center">
//                     Merchants <span className="mx-1">›</span> Merchant List <span className="mx-1">›</span>
//                     <span className="text-gray-600">Merchant Details</span>
//                 </p>
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                     <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
//                         <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{merchantInfo.business_name || merchantInfo.merchant_name}</h1>
//                         <Badge label={getStatusDisplay(merchantInfo.merchant_status)} variant={getStatusBadgeVariant(merchantInfo.merchant_status)} />
//                     </div>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={onBack || (() => navigate('/all-merchant'))}
//                             className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
//                         >
//                             <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                             </svg>
//                             Back
//                         </button>
                       
//                     </div>
//                 </div>

//                 {/* Meta row */}
//                 <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2 sm:mt-3 text-[11px] sm:text-sm text-gray-500">
//                     <span className="flex items-center gap-1">
//                         <span className="font-medium text-gray-700 text-[11px] sm:text-xs">Merchant ID:</span>
//                         <span className="font-semibold text-gray-900 text-[11px] sm:text-xs">{merchantInfo.merchant_id}</span>
//                         <button className="ml-0.5 text-gray-400 hover:text-gray-600">
//                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                         </button>
//                     </span>
//                     <span><span className="font-medium text-gray-700 text-[11px] sm:text-xs">Onboarded On:</span> {formatDate(merchantInfo.created_at)}</span>
//                     <span><span className="font-medium text-gray-700 text-[11px] sm:text-xs">Onboarded By:</span> System</span>
//                 </div>
//             </div>

//             {/* ── Tabs ── */}
//             <div className="flex gap-0 border-b border-gray-200 mt-2 mb-4 sm:mb-5 overflow-x-auto">
//                 {tabs.map(tab => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
//                             ? "border-blue-600 text-blue-600"
//                             : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                             }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* ── Content Grid ── */}
//             <div className="flex flex-col lg:flex-row gap-4">

//                 {/* ── LEFT COLUMN ── */}
//                 <div className="flex-1 min-w-0 space-y-4">

//                     {/* Row 1: Merchant Info + Financial Overview */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                         {/* Merchant Information */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Merchant Information</h2>
//                             <InfoRow label="Merchant ID" value={merchantInfo.merchant_id} />
//                             <InfoRow label="Merchant Name" value={merchantInfo.merchant_name} />
//                             <InfoRow label="Business Name" value={merchantInfo.business_name} />
//                             <InfoRow label="Contact Person" value={merchantInfo.merchant_name} />
//                             <InfoRow label="Mobile" value={merchantInfo.mobile} />
//                             <InfoRow label="Email" value={merchantInfo.email} />
//                             <InfoRow label="Website" value={merchantInfo.website_url} isLink={!!merchantInfo.website_url} />
//                             <div className="border-t border-gray-50 mt-2 sm:mt-3 pt-2 sm:pt-3">
//                                 <InfoRow label="GST Number" value={merchantInfo.gst_number || "—"} />
//                                 <InfoRow label="PAN Number" value={merchantInfo.pan_number || "—"} />
//                                 <InfoRow label="Business Type" value={merchantInfo.business_type || "—"} />
//                                 <InfoRow label="City" value={merchantInfo.city || "—"} />
//                                 <InfoRow label="State" value={merchantInfo.state || "—"} />
//                                 <InfoRow label="Pincode" value={merchantInfo.pincode || "—"} />
//                                 <InfoRow label="Created Date" value={formatDate(merchantInfo.created_at)} />
//                                 <InfoRow label="Status" value={getStatusDisplay(merchantInfo.merchant_status)} isBadge badgeVariant={getStatusBadgeVariant(merchantInfo.merchant_status)} />
//                             </div>
//                         </div>

//                         {/* Financial Overview */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Financial Overview</h2>
//                             {[
//                                 ["Wallet Balance", formatCurrency(merchantInfo.wallet)],
//                                 ["Today's Volume", formatCurrency(merchantInfo.today_payout_total)],
//                                 ["Monthly Volume", formatCurrency(merchantInfo.month_payout_total)],
//                                 ["Success Rate (30D)", `${successRate.toFixed(2)}%`, "green"],
//                                 ["Failed Rate (30D)", `${merchantInfo.failed_rate_30d?.toFixed(2) || 0}%`, "red"],
//                                 ["Total Transactions (30D)", merchantInfo.total_transactions_30d || 0],
//                             ].map(([label, val, color]) => (
//                                 <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
//                                     <span className="text-[11px] sm:text-xs text-gray-500 font-semibold">{label}</span>
//                                     <span className={`text-[11px] sm:text-xs font-semibold ${color === "green" ? "text-green-600" : color === "red" ? "text-red-500" : "text-gray-900"
//                                         }`}>{val}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Row 2: Merchant Health + Recent Transactions */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                         {/* Merchant Health */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Merchant Health (30D)</h2>
//                             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
//                                 <DonutChart percent={successRate} />
//                                 <div className="flex flex-col gap-1.5 w-full sm:w-auto">
//                                     {[
//                                         { dot: "bg-green-500", label: "Successful", val: `${health.successful?.count || 0} (${health.successful?.percentage || 0}%)` },
//                                         { dot: "bg-red-400", label: "Failed", val: `${health.failed?.count || 0} (${health.failed?.percentage || 0}%)`, color: "text-red-500" },
//                                         { dot: "bg-orange-400", label: "Pending", val: `${health.pending?.count || 0} (${health.pending?.percentage || 0}%)` },
//                                         { dot: "bg-yellow-400", label: "Chargebacks", val: `${health.chargebacks?.count || 0} (${health.chargebacks?.percentage || 0}%)` },
//                                     ].map(({ dot, label, val, color }) => (
//                                         <div key={label} className="flex items-center gap-2">
//                                             <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${dot}`} />
//                                             <span className="text-[11px] sm:text-xs text-gray-500 w-16 sm:w-20">{label}</span>
//                                             <span className={`text-[11px] sm:text-xs font-medium ${color ?? "text-gray-800"}`}>{val}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
//                                 <span className="text-[11px] sm:text-xs text-gray-500">Total Transactions</span>
//                                 <span className="text-xs sm:text-sm font-bold text-gray-900">{totalTransactions}</span>
//                             </div>
//                         </div>

//                         {/* Recent Transactions */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
//                                 <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Recent Transactions</h2>
//                                 <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">View All</button>
//                             </div>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full min-w-[400px] text-[11px] sm:text-xs">
//                                     <thead>
//                                         <tr className="border-b border-gray-100">
//                                             {["Transaction ID", "Amount", "Status", "Date & Time"].map(h => (
//                                                 <th key={h} className="text-left px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {recentTxns.length > 0 ? (
//                                             recentTxns.map((txn, index) => (
//                                                 <TxRow 
//                                                     key={txn.id || index}
//                                                     id={txn.trx_id || txn.id}
//                                                     amount={formatCurrency(txn.amount)}
//                                                     status={getStatusDisplay(txn.status)}
//                                                     date={formatDate(txn.created_at)}
//                                                 />
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan={4} className="text-center py-4 text-gray-400 text-xs">
//                                                     No recent transactions
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Row 3: Transaction Limits + API Config + Bank Info */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                         {/* Transaction Limits */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Transaction Limits</h2>
//                             {[
//                                 ["Min Amount", formatCurrency(merchantInfo.min_payout_amount)],
//                                 ["Max Amount", formatCurrency(merchantInfo.max_payout_amount)],
//                                 ["Daily Limit", formatCurrency(merchantInfo.daily_limit)],
//                                 ["Monthly Limit", formatCurrency(merchantInfo.monthly_limit)],
//                             ].map(([label, val]) => (
//                                 <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0 gap-2">
//                                     <span className="text-[11px] sm:text-xs text-gray-500">{label}</span>
//                                     <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right">{val}</span>
//                                 </div>
//                             ))}
//                             <button className="mt-2 sm:mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                                 View Limits
//                             </button>
//                         </div>

//                         {/* API Configuration */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">API Configuration</h2>
//                             {[
//                                 ["API Key", merchantInfo.api_key || "—"],
//                                 ["Webhook URL", merchantInfo.webhook_url || "—"],
//                                 ["Webhook Enabled", merchantInfo.webhook_enabled ? "✅ Enabled" : "❌ Disabled"],
//                                 ["Settlement Cycle", merchantInfo.settlement_cycle || "—"],
//                                 ["Auto Settlement", merchantInfo.auto_settlement ? "✅ Enabled" : "❌ Disabled"],
//                             ].map(([label, val]) => (
//                                 <div key={label} className="py-1 border-b border-gray-50 last:border-0">
//                                     <div className="flex justify-between items-start gap-2">
//                                         <span className="text-[11px] sm:text-xs text-gray-500 flex-shrink-0">{label}</span>
//                                         <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right leading-tight">{val}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                             <button className="mt-2 sm:mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                                 View API Configuration
//                             </button>
//                         </div>

//                         {/* Bank Information */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Bank Information</h2>
//                             {[
//                                 ["Account Holder", merchantInfo.account_holder_name || "—"],
//                                 ["Bank Name", merchantInfo.bank_name || "—"],
//                                 ["Account Number", merchantInfo.account_number ? `****${merchantInfo.account_number.slice(-4)}` : "—"],
//                                 ["IFSC Code", merchantInfo.ifsc_code || "—"],
//                                 ["Branch Name", merchantInfo.branch_name || "—"],
//                             ].map(([label, val]) => (
//                                 <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0 gap-2">
//                                     <span className="text-[11px] sm:text-xs text-gray-500">{label}</span>
//                                     <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right">{val}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* ── RIGHT COLUMN ── */}
//                 <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">

//                     {/* Status Management */}
//                     <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
//                         <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Status Management</h2>
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
//                             <span className="text-[11px] sm:text-xs text-gray-500">Current Status</span>
//                             <div className="relative w-full sm:w-auto">
//                                 <select className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 py-1 text-[11px] sm:text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg focus:outline-none cursor-pointer">
//                                     <option>{getStatusDisplay(merchantInfo.merchant_status)}</option>
//                                     <option>Active</option>
//                                     <option>Inactive</option>
//                                     <option>Suspended</option>
//                                 </select>
//                                 <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>
//                         </div>

//                         <h3 className="text-[11px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-3">Status History</h3>
//                         <div className="relative pl-3 sm:pl-4">
//                             <div className="absolute left-1 top-0 bottom-0 w-px bg-gray-200" />
//                             {[
//                                 { dot: "bg-green-500", label: "Active", time: formatDate(merchantInfo.updated_at), by: "System" },
//                                 { dot: "bg-gray-300", label: "Created", time: formatDate(merchantInfo.created_at), by: "System" },
//                             ].map(({ dot, label, time, by }, i) => (
//                                 <div key={i} className="relative mb-3 last:mb-0">
//                                     <span className={`absolute -left-2 top-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${dot} border-2 border-white`} />
//                                     <p className="text-[11px] sm:text-xs font-semibold text-gray-800">{label}</p>
//                                     <p className="text-[9px] sm:text-[10px] text-gray-400">{time}</p>
//                                     <p className="text-[9px] sm:text-[10px] text-gray-400">{by}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <button className="mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                             View All History
//                         </button>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
//                         <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Quick Actions</h2>
//                         <div className="grid grid-cols-2 gap-2">
//                             <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
//                                 Edit
//                             </button>
//                             <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
//                                 <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
//                                 Suspend
//                             </button>
//                             <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
//                                 Reset Keys
//                             </button>
//                             <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
//                                 View Txns
//                             </button>
//                         </div>
//                     </div>

//                     {/* Notes */}
//                     <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
//                             <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Notes</h2>
//                             <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">Add Note</button>
//                         </div>
//                         <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
//                             <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                             </svg>
//                             <p className="text-[11px] sm:text-xs text-gray-400">No notes added yet.</p>
//                             <p className="text-[11px] sm:text-xs text-gray-400">Add your first note.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// src/pages/merchant/merchantDetails.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import merchantService from "../../services/MerchantListServices";

// ── Reusable Badge ─────────────────────────────────────────────────────────────
function Badge({ label, variant = "green" }) {
    const variants = {
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-600",
        yellow: "bg-yellow-100 text-yellow-700",
        orange: "bg-orange-100 text-orange-600",
        purple: "bg-purple-100 text-purple-700",
        gray: "bg-gray-100 text-gray-600",
    };
    return (
        <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${variants[variant]}`}>
            {label}
        </span>
    );
}

// ── Info Row ──────────────────────────────────────────────────────────────────
function InfoRow({ label, value, isLink, isBadge, badgeVariant }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start py-1.5 gap-1 sm:gap-0">
            <span className="sm:w-36 text-[11px] sm:text-xs text-gray-500 font-semibold shrink-0">{label}</span>
            <span className="hidden sm:inline text-gray-400 mr-2 text-xs mt-0.5">:</span>
            {isBadge
                ? <Badge label={value} variant={badgeVariant} />
                : isLink
                    ? <a href={value} className="text-blue-500 text-[11px] sm:text-xs hover:underline wrap-break-word">{value}</a>
                    : <span className="text-[11px] sm:text-xs text-gray-800 font-semibold wrap-break-word">{value || "—"}</span>
            }
        </div>
    );
}

// ── Transaction Row ───────────────────────────────────────────────────────────
function TxRow({ id, amount, status, date }) {
    const statusStyle = status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600";
    return (
        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-blue-600 font-medium truncate max-w-25">{id}</td>
            <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-800 whitespace-nowrap">{amount}</td>
            <td className="px-2 sm:px-3 py-1.5 sm:py-2"><span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${statusStyle}`}>{status}</span></td>
            <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">{date}</td>
        </tr>
    );
}

// ── Donut Chart (SVG) ─────────────────────────────────────────────────────────
function DonutChart({ percent = 0 }) {
    const r = 52, cx = 64, cy = 64;
    const circ = 2 * Math.PI * r;
    const success = (percent / 100) * circ;
    const failed = ((100 - percent) / 100) * circ;
    return (
        <svg width="110" height="110" viewBox="0 0 128 128" className="sm:w-32 sm:h-32 w-27.5 h-27.5">
            {/* Track */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="14" />
            {/* Failed arc (red) */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fca5a5" strokeWidth="14"
                strokeDasharray={`${failed} ${circ}`}
                strokeDashoffset={-success}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
            />
            {/* Success arc (green) */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22c55e" strokeWidth="14"
                strokeDasharray={`${success} ${circ}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
            />
            <text x={cx} y={cy - 6} textAnchor="middle" className="text-xs sm:text-sm font-bold" fontSize="14" fontWeight="700" fill="#111827">{percent}%</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="#9ca3af">Success Rate</text>
        </svg>
    );
}

// ── Document Viewer ──────────────────────────────────────────────────────────
function DocumentViewer({ filePath, label }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!filePath) return null;

    // Construct the full URL
    const baseURL = 'https://root.payoutpanel.com/';
    const fullUrl = `${baseURL}${filePath}`;

    // Get file extension
    const getFileExtension = (path) => {
        if (!path) return '';
        const parts = path.split('.');
        return parts[parts.length - 1].toLowerCase();
    };

    const ext = getFileExtension(filePath);
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext);
    const isPDF = ext === 'pdf';
    const fileName = filePath.split('/').pop();

    return (
        <div className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="flex-1">
                <span className="text-[11px] sm:text-xs text-gray-500">{label}</span>
                <p className="text-[11px] sm:text-xs text-gray-700 font-medium truncate max-w-37.5">{fileName}</p>
            </div>
            <div className="flex items-center gap-2">
                {isImage ? (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-2.5 py-1 text-[10px] font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        View
                    </button>
                ) : isPDF ? (
                    <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-[10px] font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        PDF
                    </a>
                ) : (
                    <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-[10px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Download
                    </a>
                )}
            </div>

            {/* Image Modal */}
            {isImage && isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setIsOpen(false)}>
                    <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                            ✕
                        </button>
                        <img
                            src={fullUrl}
                            alt={label}
                            className="max-w-full max-h-[85vh] object-contain"
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2"%3E%3Cpath d="M4 4v16h16V4H4zm2 2h12v12H6V6zm2 2v8h8V8H8z"/%3E%3C/svg%3E';
                            }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3">
                            <p className="text-white text-xs text-center">{label} - {fileName}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MerchantDetailsPage({ onBack }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Overview");
    const [merchant, setMerchant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tabs = ["Overview"];

    // ─── Fetch Merchant Details ──────────────────────────────────────────────
    useEffect(() => {
        const fetchMerchant = async () => {
            try {
                setLoading(true);
                const merchantId = id || 3;
                const response = await merchantService.getMerchantDetails(merchantId);
                console.log("Merchant Details:", response);
                setMerchant(response);
                setError(null);
            } catch (err) {
                console.error("Error fetching merchant details:", err);
                setError("Failed to load merchant details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMerchant();
    }, [id]);

    // ─── Format Helpers ──────────────────────────────────────────────────────
    const formatCurrency = (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num)) return '₹ 0.00';
        return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

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

    const getStatusBadgeVariant = (status) => {
        if (!status) return 'gray';
        const statusMap = {
            'active': 'green',
            'inactive': 'red',
            'suspended': 'red',
            'pending': 'yellow',
            'approved': 'green',
            'rejected': 'red'
        };
        return statusMap[status.toLowerCase()] || 'gray';
    };

    const getStatusDisplay = (status) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // ─── Loading State ────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading merchant details...</p>
                </div>
            </div>
        );
    }

    // ─── Error State ──────────────────────────────────────────────────────────
    if (error || !merchant) {
        return (
            <div className="bg-gray-50 min-h-screen p-4 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-red-600">{error || "Merchant not found"}</p>
                    <button 
                        onClick={() => navigate('/all-merchant')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Merchants
                    </button>
                </div>
            </div>
        );
    }

    // ─── Extract Data ─────────────────────────────────────────────────────────
    const merchantInfo = merchant;
    const health = merchantInfo.merchant_health_30d || {};
    const recentTxns = merchantInfo.recent_transactions || [];
    const successRate = merchantInfo.success_rate_30d || 0;

    // Calculate total transactions from health
    const totalTransactions = (health.successful?.count || 0) + 
                             (health.failed?.count || 0) + 
                             (health.pending?.count || 0);

    // Documents
    const documents = [
        { label: "PAN Card", file: merchantInfo.pan_card_file },
        { label: "GST Certificate", file: merchantInfo.gst_certificate_file },
        { label: "Cancelled Cheque", file: merchantInfo.cancelled_cheque_file },
        { label: "Company Registration", file: merchantInfo.company_registration_certificate_file },
        { label: "Owner ID Proof", file: merchantInfo.owner_id_proof_file },
    ];

    const hasDocuments = documents.some(doc => doc.file);

    return (
        <div className="bg-gray-50 min-h-screen p-3 sm:p-0">

            {/* ── Page Header ── */}
            <div className="mb-4 sm:mb-6">
                <p className="text-[11px] sm:text-sm text-gray-400 mb-2 flex flex-wrap items-center">
                    Merchants <span className="mx-1">›</span> Merchant List <span className="mx-1">›</span>
                    <span className="text-gray-600">Merchant Details</span>
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{merchantInfo.business_name || merchantInfo.merchant_name}</h1>
                        <Badge label={getStatusDisplay(merchantInfo.merchant_status)} variant={getStatusBadgeVariant(merchantInfo.merchant_status)} />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onBack || (() => navigate('/all-merchant'))}
                            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2 sm:mt-3 text-[11px] sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <span className="font-medium text-gray-700 text-[11px] sm:text-xs">Merchant ID:</span>
                        <span className="font-semibold text-gray-900 text-[11px] sm:text-xs">{merchantInfo.merchant_id}</span>
                        <button className="ml-0.5 text-gray-400 hover:text-gray-600">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                    </span>
                    <span><span className="font-medium text-gray-700 text-[11px] sm:text-xs">Onboarded On:</span> {formatDate(merchantInfo.created_at)}</span>
                    <span><span className="font-medium text-gray-700 text-[11px] sm:text-xs">Onboarded By:</span> System</span>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-0 border-b border-gray-200 mt-2 mb-4 sm:mb-5 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ── Content Grid ── */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* ── LEFT COLUMN ── */}
                <div className="flex-1 min-w-0 space-y-4">

                    {/* Row 1: Merchant Info + Financial Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Merchant Information */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Merchant Information</h2>
                            <InfoRow label="Merchant ID" value={merchantInfo.merchant_id} />
                            <InfoRow label="Merchant Name" value={merchantInfo.merchant_name} />
                            <InfoRow label="Business Name" value={merchantInfo.business_name} />
                            <InfoRow label="Contact Person" value={merchantInfo.merchant_name} />
                            <InfoRow label="Mobile" value={merchantInfo.mobile} />
                            <InfoRow label="Email" value={merchantInfo.email} />
                            <InfoRow label="Website" value={merchantInfo.website_url} isLink={!!merchantInfo.website_url} />
                            <div className="border-t border-gray-50 mt-2 sm:mt-3 pt-2 sm:pt-3">
                                <InfoRow label="GST Number" value={merchantInfo.gst_number || "—"} />
                                <InfoRow label="PAN Number" value={merchantInfo.pan_number || "—"} />
                                <InfoRow label="Business Type" value={merchantInfo.business_type || "—"} />
                                <InfoRow label="City" value={merchantInfo.city || "—"} />
                                <InfoRow label="State" value={merchantInfo.state || "—"} />
                                <InfoRow label="Pincode" value={merchantInfo.pincode || "—"} />
                                <InfoRow label="Created Date" value={formatDate(merchantInfo.created_at)} />
                                <InfoRow label="Status" value={getStatusDisplay(merchantInfo.merchant_status)} isBadge badgeVariant={getStatusBadgeVariant(merchantInfo.merchant_status)} />
                            </div>
                        </div>

                        {/* Financial Overview */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Financial Overview</h2>
                            {[
                                ["Wallet Balance", formatCurrency(merchantInfo.wallet)],
                                ["Today's Volume", formatCurrency(merchantInfo.today_payout_total)],
                                ["Monthly Volume", formatCurrency(merchantInfo.month_payout_total)],
                                ["Success Rate (30D)", `${successRate.toFixed(2)}%`, "green"],
                                ["Failed Rate (30D)", `${merchantInfo.failed_rate_30d?.toFixed(2) || 0}%`, "red"],
                                ["Total Transactions (30D)", merchantInfo.total_transactions_30d || 0],
                            ].map(([label, val, color]) => (
                                <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                                    <span className="text-[11px] sm:text-xs text-gray-500 font-semibold">{label}</span>
                                    <span className={`text-[11px] sm:text-xs font-semibold ${color === "green" ? "text-green-600" : color === "red" ? "text-red-500" : "text-gray-900"
                                        }`}>{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Merchant Health + Recent Transactions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Merchant Health */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Merchant Health (30D)</h2>
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                                <DonutChart percent={successRate} />
                                <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                                    {[
                                        { dot: "bg-green-500", label: "Successful", val: `${health.successful?.count || 0} (${health.successful?.percentage || 0}%)` },
                                        { dot: "bg-red-400", label: "Failed", val: `${health.failed?.count || 0} (${health.failed?.percentage || 0}%)`, color: "text-red-500" },
                                        { dot: "bg-orange-400", label: "Pending", val: `${health.pending?.count || 0} (${health.pending?.percentage || 0}%)` },
                                        { dot: "bg-yellow-400", label: "Chargebacks", val: `${health.chargebacks?.count || 0} (${health.chargebacks?.percentage || 0}%)` },
                                    ].map(({ dot, label, val, color }) => (
                                        <div key={label} className="flex items-center gap-2">
                                            <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 ${dot}`} />
                                            <span className="text-[11px] sm:text-xs text-gray-500 w-16 sm:w-20">{label}</span>
                                            <span className={`text-[11px] sm:text-xs font-medium ${color ?? "text-gray-800"}`}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                <span className="text-[11px] sm:text-xs text-gray-500">Total Transactions</span>
                                <span className="text-xs sm:text-sm font-bold text-gray-900">{totalTransactions}</span>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Recent Transactions</h2>
                                <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-100 text-[11px] sm:text-xs">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            {["Transaction ID", "Amount", "Status", "Date & Time"].map(h => (
                                                <th key={h} className="text-left px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTxns.length > 0 ? (
                                            recentTxns.map((txn, index) => (
                                                <TxRow 
                                                    key={txn.id || index}
                                                    id={txn.trx_id || txn.id}
                                                    amount={formatCurrency(txn.amount)}
                                                    status={getStatusDisplay(txn.status)}
                                                    date={formatDate(txn.created_at)}
                                                />
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-gray-400 text-xs">
                                                    No recent transactions
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Transaction Limits + API Config + Documents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Transaction Limits */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Transaction Limits</h2>
                            {[
                                ["Min Amount", formatCurrency(merchantInfo.min_payout_amount)],
                                ["Max Amount", formatCurrency(merchantInfo.max_payout_amount)],
                                ["Daily Limit", formatCurrency(merchantInfo.daily_limit)],
                                ["Monthly Limit", formatCurrency(merchantInfo.monthly_limit)],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0 gap-2">
                                    <span className="text-[11px] sm:text-xs text-gray-500">{label}</span>
                                    <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right">{val}</span>
                                </div>
                            ))}
                            <button className="mt-2 sm:mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                View Limits
                            </button>
                        </div>

                        {/* API Configuration */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">API Configuration</h2>
                            {[
                                ["API Key", merchantInfo.api_key || "—"],
                                ["Webhook URL", merchantInfo.webhook_url || "—"],
                                ["Webhook Enabled", merchantInfo.webhook_enabled ? "✅ Enabled" : "❌ Disabled"],
                                ["Settlement Cycle", merchantInfo.settlement_cycle || "—"],
                                ["Auto Settlement", merchantInfo.auto_settlement ? "✅ Enabled" : "❌ Disabled"],
                            ].map(([label, val]) => (
                                <div key={label} className="py-1 border-b border-gray-50 last:border-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-[11px] sm:text-xs text-gray-500 shrink-0">{label}</span>
                                        <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right leading-tight">{val}</span>
                                    </div>
                                </div>
                            ))}
                            <button className="mt-2 sm:mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                View API Configuration
                            </button>
                        </div>

                        {/* Bank Information */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Bank Information</h2>
                            {[
                                ["Account Holder", merchantInfo.account_holder_name || "—"],
                                ["Bank Name", merchantInfo.bank_name || "—"],
                                ["Account Number", merchantInfo.account_number ? `****${merchantInfo.account_number.slice(-4)}` : "—"],
                                ["IFSC Code", merchantInfo.ifsc_code || "—"],
                                ["Branch Name", merchantInfo.branch_name || "—"],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between py-1 border-b border-gray-50 last:border-0 gap-2">
                                    <span className="text-[11px] sm:text-xs text-gray-500">{label}</span>
                                    <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right">{val}</span>
                                </div>
                            ))}
                        </div>

                        {/* ─── Documents Section ─── */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 col-span-1 md:col-span-2">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">📄 Documents</h2>
                            {hasDocuments ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                    {documents.map((doc, index) => (
                                        doc.file && (
                                            <DocumentViewer 
                                                key={index}
                                                label={doc.label}
                                                filePath={doc.file}
                                            />
                                        )
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[11px] sm:text-xs text-gray-400 text-center py-4">
                                    No documents uploaded
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="w-full lg:w-80 xl:w-96 shrink-0 space-y-4">

                    {/* Status Management */}
                    <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
                        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Status Management</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                            <span className="text-[11px] sm:text-xs text-gray-500">Current Status</span>
                            <div className="relative w-full sm:w-auto">
                                <select className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 py-1 text-[11px] sm:text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg focus:outline-none cursor-pointer">
                                    <option>{getStatusDisplay(merchantInfo.merchant_status)}</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Suspended</option>
                                </select>
                                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-[11px] sm:text-xs font-semibold text-gray-700 mb-2 sm:mb-3">Status History</h3>
                        <div className="relative pl-3 sm:pl-4">
                            <div className="absolute left-1 top-0 bottom-0 w-px bg-gray-200" />
                            {[
                                { dot: "bg-green-500", label: "Active", time: formatDate(merchantInfo.updated_at), by: "System" },
                                { dot: "bg-gray-300", label: "Created", time: formatDate(merchantInfo.created_at), by: "System" },
                            ].map(({ dot, label, time, by }, i) => (
                                <div key={i} className="relative mb-3 last:mb-0">
                                    <span className={`absolute -left-2 top-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${dot} border-2 border-white`} />
                                    <p className="text-[11px] sm:text-xs font-semibold text-gray-800">{label}</p>
                                    <p className="text-[9px] sm:text-[10px] text-gray-400">{time}</p>
                                    <p className="text-[9px] sm:text-[10px] text-gray-400">{by}</p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                            View All History
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
                        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Edit
                            </button>
                            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                Suspend
                            </button>
                            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                Reset Keys
                            </button>
                            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                View Txns
                            </button>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Notes</h2>
                            <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">Add Note</button>
                        </div>
                        <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-[11px] sm:text-xs text-gray-400">No notes added yet.</p>
                            <p className="text-[11px] sm:text-xs text-gray-400">Add your first note.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
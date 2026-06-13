// import { useState } from "react";

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
//         <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
//             {label}
//         </span>
//     );
// }

// // ── Info Row ──────────────────────────────────────────────────────────────────
// function InfoRow({ label, value, isLink, isBadge, badgeVariant }) {
//     return (
//         <div className="flex items-start py-1.5">
//             <span className="w-36 text-xs text-gray-500 font-semibold flex-shrink-0">{label}</span>
//             <span className="text-gray-400 mr-2 text-xs mt-0.5">:</span>
//             {isBadge
//                 ? <Badge label={value} variant={badgeVariant} />
//                 : isLink
//                     ? <a href={value} className="text-blue-500 text-xs hover:underline truncate">{value}</a>
//                     : <span className="text-xs text-gray-800 font-semibold">{value}</span>
//             }
//         </div>
//     );
// }

// // ── Transaction Row ───────────────────────────────────────────────────────────
// function TxRow({ id, amount, status, date }) {
//     const statusStyle = status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600";
//     return (
//         <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
//             <td className="px-3 py-2 text-xs text-blue-600 font-medium">{id}</td>
//             <td className="px-3 py-2 text-xs text-gray-800">{amount}</td>
//             <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle}`}>{status}</span></td>
//             <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">{date}</td>
//         </tr>
//     );
// }

// // ── Donut Chart (SVG) ─────────────────────────────────────────────────────────
// function DonutChart({ percent = 98.36 }) {
//     const r = 52, cx = 64, cy = 64;
//     const circ = 2 * Math.PI * r;
//     const success = (percent / 100) * circ;
//     const failed = ((100 - percent) / 100) * circ;
//     return (
//         <svg width="128" height="128" viewBox="0 0 128 128">
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
//             <text x={cx} y={cy - 6} textAnchor="middle" className="text-sm font-bold" fontSize="14" fontWeight="700" fill="#111827">{percent}%</text>
//             <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#9ca3af">Success Rate</text>
//         </svg>
//     );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function MerchantDetailsPage({ onBack }) {
//     const [activeTab, setActiveTab] = useState("Overview");
//     const tabs = ["Overview"];

//     return (
//         <div className=" bg-gray-50 min-h-screen">

//             {/* ── Page Header ── */}
//             <div className="mb-1">
//                 <p className="text-sm text-gray-400 mb-2">
//                     Merchants <span className="mx-1">›</span> Merchant List <span className="mx-1">›</span>
//                     <span className="text-gray-600">Merchant Details</span>
//                 </p>
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <h1 className="text-2xl font-bold text-gray-900">ABC Pvt Ltd</h1>
//                         <Badge label="Active" variant="green" />
//                     </div>
//                     <div className="flex gap-2.5">
//                         <button
//                             onClick={onBack}
//                             className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                             </svg>
//                             Back to Merchant List
//                         </button>
//                         <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
//                             Actions
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Meta row */}
//                 <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
//                     <span className="flex items-center gap-1.5">
//                         <span className="font-medium text-gray-700 text-xs">Merchant ID:</span>
//                         <span className="font-semibold text-gray-900 text-xs">MER12548</span>
//                         <button className="ml-1 text-gray-400 hover:text-gray-600 text-xs">
//                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                         </button>
//                     </span>
//                     <span><span className="font-medium text-gray-700 text-xs">Onboarded On:</span> 14 May 2025, 10:30 AM</span>
//                     <span><span className="font-medium text-gray-700 text-xs">Onboarded By:</span> Super Admin</span>
//                 </div>
//             </div>

//             {/* ── Tabs ── */}
//             <div className="flex gap-0 border-b border-gray-200 mt-4 mb-5 overflow-x-auto">
//                 {tabs.map(tab => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
//                                 ? "border-blue-600 text-blue-600"
//                                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                             }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* ── Content Grid ── */}
//             <div className="grid grid-cols-12 gap-4">

//                 {/* ── LEFT COLUMN (col 1-8) ── */}
//                 <div className="col-span-9 flex flex-col gap-4">

//                     {/* Row 1: Merchant Info + Financial Overview */}
//                     <div className="grid grid-cols-2 gap-4">

//                         {/* Merchant Information */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <h2 className="text-sm font-semibold text-gray-800 mb-3">Merchant Information</h2>
//                             <InfoRow label="Merchant ID" value="MER12548" />
//                             <InfoRow label="Company Name" value="ABC Pvt Ltd" />
//                             <InfoRow label="Business Name" value="ABC Services" />
//                             <InfoRow label="Contact Person" value="Amit Kumar" />
//                             <InfoRow label="Mobile" value="+91 9876543210" />
//                             <InfoRow label="Email" value="amit.kumar@abc.com" />
//                             <InfoRow label="Website" value="https://www.abcservices.com" isLink />
//                             <div className="border-t border-gray-50 mt-3 pt-3">
//                                 <InfoRow label="GST Number" value="27ABCDE1234F1Z5" />
//                                 <InfoRow label="PAN Number" value="ABCDE1234F" />
//                                 <InfoRow label="Created Date" value="14 May 2025, 10:30 AM" />
//                                 <InfoRow label="Onboarded By" value="Super Admin" />
//                                 <InfoRow label="Onboarding Status" value="Approved" isBadge badgeVariant="green" />
//                                 <InfoRow label="Status" value="Active" isBadge badgeVariant="green" />
//                             </div>
//                         </div>


//                         {/* Financial Overview */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <h2 className="text-sm font-semibold text-gray-800 mb-3">Financial Overview</h2>
//                             {[
//                                 ["Current Balance", "₹ 2,45,678.50"],
//                                 ["Available Balance", "₹ 2,10,250.75"],
//                                 ["Today's Volume", "₹ 45,320.00"],
//                                 ["Monthly Volume", "₹ 12,85,430.75"],
//                                 ["Success Rate (30D)", "98.42%", "green"],
//                                 ["Failed Rate (30D)", "1.58%", "red"],
//                             ].map(([label, val, color]) => (
//                                 <div key={label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
//                                     <span className="text-xs text-gray-500 font-semibold">{label}</span>
//                                     <span className={`text-xs font-semibold ${color === "green" ? "text-green-600" : color === "red" ? "text-red-500" : "text-gray-900"
//                                         }`}>{val}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Row 2: Merchant Health + Recent Transactions */}
//                     <div className="grid grid-cols-2 gap-4">

//                         {/* Merchant Health */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <h2 className="text-sm font-semibold text-gray-800 mb-3">Merchant Health (30D)</h2>
//                             <div className="flex items-center gap-4">
//                                 <DonutChart percent={98.36} />
//                                 <div className="flex flex-col gap-1.5">
//                                     {[
//                                         { dot: "bg-green-500", label: "Successful", val: "8,402 (98.36%)" },
//                                         { dot: "bg-red-400", label: "Failed", val: "140 (1.64%)", color: "text-red-500" },
//                                         { dot: "bg-orange-400", label: "Pending", val: "0 (0.00%)" },
//                                         { dot: "bg-yellow-400", label: "Chargebacks", val: "0 (0.00%)" },
//                                     ].map(({ dot, label, val, color }) => (
//                                         <div key={label} className="flex items-center gap-2">
//                                             <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
//                                             <span className="text-xs text-gray-500 w-20">{label}</span>
//                                             <span className={`text-xs font-medium ${color ?? "text-gray-800"}`}>{val}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
//                                 <span className="text-xs text-gray-500">Total Transactions</span>
//                                 <span className="text-sm font-bold text-gray-900">8,542</span>
//                             </div>
//                         </div>

//                         {/* Recent Transactions */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <div className="flex items-center justify-between mb-3">
//                                 <h2 className="text-sm font-semibold text-gray-800">Recent Transactions</h2>
//                                 <button className="text-xs text-blue-600 hover:underline font-medium">View All</button>
//                             </div>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full text-xs">
//                                     <thead>
//                                         <tr className="border-b border-gray-100">
//                                             {["Transaction ID", "Amount", "Status", "Date & Time"].map(h => (
//                                                 <th key={h} className="text-left px-3 py-1.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <TxRow id="TXN-20250514-0001" amount="₹ 25,000.00" status="Success" date="14 May 2025, 10:15 AM" />
//                                         <TxRow id="TXN-20250514-0002" amount="₹ 15,500.00" status="Success" date="14 May 2025, 10:10 AM" />
//                                         <TxRow id="TXN-20250514-0003" amount="₹ 5,000.00" status="Failed" date="14 May 2025, 10:05 AM" />
//                                         <TxRow id="TXN-20250514-0004" amount="₹ 12,000.00" status="Success" date="14 May 2025, 10:01 AM" />
//                                         <TxRow id="TXN-20250514-0005" amount="₹ 7,820.00" status="Success" date="14 May 2025, 09:58 AM" />
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Row 3: Assigned Config + Transaction Limits + API Config */}
//                     <div className="grid grid-cols-3 gap-4">

//                         {/* Assigned Configuration */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <h2 className="text-sm font-semibold text-gray-800 mb-3">Assigned Configuration</h2>
//                             {[
//                                 { logo: "R", bg: "bg-blue-100 text-blue-600", label: "Primary API", val: "RazorpayX" },
//                                 { logo: "C", bg: "bg-green-100 text-green-600", label: "Secondary API", val: "Cashfree" },
//                                 { logo: "P", bg: "bg-purple-100 text-purple-600", label: "Fallback API", val: "Paytm Payouts" },
//                                 { logo: "⚙", bg: "bg-gray-100 text-gray-600", label: "Routing Rule", val: "High Amount Routing" },
//                             ].map(({ logo, bg, label, val }) => (
//                                 <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
//                                     <div className="flex items-center gap-2">
//                                         <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${bg}`}>{logo}</span>
//                                         <span className="text-xs text-gray-500">{label}</span>
//                                     </div>
//                                     <span className="text-xs font-medium text-gray-800">{val}</span>
//                                 </div>
//                             ))}
//                             <button className="mt-3 w-full py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                                 View Routing Settings
//                             </button>
//                         </div>

//                         {/* Transaction Limits */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <h2 className="text-sm font-semibold text-gray-800 mb-3">Transaction Limits</h2>
//                             {[
//                                 ["Min Amount", "₹ 1.00"],
//                                 ["Max Amount", "₹ 50,000.00"],
//                                 ["Daily Limit", "₹ 10,00,000.00"],
//                                 ["Monthly Limit", "₹ 2,00,00,000.00"],
//                                 ["Per Transaction Limit", "₹ 50,000.00"],
//                             ].map(([label, val]) => (
//                                 <div key={label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
//                                     <span className="text-xs text-gray-500">{label}</span>
//                                     <span className="text-xs font-medium text-gray-800">{val}</span>
//                                 </div>
//                             ))}
//                             <button className="mt-3 w-full py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                                 View Limits
//                             </button>
//                         </div>

//                         {/* API Configuration */}
//                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                             <h2 className="text-sm font-semibold text-gray-800 mb-3">API Configuration</h2>
//                             {[
//                                 ["Environment", "Production"],
//                                 ["API Key", "••••••••abc123"],
//                                 ["Secret Key", "••••••••xyz789"],
//                                 ["IP Whitelist", "103.21.244.1, 103.21.244.2"],
//                                 ["Allowed APIs", "Payout Initiate, Payout Status, Beneficiary, Balance"],
//                             ].map(([label, val]) => (
//                                 <div key={label} className="py-1.5 border-b border-gray-50 last:border-0">
//                                     <div className="flex justify-between items-start gap-2">
//                                         <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
//                                         <span className="text-xs font-medium text-gray-800 text-right leading-tight">{val}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                             <button className="mt-3 w-full py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                                 View API Configuration
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ── RIGHT COLUMN (col 9-12) ── */}
//                 <div className="col-span-3 flex flex-col gap-3">

//                     {/* Status Management */}
//                     <div className="bg-white rounded-xl border border-gray-100 p-4">
//                         <h2 className="text-sm font-semibold text-gray-800 mb-3">Status Management</h2>
//                         <div className="flex items-center justify-between mb-4">
//                             <span className="text-xs text-gray-500">Current Status</span>
//                             <div className="relative">
//                                 <select className="appearance-none pl-3 pr-7 py-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg focus:outline-none cursor-pointer">
//                                     <option>Active</option>
//                                     <option>Inactive</option>
//                                     <option>Suspended</option>
//                                 </select>
//                                 <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-green-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>
//                         </div>

//                         <h3 className="text-xs font-semibold text-gray-700 mb-3">Status History</h3>
//                         <div className="relative pl-4">
//                             <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" />
//                             {[
//                                 { dot: "bg-green-500", label: "Active", time: "14 May 2025, 10:30 AM", by: "by Super Admin" },
//                                 { dot: "bg-gray-300", label: "Under Review", time: "14 May 2025, 09:15 AM", by: "by System" },
//                                 { dot: "bg-yellow-400", label: "Pending Approval", time: "13 May 2025, 05:20 PM", by: "by Super Admin" },
//                                 { dot: "bg-red-400", label: "Inactive", time: "10 May 2025, 11:45 AM", by: "by Super Admin" },
//                             ].map(({ dot, label, time, by }, i) => (
//                                 <div key={i} className="relative mb-4 last:mb-0">
//                                     <span className={`absolute -left-2.5 top-0.5 w-2.5 h-2.5 rounded-full ${dot} border-2 border-white`} />
//                                     <p className="text-xs font-semibold text-gray-800">{label}</p>
//                                     <p className="text-[10px] text-gray-400">{time}</p>
//                                     <p className="text-[10px] text-gray-400">{by}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <button className="mt-4 w-full py-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                             View All History
//                         </button>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="bg-white rounded-xl border border-gray-100  p-4">
//                         <h2 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h2>
//                         <div className="grid grid-cols-2 gap-2">
//                             <button className="flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
//                                 Edit Merchant
//                             </button>
//                             <button className="flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
//                                 <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
//                                 Suspend Merchant
//                             </button>
//                             <button className="flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
//                                 Reset API Keys
//                             </button>
//                             <button className="flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
//                                 View Transactions
//                             </button>
//                         </div>
//                     </div>

//                     {/* Notes */}
//                     <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex-1">
//                         <div className="flex items-center justify-between mb-3">
//                             <h2 className="text-sm font-semibold text-gray-800">Notes</h2>
//                             <button className="text-xs text-blue-600 hover:underline font-medium">Add Note</button>
//                         </div>
//                         <div className="flex flex-col items-center justify-center py-8 text-center">
//                             <svg className="w-10 h-10 text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                             </svg>
//                             <p className="text-xs text-gray-400">No notes added yet.</p>
//                             <p className="text-xs text-gray-400">Add your first note.</p>
//                         </div>
//                     </div>




//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState } from "react";

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
            <span className="sm:w-36 text-[11px] sm:text-xs text-gray-500 font-semibold flex-shrink-0">{label}</span>
            <span className="hidden sm:inline text-gray-400 mr-2 text-xs mt-0.5">:</span>
            {isBadge
                ? <Badge label={value} variant={badgeVariant} />
                : isLink
                    ? <a href={value} className="text-blue-500 text-[11px] sm:text-xs hover:underline break-words">{value}</a>
                    : <span className="text-[11px] sm:text-xs text-gray-800 font-semibold break-words">{value}</span>
            }
        </div>
    );
}

// ── Transaction Row ───────────────────────────────────────────────────────────
function TxRow({ id, amount, status, date }) {
    const statusStyle = status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600";
    return (
        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-blue-600 font-medium truncate max-w-[100px]">{id}</td>
            <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-800 whitespace-nowrap">{amount}</td>
            <td className="px-2 sm:px-3 py-1.5 sm:py-2"><span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${statusStyle}`}>{status}</span></td>
            <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">{date}</td>
        </tr>
    );
}

// ── Donut Chart (SVG) ─────────────────────────────────────────────────────────
function DonutChart({ percent = 98.36 }) {
    const r = 52, cx = 64, cy = 64;
    const circ = 2 * Math.PI * r;
    const success = (percent / 100) * circ;
    const failed = ((100 - percent) / 100) * circ;
    return (
        <svg width="110" height="110" viewBox="0 0 128 128" className="sm:w-[128px] sm:h-[128px] w-[110px] h-[110px]">
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

// ── Main Component ────────────────────────────────────────────────────────────
export default function MerchantDetailsPage({ onBack }) {
    const [activeTab, setActiveTab] = useState("Overview");
    const tabs = ["Overview"];

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
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ABC Pvt Ltd</h1>
                        <Badge label="Active" variant="green" />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                        <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            Actions
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2 sm:mt-3 text-[11px] sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <span className="font-medium text-gray-700 text-[11px] sm:text-xs">Merchant ID:</span>
                        <span className="font-semibold text-gray-900 text-[11px] sm:text-xs">MER12548</span>
                        <button className="ml-0.5 text-gray-400 hover:text-gray-600">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                    </span>
                    <span><span className="font-medium text-gray-700 text-[11px] sm:text-xs">Onboarded On:</span> 14 May 2025, 10:30 AM</span>
                    <span><span className="font-medium text-gray-700 text-[11px] sm:text-xs">Onboarded By:</span> Super Admin</span>
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
                            <InfoRow label="Merchant ID" value="MER12548" />
                            <InfoRow label="Company Name" value="ABC Pvt Ltd" />
                            <InfoRow label="Business Name" value="ABC Services" />
                            <InfoRow label="Contact Person" value="Amit Kumar" />
                            <InfoRow label="Mobile" value="+91 9876543210" />
                            <InfoRow label="Email" value="amit.kumar@abc.com" />
                            <InfoRow label="Website" value="https://www.abcservices.com" isLink />
                            <div className="border-t border-gray-50 mt-2 sm:mt-3 pt-2 sm:pt-3">
                                <InfoRow label="GST Number" value="27ABCDE1234F1Z5" />
                                <InfoRow label="PAN Number" value="ABCDE1234F" />
                                <InfoRow label="Created Date" value="14 May 2025, 10:30 AM" />
                                <InfoRow label="Onboarded By" value="Super Admin" />
                                <InfoRow label="Onboarding Status" value="Approved" isBadge badgeVariant="green" />
                                <InfoRow label="Status" value="Active" isBadge badgeVariant="green" />
                            </div>
                        </div>

                        {/* Financial Overview */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Financial Overview</h2>
                            {[
                                ["Current Balance", "₹ 2,45,678.50"],
                                ["Available Balance", "₹ 2,10,250.75"],
                                ["Today's Volume", "₹ 45,320.00"],
                                ["Monthly Volume", "₹ 12,85,430.75"],
                                ["Success Rate (30D)", "98.42%", "green"],
                                ["Failed Rate (30D)", "1.58%", "red"],
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
                                <DonutChart percent={98.36} />
                                <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                                    {[
                                        { dot: "bg-green-500", label: "Successful", val: "8,402 (98.36%)" },
                                        { dot: "bg-red-400", label: "Failed", val: "140 (1.64%)", color: "text-red-500" },
                                        { dot: "bg-orange-400", label: "Pending", val: "0 (0.00%)" },
                                        { dot: "bg-yellow-400", label: "Chargebacks", val: "0 (0.00%)" },
                                    ].map(({ dot, label, val, color }) => (
                                        <div key={label} className="flex items-center gap-2">
                                            <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                                            <span className="text-[11px] sm:text-xs text-gray-500 w-16 sm:w-20">{label}</span>
                                            <span className={`text-[11px] sm:text-xs font-medium ${color ?? "text-gray-800"}`}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                <span className="text-[11px] sm:text-xs text-gray-500">Total Transactions</span>
                                <span className="text-xs sm:text-sm font-bold text-gray-900">8,542</span>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Recent Transactions</h2>
                                <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[400px] text-[11px] sm:text-xs">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            {["Transaction ID", "Amount", "Status", "Date & Time"].map(h => (
                                                <th key={h} className="text-left px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TxRow id="TXN-20250514-0001" amount="₹ 25,000.00" status="Success" date="14 May 2025, 10:15 AM" />
                                        <TxRow id="TXN-20250514-0002" amount="₹ 15,500.00" status="Success" date="14 May 2025, 10:10 AM" />
                                        <TxRow id="TXN-20250514-0003" amount="₹ 5,000.00" status="Failed" date="14 May 2025, 10:05 AM" />
                                        <TxRow id="TXN-20250514-0004" amount="₹ 12,000.00" status="Success" date="14 May 2025, 10:01 AM" />
                                        <TxRow id="TXN-20250514-0005" amount="₹ 7,820.00" status="Success" date="14 May 2025, 09:58 AM" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Assigned Config + Transaction Limits + API Config */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Assigned Configuration */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Assigned Configuration</h2>
                            {[
                                { logo: "R", bg: "bg-blue-100 text-blue-600", label: "Primary API", val: "RazorpayX" },
                                { logo: "C", bg: "bg-green-100 text-green-600", label: "Secondary API", val: "Cashfree" },
                                { logo: "P", bg: "bg-purple-100 text-purple-600", label: "Fallback API", val: "Paytm Payouts" },
                                { logo: "⚙", bg: "bg-gray-100 text-gray-600", label: "Routing Rule", val: "High Amount Routing" },
                            ].map(({ logo, bg, label, val }) => (
                                <div key={label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0 gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded text-[9px] sm:text-[10px] font-bold flex items-center justify-center ${bg}`}>{logo}</span>
                                        <span className="text-[11px] sm:text-xs text-gray-500">{label}</span>
                                    </div>
                                    <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right">{val}</span>
                                </div>
                            ))}
                            <button className="mt-2 sm:mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                View Routing Settings
                            </button>
                        </div>

                        {/* Transaction Limits */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                            <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Transaction Limits</h2>
                            {[
                                ["Min Amount", "₹ 1.00"],
                                ["Max Amount", "₹ 50,000.00"],
                                ["Daily Limit", "₹ 10,00,000.00"],
                                ["Monthly Limit", "₹ 2,00,00,000.00"],
                                ["Per Transaction Limit", "₹ 50,000.00"],
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
                                ["Environment", "Production"],
                                ["API Key", "••••••••abc123"],
                                ["Secret Key", "••••••••xyz789"],
                                ["IP Whitelist", "103.21.244.1, 103.21.244.2"],
                                ["Allowed APIs", "Payout Initiate, Payout Status, Beneficiary, Balance"],
                            ].map(([label, val]) => (
                                <div key={label} className="py-1 border-b border-gray-50 last:border-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="text-[11px] sm:text-xs text-gray-500 flex-shrink-0">{label}</span>
                                        <span className="text-[11px] sm:text-xs font-medium text-gray-800 text-right leading-tight">{val}</span>
                                    </div>
                                </div>
                            ))}
                            <button className="mt-2 sm:mt-3 w-full py-1 sm:py-1.5 text-[11px] sm:text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                View API Configuration
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">

                    {/* Status Management */}
                    <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
                        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Status Management</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                            <span className="text-[11px] sm:text-xs text-gray-500">Current Status</span>
                            <div className="relative w-full sm:w-auto">
                                <select className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 py-1 text-[11px] sm:text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg focus:outline-none cursor-pointer">
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
                                { dot: "bg-green-500", label: "Active", time: "14 May 2025, 10:30 AM", by: "by Super Admin" },
                                { dot: "bg-gray-300", label: "Under Review", time: "14 May 2025, 09:15 AM", by: "by System" },
                                { dot: "bg-yellow-400", label: "Pending Approval", time: "13 May 2025, 05:20 PM", by: "by Super Admin" },
                                { dot: "bg-red-400", label: "Inactive", time: "10 May 2025, 11:45 AM", by: "by Super Admin" },
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
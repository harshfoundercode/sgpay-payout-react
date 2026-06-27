// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     ArrowLeft, Edit2, ChevronDown, ChevronRight, RefreshCw,
//     Eye, EyeOff, Copy, Check, TrendingUp, TrendingDown,
//     AlertCircle, CheckCircle, Clock, Activity, Database,
//     Shield, FileText, Webhook, BarChart2, Bell, Layers,
//     RefreshCcw, ExternalLink,
// } from "lucide-react";
// import {
//     AreaChart, Area, XAxis, YAxis, Tooltip,
//     ResponsiveContainer, LineChart, Line,
// } from "recharts";

// // ─── PROVIDER DATA ────────────────────────────────────────────────────────────

// const PROVIDERS = {
//     razorpayx: {
//         id: "razorpayx",
//         name: "RazorpayX",
//         logoText: "R",
//         logoColor: "#2563eb",
//         logoBg: "#dbeafe",
//         subtitle: "Bank Transfer API",
//         status: "Active",
//         providerType: "Bank API",
//         priority: 1,
//         apiCode: "RAZORPAYX",
//         createdAt: "01 Jan 2025, 10:15 AM",
//         updatedAt: "14 May 2025, 10:45 AM",
//         description: "RazorpayX Payouts – NEFT/IMPS/RTGS",
//         successRate: 98.45,
//         failureRate: 1.35,
//         totalTxns30d: 24562,
//         totalVol30d: "₹ 8,45,210.75",
//         healthStatus: "Healthy",
//         responseTime: "320 ms",
//         uptime30d: "99.92%",
//         apiType: "Bank Transfer API",
//         baseUrl: "https://api.razorpay.com/v1/payouts",
//         authType: "Basic Auth",
//         apiKey: "••••••••••••••1234",
//         secretKey: "••••••••••••••5678",
//         timeout: "30 Seconds",
//         retryCount: "3",
//         retryInterval: "10 Seconds",
//         callbackUrl: "https://bridge.sgsarypay.com/api/webhook/razorpayx",
//         supportedMethods: "NEFT, IMPS, RTGS",
//         supportedBanks: "All Major Banks",
//         minAmount: "₹ 1.00",
//         maxAmount: "₹ 10,00,000.00",
//         dailyLimit: "₹ 10,00,000.00",
//         dailyTxnLimit: "10,000",
//         currency: "INR",
//         availableBalance: "₹ 8,45,210.75",
//         reservedBalance: "₹ 1,25,430.00",
//         inTransit: "₹ 65,340.00",
//         lowBalanceThreshold: "₹ 1,00,000.00",
//         usableBalance: "₹ 7,19,780.75",
//         dailyUsedAmt: "₹ 6,25,430.00",
//         dailyUsedPct: 62.54,
//         lastSynced: "14 May 2025, 10:30 AM",
//         perfData: [
//             { d: "15 Apr", s: 920, f: 12 }, { d: "18 Apr", s: 880, f: 18 }, { d: "21 Apr", s: 950, f: 8 },
//             { d: "24 Apr", s: 900, f: 15 }, { d: "27 Apr", s: 870, f: 20 }, { d: "30 Apr", s: 940, f: 10 },
//             { d: "03 May", s: 960, f: 7 }, { d: "06 May", s: 910, f: 13 }, { d: "09 May", s: 890, f: 16 }, { d: "12 May", s: 970, f: 5 },
//         ],
//         healthLogs: [
//             { time: "14 May 2025, 10:30 AM", msg: "API is healthy", icon: "up", rt: "310 ms", status: "Healthy" },
//             { time: "14 May 2025, 10:00 AM", msg: "API is healthy", icon: "up", rt: "295 ms", status: "Healthy" },
//             { time: "14 May 2025, 09:30 AM", msg: "High response time detected", icon: "warn", rt: "780 ms", status: "Degraded" },
//             { time: "14 May 2025, 09:00 AM", msg: "API is healthy", icon: "up", rt: "310 ms", status: "Healthy" },
//             { time: "14 May 2025, 08:30 AM", msg: "API is healthy", icon: "up", rt: "305 ms", status: "Healthy" },
//         ],
//         supportedBanksList: [
//             { short: "SBI", full: "State Bank of India" },
//             { short: "HDFC", full: "HDFC Bank" },
//             { short: "ICICI", full: "ICICI Bank" },
//             { short: "AXIS", full: "Axis Bank" },
//             { short: "PNB", full: "Punjab Nat. Bank" },
//             { short: "BOB", full: "Bank of Baroda" },
//             { short: "CANARA", full: "Canara Bank" },
//             { short: "KOTAK", full: "Kotak Mahindra" },
//             { short: "IDBI", full: "IDBI Bank" },
//             { short: "IndusInd", full: "IndusInd Bank" },
//         ],
//     },
//     cashfree: {
//         id: "cashfree",
//         name: "Cashfree Payouts",
//         logoText: "CF",
//         logoColor: "#166534",
//         logoBg: "#dcfce7",
//         subtitle: "IMPS, NEFT, RTGS",
//         status: "Active",
//         providerType: "Bank API",
//         priority: 2,
//         apiCode: "CASHFREE",
//         createdAt: "15 Jan 2025, 11:20 AM",
//         updatedAt: "14 May 2025, 09:15 AM",
//         description: "Cashfree Payouts – IMPS/NEFT/RTGS",
//         successRate: 96.21,
//         failureRate: 2.79,
//         totalTxns30d: 18743,
//         totalVol30d: "₹ 5,20,450.30",
//         healthStatus: "Healthy",
//         responseTime: "280 ms",
//         uptime30d: "99.98%",
//         apiType: "Bank Transfer API",
//         baseUrl: "https://api.cashfree.com/payouts",
//         authType: "API Key",
//         apiKey: "••••••••••••••5678",
//         secretKey: "••••••••••••••9012",
//         timeout: "30 Seconds",
//         retryCount: "2",
//         retryInterval: "15 Seconds",
//         callbackUrl: "https://bridge.sgsarypay.com/api/webhook/cashfree",
//         supportedMethods: "IMPS, NEFT, RTGS",
//         supportedBanks: "All Major Banks",
//         minAmount: "₹ 1.00",
//         maxAmount: "₹ 10,00,000.00",
//         dailyLimit: "₹ 10,00,000.00",
//         dailyTxnLimit: "8,000",
//         currency: "INR",
//         availableBalance: "₹ 5,20,450.30",
//         reservedBalance: "₹ 85,430.00",
//         inTransit: "₹ 25,340.00",
//         lowBalanceThreshold: "₹ 1,00,000.00",
//         usableBalance: "₹ 4,35,020.30",
//         dailyUsedAmt: "₹ 4,15,230.46",
//         dailyUsedPct: 41.52,
//         lastSynced: "14 May 2025, 09:15 AM",
//         perfData: [
//             { d: "15 Apr", s: 940, f: 10 }, { d: "18 Apr", s: 910, f: 14 }, { d: "21 Apr", s: 960, f: 7 },
//             { d: "24 Apr", s: 930, f: 12 }, { d: "27 Apr", s: 890, f: 18 }, { d: "30 Apr", s: 950, f: 8 },
//             { d: "03 May", s: 970, f: 5 }, { d: "06 May", s: 940, f: 10 }, { d: "09 May", s: 920, f: 12 }, { d: "12 May", s: 960, f: 6 },
//         ],
//         healthLogs: [
//             { time: "14 May 2025, 09:15 AM", msg: "API is healthy", icon: "up", rt: "275 ms", status: "Healthy" },
//             { time: "14 May 2025, 08:45 AM", msg: "API is healthy", icon: "up", rt: "280 ms", status: "Healthy" },
//         ],
//         supportedBanksList: [
//             { short: "SBI", full: "State Bank of India" },
//             { short: "HDFC", full: "HDFC Bank" },
//             { short: "ICICI", full: "ICICI Bank" },
//             { short: "AXIS", full: "Axis Bank" },
//         ],
//     },
// };

// const DEFAULT_PROVIDER = PROVIDERS.razorpayx;

// // ─── TABS ─────────────────────────────────────────────────────────────────────

// const TABS = [
//     { id: "overview", label: "Overview", Icon: Activity },
// ];

// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// const STATUS_STYLES = {
//     Active: "bg-green-50 text-green-700",
//     Inactive: "bg-red-50 text-red-700",
//     Maintenance: "bg-orange-50 text-orange-600",
//     Healthy: "bg-green-50 text-green-700",
//     Degraded: "bg-orange-50 text-orange-600",
// };

// function StatusBadge({ status, size = "sm" }) {
//     return (
//         <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full font-semibold ${size === "sm" ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"} ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600"}`}>
//             {status}
//         </span>
//     );
// }

// function ApiLogo({ p, size = 56 }) {
//     const responsiveSize = size === 60 ? "w-12 h-12 sm:w-[60px] sm:h-[60px]" : "w-12 h-12 sm:w-14 sm:h-14";
//     return (
//         <div
//             className={`rounded-xl flex items-center justify-center font-extrabold select-none flex-shrink-0 ${responsiveSize}`}
//             style={{ background: p.logoBg, color: p.logoColor, fontSize: size * 0.32 }}
//         >
//             {p.logoText}
//         </div>
//     );
// }

// function CopyBtn({ value }) {
//     const [copied, setCopied] = useState(false);
//     return (
//         <button
//             onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
//             className="text-gray-300 hover:text-gray-500 transition-colors"
//         >
//             {copied ? <Check size={11} sm:size={12} className="text-green-500" /> : <Copy size={11} sm:size={12} />}
//         </button>
//     );
// }

// function SecretField({ value }) {
//     const [show, setShow] = useState(false);
//     return (
//         <span className="flex items-center gap-1 font-mono text-gray-700 text-[11px] sm:text-xs">
//             {show ? value.replace(/•/g, "x") : value}
//             <button onClick={() => setShow(s => !s)} className="text-gray-300 hover:text-gray-500">
//                 {show ? <EyeOff size={11} sm:size={12} /> : <Eye size={11} sm:size={12} />}
//             </button>
//             <CopyBtn value={value} />
//         </span>
//     );
// }

// // ─── TAB PANELS ───────────────────────────────────────────────────────────────

// function OverviewTab({ p }) {
//     return (
//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

//             {/* Left 2-col: Config + Performance + Banks */}
//             <div className="flex-1 lg:flex-[2] space-y-4 sm:space-y-5">

//                 {/* Configuration Details */}
//                 <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
//                     <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4">Configuration Details</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-2 sm:gap-y-3 text-[11px] sm:text-xs">
//                         {[
//                             ["API Type", p.apiType, "text"],
//                             ["Supported Methods", p.supportedMethods, "text"],
//                             ["Base URL", p.baseUrl, "link"],
//                             ["Supported Banks", p.supportedBanks, "text"],
//                             ["Auth Type", p.authType, "text"],
//                             ["Min Amount", p.minAmount, "text"],
//                             ["API Key", p.apiKey, "secret"],
//                             ["Max Amount", p.maxAmount, "text"],
//                             ["Secret Key", p.secretKey, "secret"],
//                             ["Daily Limit", p.dailyLimit, "editable"],
//                             ["Timeout", p.timeout, "text"],
//                             ["Daily Txn Limit", p.dailyTxnLimit, "text"],
//                             ["Retry Count", p.retryCount, "text"],
//                             ["Currency", p.currency, "text"],
//                             ["Retry Interval", p.retryInterval, "text"],
//                             ["Status", p.status, "badge"],
//                             ["Callback URL", p.callbackUrl, "link"],
//                         ].map(([label, value, type], i) => (
//                             <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-1">
//                                 <span className="text-gray-500 font-semibold w-28 shrink-0 text-[11px] sm:text-xs">{label}</span>
//                                 <span className="hidden sm:inline text-gray-400 mr-1">:</span>
//                                 {type === "text" && <span className="text-gray-700 font-medium break-words">{value}</span>}
//                                 {type === "link" && <a href="#" className="text-blue-500 hover:underline break-words text-[11px] sm:text-xs" onClick={e => e.preventDefault()}>{value}</a>}
//                                 {type === "secret" && <SecretField value={value} />}
//                                 {type === "editable" && (
//                                     <span className="flex items-center gap-1 text-gray-700 font-medium">
//                                         {value} <Edit2 size={10} sm:size={11} className="text-gray-300 hover:text-gray-500 cursor-pointer" />
//                                     </span>
//                                 )}
//                                 {type === "badge" && <StatusBadge status={value} />}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Performance */}
//                 <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
//                         <h3 className="text-xs sm:text-sm font-bold text-gray-800">Performance (Last 30 Days)</h3>
//                     </div>
//                     <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-5">
//                         {[
//                             [p.successRate + "%", "Success Rate", "text-gray-900"],
//                             [p.failureRate + "%", "Failure Rate", "text-red-500"],
//                             [p.responseTime, "Avg. Response Time", "text-gray-900"],
//                             [p.totalTxns30d.toLocaleString(), "Total Transactions", "text-gray-900"],
//                             [p.totalVol30d, "Total Volume", "text-yellow-500"],
//                         ].map(([v, l, c]) => (
//                             <div key={l} className="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
//                                 <p className={`text-sm sm:text-lg font-bold ${c} break-words`}>{v}</p>
//                                 <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 leading-tight">{l}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div>
//                         <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs mb-3">
//                             <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-500 inline-block rounded" />Success</span>
//                             <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-400 inline-block rounded" />Failed</span>
//                             <select className="ml-auto text-[11px] sm:text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-500 outline-none bg-white">
//                                 <option>Last 30 Days</option>
//                                 <option>Last 7 Days</option>
//                             </select>
//                         </div>
//                         <div className="h-[180px] sm:h-[190px] w-full">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <AreaChart data={p.perfData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
//                                     <defs>
//                                         <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
//                                             <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
//                                             <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//                                         </linearGradient>
//                                     </defs>
//                                     <XAxis dataKey="d" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
//                                     <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={30} />
//                                     <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
//                                     <Area type="monotone" dataKey="s" stroke="#22c55e" strokeWidth={2} fill="url(#sg)" name="Success" dot={false} />
//                                     <Line type="monotone" dataKey="f" stroke="#f87171" strokeWidth={1.5} dot={false} name="Failed" />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Supported Banks */}
//                 <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
//                         <h3 className="text-xs sm:text-sm font-bold text-gray-800">Supported Banks (Sample)</h3>
//                         <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">View All Banks</button>
//                     </div>
//                     <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
//                         {p.supportedBanksList.slice(0, 10).map(b => (
//                             <div key={b.short} className="flex flex-col items-center gap-1">
//                                 <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gray-100 rounded-full flex items-center justify-center">
//                                     <span className="text-[9px] sm:text-[10px] font-bold text-gray-600">{b.short[0]}</span>
//                                 </div>
//                                 <span className="text-[9px] sm:text-[10px] text-gray-500 text-center leading-tight">{b.short}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Right col: Balance + Health logs */}
//             <div className="flex-1 lg:flex-1 space-y-4 sm:space-y-5">
//                 {/* Balance Summary */}
//                 <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
//                     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3 sm:mb-4">
//                         <h3 className="text-xs sm:text-sm font-bold text-gray-800">Balance Summary</h3>
//                         <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-500 font-semibold">
//                             <Clock size={9} sm:size={10} />
//                             <span className="truncate">Last Synced: {p.lastSynced}</span>
//                             <button className="ml-0.5 hover:text-blue-500 transition-colors"><RefreshCw size={10} sm:size={11} /></button>
//                         </div>
//                     </div>
//                     <div className="space-y-2 sm:space-y-3 text-[11px] sm:text-xs">
//                         {[
//                             ["Available Balance", p.availableBalance, "text-gray-800"],
//                             ["Reserved Balance", p.reservedBalance, "text-gray-800"],
//                             ["In-Transit", p.inTransit, "text-gray-800"],
//                             ["Low Balance Threshold", p.lowBalanceThreshold, "text-gray-800"],
//                         ].map(([label, val, tc]) => (
//                             <div key={label} className="flex justify-between items-center pb-2 border-b border-gray-50 last:border-0">
//                                 <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">{label}</span>
//                                 <span className={`font-semibold ${tc} text-[11px] sm:text-xs`}>{val}</span>
//                             </div>
//                         ))}
//                         <div className="flex justify-between items-center pt-1">
//                             <span className="text-xs sm:text-sm font-semibold text-green-500">Usable Balance</span>
//                             <span className="text-xs sm:text-sm font-bold text-green-500">{p.usableBalance}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Health Logs */}
//                 <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
//                         <h3 className="text-xs sm:text-sm font-bold text-gray-800">Recent Health Logs</h3>
//                         <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">View All</button>
//                     </div>
//                     <div className="space-y-2 sm:space-y-0">
//                         {p.healthLogs.map((log, i) => (
//                             <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-50 last:border-0">
//                                 <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${log.icon === "warn" ? "bg-orange-50" : "bg-green-50"}`}>
//                                     {log.icon === "warn"
//                                         ? <AlertCircle size={12} sm:size={14} className="text-orange-400" />
//                                         : <TrendingUp size={12} sm:size={14} className="text-green-500" />
//                                     }
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <p className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-snug">{log.msg}</p>
//                                     <p className="text-[9px] sm:text-[11px] text-gray-400 mt-0.5">{log.time}</p>
//                                 </div>
//                                 <div className="text-left sm:text-right flex-shrink-0">
//                                     <p className="text-[10px] sm:text-[11px] text-gray-500">Response: {log.rt}</p>
//                                     <p className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${log.status === "Degraded" ? "text-orange-500" : "text-green-600"}`}>
//                                         Status: {log.status}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function PlaceholderTab({ label }) {
//     return (
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 sm:p-16 flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
//                 <Database size={22} sm:size={28} className="text-blue-400" />
//             </div>
//             <h3 className="text-sm sm:text-base font-semibold text-gray-600">{label}</h3>
//             <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
//                 This section displays {label.toLowerCase()} data and configurations for this API provider.
//             </p>
//         </div>
//     );
// }

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

// export default function ApiProviderDetail({ onBack = () => {} }) {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const p = PROVIDERS[id] || DEFAULT_PROVIDER;
//     const [activeTab, setActiveTab] = useState("overview");

//     const handleBack = () => {
//         if (onBack) {
//             onBack();
//         } else {
//             navigate('/payout-apis');
//         }
//     };

//     function renderTab() {
//         switch (activeTab) {
//             case "overview": return <OverviewTab p={p} />;
//             default: return <PlaceholderTab label={TABS.find(t => t.id === activeTab)?.label || activeTab} />;
//         }
//     }

//     return (
//         <div className="min-h-screen text-sm p-3 sm:p-0">

//             {/* ── PAGE HEADER ── */}
//             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-5">
//                 <div>
//                     <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">API Provider Details</h1>
//                     <div className="flex flex-wrap items-center gap-1 text-[11px] sm:text-xs text-gray-600 mt-1.5">
//                         <button onClick={() => navigate('/dashboard')} className="hover:text-blue-600 transition-colors">
//                             Dashboard
//                         </button>
//                         <ChevronRight size={10} sm:size={12} />
//                         <button onClick={() => navigate('/payout-apis')} className="hover:text-blue-600 transition-colors">
//                             Payout APIs
//                         </button>
//                         <ChevronRight size={10} sm:size={12} />
//                         <button onClick={() => navigate('/payout-apis')} className="hover:text-blue-600 transition-colors">
//                             API Providers
//                         </button>
//                         <ChevronRight size={10} sm:size={12} />
//                         <span className="text-gray-600 font-medium truncate max-w-[150px] sm:max-w-none">{p.name}</span>
//                     </div>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     <button
//                         onClick={handleBack}
//                         className="flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm"
//                     >
//                         <ArrowLeft size={12} sm:size={14} /> Back
//                     </button>
//                     <button className="flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm">
//                         <Edit2 size={12} sm:size={14} /> Edit
//                     </button>
//                     <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold transition-colors shadow-sm">
//                         Actions <ChevronDown size={12} sm:size={14} />
//                     </button>
//                 </div>
//             </div>

//             {/* ── PROVIDER HEADER CARD ── */}
//             <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-5">
//                 <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-5">
//                     <div className="flex items-start gap-3 sm:gap-4">
//                         <div className="flex-shrink-0">
//                             <ApiLogo p={p} size={60} />
//                         </div>
//                         <div className="flex-1">
//                             <div className="flex flex-wrap items-center gap-2">
//                                 <h2 className="text-lg sm:text-xl font-bold text-gray-900">{p.name}</h2>
//                                 <StatusBadge status={p.status} />
//                             </div>
//                             <p className="text-[11px] sm:text-xs text-gray-700 font-medium mt-1">{p.subtitle}</p>
//                             <div className="mt-3 sm:mt-4 space-y-2 text-[11px] sm:text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-gray-500 text-[11px] sm:text-xs font-semibold min-w-[85px]">Provider Type</span>
//                                     <span className="text-gray-300">:</span>
//                                     <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{p.providerType}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-gray-500 text-[11px] sm:text-xs font-semibold min-w-[85px]">Priority</span>
//                                     <span className="text-gray-300">:</span>
//                                     <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{p.priority}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                     <div className="hidden lg:block w-px self-stretch bg-gray-100" />
                    
//                     <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-[11px] sm:text-xs">
//                         {[
//                             ["API Code", p.apiCode],
//                             ["Created At", p.createdAt],
//                             ["Last Updated", p.updatedAt],
//                             ["Description", p.description],
//                         ].map(([l, v]) => (
//                             <div key={l} className="flex items-start gap-2">
//                                 <span className="text-gray-500 font-semibold w-24 shrink-0">{l}</span>
//                                 <span className="text-gray-300">:</span>
//                                 <span className="text-gray-700 font-medium break-words flex-1">{v}</span>
//                             </div>
//                         ))}
//                     </div>
                    
//                     <div className="hidden lg:block w-px self-stretch bg-gray-100" />
                    
//                     <div className="lg:min-w-[200px] space-y-2">
//                         <div>
//                             <div className="flex justify-between mb-1">
//                                 <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">Success Rate (30D)</span>
//                                 <span className="font-bold text-gray-800 text-[11px] sm:text-xs">{p.successRate}%</span>
//                             </div>
//                             <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
//                                 <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.successRate}%` }} />
//                             </div>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">Total Transactions (30D)</span>
//                             <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">{p.totalTxns30d.toLocaleString()}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">Total Volume (30D)</span>
//                             <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">{p.totalVol30d}</span>
//                         </div>
//                     </div>
                    
//                     <div className="hidden lg:block w-px self-stretch bg-gray-100" />
                    
//                     <div className="lg:min-w-[180px] border border-gray-100 rounded-xl p-3">
//                         <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
//                             <span className="text-[11px] sm:text-xs font-bold text-gray-700">Current Status</span>
//                             <StatusBadge status={p.healthStatus} />
//                         </div>
//                         <div className="space-y-1.5 text-[11px] sm:text-xs">
//                             <div className="flex justify-between">
//                                 <span className="text-gray-500 font-semibold">Response Time</span>
//                                 <span className="font-semibold text-gray-700">{p.responseTime}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span className="text-gray-500 font-semibold">Uptime (30D)</span>
//                                 <span className="font-semibold text-gray-700">{p.uptime30d}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ── TABS ── */}
//             <div className="bg-white border-gray-100 mb-4 sm:mb-5 overflow-hidden">
//                 <div className="flex overflow-x-auto border-b border-gray-100 px-2">
//                     {TABS.map(({ id, label }) => (
//                         <button
//                             key={id}
//                             onClick={() => setActiveTab(id)}
//                             className={`px-3 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0
//                                 ${activeTab === id
//                                     ? "border-blue-600 text-blue-600"
//                                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
//                                 }`}
//                         >
//                             {label}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* ── TAB CONTENT ── */}
//             {renderTab()}
//         </div>
//     );
// }
// ApiProviderDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, Edit2, ChevronDown, ChevronRight, RefreshCw,
    Eye, EyeOff, Copy, Check, TrendingUp, TrendingDown,
    AlertCircle, CheckCircle, Clock, Activity, Database,
    Shield, FileText, Webhook, BarChart2, Bell, Layers,
    RefreshCcw, ExternalLink,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
    ResponsiveContainer, LineChart, Line,
} from "recharts";
import apiProviderService from "../../services/ApiProvidersServices"; // Create this service

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const STATUS_STYLES = {
    active: "bg-green-50 text-green-700",
    inactive: "bg-red-50 text-red-700",
    maintenance: "bg-orange-50 text-orange-600",
    healthy: "bg-green-50 text-green-700",
    degraded: "bg-orange-50 text-orange-600",
};

function StatusBadge({ status, size = "sm" }) {
    const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || status || 'Unknown';
    const key = status?.toLowerCase() || '';
    const matchedKey = Object.keys(STATUS_STYLES).find(k => k === key);
    
    return (
        <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full font-semibold ${size === "sm" ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"} ${STATUS_STYLES[matchedKey] || "bg-gray-100 text-gray-600"}`}>
            {displayStatus}
        </span>
    );
}

function ApiLogo({ name }) {
    // Generate logo from name
    const getInitials = (name) => {
        if (!name) return '?';
        const words = name.split(' ');
        if (words.length === 1) return name.substring(0, 2).toUpperCase();
        return words.map(w => w[0]).join('').substring(0, 2).toUpperCase();
    };

    const getColor = (name) => {
        const colors = {
            razorpay: { bg: "#dbeafe", text: "#2563eb" },
            cashfree: { bg: "#dcfce7", text: "#166534" },
            paytm: { bg: "#dbeafe", text: "#1e40af" },
            easebuzz: { bg: "#e0e7ff", text: "#4338ca" },
            stripe: { bg: "#dbeafe", text: "#2563eb" },
            default: { bg: "#f3f4f6", text: "#374151" }
        };
        
        const key = name?.toLowerCase() || 'default';
        for (const [k, v] of Object.entries(colors)) {
            if (key.includes(k)) return v;
        }
        return colors.default;
    };

    const color = getColor(name);
    const initials = getInitials(name);

    return (
        <div
            className="w-12 h-12 sm:w-[60px] sm:h-[60px] rounded-xl flex items-center justify-center font-extrabold select-none flex-shrink-0"
            style={{ background: color.bg, color: color.text, fontSize: '18px' }}
        >
            {initials}
        </div>
    );
}

function CopyBtn({ value }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="text-gray-300 hover:text-gray-500 transition-colors"
        >
            {copied ? <Check size={11} className="text-green-500" /> : <Copy size={11} />}
        </button>
    );
}

function SecretField({ value }) {
    const [show, setShow] = useState(false);
    return (
        <span className="flex items-center gap-1 font-mono text-gray-700 text-[11px] sm:text-xs">
            {show ? value?.replace(/•/g, "x") || 'N/A' : value || 'N/A'}
            <button onClick={() => setShow(s => !s)} className="text-gray-300 hover:text-gray-500">
                {show ? <EyeOff size={11} /> : <Eye size={11} />}
            </button>
            <CopyBtn value={value} />
        </span>
    );
}

function formatCurrency(amount) {
    const num = parseFloat(amount);
    if (isNaN(num)) return '₹ 0.00';
    return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

const TABS = [
    { id: "overview", label: "Overview", Icon: Activity },
];

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────

function OverviewTab({ provider }) {
    const [showSecret, setShowSecret] = useState(false);
    
    // Prepare performance data for chart
    const chartData = provider?.perfData || [
        { d: "Day 1", s: 0, f: 0 },
        { d: "Day 2", s: 0, f: 0 },
        { d: "Day 3", s: 0, f: 0 },
        { d: "Day 4", s: 0, f: 0 },
        { d: "Day 5", s: 0, f: 0 },
    ];

    // Prepare stats from API response
    const stats = provider?.stats_30d || {};
    const performance = provider?.performance || {};
    const recentTransactions = provider?.recent_transactions || [];

    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

            {/* Left Column */}
            <div className="flex-1 lg:flex-[2] space-y-4 sm:space-y-5">

                {/* Configuration Details */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4">Configuration Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-2 sm:gap-y-3 text-[11px] sm:text-xs">
                        {[
                            ["Provider Name", provider?.name || 'N/A', "text"],
                            ["Status", provider?.status || 'N/A', "badge"],
                            ["Priority", provider?.priority || 'N/A', "text"],
                            ["Adapter Name", provider?.adapter_name || 'N/A', "text"],
                            ["Port", provider?.port || 'N/A', "text"],
                            ["Daily Limit", formatCurrency(provider?.daily_limit) || 'N/A', "text"],
                            ["Daily Usage", formatCurrency(provider?.daily_usage) || 'N/A', "text"],
                            ["Created At", formatDate(provider?.created_at) || 'N/A', "text"],
                        ].map(([label, value, type], i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-1">
                                <span className="text-gray-500 font-semibold w-28 shrink-0 text-[11px] sm:text-xs">{label}</span>
                                <span className="hidden sm:inline text-gray-400 mr-1">:</span>
                                {type === "text" && <span className="text-gray-700 font-medium break-words">{value}</span>}
                                {type === "badge" && <StatusBadge status={value} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-800">Performance (Last 30 Days)</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
                        {[
                            [`${performance?.success_rate || 0}%`, "Success Rate", "text-green-600"],
                            [`${performance?.failure_rate || 0}%`, "Failure Rate", "text-red-500"],
                            [`${performance?.pending_rate || 0}%`, "Pending Rate", "text-yellow-500"],
                            [stats?.total_transactions || 0, "Total Transactions", "text-gray-900"],
                        ].map(([v, l, c]) => (
                            <div key={l} className="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                                <p className={`text-sm sm:text-lg font-bold ${c} break-words`}>{v}</p>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 leading-tight">{l}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Volume Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <p className="text-[9px] sm:text-[10px] text-blue-600 font-medium">Total Volume</p>
                            <p className="text-sm sm:text-lg font-bold text-blue-700">{formatCurrency(stats?.total_volume || 0)}</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                            <p className="text-[9px] sm:text-[10px] text-purple-600 font-medium">Avg. Transaction</p>
                            <p className="text-sm sm:text-lg font-bold text-purple-700">
                                {stats?.total_transactions > 0 
                                    ? formatCurrency(stats.total_volume / stats.total_transactions)
                                    : '₹ 0.00'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Status Breakdown */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {[
                            ["Success", stats?.success_count || 0, "text-green-600"],
                            ["Failed", stats?.failed_count || 0, "text-red-500"],
                            ["Processing", stats?.processing_count || 0, "text-blue-500"],
                            ["Initiated", stats?.initiated_count || 0, "text-yellow-500"],
                            ["Returned", stats?.returned_count || 0, "text-orange-500"],
                        ].map(([label, count, color]) => (
                            <div key={label} className="text-center bg-gray-50 rounded-lg p-2">
                                <p className={`text-xs sm:text-sm font-bold ${color}`}>{count}</p>
                                <p className="text-[8px] sm:text-[9px] text-gray-400 truncate">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 lg:flex-1 space-y-4 sm:space-y-5">

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-800">Recent Transactions</h3>
                        <button className="text-[11px] sm:text-xs text-blue-600 hover:underline font-medium text-left">View All</button>
                    </div>
                    
                    {recentTransactions.length === 0 ? (
                        <div className="text-center py-6 text-gray-400 text-xs">
                            No recent transactions
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentTransactions.slice(0, 5).map((txn, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-800 truncate">
                                            {txn.bene_name || 'Unknown'}
                                        </p>
                                        <p className="text-[8px] sm:text-[10px] text-gray-400 truncate">
                                            {txn.trx_id || 'N/A'} • {txn.merchant_name || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-2">
                                        <p className="text-[10px] sm:text-xs font-bold text-gray-800">
                                            {formatCurrency(txn.amount)}
                                        </p>
                                        <StatusBadge status={txn.status} size="sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Info */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Provider Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs text-gray-500">Current Status</span>
                            <StatusBadge status={provider?.status} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs text-gray-500">Daily Usage</span>
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-700">
                                {formatCurrency(provider?.daily_usage)} / {formatCurrency(provider?.daily_limit)}
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div 
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                                style={{ 
                                    width: `${Math.min((parseFloat(provider?.daily_usage || 0) / parseFloat(provider?.daily_limit || 1)) * 100, 100)}%` 
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400">
                            <span>Last updated: {formatDate(provider?.created_at)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── TRANSACTIONS TAB ───────────────────────────────────────────────────────

function TransactionsTab({ provider }) {
    const transactions = provider?.recent_transactions || [];
    
    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Txn ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Order ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Merchant</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Beneficiary</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-400 text-sm">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            transactions.map((txn, index) => (
                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                    <td className="px-4 py-3 text-xs font-mono text-blue-600">{txn.trx_id || 'N/A'}</td>
                                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{txn.order_id || 'N/A'}</td>
                                    <td className="px-4 py-3 text-xs text-gray-800">{txn.merchant_name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-xs text-gray-800">{txn.bene_name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-900">{formatCurrency(txn.amount)}</td>
                                    <td className="px-4 py-3"><StatusBadge status={txn.status} /></td>
                                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(txn.created_at)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── SETTINGS TAB ──────────────────────────────────────────────────────────

function SettingsTab({ provider }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Provider Settings</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Provider Name</label>
                        <p className="text-sm text-gray-800 mt-1">{provider?.name || 'N/A'}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Adapter Name</label>
                        <p className="text-sm text-gray-800 mt-1">{provider?.adapter_name || 'N/A'}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Port</label>
                        <p className="text-sm text-gray-800 mt-1">{provider?.port || 'N/A'}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Priority</label>
                        <p className="text-sm text-gray-800 mt-1">{provider?.priority || 'N/A'}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Daily Limit</label>
                        <p className="text-sm text-gray-800 mt-1">{formatCurrency(provider?.daily_limit)}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">Status</label>
                        <div className="mt-1"><StatusBadge status={provider?.status} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlaceholderTab({ label }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 sm:p-16 flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Database size={22} sm:size={28} className="text-blue-400" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">{label}</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
                This section displays {label.toLowerCase()} data and configurations for this API provider.
            </p>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ApiProviderDetail({ onBack = () => {} }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ─── Fetch Provider Details ──────────────────────────────────────────
    const fetchProviderDetails = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await apiProviderService.getProviderDetails(id);
            setProvider(response);
        } catch (err) {
            console.error('Error fetching provider details:', err);
            setError('Failed to load provider details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProviderDetails();
        }
    }, [id]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/payout-apis');
        }
    };

    function renderTab() {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-3 text-sm text-gray-500">Loading provider details...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                        <p className="mt-3 text-sm text-red-500">{error}</p>
                        <button 
                            onClick={fetchProviderDetails}
                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (!provider) {
            return (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <Database className="w-12 h-12 text-gray-400 mx-auto" />
                        <p className="mt-3 text-sm text-gray-500">No provider data available</p>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case "overview": return <OverviewTab provider={provider} />;
            case "transactions": return <TransactionsTab provider={provider} />;
            case "settings": return <SettingsTab provider={provider} />;
            default: return <PlaceholderTab label={TABS.find(t => t.id === activeTab)?.label || activeTab} />;
        }
    }

    return (
        <div className="min-h-screen text-sm p-3 sm:p-0">

            {/* ── PAGE HEADER ── */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">API Provider Details</h1>
                    <div className="flex flex-wrap items-center gap-1 text-[11px] sm:text-xs text-gray-600 mt-1.5">
                        <button onClick={() => navigate('/dashboard')} className="hover:text-blue-600 transition-colors">
                            Dashboard
                        </button>
                        <ChevronRight size={10} sm:size={12} />
                        <button onClick={() => navigate('/payout-apis')} className="hover:text-blue-600 transition-colors">
                            Payout APIs
                        </button>
                        <ChevronRight size={10} sm:size={12} />
                        <button onClick={() => navigate('/payout-apis')} className="hover:text-blue-600 transition-colors">
                            API Providers
                        </button>
                        <ChevronRight size={10} sm:size={12} />
                        <span className="text-gray-600 font-medium truncate max-w-[150px] sm:max-w-none">
                            {loading ? 'Loading...' : provider?.name || 'Provider'}
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleBack}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={12} sm:size={14} /> Back
                    </button>
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <RefreshCw size={12} sm:size={14} onClick={fetchProviderDetails} /> Refresh
                    </button>
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold transition-colors shadow-sm">
                        Actions <ChevronDown size={12} sm:size={14} />
                    </button>
                </div>
            </div>

            {/* ── PROVIDER HEADER CARD ── */}
            {!loading && provider && (
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-5">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex-shrink-0">
                                <ApiLogo name={provider.name} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">{provider.name}</h2>
                                    <StatusBadge status={provider.status} />
                                </div>
                                <p className="text-[11px] sm:text-xs text-gray-700 font-medium mt-1">
                                    Adapter: {provider.adapter_name}
                                </p>
                                <div className="mt-3 sm:mt-4 space-y-2 text-[11px] sm:text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-[11px] sm:text-xs font-semibold min-w-[85px]">Provider Type</span>
                                        <span className="text-gray-300">:</span>
                                        <span className="font-medium text-gray-800 text-[11px] sm:text-xs">API Provider</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-[11px] sm:text-xs font-semibold min-w-[85px]">Priority</span>
                                        <span className="text-gray-300">:</span>
                                        <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{provider.priority}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden lg:block w-px self-stretch bg-gray-100" />
                        
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-[11px] sm:text-xs">
                            {[
                                ["Adapter", provider.adapter_name],
                                ["Port", provider.port],
                                ["Created At", formatDate(provider.created_at)],
                                ["Daily Limit", formatCurrency(provider.daily_limit)],
                            ].map(([l, v]) => (
                                <div key={l} className="flex items-start gap-2">
                                    <span className="text-gray-500 font-semibold w-24 shrink-0">{l}</span>
                                    <span className="text-gray-300">:</span>
                                    <span className="text-gray-700 font-medium break-words flex-1">{v}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="hidden lg:block w-px self-stretch bg-gray-100" />
                        
                        <div className="lg:min-w-[200px] space-y-2">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">Daily Usage</span>
                                    <span className="font-bold text-gray-800 text-[11px] sm:text-xs">
                                        {formatCurrency(provider.daily_usage)} / {formatCurrency(provider.daily_limit)}
                                    </span>
                                </div>
                                <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                                        style={{ 
                                            width: `${Math.min((parseFloat(provider.daily_usage || 0) / parseFloat(provider.daily_limit || 1)) * 100, 100)}%` 
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">Total Transactions (30D)</span>
                                <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">
                                    {provider.stats_30d?.total_transactions || 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-semibold text-[11px] sm:text-xs">Total Volume (30D)</span>
                                <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">
                                    {formatCurrency(provider.stats_30d?.total_volume || 0)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="hidden lg:block w-px self-stretch bg-gray-100" />
                        
                        <div className="lg:min-w-[180px] border border-gray-100 rounded-xl p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <span className="text-[11px] sm:text-xs font-bold text-gray-700">Health Status</span>
                                <StatusBadge status={provider.status} />
                            </div>
                            <div className="space-y-1.5 text-[11px] sm:text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-semibold">Success Rate</span>
                                    <span className="font-semibold text-green-600">{provider.performance?.success_rate || 0}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-semibold">Failure Rate</span>
                                    <span className="font-semibold text-red-500">{provider.performance?.failure_rate || 0}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── TABS ── */}
            <div className="bg-white border-gray-100 mb-4 sm:mb-5 overflow-hidden">
                <div className="flex overflow-x-auto border-b border-gray-100 px-2">
                    {TABS.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`px-3 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0
                                ${activeTab === id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── TAB CONTENT ── */}
            {renderTab()}
        </div>
    );
}
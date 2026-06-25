
// import { useState } from "react";
// import {
//   AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell,
// } from "recharts";
// import {
//   Send, IndianRupee, CheckCircle, XCircle, Clock, TrendingUp,
//   ArrowLeftRight, Users, Receipt, RefreshCw, Timer,
//   Calendar, ChevronDown, Download, ArrowRight, MoreVertical, Info,
// } from "lucide-react";
// import DateRangePicker from "../../components/DatePicker";


// // ─── DATA ─────────────────────────────────────────────────────────────────────

// const topStatCards = [
//   { label: "Total Payouts", value: "25,842", change: "↗ 12.5%", up: true, sub: "vs last 30 days", Icon: Send, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
//   { label: "Total Payout Amount", value: "₹12.54 Cr", change: "↗ 15.4%", up: true, sub: "vs last 30 days", Icon: IndianRupee, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
//   { label: "Successful Payouts", value: "25,430", change: "↗ 13.2%", up: true, sub: "vs last 30 days", Icon: CheckCircle, iconBg: "bg-green-100", iconColor: "text-green-600" },
//   { label: "Failed Payouts", value: "412", change: "↘ 8.7%", up: false, sub: "vs last 30 days", Icon: XCircle, iconBg: "bg-red-100", iconColor: "text-red-500" },
//   { label: "Pending Payouts", value: "56", change: "↘ 3.1%", up: false, sub: "vs last 30 days", Icon: Clock, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
//   { label: "Success Rate", value: "98.42%", change: "↗ 0.68%", up: true, sub: "vs last 30 days", Icon: TrendingUp, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
// ];

// const bottomStatCards = [
//   { label: "Average Payout Amount", value: "₹4,853.32", change: "↗ 4.2%", up: true, sub: "vs last 30 days", Icon: ArrowLeftRight, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
//   { label: "Total Unique Beneficiaries", value: "18,732", change: "↗ 8.1%", up: true, sub: "vs last 30 days", Icon: Users, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
//   { label: "Total Charges", value: "₹18.90 L", change: "↗ 6.3%", up: true, sub: "vs last 30 days", Icon: Receipt, iconBg: "bg-green-100", iconColor: "text-green-600" },
//   { label: "Returned Amount", value: "₹6.45 L", change: "↘ 5.6%", up: false, sub: "vs last 30 days", Icon: RefreshCw, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
//   { label: "Processing Time (Avg)", value: "8.42 sec", change: "↘ 1.2 sec", up: false, sub: "vs last 30 days", Icon: Timer, iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
//   { label: "Payout Success Amount", value: "₹12.35 Cr", change: "↗ 15.6%", up: true, sub: "vs last 30 days", Icon: IndianRupee, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
// ];

// const trendData = [
//   { date: "8 May", vol: 2.2 },
//   { date: "9 May", vol: 3.8 },
//   { date: "10 May", vol: 5.0 },
//   { date: "11 May", vol: 7.8 },
//   { date: "12 May", vol: 8.2 },
//   { date: "13 May", vol: 7.5 },
//   { date: "14 May", vol: 2.5 },
// ];

// const statusDonut = [
//   { name: "Successful", value: 25430, pct: "98.42%", color: "#16a34a" },
//   { name: "Failed", value: 412, pct: "1.58%", color: "#ef4444" },
//   { name: "Pending", value: 56, pct: "0.22%", color: "#f59e0b" },
//   { name: "Returned", value: 32, pct: "0.12%", color: "#9ca3af" },
// ];

// const apiDonut = [
//   { name: "RazorpayX", value: 10425, pct: "40.32%", color: "#2563eb" },
//   { name: "Cashfree", value: 6842, pct: "26.46%", color: "#16a34a" },
//   { name: "Paytm Payouts", value: 4125, pct: "15.94%", color: "#8b5cf6" },
//   { name: "PhonePe Payout", value: 2856, pct: "11.04%", color: "#f59e0b" },
//   { name: "Amazon Pay", value: 1594, pct: "6.16%", color: "#06b6d4" },
// ];

// const merchantTable = [
//   { name: "ABC Pvt Ltd", payouts: "5,230", amount: "₹2.35 Cr", rate: "98.72%" },
//   { name: "XYZ Retailers", payouts: "4,120", amount: "₹1.85 Cr", rate: "97.91%" },
//   { name: "Global Solutions", payouts: "3,250", amount: "₹1.25 Cr", rate: "98.12%" },
//   { name: "Quick Pay Services", payouts: "2,850", amount: "₹1.05 Cr", rate: "97.80%" },
//   { name: "Prime Business", payouts: "2,150", amount: "₹85.40 L", rate: "97.45%" },
// ];

// const failReasons = [
//   { name: "Invalid Account", pct: 32.0, count: 132, color: "#ef4444" },
//   { name: "Insufficient Balance", pct: 21.6, count: 89, color: "#f59e0b" },
//   { name: "Account Closed", pct: 18.4, count: 76, color: "#f97316" },
//   { name: "Bank Error", pct: 15.5, count: 64, color: "#2563eb" },
//   { name: "Other Reasons", pct: 12.5, count: 51, color: "#9ca3af" },
// ];

// const distribution = [
//   { range: "₹0 – ₹1,000", pct: 35.20, barW: 88 },
//   { range: "₹1,001 – ₹10,000", pct: 32.40, barW: 81 },
//   { range: "₹10,001 – ₹50,000", pct: 18.60, barW: 46.5 },
//   { range: "₹50,001 – ₹1,00,000", pct: 8.90, barW: 22.25 },
//   { range: "Above ₹1,00,000", pct: 4.90, barW: 12.25 },
// ];

// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// function Card({ children, className = "" }) {
//   return (
//     <div className={`bg-white rounded-xl border border-gray-100 p-3 sm:p-4 ${className}`}>
//       {children}
//     </div>
//   );
// }

// function StatCard({ label, value, change, up, sub, Icon, iconBg, iconColor }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-100 p-2.5 sm:p-3.5 flex items-start gap-2 sm:gap-3">
//       <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
//         <Icon size={14} sm:size={17} className={iconColor} />
//       </div>
//       <div className="min-w-0 flex-1">
//         <p className="text-[9px] sm:text-[10px] text-gray-800 font-medium leading-tight truncate">{label}</p>
//         <p className="text-[14px] sm:text-[17px] font-bold text-gray-900 mt-0.5 leading-tight truncate">{value}</p>
//         <p className={`text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium ${up ? "text-green-600" : "text-red-500"}`}>
//           {change}
//           <span className="text-gray-400 font-normal block text-[8px] sm:text-[9px]">{sub}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// function DonutCenter({ cx, cy, line1, line2 }) {
//   return (
//     <g>
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fontWeight={600} fill="#111827">{line1}</text>
//       <text x={cx} y={cy + 10} textAnchor="middle" fontSize={8} fill="#9ca3af">{line2}</text>
//     </g>
//   );
// }

// function LegendRow({ color, name, right }) {
//   return (
//     <div className="flex items-center justify-between mb-1.5 text-[10px] sm:text-[11px]">
//       <div className="flex items-center gap-1 sm:gap-1.5">
//         <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ background: color }} />
//         <span className="text-gray-800 font-medium truncate max-w-[80px] sm:max-w-none">{name}</span>
//       </div>
//       <span className="text-gray-400 ml-1 sm:ml-2 font-medium whitespace-nowrap text-[9px] sm:text-[11px]">{right}</span>
//     </div>
//   );
// }

// // ─── MAIN ─────────────────────────────────────────────────────────────────────

// export default function PayoutReport() {
//   const [activePeriod, setActivePeriod] = useState("7D");
//   const [dateRange, setDateRange] = useState(null);

//   const handleDateChange = (dateData) => {
//     if (dateData) {
//       setDateRange(dateData);
//       console.log('Date Range Selected:', dateData);
//     } else {
//       console.log('Date range cleared');
//     }
//   };

//   return (
//     <div className="min-h-screen text-sm p-3 sm:p-0">

//       {/* ── PAGE HEADER ── */}
//       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-5">
//         <div>
//           <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Payout Report</h1>
//           <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Reports › Payout Report</p>
//         </div>
//         <div className="flex flex-wrap items-center gap-2">
//           <DateRangePicker
//             onDateChange={handleDateChange}
//             placeholder="14 May, 2025 - 14 May, 2025"
//           />
//           <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//             Merchants <ChevronDown size={10} sm:size={11} />
//           </button>
//           <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//             APIs <ChevronDown size={10} sm:size={11} />
//           </button>
//           <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//             Status <ChevronDown size={10} sm:size={11} />
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-colors">
//             Apply
//           </button>
//           <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//             <Download size={11} sm:size={13} /> Export
//           </button>
//         </div>
//       </div>

//       {/* ── TOP 6 STATS ── */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
//         {topStatCards.map(c => <StatCard key={c.label} {...c} />)}
//       </div>

//       {/* ── CHARTS ROW ── */}
//       <div className="flex flex-col lg:flex-row gap-3 mb-3">

//         {/* Payout Volume Trend */}
//         <div className="flex-1">
//           <Card>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
//               <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5">
//                 Payout Volume Trend <Info size={12} sm:size={13} className="text-gray-300" />
//               </p>
//               <div className="flex items-center gap-1.5">
//                 {["7D", "30D", "90D"].map(p => (
//                   <button
//                     key={p}
//                     onClick={() => setActivePeriod(p)}
//                     className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-colors
//                       ${activePeriod === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="h-[180px] sm:h-[195px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
//                       <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} width={30} />
//                   <Tooltip formatter={v => [`₹${v}M`, "Volume"]} contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
//                   <Area type="monotone" dataKey="vol" stroke="#2563eb" strokeWidth={2} fill="url(#tvGrad)" dot={{ r: 3, fill: "#2563eb" }} activeDot={{ r: 4 }} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>
//         </div>

//         {/* Payouts by Status */}
//         <div className="flex-1">
//           <Card>
//             <div className="flex items-center justify-between mb-2 sm:mb-3">
//               <p className="text-xs sm:text-sm font-semibold text-gray-800">Payouts by Status</p>
//               <MoreVertical size={13} sm:size={15} className="text-gray-400 cursor-pointer" />
//             </div>
//             <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
//               <div className="flex-shrink-0">
//                 <div className="h-[110px] w-[110px] sm:h-[120px] sm:w-[120px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie data={statusDonut} cx="50%" cy="50%" innerRadius={35} outerRadius={52} dataKey="value" strokeWidth={2} stroke="#fff">
//                         {statusDonut.map((e, i) => <Cell key={i} fill={e.color} />)}
//                       </Pie>
//                       <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
//                         <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">25,842</tspan>
//                         <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
//                       </text>
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//               <div className="flex-1 w-full">
//                 {statusDonut.map(e => (
//                   <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.value.toLocaleString()} (${e.pct})`} />
//                 ))}
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Payouts by API */}
//         <div className="flex-1">
//           <Card>
//             <div className="flex items-center justify-between mb-2 sm:mb-3">
//               <p className="text-xs sm:text-sm font-semibold text-gray-800">Payouts by API</p>
//               <MoreVertical size={13} sm:size={15} className="text-gray-400 cursor-pointer" />
//             </div>
//             <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
//               <div className="flex-shrink-0">
//                 <div className="h-[105px] w-[105px] sm:h-[115px] sm:w-[115px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie data={apiDonut} cx="50%" cy="50%" innerRadius={33} outerRadius={50} dataKey="value" strokeWidth={2} stroke="#fff">
//                         {apiDonut.map((e, i) => <Cell key={i} fill={e.color} />)}
//                       </Pie>
//                       <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
//                         <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">25,842</tspan>
//                         <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
//                       </text>
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//               <div className="flex-1 w-full">
//                 {apiDonut.map(e => (
//                   <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.value.toLocaleString()} (${e.pct})`} />
//                 ))}
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* ── SECONDARY 6 STATS ── */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
//         {bottomStatCards.map(c => <StatCard key={c.label} {...c} />)}
//       </div>

//       {/* ── BOTTOM ROW ── */}
//       <div className="flex flex-col lg:flex-row gap-3">

//         {/* Payouts by Merchant */}
//         <div className="flex-1">
//           <Card>
//             <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Payouts by Merchant (Top 5)</p>
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[500px] text-[10px] sm:text-xs">
//                 <thead>
//                   <tr className="border-b border-gray-100 text-gray-800">
//                     <th className="text-left pb-2 font-medium">Merchant</th>
//                     <th className="text-right pb-2 font-medium">Payouts</th>
//                     <th className="text-right pb-2 font-medium">Amount</th>
//                     <th className="text-right pb-2 font-medium">Success Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {merchantTable.map(({ name, payouts, amount, rate }) => (
//                     <tr key={name} className="border-b border-gray-50 last:border-0">
//                       <td className="py-1.5 sm:py-2 text-gray-700 font-medium truncate max-w-[100px] sm:max-w-none">{name}</td>
//                       <td className="py-1.5 sm:py-2 text-right text-gray-700 font-medium">{payouts}</td>
//                       <td className="py-1.5 sm:py-2 text-right font-semibold text-gray-900">{amount}</td>
//                       <td className="py-1.5 sm:py-2 text-right text-gray-700 font-medium">
//                         <span className="flex items-center justify-end gap-1">
//                           {rate}
//                           <span className="inline-block w-5 h-1 bg-green-500 rounded-full" />
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-2 sm:mt-3 font-medium">
//               View All Merchants <ArrowRight size={11} sm:size={13} />
//             </button>
//           </Card>
//         </div>

//         {/* Payouts by Reason (Failed) */}
//         <div className="flex-1">
//           <Card>
//             <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Payouts by Reason (Failed)</p>
//             <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
//               <div className="shrink-0">
//                 <div className="h-[100px] w-[100px] sm:h-[110px] sm:w-[110px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie data={failReasons} cx="50%" cy="50%" innerRadius={30} outerRadius={48} dataKey="count" strokeWidth={2} stroke="#fff">
//                         {failReasons.map((e, i) => <Cell key={i} fill={e.color} />)}
//                       </Pie>
//                       <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
//                         <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">412</tspan>
//                         <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
//                       </text>
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//               <div className="flex-1 w-full">
//                 {failReasons.map(e => (
//                   <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.pct}% (${e.count})`} />
//                 ))}
//               </div>
//             </div>
//             <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-2 sm:mt-3 font-medium">
//               View All Reasons <ArrowRight size={11} sm:size={13} />
//             </button>
//           </Card>
//         </div>

//         {/* Payout Amount Distribution */}
//         <div className="flex-1">
//           <Card>
//             <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Payout Amount Distribution</p>
//             <div className="space-y-3 sm:space-y-4">
//               {distribution.map(({ range, pct, barW }) => (
//                 <div key={range} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//                   <span className="text-[10px] sm:text-xs text-gray-700 font-medium w-32 sm:w-36 shrink-0">{range}</span>
//                   <div className="flex-1 flex items-center gap-2">
//                     <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
//                       <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(barW, 100)}%` }} />
//                     </div>
//                     <span className="text-[10px] sm:text-xs text-gray-500 w-8 sm:w-10 text-right shrink-0 font-medium">{pct}%</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-3 sm:mt-4 font-medium">
//               View Distribution Report <ArrowRight size={11} sm:size={13} />
//             </button>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/reports/PayoutReports.jsx
import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  Send, IndianRupee, CheckCircle, XCircle, Clock, TrendingUp,
  ArrowLeftRight, Users, Receipt, RefreshCw, Timer,
  Calendar, ChevronDown, Download, ArrowRight, MoreVertical, Info,
} from "lucide-react";
import DateRangePicker from "../../components/DatePicker";
import payoutReportService from "../../services/PayoutReportServices";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-3 sm:p-4 ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ label, value, change, up, sub, Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-2.5 sm:p-3.5 flex items-start gap-2 sm:gap-3">
      <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={14} sm:size={17} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] sm:text-[10px] text-gray-800 font-medium leading-tight truncate">{label}</p>
        <p className="text-[14px] sm:text-[17px] font-bold text-gray-900 mt-0.5 leading-tight truncate">{value}</p>
        {change && (
          <p className={`text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium ${up ? "text-green-600" : "text-red-500"}`}>
            {change}
            {sub && <span className="text-gray-400 font-normal block text-[8px] sm:text-[9px]">{sub}</span>}
          </p>
        )}
      </div>
    </div>
  );
}

function LegendRow({ color, name, right }) {
  return (
    <div className="flex items-center justify-between mb-1.5 text-[10px] sm:text-[11px]">
      <div className="flex items-center gap-1 sm:gap-1.5">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ background: color }} />
        <span className="text-gray-800 font-medium truncate max-w-[80px] sm:max-w-none">{name}</span>
      </div>
      <span className="text-gray-400 ml-1 sm:ml-2 font-medium whitespace-nowrap text-[9px] sm:text-[11px]">{right}</span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function PayoutReport() {
  const [activePeriod, setActivePeriod] = useState("7D");
  const [dateRange, setDateRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState({
    summary: {
      total_payout_count: 0,
      total_payout_amount: "0",
      payout_success_amount: "0",
      successful_payouts: "0",
      failed_payouts: "0",
      pending_payouts: "0",
      returned_payouts: "0",
      returned_amount: "0",
      total_charges: "0",
      total_unique_beneficiaries: 0,
      success_rate: "0"
    },
    payouts_by_status: [],
    payouts_by_api: [],
    top_merchants: [],
    amount_distribution: []
  });

  // ─── Fetch Report Data ──────────────────────────────────────────────────────
  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {};
      
      if (dateRange) {
        params.start_date = dateRange.startFormatted;
        params.end_date = dateRange.endFormatted;
      }
      
      const response = await payoutReportService.getPayoutReport(params);
      setReportData(response);
    } catch (err) {
      console.error('Error fetching payout report:', err);
      setError('Failed to load payout report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      console.log('Date Range Selected:', dateData);
    } else {
      setDateRange(null);
      console.log('Date range cleared');
    }
  };

  const handleRefresh = () => {
    fetchReportData();
  };

  // ─── Format Helpers ─────────────────────────────────────────────────────────
  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '₹0';
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    return parseInt(num).toLocaleString();
  };

  const getStatusColor = (status) => {
    const map = {
      success: "#16a34a",
      failed: "#ef4444",
      initiated: "#f59e0b",
      processing: "#3b82f6",
      returned: "#9ca3af",
      pending: "#f59e0b"
    };
    return map[status?.toLowerCase()] || "#9ca3af";
  };

  const getStatusDisplay = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // ─── Prepare Data for Charts ──────────────────────────────────────────────
  const summary = reportData.summary || {};
  const payoutsByStatus = reportData.payouts_by_status || [];
  const payoutsByApi = reportData.payouts_by_api || [];
  const topMerchants = reportData.top_merchants || [];
  const amountDistribution = reportData.amount_distribution || [];

  // Prepare status donut data
  const statusDonut = payoutsByStatus.map(item => ({
    name: getStatusDisplay(item.status),
    value: parseInt(item.count) || 0,
    pct: `${parseFloat(item.percentage || 0).toFixed(2)}%`,
    color: getStatusColor(item.status)
  }));

  // Prepare API donut data (top 5)
  const apiDonut = payoutsByApi.slice(0, 5).map(item => ({
    name: item.api_name || 'Unknown',
    value: parseInt(item.total_transactions) || 0,
    pct: `${parseFloat(item.success_rate || 0).toFixed(2)}%`,
    color: parseFloat(item.success_rate) >= 80 ? '#16a34a' : 
           parseFloat(item.success_rate) >= 50 ? '#f59e0b' : '#ef4444'
  }));

  // Prepare merchant table data
  const merchantTable = topMerchants.map(item => ({
    name: item.merchant_name || 'Unknown',
    payouts: formatNumber(item.total_transactions),
    amount: formatCurrency(item.total_amount),
    rate: `${parseFloat(item.success_rate || 0).toFixed(2)}%`
  }));

  // Prepare fail reasons (from status data)
  const failReasons = payoutsByStatus
    .filter(item => item.status?.toLowerCase() === 'failed')
    .map(item => ({
      name: 'Failed Payouts',
      pct: parseFloat(item.percentage || 0),
      count: parseInt(item.count) || 0,
      color: '#ef4444'
    }));

  // If no failed payouts, show empty data
  const failData = failReasons.length > 0 ? failReasons : [
    { name: 'No Failed Payouts', pct: 0, count: 0, color: '#9ca3af' }
  ];

  // Prepare distribution data
  const distribution = amountDistribution.map(item => ({
    range: item.range_label || 'Unknown',
    pct: parseFloat(item.percentage || 0),
    barW: parseFloat(item.percentage || 0) * 2.5 // Scale for visual
  }));

  // Top stat cards from API
  const topStatCards = [
    { 
      label: "Total Payouts", 
      value: formatNumber(summary.total_payout_count), 
      change: null, 
      up: true, 
      sub: "All time", 
      Icon: Send, 
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600" 
    },
    { 
      label: "Total Payout Amount", 
      value: formatCurrency(summary.total_payout_amount), 
      change: null, 
      up: true, 
      sub: "All time", 
      Icon: IndianRupee, 
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600" 
    },
    { 
      label: "Successful Payouts", 
      value: formatNumber(summary.successful_payouts), 
      change: null, 
      up: true, 
      sub: `₹${formatCurrency(summary.payout_success_amount)}`, 
      Icon: CheckCircle, 
      iconBg: "bg-green-100", 
      iconColor: "text-green-600" 
    },
    { 
      label: "Failed Payouts", 
      value: formatNumber(summary.failed_payouts), 
      change: null, 
      up: false, 
      sub: "All time", 
      Icon: XCircle, 
      iconBg: "bg-red-100", 
      iconColor: "text-red-500" 
    },
    { 
      label: "Pending Payouts", 
      value: formatNumber(summary.pending_payouts), 
      change: null, 
      up: false, 
      sub: "All time", 
      Icon: Clock, 
      iconBg: "bg-orange-100", 
      iconColor: "text-orange-500" 
    },
    { 
      label: "Success Rate", 
      value: `${parseFloat(summary.success_rate || 0).toFixed(2)}%`, 
      change: null, 
      up: parseFloat(summary.success_rate) >= 50, 
      sub: `${formatNumber(summary.total_payout_count)} total payouts`, 
      Icon: TrendingUp, 
      iconBg: "bg-emerald-100", 
      iconColor: "text-emerald-600" 
    },
  ];

  // Bottom stat cards from API
  const bottomStatCards = [
    { 
      label: "Avg Payout Amount", 
      value: summary.total_payout_count > 0 ? formatCurrency(parseFloat(summary.total_payout_amount) / parseInt(summary.total_payout_count)) : '₹0', 
      change: null, 
      up: true, 
      sub: "All time", 
      Icon: ArrowLeftRight, 
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600" 
    },
    { 
      label: "Unique Beneficiaries", 
      value: formatNumber(summary.total_unique_beneficiaries), 
      change: null, 
      up: true, 
      sub: "All time", 
      Icon: Users, 
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600" 
    },
    { 
      label: "Total Charges", 
      value: formatCurrency(summary.total_charges), 
      change: null, 
      up: true, 
      sub: "All time", 
      Icon: Receipt, 
      iconBg: "bg-green-100", 
      iconColor: "text-green-600" 
    },
    { 
      label: "Returned Amount", 
      value: formatCurrency(summary.returned_amount), 
      change: null, 
      up: false, 
      sub: `${formatNumber(summary.returned_payouts)} returned`, 
      Icon: RefreshCw, 
      iconBg: "bg-orange-100", 
      iconColor: "text-orange-500" 
    },
    { 
      label: "Total Payouts", 
      value: formatNumber(summary.total_payout_count), 
      change: null, 
      up: true, 
      sub: "All time", 
      Icon: Timer, 
      iconBg: "bg-yellow-100", 
      iconColor: "text-yellow-600" 
    },
    { 
      label: "Success Amount", 
      value: formatCurrency(summary.payout_success_amount), 
      change: null, 
      up: true, 
      sub: `${formatNumber(summary.successful_payouts)} successful`, 
      Icon: IndianRupee, 
      iconBg: "bg-emerald-100", 
      iconColor: "text-emerald-600" 
    },
  ];

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payout report...</p>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-red-600">{error}</p>
          <button 
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-sm p-3 sm:p-0">

      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Payout Report</h1>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Reports › Payout Report</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker
            onDateChange={handleDateChange}
            placeholder="Select date range"
          />
          <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
            Merchants <ChevronDown size={10} sm:size={11} />
          </button>
          <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
            APIs <ChevronDown size={10} sm:size={11} />
          </button>
          <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
            Status <ChevronDown size={10} sm:size={11} />
          </button>
          <button 
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-colors"
          >
            Apply
          </button>
          <button className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
            <Download size={11} sm:size={13} /> Export
          </button>
        </div>
      </div>

      {/* ── TOP 6 STATS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
        {topStatCards.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="flex flex-col lg:flex-row gap-3 mb-3">

        {/* Payout Volume Trend - Using status data */}
        <div className="flex-1">
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                Payout Volume Trend <Info size={12} sm:size={13} className="text-gray-300" />
              </p>
              <div className="flex items-center gap-1.5">
                {["7D", "30D", "90D"].map(p => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-colors
                      ${activePeriod === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[180px] sm:h-[195px] w-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-sm">Trend data available</p>
                <p className="text-xs mt-1">Total Payouts: {formatNumber(summary.total_payout_count)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payouts by Status */}
        <div className="flex-1">
          <Card>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm font-semibold text-gray-800">Payouts by Status</p>
              <MoreVertical size={13} sm:size={15} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                <div className="h-[110px] w-[110px] sm:h-[120px] sm:w-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusDonut} cx="50%" cy="50%" innerRadius={35} outerRadius={52} dataKey="value" strokeWidth={2} stroke="#fff">
                        {statusDonut.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">{formatNumber(summary.total_payout_count)}</tspan>
                        <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 w-full">
                {statusDonut.map(e => (
                  <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.value.toLocaleString()} (${e.pct})`} />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Payouts by API */}
        <div className="flex-1">
          <Card>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm font-semibold text-gray-800">Payouts by API</p>
              <MoreVertical size={13} sm:size={15} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                <div className="h-[105px] w-[105px] sm:h-[115px] sm:w-[115px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={apiDonut} cx="50%" cy="50%" innerRadius={33} outerRadius={50} dataKey="value" strokeWidth={2} stroke="#fff">
                        {apiDonut.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">{formatNumber(summary.total_payout_count)}</tspan>
                        <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 w-full">
                {apiDonut.map(e => (
                  <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.value.toLocaleString()} (${e.pct})`} />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── SECONDARY 6 STATS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
        {bottomStatCards.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="flex flex-col lg:flex-row gap-3">

        {/* Payouts by Merchant */}
        <div className="flex-1">
          <Card>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Payouts by Merchant (Top 5)</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-[10px] sm:text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-800">
                    <th className="text-left pb-2 font-medium">Merchant</th>
                    <th className="text-right pb-2 font-medium">Payouts</th>
                    <th className="text-right pb-2 font-medium">Amount</th>
                    <th className="text-right pb-2 font-medium">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {merchantTable.length > 0 ? (
                    merchantTable.map(({ name, payouts, amount, rate }) => (
                      <tr key={name} className="border-b border-gray-50 last:border-0">
                        <td className="py-1.5 sm:py-2 text-gray-700 font-medium truncate max-w-[100px] sm:max-w-none">{name}</td>
                        <td className="py-1.5 sm:py-2 text-right text-gray-700 font-medium">{payouts}</td>
                        <td className="py-1.5 sm:py-2 text-right font-semibold text-gray-900">{amount}</td>
                        <td className="py-1.5 sm:py-2 text-right text-gray-700 font-medium">
                          <span className="flex items-center justify-end gap-1">
                            {rate}
                            <span 
                              className="inline-block w-5 h-1 rounded-full"
                              style={{ 
                                background: parseFloat(rate) >= 80 ? '#16a34a' : 
                                           parseFloat(rate) >= 50 ? '#f59e0b' : '#ef4444'
                              }} 
                            />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-400">No merchant data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-2 sm:mt-3 font-medium">
              View All Merchants <ArrowRight size={11} sm:size={13} />
            </button>
          </Card>
        </div>

        {/* Payouts by Reason (Failed) */}
        <div className="flex-1">
          <Card>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Payouts by Reason (Failed)</p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="shrink-0">
                <div className="h-[100px] w-[100px] sm:h-[110px] sm:w-[110px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={failData} cx="50%" cy="50%" innerRadius={30} outerRadius={48} dataKey="count" strokeWidth={2} stroke="#fff">
                        {failData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">{formatNumber(summary.failed_payouts)}</tspan>
                        <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Failed</tspan>
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 w-full">
                {failData.map(e => (
                  <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.pct.toFixed(2)}% (${e.count})`} />
                ))}
              </div>
            </div>
            <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-2 sm:mt-3 font-medium">
              View All Reasons <ArrowRight size={11} sm:size={13} />
            </button>
          </Card>
        </div>

        {/* Payout Amount Distribution */}
        <div className="flex-1">
          <Card>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Payout Amount Distribution</p>
            <div className="space-y-3 sm:space-y-4">
              {distribution.length > 0 ? (
                distribution.map(({ range, pct, barW }) => (
                  <div key={range} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-[10px] sm:text-xs text-gray-700 font-medium w-32 sm:w-36 shrink-0">{range}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(pct * 2.5, 100)}%` }} />
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-500 w-8 sm:w-10 text-right shrink-0 font-medium">{pct.toFixed(2)}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">No distribution data available</div>
              )}
            </div>
            <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-3 sm:mt-4 font-medium">
              View Distribution Report <ArrowRight size={11} sm:size={13} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
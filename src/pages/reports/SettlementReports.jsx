// import { useState } from "react";
// import {
//   AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell,
// } from "recharts";
// import DateRangePicker from "../../components/DatePicker";

// // ── Data ──────────────────────────────────────────────────────────────────────
// const trendData = [
//   { date: "8 May",  amount: 0.9 },
//   { date: "9 May",  amount: 1.35 },
//   { date: "10 May", amount: 1.95 },
//   { date: "11 May", amount: 2.0 },
//   { date: "12 May", amount: 2.35 },
//   { date: "13 May", amount: 2.1 },
//   { date: "14 May", amount: 0.8 },
// ];

// const pieData = [
//   { name: "Completed", value: 458, color: "#16a34a" },
//   { name: "Pending",   value: 72,  color: "#f97316" },
//   { name: "Failed",    value: 5,   color: "#dc2626" },
//   { name: "Cancelled", value: 1,   color: "#9ca3af" },
// ];

// const overviewRows = [
//   { status: "Completed", dot: "bg-green-500",  count: 458, amount: "₹10.60 Cr", pct: "86.42%" },
//   { status: "Pending",   dot: "bg-orange-400", count: 72,  amount: "₹1.20 Cr",  pct: "13.58%" },
//   { status: "Failed",    dot: "bg-red-500",    count: 5,   amount: "₹18.90 L",  pct: "0.94%"  },
//   { status: "Cancelled", dot: "bg-gray-400",   count: 1,   amount: "₹2.30 L",   pct: "0.06%"  },
// ];

// const upcomingRows = [
//   { date: "15 May 2025", merchants: 248, amount: "₹2.65 Cr",  status: "Scheduled" },
//   { date: "16 May 2025", merchants: 210, amount: "₹1.85 Cr",  status: "Scheduled" },
//   { date: "17 May 2025", merchants: 195, amount: "₹1.40 Cr",  status: "Scheduled" },
//   { date: "18 May 2025", merchants: 170, amount: "₹98.50 L",  status: "Scheduled" },
// ];

// const apiRows = [
//   { name: "RazorpayX",       color: "bg-blue-600",   bar: "w-[90%]", amount: "₹5.25 Cr", pct: "44.49%", abbr: "R",  abbBg: "bg-blue-100 text-blue-700"   },
//   { name: "Cashfree",        color: "bg-blue-500",   bar: "w-[55%]", amount: "₹3.10 Cr", pct: "26.27%", abbr: "CF", abbBg: "bg-green-100 text-green-700"  },
//   { name: "PhonePe Payouts", color: "bg-purple-500", bar: "w-[32%]", amount: "₹1.85 Cr", pct: "15.68%", abbr: "P",  abbBg: "bg-purple-100 text-purple-700"},
//   { name: "Paytm Payouts",   color: "bg-blue-400",   bar: "w-[18%]", amount: "₹1.05 Cr", pct: "8.90%",  abbr: "PT", abbBg: "bg-blue-100 text-blue-700"    },
//   { name: "Amazon Pay",      color: "bg-orange-400", bar: "w-[9%]",  amount: "₹0.55 Cr", pct: "4.66%",  abbr: "A",  abbBg: "bg-orange-100 text-orange-700"},
// ];

// // ── Custom Tooltip for Area Chart ─────────────────────────────────────────────
// function CustomTooltip({ active, payload, label }) {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs">
//       <p className="text-gray-500 mb-0.5">{label}</p>
//       <p className="font-semibold text-gray-900">₹{payload[0].value} Cr</p>
//     </div>
//   );
// }

// // ── Stat Card ─────────────────────────────────────────────────────────────────
// function StatCard({ iconBg, icon, label, value, changePct, changeDir, sub }) {
//   const up = changeDir === "up";
//   return (
//     <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
//       <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
//         {icon}
//       </div>
//       <div className="min-w-0">
//         <p className="text-xs text-black mb-0.5 font-medium">{label}</p>
//         <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
//         <p className={`text-xs font-medium mt-0.5 ${up ? "text-green-600" : "text-red-500"}`}>
//           {up ? "↑" : "↓"} {changePct}
//           <span className="text-gray-400 font-normal ml-1">{sub}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Quick Info Card (right column) ───────────────────────────────────────────
// function QuickCard({ iconBg, icon, label, value, valueColor = "text-gray-900" }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
//       <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-[11px] text-black font-medium leading-none mb-0.5">{label}</p>
//         <p className={`text-base font-bold ${valueColor}`}>{value}</p>
//       </div>
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function SettlementReport() {
//   const [trendRange, setTrendRange] = useState("7D");

//   const total = pieData.reduce((s, d) => s + d.value, 0);

//   const [dateRange, setDateRange] = useState(null);

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

//   return (
//     <div className="min-h-screen">

//       {/* ── Page Header ── */}
//       <div className="mb-4">
//         <h1 className="text-xl font-bold text-gray-900">Settlement Reports</h1>
//         <p className="text-sm text-gray-400 mt-0.5">
//           Reports <span className="mx-1">›</span>
//           <span className="text-gray-600">Settlement Reports</span>
//         </p>
//       </div>

//       {/* ── Filter Bar ── */}
//       <div className="flex items-center gap-3 mb-5 flex-wrap">
//         {/* Date Range */}
//         <DateRangePicker 
//                         onDateChange={handleDateChange}
//                         placeholder="14 May, 2025 - 14 May, 2025"
//                     />

//         {/* Dropdowns */}
//         {["All Merchants", "All APIs", "All Statuses"].map(f => (
//           <div key={f} className="relative">
//             <select className="appearance-none pl-3 pr-8 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer hover:border-gray-300">
//               <option>{f}</option>
//             </select>
//             <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>
//         ))}

//         <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
//           Apply Filter
//         </button>

//         <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 rounded-lg transition-colors">
//           <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//           </svg>
//           Export Report
//           <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>
//       </div>

//       {/* ── Stat Cards ── */}
//       <div className="grid grid-cols-5 gap-4 mb-5">
//         <StatCard
//           iconBg="bg-blue-50"
//           icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
//           label="Total Settlement Amount" value="₹11.80 Cr" changePct="16.2%" changeDir="up" sub="vs last 30 days"
//         />
//         <StatCard
//           iconBg="bg-green-50"
//           icon={<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
//           label="Settlements Completed" value="458" changePct="12.8%" changeDir="up" sub="vs last 30 days"
//         />
//         <StatCard
//           iconBg="bg-orange-50"
//           icon={<svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//           label="Settlements Pending" value="72" changePct="8.6%" changeDir="down" sub="vs last 30 days"
//         />
//         <StatCard
//           iconBg="bg-purple-50"
//           icon={<svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//           label="Pending Amount" value="₹1.20 Cr" changePct="6.3%" changeDir="down" sub="vs last 30 days"
//         />
//         <StatCard
//           iconBg="bg-teal-50"
//           icon={<svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
//           label="Settlement Success Rate" value="98.35%" changePct="0.85%" changeDir="up" sub="vs last 30 days"
//         />
//       </div>

//       {/* ── Middle Row: Chart + Donut + Quick Info ── */}
//       <div className="grid grid-cols-12 gap-4 mb-4">

//         {/* Settlement Amount Trend */}
//         <div className="col-span-5 bg-white rounded-xl border border-gray-100 p-4">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-gray-800">Settlement Amount Trend</h2>
//             <div className="flex gap-1">
//               {["7D", "30D", "90D"].map(r => (
//                 <button
//                   key={r}
//                   onClick={() => setTrendRange(r)}
//                   className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
//                     trendRange === r
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-500 hover:bg-gray-100"
//                   }`}
//                 >
//                   {r}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <p className="text-[11px] text-gray-400 mb-2">Amount (₹)</p>
//           <ResponsiveContainer width="100%" height={200}>
//             <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
//               <defs>
//                 <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false}
//                 tickFormatter={v => `${v} Cr`} domain={[0, 2.5]} ticks={[0, 0.5, 1, 1.5, 2, 2.5]} />
//               <Tooltip content={<CustomTooltip />} />
//               <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2}
//                 fill="url(#areaGrad)" dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
//                 activeDot={{ r: 5, fill: "#2563eb" }} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Settlement Status Donut */}
//         <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
//           <h2 className="text-sm font-semibold text-gray-800 mb-3">Settlement Status</h2>
//           <div className="flex items-center gap-4">
//             <div className="relative flex-shrink-0">
//               <PieChart width={160} height={160}>
//                 <Pie data={pieData} cx={75} cy={75} innerRadius={52} outerRadius={72}
//                   dataKey="value" strokeWidth={2} stroke="#fff">
//                   {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
//                 </Pie>
//               </PieChart>
//               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                 <span className="text-2xl font-bold text-gray-900">{total}</span>
//                 <span className="text-[11px] text-gray-400">Total</span>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2">
//               {pieData.map(d => (
//                 <div key={d.name} className="flex items-center gap-2">
//                   <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
//                   <span className="text-xs text-gray-600 w-20">{d.name}</span>
//                   <span className="text-xs font-medium text-gray-800">
//                     {d.value} ({((d.value/total)*100).toFixed(2)}%)
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Quick Info Cards */}
//         <div className="col-span-3 flex flex-col gap-3">
//           <QuickCard
//             iconBg="bg-green-50"
//             icon={<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>}
//             label="Next Settlement Date"
//             value="15 May 2025"
//           />
//           <QuickCard
//             iconBg="bg-blue-50"
//             icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//             label="Next Settlement Amount"
//             value="₹2.65 Cr"
//             valueColor="text-blue-600"
//           />
//           <QuickCard
//             iconBg="bg-purple-50"
//             icon={<svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
//             label="Merchants in Settlement"
//             value="248"
//           />
//           <QuickCard
//             iconBg="bg-orange-50"
//             icon={<svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//             label="Average Settlement Time"
//             value="2.4 Hours"
//           />
//         </div>
//       </div>

//       {/* ── Bottom Row: Overview + Upcoming + API ── */}
//       <div className="grid grid-cols-12 gap-4">

//         {/* Settlement Overview */}
//         <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
//           <h2 className="text-sm font-semibold text-gray-800 mb-3">Settlement Overview</h2>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-100">
//                 <th className="text-left pb-2 text-xs font-semibold text-black">Status</th>
//                 <th className="text-right pb-2 text-xs font-semibold text-black">Settlements</th>
//                 <th className="text-right pb-2 text-xs font-semibold text-black">Amount</th>
//                 <th className="text-right pb-2 text-xs font-semibold text-black">%</th>
//               </tr>
//             </thead>
//             <tbody>
//               {overviewRows.map(r => (
//                 <tr key={r.status} className="border-b border-gray-50 last:border-0">
//                   <td className="py-2.5">
//                     <div className="flex items-center gap-2">
//                       <span className={`w-2 h-2 rounded-full ${r.dot}`} />
//                       <span className="text-xs text-gray-700 font-medium">{r.status}</span>
//                     </div>
//                   </td>
//                   <td className="py-2.5 text-right text-xs text-gray-800 font-medium">{r.count}</td>
//                   <td className="py-2.5 text-right text-xs text-gray-800 font-medium">{r.amount}</td>
//                   <td className="py-2.5 text-right text-xs text-gray-500 font-medium">{r.pct}</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr className="border-t border-gray-200">
//                 <td className="pt-2.5 text-xs font-bold text-gray-900">Total</td>
//                 <td className="pt-2.5 text-right text-xs font-bold text-gray-900">536</td>
//                 <td className="pt-2.5 text-right text-xs font-bold text-gray-900">₹11.80 Cr</td>
//                 <td className="pt-2.5 text-right text-xs font-bold text-gray-900">100%</td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         {/* Upcoming Settlements */}
//         <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
//           <h2 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Settlements</h2>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-100">
//                 {["Date", "Merchants", "Amount", "Status"].map(h => (
//                   <th key={h} className="text-left pb-2 text-xs font-semibold text-black">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {upcomingRows.map((r, i) => (
//                 <tr key={i} className="border-b border-gray-50 last:border-0">
//                   <td className="py-2.5 text-xs text-gray-700 font-medium">{r.date}</td>
//                   <td className="py-2.5 text-xs text-gray-700 font-medium">{r.merchants}</td>
//                   <td className="py-2.5 text-xs font-medium text-gray-800">{r.amount}</td>
//                   <td className="py-2.5">
//                     <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
//                       {r.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline">
//             View All Upcoming Settlements
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </button>
//         </div>

//         {/* Settlement Amount by API */}
//         <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-gray-800">Settlement Amount by API</h2>
//             <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
//           </div>
//           <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2 px-0">
//             <span>API</span>
//             <div className="flex gap-8">
//               <span>Amount</span>
//               <span>%</span>
//             </div>
//           </div>
//           <div className="space-y-2.5">
//             {apiRows.map(r => (
//               <div key={r.name}>
//                 <div className="flex items-center justify-between mb-1">
//                   <div className="flex items-center gap-2">
//                     <span className={`w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center flex-shrink-0 ${r.abbBg}`}>
//                       {r.abbr}
//                     </span>
//                     <span className="text-xs text-gray-800 font-medium">{r.name}</span>
//                   </div>
//                   <div className="flex gap-6 text-right">
//                     <span className="text-xs font-medium text-gray-800 w-16 text-right">{r.amount}</span>
//                     <span className="text-xs text-gray-500 font-medium w-10 text-right">{r.pct}</span>
//                   </div>
//                 </div>
//                 <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div className={`h-full ${r.color} rounded-full ${r.bar}`} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
//             <span className="text-xs font-bold text-gray-900">Total</span>
//             <div className="flex gap-6 text-right">
//               <span className="text-xs font-bold text-gray-900 w-16 text-right">₹11.80 Cr</span>
//               <span className="text-xs font-bold text-gray-900 w-10 text-right">100%</span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import DateRangePicker from "../../components/DatePicker";

// ── Data ──────────────────────────────────────────────────────────────────────
const trendData = [
  { date: "8 May", amount: 0.9 },
  { date: "9 May", amount: 1.35 },
  { date: "10 May", amount: 1.95 },
  { date: "11 May", amount: 2.0 },
  { date: "12 May", amount: 2.35 },
  { date: "13 May", amount: 2.1 },
  { date: "14 May", amount: 0.8 },
];

const pieData = [
  { name: "Completed", value: 458, color: "#16a34a" },
  { name: "Pending", value: 72, color: "#f97316" },
  { name: "Failed", value: 5, color: "#dc2626" },
  { name: "Cancelled", value: 1, color: "#9ca3af" },
];

const overviewRows = [
  { status: "Completed", dot: "bg-green-500", count: 458, amount: "₹10.60 Cr", pct: "86.42%" },
  { status: "Pending", dot: "bg-orange-400", count: 72, amount: "₹1.20 Cr", pct: "13.58%" },
  { status: "Failed", dot: "bg-red-500", count: 5, amount: "₹18.90 L", pct: "0.94%" },
  { status: "Cancelled", dot: "bg-gray-400", count: 1, amount: "₹2.30 L", pct: "0.06%" },
];

const upcomingRows = [
  { date: "15 May 2025", merchants: 248, amount: "₹2.65 Cr", status: "Scheduled" },
  { date: "16 May 2025", merchants: 210, amount: "₹1.85 Cr", status: "Scheduled" },
  { date: "17 May 2025", merchants: 195, amount: "₹1.40 Cr", status: "Scheduled" },
  { date: "18 May 2025", merchants: 170, amount: "₹98.50 L", status: "Scheduled" },
];

const apiRows = [
  { name: "RazorpayX", color: "bg-blue-600", bar: "w-[90%]", amount: "₹5.25 Cr", pct: "44.49%", abbr: "R", abbBg: "bg-blue-100 text-blue-700" },
  { name: "Cashfree", color: "bg-blue-500", bar: "w-[55%]", amount: "₹3.10 Cr", pct: "26.27%", abbr: "CF", abbBg: "bg-green-100 text-green-700" },
  { name: "PhonePe Payouts", color: "bg-purple-500", bar: "w-[32%]", amount: "₹1.85 Cr", pct: "15.68%", abbr: "P", abbBg: "bg-purple-100 text-purple-700" },
  { name: "Paytm Payouts", color: "bg-blue-400", bar: "w-[18%]", amount: "₹1.05 Cr", pct: "8.90%", abbr: "PT", abbBg: "bg-blue-100 text-blue-700" },
  { name: "Amazon Pay", color: "bg-orange-400", bar: "w-[9%]", amount: "₹0.55 Cr", pct: "4.66%", abbr: "A", abbBg: "bg-orange-100 text-orange-700" },
];

// ── Custom Tooltip for Area Chart ─────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs">
      <p className="text-gray-500 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-900">₹{payload[0].value} Cr</p>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ iconBg, icon, label, value, changePct, changeDir, sub }) {
  const up = changeDir === "up";
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-2.5 sm:p-4 flex items-center gap-2 sm:gap-4">
      <div className={`w-8 h-8 sm:w-12 sm:h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] sm:text-xs text-black mb-0.5 font-medium truncate">{label}</p>
        <p className="text-sm sm:text-xl font-bold text-gray-900 leading-tight truncate">{value}</p>
        <p className={`text-[9px] sm:text-xs font-medium mt-0.5 ${up ? "text-green-600" : "text-red-500"}`}>
          {up ? "↑" : "↓"} {changePct}
          <span className="text-gray-400 font-normal ml-0.5 sm:ml-1">{sub}</span>
        </p>
      </div>
    </div>
  );
}

// ── Quick Info Card (right column) ───────────────────────────────────────────
function QuickCard({ iconBg, icon, label, value, valueColor = "text-gray-900" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-2.5 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
      <div className={`w-7 h-7 sm:w-9 sm:h-9 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] sm:text-[11px] text-black font-medium leading-none mb-0.5 truncate">{label}</p>
        <p className={`text-xs sm:text-base font-bold ${valueColor} truncate`}>{value}</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SettlementReport() {
  const [trendRange, setTrendRange] = useState("7D");
  const [dateRange, setDateRange] = useState(null);
  const total = pieData.reduce((s, d) => s + d.value, 0);

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      console.log('Date Range Selected:', dateData);
    } else {
      console.log('Date range cleared');
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-0">

      {/* ── Page Header ── */}
      <div className="mb-3 sm:mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Settlement Reports</h1>
        <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5">
          Reports <span className="mx-1">›</span>
          <span className="text-gray-600">Settlement Reports</span>
        </p>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <DateRangePicker
          onDateChange={handleDateChange}
          placeholder="14 May, 2025 - 14 May, 2025"
        />

        {/* Dropdowns */}
        {["All Merchants", "All APIs", "All Statuses"].map(f => (
          <div key={f} className="relative w-full sm:w-auto">
            <select className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer hover:border-gray-300">
              <option>{f}</option>
            </select>
            <svg className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ))}

        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg transition-colors">
          Apply Filter
        </button>

        <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[11px] sm:text-xs font-medium text-gray-700 rounded-lg transition-colors">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Report
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-5">
        <StatCard
          iconBg="bg-blue-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
          label="Total Settlement Amount" value="₹11.80 Cr" changePct="16.2%" changeDir="up" sub="vs last 30 days"
        />
        <StatCard
          iconBg="bg-green-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          label="Settlements Completed" value="458" changePct="12.8%" changeDir="up" sub="vs last 30 days"
        />
        <StatCard
          iconBg="bg-orange-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Settlements Pending" value="72" changePct="8.6%" changeDir="down" sub="vs last 30 days"
        />
        <StatCard
          iconBg="bg-purple-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Pending Amount" value="₹1.20 Cr" changePct="6.3%" changeDir="down" sub="vs last 30 days"
        />
        <StatCard
          iconBg="bg-teal-50"
          icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          label="Settlement Success Rate" value="98.35%" changePct="0.85%" changeDir="up" sub="vs last 30 days"
        />
      </div>

      {/* ── Middle Row: Chart + Donut + Quick Info ── */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">

        {/* Settlement Amount Trend */}
        <div className="flex-1 lg:flex-[5] bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Settlement Amount Trend</h2>
            <div className="flex gap-1">
              {["7D", "30D", "90D"].map(r => (
                <button
                  key={r}
                  onClick={() => setTrendRange(r)}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-lg transition-colors ${trendRange === r
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-400 mb-1 sm:mb-2">Amount (₹)</p>
          <div className="h-[180px] sm:h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${v} Cr`} domain={[0, 2.5]} ticks={[0, 0.5, 1, 1.5, 2, 2.5]} width={30} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2}
                  fill="url(#areaGrad)" dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
                  activeDot={{ r: 4, fill: "#2563eb" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Settlement Status Donut */}
        <div className="flex-1 lg:flex-[4] bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Settlement Status</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="relative flex-shrink-0">
              <div className="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65}
                      dataKey="value" strokeWidth={2} stroke="#fff">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg sm:text-2xl font-bold text-gray-900">{total}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400">Total</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center justify-between sm:justify-start gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-[10px] sm:text-xs text-gray-600 w-16 sm:w-20">{d.name}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-800">
                    {d.value} ({((d.value / total) * 100).toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="flex-1 lg:flex-[3] flex flex-col gap-2 sm:gap-3">
          <QuickCard
            iconBg="bg-green-50"
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>}
            label="Next Settlement Date"
            value="15 May 2025"
          />
          <QuickCard
            iconBg="bg-blue-50"
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Next Settlement Amount"
            value="₹2.65 Cr"
            valueColor="text-blue-600"
          />
          <QuickCard
            iconBg="bg-purple-50"
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            label="Merchants in Settlement"
            value="248"
          />
          <QuickCard
            iconBg="bg-orange-50"
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Average Settlement Time"
            value="2.4 Hours"
          />
        </div>
      </div>

      {/* ── Bottom Row: Overview + Upcoming + API ── */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">

        {/* Settlement Overview */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Settlement Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-2 text-[10px] sm:text-xs font-semibold text-black">Status</th>
                  <th className="text-right pb-2 text-[10px] sm:text-xs font-semibold text-black">Settlements</th>
                  <th className="text-right pb-2 text-[10px] sm:text-xs font-semibold text-black">Amount</th>
                  <th className="text-right pb-2 text-[10px] sm:text-xs font-semibold text-black">%</th>
                </tr>
              </thead>
              <tbody>
                {overviewRows.map(r => (
                  <tr key={r.status} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 sm:py-2.5">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${r.dot}`} />
                        <span className="text-[10px] sm:text-xs text-gray-700 font-medium">{r.status}</span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-2.5 text-right text-[10px] sm:text-xs text-gray-800 font-medium">{r.count}</td>
                    <td className="py-2 sm:py-2.5 text-right text-[10px] sm:text-xs text-gray-800 font-medium">{r.amount}</td>
                    <td className="py-2 sm:py-2.5 text-right text-[10px] sm:text-xs text-gray-500 font-medium">{r.pct}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200">
                  <td className="pt-2 sm:pt-2.5 text-[10px] sm:text-xs font-bold text-gray-900">Total</td>
                  <td className="pt-2 sm:pt-2.5 text-right text-[10px] sm:text-xs font-bold text-gray-900">536</td>
                  <td className="pt-2 sm:pt-2.5 text-right text-[10px] sm:text-xs font-bold text-gray-900">₹11.80 Cr</td>
                  <td className="pt-2 sm:pt-2.5 text-right text-[10px] sm:text-xs font-bold text-gray-900">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Upcoming Settlements */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Upcoming Settlements</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Date", "Merchants", "Amount", "Status"].map(h => (
                    <th key={h} className="text-left pb-2 text-[10px] sm:text-xs font-semibold text-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcomingRows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 sm:py-2.5 text-[10px] sm:text-xs text-gray-700 font-medium">{r.date}</td>
                    <td className="py-2 sm:py-2.5 text-[10px] sm:text-xs text-gray-700 font-medium">{r.merchants}</td>
                    <td className="py-2 sm:py-2.5 text-[10px] sm:text-xs font-medium text-gray-800">{r.amount}</td>
                    <td className="py-2 sm:py-2.5">
                      <span className="px-1.5 sm:px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] sm:text-[10px] font-semibold rounded-full">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-2 sm:mt-3 flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 font-medium hover:underline">
            View All Upcoming Settlements
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Settlement Amount by API */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Settlement Amount by API</h2>
            <button className="text-[11px] sm:text-xs text-blue-600 font-medium hover:underline text-left">View All</button>
          </div>
          <div className="space-y-2 sm:space-y-2.5">
            {apiRows.map(r => (
              <div key={r.name}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-0.5 sm:mb-1 gap-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded text-[8px] sm:text-[9px] font-bold flex items-center justify-center flex-shrink-0 ${r.abbBg}`}>
                      {r.abbr}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-800 font-medium truncate max-w-[100px] sm:max-w-none">{r.name}</span>
                  </div>
                  <div className="flex gap-3 sm:gap-6 text-right">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-800 w-14 sm:w-16 text-right">{r.amount}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium w-8 sm:w-10 text-right">{r.pct}</span>
                  </div>
                </div>
                <div className="h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full ${r.bar}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-gray-100 gap-1">
            <span className="text-[10px] sm:text-xs font-bold text-gray-900">Total</span>
            <div className="flex gap-3 sm:gap-6 text-right">
              <span className="text-[10px] sm:text-xs font-bold text-gray-900 w-14 sm:w-16 text-right">₹11.80 Cr</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-900 w-8 sm:w-10 text-right">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
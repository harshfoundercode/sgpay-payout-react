// // import { useState } from "react";
// // import {
// //     BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
// //     PieChart, Pie, Cell, LineChart, Line,
// // } from "recharts";
// // import {
// //     Users, Wallet, CheckCircle, TrendingUp, XCircle,
// //     IndianRupee, Info, ChevronDown, Download, Calendar,
// //     Trophy, BarChart2, UserPlus, ArrowRight, SmilePlus,
// //     Meh, Frown,
// // } from "lucide-react";
// // import DateRangePicker from "../../components/DatePicker";


// // // ─── DATA ─────────────────────────────────────────────────────────────────────

// // const statCards = [
// //     {
// //         label: "Total Merchants",
// //         value: "1,025",
// //         change: "↗ 8",
// //         sub: "vs last 30 days",
// //         up: true,
// //         Icon: Users,
// //         iconBg: "bg-purple-100",
// //         iconColor: "text-purple-600",
// //     },
// //     {
// //         label: "Total Volume",
// //         value: "₹12.54 Cr",
// //         change: "↗ 15.4%",
// //         sub: "vs last 30 days",
// //         up: true,
// //         Icon: Wallet,
// //         iconBg: "bg-blue-100",
// //         iconColor: "text-blue-600",
// //     },
// //     {
// //         label: "Total Transactions",
// //         value: "25,842",
// //         change: "↗ 12.5%",
// //         sub: "vs last 30 days",
// //         up: true,
// //         Icon: CheckCircle,
// //         iconBg: "bg-green-100",
// //         iconColor: "text-green-600",
// //     },
// //     {
// //         label: "Avg Success Rate",
// //         value: "98.42%",
// //         change: "↗ 0.68%",
// //         sub: "vs last 30 days",
// //         up: true,
// //         Icon: TrendingUp,
// //         iconBg: "bg-orange-100",
// //         iconColor: "text-orange-500",
// //     },
// //     {
// //         label: "Failed Transactions",
// //         value: "412",
// //         change: "↘ 8.7%",
// //         sub: "vs last 30 days",
// //         up: false,
// //         Icon: XCircle,
// //         iconBg: "bg-red-100",
// //         iconColor: "text-red-500",
// //     },
// //     {
// //         label: "Total Revenue",
// //         value: "₹12.35 Cr",
// //         change: "↗ 16.2%",
// //         sub: "vs last 30 days",
// //         up: true,
// //         Icon: IndianRupee,
// //         iconBg: "bg-teal-100",
// //         iconColor: "text-teal-600",
// //     },
// // ];

// // const volumeData = [
// //     { name: "ABC\nPvt Ltd", vol: 235 },
// //     { name: "XYZ\nRetailers", vol: 185 },
// //     { name: "Global\nSolutions", vol: 125 },
// //     { name: "Quick\nPay", vol: 105 },
// //     { name: "Prime\nBusiness", vol: 85 },
// //     { name: "Secure\nTech", vol: 65 },
// //     { name: "PayMate\nIndia", vol: 52 },
// //     { name: "Digital\nStore", vol: 45 },
// //     { name: "First-\nChoice", vol: 38 },
// //     { name: "Retail\nHub", vol: 28 },
// // ];

// // const rateData = [
// //     { name: "ABC Pvt Ltd", rate: 99.12 },
// //     { name: "XYZ Retailers", rate: 98.73 },
// //     { name: "Global Solutions", rate: 98.21 },
// //     { name: "Quick Pay Services", rate: 97.89 },
// //     { name: "Prime Business", rate: 97.45 },
// //     { name: "Secure Tech", rate: 97.12 },
// //     { name: "PayMate India", rate: 96.78 },
// //     { name: "Digital Store", rate: 96.50 },
// //     { name: "FirstChoice", rate: 95.92 },
// //     { name: "Retail Hub", rate: 95.20 },
// // ];

// // const donutData = [
// //     { name: "ABC Pvt Ltd", value: 5230, pct: "20.2%", color: "#2563eb" },
// //     { name: "XYZ Retailers", value: 4120, pct: "15.9%", color: "#ef4444" },
// //     { name: "Global Solutions", value: 3250, pct: "12.6%", color: "#f59e0b" },
// //     { name: "Quick Pay Services", value: 2850, pct: "11.0%", color: "#10b981" },
// //     { name: "Prime Business", value: 2150, pct: "8.3%", color: "#8b5cf6" },
// //     { name: "Others", value: 8242, pct: "31.9%", color: "#d1d5db" },
// // ];

// // const topMerchants = [
// //     { name: "ABC Pvt Ltd", rev: "₹2.35 Cr", growth: "↗ 18.6%" },
// //     { name: "XYZ Retailers", rev: "₹1.85 Cr", growth: "↗ 14.2%" },
// //     { name: "Global Solutions", rev: "₹1.25 Cr", growth: "↗ 12.8%" },
// //     { name: "Quick Pay Services", rev: "₹1.05 Cr", growth: "↗ 11.5%" },
// //     { name: "Prime Business", rev: "₹85.40 L", growth: "↗ 10.2%" },
// // ];

// // const sparkHigh = [40, 55, 48, 62, 58, 70, 65, 80, 75, 90].map((v, i) => ({ i, v }));
// // const sparkMid = [60, 58, 62, 60, 65, 62, 64, 63, 66, 64].map((v, i) => ({ i, v }));
// // const sparkLow = [80, 72, 75, 68, 70, 62, 58, 54, 50, 46].map((v, i) => ({ i, v }));

// // // ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// // function Card({ children, className = "" }) {
// //     return (
// //         <div className={`bg-white rounded-xl border border-gray-100 p-4 ${className}`}>
// //             {children}
// //         </div>
// //     );
// // }

// // function SectionHeader({ children, dropdown = "Top 10 Merchants" }) {
// //     return (
// //         <div className="flex items-center justify-between mb-3">
// //             <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
// //                 {children}
// //                 <Info size={13} className="text-gray-300" />
// //             </p>
// //             <button className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-500 bg-white hover:bg-gray-50">
// //                 {dropdown} <ChevronDown size={11} />
// //             </button>
// //         </div>
// //     );
// // }

// // function DonutCenter({ cx, cy }) {
// //     return (
// //         <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
// //             <tspan x={cx} dy="-8" fontSize="15" fontWeight="600" fill="#111827">25,842</tspan>
// //             <tspan x={cx} dy="18" fontSize="10" fill="#9ca3af">Total</tspan>
// //         </text>
// //     );
// // }

// // const CustomXAxisTick = ({ x, y, payload }) => {
// //     const words = payload.value.split(" ");

// //     return (
// //         <g transform={`translate(${x},${y})`}>
// //             <text
// //                 x={0}
// //                 y={0}
// //                 dy={12}
// //                 textAnchor="middle"
// //                 fontSize={8}
// //                 fill="#6b7280"
// //             >
// //                 {words.slice(0, 2).map((word, index) => (
// //                     <tspan key={index} x="0" dy={index === 0 ? 0 : 10}>
// //                         {word}
// //                     </tspan>
// //                 ))}
// //             </text>
// //         </g>
// //     );
// // };

// // // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

// // export default function MerchantReport() {
// //     const [dateRange, setDateRange] = useState(null);

// //     const handleDateChange = (dateData) => {
// //         if (dateData) {
// //             setDateRange(dateData);
// //             console.log('Date Range Selected:', {
// //                 startDate: dateData.startDate,
// //                 endDate: dateData.endDate,
// //                 startFormatted: dateData.startFormatted,
// //                 endFormatted: dateData.endFormatted,
// //                 dateRange: dateData.dateRange
// //             });
// //             // Fetch data for selected date range here
// //             // fetchDashboardData(dateData.startDate, dateData.endDate);
// //         } else {
// //             console.log('Date range cleared');
// //             // Handle clearing date range
// //         }
// //     };

// //     return (
// //         <div className="text-sm">

// //             {/* ── PAGE HEADER ── */}
// //             <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
// //                 <div>
// //                     <h1 className="text-2xl font-bold text-gray-900">Merchant Report</h1>
// //                     <p className="text-xs text-gray-400 mt-1">Reports &rsaquo; Merchant Report</p>
// //                 </div>
// //                 <div className="flex items-center gap-2 flex-wrap">
// //                     <DateRangePicker 
// //                         onDateChange={handleDateChange}
// //                         placeholder="14 May, 2025 - 14 May, 2025"
// //                     />
// //                     <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
// //                         All Merchants <ChevronDown size={11} />
// //                     </button>
// //                     <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
// //                         All Payout APIs <ChevronDown size={11} />
// //                     </button>
// //                     <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-xs font-semibold transition-colors">
// //                         Apply Filter
// //                     </button>
// //                     <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
// //                         <Download size={13} /> Export Report <ChevronDown size={11} />
// //                     </button>
// //                 </div>
// //             </div>

// //             {/* ── STAT CARDS ── */}
// //             <div className="grid grid-cols-6 gap-3 mb-4">
// //                 {statCards.map(({ label, value, change, sub, up, Icon, iconBg, iconColor }) => (
// //                     <div key={label} className="bg-white rounded-xl border border-gray-100 p-3.5 flex items-start gap-3">
// //                         <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
// //                             <Icon size={17} className={iconColor} />
// //                         </div>
// //                         <div>
// //                             <p className="text-[11px] text-gray-400 font-medium leading-tight">{label}</p>
// //                             <p className="text-lg font-bold text-gray-900 mt-0.5 leading-tight">{value}</p>
// //                             <p className={`text-[11px] mt-1 font-medium ${up ? "text-green-600" : "text-red-500"}`}>
// //                                 {change}
// //                                 <span className="text-gray-400 font-normal block text-[10px]">{sub}</span>
// //                             </p>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* ── CHARTS ROW ── */}
// //             <div className="grid grid-cols-3 gap-3 mb-3">

// //                 {/* Volume by Merchant — Bar Chart */}
// //                 <Card>
// //                     <SectionHeader>Volume by Merchant</SectionHeader>
// //                     <p className="text-[10px] text-gray-400 mb-1">₹ (in Lakhs)</p>
// //                     <ResponsiveContainer width="100%" height={180}>
// //                         <BarChart
// //                             data={volumeData}
// //                             margin={{ top: 15, right: 5, left: -20, bottom: 20 }}
// //                         >
// //                             <XAxis
// //                                 dataKey="name"
// //                                 interval={0}
// //                                 tick={{ fontSize: 8, fill: "#6b7280" }}
// //                                 axisLine={false}
// //                                 tickLine={false}
// //                                 height={40}
// //                                 tickFormatter={(value) =>
// //                                     value.length > 10 ? value.substring(0, 10) + "..." : value
// //                                 }
// //                             />

// //                             <YAxis
// //                                 tick={{ fontSize: 8, fill: "#6b7280" }}
// //                                 axisLine={false}
// //                                 tickLine={false}
// //                                 tickFormatter={(v) => `${v}`}
// //                                 width={25}
// //                             />

// //                             <Tooltip
// //                                 formatter={(v) => [`${v}L`, "Volume"]}
// //                                 contentStyle={{
// //                                     fontSize: 11,
// //                                     borderRadius: 8,
// //                                 }}
// //                             />

// //                             <Bar
// //                                 dataKey="vol"
// //                                 fill="#2563eb"
// //                                 radius={[4, 4, 0, 0]}
// //                                 barSize={18}
// //                             >
                               
                                
// //                             </Bar>
// //                         </BarChart>
// //                     </ResponsiveContainer>
// //                 </Card>

// //                 {/* Success Rate by Merchant */}
// //                 <Card>
// //                     <SectionHeader>Success Rate by Merchant</SectionHeader>
// //                     <div className="space-y-2">
// //                         {rateData.map(({ name, rate }) => {
// //                             const pct = ((rate - 94) / 6) * 100;
// //                             return (
// //                                 <div key={name} className="flex items-center gap-2">
// //                                     <span className="text-xs text-gray-700 font-medium w-27 shrink-0">{name}</span>
// //                                     <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
// //                                         <div
// //                                             className="h-full bg-green-500 rounded-full"
// //                                             style={{ width: `${pct}%` }}
// //                                         />
// //                                     </div>
// //                                     <span className="text-xs text-gray-500 w-10 font-medium text-right shrink-0">{rate}%</span>
// //                                 </div>
// //                             );
// //                         })}
// //                     </div>
// //                 </Card>

// //                 {/* Transactions by Merchant — Donut */}
// //                 <Card>
// //                     <SectionHeader>Transactions by Merchant</SectionHeader>
// //                     <div className="flex items-center gap-3">
// //                         <div className="flex-shrink-0">
// //                             <PieChart width={130} height={130}>
// //                                 <Pie
// //                                     data={donutData}
// //                                     cx={60}
// //                                     cy={60}
// //                                     innerRadius={42}
// //                                     outerRadius={62}
// //                                     dataKey="value"
// //                                     strokeWidth={2}
// //                                     stroke="#fff"
// //                                 >
// //                                     {donutData.map((entry, i) => (
// //                                         <Cell key={i} fill={entry.color} />
// //                                     ))}
// //                                 </Pie>
// //                                 <DonutCenter cx={60} cy={60} />
// //                             </PieChart>
// //                         </div>
// //                         <div className="flex-1 space-y-1.5">
// //                             {donutData.map(({ name, value, pct, color }) => (
// //                                 <div key={name} className="flex items-center justify-between text-[11px]">
// //                                     <div className="flex items-center gap-1.5">
// //                                         <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
// //                                         <span className="text-gray-800 font-medium">{name}</span>
// //                                     </div>
// //                                     <span className="text-gray-400 ml-2 whitespace-nowrap font-medium">
// //                                         {value.toLocaleString()} ({pct})
// //                                     </span>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 </Card>
// //             </div>

// //             {/* ── BOTTOM ROW ── */}
// //             <div className="grid grid-cols-3 gap-3">

// //                 {/* Top Merchants by Revenue */}
// //                 <Card>
// //                     <div className="flex items-center gap-2.5 mb-3">
// //                         <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
// //                             <Trophy size={13} className="text-blue-600" />
// //                         </div>
// //                         <p className="text-sm font-semibold text-gray-800">Top Merchants by Revenue</p>
// //                     </div>
// //                     <table className="w-full text-xs">
// //                         <thead>
// //                             <tr className="border-b border-gray-100 text-gray-400">
// //                                 <th className="text-left pb-2 font-medium">Merchant</th>
// //                                 <th className="text-left pb-2 font-medium">Revenue (₹)</th>
// //                                 <th className="text-right pb-2 font-medium">Growth (vs last 30 days)</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {topMerchants.map(({ name, rev, growth }) => (
// //                                 <tr key={name} className="border-b border-gray-50 last:border-0">
// //                                     <td className="py-2 text-gray-700">{name}</td>
// //                                     <td className="py-2 font-semibold text-gray-900">{rev}</td>
// //                                     <td className="py-2 text-right font-medium text-green-600">{growth}</td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </Card>

// //                 {/* Merchant Performance Summary */}
// //                 <Card>
// //                     <div className="flex items-center gap-2.5 mb-3">
// //                         <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
// //                             <BarChart2 size={13} className="text-green-600" />
// //                         </div>
// //                         <p className="text-sm font-semibold text-gray-800">Merchant Performance Summary</p>
// //                     </div>

// //                     <div className="grid grid-cols-3 gap-2 mb-3">
// //                         {[
// //                             { Icon: SmilePlus, bg: "bg-green-50", ic: "text-green-600", num: 256, label: "High Performers", sub: "Success Rate > 98%", spark: sparkHigh, lineColor: "#16a34a" },
// //                             { Icon: Meh, bg: "bg-yellow-50", ic: "text-yellow-600", num: 512, label: "Average Performers", sub: "Success Rate 95 – 98%", spark: sparkMid, lineColor: "#ca8a04" },
// //                             { Icon: Frown, bg: "bg-red-50", ic: "text-red-500", num: 257, label: "Low Performers", sub: "Success Rate < 95%", spark: sparkLow, lineColor: "#dc2626" },
// //                         ].map(({ Icon, bg, ic, num, label, sub, spark, lineColor }) => (
// //                             <div key={label} className="border border-gray-100 rounded-lg p-2.5 text-center">
// //                                 <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-1 ${bg}`}>
// //                                     <Icon size={14} className={ic} />
// //                                 </div>
// //                                 <p className="text-xl font-bold text-gray-900 leading-tight">{num}</p>
// //                                 <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{label}</p>
// //                                 <p className="text-[9px] text-gray-400 leading-tight">{sub}</p>
// //                                 <div className="mt-2 h-10">
// //                                     <ResponsiveContainer width="100%" height={40}>
// //                                         <LineChart data={spark}>
// //                                             <Line
// //                                                 type="monotone"
// //                                                 dataKey="v"
// //                                                 stroke={lineColor}
// //                                                 strokeWidth={1.5}
// //                                                 dot={false}
// //                                             />
// //                                         </LineChart>
// //                                     </ResponsiveContainer>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </Card>

// //                 {/* Merchant Onboarding Summary */}
// //                 <Card>
// //                     <div className="flex items-center gap-2.5 mb-3">
// //                         <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
// //                             <UserPlus size={13} className="text-purple-600" />
// //                         </div>
// //                         <p className="text-sm font-semibold text-gray-800">Merchant Onboarding Summary</p>
// //                     </div>

// //                     {[
// //                         ["New Merchants (This Month)", "48"],
// //                         ["Active Merchants", "872"],
// //                         ["Inactive Merchants", "153"],
// //                         ["KYC Pending", "23"],
// //                     ].map(([label, val]) => (
// //                         <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
// //                             <span className="text-xs text-gray-500">{label}</span>
// //                             <span className="text-xs font-bold text-gray-900">{val}</span>
// //                         </div>
// //                     ))}

// //                     <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 mt-3 font-medium transition-colors">
// //                         View Merchant Onboarding Report <ArrowRight size={13} />
// //                     </button>
// //                 </Card>
// //             </div>
// //         </div>
// //     );
// // }
// import { useState } from "react";
// import {
//     BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//     PieChart, Pie, Cell, LineChart, Line,
// } from "recharts";
// import {
//     Users, Wallet, CheckCircle, TrendingUp, XCircle,
//     IndianRupee, Info, ChevronDown, Download, Calendar,
//     Trophy, BarChart2, UserPlus, ArrowRight, SmilePlus,
//     Meh, Frown,
// } from "lucide-react";
// import DateRangePicker from "../../components/DatePicker";


// // ─── DATA ─────────────────────────────────────────────────────────────────────

// const statCards = [
//     {
//         label: "Total Merchants",
//         value: "1,025",
//         change: "↗ 8",
//         sub: "vs last 30 days",
//         up: true,
//         Icon: Users,
//         iconBg: "bg-purple-100",
//         iconColor: "text-purple-600",
//     },
//     {
//         label: "Total Volume",
//         value: "₹12.54 Cr",
//         change: "↗ 15.4%",
//         sub: "vs last 30 days",
//         up: true,
//         Icon: Wallet,
//         iconBg: "bg-blue-100",
//         iconColor: "text-blue-600",
//     },
//     {
//         label: "Total Transactions",
//         value: "25,842",
//         change: "↗ 12.5%",
//         sub: "vs last 30 days",
//         up: true,
//         Icon: CheckCircle,
//         iconBg: "bg-green-100",
//         iconColor: "text-green-600",
//     },
//     {
//         label: "Avg Success Rate",
//         value: "98.42%",
//         change: "↗ 0.68%",
//         sub: "vs last 30 days",
//         up: true,
//         Icon: TrendingUp,
//         iconBg: "bg-orange-100",
//         iconColor: "text-orange-500",
//     },
//     {
//         label: "Failed Transactions",
//         value: "412",
//         change: "↘ 8.7%",
//         sub: "vs last 30 days",
//         up: false,
//         Icon: XCircle,
//         iconBg: "bg-red-100",
//         iconColor: "text-red-500",
//     },
//     {
//         label: "Total Revenue",
//         value: "₹12.35 Cr",
//         change: "↗ 16.2%",
//         sub: "vs last 30 days",
//         up: true,
//         Icon: IndianRupee,
//         iconBg: "bg-teal-100",
//         iconColor: "text-teal-600",
//     },
// ];

// const volumeData = [
//     { name: "ABC\nPvt Ltd", vol: 235 },
//     { name: "XYZ\nRetailers", vol: 185 },
//     { name: "Global\nSolutions", vol: 125 },
//     { name: "Quick\nPay", vol: 105 },
//     { name: "Prime\nBusiness", vol: 85 },
//     { name: "Secure\nTech", vol: 65 },
//     { name: "PayMate\nIndia", vol: 52 },
//     { name: "Digital\nStore", vol: 45 },
//     { name: "First-\nChoice", vol: 38 },
//     { name: "Retail\nHub", vol: 28 },
// ];

// const rateData = [
//     { name: "ABC Pvt Ltd", rate: 99.12 },
//     { name: "XYZ Retailers", rate: 98.73 },
//     { name: "Global Solutions", rate: 98.21 },
//     { name: "Quick Pay Services", rate: 97.89 },
//     { name: "Prime Business", rate: 97.45 },
//     { name: "Secure Tech", rate: 97.12 },
//     { name: "PayMate India", rate: 96.78 },
//     { name: "Digital Store", rate: 96.50 },
//     { name: "FirstChoice", rate: 95.92 },
//     { name: "Retail Hub", rate: 95.20 },
// ];

// const donutData = [
//     { name: "ABC Pvt Ltd", value: 5230, pct: "20.2%", color: "#2563eb" },
//     { name: "XYZ Retailers", value: 4120, pct: "15.9%", color: "#ef4444" },
//     { name: "Global Solutions", value: 3250, pct: "12.6%", color: "#f59e0b" },
//     { name: "Quick Pay Services", value: 2850, pct: "11.0%", color: "#10b981" },
//     { name: "Prime Business", value: 2150, pct: "8.3%", color: "#8b5cf6" },
//     { name: "Others", value: 8242, pct: "31.9%", color: "#d1d5db" },
// ];

// const topMerchants = [
//     { name: "ABC Pvt Ltd", rev: "₹2.35 Cr", growth: "↗ 18.6%" },
//     { name: "XYZ Retailers", rev: "₹1.85 Cr", growth: "↗ 14.2%" },
//     { name: "Global Solutions", rev: "₹1.25 Cr", growth: "↗ 12.8%" },
//     { name: "Quick Pay Services", rev: "₹1.05 Cr", growth: "↗ 11.5%" },
//     { name: "Prime Business", rev: "₹85.40 L", growth: "↗ 10.2%" },
// ];

// const sparkHigh = [40, 55, 48, 62, 58, 70, 65, 80, 75, 90].map((v, i) => ({ i, v }));
// const sparkMid = [60, 58, 62, 60, 65, 62, 64, 63, 66, 64].map((v, i) => ({ i, v }));
// const sparkLow = [80, 72, 75, 68, 70, 62, 58, 54, 50, 46].map((v, i) => ({ i, v }));

// // ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// function Card({ children, className = "" }) {
//     return (
//         <div className={`bg-white rounded-xl border border-gray-100 p-3 sm:p-4 ${className}`}>
//             {children}
//         </div>
//     );
// }

// function SectionHeader({ children, dropdown = "Top 10 Merchants" }) {
//     return (
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
//             <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5">
//                 {children}
//                 <Info size={12} sm:size={13} className="text-gray-300" />
//             </p>
//             <button className="flex items-center justify-center gap-1 text-[10px] sm:text-xs border border-gray-200 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-gray-500 bg-white hover:bg-gray-50">
//                 {dropdown} <ChevronDown size={10} sm:size={11} />
//             </button>
//         </div>
//     );
// }

// function DonutCenter({ cx, cy }) {
//     return (
//         <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
//             <tspan x={cx} dy="-8" fontSize="13" fontWeight="600" fill="#111827">25,842</tspan>
//             <tspan x={cx} dy="16" fontSize="9" fill="#9ca3af">Total</tspan>
//         </text>
//     );
// }

// const CustomXAxisTick = ({ x, y, payload }) => {
//     const words = payload.value.split(" ");

//     return (
//         <g transform={`translate(${x},${y})`}>
//             <text
//                 x={0}
//                 y={0}
//                 dy={12}
//                 textAnchor="middle"
//                 fontSize={7}
//                 fill="#6b7280"
//             >
//                 {words.slice(0, 2).map((word, index) => (
//                     <tspan key={index} x="0" dy={index === 0 ? 0 : 10}>
//                         {word}
//                     </tspan>
//                 ))}
//             </text>
//         </g>
//     );
// };

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

// export default function MerchantReport() {
//     const [dateRange, setDateRange] = useState(null);

//     const handleDateChange = (dateData) => {
//         if (dateData) {
//             setDateRange(dateData);
//             console.log('Date Range Selected:', dateData);
//         } else {
//             console.log('Date range cleared');
//         }
//     };

//     return (
//         <div className="text-sm p-3 sm:p-0">

//             {/* ── PAGE HEADER ── */}
//             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-5">
//                 <div>
//                     <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Merchant Report</h1>
//                     <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Reports › Merchant Report</p>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-2">
//                     <DateRangePicker 
//                         onDateChange={handleDateChange}
//                         placeholder="14 May, 2025 - 14 May, 2025"
//                     />
//                     <button className="flex items-center gap-1 sm:gap-2 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//                         All Merchants <ChevronDown size={10} sm:size={11} />
//                     </button>
//                     <button className="flex items-center gap-1 sm:gap-2 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//                         All APIs <ChevronDown size={10} sm:size={11} />
//                     </button>
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-colors">
//                         Apply
//                     </button>
//                     <button className="flex items-center gap-1 sm:gap-2 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50">
//                         <Download size={11} sm:size={13} /> Export
//                     </button>
//                 </div>
//             </div>

//             {/* ── STAT CARDS ── */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
//                 {statCards.map(({ label, value, change, sub, up, Icon, iconBg, iconColor }) => (
//                     <div key={label} className="bg-white rounded-xl border border-gray-100 p-2.5 sm:p-3.5 flex items-start gap-2 sm:gap-3">
//                         <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
//                             <Icon size={14} sm:size={17} className={iconColor} />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                             <p className="text-[9px] sm:text-[11px] text-gray-400 font-medium leading-tight">{label}</p>
//                             <p className="text-sm sm:text-lg font-bold text-gray-900 mt-0.5 leading-tight">{value}</p>
//                             <p className={`text-[10px] sm:text-[11px] mt-0.5 sm:mt-1 font-medium ${up ? "text-green-600" : "text-red-500"}`}>
//                                 {change}
//                                 <span className="text-gray-400 font-normal block text-[8px] sm:text-[10px]">{sub}</span>
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* ── CHARTS ROW ── */}
//             <div className="flex flex-col lg:flex-row gap-3 mb-3">

//                 {/* Volume by Merchant — Bar Chart */}
//                 <div className="flex-1">
//                     <Card>
//                         <SectionHeader>Volume by Merchant</SectionHeader>
//                         <p className="text-[9px] sm:text-[10px] text-gray-400 mb-1">₹ (in Lakhs)</p>
//                         <div className="h-[180px] w-full">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart
//                                     data={volumeData}
//                                     margin={{ top: 15, right: 5, left: -20, bottom: 20 }}
//                                 >
//                                     <XAxis
//                                         dataKey="name"
//                                         interval={0}
//                                         tick={{ fontSize: 7, fill: "#6b7280" }}
//                                         axisLine={false}
//                                         tickLine={false}
//                                         height={40}
//                                         tickFormatter={(value) =>
//                                             value.length > 10 ? value.substring(0, 10) + "..." : value
//                                         }
//                                     />
//                                     <YAxis
//                                         tick={{ fontSize: 7, fill: "#6b7280" }}
//                                         axisLine={false}
//                                         tickLine={false}
//                                         tickFormatter={(v) => `${v}`}
//                                         width={25}
//                                     />
//                                     <Tooltip
//                                         formatter={(v) => [`${v}L`, "Volume"]}
//                                         contentStyle={{ fontSize: 10, borderRadius: 8 }}
//                                     />
//                                     <Bar
//                                         dataKey="vol"
//                                         fill="#2563eb"
//                                         radius={[4, 4, 0, 0]}
//                                         barSize={14}
//                                     />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </Card>
//                 </div>

//                 {/* Success Rate by Merchant */}
//                 <div className="flex-1">
//                     <Card>
//                         <SectionHeader>Success Rate by Merchant</SectionHeader>
//                         <div className="space-y-1.5 sm:space-y-2">
//                             {rateData.map(({ name, rate }) => {
//                                 const pct = ((rate - 94) / 6) * 100;
//                                 return (
//                                     <div key={name} className="flex items-center gap-1.5 sm:gap-2">
//                                         <span className="text-[10px] sm:text-xs text-gray-700 font-medium w-24 sm:w-27 shrink-0 truncate">{name}</span>
//                                         <div className="flex-1 h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full bg-green-500 rounded-full"
//                                                 style={{ width: `${Math.min(pct, 100)}%` }}
//                                             />
//                                         </div>
//                                         <span className="text-[10px] sm:text-xs text-gray-500 w-8 sm:w-10 font-medium text-right shrink-0">{rate}%</span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </Card>
//                 </div>

//                 {/* Transactions by Merchant — Donut */}
//                 <div className="flex-1">
//                     <Card>
//                         <SectionHeader>Transactions by Merchant</SectionHeader>
//                         <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
//                             <div className="flex-shrink-0">
//                                 <div className="h-[110px] w-[110px] sm:h-[130px] sm:w-[130px]">
//                                     <ResponsiveContainer width="100%" height="100%">
//                                         <PieChart>
//                                             <Pie
//                                                 data={donutData}
//                                                 cx="50%"
//                                                 cy="50%"
//                                                 innerRadius={35}
//                                                 outerRadius={50}
//                                                 dataKey="value"
//                                                 strokeWidth={2}
//                                                 stroke="#fff"
//                                             >
//                                                 {donutData.map((entry, i) => (
//                                                     <Cell key={i} fill={entry.color} />
//                                                 ))}
//                                             </Pie>
//                                             <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
//                                                 <tspan x="50%" dy="-6" fontSize="11" fontWeight="600" fill="#111827">25,842</tspan>
//                                                 <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
//                                             </text>
//                                         </PieChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                             </div>
//                             <div className="flex-1 space-y-1 sm:space-y-1.5 w-full">
//                                 {donutData.map(({ name, value, pct, color }) => (
//                                     <div key={name} className="flex items-center justify-between text-[10px] sm:text-[11px]">
//                                         <div className="flex items-center gap-1 sm:gap-1.5">
//                                             <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ background: color }} />
//                                             <span className="text-gray-800 font-medium truncate max-w-[80px] sm:max-w-none">{name}</span>
//                                         </div>
//                                         <span className="text-gray-400 ml-1 sm:ml-2 font-medium text-[9px] sm:text-[11px]">
//                                             {value.toLocaleString()} ({pct})
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </Card>
//                 </div>
//             </div>

//             {/* ── BOTTOM ROW ── */}
//             <div className="flex flex-col lg:flex-row gap-3">

//                 {/* Top Merchants by Revenue */}
//                 <div className="flex-1">
//                     <Card>
//                         <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                             <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
//                                 <Trophy size={11} sm:size={13} className="text-blue-600" />
//                             </div>
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">Top Merchants by Revenue</p>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="w-full min-w-[400px] text-xs">
//                                 <thead>
//                                     <tr className="border-b border-gray-100 text-gray-400">
//                                         <th className="text-left pb-2 font-medium text-[10px] sm:text-xs">Merchant</th>
//                                         <th className="text-left pb-2 font-medium text-[10px] sm:text-xs">Revenue</th>
//                                         <th className="text-right pb-2 font-medium text-[10px] sm:text-xs">Growth</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {topMerchants.map(({ name, rev, growth }) => (
//                                         <tr key={name} className="border-b border-gray-50 last:border-0">
//                                             <td className="py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 truncate max-w-[100px] sm:max-w-none">{name}</td>
//                                             <td className="py-1.5 sm:py-2 font-semibold text-gray-900 text-[10px] sm:text-xs">{rev}</td>
//                                             <td className="py-1.5 sm:py-2 text-right font-medium text-green-600 text-[10px] sm:text-xs">{growth}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </Card>
//                 </div>

//                 {/* Merchant Performance Summary */}
//                 <div className="flex-1">
//                     <Card>
//                         <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                             <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
//                                 <BarChart2 size={11} sm:size={13} className="text-green-600" />
//                             </div>
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">Merchant Performance Summary</p>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 sm:mb-3">
//                             {[
//                                 { Icon: SmilePlus, bg: "bg-green-50", ic: "text-green-600", num: 256, label: "High Performers", sub: "Success Rate > 98%", spark: sparkHigh, lineColor: "#16a34a" },
//                                 { Icon: Meh, bg: "bg-yellow-50", ic: "text-yellow-600", num: 512, label: "Average Performers", sub: "Success Rate 95 – 98%", spark: sparkMid, lineColor: "#ca8a04" },
//                                 { Icon: Frown, bg: "bg-red-50", ic: "text-red-500", num: 257, label: "Low Performers", sub: "Success Rate < 95%", spark: sparkLow, lineColor: "#dc2626" },
//                             ].map(({ Icon, bg, ic, num, label, sub, spark, lineColor }) => (
//                                 <div key={label} className="border border-gray-100 rounded-lg p-2 text-center">
//                                     <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto mb-1 ${bg}`}>
//                                         <Icon size={12} sm:size={14} className={ic} />
//                                     </div>
//                                     <p className="text-base sm:text-xl font-bold text-gray-900 leading-tight">{num}</p>
//                                     <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 leading-tight">{label}</p>
//                                     <p className="text-[8px] sm:text-[9px] text-gray-400 leading-tight">{sub}</p>
//                                     <div className="mt-1 sm:mt-2 h-8 sm:h-10">
//                                         <ResponsiveContainer width="100%" height="100%">
//                                             <LineChart data={spark}>
//                                                 <Line
//                                                     type="monotone"
//                                                     dataKey="v"
//                                                     stroke={lineColor}
//                                                     strokeWidth={1.5}
//                                                     dot={false}
//                                                 />
//                                             </LineChart>
//                                         </ResponsiveContainer>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Card>
//                 </div>

//                 {/* Merchant Onboarding Summary */}
//                 <div className="flex-1">
//                     <Card>
//                         <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                             <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
//                                 <UserPlus size={11} sm:size={13} className="text-purple-600" />
//                             </div>
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">Onboarding Summary</p>
//                         </div>

//                         {[
//                             ["New Merchants (This Month)", "48"],
//                             ["Active Merchants", "872"],
//                             ["Inactive Merchants", "153"],
//                             ["KYC Pending", "23"],
//                         ].map(([label, val]) => (
//                             <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
//                                 <span className="text-[10px] sm:text-xs text-gray-500">{label}</span>
//                                 <span className="text-[11px] sm:text-xs font-bold text-gray-900">{val}</span>
//                             </div>
//                         ))}

//                         <button className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 hover:text-blue-800 mt-2 sm:mt-3 font-medium transition-colors">
//                             View Onboarding Report <ArrowRight size={11} sm:size={13} />
//                         </button>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }
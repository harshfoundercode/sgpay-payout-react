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
//   { label:"Total Payouts",         value:"25,842",    change:"↗ 12.5%", up:true,  sub:"vs last 30 days", Icon:Send,          iconBg:"bg-purple-100", iconColor:"text-purple-600" },
//   { label:"Total Payout Amount",   value:"₹12.54 Cr", change:"↗ 15.4%", up:true,  sub:"vs last 30 days", Icon:IndianRupee,    iconBg:"bg-blue-100",   iconColor:"text-blue-600" },
//   { label:"Successful Payouts",    value:"25,430",    change:"↗ 13.2%", up:true,  sub:"vs last 30 days", Icon:CheckCircle,   iconBg:"bg-green-100",  iconColor:"text-green-600" },
//   { label:"Failed Payouts",        value:"412",       change:"↘ 8.7%",  up:false, sub:"vs last 30 days", Icon:XCircle,       iconBg:"bg-red-100",    iconColor:"text-red-500" },
//   { label:"Pending Payouts",       value:"56",        change:"↘ 3.1%",  up:false, sub:"vs last 30 days", Icon:Clock,         iconBg:"bg-orange-100", iconColor:"text-orange-500" },
//   { label:"Success Rate",          value:"98.42%",    change:"↗ 0.68%", up:true,  sub:"vs last 30 days", Icon:TrendingUp,    iconBg:"bg-emerald-100",iconColor:"text-emerald-600" },
// ];

// const bottomStatCards = [
//   { label:"Average Payout Amount",      value:"₹4,853.32",  change:"↗ 4.2%",   up:true,  sub:"vs last 30 days", Icon:ArrowLeftRight, iconBg:"bg-purple-100", iconColor:"text-purple-600" },
//   { label:"Total Unique Beneficiaries", value:"18,732",     change:"↗ 8.1%",   up:true,  sub:"vs last 30 days", Icon:Users,          iconBg:"bg-blue-100",   iconColor:"text-blue-600" },
//   { label:"Total Charges",              value:"₹18.90 L",   change:"↗ 6.3%",   up:true,  sub:"vs last 30 days", Icon:Receipt,        iconBg:"bg-green-100",  iconColor:"text-green-600" },
//   { label:"Returned Amount",            value:"₹6.45 L",    change:"↘ 5.6%",   up:false, sub:"vs last 30 days", Icon:RefreshCw,      iconBg:"bg-orange-100", iconColor:"text-orange-500" },
//   { label:"Processing Time (Avg)",      value:"8.42 sec",   change:"↘ 1.2 sec",up:false, sub:"vs last 30 days", Icon:Timer,          iconBg:"bg-yellow-100", iconColor:"text-yellow-600" },
//   { label:"Payout Success Amount",      value:"₹12.35 Cr",  change:"↗ 15.6%",  up:true,  sub:"vs last 30 days", Icon:IndianRupee,    iconBg:"bg-emerald-100",iconColor:"text-emerald-600" },
// ];

// const trendData = [
//   { date:"8 May",  vol:2.2 },
//   { date:"9 May",  vol:3.8 },
//   { date:"10 May", vol:5.0 },
//   { date:"11 May", vol:7.8 },
//   { date:"12 May", vol:8.2 },
//   { date:"13 May", vol:7.5 },
//   { date:"14 May", vol:2.5 },
// ];

// const statusDonut = [
//   { name:"Successful", value:25430, pct:"98.42%", color:"#16a34a" },
//   { name:"Failed",     value:412,   pct:"1.58%",  color:"#ef4444" },
//   { name:"Pending",    value:56,    pct:"0.22%",  color:"#f59e0b" },
//   { name:"Returned",   value:32,    pct:"0.12%",  color:"#9ca3af" },
// ];

// const apiDonut = [
//   { name:"RazorpayX",     value:10425, pct:"40.32%", color:"#2563eb" },
//   { name:"Cashfree",      value:6842,  pct:"26.46%", color:"#16a34a" },
//   { name:"Paytm Payouts", value:4125,  pct:"15.94%", color:"#8b5cf6" },
//   { name:"PhonePe Payout",value:2856,  pct:"11.04%", color:"#f59e0b" },
//   { name:"Amazon Pay",    value:1594,  pct:"6.16%",  color:"#06b6d4" },
// ];

// const merchantTable = [
//   { name:"ABC Pvt Ltd",        payouts:"5,230", amount:"₹2.35 Cr", rate:"98.72%" },
//   { name:"XYZ Retailers",      payouts:"4,120", amount:"₹1.85 Cr", rate:"97.91%" },
//   { name:"Global Solutions",   payouts:"3,250", amount:"₹1.25 Cr", rate:"98.12%" },
//   { name:"Quick Pay Services", payouts:"2,850", amount:"₹1.05 Cr", rate:"97.80%" },
//   { name:"Prime Business",     payouts:"2,150", amount:"₹85.40 L", rate:"97.45%" },
// ];

// const failReasons = [
//   { name:"Invalid Account",      pct:32.0, count:132, color:"#ef4444" },
//   { name:"Insufficient Balance", pct:21.6, count:89,  color:"#f59e0b" },
//   { name:"Account Closed",       pct:18.4, count:76,  color:"#f97316" },
//   { name:"Bank Error",           pct:15.5, count:64,  color:"#2563eb" },
//   { name:"Other Reasons",        pct:12.5, count:51,  color:"#9ca3af" },
// ];

// const distribution = [
//   { range:"₹0 – ₹1,000",          pct:35.20, barW:88 },
//   { range:"₹1,001 – ₹10,000",     pct:32.40, barW:81 },
//   { range:"₹10,001 – ₹50,000",    pct:18.60, barW:46.5 },
//   { range:"₹50,001 – ₹1,00,000",  pct:8.90,  barW:22.25 },
//   { range:"Above ₹1,00,000",      pct:4.90,  barW:12.25 },
// ];

// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// function Card({ children, className = "" }) {
//   return (
//     <div className={`bg-white rounded-xl border border-gray-100  p-4 ${className}`}>
//       {children}
//     </div>
//   );
// }

// function StatCard({ label, value, change, up, sub, Icon, iconBg, iconColor }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-100 p-3.5 flex items-start gap-3">
//       <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
//         <Icon size={17} className={iconColor} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[10px] text-gray-800 font-medium leading-tight">{label}</p>
//         <p className="text-[17px] font-bold text-gray-900 mt-0.5 leading-tight">{value}</p>
//         <p className={`text-[10px] mt-1 font-medium ${up ? "text-green-600" : "text-red-500"}`}>
//           {change}
//           <span className="text-gray-400 font-normal block text-[9px]">{sub}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// function DonutCenter({ cx, cy, line1, line2 }) {
//   return (
//     <g>
//       <text x={cx} y={cy - 6} textAnchor="middle" fontSize={13} fontWeight={600} fill="#111827">{line1}</text>
//       <text x={cx} y={cy + 10} textAnchor="middle" fontSize={9} fill="#9ca3af">{line2}</text>
//     </g>
//   );
// }

// function LegendRow({ color, name, right }) {
//   return (
//     <div className="flex items-center justify-between mb-1.5 text-[11px]">
//       <div className="flex items-center gap-1.5">
//         <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
//         <span className="text-gray-800 font-medium">{name}</span>
//       </div>
//       <span className="text-gray-400 ml-2 font-medium whitespace-nowrap">{right}</span>
//     </div>
//   );
// }

// // ─── MAIN ─────────────────────────────────────────────────────────────────────

// export default function PayoutReport() {
//   const [activePeriod, setActivePeriod] = useState("7D");

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
//     <div className="min-h-screen text-sm">

//       {/* ── PAGE HEADER ── */}
//       <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Payout Report</h1>
//           <p className="text-xs text-gray-400 mt-1">Reports &rsaquo; Payout Report</p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           <DateRangePicker 
//                         onDateChange={handleDateChange}
//                         placeholder="14 May, 2025 - 14 May, 2025"
//                     />
//           <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
//             All Merchants <ChevronDown size={11} />
//           </button>
//           <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
//             All APIs <ChevronDown size={11} />
//           </button>
//           <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
//             All Status <ChevronDown size={11} />
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-xs font-semibold transition-colors">
//             Apply Filter
//           </button>
//           <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50">
//             <Download size={13} /> Export <ChevronDown size={11} />
//           </button>
//         </div>
//       </div>

//       {/* ── TOP 6 STATS ── */}
//       <div className="grid grid-cols-6 gap-3 mb-4">
//         {topStatCards.map(c => <StatCard key={c.label} {...c} />)}
//       </div>

//       {/* ── CHARTS ROW ── */}
//       <div className="grid grid-cols-3 gap-3 mb-3">

//         {/* Payout Volume Trend */}
//         <Card>
//           <div className="flex items-center justify-between mb-3">
//             <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
//               Payout Volume Trend <Info size={13} className="text-gray-300" />
//             </p>
//             <div className="flex items-center gap-1.5">
//               {["7D","30D","90D"].map(p => (
//                 <button
//                   key={p}
//                   onClick={() => setActivePeriod(p)}
//                   className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors
//                     ${activePeriod === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
//                 >
//                   {p}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={195}>
//             <AreaChart data={trendData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
//               <defs>
//                 <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.12}/>
//                   <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="date" tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false}/>
//               <YAxis tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`}/>
//               <Tooltip formatter={v => [`₹${v}M`, "Volume"]} contentStyle={{ fontSize:11, borderRadius:8, border:"1px solid #e5e7eb" }}/>
//               <Area type="monotone" dataKey="vol" stroke="#2563eb" strokeWidth={2} fill="url(#tvGrad)" dot={{ r:4, fill:"#2563eb" }} activeDot={{ r:5 }}/>
//             </AreaChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Payouts by Status */}
//         <Card>
//           <div className="flex items-center justify-between mb-3">
//             <p className="text-sm font-semibold text-gray-800">Payouts by Status</p>
//             <MoreVertical size={15} className="text-gray-400 cursor-pointer"/>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="flex-shrink-0">
//               <PieChart width={120} height={120}>
//                 <Pie data={statusDonut} cx={55} cy={55} innerRadius={38} outerRadius={57} dataKey="value" strokeWidth={2} stroke="#fff">
//                   {statusDonut.map((e,i) => <Cell key={i} fill={e.color}/>)}
//                 </Pie>
//                 <DonutCenter cx={55} cy={55} line1="25,842" line2="Total"/>
//               </PieChart>
//             </div>
//             <div className="flex-1">
//               {statusDonut.map(e => (
//                 <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.value.toLocaleString()} (${e.pct})`}/>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Payouts by API */}
//         <Card>
//           <div className="flex items-center justify-between mb-3">
//             <p className="text-sm font-semibold text-gray-800">Payouts by API</p>
//             <MoreVertical size={15} className="text-gray-400 cursor-pointer"/>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="flex-shrink-0">
//               <PieChart width={115} height={115}>
//                 <Pie data={apiDonut} cx={52} cy={52} innerRadius={36} outerRadius={54} dataKey="value" strokeWidth={2} stroke="#fff">
//                   {apiDonut.map((e,i) => <Cell key={i} fill={e.color}/>)}
//                 </Pie>
//                 <DonutCenter cx={52} cy={52} line1="25,842" line2="Total"/>
//               </PieChart>
//             </div>
//             <div className="flex-1">
//               {apiDonut.map(e => (
//                 <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.value.toLocaleString()} (${e.pct})`}/>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* ── SECONDARY 6 STATS ── */}
//       <div className="grid grid-cols-6 gap-3 mb-3">
//         {bottomStatCards.map(c => <StatCard key={c.label} {...c} />)}
//       </div>

//       {/* ── BOTTOM ROW ── */}
//       <div className="grid grid-cols-3 gap-3">

//         {/* Payouts by Merchant */}
//         <Card>
//           <p className="text-sm font-semibold text-gray-800 mb-3">Payouts by Merchant (Top 5)</p>
//           <table className="w-full text-xs">
//             <thead>
//               <tr className="border-b border-gray-100 text-gray-800">
//                 <th className="text-left pb-2 font-medium">Merchant</th>
//                 <th className="text-right pb-2 font-medium">Payouts</th>
//                 <th className="text-right pb-2 font-medium">Amount</th>
//                 <th className="text-right pb-2 font-medium">Success Rate</th>
//               </tr>
//             </thead>
//             <tbody>
//               {merchantTable.map(({ name, payouts, amount, rate }) => (
//                 <tr key={name} className="border-b border-gray-50 last:border-0">
//                   <td className="py-2 text-gray-700 font-medium">{name}</td>
//                   <td className="py-2 text-right text-gray-700 font-medium">{payouts}</td>
//                   <td className="py-2 text-right font-semibold text-gray-900">{amount}</td>
//                   <td className="py-2 text-right text-gray-700 font-medium">
//                     <span className="flex items-center justify-end gap-1.5">
//                       {rate}
//                       <span className="inline-block w-7 h-1 bg-green-500 rounded-full"/>
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 mt-3 font-medium">
//             View All Merchants <ArrowRight size={13} />
//           </button>
//         </Card>

//         {/* Payouts by Reason (Failed) */}
//         <Card>
//           <p className="text-sm font-semibold text-gray-800 mb-4">Payouts by Reason (Failed)</p>
//           <div className="flex items-center gap-3">
//             <div className="shrink-0">
//               <PieChart width={110} height={110}>
//                 <Pie data={failReasons} cx={50} cy={50} innerRadius={34} outerRadius={52} dataKey="count" strokeWidth={2} stroke="#fff">
//                   {failReasons.map((e,i) => <Cell key={i} fill={e.color}/>)}
//                 </Pie>
//                 <DonutCenter cx={50} cy={50} line1="412" line2="Total"/>
//               </PieChart>
//             </div>
//             <div className="flex-1">
//               {failReasons.map(e => (
//                 <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.pct}% (${e.count})`}/>
//               ))}
//             </div>
//           </div>
//           <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 mt-3 font-medium">
//             View All Reasons <ArrowRight size={13} />
//           </button>
//         </Card>

//         {/* Payout Amount Distribution */}
//         <Card>
//           <p className="text-sm font-semibold text-gray-800 mb-5">Payout Amount Distribution</p>
//           <div className="space-y-4">
//             {distribution.map(({ range, pct, barW }) => (
//               <div key={range} className="flex items-center gap-2">
//                 <span className="text-xs text-gray-700 font-medium w-36 shrink-0">{range}</span>
//                 <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-blue-600 rounded-full" style={{ width: `${barW}%` }}/>
//                 </div>
//                 <span className="text-xs text-gray-500 w-10 text-right shrink-0 font-medium">{pct}%</span>
//               </div>
//             ))}
//           </div>
//           <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 mt-4 font-medium">
//             View Distribution Report <ArrowRight size={13} />
//           </button>
//         </Card>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
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


// ─── DATA ─────────────────────────────────────────────────────────────────────

const topStatCards = [
  { label: "Total Payouts", value: "25,842", change: "↗ 12.5%", up: true, sub: "vs last 30 days", Icon: Send, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  { label: "Total Payout Amount", value: "₹12.54 Cr", change: "↗ 15.4%", up: true, sub: "vs last 30 days", Icon: IndianRupee, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Successful Payouts", value: "25,430", change: "↗ 13.2%", up: true, sub: "vs last 30 days", Icon: CheckCircle, iconBg: "bg-green-100", iconColor: "text-green-600" },
  { label: "Failed Payouts", value: "412", change: "↘ 8.7%", up: false, sub: "vs last 30 days", Icon: XCircle, iconBg: "bg-red-100", iconColor: "text-red-500" },
  { label: "Pending Payouts", value: "56", change: "↘ 3.1%", up: false, sub: "vs last 30 days", Icon: Clock, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
  { label: "Success Rate", value: "98.42%", change: "↗ 0.68%", up: true, sub: "vs last 30 days", Icon: TrendingUp, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
];

const bottomStatCards = [
  { label: "Average Payout Amount", value: "₹4,853.32", change: "↗ 4.2%", up: true, sub: "vs last 30 days", Icon: ArrowLeftRight, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  { label: "Total Unique Beneficiaries", value: "18,732", change: "↗ 8.1%", up: true, sub: "vs last 30 days", Icon: Users, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Total Charges", value: "₹18.90 L", change: "↗ 6.3%", up: true, sub: "vs last 30 days", Icon: Receipt, iconBg: "bg-green-100", iconColor: "text-green-600" },
  { label: "Returned Amount", value: "₹6.45 L", change: "↘ 5.6%", up: false, sub: "vs last 30 days", Icon: RefreshCw, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
  { label: "Processing Time (Avg)", value: "8.42 sec", change: "↘ 1.2 sec", up: false, sub: "vs last 30 days", Icon: Timer, iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
  { label: "Payout Success Amount", value: "₹12.35 Cr", change: "↗ 15.6%", up: true, sub: "vs last 30 days", Icon: IndianRupee, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
];

const trendData = [
  { date: "8 May", vol: 2.2 },
  { date: "9 May", vol: 3.8 },
  { date: "10 May", vol: 5.0 },
  { date: "11 May", vol: 7.8 },
  { date: "12 May", vol: 8.2 },
  { date: "13 May", vol: 7.5 },
  { date: "14 May", vol: 2.5 },
];

const statusDonut = [
  { name: "Successful", value: 25430, pct: "98.42%", color: "#16a34a" },
  { name: "Failed", value: 412, pct: "1.58%", color: "#ef4444" },
  { name: "Pending", value: 56, pct: "0.22%", color: "#f59e0b" },
  { name: "Returned", value: 32, pct: "0.12%", color: "#9ca3af" },
];

const apiDonut = [
  { name: "RazorpayX", value: 10425, pct: "40.32%", color: "#2563eb" },
  { name: "Cashfree", value: 6842, pct: "26.46%", color: "#16a34a" },
  { name: "Paytm Payouts", value: 4125, pct: "15.94%", color: "#8b5cf6" },
  { name: "PhonePe Payout", value: 2856, pct: "11.04%", color: "#f59e0b" },
  { name: "Amazon Pay", value: 1594, pct: "6.16%", color: "#06b6d4" },
];

const merchantTable = [
  { name: "ABC Pvt Ltd", payouts: "5,230", amount: "₹2.35 Cr", rate: "98.72%" },
  { name: "XYZ Retailers", payouts: "4,120", amount: "₹1.85 Cr", rate: "97.91%" },
  { name: "Global Solutions", payouts: "3,250", amount: "₹1.25 Cr", rate: "98.12%" },
  { name: "Quick Pay Services", payouts: "2,850", amount: "₹1.05 Cr", rate: "97.80%" },
  { name: "Prime Business", payouts: "2,150", amount: "₹85.40 L", rate: "97.45%" },
];

const failReasons = [
  { name: "Invalid Account", pct: 32.0, count: 132, color: "#ef4444" },
  { name: "Insufficient Balance", pct: 21.6, count: 89, color: "#f59e0b" },
  { name: "Account Closed", pct: 18.4, count: 76, color: "#f97316" },
  { name: "Bank Error", pct: 15.5, count: 64, color: "#2563eb" },
  { name: "Other Reasons", pct: 12.5, count: 51, color: "#9ca3af" },
];

const distribution = [
  { range: "₹0 – ₹1,000", pct: 35.20, barW: 88 },
  { range: "₹1,001 – ₹10,000", pct: 32.40, barW: 81 },
  { range: "₹10,001 – ₹50,000", pct: 18.60, barW: 46.5 },
  { range: "₹50,001 – ₹1,00,000", pct: 8.90, barW: 22.25 },
  { range: "Above ₹1,00,000", pct: 4.90, barW: 12.25 },
];

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
        <p className={`text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium ${up ? "text-green-600" : "text-red-500"}`}>
          {change}
          <span className="text-gray-400 font-normal block text-[8px] sm:text-[9px]">{sub}</span>
        </p>
      </div>
    </div>
  );
}

function DonutCenter({ cx, cy, line1, line2 }) {
  return (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fontWeight={600} fill="#111827">{line1}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={8} fill="#9ca3af">{line2}</text>
    </g>
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

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      console.log('Date Range Selected:', dateData);
    } else {
      console.log('Date range cleared');
    }
  };

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
            placeholder="14 May, 2025 - 14 May, 2025"
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-colors">
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

        {/* Payout Volume Trend */}
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
            <div className="h-[180px] sm:h-[195px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} width={30} />
                  <Tooltip formatter={v => [`₹${v}M`, "Volume"]} contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                  <Area type="monotone" dataKey="vol" stroke="#2563eb" strokeWidth={2} fill="url(#tvGrad)" dot={{ r: 3, fill: "#2563eb" }} activeDot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
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
                        <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">25,842</tspan>
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
                        <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">25,842</tspan>
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
                  {merchantTable.map(({ name, payouts, amount, rate }) => (
                    <tr key={name} className="border-b border-gray-50 last:border-0">
                      <td className="py-1.5 sm:py-2 text-gray-700 font-medium truncate max-w-[100px] sm:max-w-none">{name}</td>
                      <td className="py-1.5 sm:py-2 text-right text-gray-700 font-medium">{payouts}</td>
                      <td className="py-1.5 sm:py-2 text-right font-semibold text-gray-900">{amount}</td>
                      <td className="py-1.5 sm:py-2 text-right text-gray-700 font-medium">
                        <span className="flex items-center justify-end gap-1">
                          {rate}
                          <span className="inline-block w-5 h-1 bg-green-500 rounded-full" />
                        </span>
                      </td>
                    </tr>
                  ))}
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
                      <Pie data={failReasons} cx="50%" cy="50%" innerRadius={30} outerRadius={48} dataKey="count" strokeWidth={2} stroke="#fff">
                        {failReasons.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        <tspan x="50%" dy="-6" fontSize="10" fontWeight="600" fill="#111827">412</tspan>
                        <tspan x="50%" dy="14" fontSize="8" fill="#9ca3af">Total</tspan>
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 w-full">
                {failReasons.map(e => (
                  <LegendRow key={e.name} color={e.color} name={e.name} right={`${e.pct}% (${e.count})`} />
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
              {distribution.map(({ range, pct, barW }) => (
                <div key={range} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-[10px] sm:text-xs text-gray-700 font-medium w-32 sm:w-36 shrink-0">{range}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(barW, 100)}%` }} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 w-8 sm:w-10 text-right shrink-0 font-medium">{pct}%</span>
                  </div>
                </div>
              ))}
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
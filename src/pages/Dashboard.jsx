// import React, { useState, useEffect } from "react";
// import DateRangePicker from "../components/DatePicker";
// import {
//     LayoutDashboard, CreditCard, Store, Zap, GitBranch, RefreshCw,
//     Scale, FileText, GitMerge, Webhook, Bell, Users, FileCode,
//     Settings, Monitor, ChevronDown, Search, Moon, Menu,
//     ShieldAlert, TrendingUp, TrendingDown, CheckCircle, XCircle,
//     RotateCcw, Wallet, BarChart2, Layers, UserCheck,
//     AlertTriangle, Info, Power, Activity, Globe, Lock,
//     Database, Download, Filter, Eye, Edit, Trash2, Plus,
//     ArrowUpRight, ArrowDownRight, Package, Cpu, HardDrive,
//     ToggleLeft, ToggleRight, Send, Clock, CheckSquare,
// } from "lucide-react";
// import {
//     LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
//     PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
// } from "recharts";
// import dashboardService from "../services/DashboardServices";

// // ============================================
// // COMPONENT LAYER - Reusable UI components
// // ============================================

// // Card wrapper component
// function Card({ children, className = "" }) {
//     return (
//         <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 ${className}`}>
//             {children}
//         </div>
//     );
// }

// // Section title component
// function SectionTitle({ children, action }) {
//     return (
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
//             <p className="text-xs sm:text-sm font-bold text-black">{children}</p>
//             {action && <button className="text-[11px] sm:text-xs font-semibold text-blue-600 hover:underline text-left sm:text-right">{action}</button>}
//         </div>
//     );
// }

// // Status badge component
// function StatusBadge({ status }) {
//     const map = {
//         success: "bg-green-100 text-green-700",
//         failed: "bg-red-100 text-red-700",
//         returned: "bg-orange-100 text-orange-700",
//         initiated: "bg-blue-100 text-blue-700",
//         processing: "bg-yellow-100 text-yellow-700",
//         Active: "bg-green-100 text-green-700",
//         Inactive: "bg-gray-100 text-gray-600",
//         Suspended: "bg-red-100 text-red-700",
//         Warning: "bg-yellow-100 text-yellow-700",
//         Running: "bg-green-100 text-green-700",
//         Stopped: "bg-red-100 text-red-700",
//         Critical: "bg-red-100 text-red-700",
//         Info: "bg-blue-100 text-blue-700",
//     };
//     // Convert status to lowercase for matching
//     const statusKey = status?.toLowerCase() || '';
//     const matchedKey = Object.keys(map).find(key => key.toLowerCase() === statusKey);
//     return (
//         <span className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold ${map[matchedKey] || "bg-gray-100 text-gray-600"}`}>
//             {status}
//         </span>
//     );
// }

// // Metric card component
// function MetricCard({ label, value, change, up, bg, iconBg, iconColor, Icon, borderColor, textColor, subText }) {
//     return (
//         <div className={`${bg} ${borderColor} border rounded-xl p-3 sm:p-4 flex justify-between items-start gap-2`}>
//             <div className="min-w-0 flex-1">
//                 <p className={`text-[10px] sm:text-xs ${textColor} font-medium break-words`}>
//                     {label}
//                 </p>
//                 <p className="text-base sm:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1 break-words">{value}</p>
//                 {change && (
//                     <p className={`text-[10px] sm:text-[11px] mt-0.5 sm:mt-1 font-medium flex items-center gap-0.5 sm:gap-1 flex-wrap ${up === false ? "text-red-500" : up === true ? "text-green-600" : "text-gray-500"}`}>
//                         {up !== null && up !== undefined && (up ? <TrendingUp size={10} sm:size={11} /> : <TrendingDown size={10} sm:size={11} />)} {change}
//                     </p>
//                 )}
//                 {subText && <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">{subText}</p>}
//             </div>
//             <div className={`${iconBg} w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
//                 <Icon size={16} sm:size={20} className={iconColor} />
//             </div>
//         </div>
//     );
// }

// // Transaction row component
// function TransactionRow({ id, merchant, amount, status, time }) {
//     // Format status for display
//     const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || status;
//     return (
//         <tr className="border-b border-gray-50 last:border-0">
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 font-medium truncate max-w-[80px] sm:max-w-none">{id}</td>
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 font-medium truncate max-w-[100px] sm:max-w-none">{merchant}</td>
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 font-medium whitespace-nowrap">₹ {Number(amount).toLocaleString('en-IN')}</td>
//             <td className="py-1.5 sm:py-2"><StatusBadge status={displayStatus} /></td>
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-400 font-medium whitespace-nowrap">{time}</td>
//         </tr>
//     );
// }

// // API row component
// function ApiRow({ name, rate, vol, amt, dot }) {
//     return (
//         <tr className="border-b border-gray-50 last:border-0">
//             <td className="py-1.5 sm:py-2">
//                 <div className="flex items-center gap-2">
//                     <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
//                     <span className="text-[11px] sm:text-xs text-gray-700 truncate max-w-[80px] sm:max-w-none">{name}</span>
//                 </div>
//             </td>
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 text-center">{rate}%</td>
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 text-center">{vol}</td>
//             <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 text-right sm:text-left">₹ {amt}</td>
//         </tr>
//     );
// }

// // API rate bar component
// function ApiRateBar({ name, rate, color }) {
//     return (
//         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 w-full">
//             <span className="text-[11px] sm:text-xs font-medium text-gray-600 sm:min-w-20 truncate">
//                 {name}
//             </span>
//             <div className="flex-1 flex items-center gap-2 sm:gap-3">
//                 <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
//                     <div
//                         className="h-full rounded-full"
//                         style={{
//                             width: `${Math.min(rate, 100)}%`,
//                             background: color,
//                         }}
//                     />
//                 </div>
//                 <span className="text-[11px] sm:text-xs font-semibold text-gray-700 min-w-[35px] sm:min-w-[40px] text-right">
//                     {rate}%
//                 </span>
//             </div>
//         </div>
//     );
// }

// // Volume chart component
// function VolumeChart({ data }) {
//     return (
//         <Card>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                 <span className="text-xs sm:text-sm font-semibold text-gray-700">Transaction Volume (Daily)</span>
//                 <select className="text-[10px] sm:text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-gray-50 outline-none w-fit">
//                     <option>7 Days</option>
//                     <option>14 Days</option>
//                     <option>30 Days</option>
//                 </select>
//             </div>
//             <div className="h-[150px] sm:h-[170px] w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
//                         <defs>
//                             <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
//                                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                             </linearGradient>
//                         </defs>
//                         <XAxis
//                             dataKey="date"
//                             tick={{ fontSize: 8, fontWeight: 600, fill: "#6b7280" }}
//                             axisLine={{ stroke: "#d1d5db" }}
//                             tickLine={{ stroke: "#d1d5db" }}
//                             interval={0}
//                         />
//                         <YAxis
//                             tick={{ fontSize: 8, fontWeight: 600, fill: "#6b7280" }}
//                             axisLine={{ stroke: "#d1d5db" }}
//                             tickLine={{ stroke: "#d1d5db" }}
//                             tickFormatter={v => `${(v / 1000000).toFixed(0)}M`}
//                             width={35}
//                         />
//                         <Tooltip 
//                             formatter={v => `₹ ${(v / 100000).toFixed(1)}L`} 
//                             contentStyle={{ fontSize: 11 }} 
//                         />
//                         <Area type="monotone" dataKey="amt" stroke="#3b82f6" strokeWidth={2} fill="url(#blueGrad)" dot={{ r: 2.5, fill: "#3b82f6" }} activeDot={{ r: 4 }} />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </div>
//         </Card>
//     );
// }

// // Payout donut chart component
// function PayoutDonutChart({ data }) {
//     // Transform API data for pie chart
//     const pieData = data?.map(item => ({
//         name: item.status?.charAt(0).toUpperCase() + item.status?.slice(1),
//         value: item.count,
//         color: getStatusColor(item.status)
//     })) || [];

//     const total = pieData.reduce((sum, item) => sum + item.value, 0);

//     const legendItems = pieData.map(item => ({
//         color: item.color,
//         label: item.name,
//         count: item.value.toLocaleString(),
//         percent: total > 0 ? ((item.value / total) * 100).toFixed(1) + '%' : '0%'
//     }));

//     return (
//         <Card>
//             <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Payout Status (Count)</p>
//             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
//                 <div className="h-30 w-30 sm:h-35 sm:w-35">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={2}>
//                                 {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
//                             </Pie>
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>
//                 <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
//                     {legendItems.map(({ color, label, count, percent }) => (
//                         <div key={label} className="flex items-start gap-2">
//                             <span className="mt-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ background: color }} />
//                             <div>
//                                 <p className="text-[11px] sm:text-xs font-semibold text-gray-700">{label}</p>
//                                 <p className="text-[10px] sm:text-[11px] text-black">{count} ({percent})</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Card>
//     );
// }

// // Helper function to get color based on status
// function getStatusColor(status) {
//     const statusMap = {
//         'success': '#22c55e',
//         'failed': '#ef4444',
//         'returned': '#f97316',
//         'initiated': '#3b82f6',
//         'processing': '#eab308',
//         'pending': '#eab308',
//         'completed': '#22c55e',
//         'rejected': '#ef4444',
//         'cancelled': '#6b7280',
//     };
//     return statusMap[status?.toLowerCase()] || '#6b7280';
// }

// // Helper function to get success rate color
// function getSuccessRateColor(rate) {
//     const numRate = parseFloat(rate);
//     if (numRate >= 90) return '#22c55e';
//     if (numRate >= 70) return '#f97316';
//     return '#ef4444';
// }

// // Helper function to format currency
// function formatCurrency(amount) {
//     const num = parseFloat(amount);
//     if (isNaN(num)) return '0';
//     if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
//     if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
//     return num.toLocaleString('en-IN');
// }

// // API success rates component
// function ApiSuccessRates({ data }) {
//     return (
//         <Card>
//             <SectionTitle action="View All">API Success Rate</SectionTitle>
//             <div className="space-y-3 sm:space-y-4">
//                 {data?.map((item) => (
//                     <ApiRateBar 
//                         key={item.api_name} 
//                         name={item.api_name} 
//                         rate={parseFloat(item.success_rate).toFixed(2)} 
//                         color={getSuccessRateColor(item.success_rate)}
//                     />
//                 ))}
//             </div>
//         </Card>
//     );
// }

// // Top APIs table component
// function TopApisTable({ data }) {
//     return (
//         <Card>
//             <SectionTitle action="View All">Top Performing APIs</SectionTitle>
//             <div className="overflow-x-auto">
//                 <table className="w-full min-w-[400px] sm:min-w-full text-[11px] sm:text-xs">
//                     <thead>
//                         <tr className="text-black bg-[#F7F8FA]">
//                             {["API Name", "Success Rate", "Volume", "Amount"].map(h => (
//                                 <th key={h} className="text-left sm:text-center p-1.5 sm:p-2 font-medium">{h}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data?.map((api) => (
//                             <ApiRow 
//                                 key={api.id} 
//                                 name={api.api_name}
//                                 rate={parseFloat(api.success_rate).toFixed(2)}
//                                 vol={api.total_transactions}
//                                 amt={formatCurrency(api.total_amount)}
//                                 dot={getSuccessRateColor(api.success_rate)}
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </Card>
//     );
// }

// // Recent transactions table component
// function RecentTransactionsTable({ data }) {
//     return (
//         <Card>
//             <SectionTitle action="View All">Recent Transactions</SectionTitle>
//             <div className="overflow-x-auto">
//                 <table className="w-full min-w-125 sm:min-w-full text-[11px] sm:text-xs">
//                     <thead>
//                         <tr className="text-black border-b border-gray-100 bg-[#F7F8FA]">
//                             {["Txn ID", "Merchant", "Amount", "Status", "Time"].map(h => (
//                                 <th key={h} className="text-left p-1.5 sm:p-2 font-medium">{h}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data?.map((txn) => (
//                             <TransactionRow 
//                                 key={txn.id}
//                                 id={txn.trx_id || txn.order_id}
//                                 merchant={txn.merchant_name}
//                                 amount={txn.amount}
//                                 status={txn.status}
//                                 time={new Date(txn.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </Card>
//     );
// }

// // ============================================
// // PAGE LAYOUT COMPONENT
// // ============================================

// function DashboardPage() {
//     const [dateRange, setDateRange] = useState(null);
//     const [dashboardData, setDashboardData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

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
//             // Fetch data with date range
//             fetchDashboardData(dateData);
//         } else {
//             console.log('Date range cleared');
//             fetchDashboardData();
//         }
//     };

//     const fetchDashboardData = async (dateData = null) => {
//         setLoading(true);
//         setError(null);
//         try {
//             let params = {};
//             if (dateData) {
//                 params = {
//                     from_date: dateData.startFormatted,
//                     to_date: dateData.endFormatted
//                 };
//             }
//             const response = await dashboardService.getDashboardData(params);
//             setDashboardData(response);
//         } catch (err) {
//             console.error('Error fetching dashboard data:', err);
//             setError('Failed to load dashboard data. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRefresh = () => {
//         fetchDashboardData(dateRange);
//     };

//     useEffect(() => {
//         fetchDashboardData();
//     }, []);

//     // Show loading state
//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-[400px]">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading dashboard...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Show error state
//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-[400px]">
//                 <div className="text-center">
//                     <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
//                     <p className="mt-4 text-red-600">{error}</p>
//                     <button 
//                         onClick={handleRefresh}
//                         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Extract data from API response
//     const summary = dashboardData?.summary || {};
//     const payoutStatus = dashboardData?.payout_status || [];
//     const apiSuccessRate = dashboardData?.api_success_rate || [];
//     const topApis = dashboardData?.top_apis || [];
//     const recentTransactions = dashboardData?.recent_transactions || [];
//     const dailyVolume = dashboardData?.daily_volume || [];

//     // Prepare top cards data from API
//     const topCards = [
//         { 
//             label: "Total Withdrawal Requests", 
//             value: summary.total_withdrawal_requests?.toLocaleString() || '0', 
//             change: null, 
//             up: null, 
//             bg: "bg-blue-50", 
//             iconBg: "bg-blue-100", 
//             iconColor: "text-blue-500", 
//             Icon: CreditCard, 
//             borderColor: "border-blue-200", 
//             textColor: "text-blue-700" 
//         },
//         { 
//             label: "Successful Payouts", 
//             value: summary.successful_payouts?.toLocaleString() || '0', 
//             change: null, 
//             up: null, 
//             bg: "bg-green-50", 
//             iconBg: "bg-green-100", 
//             iconColor: "text-green-500", 
//             Icon: CheckCircle, 
//             borderColor: "border-green-200", 
//             textColor: "text-green-700" 
//         },
//         { 
//             label: "Failed Payouts", 
//             value: summary.failed_payouts?.toLocaleString() || '0', 
//             change: null, 
//             up: null, 
//             bg: "bg-red-50", 
//             iconBg: "bg-red-100", 
//             iconColor: "text-red-500", 
//             Icon: XCircle, 
//             borderColor: "border-red-200", 
//             textColor: "text-red-700" 
//         },
//         { 
//             label: "Returned to SGPay", 
//             value: payoutStatus.find(p => p.status === 'returned')?.count?.toLocaleString() || '0', 
//             change: null, 
//             up: null, 
//             bg: "bg-orange-50", 
//             iconBg: "bg-orange-100", 
//             iconColor: "text-orange-500", 
//             Icon: RotateCcw, 
//             borderColor: "border-orange-200", 
//             textColor: "text-orange-700" 
//         },
//     ];

//     // Prepare bottom cards data from API
//     const bottomCards = [
//         { 
//             label: "Total Transaction Amount", 
//             value: `₹ ${formatCurrency(summary.total_transaction_amount)}`, 
//             change: null, 
//             up: null, 
//             bg: "bg-purple-50", 
//             iconBg: "bg-purple-100", 
//             iconColor: "text-purple-500", 
//             Icon: Wallet, 
//             borderColor: "border-purple-200", 
//             textColor: "text-purple-700" 
//         },
//         { 
//             label: "Today's Processing Volume", 
//             value: `₹ ${formatCurrency(summary.today_processing_volume)}`, 
//             change: null, 
//             up: null, 
//             bg: "bg-blue-50", 
//             iconBg: "bg-blue-100", 
//             iconColor: "text-blue-500", 
//             Icon: BarChart2, 
//             borderColor: "border-blue-200", 
//             textColor: "text-blue-700" 
//         },
//         { 
//             label: "Active APIs", 
//             value: `${summary.active_apis || 0} / ${(summary.active_apis || 0) + (summary.inactive_apis || 0)}`, 
//             change: `${summary.active_apis || 0} Active`, 
//             up: null, 
//             iconBg: "bg-yellow-100", 
//             bg: "bg-yellow-50", 
//             iconColor: "text-yellow-500", 
//             Icon: Layers, 
//             borderColor: "border-yellow-200", 
//             textColor: "text-yellow-700" 
//         },
//         { 
//             label: "Active Merchants", 
//             value: summary.active_merchants?.toLocaleString() || '0', 
//             change: null, 
//             up: null, 
//             bg: "bg-teal-50", 
//             iconBg: "bg-teal-100", 
//             iconColor: "text-teal-500", 
//             Icon: UserCheck, 
//             borderColor: "border-teal-200", 
//             textColor: "text-teal-700" 
//         },
//     ];

//     // Prepare volume chart data (if empty, use default)
//     const volumeData = dailyVolume.length > 0 ? dailyVolume : [
//         { date: "08 May", amt: 5500000 },
//         { date: "09 May", amt: 6200000 },
//         { date: "10 May", amt: 6000000 },
//         { date: "11 May", amt: 5800000 },
//         { date: "12 May", amt: 4200000 },
//         { date: "13 May", amt: 4500000 },
//         { date: "14 May", amt: 9200000 },
//     ];

//     return (
//         <div className="space-y-3 sm:space-y-4 p-3 sm:p-0">
//             {/* Header Section */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div>
//                     <h1 className="text-lg sm:text-xl font-bold text-gray-800">Dashboard</h1>
//                     <p className="text-[11px] sm:text-xs text-gray-800 mt-0.5">Welcome back, Super Admin! Here's what's happening today.</p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                     <DateRangePicker 
//                         onDateChange={handleDateChange}
//                         placeholder="14 May, 2025 - 14 May, 2025"
//                     />
//                     <button 
//                         onClick={handleRefresh}
//                         className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold"
//                     >
//                         <RefreshCw size={12} sm:size={13} /> Refresh
//                     </button>
//                 </div>
//             </div>

//             {/* Top Metric Cards Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
//                 {topCards.map((card, index) => (
//                     <MetricCard key={index} {...card} />
//                 ))}
//             </div>

//             {/* Bottom Metric Cards Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
//                 {bottomCards.map((card, index) => (
//                     <MetricCard key={index} {...card} />
//                 ))}
//             </div>

//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
//                 <VolumeChart data={volumeData} />
//                 <PayoutDonutChart data={payoutStatus} />
//                 <ApiSuccessRates data={apiSuccessRate} />
//             </div>

//             {/* Tables Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
//                 <TopApisTable data={topApis} />
//                 <RecentTransactionsTable data={recentTransactions} />
//             </div>
//         </div>
//     );
// }

// export default DashboardPage;
// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import DateRangePicker from "../components/DatePicker";
import {
    LayoutDashboard, CreditCard, Store, Zap, GitBranch, RefreshCw,
    Scale, FileText, GitMerge, Webhook, Bell, Users, FileCode,
    Settings, Monitor, ChevronDown, Search, Moon, Menu,
    ShieldAlert, TrendingUp, TrendingDown, CheckCircle, XCircle,
    RotateCcw, Wallet, BarChart2, Layers, UserCheck,
    AlertTriangle, Info, Power, Activity, Globe, Lock,
    Database, Download, Filter, Eye, Edit, Trash2, Plus,
    ArrowUpRight, ArrowDownRight, Package, Cpu, HardDrive,
    ToggleLeft, ToggleRight, Send, Clock, CheckSquare,
    Calendar, // ✅ Added Calendar import
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
} from "recharts";
import dashboardService from "../services/DashboardServices";

// ============================================
// COMPONENT LAYER - Reusable UI components
// ============================================

// Card wrapper component
function Card({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 ${className}`}>
            {children}
        </div>
    );
}

// Section title component
function SectionTitle({ children, action }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <p className="text-xs sm:text-sm font-bold text-black">{children}</p>
            {action && <button className="text-[11px] sm:text-xs font-semibold text-blue-600 hover:underline text-left sm:text-right">{action}</button>}
        </div>
    );
}

// Status badge component
function StatusBadge({ status }) {
    const map = {
        success: "bg-green-100 text-green-700",
        failed: "bg-red-100 text-red-700",
        returned: "bg-orange-100 text-orange-700",
        initiated: "bg-blue-100 text-blue-700",
        processing: "bg-yellow-100 text-yellow-700",
        Active: "bg-green-100 text-green-700",
        Inactive: "bg-gray-100 text-gray-600",
        Suspended: "bg-red-100 text-red-700",
        Warning: "bg-yellow-100 text-yellow-700",
        Running: "bg-green-100 text-green-700",
        Stopped: "bg-red-100 text-red-700",
        Critical: "bg-red-100 text-red-700",
        Info: "bg-blue-100 text-blue-700",
    };
    const statusKey = status?.toLowerCase() || '';
    const matchedKey = Object.keys(map).find(key => key.toLowerCase() === statusKey);
    return (
        <span className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold ${map[matchedKey] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

// Metric card component
function MetricCard({ label, value, change, up, bg, iconBg, iconColor, Icon, borderColor, textColor, subText }) {
    return (
        <div className={`${bg} ${borderColor} border rounded-xl p-3 sm:p-4 flex justify-between items-start gap-2`}>
            <div className="min-w-0 flex-1">
                <p className={`text-[10px] sm:text-xs ${textColor} font-medium break-words`}>
                    {label}
                </p>
                <p className="text-base sm:text-2xl font-bold text-gray-800 mt-0.5 sm:mt-1 break-words">{value}</p>
                {change && (
                    <p className={`text-[10px] sm:text-[11px] mt-0.5 sm:mt-1 font-medium flex items-center gap-0.5 sm:gap-1 flex-wrap ${up === false ? "text-red-500" : up === true ? "text-green-600" : "text-gray-500"}`}>
                        {up !== null && up !== undefined && (up ? <TrendingUp size={10} sm:size={11} /> : <TrendingDown size={10} sm:size={11} />)} {change}
                    </p>
                )}
                {subText && <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">{subText}</p>}
            </div>
            <div className={`${iconBg} w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon size={16} sm:size={20} className={iconColor} />
            </div>
        </div>
    );
}

// Transaction row component
function TransactionRow({ id, merchant, amount, status, time }) {
    const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || status;
    return (
        <tr className="border-b border-gray-50 last:border-0">
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 font-medium truncate max-w-[80px] sm:max-w-none">{id}</td>
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 font-medium truncate max-w-[100px] sm:max-w-none">{merchant}</td>
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 font-medium whitespace-nowrap">₹ {Number(amount).toLocaleString('en-IN')}</td>
            <td className="py-1.5 sm:py-2"><StatusBadge status={displayStatus} /></td>
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-400 font-medium whitespace-nowrap">{time}</td>
        </tr>
    );
}

// API row component
function ApiRow({ name, rate, vol, amt, dot }) {
    return (
        <tr className="border-b border-gray-50 last:border-0">
            <td className="py-1.5 sm:py-2">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                    <span className="text-[11px] sm:text-xs text-gray-700 truncate max-w-[80px] sm:max-w-none">{name}</span>
                </div>
            </td>
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 text-center">{rate}%</td>
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 text-center">{vol}</td>
            <td className="py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 text-right sm:text-left">₹ {amt}</td>
        </tr>
    );
}

// API rate bar component
function ApiRateBar({ name, rate, color }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 w-full">
            <span className="text-[11px] sm:text-xs font-medium text-gray-600 sm:min-w-20 truncate">
                {name}
            </span>
            <div className="flex-1 flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: `${Math.min(rate, 100)}%`,
                            background: color,
                        }}
                    />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-700 min-w-[35px] sm:min-w-[40px] text-right">
                    {rate}%
                </span>
            </div>
        </div>
    );
}

// Volume chart component
function VolumeChart({ data }) {
    return (
        <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Transaction Volume (Daily)</span>
                <select className="text-[10px] sm:text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-gray-50 outline-none w-fit">
                    <option>7 Days</option>
                    <option>14 Days</option>
                    <option>30 Days</option>
                </select>
            </div>
            <div className="h-[150px] sm:h-[170px] w-full">
                {data && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 8, fontWeight: 600, fill: "#6b7280" }}
                                axisLine={{ stroke: "#d1d5db" }}
                                tickLine={{ stroke: "#d1d5db" }}
                                interval={0}
                            />
                            <YAxis
                                tick={{ fontSize: 8, fontWeight: 600, fill: "#6b7280" }}
                                axisLine={{ stroke: "#d1d5db" }}
                                tickLine={{ stroke: "#d1d5db" }}
                                tickFormatter={v => `${(v / 1000000).toFixed(0)}M`}
                                width={35}
                            />
                            <Tooltip 
                                formatter={v => `₹ ${(v / 100000).toFixed(1)}L`} 
                                contentStyle={{ fontSize: 11 }} 
                            />
                            <Area type="monotone" dataKey="amt" stroke="#3b82f6" strokeWidth={2} fill="url(#blueGrad)" dot={{ r: 2.5, fill: "#3b82f6" }} activeDot={{ r: 4 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No volume data available
                    </div>
                )}
            </div>
        </Card>
    );
}

// Payout donut chart component
function PayoutDonutChart({ data }) {
    const pieData = data?.map(item => ({
        name: item.status?.charAt(0).toUpperCase() + item.status?.slice(1),
        value: item.count,
        color: getStatusColor(item.status)
    })) || [];

    const total = pieData.reduce((sum, item) => sum + item.value, 0);

    const legendItems = pieData.map(item => ({
        color: item.color,
        label: item.name,
        count: item.value.toLocaleString(),
        percent: total > 0 ? ((item.value / total) * 100).toFixed(1) + '%' : '0%'
    }));

    return (
        <Card>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Payout Status (Count)</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="h-30 w-30 sm:h-35 sm:w-35">
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={2}>
                                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                            No data
                        </div>
                    )}
                </div>
                <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
                    {legendItems.length > 0 ? (
                        legendItems.map(({ color, label, count, percent }) => (
                            <div key={label} className="flex items-start gap-2">
                                <span className="mt-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ background: color }} />
                                <div>
                                    <p className="text-[11px] sm:text-xs font-semibold text-gray-700">{label}</p>
                                    <p className="text-[10px] sm:text-[11px] text-black">{count} ({percent})</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm">No status data</div>
                    )}
                </div>
            </div>
        </Card>
    );
}

// Helper function to get color based on status
function getStatusColor(status) {
    const statusMap = {
        'success': '#22c55e',
        'failed': '#ef4444',
        'returned': '#f97316',
        'initiated': '#3b82f6',
        'processing': '#eab308',
        'pending': '#eab308',
        'completed': '#22c55e',
        'rejected': '#ef4444',
        'cancelled': '#6b7280',
    };
    return statusMap[status?.toLowerCase()] || '#6b7280';
}

// Helper function to get success rate color
function getSuccessRateColor(rate) {
    const numRate = parseFloat(rate);
    if (numRate >= 90) return '#22c55e';
    if (numRate >= 70) return '#f97316';
    return '#ef4444';
}

// Helper function to format currency
function formatCurrency(amount) {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0';
    if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
    return num.toLocaleString('en-IN');
}

// API success rates component
function ApiSuccessRates({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">API Success Rate</SectionTitle>
            <div className="space-y-3 sm:space-y-4">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <ApiRateBar 
                            key={item.api_name} 
                            name={item.api_name} 
                            rate={parseFloat(item.success_rate).toFixed(2)} 
                            color={getSuccessRateColor(item.success_rate)}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-400 text-sm py-4">No API data available</div>
                )}
            </div>
        </Card>
    );
}

// Top APIs table component
function TopApisTable({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">Top Performing APIs</SectionTitle>
            <div className="overflow-x-auto">
                {data && data.length > 0 ? (
                    <table className="w-full min-w-[400px] sm:min-w-full text-[11px] sm:text-xs">
                        <thead>
                            <tr className="text-black bg-[#F7F8FA]">
                                {["API Name", "Success Rate", "Volume", "Amount"].map(h => (
                                    <th key={h} className="text-left sm:text-center p-1.5 sm:p-2 font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((api) => (
                                <ApiRow 
                                    key={api.id} 
                                    name={api.api_name}
                                    rate={parseFloat(api.success_rate).toFixed(2)}
                                    vol={api.total_transactions}
                                    amt={formatCurrency(api.total_amount)}
                                    dot={getSuccessRateColor(api.success_rate)}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center text-gray-400 text-sm py-8">No API data available</div>
                )}
            </div>
        </Card>
    );
}

// Recent transactions table component
function RecentTransactionsTable({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">Recent Transactions</SectionTitle>
            <div className="overflow-x-auto">
                {data && data.length > 0 ? (
                    <table className="w-full min-w-125 sm:min-w-full text-[11px] sm:text-xs">
                        <thead>
                            <tr className="text-black border-b border-gray-100 bg-[#F7F8FA]">
                                {["Txn ID", "Merchant", "Amount", "Status", "Time"].map(h => (
                                    <th key={h} className="text-left p-1.5 sm:p-2 font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((txn) => (
                                <TransactionRow 
                                    key={txn.id}
                                    id={txn.trx_id || txn.order_id}
                                    merchant={txn.merchant_name}
                                    amount={txn.amount}
                                    status={txn.status}
                                    time={new Date(txn.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center text-gray-400 text-sm py-8">No recent transactions</div>
                )}
            </div>
        </Card>
    );
}

// ============================================
// PAGE LAYOUT COMPONENT
// ============================================

function DashboardPage() {
    const [dateRange, setDateRange] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDateDisplay, setSelectedDateDisplay] = useState("");

    const handleDateChange = (dateData) => {
        if (dateData) {
            setDateRange(dateData);
            setSelectedDateDisplay(dateData.dateRange || `${dateData.startFormatted} - ${dateData.endFormatted}`);
            console.log('Date Range Selected:', dateData);
            fetchDashboardData(dateData);
        } else {
            setDateRange(null);
            setSelectedDateDisplay("");
            console.log('Date range cleared');
            fetchDashboardData();
        }
    };

    const fetchDashboardData = async (dateData = null) => {
        setLoading(true);
        setError(null);
        try {
            let params = {};
            if (dateData) {
                params = {
                    from_date: dateData.startFormatted,
                    to_date: dateData.endFormatted
                };
            }
            const response = await dashboardService.getDashboardData(params);
            setDashboardData(response);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchDashboardData(dateRange);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
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

    // Extract data from API response
    const summary = dashboardData?.summary || {};
    const payoutStatus = dashboardData?.payout_status || [];
    const apiSuccessRate = dashboardData?.api_success_rate || [];
    const topApis = dashboardData?.top_apis || [];
    const recentTransactions = dashboardData?.recent_transactions || [];
    const dailyVolume = dashboardData?.daily_volume || [];

    // Prepare top cards data from API
    const topCards = [
        { 
            label: "Total Withdrawal Requests", 
            value: summary.total_withdrawal_requests?.toLocaleString() || '0', 
            change: null, 
            up: null, 
            bg: "bg-blue-50", 
            iconBg: "bg-blue-100", 
            iconColor: "text-blue-500", 
            Icon: CreditCard, 
            borderColor: "border-blue-200", 
            textColor: "text-blue-700" 
        },
        { 
            label: "Successful Payouts", 
            value: summary.successful_payouts?.toLocaleString() || '0', 
            change: null, 
            up: null, 
            bg: "bg-green-50", 
            iconBg: "bg-green-100", 
            iconColor: "text-green-500", 
            Icon: CheckCircle, 
            borderColor: "border-green-200", 
            textColor: "text-green-700" 
        },
        { 
            label: "Failed Payouts", 
            value: summary.failed_payouts?.toLocaleString() || '0', 
            change: null, 
            up: null, 
            bg: "bg-red-50", 
            iconBg: "bg-red-100", 
            iconColor: "text-red-500", 
            Icon: XCircle, 
            borderColor: "border-red-200", 
            textColor: "text-red-700" 
        },
        { 
            label: "Returned to SGPay", 
            value: payoutStatus.find(p => p.status === 'returned')?.count?.toLocaleString() || '0', 
            change: null, 
            up: null, 
            bg: "bg-orange-50", 
            iconBg: "bg-orange-100", 
            iconColor: "text-orange-500", 
            Icon: RotateCcw, 
            borderColor: "border-orange-200", 
            textColor: "text-orange-700" 
        },
    ];

    // Prepare bottom cards data from API
    const bottomCards = [
        { 
            label: "Total Transaction Amount", 
            value: `₹ ${formatCurrency(summary.total_transaction_amount)}`, 
            change: null, 
            up: null, 
            bg: "bg-purple-50", 
            iconBg: "bg-purple-100", 
            iconColor: "text-purple-500", 
            Icon: Wallet, 
            borderColor: "border-purple-200", 
            textColor: "text-purple-700" 
        },
        { 
            label: "Today's Processing Volume", 
            value: `₹ ${formatCurrency(summary.today_processing_volume)}`, 
            change: null, 
            up: null, 
            bg: "bg-blue-50", 
            iconBg: "bg-blue-100", 
            iconColor: "text-blue-500", 
            Icon: BarChart2, 
            borderColor: "border-blue-200", 
            textColor: "text-blue-700" 
        },
        { 
            label: "Active APIs", 
            value: `${summary.active_apis || 0} / ${(summary.active_apis || 0) + (summary.inactive_apis || 0)}`, 
            change: `${summary.active_apis || 0} Active`, 
            up: null, 
            iconBg: "bg-yellow-100", 
            bg: "bg-yellow-50", 
            iconColor: "text-yellow-500", 
            Icon: Layers, 
            borderColor: "border-yellow-200", 
            textColor: "text-yellow-700" 
        },
        { 
            label: "Active Merchants", 
            value: summary.active_merchants?.toLocaleString() || '0', 
            change: null, 
            up: null, 
            bg: "bg-teal-50", 
            iconBg: "bg-teal-100", 
            iconColor: "text-teal-500", 
            Icon: UserCheck, 
            borderColor: "border-teal-200", 
            textColor: "text-teal-700" 
        },
    ];

    // Use API volume data only - no fallback
    const volumeData = dailyVolume || [];

    return (
        <div className="space-y-3 sm:space-y-4 p-3 sm:p-0">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-[11px] sm:text-xs text-gray-800 mt-0.5">Welcome back, Super Admin! Here's what's happening today.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <DateRangePicker 
                        onDateChange={handleDateChange}
                        placeholder="Select date range"
                    />
                    <button 
                        onClick={handleRefresh}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold"
                    >
                        <RefreshCw size={12} sm:size={13} /> Refresh
                    </button>
                </div>
            </div>

            {/* Selected Date Display */}
            {selectedDateDisplay && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg">
                    <Calendar size={14} className="text-blue-500" />
                    <span className="text-xs text-blue-700 font-medium">
                        Showing data for: <span className="font-bold">{selectedDateDisplay}</span>
                    </span>
                    <button 
                        onClick={() => {
                            setSelectedDateDisplay("");
                            setDateRange(null);
                            fetchDashboardData();
                        }}
                        className="ml-auto text-xs text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Clear Filter
                    </button>
                </div>
            )}

            {/* Top Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {topCards.map((card, index) => (
                    <MetricCard key={index} {...card} />
                ))}
            </div>

            {/* Bottom Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {bottomCards.map((card, index) => (
                    <MetricCard key={index} {...card} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <VolumeChart data={volumeData} />
                <PayoutDonutChart data={payoutStatus} />
                <ApiSuccessRates data={apiSuccessRate} />
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                <TopApisTable data={topApis} />
                <RecentTransactionsTable data={recentTransactions} />
            </div>
        </div>
    );
}

export default DashboardPage;
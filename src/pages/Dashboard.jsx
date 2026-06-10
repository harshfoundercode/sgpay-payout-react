import React from 'react';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
} from "recharts";


// Alert data
const alertsData = [
    { type: "Critical", icon: AlertTriangle, iconColor: "text-red-500", bg: "bg-red-50", title: "API Balance Low", desc: "Paytm Payouts balance is below threshold (₹ 15,000)", time: "5 min ago" },
    { type: "Warning", icon: AlertTriangle, iconColor: "text-yellow-500", bg: "bg-yellow-50", title: "Daily Limit Exceeded", desc: "Easebuzz daily limit has been reached", time: "15 min ago" },
    { type: "Warning", icon: AlertTriangle, iconColor: "text-yellow-500", bg: "bg-yellow-50", title: "API Down", desc: "Yes Bank API is currently unavailable", time: "30 min ago" },
    { type: "Info", icon: Info, iconColor: "text-blue-500", bg: "bg-blue-50", title: "Reconciliation Pending", desc: "3 reconciliation items pending", time: "1 hour ago" },
    { type: "Critical", icon: AlertTriangle, iconColor: "text-red-500", bg: "bg-red-50", title: "Webhook Failure", desc: "Multiple webhook delivery failures for MRC002", time: "2 hours ago" },
    { type: "Info", icon: Info, iconColor: "text-blue-500", bg: "bg-blue-50", title: "New Merchant Onboarded", desc: "ABC Corp has completed onboarding successfully", time: "3 hours ago" },
    { type: "Warning", icon: AlertTriangle, iconColor: "text-yellow-500", bg: "bg-yellow-50", title: "High Failure Rate", desc: "RazorpayX failure rate above 5% in last 30 min", time: "4 hours ago" },
    { type: "Info", icon: CheckCircle, iconColor: "text-green-500", bg: "bg-green-50", title: "Settlement Completed", desc: "Daily settlement of ₹ 4,82,30,000 processed", time: "5 hours ago" },
];

// Payout pie chart data
const payoutPie = [
    { name: "Success", value: 71.2, color: "#22c55e" },
    { name: "Failed", value: 14.3, color: "#ef4444" },
    { name: "Returned", value: 14.5, color: "#f97316" },
];

// API rates data
const apiRates = [
    { name: "RazorpayX", rate: 98.45, color: "#22c55e" },
    { name: "Cashfree", rate: 96.21, color: "#22c55e" },
    { name: "Paytm Payouts", rate: 94.51, color: "#22c55e" },
    { name: "Easebuzz", rate: 92.10, color: "#f97316" },
    { name: "Yes Bank API", rate: 88.20, color: "#ef4444" },
];

// Top performing APIs data
const topApis = [
    { name: "RazorpayX", rate: "98.45%", vol: "4,52,145", amt: "₹ 18,45,23,145", dot: "#22c55e" },
    { name: "Cashfree", rate: "96.21%", vol: "3,21,145", amt: "₹ 12,45,12,456", dot: "#22c55e" },
    { name: "Paytm Payouts", rate: "94.51%", vol: "2,14,321", amt: "₹  8,45,21,321", dot: "#22c55e" },
    { name: "Easebuzz", rate: "92.10%", vol: "1,25,425", amt: "₹  5,12,45,235", dot: "#f97316" },
    { name: "Yes Bank API", rate: "88.20%", vol: "85,214", amt: "₹  3,21,43,074", dot: "#ef4444" },
];

// Recent transactions data
const recentTxns = [
    { id: "TXN12548789", merchant: "ABC Pvt Ltd", amount: "₹ 25,000", status: "Success", time: "11:30 AM" },
    { id: "TXN12548788", merchant: "XYZ Solutions", amount: "₹ 12,500", status: "Success", time: "11:28 AM" },
    { id: "TXN12548787", merchant: "PQR Services", amount: "₹  8,750", status: "Failed", time: "11:27 AM" },
    { id: "TXN12548786", merchant: "LMN Traders", amount: "₹ 15,000", status: "Returned", time: "11:25 AM" },
    { id: "TXN12548785", merchant: "AAA Retail", amount: "₹  5,500", status: "Success", time: "11:22 AM" },
];

// Volume chart data
const volumeData = [
    { date: "08 May", amt: 5500000 },
    { date: "09 May", amt: 6200000 },
    { date: "10 May", amt: 6000000 },
    { date: "11 May", amt: 5800000 },
    { date: "12 May", amt: 4200000 },
    { date: "13 May", amt: 4500000 },
    { date: "14 May", amt: 9200000 },
];

// Top cards data
const topCards = [
    { label: "Total Withdrawal Requests", value: "12,45,678", change: "+12.5% vs yesterday", up: true, bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-500", Icon: CreditCard, borderColor: "border-blue-200", textColor: "text-blue-700" },
    { label: "Successful Payouts", value: "11,45,231", change: "+10.8% vs yesterday", up: true, bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-500", Icon: CheckCircle, borderColor: "border-green-200", textColor: "text-green-700" },
    { label: "Failed Payouts", value: "45,231", change: "+8.2% vs yesterday", up: false, bg: "bg-red-50", iconBg: "bg-red-100", iconColor: "text-red-500", Icon: XCircle, borderColor: "border-red-200", textColor: "text-red-700" },
    { label: "Returned to SGPay", value: "55,216", change: "−5.3% vs yesterday", up: true, bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-500", Icon: RotateCcw, borderColor: "border-orange-200", textColor: "text-orange-700" },
];

// Bottom cards data
const bottomCards = [
    { label: "Total Transaction Amount", value: "₹ 48,75,45,231", change: "+15.6% vs yesterday", bg: "bg-purple-50", up: true, iconBg: "bg-purple-100", iconColor: "text-purple-500", Icon: Wallet, borderColor: "border-purple-200", textColor: "text-purple-700" },
    { label: "Today's Processing Volume", value: "₹ 6,75,45,231", change: "+11.3% vs yesterday", bg: "bg-blue-50", up: true, iconBg: "bg-blue-100", iconColor: "text-blue-500", Icon: BarChart2, borderColor: "border-blue-200", textColor: "text-blue-700" },
    { label: "Active APIs", value: "8 / 12", change: "Online", up: null, iconBg: "bg-yellow-100", bg: "bg-yellow-50", iconColor: "text-yellow-500", Icon: Layers, borderColor: "border-yellow-200", textColor: "text-yellow-700" },
    { label: "Active Merchants", value: "1,325", change: "+5.7% vs yesterday", up: true, bg: "bg-teal-50", iconBg: "bg-teal-100", iconColor: "text-teal-500", Icon: UserCheck, borderColor: "border-teal-200", textColor: "text-teal-700" },
];

// ============================================
// COMPONENT LAYER - Reusable UI components
// ============================================

// Card wrapper component
function Card({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${className}`}>
            {children}
        </div>
    );
}

// Section title component
function SectionTitle({ children, action }) {
    return (
        <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-black">{children}</p>
            {action && <button className="text-xs font-semibold text-blue-600 hover:underline">{action}</button>}
        </div>
    );
}

// Status badge component
function StatusBadge({ status }) {
    const map = {
        Success: "bg-green-100 text-green-700",
        Failed: "bg-red-100 text-red-700",
        Returned: "bg-orange-100 text-orange-700",
        Active: "bg-green-100 text-green-700",
        Inactive: "bg-gray-100 text-gray-600",
        Suspended: "bg-red-100 text-red-700",
        Warning: "bg-yellow-100 text-yellow-700",
        Running: "bg-green-100 text-green-700",
        Stopped: "bg-red-100 text-red-700",
        Critical: "bg-red-100 text-red-700",
        Info: "bg-blue-100 text-blue-700",
    };
    return (
        <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

// Metric card component (for both top and bottom cards)
function MetricCard({ label, value, change, up, bg, iconBg, iconColor, Icon, borderColor, textColor }) {

    return (
        <div className={`${bg} ${borderColor} border rounded-xl p-4 flex justify-between items-start`}>
            <div>
                <p className={`text-xs ${textColor} font-medium`}>
                    {label}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                <p className={`text-[11px] mt-1 font-medium flex items-center gap-1 ${up === false ? "text-red-500" : "text-green-600"}`}>
                    {up !== null && (up ? <TrendingUp size={11} /> : <TrendingDown size={11} />)} {change}
                </p>
            </div>
            <div className={`${iconBg} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={iconColor} />
            </div>
        </div>
    );
}


// Alert item component
function AlertItem({ icon: Icon, iconColor, bg, title, desc, time }) {
    return (
        <div className="flex items-start gap-3 pb-2 border-b border-gray-50 last:border-0">
            <div className={` w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={iconColor} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800">{title}</p>
                <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{desc}</p>
            </div>
            <span className="text-[10px] text-gray-400 whitespace-nowrap">{time}</span>
        </div>
    );
}

// Transaction row component
function TransactionRow({ id, merchant, amount, status, time }) {
    return (
        <tr className="border-b border-gray-50 last:border-0">
            <td className="py-1.5 text-gray-600 font-medium">{id}</td>
            <td className="py-1.5 text-gray-600 font-medium">{merchant}</td>
            <td className="py-1.5 text-gray-600 font-medium">{amount}</td>
            <td className="py-1.5"><StatusBadge status={status} /></td>
            <td className="py-1.5 text-gray-400 font-medium">{time}</td>
        </tr>
    );
}

// API row component
function ApiRow({ name, rate, vol, amt, dot }) {
    return (
        <tr className="border-b border-gray-50 last:border-0 items-center text-center justify-center">
            <td className="py-1.5 flex items-center  gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
                {name}
            </td>
            <td className="py-1.5 text-gray-600">{rate}</td>
            <td className="py-1.5 text-gray-600">{vol}</td>
            <td className="py-1.5 text-gray-600">{amt}</td>
        </tr>
    );
}

// API rate bar component


function ApiRateBar({ name, rate, color }) {
    return (
        <div className="flex items-center gap-4 w-full">
            <span className="text-xs font-medium text-gray-600 min-w-20">
                {name}
            </span>

            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${rate}%`,
                        background: color,
                    }}
                />
            </div>

            <span className="text-xs font-semibold text-gray-700 min-w-[40px] text-right">
                {rate}%
            </span>
        </div>
    );
}

// Volume chart component
function VolumeChart({ data }) {
    return (
        <Card>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Transaction Volume (Daily)</span>
                <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-gray-50 outline-none">
                    <option>7 Days</option>
                    <option>14 Days</option>
                    <option>30 Days</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {/* <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} /> */}
                    <XAxis
                        dataKey="date"
                        tick={{
                            fontSize: 8,
                            fontWeight: 600,
                            fill: "#6b7280"
                        }}
                        axisLine={{ stroke: "#d1d5db" }}
                        tickLine={{ stroke: "#d1d5db" }}
                    />

                    <YAxis
                        tick={{
                            fontSize: 8,
                            fontWeight: 600,
                            fill: "#6b7280"
                        }}
                        axisLine={{ stroke: "#d1d5db" }}
                        tickLine={{ stroke: "#d1d5db" }}
                        tickFormatter={v => `${(v / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip formatter={v => `₹ ${(v / 100000).toFixed(1)}L`} contentStyle={{ fontSize: 11 }} />
                    <Area type="monotone" dataKey="amt" stroke="#3b82f6" strokeWidth={2} fill="url(#blueGrad)" dot={{ r: 3, fill: "#3b82f6" }} activeDot={{ r: 5 }} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
}

// Payout donut chart component
function PayoutDonutChart() {
    const legendItems = [
        { color: "#22c55e", label: "Success", count: "11,45,231", percent: "71.2%" },
        { color: "#ef4444", label: "Failed", count: "45,231", percent: "14.3%" },
        { color: "#f97316", label: "Returned", count: "55,216", percent: "14.5%" },
    ];

    return (
        <Card>
            <p className="text-sm font-semibold text-gray-700 mb-3">Payout Status (Count)</p>
            <div className="flex items-center gap-4">
                <PieChart width={140} height={140}>
                    <Pie data={payoutPie} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={2}>
                        {payoutPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                </PieChart>
                <div className="space-y-3">
                    {legendItems.map(({ color, label, count, percent }) => (
                        <div key={label} className="flex items-start gap-2">
                            <span className="mt-1 w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                            <div>
                                <p className="text-xs font-semibold text-gray-700">{label}</p>
                                <p className="text-[11px] text-black">{count} ({percent})</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

// API success rates component
function ApiSuccessRates({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">API Success Rate</SectionTitle>
            <div className="space-y-4">
                {data.map((item) => (
                    <ApiRateBar key={item.name} {...item} />
                ))}
            </div>
        </Card>
    );
}

// Top APIs table component
function TopApisTable({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">Top Performing APIs</SectionTitle>
            <table className="w-full text-xs">
                <thead>
                    <tr className="text-black bg-[#F7F8FA]">
                        {["API Name", "Success Rate", "Volume", "Amount"].map(h => (
                            <th key={h} className="text-center p-1 font-medium text-bold">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((api) => (
                        <ApiRow key={api.name} {...api} />
                    ))}
                </tbody>
            </table>
        </Card>
    );
}

// Recent transactions table component
function RecentTransactionsTable({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">Recent Transactions</SectionTitle>
            <table className="w-full text-xs">
                <thead>
                    <tr className="text-black border-b border-gray-100  bg-[#F7F8FA]">
                        {["Txn ID", "Merchant", "Amount", "Status", "Time"].map(h => (
                            <th key={h} className="text-left pb-2 font-medium">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((txn) => (
                        <TransactionRow key={txn.id} {...txn} />
                    ))}
                </tbody>
            </table>
        </Card>
    );
}

// Alerts panel component
function AlertsPanel({ data }) {
    return (
        <Card>
            <SectionTitle action="View All">Alerts & Notifications</SectionTitle>
            <div className="space-y-2">
                {data.slice(0, 4).map((alert, index) => (
                    <AlertItem key={index} {...alert} />
                ))}
            </div>
        </Card>
    );
}

// ============================================
// PAGE LAYOUT COMPONENT
// ============================================

function DashboardPage() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-xs text-gray-800 mt-0.5">Welcome back, Super Admin! Here's what's happening today.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3 py-2 shadow-sm">
                        <FileText size={14} className="text-gray-500" />

                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            dateFormat="dd MMM yyyy"
                            className="text-xs text-gray-700 outline-none cursor-pointer bg-transparent w-[220px]"
                        />

                        <ChevronDown size={12} className="text-gray-500" />
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-xs font-semibold">
                        <RefreshCw size={13} /> Refresh
                    </button>
                </div>
            </div>

            {/* Top Metric Cards Row */}
            <div className="grid grid-cols-4 gap-3">
                {topCards.map((card, index) => (
                    <MetricCard key={index} {...card} />
                ))}
            </div>

            {/* Bottom Metric Cards Row */}
            <div className="grid grid-cols-4 gap-3">
                {bottomCards.map((card, index) => (
                    <MetricCard key={index} {...card} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-3">
                <VolumeChart data={volumeData} />
                <PayoutDonutChart />
                <ApiSuccessRates data={apiRates} />
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-3 gap-3">
                <TopApisTable data={topApis} />
                <RecentTransactionsTable data={recentTxns} />
                <AlertsPanel data={alertsData} />
            </div>
        </div>
    );
}

export default DashboardPage;
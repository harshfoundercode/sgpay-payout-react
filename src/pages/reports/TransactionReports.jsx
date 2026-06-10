import { useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, iconBg, label, value, change, changeColor, sub }) => (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            {icon}
        </div>
        <div className="min-w-0">
            <div className="text-[11px] font-medium text-black mb-0.5 truncate">{label}</div>
            <div className="text-[16px] font-bold text-gray-900 leading-tight">{value}</div>
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                <span className={`text-xs font-semibold ${changeColor}`}>{change}</span>
                <span className="text-[12px] text-gray-600 font-medium">{sub}</span>
            </div>
        </div>
    </div>
);

// ── Select ───────────────────────────────────────────────────────────────────
const Select = ({ options }) => (
    <div className="relative">
        <select className="appearance-none pl-3 pr-7 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer">
            {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <svg className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
    </div>
);

// ── Custom Tooltip for Line Chart ─────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-xs">
                <div className="font-semibold text-gray-700 mb-1">{label}</div>
                <div className="text-blue-600 font-bold">{(payload[0].value / 1000000).toFixed(1)}M</div>
            </div>
        );
    }
    return null;
};

// ── Data ─────────────────────────────────────────────────────────────────────
const volumeData = [
    { date: "8 May", value: 2100000 },
    { date: "9 May", value: 4500000 },
    { date: "10 May", value: 4100000 },
    { date: "11 May", value: 6300000 },
    { date: "12 May", value: 8700000 },
    { date: "13 May", value: 7100000 },
    { date: "14 May", value: 3200000 },
];

const pieData = [
    { name: "Success", value: 25430, color: "#16a34a" },
    { name: "Failed", value: 412, color: "#ef4444" },
    { name: "Pending", value: 56, color: "#f59e0b" },
    { name: "Returned", value: 32, color: "#9ca3af" },
];

const statCards = [
    {
        iconBg: "bg-blue-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}>
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        label: "Total Transactions", value: "25,842",
        change: "↑ 12.5%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-purple-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.8}>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        label: "Total Volume", value: "₹12.54 Cr",
        change: "↑ 15.4%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-green-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        label: "Success Transactions", value: "25,430",
        change: "↑ 13.2%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-red-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}>
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        label: "Failed Transactions", value: "412",
        change: "↓ 8.7%", changeColor: "text-red-500", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-orange-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        label: "Pending Transactions", value: "56",
        change: "↑ 3.1%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-blue-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}>
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        label: "Success Rate", value: "98.42%",
        change: "↑ 0.68%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-green-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        label: "Success Amount", value: "₹12.35 Cr",
        change: "↑ 15.6%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-red-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        label: "Failed Amount", value: "₹18.90 L",
        change: "↓ 6.2%", changeColor: "text-red-500", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-yellow-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        label: "Pending Amount", value: "₹2.10 L",
        change: "↑ 2.6%", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-purple-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.8}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
        ),
        label: "Total Merchants", value: "1,025",
        change: "↑ 8", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-indigo-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth={1.8}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        label: "Active Merchants", value: "872",
        change: "↑ 10", changeColor: "text-green-600", sub: "vs last 30 days",
    },
    {
        iconBg: "bg-blue-50",
        icon: (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}>
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        label: "Active APIs", value: "5",
        change: "—", changeColor: "text-gray-400", sub: "No change",
    },
];

// ── Custom Legend ─────────────────────────────────────────────────────────────
const CustomLegend = () => {
    const items = [
        { label: "Success", count: "25,430", percent: "98.42%", color: "#16a34a" },
        { label: "Failed", count: "412", percent: "1.58%", color: "#ef4444" },
        { label: "Pending", count: "56", percent: "0.22%", color: "#f59e0b" },
        { label: "Returned", count: "32", percent: "0.12%", color: "#6b7280" },
    ];

    return (
        <div className="ml-4 space-y-4 min-w-[180px]">
            {items.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-medium text-gray-700">
                            {item.label}
                        </span>
                    </div>

                    <span className="text-xs font-semibold text-gray-900">
                        {item.count}
                        <span className="text-gray-500 font-medium ml-1">
                            ({item.percent})
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function ReportsOverview() {
    const [chartPeriod, setChartPeriod] = useState("7D");

    const yFormatter = (v) => {
        if (v >= 1000000) return `${v / 1000000}M`;
        if (v >= 1000) return `${v / 1000}K`;
        return v;
    };

    return (
        <div className="min-h-screen">

            {/* ── Page Header ── */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Reports Overview</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Overview of your payout platform performance</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {/* Date range */}
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white text-xs text-gray-700 cursor-pointer hover:bg-gray-50">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                        13 May 2025 – 14 May 2025
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    </div>
                    <Select options={["All Merchants", "Premium", "Standard"]} />
                    <Select options={["All APIs", "RazorpayX", "Cashfree", "Paytm"]} />
                    <Select options={["All Status", "Active", "Inactive"]} />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
                        Apply Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export Report
                        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </div>

            {/* ── Stat Cards Row 1 ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
                {statCards.slice(0, 6).map((c) => <StatCard key={c.label} {...c} />)}
            </div>

            {/* ── Stat Cards Row 2 ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {statCards.slice(6, 12).map((c) => <StatCard key={c.label} {...c} />)}
            </div>

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

                {/* Line Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Transaction Volume Overview</h2>
                        <div className="flex rounded-lg overflow-hidden border border-gray-200">
                            {["7D", "30D", "90D"].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setChartPeriod(p)}
                                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${chartPeriod === p ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={230}>
                        <LineChart data={volumeData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#141342" }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={yFormatter} tick={{ fontSize: 11, fill: "#141342" }} axisLine={false} tickLine={false} width={36} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2.5}
                                dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }}
                                activeDot={{ r: 6, fill: "#3b82f6" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-base font-semibold text-gray-900 mb-5">
                        Status Distribution
                    </h2>

                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <PieChart width={175} height={175}>
                                <Pie
                                    data={pieData}
                                    cx={85}
                                    cy={85}
                                    innerRadius={50}
                                    outerRadius={70}
                                    dataKey="value"
                                    stroke="#fff"
                                    strokeWidth={2}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-gray-900">
                                    25,842
                                </span>
                                <span className="text-xs text-gray-500">
                                    Total
                                </span>
                            </div>
                        </div>

                        <CustomLegend />
                    </div>
                </div>
            </div>

            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Merchant Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-50">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.8}>
                                <rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">Merchant Summary</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                            { label: "Total Merchants", val: "1,025" },
                            { label: "Active Merchants", val: "872" },
                            { label: "Today's Active", val: "215" },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-medium font-bold text-gray-900">{s.val}</div>
                                <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="text-xs text-green-600 font-semibold">↑ 8 vs last 30 days</span>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            View Merchant Report
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                {/* API Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-50">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}>
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">API Summary</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                            { label: "Active APIs", val: "5" },
                            { label: "Best Performing API", val: "RazorpayX" },
                            { label: "Avg Success Rate", val: "98.20%" },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-medium font-bold text-gray-900 leading-tight">{s.val}</div>
                                <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="text-xs text-green-600 font-semibold">↑ 0.65% vs last 30 days</span>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            View API Report
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                {/* Settlement Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-50">
                        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}>
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">Settlement Summary</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                            { label: "Settlement Amount", val: "₹11.80 Cr" },
                            { label: "Pending Settlement", val: "₹1.20 Cr" },
                            { label: "Completed Today", val: "458" },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-medium font-bold text-gray-900 leading-tight">{s.val}</div>
                                <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="text-xs text-green-600 font-semibold">↑ 16.2% vs last 30 days</span>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            View Settlement Report
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
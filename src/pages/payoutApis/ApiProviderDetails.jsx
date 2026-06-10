import { useState } from "react";
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

// ─── PROVIDER DATA ────────────────────────────────────────────────────────────

const PROVIDERS = {
    razorpayx: {
        id: "razorpayx",
        name: "RazorpayX",
        logoText: "R",
        logoColor: "#2563eb",
        logoBg: "#dbeafe",
        subtitle: "Bank Transfer API",
        status: "Active",
        providerType: "Bank API",
        priority: 1,
        apiCode: "RAZORPAYX",
        createdAt: "01 Jan 2025, 10:15 AM",
        updatedAt: "14 May 2025, 10:45 AM",
        description: "RazorpayX Payouts – NEFT/IMPS/RTGS",
        successRate: 98.45,
        failureRate: 1.35,
        totalTxns30d: 24562,
        totalVol30d: "₹ 8,45,210.75",
        healthStatus: "Healthy",
        responseTime: "320 ms",
        uptime30d: "99.92%",
        // Config
        apiType: "Bank Transfer API",
        baseUrl: "https://api.razorpay.com/v1/payouts",
        authType: "Basic Auth",
        apiKey: "••••••••••••••1234",
        secretKey: "••••••••••••••5678",
        timeout: "30 Seconds",
        retryCount: "3",
        retryInterval: "10 Seconds",
        callbackUrl: "https://bridge.sgsarypay.com/api/webhook/razorpayx",
        supportedMethods: "NEFT, IMPS, RTGS",
        supportedBanks: "All Major Banks",
        minAmount: "₹ 1.00",
        maxAmount: "₹ 10,00,000.00",
        dailyLimit: "₹ 10,00,000.00",
        dailyTxnLimit: "10,000",
        currency: "INR",
        // Balance
        availableBalance: "₹ 8,45,210.75",
        reservedBalance: "₹ 1,25,430.00",
        inTransit: "₹ 65,340.00",
        lowBalanceThreshold: "₹ 1,00,000.00",
        usableBalance: "₹ 7,19,780.75",
        dailyUsedAmt: "₹ 6,25,430.00",
        dailyUsedPct: 62.54,
        lastSynced: "14 May 2025, 10:30 AM",
        // Perf chart
        perfData: [
            { d: "15 Apr", s: 920, f: 12 }, { d: "18 Apr", s: 880, f: 18 }, { d: "21 Apr", s: 950, f: 8 },
            { d: "24 Apr", s: 900, f: 15 }, { d: "27 Apr", s: 870, f: 20 }, { d: "30 Apr", s: 940, f: 10 },
            { d: "03 May", s: 960, f: 7 }, { d: "06 May", s: 910, f: 13 }, { d: "09 May", s: 890, f: 16 }, { d: "12 May", s: 970, f: 5 },
        ],
        // Health logs
        healthLogs: [
            { time: "14 May 2025, 10:30 AM", msg: "API is healthy", icon: "up", rt: "310 ms", status: "Healthy" },
            { time: "14 May 2025, 10:00 AM", msg: "API is healthy", icon: "up", rt: "295 ms", status: "Healthy" },
            { time: "14 May 2025, 09:30 AM", msg: "High response time detected", icon: "warn", rt: "780 ms", status: "Degraded" },
            { time: "14 May 2025, 09:00 AM", msg: "API is healthy", icon: "up", rt: "310 ms", status: "Healthy" },
            { time: "14 May 2025, 08:30 AM", msg: "API is healthy", icon: "up", rt: "305 ms", status: "Healthy" },
        ],
        // Supported banks
        supportedBanksList: [
            { short: "SBI", full: "State Bank of India" },
            { short: "HDFC", full: "HDFC Bank" },
            { short: "ICICI", full: "ICICI Bank" },
            { short: "AXIS", full: "Axis Bank" },
            { short: "PNB", full: "Punjab Nat. Bank" },
            { short: "BOB", full: "Bank of Baroda" },
            { short: "CANARA", full: "Canara Bank" },
            { short: "KOTAK", full: "Kotak Mahindra" },
            { short: "IDBI", full: "IDBI Bank" },
            { short: "IndusInd", full: "IndusInd Bank" },
        ],
    },
};

// Fallback for any other apiId
const DEFAULT_PROVIDER = PROVIDERS.razorpayx;

// ─── TABS ─────────────────────────────────────────────────────────────────────

const TABS = [
    { id: "overview", label: "Overview", Icon: Activity },
   
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const STATUS_STYLES = {
    Active: "bg-green-50 text-green-700",
    Inactive: "bg-red-50 text-red-700  ",
    Maintenance: "bg-orange-50 text-orange-600  ",
    Healthy: "bg-green-50 text-green-700 ",
    Degraded: "bg-orange-50 text-orange-600  ",
};

function StatusBadge({ status, size = "sm" }) {

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-semibold ${size === "sm" ? "text-xs" : "text-sm"} ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
            {status}
        </span>
    );
}

function ApiLogo({ p, size = 56 }) {
    return (
        <div
            className="rounded-xl flex items-center justify-center font-extrabold select-none flex-shrink-0"
            style={{ width: size, height: size, background: p.logoBg, color: p.logoColor, fontSize: size * 0.32 }}
        >
            {p.logoText}
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
            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </button>
    );
}

function SecretField({ value }) {
    const [show, setShow] = useState(false);
    return (
        <span className="flex items-center gap-1.5 font-mono text-gray-700">
            {show ? value.replace(/•/g, "x") : value}
            <button onClick={() => setShow(s => !s)} className="text-gray-300 hover:text-gray-500">
                {show ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
            <CopyBtn value={value} />
        </span>
    );
}

// ─── TAB PANELS ───────────────────────────────────────────────────────────────

function OverviewTab({ p }) {
    return (
        <div className="grid grid-cols-3 gap-5">

            {/* Left 2-col: Config + Performance + Banks */}
            <div className="col-span-2 space-y-5">

                {/* Configuration Details */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Configuration Details</h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs">
                        {[
                            ["API Type", p.apiType, "text"],
                            ["Supported Methods", p.supportedMethods, "text"],
                            ["Base URL", p.baseUrl, "link"],
                            ["Supported Banks", p.supportedBanks, "text"],
                            ["Auth Type", p.authType, "text"],
                            ["Min Amount", p.minAmount, "text"],
                            ["API Key", p.apiKey, "secret"],
                            ["Max Amount", p.maxAmount, "text"],
                            ["Secret Key", p.secretKey, "secret"],
                            ["Daily Limit", p.dailyLimit, "editable"],
                            ["Timeout", p.timeout, "text"],
                            ["Daily Txn Limit", p.dailyTxnLimit, "text"],
                            ["Retry Count", p.retryCount, "text"],
                            ["Currency", p.currency, "text"],
                            ["Retry Interval", p.retryInterval, "text"],
                            ["Status", p.status, "badge"],
                            ["Callback URL", p.callbackUrl, "link"],
                        ].map(([label, value, type], i) => (
                            <div key={i} className="flex items-start gap-1">
                                <span className="text-gray-500 font-semibold w-28 shrink-0">{label}</span>
                                <span className="text-gray-400 mr-1">:</span>
                                {type === "text" && <span className="text-gray-700 font-medium">{value}</span>}
                                {type === "link" && <a href="#" className="text-blue-500 hover:underline truncate max-w-[200px]" onClick={e => e.preventDefault()}>{value}</a>}
                                {type === "secret" && <SecretField value={value} />}
                                {type === "editable" && (
                                    <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                                        {value} <Edit2 size={11} className="text-gray-300 hover:text-gray-500 cursor-pointer" />
                                    </span>
                                )}
                                {type === "badge" && <StatusBadge status={value} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance */}
                <div className="bg-white rounded-xl border border-gray-100  p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-800">Performance (Last 30 Days)</h3>
                    </div>
                    {/* KPI row */}
                    <div className="grid grid-cols-5 gap-3 mb-5">
                        {[
                            [p.successRate + "%", "Success Rate", "text-gray-900"],
                            [p.failureRate + "%", "Failure Rate", "text-red-500"],
                            [p.responseTime, "Avg. Response Time", "text-gray-900"],
                            [p.totalTxns30d.toLocaleString(), "Total Transactions", "text-gray-900"],
                            [p.totalVol30d, "Total Volume", "text-yellow-500"],
                        ].map(([v, l, c]) => (
                            <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
                                <p className={`text-lg font-bold ${c}`}>{v}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{l}</p>
                            </div>
                        ))}
                    </div>
                    {/* Chart */}
                    <div>
                        <div className="flex items-center gap-5 text-xs mb-3">
                            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-green-500 inline-block rounded" />Success</span>
                            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-red-400 inline-block rounded" />Failed</span>
                            <select className="ml-auto text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-500 outline-none bg-white">
                                <option>Last 30 Days</option>
                                <option>Last 7 Days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={190}>
                            <AreaChart data={p.perfData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                                <Area type="monotone" dataKey="s" stroke="#22c55e" strokeWidth={2} fill="url(#sg)" name="Success" dot={false} />
                                <Line type="monotone" dataKey="f" stroke="#f87171" strokeWidth={1.5} dot={false} name="Failed" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Supported Banks */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-800">Supported Banks (Sample)</h3>
                        <button className="text-xs text-blue-600 hover:underline font-medium">View All Banks</button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {p.supportedBanksList.map(b => (
                            <div key={b.short} className="flex flex-col items-center gap-1.5 w-16">
                                <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-gray-600">{b.short[0]}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 text-center leading-tight">{b.short}</span>
                                <span className="text-[9px] text-gray-400 text-center leading-tight">{b.full}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right col: Balance + Health logs */}
            <div className="space-y-5">
                {/* Balance Summary */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-800">Balance Summary</h3>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
                            <Clock size={10} />
                            <span>Last Synced: {p.lastSynced}</span>
                            <button className="ml-1 hover:text-blue-500 transition-colors"><RefreshCw size={11} /></button>
                        </div>
                    </div>
                    <div className="space-y-3 text-xs">
                        {[
                            ["Available Balance", p.availableBalance, "text-gray-800"],
                            ["Reserved Balance", p.reservedBalance, "text-gray-800"],
                            ["In-Transit", p.inTransit, "text-gray-800"],
                            ["Low Balance Threshold", p.lowBalanceThreshold, "text-gray-800"],
                        ].map(([label, val, tc]) => (
                            <div key={label} className="flex justify-between items-center pb-2.5 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-semibold">{label}</span>
                                <span className={`font-semibold ${tc}`}>{val}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-sm font-semibold text-green-500">Usable Balance</span>
                            <span className="text-sm font-bold text-green-500">{p.usableBalance}</span>
                        </div>
                    </div>
                </div>

                {/* Health Logs */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-800">Recent Health Logs</h3>
                        <button className="text-xs text-blue-600 hover:underline font-medium">View All</button>
                    </div>
                    <div className="space-y-0">
                        {p.healthLogs.map((log, i) => (
                            <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${log.icon === "warn" ? "bg-orange-50" : "bg-green-50"}`}>
                                    {log.icon === "warn"
                                        ? <AlertCircle size={14} className="text-orange-400" />
                                        : <TrendingUp size={14} className="text-green-500" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-800 leading-snug">{log.msg}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{log.time}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-[11px] text-gray-500">Response Time: {log.rt}</p>
                                    <p className={`text-[11px] font-semibold mt-0.5 ${log.status === "Degraded" ? "text-orange-500" : "text-green-600"}`}>
                                        Status: {log.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function PlaceholderTab({ label }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Database size={28} className="text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-600">{label}</h3>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                This section displays {label.toLowerCase()} data and configurations for this API provider.
            </p>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ApiProviderDetail({ apiId = "razorpayx", onBack = () => { } }) {
    const p = PROVIDERS[apiId] || DEFAULT_PROVIDER;
    const [activeTab, setActiveTab] = useState("overview");

    function renderTab() {
        switch (activeTab) {
            case "overview": return <OverviewTab p={p} />;
        
            default: return <PlaceholderTab label={TABS.find(t => t.id === activeTab)?.label || activeTab} />;
        }
    }

    return (
        <div className="min-h-screen text-sm">

            {/* ── PAGE HEADER ── */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">API Provider Details</h1>
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-gray-600 mt-1.5">
                        <button className="hover:text-blue-600 transition-colors">Dashboard</button>
                        <ChevronRight size={12} />
                        <button className="hover:text-blue-600 transition-colors">Payout APIs</button>
                        <ChevronRight size={12} />
                        <button className="hover:text-blue-600 transition-colors">API Providers</button>
                        <ChevronRight size={12} />
                        <span className="text-gray-600 font-medium">{p.name} (Bank Transfer API)</span>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={14} /> Back to API Providers
                    </button>
                    <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <Edit2 size={14} /> Edit Provider
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text- font-semibold transition-colors shadow-sm">
                        Actions <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            {/* ── PROVIDER HEADER CARD ── */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
                <div className="flex items-start gap-5">

                    {/* Logo + Name block */}
                    <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                            <ApiLogo p={p} size={60} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {p.name}
                                </h2>
                                <StatusBadge status={p.status} />
                            </div>

                            <p className="text-xs text-gray-700 font-medium mt-1">
                                {p.subtitle}
                            </p>

                            <div className="mt-4 space-y-3 text-sm">
                                <div className="grid grid-cols-[90px_10px_1fr] gap-2">
                                    <span className="text-gray-500 text-xs font-semibold">Provider Type</span>
                                    <span className="text-gray-300">:</span>
                                    <span className="font-medium text-gray-800 text-xs">
                                        {p.providerType}
                                    </span>
                                </div>

                                <div className="grid grid-cols-[90px_10px_1fr] gap-2">
                                    <span className="text-gray-500 text-xs font-semibold">Priority</span>
                                    <span className="text-gray-300">:</span>
                                    <span className="font-medium text-gray-800 text-xs">
                                        {p.priority}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vertical divider */}
                    <div className="w-px self-stretch bg-gray-100 mx-1" />

                    {/* Meta info */}
                    <div className="flex-1 flex flex-col gap-3 text-xs">
                        {[
                            ["API Code", p.apiCode],
                            ["Created At", p.createdAt],
                            ["Last Updated", p.updatedAt],
                            ["Description", p.description],
                        ].map(([l, v]) => (
                            <div key={l} className="flex gap-4">
                                <span className="text-gray-500 font-semibold w-28 shrink-0">{l}</span>
                                <span className="text-gray-400">:</span>
                                <span className="text-gray-700 font-medium">{v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Vertical divider */}
                    <div className="w-px self-stretch bg-gray-100 mx-1" />

                    {/* 30D Stats */}
                    <div className="min-w-60.5 text-xs space-y-2.5">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-500 font-semibold">Success Rate (30D)</span>
                                <span className="font-bold text-gray-800">{p.successRate}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.successRate}%` }} />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-semibold">Total Transactions (30D)</span>
                            <span className="font-semibold text-gray-700">{p.totalTxns30d.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-semibold">Total Volume (30D)</span>
                            <span className="font-semibold text-gray-700">{p.totalVol30d}</span>
                        </div>
                    </div>

                    {/* Vertical divider */}
                    <div className="w-px self-stretch bg-gray-100 mx-1" />

                    {/* Current Status */}
                    <div className="min-w-50 border border-gray-100 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-bold text-gray-700">Current Status</span>
                            <StatusBadge status={p.healthStatus} />
                        </div>
                        <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-semibold">Response Time</span>
                                <span className="font-semibold text-gray-700">{p.responseTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-semibold ">Uptime (30D)</span>
                                <span className="font-semibold text-gray-700">{p.uptime30d}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── TABS ── */}
            <div className="bg-white  border-gray-100 mb-5 overflow-hidden">
                <div className="flex overflow-x-auto border-b border-gray-100 px-2">
                    {TABS.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0
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
import { useState } from "react";

// ── Status Badge ────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
    status === "Active"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-600 border-red-200"
  }`}>
    {status}
  </span>
);

// ── API Chip ────────────────────────────────────────────────────────────────
const apiColors = {
  RazorpayX:   { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200" },
  Cashfree:    { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200" },
  Paytm:       { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200" },
  PhonePe:     { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Amazon Pay":{ bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "ICICI Payout":{ bg: "bg-red-50",  text: "text-red-700",    border: "border-red-200" },
  "HDFC Payout":{ bg: "bg-indigo-50",text: "text-indigo-700", border: "border-indigo-200" },
};

const ApiChip = ({ name, label }) => {
  const c = apiColors[name] || { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${c.bg} ${c.text} ${c.border} whitespace-nowrap`}>
      {name} {label && <span className="ml-1 font-normal opacity-75">{label}</span>}
    </span>
  );
};

// ── Three-dot menu ──────────────────────────────────────────────────────────
const ThreeDot = () => (
  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
    </svg>
  </button>
);

// ── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, subColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 px-3 py-2 flex items-center gap-4 flex-1 min-w-0">
    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-500">
      {icon}
    </div>
    <div>
      <div className="text-xs font-medium text-gray-500 mb-0.5">{label}</div>
      <div className="text-xl font-bold text-gray-900 leading-tight">{value}</div>
      {sub && <div className={`text-xs font-semibold mt-0.5 ${subColor || "text-gray-400"}`}>{sub}</div>}
    </div>
  </div>
);

// ── Select dropdown ─────────────────────────────────────────────────────────
const Select = ({ options, defaultValue }) => (
  <div className="relative">
    <select className="appearance-none pl-3 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer">
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7"/></svg>
  </div>
);

// ── Data ────────────────────────────────────────────────────────────────────
const routingData = [
  {
    name: "Default High Success Routing",
    type: "Percentage Based",
    scope: "All Merchants",
    apis: [{ name: "RazorpayX", label: "70%" }, { name: "Cashfree", label: "20%" }, { name: "Paytm", label: "10%" }],
    status: "Active",
    default: "RazorpayX",
    created: "14 May 2025, 10:30 AM",
  },
  {
    name: "Premium Merchants Routing",
    type: "Priority Based",
    scope: "Premium (120)",
    apis: [{ name: "RazorpayX", label: "Priority 1" }, { name: "Cashfree", label: "Priority 2" }, { name: "Paytm", label: "Priority 3" }],
    status: "Active",
    default: "RazorpayX",
    created: "13 May 2025, 09:15 AM",
  },
  {
    name: "UPI Payout Routing",
    type: "Percentage Based",
    scope: "UPI Payout Merchants (342)",
    apis: [{ name: "PhonePe", label: "60%" }, { name: "Paytm", label: "30%" }, { name: "Amazon Pay", label: "10%" }],
    status: "Active",
    default: "PhonePe",
    created: "12 May 2025, 02:20 PM",
  },
  {
    name: "Bank Transfer Routing",
    type: "Priority Based",
    scope: "Bank Transfer Merchants (906)",
    apis: [{ name: "RazorpayX", label: "Priority 1" }, { name: "ICICI Payout", label: "Priority 2" }, { name: "HDFC Payout", label: "Priority 3" }],
    status: "Active",
    default: "RazorpayX",
    created: "11 May 2025, 11:45 AM",
  },
  {
    name: "Fallback Routing",
    type: "Priority Based",
    scope: "All Merchants",
    apis: [{ name: "Cashfree", label: "Priority 1" }, { name: "RazorpayX", label: "Priority 2" }, { name: "Paytm", label: "Priority 3" }],
    status: "Inactive",
    default: "Cashfree",
    created: "10 May 2025, 04:30 PM",
  },
  {
    name: "Weekend Routing",
    type: "Percentage Based",
    scope: "All Merchants",
    apis: [{ name: "RazorpayX", label: "50%" }, { name: "PhonePe", label: "30%" }, { name: "Paytm", label: "20%" }],
    status: "Active",
    default: "RazorpayX",
    created: "09 May 2025, 06:00 PM",
  },
  {
    name: "Testing Routing",
    type: "Percentage Based",
    scope: "Test Merchants (15)",
    apis: [{ name: "RazorpayX", label: "50%" }, { name: "Cashfree", label: "50%" }],
    status: "Inactive",
    default: "RazorpayX",
    created: "08 May 2025, 01:20 PM",
  },
  {
    name: "Low Amount Routing",
    type: "Priority Based",
    scope: "Amount <= ₹1000",
    apis: [{ name: "PhonePe", label: "Priority 1" }, { name: "Paytm", label: "Priority 2" }, { name: "Amazon Pay", label: "Priority 3" }],
    status: "Active",
    default: "PhonePe",
    created: "07 May 2025, 10:10 AM",
  },
  {
    name: "High Amount Routing",
    type: "Priority Based",
    scope: "Amount > ₹1,00,000",
    apis: [{ name: "RazorpayX", label: "Priority 1" }, { name: "ICICI Payout", label: "Priority 2" }, { name: "HDFC Payout", label: "Priority 3" }],
    status: "Active",
    default: "RazorpayX",
    created: "06 May 2025, 03:40 PM",
  },
  {
    name: "Regional Routing - North",
    type: "Percentage Based",
    scope: "Region: North",
    apis: [{ name: "RazorpayX", label: "60%" }, { name: "Cashfree", label: "25%" }, { name: "Paytm", label: "15%" }],
    status: "Active",
    default: "RazorpayX",
    created: "05 May 2025, 09:30 AM",
  },
];

// ── Icons ───────────────────────────────────────────────────────────────────
const RouteIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
);
const LinkIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);
const PauseIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10"/><path d="M10 15V9M14 15V9"/>
  </svg>
);
const UsersIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/>
  </svg>
);
const ApiIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
  </svg>
);

export default function PayoutRouting() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = routingData.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Payout Routing</h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
            {["Dashboard", "Routing", "Routing List"].map((b, i, arr) => (
              <span key={b} className="flex items-center gap-1.5">
                <span className={i === arr.length - 1 ? "text-gray-700" : "hover:text-blue-600 cursor-pointer"}>{b}</span>
                {i < arr.length - 1 && (
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Routing Logs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14"/></svg>
            Create Routing
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
        <StatCard icon={<RouteIcon />} label="Total Routing Rules" value="24" />
        <StatCard
          icon={<svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={1.8}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>}
          label="Active Rules"
          value="18"
          sub="75.00%"
          subColor="text-green-600"
        />
        <StatCard
          icon={<svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><path d="M10 15V9M14 15V9"/></svg>}
          label="Inactive Rules"
          value="6"
          sub="25.00%"
          subColor="text-red-500"
        />
        <StatCard icon={<UsersIcon />} label="Total Merchants" value="1,248" />
        <StatCard icon={<ApiIcon />} label="Total Payout APIs" value="12" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 border-b border-gray-100">
          {/* Search */}
          <div className="relative flex-1 min-w-55">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
              placeholder="Search by Routing Name / Merchant / API"
            />
          </div>
          <Select options={["All Status", "Active", "Inactive"]} />
          <Select options={["All Merchants", "Premium", "UPI Payout", "Bank Transfer"]} />
          <Select options={["All APIs", "RazorpayX", "Cashfree", "Paytm", "PhonePe"]} />
          <Select options={["All Types", "Percentage Based", "Priority Based"]} />
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            More Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors ml-auto">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/></svg>
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                {["Routing Name", "Type", "Merchant Scope", "Payout APIs (Priority / Percentage)", "Status", "Default API", "Created On", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors group">
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium text-blue-800 hover:underline cursor-pointer whitespace-nowrap">{row.name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-800 font-semibold whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-800 font-semibold whitespace-nowrap">{row.scope}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {row.apis.map((api) => (
                        <ApiChip key={api.name + api.label} name={api.name} label={api.label} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3.5 text-sm text-gray-800 font-semibold whitespace-nowrap">{row.default}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-800 font-semibold whitespace-nowrap">{row.created}</td>
                  <td className="px-4 py-3.5"><ThreeDot /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <span className="text-xs text-gray-500">Showing 1 to {filtered.length} of 24 results</span>
          <div className="flex items-center gap-2">
            <Select options={["10 per page", "25 per page", "50 per page"]} />
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded text-xs font-medium transition-colors ${page === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}
              <button className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Legend,
} from "recharts";
import DateRangePicker from "../../components/DatePicker";

// ── Data ──────────────────────────────────────────────────────────────────────
const trendData = [
  { date: "8 May",  success: 4200, failure: 55,  pending: 12 },
  { date: "9 May",  success: 6100, failure: 60,  pending: 8  },
  { date: "10 May", success: 6400, failure: 58,  pending: 10 },
  { date: "11 May", success: 6300, failure: 62,  pending: 9  },
  { date: "12 May", success: 8200, failure: 70,  pending: 14 },
  { date: "13 May", success: 6800, failure: 65,  pending: 11 },
  { date: "14 May", success: 4500, failure: 52,  pending: 7  },
];

const distributionData = [
  { name: "Success",  value: 25430, color: "#16a34a" },
  { name: "Failed",   value: 412,   color: "#dc2626" },
  { name: "Pending",  value: 56,    color: "#f59e0b" },
  { name: "Returned", value: 32,    color: "#9ca3af" },
];

const failureReasonData = [
  { name: "Invalid Account",     value: 132, pct: "32%", color: "#3b82f6" },
  { name: "Timeout",             value: 86,  pct: "21%", color: "#f97316" },
  { name: "Bank Error",          value: 74,  pct: "18%", color: "#dc2626" },
  { name: "Insufficient Balance",value: 62,  pct: "15%", color: "#a855f7" },
  { name: "API Error",           value: 58,  pct: "14%", color: "#22c55e" },
];

const failureByApi = [
  { api: "RazorpayX",       failed: 152, amount: "₹7.25 L", rate: "1.28%", bar: 55 },
  { api: "Cashfree",        failed: 116, amount: "₹5.10 L", rate: "1.91%", bar: 70 },
  { api: "PhonePe Payouts", failed: 74,  amount: "₹3.20 L", rate: "1.62%", bar: 60 },
  { api: "Paytm Payouts",   failed: 48,  amount: "₹2.15 L", rate: "1.44%", bar: 52 },
  { api: "Amazon Pay",      failed: 22,  amount: "₹1.20 L", rate: "1.18%", bar: 42 },
];

const hourlyData = [
  { hour: "12 AM", success: 120,  failure: 5  },
  { hour: "2 AM",  success: 80,   failure: 3  },
  { hour: "4 AM",  success: 200,  failure: 8  },
  { hour: "6 AM",  success: 900,  failure: 18 },
  { hour: "8 AM",  success: 1800, failure: 30 },
  { hour: "10 AM", success: 2400, failure: 38 },
  { hour: "12 PM", success: 3200, failure: 52 },
  { hour: "2 PM",  success: 3800, failure: 60 },
  { hour: "4 PM",  success: 3600, failure: 55 },
  { hour: "6 PM",  success: 2800, failure: 42 },
  { hour: "8 PM",  success: 1500, failure: 25 },
];

// ── Tooltips ──────────────────────────────────────────────────────────────────
function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ iconBg, icon, label, value, ratePct, rateColor, changePct, changeDir, sub }) {
  const up = changeDir === "up";
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500 mb-0.5">{label}</p>
          <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs font-semibold ${rateColor}`}>{ratePct}</span>
            <span className="text-xs text-gray-400">vs last 30 days</span>
            <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? "text-green-600" : "text-red-500"}`}>
              {up ? "↑" : "↓"} {changePct}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SuccessFailureReport() {
  const [trendRange, setTrendRange] = useState("7D");
  const [hourlyRange, setHourlyRange] = useState("Today");

  const total = distributionData.reduce((s, d) => s + d.value, 0);

  const [dateRange, setDateRange] = useState(null);

    const handleDateChange = (dateData) => {
        if (dateData) {
            setDateRange(dateData);
            console.log('Date Range Selected:', {
                startDate: dateData.startDate,
                endDate: dateData.endDate,
                startFormatted: dateData.startFormatted,
                endFormatted: dateData.endFormatted,
                dateRange: dateData.dateRange
            });
            // Fetch data for selected date range here
            // fetchDashboardData(dateData.startDate, dateData.endDate);
        } else {
            console.log('Date range cleared');
            // Handle clearing date range
        }
    };
  return (
    <div className="min-h-screen">

      {/* ── Page Header ── */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Success / Failure Report</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Reports <span className="mx-1">›</span>
          <span className="text-gray-600">Success / Failure Report</span>
        </p>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <DateRangePicker 
                        onDateChange={handleDateChange}
                        placeholder="14 May, 2025 - 14 May, 2025"
                    />
        {["All Merchants", "All APIs", "All Statuses"].map(f => (
          <div key={f} className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none cursor-pointer hover:border-gray-300">
              <option>{f}</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ))}

        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors ">
          Apply Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 rounded-lg transition-colors ">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Report
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        <StatCard
          iconBg="bg-green-50"
          icon={<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Successful Transactions" value="25,430"
          ratePct="98.42%" rateColor="text-green-600"
          changePct="13.2%" changeDir="up"
        />
        <StatCard
          iconBg="bg-red-50"
          icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Failed Transactions" value="412"
          ratePct="1.58%" rateColor="text-red-500"
          changePct="8.7%" changeDir="down"
        />
        <StatCard
          iconBg="bg-orange-50"
          icon={<svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Pending Transactions" value="56"
          ratePct="0.22%" rateColor="text-orange-400"
          changePct="3.1%" changeDir="down"
        />
        <StatCard
          iconBg="bg-blue-50"
          icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Success Amount" value="₹12.35 Cr"
          ratePct="98.25%" rateColor="text-green-600"
          changePct="15.6%" changeDir="up"
        />
        <StatCard
          iconBg="bg-red-50"
          icon={<svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Failed Amount" value="₹18.90 L"
          ratePct="1.50%" rateColor="text-red-500"
          changePct="6.2%" changeDir="down"
        />
      </div>

      {/* ── Middle Row: Line Chart + Donut ── */}
      <div className="grid grid-cols-12 gap-4 mb-4">

        {/* Success vs Failure Trend */}
        <div className="col-span-7 bg-white rounded-xl border border-gray-100  p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-800">Success vs Failure Trend</h2>
            <div className="flex gap-1">
              {["7D", "30D", "90D"].map(r => (
                <button key={r} onClick={() => setTrendRange(r)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    trendRange === r ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}>{r}</button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-3">
            {[
              { color: "#16a34a", label: "Success" },
              { color: "#dc2626", label: "Failure" },
              { color: "#f59e0b", label: "Pending" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-xs text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="successFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                tickFormatter={v => v >= 1000 ? `${v/1000}K` : v} />
              <Tooltip content={<TrendTooltip />} />
              <Line type="monotone" dataKey="success" stroke="#16a34a" strokeWidth={2.5}
                dot={{ r: 4, fill: "#16a34a", strokeWidth: 0 }} activeDot={{ r: 5 }} name="Success" />
              <Line type="monotone" dataKey="failure" stroke="#dc2626" strokeWidth={2}
                dot={{ r: 4, fill: "#dc2626", strokeWidth: 0 }} activeDot={{ r: 5 }} name="Failure" />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2}
                dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }} activeDot={{ r: 5 }} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Success vs Failure Distribution */}
        <div className="col-span-5 bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Success vs Failure Distribution</h2>
          <div className="flex items-center gap-5">
            {/* Donut */}
            <div className="relative flex-shrink-0">
              <PieChart width={170} height={170}>
                <Pie data={distributionData} cx={82} cy={82} innerRadius={56} outerRadius={78}
                  dataKey="value" strokeWidth={2} stroke="#fff" startAngle={90} endAngle={-270}>
                  {distributionData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</span>
                <span className="text-[11px] text-gray-400">Total</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2.5">
              {distributionData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600 w-16">{d.name}</span>
                  <span className="text-xs font-semibold text-gray-800">
                    {d.value.toLocaleString()} ({((d.value/total)*100).toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Failure Reasons + Failure by API + Hourly ── */}
      <div className="grid grid-cols-12 gap-4">

        {/* Failure Reasons */}
        <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Failure Reasons</h2>
          <div className="flex items-center gap-4">
            {/* Pie */}
            <div className="relative flex-shrink-0">
              <PieChart width={140} height={140}>
                <Pie data={failureReasonData} cx={68} cy={68} innerRadius={44} outerRadius={64}
                  dataKey="value" strokeWidth={2} stroke="#fff">
                  {failureReasonData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-gray-900">412</span>
                <span className="text-[10px] text-gray-400">Total Failed</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2">
              {failureReasonData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                  <span className="text-xs font-semibold text-gray-800 ml-auto pl-2">
                    {d.pct} ({d.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-4 flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline">
            View Failure Reasons Report
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Failure by API */}
        <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Failure by API</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 font-semibold text-gray-500">API</th>
                <th className="text-right pb-2 font-semibold text-gray-500">Failed Txns</th>
                <th className="text-right pb-2 font-semibold text-gray-500">Failed Amount</th>
                <th className="text-right pb-2 font-semibold text-gray-500">Failure Rate</th>
              </tr>
            </thead>
            <tbody>
              {failureByApi.map(r => (
                <tr key={r.api} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 text-gray-800 font-medium">{r.api}</td>
                  <td className="py-2.5 text-right text-gray-700">{r.failed}</td>
                  <td className="py-2.5 text-right text-gray-700">{r.amount}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-gray-700">{r.rate}</span>
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-400 rounded-full" style={{ width: `${r.bar}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-4 flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline">
            View API Failure Report
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Hourly Success vs Failure */}
        <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-800">Hourly Success vs Failure</h2>
            <div className="relative">
              <select value={hourlyRange} onChange={e => setHourlyRange(e.target.value)}
                className="appearance-none pl-3 pr-6 py-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-pointer">
                <option>Today</option>
                <option>Yesterday</option>
              </select>
              <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-2">
            {[{ color: "#16a34a", label: "Success" }, { color: "#dc2626", label: "Failure" }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="text-xs text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={188}>
            <BarChart data={hourlyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                tickFormatter={v => v >= 1000 ? `${v/1000}K` : v} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="success" fill="#16a34a" radius={[2, 2, 0, 0]} name="Success" maxBarSize={14} />
              <Bar dataKey="failure" fill="#dc2626" radius={[2, 2, 0, 0]} name="Failure" maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>

          <button className="mt-2 flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline ml-auto">
            View Hourly Report
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
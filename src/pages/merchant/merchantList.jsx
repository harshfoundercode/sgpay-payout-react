import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


// ── Sample Data ──────────────────────────────────────────────────────────────
const MERCHANTS = [
  { id: "MER12548", company: "ABC Pvt Ltd", contact: "Amit Kumar", mobile: "+91 9876543210", email: "amit.kumar@abc.com", balance: "₹ 2,45,678.50", status: "Active", onboarding: "Approved", created: "14 May 2025, 10:30 AM" },
  { id: "MER12547", company: "XYZ Retailers", contact: "Rohit Sharma", mobile: "+91 9123456780", email: "rohit.sharma@xyz.com", balance: "₹ 1,85,320.00", status: "Active", onboarding: "Approved", created: "14 May 2025, 09:15 AM" },
  { id: "MER12546", company: "Global Solutions", contact: "Neha Verma", mobile: "+91 9988776655", email: "neha.verma@globals.com", balance: "₹ 0.00", status: "Pending Approval", onboarding: "In Review", created: "13 May 2025, 05:20 PM" },
  { id: "MER12545", company: "Techno Softwares", contact: "Vikram Singh", mobile: "+91 9001122334", email: "vikram.singh@techno.com", balance: "₹ 75,430.75", status: "Inactive", onboarding: "Rejected", created: "13 May 2025, 02:10 PM" },
  { id: "MER12544", company: "Quick Pay Services", contact: "Priya Patel", mobile: "+91 9898989898", email: "priya.patel@quickpay.com", balance: "₹ 3,25,100.25", status: "Active", onboarding: "Approved", created: "12 May 2025, 11:45 AM" },
  { id: "MER12543", company: "Future Enterprises", contact: "Sanjay Gupta", mobile: "+91 9870098700", email: "sanjay.gupta@future.com", balance: "₹ 1,20,450.00", status: "Active", onboarding: "Approved", created: "12 May 2025, 10:05 AM" },
  { id: "MER12542", company: "Digital Store Pvt", contact: "Karan Mehta", mobile: "+91 9911223344", email: "karan.mehta@digitalstore.com", balance: "₹ 56,780.00", status: "Active", onboarding: "Approved", created: "11 May 2025, 04:30 PM" },
  { id: "MER12541", company: "Skyline Traders", contact: "Anjali Desai", mobile: "+91 9823456789", email: "anjali.desai@skyline.com", balance: "₹ 0.00", status: "Inactive", onboarding: "On Hold", created: "11 May 2025, 01:20 PM" },
  { id: "MER12540", company: "Pay Fast Solutions", contact: "Mohit Jain", mobile: "+91 9712345678", email: "mohit.jain@payfast.com", balance: "₹ 8,90,670.45", status: "Active", onboarding: "Approved", created: "10 May 2025, 09:10 AM" },
  { id: "MER12539", company: "Easy Checkout", contact: "Ritika Bansal", mobile: "+91 9301234567", email: "ritika.bansal@easycheckout.com", balance: "₹ 45,230.10", status: "Active", onboarding: "Approved", created: "09 May 2025, 06:40 PM" },
];

// ── Badge Components ──────────────────────────────────────────────────────────
const STATUS_STYLES = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  "Pending Approval": "bg-yellow-100 text-yellow-700",
};
const ONBOARDING_STYLES = {
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-600",
  "In Review": "bg-orange-100 text-orange-600",
  "On Hold": "bg-purple-100 text-purple-700",
};

function Badge({ label, styleMap }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${styleMap[label] ?? "bg-gray-100 text-gray-600"}`}>
      {label}
    </span>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, label, value, sub, subColor }) {
  return (
    <div className="bg-white rounded-xl p-2 border border-gray-100 flex items-center gap-4">
      <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-xs text-gray-500 truncate">{label}</p>
        <p className="text-[18px] font-bold text-gray-900 leading-tight truncate">{value}</p>
        {sub && <p className={`text-xs font-semibold ${subColor ?? "text-gray-500"}`}>{sub}</p>}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MerchantListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const totalPages = 125;
  const navigate = useNavigate();


  const filtered = MERCHANTS.filter(m =>
    search === "" ||
    m.id.toLowerCase().includes(search.toLowerCase()) ||
    m.company.toLowerCase().includes(search.toLowerCase()) ||
    m.contact.toLowerCase().includes(search.toLowerCase())
  );
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const statusOptions = ["All Status", "Active", "Inactive", "Pending", "Completed", "Cancelled"];

  return (
    <div className="min-h-screen">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Merchant List</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Dashboard <span className="mx-1">›</span> Merchants <span className="mx-1">›</span>
            <span className="text-gray-600">Merchant List</span>
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button
            onClick={() => navigate("/create-merchant")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Merchant
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        <StatCard
          iconBg="bg-blue-50"
          icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          label="Total Merchants" value="1,248" sub="All Time"
        />
        <StatCard
          iconBg="bg-green-50"
          icon={<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Active Merchants" value="1,102" sub="88.28%" subColor="text-green-600"
        />
        <StatCard
          iconBg="bg-red-50"
          icon={<svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
          label="Inactive Merchants" value="98" sub="7.85%" subColor="text-red-500"
        />
        <StatCard
          iconBg="bg-orange-50"
          icon={<svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Pending Approval" value="48" sub="3.85%" subColor="text-orange-500"
        />
        <StatCard
          iconBg="bg-purple-50"
          icon={<svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          label="Total Volume (30D)" value="₹ 12,85,43,210.75" sub="↑ 18.62% vs prev 30D" subColor="text-green-600"
        />
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

        {/* Filter Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by Merchant ID / Name / Contact"
              className="w-72 pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="relative">
  <select 
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="appearance-none pl-3 pr-8 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
  >
    {statusOptions.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>


          <button className="ml-auto flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Merchant ID ↕", "Company Name", "Contact Person", "Mobile", "Email", "Balance", "Status", "Created Date", "Actions"].map(col => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/merchants/${m.id}`)}
                      className="font-semibold text-gray-600 hover:underline whitespace-nowrap text-xs"
                    >
                      {m.id}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap truncate text-xs">{m.company}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap truncate text-xs">{m.contact}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap truncate text-xs">{m.mobile}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap truncate text-xs">{m.email}</td>
                  <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap  truncate text-xs">{m.balance}</td>
                  <td className="px-4 py-3 whitespace-nowrap  truncate text-xs"><Badge label={m.status} styleMap={STATUS_STYLES} /></td>
                  {/* <td className="px-4 py-3 whitespace-nowrap  truncate text-xs"><Badge label={m.onboarding} styleMap={ONBOARDING_STYLES} /></td> */}
                  <td className="px-4 py-3 text-gray-500  whitespace-nowrap  truncate text-xs">{m.created}</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing 1 to 10 of 1,248 results</p>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 mr-3">
              <span className="text-sm text-gray-500">10 per page</span>
              <select className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none">
                <option>10</option><option>25</option><option>50</option>
              </select>
            </div>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-base">‹</button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                {p}
              </button>
            ))}
            <span className="text-gray-400 px-1 text-sm">...</span>
            <button onClick={() => setPage(totalPages)}
              className="w-10 h-8 flex items-center justify-center rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              {totalPages}
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-base">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
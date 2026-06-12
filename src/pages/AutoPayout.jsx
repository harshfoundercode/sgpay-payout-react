import { useState } from "react";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-green-500" : "bg-gray-300"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

const StatusBadge = ({ active }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${active ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
    {active ? "Active" : "Inactive"}
  </span>
);

const ThreeDotMenu = () => (
  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
    </svg>
  </button>
);

const SearchInput = ({ placeholder }) => (
  <div className="relative">
    <input
      className="pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-44"
      placeholder={placeholder}
    />
    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  </div>
);

const merchantData = [
  { name: "ABC Pvt Ltd", id: "MER12548", enabled: true, threshold: "₹50,000.00", rule: "Balance >= Threshold\nImmediate (Once)", lastPayout: "14 May 2025, 10:15 AM", active: true },
  { name: "XYZ Retailers", id: "MER12547", enabled: true, threshold: "₹75,000.00", rule: "Balance >= Threshold\nImmediate (Once)", lastPayout: "14 May 2025, 09:40 AM", active: true },
  { name: "Global Solutions", id: "MER12546", enabled: false, threshold: "–", rule: "–", lastPayout: "–", active: false },
  { name: "Quick Pay Services", id: "MER12544", enabled: true, threshold: "₹1,00,000.00", rule: "Balance >= Threshold\nImmediate (Once)", lastPayout: "14 May 2025, 08:20 AM", active: true },
  { name: "Prime Business", id: "MER12542", enabled: false, threshold: "–", rule: "–", lastPayout: "–", active: false },
];

const apiData = [
  { name: "RazorpayX Payout", provider: "RazorpayX", enabled: true, threshold: "₹50,000.00", rule: "Balance >= Threshold\nImmediate (Once)", lastPayout: "14 May 2025, 10:10 AM", active: true },
  { name: "Cashfree Payout", provider: "Cashfree", enabled: true, threshold: "₹75,000.00", rule: "Balance >= Threshold\nImmediate (Once)", lastPayout: "14 May 2025, 09:25 AM", active: true },
  { name: "Paytm Payouts", provider: "Paytm", enabled: false, threshold: "–", rule: "–", lastPayout: "–", active: false },
  { name: "PhonePe Payout", provider: "PhonePe", enabled: true, threshold: "₹1,00,000.00", rule: "Balance >= Threshold\nImmediate (Once)", lastPayout: "14 May 2025, 08:05 AM", active: true },
  { name: "Amazon Pay Payout", provider: "Amazon Pay", enabled: false, threshold: "–", rule: "–", lastPayout: "–", active: false },
];

const TableSection = ({ title, searchPlaceholder, headers, rows, onToggle }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      <SearchInput placeholder={searchPlaceholder} />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/60 border-b border-gray-100">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
              <td className="px-4 py-3.5 text-xs font-medium text-gray-800">{row.col1}</td>
              <td className="px-4 py-3.5 text-xs font-medium text-gray-800">{row.col2}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Toggle enabled={row.enabled} onChange={(v) => onToggle(i, v)} />
                  <span className={`text-xs font-medium ${row.enabled ? "text-gray-800" : "text-gray-400"}`}>
                    {row.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-xs font-medium  text-gray-800">{row.threshold}</td>
              <td className="px-4 py-3.5">
                {row.rule === "–" ? (
                  <span className="text-xs text-gray-400">–</span>
                ) : (
                  <div>
                    {row.rule.split("\n").map((line, j) => (
                      <div key={j} className={`text-xs ${j === 0 ? "text-gray-800 font-medium" : "text-gray-800"}`}>{line}</div>
                    ))}
                  </div>
                )}
              </td>
              <td className="px-4 py-3.5 text-xs font-medium text-gray-800 whitespace-nowrap">{row.lastPayout}</td>
              <td className="px-4 py-3.5"><StatusBadge active={row.active} /></td>
              <td className="px-4 py-3.5"><ThreeDotMenu /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function AutoPayout() {
  const [activeTab, setActiveTab] = useState("merchant");
  const [merchants, setMerchants] = useState(merchantData);
  const [apis, setApis] = useState(apiData);

  const toggleMerchant = (idx, val) =>
    setMerchants((prev) => prev.map((m, i) => i === idx ? { ...m, enabled: val, active: val } : m));
  const toggleApi = (idx, val) =>
    setApis((prev) => prev.map((a, i) => i === idx ? { ...a, enabled: val, active: val } : a));

  const merchantRows = merchants.map((m) => ({ col1: m.name, col2: m.id, enabled: m.enabled, threshold: m.threshold, rule: m.rule, lastPayout: m.lastPayout, active: m.active }));
  const apiRows = apis.map((a) => ({ col1: a.name, col2: a.provider, enabled: a.enabled, threshold: a.threshold, rule: a.rule, lastPayout: a.lastPayout, active: a.active }));

  const merchantHeaders = ["Merchant Name", "Merchant ID", "Auto Payout", "Threshold Amount (₹)", "Trigger Rules", "Last Payout", "Status", "Actions"];
  const apiHeaders = ["API Name", "Provider", "Auto Payout", "Threshold Amount (₹)", "Trigger Rules", "Last Payout", "Status", "Actions"];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Auto Payout</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure auto payout settings for merchants and payout APIs.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        <button
          onClick={() => setActiveTab("merchant")}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors -mb-px ${activeTab === "merchant" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          By Merchant
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors -mb-px ${activeTab === "api" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          By Payout API
        </button>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5 text-xs text-blue-700">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 flex-shrink-0">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <span>
          {activeTab === "merchant"
            ? "Enable and configure auto payout settings for each merchant."
            : "Enable and configure auto payout settings for each payout API."}
        </span>
      </div>

      {/* Tables */}
      {activeTab === "merchant" ? (
        <>
          <TableSection
            title="Merchant Auto Payout Settings"
            searchPlaceholder="Search Merchant"
            headers={merchantHeaders}
            rows={merchantRows}
            onToggle={toggleMerchant}
          />
         
        </>
      ) : (
        <TableSection
          title="Payout API Auto Payout Settings"
          searchPlaceholder="Search Payout API"
          headers={apiHeaders}
          rows={apiRows}
          onToggle={toggleApi}
        />
      )}

      {/* Note Banner */}
      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-blue-700">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 flex-shrink-0 mt-0.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <div>
          <span className="font-semibold text-blue-800 text-xs">Note</span>
          <p className="text-blue-600 mt-0.5 text-xs">Auto payout will be triggered automatically based on the configured threshold and rules.</p>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  House, CreditCard, Store, Zap, GitBranch, RefreshCw,
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
import DashboardPage from "../pages/Dashboard";
import TransactionScreen from "../pages/TransactionSceen";



const navItems = [
  { id: "dashboard", label: "Dashboard", Icon: House },
  { id: "transactions", label: "Transactions", Icon: CreditCard, hasChevron: true },
  { id: "merchants", label: "Merchants", Icon: Store },
  { id: "payout-apis", label: "Payout APIs", Icon: Zap, hasChevron: true },
  { id: "routing", label: "Routing", Icon: GitBranch, hasChevron: true },
  { id: "auto-payout", label: "Auto Payout", Icon: RefreshCw },
  { id: "balances", label: "Balances & Limits", Icon: Scale, hasChevron: true },
  { id: "reports", label: "Reports", Icon: FileText, hasChevron: true },
  { id: "reconciliation", label: "Reconciliation", Icon: GitMerge },
  { id: "webhooks", label: "Webhooks", Icon: Webhook },
  { id: "alerts", label: "Alerts", Icon: Bell, badge: 12 },
  { id: "users", label: "Users & Roles", Icon: Users },
  { id: "logs", label: "Logs", Icon: FileCode, hasChevron: true },
  { id: "settings", label: "Settings", Icon: Settings },
  { id: "system", label: "System", Icon: Monitor, hasChevron: true },
];


const PAGES = {
  "dashboard": <DashboardPage />,
  "transactions": <TransactionScreen />,
  "merchants": <DashboardPage />,
  "payout-apis": <DashboardPage />,
  "routing": <DashboardPage />,
  "auto-payout": <DashboardPage />,
  "balances": <DashboardPage />,
  "reports": <DashboardPage />,
  "reconciliation": <DashboardPage />,
  "webhooks": <DashboardPage />,
  "alerts": <DashboardPage />,
  "users": <DashboardPage />,
  "logs": <DashboardPage />,
  "settings": <DashboardPage />,
  "system": <DashboardPage />,
};


export default function BridgeAdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-[#01132B] flex flex-col shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200`}>
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
          </div>
          {!collapsed && <span className="text-white font-bold text-[15px] tracking-wide">Bridge Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map(({ id, label, Icon, badge, hasChevron }) => (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg text-left transition-colors
                ${activePage === id ? "bg-[#3A7EFD] text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
            >
              <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                <Icon size={16} className="flex-shrink-0" />
                {!collapsed && <span className="text-[13px]">{label}</span>}
              </div>
              {!collapsed && badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{badge}</span>
              )}
              {!collapsed && !badge && hasChevron && (
                <ChevronDown size={13} className="opacity-40" />
              )}
            </button>
          ))}
        </nav>

        {/* Kill Switch */}
        <div className="p-3 border-t border-white/10">
          {!collapsed && (
            <div className="bg-[#243047] rounded-xl p-3 mb-2">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert size={13} className="text-gray-300" />
                <span className="text-white text-xs font-semibold">Kill Switch</span>
              </div>
              <p className="text-gray-400 text-[11px]">Stop all payouts instantly</p>
            </div>
          )}
          <button className={`w-full bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors ${collapsed ? "p-2" : "py-2.5 text-xs font-bold"}`}>
            <Power size={collapsed ? 16 : 13} />
            {!collapsed && "STOP ALL PAYOUTS"}
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-gray-600 p-1">
            <Menu size={20} />
          </button>
          <div className="flex-1 max-w-md relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Search by Transaction ID / Merchant / UTR / Order ID" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">18</span>
            </div>
            <Moon size={18} className="text-gray-400 cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
              <div>
                <p className="text-xs font-semibold text-gray-800">Super Admin</p>
                <p className="text-[10px] text-gray-400">Administrator</p>
              </div>
              <ChevronDown size={13} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {PAGES[activePage] || <DashboardPage />}
        </main>
      </div>
    </div>
  );
}
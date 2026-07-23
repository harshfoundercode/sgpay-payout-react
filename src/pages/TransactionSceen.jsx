import { useState, useEffect } from "react";
import DateRangePicker from "../components/DatePicker";
import transactionService from "../services/TransactionServices";
import merchantService from "../services/MerchantListServices";
import { ChevronDown } from "lucide-react";
import TransactionExportScreen from '../pages/export/TransactionScreenExport';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ─── Icons (inline SVG helpers) ────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={d} />
    </svg>
);

const icons = {
    chevronDown: "M19 9l-7 7-7-7",
    chevronRight: "M9 18l6-6-6-6",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    filter: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
    download: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    menu: "M4 6h16M4 12h16M4 18h16",
    moreVertical: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    refresh: "M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 005.64 5.64L1 10 M23 14l-4.64 4.36A9 9 0 013.51 15",
    undo: "M3 7v6h6 M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13",
    arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
    copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    check: "M20 6L9 17l-5-5",
    sun: "M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
};

// ─── API Logos (colored text badges) ──────────────────────────────────────
const ApiLogo = ({ api }) => {
    const map = {
        Razorpay: { bg: "bg-blue-50", text: "text-blue-700", label: "R" },
        RazorpayX: { bg: "bg-blue-50", text: "text-blue-700", label: "R" },
        Cashfree: { bg: "bg-green-50", text: "text-green-700", label: "C" },
        "Paytm Payouts": { bg: "bg-sky-50", text: "text-sky-700", label: "P" },
        Paytm: { bg: "bg-sky-50", text: "text-sky-700", label: "P" },
        Easebuzz: { bg: "bg-indigo-50", text: "text-indigo-700", label: "E" },
        EaseBuzz: { bg: "bg-indigo-50", text: "text-indigo-700", label: "E" },
        "Yes Bank API": { bg: "bg-purple-50", text: "text-purple-700", label: "Y" },
        PaySharp: { bg: "bg-pink-50", text: "text-pink-700", label: "P" },
        Stripe: { bg: "bg-blue-50", text: "text-blue-700", label: "S" },
        "Stripe IN": { bg: "bg-blue-50", text: "text-blue-700", label: "S" },
        PayGlocal: { bg: "bg-teal-50", text: "text-teal-700", label: "PG" },
        CCAvenue: { bg: "bg-orange-50", text: "text-orange-700", label: "C" },
        BillDesk: { bg: "bg-cyan-50", text: "text-cyan-700", label: "B" },
        Digio: { bg: "bg-violet-50", text: "text-violet-700", label: "D" },
        Airpay: { bg: "bg-rose-50", text: "text-rose-700", label: "A" },
        "Provider A Updated": { bg: "bg-gray-100", text: "text-gray-600", label: "P" },
    };
    const s = map[api] || { bg: "bg-gray-100", text: "text-gray-600", label: "?" };
    return (
        <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold ${s.bg} ${s.text}`}>
            <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold bg-white border ${s.text} border-current`}>{s.label}</span>
            <span className="hidden sm:inline">{api}</span>
            <span className="sm:hidden">{api?.charAt(0) || '?'}</span>
        </span>
    );
};

// ─── Status Badge ──────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const statusMap = {
        success: "bg-green-100 text-green-700 border border-green-200",
        failed: "bg-red-100 text-red-700 border border-red-200",
        processing: "bg-blue-100 text-blue-700 border border-blue-200",
        returned: "bg-orange-100 text-orange-700 border border-orange-200",
        reversed: "bg-purple-100 text-purple-700 border border-purple-200",
        initiated: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    };

    const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || status || 'Unknown';
    const key = status?.toLowerCase() || '';
    const matchedKey = Object.keys(statusMap).find(k => k === key);

    return (
        <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${statusMap[matchedKey] || "bg-gray-100 text-gray-600"}`}>
            {displayStatus}
        </span>
    );
};

// ─── Transactions Page ─────────────────────────────────────────────────────
const TransactionsPage = ({ onViewDetails, onExportClick }) => {
    const [activeTab, setActiveTab] = useState("all");
    const [openMenu, setOpenMenu] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionData, setTransactionData] = useState({
        data: [],
        stats: {
            all_count: 0,
            initiated: "0",
            processing: "0",
            success: "0",
            failed: "0",
            returned: "0"
        },
        total: 0,
        totalPages: 0,
        page: 1,
        limit: 10
    });

    // ─── Filter States ───
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedMerchant, setSelectedMerchant] = useState("");
    const [selectedApi, setSelectedApi] = useState("");
    const [merchants, setMerchants] = useState([]);
    const [loadingMerchants, setLoadingMerchants] = useState(false);

    // ─── Dropdown Open States ───
    const [isMerchantOpen, setIsMerchantOpen] = useState(false);
    const [isApiOpen, setIsApiOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    // ─── API Status Options ───
    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "success", label: "Success" },
        { value: "failed", label: "Failed" },
        { value: "initiated", label: "Initiated" },
        { value: "processing", label: "Processing" },
        { value: "returned", label: "Returned" },
    ];

    // ─── Tab counts from API ───
    const tabs = [
        { label: "All", key: "all", count: transactionData.stats?.all_count || 0 },
        { label: "Initiated", key: "initiated", count: parseInt(transactionData.stats?.initiated) || 0 },
        { label: "Processing", key: "processing", count: parseInt(transactionData.stats?.processing) || 0 },
        { label: "Success", key: "success", count: parseInt(transactionData.stats?.success) || 0 },
        { label: "Failed", key: "failed", count: parseInt(transactionData.stats?.failed) || 0 },
        { label: "Returned", key: "returned", count: parseInt(transactionData.stats?.returned) || 0 },
    ];

    // ─── Fetch Merchants ──────────────────────────────────────────────────────
    const fetchMerchants = async () => {
        setLoadingMerchants(true);
        try {
            const response = await merchantService.getMerchants({ limit: 100 });
            if (response.data) {
                setMerchants(response.data);
            }
        } catch (err) {
            console.error('Error fetching merchants:', err);
        } finally {
            setLoadingMerchants(false);
        }
    };

    useEffect(() => {
        fetchMerchants();
    }, []);

    // ─── Helper function to format date as DD-M-YYYY ──────────────────────────
    const formatDateForApi = (dateStr) => {
        if (!dateStr) return '';

        try {
            // Try to parse as Date object first
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }

            // If Date parsing fails, parse the string (format: "Jul 24, 2026")
            const cleaned = dateStr.replace(/,/g, '').trim();
            const parts = cleaned.split(' ');

            if (parts.length === 3) {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthIndex = monthNames.indexOf(parts[0]);
                if (monthIndex !== -1) {
                    const day = parseInt(parts[1]);
                    const year = parts[2];
                    const month = monthIndex + 1;
                    return `${day}-${month}-${year}`;
                }
            }

            // If all else fails, return original
            return dateStr;
        } catch (e) {
            console.warn('Date formatting error:', e);
            return dateStr;
        }
    };

    // ─── Fetch transactions ──────────────────────────────────────────────────
    // const fetchTransactions = async () => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const params = {
    //             page: page,
    //             limit: limit
    //         };

    //         if (searchTerm) {
    //             params.search = searchTerm;
    //         }

    //         if (activeTab !== "all") {
    //             params.status = activeTab;
    //         } else if (selectedStatus) {
    //             params.status = selectedStatus;
    //         }

    //         if (selectedMerchant) {
    //             params.merchant_id = selectedMerchant;
    //         }

    //         if (selectedApi) {
    //             params.api_used = selectedApi;
    //         }

    //         if (dateRange) {
    //             params.from_date = dateRange.startFormatted;
    //             params.to_date = dateRange.endFormatted;
    //         }

    //         const response = await transactionService.getTransactions(params);
    //         setTransactionData(response);
    //     } catch (err) {
    //         console.error('Error fetching transactions:', err);
    //         setError('Failed to load transactions. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // ─── Fetch transactions ──────────────────────────────────────────────────
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = {
                page: page,
                limit: limit
            };

            if (searchTerm) {
                params.search = searchTerm;
            }

            if (activeTab !== "all") {
                params.status = activeTab;
            } else if (selectedStatus) {
                params.status = selectedStatus;
            }

            if (selectedMerchant) {
                params.merchant_id = selectedMerchant;
            }

            if (selectedApi) {
                params.api_used = selectedApi;
            }

            if (dateRange) {
                // Format dates as DD-M-YYYY
                params.from_date = formatDateForApi(dateRange.startFormatted);
                params.to_date = formatDateForApi(dateRange.endFormatted);
            }

            console.log('API Params:', params);

            const response = await transactionService.getTransactions(params);
            setTransactionData(response);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to load transactions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Fetch data on dependency change ────────────────────────────────────
    useEffect(() => {
        fetchTransactions();
    }, [page, limit, activeTab, dateRange, selectedMerchant, selectedApi, selectedStatus]);

    // ─── Debounced search ──────────────────────────────────────────────────
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== undefined) {
                setPage(1);
                fetchTransactions();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // ─── Filter Handlers ─────────────────────────────────────────────────────
    const handleMerchantSelect = (merchantId) => {
        setSelectedMerchant(merchantId);
        setIsMerchantOpen(false);
        setPage(1);
    };

    const handleApiSelect = (api) => {
        setSelectedApi(api);
        setIsApiOpen(false);
        setPage(1);
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
        setActiveTab("all");
        setPage(1);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
        setSelectedMerchant("");
        setSelectedApi("");
        setDateRange(null);
        setActiveTab("all");
        setPage(1);
    };

    const handleDateChange = (dateData) => {
        if (dateData) {
            setDateRange(dateData);
            setPage(1);
        } else {
            setDateRange(null);
            setPage(1);
        }
    };

    const handleRefresh = () => {
        fetchTransactions();
    };

    // ─── Format helpers ──────────────────────────────────────────────────────
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatCurrency = (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num)) return '₹ 0.00';
        return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const getStatusDisplay = (status) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const getApiNames = () => {
        const apiSet = new Set();
        transactionData.data.forEach(txn => {
            if (txn.api_name) {
                apiSet.add(txn.api_name);
            }
        });
        return Array.from(apiSet);
    };

    const transactions = transactionData.data || [];
    const totalItems = transactionData.total || 0;
    const totalPages = transactionData.totalPages || 0;

    // ─── Handle Export Click ────────────────────────────────────────────────
    const handleExportClick = () => {
        const filters = {};
        if (searchTerm) filters.search = searchTerm;
        if (activeTab !== "all") filters.status = activeTab;
        else if (selectedStatus) filters.status = selectedStatus;
        if (selectedMerchant) filters.merchant_id = selectedMerchant;
        if (selectedApi) filters.api_used = selectedApi;
        if (dateRange) {
            filters.from_date = dateRange.startFormatted;
            filters.to_date = dateRange.endFormatted;
        }
        onExportClick(filters, transactionData.total || 0);
    };

    return (
        <div className="p-3 sm:p-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Transactions</h1>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 mt-0.5 flex-wrap">
                        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                        <span className="text-gray-800">Transactions</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExportClick}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.download} /></svg>
                        Export
                    </button>
                </div>
            </div>

            {/* ─── Filters Bar ─── */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
                    <DateRangePicker
                        onDateChange={handleDateChange}
                        placeholder="Select date range"
                    />

                    {/* ── Merchant Dropdown ── */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMerchantOpen(!isMerchantOpen)}
                            className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 min-w-25"
                        >
                            {selectedMerchant ? merchants.find(m => m.merchant_id === selectedMerchant)?.merchant_id || 'Merchant' : 'Merchants'}
                            <ChevronDown size={10} sm:size={11} className={isMerchantOpen ? 'rotate-180' : ''} />
                        </button>
                        {isMerchantOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                    <button
                                        onClick={() => handleMerchantSelect("")}
                                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 rounded"
                                    >
                                        All Merchants
                                    </button>
                                    {loadingMerchants ? (
                                        <div className="text-center py-2 text-gray-400 text-xs">Loading...</div>
                                    ) : (
                                        merchants.map((merchant) => (
                                            <button
                                                key={merchant.id}
                                                onClick={() => handleMerchantSelect(merchant.merchant_id)}
                                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 rounded truncate"
                                            >
                                                {merchant.merchant_id}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── API Dropdown ── */}
                    <div className="relative">
                        <button
                            onClick={() => setIsApiOpen(!isApiOpen)}
                            className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 min-w-20"
                        >
                            {selectedApi || 'APIs'}
                            <ChevronDown size={10} sm:size={11} className={isApiOpen ? 'rotate-180' : ''} />
                        </button>
                        {isApiOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                    <button
                                        onClick={() => handleApiSelect("")}
                                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 rounded"
                                    >
                                        All APIs
                                    </button>
                                    {getApiNames().map((apiName) => (
                                        <button
                                            key={apiName}
                                            onClick={() => handleApiSelect(apiName)}
                                            className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 rounded truncate"
                                        >
                                            {apiName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Status Dropdown ── */}
                    <div className="relative">
                        <button
                            onClick={() => setIsStatusOpen(!isStatusOpen)}
                            className="flex items-center gap-1 sm:gap-1.5 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 bg-white hover:bg-gray-50 min-w-20"
                        >
                            {selectedStatus ? getStatusDisplay(selectedStatus) : 'Status'}
                            <ChevronDown size={10} sm:size={11} className={isStatusOpen ? 'rotate-180' : ''} />
                        </button>
                        {isStatusOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="p-2">
                                    {statusOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleStatusSelect(option.value)}
                                            className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 rounded"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── Search and Action Buttons ─── */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs flex-1 min-w-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
                        placeholder="Transaction ID / Order ID / UTR / Ref No."
                    />
                    <div className="flex gap-2 ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                        <button
                            onClick={clearFilters}
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={fetchTransactions}
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-300 text-blue-700 rounded-lg text-[11px] sm:text-xs font-medium hover:bg-blue-50 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {/* ─── Active Filters Display ─── */}
                {(selectedMerchant || selectedApi || selectedStatus || dateRange || searchTerm) && (
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Active Filters:</span>
                        {dateRange && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px]">
                                {dateRange.startFormatted} - {dateRange.endFormatted}
                            </span>
                        )}
                        {selectedMerchant && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px]">
                                Merchant: {selectedMerchant}
                            </span>
                        )}
                        {selectedApi && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px]">
                                API: {selectedApi}
                            </span>
                        )}
                        {selectedStatus && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px]">
                                Status: {getStatusDisplay(selectedStatus)}
                            </span>
                        )}
                        {searchTerm && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px]">
                                Search: {searchTerm}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* ─── Tabs & Table Container ─── */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100">
                <div className="flex border-b border-gray-100 px-2 sm:px-4 pt-2 sm:pt-3 pb-2 sm:pb-3 gap-1 overflow-x-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => { setActiveTab(tab.key); setPage(1); }}
                            className={`flex flex-col items-center px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg text-[11px] sm:text-sm font-medium transition-colors whitespace-nowrap border ${activeTab === tab.key
                                ? "bg-[#ECF2FE] text-blue-600 border-blue-500"
                                : "text-gray-600 border-gray-100 hover:bg-blue-50"
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] sm:text-xs font-bold mt-0.5 ${activeTab === tab.key ? "text-blue-600" :
                                tab.key === 'success' ? "text-green-600" :
                                    tab.key === 'failed' ? "text-red-600" :
                                        tab.key === 'returned' ? "text-orange-600" :
                                            tab.key === 'initiated' ? "text-yellow-600" :
                                                tab.key === 'processing' ? "text-blue-600" :
                                                    "text-gray-600"
                                }`}>
                                {tab.count.toLocaleString()}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ─── Loading State ─── */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-3 text-sm text-gray-500">Loading transactions...</p>
                        </div>
                    </div>
                )}

                {/* ─── Error State ─── */}
                {error && !loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-3 text-sm text-red-500">{error}</p>
                            <button
                                onClick={handleRefresh}
                                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* ─── Table ─── */}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-250">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="w-10 px-2 sm:px-4 py-2 sm:py-3"><span className="flex items-center text-xs sm:text-sm text-gray-700">#</span></th>
                                    {["Txn ID", "Order ID", "Merchant", "Beneficiary", "Amount", "API Used", "Status", "UTR / Ref No.", "Created At", "Actions"].map((h) => (
                                        <th key={h} className="px-2 sm:px-3 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="text-center py-12 text-gray-400 text-xs sm:text-sm">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((txn, index) => (
                                        <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors group">
                                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                                                <span className="flex items-center text-xs sm:text-sm text-gray-700">
                                                    {(transactionData.page - 1) * transactionData.limit + index + 1}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3">
                                                <span
                                                    className="text-[10px] sm:text-xs font-mono text-blue-600 whitespace-nowrap cursor-pointer hover:underline"
                                                    onClick={() => onViewDetails(txn)}
                                                >
                                                    {txn.trx_id || txn.id}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-600 font-mono whitespace-nowrap">
                                                {txn.order_id || 'N/A'}
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-800 font-medium whitespace-nowrap">
                                                {txn.merchant_name || 'N/A'}
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3">
                                                <div className="text-[10px] sm:text-xs font-medium text-gray-800">{txn.bene_name || 'N/A'}</div>
                                                <div className="text-[9px] sm:text-[11px] text-gray-500">{txn.phone || 'N/A'}</div>
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold text-gray-900 whitespace-nowrap">
                                                {formatCurrency(txn.amount)}
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3 whitespace-nowrap">
                                                <ApiLogo api={txn.api_name || 'N/A'} />
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3">
                                                <StatusBadge status={txn.status} />
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-600 font-mono whitespace-nowrap">
                                                {txn.utr || '–'}
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3">
                                                <div className="text-[10px] sm:text-xs text-gray-800">{formatDate(txn.created_at)}</div>
                                                <div className="text-[9px] sm:text-[11px] text-gray-500">{formatTime(txn.created_at)}</div>
                                            </td>
                                            <td className="px-2 sm:px-3 py-2 sm:py-3 relative">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === txn.id ? null : txn.id)}
                                                    className="p-1 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
                                                >
                                                    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                                                        <circle cx="12" cy="5" r="1.5" />
                                                        <circle cx="12" cy="12" r="1.5" />
                                                        <circle cx="12" cy="19" r="1.5" />
                                                    </svg>
                                                </button>
                                                {openMenu === txn.id && (
                                                    <div className="absolute right-0 top-8 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-44">
                                                        <button
                                                            onClick={() => { onViewDetails(txn); setOpenMenu(null); }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                                <path d={icons.eye} />
                                                            </svg>
                                                            View Details
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ─── Pagination ─── */}
                {!loading && !error && transactions.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <span>Rows per page:</span>
                            <select
                                value={limit}
                                onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }}
                                className="border border-gray-200 rounded px-2 py-1 text-xs sm:text-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-500 text-center">
                            Showing {(transactionData.page - 1) * transactionData.limit + 1} to {Math.min(transactionData.page * transactionData.limit, totalItems)} of {totalItems} transactions
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                            >
                                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => {
                                let p;
                                if (totalPages <= 5) {
                                    p = i + 1;
                                } else if (page <= 3) {
                                    p = i + 1;
                                } else if (page >= totalPages - 2) {
                                    p = totalPages - 4 + i;
                                } else {
                                    p = page - 2 + i;
                                }
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-medium ${page === p
                                            ? "bg-blue-600 text-white"
                                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages || 1, p + 1))}
                                disabled={page === totalPages || totalPages === 0}
                                className="p-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                            >
                                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Transaction Details Page ──────────────────────────────────────────────
const InfoRow = ({ label, value, mono }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-1.5 gap-1 sm:gap-0">
        <span className="text-[11px] sm:text-xs text-gray-800 font-semibold sm:w-32 shrink-0">{label}</span>
        <span className="hidden sm:inline text-gray-300 mx-2">:</span>
        <span className={`text-[11px] sm:text-xs font-medium text-gray-800 ${mono ? "font-mono" : ""} wrap-break-word`}>{value || "–"}</span>
    </div>
);

const StatusStep = ({ label, date, time, done, active }) => (
    <div className="flex flex-col items-center text-center px-1">
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${done || active ? "bg-green-500" : "bg-gray-200"}`}>
            {(done || active) ? (
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><path d="M20 6L9 17l-5-5" /></svg>
            ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            )}
        </div>
        <div className={`text-[10px] sm:text-xs font-semibold mt-1 ${active ? "text-green-600" : done ? "text-gray-700" : "text-gray-400"}`}>{label}</div>
        <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{date}</div>
        <div className="text-[9px] sm:text-[10px] text-gray-500">{time}</div>
    </div>
);

const TransactionDetails = ({ txn, onBack }) => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [downloadingReceipt, setDownloadingReceipt] = useState(false);
    const detailTabs = ["Overview"];

    if (!txn) {
        return (
            <div className="p-4 text-center text-gray-500">
                Transaction not found
            </div>
        );
    }

    // ─── Format helpers ──────────────────────────────────────────────────
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatCurrency = (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num)) return '₹ 0.00';
        return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const getStatusDisplay = (status) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // ─── Download Receipt PDF ──────────────────────────────────────────
    const downloadReceipt = async () => {
        setDownloadingReceipt(true);

        try {
            const doc = new jsPDF('portrait', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;

            // ─── Receipt Header ────────────────────────────────────────
            // Company Logo/Name
            doc.setFontSize(24);
            doc.setTextColor(30, 58, 138);
            doc.setFont('helvetica', 'bold');
            doc.text('Payment Receipt', pageWidth / 2, 25, { align: 'center' });

            // Divider
            doc.setDrawColor(59, 130, 246);
            doc.setLineWidth(0.5);
            doc.line(margin, 30, pageWidth - margin, 30);

            // Receipt Number
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            doc.text(`Receipt #: ${txn.trx_id || txn.id || 'N/A'}`, margin, 40);
            doc.text(`Date: ${formatDate(txn.created_at)} ${formatTime(txn.created_at)}`, pageWidth - margin - 50, 40);

            // ─── Status Badge ──────────────────────────────────────────
            const statusColor = {
                success: [16, 185, 129],
                failed: [239, 68, 68],
                processing: [59, 130, 246],
                initiated: [234, 179, 8],
                returned: [249, 115, 22]
            };

            const statusBgColor = {
                success: [236, 253, 245],
                failed: [254, 242, 242],
                processing: [239, 246, 255],
                initiated: [254, 252, 232],
                returned: [255, 247, 237]
            };

            const statusKey = txn.status?.toLowerCase() || '';
            const color = statusColor[statusKey] || [100, 100, 100];
            const bgColor = statusBgColor[statusKey] || [240, 240, 240];

            doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
            doc.setDrawColor(color[0], color[1], color[2]);
            doc.setFontSize(10);
            doc.setTextColor(color[0], color[1], color[2]);
            doc.setFont('helvetica', 'bold');



            // ─── Amount Section ────────────────────────────────────────
            let yPos = 55;

            // Amount Box
            doc.setFillColor(239, 246, 255);
            doc.setDrawColor(59, 130, 246);
            doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 30, 3, 3, 'FD');

            doc.setFontSize(11);
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            doc.text('Transaction Amount', margin + 5, yPos + 8);

            doc.setFontSize(20);
            doc.setTextColor(30, 58, 138);
            doc.setFont('helvetica', 'bold');
            doc.text(formatCurrency(txn.amount), margin + 5, yPos + 24);

            // ─── Transaction Details ──────────────────────────────────
            yPos += 45;

            // Section Title
            doc.setFontSize(12);
            doc.setTextColor(30, 58, 138);
            doc.setFont('helvetica', 'bold');
            doc.text('Transaction Details', margin, yPos);
            yPos += 6;

            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;

            // Details in two columns
            const col1 = margin;
            const col2 = pageWidth / 2 + 10;

            const details = [
                ['Transaction ID', txn.trx_id || txn.id || 'N/A'],
                ['Order ID', txn.order_id || 'N/A'],
                ['Merchant Name', txn.merchant_name || 'N/A'],
                ['Merchant ID', txn.merchant_id || 'N/A'],
                ['API Used', txn.api_name || 'N/A'],
                ['UTR / Ref No.', txn.utr || 'N/A'],
                ['Source IP', txn.source_ip || 'N/A'],
                ['Created At', `${formatDate(txn.created_at)} ${formatTime(txn.created_at)}`]
            ];

            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');

            details.forEach(([label, value], index) => {
                const x = index < 4 ? col1 : col2;
                const y = yPos + (index % 4) * 7;

                doc.setTextColor(100, 100, 100);
                doc.setFont('helvetica', 'bold');
                doc.text(label + ':', x, y);

                doc.setTextColor(30, 30, 30);
                doc.setFont('helvetica', 'normal');
                const valueX = x + 35;
                const maxWidth = 70;
                const wrappedValue = doc.splitTextToSize(value || '–', maxWidth);
                doc.text(wrappedValue, valueX, y);
            });

            yPos += 32;

            // ─── Beneficiary Details ──────────────────────────────────
            doc.setFontSize(12);
            doc.setTextColor(30, 58, 138);
            doc.setFont('helvetica', 'bold');
            doc.text('Beneficiary Information', margin, yPos);
            yPos += 6;

            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;

            const beneficiaryDetails = [
                ['Name', txn.bene_name || 'N/A'],
                ['Account Number', txn.account_number || 'N/A'],
                ['IFSC Code', txn.ifsc || 'N/A'],
                ['Bank Name', txn.bank_name || 'N/A'],
                ['Phone', txn.phone || 'N/A'],
                ['Email', txn.email || 'N/A']
            ];

            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);

            beneficiaryDetails.forEach(([label, value], index) => {
                const x = margin;
                const y = yPos + index * 7;

                doc.setTextColor(100, 100, 100);
                doc.setFont('helvetica', 'bold');
                doc.text(label + ':', x, y);

                doc.setTextColor(30, 30, 30);
                doc.setFont('helvetica', 'normal');
                const valueX = x + 35;
                const wrappedValue = doc.splitTextToSize(value || '–', 80);
                doc.text(wrappedValue, valueX, y);
            });

            // ─── Charges Section ──────────────────────────────────────
            yPos += 48;

            doc.setFontSize(12);
            doc.setTextColor(30, 58, 138);
            doc.setFont('helvetica', 'bold');
            doc.text('Charges Summary', margin, yPos);
            yPos += 6;

            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;

            const charges = [
                ['Charges', formatCurrency(txn.charges || 0)],
                ['GST', formatCurrency(txn.gst || 0)],
                ['Total Charges', formatCurrency(txn.total_charges || 0)]
            ];

            doc.setFontSize(9);
            charges.forEach(([label, value], index) => {
                const x = margin;
                const y = yPos + index * 7;

                doc.setTextColor(100, 100, 100);
                doc.setFont('helvetica', 'bold');
                doc.text(label + ':', x, y);

                doc.setTextColor(30, 58, 138);
                doc.setFont('helvetica', 'bold');
                const valueX = x + 35;
                doc.text(value, valueX, y);
            });

            // ─── Footer ────────────────────────────────────────────────
            yPos = pageHeight - 25;

            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 6;

            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.setFont('helvetica', 'normal');
            doc.text('This is a computer-generated receipt. No signature required.', pageWidth / 2, yPos + 3, { align: 'center' });
            doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, pageWidth / 2, yPos + 10, { align: 'center' });

            // ─── Download PDF ──────────────────────────────────────────
            const fileName = `Receipt_${txn.trx_id || txn.id || 'transaction'}_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

        } catch (err) {
            console.error('Error downloading receipt:', err);
            alert('Failed to download receipt. Please try again.');
        } finally {
            setDownloadingReceipt(false);
        }
    };

    return (
        <div className="p-3 sm:p-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Transaction Details</h1>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 mt-0.5 flex-wrap">
                        {["Dashboard", "Transactions", "Transaction Details"].map((b, i, arr) => (
                            <span key={b} className="flex items-center gap-1.5">
                                <span className={i === arr.length - 1 ? "text-gray-800" : "hover:text-blue-600 cursor-pointer"}>{b}</span>
                                {i < arr.length - 1 && <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button onClick={onBack} className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        Back
                    </button>
                    <button
                        onClick={downloadReceipt}
                        disabled={downloadingReceipt}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm ${downloadingReceipt ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {downloadingReceipt ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Downloading...
                            </>
                        ) : (
                            <>
                                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d={icons.download} /></svg>
                                Receipt
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Summary card */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 mb-3 sm:mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                    {[
                        { label: "Transaction ID", value: txn.trx_id || txn.id, extra: <StatusBadge status={txn.status} />, mono: true },
                        { label: "Order ID", value: txn.order_id || 'N/A', mono: true },
                        { label: "Amount", value: formatCurrency(txn.amount), big: true },
                        { label: "API Used", value: null, api: txn.api_name || 'N/A' },
                        { label: "UTR / Ref No.", value: txn.utr || '–', mono: true },
                        { label: "Created At", value: `${formatDate(txn.created_at)}, ${formatTime(txn.created_at)}` },
                    ].map((col) => (
                        <div key={col.label}>
                            <div className="text-[11px] sm:text-xs text-gray-500 mb-1">{col.label}</div>
                            {col.api ? (
                                <ApiLogo api={col.api} />
                            ) : (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`${col.big ? "text-base sm:text-xl font-bold text-gray-900" : "text-xs sm:text-sm font-semibold text-gray-800"} ${col.mono ? "font-mono" : ""} wrap-break-word`}>
                                        {col.value}
                                    </span>
                                    {col.extra}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100 px-2 sm:px-4 overflow-x-auto">
                    {detailTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 sm:px-4 py-2.5 sm:py-3.5 text-[12px] sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-600 border-transparent hover:text-gray-800"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "Overview" && (
                    <div className="p-3 sm:p-5">
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
                            {/* Left col */}
                            <div className="flex-1 lg:flex-2 space-y-4 sm:space-y-5">
                                {/* Transaction Info */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Transaction Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8">
                                        <div>
                                            <InfoRow label="Merchant Name" value={txn.merchant_name || 'N/A'} />
                                            <InfoRow label="Merchant ID" value={txn.merchant_id || 'N/A'} mono />
                                            <InfoRow label="Beneficiary" value={txn.bene_name || 'N/A'} />
                                            <InfoRow label="Bank Name" value={txn.bank_name || 'N/A'} />
                                            <InfoRow label="IFSC Code" value={txn.ifsc || 'N/A'} mono />
                                            <InfoRow label="Phone" value={txn.phone || 'N/A'} />
                                            <InfoRow label="Remark" value={txn.remark || '–'} />
                                        </div>
                                        <div>
                                            <InfoRow label="Transaction Type" value="Payout" />
                                            <InfoRow label="API Used" value={txn.api_name || 'N/A'} />
                                            <InfoRow label="Amount" value={formatCurrency(txn.amount)} />
                                            <InfoRow label="Charges" value={formatCurrency(txn.charges || 0)} />
                                            <InfoRow label="GST" value={formatCurrency(txn.gst || 0)} />
                                            <InfoRow label="Total Charges" value={formatCurrency(txn.total_charges || 0)} />
                                            <InfoRow label="Source IP" value={txn.source_ip || 'N/A'} mono />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Flow */}
                                {/* <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Status Flow</h3>
                                    <div className="grid grid-cols-4 gap-1 sm:gap-2">
                                        {[
                                            { label: "Initiated", date: formatDate(txn.created_at), time: formatTime(txn.created_at), done: txn.status !== 'initiated' },
                                            { label: "Processing", date: formatDate(txn.created_at), time: formatTime(txn.created_at), done: ['success', 'failed', 'returned'].includes(txn.status) },
                                            { label: "Success", date: formatDate(txn.created_at), time: formatTime(txn.created_at), done: txn.status === 'success', active: txn.status === 'success' },
                                        ].map((step) => (
                                            <StatusStep key={step.label} {...step} />
                                        ))}
                                    </div>
                                </div> */}

                                {/* Response Info */}


                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Response Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8">
                                        <div>
                                            <InfoRow label="Status" value={getStatusDisplay(txn.status)} />
                                            {txn.api_response && (
                                                <div className="mt-2">
                                                    <label className="text-xs text-gray-500">Full API Response</label>
                                                    <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                                                        {JSON.stringify(JSON.parse(txn.api_response), null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <InfoRow label="UTR / Ref No." value={txn.utr || '–'} mono />
                                            <InfoRow label="Created At" value={`${formatDate(txn.created_at)} ${formatTime(txn.created_at)}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right col */}
                            <div className="flex-1 lg:flex-1 space-y-3 sm:space-y-4">
                                {/* Beneficiary */}
                                <div className="border border-gray-100 rounded-xl p-3 sm:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Beneficiary Information</h3>
                                    </div>
                                    <div className="flex justify-center mb-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <InfoRow label="Name" value={txn.bene_name || 'N/A'} />
                                    <InfoRow label="Account No." value={txn.account_number || 'N/A'} mono />
                                    <InfoRow label="IFSC Code" value={txn.ifsc || 'N/A'} mono />
                                    <InfoRow label="Bank Name" value={txn.bank_name || 'N/A'} />
                                    <InfoRow label="Phone" value={txn.phone || 'N/A'} />
                                    <InfoRow label="Email" value={txn.email || 'N/A'} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== "Overview" && (
                    <div className="p-8 sm:p-10 text-center text-gray-400 text-xs sm:text-sm">
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="mx-auto mb-3 text-gray-200">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {activeTab} content will appear here
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── App ───────────────────────────────────────────────────────────────────
export default function TransactionScreen() {
    const [page, setPage] = useState("transactions");
    const [selectedTxn, setSelectedTxn] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportFilters, setExportFilters] = useState({});
    const [totalRecords, setTotalRecords] = useState(0);

    const handleViewDetails = (txn) => {
        setSelectedTxn(txn);
        setPage("details");
    };

    const handleBack = () => {
        setPage("transactions");
        setSelectedTxn(null);
    };

    const handleExportClick = (filters, total) => {
        setExportFilters(filters);
        setTotalRecords(total);
        setShowExportModal(true);
    };

    return (
        <div className="w-full bg-gray-50">
            {page === "transactions" ? (
                <>
                    <TransactionsPage
                        onViewDetails={handleViewDetails}
                        onExportClick={handleExportClick}
                    />
                    <TransactionExportScreen
                        isOpen={showExportModal}
                        onClose={() => setShowExportModal(false)}
                        filters={exportFilters}
                        totalRecords={totalRecords}
                    />
                </>
            ) : (
                <TransactionDetails txn={selectedTxn} onBack={handleBack} />
            )}
        </div>
    );
}
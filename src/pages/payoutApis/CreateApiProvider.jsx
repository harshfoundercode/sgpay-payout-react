// src/pages/payoutApis/AddApiProvider.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Zap, Save, X, Power, AlertCircle,
  CheckCircle, Info, Server, Database, RefreshCw,
  Activity, Clock, Settings, Layers, Globe, Shield
} from "lucide-react";
import apiProviderService from "../../services/ApiProvidersServices";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="block text-[11px] sm:text-xs font-medium text-gray-700 mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Input({ placeholder, type = "text", value, onChange, className = "", suffix, prefix, readOnly, error }) {
  return (
    <div className="relative flex items-center">
      {prefix && <span className="absolute left-3 text-[11px] sm:text-xs text-gray-400">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 sm:py-2.5 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all ${prefix ? "pl-7 sm:pl-8" : ""} ${suffix ? "pr-8 sm:pr-10" : ""} ${readOnly ? "bg-gray-50 text-gray-400" : ""} ${error ? "border-red-400 focus:ring-red-100 focus:border-red-400" : "border-gray-200"} ${className}`}
      />
      {suffix && <span className="absolute right-2 sm:right-3">{suffix}</span>}
    </div>
  );
}

function Select({ value, onChange, options, placeholder, error }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 sm:py-2.5 text-[12px] sm:text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white appearance-none cursor-pointer transition-all ${error ? "border-red-400 focus:ring-red-100" : "border-gray-200"}`}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AddApiProvider() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    daily_limit: "",
    port: "",
    status: "active"
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const set = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // ─── Validation ──────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Provider name is required";
    }

    if (!formData.daily_limit) {
      newErrors.daily_limit = "Daily limit is required";
    } else if (isNaN(formData.daily_limit) || parseFloat(formData.daily_limit) <= 0) {
      newErrors.daily_limit = "Daily limit must be a valid number greater than 0";
    }

    if (!formData.port) {
      newErrors.port = "Port number is required";
    } else if (!/^\d+$/.test(formData.port) || parseInt(formData.port) < 1 || parseInt(formData.port) > 65535) {
      newErrors.port = "Port must be a valid number between 1 and 65535";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit Handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) element.focus();
      }
      return;
    }

    setLoading(true);

    try {
      // Format data for API - exactly as per your API requirement
      const submitData = {
        name: formData.name.trim(),
        daily_limit: parseFloat(formData.daily_limit),
        port: formData.port,
        status: formData.status
      };

      console.log('📡 Creating API Provider:', submitData);

      // Call the API
      const response = await apiProviderService.createApiProvider(submitData);
      console.log('✅ API Provider created:', response);

      showToast("API Provider created successfully!", false);
      
      setTimeout(() => {
        navigate("/payout-apis");
      }, 1500);

    } catch (error) {
      console.error('Error creating API provider:', error);
      let errorMessage = 'Failed to create API provider. Please try again.';
      
      if (error.response) {
        const data = error.response.data;
        if (data?.message) errorMessage = data.message;
        if (data?.errors) {
          setErrors(data.errors);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast(errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  // ─── Reset Form ─────────────────────────────────────────────────────────────
  const handleReset = () => {
    setFormData({
      name: "",
      daily_limit: "",
      port: "",
      status: "active"
    });
    setErrors({});
  };

  const statusOptions = [
    { value: "active", label: "Active", color: "text-green-600", bg: "bg-green-50" },
    { value: "inactive", label: "Inactive", color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-0">

      {/* ── Toast Notification ── */}
      {toast && (
        <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg text-[11px] sm:text-sm ${
          toast.isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}>
          {!toast.isError ? <CheckCircle size={14} sm:size={18} /> : <AlertCircle size={14} sm:size={18} />}
          {toast.message}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/payout-apis")}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 shrink-0"
            >
              <ArrowLeft size={16} sm:size={18} />
            </button>

            <div>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 flex flex-wrap items-center">
                <button onClick={() => navigate("/payout-apis")} className="hover:text-blue-600 transition-colors">
                  Payout APIs
                </button>
                <span className="mx-1">›</span>
                <span className="text-gray-600">Add API Provider</span>
              </p>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Add API Provider</h1>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                Configure a new payout API provider for your system.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 self-start sm:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium text-amber-600">
              {loading ? "Creating..." : "New Provider"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pt-2 sm:pt-3">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* ── LEFT COLUMN: Form ── */}
          <div className="flex-1 min-w-0">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Provider Name */}
                <div>
                  <Label required>Provider Name</Label>
                  <Input
                    placeholder="Enter provider name (e.g., Razorpay, Cashfree)"
                    value={formData.name}
                    onChange={set("name")}
                    error={errors.name}
                    name="name"
                    prefix={<Zap size={14} className="text-gray-400" />}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 mt-1 text-[10px] text-red-500">
                      <AlertCircle size={10} /> {errors.name}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    Give a unique name to identify this provider.
                  </p>
                </div>

                {/* Daily Limit */}
                <div>
                  <Label required>Daily Limit (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter daily limit in INR"
                    value={formData.daily_limit}
                    onChange={set("daily_limit")}
                    error={errors.daily_limit}
                    name="daily_limit"
                    prefix={<Database size={14} className="text-gray-400" />}
                  />
                  {errors.daily_limit && (
                    <p className="flex items-center gap-1 mt-1 text-[10px] text-red-500">
                      <AlertCircle size={10} /> {errors.daily_limit}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    Maximum amount that can be processed through this API per day.
                  </p>
                </div>

                {/* Port Number */}
                <div>
                  <Label required>Port Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter port number (e.g., 8080)"
                    value={formData.port}
                    onChange={set("port")}
                    error={errors.port}
                    name="port"
                    prefix={<Server size={14} className="text-gray-400" />}
                  />
                  {errors.port && (
                    <p className="flex items-center gap-1 mt-1 text-[10px] text-red-500">
                      <AlertCircle size={10} /> {errors.port}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    Port number for API communication (1-65535).
                  </p>
                </div>

                {/* Status */}
                <div>
                  <Label required>Status</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.status === option.value
                            ? `${option.bg} border-blue-400 ring-2 ring-blue-200`
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={formData.status === option.value}
                          onChange={set("status")}
                          className="sr-only"
                        />
                        <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                          formData.status === option.value
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}>
                          {formData.status === option.value && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] sm:text-xs font-medium ${option.color}`}>
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.status && (
                    <p className="flex items-center gap-1 mt-1 text-[10px] text-red-500">
                      <AlertCircle size={10} /> {errors.status}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    Set the initial status of this API provider.
                  </p>
                </div>

                {/* Form Actions */}
                <div className="border-t border-gray-100 pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      disabled={loading}
                    >
                      <RefreshCw size={14} sm:size={16} /> Reset Form
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/payout-apis")}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-sm font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save size={14} sm:size={16} /> Create Provider
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* ── RIGHT COLUMN: Summary & Info ── */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="space-y-3 sm:space-y-4 sticky top-5">

              {/* Summary Card */}
              <Card>
                <h2 className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Provider Summary</h2>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-gray-400" />
                      <span className="text-[11px] sm:text-xs text-gray-500">Name</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700 truncate max-w-30">
                      {formData.name || "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <Database size={14} className="text-gray-400" />
                      <span className="text-[11px] sm:text-xs text-gray-500">Daily Limit</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700">
                      ₹{formData.daily_limit ? Number(formData.daily_limit).toLocaleString() : "0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <Server size={14} className="text-gray-400" />
                      <span className="text-[11px] sm:text-xs text-gray-500">Port</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700">
                      {formData.port || "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <Activity size={14} className="text-gray-400" />
                      <span className="text-[11px] sm:text-xs text-gray-500">Status</span>
                    </div>
                    <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                      formData.status === "active" ? "bg-green-100 text-green-700" :
                      formData.status === "inactive" ? "bg-red-100 text-red-600" :
                      "bg-orange-100 text-orange-600"
                    }`}>
                      {formData.status ? formData.status.charAt(0).toUpperCase() + formData.status.slice(1) : "Not set"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Info Card */}
              <Card className="bg-blue-50 border-blue-100">
                <div className="flex items-start gap-2.5">
                  <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-[11px] sm:text-xs font-semibold text-blue-700">Quick Tips</h3>
                    <ul className="mt-1.5 space-y-1.5">
                      <li className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-blue-600">
                        <CheckCircle size={10} className="mt-0.5 shrink-0" />
                        <span>Use a unique name for easy identification</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-blue-600">
                        <CheckCircle size={10} className="mt-0.5 shrink-0" />
                        <span>Set daily limit based on your requirements</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-blue-600">
                        <CheckCircle size={10} className="mt-0.5 shrink-0" />
                        <span>Keep provider active for immediate use</span>
                      </li>
                      <li className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-blue-600">
                        <CheckCircle size={10} className="mt-0.5 shrink-0" />
                        <span>You can modify these settings anytime</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Status Help */}
              <Card className="bg-gray-50 border-gray-200">
                <h3 className="text-[11px] sm:text-xs font-semibold text-gray-700 mb-2">Status Guide</h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-600"><strong>Active</strong> - Provider is ready to process payouts</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-gray-600"><strong>Inactive</strong> - Provider is disabled temporarily</span>
                  </div>
                 
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
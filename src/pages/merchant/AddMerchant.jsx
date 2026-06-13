// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// // ── Helpers ───────────────────────────────────────────────────────────────────
// function Label({ children, required }) {
//   return (
//     <label className="block text-xs font-medium text-gray-600 mb-1">
//       {children} {required && <span className="text-red-500">*</span>}
//     </label>
//   );
// }

// function Input({ placeholder, type = "text", value, onChange, className = "", suffix, prefix, readOnly }) {
//   return (
//     <div className="relative flex items-center">
//       {prefix && <span className="absolute left-3 text-xs text-gray-400">{prefix}</span>}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         readOnly={readOnly}
//         placeholder={placeholder}
//         className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all ${prefix ? "pl-8" : ""} ${suffix ? "pr-10" : ""} ${readOnly ? "bg-gray-50 text-gray-400" : ""} ${className}`}
//       />
//       {suffix && <span className="absolute right-3">{suffix}</span>}
//     </div>
//   );
// }

// function Select({ value, onChange, options, placeholder }) {
//   return (
//     <div className="relative">
//       <select
//         value={value}
//         onChange={onChange}
//         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white appearance-none cursor-pointer transition-all"
//       >
//         <option value="">{placeholder}</option>
//         {options.map(o => <option key={o} value={o}>{o}</option>)}
//       </select>
//       <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </div>
//   );
// }

// function SectionCard({ number, title, children }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-5">
//       <div className="flex items-center gap-2.5 mb-4">
//         <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
//           {number}
//         </span>
//         <h2 className="text-sm font-bold text-gray-800">{title}</h2>
//       </div>
//       {children}
//     </div>
//   );
// }

// function UploadField({ label, required }) {
//   const [file, setFile] = useState(null);
//   const ref = useRef();
//   return (
//     <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
//       <span className="text-xs text-gray-600">
//         {label} {required && <span className="text-red-500">*</span>}
//       </span>
//       <button
//         onClick={() => ref.current.click()}
//         className="flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:text-blue-700"
//       >
//         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//         </svg>
//         {file ? file.name.slice(0, 14) + "…" : "Upload file"}
//       </button>
//       <input ref={ref} type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
//     </div>
//   );
// }

// const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Yes Bank", "IndusInd Bank", "IDFC First Bank"];
// const STATES = ["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
// const BUSINESS_TYPES = ["Private Limited", "Public Limited", "Partnership", "Sole Proprietorship", "LLP", "Trust", "NGO"];

// const EMPTY_FORM = {
//   merchantName: "", businessName: "", email: "", mobile: "", password: "", confirmPassword: "",
//   businessType: "", gst: "", pan: "", websiteUrl: "", businessAddress: "", city: "", state: "", pincode: "",
//   accountHolder: "", bankName: "", accountNumber: "", confirmAccount: "", ifsc: "", branchName: "",
//   webhookUrl: "", enableWebhook: "yes",
//   minPayout: "1", maxPayout: "50,000", dailyLimit: "10,00,000", monthlyLimit: "1,00,00,000",
//   settlementCycle: "Instant", autoSettlement: true,
//   merchantStatus: "active",
// };

// export default function CreateMerchantPage() {
//   const navigate = useNavigate();
//   const dropRef = useRef();

//   const [form, setForm] = useState(EMPTY_FORM);
//   const [showPass, setShowPass] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showApiKey, setShowApiKey] = useState(false);
//   const [ifscVerified, setIfscVerified] = useState(false);
//   const [apiKey, setApiKey] = useState("");
//   const [secretKey, setSecretKey] = useState("");

//   const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
//   const genKey = (len = 32) => Array.from({ length: len }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

//   const summaryStatus = form.merchantStatus === "active" ? "Active" : form.merchantStatus === "inactive" ? "Inactive" : "Suspended";

//   const handleCreate = () => {
//     alert("Merchant created successfully!");
//     navigate("/all-merchant");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Page Header ── */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">

//             {/* ✅ Back Button */}
//             <button
//               onClick={() => navigate("/all-merchant")}
//               className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 flex-shrink-0"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             <div>
//               <p className="text-xs text-gray-400 mb-0.5">
//                 <button onClick={() => navigate("/all-merchant")} className="hover:text-blue-600 transition-colors">
//                   Merchants
//                 </button>
//                 <span className="mx-1">›</span>
//                 <span className="text-gray-600">Create Merchant</span>
//               </p>
//               <h1 className="text-xl font-bold text-gray-900">Create Merchant</h1>
//               <p className="text-xs text-gray-400 mt-0.5">Add a new merchant and configure all the required details.</p>
//             </div>
//           </div>

//           {/* Draft badge */}
//           <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
//             <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
//             <span className="text-xs font-medium text-amber-600">Unsaved Draft</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="pt-2">
//         <div className="grid grid-cols-12 gap-4">

//           {/* ── LEFT + MIDDLE (col 1-9) ── */}
//           <div className="col-span-9 grid grid-cols-2 gap-4 content-start">

//             {/* 1. Basic Information */}
//             <SectionCard number="1" title="Basic Information">
//               <div className="space-y-3">
//                 <div>
//                   <Label required>Merchant Name</Label>
//                   <Input placeholder="Enter merchant name" value={form.merchantName} onChange={set("merchantName")} />
//                 </div>
//                 <div>
//                   <Label required>Business Name</Label>
//                   <Input placeholder="Enter business name" value={form.businessName} onChange={set("businessName")} />
//                 </div>
//                 <div>
//                   <Label required>Email Address</Label>
//                   <Input placeholder="Enter email address" type="email" value={form.email} onChange={set("email")} />
//                 </div>
//                 <div>
//                   <Label required>Mobile Number</Label>
//                   <div className="flex gap-2">
//                     <div className="flex items-center gap-1.5 px-2.5 py-2 border border-gray-200 rounded-lg bg-white text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
//                       🇮🇳 +91
//                       <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                     <Input placeholder="Enter mobile number" type="tel" value={form.mobile} onChange={set("mobile")} />
//                   </div>
//                 </div>
//                 <div>
//                   <Label required>Password</Label>
//                   <Input
//                     placeholder="Enter password"
//                     type={showPass ? "text" : "password"}
//                     value={form.password}
//                     onChange={set("password")}
//                     suffix={
//                       <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
//                         {showPass
//                           ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
//                           : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                         }
//                       </button>
//                     }
//                   />
//                 </div>
//                 <div>
//                   <Label required>Confirm Password</Label>
//                   <Input
//                     placeholder="Confirm password"
//                     type={showConfirm ? "text" : "password"}
//                     value={form.confirmPassword}
//                     onChange={set("confirmPassword")}
//                     suffix={
//                       <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600">
//                         {showConfirm
//                           ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
//                           : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                         }
//                       </button>
//                     }
//                   />
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 2. Business Information */}
//             <SectionCard number="2" title="Business Information">
//               <div className="space-y-3">
//                 <div>
//                   <Label required>Business Type</Label>
//                   <Select value={form.businessType} onChange={set("businessType")} options={BUSINESS_TYPES} placeholder="Select business type" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <Label>GST Number</Label>
//                     <Input placeholder="Enter GST number" value={form.gst} onChange={set("gst")} />
//                   </div>
//                   <div>
//                     <Label>PAN Number</Label>
//                     <Input placeholder="Enter PAN number" value={form.pan} onChange={set("pan")} />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Website URL</Label>
//                   <Input placeholder="https://www.example.com" value={form.websiteUrl} onChange={set("websiteUrl")} />
//                 </div>
//                 <div>
//                   <Label required>Business Address</Label>
//                   <textarea
//                     placeholder="Enter complete business address"
//                     value={form.businessAddress}
//                     onChange={set("businessAddress")}
//                     rows={2}
//                     className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
//                   />
//                 </div>
//                 <div className="grid grid-cols-3 gap-3">
//                   <div>
//                     <Label required>City</Label>
//                     <Input placeholder="City" value={form.city} onChange={set("city")} />
//                   </div>
//                   <div>
//                     <Label required>State</Label>
//                     <Select value={form.state} onChange={set("state")} options={STATES} placeholder="Select state" />
//                   </div>
//                   <div>
//                     <Label required>Pincode</Label>
//                     <Input placeholder="Pincode" value={form.pincode} onChange={set("pincode")} />
//                   </div>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 3. Bank Information */}
//             <SectionCard number="3" title="Bank Information">
//               <div className="space-y-3">
//                 <div>
//                   <Label required>Account Holder Name</Label>
//                   <Input placeholder="Enter account holder name" value={form.accountHolder} onChange={set("accountHolder")} />
//                 </div>
//                 <div>
//                   <Label required>Bank Name</Label>
//                   <Select value={form.bankName} onChange={set("bankName")} options={BANKS} placeholder="Select bank name" />
//                 </div>
//                 <div>
//                   <Label required>Account Number</Label>
//                   <Input placeholder="Enter account number" value={form.accountNumber} onChange={set("accountNumber")} />
//                 </div>
//                 <div>
//                   <Label required>Confirm Account Number</Label>
//                   <Input placeholder="Confirm account number" value={form.confirmAccount} onChange={set("confirmAccount")} />
//                 </div>
//                 <div>
//                   <Label required>IFSC Code</Label>
//                   <div className="flex gap-2">
//                     <Input placeholder="Enter IFSC code" value={form.ifsc} onChange={set("ifsc")} />
//                     <button
//                       onClick={() => setIfscVerified(true)}
//                       className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${ifscVerified ? "bg-green-100 text-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
//                     >
//                       {ifscVerified ? "✓ Verified" : "Verify IFSC"}
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Branch Name</Label>
//                   <Input placeholder="Enter branch name" value={form.branchName} onChange={set("branchName")} readOnly={ifscVerified} />
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 4. API Configuration */}
//             <SectionCard number="4" title="API Configuration">
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
//                   <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-xs text-blue-600">API credentials will be auto-generated for the merchant.</p>
//                 </div>
//                 <div>
//                   <Label>Merchant ID</Label>
//                   <div className="relative">
//                     <input readOnly value="Auto generated" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 outline-none pr-10" />
//                     <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <Label>API Key</Label>
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <input
//                         readOnly
//                         type={showApiKey ? "text" : "password"}
//                         value={apiKey || "Auto generated"}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 outline-none pr-16"
//                       />
//                       <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5">
//                         <button onClick={() => setShowApiKey(!showApiKey)} className="text-gray-400 hover:text-gray-600">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                         </button>
//                         <button onClick={() => apiKey && navigator.clipboard?.writeText(apiKey)} className="text-gray-400 hover:text-gray-600">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                         </button>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setApiKey(genKey())}
//                       className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
//                     >
//                       Generate API Key
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Secret Key</Label>
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <input
//                         readOnly
//                         type="password"
//                         value={secretKey || "Auto generated"}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 outline-none pr-16"
//                       />
//                       <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5">
//                         <button className="text-gray-400 hover:text-gray-600">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                         </button>
//                         <button className="text-gray-400 hover:text-gray-600">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                         </button>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setSecretKey(genKey(40))}
//                       className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
//                     >
//                       Generate Secret Key
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 5. Webhook Configuration */}
//             <SectionCard number="5" title="Webhook Configuration">
//               <div className="space-y-3">
//                 <div>
//                   <Label>Webhook URL</Label>
//                   <Input placeholder="https://yourdomain.com/webhook/payout" value={form.webhookUrl} onChange={set("webhookUrl")} />
//                 </div>
//                 <div>
//                   <Label>Enable Webhook</Label>
//                   <div className="flex gap-6 mt-1">
//                     {["yes", "no"].map(v => (
//                       <label key={v} className="flex items-center gap-2 cursor-pointer">
//                         <div
//                           onClick={() => setForm(f => ({ ...f, enableWebhook: v }))}
//                           className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.enableWebhook === v ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
//                         >
//                           {form.enableWebhook === v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                         </div>
//                         <span className="text-sm text-gray-700 capitalize">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 {form.enableWebhook === "yes" && (
//                   <div className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
//                     <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                     <p className="text-xs text-green-700">We will send real-time payout status updates to the above webhook URL.</p>
//                   </div>
//                 )}
//               </div>
//             </SectionCard>

//             {/* 6. Transaction Configuration */}
//             <SectionCard number="6" title="Transaction Configuration">
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <Label required>Minimum Payout Amount (₹)</Label>
//                     <Input placeholder="1" value={form.minPayout} onChange={set("minPayout")} />
//                   </div>
//                   <div>
//                     <Label required>Maximum Payout Amount (₹)</Label>
//                     <Input placeholder="50,000" value={form.maxPayout} onChange={set("maxPayout")} />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <Label required>Daily Limit (₹)</Label>
//                     <Input placeholder="10,00,000" value={form.dailyLimit} onChange={set("dailyLimit")} />
//                   </div>
//                   <div>
//                     <Label required>Monthly Limit (₹)</Label>
//                     <Input placeholder="1,00,00,000" value={form.monthlyLimit} onChange={set("monthlyLimit")} />
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
//                   <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-xs text-blue-600">These limits can be updated later from merchant settings.</p>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 7. Settlement Configuration */}
//             <SectionCard number="7" title="Settlement Configuration">
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-3 items-end">
//                   <div>
//                     <Label required>Settlement Cycle</Label>
//                     <Select
//                       value={form.settlementCycle}
//                       onChange={set("settlementCycle")}
//                       options={["Instant", "T+1", "T+2", "T+3", "Weekly"]}
//                       placeholder=""
//                     />
//                   </div>
//                   <div>
//                     <Label>Auto Settlement</Label>
//                     <label className="flex items-center gap-2 cursor-pointer mt-1">
//                       <div
//                         onClick={() => setForm(f => ({ ...f, autoSettlement: !f.autoSettlement }))}
//                         className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${form.autoSettlement ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}`}
//                       >
//                         {form.autoSettlement && (
//                           <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </div>
//                       <span className="text-sm text-gray-700">Enable</span>
//                     </label>
//                   </div>
//                 </div>
//                 {form.settlementCycle === "Instant" && (
//                   <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2.5">
//                     <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                     <p className="text-xs text-orange-600">Instant settlement will transfer funds to merchant account immediately.</p>
//                   </div>
//                 )}
//               </div>
//             </SectionCard>

//             {/* 8. Status Configuration */}
//             <SectionCard number="8" title="Status Configuration">
//               <div>
//                 <Label required>Merchant Status</Label>
//                 <div className="space-y-2.5 mt-2">
//                   {[
//                     { val: "active",    label: "Active",    badge: "Recommended" },
//                     { val: "inactive",  label: "Inactive" },
//                     { val: "suspended", label: "Suspended" },
//                   ].map(opt => (
//                     <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer">
//                       <div
//                         onClick={() => setForm(f => ({ ...f, merchantStatus: opt.val }))}
//                         className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.merchantStatus === opt.val ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
//                       >
//                         {form.merchantStatus === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                       </div>
//                       <span className="text-sm text-gray-700">{opt.label}</span>
//                       {opt.badge && (
//                         <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded">{opt.badge}</span>
//                       )}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </SectionCard>

//           </div>

//           {/* ── RIGHT COLUMN (col 10-12) ── */}
//           <div className="col-span-3 flex flex-col gap-4 self-start sticky top-5">

//             {/* Merchant Summary */}
//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <h2 className="text-sm font-bold text-gray-800 mb-3">Merchant Summary</h2>
//               <div className="space-y-2.5">
//                 {[
//                   { icon: "🏢", label: "Business Type",     value: form.businessType || "Not selected" },
//                   { icon: "⏱",  label: "Settlement Cycle",  value: form.settlementCycle },
//                   { icon: "⚡", label: "Transaction Limits", value: `₹1 - ₹${form.maxPayout}` },
//                   { icon: "📅", label: "Daily Limit",        value: `₹${form.dailyLimit}` },
//                   { icon: "🗓",  label: "Monthly Limit",      value: `₹${form.monthlyLimit}` },
//                   { icon: "🔗", label: "Webhook",            value: form.enableWebhook === "yes" ? "Enabled" : "Disabled" },
//                 ].map(r => (
//                   <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm">{r.icon}</span>
//                       <span className="text-xs text-gray-500">{r.label}</span>
//                     </div>
//                     <span className="text-xs font-medium text-gray-700 text-right max-w-[100px] truncate">{r.value}</span>
//                   </div>
//                 ))}
//                 <div className="flex items-center justify-between py-1.5">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">👤</span>
//                     <span className="text-xs text-gray-500">Status</span>
//                   </div>
//                   <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
//                     summaryStatus === "Active"   ? "bg-green-100 text-green-700" :
//                     summaryStatus === "Inactive" ? "bg-gray-100 text-gray-600"  : "bg-red-100 text-red-600"
//                   }`}>
//                     {summaryStatus}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Documents Upload */}
//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <div className="flex items-center gap-2.5 mb-3">
//                 <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">9</span>
//                 <h2 className="text-sm font-bold text-gray-800">Documents Upload</h2>
//               </div>
//               <div>
//                 <UploadField label="PAN Card" required />
//                 <UploadField label="GST Certificate" required />
//                 <UploadField label="Cancelled Cheque" required />
//                 <UploadField label="Company Registration Certificate" required />
//                 <UploadField label="Owner ID Proof" required />
//               </div>
//               <div
//                 ref={dropRef}
//                 onDragOver={e => e.preventDefault()}
//                 onDrop={e => e.preventDefault()}
//                 className="mt-4 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
//               >
//                 <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
//                   <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                   </svg>
//                 </div>
//                 <p className="text-xs text-gray-500">Drag & drop files here</p>
//                 <p className="text-xs text-gray-400 my-1">or</p>
//                 <button className="text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
//                   Browse Files
//                 </button>
//                 <p className="text-[10px] text-gray-400 mt-2">Allowed files: PDF, JPG, PNG (Max 5MB each)</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Bottom Action Bar ── */}
//         <div className="mt-5 bg-white border border-gray-200 rounded-xl px-5 py-3.5 flex items-center justify-between shadow-sm">
//           <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//             <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//             </svg>
//             Save Draft
//           </button>

//           <div className="flex items-center gap-2.5">
//             {/* Reset */}
//             <button
//               onClick={() => setForm(EMPTY_FORM)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               Reset Form
//             </button>

//             {/* ✅ Cancel → back to list */}
//             <button
//               onClick={() => navigate("/all-merchant")}
//               className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>

//             {/* ✅ Create → success then back to list */}
//             <button
//               onClick={handleCreate}
//               className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Create Merchant
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Helpers ───────────────────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="block text-[11px] sm:text-xs font-medium text-gray-600 mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Input({ placeholder, type = "text", value, onChange, className = "", suffix, prefix, readOnly }) {
  return (
    <div className="relative flex items-center">
      {prefix && <span className="absolute left-3 text-[11px] sm:text-xs text-gray-400">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all ${prefix ? "pl-7 sm:pl-8" : ""} ${suffix ? "pr-8 sm:pr-10" : ""} ${readOnly ? "bg-gray-50 text-gray-400" : ""} ${className}`}
      />
      {suffix && <span className="absolute right-2 sm:right-3">{suffix}</span>}
    </div>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white appearance-none cursor-pointer transition-all"
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

function SectionCard({ number, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5">
      <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <h2 className="text-xs sm:text-sm font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function UploadField({ label, required }) {
  const [file, setFile] = useState(null);
  const ref = useRef();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-50 last:border-0 gap-1 sm:gap-0">
      <span className="text-[11px] sm:text-xs text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <button
        onClick={() => ref.current.click()}
        className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 font-medium hover:text-blue-700"
      >
        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {file ? file.name.slice(0, 12) + "…" : "Upload file"}
      </button>
      <input ref={ref} type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
    </div>
  );
}

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Yes Bank", "IndusInd Bank", "IDFC First Bank"];
const STATES = ["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
const BUSINESS_TYPES = ["Private Limited", "Public Limited", "Partnership", "Sole Proprietorship", "LLP", "Trust", "NGO"];

const EMPTY_FORM = {
  merchantName: "", businessName: "", email: "", mobile: "", password: "", confirmPassword: "",
  businessType: "", gst: "", pan: "", websiteUrl: "", businessAddress: "", city: "", state: "", pincode: "",
  accountHolder: "", bankName: "", accountNumber: "", confirmAccount: "", ifsc: "", branchName: "",
  webhookUrl: "", enableWebhook: "yes",
  minPayout: "1", maxPayout: "50,000", dailyLimit: "10,00,000", monthlyLimit: "1,00,00,000",
  settlementCycle: "Instant", autoSettlement: true,
  merchantStatus: "active",
};

export default function CreateMerchantPage() {
  const navigate = useNavigate();
  const dropRef = useRef();

  const [form, setForm] = useState(EMPTY_FORM);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [ifscVerified, setIfscVerified] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const genKey = (len = 32) => Array.from({ length: len }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

  const summaryStatus = form.merchantStatus === "active" ? "Active" : form.merchantStatus === "inactive" ? "Inactive" : "Suspended";

  const handleCreate = () => {
    alert("Merchant created successfully!");
    navigate("/all-merchant");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ✅ Back Button */}
            <button
              onClick={() => navigate("/all-merchant")}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 flex flex-wrap items-center">
                <button onClick={() => navigate("/all-merchant")} className="hover:text-blue-600 transition-colors">
                  Merchants
                </button>
                <span className="mx-1">›</span>
                <span className="text-gray-600">Create Merchant</span>
              </p>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Create Merchant</h1>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Add a new merchant and configure all the required details.</p>
            </div>
          </div>

          {/* Draft badge */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 self-start sm:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium text-amber-600">Unsaved Draft</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pt-2 px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* ── LEFT + MIDDLE (forms) ── */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

              {/* 1. Basic Information */}
              <SectionCard number="1" title="Basic Information">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label required>Merchant Name</Label>
                    <Input placeholder="Enter merchant name" value={form.merchantName} onChange={set("merchantName")} />
                  </div>
                  <div>
                    <Label required>Business Name</Label>
                    <Input placeholder="Enter business name" value={form.businessName} onChange={set("businessName")} />
                  </div>
                  <div>
                    <Label required>Email Address</Label>
                    <Input placeholder="Enter email address" type="email" value={form.email} onChange={set("email")} />
                  </div>
                  <div>
                    <Label required>Mobile Number</Label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 px-2 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-white text-[11px] sm:text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
                        🇮🇳 +91
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <Input placeholder="Enter mobile number" type="tel" value={form.mobile} onChange={set("mobile")} />
                    </div>
                  </div>
                  <div>
                    <Label required>Password</Label>
                    <Input
                      placeholder="Enter password"
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={set("password")}
                      suffix={
                        <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                          {showPass
                            ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          }
                        </button>
                      }
                    />
                  </div>
                  <div>
                    <Label required>Confirm Password</Label>
                    <Input
                      placeholder="Confirm password"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={set("confirmPassword")}
                      suffix={
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600">
                          {showConfirm
                            ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          }
                        </button>
                      }
                    />
                  </div>
                </div>
              </SectionCard>

              {/* 2. Business Information */}
              <SectionCard number="2" title="Business Information">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label required>Business Type</Label>
                    <Select value={form.businessType} onChange={set("businessType")} options={BUSINESS_TYPES} placeholder="Select business type" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label>GST Number</Label>
                      <Input placeholder="Enter GST number" value={form.gst} onChange={set("gst")} />
                    </div>
                    <div>
                      <Label>PAN Number</Label>
                      <Input placeholder="Enter PAN number" value={form.pan} onChange={set("pan")} />
                    </div>
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input placeholder="https://www.example.com" value={form.websiteUrl} onChange={set("websiteUrl")} />
                  </div>
                  <div>
                    <Label required>Business Address</Label>
                    <textarea
                      placeholder="Enter complete business address"
                      value={form.businessAddress}
                      onChange={set("businessAddress")}
                      rows={2}
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <Label required>City</Label>
                      <Input placeholder="City" value={form.city} onChange={set("city")} />
                    </div>
                    <div>
                      <Label required>State</Label>
                      <Select value={form.state} onChange={set("state")} options={STATES} placeholder="Select state" />
                    </div>
                    <div>
                      <Label required>Pincode</Label>
                      <Input placeholder="Pincode" value={form.pincode} onChange={set("pincode")} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* 3. Bank Information */}
              <SectionCard number="3" title="Bank Information">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label required>Account Holder Name</Label>
                    <Input placeholder="Enter account holder name" value={form.accountHolder} onChange={set("accountHolder")} />
                  </div>
                  <div>
                    <Label required>Bank Name</Label>
                    <Select value={form.bankName} onChange={set("bankName")} options={BANKS} placeholder="Select bank name" />
                  </div>
                  <div>
                    <Label required>Account Number</Label>
                    <Input placeholder="Enter account number" value={form.accountNumber} onChange={set("accountNumber")} />
                  </div>
                  <div>
                    <Label required>Confirm Account Number</Label>
                    <Input placeholder="Confirm account number" value={form.confirmAccount} onChange={set("confirmAccount")} />
                  </div>
                  <div>
                    <Label required>IFSC Code</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1">
                        <Input placeholder="Enter IFSC code" value={form.ifsc} onChange={set("ifsc")} />
                      </div>
                      <button
                        onClick={() => setIfscVerified(true)}
                        className={`px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${ifscVerified ? "bg-green-100 text-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                      >
                        {ifscVerified ? "✓ Verified" : "Verify IFSC"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label>Branch Name</Label>
                    <Input placeholder="Enter branch name" value={form.branchName} onChange={set("branchName")} readOnly={ifscVerified} />
                  </div>
                </div>
              </SectionCard>

              {/* 4. API Configuration */}
              <SectionCard number="4" title="API Configuration">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[11px] sm:text-xs text-blue-600">API credentials will be auto-generated for the merchant.</p>
                  </div>
                  <div>
                    <Label>Merchant ID</Label>
                    <div className="relative">
                      <input readOnly value="Auto generated" className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-8 sm:pr-10" />
                      <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label>API Key</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          readOnly
                          type={showApiKey ? "text" : "password"}
                          value={apiKey || "Auto generated"}
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-14 sm:pr-16"
                        />
                        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <button onClick={() => setShowApiKey(!showApiKey)} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={() => apiKey && navigator.clipboard?.writeText(apiKey)} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => setApiKey(genKey())}
                        className="px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
                      >
                        Generate API Key
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label>Secret Key</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          readOnly
                          type="password"
                          value={secretKey || "Auto generated"}
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-14 sm:pr-16"
                        />
                        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => setSecretKey(genKey(40))}
                        className="px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
                      >
                        Generate Secret Key
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* 5. Webhook Configuration */}
              <SectionCard number="5" title="Webhook Configuration">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label>Webhook URL</Label>
                    <Input placeholder="https://yourdomain.com/webhook/payout" value={form.webhookUrl} onChange={set("webhookUrl")} />
                  </div>
                  <div>
                    <Label>Enable Webhook</Label>
                    <div className="flex gap-4 sm:gap-6 mt-1">
                      {["yes", "no"].map(v => (
                        <label key={v} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                          <div
                            onClick={() => setForm(f => ({ ...f, enableWebhook: v }))}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.enableWebhook === v ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
                          >
                            {form.enableWebhook === v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-[12px] sm:text-sm text-gray-700 capitalize">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {form.enableWebhook === "yes" && (
                    <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-[11px] sm:text-xs text-green-700">We will send real-time payout status updates to the above webhook URL.</p>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* 6. Transaction Configuration */}
              <SectionCard number="6" title="Transaction Configuration">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label required>Minimum Payout Amount (₹)</Label>
                      <Input placeholder="1" value={form.minPayout} onChange={set("minPayout")} />
                    </div>
                    <div>
                      <Label required>Maximum Payout Amount (₹)</Label>
                      <Input placeholder="50,000" value={form.maxPayout} onChange={set("maxPayout")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label required>Daily Limit (₹)</Label>
                      <Input placeholder="10,00,000" value={form.dailyLimit} onChange={set("dailyLimit")} />
                    </div>
                    <div>
                      <Label required>Monthly Limit (₹)</Label>
                      <Input placeholder="1,00,00,000" value={form.monthlyLimit} onChange={set("monthlyLimit")} />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[11px] sm:text-xs text-blue-600">These limits can be updated later from merchant settings.</p>
                  </div>
                </div>
              </SectionCard>

              {/* 7. Settlement Configuration */}
              <SectionCard number="7" title="Settlement Configuration">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                    <div>
                      <Label required>Settlement Cycle</Label>
                      <Select
                        value={form.settlementCycle}
                        onChange={set("settlementCycle")}
                        options={["Instant", "T+1", "T+2", "T+3", "Weekly"]}
                        placeholder=""
                      />
                    </div>
                    <div>
                      <Label>Auto Settlement</Label>
                      <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer mt-1">
                        <div
                          onClick={() => setForm(f => ({ ...f, autoSettlement: !f.autoSettlement }))}
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${form.autoSettlement ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}`}
                        >
                          {form.autoSettlement && (
                            <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[12px] sm:text-sm text-gray-700">Enable</span>
                      </label>
                    </div>
                  </div>
                  {form.settlementCycle === "Instant" && (
                    <div className="flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-[11px] sm:text-xs text-orange-600">Instant settlement will transfer funds to merchant account immediately.</p>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* 8. Status Configuration */}
              <SectionCard number="8" title="Status Configuration">
                <div>
                  <Label required>Merchant Status</Label>
                  <div className="space-y-2 mt-1.5 sm:mt-2">
                    {[
                      { val: "active",    label: "Active",    badge: "Recommended" },
                      { val: "inactive",  label: "Inactive" },
                      { val: "suspended", label: "Suspended" },
                    ].map(opt => (
                      <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => setForm(f => ({ ...f, merchantStatus: opt.val }))}
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.merchantStatus === opt.val ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
                        >
                          {form.merchantStatus === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-[12px] sm:text-sm text-gray-700">{opt.label}</span>
                        {opt.badge && (
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] sm:text-[10px] font-semibold rounded">{opt.badge}</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </SectionCard>

            </div>
          </div>

          {/* ── RIGHT COLUMN (sidebar) ── */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="space-y-3 sm:space-y-4 sticky top-5">

              {/* Merchant Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                <h2 className="text-xs sm:text-sm font-bold text-gray-800 mb-2.5 sm:mb-3">Merchant Summary</h2>
                <div className="space-y-2">
                  {[
                    { icon: "🏢", label: "Business Type",     value: form.businessType || "Not selected" },
                    { icon: "⏱",  label: "Settlement Cycle",  value: form.settlementCycle },
                    { icon: "⚡", label: "Transaction Limits", value: `₹1 - ₹${form.maxPayout}` },
                    { icon: "📅", label: "Daily Limit",        value: `₹${form.dailyLimit}` },
                    { icon: "🗓",  label: "Monthly Limit",      value: `₹${form.monthlyLimit}` },
                    { icon: "🔗", label: "Webhook",            value: form.enableWebhook === "yes" ? "Enabled" : "Disabled" },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-xs sm:text-sm">{r.icon}</span>
                        <span className="text-[11px] sm:text-xs text-gray-500">{r.label}</span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium text-gray-700 text-right max-w-[100px] truncate">{r.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm">👤</span>
                      <span className="text-[11px] sm:text-xs text-gray-500">Status</span>
                    </div>
                    <span className={`text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${
                      summaryStatus === "Active"   ? "bg-green-100 text-green-700" :
                      summaryStatus === "Inactive" ? "bg-gray-100 text-gray-600"  : "bg-red-100 text-red-600"
                    }`}>
                      {summaryStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center flex-shrink-0">9</span>
                  <h2 className="text-xs sm:text-sm font-bold text-gray-800">Documents Upload</h2>
                </div>
                <div>
                  <UploadField label="PAN Card" required />
                  <UploadField label="GST Certificate" required />
                  <UploadField label="Cancelled Cheque" required />
                  <UploadField label="Company Registration Certificate" required />
                  <UploadField label="Owner ID Proof" required />
                </div>
                <div
                  ref={dropRef}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => e.preventDefault()}
                  className="mt-3 sm:mt-4 border-2 border-dashed border-gray-200 rounded-xl p-3 sm:p-5 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500">Drag & drop files here</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 my-1">or</p>
                  <button className="text-[11px] sm:text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-gray-50 transition-colors">
                    Browse Files
                  </button>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1.5 sm:mt-2">Allowed files: PDF, JPG, PNG (Max 5MB each)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Action Bar ── */}
        <div className="mt-4 sm:mt-5 mb-4 sm:mb-6 bg-white border border-gray-200 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Draft
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {/* Reset */}
            <button
              onClick={() => setForm(EMPTY_FORM)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Form
            </button>

            {/* Cancel → back to list */}
            <button
              onClick={() => navigate("/all-merchant")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>

            {/* Create */}
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] sm:text-sm font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Merchant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
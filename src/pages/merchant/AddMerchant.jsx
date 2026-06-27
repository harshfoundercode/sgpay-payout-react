
// // import { useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import merchantService from "../../services/MerchantListServices";

// // // ── Helpers ───────────────────────────────────────────────────────────────────
// // function Label({ children, required }) {
// //   return (
// //     <label className="block text-[11px] sm:text-xs font-medium text-gray-600 mb-1">
// //       {children} {required && <span className="text-red-500">*</span>}
// //     </label>
// //   );
// // }

// // function Input({ placeholder, type = "text", value, onChange, className = "", suffix, prefix, readOnly, error }) {
// //   return (
// //     <div className="relative flex items-center">
// //       {prefix && <span className="absolute left-3 text-[11px] sm:text-xs text-gray-400">{prefix}</span>}
// //       <input
// //         type={type}
// //         value={value}
// //         onChange={onChange}
// //         readOnly={readOnly}
// //         autoComplete="off"
// //         placeholder={placeholder}
// //         className={`w-full border rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all ${prefix ? "pl-7 sm:pl-8" : ""} ${suffix ? "pr-8 sm:pr-10" : ""} ${readOnly ? "bg-gray-50 text-gray-400" : ""} ${error ? "border-red-400 focus:ring-red-100 focus:border-red-400" : "border-gray-200"} ${className}`}
// //       />
// //       {suffix && <span className="absolute right-2 sm:right-3">{suffix}</span>}
// //     </div>
// //   );
// // }

// // function Select({ value, onChange, options, placeholder, error }) {
// //   return (
// //     <div className="relative">
// //       <select
// //         value={value}
// //         onChange={onChange}
// //         className={`w-full border rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white appearance-none cursor-pointer transition-all ${error ? "border-red-400 focus:ring-red-100" : "border-gray-200"}`}
// //       >
// //         <option value="">{placeholder}</option>
// //         {options.map(o => <option key={o} value={o}>{o}</option>)}
// //       </select>
// //       <svg className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //       </svg>
// //     </div>
// //   );
// // }

// // function SectionCard({ number, title, children }) {
// //   return (
// //     <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5">
// //       <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
// //         <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0">
// //           {number}
// //         </span>
// //         <h2 className="text-xs sm:text-sm font-bold text-gray-800">{title}</h2>
// //       </div>
// //       {children}
// //     </div>
// //   );
// // }

// // // ── UploadField with file management ──
// // function UploadField({ label, required, onFileChange, fileName, fileSize, accept = ".pdf,.jpg,.jpeg,.png", maxSize = 5 }) {
// //   const [file, setFile] = useState(null);
// //   const [error, setError] = useState('');
// //   const ref = useRef();

// //   const validateFile = (file) => {
// //     const sizeInMB = file.size / (1024 * 1024);
// //     if (sizeInMB > maxSize) {
// //       setError(`File size must be less than ${maxSize}MB`);
// //       return false;
// //     }

// //     const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
// //     const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

// //     if (!validTypes.includes(file.type) && !['.pdf', '.jpg', '.jpeg', '.png'].includes(fileExtension)) {
// //       setError('Only PDF, JPG, or PNG files are allowed');
// //       return false;
// //     }

// //     setError('');
// //     return true;
// //   };

// //   const handleFileSelect = (e) => {
// //     const selectedFile = e.target.files[0];
// //     if (selectedFile && validateFile(selectedFile)) {
// //       setFile(selectedFile);
// //       if (onFileChange) onFileChange(selectedFile);
// //     } else if (selectedFile) {
// //       e.target.value = '';
// //     }
// //   };

// //   const handleRemove = () => {
// //     setFile(null);
// //     if (onFileChange) onFileChange(null);
// //     if (ref.current) {
// //       ref.current.value = '';
// //     }
// //     setError('');
// //   };

// //   const displayFileName = file ? file.name : (fileName || null);
// //   const displayFileSize = file ? file.size : (fileSize || null);

// //   return (
// //     <div className="flex flex-col py-2 border-b border-gray-50 last:border-0">
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
// //         <span className="text-[11px] sm:text-xs text-gray-600">
// //           {label} {required && <span className="text-red-500">*</span>}
// //         </span>
// //         {displayFileName ? (
// //           <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg">
// //             <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //             <span className="text-[10px] sm:text-xs text-green-700 truncate max-w-25">
// //               {displayFileName}
// //             </span>
// //             {displayFileSize && (
// //               <span className="text-[9px] text-gray-400">
// //                 ({(displayFileSize / (1024 * 1024)).toFixed(2)} MB)
// //               </span>
// //             )}
// //             <button
// //               onClick={handleRemove}
// //               className="text-red-400 hover:text-red-600 ml-1"
// //             >
// //               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>
// //         ) : (
// //           <button
// //             onClick={() => ref.current?.click()}
// //             className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 font-medium hover:text-blue-700"
// //           >
// //             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
// //             </svg>
// //             Upload file
// //           </button>
// //         )}
// //       </div>

// //       <input
// //         ref={ref}
// //         type="file"
// //         className="hidden"
// //         accept={accept}
// //         onChange={handleFileSelect}
// //       />

// //       {!displayFileName && (
// //         <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-2 text-center">
// //           <p className="text-[9px] sm:text-[10px] text-gray-400">
// //             Drag & drop or click to upload
// //           </p>
// //           <p className="text-[8px] sm:text-[9px] text-gray-400">
// //             PDF, JPG, PNG (Max {maxSize}MB)
// //           </p>
// //         </div>
// //       )}

// //       {error && (
// //         <p className="text-[9px] text-red-500 mt-0.5">{error}</p>
// //       )}
// //     </div>
// //   );
// // }

// // const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Yes Bank", "IndusInd Bank", "IDFC First Bank"];
// // const BUSINESS_TYPES = ["Private Limited", "Public Limited", "Partnership", "Sole Proprietorship", "LLP", "Trust", "NGO"];

// // const EMPTY_FORM = {
// //   merchantName: "", businessName: "", email: "", mobile: "", password: "", confirmPassword: "",
// //   businessType: "", gst: "", pan: "", websiteUrl: "", businessAddress: "", city: "", state: "", pincode: "",
// //   accountHolder: "", bankName: "", accountNumber: "", confirmAccount: "", ifsc: "", branchName: "",
// //   webhookUrl: "", enableWebhook: "yes",
// //   minPayout: "1", maxPayout: "50,000", dailyLimit: "10,00,000", monthlyLimit: "1,00,00,000",
// //   settlementCycle: "Instant", autoSettlement: true,
// //   merchantStatus: "active",
// // };

// // export default function CreateMerchantPage() {
// //   const navigate = useNavigate();
// //   const dropRef = useRef();

// //   const [form, setForm] = useState(EMPTY_FORM);
// //   const [showPass, setShowPass] = useState(false);
// //   const [showConfirm, setShowConfirm] = useState(false);
// //   const [showApiKey, setShowApiKey] = useState(false);
// //   const [ifscVerified, setIfscVerified] = useState(false);
// //   const [apiKey, setApiKey] = useState("");
// //   const [secretKey, setSecretKey] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [toast, setToast] = useState(null);

// //   // ── File states ──
// //   const [files, setFiles] = useState({
// //     panCard: null,
// //     gstCertificate: null,
// //     cancelledCheque: null,
// //     registrationCertificate: null,
// //     ownerIdProof: null
// //   });

// //   const setFile = (field) => (file) => {
// //     setFiles(prev => ({
// //       ...prev,
// //       [field]: file
// //     }));
// //   };

// //   const set = (field) => (e) => {
// //     const value = e.target.value;

// //     // For mobile number - only allow digits and max 10 digits
// //     if (field === 'mobile') {
// //       if (value === '' || /^[0-9]*$/.test(value)) {
// //         setForm(f => ({ ...f, [field]: value }));
// //         if (errors[field]) {
// //           setErrors(prev => ({ ...prev, [field]: null }));
// //         }
// //       }
// //       return;
// //     }

// //     setForm(f => ({ ...f, [field]: value }));
// //     if (errors[field]) {
// //       setErrors(prev => ({ ...prev, [field]: null }));
// //     }
// //   };

// //   const genKey = (len = 32) => Array.from({ length: len }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

// //   const summaryStatus = form.merchantStatus === "active" ? "Active" : form.merchantStatus === "inactive" ? "Inactive" : "Suspended";
// //   const summaryStatusClass = form.merchantStatus === "active" ? "bg-green-100 text-green-700" : form.merchantStatus === "inactive" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600";

// //   const showToast = (text, isErr = false) => {
// //     setToast({ text, isErr });
// //     setTimeout(() => setToast(null), 3000);
// //   };

// //   // ── Validation ──
// //   const validateForm = () => {
// //     const newErrors = {};

// //     // ── ONLY PERSONAL INFORMATION IS REQUIRED ──
// //     // Merchant Name
// //     if (!form.merchantName) newErrors.merchantName = "Merchant name is required";

// //     // Business Name
// //     if (!form.businessName) newErrors.businessName = "Business name is required";

// //     // Email
// //     if (!form.email) {
// //       newErrors.email = "Email is required";
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     // Mobile - Required + 10 digit validation
// //     if (!form.mobile) {
// //       newErrors.mobile = "Mobile number is required";
// //     } else if (!/^[0-9]{10}$/.test(form.mobile)) {
// //       newErrors.mobile = "Mobile number must be exactly 10 digits";
// //     }

// //     // Password
// //     if (!form.password) {
// //       newErrors.password = "Password is required";
// //     } else if (form.password.length < 8) {
// //       newErrors.password = "Password must be at least 8 characters";
// //     }

// //     // Confirm Password
// //     if (!form.confirmPassword) {
// //       newErrors.confirmPassword = "Please confirm password";
// //     } else if (form.password !== form.confirmPassword) {
// //       newErrors.confirmPassword = "Passwords do not match";
// //     }

// //     // ── ALL OTHER FIELDS ARE OPTIONAL ──
// //     // No validation for Business Type, Business Address, City, State, Pincode
// //     // No validation for Account Holder, Bank Name, Account Number, IFSC
// //     // No validation for Transaction Limits

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ── Handle Create ──
// //   const handleCreate = async () => {
// //     if (!validateForm()) {
// //       const firstError = Object.keys(errors)[0];
// //       if (firstError) {
// //         const element = document.querySelector(`[name="${firstError}"]`);
// //         if (element) element.focus();
// //       }
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const submitData = {
// //         ...form,
// //         apiKey: apiKey || genKey(),
// //         secretKey: secretKey || genKey(40)
// //       };

// //       const response = await merchantService.createMerchant(submitData, files);

// //       showToast("Merchant created successfully!", false);

// //       setTimeout(() => {
// //         navigate("/all-merchant");
// //       }, 1500);
// //     } catch (error) {
// //       console.error('Create merchant error:', error);

// //       let errorMessage = 'Failed to create merchant. Please try again.';

// //       if (error.response) {
// //         const status = error.response.status;
// //         const data = error.response.data;

// //         if (status === 400) {
// //           errorMessage = data.message || 'Invalid data. Please check your input.';
// //           if (data.errors) {
// //             const fieldErrors = {};
// //             Object.keys(data.errors).forEach(key => {
// //               fieldErrors[key] = data.errors[key][0] || data.errors[key];
// //             });
// //             setErrors(fieldErrors);
// //           }
// //         } else if (status === 409) {
// //           errorMessage = 'A merchant with this email or mobile already exists.';
// //         } else if (data?.message) {
// //           errorMessage = data.message;
// //         }
// //       } else if (error.message) {
// //         errorMessage = error.message;
// //       }

// //       showToast(errorMessage, true);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">

// //       {/* ── Toast Notification ── */}
// //       {toast && (
// //         <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg animate-slide-in text-xs sm:text-sm ${toast.isErr ? "bg-red-500 text-white" : "bg-green-500 text-white"
// //           }`}>
// //           {!toast.isErr && (
// //             <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //             </svg>
// //           )}
// //           {toast.text}
// //         </div>
// //       )}

// //       {/* ── Page Header ── */}
// //       <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// //           <div className="flex items-center gap-2 sm:gap-3">
// //             <button
// //               onClick={() => navigate("/all-merchant")}
// //               className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 shrink-0"
// //             >
// //               <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //               </svg>
// //             </button>

// //             <div>
// //               <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 flex flex-wrap items-center">
// //                 <button onClick={() => navigate("/all-merchant")} className="hover:text-blue-600 transition-colors">
// //                   Merchants
// //                 </button>
// //                 <span className="mx-1">›</span>
// //                 <span className="text-gray-600">Create Merchant</span>
// //               </p>
// //               <h1 className="text-lg sm:text-xl font-bold text-gray-900">Create Merchant</h1>
// //               <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Add a new merchant and configure all the required details.</p>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 self-start sm:self-auto">
// //             <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
// //             <span className="text-[11px] sm:text-xs font-medium text-amber-600">
// //               {loading ? "Creating..." : "Unsaved Draft"}
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Body ── */}
// //       <div className="pt-2 px-3 sm:px-4 lg:px-1">
// //         <div className="flex flex-col lg:flex-row gap-4">

// //           {/* ── LEFT + MIDDLE (forms) ── */}
// //           <div className="flex-1 min-w-0">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

// //               {/* 1. Basic Information - ONLY REQUIRED SECTION */}
// //               <SectionCard number="1" title="Basic Information">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div>
// //                     <Label required>Merchant Name</Label>
// //                     <Input
// //                       placeholder="Enter merchant name"
// //                       value={form.merchantName}
// //                       onChange={set("merchantName")}
// //                       error={errors.merchantName}
// //                       name="merchantName"
// //                     />
// //                     {errors.merchantName && <p className="text-[10px] text-red-500 mt-0.5">{errors.merchantName}</p>}
// //                   </div>
// //                   <div>
// //                     <Label required>Business Name</Label>
// //                     <Input
// //                       placeholder="Enter business name"
// //                       value={form.businessName}
// //                       onChange={set("businessName")}
// //                       error={errors.businessName}
// //                       name="businessName"
// //                     />
// //                     {errors.businessName && <p className="text-[10px] text-red-500 mt-0.5">{errors.businessName}</p>}
// //                   </div>
// //                   <div>
// //                     <Label required>Email Address</Label>
// //                     <Input
// //                       placeholder="Enter email address"
// //                       type="email"
// //                       value={form.email}
// //                       onChange={set("email")}
// //                       error={errors.email}
// //                       name="email"
// //                     />
// //                     {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
// //                   </div>
// //                   <div>
// //                     <Label required>Mobile Number</Label>
// //                     <div className="flex gap-2">
// //                       <div className="flex items-center gap-1 px-2 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-white text-[11px] sm:text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
// //                         🇮🇳 +91
// //                         <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                         </svg>
// //                       </div>
// //                       <Input
// //                         placeholder="Enter 10-digit mobile number"
// //                         type="tel"
// //                         value={form.mobile}
// //                         onChange={set("mobile")}
// //                         error={errors.mobile}
// //                         name="mobile"
// //                         maxLength="10"
// //                       />
// //                     </div>
// //                     {errors.mobile && <p className="text-[10px] text-red-500 mt-0.5">{errors.mobile}</p>}
// //                   </div>
// //                   <div>
// //                     <Label required>Password</Label>
// //                     <Input
// //                       placeholder="Enter password (min 8 characters)"
// //                       type={showPass ? "text" : "password"}
// //                       value={form.password}
// //                       onChange={set("password")}
// //                       error={errors.password}
// //                       name="password"
// //                       suffix={
// //                         <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
// //                           {showPass
// //                             ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
// //                             : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
// //                           }
// //                         </button>
// //                       }
// //                     />
// //                     {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
// //                   </div>
// //                   <div>
// //                     <Label required>Confirm Password</Label>
// //                     <Input
// //                       placeholder="Confirm password"
// //                       type={showConfirm ? "text" : "password"}
// //                       value={form.confirmPassword}
// //                       onChange={set("confirmPassword")}
// //                       error={errors.confirmPassword}
// //                       name="confirmPassword"
// //                       suffix={
// //                         <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600">
// //                           {showConfirm
// //                             ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
// //                             : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
// //                           }
// //                         </button>
// //                       }
// //                     />
// //                     {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-0.5">{errors.confirmPassword}</p>}
// //                   </div>
// //                 </div>
// //               </SectionCard>

// //               {/* 2. Business Information - OPTIONAL */}
// //               <SectionCard number="2" title="Business Information (Optional)">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div>
// //                     <Label>Business Type</Label>
// //                     <Select
// //                       value={form.businessType}
// //                       onChange={set("businessType")}
// //                       options={BUSINESS_TYPES}
// //                       placeholder="Select business type (optional)"
// //                     />
// //                   </div>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
// //                     <div>
// //                       <Label>GST Number</Label>
// //                       <Input placeholder="Enter GST number" value={form.gst} onChange={set("gst")} />
// //                     </div>
// //                     <div>
// //                       <Label>PAN Number</Label>
// //                       <Input placeholder="Enter PAN number" value={form.pan} onChange={set("pan")} />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <Label>Website URL</Label>
// //                     <Input placeholder="https://www.example.com" value={form.websiteUrl} onChange={set("websiteUrl")} />
// //                   </div>
// //                   <div>
// //                     <Label>Business Address</Label>
// //                     <textarea
// //                       placeholder="Enter complete business address (optional)"
// //                       value={form.businessAddress}
// //                       onChange={set("businessAddress")}
// //                       rows={2}
// //                       className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
// //                     />
// //                   </div>
// //                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
// //                     <div>
// //                       <Label>City</Label>
// //                       <Input
// //                         placeholder="City (optional)"
// //                         value={form.city}
// //                         onChange={set("city")}
// //                         name="city"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>State</Label>
// //                       <Input
// //                         placeholder="State (optional)"
// //                         value={form.state}
// //                         onChange={set("state")}
// //                         name="state"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>Pincode</Label>
// //                       <Input
// //                         placeholder="Pincode (optional)"
// //                         value={form.pincode}
// //                         onChange={set("pincode")}
// //                         name="pincode"
// //                         maxLength="6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </SectionCard>

// //               {/* 3. Bank Information - OPTIONAL */}
// //               <SectionCard number="3" title="Bank Information (Optional)">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div>
// //                     <Label>Account Holder Name</Label>
// //                     <Input
// //                       placeholder="Enter account holder name (optional)"
// //                       value={form.accountHolder}
// //                       onChange={set("accountHolder")}
// //                       name="accountHolder"
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label>Bank Name</Label>
// //                     <Select
// //                       value={form.bankName}
// //                       onChange={set("bankName")}
// //                       options={BANKS}
// //                       placeholder="Select bank name (optional)"
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label>Account Number</Label>
// //                     <Input
// //                       placeholder="Enter account number (optional)"
// //                       value={form.accountNumber}
// //                       onChange={set("accountNumber")}
// //                       name="accountNumber"
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label>Confirm Account Number</Label>
// //                     <Input
// //                       placeholder="Confirm account number (optional)"
// //                       value={form.confirmAccount}
// //                       onChange={set("confirmAccount")}
// //                       name="confirmAccount"
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label>IFSC Code</Label>
// //                     <div className="flex flex-col sm:flex-row gap-2">
// //                       <div className="flex-1">
// //                         <Input
// //                           placeholder="Enter IFSC code (optional)"
// //                           value={form.ifsc}
// //                           onChange={set("ifsc")}
// //                           name="ifsc"
// //                         />
// //                       </div>
// //                       <button
// //                         onClick={() => setIfscVerified(true)}
// //                         className={`px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${ifscVerified ? "bg-green-100 text-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
// //                       >
// //                         {ifscVerified ? "✓ Verified" : "Verify IFSC"}
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <Label>Branch Name</Label>
// //                     <Input
// //                       placeholder="Enter branch name (optional)"
// //                       value={form.branchName}
// //                       onChange={set("branchName")}
// //                       readOnly={ifscVerified}
// //                     />
// //                   </div>
// //                 </div>
// //               </SectionCard>

// //               {/* 4. API Configuration - OPTIONAL */}
// //               <SectionCard number="4" title="API Configuration (Optional)">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
// //                     <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     <p className="text-[11px] sm:text-xs text-blue-600">API credentials will be auto-generated for the merchant.</p>
// //                   </div>
// //                   <div>
// //                     <Label>Merchant ID</Label>
// //                     <div className="relative">
// //                       <input readOnly value="Auto generated" className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-8 sm:pr-10" />
// //                       <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
// //                         <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
// //                         </svg>
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <Label>API Key</Label>
// //                     <div className="flex flex-col sm:flex-row gap-2">
// //                       <div className="relative flex-1">
// //                         <input
// //                           readOnly
// //                           type={showApiKey ? "text" : "password"}
// //                           value={apiKey || "Auto generated"}
// //                           className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-14 sm:pr-16"
// //                         />
// //                         <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1">
// //                           <button onClick={() => setShowApiKey(!showApiKey)} className="text-gray-400 hover:text-gray-600">
// //                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
// //                           </button>
// //                           <button onClick={() => apiKey && navigator.clipboard?.writeText(apiKey)} className="text-gray-400 hover:text-gray-600">
// //                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
// //                           </button>
// //                         </div>
// //                       </div>
// //                       <button
// //                         onClick={() => setApiKey(genKey())}
// //                         className="px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
// //                       >
// //                         Generate API Key
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <Label>Secret Key</Label>
// //                     <div className="flex flex-col sm:flex-row gap-2">
// //                       <div className="relative flex-1">
// //                         <input
// //                           readOnly
// //                           type="password"
// //                           value={secretKey || "Auto generated"}
// //                           className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-14 sm:pr-16"
// //                         />
// //                         <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1">
// //                           <button className="text-gray-400 hover:text-gray-600">
// //                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
// //                           </button>
// //                           <button className="text-gray-400 hover:text-gray-600">
// //                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
// //                           </button>
// //                         </div>
// //                       </div>
// //                       <button
// //                         onClick={() => setSecretKey(genKey(40))}
// //                         className="px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
// //                       >
// //                         Generate Secret Key
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </SectionCard>

// //               {/* 5. Webhook Configuration - OPTIONAL */}
// //               <SectionCard number="5" title="Webhook Configuration (Optional)">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div>
// //                     <Label>Webhook URL</Label>
// //                     <Input placeholder="https://yourdomain.com/webhook/payout" value={form.webhookUrl} onChange={set("webhookUrl")} />
// //                   </div>
// //                   <div>
// //                     <Label>Enable Webhook</Label>
// //                     <div className="flex gap-4 sm:gap-6 mt-1">
// //                       {["yes", "no"].map(v => (
// //                         <label key={v} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
// //                           <div
// //                             onClick={() => setForm(f => ({ ...f, enableWebhook: v }))}
// //                             className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.enableWebhook === v ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
// //                           >
// //                             {form.enableWebhook === v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
// //                           </div>
// //                           <span className="text-[12px] sm:text-sm text-gray-700 capitalize">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
// //                         </label>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   {form.enableWebhook === "yes" && (
// //                     <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
// //                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
// //                       </svg>
// //                       <p className="text-[11px] sm:text-xs text-green-700">We will send real-time payout status updates to the above webhook URL.</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </SectionCard>

// //               {/* 6. Transaction Configuration - OPTIONAL */}
// //               <SectionCard number="6" title="Transaction Configuration (Optional)">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
// //                     <div>
// //                       <Label>Minimum Payout Amount (₹)</Label>
// //                       <Input
// //                         placeholder="1"
// //                         value={form.minPayout}
// //                         onChange={set("minPayout")}
// //                         name="minPayout"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>Maximum Payout Amount (₹)</Label>
// //                       <Input
// //                         placeholder="50,000"
// //                         value={form.maxPayout}
// //                         onChange={set("maxPayout")}
// //                         name="maxPayout"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
// //                     <div>
// //                       <Label>Daily Limit (₹)</Label>
// //                       <Input
// //                         placeholder="10,00,000"
// //                         value={form.dailyLimit}
// //                         onChange={set("dailyLimit")}
// //                         name="dailyLimit"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>Monthly Limit (₹)</Label>
// //                       <Input
// //                         placeholder="1,00,00,000"
// //                         value={form.monthlyLimit}
// //                         onChange={set("monthlyLimit")}
// //                         name="monthlyLimit"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
// //                     <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     <p className="text-[11px] sm:text-xs text-blue-600">These limits can be updated later from merchant settings.</p>
// //                   </div>
// //                 </div>
// //               </SectionCard>

// //               {/* 7. Settlement Configuration - OPTIONAL */}
// //               {/* <SectionCard number="7" title="Settlement Configuration (Optional)">
// //                 <div className="space-y-2.5 sm:space-y-3">
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
// //                     <div>
// //                       <Label>Settlement Cycle</Label>
// //                       <Select
// //                         value={form.settlementCycle}
// //                         onChange={set("settlementCycle")}
// //                         options={["Instant", "T+1", "T+2", "T+3", "Weekly"]}
// //                         placeholder="Select settlement cycle (optional)"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label>Auto Settlement</Label>
// //                       <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer mt-1">
// //                         <div
// //                           onClick={() => setForm(f => ({ ...f, autoSettlement: !f.autoSettlement }))}
// //                           className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${form.autoSettlement ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}`}
// //                         >
// //                           {form.autoSettlement && (
// //                             <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// //                             </svg>
// //                           )}
// //                         </div>
// //                         <span className="text-[12px] sm:text-sm text-gray-700">Enable</span>
// //                       </label>
// //                     </div>
// //                   </div>
// //                   {form.settlementCycle === "Instant" && (
// //                     <div className="flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
// //                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //                       </svg>
// //                       <p className="text-[11px] sm:text-xs text-orange-600">Instant settlement will transfer funds to merchant account immediately.</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </SectionCard> */}

// //               {/* 8. Status Configuration - OPTIONAL */}
// //               <SectionCard number="7" title="Status Configuration (Optional)">
// //                 <div>
// //                   <Label>Merchant Status</Label>
// //                   <div className="space-y-2 mt-1.5 sm:mt-2">
// //                     {[
// //                       { val: "active", label: "Active", badge: "Recommended" },
// //                       { val: "inactive", label: "Inactive" },
// //                       { val: "suspended", label: "Suspended" },
// //                     ].map(opt => (
// //                       <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
// //                         <div
// //                           onClick={() => setForm(f => ({ ...f, merchantStatus: opt.val }))}
// //                           className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.merchantStatus === opt.val ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
// //                         >
// //                           {form.merchantStatus === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
// //                         </div>
// //                         <span className="text-[12px] sm:text-sm text-gray-700">{opt.label}</span>
// //                         {opt.badge && (
// //                           <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] sm:text-[10px] font-semibold rounded">{opt.badge}</span>
// //                         )}
// //                       </label>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </SectionCard>

// //             </div>
// //           </div>

// //           {/* ── RIGHT COLUMN (sidebar) ── */}
// //           <div className="lg:w-80 xl:w-96 shrink-0">
// //             <div className="space-y-3 sm:space-y-4 sticky top-5">

// //               {/* Merchant Summary - Fully Dynamic */}
// //               <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
// //                 <h2 className="text-xs sm:text-sm font-bold text-gray-800 mb-2.5 sm:mb-3">Merchant Summary</h2>
// //                 <div className="space-y-2">
// //                   {[
// //                     { icon: "🏢", label: "Business Type", value: form.businessType || "Not selected" },
// //                     { icon: "🏦", label: "Bank Name", value: form.bankName || "Not selected" },
// //                     { icon: "⏱️", label: "Settlement Cycle", value: form.settlementCycle || "Not selected" },
// //                     { icon: "💰", label: "Min Payout", value: `₹ ${form.minPayout || '0'}` },
// //                     { icon: "💰", label: "Max Payout", value: `₹ ${form.maxPayout || '0'}` },
// //                     { icon: "📅", label: "Daily Limit", value: `₹ ${form.dailyLimit || '0'}` },
// //                     { icon: "🗓️", label: "Monthly Limit", value: `₹ ${form.monthlyLimit || '0'}` },
// //                     { icon: "📧", label: "Email", value: form.email || "Not provided" },
// //                     { icon: "📱", label: "Mobile", value: form.mobile || "Not provided" },
// //                     { icon: "📍", label: "City", value: form.city || "Not provided" },
// //                     { icon: "🗺️", label: "State", value: form.state || "Not provided" },
// //                     { icon: "📮", label: "Pincode", value: form.pincode || "Not provided" },
// //                     { icon: "🔗", label: "Webhook", value: form.enableWebhook === "yes" ? "✅ Enabled" : "❌ Disabled" },
// //                     { icon: "🏷️", label: "GST", value: form.gst || "Not provided" },
// //                     { icon: "🆔", label: "PAN", value: form.pan || "Not provided" },
// //                     { icon: "🏛️", label: "Account Holder", value: form.accountHolder || "Not provided" },
// //                     { icon: "🔢", label: "Account Number", value: form.accountNumber ? `****${form.accountNumber.slice(-4)}` : "Not provided" },
// //                     { icon: "🏦", label: "IFSC Code", value: form.ifsc || "Not provided" },
// //                     { icon: "🏢", label: "Branch", value: form.branchName || "Not provided" },
// //                   ].map(r => (
// //                     <div key={r.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
// //                       <div className="flex items-center gap-1.5 sm:gap-2">
// //                         <span className="text-xs sm:text-sm">{r.icon}</span>
// //                         <span className="text-[11px] sm:text-xs text-gray-500">{r.label}</span>
// //                       </div>
// //                       <span className="text-[11px] sm:text-xs font-medium text-gray-700 text-right max-w-25 truncate" title={r.value}>
// //                         {r.value}
// //                       </span>
// //                     </div>
// //                   ))}
// //                   <div className="flex items-center justify-between py-1 border-t border-gray-200 pt-2 mt-1">
// //                     <div className="flex items-center gap-1.5 sm:gap-2">
// //                       <span className="text-xs sm:text-sm">👤</span>
// //                       <span className="text-[11px] sm:text-xs text-gray-500 font-semibold">Status</span>
// //                     </div>
// //                     <span className={`text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${summaryStatusClass}`}>
// //                       {summaryStatus}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Documents Upload */}
// //               <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
// //                 <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
// //                   <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0">8</span>
// //                   <h2 className="text-xs sm:text-sm font-bold text-gray-800">Documents Upload</h2>
// //                 </div>
// //                 <div>
// //                   <UploadField
// //                     label="PAN Card"
// //                     required
// //                     onFileChange={setFile('panCard')}
// //                     fileName={files.panCard?.name}
// //                     fileSize={files.panCard?.size}
// //                   />
// //                   <UploadField
// //                     label="GST Certificate"
// //                     required
// //                     onFileChange={setFile('gstCertificate')}
// //                     fileName={files.gstCertificate?.name}
// //                     fileSize={files.gstCertificate?.size}
// //                   />
// //                   <UploadField
// //                     label="Cancelled Cheque"
// //                     required
// //                     onFileChange={setFile('cancelledCheque')}
// //                     fileName={files.cancelledCheque?.name}
// //                     fileSize={files.cancelledCheque?.size}
// //                   />
// //                   <UploadField
// //                     label="Company Registration Certificate"
// //                     required
// //                     onFileChange={setFile('registrationCertificate')}
// //                     fileName={files.registrationCertificate?.name}
// //                     fileSize={files.registrationCertificate?.size}
// //                   />
// //                   <UploadField
// //                     label="Owner ID Proof"
// //                     required
// //                     onFileChange={setFile('ownerIdProof')}
// //                     fileName={files.ownerIdProof?.name}
// //                     fileSize={files.ownerIdProof?.size}
// //                   />
// //                 </div>
// //                 <div
// //                   ref={dropRef}
// //                   onDragOver={e => e.preventDefault()}
// //                   onDrop={e => e.preventDefault()}
// //                   className="mt-3 sm:mt-4 border-2 border-dashed border-gray-200 rounded-xl p-3 sm:p-5 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
// //                 >
// //                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
// //                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
// //                     </svg>
// //                   </div>
// //                   <p className="text-[11px] sm:text-xs text-gray-500">Drag & drop files here</p>
// //                   <p className="text-[10px] sm:text-xs text-gray-400 my-1">or</p>
// //                   <button className="text-[11px] sm:text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-gray-50 transition-colors">
// //                     Browse Files
// //                   </button>
// //                   <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1.5 sm:mt-2">Allowed files: PDF, JPG, PNG (Max 5MB each)</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Bottom Action Bar ── */}
// //         <div className="mt-4 sm:mt-5 mb-4 sm:mb-6 bg-white border border-gray-200 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
// //           {/* <button 
// //             className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
// //             onClick={() => {
// //               setForm(EMPTY_FORM);
// //               setApiKey("");
// //               setSecretKey("");
// //               setFiles({
// //                 panCard: null,
// //                 gstCertificate: null,
// //                 cancelledCheque: null,
// //                 registrationCertificate: null,
// //                 ownerIdProof: null
// //               });
// //               setErrors({});
// //               showToast("Form reset successfully!", false);
// //             }}
// //             disabled={loading}
// //           >
// //             <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
// //             </svg>
// //             Save Draft
// //           </button> */}

// //           <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
// //             <button
// //               onClick={() => {
// //                 setForm(EMPTY_FORM);
// //                 setApiKey("");
// //                 setSecretKey("");
// //                 setFiles({
// //                   panCard: null,
// //                   gstCertificate: null,
// //                   cancelledCheque: null,
// //                   registrationCertificate: null,
// //                   ownerIdProof: null
// //                 });
// //                 setErrors({});
// //               }}
// //               className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
// //               disabled={loading}
// //             >
// //               <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //               </svg>
// //               Reset Form
// //             </button>

// //             <button
// //               onClick={() => navigate("/all-merchant")}
// //               className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
// //               disabled={loading}
// //             >
// //               Cancel
// //             </button>

// //             <button
// //               onClick={handleCreate}
// //               disabled={loading}
// //               className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] sm:text-sm font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
// //             >
// //               {loading ? (
// //                 <>
// //                   <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   Creating...
// //                 </>
// //               ) : (
// //                 <>
// //                   <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                   </svg>
// //                   Create Merchant
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <style>{`
// //         @keyframes slide-in {
// //           from {
// //             transform: translateX(100%);
// //             opacity: 0;
// //           }
// //           to {
// //             transform: translateX(0);
// //             opacity: 1;
// //           }
// //         }
// //         .animate-slide-in {
// //           animation: slide-in 0.3s ease-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// // src/pages/merchant/AddMerchant.jsx
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import merchantService from "../../services/MerchantListServices";

// // ── Helpers ───────────────────────────────────────────────────────────────────
// function Label({ children, required }) {
//   return (
//     <label className="block text-[11px] sm:text-xs font-medium text-gray-600 mb-1">
//       {children} {required && <span className="text-red-500">*</span>}
//     </label>
//   );
// }

// function Input({ placeholder, type = "text", value, onChange, className = "", suffix, prefix, readOnly, error }) {
//   return (
//     <div className="relative flex items-center">
//       {prefix && <span className="absolute left-3 text-[11px] sm:text-xs text-gray-400">{prefix}</span>}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         readOnly={readOnly}
//         autoComplete="off"
//         placeholder={placeholder}
//         className={`w-full border rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all ${prefix ? "pl-7 sm:pl-8" : ""} ${suffix ? "pr-8 sm:pr-10" : ""} ${readOnly ? "bg-gray-50 text-gray-400" : ""} ${error ? "border-red-400 focus:ring-red-100 focus:border-red-400" : "border-gray-200"} ${className}`}
//       />
//       {suffix && <span className="absolute right-2 sm:right-3">{suffix}</span>}
//     </div>
//   );
// }

// function Select({ value, onChange, options, placeholder, error }) {
//   return (
//     <div className="relative">
//       <select
//         value={value}
//         onChange={onChange}
//         className={`w-full border rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white appearance-none cursor-pointer transition-all ${error ? "border-red-400 focus:ring-red-100" : "border-gray-200"}`}
//       >
//         <option value="">{placeholder}</option>
//         {options.map(o => <option key={o} value={o}>{o}</option>)}
//       </select>
//       <svg className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </div>
//   );
// }

// function SectionCard({ number, title, children }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5">
//       <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
//         <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0">
//           {number}
//         </span>
//         <h2 className="text-xs sm:text-sm font-bold text-gray-800">{title}</h2>
//       </div>
//       {children}
//     </div>
//   );
// }

// // ── UploadField with file management ──
// function UploadField({ label, required, onFileChange, fileName, fileSize, accept = ".pdf,.jpg,.jpeg,.png", maxSize = 5 }) {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState('');
//   const ref = useRef();

//   const validateFile = (file) => {
//     const sizeInMB = file.size / (1024 * 1024);
//     if (sizeInMB > maxSize) {
//       setError(`File size must be less than ${maxSize}MB`);
//       return false;
//     }

//     const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//     const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
//     if (!validTypes.includes(file.type) && !['.pdf', '.jpg', '.jpeg', '.png'].includes(fileExtension)) {
//       setError('Only PDF, JPG, or PNG files are allowed');
//       return false;
//     }

//     setError('');
//     return true;
//   };

//   const handleFileSelect = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && validateFile(selectedFile)) {
//       setFile(selectedFile);
//       if (onFileChange) onFileChange(selectedFile);
//     } else if (selectedFile) {
//       e.target.value = '';
//     }
//   };

//   const handleRemove = () => {
//     setFile(null);
//     if (onFileChange) onFileChange(null);
//     if (ref.current) {
//       ref.current.value = '';
//     }
//     setError('');
//   };

//   const displayFileName = file ? file.name : (fileName || null);
//   const displayFileSize = file ? file.size : (fileSize || null);

//   return (
//     <div className="flex flex-col py-2 border-b border-gray-50 last:border-0">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
//         <span className="text-[11px] sm:text-xs text-gray-600">
//           {label} {required && <span className="text-red-500">*</span>}
//         </span>
//         {displayFileName ? (
//           <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg">
//             <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-[10px] sm:text-xs text-green-700 truncate max-w-25">
//               {displayFileName}
//             </span>
//             {displayFileSize && (
//               <span className="text-[9px] text-gray-400">
//                 ({(displayFileSize / (1024 * 1024)).toFixed(2)} MB)
//               </span>
//             )}
//             <button
//               onClick={handleRemove}
//               className="text-red-400 hover:text-red-600 ml-1"
//             >
//               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => ref.current?.click()}
//             className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 font-medium hover:text-blue-700"
//           >
//             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//             </svg>
//             Upload file
//           </button>
//         )}
//       </div>
      
//       <input
//         ref={ref}
//         type="file"
//         className="hidden"
//         accept={accept}
//         onChange={handleFileSelect}
//       />

//       {!displayFileName && (
//         <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-2 text-center">
//           <p className="text-[9px] sm:text-[10px] text-gray-400">
//             Drag & drop or click to upload
//           </p>
//           <p className="text-[8px] sm:text-[9px] text-gray-400">
//             PDF, JPG, PNG (Max {maxSize}MB)
//           </p>
//         </div>
//       )}

//       {error && (
//         <p className="text-[9px] text-red-500 mt-0.5">{error}</p>
//       )}
//     </div>
//   );
// }

// const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Yes Bank", "IndusInd Bank", "IDFC First Bank"];
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
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [toast, setToast] = useState(null);

//   // ── File states ──
//   const [files, setFiles] = useState({
//     panCard: null,
//     gstCertificate: null,
//     cancelledCheque: null,
//     registrationCertificate: null,
//     ownerIdProof: null
//   });

//   const setFile = (field) => (file) => {
//     setFiles(prev => ({
//       ...prev,
//       [field]: file
//     }));
//   };

//   const set = (field) => (e) => {
//     const value = e.target.value;
    
//     // For mobile number - only allow digits and max 10 digits
//     if (field === 'mobile') {
//       if (value === '' || /^[0-9]*$/.test(value)) {
//         setForm(f => ({ ...f, [field]: value }));
//         if (errors[field]) {
//           setErrors(prev => ({ ...prev, [field]: null }));
//         }
//       }
//       return;
//     }
    
//     // For PAN - only allow uppercase letters and digits, max 10 chars
//     if (field === 'pan') {
//       const upperValue = value.toUpperCase();
//       if (value === '' || /^[A-Z0-9]*$/.test(upperValue)) {
//         setForm(f => ({ ...f, [field]: upperValue }));
//         if (errors[field]) {
//           setErrors(prev => ({ ...prev, [field]: null }));
//         }
//       }
//       return;
//     }
    
//     // For GST - only allow uppercase letters, digits, and hyphen, max 15 chars
//     if (field === 'gst') {
//       const upperValue = value.toUpperCase();
//       if (value === '' || /^[A-Z0-9-]*$/.test(upperValue)) {
//         setForm(f => ({ ...f, [field]: upperValue }));
//         if (errors[field]) {
//           setErrors(prev => ({ ...prev, [field]: null }));
//         }
//       }
//       return;
//     }
    
//     // For Account Number - only allow digits, max 18 chars
//     if (field === 'accountNumber' || field === 'confirmAccount') {
//       if (value === '' || /^[0-9]*$/.test(value)) {
//         setForm(f => ({ ...f, [field]: value }));
//         if (errors[field]) {
//           setErrors(prev => ({ ...prev, [field]: null }));
//         }
//       }
//       return;
//     }
    
//     setForm(f => ({ ...f, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: null }));
//     }
//   };

//   const genKey = (len = 32) => Array.from({ length: len }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

//   const summaryStatus = form.merchantStatus === "active" ? "Active" : form.merchantStatus === "inactive" ? "Inactive" : "Suspended";
//   const summaryStatusClass = form.merchantStatus === "active" ? "bg-green-100 text-green-700" : form.merchantStatus === "inactive" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600";

//   const showToast = (text, isErr = false) => {
//     setToast({ text, isErr });
//     setTimeout(() => setToast(null), 3000);
//   };

//   // ── Validation ──
//   const validateForm = () => {
//     const newErrors = {};

//     // ── ONLY PERSONAL INFORMATION IS REQUIRED ──
//     // Merchant Name
//     if (!form.merchantName) newErrors.merchantName = "Merchant name is required";
    
//     // Business Name
//     if (!form.businessName) newErrors.businessName = "Business name is required";
    
//     // Email
//     if (!form.email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }
    
//     // Mobile - Required + 10 digit validation
//     if (!form.mobile) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^[0-9]{10}$/.test(form.mobile)) {
//       newErrors.mobile = "Mobile number must be exactly 10 digits";
//     }
    
//     // Password
//     if (!form.password) {
//       newErrors.password = "Password is required";
//     } else if (form.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }
    
//     // Confirm Password
//     if (!form.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm password";
//     } else if (form.password !== form.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     // ── OPTIONAL FIELD VALIDATIONS (Format checks) ──
    
//     // PAN Card - If provided, validate format
//     if (form.pan && form.pan.trim() !== '') {
//       // PAN format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
//       const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//       if (!panPattern.test(form.pan)) {
//         newErrors.pan = "PAN must be 10 characters (5 letters, 4 digits, 1 letter)";
//       }
//     }
    
//     // GST Number - If provided, validate format
//     if (form.gst && form.gst.trim() !== '') {
//       // GST format: 2 digits, 10 characters, 1 digit, 1 state code, 1 check digit
//       // Example: 22AAAAA0000A1Z5
//       const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
//       if (!gstPattern.test(form.gst)) {
//         newErrors.gst = "Invalid GST format (e.g., 22AAAAA0000A1Z5)";
//       }
//     }
    
//     // Account Number - If provided, validate format
//     if (form.accountNumber && form.accountNumber.trim() !== '') {
//       // Account Number: 9-18 digits
//       if (!/^[0-9]{9,18}$/.test(form.accountNumber)) {
//         newErrors.accountNumber = "Account number must be 9-18 digits";
//       }
//     }
    
//     // Confirm Account - If provided, validate matches Account Number
//     if (form.confirmAccount && form.confirmAccount.trim() !== '') {
//       if (form.accountNumber !== form.confirmAccount) {
//         newErrors.confirmAccount = "Account numbers do not match";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ── Handle Create ──
//   const handleCreate = async () => {
//     if (!validateForm()) {
//       const firstError = Object.keys(errors)[0];
//       if (firstError) {
//         const element = document.querySelector(`[name="${firstError}"]`);
//         if (element) element.focus();
//       }
//       return;
//     }

//     setLoading(true);

//     try {
//       const submitData = {
//         ...form,
//         apiKey: apiKey || genKey(),
//         secretKey: secretKey || genKey(40)
//       };

//       const response = await merchantService.createMerchant(submitData, files);
      
//       showToast("Merchant created successfully!", false);
      
//       setTimeout(() => {
//         navigate("/all-merchant");
//       }, 1500);
//     } catch (error) {
//       console.error('Create merchant error:', error);
      
//       let errorMessage = 'Failed to create merchant. Please try again.';
      
//       if (error.response) {
//         const status = error.response.status;
//         const data = error.response.data;
        
//         if (status === 400) {
//           errorMessage = data.message || 'Invalid data. Please check your input.';
//           if (data.errors) {
//             const fieldErrors = {};
//             Object.keys(data.errors).forEach(key => {
//               fieldErrors[key] = data.errors[key][0] || data.errors[key];
//             });
//             setErrors(fieldErrors);
//           }
//         } else if (status === 409) {
//           errorMessage = 'A merchant with this email or mobile already exists.';
//         } else if (data?.message) {
//           errorMessage = data.message;
//         }
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       showToast(errorMessage, true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Toast Notification ── */}
//       {toast && (
//         <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg animate-slide-in text-xs sm:text-sm ${
//           toast.isErr ? "bg-red-500 text-white" : "bg-green-500 text-white"
//         }`}>
//           {!toast.isErr && (
//             <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           )}
//           {toast.text}
//         </div>
//       )}

//       {/* ── Page Header ── */}
//       <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => navigate("/all-merchant")}
//               className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 shrink-0"
//             >
//               <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             <div>
//               <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5 flex flex-wrap items-center">
//                 <button onClick={() => navigate("/all-merchant")} className="hover:text-blue-600 transition-colors">
//                   Merchants
//                 </button>
//                 <span className="mx-1">›</span>
//                 <span className="text-gray-600">Create Merchant</span>
//               </p>
//               <h1 className="text-lg sm:text-xl font-bold text-gray-900">Create Merchant</h1>
//               <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Add a new merchant and configure all the required details.</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 self-start sm:self-auto">
//             <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
//             <span className="text-[11px] sm:text-xs font-medium text-amber-600">
//               {loading ? "Creating..." : "Unsaved Draft"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="pt-2 px-3 sm:px-4 lg:px-1">
//         <div className="flex flex-col lg:flex-row gap-4">

//           {/* ── LEFT + MIDDLE (forms) ── */}
//           <div className="flex-1 min-w-0">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

//               {/* 1. Basic Information - ONLY REQUIRED SECTION */}
//               <SectionCard number="1" title="Basic Information">
//                 <div className="space-y-2.5 sm:space-y-3">
//                   <div>
//                     <Label required>Merchant Name</Label>
//                     <Input 
//                       placeholder="Enter merchant name" 
//                       value={form.merchantName} 
//                       onChange={set("merchantName")}
//                       error={errors.merchantName}
//                       name="merchantName"
//                     />
//                     {errors.merchantName && <p className="text-[10px] text-red-500 mt-0.5">{errors.merchantName}</p>}
//                   </div>
//                   <div>
//                     <Label required>Business Name</Label>
//                     <Input 
//                       placeholder="Enter business name" 
//                       value={form.businessName} 
//                       onChange={set("businessName")}
//                       error={errors.businessName}
//                       name="businessName"
//                     />
//                     {errors.businessName && <p className="text-[10px] text-red-500 mt-0.5">{errors.businessName}</p>}
//                   </div>
//                   <div>
//                     <Label required>Email Address</Label>
//                     <Input 
//                       placeholder="Enter email address" 
//                       type="email" 
//                       value={form.email} 
//                       onChange={set("email")}
//                       error={errors.email}
//                       name="email"
//                     />
//                     {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
//                   </div>
//                   <div>
//                     <Label required>Mobile Number</Label>
//                     <div className="flex gap-2">
//                       <div className="flex items-center gap-1 px-2 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-white text-[11px] sm:text-xs text-gray-700 cursor-pointer select-none whitespace-nowrap">
//                         🇮🇳 +91
//                         <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                       <Input 
//                         placeholder="Enter 10-digit mobile number" 
//                         type="tel" 
//                         value={form.mobile} 
//                         onChange={set("mobile")}
//                         error={errors.mobile}
//                         name="mobile"
//                         maxLength="10"
//                       />
//                     </div>
//                     {errors.mobile && <p className="text-[10px] text-red-500 mt-0.5">{errors.mobile}</p>}
//                   </div>
//                   <div>
//                     <Label required>Password</Label>
//                     <Input
//                       placeholder="Enter password (min 8 characters)"
//                       type={showPass ? "text" : "password"}
//                       value={form.password}
//                       onChange={set("password")}
//                       error={errors.password}
//                       name="password"
//                       suffix={
//                         <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
//                           {showPass
//                             ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
//                             : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                           }
//                         </button>
//                       }
//                     />
//                     {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
//                   </div>
//                   <div>
//                     <Label required>Confirm Password</Label>
//                     <Input
//                       placeholder="Confirm password"
//                       type={showConfirm ? "text" : "password"}
//                       value={form.confirmPassword}
//                       onChange={set("confirmPassword")}
//                       error={errors.confirmPassword}
//                       name="confirmPassword"
//                       suffix={
//                         <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600">
//                           {showConfirm
//                             ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
//                             : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                           }
//                         </button>
//                       }
//                     />
//                     {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-0.5">{errors.confirmPassword}</p>}
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* 2. Business Information - OPTIONAL with Format Validation */}
//               <SectionCard number="2" title="Business Information (Optional)">
//                 <div className="space-y-2.5 sm:space-y-3">
//                   <div>
//                     <Label>Business Type</Label>
//                     <Select 
//                       value={form.businessType} 
//                       onChange={set("businessType")} 
//                       options={BUSINESS_TYPES} 
//                       placeholder="Select business type (optional)"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
//                     <div>
//                       <Label>GST Number</Label>
//                       <Input 
//                         placeholder="22AAAAA0000A1Z5" 
//                         value={form.gst} 
//                         onChange={set("gst")}
//                         error={errors.gst}
//                         name="gst"
//                         maxLength="15"
//                       />
//                       {errors.gst && <p className="text-[10px] text-red-500 mt-0.5">{errors.gst}</p>}
//                       <p className="text-[9px] text-gray-400 mt-0.5">Format: 2 digits + 5 letters + 4 digits + 1 letter + 1 state code + Z + 1 check digit</p>
//                     </div>
//                     <div>
//                       <Label>PAN Number</Label>
//                       <Input 
//                         placeholder="ABCDE1234F" 
//                         value={form.pan} 
//                         onChange={set("pan")}
//                         error={errors.pan}
//                         name="pan"
//                         maxLength="10"
//                       />
//                       {errors.pan && <p className="text-[10px] text-red-500 mt-0.5">{errors.pan}</p>}
//                       <p className="text-[9px] text-gray-400 mt-0.5">Format: 5 letters + 4 digits + 1 letter</p>
//                     </div>
//                   </div>
//                   <div>
//                     <Label>Website URL</Label>
//                     <Input placeholder="https://www.example.com" value={form.websiteUrl} onChange={set("websiteUrl")} />
//                   </div>
//                   <div>
//                     <Label>Business Address</Label>
//                     <textarea
//                       placeholder="Enter complete business address (optional)"
//                       value={form.businessAddress}
//                       onChange={set("businessAddress")}
//                       rows={2}
//                       className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
//                     <div>
//                       <Label>City</Label>
//                       <Input 
//                         placeholder="City (optional)" 
//                         value={form.city} 
//                         onChange={set("city")}
//                         name="city"
//                       />
//                     </div>
//                     <div>
//                       <Label>State</Label>
//                       <Input 
//                         placeholder="State (optional)" 
//                         value={form.state} 
//                         onChange={set("state")}
//                         name="state"
//                       />
//                     </div>
//                     <div>
//                       <Label>Pincode</Label>
//                       <Input 
//                         placeholder="Pincode (optional)" 
//                         value={form.pincode} 
//                         onChange={set("pincode")}
//                         name="pincode"
//                         maxLength="6"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* 3. Bank Information - OPTIONAL with Format Validation */}
//               <SectionCard number="3" title="Bank Information (Optional)">
//                 <div className="space-y-2.5 sm:space-y-3">
//                   <div>
//                     <Label>Account Holder Name</Label>
//                     <Input 
//                       placeholder="Enter account holder name (optional)" 
//                       value={form.accountHolder} 
//                       onChange={set("accountHolder")}
//                       name="accountHolder"
//                     />
//                   </div>
//                   <div>
//                     <Label>Bank Name</Label>
//                     <Select 
//                       value={form.bankName} 
//                       onChange={set("bankName")} 
//                       options={BANKS} 
//                       placeholder="Select bank name (optional)"
//                     />
//                   </div>
//                   <div>
//                     <Label>Account Number</Label>
//                     <Input 
//                       placeholder="9-18 digits (optional)" 
//                       value={form.accountNumber} 
//                       onChange={set("accountNumber")}
//                       error={errors.accountNumber}
//                       name="accountNumber"
//                       maxLength="18"
//                     />
//                     {errors.accountNumber && <p className="text-[10px] text-red-500 mt-0.5">{errors.accountNumber}</p>}
//                     <p className="text-[9px] text-gray-400 mt-0.5">Account number must be 9-18 digits</p>
//                   </div>
//                   <div>
//                     <Label>Confirm Account Number</Label>
//                     <Input 
//                       placeholder="Confirm account number (optional)" 
//                       value={form.confirmAccount} 
//                       onChange={set("confirmAccount")}
//                       error={errors.confirmAccount}
//                       name="confirmAccount"
//                       maxLength="18"
//                     />
//                     {errors.confirmAccount && <p className="text-[10px] text-red-500 mt-0.5">{errors.confirmAccount}</p>}
//                   </div>
//                   <div>
//                     <Label>IFSC Code</Label>
//                     <div className="flex flex-col sm:flex-row gap-2">
//                       <div className="flex-1">
//                         <Input 
//                           placeholder="Enter IFSC code (optional)" 
//                           value={form.ifsc} 
//                           onChange={set("ifsc")}
//                           name="ifsc"
//                         />
//                       </div>
//                       <button
//                         onClick={() => setIfscVerified(true)}
//                         className={`px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${ifscVerified ? "bg-green-100 text-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
//                       >
//                         {ifscVerified ? "✓ Verified" : "Verify IFSC"}
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <Label>Branch Name</Label>
//                     <Input 
//                       placeholder="Enter branch name (optional)" 
//                       value={form.branchName} 
//                       onChange={set("branchName")} 
//                       readOnly={ifscVerified} 
//                     />
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* 4. API Configuration - OPTIONAL */}
//               <SectionCard number="4" title="API Configuration (Optional)">
//                 <div className="space-y-2.5 sm:space-y-3">
//                   <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
//                     <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-[11px] sm:text-xs text-blue-600">API credentials will be auto-generated for the merchant.</p>
//                   </div>
//                   <div>
//                     <Label>Merchant ID</Label>
//                     <div className="relative">
//                       <input readOnly value="Auto generated" className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-8 sm:pr-10" />
//                       <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                         <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <Label>API Key</Label>
//                     <div className="flex flex-col sm:flex-row gap-2">
//                       <div className="relative flex-1">
//                         <input
//                           readOnly
//                           type={showApiKey ? "text" : "password"}
//                           value={apiKey || "Auto generated"}
//                           className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-14 sm:pr-16"
//                         />
//                         <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1">
//                           <button onClick={() => setShowApiKey(!showApiKey)} className="text-gray-400 hover:text-gray-600">
//                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                           </button>
//                           <button onClick={() => apiKey && navigator.clipboard?.writeText(apiKey)} className="text-gray-400 hover:text-gray-600">
//                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                           </button>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setApiKey(genKey())}
//                         className="px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
//                       >
//                         Generate API Key
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <Label>Secret Key</Label>
//                     <div className="flex flex-col sm:flex-row gap-2">
//                       <div className="relative flex-1">
//                         <input
//                           readOnly
//                           type="password"
//                           value={secretKey || "Auto generated"}
//                           className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-400 bg-gray-50 outline-none pr-14 sm:pr-16"
//                         />
//                         <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1">
//                           <button className="text-gray-400 hover:text-gray-600">
//                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                           </button>
//                           <button className="text-gray-400 hover:text-gray-600">
//                             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//                           </button>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setSecretKey(genKey(40))}
//                         className="px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-colors"
//                       >
//                         Generate Secret Key
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* 5. Webhook Configuration - OPTIONAL */}
//               <SectionCard number="5" title="Webhook Configuration (Optional)">
//                 <div className="space-y-2.5 sm:space-y-3">
//                   <div>
//                     <Label>Webhook URL</Label>
//                     <Input placeholder="https://yourdomain.com/webhook/payout" value={form.webhookUrl} onChange={set("webhookUrl")} />
//                   </div>
//                   <div>
//                     <Label>Enable Webhook</Label>
//                     <div className="flex gap-4 sm:gap-6 mt-1">
//                       {["yes", "no"].map(v => (
//                         <label key={v} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
//                           <div
//                             onClick={() => setForm(f => ({ ...f, enableWebhook: v }))}
//                             className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.enableWebhook === v ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
//                           >
//                             {form.enableWebhook === v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                           </div>
//                           <span className="text-[12px] sm:text-sm text-gray-700 capitalize">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   {form.enableWebhook === "yes" && (
//                     <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                       <p className="text-[11px] sm:text-xs text-green-700">We will send real-time payout status updates to the above webhook URL.</p>
//                     </div>
//                   )}
//                 </div>
//               </SectionCard>

//               {/* 6. Transaction Configuration - OPTIONAL */}
//               <SectionCard number="6" title="Transaction Configuration (Optional)">
//                 <div className="space-y-2.5 sm:space-y-3">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
//                     <div>
//                       <Label>Minimum Payout Amount (₹)</Label>
//                       <Input 
//                         placeholder="1" 
//                         value={form.minPayout} 
//                         onChange={set("minPayout")}
//                         name="minPayout"
//                       />
//                     </div>
//                     <div>
//                       <Label>Maximum Payout Amount (₹)</Label>
//                       <Input 
//                         placeholder="50,000" 
//                         value={form.maxPayout} 
//                         onChange={set("maxPayout")}
//                         name="maxPayout"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
//                     <div>
//                       <Label>Daily Limit (₹)</Label>
//                       <Input 
//                         placeholder="10,00,000" 
//                         value={form.dailyLimit} 
//                         onChange={set("dailyLimit")}
//                         name="dailyLimit"
//                       />
//                     </div>
//                     <div>
//                       <Label>Monthly Limit (₹)</Label>
//                       <Input 
//                         placeholder="1,00,00,000" 
//                         value={form.monthlyLimit} 
//                         onChange={set("monthlyLimit")}
//                         name="monthlyLimit"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
//                     <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-[11px] sm:text-xs text-blue-600">These limits can be updated later from merchant settings.</p>
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* 7. Status Configuration - OPTIONAL */}
//               <SectionCard number="7" title="Status Configuration (Optional)">
//                 <div>
//                   <Label>Merchant Status</Label>
//                   <div className="space-y-2 mt-1.5 sm:mt-2">
//                     {[
//                       { val: "active",    label: "Active",    badge: "Recommended" },
//                       { val: "inactive",  label: "Inactive" },
//                       { val: "suspended", label: "Suspended" },
//                     ].map(opt => (
//                       <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
//                         <div
//                           onClick={() => setForm(f => ({ ...f, merchantStatus: opt.val }))}
//                           className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.merchantStatus === opt.val ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
//                         >
//                           {form.merchantStatus === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                         </div>
//                         <span className="text-[12px] sm:text-sm text-gray-700">{opt.label}</span>
//                         {opt.badge && (
//                           <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] sm:text-[10px] font-semibold rounded">{opt.badge}</span>
//                         )}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </SectionCard>

//             </div>
//           </div>

//           {/* ── RIGHT COLUMN (sidebar) ── */}
//           <div className="lg:w-80 xl:w-96 shrink-0">
//             <div className="space-y-3 sm:space-y-4 sticky top-5">

//               {/* Merchant Summary - Fully Dynamic */}
//               <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
//                 <h2 className="text-xs sm:text-sm font-bold text-gray-800 mb-2.5 sm:mb-3">Merchant Summary</h2>
//                 <div className="space-y-2">
//                   {[
//                     { icon: "🏢", label: "Business Type", value: form.businessType || "Not selected" },
//                     { icon: "🏦", label: "Bank Name", value: form.bankName || "Not selected" },
//                     { icon: "⏱️", label: "Settlement Cycle", value: form.settlementCycle || "Not selected" },
//                     { icon: "💰", label: "Min Payout", value: `₹ ${form.minPayout || '0'}` },
//                     { icon: "💰", label: "Max Payout", value: `₹ ${form.maxPayout || '0'}` },
//                     { icon: "📅", label: "Daily Limit", value: `₹ ${form.dailyLimit || '0'}` },
//                     { icon: "🗓️", label: "Monthly Limit", value: `₹ ${form.monthlyLimit || '0'}` },
//                     { icon: "📧", label: "Email", value: form.email || "Not provided" },
//                     { icon: "📱", label: "Mobile", value: form.mobile || "Not provided" },
//                     { icon: "📍", label: "City", value: form.city || "Not provided" },
//                     { icon: "🗺️", label: "State", value: form.state || "Not provided" },
//                     { icon: "📮", label: "Pincode", value: form.pincode || "Not provided" },
//                     { icon: "🔗", label: "Webhook", value: form.enableWebhook === "yes" ? "✅ Enabled" : "❌ Disabled" },
//                     { icon: "🏷️", label: "GST", value: form.gst || "Not provided" },
//                     { icon: "🆔", label: "PAN", value: form.pan || "Not provided" },
//                     { icon: "🏛️", label: "Account Holder", value: form.accountHolder || "Not provided" },
//                     { icon: "🔢", label: "Account Number", value: form.accountNumber ? `****${form.accountNumber.slice(-4)}` : "Not provided" },
//                     { icon: "🏦", label: "IFSC Code", value: form.ifsc || "Not provided" },
//                     { icon: "🏢", label: "Branch", value: form.branchName || "Not provided" },
//                   ].map(r => (
//                     <div key={r.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <span className="text-xs sm:text-sm">{r.icon}</span>
//                         <span className="text-[11px] sm:text-xs text-gray-500">{r.label}</span>
//                       </div>
//                       <span className="text-[11px] sm:text-xs font-medium text-gray-700 text-right max-w-25 truncate" title={r.value}>
//                         {r.value}
//                       </span>
//                     </div>
//                   ))}
//                   <div className="flex items-center justify-between py-1 border-t border-gray-200 pt-2 mt-1">
//                     <div className="flex items-center gap-1.5 sm:gap-2">
//                       <span className="text-xs sm:text-sm">👤</span>
//                       <span className="text-[11px] sm:text-xs text-gray-500 font-semibold">Status</span>
//                     </div>
//                     <span className={`text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${summaryStatusClass}`}>
//                       {summaryStatus}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Documents Upload */}
//               <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
//                 <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
//                   <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0">8</span>
//                   <h2 className="text-xs sm:text-sm font-bold text-gray-800">Documents Upload</h2>
//                 </div>
//                 <div>
//                   <UploadField 
//                     label="PAN Card" 
//                     required 
//                     onFileChange={setFile('panCard')}
//                     fileName={files.panCard?.name}
//                     fileSize={files.panCard?.size}
//                   />
//                   <UploadField 
//                     label="GST Certificate" 
//                     required 
//                     onFileChange={setFile('gstCertificate')}
//                     fileName={files.gstCertificate?.name}
//                     fileSize={files.gstCertificate?.size}
//                   />
//                   <UploadField 
//                     label="Cancelled Cheque" 
//                     required 
//                     onFileChange={setFile('cancelledCheque')}
//                     fileName={files.cancelledCheque?.name}
//                     fileSize={files.cancelledCheque?.size}
//                   />
//                   <UploadField 
//                     label="Company Registration Certificate" 
//                     required 
//                     onFileChange={setFile('registrationCertificate')}
//                     fileName={files.registrationCertificate?.name}
//                     fileSize={files.registrationCertificate?.size}
//                   />
//                   <UploadField 
//                     label="Owner ID Proof" 
//                     required 
//                     onFileChange={setFile('ownerIdProof')}
//                     fileName={files.ownerIdProof?.name}
//                     fileSize={files.ownerIdProof?.size}
//                   />
//                 </div>
//                 <div
//                   ref={dropRef}
//                   onDragOver={e => e.preventDefault()}
//                   onDrop={e => e.preventDefault()}
//                   className="mt-3 sm:mt-4 border-2 border-dashed border-gray-200 rounded-xl p-3 sm:p-5 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
//                 >
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                     </svg>
//                   </div>
//                   <p className="text-[11px] sm:text-xs text-gray-500">Drag & drop files here</p>
//                   <p className="text-[10px] sm:text-xs text-gray-400 my-1">or</p>
//                   <button className="text-[11px] sm:text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-gray-50 transition-colors">
//                     Browse Files
//                   </button>
//                   <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1.5 sm:mt-2">Allowed files: PDF, JPG, PNG (Max 5MB each)</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Bottom Action Bar ── */}
//         <div className="mt-4 sm:mt-5 mb-4 sm:mb-6 bg-white border border-gray-200 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
//           <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
//             <button
//               onClick={() => {
//                 setForm(EMPTY_FORM);
//                 setApiKey("");
//                 setSecretKey("");
//                 setFiles({
//                   panCard: null,
//                   gstCertificate: null,
//                   cancelledCheque: null,
//                   registrationCertificate: null,
//                   ownerIdProof: null
//                 });
//                 setErrors({});
//               }}
//               className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
//               disabled={loading}
//             >
//               <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               Reset Form
//             </button>

//             <button
//               onClick={() => navigate("/all-merchant")}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
//               disabled={loading}
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleCreate}
//               disabled={loading}
//               className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] sm:text-sm font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                   Create Merchant
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slide-in {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
// src/pages/merchant/AddMerchant.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import merchantService from "../../services/MerchantListServices";

// ── Helpers ───────────────────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="block text-[11px] sm:text-xs font-medium text-gray-600 mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Input({ placeholder, type = "text", value, onChange, className = "", suffix, prefix, readOnly, error, maxLength }) {
  return (
    <div className="relative flex items-center">
      {prefix && <span className="absolute left-3 text-[11px] sm:text-xs text-gray-400">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        autoComplete="off"
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all ${prefix ? "pl-7 sm:pl-8" : ""} ${suffix ? "pr-8 sm:pr-10" : ""} ${readOnly ? "bg-gray-50 text-gray-400" : ""} ${error ? "border-red-400 focus:ring-red-100 focus:border-red-400" : "border-gray-200"} ${className}`}
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
        className={`w-full border rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white appearance-none cursor-pointer transition-all ${error ? "border-red-400 focus:ring-red-100" : "border-gray-200"}`}
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
        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h2 className="text-xs sm:text-sm font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── UploadField with file management ──
function UploadField({ label, required, onFileChange, fileName, fileSize, accept = ".pdf,.jpg,.jpeg,.png", maxSize = 5 }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const ref = useRef();

  const validateFile = (file) => {
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) && !['.pdf', '.jpg', '.jpeg', '.png'].includes(fileExtension)) {
      setError('Only PDF, JPG, or PNG files are allowed');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      if (onFileChange) onFileChange(selectedFile);
    } else if (selectedFile) {
      e.target.value = '';
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (onFileChange) onFileChange(null);
    if (ref.current) {
      ref.current.value = '';
    }
    setError('');
  };

  const displayFileName = file ? file.name : (fileName || null);
  const displayFileSize = file ? file.size : (fileSize || null);

  return (
    <div className="flex flex-col py-2 border-b border-gray-50 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
        <span className="text-[11px] sm:text-xs text-gray-600">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {displayFileName ? (
          <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] sm:text-xs text-green-700 truncate max-w-25">
              {displayFileName}
            </span>
            {displayFileSize && (
              <span className="text-[9px] text-gray-400">
                ({(displayFileSize / (1024 * 1024)).toFixed(2)} MB)
              </span>
            )}
            <button
              onClick={handleRemove}
              className="text-red-400 hover:text-red-600 ml-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => ref.current?.click()}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-blue-600 font-medium hover:text-blue-700"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload file
          </button>
        )}
      </div>
      
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileSelect}
      />

      {!displayFileName && (
        <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-2 text-center">
          <p className="text-[9px] sm:text-[10px] text-gray-400">
            Drag & drop or click to upload
          </p>
          <p className="text-[8px] sm:text-[9px] text-gray-400">
            PDF, JPG, PNG (Max {maxSize}MB)
          </p>
        </div>
      )}

      {error && (
        <p className="text-[9px] text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Yes Bank", "IndusInd Bank", "IDFC First Bank"];
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [fieldTouched, setFieldTouched] = useState({});

  // ── File states ──
  const [files, setFiles] = useState({
    panCard: null,
    gstCertificate: null,
    cancelledCheque: null,
    registrationCertificate: null,
    ownerIdProof: null
  });

  const setFile = (field) => (file) => {
    setFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const set = (field) => (e) => {
    const value = e.target.value;
    
    // For mobile number - only allow digits and max 10 digits
    if (field === 'mobile') {
      if (value === '' || /^[0-9]*$/.test(value)) {
        setForm(f => ({ ...f, [field]: value }));
        setFieldTouched(prev => ({ ...prev, [field]: true }));
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: null }));
        }
        // Real-time validation for mobile
        if (value.length === 10) {
          // Valid 10 digits
        } else if (value.length > 0) {
          // Show error only when typing
        }
      }
      return;
    }
    
    // For PAN - only allow uppercase letters and digits, max 10 chars
    if (field === 'pan') {
      const upperValue = value.toUpperCase();
      if (value === '' || /^[A-Z0-9]*$/.test(upperValue)) {
        setForm(f => ({ ...f, [field]: upperValue }));
        setFieldTouched(prev => ({ ...prev, [field]: true }));
        // Real-time validation for PAN
        validatePan(upperValue);
      }
      return;
    }
    
    // For GST - only allow uppercase letters, digits, and hyphen, max 15 chars
    if (field === 'gst') {
      const upperValue = value.toUpperCase();
      if (value === '' || /^[A-Z0-9-]*$/.test(upperValue)) {
        setForm(f => ({ ...f, [field]: upperValue }));
        setFieldTouched(prev => ({ ...prev, [field]: true }));
        // Real-time validation for GST
        validateGst(upperValue);
      }
      return;
    }
    
    // For Account Number - only allow digits, max 18 chars
    if (field === 'accountNumber' || field === 'confirmAccount') {
      if (value === '' || /^[0-9]*$/.test(value)) {
        setForm(f => ({ ...f, [field]: value }));
        setFieldTouched(prev => ({ ...prev, [field]: true }));
        // Real-time validation for Account Number
        if (field === 'accountNumber') {
          validateAccountNumber(value);
        }
        if (field === 'confirmAccount') {
          validateConfirmAccount(value);
        }
      }
      return;
    }
    
    // For Email - real-time validation
    if (field === 'email') {
      setForm(f => ({ ...f, [field]: value }));
      setFieldTouched(prev => ({ ...prev, [field]: true }));
      validateEmail(value);
      return;
    }
    
    setForm(f => ({ ...f, [field]: value }));
    setFieldTouched(prev => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // ── Real-time Validation Functions ──
  const validatePan = (value) => {
    if (!value || value === '') {
      setErrors(prev => ({ ...prev, pan: null }));
      return;
    }
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panPattern.test(value)) {
      setErrors(prev => ({ ...prev, pan: "PAN must be 10 characters (5 letters, 4 digits, 1 letter)" }));
    } else {
      setErrors(prev => ({ ...prev, pan: null }));
    }
  };

  const validateGst = (value) => {
    if (!value || value === '') {
      setErrors(prev => ({ ...prev, gst: null }));
      return;
    }
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstPattern.test(value)) {
      setErrors(prev => ({ ...prev, gst: "Invalid GST format (e.g., 22AAAAA0000A1Z5)" }));
    } else {
      setErrors(prev => ({ ...prev, gst: null }));
    }
  };

  const validateAccountNumber = (value) => {
    if (!value || value === '') {
      setErrors(prev => ({ ...prev, accountNumber: null }));
      return;
    }
    if (!/^[0-9]{9,18}$/.test(value)) {
      setErrors(prev => ({ ...prev, accountNumber: "Account number must be 9-18 digits" }));
    } else {
      setErrors(prev => ({ ...prev, accountNumber: null }));
    }
    // Also re-validate confirm account
    if (form.confirmAccount) {
      validateConfirmAccount(form.confirmAccount);
    }
  };

  const validateConfirmAccount = (value) => {
    if (!value || value === '') {
      setErrors(prev => ({ ...prev, confirmAccount: null }));
      return;
    }
    if (form.accountNumber !== value) {
      setErrors(prev => ({ ...prev, confirmAccount: "Account numbers do not match" }));
    } else {
      setErrors(prev => ({ ...prev, confirmAccount: null }));
    }
  };

  const validateEmail = (value) => {
    if (!value || value === '') {
      setErrors(prev => ({ ...prev, email: null }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors(prev => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  // ── Validation on submit ──
  const validateForm = () => {
    const newErrors = {};

    // Merchant Name
    if (!form.merchantName) newErrors.merchantName = "Merchant name is required";
    
    // Business Name
    if (!form.businessName) newErrors.businessName = "Business name is required";
    
    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    
    // Mobile - Required + 10 digit validation
    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    
    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Optional field validations (only if value is provided)
    if (form.pan && form.pan.trim() !== '') {
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panPattern.test(form.pan)) {
        newErrors.pan = "PAN must be 10 characters (5 letters, 4 digits, 1 letter)";
      }
    }
    
    if (form.gst && form.gst.trim() !== '') {
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      if (!gstPattern.test(form.gst)) {
        newErrors.gst = "Invalid GST format (e.g., 22AAAAA0000A1Z5)";
      }
    }
    
    if (form.accountNumber && form.accountNumber.trim() !== '') {
      if (!/^[0-9]{9,18}$/.test(form.accountNumber)) {
        newErrors.accountNumber = "Account number must be 9-18 digits";
      }
    }
    
    if (form.confirmAccount && form.confirmAccount.trim() !== '') {
      if (form.accountNumber !== form.confirmAccount) {
        newErrors.confirmAccount = "Account numbers do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const genKey = (len = 32) => Array.from({ length: len }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

  const summaryStatus = form.merchantStatus === "active" ? "Active" : form.merchantStatus === "inactive" ? "Inactive" : "Suspended";
  const summaryStatusClass = form.merchantStatus === "active" ? "bg-green-100 text-green-700" : form.merchantStatus === "inactive" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600";

  const showToast = (text, isErr = false) => {
    setToast({ text, isErr });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Handle Create ──
  const handleCreate = async () => {
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
      const submitData = {
        ...form,
        apiKey: apiKey || genKey(),
        secretKey: secretKey || genKey(40)
      };

      const response = await merchantService.createMerchant(submitData, files);
      
      showToast("Merchant created successfully!", false);
      
      setTimeout(() => {
        navigate("/all-merchant");
      }, 1500);
    } catch (error) {
      console.error('Create merchant error:', error);
      
      let errorMessage = 'Failed to create merchant. Please try again.';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = data.message || 'Invalid data. Please check your input.';
          if (data.errors) {
            const fieldErrors = {};
            Object.keys(data.errors).forEach(key => {
              fieldErrors[key] = data.errors[key][0] || data.errors[key];
            });
            setErrors(fieldErrors);
          }
        } else if (status === 409) {
          errorMessage = 'A merchant with this email or mobile already exists.';
        } else if (data?.message) {
          errorMessage = data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast(errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Toast Notification ── */}
      {toast && (
        <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg animate-slide-in text-xs sm:text-sm ${
          toast.isErr ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}>
          {!toast.isErr && (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.text}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/all-merchant")}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-800 shrink-0"
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

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 self-start sm:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium text-amber-600">
              {loading ? "Creating..." : "Unsaved Draft"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pt-2 px-3 sm:px-4 lg:px-1">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* ── LEFT + MIDDLE (forms) ── */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

              {/* 1. Basic Information - ONLY REQUIRED SECTION */}
              <SectionCard number="1" title="Basic Information">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label required>Merchant Name</Label>
                    <Input 
                      placeholder="Enter merchant name" 
                      value={form.merchantName} 
                      onChange={set("merchantName")}
                      error={errors.merchantName}
                      name="merchantName"
                    />
                    {errors.merchantName && <p className="text-[10px] text-red-500 mt-0.5">{errors.merchantName}</p>}
                  </div>
                  <div>
                    <Label required>Business Name</Label>
                    <Input 
                      placeholder="Enter business name" 
                      value={form.businessName} 
                      onChange={set("businessName")}
                      error={errors.businessName}
                      name="businessName"
                    />
                    {errors.businessName && <p className="text-[10px] text-red-500 mt-0.5">{errors.businessName}</p>}
                  </div>
                  <div>
                    <Label required>Email Address</Label>
                    <Input 
                      placeholder="Enter email address" 
                      type="email" 
                      value={form.email} 
                      onChange={set("email")}
                      error={errors.email}
                      name="email"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
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
                      <Input 
                        placeholder="Enter 10-digit mobile number" 
                        type="tel" 
                        value={form.mobile} 
                        onChange={set("mobile")}
                        error={errors.mobile}
                        name="mobile"
                        maxLength="10"
                      />
                    </div>
                    {errors.mobile && <p className="text-[10px] text-red-500 mt-0.5">{errors.mobile}</p>}
                  </div>
                  <div>
                    <Label required>Password</Label>
                    <Input
                      placeholder="Enter password (min 8 characters)"
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={set("password")}
                      error={errors.password}
                      name="password"
                      suffix={
                        <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                          {showPass
                            ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          }
                        </button>
                      }
                    />
                    {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
                  </div>
                  <div>
                    <Label required>Confirm Password</Label>
                    <Input
                      placeholder="Confirm password"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={set("confirmPassword")}
                      error={errors.confirmPassword}
                      name="confirmPassword"
                      suffix={
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600">
                          {showConfirm
                            ? <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            : <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          }
                        </button>
                      }
                    />
                    {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-0.5">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </SectionCard>

              {/* 2. Business Information - OPTIONAL with Format Validation */}
              <SectionCard number="2" title="Business Information (Optional)">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label>Business Type</Label>
                    <Select 
                      value={form.businessType} 
                      onChange={set("businessType")} 
                      options={BUSINESS_TYPES} 
                      placeholder="Select business type (optional)"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label>GST Number</Label>
                      <Input 
                        placeholder="22AAAAA0000A1Z5" 
                        value={form.gst} 
                        onChange={set("gst")}
                        error={errors.gst}
                        name="gst"
                        maxLength="15"
                      />
                      {errors.gst && <p className="text-[10px] text-red-500 mt-0.5">{errors.gst}</p>}
                      <p className="text-[9px] text-gray-400 mt-0.5">Format: 2 digits + 5 letters + 4 digits + 1 letter + 1 state code + Z + 1 check digit</p>
                    </div>
                    <div>
                      <Label>PAN Number</Label>
                      <Input 
                        placeholder="ABCDE1234F" 
                        value={form.pan} 
                        onChange={set("pan")}
                        error={errors.pan}
                        name="pan"
                        maxLength="10"
                      />
                      {errors.pan && <p className="text-[10px] text-red-500 mt-0.5">{errors.pan}</p>}
                      <p className="text-[9px] text-gray-400 mt-0.5">Format: 5 letters + 4 digits + 1 letter</p>
                    </div>
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input placeholder="https://www.example.com" value={form.websiteUrl} onChange={set("websiteUrl")} />
                  </div>
                  <div>
                    <Label>Business Address</Label>
                    <textarea
                      placeholder="Enter complete business address (optional)"
                      value={form.businessAddress}
                      onChange={set("businessAddress")}
                      rows={2}
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 sm:py-2 text-[12px] sm:text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <Label>City</Label>
                      <Input 
                        placeholder="City (optional)" 
                        value={form.city} 
                        onChange={set("city")}
                        name="city"
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input 
                        placeholder="State (optional)" 
                        value={form.state} 
                        onChange={set("state")}
                        name="state"
                      />
                    </div>
                    <div>
                      <Label>Pincode</Label>
                      <Input 
                        placeholder="Pincode (optional)" 
                        value={form.pincode} 
                        onChange={set("pincode")}
                        name="pincode"
                        maxLength="6"
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* 3. Bank Information - OPTIONAL with Format Validation */}
              <SectionCard number="3" title="Bank Information (Optional)">
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <Label>Account Holder Name</Label>
                    <Input 
                      placeholder="Enter account holder name (optional)" 
                      value={form.accountHolder} 
                      onChange={set("accountHolder")}
                      name="accountHolder"
                    />
                  </div>
                  <div>
                    <Label>Bank Name</Label>
                    <Select 
                      value={form.bankName} 
                      onChange={set("bankName")} 
                      options={BANKS} 
                      placeholder="Select bank name (optional)"
                    />
                  </div>
                  <div>
                    <Label>Account Number</Label>
                    <Input 
                      placeholder="9-18 digits (optional)" 
                      value={form.accountNumber} 
                      onChange={set("accountNumber")}
                      error={errors.accountNumber}
                      name="accountNumber"
                      maxLength="18"
                    />
                    {errors.accountNumber && <p className="text-[10px] text-red-500 mt-0.5">{errors.accountNumber}</p>}
                    <p className="text-[9px] text-gray-400 mt-0.5">Account number must be 9-18 digits</p>
                  </div>
                  <div>
                    <Label>Confirm Account Number</Label>
                    <Input 
                      placeholder="Confirm account number (optional)" 
                      value={form.confirmAccount} 
                      onChange={set("confirmAccount")}
                      error={errors.confirmAccount}
                      name="confirmAccount"
                      maxLength="18"
                    />
                    {errors.confirmAccount && <p className="text-[10px] text-red-500 mt-0.5">{errors.confirmAccount}</p>}
                  </div>
                  <div>
                    <Label>IFSC Code</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1">
                        <Input 
                          placeholder="Enter IFSC code (optional)" 
                          value={form.ifsc} 
                          onChange={set("ifsc")}
                          name="ifsc"
                        />
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
                    <Input 
                      placeholder="Enter branch name (optional)" 
                      value={form.branchName} 
                      onChange={set("branchName")} 
                      readOnly={ifscVerified} 
                    />
                  </div>
                </div>
              </SectionCard>

              {/* 4. API Configuration - OPTIONAL */}
              <SectionCard number="4" title="API Configuration (Optional)">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* 5. Webhook Configuration - OPTIONAL */}
              <SectionCard number="5" title="Webhook Configuration (Optional)">
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
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-[11px] sm:text-xs text-green-700">We will send real-time payout status updates to the above webhook URL.</p>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* 6. Transaction Configuration - OPTIONAL */}
              <SectionCard number="6" title="Transaction Configuration (Optional)">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label>Minimum Payout Amount (₹)</Label>
                      <Input 
                        placeholder="1" 
                        value={form.minPayout} 
                        onChange={set("minPayout")}
                        name="minPayout"
                      />
                    </div>
                    <div>
                      <Label>Maximum Payout Amount (₹)</Label>
                      <Input 
                        placeholder="50,000" 
                        value={form.maxPayout} 
                        onChange={set("maxPayout")}
                        name="maxPayout"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label>Daily Limit (₹)</Label>
                      <Input 
                        placeholder="10,00,000" 
                        value={form.dailyLimit} 
                        onChange={set("dailyLimit")}
                        name="dailyLimit"
                      />
                    </div>
                    <div>
                      <Label>Monthly Limit (₹)</Label>
                      <Input 
                        placeholder="1,00,00,000" 
                        value={form.monthlyLimit} 
                        onChange={set("monthlyLimit")}
                        name="monthlyLimit"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[11px] sm:text-xs text-blue-600">These limits can be updated later from merchant settings.</p>
                  </div>
                </div>
              </SectionCard>

              {/* 7. Status Configuration - OPTIONAL */}
              <SectionCard number="7" title="Status Configuration (Optional)">
                <div>
                  <Label>Merchant Status</Label>
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
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="space-y-3 sm:space-y-4 sticky top-5">

              {/* Merchant Summary - Fully Dynamic */}
              <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                <h2 className="text-xs sm:text-sm font-bold text-gray-800 mb-2.5 sm:mb-3">Merchant Summary</h2>
                <div className="space-y-2">
                  {[
                    { icon: "🏢", label: "Business Type", value: form.businessType || "Not selected" },
                    { icon: "🏦", label: "Bank Name", value: form.bankName || "Not selected" },
                    { icon: "⏱️", label: "Settlement Cycle", value: form.settlementCycle || "Not selected" },
                    { icon: "💰", label: "Min Payout", value: `₹ ${form.minPayout || '0'}` },
                    { icon: "💰", label: "Max Payout", value: `₹ ${form.maxPayout || '0'}` },
                    { icon: "📅", label: "Daily Limit", value: `₹ ${form.dailyLimit || '0'}` },
                    { icon: "🗓️", label: "Monthly Limit", value: `₹ ${form.monthlyLimit || '0'}` },
                    { icon: "📧", label: "Email", value: form.email || "Not provided" },
                    { icon: "📱", label: "Mobile", value: form.mobile || "Not provided" },
                    { icon: "📍", label: "City", value: form.city || "Not provided" },
                    { icon: "🗺️", label: "State", value: form.state || "Not provided" },
                    { icon: "📮", label: "Pincode", value: form.pincode || "Not provided" },
                    { icon: "🔗", label: "Webhook", value: form.enableWebhook === "yes" ? "✅ Enabled" : "❌ Disabled" },
                    { icon: "🏷️", label: "GST", value: form.gst || "Not provided" },
                    { icon: "🆔", label: "PAN", value: form.pan || "Not provided" },
                    { icon: "🏛️", label: "Account Holder", value: form.accountHolder || "Not provided" },
                    { icon: "🔢", label: "Account Number", value: form.accountNumber ? `****${form.accountNumber.slice(-4)}` : "Not provided" },
                    { icon: "🏦", label: "IFSC Code", value: form.ifsc || "Not provided" },
                    { icon: "🏢", label: "Branch", value: form.branchName || "Not provided" },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-xs sm:text-sm">{r.icon}</span>
                        <span className="text-[11px] sm:text-xs text-gray-500">{r.label}</span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium text-gray-700 text-right max-w-25 truncate" title={r.value}>
                        {r.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-1 border-t border-gray-200 pt-2 mt-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm">👤</span>
                      <span className="text-[11px] sm:text-xs text-gray-500 font-semibold">Status</span>
                    </div>
                    <span className={`text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${summaryStatusClass}`}>
                      {summaryStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0">8</span>
                  <h2 className="text-xs sm:text-sm font-bold text-gray-800">Documents Upload</h2>
                </div>
                <div>
                  <UploadField 
                    label="PAN Card" 
                    required 
                    onFileChange={setFile('panCard')}
                    fileName={files.panCard?.name}
                    fileSize={files.panCard?.size}
                  />
                  <UploadField 
                    label="GST Certificate" 
                    required 
                    onFileChange={setFile('gstCertificate')}
                    fileName={files.gstCertificate?.name}
                    fileSize={files.gstCertificate?.size}
                  />
                  <UploadField 
                    label="Cancelled Cheque" 
                    required 
                    onFileChange={setFile('cancelledCheque')}
                    fileName={files.cancelledCheque?.name}
                    fileSize={files.cancelledCheque?.size}
                  />
                  <UploadField 
                    label="Company Registration Certificate" 
                    required 
                    onFileChange={setFile('registrationCertificate')}
                    fileName={files.registrationCertificate?.name}
                    fileSize={files.registrationCertificate?.size}
                  />
                  <UploadField 
                    label="Owner ID Proof" 
                    required 
                    onFileChange={setFile('ownerIdProof')}
                    fileName={files.ownerIdProof?.name}
                    fileSize={files.ownerIdProof?.size}
                  />
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
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setForm(EMPTY_FORM);
                setApiKey("");
                setSecretKey("");
                setFiles({
                  panCard: null,
                  gstCertificate: null,
                  cancelledCheque: null,
                  registrationCertificate: null,
                  ownerIdProof: null
                });
                setErrors({});
                setFieldTouched({});
              }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
              disabled={loading}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Form
            </button>

            <button
              onClick={() => navigate("/all-merchant")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] sm:text-sm font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
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
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Merchant
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Lock, Eye, EyeOff, CheckCircle, AlertCircle,
//   ArrowLeft, Shield, Key, Save, X
// } from "lucide-react";

// export default function ChangePassword() {
//   const navigate = useNavigate();
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword]= useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showCurrentPw, setShowCurrentPw] = useState(false);
//   const [showNewPw, setShowNewPw] = useState(false);
//   const [showConfirmPw, setShowConfirmPw] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Password strength state
//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     special: false,
//   });

//   const showToast = (text, isErr = false) => {
//     setToast({ text, isErr });
//     setTimeout(() => setToast(null), 3000);
//   };

//   // Check password strength
//   const checkPasswordStrength = (password) => {
//     setPasswordStrength({
//       length: password.length >= 8,
//       uppercase: /[A-Z]/.test(password),
//       lowercase: /[a-z]/.test(password),
//       number: /[0-9]/.test(password),
//       special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
//     });
//   };

//   const handleNewPasswordChange = (e) => {
//     const value = e.target.value;
//     setNewPassword(value);
//     checkPasswordStrength(value);
    
//     // Clear errors when user types
//     if (errors.newPassword) {
//       setErrors(prev => ({ ...prev, newPassword: null }));
//     }
//     if (errors.confirmPassword && confirmPassword === value) {
//       setErrors(prev => ({ ...prev, confirmPassword: null }));
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);
    
//     if (errors.confirmPassword) {
//       setErrors(prev => ({ ...prev, confirmPassword: null }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     const newErrors = {};
    
//     if (!currentPassword) {
//       newErrors.currentPassword = "Current password is required";
//     }
    
//     if (!newPassword) {
//       newErrors.newPassword = "New password is required";
//     } else if (newPassword.length < 8) {
//       newErrors.newPassword = "Password must be at least 8 characters";
//     } else if (!passwordStrength.uppercase) {
//       newErrors.newPassword = "Password must contain at least one uppercase letter";
//     } else if (!passwordStrength.lowercase) {
//       newErrors.newPassword = "Password must contain at least one lowercase letter";
//     } else if (!passwordStrength.number) {
//       newErrors.newPassword = "Password must contain at least one number";
//     } else if (!passwordStrength.special) {
//       newErrors.newPassword = "Password must contain at least one special character";
//     }
    
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your new password";
//     } else if (newPassword !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
    
//     if (currentPassword && newPassword && currentPassword === newPassword) {
//       newErrors.newPassword = "New password must be different from current password";
//     }
    
//     if (Object.keys(newErrors).length > 0) {  
//       setErrors(newErrors);
//       return;
//     }
    
//     setLoading(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // Simulate success
//     const success = true;
    
//     if (success) {
//       showToast("Password changed successfully! Redirecting...", false);
//       setTimeout(() => {
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//         navigate("/dashboard");
//       }, 2000);
//     } else {
//       showToast("Current password is incorrect", true);
//     }
    
//     setLoading(false);
//   };

//   // Calculate password strength percentage
//   const getStrengthPercentage = () => {
//     const checks = Object.values(passwordStrength);
//     const trueCount = checks.filter(v => v === true).length;
//     return (trueCount / 5) * 100;
//   };

//   const getStrengthColor = () => {
//     const percentage = getStrengthPercentage();
//     if (percentage <= 20) return "bg-red-500";
//     if (percentage <= 40) return "bg-orange-500";
//     if (percentage <= 60) return "bg-yellow-500";
//     if (percentage <= 80) return "bg-blue-500";
//     return "bg-green-500";
//   };

//   const getStrengthText = () => {
//     const percentage = getStrengthPercentage();
//     if (percentage <= 20) return "Very Weak";
//     if (percentage <= 40) return "Weak";
//     if (percentage <= 60) return "Fair";
//     if (percentage <= 80) return "Good";
//     return "Strong";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
//       {/* Toast Notification */}
//       {toast && (
//         <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg animate-slide-in text-xs sm:text-sm ${
//           toast.isErr ? "bg-red-500 text-white" : "bg-green-500 text-white"
//         }`}>
//           {!toast.isErr && <CheckCircle size={14} sm:size={18} />}
//           {toast.text}
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-4 sm:mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3 sm:mb-4"
//           >
//             <ArrowLeft size={16} sm:size={18} /> <span className="text-xs sm:text-sm">Back</span>
//           </button>
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Change Password</h1>
//             <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
//               Update your password to keep your account secure
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
//           {/* Main Form */}
//           <div className="flex-1 lg:flex-[2]">
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//               <div className="p-4 sm:p-6 border-b border-gray-100">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//                     <Key size={16} sm:size={20} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">Password Update</h2>
//                     <p className="text-[11px] sm:text-xs text-gray-500">Enter your current password and choose a new one</p>
//                   </div>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
//                 {/* Current Password */}
//                 <div>
//                   <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                     Current Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showCurrentPw ? "text" : "password"}
//                       value={currentPassword}
//                       onChange={(e) => {
//                         setCurrentPassword(e.target.value);
//                         if (errors.currentPassword) {
//                           setErrors(prev => ({ ...prev, currentPassword: null }));
//                         }
//                       }}
//                       className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg outline-none transition-all pr-8 sm:pr-10 text-[14px] sm:text-sm ${
//                         errors.currentPassword 
//                           ? "border-red-400 focus:ring-red-100 focus:border-red-400" 
//                           : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       }`}
//                       placeholder="Enter current password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowCurrentPw(!showCurrentPw)}
//                       className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showCurrentPw ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
//                     </button>
//                   </div>
//                   {errors.currentPassword && (
//                     <p className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-red-500">
//                       <AlertCircle size={10} sm:size={12} /> {errors.currentPassword}
//                     </p>
//                   )}
//                 </div>

//                 <div className="border-t border-gray-100 pt-3 sm:pt-4">
//                   {/* New Password */}
//                   <div className="mb-4 sm:mb-5">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                       New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPw ? "text" : "password"}
//                         value={newPassword}
//                         onChange={handleNewPasswordChange}
//                         className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg outline-none transition-all pr-8 sm:pr-10 text-[14px] sm:text-sm ${
//                           errors.newPassword 
//                             ? "border-red-400 focus:ring-red-100" 
//                             : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                         }`}
//                         placeholder="Enter new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPw(!showNewPw)}
//                         className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showNewPw ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
//                       </button>
//                     </div>
//                     {errors.newPassword && (
//                       <p className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-red-500">
//                         <AlertCircle size={10} sm:size={12} /> {errors.newPassword}
//                       </p>
//                     )}
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="mb-4 sm:mb-5">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPw ? "text" : "password"}
//                         value={confirmPassword}
//                         onChange={handleConfirmPasswordChange}
//                         className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg outline-none transition-all pr-8 sm:pr-10 text-[14px] sm:text-sm ${
//                           errors.confirmPassword 
//                             ? "border-red-400 focus:ring-red-100" 
//                             : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                         }`}
//                         placeholder="Confirm new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPw(!showConfirmPw)}
//                         className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPw ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
//                       </button>
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-red-500">
//                         <AlertCircle size={10} sm:size={12} /> {errors.confirmPassword}
//                       </p>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
//                     >
//                       {loading ? (
//                         <>
//                           <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Updating Password...
//                         </>
//                       ) : (
//                         <>
//                           <Save size={14} sm:size={16} /> Update Password
//                         </>
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setCurrentPassword("");
//                         setNewPassword("");
//                         setConfirmPassword("");
//                         setErrors({});
//                         setPasswordStrength({
//                           length: false,
//                           uppercase: false,
//                           lowercase: false,
//                           number: false,
//                           special: false,
//                         });
//                       }}
//                       className="px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Right Sidebar - Password Requirements */}
//           <div className="flex-1 lg:flex-1">
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 sticky top-4 sm:top-6">
//               <div className="flex items-center gap-2 mb-3 sm:mb-4">
//                 <Shield size={14} sm:size={18} className="text-blue-600" />
//                 <h3 className="text-xs sm:text-sm font-bold text-gray-900">Password Requirements</h3>
//               </div>

//               {/* Password Strength Meter (shown only when user starts typing) */}
//               {newPassword && (
//                 <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
//                   <div className="flex justify-between items-center mb-1.5 sm:mb-2">
//                     <span className="text-[10px] sm:text-xs font-semibold text-gray-700">Password Strength</span>
//                     <span className={`text-[10px] sm:text-xs font-bold ${
//                       getStrengthPercentage() <= 20 ? "text-red-600" :
//                       getStrengthPercentage() <= 40 ? "text-orange-600" :
//                       getStrengthPercentage() <= 60 ? "text-yellow-600" :
//                       getStrengthPercentage() <= 80 ? "text-blue-600" :
//                       "text-green-600"
//                     }`}>
//                       {getStrengthText()}
//                     </span>
//                   </div>
//                   <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className={`h-full transition-all duration-300 ${getStrengthColor()}`}
//                       style={{ width: `${getStrengthPercentage()}%` }}
//                     />
//                   </div>
//                 </div>
//               )}

//               <ul className="space-y-2 sm:space-y-3">
//                 <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
//                   {passwordStrength.length ? (
//                     <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                   ) : (
//                     <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
//                   )}
//                   <span className={passwordStrength.length ? "text-green-700" : "text-gray-500"}>
//                     At least 8 characters long
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
//                   {passwordStrength.uppercase ? (
//                     <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                   ) : (
//                     <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
//                   )}
//                   <span className={passwordStrength.uppercase ? "text-green-700" : "text-gray-500"}>
//                     Contains uppercase letter (A-Z)
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
//                   {passwordStrength.lowercase ? (
//                     <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                   ) : (
//                     <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
//                   )}
//                   <span className={passwordStrength.lowercase ? "text-green-700" : "text-gray-500"}>
//                     Contains lowercase letter (a-z)
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
//                   {passwordStrength.number ? (
//                     <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                   ) : (
//                     <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
//                   )}
//                   <span className={passwordStrength.number ? "text-green-700" : "text-gray-500"}>
//                     Contains number (0-9)
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
//                   {passwordStrength.special ? (
//                     <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                   ) : (
//                     <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
//                   )}
//                   <span className={passwordStrength.special ? "text-green-700" : "text-gray-500"}>
//                     Contains special character (!@#$%^&* etc.)
//                   </span>
//                 </li>
//               </ul>

//               <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
//                 <div className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg">
//                   <Lock size={12} sm:size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                   <p className="text-[10px] sm:text-xs text-blue-700 leading-relaxed">
//                     Choose a strong password that you haven't used before. Never share your password with anyone.
//                   </p>
//                 </div>
//               </div>
//             </div>
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
// src/pages/ChangePassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock, Eye, EyeOff, CheckCircle, AlertCircle,
  ArrowLeft, Shield, Key, Save, X
} from "lucide-react";
import changePasswordService from "../services/ChangePasswordServices";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const showToast = (text, isErr = false) => {
    setToast({ text, isErr });
    setTimeout(() => setToast(null), 3000);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    const strength = changePasswordService.validatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    checkPasswordStrength(value);
    
    // Clear errors when user types
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: null }));
    }
    if (errors.confirmPassword && confirmPassword === value) {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!passwordStrength.uppercase) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!passwordStrength.lowercase) {
      newErrors.newPassword = "Password must contain at least one lowercase letter";
    } else if (!passwordStrength.number) {
      newErrors.newPassword = "Password must contain at least one number";
    } else if (!passwordStrength.special) {
      newErrors.newPassword = "Password must contain at least one special character";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }
    
    if (Object.keys(newErrors).length > 0) {  
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the API
      const response = await changePasswordService.changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      
      showToast(response.message || "Password changed successfully! Redirecting...", false);
      
      // Clear form after success
      setTimeout(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordStrength({
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false,
        });
        navigate("/dashboard");
      }, 2000);
      
    } catch (error) {
      console.error('Change password error:', error);
      
      let errorMessage = error.message || "Failed to change password. Please try again.";
      
      // Handle specific error messages
      if (error.message.includes('Current password is incorrect')) {
        errorMessage = "Current password is incorrect";
        setErrors({ currentPassword: errorMessage });
      } else if (error.message.includes('New password and confirm password do not match')) {
        errorMessage = "Passwords do not match";
        setErrors({ confirmPassword: errorMessage });
      } else if (error.message.includes('at least 8 characters')) {
        errorMessage = "Password must be at least 8 characters long";
        setErrors({ newPassword: errorMessage });
      }
      
      showToast(errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  // Calculate password strength percentage
  const getStrengthPercentage = () => {
    return changePasswordService.getStrengthPercentage(passwordStrength);
  };

  const getStrengthColor = () => {
    const percentage = getStrengthPercentage();
    return changePasswordService.getStrengthColor(percentage);
  };

  const getStrengthText = () => {
    const percentage = getStrengthPercentage();
    return changePasswordService.getStrengthText(percentage);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg animate-slide-in text-xs sm:text-sm ${
          toast.isErr ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}>
          {!toast.isErr && <CheckCircle size={14} sm:size={18} />}
          {toast.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3 sm:mb-4"
          >
            <ArrowLeft size={16} sm:size={18} /> <span className="text-xs sm:text-sm">Back</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Change Password</h1>
            <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Form */}
          <div className="flex-1 lg:flex-[2]">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Key size={16} sm:size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Password Update</h2>
                    <p className="text-[11px] sm:text-xs text-gray-500">Enter your current password and choose a new one</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Current Password */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        if (errors.currentPassword) {
                          setErrors(prev => ({ ...prev, currentPassword: null }));
                        }
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg outline-none transition-all pr-8 sm:pr-10 text-[14px] sm:text-sm ${
                        errors.currentPassword 
                          ? "border-red-400 focus:ring-red-100 focus:border-red-400" 
                          : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                      placeholder="Enter current password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showCurrentPw ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-red-500">
                      <AlertCircle size={10} sm:size={12} /> {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 sm:pt-4">
                  {/* New Password */}
                  <div className="mb-4 sm:mb-5">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPw ? "text" : "password"}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg outline-none transition-all pr-8 sm:pr-10 text-[14px] sm:text-sm ${
                          errors.newPassword 
                            ? "border-red-400 focus:ring-red-100" 
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        }`}
                        placeholder="Enter new password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPw(!showNewPw)}
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showNewPw ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-red-500">
                        <AlertCircle size={10} sm:size={12} /> {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4 sm:mb-5">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPw ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg outline-none transition-all pr-8 sm:pr-10 text-[14px] sm:text-sm ${
                          errors.confirmPassword 
                            ? "border-red-400 focus:ring-red-100" 
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        }`}
                        placeholder="Confirm new password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPw(!showConfirmPw)}
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showConfirmPw ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-red-500">
                        <AlertCircle size={10} sm:size={12} /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <Save size={14} sm:size={16} /> Update Password
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setErrors({});
                        setPasswordStrength({
                          length: false,
                          uppercase: false,
                          lowercase: false,
                          number: false,
                          special: false,
                        });
                      }}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                      disabled={loading}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar - Password Requirements */}
          <div className="flex-1 lg:flex-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 sticky top-4 sm:top-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Shield size={14} sm:size={18} className="text-blue-600" />
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Password Requirements</h3>
              </div>

              {/* Password Strength Meter (shown only when user starts typing) */}
              {newPassword && (
                <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-700">Password Strength</span>
                    <span className={`text-[10px] sm:text-xs font-bold ${
                      getStrengthPercentage() <= 20 ? "text-red-600" :
                      getStrengthPercentage() <= 40 ? "text-orange-600" :
                      getStrengthPercentage() <= 60 ? "text-yellow-600" :
                      getStrengthPercentage() <= 80 ? "text-blue-600" :
                      "text-green-600"
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${getStrengthPercentage()}%` }}
                    />
                  </div>
                </div>
              )}

              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  {passwordStrength.length ? (
                    <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={passwordStrength.length ? "text-green-700" : "text-gray-500"}>
                    At least 8 characters long
                  </span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  {passwordStrength.uppercase ? (
                    <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={passwordStrength.uppercase ? "text-green-700" : "text-gray-500"}>
                    Contains uppercase letter (A-Z)
                  </span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  {passwordStrength.lowercase ? (
                    <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={passwordStrength.lowercase ? "text-green-700" : "text-gray-500"}>
                    Contains lowercase letter (a-z)
                  </span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  {passwordStrength.number ? (
                    <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={passwordStrength.number ? "text-green-700" : "text-gray-500"}>
                    Contains number (0-9)
                  </span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  {passwordStrength.special ? (
                    <CheckCircle size={12} sm:size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={passwordStrength.special ? "text-green-700" : "text-gray-500"}>
                    Contains special character (!@#$%^&* etc.)
                  </span>
                </li>
              </ul>

              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <Lock size={12} sm:size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] sm:text-xs text-blue-700 leading-relaxed">
                    Choose a strong password that you haven't used before. Never share your password with anyone.
                  </p>
                </div>
              </div>
            </div>
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
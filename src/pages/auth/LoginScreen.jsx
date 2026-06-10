// import React, { useState, useEffect } from 'react';
// import busImage from '../../assets/login.png'; 

// const BridgeLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [toastMessage, setToastMessage] = useState(null);

//   const showMessage = (text, isError = false) => {
//     setToastMessage({ text, isError });
//     setTimeout(() => setToastMessage(null), 2800);
//   };

//   const handleSignIn = (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       showMessage('Please enter both email and password to sign in.', true);
//       return;
//     }
//     if (!email.includes('@') || !email.includes('.')) {
//       showMessage('Please enter a valid email address.', true);
//       return;
//     }
    
//     if (rememberMe) {
//       localStorage.setItem('bridge_admin_email', email);
//       localStorage.setItem('bridge_admin_remember', 'true');
//     } else {
//       localStorage.removeItem('bridge_admin_email');
//       localStorage.setItem('bridge_admin_remember', 'false');
//     }
    
//     showMessage(`Welcome back, ${email.split('@')[0]}! Redirecting to dashboard...`, false);
//   };

//   const handleSSO = () => {
//     showMessage('Redirecting to corporate SSO (SAML/OIDC)...', false);
//   };

//   const handleForgotPassword = () => {
//     showMessage('Password reset link will be sent to your registered email.', false);
//   };

//   const handleContactAdmin = () => {
//     showMessage('Please reach out to your Bridge Admin support: admin@bridgepay.example.com', false);
//   };

//   useEffect(() => {
//     const savedEmail = localStorage.getItem('bridge_admin_email');
//     const savedRemember = localStorage.getItem('bridge_admin_remember') === 'true';
//     if (savedEmail && savedRemember) {
//       setEmail(savedEmail);
//       setRememberMe(true);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex font-sans">
      
//       {/* Toast Notification */}
//       {toastMessage && (
//         <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-white text-sm font-medium shadow-lg transition-all duration-200 ${
//           toastMessage.isError ? 'bg-red-600/95' : 'bg-slate-800/95'
//         }`}>
//           {toastMessage.text}
//         </div>
//       )}

//       {/* LEFT SIDE - BUS IMAGE FROM ASSETS FOLDER */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//         <img 
//           src={busImage} 
//           alt="Luxury Bus Fleet" 
//           className="absolute inset-0 w-full h-full object-contain"
//         />
//       </div>

//       {/* RIGHT SIDE - LOGIN FORM (BUS UI THEME) */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 overflow-y-auto">
//         <div className="w-full max-w-md">
//           {/* Mobile brand header (visible only on small screens) */}
//           <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
//             <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
//               <i className="fas fa-bus text-white text-lg"></i>
//             </div>
//             <span className="text-gray-800 font-bold text-2xl tracking-tight">Bridge Admin</span>
//           </div>

//           {/* Main Card with Bus-themed accents */}
//           <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-gray-100">
//             {/* Header with bus route line decoration */}
//             <div className="px-7 pt-8 pb-4 border-b border-gray-100 relative">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-gray-700 to-amber-500"></div>
//               <div className="flex items-center gap-2 mb-2">
//                 <i className="fas fa-bus-simple text-gray-700 text-xl"></i>
//                 <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">BUS OPERATOR PORTAL</span>
//               </div>
//               <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Bridge Admin</h1>
//               <p className="text-sm text-gray-500 mt-1">Powering Payouts • Fleet Solutions</p>
              
//               {/* bus route stats mini */}
//               <div className="flex gap-4 mt-4 text-xs">
//                 <div className="flex items-center gap-1">
//                   <i className="fas fa-route text-gray-400 text-xs"></i>
//                   <span className="text-gray-500">1,284 routes</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <i className="fas fa-bus text-gray-400 text-xs"></i>
//                   <span className="text-gray-500">342 buses</span>
//                 </div>
//               </div>
//             </div>

//             {/* Form Section */}
//             <div className="px-7 py-7">
//               <div className="mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Welcome Back, Operator!</h2>
//                 <p className="text-sm text-gray-500 mt-1">Sign in to manage your fleet & settlements</p>
//               </div>

//               <form onSubmit={handleSignIn}>
//                 {/* Email Field with bus icon */}
//                 <div className="mb-5">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     <i className="fas fa-envelope mr-2 text-gray-400"></i>
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-gray-800 font-medium"
//                       placeholder="operator@bridgefleet.com"
//                     />
//                     <i className="fas fa-user-circle absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
//                   </div>
//                 </div>

//                 {/* Password Field with lock icon */}
//                 <div className="mb-5">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     <i className="fas fa-lock mr-2 text-gray-400"></i>
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-gray-800 font-medium"
//                       placeholder="••••••••"
//                     />
//                     <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
//                   </div>
//                 </div>

//                 {/* Remember & Forgot Row */}
//                 <div className="flex justify-between items-center mb-6">
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
//                     />
//                     Keep me signed in
//                   </label>
//                   <button
//                     type="button"
//                     onClick={handleForgotPassword}
//                     className="text-sm font-semibold text-amber-700 hover:text-amber-800 hover:underline transition"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>

//                 {/* Sign In Button - Bus themed */}
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
//                 >
//                   <i className="fas fa-bus-simple group-hover:translate-x-1 transition-transform"></i>
//                   Sign In to Dashboard
//                   <i className="fas fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BridgeLogin;
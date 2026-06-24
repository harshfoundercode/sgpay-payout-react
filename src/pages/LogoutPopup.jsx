// // LogoutScreen.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   LogOut, 
//   CheckCircle, 
//   XCircle, 
//   Loader2,
//   Power,
//   Shield,
//   Clock,
//   ArrowRight
// } from 'lucide-react';

// const LogoutScreen = () => {
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(5);
//   const [isLoggingOut, setIsLoggingOut] = useState(true);
//   const [showSuccess, setShowSuccess] = useState(false);

//   useEffect(() => {
//     // Clear all auth data
//     const performLogout = async () => {
//       // Simulate logout API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Clear all localStorage items
//       localStorage.removeItem('token');
//       localStorage.removeItem('isLoggedIn');
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('bridge_admin_email');
//       localStorage.removeItem('bridge_admin_remember');
      
//       // Clear sessionStorage if used
//       sessionStorage.clear();
      
//       setIsLoggingOut(false);
//       setShowSuccess(true);
//     };

//     performLogout();
//   }, []);

//   useEffect(() => {
//     if (showSuccess && countdown > 0) {
//       const timer = setTimeout(() => {
//         setCountdown(countdown - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else if (showSuccess && countdown === 0) {
//       navigate('/login', { replace: true });
//     }
//   }, [countdown, showSuccess, navigate]);

//   const handleManualRedirect = () => {
//     navigate('/login', { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center font-sans p-4">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//       </div>

//       {/* Main Logout Card */}
//       <div className="relative z-10 w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 animate-fadeInUp">
          
//           {/* Header with gradient bar */}
//           <div className="relative">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
//             <div className="pt-8 pb-4 px-6 text-center">
//               {isLoggingOut ? (
//                 <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
//                   <Loader2 size={40} className="text-red-500 animate-spin" />
//                 </div>
//               ) : showSuccess ? (
//                 <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
//                   <CheckCircle size={40} className="text-green-500" />
//                 </div>
//               ) : (
//                 <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <LogOut size={40} className="text-gray-500" />
//                 </div>
//               )}
              
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {isLoggingOut ? 'Logging Out...' : 'Successfully Logged Out!'}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 {isLoggingOut 
//                   ? 'Please wait while we securely log you out' 
//                   : 'You have been securely logged out of your account'}
//               </p>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="px-6 py-4 border-t border-gray-100">
//             {isLoggingOut && (
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <Shield size={16} className="text-green-500" />
//                   <span>Clearing secure session...</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <Power size={16} className="text-orange-500" />
//                   <span>Revoking authentication tokens...</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <Clock size={16} className="text-blue-500" />
//                   <span>Clearing local cache...</span>
//                 </div>
//               </div>
//             )}

//             {showSuccess && (
//               <div className="text-center space-y-4">
//                 <div className="bg-green-50 rounded-lg p-3">
//                   <p className="text-green-700 text-sm font-medium">
//                     Your session has been terminated successfully
//                   </p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <button
//                     onClick={handleManualRedirect}
//                     className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
//                   >
//                     <span>Return to Login</span>
//                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                   </button>
                  
//                   <p className="text-xs text-gray-400">
//                     Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="px-6 py-4 bg-gray-50 rounded-b-2xl text-center">
//             <p className="text-xs text-gray-400">
//               For security reasons, always log out when you're done
//             </p>
//           </div>
//         </div>

//         {/* Additional Info Card */}
//         <div className="mt-4 text-center text-xs text-gray-400">
//           <p>✓ All active sessions terminated</p>
//           <p className="mt-1">✓ Cache cleared</p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.5s ease-out;
//         }
        
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
        
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LogoutScreen;
// LogoutScreen.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Power,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';

const LogoutScreen = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Clear all auth data
     const performLogout = () => {
        authService.logout();
        navigate('/login');
    };

    performLogout();
  }, []);

  useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      navigate('/login', { replace: true });
    }
  }, [countdown, showSuccess, navigate]);

  const handleManualRedirect = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center font-sans p-3 sm:p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-64 h-64 sm:w-80 sm:h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Logout Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 animate-fadeInUp">
          
          {/* Header with gradient bar */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
            <div className="pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6 text-center">
              {isLoggingOut ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
                  <Loader2 size={32} sm:size={40} className="text-red-500 animate-spin" />
                </div>
              ) : showSuccess ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce">
                  <CheckCircle size={32} sm:size={40} className="text-green-500" />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <LogOut size={32} sm:size={40} className="text-gray-500" />
                </div>
              )}
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                {isLoggingOut ? 'Logging Out...' : 'Successfully Logged Out!'}
              </h2>
              <p className="text-gray-500 text-[11px] sm:text-sm px-2">
                {isLoggingOut 
                  ? 'Please wait while we securely log you out' 
                  : 'You have been securely logged out of your account'}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
            {isLoggingOut && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-600">
                  <Shield size={14} sm:size={16} className="text-green-500 flex-shrink-0" />
                  <span>Clearing secure session...</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-600">
                  <Power size={14} sm:size={16} className="text-orange-500 flex-shrink-0" />
                  <span>Revoking authentication tokens...</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-600">
                  <Clock size={14} sm:size={16} className="text-blue-500 flex-shrink-0" />
                  <span>Clearing local cache...</span>
                </div>
              </div>
            )}

            {showSuccess && (
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="bg-green-50 rounded-lg p-2.5 sm:p-3">
                  <p className="text-green-700 text-[11px] sm:text-sm font-medium">
                    Your session has been terminated successfully
                  </p>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2">
                  <button
                    onClick={handleManualRedirect}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 group text-xs sm:text-sm"
                  >
                    <span>Return to Login</span>
                    <ArrowRight size={14} sm:size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-b-2xl text-center">
            <p className="text-[10px] sm:text-xs text-gray-400">
              For security reasons, always log out when you're done
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-gray-400">
          <p>✓ All active sessions terminated</p>
          <p className="mt-0.5 sm:mt-1">✓ Cache cleared</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-bounce {
          animation: bounce 0.5s ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LogoutScreen;
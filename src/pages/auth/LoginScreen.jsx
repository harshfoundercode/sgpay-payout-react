// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, Check, Shield, Bus } from 'lucide-react';
// import busImage from '../../assets/logintwo.png';


// const BridgeLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [toastMessage, setToastMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const showMessage = (text, isError = false) => {
//         setToastMessage({ text, isError });
//         setTimeout(() => setToastMessage(null), 2800);
//     };


//     const handleSignIn = async (e) => {
//         e.preventDefault();

//         if (!email || !password) {
//             showMessage('Please enter both email and password to sign in.', true);
//             return;
//         }
//         if (!email.includes('@') || !email.includes('.')) {
//             showMessage('Please enter a valid email address.', true);
//             return;
//         }
        
//         // Password validation - must be at least 8 characters
//         if (password.length < 8) {
//             showMessage('Password must be at least 8 characters long.', true);
//             return;
//         }

//         setIsLoading(true);

//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1500));

//         if (rememberMe) {
//             localStorage.setItem('bridge_admin_email', email);
//             localStorage.setItem('bridge_admin_remember', 'true');
//         } else {
//             localStorage.removeItem('bridge_admin_email');
//             localStorage.setItem('bridge_admin_remember', 'false');
//         }

//         // Store login state
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('userEmail', email);
//         localStorage.setItem('token', 'dummy_token_' + Date.now());

//         showMessage(`Welcome back! Redirecting to dashboard...`, false);

//         setTimeout(() => {
//             navigate('/dashboard');
//         }, 1500);
//     };

//     const handleForgotPassword = () => {
//         navigate('/forgot-password');
//     };


//     useEffect(() => {
//         const savedEmail = localStorage.getItem('bridge_admin_email');
//         const savedRemember = localStorage.getItem('bridge_admin_remember') === 'true';
//         if (savedEmail && savedRemember) {
//             setEmail(savedEmail);
//             setRememberMe(true);
//         }

//         const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//         if (isLoggedIn) {
//             navigate('/dashboard');
//         }
//     }, [navigate]);

//     return (
//         <div className="h-screen w-screen overflow-hidden bg-white flex font-sans">

//             {/* Toast Notification */}
//             {toastMessage && (
//                 <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-white text-sm font-medium shadow-lg transition-all duration-200 flex items-center gap-2 ${toastMessage.isError ? 'bg-red-600/95' : 'bg-green-600/95'
//                     }`}>
//                     {!toastMessage.isError && <Check size={16} />}
//                     {toastMessage.text}
//                 </div>
//             )}

//             {/* LEFT SIDE - FULL HEIGHT BUS IMAGE */}
//             <div className="hidden lg:flex lg:w-[500px] h-full relative overflow-hidden bg-linear-to-br from-gray-900 to-gray-800">
//                 <img
//                     src={busImage}
//                     alt="Luxury Bus Fleet"
//                     className="w-full h-full object-fill"
//                 />
//             </div>

//             {/* RIGHT SIDE - PERFECTLY CENTERED LOGIN FORM */}
//             <div className="w-full h-full flex items-center justify-center p-4 md:p-8 overflow-hidden bg-gray-50">
//                 <div className="w-full max-w-md mx-auto">
//                     {/* Logo/Brand */}
//                     <div className="text-center mb-8">
//                         <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
//                             <Bus size={28} className="text-white" />
//                         </div>
//                         <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
//                         <p className="text-gray-500 text-sm">Sign in to continue to Bridge Admin</p>
//                     </div>

//                     {/* Login Form */}
//                     <form onSubmit={handleSignIn} className="space-y-5">
//                         {/* Email Field */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Email Address
//                             </label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400"
//                                 placeholder="Enter your email"
//                             />
//                         </div>

//                         {/* Password Field */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400 pr-12"
//                                     placeholder="Enter your password"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                                 >
//                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </div>
//                             {/* Password hint */}
//                             <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
//                         </div>

//                         {/* Remember Me & Forgot Password */}
//                         <div className="flex items-center justify-between">
//                             <label className="flex items-center gap-2 cursor-pointer group">
//                                 <input
//                                     type="checkbox"
//                                     checked={rememberMe}
//                                     onChange={(e) => setRememberMe(e.target.checked)}
//                                     className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
//                                 />
//                                 <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
//                             </label>
//                             <button
//                                 type="button"
//                                 onClick={handleForgotPassword}
//                                 className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
//                             >
//                                 Forgot Password?
//                             </button>
//                         </div>

//                         {/* Sign In Button */}
//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {isLoading ? (
//                                 <>
//                                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Signing in...
//                                 </>
//                             ) : (
//                                 'Sign In'
//                             )}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BridgeLogin;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Shield, Bus } from 'lucide-react';
import busImage from '../../assets/logintwo.png';

const BridgeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const showMessage = (text, isError = false) => {
        setToastMessage({ text, isError });
        setTimeout(() => setToastMessage(null), 2800);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showMessage('Please enter both email and password to sign in.', true);
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showMessage('Please enter a valid email address.', true);
            return;
        }
        
        if (password.length < 8) {
            showMessage('Password must be at least 8 characters long.', true);
            return;
        }

        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (rememberMe) {
            localStorage.setItem('bridge_admin_email', email);
            localStorage.setItem('bridge_admin_remember', 'true');
        } else {
            localStorage.removeItem('bridge_admin_email');
            localStorage.setItem('bridge_admin_remember', 'false');
        }

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('token', 'dummy_token_' + Date.now());

        showMessage(`Welcome back! Redirecting to dashboard...`, false);

        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('bridge_admin_email');
        const savedRemember = localStorage.getItem('bridge_admin_remember') === 'true';
        if (savedEmail && savedRemember) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen w-full overflow-auto bg-white flex flex-col lg:flex-row font-sans">

            {/* Toast Notification */}
            {toastMessage && (
                <div className={`fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-white text-[11px] sm:text-sm font-medium shadow-lg transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${toastMessage.isError ? 'bg-red-600/95' : 'bg-green-600/95'
                    }`}>
                    {!toastMessage.isError && <Check size={14} sm:size={16} />}
                    {toastMessage.text}
                </div>
            )}

            {/* LEFT SIDE - IMAGE SECTION (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-125 h-screen relative overflow-hidden ">
                <img
                    src={busImage}
                    alt="Luxury Bus Fleet"
                    className="w-full h-full object-fill object-center"
                />
            </div>
             

            {/* RIGHT SIDE - CENTERED LOGIN FORM */}
            <div className="flex-1 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50">
                <div className="w-full max-w-md mx-auto">
                    {/* Logo/Brand */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-3 sm:mb-4">
                            <Bus size={22} sm:size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Welcome Back!</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Sign in to continue to Bridge Admin</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800 placeholder-gray-400 pr-10 sm:pr-12 text-sm sm:text-base"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} sm:size={18} /> : <Eye size={16} sm:size={18} />}
                                </button>
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-[11px] sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-[11px] sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Additional Info - Optional */}
                    <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 sm:mt-8">
                        Secure login with 256-bit SSL encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BridgeLogin;
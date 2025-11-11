// import React, { useState } from 'react';
// import * as ReactRouterDOM from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';
// // import { UserRole } from '../server/types';

// // Logo Component
// const AppLogo = () => (
//     <div className="flex flex-col items-center space-y-2">
//         <svg className="w-16 h-16 text-teal-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
//             <path d="M12 5C10.14 5 8.5 6.27 8.5 7.75C8.5 9.23 10.14 10.5 12 10.5C13.86 10.5 15.5 9.23 15.5 7.75C15.5 6.27 13.86 5 12 5ZM12 9C11.04 9 10.5 8.44 10.5 7.75C10.5 7.06 11.04 6.5 12 6.5C12.96 6.5 13.5 7.06 13.5 7.75C13.5 8.44 12.96 9 12 9Z" fill="currentColor"/>
//             <path d="M18 13.5C18 12.12 15.31 11 12 11C8.69 11 6 12.12 6 13.5V17H18V13.5ZM8 15.5V14.5C8.62 13.84 10.16 13 12 13C13.84 13 15.38 13.84 16 14.5V15.5H8Z" fill="currentColor"/>
//         </svg>
//         <h1 className="text-3xl font-bold text-gray-800">GourmetGo</h1>
//     </div>
// );

// const ForgotPasswordPage = () => {
//     const { resetPassword, users } = useAppContext();
//     const navigate = ReactRouterDOM.useNavigate();

//     const [email, setEmail] = useState('');
//     const [verificationCode, setVerificationCode] = useState('');
//     const [enteredCode, setEnteredCode] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [step, setStep] = useState(1);

//     const handleEmailSubmit = (e) => {
//         e.preventDefault();
//         setError('');
//         const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.role === UserRole.CUSTOMER);
//         if (!userExists) {
//             setError("No customer account found with this email address.");
//             return;
//         }

//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         setVerificationCode(code);
//         alert(`For demo purposes, your verification code is: ${code}`);
//         setStep(2);
//     };

//     const handleCodeSubmit = (e) => {
//         e.preventDefault();
//         setError('');
//         if (enteredCode === verificationCode) {
//             setStep(3);
//         } else {
//             setError("Invalid verification code. Please try again.");
//         }
//     };

//     const handleResetSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }
//         if (newPassword.length < 6) {
//             setError("Password must be at least 6 characters long.");
//             return;
//         }

//         const result = await resetPassword(email, newPassword);
//         if (result.success) {
//             setStep(4);
//             setTimeout(() => navigate('/login'), 3000);
//         } else {
//             setError(result.message);
//         }
//     };

//     const getPageTitle = () => {
//         if (step === 1) return 'Forgot Your Password?';
//         if (step === 2) return 'Enter Verification Code';
//         if (step === 3) return 'Create a New Password';
//         return 'Password Reset Successful!';
//     };

//     return (
//         <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/auth-bg/1600/1200')"}}>
//             <div className="max-w-md w-full bg-slate-50/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
//                 <div className="text-center p-8 bg-slate-100/90 border-b border-slate-200">
//                     <AppLogo />
//                     <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">{getPageTitle()}</h2>
//                     {step === 1 && <p className="mt-2 text-sm text-gray-600">Enter your email and we'll help you reset your password.</p>}
//                     {step === 2 && <p className="mt-2 text-sm text-gray-600">A 6-digit verification code has been sent to your email.</p>}
//                 </div>

//                 <div className="p-8">
//                     {step === 1 && (
//                         <form className="space-y-6" onSubmit={handleEmailSubmit}>
//                             <div className="rounded-md shadow-sm relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                         <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                                         <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                                     </svg>
//                                 </span>
//                                 <input
//                                     type="email"
//                                     required
//                                     value={email}
//                                     onChange={e => setEmail(e.target.value)}
//                                     placeholder="Email address"
//                                     className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
//                                 />
//                             </div>
//                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                             <button type="submit" className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700">Continue</button>
//                             <div className="text-sm text-center mt-2">
//                                 <ReactRouterDOM.Link to="/login" className="text-teal-600 hover:text-teal-500">Remembered your password? Sign in</ReactRouterDOM.Link>
//                             </div>
//                         </form>
//                     )}

//                     {step === 2 && (
//                         <form className="space-y-6" onSubmit={handleCodeSubmit}>
//                             <div className="rounded-md shadow-sm relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                         <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
//                                     </svg>
//                                 </span>
//                                 <input
//                                     type="text"
//                                     required
//                                     value={enteredCode}
//                                     onChange={e => setEnteredCode(e.target.value)}
//                                     placeholder="6-digit code"
//                                     className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
//                                 />
//                             </div>
//                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                             <button type="submit" className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700">Verify Code</button>
//                         </form>
//                     )}

//                     {step === 3 && (
//                         <form className="space-y-6" onSubmit={handleResetSubmit}>
//                             <p className="text-center text-sm text-gray-600">Enter a new password for <strong>{email}</strong>.</p>
//                             <div className="rounded-md shadow-sm space-y-4">
//                                 <input
//                                     type="password"
//                                     required
//                                     value={newPassword}
//                                     onChange={e => setNewPassword(e.target.value)}
//                                     placeholder="New Password"
//                                     className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
//                                 />
//                                 <input
//                                     type="password"
//                                     required
//                                     value={confirmPassword}
//                                     onChange={e => setConfirmPassword(e.target.value)}
//                                     placeholder="Confirm New Password"
//                                     className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
//                                 />
//                             </div>
//                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                             <button type="submit" className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700">Reset Password</button>
//                         </form>
//                     )}

//                     {step === 4 && (
//                         <div className="text-center text-green-700">
//                             <p>Your password has been successfully reset.</p>
//                             <p className="mt-2 text-sm text-gray-600">Redirecting to login page...</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ForgotPasswordPage;




import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Frontend JS ke liye manually define UserRole
const UserRole = {
    ADMIN: 'ADMIN',
    CATERER: 'CATERER',
    CUSTOMER: 'CUSTOMER'
};

// Logo Component
const AppLogo = () => (
    <div className="flex flex-col items-center space-y-2">
        <svg 
            className="w-16 h-16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#123458' }}
        >
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 5C10.14 5 8.5 6.27 8.5 7.75C8.5 9.23 10.14 10.5 12 10.5C13.86 10.5 15.5 9.23 15.5 7.75C15.5 6.27 13.86 5 12 5ZM12 9C11.04 9 10.5 8.44 10.5 7.75C10.5 7.06 11.04 6.5 12 6.5C12.96 6.5 13.5 7.06 13.5 7.75C13.5 8.44 12.96 9 12 9Z" fill="currentColor"/>
            <path d="M18 13.5C18 12.12 15.31 11 12 11C8.69 11 6 12.12 6 13.5V17H18V13.5ZM8 15.5V14.5C8.62 13.84 10.16 13 12 13C13.84 13 15.38 13.84 16 14.5V15.5H8Z" fill="currentColor"/>
        </svg>
        <h1 className="text-3xl font-bold" style={{ color: '#030303' }}>GourmetGo</h1>
    </div>
);

const ForgotPasswordPage = () => {
    const { resetPassword, users } = useAppContext();
    const navigate = ReactRouterDOM.useNavigate();

    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setError('');
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.role === UserRole.CUSTOMER);
        if (!userExists) {
            setError("No customer account found with this email address.");
            return;
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        alert(`For demo purposes, your verification code is: ${code}`);
        setStep(2);
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (enteredCode === verificationCode) {
            setStep(3);
        } else {
            setError("Invalid verification code. Please try again.");
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        const result = await resetPassword(email, newPassword);
        if (result.success) {
            setStep(4);
            setTimeout(() => navigate('/login'), 3000);
        } else {
            setError(result.message);
        }
    };

    const getPageTitle = () => {
        if (step === 1) return 'Forgot Your Password?';
        if (step === 2) return 'Enter Verification Code';
        if (step === 3) return 'Create a New Password';
        return 'Password Reset Successful!';
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/auth-bg/1600/1200')"}}>
            <div 
                className="max-w-md w-full rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
                style={{ backgroundColor: '#030303', border: '2px solid #123458' }}
            >
                <div 
                    className="text-center p-8 border-b"
                    style={{ borderColor: '#123458' }}
                >
                    <AppLogo />
                    <h2 
                        className="mt-6 text-center text-2xl font-bold"
                        style={{ color: '#123458' }}
                    >
                        {getPageTitle()}
                    </h2>
                    {step === 1 && <p className="mt-2 text-sm" style={{ color: '#B0B0B0' }}>Enter your email and we'll help you reset your password.</p>}
                    {step === 2 && <p className="mt-2 text-sm" style={{ color: '#B0B0B0' }}>A 6-digit verification code has been sent to your email.</p>}
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <form className="space-y-6" onSubmit={handleEmailSubmit}>
                            <div className="rounded-md shadow-sm relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#666666' }}>
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border placeholder-gray-500 bg-white focus:outline-none focus:ring-2 sm:text-sm"
                                    style={{ 
                                        borderColor: '#123458',
                                        color: '#030303',
                                        backgroundColor: '#FFFFFF'
                                    }}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button 
                                type="submit" 
                                className="w-full py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: '#123458', color: 'white' }}
                            >
                                Continue
                            </button>
                            <div className="text-sm text-center mt-2">
                                <ReactRouterDOM.Link 
                                    to="/login" 
                                    className="hover:underline font-medium"
                                    style={{ color: '#123458' }}
                                >
                                    Remembered your password? Sign in
                                </ReactRouterDOM.Link>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form className="space-y-6" onSubmit={handleCodeSubmit}>
                            <div className="rounded-md shadow-sm relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#666666' }}>
                                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={enteredCode}
                                    onChange={e => setEnteredCode(e.target.value)}
                                    placeholder="6-digit code"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border placeholder-gray-500 bg-white focus:outline-none focus:ring-2 sm:text-sm"
                                    style={{ 
                                        borderColor: '#123458',
                                        color: '#030303',
                                        backgroundColor: '#FFFFFF'
                                    }}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button 
                                type="submit" 
                                className="w-full py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: '#123458', color: 'white' }}
                            >
                                Verify Code
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form className="space-y-6" onSubmit={handleResetSubmit}>
                            <p className="text-center text-sm" style={{ color: '#B0B0B0' }}>
                                Enter a new password for <strong style={{ color: '#123458' }}>{email}</strong>.
                            </p>
                            <div className="rounded-md shadow-sm space-y-4">
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 bg-white focus:outline-none focus:ring-2 sm:text-sm"
                                    style={{ 
                                        borderColor: '#123458',
                                        color: '#030303',
                                        backgroundColor: '#FFFFFF'
                                    }}
                                />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm New Password"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 bg-white focus:outline-none focus:ring-2 sm:text-sm"
                                    style={{ 
                                        borderColor: '#123458',
                                        color: '#030303',
                                        backgroundColor: '#FFFFFF'
                                    }}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button 
                                type="submit" 
                                className="w-full py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: '#123458', color: 'white' }}
                            >
                                Reset Password
                            </button>
                        </form>
                    )}

                    {step === 4 && (
                        <div className="text-center" style={{ color: '#059669' }}>
                            <p>Your password has been successfully reset.</p>
                            <p className="mt-2 text-sm" style={{ color: '#B0B0B0' }}>Redirecting to login page...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
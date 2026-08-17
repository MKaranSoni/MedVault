// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { authService } from '../../services/authService';
// import { AuthContext } from '../../context/AuthContext';
// import { Eye, EyeOff, X, ShieldCheck, Activity, Heart, Shield } from 'lucide-react';
//
// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await authService.login({ email, password });
//       if (res.success) {
//         login(res.data);
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="min-h-screen flex bg-gray-50 font-sans text-gray-900">
//       {/* Left Pane - Branding (Hidden on mobile) */}
//       <div className="hidden lg:flex w-1/2 bg-blue-900 relative overflow-hidden flex-col justify-between">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-900 opacity-90"></div>
//
//         {/* Decorative elements */}
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-3xl"></div>
//
//         <div className="relative z-10 p-12 lg:p-20 pt-16 h-full flex flex-col">
//           <div className="flex items-center space-x-3 mb-16">
//             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
//               <ShieldCheck className="w-6 h-6 text-blue-600" />
//             </div>
//             <span className="text-2xl font-bold text-white tracking-tight">MedVault</span>
//           </div>
//
//           <div className="flex-1 flex flex-col justify-center">
//             <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
//               Welcome back to<br />better healthcare.
//             </h1>
//             <p className="text-blue-100 text-lg mb-12 max-w-md leading-relaxed">
//               Access your medical records, securely connect with doctors, and get AI-powered insights instantly.
//             </p>
//
//             <div className="space-y-6">
//               <div className="flex items-center space-x-4 text-blue-50">
//                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Shield className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Bank-grade Security</h3>
//                   <p className="text-sm text-blue-200">End-to-end encryption for your data</p>
//                 </div>
//               </div>
//
//               <div className="flex items-center space-x-4 text-blue-50">
//                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Activity className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Instant Access</h3>
//                   <p className="text-sm text-blue-200">Emergency QR code for rapid response</p>
//                 </div>
//               </div>
//
//               <div className="flex items-center space-x-4 text-blue-50">
//                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Heart className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Better Care</h3>
//                   <p className="text-sm text-blue-200">AI summaries for precise doctor visits</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       {/* Right Pane - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-gray-50/50 backdrop-blur-xl">
//         <div className="w-full max-w-md">
//           {/* Mobile Header */}
//           <div className="lg:hidden flex items-center justify-center space-x-3 mb-10">
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
//               <ShieldCheck className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold text-gray-900 tracking-tight">MedVault</span>
//           </div>
//
//           <div className="mb-10 text-center lg:text-left">
//             <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome back</h2>
//             <p className="text-gray-500">Please enter your details to sign in.</p>
//           </div>
//
//           {error && (
//             <div className="mb-6 flex items-start space-x-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
//               <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
//               <span className="text-sm font-medium">{error}</span>
//             </div>
//           )}
//
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={e => { setEmail(e.target.value); setError(null); }}
//                 required
//                 placeholder="jane@example.com"
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
//               />
//             </div>
//
//             <div className="space-y-1 relative">
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={e => { setPassword(e.target.value); setError(null); }}
//                   required
//                   placeholder="••••••••"
//                   className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>
//
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>
//
//               <div className="text-sm">
//                 <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>
//
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full relative flex items-center justify-center bg-blue-600 text-white font-medium py-3 px-4 rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mt-4 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
//             >
//               {loading ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   <span>Signing in...</span>
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>
//
//           <div className="mt-8 pt-6 border-t border-gray-100 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
//                 Register now
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { authService } from '../../services/authService';
// import { AuthContext } from '../../context/AuthContext';
// import {
//   Eye,
//   EyeOff,
//   X,
//   ShieldCheck,
//   Activity,
//   Heart,
//   Shield,
//   Stethoscope,
//   FileHeart,
//   LockKeyhole,
//   CircleCheck,
//   ArrowRight
// } from 'lucide-react';
//
// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await authService.login({ email, password });
//       if (res.success) {
//         login(res.data);
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         'Login failed. Please check your credentials and try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="min-h-screen flex bg-[#f6f9fc] font-sans text-slate-900 overflow-hidden">
//
//       {/* LEFT — MEDICAL BRANDING PANEL */}
//       <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#0d3b66]">
//
//         {/* Soft medical background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0d3b66] via-[#12527d] to-[#0f766e]" />
//
//         {/* Subtle medical pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
//             `,
//             backgroundSize: '42px 42px'
//           }}
//         />
//
//         {/* Decorative soft circles */}
//         <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-300/10 blur-3xl" />
//         <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-teal-300/10 blur-3xl" />
//
//         <div className="relative z-10 w-full px-12 xl:px-20 py-12 flex flex-col">
//
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-black/10">
//               <ShieldCheck className="w-6 h-6 text-[#0d5c78]" />
//             </div>
//
//             <div>
//               <span className="block text-2xl font-bold tracking-tight text-white">
//                 MedVault
//               </span>
//               <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan-100/80">
//                 Your health, securely stored
//               </span>
//             </div>
//           </div>
//
//           {/* Main content */}
//           <div className="flex-1 flex items-center py-12">
//             <div className="max-w-xl">
//
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-cyan-50 text-xs font-medium mb-6 backdrop-blur-sm">
//                 <CircleCheck className="w-3.5 h-3.5 text-emerald-300" />
//                 Trusted healthcare access
//               </div>
//
//               <h1 className="text-4xl xl:text-[52px] font-semibold leading-[1.08] tracking-tight text-white mb-6">
//                 Your health records,
//                 <span className="block text-cyan-100">
//                   always within reach.
//                 </span>
//               </h1>
//
//               <p className="text-blue-100/85 text-base xl:text-lg leading-relaxed max-w-lg mb-10">
//                 Securely access your medical history, prescriptions,
//                 appointments and emergency information whenever you need it.
//               </p>
//
//               {/* Medical record preview */}
//               <div className="relative max-w-md">
//
//                 {/* Floating heartbeat decoration */}
//                 <div className="absolute -top-7 -right-4 w-28 h-28 rounded-full bg-white/5 border border-white/10" />
//
//                 <div className="relative bg-white/[0.09] border border-white/15 rounded-2xl p-5 backdrop-blur-md shadow-2xl">
//
//                   <div className="flex items-center justify-between mb-5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
//                         <FileHeart className="w-5 h-5 text-cyan-200" />
//                       </div>
//
//                       <div>
//                         <p className="text-white text-sm font-semibold">
//                           Medical Records
//                         </p>
//                         <p className="text-blue-100/60 text-xs">
//                           Secure patient profile
//                         </p>
//                       </div>
//                     </div>
//
//                     <span className="flex items-center gap-1.5 text-[11px] text-emerald-200 bg-emerald-400/10 px-2.5 py-1 rounded-full">
//                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
//                       Protected
//                     </span>
//                   </div>
//
//                   {/* Heartbeat line */}
//                   <div className="h-12 flex items-center overflow-hidden mb-4">
//                     <svg
//                       viewBox="0 0 400 60"
//                       className="w-full h-full"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M0 30 H80 L95 30 L108 12 L122 49 L138 30 H185 L198 30 L212 7 L226 52 L241 30 H310 L324 30 L338 17 L350 43 L362 30 H400"
//                         fill="none"
//                         stroke="rgba(165,243,252,0.8)"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </div>
//
//                   <div className="grid grid-cols-3 gap-3">
//                     <div className="rounded-xl bg-white/5 p-3">
//                       <p className="text-[10px] text-blue-100/50 mb-1">
//                         Records
//                       </p>
//                       <p className="text-white text-sm font-semibold">
//                         Organized
//                       </p>
//                     </div>
//
//                     <div className="rounded-xl bg-white/5 p-3">
//                       <p className="text-[10px] text-blue-100/50 mb-1">
//                         Access
//                       </p>
//                       <p className="text-white text-sm font-semibold">
//                         Anytime
//                       </p>
//                     </div>
//
//                     <div className="rounded-xl bg-white/5 p-3">
//                       <p className="text-[10px] text-blue-100/50 mb-1">
//                         Privacy
//                       </p>
//                       <p className="text-white text-sm font-semibold">
//                         Protected
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//
//               {/* Healthcare features */}
//               <div className="grid grid-cols-3 gap-6 mt-10 max-w-xl">
//
//                 <div className="group">
//                   <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:-translate-y-1">
//                     <Shield className="w-4 h-4 text-cyan-200" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-white">
//                     Private
//                   </h3>
//                   <p className="text-xs text-blue-100/60 mt-1">
//                     Your health data stays protected
//                   </p>
//                 </div>
//
//                 <div className="group">
//                   <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:-translate-y-1">
//                     <Activity className="w-4 h-4 text-cyan-200" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-white">
//                     Accessible
//                   </h3>
//                   <p className="text-xs text-blue-100/60 mt-1">
//                     Important information when needed
//                   </p>
//                 </div>
//
//                 <div className="group">
//                   <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:-translate-y-1">
//                     <Heart className="w-4 h-4 text-cyan-200" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-white">
//                     Patient-first
//                   </h3>
//                   <p className="text-xs text-blue-100/60 mt-1">
//                     Designed around your care
//                   </p>
//                 </div>
//
//               </div>
//             </div>
//           </div>
//
//           {/* Bottom note */}
//           <div className="flex items-center gap-2 text-xs text-blue-100/50">
//             <LockKeyhole className="w-3.5 h-3.5" />
//             <span>Your medical information is handled securely.</span>
//           </div>
//
//         </div>
//       </div>
//
//       {/* RIGHT — LOGIN */}
//       <div className="w-full lg:w-[48%] flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-10 bg-[#f8fafc]">
//
//         <div className="w-full max-w-[430px]">
//
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
//             <div className="w-11 h-11 bg-[#0d5c78] rounded-xl flex items-center justify-center shadow-md">
//               <ShieldCheck className="w-6 h-6 text-white" />
//             </div>
//
//             <div>
//               <span className="block text-2xl font-bold text-slate-900">
//                 MedVault
//               </span>
//               <span className="block text-[9px] uppercase tracking-[0.16em] text-slate-400">
//                 Healthcare Portal
//               </span>
//             </div>
//           </div>
//
//           {/* Header */}
//           <div className="mb-8">
//             <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-5">
//               <Stethoscope className="w-5 h-5 text-[#0d7088]" />
//             </div>
//
//             <h2 className="text-[32px] font-semibold tracking-tight text-slate-900 mb-2">
//               Welcome back
//             </h2>
//
//             <p className="text-sm text-slate-500 leading-relaxed">
//               Sign in to securely access your healthcare information.
//             </p>
//           </div>
//
//           {/* Error */}
//           {error && (
//             <div className="mb-6 flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
//               <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
//                 <X className="w-4 h-4 text-red-500" />
//               </div>
//
//               <div>
//                 <p className="text-xs font-semibold text-red-800 mb-0.5">
//                   Unable to sign in
//                 </p>
//                 <span className="text-sm leading-relaxed">
//                   {error}
//                 </span>
//               </div>
//             </div>
//           )}
//
//           {/* Login form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//
//             {/* Email */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-700 mb-2">
//                 Email address
//               </label>
//
//               <div className="relative">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={e => {
//                     setEmail(e.target.value);
//                     setError(null);
//                   }}
//                   required
//                   placeholder="you@example.com"
//                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#16839a] focus:ring-4 focus:ring-cyan-100"
//                 />
//               </div>
//             </div>
//
//             {/* Password */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-xs font-semibold text-slate-700">
//                   Password
//                 </label>
//               </div>
//
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => {
//                     setPassword(e.target.value);
//                     setError(null);
//                   }}
//                   required
//                   placeholder="Enter your password"
//                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#16839a] focus:ring-4 focus:ring-cyan-100"
//                 />
//
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-[#0d7088] transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-[18px] h-[18px]" />
//                   ) : (
//                     <Eye className="w-[18px] h-[18px]" />
//                   )}
//                 </button>
//               </div>
//             </div>
//
//             {/* Remember / Forgot */}
//             <div className="flex items-center justify-between pt-1">
//
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-[#0d7088] focus:ring-[#0d7088] border-slate-300 rounded"
//                 />
//
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-xs text-slate-600"
//                 >
//                   Remember me
//                 </label>
//               </div>
//
//               <div className="text-xs">
//                 <a
//                   href="#"
//                   onClick={(e) => e.preventDefault()}
//                   className="font-semibold text-[#0d7088] hover:text-[#09566b] transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//
//             </div>
//
//             {/* Login */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`
//                 w-full relative flex items-center justify-center gap-2
//                 bg-[#0d7088] text-white
//                 font-semibold text-sm
//                 py-3.5 px-4
//                 rounded-xl
//                 shadow-[0_6px_18px_rgba(13,112,136,0.18)]
//                 hover:bg-[#095f75]
//                 hover:shadow-[0_8px_22px_rgba(13,112,136,0.24)]
//                 active:scale-[0.99]
//                 focus:outline-none focus:ring-4 focus:ring-cyan-100
//                 transition-all duration-200
//                 mt-5
//                 ${loading ? 'opacity-80 cursor-not-allowed' : ''}
//               `}
//             >
//               {loading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   <span>Signing in...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Sign in to MedVault</span>
//                   <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
//                 </>
//               )}
//             </button>
//
//           </form>
//
//           {/* Register */}
//           <div className="mt-8 pt-6 border-t border-slate-200 text-center">
//             <p className="text-sm text-slate-500">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="font-semibold text-[#0d7088] hover:text-[#09566b] transition-colors"
//               >
//                 Register now
//               </Link>
//             </p>
//           </div>
//
//           {/* Security indicator */}
//           <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-400">
//             <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
//             <span>Secure healthcare portal</span>
//             <span className="w-1 h-1 rounded-full bg-slate-300" />
//             <span>Private access</span>
//           </div>
//
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

import {
  Eye,
  EyeOff,
  X,
  ShieldCheck,
  Activity,
  HeartPulse,
  QrCode,
  FileText,
  CalendarDays,
  Bell,
  PhoneCall,
  Pill,
  Stethoscope,
  ClipboardList,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
  UserRound,
  UsersRound
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authService.login({ email, password });

      if (res.success) {
        login(res.data);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Digital Medical Records',
      text: 'Keep reports, prescriptions and health information organized in one place.'
    },
    {
      icon: CalendarDays,
      title: 'Appointments & Reminders',
      text: 'Stay updated with upcoming appointments and medicine reminders.'
    },
    {
      icon: QrCode,
      title: 'Quick Doctor Access',
      text: 'Share essential medical information securely through your QR profile.'
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure',
      text: 'Your personal healthcare information stays protected and private.'
    },
    {
      icon: PhoneCall,
      title: 'Emergency Contacts',
      text: 'Keep important family and emergency contacts easily accessible.'
    },
    {
      icon: Activity,
      title: 'Health Overview',
      text: 'View your medical reports and important health information at a glance.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f9fb] text-slate-800 font-sans overflow-x-hidden">

      {/* =========================================================
          TOP HEADER
      ========================================================= */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-200">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="font-bold text-xl tracking-tight text-slate-800">
                Med<span className="text-cyan-600">Vault</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                Digital Healthcare
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
            <LockKeyhole className="w-4 h-4 text-cyan-600" />
            Secure Patient Portal
          </div>
        </div>
      </header>


      {/* =========================================================
          MAIN LOGIN AREA
          Same functionality — only visual redesign
      ========================================================= */}
      <main className="relative">

        {/* Background medical decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-12">

          {/* Small medical status strip */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-cyan-100 shadow-sm text-xs font-medium text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Your healthcare information, organized in one place
            </div>
          </div>


          {/* =====================================================
              LOGIN + MEDICAL VISUAL
          ===================================================== */}
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center">

            {/* Left medical visual */}
            <div className="hidden lg:block relative">

              <div className="relative rounded-[2rem] bg-gradient-to-br from-[#dff6f8] via-white to-[#e8f2ff] border border-white shadow-xl shadow-slate-200/60 p-8 overflow-hidden">

                {/* decorative circles */}
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyan-100/60" />
                <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-blue-100/50" />

                <div className="relative">

                  <div className="flex items-center justify-between mb-7">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-cyan-600 font-bold">
                        Patient Care
                      </p>
                      <h1 className="text-3xl font-bold text-slate-800 mt-1 leading-tight">
                        Your health,
                        <br />
                        <span className="text-cyan-600">always within reach.</span>
                      </h1>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
                      <Stethoscope className="w-7 h-7 text-cyan-600" />
                    </div>
                  </div>


                  {/* Medical dashboard visual */}
                  <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">

                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center">
                        <UserRound className="w-5 h-5 text-cyan-600" />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Patient portal</p>
                        <p className="font-semibold text-slate-700">
                          Your medical overview
                        </p>
                      </div>

                      <div className="ml-auto">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                    </div>


                    {/* Pulse visualization */}
                    <div className="rounded-xl bg-slate-50 p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-slate-500">
                          Health information
                        </span>

                        <Activity className="w-4 h-4 text-cyan-500" />
                      </div>

                      <div className="flex items-center h-12">
                        <svg
                          viewBox="0 0 400 60"
                          className="w-full h-full"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0 31 H65 L80 31 L93 10 L108 49 L122 25 L135 31 H190 L204 31 L219 8 L233 51 L248 29 H315 L330 29 L345 18 L357 39 L370 29 H400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-cyan-500"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>


                    {/* Mini medical items */}
                    <div className="grid grid-cols-3 gap-3">

                      <div className="rounded-xl bg-blue-50 p-3">
                        <FileText className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-[11px] text-slate-500">
                          Reports
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          Organized
                        </p>
                      </div>

                      <div className="rounded-xl bg-cyan-50 p-3">
                        <CalendarDays className="w-5 h-5 text-cyan-600 mb-2" />
                        <p className="text-[11px] text-slate-500">
                          Visits
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          Updated
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 p-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                        <p className="text-[11px] text-slate-500">
                          Security
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          Protected
                        </p>
                      </div>

                    </div>
                  </div>


                  {/* Small floating cards */}
                  <div className="absolute -right-5 top-32 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite]">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-purple-600" />
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Medical profile
                      </p>
                      <p className="text-xs font-semibold text-slate-700">
                        QR Ready
                      </p>
                    </div>
                  </div>

                  <div className="absolute -left-5 bottom-20 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-amber-500" />
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Reminder
                      </p>
                      <p className="text-xs font-semibold text-slate-700">
                        Stay on schedule
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            {/* =====================================================
                CENTER LOGIN CARD
            ===================================================== */}
            <div className="w-full max-w-md mx-auto">

              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/70 p-7 sm:p-9">

                {/* Mobile logo */}
                <div className="lg:hidden flex justify-center mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-200">
                    <HeartPulse className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="text-center mb-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold mb-4">
                    <LockKeyhole className="w-3.5 h-3.5" />
                    Secure Patient Login
                  </div>

                  <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                    Welcome back
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Sign in to access your healthcare dashboard.
                  </p>
                </div>


                {/* Error */}
                {error && (
                  <div className="mb-5 flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        required
                        placeholder="jane@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                      />
                    </div>
                  </div>


                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>

                    <div className="relative">

                      <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError(null);
                        }}
                        required
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-cyan-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>

                    </div>
                  </div>


                  {/* Remember / Forgot */}
                  <div className="flex items-center justify-between">

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 accent-cyan-600 border-slate-300 rounded"
                      />

                      <span className="text-sm text-slate-600">
                        Remember me
                      </span>
                    </label>

                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      Forgot password?
                    </a>

                  </div>


                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-200/50 hover:from-cyan-700 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-200 ${
                      loading ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>


                {/* Register */}
                <div className="mt-7 pt-6 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                    >
                      Register now
                    </Link>
                  </p>
                </div>


                {/* Security note */}
                <div className="mt-5 flex justify-center items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Your healthcare data is securely protected
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            HEALTHCARE SERVICES / FEATURES
            Same page — visual information only
        ========================================================= */}
        <section className="bg-white border-y border-slate-100">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">

            <div className="text-center max-w-2xl mx-auto mb-9">

              <div className="inline-flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-widest mb-2">
                <HeartPulse className="w-4 h-4" />
                Patient Care
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Everything you need for simpler healthcare
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Keep your important healthcare information organized,
                accessible and easy to manage.
              </p>

            </div>


            {/* Feature cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="group bg-[#f8fbfc] border border-slate-100 rounded-2xl p-5 hover:bg-white hover:border-cyan-100 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors">
                        <Icon className="w-5 h-5 text-cyan-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">
                          {feature.title}
                        </h3>

                        <p className="text-xs leading-relaxed text-slate-500 mt-1.5">
                          {feature.text}
                        </p>
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>


        {/* =========================================================
            CARE / PORTAL VISUAL
        ========================================================= */}
        <section className="bg-[#eef8fa]">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-11">

            <div className="grid md:grid-cols-3 gap-5">

              {/* Patient */}
              <div className="bg-white rounded-2xl p-6 border border-white shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                  <UserRound className="w-5 h-5 text-cyan-600" />
                </div>

                <h3 className="font-bold text-slate-800">
                  Patient Portal
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Manage your medical records, reports, medicines,
                  appointments and emergency information.
                </p>
              </div>


              {/* Doctors */}
              <div className="bg-white rounded-2xl p-6 border border-white shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>

                <h3 className="font-bold text-slate-800">
                  Doctor Access
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Doctors can quickly access relevant patient information
                  through the secure medical profile.
                </p>
              </div>


              {/* Family / emergency */}
              <div className="bg-white rounded-2xl p-6 border border-white shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <UsersRound className="w-5 h-5 text-emerald-600" />
                </div>

                <h3 className="font-bold text-slate-800">
                  Care & Support
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Keep trusted emergency contacts and important healthcare
                  information close when it matters.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-slate-900 text-slate-300">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-9">

          <div className="flex flex-col md:flex-row justify-between gap-7">

            <div>
              <div className="flex items-center gap-3 mb-3">

                <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>

                <span className="text-lg font-bold text-white">
                  MedVault
                </span>

              </div>

              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                A secure digital healthcare platform designed to keep
                essential medical information accessible when you need it.
              </p>
            </div>


            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">
                About Us
              </span>

              <span className="hover:text-white cursor-pointer transition-colors">
                Patient Care
              </span>

              <span className="hover:text-white cursor-pointer transition-colors">
                Services
              </span>

              <span className="hover:text-white cursor-pointer transition-colors">
                Contact
              </span>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-7 pt-5 text-center text-[11px] text-slate-500">
            © 2026 MedVault. Your health information, securely organized.
          </div>

        </div>

      </footer>


      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }
      `}</style>

    </div>
  );
}
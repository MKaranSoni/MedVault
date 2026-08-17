// import { useState, useContext, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { authService } from '../../services/authService';
// import { AuthContext } from '../../context/AuthContext';
// import { Eye, EyeOff, Check, X, ShieldCheck, Activity, Heart, Shield } from 'lucide-react';
//
// export default function Register() {
//   const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'ROLE_PATIENT' });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//
//   // Password strength logic
//   const [strength, setStrength] = useState({ score: 0, text: '', color: 'bg-gray-200' });
//
//   useEffect(() => {
//     const p = formData.password;
//     let score = 0;
//     if (p.length > 7) score += 1;
//     if (/[A-Z]/.test(p)) score += 1;
//     if (/[0-9]/.test(p)) score += 1;
//     if (/[^A-Za-z0-9]/.test(p)) score += 1;
//
//     if (p.length === 0) setStrength({ score: 0, text: '', color: 'bg-gray-200' });
//     else if (score <= 1) setStrength({ score: 1, text: 'Weak', color: 'bg-red-400' });
//     else if (score === 2) setStrength({ score: 2, text: 'Fair', color: 'bg-yellow-400' });
//     else if (score === 3) setStrength({ score: 3, text: 'Good', color: 'bg-blue-400' });
//     else setStrength({ score: 4, text: 'Strong', color: 'bg-emerald-500' });
//   }, [formData.password]);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }
//
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await authService.register(formData);
//       if (res.success) {
//         login(res.data);
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError(null);
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
//               Your health records,<br />securely in your hands.
//             </h1>
//             <p className="text-blue-100 text-lg mb-12 max-w-md leading-relaxed">
//               Join thousands of patients taking control of their medical history with our unified, AI-powered healthcare platform.
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
//             <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create an account</h2>
//             <p className="text-gray-500">Start managing your health journey today.</p>
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
//             <div className="flex space-x-4">
//               <div className="w-1/2 space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   placeholder="Jane"
//                   className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
//                 />
//               </div>
//               <div className="w-1/2 space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   placeholder="Doe"
//                   className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
//                 />
//               </div>
//             </div>
//
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
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
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
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
//
//               {/* Password Strength Indicator */}
//               {formData.password.length > 0 && (
//                 <div className="mt-2 space-y-1.5 animate-in fade-in">
//                   <div className="flex space-x-1 h-1.5">
//                     {[1, 2, 3, 4].map(idx => (
//                       <div
//                         key={idx}
//                         className={`flex-1 rounded-full transition-all duration-300 ${strength.score >= idx ? strength.color : 'bg-gray-200'}`}
//                       />
//                     ))}
//                   </div>
//                   <div className="flex justify-between items-center text-xs">
//                     <span className="text-gray-500">
//                       Must be at least 8 characters
//                     </span>
//                     <span className={`font-medium ${strength.score < 2 ? 'text-gray-500' : strength.score === 4 ? 'text-emerald-600' : 'text-gray-700'}`}>
//                       {strength.text}
//                     </span>
//                   </div>
//                 </div>
//               )}
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
//                   <span>Creating account...</span>
//                 </div>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>
//
//           <div className="mt-8 pt-6 border-t border-gray-100 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import {
  Eye,
  EyeOff,
  Check,
  X,
  ShieldCheck,
  Activity,
  Heart,
  QrCode,
  CalendarDays,
  FileText,
  Bell,
  UserRound,
  Stethoscope,
  LockKeyhole,
  ClipboardList
} from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'ROLE_PATIENT'
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password strength logic
  const [strength, setStrength] = useState({
    score: 0,
    text: '',
    color: 'bg-gray-200'
  });

  useEffect(() => {
    const p = formData.password;
    let score = 0;

    if (p.length > 7) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;

    if (p.length === 0) {
      setStrength({
        score: 0,
        text: '',
        color: 'bg-gray-200'
      });
    } else if (score <= 1) {
      setStrength({
        score: 1,
        text: 'Weak',
        color: 'bg-red-400'
      });
    } else if (score === 2) {
      setStrength({
        score: 2,
        text: 'Fair',
        color: 'bg-yellow-400'
      });
    } else if (score === 3) {
      setStrength({
        score: 3,
        text: 'Good',
        color: 'bg-blue-400'
      });
    } else {
      setStrength({
        score: 4,
        text: 'Strong',
        color: 'bg-emerald-500'
      });
    }
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await authService.register(formData);

      if (res.success) {
        login(res.data);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (error) setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f4fbfc] text-slate-800 font-sans overflow-x-hidden">

      {/* =========================================================
          BACKGROUND MEDICAL DECORATION
      ========================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="absolute top-[25%] -right-40 w-[480px] h-[480px] rounded-full bg-teal-200/25 blur-3xl" />

        <div className="absolute bottom-0 left-[20%] w-[400px] h-[300px] rounded-full bg-blue-100/40 blur-3xl" />

        {/* ECG style line */}
        <div className="absolute top-[15%] left-0 right-0 opacity-[0.035]">
          <svg
            width="100%"
            height="120"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 65 H170 L190 65 L210 20 L230 100 L250 65 H420
                 L440 65 L460 40 L475 82 L490 65 H650
                 L670 65 L690 15 L710 105 L730 65 H900
                 L920 65 L940 42 L955 85 L970 65 H1200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>


      {/* =========================================================
          TOP NAVIGATION
      ========================================================= */}

      <header className="relative z-20 w-full px-5 sm:px-8 lg:px-12 pt-5">

        <div className="max-w-7xl mx-auto">

          <div className="h-16 bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(15,118,110,0.08)] rounded-2xl px-5 sm:px-7 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-md shadow-teal-200">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>

              <div>
                <div className="font-bold text-lg tracking-tight text-slate-800">
                  MedVault
                </div>

                <div className="text-[10px] uppercase tracking-[0.18em] text-teal-600 font-semibold">
                  Patient Care
                </div>
              </div>

            </div>

            {/* Right side */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <LockKeyhole className="w-4 h-4 text-teal-600" />
              <span>Private & Secure</span>
            </div>

          </div>

        </div>

      </header>


      {/* =========================================================
          MAIN REGISTER AREA
      ========================================================= */}

      <main className="relative z-10 px-5 sm:px-8 pt-10 sm:pt-14 pb-16">

        <div className="max-w-6xl mx-auto">

          {/* Intro */}
          <div className="text-center max-w-2xl mx-auto mb-9">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-4">
              <Heart className="w-3.5 h-3.5 fill-teal-100" />
              Your health, organized in one place
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900">
              Create your MedVault account
            </h1>

            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
              Securely manage your medical records, appointments and
              essential healthcare information.
            </p>

          </div>


          {/* =====================================================
              REGISTER CARD
          ===================================================== */}

          <div className="max-w-2xl mx-auto">

            <div className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-100 shadow-[0_20px_70px_rgba(15,118,110,0.12)] overflow-hidden">

              {/* Card top accent */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-400" />

              <div className="p-6 sm:p-8 lg:p-10">

                {/* Form heading */}
                <div className="text-center mb-7">

                  <div className="mx-auto w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-4">
                    <UserRound className="w-6 h-6 text-teal-600" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Personal details
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Enter your details to get started.
                  </p>

                </div>


                {/* Error */}
                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2">

                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>

                    <span className="text-sm font-medium pt-1">
                      {error}
                    </span>

                  </div>
                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="space-y-1.5">

                      <label className="block text-sm font-semibold text-slate-700">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jane"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all"
                      />

                    </div>


                    <div className="space-y-1.5">

                      <label className="block text-sm font-semibold text-slate-700">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all"
                      />

                    </div>

                  </div>


                  {/* Email */}
                  <div className="space-y-1.5">

                    <label className="block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <div className="relative">

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all"
                      />

                    </div>

                  </div>


                  {/* Password */}
                  <div className="space-y-1.5">

                    <label className="block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <div className="relative">

                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Create a secure password"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 pr-11 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-teal-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>

                    </div>


                    {/* Password strength */}
                    {formData.password.length > 0 && (
                      <div className="pt-2 animate-in fade-in">

                        <div className="flex gap-1.5 h-1.5">

                          {[1, 2, 3, 4].map((idx) => (
                            <div
                              key={idx}
                              className={`flex-1 rounded-full transition-all duration-300 ${
                                strength.score >= idx
                                  ? strength.color
                                  : 'bg-slate-200'
                              }`}
                            />
                          ))}

                        </div>

                        <div className="flex justify-between items-center mt-1.5">

                          <span className="text-xs text-slate-400">
                            At least 8 characters
                          </span>

                          <span
                            className={`text-xs font-semibold ${
                              strength.score < 2
                                ? 'text-slate-500'
                                : strength.score === 4
                                ? 'text-emerald-600'
                                : 'text-slate-600'
                            }`}
                          >
                            {strength.text}
                          </span>

                        </div>

                      </div>
                    )}

                  </div>


                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full relative flex items-center justify-center bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-teal-200/50 hover:from-teal-700 hover:to-cyan-700 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all duration-200 mt-6 ${
                      loading
                        ? 'opacity-80 cursor-not-allowed hover:translate-y-0'
                        : ''
                    }`}
                  >

                    {loading ? (
                      <div className="flex items-center gap-2">

                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                        <span>Creating account...</span>

                      </div>
                    ) : (
                      <span>Create Patient Account</span>
                    )}

                  </button>

                </form>


                {/* Existing account */}
                <div className="mt-7 pt-6 border-t border-slate-100 text-center">

                  <p className="text-sm text-slate-500">

                    Already have an account?{' '}

                    <Link
                      to="/login"
                      className="font-semibold text-teal-700 hover:text-teal-600 transition-colors"
                    >
                      Log in
                    </Link>

                  </p>

                </div>


                {/* Security note */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">

                  <ShieldCheck className="w-4 h-4 text-teal-500" />

                  <span>Your information is protected and kept private.</span>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              HEALTHCARE VISUAL FEATURES
          ===================================================== */}

          <section className="mt-16">

            <div className="text-center mb-8">

              <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-bold mb-2">
                Patient care, simplified
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Everything important about your care, together
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Designed to make everyday healthcare easier to manage.
              </p>

            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Medical Records */}
              <div className="group bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>

                <h3 className="font-bold text-sm text-slate-800">
                  Medical Records
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Keep reports and essential health information organized.
                </p>

              </div>


              {/* Appointments */}
              <div className="group bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <CalendarDays className="w-5 h-5 text-teal-600" />
                </div>

                <h3 className="font-bold text-sm text-slate-800">
                  Appointments
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Keep track of upcoming visits and important reminders.
                </p>

              </div>


              {/* Emergency QR */}
              <div className="group bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <QrCode className="w-5 h-5 text-cyan-600" />
                </div>

                <h3 className="font-bold text-sm text-slate-800">
                  Emergency QR
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Help authorized doctors access essential medical details.
                </p>

              </div>


              {/* Secure Care */}
              <div className="group bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>

                <h3 className="font-bold text-sm text-slate-800">
                  Secure Care
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Keep your personal healthcare information protected.
                </p>

              </div>

            </div>

          </section>


          {/* =====================================================
              SMALL MEDICAL VISUAL STRIP
          ===================================================== */}

          <section className="mt-10">

            <div className="rounded-3xl bg-gradient-to-r from-[#e5f7f8] via-white to-[#e7f5fb] border border-white shadow-sm overflow-hidden">

              <div className="px-6 sm:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex items-center gap-4">

                  <div className="relative">

                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                      <Stethoscope className="w-7 h-7 text-teal-600" />
                    </div>

                    <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      Built around patient care
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      From appointments and medicines to reports and emergency information.
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-6 text-xs text-slate-500">

                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-600" />
                    Reminders
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600" />
                    Health records
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-emerald-600" />
                    Care history
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="relative z-10 border-t border-slate-200/70 bg-white/70">

        <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>

            <span className="font-semibold text-sm text-slate-700">
              MedVault
            </span>

          </div>

          <p className="text-xs text-slate-400 text-center">
            Secure healthcare information, designed around you.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <LockKeyhole className="w-3.5 h-3.5" />
            Secure & Private
          </div>

        </div>

      </footer>

    </div>
  );
}

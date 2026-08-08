import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { Eye, EyeOff, Check, X, ShieldCheck, Activity, Heart, Shield } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'ROLE_PATIENT' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password strength logic
  const [strength, setStrength] = useState({ score: 0, text: '', color: 'bg-gray-200' });
  
  useEffect(() => {
    const p = formData.password;
    let score = 0;
    if (p.length > 7) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;

    if (p.length === 0) setStrength({ score: 0, text: '', color: 'bg-gray-200' });
    else if (score <= 1) setStrength({ score: 1, text: 'Weak', color: 'bg-red-400' });
    else if (score === 2) setStrength({ score: 2, text: 'Fair', color: 'bg-yellow-400' });
    else if (score === 3) setStrength({ score: 3, text: 'Good', color: 'bg-blue-400' });
    else setStrength({ score: 4, text: 'Strong', color: 'bg-emerald-500' });
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
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-900">
      {/* Left Pane - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 relative overflow-hidden flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-900 opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-3xl"></div>

        <div className="relative z-10 p-12 lg:p-20 pt-16 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">MedVault</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Your health records,<br />securely in your hands.
            </h1>
            <p className="text-blue-100 text-lg mb-12 max-w-md leading-relaxed">
              Join thousands of patients taking control of their medical history with our unified, AI-powered healthcare platform.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-blue-50">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Bank-grade Security</h3>
                  <p className="text-sm text-blue-200">End-to-end encryption for your data</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-blue-50">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant Access</h3>
                  <p className="text-sm text-blue-200">Emergency QR code for rapid response</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-blue-50">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Better Care</h3>
                  <p className="text-sm text-blue-200">AI summaries for precise doctor visits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-gray-50/50 backdrop-blur-xl">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">MedVault</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create an account</h2>
            <p className="text-gray-500">Start managing your health journey today.</p>
          </div>
          
          {error && (
            <div className="mb-6 flex items-start space-x-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
              <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex space-x-4">
              <div className="w-1/2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange} 
                  required 
                  placeholder="Jane"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="w-1/2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange} 
                  required 
                  placeholder="Doe"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                required 
                placeholder="jane@example.com"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1 relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="mt-2 space-y-1.5 animate-in fade-in">
                  <div className="flex space-x-1 h-1.5">
                    {[1, 2, 3, 4].map(idx => (
                      <div 
                        key={idx} 
                        className={`flex-1 rounded-full transition-all duration-300 ${strength.score >= idx ? strength.color : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Must be at least 8 characters
                    </span>
                    <span className={`font-medium ${strength.score < 2 ? 'text-gray-500' : strength.score === 4 ? 'text-emerald-600' : 'text-gray-700'}`}>
                      {strength.text}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full relative flex items-center justify-center bg-blue-600 text-white font-medium py-3 px-4 rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mt-4 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

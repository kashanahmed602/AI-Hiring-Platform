import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const CandidateLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const login = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:3001/api/v1/candidate/login', {
            email,
            password
        },{
          withCredentials: true
        });
        
        alert("Login Successfully");
        setEmail('');
        setPassword('');
        navigate('/candidate/dashboard');

    }catch(error){
        alert(error.message);
    }
}

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/30 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-300/25 blur-[130px]" />
        <div className="absolute bottom-[-250px] left-1/3 w-[500px] h-[500px] rounded-full bg-fuchsia-200/30 blur-[130px]" />
      </div>

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 lg:left-10 z-20 flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-8">

            <Link to="/" className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                <Sparkles size={21} />
              </div>

              <div className="text-left">
                <h1 className="font-bold text-xl">
                  Hire<span className="text-violet-600">Flow</span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
                  AI Hiring Platform
                </p>
              </div>

            </Link>

          </div>

          {/* Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-[0_25px_80px_rgba(15,23,42,0.10)]">

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-6">
              <BrainCircuit size={23} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue your career journey.
            </p>

            {/* Form */}
            <form onSubmit={login} className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-violet-600 hover:text-violet-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-violet-600"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500"
                >
                  Remember me
                </label>

              </div>

              {/* Login */}
              <button
                type="submit"
                className="group w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20 transition"
              >
                Sign in

                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

            </form>

            {/* Signup */}
            <p className="text-center text-sm text-slate-500 mt-7">
              Don't have an account?{" "}
              <Link
                to="/candidate/signup"
                className="font-semibold text-violet-600 hover:text-violet-700"
              >
                Create one
              </Link>
            </p>

          </div>

          {/* Bottom */}
          <p className="text-center text-xs text-slate-400 mt-6">
            AI-powered career matching • Smart assessments • Technical interviews
          </p>

        </div>

      </div>
    </div>
  );
};

export default CandidateLogin;

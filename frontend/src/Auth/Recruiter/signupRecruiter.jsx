import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Sparkles,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const RecruiterSignup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('recruiter');

  const signup = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        alert("Password donot match")
        return;
    }

    try{
        const response = await axios.post('http://localhost:3001/api/v1/recruiter/register', {
            "Company Name": companyName,
            email,
            password,
            phone,
            role
        });

        alert("User Registered Successfully");
        setCompanyName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
    }catch(error){
        alert(error.message);
    }
  }
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-[-100px] w-[550px] h-[550px] rounded-full bg-blue-300/30 blur-[140px]" />
        <div className="absolute top-1/3 left-[-200px] w-[500px] h-[500px] rounded-full bg-violet-300/25 blur-[140px]" />
        <div className="absolute bottom-[-250px] right-1/3 w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[140px]" />
      </div>

      {/* Back */}
      <button
        onClick={() => navigate("/recruiter/login")}
        className="absolute top-6 left-6 lg:left-10 z-20 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-lg">

          {/* Logo */}
          <div className="flex justify-center mb-8">

            <Link to="/" className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Sparkles size={21} />
              </div>

              <div className="text-left">
                <h1 className="font-bold text-xl">
                  Hire<span className="text-blue-600">Flow</span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
                  AI Hiring Platform
                </p>
              </div>

            </Link>

          </div>

          {/* Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-[0_25px_80px_rgba(15,23,42,0.10)]">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Building2 size={23} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Build your hiring workspace
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create your company account and start hiring smarter.
            </p>

            <form onSubmit={signup} className="mt-8 space-y-5">

              {/* Recruiter Name */}
              {/* <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your name
                </label>

                <input
                  type="text"
                  placeholder="Kashan Ahmed"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div> */}

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company name
                </label>

                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  type="text"
                  placeholder="Acme Technologies"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work email
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone number
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="123-456-7890"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition"
                />
              </div>

              {/* Password */}
              <div className="grid sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="w-full px-4 py-3.5 pr-11 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm password
                  </label>

                  <div className="relative">

                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat password"
                      className="w-full px-4 py-3.5 pr-11 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>
                </div>

              </div>

              {/* Features */}
              <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-4">

                <p className="text-xs font-semibold text-blue-700 mb-3">
                  Your hiring workspace includes
                </p>

                <div className="grid sm:grid-cols-2 gap-2">

                  {[
                    "AI candidate matching",
                    "Resume screening",
                    "Technical assessments",
                    "AI-powered interviews",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-slate-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                        <Check
                          size={12}
                          className="text-emerald-500"
                        />
                      </div>

                      {item}
                    </div>

                  ))}

                </div>

              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 accent-blue-600"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-500"
                >
                  I agree to the HireFlow{" "}
                  <span className="text-blue-600 font-medium">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 font-medium">
                    Privacy Policy
                  </span>
                  .
                </label>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition"
              >
                Create company workspace

                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

            </form>

            <p className="text-center text-sm text-slate-500 mt-7">
              Already have a company account?{" "}
              <Link
                to="/recruiter/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RecruiterSignup;

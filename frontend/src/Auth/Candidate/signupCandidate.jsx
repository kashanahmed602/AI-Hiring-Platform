import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
  Sparkles,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CandidateSignup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('candidate');

  const signup = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        alert("Password donot match")
    }
    try{
        const response = await axios.post('http://localhost:3001/api/v1/candidate/register', {
            name,
            email,
            password,
            phone,
            role
        });

        alert("User Registered Successfully");
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setRole('candidate');
    }catch(error){
        alert("error.message");
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
        onClick={() => navigate("/candidate/login")}
        className="absolute top-6 left-6 lg:left-10 z-20 flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-lg">

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

            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-6">
              <BrainCircuit size={23} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Create your candidate profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Let AI help you discover opportunities that match your skills.
            </p>

            <form onSubmit={signup} className="mt-8 space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Kashan Ahmed"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
                />
              </div>

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
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="123-456-7890"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
                />
              </div>

              {/* Password Grid */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Password */}
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
                      className="w-full px-4 py-3.5 pr-11 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
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

                {/* Confirm */}
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
                      className="w-full px-4 py-3.5 pr-11 rounded-xl border border-slate-200 bg-slate-50/70 outline-none text-sm placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition"
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

              {/* Benefits */}
              <div className="rounded-2xl bg-violet-50/70 border border-violet-100 p-4">

                <p className="text-xs font-semibold text-violet-700 mb-3">
                  Your HireFlow profile includes
                </p>

                <div className="grid sm:grid-cols-2 gap-2">

                  {[
                    "AI resume analysis",
                    "Smart job matching",
                    "Technical assessments",
                    "AI interviews",
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
                  className="mt-1 w-4 h-4 accent-violet-600"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-500"
                >
                  I agree to the HireFlow{" "}
                  <span className="text-violet-600 font-medium">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-violet-600 font-medium">
                    Privacy Policy
                  </span>
                  .
                </label>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20 transition"
              >
                Create candidate account

                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

            </form>

            <p className="text-center text-sm text-slate-500 mt-7">
              Already have an account?{" "}
              <Link
                to="/candidate/login"
                className="font-semibold text-violet-600 hover:text-violet-700"
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

export default CandidateSignup;

import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Users,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-250px] left-[10%] w-[600px] h-[600px] bg-violet-300/30 blur-[140px] rounded-full" />
        <div className="absolute top-[15%] right-[-200px] w-[550px] h-[550px] bg-blue-300/25 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-250px] left-[35%] w-[550px] h-[550px] bg-fuchsia-200/30 blur-[140px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20 text-white">
            <Sparkles size={20} />
          </div>

          <div>
            <h1 className="font-bold text-xl tracking-tight">
              Hire<span className="text-violet-600">Flow</span>
            </h1>

            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
              AI Hiring Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
          <a
            href="#features"
            className="hover:text-violet-600 transition"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="hover:text-violet-600 transition"
          >
            How it works
          </a>

          <a
            href="#for-companies"
            className="hover:text-violet-600 transition"
          >
            For Companies
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/candidate/login")}
            className="hidden sm:block px-4 py-2 text-sm text-slate-600 hover:text-violet-600 transition"
          >
            Sign in
          </button>

          <button
            onClick={() => navigate("/recruiter/login")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-violet-700 shadow-lg shadow-slate-900/10 hover:shadow-violet-500/20 transition"
          >
            Get Started
          </button>

        </div>

      </nav>

      {/* Hero */}
      <main className="relative z-10">

        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24">

          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 bg-white/70 backdrop-blur-xl text-sm text-slate-600 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              AI-powered hiring is here

              <ArrowRight
                size={14}
                className="text-violet-500"
              />
            </div>

            {/* Heading */}
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-semibold tracking-[-0.05em] leading-[0.95] text-slate-950">

              Find the right
              <br />

              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                talent. Faster.
              </span>

            </h2>

            {/* Description */}
            <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 leading-relaxed">
              HireFlow uses AI to connect exceptional talent with companies,
              automate screening, and make technical hiring dramatically
              smarter.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              <button
                onClick={() => navigate("/recruiter/signup")}
                className="group w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-3 hover:bg-violet-700 hover:scale-[1.02] shadow-xl shadow-slate-900/10 hover:shadow-violet-500/20 transition"
              >
                Start hiring smarter

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

              <button
                onClick={() => navigate("/candidate/signup")}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-200 bg-white/80 text-slate-700 font-medium hover:border-violet-300 hover:text-violet-600 hover:bg-white shadow-sm transition"
              >
                I'm looking for a job
              </button>

            </div>

            {/* Trust */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />
                AI-powered matching
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />
                Smart screening
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />
                Technical interviews
              </div>

            </div>

          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto mt-20">

            {/* Glow */}
            <div className="absolute inset-0 bg-violet-400/20 blur-[100px] rounded-full" />

            <div className="relative rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-2xl shadow-[0_30px_100px_rgba(15,23,42,0.12)] overflow-hidden">

              {/* Browser Header */}
              <div className="h-12 border-b border-slate-200 flex items-center px-5 gap-2 bg-slate-50/80">

                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />

                <div className="ml-5 flex-1 max-w-md mx-auto h-7 rounded-lg bg-white border border-slate-200" />

              </div>

              {/* Fake Dashboard */}
              <div className="grid grid-cols-12 min-h-[470px]">

                {/* Sidebar */}
                <div className="hidden md:block col-span-2 border-r border-slate-200 p-5 bg-slate-50/40">

                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-5">
                    Workspace
                  </div>

                  <div className="space-y-2">

                    {[
                      "Overview",
                      "Candidates",
                      "Jobs",
                      "Interviews",
                      "Analytics",
                    ].map((item, index) => (

                      <div
                        key={item}
                        className={`px-3 py-2.5 rounded-xl text-xs ${
                          index === 0
                            ? "bg-violet-50 text-violet-700 font-medium"
                            : "text-slate-500"
                        }`}
                      >
                        {item}
                      </div>

                    ))}

                  </div>

                </div>

                {/* Dashboard Content */}
                <div className="col-span-12 md:col-span-10 p-6 lg:p-8">

                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-xs text-slate-400">
                        Recruiter workspace
                      </p>

                      <h3 className="text-2xl font-semibold mt-1 text-slate-900">
                        Good morning 👋
                      </h3>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-100 bg-emerald-50 text-xs text-emerald-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      AI Assistant active
                    </div>

                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    {[
                      ["284", "Applications"],
                      ["42", "Shortlisted"],
                      ["18", "Interviews"],
                      ["6", "Hired"],
                    ].map(([value, label]) => (

                      <div
                        key={label}
                        className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition"
                      >
                        <p className="text-2xl font-semibold text-slate-900">
                          {value}
                        </p>

                        <p className="text-xs text-slate-400 mt-2">
                          {label}
                        </p>
                      </div>

                    ))}

                  </div>

                  {/* Candidates */}
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5">

                    <div className="flex justify-between items-center mb-5">

                      <div>
                        <p className="font-medium text-slate-900">
                          Top candidates
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          AI-ranked for Frontend Developer
                        </p>
                      </div>

                      <span className="text-xs text-violet-600 font-medium">
                        View all
                      </span>

                    </div>

                    <div className="space-y-3">

                      {[
                        [
                          "KA",
                          "Kashan Ahmed",
                          "React · Node · MongoDB",
                          "94%",
                        ],
                        [
                          "AR",
                          "Ali Raza",
                          "React · TypeScript · AWS",
                          "91%",
                        ],
                        [
                          "AK",
                          "Ahmed Khan",
                          "Next.js · Node · PostgreSQL",
                          "88%",
                        ],
                      ].map(([avatar, name, skills, score]) => (

                        <div
                          key={name}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white hover:shadow-sm transition"
                        >

                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 border border-violet-100 flex items-center justify-center text-xs font-semibold text-violet-700">
                            {avatar}
                          </div>

                          <div className="flex-1">

                            <p className="text-sm font-medium text-slate-800">
                              {name}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {skills}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-sm font-semibold text-emerald-600">
                              {score}
                            </p>

                            <p className="text-[10px] text-slate-400">
                              AI match
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Features */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-24"
        >

          <div className="max-w-2xl mb-14">

            <p className="text-sm text-violet-600 font-semibold mb-4">
              BUILT DIFFERENT
            </p>

            <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">
              Hiring shouldn't feel like
              <span className="text-slate-400">
                {" "}searching through spreadsheets.
              </span>
            </h3>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                icon: BrainCircuit,
                title: "AI Candidate Matching",
                description:
                  "Automatically discover candidates whose skills and experience actually match your role.",
              },
              {
                icon: Zap,
                title: "Smart Assessments",
                description:
                  "Evaluate technical skills with intelligent coding challenges and automated scoring.",
              },
              {
                icon: Users,
                title: "AI Interviews",
                description:
                  "Run adaptive technical interviews that generate deeper questions based on candidate responses.",
              },
            ].map((feature) => {

              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group p-7 rounded-3xl border border-slate-200 bg-white hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1 transition duration-500"
                >

                  <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 group-hover:scale-110 group-hover:bg-violet-100 transition">
                    <Icon size={22} />
                  </div>

                  <h4 className="mt-7 text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                </div>
              );

            })}

          </div>

        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-y border-slate-200 bg-white/60"
        >

          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">

            <div className="text-center max-w-2xl mx-auto">

              <p className="text-sm text-violet-600 font-semibold">
                HOW IT WORKS
              </p>

              <h3 className="mt-4 text-4xl sm:text-5xl font-semibold text-slate-950">
                From application to hire.
              </h3>

              <p className="mt-5 text-slate-500">
                One intelligent workflow for modern hiring teams.
              </p>

            </div>

            <div className="grid md:grid-cols-4 gap-5 mt-16">

              {[
                [
                  "01",
                  "Discover",
                  "Candidates discover opportunities that match their skills.",
                ],
                [
                  "02",
                  "Analyze",
                  "AI analyzes resumes, skills, and experience.",
                ],
                [
                  "03",
                  "Evaluate",
                  "Technical assessments and AI interviews measure real ability.",
                ],
                [
                  "04",
                  "Hire",
                  "Recruiters get a ranked shortlist and make better decisions.",
                ],
              ].map(([number, title, description]) => (

                <div
                  key={number}
                  className="relative p-6 rounded-2xl hover:bg-white hover:shadow-lg transition"
                >

                  <div className="text-5xl font-bold text-violet-100">
                    {number}
                  </div>

                  <h4 className="text-lg font-semibold mt-2 text-slate-900">
                    {title}
                  </h4>

                  <p className="text-sm text-slate-500 leading-6 mt-3">
                    {description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-28 text-center">

          <div className="relative p-12 sm:p-20 rounded-[2rem] border border-violet-100 bg-white shadow-[0_30px_80px_rgba(79,70,229,0.08)] overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-violet-100/70 via-transparent to-blue-100/70" />

            <div className="relative">

              <ShieldCheck
                className="mx-auto text-violet-600"
                size={30}
              />

              <h3 className="mt-6 text-4xl sm:text-5xl font-semibold text-slate-950">
                Ready to hire smarter?
              </h3>

              <p className="mt-5 text-slate-500 max-w-xl mx-auto">
                Join the next generation of AI-powered hiring.
              </p>

              <button
                onClick={() => navigate("/recruiter/signup")}
                className="mt-8 px-7 py-4 rounded-2xl bg-slate-900 text-white font-semibold inline-flex items-center gap-3 hover:bg-violet-700 hover:scale-[1.02] shadow-xl transition"
              >
                Get started
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-slate-400">
            © 2026 HireFlow. Intelligent hiring, redesigned.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default Landing;

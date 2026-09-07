import {
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Mic2,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const jobs = [
    {
      title: "Senior React Developer",
      company: "TechNova",
      location: "Remote",
      salary: "$85k – $110k",
      match: 96,
    },
    {
      title: "Frontend Engineer",
      company: "Pixel Labs",
      location: "Karachi",
      salary: "$70k – $95k",
      match: 91,
    },
    {
      title: "Full Stack Developer",
      company: "CloudCore",
      location: "Remote",
      salary: "$80k – $105k",
      match: 87,
    },
  ];

  const menuItems = [
    { icon: Home, label: "Overview", active: true },
    { icon: Search, label: "Find Jobs" },
    { icon: FileText, label: "My Resume" },
    { icon: BriefcaseBusiness, label: "Applications" },
    { icon: Target, label: "Assessments" },
    { icon: Mic2, label: "Interviews" },
    { icon: MessageSquare, label: "Messages" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/20 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[130px]" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        {/* Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <Sparkles size={19} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Hire<span className="text-violet-600">Flow</span>
              </h1>

              <p className="text-[8px] uppercase tracking-[0.2em] text-slate-400">
                Candidate
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">

          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Workspace
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition
                ${
                  item.active
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
                {item.label}

                {item.label === "Messages" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] flex items-center justify-center">
                    3
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6">
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Account
            </p>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-500 hover:bg-slate-50">
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>

        {/* Profile mini card */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center font-semibold text-sm">
              KA
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                Kashan Ahmed
              </p>

              <p className="text-xs text-slate-400 truncate">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 relative z-10">

        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-5 sm:px-8 flex items-center justify-between sticky top-0 z-20">

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs text-slate-400">
              Monday, September 7
            </p>

            <h2 className="font-semibold text-slate-900">
              Candidate Workspace
            </h2>
          </div>

          <div className="flex items-center gap-3 ml-auto">

            <button className="relative w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-violet-600 transition">
              <Bell size={18} />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white" />
            </button>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
                KA
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Kashan Ahmed
                </p>

                <p className="text-[11px] text-slate-400">
                  Candidate
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Content */}
        <div className="p-5 sm:p-8 max-w-[1500px] mx-auto">

          {/* Welcome */}
          <div className="mb-7">
            <p className="text-sm text-slate-500">
              Welcome back 👋
            </p>

            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Let's move your career forward.
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Your AI career assistant has found opportunities matching your profile.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {[
              {
                label: "Applications",
                value: "18",
                change: "+4 this week",
                icon: BriefcaseBusiness,
              },
              {
                label: "Profile Views",
                value: "126",
                change: "+18% this week",
                icon: UserRound,
              },
              {
                label: "Interviews",
                value: "5",
                change: "2 upcoming",
                icon: Mic2,
              },
              {
                label: "Job Matches",
                value: "34",
                change: "+9 new",
                icon: Target,
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-xs text-slate-400">
                        {stat.label}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-slate-950">
                        {stat.value}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                      <Icon size={19} />
                    </div>

                  </div>

                  <p className="mt-3 text-xs text-emerald-600 font-medium">
                    {stat.change}
                  </p>
                </div>
              );
            })}

          </div>

          {/* AI Score + Resume */}
          <div className="grid lg:grid-cols-3 gap-5 mb-6">

            {/* AI Career Score */}
            <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-violet-500/15">

              <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div>
                    <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
                      <Sparkles size={14} />
                      AI Career Intelligence
                    </div>

                    <h2 className="mt-2 text-xl font-semibold">
                      Your career score
                    </h2>

                    <p className="mt-1 text-sm text-white/65">
                      Based on your resume, skills and market demand.
                    </p>
                  </div>

                  <TrendingUp size={22} className="text-emerald-300" />

                </div>

                <div className="mt-7 flex items-center gap-7">

                  <div className="relative w-28 h-28 shrink-0">

                    <div className="w-full h-full rounded-full border-[10px] border-white/15 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold">82</p>
                        <p className="text-[10px] text-white/60">
                          / 100
                        </p>
                      </div>
                    </div>

                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Strong profile 🚀
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/65 max-w-sm">
                      Your profile is performing better than 74% of candidates
                      applying for similar roles.
                    </p>

                    <button className="mt-4 px-4 py-2 rounded-lg bg-white text-violet-700 text-xs font-semibold hover:bg-white/90 transition">
                      Improve my score
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Resume */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>

                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Analyzed
                </span>
              </div>

              <h3 className="mt-5 font-semibold">
                Resume strength
              </h3>

              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <span className="text-slate-400">
                  AI score
                </span>

                <span className="font-semibold text-slate-700">
                  88%
                </span>
              </div>

              <button className="mt-5 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50 transition">
                View resume analysis
              </button>

            </div>

          </div>

          {/* Jobs + Applications */}
          <div className="grid xl:grid-cols-3 gap-5">

            {/* Jobs */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="font-semibold text-lg">
                    Recommended for you
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    AI-powered job matches
                  </p>
                </div>

                <button className="text-xs font-semibold text-violet-600 flex items-center gap-1 hover:text-violet-700">
                  View all
                  <ChevronRight size={14} />
                </button>

              </div>

              <div className="space-y-3">

                {jobs.map((job) => (
                  <div
                    key={job.title}
                    className="group border border-slate-100 rounded-2xl p-4 hover:border-violet-200 hover:shadow-sm transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 text-violet-600 flex items-center justify-center font-bold">
                        {job.company.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-sm truncate">
                          {job.title}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          {job.company} • {job.location}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {job.salary}
                        </p>

                      </div>

                      <div className="hidden sm:block text-right">

                        <div className="text-lg font-bold text-violet-600">
                          {job.match}%
                        </div>

                        <p className="text-[10px] text-slate-400">
                          AI match
                        </p>

                      </div>

                      <button className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition">
                        <ChevronRight size={17} />
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Activity */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">
                  Upcoming
                </h2>

                <span className="text-xs text-slate-400">
                  This week
                </span>
              </div>

              <div className="mt-5 space-y-5">

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                    <Mic2 size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      AI Technical Interview
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Tomorrow • 10:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Technical Assessment
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Wednesday • React.js
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <BriefcaseBusiness size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Application Update
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      TechNova • Under review
                    </p>
                  </div>
                </div>

              </div>

              <button className="mt-6 w-full py-2.5 rounded-xl bg-slate-50 text-sm font-medium hover:bg-slate-100 transition">
                View activity
              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Mic2,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Overview", active: true },
    { icon: BriefcaseBusiness, label: "Jobs" },
    { icon: Users, label: "Candidates" },
    { icon: Sparkles, label: "AI Screening" },
    { icon: FileText, label: "Assessments" },
    { icon: Mic2, label: "Interviews" },
    { icon: MessageSquare, label: "Messages" },
  ];

  const jobs = [
    {
      title: "Senior React Developer",
      applicants: 128,
      shortlisted: 14,
      status: "Active",
      days: "12 days left",
    },
    {
      title: "Backend Node.js Engineer",
      applicants: 86,
      shortlisted: 9,
      status: "Active",
      days: "18 days left",
    },
    {
      title: "Product Designer",
      applicants: 64,
      shortlisted: 7,
      status: "Active",
      days: "24 days left",
    },
  ];

  const candidates = [
    {
      name: "Ali Raza",
      role: "Senior React Developer",
      score: 96,
      initials: "AR",
    },
    {
      name: "Sarah Khan",
      role: "Frontend Engineer",
      score: 93,
      initials: "SK",
    },
    {
      name: "Ahmed Hassan",
      role: "Full Stack Developer",
      score: 89,
      initials: "AH",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-blue-300/20 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/20 blur-[140px]" />
      </div>

      {/* Overlay */}
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

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Sparkles size={19} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Hire<span className="text-blue-600">Flow</span>
              </h1>

              <p className="text-[8px] uppercase tracking-[0.2em] text-slate-400">
                Recruiter
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

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">

          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Hiring Workspace
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition
                ${
                  item.active
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />

                {item.label}

                {item.label === "Candidates" && (
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100">
                    248
                  </span>
                )}

                {item.label === "Messages" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                    5
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

        {/* Company */}
        <div className="p-4 border-t border-slate-100">

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">

            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Building2 size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                Acme Technologies
              </p>

              <p className="text-xs text-slate-400 truncate">
                Hiring Workspace
              </p>
            </div>

          </div>

        </div>

      </aside>

      {/* Main */}
      <main className="lg:ml-64 relative z-10">

        {/* Header */}
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

            <h2 className="font-semibold">
              Hiring Workspace
            </h2>
          </div>

          <div className="flex items-center gap-3 ml-auto">

            <button className="relative w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-blue-600">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>

            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-700 transition">
              <Plus size={15} />
              Create Job
            </button>

          </div>
        </header>

        {/* Content */}
        <div className="p-5 sm:p-8 max-w-[1500px] mx-auto">

          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

            <div>
              <p className="text-sm text-slate-500">
                Good morning 👋
              </p>

              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                Build your next great team.
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Your AI hiring assistant is ready to help you find the right talent.
              </p>
            </div>

            <button className="sm:hidden w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2">
              <Plus size={17} />
              Create Job
            </button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {[
              {
                label: "Active Jobs",
                value: "12",
                change: "+3 this month",
                icon: BriefcaseBusiness,
              },
              {
                label: "Applications",
                value: "248",
                change: "+32 this week",
                icon: FileText,
              },
              {
                label: "Shortlisted",
                value: "34",
                change: "+8 this week",
                icon: Target,
              },
              {
                label: "Interviews",
                value: "18",
                change: "6 upcoming",
                icon: Mic2,
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xs text-slate-400">
                        {stat.label}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">
                        {stat.value}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
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

          {/* AI banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-7 text-white mb-6 shadow-xl shadow-blue-500/15">

            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div className="max-w-2xl">

                <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
                  <Sparkles size={14} />
                  AI Hiring Intelligence
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  34 candidates are ready for AI screening
                </h2>

                <p className="mt-2 text-sm text-white/65">
                  Let HireFlow analyze resumes, skills and experience to rank
                  the strongest candidates automatically.
                </p>

              </div>

              <button className="shrink-0 px-5 py-3 rounded-xl bg-white text-blue-700 text-sm font-semibold hover:bg-white/90 transition">
                Start AI Screening
              </button>

            </div>

          </div>

          {/* Jobs + Candidates */}
          <div className="grid xl:grid-cols-5 gap-5">

            {/* Jobs */}
            <div className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="font-semibold text-lg">
                    Active jobs
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Monitor your current openings
                  </p>
                </div>

                <button className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  Manage jobs
                  <ChevronRight size={14} />
                </button>

              </div>

              <div className="space-y-3">

                {jobs.map((job) => (
                  <div
                    key={job.title}
                    className="border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <BriefcaseBusiness size={19} />
                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-sm truncate">
                          {job.title}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          {job.applicants} applicants • {job.shortlisted} shortlisted
                        </p>

                      </div>

                      <div className="hidden sm:block text-right">

                        <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
                          {job.status}
                        </span>

                        <p className="text-[10px] text-slate-400 mt-1">
                          {job.days}
                        </p>

                      </div>

                      <button className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600">
                        <ChevronRight size={17} />
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Candidates */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="font-semibold text-lg">
                    Top candidates
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Ranked by AI
                  </p>
                </div>

                <Sparkles size={18} className="text-violet-500" />

              </div>

              <div className="space-y-4">

                {candidates.map((candidate) => (
                  <div
                    key={candidate.name}
                    className="flex items-center gap-3"
                  >

                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {candidate.initials}
                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-semibold truncate">
                        {candidate.name}
                      </p>

                      <p className="text-[11px] text-slate-400 truncate">
                        {candidate.role}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-sm font-bold text-violet-600">
                        {candidate.score}%
                      </p>

                      <p className="text-[9px] text-slate-400">
                        AI Match
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              <button className="mt-6 w-full py-2.5 rounded-xl bg-slate-50 text-sm font-medium hover:bg-slate-100 transition">
                View all candidates
              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
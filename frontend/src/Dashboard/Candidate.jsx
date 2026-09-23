import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Mail,
  Menu,
  Mic2,
  Phone,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";

import Sidebar from "../Components/Sidebar";
import ProfileModal from "../Pages/Profile";
import ChangePasswordModal from "../Components/ChangePasswordModal";

const CandidateDashboard = () => {
  // =========================================
  // SIDEBAR
  // =========================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================================
  // PROFILE
  // =========================================

  const [profileModalOpen, setProfileModalOpen] =
    useState(false);

  const [changePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);

  // =========================================
  // USER
  // =========================================

  const [user, setUser] = useState({
    name: "Kashan Ahmed",
    email: "kashan@example.com",
    phone: "+92 300 1234567",
    headline: "Full Stack Developer",
  });

  // =========================================
  // PROFILE UPDATE
  // =========================================

  const handleProfileUpdate = async (profileData) => {
    try {
      /*
        Later API:

        const response = await axios.put(
          "http://localhost:3001/api/v1/profile",
          profileData,
          {
            withCredentials: true,
          }
        );

        const updatedUser = response.data.user;

        setUser(updatedUser);
      */

      // Temporary frontend update
      setUser((prev) => ({
        ...prev,
        ...profileData,
      }));

      setProfileModalOpen(false);
    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // =========================================
  // CHANGE PASSWORD
  // =========================================

  const handleChangePassword = async (passwordData) => {
    try {
      /*
        Later API:

        const response = await axios.put(
          "http://localhost:3001/api/v1/change-password",
          passwordData,
          {
            withCredentials: true,
          }
        );
      */

      console.log("Password data:", passwordData);

      setChangePasswordModalOpen(false);

      alert("Password changed successfully");
    } catch (error) {
      console.error(
        "Change password error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // =========================================
  // STATS
  // =========================================

  const stats = [
    {
      title: "Applications",
      value: "18",
      change: "+4 this week",
      icon: BriefcaseBusiness,
    },
    {
      title: "Profile Views",
      value: "126",
      change: "+18% this week",
      icon: UserRound,
    },
    {
      title: "Interviews",
      value: "5",
      change: "2 upcoming",
      icon: Mic2,
    },
    {
      title: "Job Matches",
      value: "34",
      change: "8 new matches",
      icon: Target,
    },
  ];

  // =========================================
  // JOBS
  // =========================================

  const recommendedJobs = [
    {
      company: "TechNova",
      title: "Senior React Developer",
      match: "96%",
      type: "Full-time",
      location: "Remote",
    },
    {
      company: "Pixel Labs",
      title: "Frontend Engineer",
      match: "91%",
      type: "Full-time",
      location: "Karachi",
    },
    {
      company: "CloudCore",
      title: "Full Stack Developer",
      match: "87%",
      type: "Full-time",
      location: "Remote",
    },
  ];

  // =========================================
  // UPCOMING
  // =========================================

  const upcomingItems = [
    {
      title: "AI Technical Interview",
      company: "TechNova",
      date: "Today",
      time: "04:30 PM",
      icon: Mic2,
    },
    {
      title: "Technical Assessment",
      company: "CloudCore",
      date: "Tomorrow",
      time: "11:00 AM",
      icon: FileText,
    },
    {
      title: "Application Update",
      company: "Pixel Labs",
      date: "Sep 24",
      time: "10:00 AM",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================
          BACKGROUND GLOWS
      ========================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      {/* =========================================
          MOBILE OVERLAY
      ========================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================== */}

      <div
        className={`fixed z-40 top-0 left-0 h-screen w-64 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          role="candidate"
          user={user}
          onUserUpdate={(updatedUser) => {
            setUser((prev) => ({
              ...prev,
              ...updatedUser,
            }));
          }}
          onEditProfile={() => {
            setSidebarOpen(false);
            setProfileModalOpen(true);
          }}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <main className="lg:ml-64 min-h-screen relative">
        {/* =========================================
            TOP BAR
        ========================================== */}

        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-20">
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Mobile Menu */}

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
            >
              <Menu size={20} />
            </button>

            <div className="hidden lg:block">
              <p className="text-xs text-slate-400">
                Candidate Workspace
              </p>

              <h1 className="text-lg font-bold text-slate-900">
                Dashboard
              </h1>
            </div>

            {/* Right */}

            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-slate-400">
                  Tuesday, September 22
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  Keep moving forward 🚀
                </p>
              </div>

              <button
                type="button"
                className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
              >
                <Bell size={18} />

                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white" />
              </button>
            </div>
          </div>
        </header>

        {/* =========================================
            CONTENT
        ========================================== */}

        <div className="p-4 sm:p-6 lg:p-8">
          {/* =========================================
              WELCOME
          ========================================== */}

          <section className="mb-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-violet-500/15">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute right-10 bottom-0 w-32 h-32 rounded-full bg-blue-300/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-violet-100 text-xs font-semibold uppercase tracking-widest mb-3">
                  <Sparkles size={14} />
                  AI Career Workspace
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Welcome back, {user.name.split(" ")[0]} 👋
                </h2>

                <p className="mt-2 text-sm sm:text-base text-violet-100 max-w-xl">
                  Your AI-powered career workspace is ready.
                  Track applications, improve your resume and
                  prepare for your next interview.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================
              PROFILE
          ========================================== */}

          <section className="mb-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {/* Avatar */}

                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-500/20 shrink-0">
                    {user.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* User Info */}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                        {user.name}
                      </h2>

                      <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 text-[10px] font-semibold">
                        Candidate
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {user.headline}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail size={13} />

                        <span className="truncate max-w-[220px]">
                          {user.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Phone size={13} />

                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Profile */}

                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  title="Edit Profile"
                  className="shrink-0 w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200 transition"
                >
                  <UserRound size={17} />
                </button>
              </div>
            </div>
          </section>

          {/* =========================================
              STATS
          ========================================== */}

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                      <Icon size={19} />
                    </div>

                    <TrendingUp
                      size={16}
                      className="text-emerald-500"
                    />
                  </div>

                  <p className="text-sm text-slate-400 mt-4">
                    {stat.title}
                  </p>

                  <div className="flex items-end justify-between gap-3 mt-1">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </h3>

                    <span className="text-[10px] text-emerald-600 font-semibold">
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* =========================================
              AI SCORE + RESUME
          ========================================== */}

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* AI SCORE */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={17}
                      className="text-violet-600"
                    />

                    <h3 className="font-bold text-slate-900">
                      AI Career Score
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    Based on your profile and activity
                  </p>
                </div>

                <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full">
                  Excellent
                </span>
              </div>

              <div className="flex items-center gap-6 mt-7">
                <div className="relative w-28 h-28 shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-slate-100" />

                  <div className="absolute inset-0 rounded-full border-[10px] border-violet-600 border-r-transparent border-b-transparent -rotate-45" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        82
                      </p>

                      <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                        / 100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-600 leading-6">
                    Your profile is performing well. Complete
                    your resume and technical assessments to
                    improve your score.
                  </p>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Improve score
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* RESUME */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText
                      size={17}
                      className="text-blue-600"
                    />

                    <h3 className="font-bold text-slate-900">
                      Resume Strength
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    AI analysis of your resume
                  </p>
                </div>

                <span className="text-2xl font-bold text-slate-900">
                  88%
                </span>
              </div>

              <div className="mt-6">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-slate-400">
                    Good progress
                  </p>

                  <p className="text-xs font-semibold text-violet-600">
                    12% to improve
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Skills
                  </p>

                  <p className="text-sm font-bold text-slate-900 mt-1">
                    Strong
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Experience
                  </p>

                  <p className="text-sm font-bold text-slate-900 mt-1">
                    Good
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Projects
                  </p>

                  <p className="text-sm font-bold text-slate-900 mt-1">
                    Strong
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              RECOMMENDED JOBS
          ========================================== */}

          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recommended Jobs
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  AI matched opportunities for you
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-violet-600 flex items-center gap-1 hover:text-violet-700"
              >
                View all
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-violet-600">
                        {job.company}
                      </p>

                      <h3 className="font-bold text-slate-900 mt-1">
                        {job.title}
                      </h3>
                    </div>

                    <span className="shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-full">
                      {job.match} match
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-5 text-xs text-slate-400">
                    <span>{job.type}</span>

                    <span>•</span>

                    <span>{job.location}</span>
                  </div>

                  <button
                    type="button"
                    className="w-full mt-5 h-10 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    View Job
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================
              UPCOMING
          ========================================== */}

          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Upcoming
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Your next career activities
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              {upcomingItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`p-5 flex items-center gap-4 ${
                      index !== upcomingItems.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.company}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {item.date}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {item.time}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
                    >
                      <ChevronRight size={17} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          PROFILE MODAL
          IMPORTANT:
          This is OUTSIDE the Sidebar.
      ====================================================== */}

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onSave={handleProfileUpdate}
        onChangePassword={() => {
          setProfileModalOpen(false);
          setChangePasswordModalOpen(true);
        }}
        role="candidate"
      />

      {/* =====================================================
          CHANGE PASSWORD MODAL
          IMPORTANT:
          This is also OUTSIDE the Sidebar.
      ====================================================== */}

      <ChangePasswordModal
        isOpen={changePasswordModalOpen}
        onClose={() =>
          setChangePasswordModalOpen(false)
        }
        onSave={handleChangePassword}
      />
    </div>
  );
};

export default CandidateDashboard;
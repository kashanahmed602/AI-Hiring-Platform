import {
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Menu,
  Mic2,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";

import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import JobModal from "../Components/JobModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobModal, setJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [user] = useState({
    name: "Acme Technologies",
    headline: "Hiring Workspace",
  });

  // ======================================================
  // FETCH JOBS WITH APPLICATIONS
  // ======================================================

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/jobs-with-applications",
        {
          withCredentials: true,
        }
      );

      console.log("Jobs With Applications:", response.data.jobs);

      const activeJobs = (response.data.jobs || []).filter(
        (job) => job.status === "Active"
      );

      setJobs(activeJobs);
    } catch (error) {
      console.log(
        "Fetch Jobs Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ======================================================
  // TOTAL APPLICATIONS
  // ======================================================

  const totalApplications = jobs.reduce(
    (total, job) => total + (job.applications?.length || 0),
    0
  );

  // ======================================================
  // TOTAL SHORTLISTED
  // ======================================================

  const totalShortlisted = jobs.reduce(
    (total, job) =>
      total +
      (job.applications?.filter(
        (application) => application.status === "shortlisted"
      ).length || 0),
    0
  );

  // ======================================================
  // TOTAL INTERVIEWS
  // ======================================================

  const totalInterviews = jobs.reduce(
    (total, job) =>
      total +
      (job.applications?.filter(
        (application) => application.status === "interview"
      ).length || 0),
    0
  );

  // ======================================================
  // DASHBOARD STATS
  // ======================================================

  const stats = [
    {
      label: "Active Jobs",
      value: jobs.length,
      change: "Currently active",
      icon: BriefcaseBusiness,
    },
    {
      label: "Applications",
      value: totalApplications,
      change: "Total received",
      icon: FileText,
    },
    {
      label: "Shortlisted",
      value: totalShortlisted,
      change: "Candidates shortlisted",
      icon: Target,
    },
    {
      label: "Interviews",
      value: totalInterviews,
      change: "Interview stage",
      icon: Mic2,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-blue-300/20 blur-[140px]" />

        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-violet-300/20 blur-[140px]" />

      </div>


      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
        />
      )}


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <div
        className={`fixed z-40 top-0 left-0 h-screen w-64 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          role="recruiter"
          user={user}
          onEditProfile={() => setSidebarOpen(false)}
          onClose={() => setSidebarOpen(false)}
        />
      </div>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="lg:ml-64 relative z-10">


        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-5 sm:px-8 flex items-center justify-between sticky top-0 z-20">

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>


          <div className="hidden lg:block">

            <p className="text-xs text-slate-400">
              Hiring Workspace
            </p>

            <h2 className="font-semibold">
              Recruiter Dashboard
            </h2>

          </div>


          <div className="flex items-center gap-3 ml-auto">

            <button
              className="relative w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-blue-600"
            >
              <Bell size={18} />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />

            </button>


            <button
              onClick={() => setJobModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-700 transition"
            >
              <Plus size={15} />
              Create Job
            </button>

          </div>

        </header>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="p-5 sm:p-8 max-w-[1500px] mx-auto">


          {/* ==================================================
              PAGE HEADER
          ================================================== */}

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


            <button
              onClick={() => setJobModal(true)}
              className="sm:hidden w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Plus size={17} />
              Create Job
            </button>

          </div>


          {/* ==================================================
              STATS
          ================================================== */}

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {stats.map((stat) => {

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


          {/* ==================================================
              AI BANNER
          ================================================== */}

          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-7 text-white mb-6 shadow-xl shadow-blue-500/15">

            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />


            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div className="max-w-2xl">

                <div className="flex items-center gap-2 text-white/70 text-xs font-medium">

                  <Sparkles size={14} />

                  AI Hiring Intelligence

                </div>


                <h2 className="mt-2 text-xl font-semibold">

                  {totalApplications} candidates are ready for AI screening

                </h2>


                <p className="mt-2 text-sm text-white/65">

                  Let HireFlow analyze resumes, skills and experience to rank the strongest candidates automatically.

                </p>

              </div>


              <button className="shrink-0 px-5 py-3 rounded-xl bg-white text-blue-700 text-sm font-semibold hover:bg-white/90 transition">

                Start AI Screening

              </button>

            </div>

          </div>


          {/* ==================================================
              ACTIVE JOBS
          ================================================== */}

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="font-semibold text-lg">
                  Active Jobs
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Monitor your current openings and applications
                </p>

              </div>


              <button
                onClick={() => navigate("/jobs")}
                className="text-xs font-semibold text-blue-600 flex items-center gap-1"
              >
                Manage jobs

                <ChevronRight size={14} />

              </button>

            </div>


            {/* ==================================================
                JOB LIST
            ================================================== */}

            <div className="space-y-3">

              {jobs.map((job) => {

                const applications = job.applications || [];

                const shortlisted = applications.filter(
                  (application) =>
                    application.status === "shortlisted"
                ).length;


                return (
                  <div
                    key={job._id}
                    className="border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition"
                  >

                    <div className="flex items-center gap-4">


                      {/* JOB ICON */}

                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">

                        <BriefcaseBusiness size={19} />

                      </div>


                      {/* JOB INFO */}

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-sm truncate">
                          {job.Title}
                        </h3>


                        <p className="text-xs text-slate-400 mt-1">

                          {applications.length} applicants

                          {" • "}

                          {shortlisted} shortlisted

                        </p>

                      </div>


                      {/* STATUS */}

                      <div className="hidden sm:block text-right">

                        <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold">

                          {job.status}

                        </span>


                        <p className="text-[10px] text-slate-400 mt-1">

                          {job.WorkMode || "N/A"}

                        </p>

                      </div>


                      {/* VIEW */}

                      <button
                        onClick={() =>
                          navigate(`/jobs/${job._id}`)
                        }
                        className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                      >

                        <ChevronRight size={17} />

                      </button>

                    </div>

                  </div>
                );

              })}


              {/* ==================================================
                  NO ACTIVE JOBS
              ================================================== */}

              {jobs.length === 0 && (

                <div className="py-10 text-center">

                  <BriefcaseBusiness
                    size={32}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    No active jobs found.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </main>


      {/* ==================================================
          JOB MODAL
      ================================================== */}

      {jobModal && (
        <JobModal
          onClose={() => {
            setJobModal(false);
            fetchJobs();
          }}
        />
      )}

    </div>
  );
};

export default RecruiterDashboard;

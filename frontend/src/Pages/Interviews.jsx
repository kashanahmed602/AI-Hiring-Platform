import { useEffect, useMemo, useState, } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarClock,
  Video,
  Users,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  CalendarDays,
  BriefcaseBusiness,
  X,
  ChevronDown,
  Play,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import InterviewCreateModal from "../Components/InterviewCreateModal";
import axios from "axios";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

const Interviews = () => {

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]); // will come from a real interviews endpoint later
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [showCandidates, setShowCandidates] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeInterview, setActiveInterview] = useState(null);

  // ---------- API ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [applicationsResponse, interviewsResponse] = await Promise.all ([
            axios.get(`${import.meta.env.WEB_URL}/interviews`, {
                withCredentials: true,
            }),
            axios.get(`${import.meta.env.WEB_URL}/interviews/recruiter`, {
                withCredentials: true,
            })
        ]);

        if (applicationsResponse.data?.success && Array.isArray(applicationsResponse.data.applications)) {
            setApplications(applicationsResponse.data.applications);
        }
        if (interviewsResponse.data?.success && Array.isArray(interviewsResponse.data.interviews)) {
            setInterviews(interviewsResponse.data.interviews);
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message || "Failed to load interviews");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  // ---------- Helpers ----------
  const getCandidate = (appOrId) => {
    if (typeof appOrId === "object" && appOrId?.candidateId) {
      return appOrId.candidateId;
    }
    const app = applications.find((a) => a._id === appOrId || a.candidateId?._id === appOrId);
    return app?.candidateId || null;
  };

  const getJob = (appOrId) => {
    if (typeof appOrId === "object" && appOrId?.jobId) {
      return appOrId.jobId;
    }
    const app = applications.find((a) => a._id === appOrId || a.jobId?._id === appOrId);
    return app?.jobId || null;
  };

  // Eligible = applications that are ready for interview
  const eligibleApplications = useMemo(
    () =>
      applications.filter(
        (app) =>
          app.status === "interviewed"
      ),
    [applications]
  );

  const eligibleCandidates = useMemo(() => {
    return eligibleApplications
      .map((app) => ({
        ...app.candidateId,
        applicationId: app._id,
        jobId: app.jobId?._id,
        jobTitle: app.jobId?.Title || app.jobId?.title,
      }))
      .filter(Boolean);
  }, [eligibleApplications]);

  const getInterviewStatus = (interview) => {
    if (interview.isCompleted) return "Completed";
    if (interview.recruiterStarted) return "In Progress";
    if (new Date(interview.schedule).getTime() < Date.now()) return "Pending";
    return "Scheduled";
  };

  const filteredInterviews = interviews.filter((interview) => {
    const candidate = getCandidate(interview);
    const job = getJob(interview);
    const status = getInterviewStatus(interview);
    const query = search.toLowerCase();

    const matchesSearch =
      candidate?.resume.parsedData.personal.fullName?.toLowerCase().includes(query) ||
      candidate?.resume.parsedData.personal.email?.toLowerCase().includes(query) ||
      job?.Title?.toLowerCase().includes(query) ||
      job?.title?.toLowerCase().includes(query);

    const matchesFilter = activeFilter === "All" || status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const completedCount = interviews.filter((i) => i.isCompleted).length;
  const scheduledCount = interviews.filter(
    (i) => getInterviewStatus(i) === "Scheduled"
  ).length;
  const pendingCount = interviews.filter(
    (i) => getInterviewStatus(i) === "Pending"
  ).length;

  const statusStyles = {
    Scheduled: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    "In Progress": "bg-violet-50 text-violet-700",
    Completed: "bg-emerald-50 text-emerald-700",
  };

  // ---------- Handlers ----------
  const openCreateModal = (candidateId = "") => {
    setSelectedCandidateId(candidateId);
    setShowCandidates(false);
    setIsModalOpen(true);
  };

  const handleCreateInterview = (interviewData) => {
    // TODO: replace with real POST /api/v1/interviews
    setInterviews((prev) => [
      {
        ...interviewData,
        recruiterStarted: false,
        candidateAllowed: false,
      },
      ...prev,
    ]);
    setIsModalOpen(false);
    setSelectedCandidateId("");
  };

  const handleStartInterview = (interviewId) => {
    const interview = interviews.find((i) => i._id === interviewId);
    if (!interview || interview.isCompleted) return;

    if (new Date(interview.schedule).getTime() > Date.now()) {
      alert("Interview can only be started at the scheduled time.");
      return;
    }

    setInterviews((prev) =>
      prev.map((i) =>
        i._id === interviewId ? { ...i, recruiterStarted: true } : i
      )
    );

    // Navigate to the video interview page
    navigate(`/video-interview/${interviewId}`);
  };

  const handleAllowCandidate = (interviewId) => {
    setInterviews((prev) =>
      prev.map((i) =>
        i._id === interviewId && i.recruiterStarted
          ? { ...i, candidateAllowed: true }
          : i
      )
    );
  };

  const handleCompleteInterview = (interviewId) => {
    setInterviews((prev) =>
      prev.map((i) =>
        i._id === interviewId
          ? {
              ...i,
              isCompleted: true,
              completedAt: new Date().toISOString(),
              recruiterStarted: false,
            }
          : i
      )
    );
    setActiveInterview(null);
  };

  // ---------- Stats ----------
  const stats = [
    {
      label: "Total Interviews",
      value: interviews.length,
      icon: Video,
      style: "bg-violet-50 text-violet-600",
    },
    {
      label: "Scheduled",
      value: scheduledCount,
      icon: CalendarClock,
      style: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock3,
      style: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      style: "bg-emerald-50 text-emerald-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading interviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600">
              <Video size={17} />
              Recruiter Workspace
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Interviews
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Schedule interviews and manage candidate access.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Candidates dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCandidates((p) => !p)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Users size={18} />
                Candidates ({eligibleCandidates.length})
                <ChevronDown size={16} />
              </button>

              {showCandidates && (
                <div className="absolute right-0 z-30 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 p-4">
                    <h3 className="font-semibold text-slate-900">
                      Ready for Interview
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Select a candidate to schedule an interview.
                    </p>
                  </div>

                  {eligibleCandidates.length === 0 ? (
                    <p className="p-5 text-sm text-slate-500">
                      No eligible candidates yet.
                    </p>
                  ) : (
                    <div className="max-h-72 overflow-y-auto p-2">
                      {eligibleCandidates.map((candidate) => (
                        <button
                          key={candidate._id}
                          onClick={() => openCreateModal(candidate._id)}
                          className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-violet-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                            {candidate.resume.parsedData.personal.fullName
                              ?.split(" ")
                              .map((p) => p[0])
                              .slice(0, 2)
                              .join("") || "CA"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {candidate.resume.parsedData.personal.fullName}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {candidate.resume.parsedData.professional.currentRole || "Job not found"}
                            </p>
                          </div>
                          <Plus size={17} className="text-violet-600" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => openCreateModal()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
            >
              <Plus size={19} />
              Create Interview
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.style}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interview list */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-semibold text-slate-900">All Interviews</h2>
              <p className="mt-1 text-sm text-slate-500">
                Start an interview at its scheduled time and control candidate access.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search candidate or job..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50 sm:w-64"
                />
              </div>

              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-400"
              >
                <option>All</option>
                <option>Scheduled</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {filteredInterviews.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <CalendarClock size={30} className="mx-auto text-slate-400" />
              <h3 className="mt-4 font-semibold text-slate-900">
                No interviews found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Schedule an interview or try a different search.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredInterviews.map((interview) => {
                const candidate = getCandidate(interview);
                const job = getJob(interview);
                const status = getInterviewStatus(interview);
                const isTimeReached =
                  new Date(interview.schedule).getTime() <= Date.now();

                return (
                  <div
                    key={interview._id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                        {candidate?.resume.parsedData.personal.fullName
                          ?.split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("") || "CA"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900">
                          {candidate?.resume.parsedData.personal.fullName || "Unknown Candidate"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {candidate?.resume.parsedData.personal.email || "No email"}
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                          <BriefcaseBusiness size={15} />
                          {job?.Title || job?.title || "Unknown Job"}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays size={15} />
                          {formatDate(interview.schedule)} ·{" "}
                          {formatTime(interview.schedule)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[status]}`}
                      >
                        {status}
                      </span>

                      {!interview.isCompleted && !interview.recruiterStarted && (
                        <button
                          disabled={!isTimeReached}
                          onClick={() => handleStartInterview(interview._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          <Play size={16} />
                          Start Interview
                        </button>
                      )}

                      {interview.recruiterStarted && !interview.candidateAllowed && (
                        <button
                          onClick={() => handleAllowCandidate(interview._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          <UserCheck size={16} />
                          Allow Candidate
                        </button>
                      )}

                      {interview.recruiterStarted && interview.candidateAllowed && (
                        <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                          <ShieldCheck size={16} />
                          Candidate Allowed
                        </span>
                      )}

                      {interview.recruiterStarted && (
                        <button
                          onClick={() => setActiveInterview(interview)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Finish Interview
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <InterviewCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCandidateId("");
        }}
        onCreate={handleCreateInterview}
        candidates={eligibleCandidates}
        applications={eligibleApplications}
        jobs={eligibleApplications.map((a) => a.jobId).filter(Boolean)}
        initialCandidateId={selectedCandidateId}
      />

      {/* Finish confirmation */}
      {activeInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Finish Interview</h3>
              <button
                onClick={() => setActiveInterview(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Mark the interview with{" "}
              <strong>{getCandidate(activeInterview)?.name}</strong> as completed?
            </p>
            <button
              onClick={() => handleCompleteInterview(activeInterview._id)}
              className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Mark as Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarDays,
  Clock3,
  BriefcaseBusiness,
  Building2,
  Mail,
  Video,
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
  MessageSquareText,
  RefreshCw,
  CalendarCheck,
} from "lucide-react";

const API_URL = "http://localhost:3001/api/v1/interviews/candidate";

const formatDate = (date) => {
  if (!date) return "Date not scheduled";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  if (!date) return "Time not scheduled";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid time";
  }

  return parsedDate.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const CandidateInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const fetchInterviews = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      if (response.data?.success) {
        setInterviews(
          Array.isArray(response.data.interviews)
            ? response.data.interviews
            : []
        );
      } else {
        setInterviews([]);
        setError(response.data?.message || "Unable to load interviews.");
      }
    } catch (err) {
      // Your controller returns 404 when no interviews exist.
      if (err.response?.status === 404) {
        setInterviews([]);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load interviews. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();

    // Keep the candidate dashboard in sync after the recruiter allows entry.
    const intervalId = setInterval(() => {
      fetchInterviews(true);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const categorizedInterviews = useMemo(() => {
    const now = Date.now();

    const sorted = [...interviews].sort(
      (a, b) => new Date(a.schedule || 0) - new Date(b.schedule || 0)
    );

    return sorted.filter((interview) => {
      const scheduleTime = new Date(interview.schedule).getTime();
      const isCompleted = interview.isCompleted === true;
      const isUpcoming =
        Number.isFinite(scheduleTime) && scheduleTime >= now && !isCompleted;

      if (activeTab === "upcoming") return isUpcoming;
      if (activeTab === "completed") return isCompleted;

      return true;
    });
  }, [interviews, activeTab]);

  const upcomingCount = interviews.filter((interview) => {
    const scheduleTime = new Date(interview.schedule).getTime();

    return (
      interview.isCompleted !== true &&
      Number.isFinite(scheduleTime) &&
      scheduleTime >= Date.now()
    );
  }).length;

  const completedCount = interviews.filter(
    (interview) => interview.isCompleted === true
  ).length;

  const getStatus = (interview) => {
    if (interview.isCompleted) {
      return {
        label: "Completed",
        className: "bg-emerald-50 text-emerald-700",
      };
    }

    if (interview.candidateAllowed === true) {
      return {
        label: "Ready to join",
        className: "bg-emerald-50 text-emerald-700",
      };
    }

    const scheduleTime = new Date(interview.schedule).getTime();

    if (Number.isFinite(scheduleTime) && scheduleTime < Date.now()) {
      return {
        label: "Awaiting update",
        className: "bg-amber-50 text-amber-700",
      };
    }

    return {
      label: "Upcoming",
      className: "bg-blue-50 text-blue-700",
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-violet-600">
              CANDIDATE DASHBOARD
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              My Interviews
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your interview schedule and review recruiter feedback.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchInterviews}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Interviews
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {interviews.length}
                </h2>
              </div>
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <CalendarDays size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Upcoming
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {upcomingCount}
                </h2>
              </div>
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <CalendarCheck size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {completedCount}
                </h2>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Interview list */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Interview Schedule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your scheduled and completed interviews.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All" },
                { value: "upcoming", label: "Upcoming" },
                { value: "completed", label: "Completed" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    activeTab === tab.value
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            {loading ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-slate-500">
                <LoaderCircle
                  size={32}
                  className="mb-3 animate-spin text-violet-600"
                />
                <p className="text-sm">Loading your interviews...</p>
              </div>
            ) : error ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <CircleAlert size={36} className="mb-3 text-red-500" />
                <h3 className="font-semibold text-slate-900">
                  Could not load interviews
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={fetchInterviews}
                  className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Try Again
                </button>
              </div>
            ) : categorizedInterviews.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-2xl bg-violet-50 p-4 text-violet-600">
                  <CalendarDays size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {activeTab === "upcoming"
                    ? "No upcoming interviews"
                    : activeTab === "completed"
                    ? "No completed interviews"
                    : "No interviews yet"}
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  {activeTab === "all"
                    ? "When a recruiter schedules an interview for you, it will appear here."
                    : "Interviews in this category will appear here when available."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {categorizedInterviews.map((interview) => {
                  const recruiter = interview.recruiterId || {};
                  const job = interview.jobId || {};
                  const status = getStatus(interview);

                  const recruiterName =
                    recruiter.Company || recruiter.company || "Recruiter";

                  const recruiterEmail = recruiter.email || "";

                  const jobTitle =
                    job.Title || job.title || "Interview";

                  return (
                    <article
                      key={interview._id}
                      className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                            <Video size={23} />
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900">
                              {jobTitle}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              Interview with {recruiterName}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                          <CalendarDays
                            size={18}
                            className="shrink-0 text-slate-500"
                          />
                          <div>
                            <p className="text-xs text-slate-500">Date</p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {formatDate(interview.schedule)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                          <Clock3
                            size={18}
                            className="shrink-0 text-slate-500"
                          />
                          <div>
                            <p className="text-xs text-slate-500">Time</p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {formatTime(interview.schedule)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                          <Building2
                            size={18}
                            className="shrink-0 text-slate-500"
                          />
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">Company</p>
                            <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                              {recruiterName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                          <BriefcaseBusiness
                            size={18}
                            className="shrink-0 text-slate-500"
                          />
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">
                              Application
                            </p>
                            <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                              {interview.applicationId?._id
                                ? String(interview.applicationId._id).slice(-8)
                                : "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {recruiterEmail && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                          <Mail size={16} />
                          <a
                            href={`mailto:${recruiterEmail}`}
                            className="break-all hover:text-violet-600"
                          >
                            {recruiterEmail}
                          </a>
                        </div>
                      )}

                      {interview.isCompleted && interview.feedback?.trim() && (
                        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
                            <MessageSquareText size={17} />
                            Recruiter Feedback
                          </div>
                          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {interview.feedback}
                          </p>
                        </div>
                      )}

                      {interview.isCompleted && !interview.feedback?.trim() && (
                        <p className="mt-4 text-sm text-slate-500">
                          Interview completed. No feedback has been added yet.
                        </p>
                      )}

                      {!interview.isCompleted && interview.candidateAllowed === true && (
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/video-interview/${interview._id}`)
                          }
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700"
                        >
                          <Video size={18} />
                          Join Interview
                        </button>
                      )}

                      {!interview.isCompleted && interview.candidateAllowed !== true && (
                        <div className="mt-5 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-sm text-blue-800">
                          <Clock3 size={17} className="mt-0.5 shrink-0" />
                          <p>
                            Waiting for the recruiter to allow you to join the interview.
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInterviews;

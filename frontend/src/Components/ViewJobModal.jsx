import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  Wallet,
  X,
  CheckCircle2,
  FileText,
  Users,
  Sparkles,
  ChevronDown,
  Trophy,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ViewJobModal = ({ job, onClose }) => {
  const [rankLimit, setRankLimit] = useState("all");
  const [applications, setApplications] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  if (!job) return null;

  // =====================================================
  // APPLICATIONS
  // =====================================================

  useEffect(() => {
    setApplications(job.applications || []);
  }, [job]);

  // =====================================================
  // SKILLS
  // =====================================================

  const skills = Array.isArray(job.RequiredSkills)
    ? job.RequiredSkills.flatMap((skill) =>
        typeof skill === "string"
          ? skill
              .split(",")
              .map((item) => item.trim())
          : []
      ).filter(Boolean)
    : [];

  // =====================================================
  // SORT APPLICATIONS BY AI SCORE
  // =====================================================

  const rankedApplications = useMemo(() => {
    const sorted = [...applications].sort(
      (a, b) => (b.matchScore || 0) - (a.matchScore || 0)
    );

    if (rankLimit === "all") {
      return sorted;
    }

    return sorted.slice(0, Number(rankLimit));
  }, [applications, rankLimit]);

  // =====================================================
  // UPDATE APPLICATION STATUS
  // =====================================================

  const handleStatusChange = async (applicationId, status) => {
    try {
      setUpdatingStatus(applicationId);

      await axios.put(
        `http://localhost:3001/api/v1/application/${applicationId}/status`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
              }
            : application
        )
      );
    } catch (error) {
      console.log(
        "Status Update Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  // =====================================================
  // GET CANDIDATE NAME
  // =====================================================

  const getCandidateName = (application) => {
    const candidate = application.candidateId.resume.parsedData.personal;

    if (!candidate) {
      return "Unknown Candidate";
    }

    return (
      candidate.fullName ||
      "Candidate"
    );
  };

  // =====================================================
  // GET CANDIDATE EMAIL
  // =====================================================

  const getCandidateEmail = (application) => {
    const candidate = application.candidateId.resume.parsedData.personal;

    if (!candidate) {
      return "Email not available";
    }

    return candidate.email || "Email not availa ble";
  };

  // =====================================================
  // GET INITIALS
  // =====================================================

  const getInitials = (application) => {
    const name = getCandidateName(application);

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // =====================================================
  // STATUS COLORS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "under-review":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "shortlisted":
        return "bg-violet-50 text-violet-700 border-violet-200";

      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "hired":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // =====================================================
  // MODAL
  // =====================================================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-200">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <BriefcaseBusiness size={23} />
            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                Job Details
              </p>

              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                {job.Title}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {job.JobType} • {job.WorkMode}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition shrink-0"
          >
            <X size={18} />
          </button>

        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="overflow-y-auto max-h-[calc(92vh-100px)] p-6">

          {/* =================================================
              BASIC DETAILS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Location */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <MapPin size={16} />

                <span className="text-xs font-medium">
                  Location
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.Location || "Not specified"}
              </p>

            </div>

            {/* Job Type */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <BriefcaseBusiness size={16} />

                <span className="text-xs font-medium">
                  Job Type
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.JobType || "Not specified"}
              </p>

            </div>

            {/* Work Mode */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock3 size={16} />

                <span className="text-xs font-medium">
                  Work Mode
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.WorkMode || "Not specified"}
              </p>

            </div>

            {/* Salary */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Wallet size={16} />

                <span className="text-xs font-medium">
                  Salary
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.Salary || "Not specified"}
              </p>

            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <BriefcaseBusiness size={16} />

                <span className="text-xs font-medium">
                  Experience
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.Experience || "Not specified"}
              </p>

            </div>

            {/* Applications Count */}
            <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-4">

              <div className="flex items-center gap-2 text-violet-500 mb-2">
                <Users size={16} />

                <span className="text-xs font-medium">
                  Applications
                </span>
              </div>

              <p className="text-lg font-bold text-violet-700">
                {applications.length}
              </p>

            </div>

          </div>

          {/* =================================================
              REQUIRED SKILLS
          ================================================= */}

          <div className="mt-6">

            <div className="flex items-center gap-2 mb-3">

              <CheckCircle2
                size={18}
                className="text-violet-600"
              />

              <h3 className="font-semibold text-slate-900">
                Required Skills
              </h3>

            </div>

            {skills.length > 0 ? (

              <div className="flex flex-wrap gap-2">

                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            ) : (

              <p className="text-sm text-slate-400">
                No skills specified.
              </p>

            )}

          </div>

          {/* =================================================
              JOB DESCRIPTION
          ================================================= */}

          <div className="mt-6">

            <div className="flex items-center gap-2 mb-3">

              <FileText
                size={18}
                className="text-violet-600"
              />

              <h3 className="font-semibold text-slate-900">
                Job Description
              </h3>

            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">

              <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">
                {job.Description || "No description available."}
              </p>

            </div>

          </div>

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          <div className="mt-8">

            {/* Applications Header */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">

              <div>

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={18}
                    className="text-violet-600"
                  />

                  <h3 className="font-semibold text-slate-900">
                    AI Ranked Applications
                  </h3>

                </div>

                <p className="text-xs text-slate-400 mt-1">
                  Candidates ranked by AI match score
                </p>

              </div>

              {/* Ranking Dropdown */}

              <div className="relative">

                <select
                  value={rankLimit}
                  onChange={(e) =>
                    setRankLimit(e.target.value)
                  }
                  className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >

                  <option value="10">
                    Top 10
                  </option>

                  <option value="20">
                    Top 20
                  </option>

                  <option value="30">
                    Top 30
                  </option>

                  <option value="50">
                    Top 50
                  </option>

                  <option value="all">
                    All Candidates
                  </option>

                </select>

                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

              </div>

            </div>

            {/* No Applications */}

            {applications.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">

                <Users
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-500">
                  No applications yet
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Candidates who apply for this job will appear here.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {rankedApplications.map(
                  (application, index) => {

                    const score =
                      application.matchScore || 0;

                    const candidate =
                      application.candidateId;

                    return (
                      <div
                        key={application._id}
                        className="rounded-2xl border border-slate-200 p-4 hover:border-violet-200 hover:shadow-sm transition"
                      >

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                          {/* Candidate */}

                          <div className="flex items-center gap-3 flex-1 min-w-0">

                            {/* Rank */}

                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">

                              {index < 3 ? (
                                <Trophy
                                  size={15}
                                  className="text-violet-600"
                                />
                              ) : (
                                <span className="text-xs font-bold text-slate-500">
                                  #{index + 1}
                                </span>
                              )}

                            </div>

                            {/* Avatar */}

                            <div className="w-11 h-11 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {getInitials(application)}
                            </div>

                            {/* Name */}

                            <div className="min-w-0">

                              <h4 className="text-sm font-semibold text-slate-900 truncate">
                                {getCandidateName(application)}
                              </h4>

                              <p className="text-xs text-slate-400 truncate">
                                {getCandidateEmail(application)}
                              </p>

                            </div>

                          </div>

                          {/* AI SCORE */}

                          <div className="flex items-center gap-2">

                            <div className="text-right">

                              <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                                AI Match
                              </p>

                              <p className="text-lg font-bold text-violet-600">
                                {score}%
                              </p>

                            </div>

                          </div>

                          {/* STATUS */}

                          <div className="relative">

                            <select
                              value={
                                application.status ||
                                "applied"
                              }
                              disabled={
                                updatingStatus ===
                                application._id
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  application._id,
                                  e.target.value
                                )
                              }
                              className={`appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold outline-none cursor-pointer ${getStatusClass(
                                application.status
                              )}`}
                            >

                              <option value="applied">
                                Applied
                              </option>

                              <option value="under-review">
                                Under Review
                              </option>

                              <option value="shortlisted">
                                Shortlisted
                              </option>

                              <option value="rejected">
                                Rejected
                              </option>

                              <option value="hired">
                                Hired
                              </option>

                            </select>

                            <ChevronDown
                              size={14}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            />

                          </div>

                        </div>

                        {/* APPLICATION DETAILS */}

                        <div className="mt-4 pt-4 border-t border-slate-100">

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Strengths */}

                            {application.matchDetails
                              ?.strengths?.length > 0 && (

                              <div>

                                <p className="text-xs font-semibold text-slate-700 mb-2">
                                  Strengths
                                </p>

                                <div className="space-y-1.5">

                                  {application.matchDetails.strengths.map(
                                    (strength, i) => (
                                      <div
                                        key={i}
                                        className="flex items-start gap-2"
                                      >

                                        <CheckCircle2
                                          size={14}
                                          className="text-emerald-500 mt-0.5 shrink-0"
                                        />

                                        <p className="text-xs text-slate-500">
                                          {strength}
                                        </p>

                                      </div>
                                    )
                                  )}

                                </div>

                              </div>

                            )}

                            {/* Missing Skills */}

                            {application.matchDetails
                              ?.missingSkills?.length > 0 && (

                              <div>

                                <p className="text-xs font-semibold text-slate-700 mb-2">
                                  Missing Skills
                                </p>

                                <div className="flex flex-wrap gap-2">

                                  {application.matchDetails.missingSkills.map(
                                    (skill, i) => (
                                      <span
                                        key={i}
                                        className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-[11px] font-medium"
                                      >
                                        {skill}
                                      </span>
                                    )
                                  )}

                                </div>

                              </div>

                            )}

                          </div>

                          {/* Match Breakdown */}

                          {application.matchDetails && (

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">

                              <div className="bg-slate-50 rounded-xl p-3">

                                <p className="text-[10px] text-slate-400">
                                  Skills
                                </p>

                                <p className="text-sm font-bold text-slate-800 mt-1">
                                  {Math.round(
                                    (application
                                      .matchDetails
                                      .skillsMatch ||
                                      0) * 100
                                  )}
                                  %
                                </p>

                              </div>

                              <div className="bg-slate-50 rounded-xl p-3">

                                <p className="text-[10px] text-slate-400">
                                  Experience
                                </p>

                                <p className="text-sm font-bold text-slate-800 mt-1">
                                  {Math.round(
                                    (application
                                      .matchDetails
                                      .experienceMatch ||
                                      0) * 100
                                  )}
                                  %
                                </p>

                              </div>

                              <div className="bg-slate-50 rounded-xl p-3">

                                <p className="text-[10px] text-slate-400">
                                  Education
                                </p>

                                <p className="text-sm font-bold text-slate-800 mt-1">
                                  {Math.round(
                                    (application
                                      .matchDetails
                                      .educationMatch ||
                                      0) * 100
                                  )}
                                  %
                                </p>

                              </div>

                              <div className="bg-slate-50 rounded-xl p-3">

                                <p className="text-[10px] text-slate-400">
                                  Work Alignment
                                </p>

                                <p className="text-sm font-bold text-slate-800 mt-1">
                                  {Math.round(
                                    (application
                                      .matchDetails
                                      .workAlignment ||
                                      0) * 100
                                  )}
                                  %
                                </p>

                              </div>

                            </div>

                          )}

                          {/* Applied Date */}

                          <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">

                            <CalendarDays size={14} />

                            Applied{" "}
                            {application.appliedAt
                              ? new Date(
                                  application.appliedAt
                                ).toLocaleString()
                              : "Date not available"}

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* =================================================
              DATES
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <CalendarDays size={16} />

                <span className="text-xs">
                  Created At
                </span>
              </div>

              <p className="text-sm font-medium text-slate-700">
                {job.createdAt
                  ? new Date(
                      job.createdAt
                    ).toLocaleString()
                  : "Not available"}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <CalendarDays size={16} />

                <span className="text-xs">
                  Last Updated
                </span>
              </div>

              <p className="text-sm font-medium text-slate-700">
                {job.updatedAt
                  ? new Date(
                      job.updatedAt
                    ).toLocaleString()
                  : "Not available"}
              </p>

            </div>

          </div>

          {/* CLOSE */}

          <div className="flex justify-end mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-violet-700 transition"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ClipboardCheck,
  Clock3,
  FileQuestion,
  BriefcaseBusiness,
  Sparkles,
  Trash2,
  X,
  UserRound,
  ArrowRight,
  Users,
} from "lucide-react";
import axios from "axios";

import AssessmentJobsModal from "../Components/AssessmentJobsModal";

const API_URL = "http://localhost:3001/api/v1/recruiter";

const Assessments = () => {
  const navigate = useNavigate();

  const [showJobs, setShowJobs] = useState(false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [statusOverrides, setStatusOverrides] = useState({});

  // Results modal state
  const [resultsAssessment, setResultsAssessment] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [resultsError, setResultsError] = useState("");

  // Fetch recruiter's assessments
  const fetchAssessments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/assessments`,
        { withCredentials: true }
      );

      setAssessmentData(response.data.assessments || []);
    } catch (error) {
      console.error(
        "Failed to fetch assessments:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const getStatus = (assessment) =>
    statusOverrides[assessment._id] ?? assessment.status;

  // Delete assessment
  const handleDelete = async (event, assessmentId) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this assessment?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/assessments/delete`, {
        data: { assessmentId },
        withCredentials: true,
      });

      setAssessmentData((prev) =>
        prev.filter((item) => item._id !== assessmentId)
      );

      setSelectedAssessment((prev) =>
        prev?._id === assessmentId ? null : prev
      );

      alert("Assessment deleted successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete assessment."
      );
    }
  };

  // Update assessment status
  const handleStatusChange = async (assessmentId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_URL}/assessments/status`,
        {
          assessmentId,
          status: newStatus,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setStatusOverrides((prev) => ({
          ...prev,
          [assessmentId]: newStatus,
        }));

        setAssessmentData((prev) =>
          prev.map((item) =>
            item._id === assessmentId
              ? { ...item, status: newStatus }
              : item
          )
        );

        setSelectedAssessment((prev) =>
          prev?._id === assessmentId
            ? { ...prev, status: newStatus }
            : prev
        );

        alert("Status updated successfully.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update assessment status."
      );
    }
  };

  // Fetch all attempts for a specific assessment
  const handleViewResults = async (event, assessment) => {
    event.stopPropagation();

    setSelectedAssessment(null);
    setResultsAssessment(assessment);
    setAssessmentResults([]);
    setResultsError("");
    setResultsLoading(true);

    try {
      const response = await axios.get(
        `${API_URL}/assessments/results`,
        {
          params: { assessmentId: assessment._id },
          withCredentials: true,
        }
      );

      setAssessmentResults(
        response.data.assessmentResults || []
      );

      console.log(response.data.assessmentResults);
    } catch (error) {
      setResultsError(
        error.response?.data?.message ||
          "Failed to fetch assessment results."
      );
    } finally {
      setResultsLoading(false);
    }
  };

  // Open the separate result details page
  const handleCandidateClick = (result) => {
    setResultsAssessment(null);

    navigate(`/candidate/assessments/results/${result._id}`, {
      state: { result },
    });
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Assessments
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create and manage job-specific candidate assessments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowJobs(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Plus size={18} />
            Create Assessment
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Assessments"
            value={assessmentData.length}
            icon={ClipboardCheck}
          />

          <StatCard
            title="Published"
            value={
              assessmentData.filter(
                (item) => getStatus(item) === "published"
              ).length
            }
            icon={Sparkles}
          />

          <StatCard
            title="Drafts"
            value={
              assessmentData.filter(
                (item) => getStatus(item) === "draft"
              ).length
            }
            icon={FileQuestion}
          />
        </div>

        {/* Assessment list */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Your Assessments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Assessments created for your posted jobs.
          </p>
        </div>

        {assessmentData.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {assessmentData.map((assessment) => (
              <div
                key={assessment._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedAssessment(assessment)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    setSelectedAssessment(assessment);
                  }
                }}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <ClipboardCheck size={22} />
                  </div>

                  <button
                    type="button"
                    onClick={(event) =>
                      handleDelete(event, assessment._id)
                    }
                    title="Delete assessment"
                    aria-label="Delete assessment"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {assessment.title}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <BriefcaseBusiness size={15} />
                  {assessment.jobId?.Title ||
                    assessment.jobTitle ||
                    "Job"}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <FileQuestion size={16} />
                    {assessment.questionCount ??
                      assessment.questions?.length ??
                      0}{" "}
                    questions
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {assessment.duration ?? 0} minutes
                  </span>
                </div>

                {/* Status dropdown */}
                <div
                  className="mt-4 flex items-center justify-between gap-3"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="text-sm font-medium text-slate-600">
                    Status
                  </span>

                  <select
                    value={getStatus(assessment)}
                    onChange={(event) =>
                      handleStatusChange(
                        assessment._id,
                        event.target.value
                      )
                    }
                    onClick={(event) => event.stopPropagation()}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold outline-none ${
                      getStatus(assessment) === "published"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : getStatus(assessment) === "closed"
                        ? "border-slate-200 bg-slate-100 text-slate-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="mt-4 text-sm font-medium text-violet-600">
                  View full assessment →
                </div>

                {/* View Results button */}
                <button
                  type="button"
                  onClick={(event) =>
                    handleViewResults(event, assessment)
                  }
                  className="mt-4 w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                >
                  <ClipboardCheck
                    size={16}
                    className="mr-2 inline"
                  />
                  View Results
                  <ArrowRight
                    size={15}
                    className="ml-2 inline"
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <ClipboardCheck
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-900">
              No assessments yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first assessment for one of your jobs.
            </p>
          </div>
        )}
      </div>

      {/* Assessment details modal */}
      {selectedAssessment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedAssessment(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedAssessment.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedAssessment.jobId?.Title ||
                    selectedAssessment.jobTitle ||
                    "Job"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAssessment(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close assessment details"
              >
                <X size={22} />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DetailCard
                  label="Duration"
                  value={`${selectedAssessment.duration ?? 0} min`}
                />

                <DetailCard
                  label="Questions"
                  value={
                    selectedAssessment.questions?.length ??
                    selectedAssessment.questionCount ??
                    0
                  }
                />

                <DetailCard
                  label="Difficulty"
                  value={selectedAssessment.difficulty || "N/A"}
                />

                <DetailCard
                  label="Passing Score"
                  value={
                    selectedAssessment.passingScore != null
                      ? `${selectedAssessment.passingScore}%`
                      : "N/A"
                  }
                />
              </div>

              {/* Description */}
              <div className="mt-5 rounded-xl border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Description
                </h3>

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {selectedAssessment.description ||
                    "No description available."}
                </p>
              </div>

              {/* Questions */}
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Assessment Questions
                </h3>

                <div className="space-y-4">
                  {selectedAssessment.questions?.map(
                    (question, index) => (
                      <div
                        key={question._id || index}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <span className="font-semibold text-violet-600">
                            Question {index + 1}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {question.type || "Question"} ·{" "}
                            {question.marks ?? 0} marks
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-slate-800">
                          {question.question}
                        </p>

                        {question.options?.map((option, i) => (
                          <div
                            key={i}
                            className={`mt-2 rounded-lg border p-3 text-sm ${
                              option === question.correctAnswer
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span className="mr-2 font-semibold">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {option}
                          </div>
                        ))}

                        {question.correctAnswer != null && (
                          <p className="mt-3 text-sm text-emerald-700">
                            <strong>Correct answer:</strong>{" "}
                            {question.correctAnswer}
                          </p>
                        )}

                        {question.type === "question" && (
                          <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                            Open-ended or coding question.
                          </p>
                        )}
                      </div>
                    )
                  )}

                  {!selectedAssessment.questions?.length && (
                    <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                      No questions available.
                    </p>
                  )}
                </div>
              </div>

              {/* Extra details */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <DetailCard
                  label="Creation Method"
                  value={
                    selectedAssessment.creationMethod || "N/A"
                  }
                />

                <DetailCard
                  label="Created At"
                  value={
                    selectedAssessment.createdAt
                      ? new Date(
                          selectedAssessment.createdAt
                        ).toLocaleDateString()
                      : "N/A"
                  }
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={() => setSelectedAssessment(null)}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate results modal */}
      {resultsAssessment && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setResultsAssessment(null)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Results header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Assessment Results
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {resultsAssessment.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setResultsAssessment(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close results"
              >
                <X size={21} />
              </button>
            </div>

            {/* Results content */}
            <div className="overflow-y-auto p-5">
              {resultsLoading ? (
                <div className="py-12 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
                  <p className="mt-4 text-sm text-slate-500">
                    Loading candidate results...
                  </p>
                </div>
              ) : resultsError ? (
                <div className="rounded-xl bg-red-50 p-5 text-center text-sm text-red-600">
                  {resultsError}
                </div>
              ) : assessmentResults.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
                  <Users
                    size={36}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <h3 className="font-semibold text-slate-800">
                    No Attempts Yet
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    No candidates have attempted this assessment yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="mb-4 text-sm text-slate-500">
                    {assessmentResults.length} candidate attempt(s).
                    Select a candidate to see their complete result.
                  </p>

                  {assessmentResults.map((item) => {
                    const personal =
                      item.CandidateId?.resume?.parsedData?.personal ||
                      item.resumeSnapshot?.personal ||
                      {};

                    const candidateName =
                      personal.fullName ||
                      item.CandidateId?.name ||
                      "Candidate";

                    const candidateEmail =
                      personal.email ||
                      item.CandidateId?.email ||
                      "Email not available";

                    return (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => handleCandidateClick(item)}
                        className="flex w-full flex-col gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-violet-300 hover:bg-violet-50/50 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                            <UserRound size={21} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-slate-900">
                              {candidateName}
                            </h3>

                            <p className="break-all text-sm text-slate-500">
                              {candidateEmail}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Submitted: {formatDate(item.submittedAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                          <div className="text-left sm:text-right">
                            <p className="text-lg font-bold text-slate-900">
                              {item.percentage ?? 0}%
                            </p>
                            <p className="text-xs text-slate-500">
                              Score: {item.score ?? 0}
                              {item.totalMarks != null
                                ? ` / ${item.totalMarks}`
                                : ""}
                            </p>
                          </div>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.result === "Pass"
                                ? "bg-emerald-100 text-emerald-700"
                                : item.result === "Fail"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.result || "Pending"}
                          </span>

                          <ArrowRight
                            size={18}
                            className="text-slate-400"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Results footer */}
            <div className="flex justify-end border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={() => setResultsAssessment(null)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <AssessmentJobsModal
        isOpen={showJobs}
        onClose={() => setShowJobs(false)}
      />
    </div>
  );
};

const DetailCard = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <p className="text-xs font-medium text-slate-500">{label}</p>
    <p className="mt-1 break-words text-sm font-bold text-slate-900">
      {value ?? "N/A"}
    </p>
  </div>
);

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
      <Icon size={22} />
    </div>

    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  </div>
);

export default Assessments;
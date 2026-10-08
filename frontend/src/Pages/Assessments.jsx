import { useState, useEffect } from "react";
import {
  Plus,
  ClipboardCheck,
  Clock3,
  FileQuestion,
  BriefcaseBusiness,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import AssessmentJobsModal from "../Components/AssessmentJobsModal";
import axios from "axios";

const demoAssessments = [
  {
    _id: "1",
    title: "React Developer Assessment",
    jobTitle: "Frontend Developer",
    questions: [],
    questionCount: 20,
    duration: 30,
    status: "draft",
  },
  {
    _id: "2",
    title: "Node.js Technical Assessment",
    jobTitle: "Backend Developer",
    questions: [],
    questionCount: 15,
    duration: 25,
    status: "published",
  },
];

const Assessments = () => {
  const [assessments] = useState(demoAssessments);
  const [showJobs, setShowJobs] = useState(false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [statusOverrides, setStatusOverrides] = useState({});

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/recruiter/assessments",
          {
            withCredentials: true,
          }
        );

        setAssessmentData(response.data.assessments || []);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAssessments();
  }, []);

  // UI-only delete
  const handleDelete = async (event, assessmentId) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to remove this assessment?"
    );

    if (!confirmed) return;

    try{
        const response = await axios.delete(
            `http://localhost:3001/api/v1/recruiter/assessments/delete`,
            {
                assessmentId:  assessmentId ,
                withCredentials: true
            }
        );

        alert("Assessment Deleted Successfully");
        window.location.reload();
    }catch(error){
        alert(error.message);
    }

    setSelectedAssessment((prev) =>
      prev?._id === assessmentId ? null : prev
    );
  };

  // UI-only status update
  const handleStatusChange = async (assessmentId,newStatus) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/v1/recruiter/assessments/status`,
      {
        assessmentId: assessmentId,
        status: newStatus },
      { withCredentials: true }
    );

    if (response.data.success) {
      setStatusOverrides((prev) => ({
        ...prev,
        [assessmentId]: newStatus,
      }));

      setSelectedAssessment((prev) =>
        prev?._id === assessmentId
          ? { ...prev, status: newStatus }
          : prev
      );

      alert("Status Updated Successfully");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert(
      error.response?.data?.message || "Failed to update status"
    );
  }
};

  const getStatus = (assessment) =>
    statusOverrides[assessment._id] ?? assessment.status;

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
                (a) => getStatus(a) === "published"
              ).length
            }
            icon={Sparkles}
          />

          <StatCard
            title="Drafts"
            value={
              assessmentData.filter(
                (a) => getStatus(a) === "draft"
              ).length
            }
            icon={FileQuestion}
          />
        </div>

        {/* Assessment List */}
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
                  if (event.key === "Enter") {
                    setSelectedAssessment(assessment);
                  }
                }}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <ClipboardCheck size={22} />
                  </div>

                  {/* Delete Icon */}
                  <button
                    type="button"
                    onClick={(event) =>
                      handleDelete(event, assessment._id)
                    }
                    title="Delete assessment"
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
                    {assessment.duration} minutes
                  </span>
                </div>

                {/* Status Dropdown */}
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

      {/* Assessment Details Modal */}
      {selectedAssessment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedAssessment(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
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
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-5">

              {/* Assessment Information */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DetailCard
                  label="Duration"
                  value={`${selectedAssessment.duration} min`}
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
                  value={selectedAssessment.difficulty}
                />

                <DetailCard
                  label="Passing Score"
                  value={`${selectedAssessment.passingScore}%`}
                />
              </div>

              {/* Description */}
              <div className="mt-5 rounded-xl border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Description
                </h3>

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {selectedAssessment.description}
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
                            {question.type} · {question.marks} marks
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-slate-800">
                          {question.question}
                        </p>

                        {/* Options */}
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

                        {/* Correct Answer */}
                        {question.correctAnswer != null && (
                          <p className="mt-3 text-sm text-emerald-700">
                            <strong>Correct answer:</strong>{" "}
                            {question.correctAnswer}
                          </p>
                        )}

                        {question.type === "question" && (
                          <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                            Open-ended or coding question. Candidate
                            response requires evaluation.
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

              {/* Extra Details */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <DetailCard
                  label="Creation Method"
                  value={selectedAssessment.creationMethod || "N/A"}
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

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-200 p-4">
              <button
                onClick={() => setSelectedAssessment(null)}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
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

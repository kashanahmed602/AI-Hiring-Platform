import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  UserRound,
  ClipboardList,
  Award,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";
import axios from "axios";

const AssessmentResultDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Existing result data
  const result = location.state?.result;

  // Hiring status: frontend only, no API
  const [candidateStatus, setCandidateStatus] = useState(
    result?.candidateStatus || "Shortlisted"
  );

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <ClipboardList
            size={40}
            className="mx-auto mb-4 text-violet-600"
          />

          <h2 className="text-xl font-bold text-slate-900">
            Result Data Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please go back and open the result using the View button.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const assessment = result.assessmentId || {};
  const candidate = result.CandidateId || {};
  const personal = candidate.resume?.parsedData?.personal || {};

  const questions = assessment.questions || [];
  const answers = result.answers || [];

  const getAnswer = (questionId) =>
    answers.find(
      (item) => String(item.questionId) === String(questionId)
    );

  const formatDate = (date) => {
    if (date == null) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleString();
  };

  const isPassed = result.result === "Pass";
  const isFailed = result.result === "Fail";

  const statusUpdate = async (id, status) => {
    try{
        console.log(id);
        setCandidateStatus(status);
        const response = await axios.put(`${import.meta.env.WEB_URL}/applications-status-update`, {
            id,
            status
        }, {
            withCredentials: true
        })

        alert('status updated successfully');
    }catch(error){
        alert(error.message);
    }
  }

  const statusStyles = {
    Shortlisted: "border-violet-200 bg-violet-50 text-violet-700",
    interviewed: "border-blue-200 bg-blue-50 text-blue-700",
    Rejected: "border-red-200 bg-red-50 text-red-700",
    Hired: "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
        >
          <ArrowLeft size={18} />
          Back to Assessment Results
        </button>

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-semibold text-violet-600">
              Assessment Report
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {assessment.title ?? "N/A"}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Candidate performance and answer evaluation
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
              isPassed
                ? "bg-green-100 text-green-700"
                : isFailed
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {result.result ?? "N/A"}
          </span>
        </div>

        {/* Candidate Information */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Candidate Information
              </h2>

              <p className="text-sm text-slate-500">
                Details of the candidate who attempted this assessment
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="mt-1 font-semibold text-slate-900">
                {personal.fullName ?? candidate.name ?? "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="mt-1 break-all font-medium text-slate-800">
                {personal.email ?? candidate.email ?? "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Attempt ID</p>
              <p className="mt-1 break-all text-sm text-slate-700">
                {result._id ?? "N/A"}
              </p>
            </div>

            {/* Hiring Status Dropdown */}
            <div>
              <label
                htmlFor="candidate-hiring-status"
                className="text-sm font-medium text-slate-600"
              >
                Candidate Hiring Status
              </label>

              <select
                id="candidate-hiring-status"
                value={candidateStatus}
                onChange={(e) => statusUpdate(result.assessmentId._id, e.target.value)
                }
                className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm font-semibold outline-none transition focus:ring-2 focus:ring-violet-200 ${
                  statusStyles[candidateStatus] ||
                  statusStyles.Shortlisted
                }`}
              >
                <option value="Shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>

              <p className="mt-1 text-xs text-slate-400">
                UI only — not saved to the database
              </p>
            </div>
          </div>
        </section>

        {/* Score Cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">Percentage</p>
              <Award size={21} className="text-violet-600" />
            </div>

            <p className="text-3xl font-bold text-slate-900">
              {result.percentage ?? "N/A"}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">Score Obtained</p>
              <ClipboardList size={21} className="text-blue-600" />
            </div>

            <p className="text-3xl font-bold text-slate-900">
              {result.score ?? "N/A"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total Marks: {result.totalMarks ?? "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">Attempt Status</p>
              <CheckCircle2 size={21} className="text-green-600" />
            </div>

            <p className="text-2xl font-bold text-slate-900">
              {result.status ?? "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">Submission Details</p>
              <CalendarDays size={21} className="text-orange-500" />
            </div>

            <p className="text-sm font-semibold text-slate-800">
              Submitted: {formatDate(result.submittedAt)}
            </p>

            <p className="mt-3 flex items-start gap-2 text-xs text-slate-500">
              <Clock3 size={15} className="mt-0.5 shrink-0" />
              Started: {formatDate(result.startedAt)}
            </p>
          </div>
        </section>

        {/* Questions and Answers */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Questions & Answers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review candidate responses, expected answers and awarded marks.
            </p>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <ClipboardList
                size={36}
                className="mx-auto mb-3 text-slate-400"
              />

              <h3 className="font-semibold text-slate-800">
                No Questions Available
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                No assessment questions were provided in this result.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map((question, index) => {
                const answer = getAnswer(question._id);

                const candidateAnswer = answer?.answer;
                const correctAnswer = question.correctAnswer;

                const marksAwarded = answer?.marksAwarded;
                const maxMarks = answer?.maxMarks ?? question.marks;

                const hasMarks =
                  marksAwarded !== null &&
                  marksAwarded !== undefined;

                const gotFullMarks =
                  hasMarks &&
                  maxMarks != null &&
                  Number(marksAwarded) === Number(maxMarks);

                return (
                  <article
                    key={question._id || index}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    {/* Question Header */}
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                          {index + 1}
                        </div>

                        <div>
                          <h3 className="font-semibold leading-7 text-slate-900">
                            {question.question ?? "N/A"}
                          </h3>

                          <span className="mt-2 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase text-slate-600">
                            {question.type ?? "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                        {marksAwarded ?? "N/A"} / {maxMarks ?? "N/A"} marks
                      </div>
                    </div>

                    <div className="space-y-5 p-5">
                      {/* Options */}
                      {question.options?.length > 0 && (
                        <div>
                          <p className="mb-3 text-sm font-semibold text-slate-700">
                            Available Options
                          </p>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {question.options.map((option, optionIndex) => {
                              const isCorrect =
                                correctAnswer != null &&
                                option === correctAnswer;

                              const isSelected =
                                candidateAnswer != null &&
                                option.toLowerCase() ===
                                  String(candidateAnswer).toLowerCase();

                              return (
                                <div
                                  key={optionIndex}
                                  className={`rounded-xl border p-3 text-sm ${
                                    isCorrect
                                      ? "border-green-300 bg-green-50 text-green-800"
                                      : isSelected
                                      ? "border-blue-300 bg-blue-50 text-blue-800"
                                      : "border-slate-200 bg-slate-50 text-slate-700"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span>{option}</span>

                                    {isCorrect && (
                                      <CheckCircle2
                                        size={17}
                                        className="shrink-0 text-green-600"
                                      />
                                    )}
                                  </div>

                                  {isCorrect && (
                                    <p className="mt-1 text-xs font-semibold">
                                      Correct Answer
                                    </p>
                                  )}

                                  {!isCorrect && isSelected && (
                                    <p className="mt-1 text-xs font-semibold">
                                      Candidate Selected
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Answers */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-800">
                            <UserRound size={17} />
                            Candidate Answer
                          </p>

                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                            {candidateAnswer ?? "N/A"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-800">
                            <CheckCircle2 size={17} />
                            Correct / Expected Answer
                          </p>

                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                            {correctAnswer ?? "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Marks Status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2 text-sm">
                          {gotFullMarks ? (
                            <CheckCircle2
                              size={18}
                              className="text-green-600"
                            />
                          ) : (
                            <XCircle
                              size={18}
                              className="text-orange-500"
                            />
                          )}

                          <span className="text-slate-600">
                            Marks Awarded:{" "}
                            <strong className="text-slate-900">
                              {marksAwarded ?? "N/A"} / {maxMarks ?? "N/A"}
                            </strong>
                          </span>
                        </div>

                        {!answer && (
                          <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                            No submitted answer found
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Back to Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResultDetails;
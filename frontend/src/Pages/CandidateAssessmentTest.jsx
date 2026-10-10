import { useEffect, useState } from "react";
import {
  Clock3,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  Send,
  AlertCircle,
} from "lucide-react";

const CandidateAssessmentTest = ({ assessment, onExit }) => {
  const questions = assessment?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Number(assessment?.duration) || 30) * 60
  );
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).filter(
    (key) => String(answers[key] ?? "").trim() !== ""
  ).length;

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      setSubmitted(true);
    }
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const saveAnswer = (value) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion._id || currentIndex]: value,
    }));
  };

  const getAnswer = (question, index) =>
    answers[question._id || index] ?? "";

  const calculateResult = () => {
    let totalMarks = 0;
    let earnedMarks = 0;
    let canCalculateScore = questions.length > 0;

    questions.forEach((question, index) => {
      const correctAnswer = question.correctAnswer;

      if (correctAnswer === undefined || correctAnswer === null) {
        canCalculateScore = false;
        return;
      }

      const marks = Number(question.marks) || 1;
      totalMarks += marks;

      if (
        String(getAnswer(question, index)).trim().toLowerCase() ===
        String(correctAnswer).trim().toLowerCase()
      ) {
        earnedMarks += marks;
      }
    });

    if (!canCalculateScore || totalMarks === 0) {
      return {
        canCalculateScore: false,
        earnedMarks: 0,
        totalMarks: 0,
        percentage: 0,
      };
    }

    return {
      canCalculateScore: true,
      earnedMarks,
      totalMarks,
      percentage: Math.round((earnedMarks / totalMarks) * 100),
    };
  };

  const result = submitted ? calculateResult() : null;

  const submitTest = () => {
    setSubmitted(true);
    setShowSubmitConfirm(false);
  };

  // Result screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={34} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Assessment Submitted
          </h1>

          <p className="mt-2 text-slate-500">
            {assessment.title}
          </p>

          {result.canCalculateScore ? (
            <>
              <div className="my-8">
                <p className="text-sm text-slate-500">Your Score</p>
                <p className="mt-2 text-5xl font-bold text-violet-600">
                  {result.percentage}%
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {result.earnedMarks} out of {result.totalMarks} marks
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Questions</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {questions.length}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Answered</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {answeredCount}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-xl bg-amber-50 p-4 text-left text-sm text-amber-800">
              <AlertCircle size={20} className="mb-2" />
              Your answers were submitted in this UI demo. A score cannot
              be calculated because the assessment data does not contain
              the correct answers.
            </div>
          )}

          <p className="mt-6 text-xs text-slate-400">
            This is a frontend-only demo. Your submission has not been
            saved to the server.
          </p>

          <button
            onClick={onExit}
            className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  // Empty question state
  if (!questions.length) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center">
          <AlertCircle
            size={36}
            className="mx-auto text-amber-500"
          />
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No Questions Available
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            This assessment does not contain any questions yet.
          </p>
          <button
            onClick={onExit}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-violet-600">
              Candidate Assessment
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">
              {assessment.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {assessment.jobId?.Title ||
                assessment.jobTitle ||
                "Assessment"}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 self-start rounded-xl px-4 py-3 font-bold sm:self-auto ${
              timeLeft <= 60
                ? "bg-red-50 text-red-600"
                : "bg-violet-50 text-violet-700"
            }`}
          >
            <Clock3 size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-slate-700">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-slate-500">
              {answeredCount} answered
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{
                width: `${
                  ((currentIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {questions.map((question, index) => {
              const answered =
                String(getAnswer(question, index)).trim() !== "";

              return (
                <button
                  key={question._id || index}
                  onClick={() => setCurrentIndex(index)}
                  title={`Question ${index + 1}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                    currentIndex === index
                      ? "bg-violet-600 text-white"
                      : answered
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase text-violet-700">
              {currentQuestion.type || "Question"}
            </span>

            <span className="text-sm font-medium text-slate-500">
              {currentQuestion.marks ?? 1} marks
            </span>
          </div>

          <h2 className="text-lg font-bold leading-7 text-slate-900 sm:text-xl">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          {currentQuestion.options?.length > 0 ? (
            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selected =
                  getAnswer(currentQuestion, currentIndex) === option;

                return (
                  <button
                    key={index}
                    onClick={() => saveAnswer(option)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-violet-500 bg-violet-50 ring-2 ring-violet-100"
                        : "border-slate-200 hover:border-violet-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                        selected
                          ? "bg-violet-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="text-sm font-medium text-slate-800">
                      {option}
                    </span>

                    {selected && (
                      <CheckCircle2
                        size={19}
                        className="ml-auto shrink-0 text-violet-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea
              rows={6}
              value={getAnswer(currentQuestion, currentIndex)}
              onChange={(event) => saveAnswer(event.target.value)}
              placeholder="Write your answer here..."
              className="mt-6 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          )}

          {/* Navigation */}
          <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <button
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((previous) => previous - 1)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentIndex((previous) => previous + 1)
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Next Question
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Send size={17} />
                Submit Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Flag size={23} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Submit Assessment?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You answered {answeredCount} out of {questions.length}{" "}
              questions. Are you sure you want to finish the test?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Continue Test
              </button>

              <button
                onClick={submitTest}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateAssessmentTest;

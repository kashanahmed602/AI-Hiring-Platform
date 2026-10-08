import { useState } from "react";
import {
  X,
  ArrowLeft,
  Sparkles,
  PenLine,
  Clock3,
  FileQuestion,
  BriefcaseBusiness,
  Plus,
  Trash2,
} from "lucide-react";
import axios from 'axios';

const CreateAssessmentModal = ({ job, onClose, onBack, onFinish }) => {
  const [mode, setMode] = useState("ai");
  const [title, setTitle] = useState(
    `${job?.Title || "Job"} Assessment`
  );
  const [questionCount, setQuestionCount] = useState(20);
  const [duration, setDuration] = useState(30);
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("Medium");
  const [passingScore, setPassingScore] = useState(60);
  const [creationMethod, setCreationMethod] = useState("ai");
  const [showManualEditor, setShowManualEditor] = useState(false);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        question: "",
        type: "mcq",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (id, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((option, i) =>
                i === index ? value : option
              ),
            }
          : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleGenerate = async () => {

    try{
    // UI only: AI generation API baad mein connect hogi.
    const assessmentAI = await axios.post('http://localhost:3001/api/v1/createAssessment', {
        jobId: job._id,
        title,
        description,
        duration,
        questionCount,
        difficulty,
        creationMethod,
        passingScore
    }, {
      withCredentials: true,
    });
    console.log(assessmentAI.data);
    onFinish(assessmentAI.data.assessment);

    }catch(error){
        
        alert(error.message);
    }
  };

  const handlePublish = () => {
    // UI only: Save/Publish API baad mein connect hogi.
    alert("Assessment create/publish API abhi connect nahi hai.");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <button
              onClick={onBack}
              className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              title="Back to jobs"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Create Assessment
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Configure an assessment for your selected job.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-5 sm:p-6">
          {/* Selected job */}
          <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50 p-4">
            <BriefcaseBusiness className="shrink-0 text-violet-600" size={22} />

            <div>
              <p className="text-xs font-medium text-violet-600">
                Selected Job
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {job?.Title}
              </p>
              <p className="text-sm text-slate-500">
                {job?.Location} · {job?.WorkMode}
              </p>
            </div>
          </div>

          {/* Basic details */}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Assessment Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. React Developer Assessment"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FileQuestion size={16} className="text-violet-600" />
                  Number of Questions
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={25}>25 Questions</option>
                  <option value={30}>30 Questions</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Clock3 size={16} className="text-violet-600" />
                  Time Limit
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400"
                >
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes</option>
                  <option value={20}>20 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                </select>
              </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FileQuestion size={16} className="text-violet-600" />
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FileQuestion size={16} className="text-violet-600" />
                    Passing Score (%)
                </label>
                <input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description & Instructions
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the skills, difficulty, question style, topics, and any coding questions you want. AI will use these instructions to decide the question mix."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
              <p className="mt-2 text-xs text-slate-400">
                Mention Easy, Medium, Hard, MCQs or coding questions here if
                required. You don't need to configure each question type.
              </p>
            </div>
          </div>

          {/* Creation method */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              How would you like to create it?
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  setMode("ai");
                  setShowManualEditor(false);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  mode === "ai"
                    ? "border-violet-500 bg-violet-50 ring-1 ring-violet-200"
                    : "border-slate-200 hover:border-violet-300"
                }`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600">
                  <Sparkles size={21} />
                </div>
                <p className="font-semibold text-slate-900">
                  Generate with AI
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Generate questions based on your instructions and review
                  them before publishing.
                </p>
              </button>

              <button
                onClick={() => {
                  setMode("manual");
                  setShowManualEditor(true);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  mode === "manual"
                    ? "border-violet-500 bg-violet-50 ring-1 ring-violet-200"
                    : "border-slate-200 hover:border-violet-300"
                }`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600">
                  <PenLine size={21} />
                </div>
                <p className="font-semibold text-slate-900">
                  Create Manually
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Write your own questions, add options and select correct
                  answers.
                </p>
              </button>
            </div>
          </div>

          {/* Manual question editor */}
          {showManualEditor && (
            <div className="space-y-4 border-t border-slate-200 pt-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Assessment Questions
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Added {questions.length} of {questionCount} questions
                  </p>
                </div>

                <button
                  onClick={addQuestion}
                  disabled={questions.length >= questionCount}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet-200 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50 disabled:opacity-40"
                >
                  <Plus size={16} />
                  Add Question
                </button>
              </div>

              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      Question {index + 1}
                    </p>

                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      title="Remove question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Question Type
                  </label>
                  <select
                    value={question.type}
                    onChange={(e) =>
                      updateQuestion(question.id, "type", e.target.value)
                    }
                    className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="true-false">True / False</option>
                    <option value="coding">Coding Question</option>
                  </select>

                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Question
                  </label>
                  <textarea
                    rows={2}
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(question.id, "question", e.target.value)
                    }
                    placeholder="Write your question..."
                    className="mb-4 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-400"
                  />

                  {question.type === "mcq" && (
                    <>
                      <label className="mb-2 block text-xs font-medium text-slate-500">
                        Options
                      </label>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => (
                          <input
                            key={optionIndex}
                            value={option}
                            onChange={(e) =>
                              updateOption(
                                question.id,
                                optionIndex,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                          />
                        ))}
                      </div>

                      <label className="mb-2 mt-4 block text-xs font-medium text-slate-500">
                        Correct Answer
                      </label>
                      <select
                        value={question.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(
                            question.id,
                            "correctAnswer",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                      >
                        <option value="">Select correct option</option>
                        {question.options.map((option, i) => (
                          <option key={i} value={option} disabled={!option.trim()}>
                            {`Option ${i + 1}${option ? `: ${option}` : ""}`}
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  {question.type === "true-false" && (
                    <>
                      <label className="mb-2 mt-4 block text-xs font-medium text-slate-500">
                        Correct Answer
                      </label>
                      <select
                        value={question.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(
                            question.id,
                            "correctAnswer",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                      >
                        <option value="">Select answer</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                      </select>
                    </>
                  )}

                  {question.type === "coding" && (
                    <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                      Coding question UI only. Code editor and automated
                      evaluation can be added in a later phase.
                    </p>
                  )}
                </div>
              ))}

              {questions.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 py-8 text-center">
                  <p className="text-sm text-slate-500">
                    No questions added yet.
                  </p>
                  <button
                    onClick={addQuestion}
                    className="mt-3 text-sm font-semibold text-violet-600 hover:text-violet-700"
                  >
                    + Add your first question
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={mode === "ai" ? handleGenerate : handlePublish}
            disabled={
              !title.trim() ||
              (mode === "manual" &&
                (questions.length === 0 ||
                  questions.some(
                    (q) =>
                      !q.question.trim() ||
                      (q.type === "mcq" &&
                        (!q.options.every((option) => option.trim()) ||
                          !q.correctAnswer))
                  )))
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {mode === "ai" ? (
              <>
                <Sparkles size={17} />
                Generate with AI
              </>
            ) : (
              <>
                <Plus size={17} />
                Create Assessment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssessmentModal;
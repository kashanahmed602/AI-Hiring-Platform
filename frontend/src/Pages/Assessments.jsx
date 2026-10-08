import { useState } from "react";
import {
  Plus,
  ClipboardCheck,
  Clock3,
  FileQuestion,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import AssessmentJobsModal from "../Components/AssessmentJobsModal";

const demoAssessments = [
  {
    _id: "1",
    title: "React Developer Assessment",
    jobTitle: "Frontend Developer",
    questions: 20,
    duration: 30,
    status: "Draft",
  },
  {
    _id: "2",
    title: "Node.js Technical Assessment",
    jobTitle: "Backend Developer",
    questions: 15,
    duration: 25,
    status: "Published",
  },
];

const Assessments = () => {
  const [assessments] = useState(demoAssessments);
  const [showJobs, setShowJobs] = useState(false);

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
            value={assessments.length}
            icon={ClipboardCheck}
          />
          <StatCard
            title="Published"
            value={assessments.filter((a) => a.status === "Published").length}
            icon={Sparkles}
          />
          <StatCard
            title="Drafts"
            value={assessments.filter((a) => a.status === "Draft").length}
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

        {assessments.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {assessments.map((assessment) => (
              <div
                key={assessment._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <ClipboardCheck size={22} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      assessment.status === "Published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {assessment.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {assessment.title}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <BriefcaseBusiness size={15} />
                  {assessment.jobTitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <FileQuestion size={16} />
                    {assessment.questions} questions
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {assessment.duration} minutes
                  </span>
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

      <AssessmentJobsModal
        isOpen={showJobs}
        onClose={() => setShowJobs(false)}
      />
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
      <Icon size={22} />
    </div>

    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

export default Assessments;
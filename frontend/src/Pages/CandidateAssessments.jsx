import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Clock3,
  FileQuestion,
  BriefcaseBusiness,
  ArrowRight,
  Search,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import CandidateAssessmentTest from "./CandidateAssessmentTest";

const CandidateAssessments = () => {
  const [search, setSearch] = useState("");
  const [assessmentsData, setAssessmentsData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/candidate/assessments",
          { withCredentials: true }
        );

        setAssessmentsData(response.data.assessments || []);
        console.log("Assessments:", response.data.assessments);
      } catch (error) {
        console.error(
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const getJobTitle = (assessment) =>
    assessment.jobId?.Title ||
    assessment.jobTitle ||
    "Job";

  // The backend endpoint should enforce application and shortlist eligibility.
  // If it returns eligibility fields, use those too.
  const isAssessmentEligible = (assessment) => {
    const applicationAllowsAccess =
      assessment.hasApplied === undefined ||
      (assessment.hasApplied === true &&
        (assessment.applicationStatus === undefined ||
          assessment.applicationStatus === "shortlisted"));

    return (
      assessment.status === "published" &&
      applicationAllowsAccess
    );
  };

  const filteredAssessments = assessmentsData.filter((assessment) => {
    const title = (assessment.title || "").toLowerCase();
    const jobTitle = getJobTitle(assessment).toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      title.includes(searchText) ||
      jobTitle.includes(searchText);

    const isEligible = isAssessmentEligible(assessment);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "available" && isEligible) ||
      (activeTab === "locked" && !isEligible);

    return matchesSearch && matchesTab;
  });

  const availableCount = assessmentsData.filter(
    isAssessmentEligible
  ).length;

  const handleStart = (assessment) => {
    setActiveAssessment(assessment);
  };

  // Show the test page after clicking Start Assessment
  if (activeAssessment) {
    return (
      <CandidateAssessmentTest
        assessment={activeAssessment}
        onExit={() => setActiveAssessment(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <ClipboardCheck size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                My Assessments
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                View your job assessments and track your eligibility.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={ClipboardCheck}
            label="Total Assessments"
            value={assessmentsData.length}
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Available to Start"
            value={availableCount}
          />

          <SummaryCard
            icon={LockKeyhole}
            label="Not Available"
            value={assessmentsData.length - availableCount}
          />
        </div>

        {/* Search and Filters */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search assessments or job titles..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Assessments" },
              { id: "available", label: "Available" },
              { id: "locked", label: "Locked" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Loading assessments...
          </div>
        ) : filteredAssessments.length > 0 ? (
          /* Assessment Cards */
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredAssessments.map((assessment) => {
              const isEligible = isAssessmentEligible(assessment);

              return (
                <div
                  key={assessment._id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <FileQuestion size={22} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isEligible
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {isEligible ? "Available" : "Locked"}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900">
                    {assessment.title}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <BriefcaseBusiness size={16} />
                    {getJobTitle(assessment)}
                  </p>

                  <div className="my-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
                    <Detail
                      icon={FileQuestion}
                      label="Questions"
                      value={
                        assessment.questionCount ??
                        assessment.questions?.length ??
                        0
                      }
                    />

                    <Detail
                      icon={Clock3}
                      label="Duration"
                      value={`${assessment.duration} min`}
                    />

                    <div className="col-span-2">
                      <p className="text-xs text-slate-400">
                        Difficulty
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {assessment.difficulty || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility Message */}
                  <div
                    className={`mb-4 rounded-xl p-3 text-sm ${
                      isEligible
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-amber-50 text-amber-800"
                    }`}
                  >
                    {isEligible ? (
                      <div className="flex gap-2">
                        <CheckCircle2 size={18} className="shrink-0" />
                        <p>
                          You are eligible to start this assessment.
                        </p>
                      </div>
                    ) : assessment.status !== "published" ? (
                      <div className="flex gap-2">
                        <LockKeyhole size={18} className="shrink-0" />
                        <p>This assessment is not published.</p>
                      </div>
                    ) : !assessment.hasApplied ? (
                      <div className="flex gap-2">
                        <LockKeyhole size={18} className="shrink-0" />
                        <p>You have not applied for this job.</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <LockKeyhole size={18} className="shrink-0" />
                        <p>
                          Your application is not shortlisted yet.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    disabled={!isEligible}
                    onClick={() => handleStart(assessment)}
                    className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isEligible
                        ? "bg-violet-600 text-white hover:bg-violet-700"
                        : "cursor-not-allowed bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isEligible ? (
                      <>
                        Start Assessment
                        <ArrowRight size={17} />
                      </>
                    ) : (
                      <>
                        <LockKeyhole size={16} />
                        Assessment Locked
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <Search size={35} className="mx-auto text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-900">
              No assessments found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or change the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
      <Icon size={23} />
    </div>

    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  </div>
);

const Detail = ({ icon: Icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 text-slate-400">
      <Icon size={15} />
      <span className="text-xs">{label}</span>
    </div>

    <p className="mt-1 text-sm font-semibold text-slate-800">
      {value}
    </p>
  </div>
);

export default CandidateAssessments;
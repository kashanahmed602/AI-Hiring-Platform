
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ClipboardCheck,
  Users,
  Search,
  RefreshCw,
  Eye,
  CalendarDays,
  Trophy,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AssessmentResults = () => {

  const navigate = useNavigate(); 

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3001/api/v1/recruiter/assessments/results",
        { withCredentials: true }
      );

      setResults(response.data.assessmentResults || []);
    } catch (err) {
      if (err.response?.status === 404) {
        setResults([]);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to fetch assessment results."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filteredResults = useMemo(() => {
    const query = search.toLowerCase().trim();

    return results.filter((result) => {
      const candidate = result.CandidateId;
      const assessment = result.assessmentId;

      return (
        (candidate?.name || "").toLowerCase().includes(query) ||
        (candidate?.email || "").toLowerCase().includes(query) ||
        (assessment?.title || "").toLowerCase().includes(query)
      );
    });
  }, [results, search]);

  // Update these field names according to your AttemptedAssessment schema.
  const getScore = (result) =>
    result.percentage ??
    result.score ??
    result.totalScore ??
    result.marksObtained ??
    null;

  const getDate = (result) => {
    const date =
      result.completedAt ||
      result.submittedAt ||
      result.createdAt;

    if (!date) return "N/A";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleDateString();
  };

  const scoredResults = results.filter(
    (result) => getScore(result) !== null
  );

  const averageScore = scoredResults.length
    ? Math.round(
        scoredResults.reduce(
          (sum, result) => sum + Number(getScore(result)),
          0
        ) / scoredResults.length
      )
    : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Assessment Results
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review candidate assessment attempts and performance.
            </p>
          </div>

          <button
            onClick={fetchResults}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Results
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            title="Total Attempts"
            value={results.length}
            icon={<ClipboardCheck size={22} />}
          />

          <SummaryCard
            title="Candidates"
            value={
              new Set(
                results
                  .map((r) => r.CandidateId?._id)
                  .filter(Boolean)
                  .map(String)
              ).size
            }
            icon={<Users size={22} />}
          />

          <SummaryCard
            title="Average Score"
            value={
              averageScore === null
                ? "N/A"
                : `${averageScore}%`
            }
            icon={<Trophy size={22} />}
          />
        </div>

        {/* Results Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Candidate Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredResults.length} result(s) found
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidate or assessment..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
              <p className="text-sm text-slate-500">
                Loading assessment results...
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
              <AlertCircle size={36} className="text-red-500" />
              <p className="font-medium text-slate-800">{error}</p>
              <button
                onClick={fetchResults}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              >
                Try Again
              </button>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
              <ClipboardCheck size={42} className="text-slate-300" />
              <h3 className="font-semibold text-slate-800">
                No assessment results found
              </h3>
              <p className="max-w-sm text-sm text-slate-500">
                Results will appear here when candidates submit their assessments.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Candidate</th>
                    <th className="px-5 py-4 font-semibold">Assessment</th>
                    <th className="px-5 py-4 font-semibold">Score</th>
                    <th className="px-5 py-4 font-semibold">Submitted</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredResults.map((result) => {
                    const candidate = result.CandidateId;
                    const assessment = result.assessmentId;
                    const score = getScore(result);

                    return (
                      <tr
                        key={result._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                              {(candidate?.name || "C")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {candidate?.resume?.parsedData?.personal?.fullName || "Unknown Candidate"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {candidate?.resume?.parsedData?.personal?.email || "No email"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-700">
                            {assessment?.title || "Assessment unavailable"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {score !== null ? (
                            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 font-semibold text-violet-700">
                              {score}
                              {result.percentage != null ? "%" : ""}
                            </span>
                          ) : (
                            <span className="text-slate-400">
                              Not available
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays
                              size={15}
                              className="text-slate-400"
                            />
                            {getDate(result)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() =>
                                navigate(`/candidate/assessments/results/${result._id}`, {
                                state: { result },
                                })}
                            className="inline-flex items-center gap-2 rounded-lg border border-violet-200 px-3 py-2 font-medium text-violet-700 transition hover:bg-violet-50"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon }) => (
  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>

    <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
      {icon}
    </div>
  </div>
);

export default AssessmentResults;
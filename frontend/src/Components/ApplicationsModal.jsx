import { useState } from "react";
import { X } from "lucide-react";
import ApplicantDetailsModal from "./ApplicantDetailsModal";

const ApplicationsModal = ({ job, onClose }) => {
  const [limit, setLimit] = useState("10");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  if (!job) return null;

  const applications = [...(job.applications || [])].sort(
    (a, b) => (b.matchScore || 0) - (a.matchScore || 0)
  );

  const displayedApplications =
    limit === "all"
      ? applications
      : applications.slice(0, Number(limit));

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {job.Title}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {applications.length} total applications
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          {/* Ranking */}
          <div className="flex items-center justify-between p-4 border-b bg-slate-50">
            <p className="text-sm font-medium text-slate-700">
              Showing {displayedApplications.length} of{" "}
              {applications.length}
            </p>

            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="10">Top 10</option>
              <option value="20">Top 20</option>
              <option value="30">Top 30</option>
              <option value="50">Top 50</option>
              <option value="100">Top 100</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* Applications */}
          <div className="p-4 overflow-y-auto max-h-[65vh] space-y-2">
            {displayedApplications.map((application, index) => {
              const personal =
                application.resumeSnapshot?.personal;

              return (
                <div
                  key={application._id}
                  onClick={() =>
                    setSelectedApplicant(application)
                  }
                  className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-violet-300 hover:bg-violet-50/30 transition"
                >
                  {/* Rank */}
                  <div className="w-8 text-center font-bold text-slate-400">
                    #{index + 1}
                  </div>

                  {/* Candidate */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">
                      {personal?.fullName || "Unknown Candidate"}
                    </p>

                    <p className="text-sm text-slate-500 truncate">
                      {personal?.email || "No email"}
                    </p>
                  </div>

                  {/* AI Score */}
                  <div className="text-center">
                    <p className="text-xs text-slate-400">
                      AI Score
                    </p>

                    <p className="text-lg font-bold text-violet-600">
                      {application.matchScore}%
                    </p>
                  </div>

                  {/* Status */}
                  <span className="hidden sm:block px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium text-slate-600">
                    {application.status}
                  </span>
                </div>
              );
            })}

            {applications.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                No applications for this job.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Candidate Details */}
      <ApplicantDetailsModal
        application={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
    </>
  );
};

export default ApplicationsModal;
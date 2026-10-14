
import { useEffect, useState } from "react";
import { X, CalendarClock, UserRound, BriefcaseBusiness } from "lucide-react";

const InterviewCreateModal = ({
  isOpen,
  onClose,
  onCreate,
  candidates = [],
  applications = [],
  jobs = [],
}) => {
  const [formData, setFormData] = useState({
    candidateId: "",
    applicationId: "",
    jobId: "",
    schedule: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        candidateId: "",
        applicationId: "",
        jobId: "",
        schedule: "",
      });
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const candidateApplications = applications.filter(
    (application) =>
      String(application.candidateId) === formData.candidateId
  );

  const selectedApplication = applications.find(
    (application) =>
      String(application._id) === formData.applicationId
  );

  const selectedJob = jobs.find(
    (job) =>
      String(job._id) ===
      String(selectedApplication?.jobId || formData.jobId)
  );

  const handleCandidateChange = (candidateId) => {
    setFormData((prev) => ({
      ...prev,
      candidateId,
      applicationId: "",
      jobId: "",
    }));
    setError("");
  };

  const handleApplicationChange = (applicationId) => {
    const application = applications.find(
      (item) => String(item._id) === applicationId
    );

    setFormData((prev) => ({
      ...prev,
      applicationId,
      jobId: application ? String(application.jobId) : "",
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.candidateId ||
      !formData.applicationId ||
      !formData.jobId ||
      !formData.schedule
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const scheduledDate = new Date(formData.schedule);

    if (Number.isNaN(scheduledDate.getTime())) {
      setError("Please select a valid date and time.");
      return;
    }

    if (scheduledDate <= new Date()) {
      setError("Please select a future date and time.");
      return;
    }

    const interviewData = {
      _id: `interview-${Date.now()}`,
      candidateId: formData.candidateId,
      applicationId: formData.applicationId,
      jobId: formData.jobId,
      schedule: scheduledDate.toISOString(),
      isCompleted: false,
      feedback: "",
      completedAt: null,
      createdAt: new Date().toISOString(),
    };

    // Dummy callback only. No API call.
    onCreate(interviewData);
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="mb-1 flex items-center gap-2 text-violet-600">
              <CalendarClock size={19} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Interview Management
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Schedule Interview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a candidate and choose an interview time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <UserRound size={16} />
                Candidate
              </span>
            </label>

            <select
              value={formData.candidateId}
              onChange={(e) =>
                handleCandidateChange(e.target.value)
              }
              className={inputClass}
            >
              <option value="">Select a candidate</option>

              {candidates.map((candidate) => (
                <option
                  key={candidate._id}
                  value={String(candidate._id)}
                >
                  {candidate.resume.parsedData.personal.fullName} — {candidate.resume.parsedData.personal.email}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
            <label className={labelClass}>
              Application
            </label>

            <select
              value={formData.applicationId}
              onChange={(e) =>
                handleApplicationChange(e.target.value)
              }
              disabled={!formData.candidateId}
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
            >
              <option value="">
                {formData.candidateId
                  ? "Select an application"
                  : "Select a candidate first"}
              </option>

              {candidateApplications.map((application) => {
                const job = jobs.find(
                  (item) =>
                    String(item._id) ===
                    String(application.jobId)
                );

                return (
                  <option
                    key={application._id}
                    value={String(application._id)}
                  >
                    {job?.title || "Job"} — {application.status}
                  </option>
                );
              })}
            </select>

            {formData.candidateId &&
              candidateApplications.length === 0 && (
                <p className="mt-2 text-xs text-amber-600">
                  No applications found for this candidate.
                </p>
              )}
          </div> */}

          {/* <div>
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness size={16} />
                Job Position
              </span>
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {selectedJob?.title ||
                "Select an application first"}
            </div>
          </div> */}

          <div>
            <label className={labelClass}>
              Scheduled Date & Time
            </label>

            <input
              type="datetime-local"
              value={formData.schedule}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  schedule: e.target.value,
                }));
                setError("");
              }}
              min={new Date(Date.now() + 60000)
                .toISOString()
                .slice(0, 16)}
              className={inputClass}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              Create Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewCreateModal;
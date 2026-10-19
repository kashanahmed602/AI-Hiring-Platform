import { useEffect, useMemo, useState } from "react";
import {
  X,
  CalendarClock,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";
import axios from 'axios';
const InterviewCreateModal = ({
  isOpen,
  onClose,
  onCreate,
  applications = [],
  initialCandidateId = "",
}) => {
  const [formData, setFormData] = useState({
    candidateId: "",
    applicationId: "",
    jobId: "",
    schedule: "",
  });

  const [error, setError] = useState("");

  // Build candidate dropdown from the applications.
  // candidateId is populated in your API response.
  const candidates = useMemo(() => {
    const uniqueCandidates = new Map();

    applications.forEach((application) => {
      const candidate = application.candidateId;

      if (candidate?._id) {
        uniqueCandidates.set(String(candidate._id), candidate);
      }
    });

    return Array.from(uniqueCandidates.values());
  }, [applications]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        candidateId: initialCandidateId
          ? String(initialCandidateId)
          : "",
        applicationId: "",
        jobId: "",
        schedule: "",
      });

      setError("");
    }
  }, [isOpen, initialCandidateId]);

  const createInterview = async (candidateId, jobId, applicationId, schedule) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/interview-create`, {
            candidateId,
            jobId,
            applicationId,
            schedule
        },{
            withCredentials: true,
        })

        alert('Interview Created Successfully');
    }catch(error){
        alert(error.message);
    }
  }

  if (!isOpen) return null;

  // Applications belonging to the selected candidate.
  const candidateApplications = applications.filter(
    (application) =>
      String(
        application.candidateId?._id ??
        application.candidateId
      ) === formData.candidateId
  );

  // Find the selected application using its actual MongoDB _id.
  const selectedApplication = applications.find(
    (application) =>
      String(application._id) === formData.applicationId
  );

  // jobId is populated as an object in your API response.
  const selectedJob = selectedApplication?.jobId;

  const handleCandidateChange = (candidateId) => {
    setFormData((previous) => ({
      ...previous,
      candidateId,
      applicationId: "",
      jobId: "",
    }));

    setError("");
  };

  const handleJobChange = (applicationId) => {
    // The dropdown value is the APPLICATION ID, not the job ID.
    const application = candidateApplications.find(
      (item) => String(item._id) === applicationId
    );

    const jobId = application?.jobId?._id
      ? String(application.jobId._id)
      : String(application?.jobId || "");

    setFormData((previous) => ({
      ...previous,
      applicationId: application ? String(application._id) : "",
      jobId,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.candidateId ||
      !formData.applicationId ||
      !formData.jobId ||
      !formData.schedule
    ) {
      setError("Please select a candidate, job and date/time.");
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

      // All three IDs come from the selected application.
      candidateId: formData.candidateId,
      applicationId: formData.applicationId,
      jobId: formData.jobId,

      schedule: scheduledDate.toISOString(),
      isCompleted: false,
      feedback: "",
      completedAt: null,
      createdAt: new Date().toISOString(),
    };

    // Demo callback; no API request.
    createInterview(formData.candidateId, formData.jobId, formData.applicationId, scheduledDate.toISOString());
    // onCreate(interviewData);
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
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
              Select a candidate, their applied job and interview time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Candidate dropdown */}
          <div>
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <UserRound size={16} />
                Candidate
              </span>
            </label>

            <select
              value={formData.candidateId}
              onChange={(event) =>
                handleCandidateChange(event.target.value)
              }
              className={inputClass}
            >
              <option value="">Select a candidate</option>

              {candidates.map((candidate) => {
                const candidateName =
                  candidate.resume?.parsedData?.personal?.fullName ||
                  candidate.name ||
                  "Unnamed Candidate";

                const candidateEmail =
                  candidate.resume?.parsedData?.personal?.email ||
                  candidate.email ||
                  "";

                return (
                  <option
                    key={candidate._id}
                    value={String(candidate._id)}
                  >
                    {candidateName}
                    {candidateEmail ? ` — ${candidateEmail}` : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Jobs applied for by the selected candidate */}
          <div>
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness size={16} />
                Applied Job
              </span>
            </label>

            <select
              value={formData.applicationId}
              onChange={(event) =>
                handleJobChange(event.target.value)
              }
              disabled={!formData.candidateId}
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
            >
              <option value="">
                {formData.candidateId
                  ? "Select an applied job"
                  : "Select a candidate first"}
              </option>

              {candidateApplications.map((application) => {
                const job = application.jobId;
                const jobTitle =
                  typeof job === "object"
                    ? job?.Title || job?.title || "Untitled Job"
                    : "Job";

                return (
                  <option
                    key={application._id}
                    value={String(application._id)}
                  >
                    {jobTitle}
                  </option>
                );
              })}
            </select>

            {formData.candidateId &&
              candidateApplications.length === 0 && (
                <p className="mt-2 text-xs text-amber-600">
                  No eligible applications found for this candidate.
                </p>
              )}
          </div>

          {/* Selected job details */}
          {/* {selectedApplication && (
            <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
              <p className="text-sm font-semibold text-slate-800">
                {selectedJob?.Title ||
                  selectedJob?.title ||
                  "Selected Job"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {selectedJob?.Location ||
                  selectedJob?.location ||
                  "Location not specified"}
              </p>

              <p className="mt-3 break-all text-xs text-slate-500">
                Application ID: {selectedApplication._id}
              </p>

              <p className="mt-1 break-all text-xs text-slate-500">
                Job ID:{" "}
                {selectedJob?._id || selectedApplication.jobId}
              </p>
            </div>
          )} */}

          {/* Date and time */}
          <div>
            <label className={labelClass}>
              Scheduled Date &amp; Time
            </label>

            <input
              type="datetime-local"
              value={formData.schedule}
              onChange={(event) => {
                setFormData((previous) => ({
                  ...previous,
                  schedule: event.target.value,
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

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
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

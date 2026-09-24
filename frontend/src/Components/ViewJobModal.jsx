import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  Wallet,
  X,
  CheckCircle2,
  FileText,
  Hash,
} from "lucide-react";

const ViewJobModal = ({ job, onClose }) => {
  if (!job) return null;

  const skills = Array.isArray(job.RequiredSkills)
    ? job.RequiredSkills.flatMap((skill) =>
        typeof skill === "string"
          ? skill.split(",").map((item) => item.trim())
          : []
      ).filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-200">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <BriefcaseBusiness size={23} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                Job Details
              </p>

              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                {job.Title}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {job.JobType} • {job.WorkMode}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition shrink-0"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">

          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Location */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <MapPin size={16} />

                <span className="text-xs font-medium">
                  Location
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.Location || "Not specified"}
              </p>

            </div>

            {/* Job Type */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <BriefcaseBusiness size={16} />

                <span className="text-xs font-medium">
                  Job Type
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.JobType || "Not specified"}
              </p>

            </div>

            {/* Work Mode */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock3 size={16} />

                <span className="text-xs font-medium">
                  Work Mode
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.WorkMode || "Not specified"}
              </p>

            </div>

            {/* Salary */}
            <div className="rounded-2xl border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Wallet size={16} />

                <span className="text-xs font-medium">
                  Salary
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {job.Salary || "Not specified"}
              </p>

            </div>

          </div>

          {/* Required Skills */}
          <div className="mt-6">

            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2
                size={18}
                className="text-violet-600"
              />

              <h3 className="font-semibold text-slate-900">
                Required Skills
              </h3>
            </div>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">

                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No skills specified.
              </p>
            )}

          </div>

          {/* Description */}
          <div className="mt-6">

            <div className="flex items-center gap-2 mb-3">
              <FileText
                size={18}
                className="text-violet-600"
              />

              <h3 className="font-semibold text-slate-900">
                Job Description
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">

              <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">
                {job.Description || "No description available."}
              </p>

            </div>

          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

            {/* Created */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <CalendarDays size={16} />

                <span className="text-xs">
                  Created At
                </span>
              </div>

              <p className="text-sm font-medium text-slate-700">
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleString()
                  : "Not available"}
              </p>

            </div>

            {/* Updated */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <CalendarDays size={16} />

                <span className="text-xs">
                  Last Updated
                </span>
              </div>

              <p className="text-sm font-medium text-slate-700">
                {job.updatedAt
                  ? new Date(job.updatedAt).toLocaleString()
                  : "Not available"}
              </p>

            </div>

          </div>

          {/* Job ID */}
          {/* <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">

            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Hash size={16} />

              <span className="text-xs">
                Job ID
              </span>
            </div>

            <p className="text-xs font-mono text-slate-600 break-all">
              {job._id}
            </p>

          </div> */}

          {/* Close */}
          <div className="flex justify-end mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-violet-700 transition"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;
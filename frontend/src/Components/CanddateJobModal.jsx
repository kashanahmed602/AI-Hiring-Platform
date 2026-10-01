import {
  X,
  MapPin,
  Wallet,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";


const CandidateJobViewModal = ({
  job,
  onClose,
  onApply,
}) => {

  if (!job) return null;


  // Required Skills ko handle karna
  const skills = Array.isArray(job.RequiredSkills)
    ? job.RequiredSkills
        .flatMap((skill) =>
          typeof skill === "string"
            ? skill.split(",")
            : []
        )
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* ==================================================
          BACKDROP
      ================================================== */}

      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />


      {/* ==================================================
          MODAL
      ================================================== */}

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">

                <BriefcaseBusiness size={22} />

              </div>


              <div>

                <h2 className="text-xl font-bold text-slate-900">

                  {job.Title}

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                  {job.WorkMode} · {job.JobType}

                </p>

              </div>

            </div>


            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >

              <X size={18} />

            </button>

          </div>

        </div>


        {/* ==================================================
            BODY
        ================================================== */}

        <div className="p-6 space-y-6">


          {/* ==================================================
              JOB INFO
          ================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">


            {/* Location */}

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">

              <div className="flex items-center gap-2 text-slate-400 mb-2">

                <MapPin size={16} />

                <span className="text-xs font-medium">
                  Location
                </span>

              </div>

              <p className="text-sm font-semibold text-slate-800">
                {job.Location || "N/A"}
              </p>

            </div>


            {/* Salary */}

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">

              <div className="flex items-center gap-2 text-slate-400 mb-2">

                <Wallet size={16} />

                <span className="text-xs font-medium">
                  Salary
                </span>

              </div>

              <p className="text-sm font-semibold text-slate-800">
                {job.Salary || "N/A"}
              </p>

            </div>


            {/* Job Type */}

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">

              <div className="flex items-center gap-2 text-slate-400 mb-2">

                <BriefcaseBusiness size={16} />

                <span className="text-xs font-medium">
                  Job Type
                </span>

              </div>

              <p className="text-sm font-semibold text-slate-800">
                {job.JobType || "N/A"}
              </p>

            </div>

          </div>


          {/* ==================================================
              WORK MODE
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Work Mode
            </h3>

            <span className="inline-flex px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-sm font-medium">

              {job.WorkMode || "N/A"}

            </span>

          </div>


          {/* ==================================================
              REQUIRED SKILLS
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Required Skills
            </h3>


            <div className="flex flex-wrap gap-2">

              {skills.length > 0 ? (

                skills.map((skill, index) => (

                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <span className="text-sm text-slate-400">
                  No specific skills mentioned
                </span>

              )}

            </div>

          </div>

          {/* AI MATCH SCORE */}
<div className="mt-6">

  <div className="flex items-center gap-2 mb-3">
    <CheckCircle2
      size={18}
      className="text-violet-600"
    />

    <h3 className="font-semibold text-slate-900">
      AI Match Score
    </h3>
  </div>

  <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5">

    {/* Main Score */}
    <div className="flex items-center justify-between gap-4 mb-5">

      <div>
        <p className="text-xs font-medium text-slate-500">
          Overall Resume Match
        </p>

        <p className="text-3xl font-bold text-violet-700 mt-1">
          {job.matchScore ?? 0}%
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-slate-500">
          AI Analysis
        </p>

        <p className="text-sm font-semibold text-violet-700 mt-1">
          Resume vs Job
        </p>
      </div>

    </div>


    {/* Match Details */}
    {job.matchDetails && (

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Skills */}
        <div className="rounded-xl bg-white border border-slate-200 p-4">

          <p className="text-xs text-slate-400">
            Skills Match
          </p>

          <p className="text-lg font-bold text-slate-900 mt-1">
            {Math.round(
              (job.matchDetails.skillsMatch || 0) * 100
            )}%
          </p>

        </div>


        {/* Experience */}
        <div className="rounded-xl bg-white border border-slate-200 p-4">

          <p className="text-xs text-slate-400">
            Experience Match
          </p>

          <p className="text-lg font-bold text-slate-900 mt-1">
            {Math.round(
              (job.matchDetails.experienceMatch || 0) * 100
            )}%
          </p>

        </div>


        {/* Education */}
        <div className="rounded-xl bg-white border border-slate-200 p-4">

          <p className="text-xs text-slate-400">
            Education Match
          </p>

          <p className="text-lg font-bold text-slate-900 mt-1">
            {Math.round(
              (job.matchDetails.educationMatch || 0) * 100
            )}%
          </p>

        </div>


        {/* Work Alignment */}
        <div className="rounded-xl bg-white border border-slate-200 p-4">

          <p className="text-xs text-slate-400">
            Work Alignment
          </p>

          <p className="text-lg font-bold text-slate-900 mt-1">
            {Math.round(
              (job.matchDetails.workAlignment || 0) * 100
            )}%
          </p>

        </div>

      </div>

    )}


    {/* Strengths */}
    {job.matchDetails?.strengths?.length > 0 && (

      <div className="mt-5">

        <p className="text-sm font-semibold text-slate-900 mb-2">
          Your Strengths
        </p>

        <div className="space-y-2">

          {job.matchDetails.strengths.map(
            (strength, index) => (

              <div
                key={index}
                className="flex items-start gap-2"
              >

                <CheckCircle2
                  size={16}
                  className="text-emerald-600 mt-0.5 shrink-0"
                />

                <p className="text-sm text-slate-600">
                  {strength}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    )}


    {/* Missing Skills */}
    {job.matchDetails?.missingSkills?.length > 0 && (

      <div className="mt-5">

        <p className="text-sm font-semibold text-slate-900 mb-2">
          Missing Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {job.matchDetails.missingSkills.map(
            (skill, index) => (

              <span
                key={`${skill}-${index}`}
                className="px-3 py-1.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium"
              >
                {skill}
              </span>

            )
          )}

        </div>

      </div>

    )}


    {/* Experience Gap */}
    {job.matchDetails?.experienceGap && (

      <div className="mt-5">

        <p className="text-sm font-semibold text-slate-900 mb-2">
          Experience Gap
        </p>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">

          <p className="text-sm text-amber-800">
            {job.matchDetails.experienceGap}
          </p>

        </div>

      </div>

    )}

  </div>

</div>


          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Job Description
            </h3>

            <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">

              {job.Description || "No description available."}

            </p>

          </div>


          {/* ==================================================
              POSTED DATE
          ================================================== */}

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <CalendarDays size={16} />

            <span>
              Posted{" "}
              {job.createdAt
                ? new Date(
                    job.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </span>

          </div>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4">

          <div className="flex items-center justify-end gap-3">


            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition"
            >

              Close

            </button>


            {/* Apply */}

            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition shadow-lg shadow-violet-500/20"
            >

              <CheckCircle2 size={17} />

              Apply Now

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};


export default CandidateJobViewModal;  
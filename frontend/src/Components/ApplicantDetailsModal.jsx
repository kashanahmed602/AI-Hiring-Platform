import { X } from "lucide-react";

const ApplicantDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  const resume = application.resumeSnapshot;

  const personal = resume?.personal;
  const professional = resume?.professional;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Applicant
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {personal?.fullName || "Unknown Candidate"}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {personal?.email}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(92vh-100px)] p-6 space-y-6">

          {/* AI Score */}
          <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="col-span-2 sm:col-span-1 bg-violet-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500">AI Score</p>
              <p className="text-3xl font-bold text-violet-600">
                {application.matchScore}%
              </p>
            </div>

            <Score
              title="Skills"
              value={application.matchDetails?.skillsMatch}
            />

            <Score
              title="Experience"
              value={application.matchDetails?.experienceMatch}
            />

            <Score
              title="Education"
              value={application.matchDetails?.educationMatch}
            />

            <Score
              title="Work Alignment"
              value={application.matchDetails?.workAlignment}
            />
          </section>

          {/* Personal */}
          <Section title="Personal Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Info label="Full Name" value={personal?.fullName} />
              <Info label="Email" value={personal?.email} />
              <Info label="Phone" value={personal?.phone} />
              <Info label="Location" value={personal?.location} />
            </div>
          </Section>

          {/* Professional */}
          <Section title="Professional">
            <div className="grid sm:grid-cols-3 gap-4">
              <Info label="Headline" value={professional?.headline} />
              <Info label="Current Role" value={professional?.currentRole} />
              <Info
                label="Experience"
                value={professional?.yearsOfExperience}
              />
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {(resume?.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            {resume?.experience?.map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl p-4 mb-3"
              >
                <h3 className="font-semibold text-slate-900">
                  {item.role}
                </h3>

                <p className="text-sm text-violet-600 mt-1">
                  {item.company}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {item.startDate} - {item.endDate}
                </p>

                {item.responsibilities?.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {item.responsibilities.map((text, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-600"
                      >
                        • {text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>

          {/* Education */}
          <Section title="Education">
            {resume?.education?.map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl p-4 mb-3"
              >
                <h3 className="font-semibold text-slate-900">
                  {item.degree}
                </h3>

                <p className="text-sm text-violet-600">
                  {item.institution}
                </p>

                <p className="text-sm text-slate-500">
                  {item.fieldOfStudy}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            ))}
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {resume?.projects?.map((project, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl p-4 mb-3"
              >
                <h3 className="font-semibold text-slate-900">
                  {project.name}
                </h3>

                <p className="text-sm text-slate-600 mt-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-slate-100 rounded-md text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          {/* AI Details */}
          <Section title="AI Match Analysis">
            {application.matchDetails?.strengths?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-sm text-slate-900 mb-2">
                  Strengths
                </h3>

                <ul className="space-y-1">
                  {application.matchDetails.strengths.map(
                    (strength, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600"
                      >
                        • {strength}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {application.matchDetails?.missingSkills?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-slate-900 mb-2">
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {application.matchDetails.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </Section>

        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section>
    <h2 className="text-lg font-bold text-slate-900 mb-3">
      {title}
    </h2>

    {children}
  </section>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-400">{label}</p>
    <p className="text-sm font-medium text-slate-800 mt-1">
      {value || "Not provided"}
    </p>
  </div>
);

const Score = ({ title, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4 text-center">
    <p className="text-xs text-slate-500">{title}</p>
    <p className="text-lg font-bold text-slate-800 mt-1">
      {value != null ? `${Math.round(value * 100)}%` : "N/A"}
    </p>
  </div>
);

export default ApplicantDetailsModal;
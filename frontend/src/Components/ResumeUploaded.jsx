import {
  Download,
  ExternalLink,
  Upload,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Languages,
  Link as LinkIcon,
  UserRound,
  CalendarDays,
} from "lucide-react";

import { useState } from "react";
import UploadResume from "./UploadResume";

const ResumeUploaded = ({ data }) => {
  const [uploadAgain, setUploadAgain] = useState(false);

  const resume = data?.resume;
  const parsedData = resume?.parsedData;

  // --------------------------------
  // Upload Again
  // --------------------------------
  const handleUploadAgain = () => {
    setUploadAgain(true);
  };

  // --------------------------------
  // View Resume
  // --------------------------------
  const handleViewResume = () => {
    if (!resume?.fileUrl) return;

    window.open(resume.fileUrl, "_blank", "noopener,noreferrer");
  };

  // --------------------------------
  // Download Resume
  // --------------------------------
  const handleDownloadResume = () => {
    if (!resume?.fileUrl) return;

    const link = document.createElement("a");

    link.href = resume.fileUrl;
    link.target = "_blank";
    link.download = resume.fileName || "resume";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --------------------------------
  // Delete Resume
  // --------------------------------
  const handleDeleteResume = () => {
    console.log("Delete resume clicked");

    // Backend delete API yahan add hoga
  };

  // --------------------------------
  // Upload Again Screen
  // --------------------------------
  if (uploadAgain) {
    return <UploadResume />;
  }

  // --------------------------------
  // Helpers
  // --------------------------------
  const formatArray = (items) => {
    if (!Array.isArray(items)) return [];

    return items.filter(Boolean);
  };

  const skills = formatArray(parsedData?.skills);
  const experience = formatArray(parsedData?.experience);
  const education = formatArray(parsedData?.education);
  const projects = formatArray(parsedData?.projects);
  const certifications = formatArray(parsedData?.certifications);
  const languages = formatArray(parsedData?.languages);
  const links = formatArray(parsedData?.links);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* =========================================
            PAGE HEADER
        ========================================== */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <UserRound size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  My Resume
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your resume and professional information
                </p>
                <p className="mt-1 text-xs text-red-500">
                  If you want to update your resume, the old resume will be replaced from the new one. 
                </p>

                {resume?.fileName && (
                  <p className="mt-2 text-xs text-slate-400">
                    {resume.fileName}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleViewResume}
                disabled={!resume?.fileUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ExternalLink size={17} />
                View Resume
              </button>

              <button
                onClick={handleDownloadResume}
                disabled={!resume?.fileUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={17} />
                Download
              </button>

              <button
                onClick={handleUploadAgain}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
              >
                <Upload size={17} />
                Upload Again
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            APPLICATION INFO
        ========================================== */}
        <div className="mb-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <Briefcase size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-violet-900">
                Your resume information will be used for job applications
              </h2>

              <p className="mt-1 text-sm leading-6 text-violet-700">
                The professional information extracted from your resume will
                be used when you apply for jobs. Make sure your resume
                information is accurate and up to date.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            PERSONAL + PROFESSIONAL
        ========================================== */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          {/* Personal Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <UserRound size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Personal Information
                </h2>

                <p className="text-xs text-slate-500">
                  Information extracted from your resume
                </p>
              </div>
            </div>

            <div className="space-y-4">

              {/* Name */}
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Full Name
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {parsedData?.personal?.fullName || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="mt-0.5 break-all text-sm text-slate-700">
                    {parsedData?.personal?.email || "Not available"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="mt-0.5 text-sm text-slate-700">
                    {parsedData?.personal?.phone || "Not available"}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="mt-0.5 text-sm text-slate-700">
                    {parsedData?.personal?.location || "Not available"}
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Professional Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <Briefcase size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Professional Information
                </h2>

                <p className="text-xs text-slate-500">
                  Your professional profile
                </p>
              </div>
            </div>

            <div className="space-y-5">

              {/* Headline */}
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Headline
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {parsedData?.professional?.headline ||
                    "Not available"}
                </p>
              </div>

              {/* Current Role */}
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Current Role
                </p>

                <p className="text-sm font-medium text-violet-700">
                  {parsedData?.professional?.currentRole ||
                    "Not available"}
                </p>
              </div>

              {/* Experience */}
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Years of Experience
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {parsedData?.professional?.yearsOfExperience ||
                    "Not available"}
                </p>
              </div>

            </div>
          </section>
        </div>

        {/* =========================================
            SUMMARY
        ========================================== */}
        {parsedData?.summary && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <UserRound size={19} />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Professional Summary
              </h2>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {parsedData.summary}
            </p>
          </section>
        )}

        {/* =========================================
            SKILLS
        ========================================== */}
        {skills.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <Briefcase size={19} />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Skills
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700"
                >
                  {typeof skill === "string"
                    ? skill
                    : skill?.name || ""}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            EXPERIENCE
        ========================================== */}
        {experience.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <Briefcase size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Experience
                </h2>

                <p className="text-xs text-slate-500">
                  Your professional work history
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="relative border-l-2 border-slate-200 pl-6"
                >
                  {/* Current Indicator */}
                  {item?.isCurrent === true && (
                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                  )}

                  {/* Role */}
                  <h3 className="text-base font-semibold text-slate-900">
                    {item?.role || "Role not available"}
                  </h3>

                  {/* Company */}
                  <p className="mt-1 text-sm font-medium text-violet-600">
                    {item?.company || "Company not available"}
                  </p>

                  {/* Dates */}
                  {(item?.startDate || item?.endDate) && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={14} />

                      <span>
                        {item?.startDate || "Unknown"}
                        {" - "}
                        {item?.endDate || "Present"}
                      </span>

                      {item?.isCurrent === true && (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-600">
                          Current
                        </span>
                      )}
                    </div>
                  )}

                  {/* Employment Type / Location */}
                  {(item?.employmentType || item?.location) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item?.employmentType && (
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                          {item.employmentType}
                        </span>
                      )}

                      {item?.location && (
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                          {item.location}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {item?.description && (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  )}

                  {/* Responsibilities */}
                  {Array.isArray(item?.responsibilities) &&
                    item.responsibilities.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold text-slate-800">
                          Responsibilities
                        </p>

                        <ul className="space-y-2">
                          {item.responsibilities.map(
                            (responsibility, responsibilityIndex) => (
                              <li
                                key={responsibilityIndex}
                                className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                                <span>{responsibility}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Technologies */}
                  {Array.isArray(item?.technologies) &&
                    item.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.technologies.map((technology, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            EDUCATION
        ========================================== */}
        {education.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <GraduationCap size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Education
                </h2>

                <p className="text-xs text-slate-500">
                  Academic background
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="font-semibold text-slate-900">
                    {item?.degree || "Degree not available"}
                  </h3>

                  {item?.fieldOfStudy && (
                    <p className="mt-1 text-sm text-slate-600">
                      {item.fieldOfStudy}
                    </p>
                  )}

                  <p className="mt-2 text-sm font-medium text-violet-600">
                    {item?.institution || "Institution not available"}
                  </p>

                  {(item?.startDate || item?.endDate) && (
                    <p className="mt-2 text-xs text-slate-500">
                      {item?.startDate || "Unknown"}
                      {" - "}
                      {item?.endDate || "Present"}
                    </p>
                  )}

                  {item?.location && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.location}
                    </p>
                  )}

                  {item?.isCurrent === true && (
                    <span className="mt-3 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                      Currently Studying
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            PROJECTS
        ========================================== */}
        {projects.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <FolderGit2 size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Projects
                </h2>

                <p className="text-xs text-slate-500">
                  Projects mentioned in your resume
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-slate-900">
                      {project?.name || "Project"}
                    </h3>

                    {project?.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-violet-600 transition hover:text-violet-800"
                        title="Open project"
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>

                  {project?.description && (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {project.description}
                    </p>
                  )}

                  {Array.isArray(project?.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((technology, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-md bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-200"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            CERTIFICATIONS
        ========================================== */}
        {certifications.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                <Award size={19} />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Certifications
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((certification, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <h3 className="font-semibold text-slate-900">
                    {certification?.name || "Certification"}
                  </h3>

                  {certification?.issuer && (
                    <p className="mt-1 text-sm text-violet-600">
                      {certification.issuer}
                    </p>
                  )}

                  {certification?.issueDate && (
                    <p className="mt-2 text-xs text-slate-500">
                      Issued: {certification.issueDate}
                    </p>
                  )}

                  {certification?.expiryDate && (
                    <p className="mt-1 text-xs text-slate-500">
                      Expires: {certification.expiryDate}
                    </p>
                  )}

                  {certification?.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-800"
                    >
                      View Credential
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            LANGUAGES
        ========================================== */}
        {languages.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                <Languages size={19} />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Languages
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {languages.map((language, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-medium text-slate-800">
                    {language?.name || "Language"}
                  </p>

                  {language?.proficiency && (
                    <p className="mt-1 text-xs text-slate-500">
                      {language.proficiency}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            PROFESSIONAL LINKS
        ========================================== */}
        {links.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <LinkIcon size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Professional Links
                </h2>

                <p className="text-xs text-slate-500">
                  Links extracted from your resume
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {link?.type || "Link"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {link?.url || "URL not available"}
                    </p>
                  </div>

                  {link?.url && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-2 text-violet-600 transition hover:bg-violet-100"
                      title={`Open ${link.type || "link"}`}
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            RESUME FILE INFO
        ========================================== */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Uploaded Resume
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {resume?.fileName || "Resume file"}
              </p>

              {resume?.uploadedAt && (
                <p className="mt-1 text-xs text-slate-400">
                  Uploaded on{" "}
                  {new Date(resume.uploadedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            <button
              onClick={handleDeleteResume}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={17} />
              Delete Resume
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ResumeUploaded;
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
} from "lucide-react";
import UploadResume from './UploadResume'; 
import { useState } from 'react';

const ResumeUploaded = ({ data }) => {

  const [uploadAgain, setUploadAgain] = useState(false);

  const resume = data?.resume;
  const parsedData = resume?.parsedData;

  const personal = parsedData?.personal;
  const professional = parsedData?.professional;

  const skills = parsedData?.skills || [];
  const experience = parsedData?.experience || [];
  const education = parsedData?.education || [];
  const projects = parsedData?.projects || [];
  const certifications = parsedData?.certifications || [];
  const languages = parsedData?.languages || [];
  const links = parsedData?.links || [];

  // View original resume
  const handleViewResume = () => {
    if (!resume?.fileUrl) return;

    window.open(resume.fileUrl, "_blank", "noopener,noreferrer");
  };

  // Download original resume
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

  // UI only for now
  const handleUploadAgain = () => {
    console.log("Upload again clicked");

    setUploadAgain(true);

  };

  if(uploadAgain) {
    return <UploadResume/>
  }


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              My Resume
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your resume has been uploaded and analyzed successfully.
            </p>
            <p className="mt-1 text-xs font-light text-red-500">
              If you replace your resume, the old one will be deleted and replaced with the new one.
            </p>

            {resume?.fileName && (
              <p className="mt-3 text-sm font-medium text-slate-700">
                {resume.fileName}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">

            <button
              onClick={handleViewResume}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <ExternalLink size={17} />
              View Resume
            </button>

            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              <Download size={17} />
              Download
            </button>

            <button
              onClick={handleUploadAgain}
              className="flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-medium text-violet-700 transition hover:bg-violet-100"
            >
              <Upload size={17} />
              Upload Again
            </button>

            {/* <button
              onClick={handleDeleteResume}
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={17} />
              Delete
            </button> */}

          </div>
        </div>


        {/* Personal + Professional */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {personal?.fullName || "Candidate"}
            </h2>

            {professional?.headline && (
              <p className="mt-2 text-base font-medium text-violet-600">
                {professional.headline}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {personal?.email && (
              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-600"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {personal.email}
                  </p>
                </div>
              </div>
            )}

            {personal?.phone && (
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-600"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {personal.phone}
                  </p>
                </div>
              </div>
            )}

            {personal?.location && (
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-600"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {personal.location}
                  </p>
                </div>
              </div>
            )}

            {professional?.currentRole && (
              <div className="flex items-start gap-3">
                <Briefcase
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-600"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Current Role
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {professional.currentRole}
                  </p>
                </div>
              </div>
            )}

          </div>

          {professional?.yearsOfExperience && (
            <div className="mt-6 rounded-xl bg-violet-50 px-4 py-3">
              <p className="text-sm text-violet-700">
                <span className="font-semibold">
                  Experience:
                </span>{" "}
                {professional.yearsOfExperience}
              </p>
            </div>
          )}

        </section>


        {/* Summary */}
        {parsedData?.summary && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Professional Summary
            </h2>

            <p className="leading-7 text-slate-600">
              {parsedData.summary}
            </p>

          </section>
        )}


        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700"
                >
                  {skill}
                </span>
              ))}

            </div>

          </section>
        )}


        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-violet-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Experience
              </h2>
            </div>

            <div className="space-y-8">

              {experience.map((item, index) => (
                <div
                  key={index}
                  className="border-l-2 border-violet-200 pl-5"
                >

                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.role || "Role not specified"}
                  </h3>

                  {item.company && (
                    <p className="mt-1 font-medium text-violet-600">
                      {item.company}
                    </p>
                  )}

                  {(item.startDate || item.endDate) && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.startDate || ""}
                      {" - "}
                      {item.isCurrent
                        ? "Present"
                        : item.endDate || ""}
                    </p>
                  )}

                  {item.employmentType && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.employmentType}
                    </p>
                  )}

                  {item.location && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.location}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-4 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  )}

                  {item.responsibilities?.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                      {item.responsibilities.map(
                        (responsibility, responsibilityIndex) => (
                          <li key={responsibilityIndex}>
                            {responsibility}
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {item.technologies?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">

                      {item.technologies.map(
                        (technology, technologyIndex) => (
                          <span
                            key={technologyIndex}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {technology}
                          </span>
                        )
                      )}

                    </div>
                  )}

                </div>
              ))}

            </div>

          </section>
        )}


        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">
              <GraduationCap
                size={20}
                className="text-violet-600"
              />

              <h2 className="text-lg font-bold text-slate-900">
                Education
              </h2>
            </div>

            <div className="space-y-5">

              {education.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-5"
                >

                  <h3 className="font-semibold text-slate-900">
                    {item.degree || "Degree not specified"}
                  </h3>

                  {item.fieldOfStudy && (
                    <p className="mt-1 text-sm text-violet-600">
                      {item.fieldOfStudy}
                    </p>
                  )}

                  {item.institution && (
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {item.institution}
                    </p>
                  )}

                  {(item.startDate || item.endDate) && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.startDate || ""}
                      {" - "}
                      {item.isCurrent
                        ? "Present"
                        : item.endDate || ""}
                    </p>
                  )}

                  {item.location && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.location}
                    </p>
                  )}

                </div>
              ))}

            </div>

          </section>
        )}


        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">
              <FolderGit2
                size={20}
                className="text-violet-600"
              />

              <h2 className="text-lg font-bold text-slate-900">
                Projects
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 p-5"
                >

                  <h3 className="font-semibold text-slate-900">
                    {project.name || "Untitled Project"}
                  </h3>

                  {project.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {project.description}
                    </p>
                  )}

                  {project.technologies?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">

                      {project.technologies.map(
                        (technology, technologyIndex) => (
                          <span
                            key={technologyIndex}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {technology}
                          </span>
                        )
                      )}

                    </div>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                      <ExternalLink size={15} />
                      View Project
                    </a>
                  )}

                </div>
              ))}

            </div>

          </section>
        )}


        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">
              <Award size={20} className="text-violet-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">

              {certifications.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >

                  <h3 className="font-semibold text-slate-900">
                    {item.name || "Certification"}
                  </h3>

                  {item.issuer && (
                    <p className="mt-1 text-sm text-violet-600">
                      {item.issuer}
                    </p>
                  )}

                  {item.issueDate && (
                    <p className="mt-1 text-sm text-slate-500">
                      Issued: {item.issueDate}
                    </p>
                  )}

                  {item.expiryDate && (
                    <p className="mt-1 text-sm text-slate-500">
                      Expires: {item.expiryDate}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-600"
                    >
                      <ExternalLink size={15} />
                      View Credential
                    </a>
                  )}

                </div>
              ))}

            </div>

          </section>
        )}


        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">
              <Languages size={20} className="text-violet-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Languages
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">

              {languages.map((language, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                >

                  <p className="text-sm font-semibold text-slate-800">
                    {language.name}
                  </p>

                  {language.proficiency && (
                    <p className="mt-1 text-xs text-slate-500">
                      {language.proficiency}
                    </p>
                  )}

                </div>
              ))}

            </div>

          </section>
        )}


        {/* Links */}
        {links.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">
              <LinkIcon size={20} className="text-violet-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Professional Links
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">

              {links.map((link, index) => (
                link.url && (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  >
                    <LinkIcon size={15} />
                    {link.type || "Link"}
                  </a>
                )
              ))}

            </div>

          </section>
        )}

      </div>
    </div>
  );
};

export default ResumeUploaded;

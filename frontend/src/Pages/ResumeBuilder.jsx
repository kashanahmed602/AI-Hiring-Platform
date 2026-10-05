import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  FolderGit2,
  Plus,
  Trash2,
  Download,
  Save,
} from "lucide-react";

import { jsPDF } from "jspdf";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const normalizeProfileUrl = (url) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [summary, setSummary] = useState("");

  const [experiences, setExperiences] = useState([
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [skills, setSkills] = useState([]);

  const [skillCategory, setSkillCategory] = useState("");

  const [skillInput, setSkillInput] = useState("");

  const [projects, setProjects] = useState([
    {
      name: "",
      technologies: "",
      description: "",
      url: "",
    },
  ]);


  // =====================================================
  // PERSONAL INFO
  // =====================================================

  const handlePersonalChange = (field, value) => {

    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

  };


  // =====================================================
  // EXPERIENCE
  // =====================================================

  const addExperience = () => {

    setExperiences((prev) => [
      ...prev,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);

  };


  const removeExperience = (index) => {

    setExperiences((prev) =>
      prev.filter((_, i) => i !== index)
    );

  };


  const updateExperience = (index, field, value) => {

    setExperiences((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );

  };


  // =====================================================
  // EDUCATION
  // =====================================================

  const addEducation = () => {

    setEducation((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
      },
    ]);

  };


  const removeEducation = (index) => {

    setEducation((prev) =>
      prev.filter((_, i) => i !== index)
    );

  };


  const updateEducation = (index, field, value) => {

    setEducation((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );

  };


  // =====================================================
  // SKILLS
  // =====================================================

  const addSkill = () => {

    const category = skillCategory.trim();
    const skill = skillInput.trim();

    if (!category || !skill) return;

    if (skills.some((item) =>
      item.category.toLowerCase() === category.toLowerCase() &&
      item.name.toLowerCase() === skill.toLowerCase()
    )) {
      setSkillInput("");
      return;
    }

    setSkills((prev) => [
      ...prev,
      { category, name: skill },
    ]);

    setSkillInput("");

  };


  const removeSkill = (skillToRemove) => {

    setSkills((prev) =>
      prev.filter(
        (skill) => skill !== skillToRemove
      )
    );

  };


  // =====================================================
  // PROJECTS
  // =====================================================

  const addProject = () => {

    setProjects((prev) => [
      ...prev,
      {
        name: "",
        technologies: "",
        description: "",
        url: "",
      },
    ]);

  };


  const removeProject = (index) => {

    setProjects((prev) =>
      prev.filter((_, i) => i !== index)
    );

  };


  const updateProject = (index, field, value) => {

    setProjects((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );

  };


  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

  const handleDownloadPDF = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);

    const fileName = (personalInfo.name || "resume")
      .trim()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "resume";

    try {
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 48;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      const addText = (text, fontSize = 9, bold = false, align = "left") => {
        if (!text) return;

        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(fontSize);

        const lines = pdf.splitTextToSize(String(text), contentWidth);
        const lineHeight = fontSize * 1.4;

        lines.forEach((line) => {
          if (y + lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }

          pdf.text(line, align === "center" ? pageWidth / 2 : margin, y, {
            align,
          });
          y += lineHeight;
        });
      };

      const addLeftRightText = (leftText, rightText, fontSize = 9, bold = false) => {
        if (!leftText && !rightText) return;

        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(fontSize);

        const rightWidth = rightText ? pdf.getTextWidth(rightText) : 0;
        const leftWidth = rightText
          ? Math.max(contentWidth - rightWidth - 12, contentWidth * 0.5)
          : contentWidth;
        const lines = leftText
          ? pdf.splitTextToSize(leftText, leftWidth)
          : [""];
        const lineHeight = fontSize * 1.4;

        lines.forEach((line, index) => {
          if (y + lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }

          if (line) pdf.text(line, margin, y);
          if (index === 0 && rightText) {
            pdf.text(rightText, pageWidth - margin, y, { align: "right" });
          }
          y += lineHeight;
        });
      };

      const addSection = (title) => {
        y += 14;
        addText(title.toUpperCase(), 11, true);
        pdf.setDrawColor(180, 190, 200);
        pdf.line(margin, y - 3, pageWidth - margin, y - 3);
        y += 10;
      };

      const addProfileLinks = () => {
        const links = [
          { label: "LinkedIn", url: personalInfo.linkedin },
          { label: "GitHub", url: personalInfo.github },
          { label: "Portfolio", url: personalInfo.portfolio },
        ].filter((link) => link.url);

        if (!links.length) return;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        const separator = " | ";
        const separatorWidth = pdf.getTextWidth(separator);
        const totalWidth = links.reduce(
          (width, link) => width + pdf.getTextWidth(link.label),
          0
        ) + separatorWidth * (links.length - 1);
        let x = (pageWidth - totalWidth) / 2;

        links.forEach((link, index) => {
          const labelWidth = pdf.getTextWidth(link.label);
          pdf.text(link.label, x, y);
          pdf.link(x, y - 9, labelWidth, 12, {
            url: normalizeProfileUrl(link.url),
          });
          x += labelWidth;

          if (index < links.length - 1) {
            pdf.text(separator, x, y);
            x += separatorWidth;
          }
        });

        y += 14;
      };

      addText(personalInfo.name || "Your Name", 20, true, "center");
      addText(personalInfo.title || "Professional Title", 11, false, "center");
      addText(
        [personalInfo.email, personalInfo.phone, personalInfo.location]
          .filter(Boolean)
          .join(" | "),
        9,
        false,
        "center"
      );
      addProfileLinks();
      y += 5;
      pdf.setDrawColor(150, 160, 170);
      pdf.line(margin, y, pageWidth - margin, y);

      if (summary) {
        addSection("Professional Summary");
        addText(summary);
      }

      const completedExperiences = experiences.filter((item) =>
        item.jobTitle || item.company || item.description
      );
      if (completedExperiences.length) {
        addSection("Experience");
        completedExperiences.forEach((item) => {
          addLeftRightText(
            item.jobTitle,
            [item.startDate, item.endDate].filter(Boolean).join(" - "),
            10,
            true
          );
          addText(item.company);
          addText(item.description);
          y += 9;
        });
      }

      const completedEducation = education.filter(
        (item) => item.degree || item.institution
      );
      if (completedEducation.length) {
        addSection("Education");
        completedEducation.forEach((item) => {
          addLeftRightText(
            item.degree,
            [item.startYear, item.endYear].filter(Boolean).join(" - "),
            10,
            true
          );
          addText(item.institution);
          y += 9;
        });
      }

      if (skills.length) {
        addSection("Skills");
        [...new Set(skills.map((skill) => skill.category))].forEach((category) => {
          const categorySkills = skills
            .filter((skill) => skill.category === category)
            .map((skill) => skill.name);
          addText(`${category}: ${categorySkills.join(", ")}`);
        });
      }

      const completedProjects = projects.filter(
        (project) => project.name || project.description
      );
      if (completedProjects.length) {
        addSection("Projects");
        completedProjects.forEach((project) => {
          addText(project.name, 10, true);
          if (project.technologies) {
            addText(`Technologies: ${project.technologies}`);
          }
          addText(project.description);
          addText(project.url);
          y += 5;
        });
      }

      pdf.save(`${fileName}-resume.pdf`);

      navigate("/candidate/resume/upload");
    } catch (error) {
      console.error("Resume PDF download failed:", error);
      window.alert("Could not download your resume. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };


  return (

    <>

      {/* =================================================
          PRINT CSS
      ================================================= */}

      <style>{`

        @media print {

          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          .resume-paper,
          .resume-paper * {
            visibility: visible;
          }

          .resume-paper {
            position: absolute;
            left: 0;
            top: 0;

            width: 210mm;
            min-height: 297mm;

            margin: 0 !important;

            padding: 16mm 18mm !important;

            background: white !important;

            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .resume-paper h1,
          .resume-paper h2,
          .resume-paper h3,
          .resume-paper p,
          .resume-paper span,
          .resume-paper li {
            color: #000 !important;
          }

          .resume-paper a {
            color: #000 !important;
            text-decoration: none !important;
          }

          .resume-section {
            break-inside: avoid;
          }

        }

      `}</style>


      {/* =================================================
          BUILDER
      ================================================= */}

      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="max-w-7xl mx-auto mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Resume Builder
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Create a professional, ATS-friendly resume directly in HireFlow.
              </p>

            </div>


            <div className="flex items-center gap-3">

              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <Save size={17} />

                Save Draft

              </button>


              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition disabled:cursor-wait disabled:opacity-70"
              >

                <Download size={17} />

                {isGeneratingPdf ? "Preparing PDF..." : "Download PDF"}

              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            MAIN
        ================================================= */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6">


          {/* =================================================
              LEFT FORM
          ================================================= */}

          <div className="space-y-6">


            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <User size={19} />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Basic information for your resume
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                {/* Name */}

                <div className="sm:col-span-2">

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) =>
                        handlePersonalChange(
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Kashan Ahmed"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                    />

                  </div>

                </div>


                {/* Title */}

                <div className="sm:col-span-2">

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Professional Title
                  </label>

                  <input
                    type="text"
                    value={personalInfo.title}
                    onChange={(e) =>
                      handlePersonalChange(
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Frontend Developer"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                  />

                </div>


                {/* Email */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) =>
                        handlePersonalChange(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="you@example.com"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                    />

                  </div>

                </div>


                {/* Phone */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        handlePersonalChange(
                          "phone",
                          e.target.value
                        )
                      }
                      placeholder="+92 300 1234567"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                    />

                  </div>

                </div>


                {/* Location */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) =>
                        handlePersonalChange(
                          "location",
                          e.target.value
                        )
                      }
                      placeholder="Karachi, Pakistan"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                    />

                  </div>

                </div>


                {/* LinkedIn */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    LinkedIn
                  </label>

                  <input
                    type="url"
                    value={personalInfo.linkedin}
                    onChange={(e) =>
                      handlePersonalChange(
                        "linkedin",
                        e.target.value
                      )
                    }
                    placeholder="linkedin.com/in/username"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                  />

                </div>


                {/* GitHub */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    GitHub
                  </label>

                  <input
                    type="url"
                    value={personalInfo.github}
                    onChange={(e) =>
                      handlePersonalChange(
                        "github",
                        e.target.value
                      )
                    }
                    placeholder="github.com/username"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                  />

                </div>


                {/* Portfolio */}

                <div className="sm:col-span-2">

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Portfolio Website
                  </label>

                  <div className="relative">

                    <Globe
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="url"
                      value={personalInfo.portfolio}
                      onChange={(e) =>
                        handlePersonalChange(
                          "portfolio",
                          e.target.value
                        )
                      }
                      placeholder="https://yourportfolio.com"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm"
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <FileText size={19} />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Professional Summary
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    A short summary about your professional background
                  </p>

                </div>

              </div>


              <textarea
                rows="5"
                value={summary}
                onChange={(e) =>
                  setSummary(e.target.value)
                }
                placeholder="Write a concise professional summary..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 text-sm resize-none"
              />

            </div>


            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                    <BriefcaseBusiness size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Experience
                    </h2>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Add your professional experience
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition"
                >

                  <Plus size={15} />

                  Add Experience

                </button>

              </div>


              <div className="space-y-4">

                {experiences.map((experience, index) => (

                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl p-5"
                  >

                    <div className="flex justify-between gap-3 mb-4">

                      <p className="text-sm font-semibold text-slate-700">
                        Experience {index + 1}
                      </p>

                      {experiences.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeExperience(index)
                          }
                          className="text-slate-400 hover:text-red-500 transition"
                        >

                          <Trash2 size={16} />

                        </button>

                      )}

                    </div>


                    <div className="space-y-4">

                      <input
                        type="text"
                        value={experience.jobTitle}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "jobTitle",
                            e.target.value
                          )
                        }
                        placeholder="Job Title"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                      />

                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Company Name"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                      />


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "startDate",
                              e.target.value
                            )
                          }
                          placeholder="Start Date"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                        />

                        <input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                          placeholder="End Date / Present"
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                        />

                      </div>


                      <textarea
                        rows="4"
                        value={experience.description}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your responsibilities and achievements..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm resize-none"
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                EDUCATION
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                    <GraduationCap size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Education
                    </h2>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Add your academic background
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={addEducation}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition"
                >

                  <Plus size={15} />

                  Add Education

                </button>

              </div>


              <div className="space-y-4">

                {education.map((item, index) => (

                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl p-5 space-y-4"
                  >

                    <div className="flex justify-between">

                      <p className="text-sm font-semibold text-slate-700">
                        Education {index + 1}
                      </p>

                      {education.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeEducation(index)
                          }
                          className="text-slate-400 hover:text-red-500"
                        >

                          <Trash2 size={16} />

                        </button>

                      )}

                    </div>


                    <input
                      type="text"
                      value={item.degree}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                      placeholder="Degree / Program"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                    />


                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      placeholder="University / Institution"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                    />


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <input
                        type="text"
                        value={item.startYear}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            "startYear",
                            e.target.value
                          )
                        }
                        placeholder="Start Year"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                      />

                      <input
                        type="text"
                        value={item.endYear}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            "endYear",
                            e.target.value
                          )
                        }
                        placeholder="End Year / Present"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                SKILLS
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Code2 size={19} />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Skills
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Add skills relevant to your career
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_44px] gap-2">

                <input
                  type="text"
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value)}
                  placeholder="Category, e.g. Frontend"
                  aria-label="Skill category"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                />

                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Skill, e.g. React.js"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                />


                <button
                  type="button"
                  onClick={addSkill}
                  className="w-11 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition"
                >

                  <Plus size={18} />

                </button>

              </div>


              <div className="flex flex-wrap gap-2 mt-4">

                {skills.map((skill) => (

                  <div
                    key={`${skill.category}-${skill.name}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium"
                  >

                    <span>{skill.category}: {skill.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(skill)
                      }
                      className="text-violet-400 hover:text-red-500"
                    >
                      ×
                    </button>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                PROJECTS
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                    <FolderGit2 size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Projects
                    </h2>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Showcase your relevant projects
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={addProject}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition"
                >

                  <Plus size={15} />

                  Add Project

                </button>

              </div>


              <div className="space-y-4">

                {projects.map((project, index) => (

                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl p-5 space-y-4"
                  >

                    <div className="flex justify-between">

                      <p className="text-sm font-semibold text-slate-700">
                        Project {index + 1}
                      </p>

                      {projects.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeProject(index)
                          }
                          className="text-slate-400 hover:text-red-500"
                        >

                          <Trash2 size={16} />

                        </button>

                      )}

                    </div>


                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Project Name"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                    />


                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "technologies",
                          e.target.value
                        )
                      }
                      placeholder="Technologies Used"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                    />


                    <textarea
                      rows="4"
                      value={project.description}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe the project, your role and key achievements..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm resize-none"
                    />


                    <input
                      type="url"
                      value={project.url}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "url",
                          e.target.value
                        )
                      }
                      placeholder="Project URL (optional)"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:border-violet-500 text-sm"
                    />

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT — PREVIEW
          ================================================= */}

          <div className="xl:sticky xl:top-6 self-start">

            <div className="bg-white border border-slate-200 rounded-3xl p-5">


              {/* Preview Header — NOT printed */}

              <div className="flex items-center justify-between mb-4">

                <div>

                  <h2 className="font-bold text-slate-900">
                    Resume Preview
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    ATS-friendly resume format
                  </p>

                </div>

                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  ATS Friendly
                </span>

              </div>


              {/* =================================================
                  ACTUAL RESUME PAPER
              ================================================= */}

              <div className="resume-paper bg-white border border-slate-200 shadow-sm min-h-[1000px] p-8 sm:p-10">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="text-center border-b border-slate-300 pb-5">

                  <h1 className="text-2xl font-bold text-slate-900">

                    {personalInfo.name || "Your Name"}

                  </h1>


                  <p className="text-sm font-medium text-slate-600 mt-1">

                    {personalInfo.title || "Professional Title"}

                  </p>


                  <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-3 text-xs text-slate-500">
                    {[
                      personalInfo.email,
                      personalInfo.phone,
                      personalInfo.location,
                    ].filter(Boolean).map((value, index) => (
                      <span key={`${value}-${index}`} className="inline-flex items-center gap-2">
                        {index > 0 && <span aria-hidden="true">|</span>}
                        {value}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-2 text-xs">
                    {[
                      { label: "LinkedIn", url: personalInfo.linkedin },
                      { label: "GitHub", url: personalInfo.github },
                      { label: "Portfolio", url: personalInfo.portfolio },
                    ].filter((link) => link.url).map((link, index) => (
                      <span key={link.label} className="inline-flex items-center gap-2">
                        {index > 0 && <span aria-hidden="true">|</span>}
                        <a
                          href={normalizeProfileUrl(link.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-900 underline decoration-slate-300 underline-offset-2"
                        >
                          {link.label}
                        </a>
                      </span>
                    ))}
                  </div>

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                {summary && (

                  <div className="resume-section mt-6">

                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 border-b border-slate-300 pb-1">
                      Professional Summary
                    </h3>

                    <p className="text-xs leading-5 text-slate-700 mt-3 whitespace-pre-line">
                      {summary}
                    </p>

                  </div>

                )}


                {/* =================================================
                    EXPERIENCE
                ================================================= */}

                {experiences.some(
                  (item) =>
                    item.jobTitle ||
                    item.company ||
                    item.description
                ) && (

                  <div className="resume-section mt-6">

                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 border-b border-slate-300 pb-1">
                      Experience
                    </h3>


                    {experiences.map((experience, index) => {

                      if (
                        !experience.jobTitle &&
                        !experience.company &&
                        !experience.description
                      ) {
                        return null;
                      }

                      return (

                        <div
                          key={index}
                          className="mt-3"
                        >

                          <div className="flex justify-between gap-3">

                            <div>

                              <p className="text-sm font-bold text-slate-900">
                                {experience.jobTitle}
                              </p>

                              <p className="text-xs font-medium text-slate-600">
                                {experience.company}
                              </p>

                            </div>


                            {(experience.startDate ||
                              experience.endDate) && (

                              <p className="text-xs text-slate-500 whitespace-nowrap">

                                {experience.startDate}

                                {experience.startDate &&
                                  experience.endDate &&
                                  " – "}

                                {experience.endDate}

                              </p>

                            )}

                          </div>


                          {experience.description && (

                            <p className="mt-2 text-xs leading-5 text-slate-700 whitespace-pre-line">
                              {experience.description}
                            </p>

                          )}

                        </div>

                      );

                    })}

                  </div>

                )}


                {/* =================================================
                    EDUCATION
                ================================================= */}

                {education.some(
                  (item) =>
                    item.degree ||
                    item.institution
                ) && (

                  <div className="resume-section mt-6">

                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 border-b border-slate-300 pb-1">
                      Education
                    </h3>


                    {education.map((item, index) => {

                      if (
                        !item.degree &&
                        !item.institution
                      ) {
                        return null;
                      }

                      return (

                        <div
                          key={index}
                          className="mt-3 flex justify-between gap-3"
                        >

                          <div>

                            <p className="text-sm font-bold text-slate-900">
                              {item.degree}
                            </p>

                            <p className="text-xs text-slate-600">
                              {item.institution}
                            </p>

                          </div>


                          {(item.startYear ||
                            item.endYear) && (

                            <p className="text-xs text-slate-500 whitespace-nowrap">

                              {item.startYear}

                              {item.startYear &&
                                item.endYear &&
                                " – "}

                              {item.endYear}

                            </p>

                          )}

                        </div>

                      );

                    })}

                  </div>

                )}


                {/* =================================================
                    SKILLS
                ================================================= */}

                {skills.length > 0 && (

                  <div className="resume-section mt-6">

                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 border-b border-slate-300 pb-1">
                      Skills
                    </h3>

                    <div className="mt-3 space-y-1 text-xs leading-5 text-slate-700">
                      {[...new Set(skills.map((skill) => skill.category))].map((category) => {
                        const categorySkills = skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => skill.name);

                        if (!categorySkills.length) return null;

                        return (
                          <p key={category}>
                            <span className="font-semibold text-slate-900">{category}: </span>
                            {categorySkills.join(", ")}
                          </p>
                        );
                      })}
                    </div>

                  </div>

                )}


                {/* =================================================
                    PROJECTS
                ================================================= */}

                {projects.some(
                  (project) =>
                    project.name ||
                    project.description
                ) && (

                  <div className="resume-section mt-6">

                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 border-b border-slate-300 pb-1">
                      Projects
                    </h3>


                    {projects.map((project, index) => {

                      if (
                        !project.name &&
                        !project.description
                      ) {
                        return null;
                      }

                      return (

                        <div
                          key={index}
                          className="mt-3"
                        >

                          <p className="text-sm font-bold text-slate-900">
                            {project.name}
                          </p>


                          {project.technologies && (

                            <p className="text-xs text-slate-600 mt-1">
                              Technologies:{" "}
                              {project.technologies}
                            </p>

                          )}


                          {project.description && (

                            <p className="text-xs leading-5 text-slate-700 mt-2 whitespace-pre-line">
                              {project.description}
                            </p>

                          )}


                          {project.url && (

                            <p className="text-xs text-slate-700 mt-1">
                              {project.url}
                            </p>

                          )}

                        </div>

                      );

                    })}

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

};


export default ResumeBuilder;
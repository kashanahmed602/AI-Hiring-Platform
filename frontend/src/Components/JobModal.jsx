import axios from "axios";
import {
  X,
  BriefcaseBusiness,
  MapPin,
  Building2,
  DollarSign,
  Clock3,
  Sparkles,
} from "lucide-react";

import { useState } from "react";

const JobModal = ({ onClose }) => {
  const [jobData, setJobData] = useState({
    title: "",
    // company: "",
    location: "",
    jobType: "Full-time",
    workMode: "On-site",
    salary: "",
    experience: "",
    description: "",
    skills: "",
  });

  const createJob = async () => {
    try{
        const response = await axios.post("http://localhost:3001/api/v1/createJob", {
            Title: jobData.title,
            Location: jobData.location,
            JobType: jobData.jobType,
            WorkMode: jobData.workMode,
            Salary: jobData.salary,
            Experience: jobData.experience,
            Description: jobData.description,
            RequiredSkills: jobData.skills
        },
        {
            withCredentials: true,
        }
    )
    alert("Job Created Successfully");
    // onClose();

}catch(error){
alert("Error creating job: " + error.message);
    }
  }

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   createJob();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Create New Job
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Add a new position to your hiring workspace
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={19} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Job Title
            </label>

            <div className="relative">
              <BriefcaseBusiness
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                placeholder="e.g. Senior React Developer"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>
          </div>

          {/* Company + Location */}
          {/* <div className="grid sm:grid-cols-2 gap-4"> */}

            {/* <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Company
              </label>

              <div className="relative">
                <Building2
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  placeholder="Acme Technologies"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>
            </div> */}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  placeholder="Karachi, Pakistan"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>
            </div>

          {/* </div> */}

          {/* Job Type + Work Mode */}
          <div className="grid sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Job Type
              </label>

              <select
                name="jobType"
                value={jobData.jobType}
                onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Work Mode
              </label>

              <select
                name="workMode"
                value={jobData.workMode}
                onChange={(e) => setJobData({ ...jobData, workMode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

          </div>

          {/* Salary + Experience */}
          <div className="grid sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Salary
              </label>

              <div className="relative">
                <DollarSign
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="salary"
                  value={jobData.salary}
                  onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                  placeholder="e.g. $2,000 - $3,000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Experience
              </label>

              <div className="relative">
                <Clock3
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="experience"
                  value={jobData.experience}
                  onChange={(e) => setJobData({ ...jobData, experience: e.target.value })}
                  placeholder="e.g. 2-4 years"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Required Skills
            </label>

            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={(e) => setJobData({ ...jobData, skills: e.target.value })}
              placeholder="React, Node.js, MongoDB, JavaScript"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <p className="mt-1.5 text-[11px] text-slate-400">
              Separate skills with commas
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Job Description
            </label>

            <textarea
              name="description"
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              rows="5"
              placeholder="Describe the role, responsibilities and requirements..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              required
            />
          </div>

          {/* AI Info */}
          <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">

            <Sparkles
              size={18}
              className="text-blue-600 shrink-0 mt-0.5"
            />

            <div>
              <p className="text-xs font-semibold text-blue-800">
                AI Hiring Intelligence
              </p>

              <p className="text-[11px] text-blue-600 mt-1 leading-relaxed">
                HireFlow will use this job information to help match
                candidates based on skills, experience and role requirements.
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Create Job
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default JobModal;
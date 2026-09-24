import {
  BriefcaseBusiness,
  MapPin,
  Wallet,
  X,
  FileText,
  Code2,
  Monitor,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

const EditJobModal = ({ job, onClose, onUpdated }) => {
  const [jobData, setJobData] = useState({
    Title: "",
    Location: "",
    JobType: "",
    WorkMode: "",
    Salary: "",
    RequiredSkills: "",
    Description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!job) return;

    setJobData({
      Title: job.Title || "",
      Location: job.Location || "",
      JobType: job.JobType || "",
      WorkMode: job.WorkMode || "",
      Salary: job.Salary || "",
      RequiredSkills: Array.isArray(job.RequiredSkills)
        ? job.RequiredSkills.join(", ")
        : job.RequiredSkills || "",
      Description: job.Description || "",
    });
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");

    if (!jobData.Title.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!jobData.Location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!jobData.Description.trim()) {
      setError("Job description is required.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        Title: jobData.Title,
        Location: jobData.Location,
        JobType: jobData.JobType,
        WorkMode: jobData.WorkMode,
        Salary: jobData.Salary,
        RequiredSkills: jobData.RequiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        Description: jobData.Description,
      };

      const response = await axios.put(
        `http://localhost:3001/api/v1/jobUpdated/${job._id}`,
        payload,
        {
          withCredentials: true,
        }
      );

      console.log("Updated Job:", response.data);

      if (onUpdated) {
        onUpdated(response.data);
      }

      onClose();
    } catch (error) {
      console.log(
        "Update Job Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to update job."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <BriefcaseBusiness size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Edit Job
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Update your job posting details
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="overflow-y-auto max-h-[calc(92vh-80px)]"
        >

          <div className="p-6 space-y-5">

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Title + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Title */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Title
                </label>

                <div className="relative">

                  <BriefcaseBusiness
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="Title"
                    value={jobData.Title}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
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
                    name="Location"
                    value={jobData.Location}
                    onChange={handleChange}
                    placeholder="e.g. Karachi"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                  />

                </div>

              </div>

            </div>

            {/* Job Type + Work Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Job Type */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Type
                </label>

                <select
                  name="JobType"
                  value={jobData.JobType}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>

              </div>

              {/* Work Mode */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work Mode
                </label>

                <div className="relative">

                  <Monitor
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                  <select
                    name="WorkMode"
                    value={jobData.WorkMode}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white outline-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>

                </div>

              </div>

            </div>

            {/* Salary */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Salary
              </label>

              <div className="relative">

                <Wallet
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="Salary"
                  value={jobData.Salary}
                  onChange={handleChange}
                  placeholder="e.g. 50000 - 70000"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                />

              </div>

            </div>

            {/* Skills */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Required Skills
              </label>

              <div className="relative">

                <Code2
                  size={17}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="text"
                  name="RequiredSkills"
                  value={jobData.RequiredSkills}
                  onChange={handleChange}
                  placeholder="ReactJs, MongoDB, NextJS"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                />

              </div>

              <p className="text-[11px] text-slate-400 mt-1.5">
                Separate skills with commas.
              </p>

            </div>

            {/* Description */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Description
              </label>

              <div className="relative">

                <FileText
                  size={17}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <textarea
                  name="Description"
                  value={jobData.Description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe the role, responsibilities and requirements..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none resize-none text-sm text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition"
                />

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditJobModal;
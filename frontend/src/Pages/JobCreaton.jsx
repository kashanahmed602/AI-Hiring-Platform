import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  MapPin,
  Menu,
  Pencil,
  Plus,
  Trash2,
  Wallet,
} from "lucide-react";

import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import ViewJobModal from "../Components/ViewJobModal";
import EditJobModal from "../Components/EditJobModal";
import axios from "axios";


// ======================================================
// JOBS SECTION
// ======================================================

export const JobsSection = ({
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {

  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);


  // ======================================================
  // FETCH JOBS
  // ======================================================

  const fetchJobs = async () => {
    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:3001/api/v1/jobs",
        {
          withCredentials: true,
        }
      );

      setJobsData(response.data.jobs || []);

      console.log(
        "Fetched Jobs:",
        response.data.jobs
      );

    } catch (error) {

      console.log(
        "Error Fetching jobs:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);


  // ======================================================
  // DELETE JOB
  // ======================================================

  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {

      setLoading(true);

      const response = await axios.delete(
        `http://localhost:3001/api/v1/jobDeleted/${id}`,
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      setJobsData((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );

    } catch (error) {

      console.log(
        "Delete Job Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete job"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================================
  // UPDATE JOB IN UI AFTER EDIT
  // ======================================================

  const handleUpdatedJob = (updatedJob) => {

    setJobsData((prevJobs) =>
      prevJobs.map((job) =>
        job._id === updatedJob._id
          ? updatedJob
          : job
      )
    );

  };


  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            All Jobs
          </h2>

          <p className="text-sm text-slate-400">
            Manage your posted jobs
          </p>

        </div>

        <div className="px-3 py-1 rounded-lg bg-violet-50 text-violet-700 text-sm font-semibold">
          {jobsData.length} Jobs
        </div>

      </div>


      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-slate-400">
          Loading jobs...
        </div>
      )}


      {/* Jobs */}
      {!loading && (
        <div className="space-y-4">

          {jobsData.map((job) => (

            <div
              key={job._id}
              className="border border-slate-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-sm transition"
            >

              <div className="flex items-start gap-4">

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <BriefcaseBusiness size={22} />
                </div>


                {/* Job Info */}
                <div className="flex-1 min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-bold text-slate-900">
                      {job.Title}
                    </h3>

                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                      {job.JobType}
                    </span>

                  </div>


                  <p className="text-sm text-slate-500 mt-1">
                    {job.WorkMode}
                  </p>


                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">

                    {/* Location */}
                    <div className="flex items-center gap-1">
                      <MapPin size={15} />
                      {job.Location}
                    </div>


                    {/* Salary */}
                    <div className="flex items-center gap-1">
                      <Wallet size={15} />
                      {job.Salary}
                    </div>


                    {/* Date */}
                    <div className="flex items-center gap-1">

                      <CalendarDays size={15} />

                      {job.createdAt
                        ? new Date(
                            job.createdAt
                          ).toLocaleDateString()
                        : "N/A"}

                    </div>

                  </div>

                </div>


                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">

                  {/* View */}
                  <button
                    type="button"
                    onClick={() => onView(job)}
                    title="View Job"
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-violet-100 text-slate-600 hover:text-violet-600 transition flex items-center justify-center"
                  >
                    <Eye size={17} />
                  </button>


                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => onEdit(job)}
                    title="Edit Job"
                    className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition flex items-center justify-center"
                  >
                    <Pencil size={17} />
                  </button>


                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => deleteJob(job._id)}
                    title="Delete Job"
                    className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition flex items-center justify-center"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            </div>

          ))}


          {/* Empty */}
          {jobsData.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No jobs found.
            </div>
          )}

        </div>
      )}

    </div>
  );
};


// ======================================================
// JOB CREATION / JOBS PAGE
// ======================================================

const JobCreation = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  // ======================================================
  // VIEW MODAL
  // ======================================================

  const [selectedJob, setSelectedJob] = useState(null);
  const [viewJobModal, setViewJobModal] = useState(false);


  // ======================================================
  // EDIT MODAL
  // ======================================================

  const [selectedEditJob, setSelectedEditJob] = useState(null);
  const [editJobModal, setEditJobModal] = useState(false);


  // ======================================================
  // VIEW JOB
  // ======================================================

  const handleViewJob = (job) => {

    setSelectedJob(job);
    setViewJobModal(true);

  };


  // ======================================================
  // EDIT JOB
  // ======================================================

  const handleEditJob = (job) => {

    console.log("Edit Job:", job);

    setSelectedEditJob(job);
    setEditJobModal(true);

  };


  // ======================================================
  // DELETE JOB
  // ======================================================

  const handleDeleteJob = (jobId) => {

    console.log("Delete Job:", jobId);

  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl" />

      </div>


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <div
        className={`fixed z-40 top-0 left-0 h-screen w-64 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <Sidebar
          role="recruiter"
          user={{
            name: "Acme Technologies",
            headline: "Hiring Workspace",
          }}
          onClose={() => setSidebarOpen(false)}
        />

      </div>


      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="lg:ml-64 min-h-screen relative">


        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-20">

          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">


            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
            >
              <Menu size={20} />
            </button>


            {/* Desktop Header */}
            <div className="hidden lg:block">

              <p className="text-xs text-slate-400">
                Recruiter Workspace
              </p>

              <h1 className="text-lg font-bold text-slate-900">
                Jobs
              </h1>

            </div>


            {/* Header Actions */}
            <div className="flex items-center gap-3 ml-auto">

              {/* Notification */}
              <button
                type="button"
                className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
              >

                <Bell size={18} />

                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white" />

              </button>


              {/* Create Job */}
              <button
                type="button"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-violet-700 transition"
              >

                <Plus size={15} />

                Create Job

              </button>

            </div>

          </div>

        </header>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="p-4 sm:p-6 lg:p-8">


          {/* ==================================================
              HERO
          ================================================== */}

          <section className="mb-6">

            <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-violet-500/15">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-violet-100 font-semibold">
                    Hiring Pipeline
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Manage your open roles
                  </h2>

                </div>


                {/* Mobile New Job */}
                <button
                  type="button"
                  className="sm:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-violet-700 font-semibold"
                >

                  <Plus size={16} />

                  New Job

                </button>

              </div>

            </div>

          </section>


          {/* ==================================================
              JOBS
          ================================================== */}

          <JobsSection
            onView={handleViewJob}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />

        </div>

      </main>


      {/* ==================================================
          VIEW JOB MODAL
      ================================================== */}

      {viewJobModal && selectedJob && (

        <ViewJobModal
          job={selectedJob}
          onClose={() => {
            setViewJobModal(false);
            setSelectedJob(null);
          }}
        />

      )}


      {/* ==================================================
          EDIT JOB MODAL
      ================================================== */}

      {editJobModal && selectedEditJob && (

        <EditJobModal
          job={selectedEditJob}

          onClose={() => {
            setEditJobModal(false);
            setSelectedEditJob(null);
          }}

          onUpdated={(updatedJob) => {

            console.log(
              "Updated Job:",
              updatedJob
            );

            setEditJobModal(false);
            setSelectedEditJob(null);

            // Reload jobs from backend
            window.location.reload();

          }}
        />

      )}

    </div>
  );
};

export default JobCreation;
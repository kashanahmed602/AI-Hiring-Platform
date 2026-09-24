import {
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  MapPin,
  Wallet,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";
import CandidateJobViewModal from "../Components/CanddateJobModal";


const CandidateJobs = () => {

  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected job for View Modal
  const [selectedJob, setSelectedJob] = useState(null);

  // View Modal
  const [viewJobModal, setViewJobModal] = useState(false);


  // ======================================================
  // FETCH JOBS
  // ======================================================

  useEffect(() => {

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
          "Candidate Jobs:",
          response.data.jobs
        );

      } catch (error) {

        console.log(
          "Error Fetching Jobs:",
          error.response?.data || error.message
        );

      } finally {

        setLoading(false);

      }

    };

    fetchJobs();

  }, []);


  // ======================================================
  // VIEW JOB
  // ======================================================

  const handleViewJob = (job) => {

    setSelectedJob(job);
    setViewJobModal(true);

  };


  // ======================================================
  // APPLY JOB
  // ======================================================

  const handleApplyJob = (job) => {

    console.log("Apply for Job:", job);

    alert(
      `You selected "${job.Title}" to apply.`
    );

  };


  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Available Jobs
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Explore jobs and find your next opportunity
          </p>

        </div>


        <div className="px-3 py-1 rounded-lg bg-violet-50 text-violet-700 text-sm font-semibold">
          {jobsData.length} Jobs
        </div>

      </div>


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading && (

        <div className="text-center py-12 text-slate-400">

          Loading jobs...

        </div>

      )}


      {/* ==================================================
          JOBS
      ================================================== */}

      {!loading && (

        <div className="space-y-4">

          {jobsData.map((job) => (

            <div
              key={job._id}
              className="border border-slate-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-sm transition"
            >

              <div className="flex items-start gap-4">


                {/* ==================================================
                    JOB ICON
                ================================================== */}

                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">

                  <BriefcaseBusiness size={22} />

                </div>


                {/* ==================================================
                    JOB INFORMATION
                ================================================== */}

                <div className="flex-1 min-w-0">


                  {/* Title + Job Type */}

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-bold text-slate-900">

                      {job.Title}

                    </h3>


                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">

                      {job.JobType}

                    </span>

                  </div>


                  {/* Work Mode */}

                  <p className="text-sm text-slate-500 mt-1">

                    {job.WorkMode}

                  </p>


                  {/* Job Details */}

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


                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <div className="flex items-center gap-2 shrink-0">


                  {/* VIEW */}

                  <button
                    type="button"
                    onClick={() => handleViewJob(job)}
                    title="View Job"
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-violet-100 text-slate-600 hover:text-violet-600 transition flex items-center justify-center"
                  >

                    <Eye size={17} />

                  </button>


                  {/* APPLY */}

                  <button
                    type="button"
                    onClick={() => handleApplyJob(job)}
                    className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition"
                  >

                    <CheckCircle2 size={16} />

                    Apply

                  </button>

                </div>

              </div>

            </div>

          ))}


          {/* ==================================================
              NO JOBS
          ================================================== */}

          {jobsData.length === 0 && (

            <div className="text-center py-12">

              <BriefcaseBusiness
                size={35}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-slate-400">
                No jobs available right now.
              </p>

            </div>

          )}

        </div>

      )}


      {/* ==================================================
          VIEW JOB MODAL
      ================================================== */}

      {viewJobModal && selectedJob && (

        <CandidateJobViewModal
          job={selectedJob}
          onClose={() => {

            setViewJobModal(false);
            setSelectedJob(null);

          }}
          onApply={handleApplyJob}
        />

      )}

    </div>
  );
};


export default CandidateJobs;
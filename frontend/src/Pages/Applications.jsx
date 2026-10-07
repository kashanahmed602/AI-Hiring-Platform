import { useEffect, useState } from "react";
import axios from "axios";
import ApplicationsModal from "../Components/ApplicationsModal";

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/v1/jobs-with-applications",
          { withCredentials: true }
        );

        setJobs(data.jobs || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Applications
        </h1>

        <p className="text-sm text-slate-500 mt-1 mb-6">
          Select a job to view its applicants
        </p>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => setSelectedJob(job)}
              className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-violet-300 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg text-slate-900">
                    {job.Title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {job.Location} • {job.WorkMode}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-violet-600">
                    {job.applications?.length || 0}
                  </p>

                  <p className="text-xs text-slate-500">
                    Applications
                  </p>
                </div>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <p className="text-slate-500">
              No jobs found.
            </p>
          )}
        </div>
      </div>

      <ApplicationsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </>
  );
};

export default Applications;
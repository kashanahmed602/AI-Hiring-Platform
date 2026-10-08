import { useState, useEffect } from "react";
import { X, BriefcaseBusiness, MapPin, ArrowRight } from "lucide-react";
import CreateAssessmentModal from "./CreateAssessmentModal";
import axios from 'axios';

// Temporary sample jobs — baad mein API se replace hongi.


const AssessmentJobsModal = ({ isOpen, onClose }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        if (!isOpen) return;

        const fetchJobs = async () => {
            try{
                const response = await axios.get('http://localhost:3001/api/v1/recruiter/jobs', {
                    withCredentials: true
                });
    
                setJobs(response.data.jobs);
                console.log("Jobs fetched successfully:", response.data.jobs);
            }catch(error){
                console.error(error.message);
            }
        }
    
        fetchJobs();
    }, [isOpen]);

  if (!isOpen) return null;

  const closeAll = () => {
    setSelectedJob(null);
    setShowCreateModal(false);
    onClose();
  };

  const handleContinue = () => {
    if (!selectedJob) return;
    setShowCreateModal(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          onClick={closeAll}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Select a Job
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose the job this assessment will be attached to.
              </p>
            </div>

            <button
              onClick={closeAll}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[55vh] space-y-3 overflow-y-auto p-6">
            {jobs.map((job) => {
              const selected = selectedJob?._id === job._id;

              return (
                <button
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-violet-500 bg-violet-50"
                      : "border-slate-200 hover:border-violet-300"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                    <BriefcaseBusiness size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {job.Title}
                    </h3>

                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {job.Location}
                      </span>
                      <span>{job.WorkMode}</span>
                      <span>{job.JobType}</span>
                    </div>
                  </div>

                  <span
                    className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                      selected
                        ? "border-violet-600 bg-violet-600 ring-2 ring-violet-200"
                        : "border-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex justify-end border-t border-slate-200 bg-slate-50 p-5">
            <button
              disabled={!selectedJob}
              onClick={handleContinue}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateAssessmentModal
          job={selectedJob}
          onClose={() => setShowCreateModal(false)}
          onBack={() => setShowCreateModal(false)}
          onFinish={closeAll}
        />
      )}
    </>
  );
};

export default AssessmentJobsModal;
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Wallet,
  Clock3,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";


const CandidateApplications = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const response = await axios.get(
          "http://localhost:3001/api/v1/applications",
          {
            withCredentials: true,
          }
        );

        setApplications(
          response.data.applications || []
        );

      } catch (error) {

        console.log(
          "Applications Error:",
          error.response?.data || error.message
        );

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, []);


  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {

    switch (status) {

      case "applied":
        return "bg-blue-50 text-blue-700";

      case "under-review":
        return "bg-amber-50 text-amber-700";

      case "shortlisted":
        return "bg-emerald-50 text-emerald-700";

      case "rejected":
        return "bg-red-50 text-red-700";

      case "hired":
        return "bg-violet-50 text-violet-700";

      default:
        return "bg-slate-50 text-slate-600";
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6">

        <p className="text-center py-10 text-slate-400">
          Loading applications...
        </p>

      </div>
    );
  }


  return (

    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            My Applications
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Track the jobs you have applied for
          </p>

        </div>


        <div className="px-3 py-1 rounded-lg bg-violet-50 text-violet-700 text-sm font-semibold">

          {applications.length} Applications

        </div>

      </div>


      {/* NO APPLICATIONS */}

      {applications.length === 0 && (

        <div className="text-center py-12">

          <BriefcaseBusiness
            size={38}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-slate-400">
            You haven't applied for any jobs yet.
          </p>

        </div>

      )}


      {/* APPLICATIONS */}

      <div className="space-y-4">

        {applications.map((application) => {

          const job = application.jobId;

          if (!job) return null;


          return (

            <div
              key={application._id}
              className="border border-slate-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-sm transition"
            >

              <div className="flex items-start gap-4">


                {/* ICON */}

                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">

                  <BriefcaseBusiness size={22} />

                </div>


                {/* JOB INFO */}

                <div className="flex-1 min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-bold text-slate-900">
                      {job.Title}
                    </h3>


                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${getStatusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>

                  </div>


                  {/* JOB TYPE */}

                  <p className="text-sm text-slate-500 mt-1">

                    {job.JobType} • {job.WorkMode}

                  </p>


                  {/* DETAILS */}

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">


                    <div className="flex items-center gap-1">

                      <MapPin size={15} />

                      {job.Location}

                    </div>


                    <div className="flex items-center gap-1">

                      <Wallet size={15} />

                      {job.Salary}

                    </div>


                    <div className="flex items-center gap-1">

                      <CalendarDays size={15} />

                      {application.appliedAt
                        ? new Date(
                            application.appliedAt
                          ).toLocaleDateString()
                        : "N/A"}

                    </div>

                  </div>

                </div>


                {/* MATCH SCORE */}

                {application.matchScore !== null &&
                  application.matchScore !== undefined && (

                    <div className="text-center shrink-0">

                      <div className="text-2xl font-bold text-violet-600">

                        {application.matchScore}%

                      </div>

                      <p className="text-xs text-slate-400">
                        AI Match
                      </p>

                    </div>

                  )}

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
};


export default CandidateApplications;
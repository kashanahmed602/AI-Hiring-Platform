const Application = require('../Models/ApplicatonModel');
const Job = require('../Models/jobModel');
const Recruiter = require('../Models/recruiterModel');

const getApplications = async(req, res) => {
    try{
        const applications = await Application.find({ candidateId: req.user.id }).populate('jobId').sort({ createdAt: -1 });

        if(!applications || applications.length === 0){
            return res.status(404).json({
                success: false,
                message: "No applications found for this candidate."
            })
        }

        res.status(200).json({
            success: true,
            message: "Applcations Fetched Successfully",
            applications: applications
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

const getJobsWithApplications = async(req, res) => {
    try{

        const recruiter = await Recruiter.findById(req.user.id);

        if(!recruiter){
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const jobs = await Job.find({ CreatedBy: req.user.id}).sort({ createdAt: -1});
        if(!jobs || jobs.length === 0){
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        const jobsWithApplications = await Promise.all(jobs.map(async (job) => {
            const applications = await Application.find({ jobId: job._id }).populate('candidateId');
            return { ...job.toObject(), applications };
        }));

        res.status(200).json({
            success: true,
            message: "Jobs with Applications Fetched Successfully",
            jobs: jobsWithApplications
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error.message)
    }
}

module.exports = { getApplications, getJobsWithApplications };
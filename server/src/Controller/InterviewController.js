const Recruiter = require('../Models/recruiterModel');
const Job = require('../Models/jobModel');
const Application = require('../Models/ApplicatonModel');


const getApplicationsForInterview = async (req, res) => {
    try{
        const recruiterId = req.user.id;
        const recruiter = await Recruiter.findById(recruiterId);

        if(!recruiter){
            return res.status(403).json({
                success: false,
                message: "Access Deniessssd"
            });
        }

            const jobs = await Job.find({ CreatedBy: recruiterId }).sort({ createdAt: -1 });

            if(!jobs || jobs.length === 0){
                return res.status(404).json({
                    success: false,
                    message: "No jobs found"
                });
            }

            const jobIds = jobs.map(job => job._id);

            const applications = await Application.find({ jobId: { $in: jobIds } }).populate('candidateId').populate('jobId');

            res.status(200).json({
                success: true,
                applications: applications
            });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getApplicationsForInterview };
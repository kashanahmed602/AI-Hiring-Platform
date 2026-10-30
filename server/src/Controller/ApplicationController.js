const Application = require('../Models/ApplicatonModel');
const Job = require('../Models/jobModel');
const Recruiter = require('../Models/recruiterModel');
const { redisClient } = require('../config/redis');

const getApplications = async(req, res) => {
    try{
        const applications = await Application.find({ candidateId: req.user.id }).populate('jobId').populate('candidateId').sort({ createdAt: -1 });

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

const getJobsWithApplications = async (req, res) => {
    try {
        const recruiter = await Recruiter.findById(req.user.id);

        if (!recruiter) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        // Recruiter-specific cache key
        const cacheKey = `jobsApplications:${req.user.id}`;

        // Check Redis
        const cachedJobs = await redisClient.get(cacheKey);

        if (cachedJobs) {
            console.log("Redis Hit");

            return res.status(200).json({
                success: true,
                message: "Jobs with Applications Fetched Successfully",
                jobs: JSON.parse(cachedJobs)
            });
        }

        console.log("Redis Miss");

        // Fetch recruiter jobs
        const jobs = await Job.find({
            CreatedBy: req.user.id
        }).sort({
            createdAt: -1
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        // Fetch applications for each job
        const jobsWithApplications = await Promise.all(
            jobs.map(async (job) => {
                const applications = await Application.find({
                    jobId: job._id
                }).populate("candidateId");

                return {
                    ...job.toObject(),
                    applications
                };
            })
        );

        // Save result in Redis for 5 minutes
        await redisClient.set(
            cacheKey,
            JSON.stringify(jobsWithApplications),
            {
                EX: 300
            }
        );

        return res.status(200).json({
            success: true,
            message: "Jobs with Applications Fetched Successfully",
            jobs: jobsWithApplications
        });

    } catch (error) {
        console.log("Get Jobs With Applications Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateStatus = async (req, res) => {
    try{
        const { applicationId, status } = req.body;

        const application = await Application.findById(applicationId);

        if(!application){
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application: application
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { getApplications, getJobsWithApplications, updateStatus };
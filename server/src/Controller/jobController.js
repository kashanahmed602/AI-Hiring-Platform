const Job = require('../Models/jobModel');
const { redisClient } = require('../config/redis');
const matchResumeWithAI = require('../Utils/MatchScoreWithAI');
const Candidate = require('../Models/userModel');
const Application = require('../Models/ApplicatonModel');
const Recruiter = require('../Models/recruiterModel');

const createJob = async (req, res) => {
    try {
        const { Title, Location, JobType, WorkMode, Salary, Experience, RequiredSkills, Description } = req.body;
        const CreatedBy = req.user.id; // Assuming you have user authentication middleware that sets req.user

        const job = new Job({
            Title,
            Location,
            JobType,
            WorkMode,
            Salary,
            Experience,
            RequiredSkills,
            Description,
            CreatedBy
        });

        await job.save();
        await redisClient.del('jobs:all');
        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job: job
        });

    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

const getJobs = async (req, res) => {
    try {

        // ==========================================
        // 1. Candidate check
        // ==========================================

        const user = await Candidate.findById(req.user.id);

        if (!user || user.role !== "candidate") {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }


        // ==========================================
        // 2. Get candidate's applied jobs
        // ==========================================

        const applications = await Application.find({
            candidateId: req.user.id
        }).select("jobId");

        const appliedJobIds = applications.map(
            (application) => application.jobId.toString()
        );


        // ==========================================
        // 3. Check Redis
        // ==========================================

        const cachedJobs = await redisClient.get("jobs:all");

        if (cachedJobs) {

            console.log("Redis Hit");

            const jobs = JSON.parse(cachedJobs);

            // Remove already applied jobs
            const availableJobs = jobs.filter(
                (job) => !appliedJobIds.includes(job._id.toString())
            );

            return res.status(200).json({
                success: true,
                message: "Redis data Fetched Successfully",
                jobs: availableJobs
            });
        }


        // ==========================================
        // 4. Redis MISS
        // ==========================================

        console.log("Redis Miss");


        const jobs = await Job.find().sort({
            createdAt: -1
        });


        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }


        // ==========================================
        // 5. Resume
        // ==========================================

        const resumeText = user.resume?.parsedData;

        if (!resumeText) {
            return res.status(400).json({
                success: false,
                message: "Resume Not Available"
            });
        }


        // ==========================================
        // 6. AI Match Scores
        // ==========================================

        const jobMatchScores = await Promise.all(

            jobs.map(async (job) => {

                const matchResult = await matchResumeWithAI(
                    resumeText,
                    job
                );

                return {
                    ...job.toObject(),

                    matchScore: matchResult.matchScore,

                    matchDetails: matchResult.matchDetails
                };
            })
        );


        // ==========================================
        // 7. Save jobs + scores in Redis
        // ==========================================

        await redisClient.set(
            "jobs:all",
            JSON.stringify(jobMatchScores)
        );


        // ==========================================
        // 8. Remove already applied jobs
        // ==========================================

        const availableJobs = jobMatchScores.filter(
            (job) => !appliedJobIds.includes(job._id.toString())
        );


        // ==========================================
        // 9. Response
        // ==========================================

        return res.status(200).json({
            success: true,
            message: "Jobs Fetched Successfully",
            jobs: availableJobs
        });


    } catch (error) {

        console.log("Get Jobs Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        const {id} = req.params;

        const job = await Job.findByIdAndDelete(id);

        if(!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Job Deleted Successfully"
        })

        await redisClient.del('jobs:all');

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        console.log("error", error.message);
    }
};

const updateJob = async (req, res) => {
    try {
        const {id} = req.params;
        const { Title, Location, JobType, WorkMode, Salary, Experience, RequiredSkills, Description } = req.body;

        const job = await Job.findByIdAndUpdate(id, {
            Title,
            Location,
            JobType,
            WorkMode,
            Salary,
            Experience,
            RequiredSkills,
            Description
        }, { new: true });

        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job Updated successfully"
        })

        await redisClient.del('jobs:all');

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

const applyForJob = async (req, res) => {
    try {
        const { jobId, matchScore, matchDetails, status } = req.body;
        const candidateId = req.user.id;

        const user = await Candidate.findById(candidateId);

        if(!user || user.role !== 'candidate'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }

        const resumeText = user.resume?.parsedData;
        if(!resumeText){
            return res.status(400).json({
                success: false,
                message: "Resume Not Available"
            });
        }

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            });
        }

        const existingApplicaton = await Application.findOne({ jobId, candidateId });

        if(existingApplicaton){
            return res.status(400).json({
                success: false,
                message: "Application Already Submitted"
            });
        }

        const application = new Application({
            jobId,
            candidateId,
            resumeSnapshot: resumeText,
            matchScore,
            matchDetails,
            status
        })

        await application.save();

        res.status(201).json({
            success: true,
            message: "Application Submitted Successfully"
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        console.log("error", error.message);
    }
}

module.exports = {createJob, getJobs, deleteJob, updateJob, applyForJob};
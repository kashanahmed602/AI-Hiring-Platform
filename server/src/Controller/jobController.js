const Job = require('../Models/jobModel');
const { redisClient } = require('../config/redis');
const matchResumeWithAI = require('../Utils/MatchScoreWithAI');
const Candidate = require('../Models/userModel');

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

        const cachedJobs = await redisClient.get('jobs:all');

        if(cachedJobs){
            console.log("Redis Hit");
            return res.status(200).json({
                success: true,
                message:"Redis data Fetched Successfully",
                jobs: JSON.parse(cachedJobs)
            })
        }

        console.log("Miss Hit");

        
        const user = await Candidate.findById(req.user.id);

        if(!user || user.role !== 'candidate'){ 
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const jobs = await Job.find().sort({ createAt: -1});

        const resumeText = user.resume?.parsedData;
        if(!resumeText){
            return res.status(400).json({
                success: false,
                message: "Resume Not Available"
            });
        }

        if(!jobs) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            })
        }

        const jobMatchScores = await Promise.all(jobs.map(async (job) => {
            const matchResult = await matchResumeWithAI(resumeText, job);
            return {
                ...job.toObject(),
                matchScore: matchResult.matchScore,
                matchDetails: matchResult.matchDetails
            };
        }))

        await redisClient.set("jobs:all", JSON.stringify(jobMatchScores));

        res.status(200).json({
            success: true,
            message: "Jobs Fetched Successfully",
            jobs: jobMatchScores
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

        console.log("error", error.message);

    }
}

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

module.exports = {createJob, getJobs, deleteJob, updateJob};
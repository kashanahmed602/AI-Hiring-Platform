const Job = require('../Models/jobModel');

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
        const jobs = await Job.find();

        if(!jobs) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Jobs Fetched Successfully",
            jobs: jobs
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

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

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

module.exports = {createJob, getJobs, deleteJob, updateJob};
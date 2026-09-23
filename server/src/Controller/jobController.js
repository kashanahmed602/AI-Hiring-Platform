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

module.exports = {createJob};
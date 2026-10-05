const Application = require('../Models/ApplicatonModel');


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

module.exports = { getApplications };
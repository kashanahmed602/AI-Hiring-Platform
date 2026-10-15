const Recruiter = require('../Models/recruiterModel');
const Job = require('../Models/jobModel');
const Application = require('../Models/ApplicatonModel');
const Interview = require('../Models/InterviewModel');
const Candidate = require('../Models/userModel');


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

const createInterview = async (req, res) => {
    try{
        const recruiterId = req.user.id;
        const recruiter = await Recruiter.findById(recruiterId);

        if(!recruiter){
            return res.status(403).json({
                success: false,
                message: "Access Deniessssd"
            });
        }

        const { candidateId, jobId, applicationId, schedule } = req.body;

        const newInterview = new Interview({
            candidateId,
            jobId,
            recruiterId,
            applicationId,
            schedule
        });

        await newInterview.save();

        res.status(201).json({
            success: true,
            message: 'Interview Created Successfully',
            interview: newInterview
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getInterviewsForRecruiter = async (req, res) => {
    try{
         const recruiterId = req.user.id;
        const recruiter = await Recruiter.findById(recruiterId);

        if(!recruiter){
            return res.status(403).json({
                success: false,
                message: "Access Deniessssd"
            });
        }

        const interviews = await Interview.find({ recruiterId }).populate('candidateId', 'resume.parsedData.personal.fullName resume.parsedData.personal.email').populate('jobId', 'Title ').populate('applicationId');

        if(!interviews || interviews.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Interviews Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interviews Fetched Successfully",
            interviews: interviews
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getInterviewsForCandidate = async (req, res) => {
    try{
        const candidateId = req.user.id;
        const candidate = await Candidate.findById(candidateId);

        if(!candidate){
            return res.status(403).json({
                success: false,
                message: "Access Deniessssd"
            });
        }

        const interviews = await Interview.find({ candidateId }).populate('recruiterId', 'Company email').populate('jobId', 'Title').populate('applicationId');

        if(!interviews || interviews.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Interviews Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interviews Fetched Successfully",
            interviews: interviews
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { getApplicationsForInterview, createInterview, getInterviewsForRecruiter, getInterviewsForCandidate };
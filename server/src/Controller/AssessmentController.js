const Assessment = require('../Models/AssesmentModel');
const Recruiter = require('../Models/recruiterModel');
const Job = require('../Models/jobModel');
const createAssessment = require('../Utils/AssessmentCreate');

const createAssessmentQuestions = async (req, res) => {
    try {
        const { jobId, title, description, duration, questionCount, difficulty, creationMethod, passingScore } = req.body;
        const recruiterId = req.user.id;

        const recruiter = await Recruiter.findById(recruiterId);
        if(!recruiter || recruiter.role !== 'recruiter') {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const job = await Job.findById(jobId);
        if(!job || job.CreatedBy.toString() !== recruiterId) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }

        const gettingQuestions = await createAssessment(difficulty, questionCount, description, job.Title, job.RequiredSkills);
        if(!gettingQuestions || !Array.isArray(gettingQuestions)) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate assessment questions"
            });
        }

        const assessment = new Assessment({
            jobId,
            recruiterId,
            title,
            description,
            duration,
            questionCount,
            difficulty,
            questions: gettingQuestions,
            passingScore,
            creationMethod,
            status: 'draft'
        });

        await assessment.save();

        res.status(201).json({
            success: true,
            message: "Assessment Created Successfully",
            assessment: assessment
        });

    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { createAssessmentQuestions };
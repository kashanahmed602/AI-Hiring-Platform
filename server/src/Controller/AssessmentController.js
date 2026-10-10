const Assessment = require('../Models/AssesmentModel');
const Recruiter = require('../Models/recruiterModel');
const Job = require('../Models/jobModel');
const createAssessment = require('../Utils/AssessmentCreate');
const Candidate = require('../Models/userModel');
const Application = require('../Models/ApplicatonModel');

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

const getAssessments = async (req, res) => {
    try{
        const recruiterId = req.user.id;
        const recruiter = await Recruiter.findById(recruiterId);
        if(!recruiter || recruiter.role !== 'recruiter'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }

        const assessments = await Assessment.find({ recruiterId: recruiterId }).populate('jobId', 'Title');
        if(!assessments){
            return res.status(404).json({
                success: false,
                message: 'No Assessments Found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Assessments Fetched Successfully',
            assessments: assessments
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

const statusUpdate = async (req, res) => {
    try{
        const { assessmentId, status } = req.body;

        const recruiter = await Recruiter.findById(req.user.id);
          if(!recruiter || recruiter.role !== 'recruiter'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }

        const assessments = await Assessment.findById(assessmentId);
        if(!assessments || assessments.recruiterId.toString() !== recruiter._id.toString()){
            return res.status(404).json({
                success: false,
                message: 'No Assessments Found'
            });
        }

        assessments.status = status;
        await assessments.save();

        res.status(200).json({
            success: true,
            message: "Assessment Status Updated Successfully",
            assessment: assessments
        });
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteAssessment = async (req, res) => {
    try{
        const { assessmentId } = req.body;

         const recruiter = await Recruiter.findById(req.user.id);
          if(!recruiter || recruiter.role !== 'recruiter'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }

        const assessments = await Assessment.findById(assessmentId);
        if(!assessments || assessments.recruiterId.toString() !== recruiter._id.toString()){
            return res.status(404).json({
                success: false,
                message: 'No Assessments Found'
            });
        }

        await assessments.remove();

        res.status(200).json({
            success: true,
            message: "Assessment Deleted Successfully"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getAssessmentForCandidate = async (req, res) => {
    try{
        // const { assessmentId } = req.body;   
        const candidateId = req.user.id;

        const candidate = await Candidate.findById(candidateId);
        if(!candidate || candidate.role !== 'candidate'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }

        const application = await Application.find({ candidateId: candidateId, status: 'shortlisted'}).select('jobId');
      

        const jobsIds = application.map((app) => app.jobId);

        const assessment = await Assessment.find({jobId: { $in: jobsIds}, status: 'published'}).populate('jobId', 'Title').select('-questions.correctAnswer');
        // if(!assessment || assessment.length === 0){
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No Assessments Found'
        //     });
        // }

        res.status(200).json({
            success: true,
            message: 'Assessments Fetched Successfully',
            assessments: assessment
        });
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { createAssessmentQuestions, getAssessments, statusUpdate, deleteAssessment, getAssessmentForCandidate };
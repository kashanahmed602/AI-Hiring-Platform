const Assessment = require('../Models/AssesmentModel');
const Recruiter = require('../Models/recruiterModel');
const Job = require('../Models/jobModel');
const createAssessment = require('../Utils/AssessmentCreate');
const Candidate = require('../Models/userModel');
const Application = require('../Models/ApplicatonModel');
const checkAssessment = require('../Utils/AssessmentCheck');
const AttemptedAssessment = require('../Models/AttemptedAssessmentModel');

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

const submitAssessment = async (req, res) => {
    try{
        const { assessmentId, answers, status } = req.body;
        const candidateId = req.user.id;

        const candidate = await Candidate.findById(candidateId);
        if(!candidate || candidate.role !== 'candidate'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }
        
        const assessment = await Assessment.findById(assessmentId);
        if(!assessment || assessment.status !== 'published'){
            return res.status(404).json({
                success: false,
                message: 'Assessment Not Found'
            });
        }

        const result = await checkAssessment(assessment.questions, answers, assessment.passingScore);
        if(!result){
            return res.status(500).json({
                success: false,
                message: 'Failed to evaluate assessment'
            });
        }

        const attemptedAssessment = new AttemptedAssessment({
            assessmentId: assessment._id,
            CandidateId: candidate._id,
            score: result.score,
            totalmarks: result.totalMarks,
            percentage: result.percentage,
            status: status,
            result: result.result,
            answers: result.answers
        });

        await attemptedAssessment.save();

        res.status(200).json({
            success: true,
            message: 'Assessment Submitted Successfully',
            attemptedAssessment: attemptedAssessment
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAssessmentResults = async (req, res) => {
    try{
        const recruiterId = req.user.id;
        const recruiter = await Recruiter.findById(recruiterId);
        if(!recruiter || recruiter.role !== 'recruiter'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            });
        }

        const assessmentResults = await AttemptedAssessment.find({}).populate('assessmentId', 'questions title').populate('CandidateId', 'resume.parsedData.personal.fullName resume.parsedData.personal.email');
        if(!assessmentResults || assessmentResults.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No Assessment Results Found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Assessment Results Fetched Successfully',
            assessmentResults: assessmentResults
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAssessmentResultForSpecificJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    // 1. Verify recruiter
    const recruiter = await Recruiter.findById(recruiterId);

    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // 2. Get assessment ID
    const { assessmentId } = req.query;

    if (!assessmentId) {
      return res.status(400).json({
        success: false,
        message: "Assessment ID is required",
      });
    }

    // 3. Verify assessment belongs to this recruiter
    const assessment = await Assessment.findOne({
      _id: assessmentId,
      recruiterId,
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    // 4. Fetch all candidates who attempted this assessment
    const assessmentResults = await AttemptedAssessment.find({
      assessmentId: assessment._id,
    })
      .populate("assessmentId", "title questions jobId")
      .populate(
        "CandidateId",
        "resume.parsedData.personal.fullName resume.parsedData.personal.email"
      )
      .sort({ createdAt: -1 });

    // 5. Match each candidate with their job application
    const resultsWithApplication = await Promise.all(
      assessmentResults.map(async (attempt) => {
        const candidateId = attempt.CandidateId?._id;
        const jobId = assessment.jobId;

        let application = null;

        if (candidateId && jobId) {
          application = await Application.findOne({
            candidateId,
            jobId,
          }).select("_id status");
        }

        return {
          ...attempt.toObject(),

          // Application details
          applicationId: application?._id || null,

          // Hiring status from Application model
          applicationStatus: application?.status || "Applied",
        };
      })
    );

    console.log("Results with Application:", resultsWithApplication);

    // 6. Send response
    return res.status(200).json({
      success: true,
      message: "Assessment Results Fetched Successfully",
      assessmentResults: resultsWithApplication,
    });
  } catch (error) {
    console.error(
      "Get Assessment Results Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createAssessmentQuestions, getAssessments, statusUpdate, deleteAssessment, getAssessmentForCandidate, submitAssessment, getAssessmentResults, getAssessmentResultForSpecificJob };
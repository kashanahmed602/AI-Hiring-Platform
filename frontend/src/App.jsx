  import React from 'react'
  import { Routes, Route } from 'react-router-dom'
  import Landing from './Pages/Landing'
  import CandidateLogin from './Auth/Candidate/loginCandidate'
  import CandidateSignup from './Auth/Candidate/signupCandidate'
  import RecruiterLogin from './Auth/Recruiter/loginRecruiter'
  import RecruiterSignup from './Auth/Recruiter/signupRecruiter'
  import ProtectedRoutes from './Auth/auth'
  import RecruiterDashboard from './Dashboard/Recruiter'
  import CandidateDashboard from './Dashboard/Candidate'
  import JobCreation from './Pages/JobCreaton'
  import CandidateJobs from './Pages/CanddateJob'
  import MyResume from './Pages/MyResume'
  import ResumeBuilder from './Pages/ResumeBuilder'
  import UploadResume from './Components/UploadResume'
  import CandidateApplications from './Pages/CandidateApplications'
  import Applications from './Pages/Applications'
  import Assessments from './Pages/Assessments'
  import CandidateAssessments from './Pages/CandidateAssessments'
  import CandidateAssessmentTest from './Pages/CandidateAssessmentTest'
  import AssessmentResults from './Pages/AssessmentResults'
  import AssessmentResultDetails from './Pages/AssessmentResultDetails';
  import Interviews from './Pages/Interviews'
  import CandidateInterviews from './Pages/CandidateInterviews'
  import VideoInterview from './Pages/VideoInterview'
  import WorkspaceLayout from './Components/WorkspaceLayout'

  const workspaceRoute = (role, page) => (
    <ProtectedRoutes>
      <WorkspaceLayout role={role}>{page}</WorkspaceLayout>
    </ProtectedRoutes>
  )

  function App() {
    return (
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/candidate/login' element={<CandidateLogin/>} />
        <Route path='/candidate/signup' element={<CandidateSignup/>} />
        <Route path='/recruiter/login' element={<RecruiterLogin/>} />
        <Route path='/recruiter/signup' element={<RecruiterSignup/>} />
        <Route path='/recruiter/dashboard' element={<ProtectedRoutes><RecruiterDashboard/></ProtectedRoutes>} />
        <Route path='/candidate/dashboard' element={<ProtectedRoutes><CandidateDashboard/></ProtectedRoutes>} />
        <Route path='/candidate/jobs' element={workspaceRoute('candidate', <CandidateJobs/>)} />
        <Route path='/jobs' element={<ProtectedRoutes><JobCreation/></ProtectedRoutes>} />
        <Route path='/candidate/resume' element={workspaceRoute('candidate', <MyResume/>)} />
        <Route path='/candidate/resume/upload' element={workspaceRoute('candidate', <UploadResume/>)} />
        <Route path='/resume-builder' element={<ResumeBuilder/>} />
        <Route path='/candidate/applications' element={workspaceRoute('candidate', <CandidateApplications/>)} />
        <Route path='/jobs/:id' element={<ProtectedRoutes><JobCreation/></ProtectedRoutes>} />
        <Route path='/recruiter/applications' element={workspaceRoute('recruiter', <Applications/>)} />
        <Route path='/recruiter/assessments' element={workspaceRoute('recruiter', <Assessments/>)} />
        <Route path='/candidate/assessments' element={workspaceRoute('candidate', <CandidateAssessments/>)} />
        <Route path='/candidate/assessments/test' element={workspaceRoute('candidate', <CandidateAssessmentTest/>)} />
        <Route path='/candidate/assessments/results' element={workspaceRoute('recruiter', <AssessmentResults/>)} />
        <Route path='/candidate/assessments/results/:id' element={workspaceRoute('recruiter', <AssessmentResultDetails/>)} />
        <Route path='/recruiter/interviews' element={workspaceRoute('recruiter', <Interviews/>)} />
        <Route path='/candidate/interviews' element={workspaceRoute('candidate', <CandidateInterviews/>)} />
        <Route path='/video-interview/:interviewId' element={<ProtectedRoutes><VideoInterview/></ProtectedRoutes>} />
      </Routes>
    )
  }

  export default App
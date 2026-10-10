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
      <Route path='/candidate/jobs' element={<ProtectedRoutes><CandidateJobs/></ProtectedRoutes>} />
      <Route path='/jobs' element={<ProtectedRoutes><JobCreation/></ProtectedRoutes>} />
      <Route path='/candidate/resume' element={<ProtectedRoutes><MyResume/></ProtectedRoutes>} />
      <Route path='/candidate/resume/upload' element={<ProtectedRoutes><UploadResume/></ProtectedRoutes>} />
      <Route path='/resume-builder' element={<ResumeBuilder/>} />
      <Route path='/candidate/applications' element={<ProtectedRoutes><CandidateApplications/></ProtectedRoutes>} />
      <Route path='/jobs/:id' element={<ProtectedRoutes><JobCreation/></ProtectedRoutes>} />
      <Route path='/recruiter/applications' element={<ProtectedRoutes><Applications/></ProtectedRoutes>} />
      <Route path='/recruiter/assessments' element={<ProtectedRoutes><Assessments/></ProtectedRoutes>} />
      <Route path='/candidate/assessments' element={<ProtectedRoutes><CandidateAssessments/></ProtectedRoutes>} />

    </Routes>
  )
}

export default App
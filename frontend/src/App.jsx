import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import CandidateLogin from './Auth/Candidate/loginCandidate'
import CandidateSignup from './Auth/Candidate/signupCandidate'
import RecruiterLogin from './Auth/Recruiter/loginRecruiter'
import RecruiterSignup from './Auth/Recruiter/signupRecruiter'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/candidate/login' element={<CandidateLogin/>} />
      <Route path='/candidate/signup' element={<CandidateSignup/>} />
      <Route path='/recruiter/login' element={<RecruiterLogin/>} />
      <Route path='/recruiter/signup' element={<RecruiterSignup/>} />

    </Routes>
  )
}

export default App
# HireFlow

HireFlow is a full-stack hiring platform that brings candidates and recruiters together. Candidates can discover jobs, manage resumes and applications, complete assessments, and attend interviews. Recruiters can publish jobs, review applicants, create assessments, and manage interviews.

## Features

- Separate candidate and recruiter accounts with protected workspaces
- Job creation, browsing, applications, and application status management
- Resume upload, AI-assisted resume parsing and job matching, and a resume builder
- AI-assisted assessments, candidate attempts, and recruiter results
- Interview scheduling and real-time video interviews

## Tech stack

- **Frontend:** React, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express, Socket.IO
- **Data and services:** MongoDB, Redis, OpenAI, Google Gemini, ImageKit
- **Video:** PeerJS

## Run locally

### Prerequisites

- Node.js and npm (use a Node.js version supported by Vite 8: 20.19+ or 22.12+)
- MongoDB and Redis
- API credentials for the external services you plan to use (see configuration below)

### 1. Configure the backend

Create `server/.env`:

```env
PORT=8059
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/hireflow
REDIS_URL=redis://localhost:6379
JWT_SECRET=replace-with-a-long-random-secret

# Required for the related AI features
OPENAI_API_KEY=
GEMINI_API_KEY=

# Required for ImageKit resume/file uploads
PUBLIC_KEY_IMAGEKIT=
PRIVATE_KEY_IMAGEKIT=
URL_IMAGEKIT=
```

Keep real credentials private; do not commit `.env` files.

### 2. Configure the frontend

Create `frontend/.env.local` and point it to the backend API:

```env
VITE_API_URL=http://localhost:8059/api/v1
```

### 3. Install dependencies and start the app

In one terminal:

```sh
cd server
npm install
npm run dev
```

In another terminal:

```sh
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The backend listens on port `8059` by default.

## Build the frontend

```sh
cd frontend
npm run build
```

## Project structure

```text
AI-Hiring-Platform/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── Auth/
│   │   │   ├── Candidate/
│   │   │   │   ├── loginCandidate.jsx
│   │   │   │   └── signupCandidate.jsx
│   │   │   ├── Recruiter/
│   │   │   │   ├── loginRecruiter.jsx
│   │   │   │   └── signupRecruiter.jsx
│   │   │   └── auth.jsx
│   │   ├── Components/
│   │   │   ├── ApplicantDetailsModal.jsx
│   │   │   ├── ApplicationsModal.jsx
│   │   │   ├── AssessmentJobsModal.jsx
│   │   │   ├── CanddateJobModal.jsx
│   │   │   ├── ChangePasswordModal.jsx
│   │   │   ├── CreateAssessmentModal.jsx
│   │   │   ├── EditJobModal.jsx
│   │   │   ├── InterviewCreateModal.jsx
│   │   │   ├── JobModal.jsx
│   │   │   ├── ResumeUploaded.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── UploadResume.jsx
│   │   │   ├── ViewJobModal.jsx
│   │   │   └── WorkspaceLayout.jsx
│   │   ├── Dashboard/
│   │   │   ├── Candidate.jsx
│   │   │   └── Recruiter.jsx
│   │   ├── Pages/
│   │   │   ├── Applications.jsx
│   │   │   ├── AssessmentResultDetails.jsx
│   │   │   ├── AssessmentResults.jsx
│   │   │   ├── Assessments.jsx
│   │   │   ├── CanddateJob.jsx
│   │   │   ├── CandidateApplications.jsx
│   │   │   ├── CandidateAssessmentTest.jsx
│   │   │   ├── CandidateAssessments.jsx
│   │   │   ├── CandidateInterviews.jsx
│   │   │   ├── Interviews.jsx
│   │   │   ├── JobCreaton.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── MyResume.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ResumeBuilder.jsx
│   │   │   └── VideoInterview.jsx
│   │   ├── assets/
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── apiButtonLoading.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── Controller/
│   │   │   ├── ApplicationController.js
│   │   │   ├── AssessmentController.js
│   │   │   ├── InterviewController.js
│   │   │   ├── RecruiterController.js
│   │   │   ├── jobController.js
│   │   │   └── userController.js
│   │   ├── Middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── socketAuth.js
│   │   │   └── upload.js
│   │   ├── Models/
│   │   │   ├── ApplicatonModel.js
│   │   │   ├── AssesmentModel.js
│   │   │   ├── AttemptedAssessmentModel.js
│   │   │   ├── InterviewModel.js
│   │   │   ├── jobModel.js
│   │   │   ├── recruiterModel.js
│   │   │   └── userModel.js
│   │   ├── Routes/
│   │   │   ├── ApplicationRoutes.js
│   │   │   ├── AssessmentRoutes.js
│   │   │   ├── InterviewRoutes.js
│   │   │   ├── JobRoutes.js
│   │   │   ├── RecruiterRoute.js
│   │   │   ├── authRoutes.js
│   │   │   └── userRoute.js
│   │   ├── Utils/
│   │   │   ├── AssessmentCheck.js
│   │   │   ├── AssessmentCreate.js
│   │   │   ├── MatchScoreWithAI.js
│   │   │   ├── ParseResumeWithAI.js
│   │   │   ├── ResumeTextExtraction.js
│   │   │   ├── authCookieOptions.js
│   │   │   ├── testGemini.js
│   │   │   └── testOpenAI.js
│   │   ├── config/
│   │   │   ├── Gemini.js
│   │   │   ├── OpenA.js
│   │   │   ├── db.js
│   │   │   ├── imageKit.js
│   │   │   └── redis.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
├── index.js
├── sillydev.conf
└── README.md
```

This tree lists the project files and excludes generated dependencies and build output (`node_modules/` and `frontend/dist/`). The API is mounted under `/api/v1`; the frontend's `VITE_API_URL` should include that prefix.

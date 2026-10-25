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

The tree shows the committed application structure. Generated dependencies and build output (`node_modules/` and `frontend/dist/`) are intentionally omitted.

## Codebase guide

### Frontend

The frontend is a single-page React application. `App.jsx` maps URL paths to pages, while the folders below organize authentication, reusable interface elements, dashboards, and page-level screens.

| Path | Purpose |
| --- | --- |
| `frontend/public/` | Static files served directly by Vite. |
| `frontend/public/favicon.svg` | Browser tab icon. |
| `frontend/public/icons.svg` | SVG icon assets. |
| `frontend/src/main.jsx` | Frontend entry point; mounts the React application and router. |
| `frontend/src/App.jsx` | Declares the application's page routes and protected workspaces. |
| `frontend/src/App.css` | Styles specific to the application shell and shared UI. |
| `frontend/src/index.css` | Global styles and Tailwind CSS setup. |
| `frontend/src/apiButtonLoading.js` | Shared API-related button loading helper. |
| `frontend/src/assets/` | Images and assets imported into React code. |
| `frontend/src/assets/react.svg` | React starter asset. |
| `frontend/src/assets/vite.svg` | Vite starter asset. |
| `frontend/src/Auth/` | Sign-in, registration, and route-access components. |
| `frontend/src/Auth/auth.jsx` | Checks authentication and protects restricted routes. |
| `frontend/src/Auth/Candidate/loginCandidate.jsx` | Candidate sign-in screen. |
| `frontend/src/Auth/Candidate/signupCandidate.jsx` | Candidate registration screen. |
| `frontend/src/Auth/Recruiter/loginRecruiter.jsx` | Recruiter sign-in screen. |
| `frontend/src/Auth/Recruiter/signupRecruiter.jsx` | Recruiter registration screen. |
| `frontend/src/Dashboard/` | Role-specific dashboard screens. |
| `frontend/src/Dashboard/Candidate.jsx` | Candidate dashboard. |
| `frontend/src/Dashboard/Recruiter.jsx` | Recruiter dashboard. |
| `frontend/src/Pages/` | Full page views for the application's main workflows. |
| `frontend/src/Pages/Landing.jsx` | Public landing page. |
| `frontend/src/Pages/Profile.jsx` | Candidate profile view and editing. |
| `frontend/src/Pages/CanddateJob.jsx` | Candidate job discovery and application page. |
| `frontend/src/Pages/JobCreaton.jsx` | Recruiter job creation and management page. |
| `frontend/src/Pages/Applications.jsx` | Recruiter view of applications received for jobs. |
| `frontend/src/Pages/CandidateApplications.jsx` | Candidate view of submitted applications. |
| `frontend/src/Pages/MyResume.jsx` | Candidate resume management page. |
| `frontend/src/Pages/ResumeBuilder.jsx` | Resume creation and editing experience. |
| `frontend/src/Pages/Assessments.jsx` | Recruiter assessment management page. |
| `frontend/src/Pages/CandidateAssessments.jsx` | Candidate list of available assessments. |
| `frontend/src/Pages/CandidateAssessmentTest.jsx` | Candidate assessment-taking screen. |
| `frontend/src/Pages/AssessmentResults.jsx` | Recruiter assessment results list. |
| `frontend/src/Pages/AssessmentResultDetails.jsx` | Details for a specific assessment result. |
| `frontend/src/Pages/Interviews.jsx` | Recruiter interview management page. |
| `frontend/src/Pages/CandidateInterviews.jsx` | Candidate interview schedule and details. |
| `frontend/src/Pages/VideoInterview.jsx` | Real-time video interview screen. |
| `frontend/src/Components/` | Reusable UI components, dialogs, and workspace layout. |
| `frontend/src/Components/WorkspaceLayout.jsx` | Shared layout for authenticated candidate and recruiter pages. |
| `frontend/src/Components/Sidebar.jsx` | Workspace navigation sidebar. |
| `frontend/src/Components/ApplicantDetailsModal.jsx` | Dialog for applicant details and application actions. |
| `frontend/src/Components/ApplicationsModal.jsx` | Applications dialog used in job workflows. |
| `frontend/src/Components/AssessmentJobsModal.jsx` | Job selection dialog for assessment workflows. |
| `frontend/src/Components/CanddateJobModal.jsx` | Candidate-facing job details dialog. |
| `frontend/src/Components/ChangePasswordModal.jsx` | Password update dialog. |
| `frontend/src/Components/CreateAssessmentModal.jsx` | Assessment creation dialog. |
| `frontend/src/Components/EditJobModal.jsx` | Job editing dialog. |
| `frontend/src/Components/InterviewCreateModal.jsx` | Interview scheduling dialog. |
| `frontend/src/Components/JobModal.jsx` | Job creation dialog. |
| `frontend/src/Components/ResumeUploaded.jsx` | Resume upload confirmation and resume information UI. |
| `frontend/src/Components/UploadResume.jsx` | Resume file upload interface. |
| `frontend/src/Components/ViewJobModal.jsx` | Job details and application review dialog. |
| `frontend/package.json` | Frontend dependencies and development/build scripts. |
| `frontend/package-lock.json` | Exact npm dependency versions for reproducible installs. |
| `frontend/vite.config.js` | Vite and React build-tool configuration. |
| `frontend/index.html` | HTML document used to load the React app. |
| `frontend/vercel.json` | Vercel deployment and routing configuration. |
| `frontend/.gitignore` | Frontend-specific files excluded from Git. |
| `frontend/.oxlintrc.json` | Oxlint configuration. |
| `frontend/README.md` | Starter documentation inside the frontend package. |

### Backend

The backend is an Express API with MongoDB models and a Socket.IO server for real-time interview signaling. REST endpoints are grouped under `Routes/`; route handlers live in `Controller/`.

| Path | Purpose |
| --- | --- |
| `server/src/server.js` | Starts the HTTP server and Socket.IO, and handles real-time interview events. |
| `server/src/app.js` | Configures Express middleware, CORS, database/cache connections, and API routes. |
| `server/src/Routes/` | Maps API endpoints to controller functions. Routes are mounted under `/api/v1`. |
| `server/src/Routes/userRoute.js` | Candidate registration, login, profile, password, and resume endpoints. |
| `server/src/Routes/RecruiterRoute.js` | Recruiter registration, login, and recruiter job endpoints. |
| `server/src/Routes/authRoutes.js` | Authenticated session check endpoint (`/me`). |
| `server/src/Routes/JobRoutes.js` | Job creation, listing, editing, deletion, and application endpoints. |
| `server/src/Routes/ApplicationRoutes.js` | Candidate/recruiter application listing and application status updates. |
| `server/src/Routes/AssessmentRoutes.js` | Assessment creation, candidate submissions, status changes, and results endpoints. |
| `server/src/Routes/InterviewRoutes.js` | Interview scheduling, interview listing, and candidate access endpoints. |
| `server/src/Controller/` | Request handlers containing API workflow logic. |
| `server/src/Controller/userController.js` | Candidate account, authentication, profile, password, and resume operations. |
| `server/src/Controller/RecruiterController.js` | Recruiter account and recruiter job operations. |
| `server/src/Controller/jobController.js` | Job creation, retrieval, changes, removal, and applications. |
| `server/src/Controller/ApplicationController.js` | Application retrieval and status management. |
| `server/src/Controller/AssessmentController.js` | Assessment generation, delivery, submissions, and result retrieval. |
| `server/src/Controller/InterviewController.js` | Interview scheduling, listing, and candidate access control. |
| `server/src/Middleware/` | Express and Socket.IO request-processing middleware. |
| `server/src/Middleware/authMiddleware.js` | Verifies authenticated API requests and attaches the current user. |
| `server/src/Middleware/socketAuth.js` | Authenticates Socket.IO connections. |
| `server/src/Middleware/upload.js` | Configures resume upload handling. |
| `server/src/Models/` | Mongoose schemas for persisted application data. |
| `server/src/Models/userModel.js` | Candidate account and profile schema. |
| `server/src/Models/recruiterModel.js` | Recruiter account schema. |
| `server/src/Models/jobModel.js` | Job posting schema. |
| `server/src/Models/ApplicatonModel.js` | Job application schema. |
| `server/src/Models/AssesmentModel.js` | Assessment schema. |
| `server/src/Models/AttemptedAssessmentModel.js` | Candidate assessment attempt and result schema. |
| `server/src/Models/InterviewModel.js` | Interview scheduling and participant schema. |
| `server/src/Utils/` | Shared helpers for AI workflows, resume parsing, assessments, and cookies. |
| `server/src/Utils/AssessmentCreate.js` | Helpers for creating assessment content. |
| `server/src/Utils/AssessmentCheck.js` | Helpers for checking assessment answers or results. |
| `server/src/Utils/ResumeTextExtraction.js` | Extracts text from uploaded resumes. |
| `server/src/Utils/ParseResumeWithAI.js` | Uses AI to interpret extracted resume content. |
| `server/src/Utils/MatchScoreWithAI.js` | Generates an AI-assisted resume/job match score. |
| `server/src/Utils/authCookieOptions.js` | Shared authentication cookie settings. |
| `server/src/Utils/testGemini.js` | Utility for testing the Gemini integration. |
| `server/src/Utils/testOpenAI.js` | Utility for testing the OpenAI integration. |
| `server/src/config/` | Connections and clients for external services. |
| `server/src/config/db.js` | Connects the application to MongoDB. |
| `server/src/config/redis.js` | Creates and connects the Redis client. |
| `server/src/config/OpenA.js` | Configures the OpenAI client. |
| `server/src/config/Gemini.js` | Configures the Google Gemini client. |
| `server/src/config/imageKit.js` | Configures the ImageKit client for file storage. |
| `server/package.json` | Backend dependencies and start/development scripts. |
| `server/package-lock.json` | Exact npm dependency versions for reproducible installs. |
| `server/.gitignore` | Backend-specific files excluded from Git. |

### Repository root

| Path | Purpose |
| --- | --- |
| `README.md` | Main project documentation and local setup guide. |
| `index.js` | Root-level launcher that starts the backend in its configured deployment environment. |
| `sillydev.conf` | Deployment configuration file. |

> Some filenames retain their original spelling in the repository (for example, `CanddateJob.jsx` and `ApplicatonModel.js`); the documentation uses those names so they can be located exactly.

## Request flow

1. The browser loads the React application from `frontend/`.
2. The frontend sends API requests to `VITE_API_URL`, which should include `/api/v1`.
3. Express routes requests to the appropriate controller.
4. Controllers read or update MongoDB through Mongoose models and call external services when needed.
5. Socket.IO and PeerJS support signaling for live video interviews.

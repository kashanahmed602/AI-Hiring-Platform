console.log("🚀 Starting HireFlow app...");

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const { connectRedis } = require('./config/redis');

const app = express();

// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:3000',
//   'https://kas-hireflow.vercel.app'
// ];

// const cors = require('cors');

app.use(cors({
  origin: true,        // har origin allow
  credentials: true
}));

app.options('*', cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', require('./Routes/userRoute'));
app.use('/api/v1', require('./Routes/RecruiterRoute'));
app.use('/api/v1', require('./Routes/authRoutes'));
app.use('/api/v1', require('./Routes/JobRoutes'));
app.use('/api/v1', require('./Routes/ApplicationRoutes'));
app.use('/api/v1', require('./Routes/AssessmentRoutes'));
app.use('/api/v1', require('./Routes/InterviewRoutes'));

console.log("✅ All routes loaded successfully");

connectDB();
connectRedis();

module.exports = app;
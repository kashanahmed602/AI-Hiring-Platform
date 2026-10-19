console.log("🚀 Starting HireFlow app...");

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const { connectRedis } = require('./config/redis');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['set-cookie']
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
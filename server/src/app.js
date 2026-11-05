console.log("🚀 Starting HireFlow app...");

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const { connectRedis } = require('./config/redis');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8059',
  // 'https://kas-hireflow.vercel.app'
].filter(Boolean); // Filter out any undefined values

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
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
app.use('/api/v1', require('./Routes/notificationRoutes'));

console.log("✅ All routes loaded successfully");


connectDB();
connectRedis();

module.exports = app;
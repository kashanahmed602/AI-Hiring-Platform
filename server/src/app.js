console.log("🚀 Starting HireFlow app...");

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const { connectRedis } = require('./config/redis');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://kas-hireflow.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps / curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// Preflight ke liye explicitly
app.options('*', cors());

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
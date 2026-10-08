const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const {connectRedis} = require('./config/redis');

connectDB();
connectRedis();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());

app.use('/api/v1', require('./Routes/userRoute'));
app.use('/api/v1', require('./Routes/RecruiterRoute'))
app.use('/api/v1', require('./Routes/authRoutes'))
app.use('/api/v1', require('./Routes/JobRoutes'))
app.use('/api/v1', require('./Routes/ApplicationRoutes'))
app.use('/api/v1', require('./Routes/AssessmentRoutes'))

module.exports = app;
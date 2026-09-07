const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

connectDB();
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


module.exports = app;
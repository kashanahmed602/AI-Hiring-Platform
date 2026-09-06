const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

connectDB();
const app = express();
app.use(cors());


module.exports = app;
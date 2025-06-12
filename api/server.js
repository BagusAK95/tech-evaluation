// Core modules and third-party dependencies
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Internal modules
import connectDB from './config/db.js';
import router from './router/index.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API routes
app.use('/api', router);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5800;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Core modules and third-party dependencies
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import morgan from 'morgan'

// Internal modules
import connectDB from './config/db.js';
import router from './router/index.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
const morganOptions = {
  skip: (req, res) => res.statusCode != 500 // Only log error
}

// Middleware setup
app.use(morgan('combined', morganOptions)); // Logger
app.use(helmet()); // Default security headers
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(mongoSanitize()); // Prevent NoSQL injection attacks
app.use(cookieParser()); // Parse cookies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(limiter); // Rate limiting

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

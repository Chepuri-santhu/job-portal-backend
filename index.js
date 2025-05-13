import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './router/user.route.js';
import companyRoute from './router/company.router.js';
import jobRoute from './router/job.router.js';
import applyRoute from './router/application.router.js';

dotenv.config();

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Options Configuration
const corsOptions = {
  origin: '*', // Allow requests from the frontend domain
  credentials: true, // Allow cookies to be sent along with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow the listed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions)); // CORS for preflight requests

// Routes for handling requests
app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/job', jobRoute);
app.use('/application', applyRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});

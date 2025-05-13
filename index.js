import express from 'express';
import cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./router/user.route.js";
import companyRoute from "./router/company.router.js";
import jobRoute from "./router/job.router.js";
import applyRoute from "./router/application.router.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

// CORS configuration (only your deployed frontend)
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applyRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});

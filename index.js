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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

const corsOptions = {
  origin: "https://job-portal-theta-lyart.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 🟢 include OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🟢 important for preflight

// Routes
app.use("/user", userRoute);
app.use("/company", companyRoute);
app.use("/job", jobRoute);
app.use("/application", applyRoute);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});

import express from "express";
import isAuthenticated  from "../MIddleware/isAuthenticated.js";
import { getJobById ,getAllJobs,getAdminJob,postJob} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getadminJob").get(isAuthenticated,getAdminJob);

export default router;
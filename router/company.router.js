import express from "express";
import isAuthenticated  from "../MIddleware/isAuthenticated.js";
import { getCompany, registerComapny, updateCompany ,companyById} from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerComapny);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,companyById);
router.route("/update/:id").put(isAuthenticated,updateCompany);

export default router;
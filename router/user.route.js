import express from "express";
import { login,register,updateProfile,logout} from "../controllers/user.controller.js";
import isAuthenticated  from "../MIddleware/isAuthenticated.js";
import { singleUpload } from "../MIddleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,updateProfile);
router.route("/logout").get(logout);

export default router;
import { Router } from "express";
import { getAllUsers, getProfile,  loginAdmin, updateProfile,changeAdminPassword } from "../controllers/adminController.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/profile").post(getProfile);
router.route("/list-users").post(getProfile);
router.route("/profile/update").put(updateProfile);
router.route("/change-password").post(changeAdminPassword);
router.route('/get-all-users').get(getAllUsers);

export default router;

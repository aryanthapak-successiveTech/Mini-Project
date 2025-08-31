import express from "express";
import {getUsers,profileDetails,getUserBookRequestHistory} from "../Controller/UserController.js";
import { authChecker, roleBasedAccess, verifyAdminRegistration } from "../Middlwares/AuthMiddleware.js";
import {loginHandler,refreshHandler,logoutHandler, createUser} from "../Controller/AuthController.js";

const router = express.Router();
router.route("/").get(authChecker,roleBasedAccess(["Admin"]),getUsers);
router.route("/refresh").get(refreshHandler);
router.route("/signup").post(verifyAdminRegistration,createUser);
router.route("/login").post(loginHandler);
router.route("/profile").get(authChecker,profileDetails);
router.route("/logout").post(logoutHandler);
router.route("/requests").get(authChecker,getUserBookRequestHistory);

export default router;

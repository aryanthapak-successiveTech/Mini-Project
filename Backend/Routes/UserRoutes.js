const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");
const authController = require("../Controller/AuthController");
const { authChecker, roleBasedAccess, verifyAdminRegistration } = require("../Middlwares/AuthMiddleware");
router.route("/").get(authChecker,roleBasedAccess(["Admin"]),userController.getUsers);
router.route("/refresh").get(authController.refreshHandler);
router.route("/signup").post(verifyAdminRegistration,userController.createUser);
router.route("/login").post(authController.loginHandler);
router.route("/profile").get(authChecker,userController.profileDetails);
router.route("/logout").post(authController.logoutHandler);

module.exports = router;

import express from "express";
import { checkIssuedBooks,reIssueBook,returnBook,statistics } from "../Controller/IssuedBookController.js";
import { authChecker, roleBasedAccess } from "../Middlwares/AuthMiddleware.js";

const router = express.Router();

router.route("/").post(authChecker,roleBasedAccess(["Admin"]),checkIssuedBooks);
router.route("/return").post(authChecker,roleBasedAccess(["Admin"]),returnBook);
router.route("/statistics").get(authChecker,roleBasedAccess(["Admin"]),statistics);
router.route("/re-issue-book").post(authChecker,roleBasedAccess(["Admin"]),reIssueBook);
export default router;

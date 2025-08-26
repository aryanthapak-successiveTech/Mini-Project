const express = require("express");
const issuedBookController = require("../Controller/IssuedBookController");
const { authChecker, roleBasedAccess } = require("../Middlwares/AuthMiddleware");

const router = express.Router();

router.route("/").post(authChecker,roleBasedAccess(["Admin"]),issuedBookController.checkIssuedBooks);
router.route("/return").post(authChecker,roleBasedAccess(["Admin"]),issuedBookController.returnBook);
router.route("/statistics").get(authChecker,roleBasedAccess(["Admin"]),issuedBookController.statistics);
router.route("/re-issue-book").post(authChecker,roleBasedAccess(["Admin"]),issuedBookController.reIssueBook);
module.exports = router;

const express = require("express");
const RequestController = require("../Controller/RequestController");
const {authChecker,roleBasedAccess} = require("../Middlwares/AuthMiddleware");
const router = express.Router();
router.route("/checkRequests").get(authChecker, RequestController.checkRequests);
router.route("/requestBook").post(authChecker, RequestController.requestBook);
router.route("/approve").post( authChecker,roleBasedAccess(["Admin"]),RequestController.approveRequest);
module.exports = router;

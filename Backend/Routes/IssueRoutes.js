import express from "express";
import {checkRequests,requestBook,approveRequest} from "../Controller/RequestController.js";
import { authChecker, roleBasedAccess } from "../Middlwares/AuthMiddleware.js"

const router = express.Router();
router.route("/checkRequests").get(authChecker, checkRequests);
router.route("/requestBook").post(authChecker, requestBook);
router.route("/approve").post( authChecker,roleBasedAccess(["Admin"]),approveRequest);
export default router;

import { createReview,getReviewsByUser,getReviewsForBook,deleteReview } from "../Controller/ReviewController.js";
import express from "express";
import { authChecker } from "../Middlwares/AuthMiddleware.js";

const router=express.Router();

router.post("/",authChecker,createReview);

export default router;
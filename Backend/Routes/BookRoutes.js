import express from "express";
import { getBooks,getBook } from "../Controller/BookController.js";
import { authChecker } from "../Middlwares/AuthMiddleware.js";

const router = express.Router();
router.route("/").get(authChecker,getBooks);
router.route("/:id").get(authChecker,getBook);

export default router;

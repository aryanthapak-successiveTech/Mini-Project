import express from "express";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../Controller/BookController.js";
import { authChecker, roleBasedAccess } from "../Middlwares/AuthMiddleware.js";
import { upload } from "../Middlwares/UploadMiddlware.js";

const router = express.Router();
router
  .route("/")
  .get(authChecker, getBooks)
  .post(authChecker, roleBasedAccess(["Admin"]),upload.single("ebook"),createBook);

router
  .route("/:id")
  .get(authChecker, getBook)
  .patch(authChecker, roleBasedAccess(["Admin"]),upload.single("ebook"), updateBook)
  .delete(authChecker, roleBasedAccess(["Admin"]), deleteBook);

export default router;

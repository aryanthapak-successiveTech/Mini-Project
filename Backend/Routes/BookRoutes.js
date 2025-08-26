const express = require("express");
const router = express.Router();
const bookController = require("../Controller/BookController");
const { authChecker } = require("../Middlwares/AuthMiddleware");

router.route("/").get(authChecker,bookController.getBooks);
router.route("/:id").get(authChecker,bookController.getBook);

module.exports = router;

const express = require("express");
const router = express.Router();
const booksController = require("../controllers/bookController");

router
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.createNewBook)
  .patch(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;

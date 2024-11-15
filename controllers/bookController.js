const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().lean().exec();
  if (!books?.length) {
    return res.status(400).json({ message: "No Books found" });
  }
  res.json(books);
});
const createNewBook = asyncHandler(async (req, res) => {
  const { title, genre, published, author, content, image } = req.body;
  if (!genre || !title || !content || !published || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await Book.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(400).json({ message: "Duplicate Book Exist" });
  }
  const note = {
    title,
    genre,
    published,
    author,
    content,
  };
  const result = await Book.create(note);
  if (result) {
    return res.status(201).json({ message: "Book Created" });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

const updateBook = asyncHandler(async (req, res) => {
  const { id, title, genre, published, author, content } = req.body;
  if (!id || !title || !genre || !published || !author || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const book = await Book.findById(id).exec();
  if (!book) {
    return res.status(400).json({ message: "No Book Found" });
  }
  const duplicate = await Book.findOne({ title }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Book Exist" });
  }
  book.genre = genre;
  book.author = author;
  book.title = title;
  book.content = content;
  book.published = published;

  const result = await book.save();
  if (result) {
    return res.status(200).json({ message: "Book Updated" });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const book = await Book.findById(id).exec();
  if (!book) {
    return res.status(400).json({ message: "No Book Exist" });
  }
  const result = await Book.deleteOne();
  if (result) {
    return res.status(200).json({ message: "Book Deleted!" });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = { getAllBooks, updateBook, deleteBook, createNewBook };

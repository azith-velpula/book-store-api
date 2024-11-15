const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, require: true },
  genre: {
    type: String,
    require: true,
  },
  published: {
    type: Number,
    require: true,
  },
  author: {
    type: String,
    default: "Unknown author",
  },
  content: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Book", bookSchema);

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  year: {
    type: Number,
    min: [1700, "Year should be greater than or equal to 1900"],
    max: [
      new Date().getFullYear(),
      "Year should be less than or equal to the current year",
    ],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

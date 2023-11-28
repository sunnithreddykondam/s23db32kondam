const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author: {
    type: String,
    validate: {
      validator: function (value) {
        // Use a regular expression to check if the value contains only alphabets
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "Author should contain only alphabets",
    },
    required: true,
  },
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

var Book = require("../models/book");
// List of all Books
exports.book_list = async function (req, res) {
  // res.send('NOT IMPLEMENTED: Book list');
  try {
    theBook = await Book.find();
    res.send(theBook);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// for a specific Book.
exports.book_detail = async function (req, res) {
  res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);
};
// Handle Book create on POST.
exports.book_create_post = async function (req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};
// Handle Book delete form on DELETE.
exports.book_delete = async function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete DELETE " + req.params.id);
};
// Handle Book update form on PUT.
exports.book_update_put = async function (req, res) {
  res.send("NOT IMPLEMENTED: Book update PUT" + req.params.id);
};

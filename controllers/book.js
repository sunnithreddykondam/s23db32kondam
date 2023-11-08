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
exports.book_view_all_Page = async function (req, res) {
  try {
    theBooks = await Book.find();
    console.log(theBooks);
    res.render("book", { title: "Book Search Results", results: theBooks });
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
  //   res.send("NOT IMPLEMENTED: Book create POST");
  console.log(req.body);
  let document = new Book();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"costume_type":"goat", "cost":12, "size":"large"}
  document.name = req.body.name;
  document.author = req.body.author;
  document.year = req.body.year;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// Handle Book delete form on DELETE.
exports.book_delete = async function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete DELETE " + req.params.id);
};
// Handle Book update form on PUT.
exports.book_update_put = async function (req, res) {
  res.send("NOT IMPLEMENTED: Book update PUT" + req.params.id);
};

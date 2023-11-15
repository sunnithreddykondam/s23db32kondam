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
  // res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);
  console.log("detail" + req.params.id);
  try {
    result = await Book.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
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
  // res.send("NOT IMPLEMENTED: Book delete DELETE " + req.params.id);
  console.log("delete " + req.params.id);
  try {
    result = await Book.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
};
// Handle Book update form on PUT.
exports.book_update_put = async function (req, res) {
  // res.send("NOT IMPLEMENTED: Book update PUT" + req.params.id);
  console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Book.findById(req.params.id);
    // Do updates of properties
    if (req.body.name) toUpdate.name = req.body.name;
    if (req.body.cost) toUpdate.cost = req.body.cost;
    if (req.body.size) toUpdate.size = req.body.size;
    let result = await toUpdate.save();
    console.log("Sucess " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
  }
};

exports.book_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    result = await Book.findById(req.query.id);
    res.render("bookdetail", { title: "Book Detail", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.book_create_Page = function (req, res) {
  console.log("create view");
  try {
    res.render("bookcreate", { title: "Book Create" });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a costume.
// query provides the id
exports.book_update_Page = async function (req, res) {
  console.log("update view for item " + req.query.id);
  try {
    let result = await Book.findById(req.query.id);
    res.render("bookupdate", { title: "Book Update", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle a delete one view with id from query
exports.book_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    result = await Book.findById(req.query.id);
    res.render("bookdelete", { title: "Book Delete", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

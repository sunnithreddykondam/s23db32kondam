var express = require("express");
var router = express.Router();
// Require controller modules.
var api_controller = require("../controllers/api");
var book_controller = require("../controllers/book");
/// API ROUTE ///
// GET resources base.
router.get("/", api_controller.api);
// POST request for creating a Book.
router.post("/books", book_controller.book_create_post);
// DELETE request to delete Book.
router.delete("/books/:id", book_controller.book_delete);
// PUT request to update Book.
router.put("/books/:id", book_controller.book_update_put);
// GET request for one Book.
// router.get("/books/:id", book_controller.book_detail);
// GET request for list of all Book items.
router.get("/books", book_controller.book_list);
// router.get("/books", book_controller.book_view_all_Page);
module.exports = router;

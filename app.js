var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Book = require("./models/book");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })
);

require("dotenv").config();
const connectionString = process.env.MONGO_CON;
const mongoose = require("mongoose");
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

async function recreateDB() {
  // Delete everything
  await Book.deleteMany();
  let book1 = new Book({ name: "Moby-Dick", author: "Herman", year: 1851 });
  let book2 = new Book({
    name: "Wuthering Heights",
    author: "Emily",
    year: 1847,
  });
  let book3 = new Book({
    name: "War and Peace",
    author: "Tolstoy",
    year: 1869,
  });
  book1
    .save()
    .then((doc) => {
      console.log("First object saved");
    })
    .catch((err) => {
      console.error(err);
    });
  book2
    .save()
    .then((doc) => {
      console.log("Second object saved");
    })
    .catch((err) => {
      console.error(err);
    });
  book3
    .save()
    .then((doc) => {
      console.log("Third object saved");
    })
    .catch((err) => {
      console.error(err);
    });
}
let reseed = true;
if (reseed) {
  recreateDB();
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bookRouter = require("./routes/book");
var boardRouter = require("./routes/board");
var chooseRouter = require("./routes/choose");
var resourceRouter = require("./routes/resource");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/book", bookRouter);
app.use("/board", boardRouter);
app.use("/choose", chooseRouter);
app.use("/resource", resourceRouter);

// catch 404 and forward to error handler

var Account = require("./models/account");
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

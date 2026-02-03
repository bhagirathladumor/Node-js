const express = require("express");
const Cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
require("./config/db.config");
require("./config/passport.config");

const app = express();
const port = 9000;

app.use(Cookie());
app.use(
  session({
    name: "AdminSession",
    secret: "B@hir1809",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/"));

app.listen(port, (err) => {
  if (err) {
    console.log("Server Is Not Started!!!😞😞😞");
    return false;
  }

  console.log("Server Started Successfully😁😁😁");
});

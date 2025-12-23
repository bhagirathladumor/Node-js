const hotel = require("./model/hotel.model");
const express = require("express");
require("./config/db.config");
const app = express();

const PORT = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  const bookings = await hotel.find();
  res.render("index", { bookings });
});

app.get("/add",(req, res) => {
  res.render("form");
});

app.post("/add", async (req, res) => {
  const booking = req.body;
  await hotel.create(booking);
  res.redirect("/");
});

app.post("/book", (req, res) => {
  const bookingData = req.body;
  // Here, you would typically save bookingData to a database
  res.render("/form");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await hotel.findByIdAndDelete(id);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const booking = await hotel.findById(id);
  res.render("editForm", { booking });
});

app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  await hotel.findByIdAndUpdate(id, updatedData);
  res.redirect("/");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("server is not started", err);
    return false;
  } else {
    console.log("server is started");
  }
});

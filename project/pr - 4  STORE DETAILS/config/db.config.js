const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/hotel-booking-system";
mongoose
  .connect(url)
  .then(() => {
    console.log("Database Is Connected 😁😁😁");
  })
  .catch((err) => {
    console.log("Data Base Is Note Conected 😒");
  });

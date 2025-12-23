const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  roomType: { type: String, required: true },
  status: { type: String, required: true },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;

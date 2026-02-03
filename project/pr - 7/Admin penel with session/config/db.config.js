const mongoose = require("mongoose")
const URI = "mongodb://localhost:27017/admin-penel-seesion"

mongoose.connect(URI).then(() => {
    console.log("mongoDB is connected");
}).catch(err => {
    console.log("mongoDB is not connected");
})
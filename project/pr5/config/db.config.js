const mongoose = require("mongoose")

const URI = "mongodb://localhost:27017/Builder"

mongoose.connect(URI).then(() => {
    console.log("mongodb is connected");
    
}).catch(err => {
    console.log("mongodb is not connected",err);
    
})

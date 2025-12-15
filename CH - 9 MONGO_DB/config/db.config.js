const mongoose = require('mongoose');       
const uri = "mongodb://localhost:27017/try";

mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB connected successfully....!");
    })
    .catch((err) => {
        console.error("MongoDB not connected....!", err);
    }).finally(() => {
        console.log("Connection attempt finished.");
    });

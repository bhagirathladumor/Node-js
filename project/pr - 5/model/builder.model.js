const mongoose = require("mongoose")

const builderSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    Compony_name : {
        type : String,
        require : true,
    },
    project : {
        type : String,
        require : true,
    },
    rating : {
        type : Number,
        require : true,
    },
    image : {
        type : String,
        require : true,
    },
})

module.exports = mongoose.model("builder", builderSchema, "builder");
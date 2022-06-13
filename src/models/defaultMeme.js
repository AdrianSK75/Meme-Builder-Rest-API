const mongoose = require("mongoose");

const defaultMemeSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("defaultMeme", defaultMemeSchema)
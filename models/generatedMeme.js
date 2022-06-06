const mongoose = require("mongoose");

const generatedMemeSchema = new mongoose.Schema({
    top_text: {
        type: String,
        required: true
    },
    bottom_text: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("generatedMeme", generatedMemeSchema)
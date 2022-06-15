const mongoose = require("mongoose");

const generatedMemeSchema = new mongoose.Schema({
    top_text: {
        type: String,
        required:[true, "Top Text is required"]
    },
    bottom_text: {
        type: String,
        required: [true, "Bottom Text is required"]
    },
    file: {
        type: String,
        required: [true, "File Name is required"]
    }
})

module.exports = mongoose.model("generatedMeme", generatedMemeSchema)
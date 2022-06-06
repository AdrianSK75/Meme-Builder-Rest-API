const Meme = require("../../models/generatedMeme");
async function show(req, res) {
    try {
        const memes = await Meme.find()
        return memes
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
module.exports = {
    show
}
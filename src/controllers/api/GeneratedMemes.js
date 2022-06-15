const Meme = require("../../models/generatedMeme");
const fs = require("fs")

async function getMemes(req, res, next) {
    const memes = await _retrieveMemes();
    let offset = req.query.offset == null ? 0 : parseInt(req.query.offset);
    let limit = req.query.limit == null ?  memes.length - 1 : parseInt(req.query.limit)
    try {
        const response = await Meme.find().skip(offset).limit(limit);
        res.status(200).json(response)
    } catch (e) {
        next
    }
}
async function deleteFiles(res, req, next) {
    const memes = await _retrieveMemes();
    memes.forEach(meme => {
        const path = `./public/images/generated/${meme.file}.jpg`
        try {
            fs.unlinkSync(path)
        } catch (err) {
            next
        }
    })
    await _deleteMemes(res, req)
}
async function _retrieveMemes(req, res, next) {
    try { 
        return await Meme.find()
    } catch (err) {
        next
    }
}
async function _deleteMemes(res, req, next) {
    try {
        await Meme.deleteMany();
        res.json("All memes are deleted")
    } catch (e) {
        next
    }
}

module.exports = {
    getMemes,
    deleteFiles,
}

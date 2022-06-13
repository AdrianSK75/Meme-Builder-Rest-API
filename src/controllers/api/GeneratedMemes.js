const Meme = require("../../models/generatedMeme");
const fs = require("fs")

async function getMemes(req, res) {
    const memes = await _countMemes();
    let offset = req.query.offset == null ? 0 : parseInt(req.query.offset);
    let limit = req.query.limit == null ?  memes.length - 1 : parseInt(req.query.limit)
    try {
        const response = await Meme.find().skip(offset).limit(limit);
        res.status(200).json(response)
    } catch (e) {
        console.error(e);
    }
}
async function deleteFiles(res, req) {
    const memes = await _retrieveMemes();
    memes.forEach(meme => {
        const path = `./public/images/generated/${meme.file}.jpg`
        try {
            fs.unlinkSync(path)
        } catch (e) {
            console.error(e)
        }
    })
    await _deleteMemes(res, req)
}
async function _countMemes(req, res) {
    try { 
        return await Meme.find().count()
    } catch (err) {
        console.error(err)
    }
}
async function _deleteMemes(res, req) {
    try {
        await Meme.deleteMany();
        res.json("All memes are deleted")
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    getMemes,
    deleteFiles,
}

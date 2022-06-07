const Meme = require("../../models/generatedMeme");
const fs = require("fs")

async function showMemes(req, res) {
    const memes = await getMemes();
    const response = new Array();
    let offset = req.params.offset == null ? 0 : parseInt(req.params.offset);
    let limit = req.params.limit == null ?  memes.length - 1 : parseInt(req.params.limit)
    
    if (memes.length === 0) {
            res.status(404).json({ message: "The memes table is empty!" })
            return;
    }

    for (let i = offset; i <= limit; ++i) {
            response.push(memes.at(i));
    }
    res.status(200).json(response)
}
async function deleteFiles(res, req) {
    const memes = await getMemes();
    memes.forEach(meme => {
        const path = `./public/images/generated/${meme.file}.jpg`
        try {
            fs.unlinkSync(path)
        } catch (e) {
            console.error(e)
        }
    })
    await deleteMemes(res, req)
}
async function deleteMemes(res, req) {
    try {
        await Meme.deleteMany();
        res.json("All memes are deleted")
    } catch (e) {
        console.error(e)
    }
}
async function getMemes() {
    try { 
        return await Meme.find()
    } catch (err) {
        console.error(err)
    }
}
module.exports = {
    showMemes,
    deleteFiles,
    deleteMemes
}
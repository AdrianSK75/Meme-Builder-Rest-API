const express = require("express");
const fs = require("fs")
const router = express.Router();
const defaultMemes = require("../../controllers/api/DefaultMemes");
const post = require("../../controllers/api/Post");
const generatedMemes = require("../../controllers/api/GeneratedMemes")
// GET Default Memes
router.get('/getDefaultMemes', defaultMemes.getMemes);
// POST The Meme
router.post("/createMeme", post.createMeme)
// GET Generated Memes
router.get('/getGeneratedMemes', generatedMemes.getMemes)
// DELETE All Generated Memes from DB
router.delete("/deleteGeneratedMemes", generatedMemes.deleteFiles)

router.get("/create-txt-file", (req, res, next) => {
    const text = req.query.txt;
    fs.writeFileSync(`./public/text/${text}.txt`, text)
    res.status(201).json("File created!")
})

module.exports = router
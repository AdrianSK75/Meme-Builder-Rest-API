const express = require("express");
const router = express.Router();
const defaultMemes = require("../../controllers/api/DefaultMemes");
const post = require("../../controllers/api/Post");
const generatedMemes = require("../../controllers/api/GeneratedMemes")
// GET Default Memes
router.get('/getDefaultMemes', defaultMemes.showMemes);
// POST The Meme
router.post("/generateMemes", post.meme)
// GET Generated Memes
router.get('/getGeneratedMemes', generatedMemes.showMemes)
router.get('/getGeneratedMemes/:offset-:limit', generatedMemes.showMemes)
// DELETE All Generated Memes from DB
router.delete("/deleteGeneratedMemes", generatedMemes.deleteFiles)

module.exports = router
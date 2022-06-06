const express = require("express");
const router = express.Router();
const defaultMemes = require("../../controllers/api/DefaultMemes");
const post = require("../../controllers/api/Post");

// GET Default Memes
router.get('/getDefaultMemes', defaultMemes.show);
// POST The Meme
router.post("/generateMemes", post.meme)
// GET Generated Memes
router.get('/getGeneratedMemes', async (req, res) => {
    // From this path I will retrieve the generated memes from Database
})

module.exports = router
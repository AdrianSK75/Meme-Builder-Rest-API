const fs = require("fs")
const { createCanvas, loadImage, Image } = require("canvas")
const Meme = require("../../models/generatedMeme")

function createMeme(req, res, next) {
    const { top_text, bottom_text, file } = req.body;
    if (!top_text || !bottom_text || !file) {
        res.status(422).json("Post request denied! You missed one or more required fields!")
        return;
    }
    fs.readFile(`public/images/default/${req.body.file}.jpg`, function(err, data) {
        if (err) throw err
        // Defining the constants
        const { width, height, fontSize, yOffset } = _manageTheImage(data);
        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d")
        const topText = req.body.top_text.toUpperCase();
        const bottomText = req.body.bottom_text.toUpperCase();
       
        loadImage(data).then(loadedImage => {
            context.drawImage(loadedImage, 0, 0);
            context.strokeStyle = "black";
            context.lineWidth = Math.floor(fontSize / 4);
            context.fillStyle = "white";
            context.textAlign = "center";
            context.lineJoin = "round";
            context.font = `${fontSize}px Impact`;
            // Add top text
            context.textBaseline = "top";
            context.strokeText(topText, width / 2, yOffset);
            context.fillText(topText, width / 2, yOffset);
            // Add bottom text
            context.textBaseline = "bottom";
            context.strokeText(bottomText, width / 2, height - yOffset);
            context.fillText(bottomText, width / 2, height - yOffset);
            // Creating the file
            const newFileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const buffer = canvas.toBuffer('image/jpeg')
            fs.writeFileSync(`./public/images/generated/${newFileName}.jpg`, buffer)
            // Post the image to database
            _postData(res, newFileName, topText, bottomText, next);
        })     
    })
}
async function _postData(res, filename, topText, bottomText, next) {
    const meme = new Meme({
        top_text: topText,
        bottom_text: bottomText,
        file: filename
    })
    try {
        const newMeme = await meme.save()
        res.status(201).json(newMeme)
    } catch (err) {
        next
    }
}
function _manageTheImage(source) {
    const src = source;
    return {
        img: _getChoosedImage(src),
        width: _getImageWidth(src),
        height: _getImageHeight(src),
        fontSize: _getTextFontSize(src),
        yOffset: _getTextOffset(src)
    }
}
function _getChoosedImage(source) {
    const image = new Image();
    image.src = source
    return image
}
function _getImageWidth(source) {
    const image = _getChoosedImage(source);
    return image.width;
}
function _getImageHeight(source) {
    const image = _getChoosedImage(source);
    return image.height;
}
function _getTextFontSize(source) {
    const width = _getImageWidth(source);
    return Math.floor(width / 10) - 10;
}
function _getTextOffset(source) {
    const height = _getImageHeight(source)
    return height / 25;
}

module.exports = {
    createMeme
}
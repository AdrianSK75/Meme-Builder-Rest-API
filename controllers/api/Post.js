const fs = require("fs")
const { createCanvas, loadImage, Image } = require("canvas")
const Meme = require("../../models/generatedMeme")

function meme(req, res) {
    fs.readFile(`public/images/default/${req.body.file}.jpg`, function(err, data) {
        if (err) throw err;
        // Defining the constants
        const { width, height, fontSize, yOffset } = manageTheImage(data);
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
            postData(res, newFileName, topText, bottomText);
        })     
    })
}
async function postData(res, filename, topText, bottomText) {
    const meme = new Meme({
        top_text: topText,
        bottom_text: bottomText,
        file: filename
    })
    try {
        const newMeme = await meme.save()
        res.status(201).json(newMeme)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
function manageTheImage(source) {
    const src = source;
    return {
        img: getChoosedImage(src),
        width: getImageWidth(src),
        height: getImageHeight(src),
        fontSize: getTextFontSize(src),
        yOffset: getTextOffset(src)
    }
}
function getChoosedImage(source) {
    const image = new Image();
    image.src = source
    return image
}
function getImageWidth(source) {
    const image = getChoosedImage(source);
    return image.width;
}
function getImageHeight(source) {
    const image = getChoosedImage(source);
    return image.height;
}
function getTextFontSize(source) {
    const width = getImageWidth(source);
    return Math.floor(width / 10) - 10;
}
function getTextOffset(source) {
    const height = getImageHeight(source)
    return height / 25;
}

module.exports = {
    meme
}
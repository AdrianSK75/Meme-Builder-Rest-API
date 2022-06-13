const express = require('express')
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const logger = require("morgan")
const app = express()
const port = 5000
const dbURL = "mongodb+srv://Rares:parola12345@cluster0.jxvkaa4.mongodb.net/meme?retryWrites=true&w=majority"

// Middleware
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => app.listen(port, () => {console.log(`Express party at port: ${port}`)}))
      .catch((err) => console.log(err));

const memes = require("./src/routes/api/memes")
app.use("/api/meme-builder", memes)

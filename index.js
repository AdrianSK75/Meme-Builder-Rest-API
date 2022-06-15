require("dotenv").config({silent: true})
const express = require('express')
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const logger = require("morgan")
const app = express()
const port = 5000
const dbURL = "mongodb+srv://Rares:parola12345@cluster0.jxvkaa4.mongodb.net/meme?retryWrites=true&w=majority"

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
            app.listen(port, () => {console.log(`Express party at port: ${port}`)})
      })
      .catch((err) => console.log(err));

// Middleware
app.use(logger("dev"))
app.use(bodyParser.json())
app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
      next()
})
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
      const apiKey = !req.get("API_KEY") ? req.query.api_key : req.get("API_KEY");
      if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({error: '401 unauthorised'.toUpperCase()})
      } else {
        next()
      }
})

const memes = require("./src/routes/api/memes")
app.use("/api/meme-builder", memes)



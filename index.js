require("dotenv").config({silent: true})
const express = require('express')
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const logger = require("morgan")
const app = express()
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
            app.listen(port, () => {console.log(`Express party at port: ${port}`)})
      })
      .catch((err) => console.error(err.message));


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
        res.status(401).json({error: "Authentication Denied!"})
      } else {
        next()
      }
})
app.use((err, res, req, next) => {
      res.status(422).json({ error: err.message })
})

const memes = require("./src/routes/api/memes")
app.use("/api/", memes)
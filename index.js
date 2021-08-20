const express = require('express')
const app = express()
const consign = require('consign')
const db = require("./config/db")

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routers.js')
    .into(app)

app.listen(4000, () => {
    console.log("Backend executando!!")
})
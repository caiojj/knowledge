const express = require('express')
const app = express()
const consign = require('consign')
const db = require("./config/db")
const morgan = require('morgan')
const path = require('path')
app.db = db

app.use(morgan('dev')) // monitora as requedições

app.use(
    '/profile', 
    express.static(path.resolve(__dirname, 'tmp', 'profile'))
)

consign()
    .include('./config/passport.js')
    .then('./config/multer.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routers.js')
    .into(app)

app.listen(4000, () => {
    console.log("Backend executando!!")
})
require('dotenv').config()

const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//db connection
require('./connect')()

const links = require('./routes/links')

app.use('/', links)

port = process.env.NODE_ENV = 'production' ? process.env.OUR_PORT : process.env.APP_PORT

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} listening on port ${port}`)
})
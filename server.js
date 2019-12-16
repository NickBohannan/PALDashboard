require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const routes = require('./routes/index')
const Mail = require('./models/mail')
const Order = require('./models/order')
const Bin = require('./models/bin')
const Workflow = require('./models/workflow')
const Login = require('./models/login')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.use('/', routes)

const port = process.env.PORT || 8083

app.set('port', port)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.listen(port, () => {
    console.log("Server listening on port " + port)
})

Mail.sync()
Order.sync()
Bin.sync()
Workflow.sync()
Login.sync()
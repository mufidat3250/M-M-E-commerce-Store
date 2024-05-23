import {Request, Response, response} from 'express'
import 'express-async-errors'
const express = require('express')
const authRouter = require('./routes/auth') 
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use('/', express.static('./uploads'))

app.get('/', (request:Request, response:Response)=> {
    response.send('testing')
})

app.use('/api/v1/auth', authRouter)

app.use(errorHandler)

module.exports = app

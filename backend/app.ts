import {Request, Response, response} from 'express'
const express = require('express')
const authRouter = require('./routes/auth') 
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (request:Request, response:Response)=> {
    response.send('testing')
})

app.use('/auth', authRouter)

module.exports = app

import path from "path"

require('dotenv').config()
const express = require('express')

const app = require('./app')
const connectDB = require('./db/connection')
const logger = require('./utils/logger')

const start = async() => {
    const PORT = process.env.PORT || 3000
    
    try {
         await connectDB(process.env.MONGODB_URL)
        logger.info('Connection successful')
         app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`)
         })
    } catch (error) {
        logger.error(error)
    }
}

start()
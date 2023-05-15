import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'

const app = express()
dotenv.config()

// CONSTANTS
const SERVER_PORT = process.env.SERVER_PORT
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts ', postRoute)

async function start() {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
            console.log('connecting to db...')
        )
        app.listen(SERVER_PORT, () => console.log(`server started on port ${SERVER_PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
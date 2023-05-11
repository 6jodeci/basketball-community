import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

// CONSTANTS
const SERVER_PORT = process.env.SERVER_PORT
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

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
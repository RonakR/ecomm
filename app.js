// env vars
import * as dotenv from 'dotenv'
dotenv.config()

// postman
import postman from '@postman/postman-sdk'
// treblle
import treblle from '@treblle/express'

// db
import connectDB from "./db/connect.js"

// express
import express from "express";
import * as expressAsyncErrors from 'express-async-errors'
const app = express()

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use(express.json())

app.get('/', (req, res) => {
  res.send('e-comm api')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    // db connect
    await connectDB(process.env.MONGO_URL)
    // server start
    app.listen(port, console.log(`Server is listening on port ${port}...`))
    // postman telemetry
    postman.initialize({
      collectionId: '24422144-78465df7-cb85-4077-b864-80a0638f6af8',
      apiKey: process.env.POSTMAN_API_KEY,
      enable: true
    });
    // treblle telemetry
    app.use(
      treblle({
        apiKey: process.env.TREBLLE_API_KEY,
        projectId: process.env.TREBLLE_PROJECT_ID,
        additionalFieldsToMask: [],
      })
    )
  } catch (error) {
    console.log(error)
  }
}

start()
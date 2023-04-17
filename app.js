// env vars
require('dotenv').config()

// postman
const postman = require('@postman/postman-sdk')
// treblle
const treblle = require('@treblle/express')

// db
const connectDB = require('./db/connect')

// express
const express = require("express")
require('express-async-errors')

// other packages
const morgan = require('morgan')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
app.use(morgan('tiny'))
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
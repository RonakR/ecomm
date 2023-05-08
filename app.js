// env vars
require('dotenv').config()

// postman
const postman = require('@postman/postman-sdk')
// postman telemetry
postman.initialize({
  collectionId: '24422144-887b1173-5ea8-4dad-8df2-07cc4602ef4c',
  apiKey: process.env.POSTMAN_API_KEY,
  enable: true,
})

// treblle
const { useTreblle } = require('treblle')

// db
const connectDB = require('./db/connect')

// express
const express = require('express')
require('express-async-errors')

// other packages
const morgan = require('morgan')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// routers
const authRouter = require('./routes/authRoutes')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
// treblle telemetry
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_PROJECT_ID,
})

app.get('/', (req, res) => {
  res.send('e-comm api')
})

app.use('/api/v1', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    // db connect
    await connectDB(process.env.MONGO_URL)
    // server start
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()

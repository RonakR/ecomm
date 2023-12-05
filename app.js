// env vars
require('dotenv').config()

// postman
const postman = require('@postman/postman-sdk')
// postman telemetry
if (process.env.NODE_ENV === 'production') {
  postman.initialize({
    collectionId: process.env.POSTMAN_COLLECTION_ID,
    apiKey: process.env.POSTMAN_API_KEY,
    enable: true,
  })
}

// treblle
const { useTreblle } = require('treblle')

// db
const connectDB = require('./db/connect')

// express
const express = require('express')
require('express-async-errors')

// other packages
const morgan = require('morgan')
const cookieParse = require('cookie-parser')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

// treblle telemetry
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_PROJECT_ID,
})

app.get('/', (req, res) => {
  res.send('e-comm api')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('e-commerce api')
})

//! this naming is for swagger reasons
app.use(
  '/api/v1',
  authRouter
  /* 
      #swagger.tags = ['Auth']
  */
)
app.use('/api/v1', userRouter)

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

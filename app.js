// env vars
import * as dotenv from 'dotenv'
dotenv.config()

// express
import Express from "express";
const app = Express()

// db
import connectDB from "./db/connect.js"

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
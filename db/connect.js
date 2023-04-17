// const mongoose = require('mongoose');
import mongoose from "mongoose";

export default function connectDB (url) {
  mongoose.set('strictQuery', false);
  return mongoose.connect(url);
};
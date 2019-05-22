import mongoose from 'mongoose';
import { dbPath } from '../config/sec';
// const dbPath = 'mongodb://localhost:27017/short_url'

mongoose.connect(dbPath)

mongoose.connection.on('connected', () => {
   console.log('Mongoose connection open to '+dbPath);
});
/**
* Connection Exception Error Database Connection Error
*/
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: '+ err);
});
/**
* Connection disconnected connection abnormal disconnected
*/
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose
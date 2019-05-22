import mongoose from 'mongoose';
// import { dbPath } from '../config';
import { dbPath } from '../config/sec';

// export const database = () => {
//   mongoose.set('debug', true);

//   mongoose.connect(dbPath);

//   mongoose.connection.on('disconnected', () => {
//     mongoose.connect(dbPath);
//   });

//   mongoose.connection.on('error', err => console.log(err));

//   mongoose.connection.on('open', async () => console.log('mongo:', dbPath));
// }

// database()

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
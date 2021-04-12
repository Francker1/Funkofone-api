'use strict';

const mongoose = require('mongoose');
const connectDB = mongoose.connection;

/**
 * Conection to mongodb
 */
connectDB.on('open', () => {
  console.log(`conected to MongoDB in ${connectDB.name}`);
});

/**
 * If error in connection:
 */
connectDB.on('error', (err) => {
  console.error(`Connection error ${err}`);

  /** close conection */
  process.exit(1);
});

/**
 * This is the connection with DB, you must pass this object in params to avoid Mongoose warnings
 */
mongoose.connect('mongodb://localhost:27017/funkofone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connectDB;

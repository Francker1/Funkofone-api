const dataInit = require('../lib/data_initialize');
const connectDB = require('../config/connectDB');
const Phone = require('./models/Phone');

/**
 * When the connection is open, initialize collection phone
 */
connectDB.once('open', async () => {
  try {
    await initPhones();
    connectDB.close();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit();
  }
});

/**
 * Init Phone list, for first installation, remove all data and create new phones data
 */
const initPhones = async () => {
  await Phone.deleteMany();
  await Phone.insertMany(dataInit);
};

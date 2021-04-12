const express = require('express');
const router = express.Router();

/**
 * load phone model
 */
const Phone = require('../../database/models/Phone');

//Get all phone data

router.get('/', async (req, res, next) => {
  try {
    //get name if you can filter-search by name for example
    const name = req.query.name;
    const manufacturer = req.query.manufacturer;
    //const fields = req.query.fields || '-__v';

    // set new object to use later for filter data
    const filters = {};

    // next refactor: create a function that returns is undefined or not
    if (typeof name !== 'undefined') filters.name = new RegExp(name, 'i');
    if (typeof manufacturer !== 'undefined') filters.manufacturer = new RegExp(manufacturer, 'i');

    //list of phone filtered (or not)
    const phones = await Phone.find(filters);

    res.json(phones);
  } catch (err) {
    next(err);
  }
});

//Get one phone data

router.get('/4', (req, res, next) => {
  try {
    res.send('Hello World! One phone');
  } catch (err) {
    next(err);
  }
});

//Create phone

router.post('/', (req, res, next) => {
  try {
    res.send('Create phone');
  } catch (err) {
    next(err);
  }
});

//Update phone

router.put('/4', (req, res, next) => {
  try {
    res.send('Update phone');
  } catch (err) {
    next(err);
  }
});

//Delete phone

router.delete('/4', (req, res, next) => {
  try {
    res.send('Delete phone');
  } catch (err) {
    next(err);
  }
});

module.exports = router;

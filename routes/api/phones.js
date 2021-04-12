const express = require('express');
const router = express.Router();


//Get all phone data

router.get('/', (req, res, next) => {
  try {
    res.send('Hello World! all phones');
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

const express = require('express');
const router = express.Router();

const multer = require('multer');

const port = process.env.PORT;
const url = process.env.SITE_URL || 'http://localhost';

/**
 * load phone model
 */
const Phone = require('../../database/models/Phone');

//GET /apiv1/phones/
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

//GET /apiv1/phones/:id
//search phone by ID

router.get('/:id', async (req, res, next) => {
  try {
    
    const _id = req.params.id;
    const phone = await Phone.findOne({ _id });


    //if ypu want return a error message
    if (!phone) {
      const err = new Error('Phone Not found');
      err.status = 404;
      next(err);
      return;
    }

    res.json(phone);

  } catch (err) {
    next(err);
  }
});


//POST /apiv1/phones
//Create phone

//upload files to folder img
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/img/phones');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res, next) => {


  try {

    //get data from body request
    const phoneDataCreate = req.body;

    const photoName = req.file.filename || 'default.jpg';
    const photoUrl = `${url}:${port}/img/phones/${photoName}`;

    phoneDataCreate.image = photoUrl;

    //set model with phone data
    const phone = new Phone(phoneDataCreate);

    //save in BD
    const phoneSave = await phone.save();

    //if is ok, response code 201 - created
    res.status(201).json(phoneSave);

  } catch (err) {
    next(err);
  }
});


//PUT /apiv1/phones/:id 
//Update phone by ID. You must pass data in body

router.put('/:id', upload.single('image'), async (req, res, next) => {

  try {
    const _id = req.params.id;
    const phoneDataUpdate = req.body;

    const phoneUpdated = await Phone.findOneAndUpdate({ _id }, phoneDataUpdate, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json(phoneUpdated);

  } catch (err) {
    next(err);
  }

});


// DELETE /apiv1/phones/:id 
//Delete phone by ID

router.delete('/:id', async (req, res, next) => {
  
  try{

        const _id = req.params.id;
        await Phone.deleteOne({ _id });
        res.json();

    } catch(err){
        
        next(err);
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();

const multer = require('multer');

const port = process.env.PORT;
const url = process.env.SITE_URL || 'http://localhost';

/**
 * load phone model
 */
const Phone = require('../../database/models/Phone');


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


/**
 * @swagger
 * /apiv1/phones:
 *  get:
 *      summary: Get all Phones
 *      description: Use to request all phones created
 *      produces:
 *         - application/json
 *      responses:
 *       200:
 *         description: Return array object whit phones data
 *         schema:
 *         type: json
 */
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


/**
 * @swagger
 * /apiv1/phones/{id}:
 *  get:
 *      summary: Get Phone by ID
 *      description: Use to request an phone by ID
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: path
 *           name: id
 *           description: ID of phone in model
 *      responses:
 *       200:
 *         description: rReturn a Phone by ID
 *         schema:
 *         type: json
 */
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



/**
 * @swagger
 * /apiv1/phones:
 *  post:
 *      summary: Create Phone
 *      description: Use this request to create a new phone. The image, in this documentation, will set in default
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: body
 *           name: phone info
 *           description: The phone data to create
 *           schema:
 *               $ref: '#/definitions/Phone'
 *      responses:
 *       201:
 *         description: Phone Created!
 */
router.post('/', upload.single('image'), async (req, res, next) => {


  try {

    //get data from body request
    const phoneDataCreate = req.body;
    let file = req.file;
    let fileName;

    //controls if image not set, save default
    if (typeof file === 'undefined') {
      fileName = 'default.jpg';
    }

    const photoName = fileName || file.filename;
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


/**
 * @swagger
 * /apiv1/phones/{id}:
 *  put:
 *      summary: Update Phone by ID
 *      description: Use this request to update a phone searched by ID. The image, in this documentation, will set in default
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: body
 *           name: phone info
 *           description: The phone data to update
 *           schema:
 *               $ref: '#/definitions/Phone'
 *      responses:
 *       200:
 *         description: Phone Updated!
 */
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


/**
 * @swagger
 * /apiv1/phones/{id}:
 *  delete:
 *      summary: Delete Phone by ID
 *      description: Use to delete a phone by ID
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: path
 *           name: id
 *           description: ID of phone
 *      responses:
 *       200:
 *         description: If the operation succeeded
 *         schema:
 *         type: json
 */
router.delete('/:id', async (req, res, next) => {
  
  try{

        const _id = req.params.id;
        await Phone.deleteOne({ _id });
        res.json();

    } catch(err){
        
        next(err);
    }
});


/**
 * @swagger
 * definitions:
 *  Phone:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *          model:
 *              type: string
 *          manufacturer:
 *              type: string
 *          detail:
 *              type: string
 *          price:
 *              type: integer
 *          processor:
 *              type: string
 *          color:
 *              type: string
 *          ram:
 *              type: string
 *          size:
 *              type: string
 *          screen:
 *              type: string
 */

module.exports = router;

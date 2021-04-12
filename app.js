const express = require('express');

const app = express();
const port = process.env.PORT || 9000;

// requires to work
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Funk-o-Fone API');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// upload files to folder img
const multer = require('multer');

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
 * API routes:
 */
app.use('/apiv1/phones', /* upload.single('photo'), */ require('./routes/api/phones'));

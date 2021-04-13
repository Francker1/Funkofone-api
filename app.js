const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

// requires to work
const path = require('path');
const cors = require('cors');

/**
 * If you want set DB connection only in session website,
 * you must create a middleware app.use(session({})) and you can save data like cookie,
 * name session, store connectDB....
 */
// connect to the database:
require('./config/connectDB');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Funk-o-Fone API');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/**
 * API routes:
 */
app.use('/apiv1/phones', require('./routes/api/phones'));

/**
 * control if the API url starts with /apiv1/
 * */
const isAPIUrl = (req) => req.originalUrl.startsWith('/apiv1/');

// error handler
app.use((err, req, res) => {
  if (err.array) {
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPIUrl(req)
      ? { message: 'Not valid', errors: err.mapped() }
      : `Param ${errInfo.param}, error: ${errInfo.msg}`;
  }

  // status code
  res.status(err.status || 500);

  // Error API url and show like json
  if (isAPIUrl(req)) {
    res.json({
      error: err.message,
    });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;

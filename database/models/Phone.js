const mongoose = require('mongoose');

/**
 * create schema:
 */

const phoneSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  manufacturer: {
    type: String,
    required: [true, 'Manufacturer is required'],
  },
  detail: {
    type: String,
    required: [true, 'Detail is required'],
  },
  price: {
    type: Number,
    required: true,
  },
  processor: {
    type: String,
    required: [true, 'Processor is required'],
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
  },
  image: String,
  ram: String,
  size: String,
  screen: String,
});

/**
 * If you want filter, sort, paginate or limit results. Get query parameters like ?limit=2
 */
phoneSchema.statics.list = function (filter, limit, skip, sort, fields) {
  const query = Phone.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);

  //execute query
  return query.exec();
};

/**
 * create model
 * mongoose.model("name singular of collection in bd", schema);
 */

const Phone = mongoose.model('Phone', phoneSchema);

/**
 * export model
 */

module.exports = Phone;

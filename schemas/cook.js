var mongoose = require('mongoose'),
    reportSchema = require('./report');

var schema = mongoose.Schema({
  title: 'string',
  isActive: 'boolean',
  reports: [reportSchema]
});

if (!schema.options.toObject) { schema.options.toObject = {}; }
schema.options.toObject.transform = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};

module.exports = schema;

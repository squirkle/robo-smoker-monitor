var mongoose = require('mongoose'),
    reportSchema = require('./report'),
    schema = mongoose.Schema({
      timestamp: Number,
      target: Number,
      output: Number,
      pit: Number,
      paused: Boolean,
      phase: Number,
      cook: { type: mongoose.Schema.ObjectId, ref: 'Cook' }
    });

if (!schema.options.toObject) { schema.options.toObject = {}; }
schema.options.toObject.transform = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};

module.exports = schema;

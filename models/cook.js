var mongoose = require('mongoose');

var cookSchema = mongoose.Schema({
  title: 'string',
  isActive: 'boolean'
});

module.exports = mongoose.model('Cook', cookSchema);

var mongoose = require('mongoose');
    cookSchema = require('../schemas/cook');

module.exports = mongoose.model('Cook', cookSchema);

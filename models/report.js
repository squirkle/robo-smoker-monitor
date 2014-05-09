var mongoose = require('mongoose'),
    reportSchema = require('../schemas/report');

module.exports = mongoose.model('Report', reportSchema);

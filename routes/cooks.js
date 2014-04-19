var express = require('express');
var router = express.Router();
var CookModel = require('../models/cook');

/* GET users listing. */
router.get('/', function(req, res) {
  CookModel.find({}, function (err, results) {
    res.json({ cooks: results });
  });
  CookModel.find({ isActive: true }, function (err, activeCooks) {
    activeCooks.forEach(function (active) {
      req.app.set('activeCook', active._id);
    });
  });
});

router.post('/', function (req, res) {
  CookModel.find({ isActive: true }, function (err, activeCooks) {
    activeCooks.forEach(function (active) {
      active.isActive = false;
      active.save();
    });
    var cook = new CookModel(req.body.cook);
    req.app.set('activeCook', cook._id);
    cook.save();
    res.json({ cooks : cook });
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  CookModel.findById(id, function (err, cook) {
    res.json({ cooks: [cook] });
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  CookModel.findById(id, function (err, cook) {
    cook.remove();
    if (cook.isActive) {
      req.app.set('activeCook', null);
    }
  });
  res.send(200);
});

module.exports = router;

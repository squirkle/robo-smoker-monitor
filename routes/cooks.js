var express = require('express');
var router = express.Router();
var CookModel = require('../models/cook');

function toEmberData (cook) {
  var out = { reports: [] },
      cooks = cook instanceof Array ? cook : [cook];

  cooks = cooks.map(function (cook) {
    if (!cook) { return; }
    var cookReports = cook.reports;
    cook = cook.toObject();
    cook.reports = cookReports.map(function (report) {
      report = report.toObject();
      out.reports.push(report);
      return report.id;
    });
    return cook;
  });
  if (cook instanceof Array) {
    out.cooks = cooks;
  } else {
    out.cook = cooks[0];
  }
  return out;
}

/* GET users listing. */
router.get('/', function(req, res) {
  CookModel.find({}, function (err, cooks) {
    var data = toEmberData(cooks);
    res.json(data);
  });
  CookModel.find({ isActive: true }, function (err, activeCooks) {
    activeCooks.forEach(function (active) {
      req.app.set('activeCook', active);
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
    req.app.set('activeCook', cook);
    cook.save();
    res.json({ cooks : [cook.toObject()] });
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  CookModel.findById(id, function (err, cook) {
    var data = toEmberData(cook);
    res.json(data);
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

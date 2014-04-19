var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Monitor' });
});

router.get('/cooks', function(req, res) {
  res.render('index', { title: 'Monitor' });
});

router.get('/cooks/:id', function(req, res) {
  res.render('index', { title: req.params.id });
});

module.exports = router;

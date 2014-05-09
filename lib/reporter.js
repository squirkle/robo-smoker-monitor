var SerialMonitor = require('./SerialMonitor'),
    Smoother = require('./Smoother'),
    CookModel = require('../models/cook');

var reporter = {};

reporter.start = function (app, io) {
  // var serial = new SerialMonitor('/dev/tty.usbmodem1411'),
  var serial = new MockSerialMonitor('/dev/tty.usbmodem1411'),
      smoother = new Smoother(['pit', 'output'], 5000);

  serial.on('report', function (report) {
    var activeCook = app.get('activeCook');

    if (activeCook) {
      report.cook = activeCook.id;
      activeCook.reports.push(report);
      activeCook.save();
    }

    io.sockets.clients().forEach(function (socket) {
      socket.emit('report', report);
    });
  }, smoother);

  // Determine if we have an active cook, and if so, cache it.
  CookModel.find({ isActive: true }, function (err, active) {
    active.forEach(function (cook) {
      app.set('activeCook', cook);
    });
  });
};

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MockSerialMonitor () {
  this.reportCb = function () {};
}
MockSerialMonitor.prototype.on = function(str, cb, process) {
  setInterval(function () {
    var report = {
      timestamp: (new Date()).getTime(),
      target: 225,
      output: randomInt(0, 1000),
      pit: randomInt(50, 350),
      paused: 0,
      phase: 1
    };
    process(report, cb);
  }.bind(this), 1000);
};

module.exports = reporter;

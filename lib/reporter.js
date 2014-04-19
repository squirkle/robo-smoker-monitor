var SerialMonitor = require('./SerialMonitor'),
    Smoother = require('./Smoother'),
    CookModel = require('../models/cook');

var reporter = {};

reporter.start = function (app, io) {
  // var serial = new SerialMonitor('/dev/tty.usbmodem1411'),
  //     smoother = new Smoother(['pit', 'output'], 5000);

  // serial.on('report', function (report) {
  //   io.sockets.on('connection', function (socket) {
  //     socket.emit('report', report);
  //   });
  // }, smoother);

  // Determine if we have an active cook, and if so, cache it.
  CookModel.find({ isActive: true }, function (err, active) {
    active.forEach(function (cook) {
      app.set('activeCook', cook._id);
    });
  });

  io.sockets.on('connection', function (socket) {
    mockReports(socket, app);
  });
};

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mockReports(socket, app) {
  var active = app.get('activeCook');
  socket.emit('report', {
    timestamp: (new Date()).getTime(),
    target: 225,
    output: randomInt(0, 1000),
    pit: randomInt(50, 350),
    paused: 0,
    phase: 1,
    cook: active || null
  });
  setTimeout(mockReports.bind(null, socket, app), 5000);
}

module.exports = reporter;

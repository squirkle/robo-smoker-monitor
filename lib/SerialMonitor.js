var serial = require("serialport");

function SerialMonitor (path) {
  var that = this,
      io = new serial.SerialPort(path, {
        parser: serial.parsers.readline("\n")
      });

  this.io = io;
  this.cbs = {};

  io.open(function () {
    io.on('data', function (data) {
      try {
        data = JSON.parse(data);
        if (data.type && that.cbs[data.type]) {
          var handler = that.cbs[data.type];
          handler.process(data.data, handler.cb);
        }
      } catch (e) {}
    });
  });
}

SerialMonitor.prototype.on = function (type, cb, process) {
  this.cbs[type] = this.cbs[type] || [];
  var handler = {
    cb: cb.bind(handler),
    process: process || function (data, _cb) {
      _cb(data);
    }
  };
  this.cbs[type].push(handler);
};

module.exports = SerialMonitor;

/*
var Smoother = require('./Smoother'),
    serial = new SerialMonitor('/dev/tty.usbmodem1411'),
    smoother = new Smoother(['pit', 'output'], 5000);

serial.on('report', function (report) {
  // handle report
}, smoother);
*/

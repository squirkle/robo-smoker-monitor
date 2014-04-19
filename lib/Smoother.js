// Throttle and "smooth" data input over intervals
function Smoother (smoothKeys, limit) {
  var lastSent, smoothCache;
  return function (data, cb) {
    var now = new Date().getTime();
    if (!lastSent) {
      // This is our first report. Send it, and move on.
      lastSent = now;
      cb(data);
      return;
    }
    // we're not ready to send the report yet, so average the new data with
    // any old data
    if (lastSent > now - limit) {
      if (!smoothCache) {
        smoothCache = data;
        return;
      }
      smoothKeys.forEach(function (key) {
        smoothCache[key] = Math.floor((smoothCache[key] + data[key]) / 2 * 100) / 100;
      });
      return;
    }
    // Enough time has elapsed, send the report and reset lastSent/lastReport
    cb(smoothCache);
    lastSent = now;
    smoothCache = null;
  };
}

module.exports = Smoother;

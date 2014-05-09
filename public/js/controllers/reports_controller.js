function arrComputedByKey (key) {
  return Ember.arrayComputed('content', {
    addedItem: function (agg, report) {
      arr = agg.slice(0);
      arr.push([report.get('timestamp'), report.get(key)]);
      return arr;
    }
  });
}

Monitor.ReportsController = Ember.ArrayController.extend({
  pit: arrComputedByKey('pit'),
  targetTemp: arrComputedByKey('target'),
  phase: arrComputedByKey('phase'),
  paused: arrComputedByKey('paused'),
  output: arrComputedByKey('output')
});

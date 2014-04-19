Monitor.Report = DS.Model.extend({
  timestamp: DS.attr('number'),
  pit: DS.attr('number'),
  target: DS.attr('number'),
  output: DS.attr('number'),
  paused: DS.attr('boolean'),
  phase: DS.attr('number'),
  cook: DS.belongsTo('cook')
});

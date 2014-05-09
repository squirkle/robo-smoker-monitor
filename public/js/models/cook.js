Monitor.Cook = DS.Model.extend({
  title: DS.attr('string'),
  isActive: DS.attr('boolean'),
  reports: DS.hasMany('report')
});

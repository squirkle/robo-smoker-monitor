Monitor.Cook = DS.Model.extend({
  // _id: DS.attr('string'),
  title: DS.attr('string'),
  isActive: DS.attr('boolean'),
  reports: DS.hasMany('report')
});

Monitor.CookView = Ember.View.extend({
  didInsertElement: function() {
    this.get('controller').get('graphReports');
  }
});

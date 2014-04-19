Monitor.CookController = Ember.ObjectController.extend({
  actions: {
    removeCook: function () {
      var cook = this.get('model');
      cook.deleteRecord();
      cook.save();
    },
    editCook: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function() {
      this.set('isEditing', false);
      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },
  },
  graphKeys: ['pit', 'output', 'target', 'paused', 'phase'],
  graphReports: Ember.arrayComputed('reports', {
    initialize: function (graphReports, changed, meta) {
      this.get('model.reports').forEach(function (report) {
        var stamp = report.get('timestamp');
        this.graphKeys.forEach(function (key, i) {
          graphReports[i] = graphReports[i] || [];
          graphReports[i].push({ x: stamp, y: report.get(key) });
        });
      }, this);
    },
    addedItem: function (graphReports, report, changed, meta) {
      var stamp = report.get('timestamp');
      this.graphKeys.forEach(function (key, i) {
        graphReports[i] = graphReports[i] || [];
        graphReports[i].push({ x: stamp, y: report.get(key) });
      });
    }
  })
});

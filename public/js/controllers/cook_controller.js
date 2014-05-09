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
    }
  },
  lastReport: Ember.reduceComputed('reports', {
    initialValue: {},
    addedItem: function (nil, report) {
      return report;
    }
  })
});

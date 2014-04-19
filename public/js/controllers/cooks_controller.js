Monitor.CooksController = Ember.ArrayController.extend({
  actions: {
    createCook: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var cook = this.store.createRecord('cook', {
        title: title,
        isActive: true
      });

      this.store.all(Monitor.Cook).forEach(function (item) {
        item.set('isActive', false);
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      cook.save();
    },
    viewCook: function () {
      console.log(this);
    }
  }
});

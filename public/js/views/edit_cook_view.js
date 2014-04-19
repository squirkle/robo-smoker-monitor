Monitor.EditCookView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-cook', Monitor.EditCookView);

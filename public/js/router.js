Monitor.Router.map(function() {
  this.resource('cooks', { path: '/' }, function () {
    this.resource('cook', { path: '/cooks/:cook_id' }, function () {
      this.resource('reports', { path: '/' });
    });
  });
});

Monitor.CookRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('cook', params.cook_id);
  }
});

Monitor.ReportsRoute = Ember.Route.extend({
  setupController: function (controller, cook) {
    controller.set('model', cook.get('reports'));
  }
});

Monitor.CooksRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('cook');
  },
  activate: function () {
    var store = this.store;
    var socket = io.connect('http://localhost');

    socket.on('report', function (data) {
      if (data.cook) {
        store.find('cook', data.cook).then(function (cook) {
          var report = store.createRecord('report', data);
          cook.get('reports').pushObject(report);
        });
      }
    });
  }
});

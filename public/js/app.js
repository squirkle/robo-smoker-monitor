window.Monitor = Ember.Application.create();

Monitor.Router = Ember.Router.extend({
  location: 'history'
});
Monitor.ApplicationAdapter = DS.RESTAdapter.extend({
  host: '/api'
});
Monitor.ApplicationSerializer = DS.RESTSerializer.extend();

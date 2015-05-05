import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.computed.alias('session.secure'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});

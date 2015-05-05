import Ember from 'ember';

export default Ember.Controller.extend({
  email: null,
  password: null,

  loginFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  failure: function() {
    this.reset();
    this.set("loginFailed", true);
  },

  reset: function() {
    clearTimeout(this.get("timeout"));
    this.setProperties({
      isProcessing: false,
      isSlowConnection: false
    });
  },

  success: function() {
    this.reset();
  },

  slowConnection: function() {
    this.set("isSlowConnection", true);
  },

  actions: {
    login: function() {

      this.setProperties({
        loginFailed: false,
        isProcessing: true
      });

      this.set("timeout", setTimeout(this.slowConnection.bind(this), 5000));

      var credentials = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:api', credentials).then( () => {
        this.success();
      }, () => {
        this.failure();
      });
    }
  }
});

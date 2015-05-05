import Ember from 'ember';
import md5 from './../md5';

export default Ember.Controller.extend({
  currentUser: Ember.computed.alias('session.secure'),

  body: null,
  emailHash: function() {
    return md5(this.get('currentUser.email'));
  }.property('currentUser.email'),

  submissionIsValid: Ember.computed.and('body'),
  submissionIsInvalid: Ember.computed.not('submissionIsValid'),

  websocket: Ember.inject.service('websocket'),

  messageCount: function () {
    return this.get('model').length;
  }.property('model.[]'),

  receiveMessage: function (message) {
    this.get('model').pushObject(message);
  },

  subscribe: function () {
    this.get('websocket').subscribe( (m) => this.receiveMessage(m) );
  },

  unsubscribe: function () {
    this.get('websocket').unsubscribe( (m) => this.receiveMessage(m) );
  },

  actions: {

    submitMessage: function () {
      let message = {
        email: this.get('currentUser.email'),
        username: this.get('currentUser.username'),
        body: this.get('body'),
        emailHash: this.get('emailHash')
      };

      this.get('websocket').sendMessage(JSON.stringify(message));
      this.set('body', null);
    }

  }

});

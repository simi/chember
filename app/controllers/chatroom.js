import Ember from 'ember';
import md5 from './../md5';

export default Ember.Controller.extend({

  author: null,
  email: null,
  body: null,
  emailHash: function() {
    return md5(this.get('email'));
  }.property('email'),

  submissionIsValid: Ember.computed.and('author', 'body', 'email'),
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
      let message = this.getProperties('author', 'body', 'email', 'emailHash');
      this.get('websocket').sendMessage(JSON.stringify(message));
      this.set('body', null);
    }

  }

});

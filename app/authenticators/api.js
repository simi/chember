import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function(properties) {
    var propertiesObject = Ember.Object.create(properties);
    return new Ember.RSVP.Promise( (resolve, reject) => {
      if (!Ember.isEmpty(propertiesObject.get('token')) && !Ember.isEmpty(propertiesObject.get('email'))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  authenticate: function(params) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      this.makeRequest(params).then(function(response) {
        console.log(response);
        Ember.run(function() {
          resolve(response);
        });
      }, function(xhr) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  invalidate: function() {
    console.info('invalidate');
    return Ember.RSVP.resolve();
  },

  makeRequest: function(data) {
    return Ember.$.ajax({
      url:        '/api/login',
      type:       'POST',
      data:       data,
      dataType:   'json',
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('Accept', settings.accepts.json);
      }
    });
  }
});

import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR, requestOptions) {
    console.info('authorize');
    console.log(requestOptions);
    var secureData = this.get('session.secure');
    console.log(secureData);
  }
});

module.exports = function(app) {
  var express = require('express');
  var loginRouter = express.Router();

  loginRouter.post('/', function(req, res) {
    res.status(200).send({
      email: 'josef.simanek@gmail.com',
      username: 'Jimmy',
      token: 'c78aef98'
    });
  });
  app.use('/api/login', loginRouter);
};

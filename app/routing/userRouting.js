const BodyParser = require('body-parser');

const userApi = require('../api/userApi');
const userVarification = require('../api/uservarification');
const login = require('../api/loginApi');
const authenticate = require('../api/authenticate');

module.exports = function(app) {
  app.post('/user', userApi.createUser);
  app.post('/user/verifyuser', userVarification.userverifivationToken);
  app.post('/user/activeuser', userVarification.useVarificationActive);
  app.post('/login', login.login);
  app.get('/me', authenticate.authentication, login.me);
}

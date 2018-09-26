const BodyParser = require('body-parser');

const userApi = require('../api/userApi');
const userVarification = require('../api/uservarification');

module.exports = function(app) {
  app.post('/user', userApi.createUser);

  app.post('/user/verifyuser', userVarification.userverifivationToken);
  app.post('/user/activeuser', userVarification.useVarificationActive);
}

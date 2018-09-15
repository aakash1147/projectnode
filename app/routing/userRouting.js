const BodyParser = require('body-parser');

const userApi = require('../api/userApi');

module.exports = function(app) {
  app.post('/user', userApi.createUser);
}

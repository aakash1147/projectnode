const _ = require('lodash');
const userModel = require('../models/userModel');
const sendVerifivationMail = require('./uservarification');

var createUser = (req, res) => {
  var body = _.pick(req.body, ['email', 'firstname', 'lastname', 'phoneno']);


  var user = new userModel(body);

  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    sendVerifivationMail.varificationMail(user);
  }).then((token) => {
      res.status(200).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })

}

module.exports = {
  createUser
}

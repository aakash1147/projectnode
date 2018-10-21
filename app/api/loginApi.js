const _ = require('lodash');
const userModel = require('../models/userModel');

var login = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    userModel.findByCrediential(body.email, body.password).then((user) => {
        res.status(200).send({
          "token":user.tokens[0].token,
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
}

var me = (req, res) => {
    res.status(200).send(req.user);
}

module.exports = {
    login, me
}
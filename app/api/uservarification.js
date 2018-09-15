const _ = require('lodash');
const varificationMailModel = require('../models/userverificationModels');

var varificationMail = function(user) {
    body = {
        email: user.email,
        userid: user._id,
        is_consumed: false,
    }
    var varification = new varificationMailModel(body);
    console.log(varification);
    setTimeout(() => {
        varification.sendMail();
    }, 2000);
    varification.save().then((varg) => {
        console.log(varg);
    });
}

var userverifivationToken = function (req, res) {
    var id = req.body.token;
    varificationMailModel.findOne({ _id: id }, function(err, varData) {
        if(err) return res.status(400).send({"Response": "Unable to find User"});
        res.status(200).send(varData);
    })
}

module.exports = {
    varificationMail, userverifivationToken
}

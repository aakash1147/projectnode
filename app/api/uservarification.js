const _ = require('lodash');
const varificationMailModel = require('../models/userverificationModels');
const userModel = require('../models/userModel');

var varificationMail = (user) => {
    body = {
        email: user.email,
        userid: user._id,
        is_consumed: false,
    }
    var varification = new varificationMailModel(body);
    setTimeout(() => {
        varification.sendMail();
    }, 2000);
    varification.save().then((varg) => {
      
    });
}

var userverifivationToken = (req, res) => {
    var id = req.body.token;
    varificationMailModel.findOne({ _id: id }, function(err, varData) {
        if(err) return res.status(400).send({"Response": "Unable to find User"});
        res.status(200).send(varData);
    })
}

var useVarificationActive = (req, res) => {
    var id = req.body.token;
    if (req.body.password != req.body.confirmPassword) {
        res.status(400).send({"Response": "Password & Confirm Password Does not match"})
    } else {
        varificationMailModel.findOne({ _id: id }, (err, data) => {
            if (err) return res.status(400).send({"Response": "Token is not valid"})
            userModel.findOne({_id: data.userid }, (err, user) => {
                if (err) return res.status(400).send({"Response": "Unable to find user with this token"});
                user.password = req.body.password;
                user.is_active = true;
                user.save().then((user_data) => {
                    res.status(200).send(user_data);
                }).catch((err) => {
                    res.status(400).send(err);
                })
            })
        })
    }
}

module.exports = {
    varificationMail, userverifivationToken, useVarificationActive
}

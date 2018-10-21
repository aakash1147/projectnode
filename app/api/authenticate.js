var userModel = require('../models/userModel');

var authentication = function (req, res, next) {
    var token = req.header('Authorization');
    console.log(req.originalUrl);

    userModel.findByToken(token).then((user)=> {
        if(!user) return Promise.reject({"Response": "Invalid token"});
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send({
          "Response": "You are un autherized",
        });
    })
}

module.exports = {
    authentication
}
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const sendmail = require('sendmail')();

var VarificationSchema = mongoose.Schema({
    email:{
        type: String,
    },
    userid: {
        type: mongoose.Schema.ObjectId ,
        ref: 'user'
    },
    is_consumed: {
      type: Boolean,
      default: false,
    },
})

VarificationSchema.methods.toJSON =  function() {
    var varificationData = this;
    var dataObject = varificationData.toObject();
    return {
        "token": dataObject._id,
        "email": dataObject.email,
        // "userid": dataObject.userid,
    }
}

VarificationSchema.methods.sendMail = function () {
    var mailDto = this;
    var mailString = "http://localhost:4200/userverifivation/" + mailDto._id;
    sendmail({
        from: 'aakash1147@gmail.com',
        to: mailDto.email,
        subject: 'Verification Mail',
        text: mailString,
      }, function(err, reply) {
        // console.log(err && err.stack);
        // console.dir(reply);
    });
}

var varificationMailModel = mongoose.model('varificationmail', VarificationSchema);

module.exports = varificationMailModel

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is required"]
  },
  lastname: {
    type: String,
    required: [true, "Last Name is required"]
  },
  phoenno: {
    type: Number
  },
  email: {
    type: String,
    required: [true, "EmailID is required"],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `Please Enter valid Email`
    }
  },
  password: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
    }],
})



UserSchema.methods.toJSON = function () {
    // for returning limited date to the API
    var user = this;
    var userObject = user.toObject();
    //return _.pick(userObject, ['_id', 'email', 'tokens[0].token']);

   return {
       '_id':userObject._id,
       'firstname': userObject.firstname,
       'lastname': userObject.lastname,
       'email': userObject.email,
    //    'token': userObject.tokens[0].token
   }
};



UserSchema.methods.generateAuthToken = function () {
    // for generating auth token
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'akash1147').toString();
    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};


UserSchema.statics.removeToken = function (token) {
    var user = this;
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
};

UserSchema.statics.findByToken = function(token) {
    // to find the user with token
    var user = this;
    //console.log(user);
    var decoded;
    try {
      decoded = jwt.verify(token, 'akash1147');
    } catch (e) {
      return Promise.reject({'Respose': "Unable to find user"});
    }
    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCrediential = function (email, password) {
    // to find the user by crediential email id
    var user = this;
    return user.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject({'Response': 'User with this email Not Found'});
        }
        return new Promise((resolve, reject) => {
            // to compare the user given password & the enycripted password present in the datebase
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject({'Response': "Incorrect password"});
                }
            })
        })
    });
}

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        // to check if password is modified than modified it encrypted password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;

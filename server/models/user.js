const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    tokens: [{
        access: {
            type:String,
            required:true
        },
        token: {
            type:String,
            required:true
        }
    }]
});
//instance method: operates on an individual doc
UserSchema.methods.generateAuthToken = function(){ //Arrow functions do not bind this keyword
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token, 'abc123');
    }catch(e) {
        return Promise.reject();
    }
    return User.findOne({
        '_id':decoded._id,
        'tokens.token': token,
        'tokens.access':'auth'
    });
};

UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
    });
});
    }
    else{
        next();
    }

});


//model method: operate on the User model
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id','email']);
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: [4, "Password must be at least 4 characters "]
    },
    saltSecret: String
});

userSchema.path('email').validate((email) => {
    emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
}, "Invalid Email"); 

userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next(); 
        });
    });
});

userSchema.methods.verifyPassword = function(password, hashPassword) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP});
}

module.exports = mongoose.model('User', userSchema);;
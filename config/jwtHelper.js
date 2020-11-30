const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.verifyJWT = (req, res, next) => {
    var token;
    console.log(req.headers);
    if('authorization' in req.headers) token = req.headers['authorization'].split(" ")[1];
    if(!token) return res.status(403).json({auth: false, message: 'No token provided'});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(500).json({auth: false, message: 'Token has expired'});
        req._id = decoded._id; 
        next(); 
    });
}   

module.exports.auth = (req, res, next) => {
    var token;
    console.log(req.headers);
    if('authorization' in req.headers) token = req.headers['authorization'].split(" ")[1];
    if(!token) return res.status(403).json({auth: false, message: 'No token provided'});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(500).json({auth: false, message: 'Token has expired'});
        req._id = decoded._id; 
        User.findOne({_id: req._id}, (err, user) => {
            if(!user) return res.status(404).json({message: 'User not found'});
            req.user = lodash.pick(user, ['_id', 'email']);
            next(); 

        });
    });
};
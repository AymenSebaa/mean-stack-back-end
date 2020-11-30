require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyPrser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var path = require('path');
const indexRouter = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyPrser.json());
app.use(cors({origin: 'http://192.168.1.12:4200'})); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(passport.initialize());
app.use('/api', indexRouter);
/*
app.use((err, req, res, next) => {
    var errors = [];
    Object.keys(err.errors).map(key => {
        errors.push({ name: key, message: err.errors[key].message});
    });
    res.status(422).json({errors}); 
    
   return res.status(422).json({message: 'error app'});
});
*/
var server = app.listen(process.env.PORT, () => {
    console.log('Server starting at port: ', server.address() );
});
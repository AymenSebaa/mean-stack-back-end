const mongoose = require('mongoose');

var employeeChema = mongoose.Schema({
    name: String,
    position: String,
    office: String,
    salary: Number
});

module.exports = mongoose.model('Employee', employeeChema);
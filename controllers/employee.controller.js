const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
var ObjectId = mongoose.Types.ObjectId;

function handleError(res, reason, message, code){
    console.log("ERROR: ", reason);
    res.status(code || 500).json({"error": message});
}

module.exports.employees = (req, res, next) => {
    Employee.find( (err, docs) => {
        if(err)return handleError(res, err.message, 'Faild to get employees.');
        return res.status(200).json(docs);
    } );
};
module.exports.create = (req, res, next) => {
    res.json(req.user);
    delete req.body._id;
    var newEmployee = Employee(req.body);
    // newEmployee.createdAt = new Date();
    newEmployee.save( (err, doc) =>{
        if(err) return handleError(res, err.message, 'Faild to create new employee.');
        return res.status(201).json(doc);
    } );
};

module.exports.employee = (req, res, next) => {
    if(!ObjectId.isValid(req.params._id)) handleError(res, err.message, 'Invalide ObjectID', 400);
    Employee.findById(req.params.id , (err, doc) => {
        if(err) return handleError(res, err.message, 'Faild to get emplyee');
        return res.status(200).json(doc);
    });
};
module.exports.update = (req, res, next) => {
    if(!ObjectId.isValid(req.params._id)) return handleError(res, 'Invalide ObjectID', 400);
    Employee.findByIdAndUpdate(req.params._id, {$set: req.body}, {new: true}, (err, doc) => {
        if(err) return handleError(res, err.message, 'Faild to update employee');
        return res.status(200).json(doc); 
    });
};
module.exports.delete = (req, res, next) => {
    if(!ObjectId.isValid(req.params._id)) return handleError(res, 'Invalide ObjectID', 400);
    Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(err) return handleError(res, err.message, 'Faild to delete employee');
        return res.status(200).json(doc); 
    });
};

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const employeeController = require('../controllers/employee.controller');
const productController = require('../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/user/register', userController.register);
router.post('/user/authenticate', userController.authenticate);
router.get('/user/profile', jwtHelper.verifyJWT, userController.profile);

router.post('/upload/image', uploadController.uploadImage.single('image'), uploadController.saveImage);

router.get('/employee', employeeController.employees);
router.post('/employee', employeeController.create);
router.get('/employee/:_id', employeeController.employee);
router.put('/employee/:_id', employeeController.update);
router.delete('/employee/:_id', employeeController.delete);

router.get('/product', productController.products);
router.post('/product', jwtHelper.auth, productController.create);
router.get('/product/:_id', productController.product);
router.put('/product/:_id', productController.update);
router.delete('/product/:_id', productController.delete);

module.exports = router; 
var express = require('express');
var router = express.Router();
var userController = require('../Controllers/UserController')

router.post('/signup', userController.addUser)

router.delete('/:id', userController.deleteUser)

router.post('/login', userController.logInUser)

module.exports = router;
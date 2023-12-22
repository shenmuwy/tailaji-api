var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

router.get('/get_user', userController.showUser)

router.post('/user_reg', userController.insertUser)

router.post('/user_login', userController.loginUser)

router.post('/user_upload', userController.uploadUser)

module.exports = router;

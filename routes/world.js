var express = require('express');
var router = express.Router();

const worldController = require('../controllers/worldController')

router.get('/get_cpu', worldController.getCpuMessage)

module.exports = router;
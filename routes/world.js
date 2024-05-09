const express = require('express');
const router = express.Router();

const worldController = require('../controllers/worldController')

router.get('/get_cpu', worldController.getCpuMessage)
router.get('/start_world', worldController.startWorld)
router.get('/world_status', worldController.getWorldStatus)

module.exports = router;
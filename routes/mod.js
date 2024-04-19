const express = require('express');
const router = express.Router();

const modController = require('../controllers/modController')

router.post('/insert_mod', modController.insertMode)
router.get('/get_mod', modController.showMod)
router.post('/update_mod', modController.modifyMode)

module.exports = router;
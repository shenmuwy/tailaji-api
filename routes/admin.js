var express = require('express');
var router = express.Router();

router.get('/get_admin', function (req, res, next) {
  res.json('123')
})

module.exports = router
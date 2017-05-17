'use xtrict';

var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res, next) {
  res.send('PAS ENCORE IMPLEMENTE : Administration du site');
});

module.exports = router;

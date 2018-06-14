var express = require('express');
var router = express.Router();

var mainPageController = require('../application/controllers/MainPageController');

router.get('/', mainPageController.index);

module.exports = router;

'use strict'; 

var express = require('express');
var router = express.Router();
var linecont = require('../controllers/linecontroller');
const config = require('../configs');
const line = require('@line/bot-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/webhook', line.middleware(config.lineconfig), linecont.webhook);

module.exports = router;
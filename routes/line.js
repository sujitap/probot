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

// router.post('/webhook', line.middleware(config.lineconfig), linecont.webhook);

// // register a webhook handler with middleware
// // about the webhook, please refer to doc
router.post('/callback', line.middleware(config.lineconfig), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

module.exports = router;
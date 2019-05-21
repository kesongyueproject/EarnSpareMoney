var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(200, {
    account: '132',
    psw: '200'
  });
});

router.get('/users', function(req, res, next) {
  res.json(200, {
    account: '???',
    psw: '00!'
  });
});

module.exports = router;

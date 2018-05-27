var express = require('express');
var router = express.Router();
let list = require('../modules/list');

/* GET home page. */
router.get('/', (req, res, next) => {
  list(req, res, next)
});

module.exports = router;

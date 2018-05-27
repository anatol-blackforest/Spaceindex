var express = require('express');
var router = express.Router();
let list = require('../modules/list');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "planets"));

module.exports = router;
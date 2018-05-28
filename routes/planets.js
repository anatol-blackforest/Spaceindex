var express = require('express');
var router = express.Router();
let list = require('../modules/list');
let current = require('../modules/current');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "planets"));
router.get('/:planete', (req, res) => current(req, res, "planets"));

module.exports = router;

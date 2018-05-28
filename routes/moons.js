var express = require('express');
var router = express.Router();
let list = require('../modules/list');
let current = require('../modules/current');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "moons"));
router.get('/:moon', (req, res) => current(req, res, "moons"));

module.exports = router;

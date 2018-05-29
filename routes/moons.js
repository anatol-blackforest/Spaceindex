const express = require('express');
const router = express.Router();
const list = require('../modules/list');
const current = require('../modules/current');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "moons"));
router.get('/:moon', (req, res) => current(req, res, "moons"));

module.exports = router;

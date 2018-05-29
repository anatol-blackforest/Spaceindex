const express = require('express');
const router = express.Router();
const list = require('../modules/list');
const current = require('../modules/current');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "planets"));
router.get('/:planete', (req, res) => current(req, res, "planets"));

module.exports = router;

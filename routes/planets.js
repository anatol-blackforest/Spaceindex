const express = require('express');
const router = express.Router();
const list = require('../modules/list');
const current = require('../modules/current');
const deleteArticle = require('../modules/delete');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "planets"));
router.get('/:title', (req, res) => current(req, res, "planets"));
router.delete('/:title', (req, res) => deleteArticle(req, res, "planets"));

module.exports = router;

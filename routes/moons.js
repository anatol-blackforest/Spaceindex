//обработчик лун и спутников
const express = require('express');
const router = express.Router();
const {list, page, current, deleteArticle} = require('../modules/');

/* GET moons page. */
router.get('/', (req, res) => list(req, res, "moons"));
router.get('/:title', (req, res) => current(req, res, "moons"));
router.get('/page/:num', (req, res) => page(req, res, "moons"));
router.delete('/:title', (req, res) => deleteArticle(req, res, "moons"));

module.exports = router;

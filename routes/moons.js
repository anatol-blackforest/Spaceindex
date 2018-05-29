const express = require('express');
const router = express.Router();
const list = require('../modules/list');
const current = require('../modules/current');
const deleteArticle = require('../modules/delete');

/* GET home page. */
router.get('/', (req, res) => list(req, res, "moons"));
router.get('/:title', (req, res) => current(req, res, "moons"));
router.delete('/:title', (req, res) => {
    console.log(req.url)
    deleteArticle(req, res, "moons")
});

module.exports = router;

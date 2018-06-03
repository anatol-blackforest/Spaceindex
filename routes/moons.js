//обработчик лун и спутников
const express = require('express');
const router = express.Router();
const {list, page, current, deleteArticle} = require('../modules/');

/* GET moons page. */
router.get('/', (req, res) => list(req, res, "moons"));
router.get('/page/:num', (req, res) => page(req, res, "moons"));
router.get('/:title', (req, res) => {
    if (req.isAuthenticated()) return current(req, res, true, "moons")
    current(req, res, false, "moons")
});
router.delete('/:title', (req, res) => {
    if (req.isAuthenticated()) return deleteArticle(req, res, "moons")
    list(req, res, "moons")
});

module.exports = router;

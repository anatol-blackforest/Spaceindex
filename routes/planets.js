//обработчик планет
const express = require('express');
const router = express.Router();
const {list, page, current, deleteArticle} = require('../modules/');

/* GET planets page. */
router.get('/', (req, res) => list(req, res, "planets"));
router.get('/page/:num', (req, res) => page(req, res, "planets"));
router.get('/:title', (req, res) => {
    if (req.isAuthenticated()) return current(req, res, true, "planets")
    current(req, res, false, "planets")
});
router.delete('/:title', (req, res) => {
    if (req.isAuthenticated()) return deleteArticle(req, res, "planets")
    list(req, res, "planets")
});

module.exports = router;

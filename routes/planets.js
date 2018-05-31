//обработчик планет
const express = require('express');
const router = express.Router();
const {list, page, current, deleteArticle} = require('../modules/');

/* GET planets page. */
router.get('/', (req, res) => list(req, res, "planets"));
router.get('/:title', (req, res) => current(req, res, "planets"));
router.get('/page/:num', (req, res) => page(req, res, "planets"));
router.delete('/:title', (req, res) => deleteArticle(req, res, "planets"));

module.exports = router;

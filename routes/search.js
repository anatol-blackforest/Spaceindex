//поиск
const express = require('express');
const router = express.Router();
const {search} = require('../controllers/');

/* Search. */
router.get('/', (req, res) => search(req, res));

module.exports = router;

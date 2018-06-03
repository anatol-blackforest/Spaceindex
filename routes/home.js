//главная страница
const express = require('express');
const router = express.Router();
const {home} = require('../modules');

/* GET home page. */
router.get('/', (req, res) => home(req, res));

module.exports = router;

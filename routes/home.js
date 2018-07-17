//главная страница
const express = require('express');
const router = express.Router();
const {home} = require('../controllers');

/* GET home page. */
router.get('/', (req, res) => home(req, res));

module.exports = router;

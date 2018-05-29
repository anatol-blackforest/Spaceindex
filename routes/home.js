//главная страница
const express = require('express');
const router = express.Router();
const {sitename} = require('../modules/messages');

/* GET home page. */
router.get('/', (req, res) => res.render('home', { title: sitename }));

module.exports = router;

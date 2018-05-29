//страница о проекте
const express = require('express');
const router = express.Router();
const {about} = require('../modules/messages');

/* GET users listing. */
router.get('/', (req, res, next) => res.render('about', { title: 'About' }));

module.exports = router;

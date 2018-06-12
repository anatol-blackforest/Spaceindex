//страница о проекте
const express = require('express');
const router = express.Router();
const {about} = require('../modules/messages');

/* GET users listing. */
router.get('/', (req, res) => res.render('about', { title: 'About', isAdmin: req.isAuthenticated() }));

module.exports = router;

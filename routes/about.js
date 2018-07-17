//страница о проекте
const express = require('express');
const router = express.Router();
const {about} = require('../config/messages');

/* GET users listing. */
router.get('/', (req, res) => res.render('about', { title: about, isAdmin: req.isAuthenticated() }));

module.exports = router;

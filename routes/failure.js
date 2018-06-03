//ошибка авторизации
const express = require('express');
const router = express.Router();
const {messages: {noAuth}} = require('../modules');

/* GET users listing. */

router.get('/', (req, res) => res.status(401).render('fail', {hint: noAuth, isAdmin: false}));

module.exports = router;

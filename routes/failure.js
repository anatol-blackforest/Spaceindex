//ошибка авторизации
const express = require('express');
const router = express.Router();
const {noAuth} = require('../config/messages');

/* GET users listing. */

router.get('/', (req, res) => res.status(401).render('fail', {hint: noAuth, isAdmin: false}));

module.exports = router;

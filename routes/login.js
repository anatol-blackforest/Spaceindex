//добавление небесных тел
const passport = require('passport');
const express = require('express');
const router = express.Router();
const {uploader, postuploader, messages: {addMsg}} = require('../modules');

/* GET users listing. */

//авторизация
router.post('/', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/fail'}))

module.exports = router;

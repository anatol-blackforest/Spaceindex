//установка админа
const express = require('express');
const router = express.Router();
const {install} = require('../modules');

/* GET install. */

router.route('/')
            .get((req, res) => install(req, res, "get"))
            .post((req, res) => install(req, res, "post"))

module.exports = router;

//добавление небесных тел
const express = require('express');
const router = express.Router();
const {install} = require('../modules');

/* GET users listing. */

router.get('/', (req, res) => install(req, res, "get"));
router.post('/', (req, res) => install(req, res, "post"))

module.exports = router;

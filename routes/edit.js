//редактирование небесных тел
const express = require('express');
const router = express.Router();
const {uploader, postuploader, messages: {addMsg}} = require('../modules');

/* GET users listing. */

router.post('/', (req, res) => uploader(req, res, err => postuploader(err, req, res)));

module.exports = router;

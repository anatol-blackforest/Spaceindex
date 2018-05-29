//добавление небесных тел
const express = require('express');
const router = express.Router();
const {uploader, postuploader, messages: {addMsg}} = require('../modules');

/* GET users listing. */

router.get('/', (req, res) => res.render('add', { title: addMsg }));
router.post('/', (req, res) => uploader(req, res, err => {
    console.log("case 1")
    postuploader(err, req, res)
}));

module.exports = router;

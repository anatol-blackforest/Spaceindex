//добавление небесных тел
const express = require('express');
const router = express.Router();
const {uploader, postuploader, messages: {addMsg}} = require('../modules');

/* GET users listing. */

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) return res.render('home', { title: sitename, isAdmin: false });
    res.render('add', { title: addMsg, isAdmin: true })
});
router.post('/', (req, res) => {
    if (!req.isAuthenticated()) return res.render('home', { title: sitename, isAdmin: false });
    uploader(req, res, err => postuploader(err, req, res))
});

module.exports = router;

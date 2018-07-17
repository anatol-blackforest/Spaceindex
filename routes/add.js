//добавление небесных тел
const express = require('express');
const router = express.Router();
const {uploader, postuploader} = require('../controllers');
const {addMsg} = require('../config/messages');

/* GET users listing. */

router.route('/')
            .get((req, res) => {
                if (!req.isAuthenticated()) return res.status(401).render('home', { title: sitename, isAdmin: false });
                res.render('add', { title: addMsg, isAdmin: true })
            })
            .post((req, res) => {
                if (!req.isAuthenticated()) return res.status(401).render('home', { title: sitename, isAdmin: false });
                uploader(req, res, err => postuploader(err, req, res))
            });

module.exports = router;

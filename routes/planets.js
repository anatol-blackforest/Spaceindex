//обработчик планет
const express = require('express');
const router = express.Router();
const {list, page, current, deleteArticle} = require('../controllers/');

/* GET planets page. */
router.get('/', (req, res) => list(req, res, "planets"));
router.get('/page/:num', (req, res) => page(req, res, "planets"));
router.route('/:title')
            .get((req, res) => {
                if (req.isAuthenticated()) return current(req, res, true, "planets")
                current(req, res, false, "planets")
            })
            .delete((req, res) => {
                if (req.isAuthenticated()) return deleteArticle(req, res, "planets")
                list(req, res, "planets")
            });

module.exports = router;

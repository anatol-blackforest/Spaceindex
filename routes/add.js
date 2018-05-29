//добавление небесных тел
const express = require('express');
const router = express.Router();
const add = require('../modules/add');

/* GET users listing. */

router.get('/', (req, res) => res.render('add', { title: 'Add article' }));
router.post('/', (req, res) => add(req, res));

module.exports = router;

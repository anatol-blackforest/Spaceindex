const express = require('express');
const router = express.Router();
const add = require('../modules/add');

/* GET users listing. */

router.get('/', (req, res, next) => {
  res.render('add', { title: 'Express' });
});

router.post('/', (req, res, next) => {
  add(req, res, next)
});

module.exports = router;

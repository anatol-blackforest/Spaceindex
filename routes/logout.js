//авторизация
const express = require('express');
const router = express.Router();

//выход
router.get("/", (req, res) => {
    req.session = null;
    res.redirect("/");
});

module.exports = router;

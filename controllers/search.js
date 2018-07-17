//поисковый модуль
const {Planet, Moon} = require('../models');
const {notFound, searchTitle} = require('../config/messages');

module.exports = async (req, res) => {
    if (!req && req.query && req.query.search) return res.redirect("/")
    search = new RegExp(req.query.search)
    planets = await Planet.find({title: search})
    moons = await Moon.find({title: search})
    let searchedObjects = [...planets, ...moons]
    if (searchedObjects.length > 0){
        res.render('search', { searchedObjects, title: searchTitle, isAdmin: req.isAuthenticated() });
    } else {
        res.render('search', { searchedObjects, title: notFound, isAdmin: req.isAuthenticated() });
    }
}

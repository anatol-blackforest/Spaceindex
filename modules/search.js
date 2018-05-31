//поисковый модуль
const {Planet, Moon} = require('./schema');
const {notFound, searchTitle} = require('./messages');

module.exports = async (req, res) => {
    if (!req && req.query && req.query.search) return res.redirect("/")
    search = new RegExp(req.query.search)
    planets = await Planet.find({title: search})
    moons = await Moon.find({title: search})
    let searchedObjects = [...planets, ...moons]
    console.log(searchedObjects.length)
    console.log(notFound)
    if (searchedObjects.length > 0){
        res.render('search', { searchedObjects, title: searchTitle });
    } else {
        res.render('search', { searchedObjects, title: notFound });
    }
}

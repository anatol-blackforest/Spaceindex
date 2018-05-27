let {Planet, Moon} = require('./schema.js');

module.exports = async (req, res, next) => {
    let planets = await Planet.find().populate('moons')
    planets.forEach(item => console.log(item.moons.length))
    // console.log(planets.moons.length)
    res.render('index', { title: 'Express' });
}

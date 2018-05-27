let {Planet, Moon} = require('./schema.js');

module.exports = async (req, res, next) => {
    let moons = await Planet.find({}).populate('moons')
    moons.forEach(item => console.log(item))
    res.render('index', { title: 'Express' });
}

let {Planet, Moon} = require('./schema.js');

module.exports = async (req, res, category) => {
    let objects, moons
    switch(category){
        case "planets" : {
            objects = await Planet.find().populate('moons')
            break
        }
        case "moons" : {
            objects = await Moon.find()
            break
        }
    }
    res.render('index', { objects, moons, category });
}

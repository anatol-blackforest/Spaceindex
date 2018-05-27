
let {Planet, Moon} = require('./schema.js');

module.exports = async ({body}, res, next) => {
    switch(body.type){
        case "planet" : {
            delete body.type
            let planet = new Planet(body);
            await planet.save();
            break
        }
        case "moon" : {
            delete body.type
            let parentPlanet = body.parentplanet
            let moon = new Moon(body)
            moon.parentPlanet = parentPlanet
            await moon.save()
            let planet = await Planet.findOne({title: parentPlanet})
            planet.moons.push(moon._id)
            await Planet.update({title: parentPlanet}, {$set: planet})
            break
        }
    }
    res.render('add', { title: 'Express' });
}

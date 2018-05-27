
let {Planet, Moon} = require('./schema.js');

module.exports = async ({body}, res, next) => {
    console.log(body)
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
            console.log(parentPlanet)
            let moon = new Moon(body);
            moon.parentPlanet = parentPlanet
            await moon.save();
            break
        }
    }
    res.render('add', { title: 'Express' });
}

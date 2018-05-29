
let {Planet, Moon} = require('./schema.js');

module.exports = async ({body}, res) => {
    try{
        switch(body.type){
            case "planet" : {
                delete body.type
                delete body.parentPlanet
                delete body.distanseFromParentPlanet
                let planet = new Planet(body);
                await planet.save();
                break
            }
            case "moon" : {
                delete body.type
                delete body.year
                delete body.distanseFromStar
                let parentPlanet = body.parentPlanet
                let moon = new Moon(body)
                moon.parentPlanet = parentPlanet
                await moon.save()
                let planet = await Planet.findOne({title: parentPlanet})
                planet.moons.push(moon._id)
                await Planet.update({title: parentPlanet}, {$set: planet})
                break
            }
        }
        res.render('add', { title: 'Add' });
    }catch(err){
        console.log(err)
        res.render('add', { title: 'Add' });
    }
}

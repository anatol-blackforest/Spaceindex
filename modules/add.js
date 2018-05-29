
let {Planet, Moon} = require('./schema.js');

module.exports = async ({body}, res) => {
    try{
        switch(body.type){
            case "planet" : {
                delete body.type
                delete body.parentPlanet
                delete body.distanseFromParentPlanet
                let planet = new Planet(body);
                planet.moons = await Moon.find({parentPlanet: body.title})
                await planet.save();
                res.redirect(`/planets/${body.title}`);
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
                res.redirect(`/moons/${body.title}`);
                break
            }
        }
    }catch(err){
        console.log(err)
        res.render('add', { title: 'Add' });
    }
}

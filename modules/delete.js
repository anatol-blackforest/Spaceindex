let {Planet, Moon} = require('./schema.js');
const {regexp} = require('../config');

module.exports = async ({params: {title}}, res, category) => {
    try{
        console.log(title)
        switch(category){
            case "planets" : {
                await Planet.findOneAndRemove({title});
                res.redirect('/planets');
                break
            }
            case "moons" : {
                const deletedMoon = await Moon.findOneAndRemove({title});
                const parentPlanet = await Planet.findOne({title: deletedMoon.parentPlanet}).populate("moons")
                const updatedPlanetMoons = parentPlanet.moons.filter(moon => moon.title !== title)
                await Planet.update({title: parentPlanet.title}, {$set: {moons:updatedPlanetMoons}})
                res.redirect('/moons');
                break
            }
        }
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

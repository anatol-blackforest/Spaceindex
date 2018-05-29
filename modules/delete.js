//сносим планету или спутник
let {Planet, Moon} = require('./schema.js');
const {regexp} = require('../config');

module.exports = async ({params: {title}}, res, category) => {
    try{
        switch(category){
            case "planets" : {
                //сносим планету
                await Planet.findOneAndRemove({title});
                res.redirect(`/planets/`);
                break
            }
            case "moons" : {
                //сносим луну
                let {parentPlanet} = await Moon.findOneAndRemove({title});
                //по названию материнской планеты возвращаем обновленный список ее спутников
                parentPlanet = await Planet.findOne({title: parentPlanet}).populate("moons")
                const moons = parentPlanet.moons.filter(moon => moon.title !== title)
                await Planet.update({title: parentPlanet.title}, {$set: {moons}})
                res.redirect(`/moons/`);
                break
            }
        }
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}
